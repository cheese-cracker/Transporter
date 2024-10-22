from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import BusStop
from .serializers import BusStopSerializer
from utils.pathfinder import get_route

import json
import csv

PAGE_LINK = 'page/'
ROUTES_CSV = 'utils/route_list.csv'


@api_view(['GET', 'POST'])
def station_list(req):
    if req.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        stops = BusStop.objects.all()
        page = req.GET.get('page', 1)
        paginator = Paginator(stops, 20)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = BusStopSerializer(data, context={'req': req}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        print(serializer.data)
        return Response({
            'data': serializer.data,
            'count': paginator.count,
            'numpages': paginator.num_pages,
            'nextlink': PAGE_LINK + str(nextPage),
            'previouslink': PAGE_LINK + str(previousPage),
        }, status=status.HTTP_200_OK)

    elif req.method == 'POST':
        print(req.data)
        serializer = BusStopSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def stations_all(req):
    stops = BusStop.objects.all()
    serializer = BusStopSerializer(stops, context={'req': req}, many=True)
    return Response({
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def station_detail(req, stop_id):
    try:
        stop = BusStop.objects.get(id=stop_id)
    except stop.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if req.method == 'GET':
        serializer = BusStopSerializer(stop,
                                       data=req.data,
                                       context={'req': req})
        return Response(serializer.data,
                        status=status.HTTP_200_OK)
    elif req.method == 'PUT':
        serializer = BusStopSerializer(stop,
                                       data=req.data,
                                       context={'req': req})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'DELETE':
        stop.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def routes_detail(req):
    routelist = []
    with open(ROUTES_CSV, 'r') as f:
        cvr = csv.reader(f)
        for row in cvr:
            routelist.append([(row[i], row[i+1]) for i in range(len(row)-1)])
    print(routelist)
    return Response({
        'data': routelist,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def route_recv(req):
    take_routes = req.data
    print(take_routes)
    with open(ROUTES_CSV, 'w') as f:
        writ = csv.writer(f)
        for lit in take_routes:
            writ.writerow(lit)
        # f.write(json.dumps(take_routes))


@api_view(['POST'])
def route_give(req):
    start = int(req.data['start_id'])
    end = int(req.data['end_id'])
    line_nos, stopset = get_route(start, end)
    stoplist = {}
    for i, stop in enumerate(stopset):
        stoplist[int(i)] = stop
        # stoplist[i] = [BusStopSerializer(BusStop.objects.get(id=stop)) for stop in stopset[i]]
    print(stoplist)
    # thing = json.dumps(stoplist)
    return Response({
        'route_nos': line_nos,
        'stops': stoplist,
    }, status=status.HTTP_200_OK)
