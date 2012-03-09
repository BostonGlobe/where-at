var initlonlat = new OpenLayers.LonLat(-71.0851427, 42.3288756);
var minx = 100000000;
var maxx = -100000000;
var miny = 100000000;
var maxy = -100000000;

function MapThing() {
	map = new OpenLayers.Map("basicMap");

        mymaplayer = new OpenLayers.Layer.OSM();
        map.addLayer(mymaplayer);
        var lonLat = initlonlat.transform(
                                  new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
                                  map.getProjectionObject() //to Spherical Mercator Projection
                                );

	map.setCenter(lonLat, 16); // Zoom level	

	for (var i=0; i<region_coords.length; i++) {
		drawRegion(region_coords[i]);
		drawCanvas(region_coords[i], i);
	}

	// Now add the marker layer
	markerslayer = new OpenLayers.Layer.Markers( "Markers" );
        map.addLayer(markerslayer);

	pushimgurl();
}

function pushimgurl() {
	for (var i=0; i<story_names.length; i++ ) {
		story = story_names[i];
		//var initlonlat = new OpenLayers.LonLat(-71.0851427, 42.3288756);
		var lon = parseFloat(story[0]);
		var lat = parseFloat(story[1]);
		var lonLat = new OpenLayers.LonLat(lon, lat).transform(
                                  new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
                                  map.getProjectionObject() //to Spherical Mercator Projection
                                );
		var size = new OpenLayers.Size(300,100);
		var offset = new OpenLayers.Pixel(0, -size.h);
		//var locationstring = 'http://www.bostonglobe.com/arts/2012/02/16/list/n6KkywXFxsUN5ktr95PaYO/story.html';
		//var locationstring = 'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|'+story[3]+'|FFFFFF|000000';
		var locationstring ='https://chart.googleapis.com/chart?chst=d_bubble_texts_big&chld=bb|FEFEFE|000000|HEADLINE|'+story[3];
		//var locationstring = 'http://richmackey.com/wp-content/uploads/2011/01/google-marker-preview1.png';
		if (story[3] != 'None') {
			var icon = new OpenLayers.Icon(locationstring, size, offset);
			var marker = new OpenLayers.Marker(lonLat, icon);
			markerslayer.addMarker(marker);
		}
	}
}

function getRegion(lon, lat) {
	var canvas = document.getElementById('drawnMap');
	var c2 = canvas.getContext('2d');
	point = new OpenLayers.Geometry.Point(lon, lat);
	point.transform(
        	new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
                map.getProjectionObject() //to Spherical Mercator Projection
	);
	var testx = (point.x-minx)*x_unit;
	var testy = (canvas.height-(point.y-miny)*y_unit);
	var color = c2.getImageData(testx, testy, 1, 1).data;
	if(color[2] != 0) return color[2]-1;
	else return null;
}

function drawCanvas(testregion, id) {
	var canvas = document.getElementById('drawnMap');
	var c2 = canvas.getContext('2d');
	var testid = id+1;
	c2.fillStyle = "rgb(0, 0,"+testid+")"; //picked based on id

	var x_coord = [];
	var y_coord = [];
	x_unit = canvas.width/(maxx-minx);
	y_unit = canvas.height/(maxy-miny);
	for (var i=0; i<testregion.length; i++) {
		point = new OpenLayers.Geometry.Point(testregion[i].lon, testregion[i].lat);
		point.transform(
                        new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
                        map.getProjectionObject() //to Spherical Mercator Projection
		);
		x_coord.push((point.x-minx)*x_unit);
		y_coord.push(canvas.height-(point.y-miny)*y_unit);
	}
	c2.beginPath();
	c2.moveTo(x_coord[0], y_coord[0]);
	for (var i=1; i<x_coord.length; i++) {
		c2.lineTo(x_coord[i],y_coord[i]);
	}
	c2.closePath();
	c2.fill();
}

function drawRegion(testregion) {
	style_green = {
	  strokeColor: "#fefeef",
	  strokeOpacity: 1,
	  strokeWidth: 1,
          fillColor: "#000022",
 	  fillOpacity: 0.1
	};
	var vectors = new OpenLayers.Layer.Vector('Vector Layer');
	map.addLayer(vectors);
	var site_points = [];
	for (var i=0; i<testregion.length; i++) {
		point = new OpenLayers.Geometry.Point(testregion[i].lon, testregion[i].lat);
		point.transform(
                        new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
                        map.getProjectionObject() //to Spherical Mercator Projection
		);
		// also test for min and max values
		if (point.x < minx) minx = point.x;
		if (point.x > maxx) maxx = point.x;
		if (point.y < miny) miny = point.y;
		if (point.y > maxy) maxy = point.y;
		site_points.push(point);
	}
	site_points.push(site_points[0]);

	var linear_ring = new OpenLayers.Geometry.LinearRing(site_points);
	polygonFeature = new OpenLayers.Feature.Vector(
		new OpenLayers.Geometry.Polygon([linear_ring]), null, style_green);
	vectors.addFeatures([polygonFeature]);
	return false;
}

$(document).ready(function() {
	myMap = new MapThing();
});
