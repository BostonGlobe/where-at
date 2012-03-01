from PIL import Image

outfile = "/tmp/output.png"

def create_image(fn):
	im = Image.open(fn)
	im.save(outfile)
	#im.resize(width, height)
	#im.thumbnail(width, height)
	
if __name__ == "__main__":
	filename = "00.jpg"
	create_image(filename)
