/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

var API = require('../API');

var basil = require('basil.js');
basil = new basil();

exports.get = function(key) {
        return basil.get(key);
    };

exports.set = function(key, value) {
        return basil.set(key, value);
    };

// var Storage = require('../storage/storage');
// var orders = {};

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

var total = 0;

var total_quantity = 0;

var $order_total = $("#order-price-int");

var $total_quant = $("#total-quantity");

//var $empty_cart_text = $("#text-for-empty-cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    total += pizza[size].price;
    $order_total.text(total);

    total_quantity +=1;
    $total_quant.text(total_quantity);

    var alreadyThere = Cart.filter(function( pizza_in_the_cart ) {
        return pizza_in_the_cart.pizza == pizza && pizza_in_the_cart.size == size;
    });
    if (alreadyThere.length === 0) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
            price: pizza[size].price,
            content: pizza.content
        });
    }
    else {
        alreadyThere[0].quantity+=1;
        // alreadyThere[0].price+=pizza.price;
        // PizzaCart.updateCart();
    }
    //Приклад реалізації, можна робити будь-яким іншим способом

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    // var Cart = Cart.filter(function( pizza_in_the_cart ) {
    //     return pizza_in_the_cart !== (pizza_in_the_cart.pizza == cart_item.pizza && pizza_in_the_cart.size == cart_item.size);
    // });

        for(var i = Cart.length; i--;) {
            if(Cart[i].pizza === cart_item.pizza && Cart[i].size === cart_item.size) {
                Cart.splice(i, 1);
            }
        }

    total -= (cart_item.price * cart_item.quantity);
    $order_total.text(total);

    total_quantity -= (cart_item.quantity);
    $total_quant.text(total_quantity);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var saved_orders = basil.get('cart');
    var saved_orders_price = basil.get('order_total');
    var saved_orders_quantity = basil.get('number_of_pizzas');
    if(saved_orders) {
        Cart = saved_orders;
        //Cart = orders;
    }
    if(saved_orders_price) {
        total = saved_orders_price;
    }
    if (saved_orders_quantity) {
        total_quantity = saved_orders_quantity;
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            total += cart_item.price;
            $order_total.text(total);

            total_quantity +=1;
            $total_quant.text(total_quantity);
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            if (cart_item.quantity === 1){
                removeFromCart(cart_item);
            }
            else {
                cart_item.quantity -= 1;
                total -= cart_item.price;
                $order_total.text(total);

                total_quantity -=1;
                $total_quant.text(total_quantity);
            }
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".del").click(function(){
            removeFromCart(cart_item);
        });

        $order_total.text(total);
        $total_quant.text(total_quantity);
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    // if (Cart.length == 0) {
    //     $empty_cart_text.style.display = 'block';
    // }
    // else {
    //     $empty_cart_text.style.display = 'none';
    // }

    //orders = Cart;
    basil.set("cart", Cart);
    basil.set("order_total", total);
    basil.set("number_of_pizzas", total_quantity);
}

// function removeAll() {
//     var clearbtn = $("#clear-btn");
//
//     var $node = $(clearbtn);
//
//     $node.click(function(){
//        Cart = [];
//        total = 0;
//        updateCart();
//     });
//
// }
$(".clear-orders").click(function() {
    Cart = [];
    total = 0;
    $order_total.text(total);
    total_quantity = 0;
    $total_quant.text(total_quantity);
    updateCart();
});

function createOrder(callback) {
    API.createOrder({
        name: "client name tbd",
        phone: "890900008822",
        order: Cart
    }, function(err, result){
       if (err) {
           return callback(err);
       }
       callback(null, result);
    });
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;

exports.updateCart = updateCart;

exports.createOrder = createOrder;