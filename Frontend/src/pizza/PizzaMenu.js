/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);


        $node.find(".buy-button-big").click(function(){
            var currCart = PizzaCart.getPizzaInCart();
            var alreadyThere = currCart.filter(function( pizza_in_the_cart ) {
                return pizza_in_the_cart.pizza == pizza && pizza_in_the_cart.size == PizzaCart.PizzaSize.Big;
            });
            if (alreadyThere.length === 0) {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            }
            else {
                alreadyThere[0].quantity+=1;
                alreadyThere[0].price+=pizza.price;
                PizzaCart.updateCart();
            }
        });
        $node.find(".buy-button-small").click(function(){
            var currCart = PizzaCart.getPizzaInCart();
            var alreadyThere = currCart.filter(function( pizza_in_the_cart ) {
                return pizza_in_the_cart.pizza == pizza && pizza_in_the_cart.size == PizzaCart.PizzaSize.Small;
            });
            if (alreadyThere.length === 0) {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            }
            else {
                alreadyThere[0].quantity+=1;
                PizzaCart.updateCart();
            }
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;