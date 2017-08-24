
// Create a config.json file if it was pushed up to git
var accessToken;

var infobox, marker, map;

var markers = [];


function getFB(){
	$.ajax({
			url: "config/config.json",
			dataType: "json",
			success: function(DataFromJSON){
				// console.log(DataFromJSON.AccessToken);
				accessToken = DataFromJSON.AccessToken;
				getId();
			},
			error: function(){
				console.log("Something went wrong");
			}
	});

}
	


	var name;
	var pageID;
	function getId(){
		$.ajax({
			url: "https://graph.facebook.com/v2.10/"+name+"?access_token=" + accessToken,
			dataType:"jsonp",
			success:function(DataFromFacebook){

				// console.log(DataFromFacebook);
				pageID = DataFromFacebook.id;
				// console.log(pageID);
				facebookData();

			},


			error:function(){
			 console.log("Something went wrong");
			}
		});

	}
var FBname;
var FBabout;
var FBphone;
var FBdescription;

	function facebookData(){
		$.ajax({
			url: "https://graph.facebook.com/v2.10/"+pageID+"?fields=name%2Cabout%2Cdescription%2Cphone&access_token=" + accessToken,
			dataType:"jsonp",
			success:function(DataFromFacebook){
			  console.log(DataFromFacebook);
			  FBname = DataFromFacebook.name;
			  FBabout = DataFromFacebook.about;
			  FBphone = DataFromFacebook.phone;
			  FBdescription = DataFromFacebook.description;

			  $("#info").empty().append("<h3>"+FBname+"</h3>"+
			  							"<p>"+FBabout+"</p>"+
			  							"<p>"+FBdescription+"</p>"+
			  							"<p>"+FBphone+"</p>"


			  );

			},
			error:function(){
			  console.log("Cant get data from Facebook");
			}

		});

	};
 	
	
function init(){

	var mapOptions = {
		//set where the map starts
		center:{
           lat: -41.292186,
           lng: 174.780258
       	},
		zoom: 13,
		disableDefaultUI: false,
		disableDoubleClickZoom: false,
		scrollwheel: true,
		draggable: true,
		draggableCursor: 'pointer',
		draggingCursor: 'crosshair',
		fullscreenControl: true,
		backgroundColor: 'white',
		keyboardShortcuts: false,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},
		styles: [
			{
				stylers: [
					{
						hue: "#5dd06f"
					},
					{
						saturation: 10
					}
				]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [
					{
						hue: '#db9216'
					},
					{
						lightness: -20
					},
					{
						visibility: "none"
					}
				]
			},
			{
				featuretype: 'transit',
				elementType: 'labels',
				stylers: [
					{
						hue: '#dbcd19'
					},
					{
						saturation: -10
					}
				]
			},
			{
				featureType: 'water',
				stylers: [
					{
						color: '#2ec8d0'
					},
					{
						lightness: 50
					}
				]
			}
		]
	};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	addAllMarkers();
}

google.maps.event.addDomListener(window, 'load', init());


function addAllMarkers(){
	$.ajax({
		url:"data/FacebookDATA.json",
		dataType: "json",
		success: function(DataFromJSON){
			
				

			for (var i = 0; i < DataFromJSON.length; i++) {

				// console.log(DataFromJSON[i].pageName);				
				marker = new google.maps.Marker({
					position:{
						lat: DataFromJSON[i].lat,
						lng: DataFromJSON[i].lng,
					},
					map: map,
					animation: google.maps.Animation.DROP,
					icon: DataFromJSON[i].icon,
					title: DataFromJSON[i].title,
					description: DataFromJSON[i].description,
					pageName: DataFromJSON[i].pageName
					
					
				});
				AllInfoBox(marker);
				markers.push(marker);
				clickMarker(marker);
				
			};
				

		},
		error: function(){
			console.log("something went wrong");
		}


	})



};



function AllInfoBox(marker) {
	if(infobox){
		infobox.close();
	}
	infobox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infobox.setContent("<div><strong>"+marker.title+"</strong></div>"+
			"<div>"+marker.description+"</div>");
		infobox.open(map, marker);
	});
}



function clickMarker(pageName){
	google.maps.event.addListener(marker,"click", function(){

	name = pageName.pageName;
 
	 getFB();	

	});
	
}

// 

// console.log(clickMarker);



















