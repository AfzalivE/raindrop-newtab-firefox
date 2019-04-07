(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BookmarkActions = Reflux.createActions([
    'load',
    'parseURL',
    'loadBookmark',
    'insertBookmark',
    'updateBookmark',
    'updateSelectedBookmarks',
    'removeBookmark',
    'removeSelectedBookmarks',
    'copySelectedBookmarks',
    'swapBookmarks',
    'saveAllSort',
    'syncMove',
    'initFavorites',
    'setSelected',
    'selectAll',
    'clearSelect',
    'reset'
]);

module.exports = BookmarkActions;

},{}],2:[function(require,module,exports){
var ChildrensActions = Reflux.createActions([
    'load',
    'swapCollections',
    'saveAllSort',
    'removeCollection'
]);

module.exports = ChildrensActions;

},{}],3:[function(require,module,exports){
var CollectionsActions = Reflux.createActions([
    'load',
    'setCurrent',
    'updateCollection',
    'insertCollection',
    'removeCollection',
    'updateCountCollection',
    'updateColorCollection'
]);

module.exports = CollectionsActions;

},{}],4:[function(require,module,exports){
var ModalFrameActions = Reflux.createActions([
    'show'
]);

module.exports = ModalFrameActions;

},{}],5:[function(require,module,exports){
module.exports = Reflux.createActions([
    'load'
]);

},{}],6:[function(require,module,exports){
var ToastActions = Reflux.createActions([
    'show',
    'close',
    'stopTimer'
]);

module.exports = ToastActions;

},{}],7:[function(require,module,exports){
var UserActions = Reflux.createActions([
    'load',
    'toggleGroup',
    'updateGroup',
    'insertGroup',
    'removeGroup',
    'swapGroups',
    'saveGroups',
    'updateCollection',
    'updateLanguage',
    'updateConfig',
    'swapCollections',
    'logOut',
    'signIn',
    'signUp'
]);

module.exports = UserActions;

},{}],8:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({
  displayName: "Helpers/Icon",

  shouldComponentUpdate: function(nextProps) {
    if (this.props.name != nextProps.name)
      return true;

    if (this.props.size != nextProps.size)
      return true;

    if (this.props.style != nextProps.style)
      return true;

    return false;
  },

  render: function() {
      var fullName = this.props.name+(this.props.size ? "-"+this.props.size : "");
      var useTag = '<use xlink:href="#'+fullName+'" />',
          className = "icn"+(this.props.size ? " icn-"+this.props.size : "");

      if (this.props.className)
        className += " "+this.props.className;

      return (
          React.createElement("svg", {key: "icon_"+fullName, className: className, "data-name": this.props.name, style: this.props.style||null, dangerouslySetInnerHTML: {__html: useTag}})
      );
  }
});

},{}],9:[function(require,module,exports){
module.exports = React.createClass({
    displayName: "Helpers/UserVoice",
	getInitialState: function() {
		return {
			user: UserStore.getUser(),
			id: 'feedback-uservoice-' + new Date().getTime().toString(),
			loading: true
		}
	},

	onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user,
            password: {},
            loading: false
        });
    },

    componentWillMount: function() {
        UserStore.onLoad();

        if (typeof window.UserVoice == "undefined"){
        	var key = "jlb8wSxdcZRy8qdRNzP1OQ";
        	if (t.getLang()=="ru_RU")
        		key = "Kbyq0Zv9xshiMnm61ryC7g";

        	var protocol = "";
        	if (window.location.protocol.indexOf("http")==-1)
        		protocol = "https:";

        	UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src=protocol+'//widget.uservoice.com/'+key+'.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();
    	}
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

    componentDidUpdate: function() {
    	if (UserStore.isLogged()){
	    	UserVoice.push(['identify',{
							email:		this.state.user.email,
							name:		this.state.user.fullName,
							type:		(UserStore.isPro() ? "PRO" : "Free"),
							account: {
								_id:	this.state.user._id,
								name:	this.state.user.fullName,
								plan:	(UserStore.isPro() ? "PRO" : "Free")
							}
						}]);
    	}

        UserVoice.push(['embed', '#' + this.state.id, {mode: this.props.mode}]);
    },

	render: function() {
		return (
			React.createElement("div", {id: this.state.id, className: "userVoice"})
		);
	}
});

},{}],10:[function(require,module,exports){
/** @jsx React.DOM */
var ToastStore = require('../../stores/Toast');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  displayName: "Toast",

    //mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            items: ToastStore.getToasts()
        }
    },

    onToastsChange: function(toasts) {
        if (this.isMounted()) this.setState({items:toasts});
    },

    componentDidMount: function() {
        this.unsubscribeToast = ToastStore.listen(this.onToastsChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeToast();
    },

    handleCloseItem: function(e) {
        Toasts.close({id: e.target.getAttribute("data-id")});
    },

    handleStopTimer: function(e) {
        //Toasts.stopTimer({id: e.target.getAttribute("data-id")});
    },

    render: function() {
        var _this = this;

        var items = this.state.items.map(function(item){
            var title = null;
            if (item.title)
                title = React.createElement("div", {className: "title"}, React.createElement("strong", null, item.title));

            var icon = "info-outline";
            if (item.status||"" == "error")
                icon = "cancel";

            return (
                React.createElement("li", {key: "toast_"+item.id, "data-id": item.id, id: "toast-"+item.id, onMouseEnter: _this.handleStopTimer, onClick: _this.handleCloseItem},
                    React.createElement("div", {className: "item-wrap status-"+item.status||""},
                        React.createElement("div", null, React.createElement(Icon, {name: icon})),
                        React.createElement("div", null,
                            title,
                            React.createElement("div", {className: "excerpt"}, item.text)
                        )
                    )
                )
            );
        });

        return (
            React.createElement(ReactCSSTransitionGroup, {component: "ul", transitionName: "toastanim", transitionEnterTimeout: 300, transitionLeaveTimeout: 300},
                items
            )
        );
    }
});

},{"../../stores/Toast":28}],11:[function(require,module,exports){
var host = "https://raindrop.io",
    apiPrefix = "/api/";

module.exports = {
    host: host,
    apiPrefix: host + apiPrefix,
    screenshotService: host + "/screenshot/?url=",
    contentTypes: ["link", "article", "image", "video"],

    proPage: host + "/static/pro",
    modalMargin: 30,

    languages: {
        "id_ID": "Bahasa Indonesia",
        "de_DE": "Deutsch",
        "en_US": "English",
        "es_ES": "Español",
        "fr_FR": "Français",
        "nl_NL": "Nederlands",
        "pl_PL": "Polski",
        "pt_BR": "Português (Brasil)",
        "sv_SE": "Svenska",
        "fi_FI": "Suomi",
        "tr_TR": "Türkçe",
        "kk_KZ": "Қазақ тілі",
        "ru_RU": "Русский",
        "uk_UA": "Українська мова",
        "ko_KR": "한국어",
        "zh_TW": "中文 (繁體)",
        "zh_CN": "中文（简体）",
        "hy_AM": "հայերեն"
    },

    backgroundImages: [
        {
            src: "",
            contrast: "black"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/reflectiononthelake.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/milleniumbridge.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/empireofthealps.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/brown-sunset.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/san-francisco.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/rocks.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/material-geometry.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/brown-rocks.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/material-view.jpg",
            contrast: "black"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/surf.jpg",
            contrast: "white"
        },
        {
            src: (window.pathPrefix||"") + "images/themes/silver.jpg",
            contrast: "black"
        }
    ],

    getBackgroundSelected: function() {
        var prefs = null, current = 0;
        try{
            if (localStorage.getItem("background-image")!=null)
              prefs = localStorage.getItem("background-image");
        }catch(e){}

        for(var i in this.backgroundImages)
            if (this.backgroundImages[i].src == prefs){
                current = i;
                break;
            }
        return current;
    },

    setBackground: function(pathPrefix) {
        var i = this.getBackgroundSelected();

        if (i>=0){
            var current = this.backgroundImages[i];

            /*var setBg = function() {
                if (document.getElementById('app-background')!=null)
                    document.getElementById('app-background').style.backgroundImage = "url("+(pathPrefix||"")+current.src+")";
            }
            if (document.getElementById('app-background')!=null)
                setBg();
            else
                document.addEventListener("DOMContentLoaded", setBg);*/

            //document.documentElement.style.backgroundImage = "url("+(pathPrefix||"")+current.src+")";
            document.documentElement.classList.remove("contrast-white");
            document.documentElement.classList.remove("contrast-black");
            document.documentElement.classList.add("contrast-"+current.contrast||"black");

            var trySetBg = function(bg) {
                var setBg = function(){
                    if (document.getElementById('app-background')!=null)
                        document.getElementById('app-background').style.backgroundImage='url("'+bg+'")';
                }
                if (document.getElementById('app-background')!=null)
                    setBg();
                else
                    document.addEventListener("DOMContentLoaded", setBg);
            };

            //Load from HTTP
            if (!current.src){
                trySetBg("about:blank");
                return;
            }

            var url = (pathPrefix||"")+current.src;
            var tempBg = null;
            try{localStorage.getItem(url);}catch(e){}

            if (tempBg == null){
                var xmlhttp = new XMLHttpRequest();
                var fileReader = new FileReader();

                xmlhttp.onload = function() {
                  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var blob = new Blob([xmlhttp.response], {type: "image/jpeg"});
                    fileReader.onload = function (evt) {
                        // Read out file contents as a Data URL
                        var result = evt.target.result;

                        trySetBg(result);
                        try{localStorage.setItem(url, result);}catch(e){}
                    };
                    // Load blob as Data URL
                    fileReader.readAsDataURL(blob);
                  }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.responseType = 'arraybuffer';
                xmlhttp.send();
            }else{
                trySetBg(tempBg);
            }
        }
    },

    defaultCollectionIcon: function() {
        return network.fixURL("/other/popup/img/icon-folder.png");
    },

    getImportLink: function() {
        if (typeof window.environment != "undefined")
            return network.fixURL("/other/import/import.html");
        else
            return "../import/index.html";
    }
}

},{}],12:[function(require,module,exports){
var request = require('superagent');

function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

module.exports = {
    timeout: 6000,

    makeFinalURL: function(url) {
      if (url.indexOf('http')==0)
        return url;
      else
        return consts.apiPrefix + url;
    },

    getText: function(url, callback) {
      request
          .get(url)
          .set('Content-Encoding', 'gzip')
          .end(function(err, res){
              if (typeof res == "undefined") {callback({});return;}
              callback((res||{}).text||null);
          });
    },

    "get": function(url,callback,conf) {
        conf = conf || {};

        request
            .get(this.makeFinalURL(url))
            .timeout(this.timeout)
            .set('Accept', 'application/json')
            .set('Content-Encoding', 'gzip')
            .end(function(err, res){
                if (typeof res == "undefined") {callback({});return;}
                if (conf.text)
                    callback(res.text||"");
                else
                    callback(res.body||{});
            });
    },

    post: function(url,data,callback) {
        request
            .post(this.makeFinalURL(url))
            .timeout(this.timeout)
            .send(data)
            .set('Accept', 'application/json')
            //.set('Content-Encoding', 'gzip')
            .end(function(err, res){
                if (typeof res == "undefined") {callback({});return;}
                callback(res.body||{});
            });
    },

    put: function(url,data,callback) {
        request
            .put(this.makeFinalURL(url))
            .timeout(this.timeout)
            .send(data)
            .set('Accept', 'application/json')
            //.set('Content-Encoding', 'gzip')
            .end(function(err, res){
                if (typeof res == "undefined") {callback({});return;}
                callback(res.body||{});
            });
    },

    del: function(url,callback) {
        request
            .del(this.makeFinalURL(url))
            .timeout(this.timeout)
            .set('Accept', 'application/json')
            //.set('Content-Encoding', 'gzip')
            .end(function(err, res){
                if (typeof res == "undefined") {callback({});return;}
                callback(res.body||{});
            });
    },

    upload: function(url, file, onProgress, callback) {
        request
            .post(this.makeFinalURL(url))
            .attach(file.name, file.file, file.file.name)
            .on('progress', function(e) {
                var progress = parseInt(e.percent||0);
                //if ((progress % 20 === 0)||(progress===100))
                    onProgress(progress);
            })
            .end(function(err, res){
                if (typeof res == "undefined") {callback({});return;}
                callback(res.body||{});
            });
    },

    getItem: function(key) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            return LST.getItem(key);
        else
            return null;
    },

    setItem: function(key, value) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            try {
                LST.setItem(key, value);
            } catch(e) {
                if (isQuotaExceeded(e)) {
                    // Storage full, maybe notify user or do some clean-up
                    LST.clear();
                }
            }
        else
            console.log("No localStorage access");
    },

    removeItem: function(key) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            LST.removeItem(key);
        else
            console.log("No localStorage access");
    },

    clear: function() {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            LST.clear();
        else
            console.log("No localStorage access");
    }
}

},{"superagent":"superagent"}],13:[function(require,module,exports){
module.exports = {
    getDomain: function(url){
      url = url || "";
      if(typeof document != "undefined"){
          var a = document.createElement('a');
          a.href = url;
          var host = a.hostname;
          delete a;
          return host;
      }else{
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
      }
    },

    fixURL: function(s) {
        try{
            s = s.trim();
        } catch(e) {if(e)s="";}

        if (s.indexOf('//')==0)
            return "http:"+s;
        else if (s.indexOf('/')==0)/*((s.indexOf('http://')!=0)&&(s.indexOf('https://')!=0)&&(s.indexOf('chrome-extension://')!=0))*/
            return "https://raindrop.io"+s;
        else
            return s;
    },

    favIcon: function(s) {
        return "https://raindrop.io/favicon/"+(s||"");
    },

    thumb: function(s,width) {
        try{
            s = s.trim();
        } catch(e) {if(e)s="";}

        if (typeof width == "undefined")
            width = 230;

        if (s!="") {
            if (s.indexOf('http')!=0)
                return this.fixURL(s);
            else if (s.indexOf('https://raindrop.io')==0)
                return s;
            else if (s.indexOf('http://raindrop.io')==0)
                return s;
            else
                return "https://raindrop.io/makethumb/?url=" + encodeURIComponent(s) + "&width=" + width;
        }
        else
            return "about:blank";
    },

    cleanDomain: function(domain) {
        try{
            var temp = domain.split('.'), maxSize = 2;
            if (temp.length>maxSize){
                if ((temp[ temp.length-2 ] == 'org')||(temp[ temp.length-2 ] == 'net')||(temp[ temp.length-2 ] == 'com')||(temp[ temp.length-2 ] == 'co'))
                    maxSize = 3;

                temp.splice(0, temp.length-maxSize );
                domain = temp.join('.');
            }
        }catch(e){}

        return domain;
    },

    linkTarget: function() {
        var _target = "_self";
        if ((window.environment||[]).indexOf("clipper")!=-1)
            _target = "_top";

        if ((window.environment||[]).indexOf("safari_popup")!=-1)
            _target = "_blank";

        return _target;
    },

    settingsURL: function() {
        var sURL = "../settings/settings.html#/settings";
        var _target = "_self";
        if ((window.environment||[]).indexOf("clipper")!=-1){
            _target = "_blank";
        }

        if (window.location.protocol.indexOf("http")!=-1) {
            sURL = "/settings#/settings";
        }
        if ((window.environment||[]).indexOf("mac")!=-1)
        {
            sURL = "../settings/settings.html?isMac#/settings";
        }

        return sURL;
    }
};

},{}],14:[function(require,module,exports){
require("moment/locale/id.js");
require("moment/locale/de.js");
require("moment/locale/es.js");
require("moment/locale/fr.js");
require("moment/locale/nl.js");
require("moment/locale/pl.js");
require("moment/locale/pt.js");
require("moment/locale/fi.js");
require("moment/locale/tr.js");
require("moment/locale/ru.js");
require("moment/locale/uk.js");
require("moment/locale/ko.js");
require("moment/locale/zh-cn.js");
require("moment/locale/zh-tw.js");

module.exports = {
    defaultLang: "en_US",
    currentLang: "en_US",
    //strings: require("./languages"),

    getLang: function() {
        return this.currentLang;
    },

    cleanLang: function(lang) {
      for(var i in consts.languages)
        if (i.indexOf(lang)==0){
          return i;
        }
      return this.defaultLang;
    },

    setLang: function(lang) {
        //get defautls if lang not presented
        if (typeof lang == "undefined"){
          lang = null;
          try{lang = localStorage.getItem("language")||null;}catch(e){}

          if (lang==null){
            var browserLang = navigator.language || navigator.userLanguage || "";
            try{
              browserLang = browserLang.trim().substr(0,2).toLowerCase();
            } catch(e) {if (e) browserLang=""; }

            if (browserLang!=""){
              lang = this.cleanLang(browserLang);
            }
          }
        }

        if (typeof consts.languages[lang] == "undefined")
            lang = this.defaultLang;

        this.currentLang = lang;
        try{localStorage.setItem("language", this.currentLang);}catch(e){}
        if (typeof moment != "undefined")
          moment.locale(this.currentLang);
        else if (typeof window.moment != "undefined")
          window.moment.locale(this.currentLang);
    },

    s: function(s) {
      if (typeof window["lang_"+this.currentLang] == "undefined")
        return s;

      if (typeof window["lang_"+this.currentLang][s] != "undefined")
          return window["lang_"+this.currentLang][s];
      else
          return s;
    },

    initJSfile: function() {
      /*var script = document.createElement("script");
      script.src = (window.pathPrefix||"")+"../common/js/"+this.currentLang+".js";
      document.head.appendChild(script);*/

      var _this = this;
      var xmlhttp = new XMLHttpRequest();
      var url = (window.pathPrefix||"")+"../common/js/"+this.currentLang+".json";

      var e = new Event('langLoaded');
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.responseText) {
              window["lang_"+_this.currentLang] = JSON.parse(xmlhttp.responseText);
              window.languageLoaded = true;
              window.dispatchEvent(e);
          }
      }
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    }
}

},{"moment/locale/de.js":"moment/locale/de.js","moment/locale/es.js":"moment/locale/es.js","moment/locale/fi.js":"moment/locale/fi.js","moment/locale/fr.js":"moment/locale/fr.js","moment/locale/id.js":"moment/locale/id.js","moment/locale/ko.js":"moment/locale/ko.js","moment/locale/nl.js":"moment/locale/nl.js","moment/locale/pl.js":"moment/locale/pl.js","moment/locale/pt.js":"moment/locale/pt.js","moment/locale/ru.js":"moment/locale/ru.js","moment/locale/tr.js":"moment/locale/tr.js","moment/locale/uk.js":"moment/locale/uk.js","moment/locale/zh-cn.js":"moment/locale/zh-cn.js","moment/locale/zh-tw.js":"moment/locale/zh-tw.js"}],15:[function(require,module,exports){
var ReactCSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup;

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			index:0
		}
	},

	handleForward: function(e) {
		e.preventDefault();
		if (this.props.images.length>this.state.index+1)
			this.setState({index: this.state.index+1});
		else
			this.setState({index: 0});
	},

	render: function() {
		var forward = null;
		if (this.props.images.length>1)
			forward = React.createElement("a", {href: "", className: "action-icon", onClick: this.handleForward}, React.createElement(Icon, {name: "forward"}));
		return (
			React.createElement("div", {className: "slider"},
				forward,

					React.createElement(ReactCSSTransitionGroup, {transitionName: "carousel"},
						React.createElement("img", {src: this.props.images[this.state.index], alt: "", key: this.props.images[this.state.index]})
					),

				React.createElement("img", {className: "space", src: this.props.images[this.state.index], alt: ""})
			)
		);
	}
});

},{"react/addons":"react/addons"}],16:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	componentDidMount: function() {
		this.props.changeTitle(t.s("exportBookmarks"));
	},

	render: function() {
		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("exportBookmarks"))
					),

					React.createElement("article", null,
						React.createElement("div", {className: "list"},
							React.createElement("a", {href: consts.host+"/api/export", target: window.targetLink, className: "item", download: true},
								React.createElement("span", {className: "title"}, t.s("allBookmarks")),
								React.createElement("span", {className: "block"},
									".html"
								),
								React.createElement("span", {className: "forward last-icon"}, React.createElement(Icon, {name: "chevron-right"}))
							)
						)
					)
				)
			)
		);
	}
});

},{}],17:[function(require,module,exports){
var UserVoice = require("../../app/components/Helpers/UserVoice");

module.exports = React.createClass({displayName: "exports",
	componentDidMount: function() {
		this.props.changeTitle(t.s("help"));
	},

	render: function() {
		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("help")),
						React.createElement("p", null, t.s("haveIdeas"))
					),

					React.createElement("article", null,
						React.createElement(UserVoice, null),
						React.createElement("br", null),
						"Send your emails to ", React.createElement("a", {href: "mailto:info@raindrop.io"}, "info@raindrop.io")
					)
				)
			)
		);
	}
});

},{"../../app/components/Helpers/UserVoice":9}],18:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	componentDidMount: function() {
		this.props.changeTitle(t.s("importBookmarks"));
	},

	render: function() {
		return (React.createElement("iframe", {src: consts.host+"/other/import/import.html"}));
	}
});

},{}],19:[function(require,module,exports){
var Slider = require("../components/Slider");

module.exports = React.createClass({displayName: "exports",
	componentDidMount: function() {
		this.props.changeTitle(t.s("install"));
	},

	render: function() {
		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("div", {className: "platforms"},
					React.createElement("div", {className: "item hide-on-clipper", style: {backgroundColor: "#707D87"}},
						React.createElement("img", {src: consts.host+"/img/marketing/teaser/extension.png", alt: ""}),
						React.createElement("div", {className: "title"},
							React.createElement("div", {className: "desc"}, t.s("browserPlugin")),
							React.createElement("div", {className: "links"},
								React.createElement("a", {href: "https://chrome.google.com/webstore/detail/raindropio/ldgfbffkinooeloadekpmfoklnobpien", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-chrome.png", height: "32", alt: ""})),
								React.createElement("a", {href: "https://addons.mozilla.org/firefox/addon/raindropio/", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-firefox.png", height: "32", alt: ""})),
								React.createElement("a", {href: "https://raindrop.io/releases/safari.safariextz", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-safari.png", height: "32", alt: ""})),
								React.createElement("a", {href: "https://addons.opera.com/extensions/details/raindropio-smart-bookmarks", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-opera.png", height: "32", alt: ""}))
							)
						)
					),

					React.createElement("div", {className: "item", style: {backgroundColor: "#4B88B7"}},
						React.createElement("img", {src: consts.host+"/img/marketing/teaser/ios.png", alt: ""}),
						React.createElement("div", {className: "title"},
							React.createElement("div", {className: "desc"}, "iPhone & iPad"),
							React.createElement("div", {className: "links"},
								React.createElement("a", {href: "https://itunes.apple.com/us/app/raindrop.io-keep-your-favorites/id1021913807", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-ios.png", height: "32", alt: ""}))
							)
						)
					),

					React.createElement("div", {className: "item hide-on-mac", style: {backgroundColor: "#4CB580"}},
						React.createElement("img", {src: consts.host+"/img/marketing/teaser/android.png", alt: ""}),
						React.createElement("div", {className: "title"},
							React.createElement("div", {className: "desc"}, "Android Phone & Tablet"),
							React.createElement("div", {className: "links"},
								React.createElement("a", {href: "https://play.google.com/store/apps/details?id=io.raindrop.raindropio&hl=en", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-android.png", height: "38", alt: ""}))
							)
						)
					),

					React.createElement("div", {className: "item", style: {backgroundColor: "#7753CD"}},
						React.createElement("img", {src: consts.host+"/img/marketing/teaser/mac.png", alt: ""}),
						React.createElement("div", {className: "title"},
							React.createElement("div", {className: "desc"}, "Mac OS X"),
							React.createElement("div", {className: "links"},
								React.createElement("a", {href: "https://itunes.apple.com/app/raindrop.io-keep-your-favorites/id957810159", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-mac.png", height: "32", alt: ""}))
							)
						)
					),

					React.createElement("div", {className: "item", style: {backgroundColor: "#E8674F"}},
						React.createElement("img", {src: consts.host+"/img/marketing/teaser/mac.png", alt: ""}),
						React.createElement("div", {className: "title"},
							React.createElement("div", {className: "desc"}, t.s("pro_speed_dial")),
							React.createElement("div", {className: "links"},
								React.createElement("a", {href: "https://chrome.google.com/webstore/detail/raindropio-new-tab-speed/knifgjkgmgdinjeecneiphoniamhgbof", target: "_blank"}, React.createElement("img", {src: consts.host+"/img/marketing/teaser/badge-chrome.png", height: "32", alt: ""}))
								/*<a href="https://raindrop.io/releases/newtab.xpi" target="_blank"><img src={consts.host+"/img/marketing/teaser/badge-firefox.png"} height="32" alt="" /></a>*/
							)
						)
					)
				)
			)
		);
	}
});

},{"../components/Slider":15}],20:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			user: UserStore.getUser(),
			loading: true
		}
	},

	onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user,
            password: {},
            loading: false
        });
    },

    componentWillMount: function() {
        UserStore.onLoad();
    },

    componentDidMount: function() {
    	this.props.changeTitle("Integration");
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

	render: function() {
		var dropbox = false, dropboxLink=consts.host+"/dropbox/authorize"; _this = this;
		try{dropbox=_this.state.user.dropbox.enabled;}catch(e){}
		if (dropbox)
			dropboxLink=consts.host+"/dropbox/revoke";

		if (!UserStore.isPro())
			dropboxLink="#/settings/pro"

		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, "Integration")
					),

					React.createElement("article", null,
						React.createElement("div", {className: "list"},
							React.createElement("a", {href: dropboxLink, target: window.targetLink, className: "item"},
								React.createElement("span", {className: "title", style: {flex:1}},
									t.s("pro_dropbox"),
									React.createElement("span", {className: "subtitle"}, t.s("pro_dropboxD"))
								),
								React.createElement("span", {className: "last-icon"},
									React.createElement("div", {className: "extra-checkbox"+(dropbox?" active":"")})
								)
							)
						)
					)
				)
			)
		);
	}
});

},{}],21:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			user: UserStore.getUser(),
			loading: true
		}
	},

	onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user,
            loading: false
        });
    },

    componentWillMount: function() {
        UserStore.onLoad();
    },

    componentDidMount: function() {
    	this.props.changeTitle(t.s("upgradeAccount"));
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

	renderFree: function() {
		if (this.state.loading)
			return (
				React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("loading"), "...")
					)
				)
				)
			);

		return (
			React.createElement("section", null,
				React.createElement("header", null,
					React.createElement("h2", null, t.s("upgradeAccount"))
				),

				React.createElement("article", null,
					React.createElement("div", {className: "list"},
						React.createElement("div", {className: "text"},
							React.createElement("img", {className: "pull-right", src: consts.host+"/img/v3/pro-buy.png", width: "109", alt: ""}),
							React.createElement("strong", null, t.s("footerProAd"), " ", t.s("footerProAdD"), ":"),
							React.createElement("ul", null,
								React.createElement("li", null, t.s("nestedCollections")),
								React.createElement("li", null, t.s("dropboxBackup")),
								React.createElement("li", null, t.s("pro_nextFeatures")),
								React.createElement("li", null, t.s("pro_support")),
								React.createElement("li", null, t.s("pro_noAds"))
							)
						),

						React.createElement("a", {href: consts.host+"/pages/pricing", target: window.targetLink, className: "item"},
							React.createElement("span", {className: "title", style: {flex:1}}, t.s("compareFreePro")),
							React.createElement("span", {className: "forward"}, React.createElement(Icon, {name: "chevron-right"}))
						),

						React.createElement("a", {href: consts.host+"/static/pro", target: window.targetLink, className: "item accent"},
							React.createElement("span", {className: "title"}, t.s("upgradeToPro")),
							React.createElement("span", {className: "forward"}, React.createElement(Icon, {name: "chevron-right"}))
						)
					)
				)
			)
		);
	},

	renderPro: function() {
		return (
			React.createElement("section", null,
				React.createElement("header", null,
					React.createElement("h2", null, t.s("upgradeAccount"))
				),

				React.createElement("article", null,
					React.createElement("div", {className: "list"},
						React.createElement("div", {className: "text"},
							React.createElement("strong", {style: {textTransform:"capitalize"}},
								React.createElement(Icon, {name: "done", className: "icn-green pull-right"}),
								t.s("until") + " " + moment(UserStore.getUser().proExpire).format("ll")
							)
						),

						React.createElement("a", {href: consts.host+"/static/pro", target: window.targetLink, className: "item accent"},
							React.createElement("span", {className: "title"}, t.s("renewPro")),
							React.createElement("span", {className: "forward"}, React.createElement(Icon, {name: "chevron-right"}))
						)
					)
				)
			)
		);
	},

	render: function() {
		return (
			React.createElement("div", {className: "page-wrap"},
				UserStore.isPro() ? this.renderPro() : this.renderFree(),

				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, "Q&A")
					),

					React.createElement("article", null,
						React.createElement("div", {className: "list"},
							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "Where do I get started?"),
								React.createElement("p", null,
									"Start with the free plan — it’s the best choice if you want to test our apps. Plus, it’s completely free."
								)
							),

							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "Do I have to pay for my nested collections to keep them accessible?"),
								React.createElement("p", null,
									"No. Don’t worry, we won’t charge you for hosting your nested collections. The great news is that all your nested collections remain accessible even if your subscription ends or you’ve switched to the free plan."
								)
							),

							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "How can I cancel my subscription?"),
								React.createElement("p", null,
									"At any time you can cancel the subscription and get your money back. To do this, please ", React.createElement("a", {href: "#/settings/help"}, "contact us"), "."
								)
							),

							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "What happens at the end of the paid period?"),
								React.createElement("p", null,
									"When the period of paid subscription ends you automatically switch to the free plan. All your collections (including nested) will remain accessible, but if you want to create more nested collections you will have to switch to paid plan. Also Dropbox backup will be stopped."
								)
							),

							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "Is there any discount for an annual subscription?"),
								React.createElement("p", null,
									"Yes, we offer a 20% discount if you choose annual subscription."
								)
							),

							React.createElement("div", {className: "text"},
								React.createElement("strong", null, "Got more questions?"),
								React.createElement("p", null,
									"We are happy to help you. ", React.createElement("a", {href: "#/settings/help"}, "Contact us"), "."
								)
							)
						)
					)
				)
			)
		);
	}
});

},{}],22:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			user: UserStore.getUser(),
			loading: true
		}
	},

	onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user,
            password: {},
            loading: false
        });
    },

    componentWillMount: function() {
        UserStore.onLoad();
    },

    componentDidMount: function() {
    	this.props.changeTitle(t.s("profile"));
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

    handleFullNameChange: function(e) {
    	this.state.user.fullName = e.target.value;
        this.setState({user: this.state.user});
    },

    handleEmailChange: function(e) {
    	this.state.user.email = e.target.value;
        this.setState({user: this.state.user});
    },

    handleSaveProfile: function(e) {
    	e.preventDefault();

    	var update = {fullName: this.state.user.fullName}, _this = this;
    	if (this.state.user.email){
    		update.email = this.state.user.email;

    		if (!this.state.user.password){
    			update.newpassword = this.state.password.next;
    		}
    	}

    	this.setState({loading:true});
    	Api.put("user", update, function(json) {
    		if (json.result)
    			Toasts.show({text: t.s('saveSuccess')});
    		else
    			Toasts.show({text: t.s('server'+json.error)});

    		UserStore.onLoad();
    	});
    },

    handleLangChange: function(e) {
    	e.preventDefault();
        var select = React.findDOMNode(this.refs.lang);
        var lang = select.options[select.selectedIndex].value;

        this.setState({loading:true});
        UserActions.updateLanguage({lang:lang}, function(){
        	t.setLang(lang);
            location.reload();//window.history.back();
        });
    },


    handleOldPasswordChange: function(e) {
    	this.state.password.old = e.target.value;
        this.setState({password: this.state.password});
    },

    handleNewPasswordChange: function(e) {
    	this.state.password.next = e.target.value;
        this.setState({password: this.state.password});
    },

    handleSavePassword: function(e) {
    	e.preventDefault();
    	var update = {
    		oldpassword: this.state.password.old,
    		newpassword: this.state.password.next,
    		email: this.state.user.email,
    		fullName: this.state.user.fullName
    	}, _this = this;

    	this.setState({loading:true});
    	Api.put("user", update, function(json) {
    		if (json.result)
    			Toasts.show({text: t.s('saveSuccess')});
    		else
    			Toasts.show({text: t.s('server'+json.error)});

    		UserStore.onLoad();
    	});
    },

    handleRemoveAccount: function(e) {
    	e.preventDefault();
    	if (confirm(t.s("removeAccountD")))
    		window.location = consts.host + "/api/user-remove";
    },

	render: function() {
		if (this.state.loading)
			return (
				React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("loading"), "...")
					)
				)
				)
			);

		if (!UserStore.isLogged())
			return (
				React.createElement("div", {className: "page-wrap"})
			);

		var languages = [];
		for(var code in consts.languages)
        	languages.push(
        		React.createElement("option", {selected: t.getLang()==code, value: code}, consts.languages[code])
        	);

        var emailPassword = null;
        if (!this.state.user.password)
        	emailPassword = (
        		React.createElement("label", {className: "item"},
					React.createElement("span", {className: "title"}, t.s("password")),
					React.createElement("span", {className: "block"},
						React.createElement("input", {type: "password", onChange: this.handleNewPasswordChange, placeholder: t.s("newPassword"), required: true})
					)
				)
        	);

		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("basicData")),
						React.createElement("p", null,
							t.s("changeAvatarInfo")
						)
					),

					React.createElement("article", null,
						React.createElement("form", {onSubmit: this.handleSaveProfile},
							React.createElement("div", {className: "list"},
								React.createElement("label", {className: "item"},
									React.createElement("span", {className: "title"}, t.s("yourName")),
									React.createElement("span", {className: "block"},
										React.createElement("input", {type: "text", defaultValue: this.state.user.fullName, onChange: this.handleFullNameChange, required: true})
									)
								),

								React.createElement("label", {className: "item"},
									React.createElement("span", {className: "title"}, "Email"),
									React.createElement("span", {className: "block"},
										React.createElement("input", {type: "email", defaultValue: this.state.user.email, onChange: this.handleEmailChange, placeholder: "your@email.com", required: true})
									)
								),

								emailPassword,

								React.createElement("label", {className: "item"},
									React.createElement("span", {className: "title"}, t.s("language")),
									React.createElement("span", {className: "block"},
										React.createElement("select", {ref: "lang", onChange: this.handleLangChange},
											languages
										)
									)
								),

								React.createElement("div", {className: "item"},
									React.createElement("span", {className: "title"}, "ID"),
									React.createElement("span", {className: "block"},
										this.state.user._id
									)
								),

								React.createElement("a", {href: "https://gravatar.com", target: "_blank", className: "item"},
									React.createElement("span", {className: "title", style: {flex:1}}, t.s("changeAvatar")),
									React.createElement("span", {className: "forward"}, React.createElement(Icon, {name: "chevron-right"}))
								)
							),

							React.createElement("div", {className: "actions"},
								React.createElement("input", {type: "submit", value: t.s("save")})
							)
						)
					)
				),

				React.createElement("section", {className: this.state.user.password ? "" : "hidden"},
					React.createElement("header", null,
						React.createElement("h2", null, t.s("changePassword"))
					),

					React.createElement("article", null,
						React.createElement("form", {onSubmit: this.handleSavePassword},
							React.createElement("div", {className: "list"},
								React.createElement("label", {className: "item"},
									React.createElement("span", {className: "title"}, t.s("currentPassword")),
									React.createElement("span", {className: "block"},
										React.createElement("input", {type: "password", onChange: this.handleOldPasswordChange, placeholder: t.s("currentPassword"), required: true})
									)
								),

								React.createElement("label", {className: "item"},
									React.createElement("span", {className: "title"}, t.s("newPassword")),
									React.createElement("span", {className: "block"},
										React.createElement("input", {type: "password", onChange: this.handleNewPasswordChange, placeholder: t.s("newPassword"), required: true})
									)
								)
							),

							React.createElement("div", {className: "actions"},
								React.createElement("a", {href: consts.host+"/account/reset", target: "_blank"}, t.s("recoverPassword")),
								React.createElement("input", {type: "submit", value: t.s("changePassword")})
							)
						)
					)
				),

				React.createElement("section", null,
					React.createElement("article", null,
						React.createElement("div", {className: "actions"},
							React.createElement("a", {href: "", onClick: this.handleRemoveAccount}, t.s("removeAccount"))
						)
					)
				)
			)
		);
	}
});

},{}],23:[function(require,module,exports){
var CollectionsActions = require('../../actions/Collections');
var CollectionsStore = require('../../stores/Collections');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			collections: CollectionsStore.getCollections(),
			childrens: []
		};
	},

	onCollectionsChange: function(collections) {
        if (this.isMounted())
        this.setState({
            collections: collections
        });
    },

    componentWillMount: function() {
        CollectionsStore.onLoad();
    },

    componentDidMount: function() {
    	this.props.changeTitle("RSS");

    	var _this = this;
        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        Api.get("childrens", function(json){
        	_this.setState({childrens: json.items||[]});
        });
    },

    componentWillUnmount: function() {
        this.unsubscribeCollections();
    },

    renderItem: function(item) {
    	var cover = consts.defaultCollectionIcon();
        try{cover = network.fixURL(item.cover[0]);}catch(e){}

    	return (
    		React.createElement("a", {href: item.link, target: window.targetLink, className: "item"},
				React.createElement("span", {className: "title"}, item.title),
				React.createElement("span", {className: "block"},
					item.link
				),
				React.createElement("span", {className: "last-icon", style: {marginLeft:"20px"}}, React.createElement("img", {src: cover, className: "icon", height: "24", alt: ""}))
			)
    	);
    },

	render: function() {
		var _this = this;

		var collections = this.state.collections.concat(this.state.childrens);
		collections = _.sortBy(collections, "title");

		var privateList = [];
		collections.forEach(function(item){
			if ((item._id>0)&&(item.uniqKey))
			privateList.push(_this.renderItem({
				title: item.title,
				link: consts.host+"/feed/"+item.uniqKey,
				cover: item.cover
			}));
		});


		var publicList = [];
		collections.forEach(function(item){
			if (item._id>0)
			publicList.push(_this.renderItem({
				title: item.title,
				link: consts.host+"/collection/"+item._id+"/feed",
				cover: item.cover
			}));
		});


		return (
			React.createElement("div", {className: "page-wrap"},
				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("privateRSSfeed")),
						React.createElement("p", null, t.s("feedWarning"))
					),

					React.createElement("article", null,
						React.createElement("div", {className: "list"},
							this.renderItem({title: t.s("myCollections"), link: consts.host+"/feeds/"+UserStore.getUser().uniqKey}),
							this.renderItem({title: t.s("orAlternativeFeed"), link: consts.host+"/feed/"+UserStore.getUser().uniqKey}),
							privateList
						)
					)
				),

				React.createElement("section", null,
					React.createElement("header", null,
						React.createElement("h2", null, t.s("publicRSSfeed"))
					),

					React.createElement("article", null,
						React.createElement("div", {className: "list"},
							publicList
						)
					)
				)
			)
		);
	}
});

},{"../../actions/Collections":3,"../../stores/Collections":26}],24:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	contextTypes: {
        router: React.PropTypes.func
    },

    mixins: [ Router.State ],

    getInitialState: function() {
		return {
			user: UserStore.getUser(),
			loading: true,
			sidebar: false,
			title: ""
		}
	},

	onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user,
            password: {},
            loading: false
        });
    },

    componentWillMount: function() {
        UserStore.onLoad();
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

    componentWillReceiveProps: function(p) {
    	this.handleSidebar();
    },

    handleSidebar: function(e) {
    	if (e)
    	e.preventDefault();

    	var sidebar = !this.state.sidebar;
    	this.setState({sidebar: sidebar});

    	if (sidebar)
    		document.documentElement.classList.add("sidebar-open");
    	else
    		document.documentElement.classList.remove("sidebar-open");
    },

    handleTitle: function(title) {
    	this.setState({title: title});
    },

    renderLogged: function() {
    	var importLink = React.createElement("a", {href: "#/settings/import"}, t.s("importBookmarks"));
    	if (window.environment.indexOf("mac")!=-1)
    		importLink = React.createElement("a", {href: consts.host+"/other/import/import.html", target: "_blank"}, t.s("importBookmarks"));

    	return (
    		React.createElement("menu", null,
				React.createElement("li", {className: "section"},
					t.s("account")
				),
				React.createElement("li", {className: "item hide-on-mac "+(this.context.router.isActive("pro") ? "active" : "")},
					React.createElement("a", {href: "#/settings/pro"}, t.s("upgradeAccount"))
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("profile") ? "active" : "")},
					React.createElement("a", {href: "#/settings"}, t.s("profile"))
				),

				React.createElement("li", {className: "section"},
					t.s("basicData")
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("import") ? "active" : "")},
					importLink
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("export") ? "active" : "")},
					React.createElement("a", {href: "#/settings/export"}, t.s("exportBookmarks"))
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("integration") ? "active" : "")},
					React.createElement("a", {href: "#/settings/integration"}, "Integration")
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("rss") ? "active" : "")},
					React.createElement("a", {href: "#/settings/rss"}, "RSS")
				),

				React.createElement("li", {className: "section"}

				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("install") ? "active" : "")},
					React.createElement("a", {href: "#/settings/install"}, t.s("install"), "   ", React.createElement(Icon, {name: "apple"}), " ", React.createElement(Icon, {name: "android", className: "hide-on-mac"}), " ", React.createElement(Icon, {name: "google-chrome"}), " ", React.createElement(Icon, {name: "laptop"}))
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("help") ? "active" : "")},
					React.createElement("a", {href: "#/settings/help"}, t.s("help"))
				),
				React.createElement("li", {className: "item "+(!UserStore.isPro() ? "hidden" : "")},
					React.createElement("a", {href: consts.host+"/static/upcoming", target: window.targetLink}, t.s("pro_nextFeatures"))
				),
				React.createElement("li", {className: "item"},
					React.createElement("a", {href: consts.host+"/dev", target: window.targetLink}, t.s("forDevelopers"))
				)
			)
    	);
    },

    renderStatic: function() {
    	return (
    		React.createElement("menu", null,
				React.createElement("li", {className: "section"},
					"Raindrop.io"
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("install") ? "active" : "")},
					React.createElement("a", {href: "#/settings/install"}, t.s("install"))
				),
				React.createElement("li", {className: "item "+(this.context.router.isActive("help") ? "active" : "")},
					React.createElement("a", {href: "#/settings/help"}, t.s("help"))
				),
				React.createElement("li", {className: "item"},
					React.createElement("a", {href: consts.host+"/dev", target: window.targetLink}, t.s("forDevelopers"))
				)
    		)
    	);
    },

	render: function() {
		var backURL = "/";

		if (window.environment.indexOf("extension")!=-1)
			backURL = "../../app/index.html";

		if (window.environment.indexOf("mac")!=-1)
			backURL = "../mac/index.html";

		if (window.environment.indexOf("clipper")!=-1)
			backURL = "../app/index.html"+window.location.search;

		return (
			React.createElement("div", {id: "page"},
				React.createElement("div", {id: "sidebar"},
					React.createElement("header", {className: "desktop_hide"},
						React.createElement("a", {href: "", onClick: this.handleSidebar},
							React.createElement(Icon, {name: "clear"})
						)
					),

					UserStore.isLogged() ? this.renderLogged() : this.renderStatic()
				),
				React.createElement("div", {id: "content"},

					React.createElement(DocumentTitle, {title: this.state.title||""}),
					React.createElement(RouteHandler, {changeTitle: this.handleTitle})
				),

				React.createElement("div", {id: "toolbar"},
					React.createElement("a", {href: backURL, id: "go-back"}, React.createElement(Icon, {name: "back"})),
					React.createElement("a", {href: "", className: "title", onClick: this.handleSidebar},
						this.state.title,
						React.createElement(Icon, {name: "arrow-down", size: "small", className: "mobileMenu desktop_hide"})
					)
				)
			)
		);
	}
});

},{}],25:[function(require,module,exports){
{
	React = require('react');
	Reflux = require('reflux');

	/* Const */
	consts = require('../app/config');

	/* Translate */
	Api = require('../modules/api.js');
	t = require('../modules/translate');
	window.moment = require('moment');
	t.setLang();
	t.initJSfile();

	/* Helpers */
	_ = require("lodash");
	network = require('../modules/network.js');
	S = require('string');
	Icon = require('../app/components/Helpers/Icon.js');

	/* Caching */
	ls = require('localforage');
	/*chromeStorageLocal = require('../modules/chromestoragelocal.js');
	ls.defineDriver(chromeStorageLocal).then(function() {
		ls.setDriver([chromeStorageLocal._driver, ls.INDEXEDDB, ls.LOCALSTORAGE]);
	});*/
}

Toasts = require('../actions/Toast');
DocumentTitle = require('react-document-title');

/* User */
UserActions = require('../actions/User');
UserStore = require('../stores/User');

/* Routing */
Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Redirect = Router.Redirect;
RouteHandler = Router.RouteHandler;
Link = Router.Link;

var AppRoute = React.createClass({displayName: "AppRoute",
    render: function () {
        return (
            React.createElement(RouteHandler, null)
        );
    }
});

var commonComponents = {
  loaded: false,
  load: function() {
    if (this.loaded) return false;

    UserStore.onLoad();

    var eToast = document.getElementById('app-toast');

    var Toast = require('../app/components/Toast.js');
    React.render(React.createElement(Toast, null), eToast);

    this.loaded = true;
  }
}

window.addEventListener((window.languageLoaded ? "DOMContentLoaded" : "langLoaded"), function() {
	var eContent = document.getElementById('app-content');

	var SettingsRoute = require("./routes/Settings");

	var ProRoute = require("./routes/Pro");
	var ProfileRoute = require("./routes/Profile");
	var ImportRoute = require("./routes/Import");
	var ExportRoute = require("./routes/Export");
	var IntegrationRoute = require("./routes/Integration");
	var RSSRoute = require("./routes/RSS");
	var InstallRoute = require("./routes/Install");
	var HelpRoute = require("./routes/Help");

	var routes = (
	    React.createElement(Route, {path: "/", handler: AppRoute},
	        React.createElement(Route, {name: "settings", path: "/settings", handler: SettingsRoute},
	        	React.createElement(DefaultRoute, {name: "profile", handler: ProfileRoute}),
	        	React.createElement(Route, {name: "pro", path: "pro", handler: ProRoute}),
	        	React.createElement(Route, {name: "import", path: "import", handler: ImportRoute}),
	        	React.createElement(Route, {name: "export", path: "export", handler: ExportRoute}),
	        	React.createElement(Route, {name: "integration", path: "integration", handler: IntegrationRoute}),
	        	React.createElement(Route, {name: "rss", path: "rss", handler: RSSRoute}),
	        	React.createElement(Route, {name: "install", path: "install", handler: InstallRoute}),
	        	React.createElement(Route, {name: "help", path: "help", handler: HelpRoute})
	        ),
	        React.createElement(Redirect, {to: "settings"})
	    )
	);

	/* Init */
	Router.run(routes, function (Handler,s) {
	  var r=null;
	  try {r = s.routes[1].name; r = s.routes[2].name;}catch(e){}
	  document.body.setAttribute('data-route', r||"");

	  React.render(React.createElement(Handler, null), eContent, function(){commonComponents.load();});
	});
});

window.environment = []; window.targetLink = "_self";
if (window.location.protocol.indexOf("http")==-1){
	window.environment.push("extension");
}
else{
	window.environment.push("site");
}

if (window.location.href.indexOf("clipper/")!=-1){
	window.environment.push("clipper");
	//window.targetLink = "_blank";
}else if (window.location.search.indexOf("isMac")!=-1){
	window.environment.push("mac");
	window.targetLink = "_blank";
}

if (window.location.href.indexOf("only_current")!=-1)
	window.environment.push("only_current");

//OS
if (navigator.appVersion.indexOf("Win")!=-1) window.environment.push("Windows");
if (navigator.appVersion.indexOf("Mac")!=-1) window.environment.push("MacOS");
if (navigator.appVersion.indexOf("X11")!=-1) window.environment.push("UNIX");
if (navigator.appVersion.indexOf("Linux")!=-1) window.environment.push("Linux");

for(var i in window.environment)
	document.documentElement.classList.add(window.environment[i]);

},{"../actions/Toast":6,"../actions/User":7,"../app/components/Helpers/Icon.js":8,"../app/components/Toast.js":10,"../app/config":11,"../modules/api.js":12,"../modules/network.js":13,"../modules/translate":14,"../stores/User":29,"./routes/Export":16,"./routes/Help":17,"./routes/Import":18,"./routes/Install":19,"./routes/Integration":20,"./routes/Pro":21,"./routes/Profile":22,"./routes/RSS":23,"./routes/Settings":24,"localforage":"localforage","lodash":"lodash","moment":"moment","react":"react","react-document-title":"react-document-title","react-router":"react-router","reflux":"reflux","string":"string"}],26:[function(require,module,exports){
var CollectionsActions = require('../actions/Collections');
var ChildrensActions = require('../actions/Childrens');
var UserActions = require('../actions/User');
var StatsStore = require('../stores/Stats');
var BookmarksActions = require('../actions/Bookmarks');

var _collections = [], _currentId = -2, _loaded = false, _speed = "sync";

if (typeof isIOSapp != "undefined")
    _currentId = 0;

var _defaults = [];
var setDefaults = function() {
    _defaults = [
        {
            _id: 0,
            title: t.s("all"),
            view: "list"
        },
        {
            _id: -2,
            title: t.s("favoriteSites"),
            view: "simple",
            //color: "243,73,94"
        },
        {
            _id: -1,
            title: t.s("defaultCollection--1"),
            view: "list",
            //color: "245,166,35"
        },
        {
            _id: -99,
            title: t.s("defaultCollection--99"),
            view: "list"
        },

        {
            _id: -3,
            title: t.s("articles"),
            view: "list"
        },

        {
            _id: -4,
            title: t.s("images") + " " + t.s("und") + " " + t.s("videos").toLowerCase(),
            view: "masonry"
        },
    ];
    for(var i in _defaults) {
        _defaults[i].view = Api.getItem("collection/" + _defaults[i]._id + "/view") || _defaults[i].view;
        _defaults[i].cover = [(window.pathPrefix||"") + "../common/images/collection"+_defaults[i]._id+".png"];
    }
}

if (document){
    if (window.languageLoaded)
        setDefaults();
    else
        window.addEventListener("langLoaded", setDefaults);
}
else
    setDefaults();

var CollectionsStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(CollectionsActions.load, this.onLoad);
        this.listenTo(CollectionsActions.setCurrent, this.onSetCurrent);
        this.listenTo(CollectionsActions.updateCollection, this.onUpdateCollection);
        this.listenTo(CollectionsActions.insertCollection, this.onInsertCollection);
        this.listenTo(CollectionsActions.removeCollection, this.onRemoveCollection);
        this.listenTo(CollectionsActions.updateCountCollection, this.onUpdateCountCollection);
        this.listenTo(CollectionsActions.updateColorCollection, this.onUpdateColorCollection);
    },

    _saveCache: function() {
        switch(_speed){
            case "async":
                try{ls.setItem('collections', _collections).then(function(){}).catch(function(e){})}catch(e){};
            break;

            case "sync":
                Api.setItem('collections', JSON.stringify(_collections));
            break;
        }
    },

    onLoad: function(params) {
        var _this = this;

        if (!_loaded) {
            Api.get("collections", function (json) {
                _loaded = true;

                if (json.result){
                    _collections = json.items || [];

                    _this._insertDefaults();

                    _this.trigger(_collections);
                    _this._saveCache();

                    UserStore._checkGroupsStability();

                    try{window.Intercom('update', {collections: _collections.length})}catch(e){}
                }
            });
        }
    },

    onLoadId: function(id, callback) {
        var _this = this;
        var index = _.findIndex(_collections, { _id: id });
        if (index==-1)
        Api.get("collection/"+id, function(json){
            if (json.result) {
                _this._updateOrInsertItem(json.item);
                _this.trigger(_collections);
            }

            if (typeof callback == 'function')
                callback();
        });else{
            if (typeof callback == 'function')
                callback();
        }
    },

    onSetCurrent: function(id) {
        if (id == null){
            _currentId = null;
            this.trigger(_collections);
            return;
        }

        _currentId = parseInt(id);

        var index = _.findIndex(_collections, { _id: _currentId });
        if (index!=-1)
            this.trigger(_collections);
        else
            this.onLoadId(_currentId);
    },

    onUpdateCollection: function(params, callback){
        var _this = this, updateGroups = false;

        if (typeof params.updateModel == "undefined")
            params.updateModel = true;

        if ((typeof params.item.group == 'number')||(typeof params.item.parentId == 'number'))
            updateGroups = true;

        if (typeof params.item.group == 'number') {
            params.item.parentId = "root";
        }else{
            delete params.item.group;
        }
        if (updateGroups)
            UserActions.updateCollection({_id: params.item._id, group: params.item.group});

        Api.put("collection/" + params.item._id, params.item, function (json) {
            if (json.result) {
                _this._updateOrInsertItem(json.item);

                if (!params.silent)
                    Toasts.show({text: t.s("saveSuccess"), title: params.item.title});
            }else{
                if (!params.silent)
                    Toasts.show({text: strings.getErrorFromJSON(json), title: params.item.title, status: "error"});
            }

            if (typeof callback == 'function')
                callback((json.item || [])._id || false);
        });

        var index = _.findIndex(_collections, { _id: parseInt(params.item._id) });

        if ((index!=-1)&&(params.updateModel)) {
            for(var i in params.item)
                _collections[index][i] = params.item[i];

            this.trigger(_collections);

            if (_collections[index]._id <= 0){
                for(var i in params.item)
                    Api.setItem("collection/" + params.item._id + "/" + i, params.item[i]);
            }

            this._saveCache();
        }
    },

    onInsertCollection: function(params, callback){
        var _this = this;

        Api.post("collection", params.item, function(json){
            if (json.result){
                _collections.push(json.item);

                if (typeof params.item.group == 'number') {
                    params.item.parentId = "root";
                    UserActions.updateCollection({_id: json.item._id, group: params.item.group});
                }

                if (!params.silent)
                    Toasts.show({text: t.s("addSuccess"), title: params.item.title});

                _this.trigger(_collections);
                _this._saveCache();
            }else{
                if (!params.silent)
                    Toasts.show({text: strings.getErrorFromJSON(json), title: params.item.title, status: "error"});
            }

            if (typeof callback == 'function')
                callback( (json.item||[])._id||false );
        });
    },

    onRemoveCollection: function(params,callback) {
        var _this = this;

        var removeNow = function(){
            Api.del("collection/"+params.item._id, function(json){
                if (json.result){
                    if (params.item._id>0){
                        var index = _.findIndex(_collections, {_id:params.item._id});
                        if (index!=-1)
                            _collections.splice(index,1);
                    }

                    Toasts.show({text: (params.item._id != -99 ? t.s("removeCollectionSuccess") : t.s("trashEmpty")), title: params.item.title});

                    _this.trigger(_collections);
                    _this._saveCache();

                    ChildrensActions.removeCollection(params);
                    UserActions.saveGroups();

                    if (_this.getCurrentId() == params.item._id){
                        BookmarksActions.reset(true);
                    }
                }else{
                    Toasts.show({text: strings.getErrorFromJSON(json), title: params.item.title, status: "error"});
                }

                if (typeof callback == 'function')
                    callback( json.result );
            });
        }

        if (!params.silent){
            if (confirm(t.s("collectionDeleteConfirm")))
                removeNow();
            else{
                if (typeof callback == 'function')
                    callback( false );
            }
        }else{
            removeNow();
        }
    },

    onUpdateCountCollection: function(params) {
      var index = _.findIndex(_collections, { _id: parseInt(params._id) });
      if (index!=-1){
        switch(params.count){
          case "+":
            _collections[index].count++;
          break;

          case "-":
            _collections[index].count--;
          break;

          default:
            _collections[index].count = params.count;
          break;
        }

        this.trigger(_collections);
      }
    },

    onUpdateColorCollection: function(params) {
      var index = _.findIndex(_collections, { _id: parseInt(params._id) });
      if (index!=-1){
        _collections[index].color = params.color;
        if ((_collections[index].cover||[]).length>0)
            Api.setItem("collection_color_"+_collections[index].cover[0], params.color);
        this.trigger(_collections);
      }
    },

    getCollections: function() {
        return _collections;
    },

    getCurrentId: function(onlyWhat) {
        if (onlyWhat){
            switch(onlyWhat){
                case "file":
                    if (_currentId<0)
                        if (_currentId<-1)
                            return -1;
                break;
            }
        }
        return _currentId;
    },

    getCollection: function(id) {
        id = parseInt(id);
        var index = _.findIndex(_collections, { _id: id });
        if (index!=-1){
            if (id===0){
                _collections[index].count = StatsStore.getAllCount();
            }else if (id<0){
                _collections[index].count = StatsStore.getCollectionCount(id);
            }

            return this._prepareItem(_collections[index]);
        }
        else
            return null;
    },

    getCount: function() {
      return _collections.length;
    },

    reset: function(params) {
        params = params || {};
        if (typeof params.speed != "undefined")
          _speed = params.speed;
        else
          _speed = "sync";

        _collections=[];
        _currentId = -2;
        if (typeof isIOSapp != "undefined")
            _currentId = 0;
        _loaded = false;

        if ((_collections.length==0)&&(!_loaded))
            this._resetFromCache();
    },

    _updateOrInsertItem: function(item) {
        var index = _.findIndex(_collections, { _id: parseInt(item._id) });
        if (index!=-1)
            _collections[index] = item;
        else
            _collections.push(item);
    },

    _insertDefaults: function() {
        var _this = this;
        _defaults.forEach(function(item){
            _this._updateOrInsertItem(item);
        });
    },

    _resetFromCache: function() {
        if (window.cacheDisabled||false)
            return;

        switch(_speed){
            case "async":
                var _this = this;
                try{ls.getItem('collections')
                    .then(function (val) {
                        if ((val) && (_collections.length == 0)) {
                            _collections = val;
                            _this._insertDefaults();
                            _this.trigger(_collections);
                        };
                    })
                    .catch(function(e){
                    });}catch(e){}
            break;

            case "sync":
                var cache = Api.getItem('collections');
                try{
                    cache = JSON.parse(cache);
                }catch(e){if (e) cache = null;}

                if ((typeof cache == 'object')&&(cache!=null)){
                    _collections = cache;
                    this._insertDefaults();
                }
            break;
        }
    },

    _prepareItem: function(item) {
        if (typeof item.parent != "undefined")
            if (typeof item.parent["$id"] != "undefined") {
                item.parentId = item.parent["$id"];
                delete item.group;
            }

        if (typeof item.parentId == "undefined"){
            var group = UserStore.getCollectionGroup(item._id);
            if (group!=null)
                item.group = parseInt(group);
        }

        if ((item.cover||[]).length>0)
            item.color = Api.getItem("collection_color_"+item.cover[0]);

        //if (item._id<=0)
        //  delete item.count;

        return item;
    },

    _forceUpdate: function() {
        this.trigger(_collections);
    },

    isLoading: function() {
        return !_loaded;
    }
});
CollectionsStore.reset();

