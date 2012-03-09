from PIL import Image
import ImageFont, ImageDraw
import Tkinter as tk

width = 640
height = 480
outfile = "/tmp/output.png"

def idle_5sec(event=None):
	root.title("Idle for 5 seconds")
	time.sleep(5)

def create_image(fn):
	root = tk.Tk()
	black = (0, 250, 0)
	img_pil = Image.new("RGB", (width, height), black)
	cv_pil = ImageDraw.Draw(img_pil)

	cv_pil.ellipse((30, 30, 100, 100), fill=black)
	

if __name__ == "__main__":
	input_filename = "00.jpg"
	input_filetext = "When I interviewed Estee Lauder in 1985, we lunched on grilled flounder at le Cirque surrounded by excited socialities"
	input_author = "Jane Blagovich"
	input_place = "Cambridge"
	
	create_image(input_filename)
