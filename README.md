## Where At?

Grabs all articles that contain geo information from today's paper.

  * ```locations.xql``` contains the XPATH queries that generate the XML
  * if you modify ```locations.xql``` you need to execute ```upload_xql.sh``` to get it onto the exist server
  * running ```python today_geo.py``` will fetch articles from the DB and create an array of articles that you can process in python
