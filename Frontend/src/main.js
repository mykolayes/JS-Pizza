/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    //var Pizza_List = require('./Pizza_List');
    //var Order = require('./Order');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    var nameOK, phoneOK, addrOK = false;

    $(".btn-next").click(function(){
        if (nameOK && phoneOK && addrOK) {
       PizzaCart.createOrder(function (err, data) {
           if (err) {
               alert("Can't create order!");
           } else {
//               alert("Order successfully created" + JSON.stringify(data));
               alert("Order successfully created.");

               PizzaCart.clearOrder();
               window.location = "./";
           }
       })
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
            nameOK = true;
        }
        else {
            $(".client-name-typo").css("display","block");
            $(".client-name-field").css("border-color", "red");
            nameOK = false;
        }
    });

    $("#phoneField").blur(function() {
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var phone_num = $("#phoneField").val();
        if(!phone_num.match(/^[+0-9()]+$/g) !== null && (phone_num.length == 12 || phone_num.length == 13 || phone_num.length == 14 || phone_num.length == 15)) {
            $(".client-phone-typo").css("display","none");
            $(".client-phone-field").css("border-color", "green");
            phoneOK = true;
        }
        else {
            $(".client-phone-typo").css("display","block");
            $(".client-phone-field").css("border-color", "red");
            phoneOK = false;
        }
    });

    $("#addressField").blur(function() {
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var name = $("#addressField").val();
        if(name!=="") {
            $(".client-address-typo").css("display","none");
            $(".client-address-field").css("border-color", "green");
            addrOK = true;
        }
        else {
            $(".client-address-typo").css("display","block");
            $(".client-address-field").css("border-color", "red");
            addrOK = false;
        }
    });
});