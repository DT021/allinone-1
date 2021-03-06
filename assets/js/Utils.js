define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils = (function () {
        function Utils() {
        }
        Utils.transformSearchparametersToAssocArray = function (prmstr) {
            var params = {};
            var prmarr = prmstr.split("&");
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                if (typeof params[tmparr[0]] !== 'undefined' && !Array.isArray(params[tmparr[0]]))
                    params[tmparr[0]] = [params[tmparr[0]]];
                if (Array.isArray(params[tmparr[0]]))
                    params[tmparr[0]].push(tmparr[1]);
                else
                    params[tmparr[0]] = tmparr[1];
            }
            return params;
        };
        ;
        Utils.getSearchParameters = function () {
            var paramsStart = window.location.href.indexOf('?');
            if (paramsStart != -1) {
                var paramsEnd = window.location.href.indexOf('#', paramsStart);
                paramsEnd = paramsEnd == -1 ? window.location.href.length : paramsEnd;
                return Utils.transformSearchparametersToAssocArray(window.location.href.substring(paramsStart + 1, paramsEnd));
            }
            return {};
        };
        ;
        Utils.getSearchParametersWithName = function (paramterName, defaultVal) {
            if (defaultVal === void 0) { defaultVal = null; }
            var param = Utils.getSearchParameters();
            console.log('url', param);
            console.log('urlDecode', JSON.stringify(decodeURIComponent(param)));
            if (typeof param[paramterName] !== 'undefined')
                return param[paramterName];
            return defaultVal;
        };
        return Utils;
    }());
    exports.default = Utils;
});
//# sourceMappingURL=Utils.js.map