module.exports = CollectionsStore;

},{"../actions/Bookmarks":1,"../actions/Childrens":2,"../actions/Collections":3,"../actions/User":7,"../stores/Stats":27}],27:[function(require,module,exports){
var StatsActions = require('../actions/Stats');
var CollectionsActions = require('../actions/Collections');

var _stat = {}, _loading = false, _all = 0, _loaded = false;

var StatsStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(StatsActions.load, this.onLoad);
        this.listenTo(CollectionsActions.updateCountCollection, this.onUpdate);
    },

    onLoad: function() {
    	var _this = this;

    	if (_loading)
    		return;

        try{ls.getItem("stat")
            .then(function (val) {
                if ((val) && (!_loaded)) {
                    _stat = val;
                    _this._countAll();
                    _this.trigger(_stat);
                }
            })
            .catch(function(e){

            });}catch(e){}

    	_loading = true;
    	Api.get("stat", function(json) {
    		if (json.result){
	    		_stat = json.items;
	    		_this._countAll();
                try{ls.setItem("stat", _stat).then(function(){}).catch(function(e){})}catch(e){};
	    		_this.trigger(_stat);
	    	}

            _loading = false;
            _loaded = true;
    	});
    },

    onUpdate: function(params) {
        var index = _.findIndex(_stat, {_id: params._id});

        switch(params.count){
          case "+":
            if (params._id!=-99) _all++;
            if (index!=-1) _stat[index].count++;
            this.trigger(_stat);
          break;

          case "-":
            if (params._id!=-99) _all--;
            if (_all<0)
                _all = 0;

            if (index!=-1) {
                _stat[index].count--;
                if (_stat[index].count<0)
                    _stat[index].count = 0;
            }
            this.trigger(_stat);
          break;
        }
    },

    _countAll: function() {
    	_all = 0;
    	for(var i in _stat){
            if (_stat[i]._id === -2){
              _all = _all - (_stat[i].count||0);
            }else if (typeof _stat[i]._id != "number")
    		  _all += parseInt(_stat[i].count||0);
    	}
        if (_all<0) _all = 0;
    },

    getStat: function() {
    	return _stat;
    },

    getAllCount: function() {
    	return _all;
    },

    getCollectionCount: function(id) {
        var index = _.findIndex(_stat, {_id: id});
        if (index!=-1)
            return _stat[index].count;
        else
            return 0;
    }
});

