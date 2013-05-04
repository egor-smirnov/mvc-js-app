define(function() {

    var Ajax = function(settings) {

        /**
         * Based on https://gist.github.com/2794392
         *
         * Make a X-Domain request to url and callback.
         *
         */

        function xdr(url, method, data, callback, errback) {
            var req;

            if (XMLHttpRequest) {
                req = new XMLHttpRequest();

                if ('withCredentials' in req) {

                    req.open(method, url, true);
                    req.onerror = errback;

                    if(method == 'POST') {

                        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    }

                    req.onreadystatechange = function () {

                        if (req.readyState === 4) {

                            if (req.status >= 200 && req.status < 400) {

                                var rData = req.responseText;
                                var eData = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(rData.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + rData + ')');
                                var response = new Object(eData);

                                callback(response);
                            }
                            else {

                                errback({

                                    status: req.statusText,
                                    code: req.status,
                                    msg: 'Server Error Occurred'
                                });
                            }
                        }
                    };

                    req.send(data);
                }
            }
            else {

                errback({
                    msg: 'CORS Not Supported'
                });
            }
        }

        xdr(settings.url, settings.type, settings.data, settings.success, settings.error);
    };

    return Ajax;

});