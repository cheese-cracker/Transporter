import networkx as nx
from collections import defaultdict
from itertools import product, groupby
import csv


def read_graph(file_):
    # NetX Graph with all paths
    g = nx.Graph()
    # Table of lists of routes at everystop
    routes_at_stop = defaultdict(list)
    routeno = 0
    with open(file_, 'r') as f:
        cvr = csv.reader(f)
        for route in cvr:
            for nod in route:
                routes_at_stop[nod].append(routeno)
                g.add_node(nod)
            g.add_edges_from([(route[i], route[i+1]) for i in range(len(route) - 1)])
            routeno += 1
    return g, routes_at_stop


graf, routes_at_stop = read_graph('route_list.csv')

st = 4
end = 6
all_fast_paths = nx.shortest_path_all(graf, source=st, target=end)
fast_path = nx.shortest_path(graf, source=st, target=end)

route_set = []


for stop in fast_path:
    print(stop)
    route_set.append(routes_at_stop[stop])


def get_best_path(route_set):
    min_switch = 0
    best_path = -1
    for path in product(*route_set):
        print(path)
        compres = [k for k, g in groupby(path)]
        switches = len(compres)
        if switches < min_switch or best_path == -1:
            min_switch = switches
            best_path = compres
            print(best_path)
    return best_path
