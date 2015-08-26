(function (win) {
    function Network() {
        this.baseUrl = 'http://localhost:3030/';
        this.contentType = "application/json; charset=utf-8";
    }

    Network.prototype.ajaxRequest = function (obj) {
        var self = this,
            body = obj.body || null,
            timeout = obj.timeout || 20000,

            success = function (data, status, jqXHR) {
                //var parsedData = self.parseJSON(data);
                console.log('--------RESPONSE: ',data);
                obj.callback(data, jqXHR);
            },

            error = function (jqXHR, status, errorThrown) {
                if (typeof obj.errorCallback == "function") {
                    console.log(jqXHR);
                    obj.errorCallback(jqXHR);
                }
            },
            reqObj = {
                method: obj.type,
                url: self.baseUrl + obj.url,
                crossDomain: true,
                data: body,
                //contentType: self.contentType,
                //dataType: "text",
                timeout: timeout,
                success: success,
                error: error
            };

        console.log("---------REQUEST: ", reqObj);
        return $.ajax(reqObj);
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