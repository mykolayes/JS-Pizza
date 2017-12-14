/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var LIQPAY_PUBLIC_KEY = "i66378944857";
var LIQPAY_PRIVATE_KEY = "IYtlu5XSPnyywivM01WaRgaYLfEdwuU9EaW8Jyxq";

function base64(str) {
    return	new	Buffer(str).toString('base64');
}

var crypto	=	require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var desc = "";
    //var desc = order_info.order.toString();
    console.log(desc);
     for(var i = order_info.order.length; i--;) {
         desc +=order_info.order[i].title + " " + order_info.order[i].size + " " + order_info.order[i].quantity + "\n";
         }

//title +quantity

    var order	=	{
        version:	3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	order_info.sum, //to be changed
        currency:	"UAH",
        // description:	order_info.order,
        description:	desc,
        order_id:	Math.random(),
//!!!Важливощоб було1,	боінакше візьмегроші!!!
        sandbox:	1

    };

    var data	=	base64(JSON.stringify(order));
    var signature	=	sha1(LIQPAY_PRIVATE_KEY	+	data	+	LIQPAY_PRIVATE_KEY);

    res.send({
        success: true,
        order: order,
        data: data,
        signature: signature
    });
};