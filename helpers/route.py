import numpy as np
from pprint import pprint, pformat
from copy import deepcopy

get_bin = lambda x, n: format(x, "b").zfill(n)

def remove_duplicates(seq):
	seen = set()
	seen_add = seen.add
	return [x for x in seq if not (x in seen or seen_add(x))]

def get_nbrs(G, node, first=None, last=None):
	nbrs = sorted(list(G.neighbors(0)), key=lambda n: G[0][n]["length"], reverse=True)

	if first:
		return nbrs[:first]
	elif last:
		return nbrs[-last:]
	else:
		return nbrs

class Route(object):
    """
    Specifies a route for buses to run on
    Attributes:
        num(int): Number of buses running on this routes
        num_bits(int): number of bits to use in the binary description of num
        cap(int): capacity of this route
        v(list): (ordered) list of vertices covered in this route
    Methods:
        mutate(mut_prob): Mutate the given route
        crossover(route): Crossover current route with the specified route
    """

    world = None
    initialized = False

    @staticmethod
    def initialize_class(G):
        Route.world = deepcopy(G)
        Route.initialized = True

    @property
    def cum_len(self):
        cum_sum = 0
        for i in range(len(self.v_disabled) - 1):
            cum_sum += Route.world[self.v_disabled[i]][self.v_disabled[i + 1]]["length"]
        return cum_sum

    @property
    def v_disabled(self):
        return remove_duplicates(self.v)

    def __init__(self, cap, vertices, num=None):
        self.num_bits = 5
        if not num:
            self.num = np.random.randint(1, 2 ** self.num_bits)
        else:
            self.num = num
        self.v = vertices
        self.cap = cap

    def __str__(self):
        return f"{self.num} | {len(self.v_disabled)} | {self.v_disabled}"

    # To enable better printing
    __repr__ = __str__

    def mutate(self, mut_prob=0.05):
        if Route.initialized:
            G = Route.world
        # Mutate the number of buses
        bin_num = list(str(get_bin(self.num, self.num_bits)))
        for i in range(len(bin_num)):
            if np.random.rand() < mut_prob:
                bin_num[i] = str(abs(int(bin_num[i]) - 1))
        self.num = 4 * int(bin_num[0]) + 2 * int(bin_num[1]) + 1 * int(bin_num[2])

        # Mutate the route
        for i in range(len(self.v)):
            if np.random.rand() < mut_prob:
                nbrs = get_nbrs(G, self.v[i], first=len(self.v) + 1)
                for n in nbrs[:]:
                    if n in self.v:
                        nbrs.remove(n)
                probs = np.array([G[self.v[i]][n]["length"] for n in nbrs])
                probs = probs / np.sum(probs)
                self.v[i] = np.random.choice(nbrs, p=probs)

    def crossover(self, other_route):
        v1 = set(self.v[1:-1])
        v2 = set(other_route.v[1:-1])
        common = list(v1.intersection(v2))

        if len(common) == 0:
            return

        if len(common) == 1:
            ind_1 = self.v.index(common[0])
            ind_2 = other_route.v.index(common[0])
            temp_v = self.v
            self.v = self.v[:ind_1] + other_route.v[ind_2:]
            other_route.v = other_route.v[:ind_2] + temp_v[ind_1:]

        else:
            elem1, elem2 = np.random.choice(common, size=2, replace=False)
            ind_1_l = min(self.v.index(elem1), self.v.index(elem2))
            ind_1_u = max(self.v.index(elem1), self.v.index(elem2))
            ind_2_l = min(other_route.v.index(elem1), other_route.v.index(elem2))
            ind_2_u = max(other_route.v.index(elem1), other_route.v.index(elem2))
            temp_v = self.v
            self.v[ind_1_l + 1 : ind_1_u] = other_route.v[ind_2_l + 1 : ind_2_u]
            other_route.v[ind_2_l + 1 : ind_2_u] = temp_v[ind_1_l + 1 : ind_1_u]

class Routes(object):
    """
    Collection of routes to be used as a population for the final Genetic Algorithm
    Attributes:
        routes: list of bus routes (class Route)
        num_routes: Number of such routes
    """

    world = None
    initialized = False

    @staticmethod
    def initialize_class(G):
        Routes.world = deepcopy(G)
        Routes.initialized = True

    @property
    def cap(self):
        cum_cap = 0
        for route in self.routes:
            cum_cap += route.cap * route.num
        return cum_cap

    @property
    def num_buses(self):
        cum_num = 0
        for route in self.routes:
            cum_num += route.num
        return cum_num

    def __init__(self, list_routes):
        self.routes = list_routes
        self.num_routes = len(list_routes)

    def __str__(self):
        return pformat([self.num_routes] + [r for r in self.routes])

    __repr__ = __str__

    def mutate(self, mut_prob=0.05, cross_perc=0.3):
        if Routes.initialized:
            G = Routes.world

        # Mutate individual routes
        for route in self.routes:
            if np.random.rand() < mut_prob:
                route.mutate( mut_prob)

        # internally Crossover some routes
        num_cross = int(cross_perc * self.num_routes)
        num_cross = num_cross if not num_cross % 2 else num_cross + 1
        cross_routes = np.random.choice(self.routes, replace=False, size=num_cross)
        for i in range(0, num_cross, 2):
            cross_routes[i].crossover(cross_routes[i + 1])

    def crossover(self, other_routes, cross_transfer=0.1, cross_perc=0.3):
        num_cross = int(cross_perc * max(self.num_routes, other_routes.num_routes))
        num_transfer = int(
            cross_transfer * max(self.num_routes, other_routes.num_routes)
        )

        # Transfer some routes
        ind_1 = np.random.choice(
            range(self.num_routes), replace=False, size=num_transfer
        )
        ind_2 = np.random.choice(
            range(other_routes.num_routes), replace=False, size=num_transfer
        )
        for i in range(num_transfer):
            temp = self.routes[ind_1[i]]
            self.routes[ind_1[i]] = other_routes.routes[ind_2[i]]
            other_routes.routes[ind_2[i]] = temp

        # Crossover some routes
        cross_1 = np.random.choice(self.routes, replace=False, size=num_cross)
        cross_2 = np.random.choice(other_routes.routes, replace=False, size=num_cross)
        for i in range(num_cross):
            cross_1[i].crossover(cross_2[i])

    @property
    def cum_len(self):
        cum_sum = 0
        for route in self.routes:
            cum_sum += route.cum_len
        return cum_sum
