## Where At?

*** Notes for parsing the articles ***

For now, it looks like the location field isn't actually tagged for most
articles but we can still get the semantic location the same way we do it in
snap

Grabs all articles that contain geo information from today's paper.

  * ```locations.xql``` contains the XPATH queries that generate the XML
  * if you modify ```locations.xql``` you need to execute ```upload_xql.sh``` to get it onto the exist server
  * running ```python today_geo.py``` will fetch articles from the DB and create an array of articles that you can process in python
  * If it runs a little bit slowly, thats OK you just have to be patient

*** Notes For the Visualization of the Map ***

The markers require a size field associated with them. If you look at the code
for generating the markers in snap, there is an associated width and height that needs to be a field.

If you decide on creating an image for this marker, then it can just be a field that is returned with the object for creating an image.
