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

BASE_FILE = "/home/bostonglobe/git/where-at/js/stories.js"
LOCATION_EXIST = "http://10.100.50.131:8080/exist/rest/db/papereye/locations.xql"

def get_today_geo():
	f = urllib.urlopen(LOCATION_EXIST)
	xml = f.read() 
	f.close()
	doc = ET.fromstring(xml)
	stories = doc.findall('story')
	articles = []
	for story in stories:
		article = {'lat' : story.find('lat').text, 'lon' : story.find('lon').text, 'url' : story.find('url').text , 'headline' : story.find('headline').text, 'location': story.find('location')}
		articles.append(article)

	return articles

def jsonify(articles):
	jsonobj = []
	for item in articles:
		headline = item['headline']
		article = item['url'] #Note the article is missing the first letter
		if article is not None:
			newval = [[item['lon']], [item['lat']], [article], [headline]]
		else:
			newval = [[item['lon']], [item['lat']], ["None"], ["None"]]
			
		jsonobj.append(newval)
	return jsonobj

if __name__ == "__main__":
	articles = get_today_geo()
	f = open(BASE_FILE, 'w')
	f.write('story_names='+str(jsonify(articles)))
	f.close()
	print articles
	print 'Got', len(articles), 'articles with geo tags'
