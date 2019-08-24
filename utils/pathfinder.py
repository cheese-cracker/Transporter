import networkx as nx
from collections import defaultdict
from itertools import product, groupby
from pprint import pprint
import csv


def read_graph(file_):
    # NetX Graph with all paths
    g = nx.Graph()
    # Table of lists of routes at everystop
    routes_at_stop = defaultdict(list)
    routeno = 0
    with open(file_, 'r') as f:
        cvr = csv.reader(f)
        routelist = []
        for route in cvr:
            for nod in route:
                routes_at_stop[int(nod)].append(routeno)
                g.add_node(int(nod))
            g.add_edges_from([(int(route[i]), int(route[i+1])) for i in range(len(route)-1)])
            routeno += 1
            routelist.append([int(nod) for nod in route])
    return g, routes_at_stop, routelist


def get_best_path(route_set):
    min_switch = 0
    best_path = -1
    for path in product(*route_set):
        # print(path)
        compres = [k for k, g in groupby(path)]
        switches = len(compres)
        if switches < min_switch or best_path == -1:
            min_switch = switches
            best_path = path
            # print(best_path)
    return best_path


def check_direct(st, end, routes_at_stop, routelist):
    found = -1
    for lineno in routes_at_stop[st]:
        if lineno in routes_at_stop[end]:
            # print(lineno)
            fast_path = routelist[lineno]
            break
    if found >= 0:
        for i in range(len(fast_path)):
            if fast_path[i] == st:
                st_i = i
            elif fast_path[i] == end:
                end_i = i
        if st_i > end_i:
            tmp = end_i
            end_i = st_i
            st_i = tmp
        return lineno, fast_path[st_i: end_i + 1]
    return -1, -1


# all_fast_paths = nx.shortest_path_all(graf, source=st, target=end)
def get_fast_path(graph, st, end, routes_at_stop):
    fast_path = nx.shortest_path(graph, st, end)
    lines_on_route = []
    for stop in fast_path:
        lines_on_route.append(routes_at_stop[stop])
    return lines_on_route, fast_path


def get_route(st, end):
    graf, routes_at_stop, routelist = read_graph('utils/route_list.csv')
    pprint(routes_at_stop)
    # print(graf.nodes())
    # print(graf.edges())
    lineno, shortpath = check_direct(st, end, routes_at_stop, routelist)
    if lineno != -1:
        return [lineno], [shortpath]
    possible_lines, shortpath = get_fast_path(graf, st, end, routes_at_stop)
    prev = -1
    pathset = []
    lineno = []
    best_path = get_best_path(possible_lines)
    for i in range(len(shortpath)):
        stop = shortpath[i]
        routeno = best_path[i]
        if prev == -1:
            prev = routeno
            print(stop)
            pathset.append([stop])
            print(pathset)
            lineno.append(routeno)
        elif routeno == prev:
            print(stop)
            pathset[-1].append(stop)
            print(pathset)
        else:
            print(stop)
            pathset[-1].append(stop)
            pathset.append([stop])
            print(pathset)
            lineno.append(routeno)
        prev = routeno
    return lineno, pathset
