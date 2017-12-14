/**
 * Created by chaika on 25.01.16.
 */


$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    //var Pizza_List = require('./Pizza_List');
    var Order = require('./Order');
    var Maps = require('./maps');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    //Maps.initialize();


    $(".btn-next").click(function(){
        if (Order.nameOK && Order.phoneOK && Order.addrOK) {
            var data = PizzaCart.getPizzaInCart();
       PizzaCart.createOrder(function (err, data) {
           if (err) {
               alert("Can't create order!");
           } else {
               alert("Order successfully created" + JSON.stringify(data));
               alert("Order successfully created.");
               // var order = PizzaCart.createOrderx(function(){
               //
               // });

               // PizzaCart.createOrder(function(err, result){
               //     if (err) {
               //         return callback(err);
               //     }
               //     callback(null, result);
               // });

               LiqPayCheckout.init({
                   data: data.data,
                   signature:	data.signature,
                   embedTo:	"#liqpay",
                   mode:	"popup"	//	embed	||	popup
               }).on("liqpay.callback",	function(data){
                   console.log(data.status);
                   console.log(data);
               }).on("liqpay.ready",	function(data){
//	ready
               }).on("liqpay.close",	function(data){
//	close
                   PizzaCart.clearOrder();
                   window.location = "./";
               });

               //PizzaCart.clearOrder();
               //window.location = "./";
           }
       });
        }
        else {
            alert("Missing or incorrect contact details!");
        }
    });

    $("#nameField").blur(function() {
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var name = $("#nameField").val();
        if(name!=="") {
            $(".client-name-typo").css("display","none");
            $(".client-name-field").css("border-color", "green");
            Order.nameOK = true;
        }
        else {
            $(".client-name-typo").css("display","block");
            $(".client-name-field").css("border-color", "red");
            Order.nameOK = false;
        }
    });

    $("#phoneField").blur(function() {
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var phone_num = $("#phoneField").val();
        if(!phone_num.match(/^[+0-9()]+$/g) !== null && (phone_num.length == 12 || phone_num.length == 13 || phone_num.length == 14 || phone_num.length == 15)) {
            $(".client-phone-typo").css("display","none");
            $(".client-phone-field").css("border-color", "green");
            Order.phoneOK = true;
        }
        else {
            $(".client-phone-typo").css("display","block");
            $(".client-phone-field").css("border-color", "red");
            Order.phoneOK = false;
        }
    });

    function parseCoords(err, coords) {
        if (!err) {
            Maps.geocodeLatLng(coords, setAddr);
            //$("#addressField").val(coords);
        Maps.placeMarker(coords);
            var point = new google.maps.LatLng(50.464379, 30.519131);
            Maps.calculateRoute(point, coords, Maps.setDuration);
        } else {
            $("#addressField").val("");
            //Console.log("Inexistent address.");
        }

    }
    function setAddr(err, addr) {
        if(!err){
            $("#addressField").val(addr);
        } else {
            $("#addressField").val("");
            //Console.log("Inexistent address.");
        }
    }

    $("#addressField").blur(function() {
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var name = $("#addressField").val();
        // if(name!=="" && Maps.geocodeAddress(name, err)) {
        // Maps.geocodeAddress(name, parseCoords);
        if(name!=="") {
            $(".client-address-typo").css("display","none");
            $(".client-address-field").css("border-color", "green");
            Order.addrOK = true;
            Maps.geocodeAddress(name, parseCoords);

        }
        else {
            $(".client-address-typo").css("display","block");
            $(".client-address-field").css("border-color", "red");
            Order.addrOK = false;
        }
    });
});

// exports.addrOK = addrOK;