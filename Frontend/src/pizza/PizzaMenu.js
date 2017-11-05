/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var pizzas_amount_shown = 8;
var $pizzas_shown = $("#pizza-menu-counter");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);


        $node.find(".buy-button-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-button-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $pizzas_shown.text(pizzas_amount_shown);
}

function filterPizza(filter) {

    //var $node = $("#pizza-types");

    //var pizza_type_filter = "all";

    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    //$node.find("#filter-button-all-pizza").click(function(){
    //    pizza_type_filter = "all";
    //});

    //$node.find("#filter-button-meat").click(function(){
    //    pizza_type_filter = "meat";
    //});

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        if(filter == "filter-button-all-pizza") {
            pizza_shown.push(pizza);
        }
        else if (filter == "filter-button-meat") {
            if (pizza.content.meat) {
                pizza_shown.push(pizza);
            }
        }
        else if (filter == "filter-button-pineapples") {
            if (pizza.content.pineapple) {
                pizza_shown.push(pizza);
            }
        }
        else if (filter == "filter-button-mushrooms") {
            if (pizza.content.mushroom) {
                pizza_shown.push(pizza);
            }
        }
        else if (filter == "filter-button-ocean") {
            if (pizza.content.ocean) {
                pizza_shown.push(pizza);
            }
        }
        else if (filter == "filter-button-tomato") {
            if (pizza.content.tomato) {
                pizza_shown.push(pizza);
            }
        }
    });
    pizzas_amount_shown = pizza_shown.length;
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

$(".pizza-filter-button").click(function() {
    filterPizza(this.id);
});

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;