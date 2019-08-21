import networkx as nx
import matplotlib.pyplot as plt

routelistings = [
    [5, 3, 4, 9, 13],
    [6, 2, 1, 9, 7, 3],
    [15, 8, 7, 3, 4, 10],
    [12, 11, 4, 10, 13, 14]
]

# List of Graphs
lines = []

for rot in routelistings:
    g = nx.Graph()
    g.add_nodes_from(rot)
    g.add_edges_from([(rot[i], rot[i+1]) for i in range(len(rot) - 1)])
    lines.append(g)


plt.subplot(121)
nx.draw(lines[0], with_labels=True, font_weight='bold')
plt.draw()
