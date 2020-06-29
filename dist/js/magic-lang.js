var MagicLang = (function (exports) {
    'use strict';

    var MagicLang = /** @class */ (function () {
        function MagicLang(opt) {
            var _this = this;
            this.currentLang = '';
            this.option = function (opt) {
                Object.assign(_this.options, opt);
            };
            this.load = function () {
                var lang = _this.options.lang;
                var path = _this.options.path;
                var query = window.location.search;
                var params = new URLSearchParams(query);
                var theParam = params.get(_this.options.urlParam);
                if (theParam != null && _this.options.langList.includes(theParam))
                    lang = theParam;
                _this.currentLang = lang;
                var object = new XMLHttpRequest();
                object.overrideMimeType("application/json");
                object.open('GET', path + '/' + lang + '.json', true);
                object.onreadystatechange = function () {
                    if (object.readyState == 4 && object.status == 200) {
                        _this.translate(JSON.parse(object.responseText));
                    }
                };
                object.addEventListener("error", function () {
                    console.error("magic-lang.js: Failed to load language files.");
                }, false);
                object.send(null);
            };
            this.translate = function (dicts) {
                var nodes = document.querySelectorAll('[' + _this.options.attr + ']');
                for (var i = 0; i < nodes.length; i++) {
                    var attrVal = nodes[i].getAttribute(_this.options.attr);
                    var dict = dicts[attrVal];
                    if (dict == '' || dict == null)
                        continue;
                    if (attrVal != null)
                        nodes[i].textContent = dict;
                }
            };
            this.options = {
                langList: ['en', 'id'],
                path: 'dist/lang',
                lang: 'en',
                attr: 'magiclang',
                urlParam: 'lang'
            };
            Object.assign({}, this.options, opt);
        }
        return MagicLang;
    }());
    var ml = new MagicLang();
    function init() {
        return ml.load();
    }
    function option(opt) {
        ml.option(opt);
    }

    exports.MagicLang = MagicLang;
    exports.init = init;
    exports.option = option;

    return exports;

}({}));
//# sourceMappingURL=magic-lang.js.map
