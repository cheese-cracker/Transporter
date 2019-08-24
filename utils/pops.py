import requests
import json
from random import randrange

URL = 'http://192.168.43.155:8000/api/stops'


# for i in range(42):
#     content = {
#         'lat': randrange(0, 90),
#         'lon': randrange(0, 90),
#         'name': 'StopNo.: ' + str(i),
#         'entering': randrange(0, 20),
#         'exiting': randrange(0, 15)
#     }
#     requests.post(url=URL, data=content)
#     print(content)
#

with open('saturday_labels.json', 'r') as f:
    slabels = json.load(f)


for i in range(len(slabels)):
    vals = slabels[str(i)]
    print(vals)
    content = {
        'stop_id': i,
        'lat': vals["latitude"],
        'lon': vals["longitude"],
        'name': vals["stop_name"],
        'entering': randrange(0, 20),
        'exiting': randrange(0, 15)
        }
    # requests.post(url=URL, data=content)
    print(content)
