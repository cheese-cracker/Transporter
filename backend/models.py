from django.db import models


class BusStop(models.Model):
    stop_id = models.BigIntegerField(unique=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    name = models.CharField(max_length=128)
    entering = models.IntegerField()
    exiting = models.IntegerField()

    def __str__(self):
        return '{0} Bus Stop: {1}'.format(str(self.pk), str(self.name))
