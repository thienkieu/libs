function GoogleMapService(el, zoomNumber, center, markerImageUrl){
	this.el = el;
	this.zoomNumber = zoomNumber;
	this.center = center;
	this.markerImageUrl = markerImageUrl;
	
	this.init = function() {		  
		var map = new google.maps.Map(this.el, {zoom: this.zoomNumber, center: this.center});
		this.map = map;
		
		var marker = new google.maps.Marker({position: this.center, map: map});	
		this.addInfoWindowForMarker(marker, 'this is content of infoWindow');
		this.showFakeCenterMaker();
	}.bind(this);
	
	this.showFakeCenterMaker = function(){
		this.el.children[0].style.zIndex = '1';
		var fakeContainer = document.createElement('div');
		fakeContainer.style.position = 'absolute';
		fakeContainer.style.height = '100%';
		fakeContainer.style.width = '100%';		
		fakeContainer.style.top = '0';
		fakeContainer.style.bottom = '0';		
		this.el.appendChild(fakeContainer); 
		
		var marker = document.createElement('img');
		marker.style.position = 'absolute';
		marker.style.bottom = '50%'
		marker.style.zIndex = '2';
		marker.style.zIndex = '2';
		marker.style.opacity = '0';
		marker.src = this.markerImageUrl;		
		fakeContainer.appendChild(marker);
		
		setTimeout( function(){
			marker.style.left = 'calc(50% - ' + marker.width/2 + 'px)';
			marker.style.opacity = '1';
		}.bind(this), 500);
		
		
	}.bind(this);
	
	this.createMarker = function(location, label){
		return new google.maps.Marker({
            position: location,
            label: label
        });
	}.bind(this);
	
	
	this.createCluster = function(markers) {
		return markerCluster = new MarkerClusterer(this.map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
		);
	}.bind(this);
	
	this.showMakerWithCluster = function(locations){
		var markers = locations.map(this.createMarker);
		this.createCluster(markers);
	}.bind(this);
	
	this.getCenter = function() {
		var center = this.map.getCenter();
		return {lat: center.lat, lng: center.lng}
	}.bind(this);
	
	this.addInfoWindowForMarker = function(marker, content) {
		marker.addListener('click', function() {
			var infowindow = new google.maps.InfoWindow({
				content: content
			});
			infowindow.open(this.map, marker);
        });
	}.bind(this);
}