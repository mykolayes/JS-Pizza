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

    $(".btn-order").click(function(){
       PizzaCart.createOrder(function (err, data) {
           if (err) {
               alert("Can't create order!");
           } else {
               alert("Order successfully created" + JSON.stringify(data));
           }
       })
    });
});