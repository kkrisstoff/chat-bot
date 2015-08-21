(function (win) {
    function Network() {
        this.baseUrl = 'http://localhost:3030/';
        this.contentType = "application/json; charset=utf-8";
    }

    Network.prototype.ajaxRequest = function (obj) {
        var body = obj.body || null,
            timeout = obj.timeout || 20000,
            self = this,

            success = function (data, status, jqXHR) {
                var parsedData = self.parseJSON(data);
                console.log('--------RESPONSE: ',parsedData);
                console.log(typeof parsedData);
                obj.callback(parsedData, jqXHR);
            },

            error = function (jqXHR, status, errorThrown) {
                if (typeof obj.errorCallback == "function") {
                    console.log(jqXHR);
                    obj.errorCallback(jqXHR);
                }
            };

        console.log("---------REQUEST: ",obj);
        return $.ajax({
            type: obj.type,
            url: self.baseUrl+obj.url,
            crossDomain: true,
            data: body,
            contentType: self.contentType,
            dataType: "text",
            timeout: timeout,
            success: success,
            error: error
        });
    };

    Network.prototype.parseJSON = function (raw) {
        var parsedResponse,
            response = (raw !== '') ? raw : '{}';
        try {
            parsedResponse = JSON.parse(response);
        } catch (e) {
            console.error('Server Response is not JSON');
            console.error(e);
        }
        return parsedResponse;
    };

    win.network = new Network();
})(window);