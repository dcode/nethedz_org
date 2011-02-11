from django import template
from django.conf import global_settings as gs_
from datetime import datetime
from pytz import timezone

import sys

register = template.Library()

@register.filter( name="html5_datetime" )
def html5_datetime( value ):
    """ Returns the HTML5 formatted datetime value """
    if isinstance( value, datetime ):
        tz_ = timezone( gs_.TIME_ZONE )
        d_ = value.replace(microsecond=0, tzinfo=tz_)
        return d_.isoformat()
    else:
        return value
    
