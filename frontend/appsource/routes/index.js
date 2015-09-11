var express = require('express');
var zerorpc = require("zerorpc");
var client = new zerorpc.Client();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
	res.render('home', { title: 'Home'});
});

router.post('/findgems', function(req, res, next) {
	client.connect("tcp://backend:5000");
	client.invoke("hello", req.body.body, function(error, response, more) {
		if(error) {
			console.error(error);
		}else {
			console.log(response);
			var gems = JSON.parse(response);
			var MAX_FONT_SIZE = 30;
			var MIN_FONT_SIZE = 15;
			var minWeight = gems[gems.length-1].weight;
			var maxWeight = gems[0].weight;
			console.log("minWeight:"+minWeight);
			console.log(gems.length);
			for(i=0;i<gems.length;i++){
				if(gems[i].weight == minWeight){
					gems[i].fontSize = MIN_FONT_SIZE;
				} else {
					gems[i].fontSize = ((gems[i].weight/maxWeight) * (MAX_FONT_SIZE-MIN_FONT_SIZE))+MIN_FONT_SIZE;
				}
			}
			console.log(gems);
			if(!more){
				console.log("Done");
			}
			res.write(JSON.stringify(gems));
		}
		res.end();
	});
});

module.exports = router;
