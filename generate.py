from BeautifulSoup import BeautifulSoup
import urllib2
import re
from PIL import Image

testicon = 'index.html'
page = urllib2.urlopen("http://www.bostonglobe.com/arts/2012/02/16/list/n6KkywXFxsUN5ktr95PaYO/story.html")

# Try to get an image
soup = BeautifulSoup(page)
img_tags = soup.findAll(['img'], {'src' : re.compile(r'(jpe?g)|(png)$')})
if len(img_tags) > 0:
	for item in img_tags:
		imgurl = item.prettify().split('src=')[1].split('title=')[0].strip('"')[:-2]
print imgurl
data = urllib2.urlopen(str(imgurl)).read()
f = open('/tmp/img.jpg', 'w')
f.write(data)
f.close()

# Process that image
im = Image.open('/tmp/img.jpg')
size = 200, 200
im.thumbnail(size, Image.ANTIALIAS)
im.save('/tmp/out.jpg', "JPEG")

# Try to get a headline
f = open(testicon, 'w')
oneline = "<img src=" + imgurl + ">"
f.write("<html><body>")
f.write(oneline)
f.write("</body></html>")
f.close()