module.exports = StatsStore;

},{"../actions/Collections":3,"../actions/Stats":5}],28:[function(require,module,exports){
var _toasts = [],
    _timeout = 3000;

var ToastStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(Toasts.show, this.onShow);
        this.listenTo(Toasts.close, this.onClose);
        this.listenTo(Toasts.stopTimer, this.onStopTimer);
    },

    onShow: function(params) {
        params.id = parseInt(new Date().getTime()/1000);
        params.timeout = setTimeout(function() {
            Toasts.close({id:params.id});
        }, _timeout);
        params.closing = false;
        _toasts.push(params);

        //if (_toasts.length>=10) {
        //    this._removeItem(0,true);
        //}

        this.trigger(_toasts);
    },

    onClose: function(params) {
        //var index = _.findIndex(_toasts, {id: parseInt(params.id)});

        //if (index!=-1){
            this._removeItem(parseInt(params.id));
        //}
    },

    onStopTimer: function(params) {
        var index = _.findIndex(_toasts, {id: parseInt(params.id)});

        if (index!=-1){
            clearTimeout(_toasts[index].timeout);
        }
    },

    _removeItem: function(id, withoutUpdate) {
        var _this = this;

        var index = _.findIndex(_toasts, {id: id});
        if (index==-1) return;

        try{clearTimeout(_toasts[index].timeout);}catch(e){}

        _toasts.splice(index, 1);

        if (typeof withoutUpdate == 'undefined')
            _this.trigger(_toasts);
    },

    getToasts: function() {
        return _toasts;
    },

    reset: function() {
        _toasts=[];
    }
});

