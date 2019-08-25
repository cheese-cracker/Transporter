import networkx as nx
from collections import defaultdict
from itertools import product

"""
Routes.routes = (list of 'Route')
Route.v = (ordered set of vert)
"""


def optimal_route(routels, src, dest):

    # Check if direct Path - O(n)
    direct_possible = [rot for rot in routels.routes if (src in rot) and (dest in rot)]
    if direct_possible:
        return direct_possible

    # Generate nx graph and HashTableLists
    rats = defaultdict(list)
    G = nx.Graph()
    for rotno, rot in enumerate(routels.routes):
        for i in range(len(rot) - 1):
            G.add_edges_from([(rot[i], rot[i+1])])
            rats[rot[i]].append(rotno)
            rats[rot[i+1]].append(rotno)
    # Find all shortest path
    shortpaths = nx.all_shortest_paths(G, src, dest)
    # Search through product of routes of all shortest paths
    switchlist = []
    routelist = []
    for stpath in shortpaths:
        routeset = product(rats[stop] for stop in stpath)
        for rot in routeset:
            switch = 0
            for i in range(len(rot)-1):
                if rot[i+1] != rot[i]:
                    switch += 1
            switchlist.append(switch)
        routelist.extend(routeset)
    # Return all shortest path with least switches
    zet = zip(switchlist, routeset)
    print(zet)
    zet.sort(key=0)
    best_paths = [zet[0][1]]
    for i in range(len(zet)):
        if zet[i][0] != zet[0][0]:
            break
        best_paths.append(zet)
    vr_set = []
    for pathy in best_paths:
        vr_set.append([(pathy.v[i], G.edge[pathy.v[i], pathy.v[i+1]]["routeno"]) for i in range(len(pathy.v))])
    return best_paths
