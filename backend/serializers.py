from rest_framework import serializers
from .models import BusStop


class BusStopSerializer(serializers.ModelSerializer):

    class Meta:
        model = BusStop
        # fields = ('id', 'exiting', 'entering', 'name', 'lon', 'lat')
        fields = ('id', 'exiting', 'entering', 'name', 'lon', 'lat', 'stop_id')
