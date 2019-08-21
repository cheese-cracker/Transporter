from django.db import models
from django.contrib.postgres.fields import ArrayField


class BusStop(models.Model):
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    name = models.CharField(max_length=128)
    # code = models.CharField(max_length=4, unique=True) use ID instead?
    entering = models.IntegerField()
    exiting = models.IntegerField()

    def __str__(self):
        return '{0} Bus Stop: {1}'.format(str(self.pk), str(self.name))
