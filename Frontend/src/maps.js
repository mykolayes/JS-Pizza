var markerWhereTo;
var map;
var directionsDisplay;

var Order = require('./Order');

function initialize() {
    //Тут починаємо працювати зкартою
    var mapProp = {
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom: 18
    };
    var html_element = document.getElementById("googleMap");
    map	= new google.maps.Map(html_element,	mapProp);
    //Карта створена і показана
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        //map	-цезмінна карти створена задопомогою new	google.maps.Map(...)
        map: map,
        icon: "assets/images/map-icon.png"
    });

    //Видалити маркер зкарти можна задопомогою
    // marker.setMap(null);

    google.maps.event.addListener(map, 'click', function(me){
        var coordinates = me.latLng;
        //alert(coordinates);
    });
    google.maps.event.addListener(map, 'click', function(me){
        var coordinates = me.latLng;
        geocodeLatLng(coordinates, function(err, address){
            if(!err){
                //Дізналися адресу
                console.log(address);
                $("#addressField").val(address);
                //$("#addressField").blur();

                $(".client-address-typo").css("display","none");
                $(".client-address-field").css("border-color", "green");
                //var addrOK = main.addrOK;
                Order.addrOK = true;
                placeMarker(coordinates);
                calculateRoute(point, coordinates, setDuration);
            } else {
                console.log("Немає адреси");
            }
        });





        //google.maps.event.addListener(map, 'click', function(event) {
       //     placeMarker(event.latLng);
       // });
        //placeMarker(coordinates);
    });
}

function placeMarker(location) {
    if (markerWhereTo) {
        markerWhereTo.setMap(null);
    }
    markerWhereTo = new google.maps.Marker({
        position: location,
        map: map,
        icon: "assets/images/home-icon.png"
    });
}

function setDuration(err, duration){
    //function parseCoords(err, coords) {
        if (!err) {
            //$("#nameField").val(duration.duration.text);
            $("#order-eta-field").text(duration.duration.text);
        } else {
            //$("#nameField").val("");
            $("#order-eta-field").text(duration.duration.text);
            Console.log("Unknown duration.");
        }

   // }
}

function geocodeLatLng(latlng, callback) {
    //Модульзароботу задресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location':latlng}, function(results, status){
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var address = results[1].formatted_address;
            callback(null, address);
        } else {
            callback(new Error("Can't find address"));
        }
    });
}

function geocodeAddress(address, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find the address"));
        }
    });
}
//https://stackoverflow.com/questions/14556312/google-maps-v3-create-routes-between-two-points
function	calculateRoute(A_latlng,	B_latlng,	callback)	{
    //directionsDisplay = new google.maps.DirectionsRenderer(); //?
    var directionService =	new	google.maps.DirectionsService();
    directionService.route({
        origin:	A_latlng,
        destination:	B_latlng,
        travelMode:	google.maps.TravelMode["DRIVING"]
    },	function(response,	status)	{
        if	(	status	==	google.maps.DirectionsStatus.OK )	{
            //map.setDirections(response);
            var leg	=	response.routes[0].legs[0];
            callback(null,	{
                duration:	leg.duration
            });
            }	else	{
            callback(new	Error("Can	not	find	direction"));
        }
        });
    }
//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);

exports.initialize = initialize;
exports.geocodeAddress = geocodeAddress;
exports.geocodeLatLng = geocodeLatLng;
exports.placeMarker = placeMarker;
exports.calculateRoute = calculateRoute;
exports.setDuration = setDuration;