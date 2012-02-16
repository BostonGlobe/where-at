#!/usr/bin/env python
#
# article geo visualization for today
# author: mchang
###

import urllib
import urllib2
import pprint
import re
import sys
from xml.etree import ElementTree as ET


LOCATION_EXIST = "http://10.100.50.131:8080/exist/rest/db/papereye/locations.xql"

def get_today_geo():
	f = urllib.urlopen(LOCATION_EXIST)
	xml = f.read() 
	f.close()
	doc = ET.fromstring(xml)
	stories = doc.findall('story')
	articles = []
	for story in stories:
		article = {'lat' : story.find('lat').text, 'lon' : story.find('lon').text, 'url' : story.find('url').text }
		articles.append(article)

	return articles

if __name__ == "__main__":
	articles = get_today_geo()
	print 'Got', len(articles), 'articles with geo tags'
