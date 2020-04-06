var http = require("https");

var options = {
	"method": "GET",
	"hostname": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"port": null,
	"path": "/market/get-summary?region=US&lang=en",
	"headers": {
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		"x-rapidapi-key": "9e82c16a66msh76b918a35074380p1b9f5djsnd94311000023"
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();