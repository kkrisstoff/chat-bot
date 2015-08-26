/**
 * REST request class
 *
 */

var http = require("http");
var https = require("https");

/**
 * getJSON: REST get request returning JSON object(s)
 *
 * @param options http options object
 * @param onResult callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult){
    //console.log("rest::getJSON");
    var req = http.request(options, function(res){
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = /*eval("(" + */output/* + ")")*/;
            //console.log(JSON.stringify(obj));
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            onResult(res.statusCode, output);
        });
    });
    req.on('error', function(err) {
        console.log('ERROR: ' + err.message);
        onResult(err);
    });
    req.end();
};

/**
 * postJSON: post a JSON object to a REST service
 *
 * @param options http options object
 * @param data post body
 * @param onResult callback to pass the results JSON object(s) back
 */
exports.postJSON = function(options, data, onResult){
    //console.log("rest::postJSON");
    //console.log(options);
    //console.log(data);
    var req = http.request(options, function(res){
        console.log('STATUS: ' + res.statusCode);
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var headers = res.headers;
//            var obj;
//            try {
//                obj = JSON.parse(output);//eval("(" + output + ")");
//            } catch (ex) {
//                obj = output;
//            }
//            console.log("##output:");
//            console.log(obj);
            onResult(res.statusCode, output, headers);
        });
    });
    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });
    if (data) req.write(data);
    req.end();
};

/**
 * deleteJSON: send a delete REST request with an id to delete
 *
 * @param options http server options object
 * @param itemId item id to delete
 * @param onResult callback to pass the results JSON object(s) back
 */
exports.deleteJSON = function (options, itemId, onResult){
//    console.log("rest::deleteJSON");
    var req = http.request(options, function(res){
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            //var obj = eval("(" + output + ")");
            onResult(res.statusCode, output);
        });
    });
    req.on('error', function(err) {
        console.log('error: ' + err.message);
        // res.send('error: ' + err.message);
    });
    req.end();
};
