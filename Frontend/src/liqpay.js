function base64(str) {
    return	new	Buffer(str).toString('base64');
}

varcrypto	=	require('crypto');
function	sha1(string) {
    varsha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

LiqPayCheckout.init({
    data: "Дані...",
    signature:	"Підпис...",
    embedTo:	"#liqpay",
    mode:	"popup"	//	embed	||	popup
}).on("liqpay.callback",	function(data){
    console.log(data.status);
    console.log(data);
}).on("liqpay.ready",	function(data){
//	ready
}).on("liqpay.close",	function(data){
//	close
});

varorder	=	{
    version:	3,
    public_key:	LIQPAY_PUBLIC_KEY,
    action:	"pay",
    amount:	568.00,
    currency:	"UAH",
    description:	"Опистранзакції",
    order_id:	Math.random(),
//!!!Важливощоб було1,	боінакше візьмегроші!!!
    sandbox:	1

};

vardata	=	base64(JSON.stringify(order));
varsignature	=	sha1(LIQPAY_PRIVATE_KEY	+	data	+	LIQPAY_PRIVATE_KEY);