module.exports = ToastStore;

},{}],29:[function(require,module,exports){
var UserActions = require('../actions/User');
var ModalFrameActions = require('../actions/ModalFrame');
var CollectionsStore = require('./Collections');

var _user = {}, _logged = false, _loading = false;

var UserStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(UserActions.load, this.onLoad);

        this.listenTo(UserActions.toggleGroup, this.onToggleGroup);
        this.listenTo(UserActions.updateGroup, this.onUpdateGroup);
        this.listenTo(UserActions.insertGroup, this.onInsertGroup);
        this.listenTo(UserActions.removeGroup, this.onRemoveGroup);
        this.listenTo(UserActions.swapGroups, this.onSwapGroups);
        this.listenTo(UserActions.saveGroups, this.saveGroups);

        this.listenTo(UserActions.updateCollection, this.onUpdateCollection);
        this.listenTo(UserActions.swapCollections, this.onSwapCollections);

        this.listenTo(UserActions.updateLanguage, this.onUpdateLanguage);
        this.listenTo(UserActions.updateConfig, this.onUpdateConfig);
        this.listenTo(UserActions.logOut, this.onLogOut);
        this.listenTo(UserActions.signIn, this.onSignIn);
        this.listenTo(UserActions.signUp, this.onSignUp);
    },

    onLoad: function(callback) {
        if (_loading) {
          if (typeof callback == "function")
              callback(false);
          return;
        }

        var _this = this;
        _loading = true;
        this._resetFromCache();

        Api.get("user", function(json){
            var afterCheck = function() {
              if (json.result||false) {
                  _user = json.user;
                  _logged = true;
                  _this.cleanGroups();
              }else{
                _user = {};
                _logged = false;

                //if ((window.environment||[]).indexOf("web")!=-1)
                //  window.location = network.fixURL("/account");
              }

              Api.setItem('user', JSON.stringify(_user));
              try{ls.setItem('user_id', _user._id || 0).then(function(){}).catch(function(e){})}catch(e){};

              _loading = false;

              _this.trigger(_user);
              _this._checkGroupsStability();
              _this.updateIntercom();
            }

            if ((typeof json.result == "boolean") || (typeof json.auth == "boolean")){
              try{ls.getItem("user_id")
                .then(function(_userId) {
                  var currentJSONuserId = null;
                  try{currentJSONuserId = parseInt(json.user._id);}catch(e){}

                  if ((json.result||false)&&(parseInt(_userId) == currentJSONuserId))
                    afterCheck();
                  else{
                    _this._cleanCache(afterCheck);
                  }

                  if (typeof callback == "function") callback(json.result);
                })
                .catch(function(e){
                  afterCheck();
                });}catch(e){
                  afterCheck();
                }
            }else{
              if (typeof callback == "function") callback(json.result);
            }
        });
    },

    updateIntercom: function() {
      try{
        var data = {
          app_id: "ar0opykp",
          user_id: _user._id,
          name: _user.fullName,
          email: _user.email || "",
          created_at: Math.floor(new Date(_user.registered).getTime()/1000),
          pro: _user.pro || false,
          groups: (_user.groups||[]).length || 0,
          platform: 'web'
        };

        if (_user.proExpire)
          data.pro_expire = Math.floor(new Date(_user.proExpire).getTime()/1000);

        if (typeof window != "undefined")
          if (typeof window.Intercom != "undefined"){
            window.Intercom('boot', data);
          }

        if (typeof NativeHelpers != "undefined"){
          data.platform = "ios";
          delete data.app_id;
          NativeHelpers.intercomSetUser(data.user_id+"", data);
        }
      } catch(e) {}

      try{
        Raven.setUserContext({
          email: _user.email,
          id: _user._id
        });
      }catch(e){}
    },

    onToggleGroup: function(params){
        var index = _.findIndex((_user.groups||[]), { id: params.id });
        if (index!=-1) {
            _user.groups[index].hidden = !_user.groups[index].hidden;
            this.saveGroups();
        }
    },

    onUpdateGroup: function(params) {
        var index = _.findIndex((_user.groups||[]), { id: params.id });
        if (index!=-1) {
            for(var i in params.item)
                _user.groups[index][i] = params.item[i];

            this.saveGroups(function(json){
                if (json.result)
                    Toasts.show({text: t.s("saveSuccess"), title: params.item.title});
                else
                    Toasts.show({text: t.s("saveError"), title: params.item.title, status: "error"});
            });
        }
    },

    onInsertGroup: function(params, callback) {
        if (typeof params.item.collections == "string")
          params.item.collections = JSON.parse(params.item.collections)

        _user.groups.push({
            title: params.item.title,
            hidden: false,
            id: new Date().getTime(),
            sort: (_user.groups||[]).length,
            collections: params.item.collections || []
        });
        this.saveGroups(function(json){
            if (!params.silent)
              if (json.result)
                  Toasts.show({text: t.s("addSuccess"), title: params.item.title});
              else
                  Toasts.show({text: t.s("saveError"), title: params.item.title, status: "error"});

            if (typeof callback == "function")
              callback(json.result);
        }, params);
    },

    onRemoveGroup: function(params) {
        var index = _.findIndex((_user.groups||[]), { id: params.id }), result = false, title = "";
        if (index!=-1) {
            title = _user.groups[index].title;
            if ((_user.groups[index].collections||[]).length==0) {
                _user.groups.splice(index, 1);
                result = true;
            }
        }

        if (result){
            this.saveGroups();
            Toasts.show({text: t.s("removeSuccess"), title: title});
        }else{
            Toasts.show({text: t.s("removeGroupError"), title: title, status: "error"});
        }
    },

    onSwapGroups: function(params) {
      if (params.fromId==params.toId)
        return false;

      var fromIndex = _.findIndex(_user.groups, {id: parseInt(params.fromId)});
      var toIndex = _.findIndex(_user.groups, {id: parseInt(params.toId)});

      if ((fromIndex!=-1)&&(toIndex!=-1)){
        _user.groups = strings.swapArray(_user.groups, fromIndex, toIndex);
        for(var i in _user.groups){
          _user.groups[i].sort = i;
        }

        this.saveGroups();
      }else{
        return false;
      }
    },

    onUpdateCollection: function(params) {
        var needUpdate = false, found = false;

        if (typeof params.group == 'undefined')
            params.group = -1;

        for(var i in _user.groups)
            for(var j in (_user.groups[i].collections||[]))
                if (_user.groups[i].collections[j]==params._id) {
                    if (params.group != i) {
                        _user.groups[i].collections.splice(j, 1);
                        needUpdate = true;
                    }
                    found = true;
                }

        if ((needUpdate)||(!found)) {
            if (params.group>=0) {
                if (typeof _user.groups[params.group].collections != 'object')
                    _user.groups[params.group].collections = [];

                if (typeof params.toTop != "undefined")
                  _user.groups[params.group].collections.unshift(params._id);
                else
                  _user.groups[params.group].collections.push(params._id);
                _user.groups[params.group].hidden = false;
            }

            this.saveGroups();
        }
    },

    onSwapCollections: function(params) {
      if (params.fromId==params.toId)
        return false;

      var from = {
            index: -1
          },
          to = {
            index: -1
          };

      //find items indexes and parent groups
      for(var i in _user.groups){
        var tempFrom = (_user.groups[i].collections||[]).indexOf(parseInt(params.fromId));
        var tempTo = (_user.groups[i].collections||[]).indexOf(parseInt(params.toId));

        if (tempFrom!=-1){
          from.index = tempFrom;
          from.group = i;
        }

        if (tempTo!=-1){
          to.index = tempTo;
          to.group = i;
        }

        if ((from.index!=-1)&&(to.index!=-1))
          break;
      }

      //swap items
      if ((from.index!=-1)&&(to.index!=-1)){
        if (from.group == to.group){
          _user.groups[from.group].collections = strings.swapArray(_user.groups[from.group].collections, from.index, to.index);
        }
        else{
          var tempFrom = _user.groups[from.group].collections[from.index];
          _user.groups[from.group].collections.splice(from.index,1);

          _user.groups[to.group].collections.splice(to.index, 0, tempFrom);
        }

        this.saveGroups();
      }
    },

    onUpdateLanguage: function(params, callback) {
        if (typeof _user.config != "object")
            _user.config = {};

        _user.config.lang = params.lang;
        this.saveConfig({lang:_user.config.lang}, callback);
    },

    onUpdateConfig: function(params, callback) {
      if (typeof _user.config != "object")
          _user.config = {};

      for(var i in params)
        _user.config[i] = params[i];

      this.saveConfig(params, callback);
    },

    onLogOut: function(callback) {
      var _this = this;
      _this._cleanCache(function(){
        Api.get(network.fixURL("/auth/logout"), function(){
          _this.reset();
          callback();
        });
      });
    },

    onSignIn: function(callback, params) {
      var _this = this;
      if (typeof params == "undefined") params = {};

      var url = "/account" + (((window.environment||[]).indexOf("web")==-1) ? "?extension" : "");
      if (params.google)
        url = "/auth/google" + (((window.environment||[]).indexOf("web")==-1) ? "?redirect=%2Fother%2Fmodal-login.html" : "");

      if ((window.environment||[]).indexOf("desktop")!=-1)
        window.location = (network.fixURL(url));
      else if ((window.environment||[]).indexOf("clipper")!=-1){
        window.location.hash = "#/waitauth";
        BrowserBridge.openModal(network.fixURL(url), {width: 700, height: 600});
      }
      else if (typeof chrome != "undefined")
        chrome.windows.create({
          url: network.fixURL(url),
          type: "popup",
          width: 700,
          height: 600
        }, function(win) {
          chrome.windows.onRemoved.addListener(function(id){
            if (id == win.id)
              _this._cleanCache(callback);
          });
        });
      else{
        window.open(network.fixURL(url), "raindropwindow", "width=700,height=600,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
        window.location.hash = "#/waitauth";
      }
      /*else{
        ModalFrameActions.show({
          title: t.s("signIn"),
          url: network.fixURL(url),
          width: 600,
          height: 500,
          onClose: function() {
            _this._cleanCache(callback);
          }
        });
      }*/
    },

    onSignUp: function(callback) {
      var _this = this;

      if ((window.environment||[]).indexOf("desktop")!=-1)
        window.location = (network.fixURL("/account/signup" + (((window.environment||[]).indexOf("web")==-1) ? "?extension" : "")));
      else if ((window.environment||[]).indexOf("clipper")!=-1){
        window.location.hash = "#/waitauth";
        BrowserBridge.openModal(network.fixURL("/account/signup?extension"), {width: 700, height: 600});
      }
      else if (typeof chrome != "undefined")
        chrome.windows.create({
          url: network.fixURL("/account/signup?extension"),
          type: "popup",
          width: 700,
          height: 600
        }, function(win) {
          chrome.windows.onRemoved.addListener(function(id){
            if (id == win.id)
              _this._cleanCache(callback);
          });
        });
      else{
        window.open(network.fixURL("/account/signup?extension"), "raindropwindow", "width=700,height=600,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
        window.location.hash = "#/waitauth";
      }
      /*else{
        ModalFrameActions.show({
          title: t.s("signUp"),
          url: network.fixURL("/account/signup?extension"),
          width: 600,
          height: 600,
          onClose: function() {
            _this._cleanCache(callback);
          }
        });
      }*/
    },

    _cleanCache: function(callback) {
      var bg = Api.getItem("background-image");
      //Api.get("user", function(json){
        //if ((json||{}).result||false){
          Api.clear();
          Api.setItem("welcome-onboard","true");
          Api.setItem("background-image",bg);
          try{
            ls.clear(function(err) {
              callback();
            });
          }catch(e){callback();}
        //}else
          //callback();
      //});
    },

    getUser: function() {
        if (typeof _user._id == 'undefined')
            this._resetFromCache();

        return _.clone(_user);
    },

    getGroup: function(id) {
        var index = _.findIndex((_user.groups||[]), { id: id });
        if (index!=-1)
            return _user.groups[index];
        else
            return null;
    },

    isLogged: function() {
      return _logged;
    },

    isLoading: function() {
      return _loading;
    },

    isPro: function() {
      if (_logged)
        if (_user.pro)
          return true;

      return false;
    },

    reset: function() {
        _user = {};
        _logged = false;
        _loading = false;
    },

    cleanGroups: function() {
        if ((_user.groups||[]).length>0) {
            for (var i in _user.groups)
                if ((_user.groups[i].id || null) == null)
                    _user.groups[i].id = parseInt(i);

            _user.groups = _.sortBy(_user.groups, function (item) {
                return item.sort;
            });
        }else{
            _user.groups = [{id:0, sort: 0, title: t.s("myCollections"), hidden: false}];
        }
    },

    saveGroups: function(callback, params) {
      //cleanup
      params = params || {};
      if (typeof params.cleanCollections == "undefined")
        params.cleanCollections = true;

      if ((CollectionsStore.getCount()>0)&&(params.cleanCollections)) {
        for(var i in _user.groups){
          var indexes = [];
          for(var j in (_user.groups[i].collections||[]))
            if (CollectionsStore.getCollection(_user.groups[i].collections[j])==null)
              indexes.push(j);

          _.pullAt(_user.groups[i].collections, indexes);
        }
      }

      this.saveConfig({groups:_user.groups}, callback);
    },

    removeEmptyGroups: function(callback) {
      var indexes = [];

      for(var i in _user.groups){
        if ((_user.groups[i].collections||[]).length==0)
          indexes.push(i);
      }

      _.pullAt(_user.groups, indexes);
      this.saveGroups(callback, {cleanCollections: false});
    },

    saveConfig: function(params, callback) {
        if (typeof params.updateModel == "undefined")
            params.updateModel = true;

        try{
          if (params.updateModel){
            _user.config[params.name] = true;
          }
        }catch(e){}

        //if (_logged)
        Api.put('userConfig', params, function(json) {
            if (typeof callback=="function")
                callback(json);
        });
        Api.setItem('user', JSON.stringify(_user));
        this.trigger(_user);
    },

    getCollectionGroup: function(cId) {
        for(var i in _user.groups)
            for(var j in (_user.groups[i].collections||[]))
                if (_user.groups[i].collections[j]==cId)
                    return parseInt(i);
        return null;
    },

    getConfig: function(key) {
        var val = false;
        try{val = _user.config[key]} catch(e){}
        return val;
    },

    _checkGroupsStability: function() {
      if ( (UserStore.isLogged()) && (!UserStore.isLoading()) && (CollectionsStore.getCount()>0) && (!CollectionsStore.isLoading()) ){
        var noGroup = [];
        var collections = CollectionsStore.getCollections();

        collections.forEach(function(coll) {
          var found = (coll._id<=0);

          if (typeof coll.parent != "undefined")
            found = true;

          if (typeof coll.parentId != "undefined")
            found = true;

          (_user.groups||[]).forEach(function(group) {
            var inGroup = (group.collections||[]).some(function(cId) {
              return ((parseInt(cId)) == (parseInt(coll._id)));
            });
            if (inGroup)
              found = true;
          });

          if (!found)
            noGroup.push(parseInt(coll._id));
        });

        if (noGroup.length>0){
          noGroup = _.uniq(noGroup);

          var index = _.findIndex((_user.groups||[]), { title: t.s("myCollections") });
          if (index!=-1){
              _user.groups[index].collections = (_user.groups[index].collections||[]).concat(noGroup);
          }
          else{
              _user.groups = _user.groups || [];
              _user.groups.push({id: _user.groups.length, sort: _user.groups.length, title: t.s("myCollections"), hidden: false, collections: noGroup});
          }

          UserStore.saveGroups();
        }
      }
    },

    _resetFromCache: function() {
        if (window.cacheDisabled||false)
            return;

        if (_logged)
          return;

        _logged = false;

        var cache = Api.getItem('user');
        try{
            cache = JSON.parse(cache);
        }catch(e){if (e) cache = null;}

        if ((typeof cache == 'object')&&(cache!=null)){
            _user = cache;
            if (_user._id){
              _logged = true;
              this.cleanGroups();
            }
        }
    },

    _setProData: function(isPro, proExpire){
      _user.pro = isPro;
      _user.proExpire = proExpire;
    }
});

module.exports = UserStore;

},{"../actions/ModalFrame":4,"../actions/User":7,"./Collections":26}]},{},[25]);
