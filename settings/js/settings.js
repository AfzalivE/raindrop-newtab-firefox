! function e(t, n, a) {
  function o(i, r) {
    if (!n[i]) {
      if (!t[i]) {
        var c = "function" == typeof require && require;
        if (!r && c) return c(i, !0);
        if (s) return s(i, !0);
        var l = new Error("Cannot find module '" + i + "'");
        throw l.code = "MODULE_NOT_FOUND", l
      }
      var u = n[i] = {
        exports: {}
      };
      t[i][0].call(u.exports, function (e) {
        var n = t[i][1][e];
        return o(n ? n : e)
      }, u, u.exports, e, t, n, a)
    }
    return n[i].exports
  }
  for (var s = "function" == typeof require && require, i = 0; i < a.length; i++) o(a[i]);
  return o
}({
  1: [function (e, t, n) {
    var a = Reflux.createActions(["load", "parseURL", "loadBookmark", "insertBookmark", "updateBookmark", "updateSelectedBookmarks", "removeBookmark", "removeSelectedBookmarks", "copySelectedBookmarks", "swapBookmarks", "saveAllSort", "syncMove", "initFavorites", "setSelected", "selectAll", "clearSelect", "reset"]);
    t.exports = a
  }, {}],
  2: [function (e, t, n) {
    var a = Reflux.createActions(["load", "swapCollections", "saveAllSort", "removeCollection"]);
    t.exports = a
  }, {}],
  3: [function (e, t, n) {
    var a = Reflux.createActions(["load", "setCurrent", "updateCollection", "insertCollection", "removeCollection", "updateCountCollection", "updateColorCollection"]);
    t.exports = a
  }, {}],
  4: [function (e, t, n) {
    var a = Reflux.createActions(["show"]);
    t.exports = a
  }, {}],
  5: [function (e, t, n) {
    t.exports = Reflux.createActions(["load"])
  }, {}],
  6: [function (e, t, n) {
    var a = Reflux.createActions(["show", "close", "stopTimer"]);
    t.exports = a
  }, {}],
  7: [function (e, t, n) {
    var a = Reflux.createActions(["load", "toggleGroup", "updateGroup", "insertGroup", "removeGroup", "swapGroups", "saveGroups", "updateCollection", "updateLanguage", "updateConfig", "swapCollections", "logOut", "signIn", "signUp"]);
    t.exports = a
  }, {}],
  8: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/Icon",
      shouldComponentUpdate: function (e) {
        return this.props.name != e.name ? !0 : this.props.size != e.size ? !0 : this.props.style != e.style ? !0 : !1
      },
      render: function () {
        var e = this.props.name + (this.props.size ? "-" + this.props.size : ""),
          t = '<use xlink:href="#' + e + '" />',
          n = "icn" + (this.props.size ? " icn-" + this.props.size : "");
        return this.props.className && (n += " " + this.props.className), React.createElement("svg", {
          key: "icon_" + e,
          className: n,
          "data-name": this.props.name,
          style: this.props.style || null,
          dangerouslySetInnerHTML: {
            __html: t
          }
        })
      }
    })
  }, {}],
  9: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "Helpers/UserVoice",
      getInitialState: function () {
        return {
          user: UserStore.getUser(),
          id: "feedback-uservoice-" + (new Date).getTime().toString(),
          loading: !0
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e,
          password: {},
          loading: !1
        })
      },
      componentWillMount: function () {
        if (UserStore.onLoad(), "undefined" == typeof window.UserVoice) {
          var e = "jlb8wSxdcZRy8qdRNzP1OQ";
          "ru_RU" == t.getLang() && (e = "Kbyq0Zv9xshiMnm61ryC7g");
          var n = ""; - 1 == window.location.protocol.indexOf("http") && (n = "https:"), UserVoice = window.UserVoice || [],
            function () {
              var t = document.createElement("script");
              t.type = "text/javascript", t.async = !0, t.src = n + "//widget.uservoice.com/" + e + ".js";
              var a = document.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(t, a)
            }()
        }
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      componentDidUpdate: function () {
        UserStore.isLogged() && UserVoice.push(["identify", {
          email: this.state.user.email,
          name: this.state.user.fullName,
          type: UserStore.isPro() ? "PRO" : "Free",
          account: {
            _id: this.state.user._id,
            name: this.state.user.fullName,
            plan: UserStore.isPro() ? "PRO" : "Free"
          }
        }]), UserVoice.push(["embed", "#" + this.state.id, {
          mode: this.props.mode
        }])
      },
      render: function () {
        return React.createElement("div", {
          id: this.state.id,
          className: "userVoice"
        })
      }
    })
  }, {}],
  10: [function (e, t, n) {
    var a = e("../../stores/Toast"),
      o = React.addons.CSSTransitionGroup;
    t.exports = React.createClass({
      displayName: "Toast",
      getInitialState: function () {
        return {
          items: a.getToasts()
        }
      },
      onToastsChange: function (e) {
        this.isMounted() && this.setState({
          items: e
        })
      },
      componentDidMount: function () {
        this.unsubscribeToast = a.listen(this.onToastsChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeToast()
      },
      handleCloseItem: function (e) {
        Toasts.close({
          id: e.target.getAttribute("data-id")
        })
      },
      handleStopTimer: function (e) {},
      render: function () {
        var e = this,
          t = this.state.items.map(function (t) {
            var n = null;
            t.title && (n = React.createElement("div", {
              className: "title"
            }, React.createElement("strong", null, t.title)));
            var a = "info-outline";
            return t.status && (a = "cancel"), React.createElement("li", {
              key: "toast_" + t.id,
              "data-id": t.id,
              id: "toast-" + t.id,
              onMouseEnter: e.handleStopTimer,
              onClick: e.handleCloseItem
            }, React.createElement("div", {
              className: "item-wrap status-" + t.status || ""
            }, React.createElement("div", null, React.createElement(Icon, {
              name: a
            })), React.createElement("div", null, n, React.createElement("div", {
              className: "excerpt"
            }, t.text))))
          });
        return React.createElement(o, {
          component: "ul",
          transitionName: "toastanim",
          transitionEnterTimeout: 300,
          transitionLeaveTimeout: 300
        }, t)
      }
    })
  }, {
    "../../stores/Toast": 28
  }],
  11: [function (e, t, n) {
    var a = "https://raindrop.io",
      o = "/api/";
    t.exports = {
      host: a,
      apiPrefix: a + o,
      screenshotService: a + "/screenshot/?url=",
      contentTypes: ["link", "article", "image", "video"],
      proPage: a + "/static/pro",
      modalMargin: 30,
      languages: {
        id_ID: "Bahasa Indonesia",
        de_DE: "Deutsch",
        en_US: "English",
        es_ES: "Español",
        fr_FR: "Français",
        nl_NL: "Nederlands",
        pl_PL: "Polski",
        pt_BR: "Português (Brasil)",
        sv_SE: "Svenska",
        fi_FI: "Suomi",
        tr_TR: "Türkçe",
        kk_KZ: "Қазақ тілі",
        ru_RU: "Русский",
        uk_UA: "Українська мова",
        ko_KR: "한국어",
        zh_TW: "中文 (繁體)",
        zh_CN: "中文（简体）",
        hy_AM: "հայերեն"
      },
      backgroundImages: [{
        src: "",
        contrast: "black"
      }, {
        src: (window.pathPrefix || "") + "images/themes/reflectiononthelake.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/milleniumbridge.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/empireofthealps.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/brown-sunset.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/san-francisco.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/rocks.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/material-geometry.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/brown-rocks.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/material-view.jpg",
        contrast: "black"
      }, {
        src: (window.pathPrefix || "") + "images/themes/surf.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/silver.jpg",
        contrast: "black"
      }],
      getBackgroundSelected: function () {
        var e = null,
          t = 0;
        try {
          null != localStorage.getItem("background-image") && (e = localStorage.getItem("background-image"))
        } catch (n) {}
        for (var a in this.backgroundImages)
          if (this.backgroundImages[a].src == e) {
            t = a;
            break
          } return t
      },
      setBackground: function (e) {
        var t = this.getBackgroundSelected();
        if (t >= 0) {
          var n = this.backgroundImages[t];
          document.documentElement.classList.remove("contrast-white"), document.documentElement.classList.remove("contrast-black"), document.documentElement.classList.add("contrast-" + n.contrast || "black");
          var a = function (e) {
            var t = function () {
              null != document.getElementById("app-background") && (document.getElementById("app-background").style.backgroundImage = 'url("' + e + '")')
            };
            null != document.getElementById("app-background") ? t() : document.addEventListener("DOMContentLoaded", t)
          };
          if (!n.src) return void a("about:blank");
          var o = (e || "") + n.src,
            s = null;
          try {
            localStorage.getItem(o)
          } catch (i) {}
          if (null == s) {
            var r = new XMLHttpRequest,
              c = new FileReader;
            r.onload = function () {
              if (4 == r.readyState && 200 == r.status) {
                var e = new Blob([r.response], {
                  type: "image/jpeg"
                });
                c.onload = function (e) {
                  var t = e.target.result;
                  a(t);
                  try {
                    localStorage.setItem(o, t)
                  } catch (n) {}
                }, c.readAsDataURL(e)
              }
            }, r.open("GET", o, !0), r.responseType = "arraybuffer", r.send()
          } else a(s)
        }
      },
      defaultCollectionIcon: function () {
        return network.fixURL("/other/popup/img/icon-folder.png")
      },
      getImportLink: function () {
        return "undefined" != typeof window.environment ? network.fixURL("/other/import/import.html") : "../import/index.html"
      }
    }
  }, {}],
  12: [function (e, t, n) {
    function a(e) {
      var t = !1;
      if (e)
        if (e.code) switch (e.code) {
          case 22:
            t = !0;
            break;
          case 1014:
            "NS_ERROR_DOM_QUOTA_REACHED" === e.name && (t = !0)
        } else -2147024882 === e.number && (t = !0);
      return t
    }
    var o = e("superagent");
    t.exports = {
      timeout: 6e3,
      makeFinalURL: function (e) {
        return 0 == e.indexOf("http") ? e : consts.apiPrefix + e
      },
      getText: function (e, t) {
        o.get(e).set("Content-Encoding", "gzip").end(function (e, n) {
          return "undefined" == typeof n ? void t({}) : void t((n || {}).text || null)
        })
      },
      get: function (e, t, n) {
        n = n || {}, o.get(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json").set("Content-Encoding", "gzip").end(function (e, a) {
          return "undefined" == typeof a ? void t({}) : void t(n.text ? a.text || "" : a.body || {})
        })
      },
      post: function (e, t, n) {
        o.post(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json").end(function (e, t) {
          return "undefined" == typeof t ? void n({}) : void n(t.body || {})
        })
      },
      put: function (e, t, n) {
        o.put(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json").end(function (e, t) {
          return "undefined" == typeof t ? void n({}) : void n(t.body || {})
        })
      },
      del: function (e, t) {
        o.del(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json").end(function (e, n) {
          return "undefined" == typeof n ? void t({}) : void t(n.body || {})
        })
      },
      upload: function (e, t, n, a) {
        o.post(this.makeFinalURL(e)).attach(t.name, t.file, t.file.name).on("progress", function (e) {
          var t = parseInt(e.percent || 0);
          n(t)
        }).end(function (e, t) {
          return "undefined" == typeof t ? void a({}) : void a(t.body || {})
        })
      },
      getItem: function (e) {
        var t;
        try {
          t = localStorage || window.localStorage
        } catch (n) {}
        return t ? t.getItem(e) : null
      },
      setItem: function (e, t) {
        var n;
        try {
          n = localStorage || window.localStorage
        } catch (o) {}
        if (n) try {
          n.setItem(e, t)
        } catch (o) {
          a(o) && n.clear()
        } else console.log("No localStorage access")
      },
      removeItem: function (e) {
        var t;
        try {
          t = localStorage || window.localStorage
        } catch (n) {}
        t ? t.removeItem(e) : console.log("No localStorage access")
      },
      clear: function () {
        var e;
        try {
          e = localStorage || window.localStorage
        } catch (t) {}
        e ? e.clear() : console.log("No localStorage access")
      }
    }
  }, {
    superagent: "superagent"
  }],
  13: [function (e, t, n) {
    t.exports = {
      getDomain: function (e) {
        if (e = e || "", "undefined" != typeof document) {
          var t = document.createElement("a");
          t.href = e;
          var n = t.hostname;
          return delete t, n
        }
        var a;
        return a = e.indexOf("://") > -1 ? e.split("/")[2] : e.split("/")[0], a = a.split(":")[0]
      },
      fixURL: function (e) {
        try {
          e = e.trim()
        } catch (t) {
          t && (e = "")
        }
        return 0 == e.indexOf("//") ? "http:" + e : 0 == e.indexOf("/") ? "https://raindrop.io" + e : e
      },
      favIcon: function (e) {
        return "https://raindrop.io/favicon/" + (e || "")
      },
      thumb: function (e, t) {
        try {
          e = e.trim()
        } catch (n) {
          n && (e = "")
        }
        return "undefined" == typeof t && (t = 230), "" != e ? 0 != e.indexOf("http") ? this.fixURL(e) : 0 == e.indexOf("https://raindrop.io") ? e : 0 == e.indexOf("http://raindrop.io") ? e : "https://raindrop.io/makethumb/?url=" + encodeURIComponent(e) + "&width=" + t : "about:blank"
      },
      cleanDomain: function (e) {
        try {
          var t = e.split("."),
            n = 2;
          t.length > n && (("org" == t[t.length - 2] || "net" == t[t.length - 2] || "com" == t[t.length - 2] || "co" == t[t.length - 2]) && (n = 3), t.splice(0, t.length - n), e = t.join("."))
        } catch (a) {}
        return e
      },
      linkTarget: function () {
        var e = "_self";
        return -1 != (window.environment || []).indexOf("clipper") && (e = "_top"), -1 != (window.environment || []).indexOf("safari_popup") && (e = "_blank"), e
      },
      settingsURL: function () {
        var e = "../settings/settings.html#/settings",
          t = "_self";
        return -1 != (window.environment || []).indexOf("clipper") && (t = "_blank"), -1 != window.location.protocol.indexOf("http") && (e = "/settings#/settings"), -1 != (window.environment || []).indexOf("mac") && (e = "../settings/settings.html?isMac#/settings"), e
      }
    }
  }, {}],
  14: [function (e, t, n) {
    e("moment/locale/id.js"), e("moment/locale/de.js"), e("moment/locale/es.js"), e("moment/locale/fr.js"), e("moment/locale/nl.js"), e("moment/locale/pl.js"), e("moment/locale/pt.js"), e("moment/locale/fi.js"), e("moment/locale/tr.js"), e("moment/locale/ru.js"), e("moment/locale/uk.js"), e("moment/locale/ko.js"), e("moment/locale/zh-cn.js"), e("moment/locale/zh-tw.js"), t.exports = {
      defaultLang: "en_US",
      currentLang: "en_US",
      getLang: function () {
        return this.currentLang
      },
      cleanLang: function (e) {
        for (var t in consts.languages)
          if (0 == t.indexOf(e)) return t;
        return this.defaultLang
      },
      setLang: function (e) {
        if ("undefined" == typeof e) {
          e = null;
          try {
            e = localStorage.getItem("language") || null
          } catch (t) {}
          if (null == e) {
            var n = navigator.language || navigator.userLanguage || "";
            try {
              n = n.trim().substr(0, 2).toLowerCase()
            } catch (t) {
              t && (n = "")
            }
            "" != n && (e = this.cleanLang(n))
          }
        }
        "undefined" == typeof consts.languages[e] && (e = this.defaultLang), this.currentLang = e;
        try {
          localStorage.setItem("language", this.currentLang)
        } catch (t) {}
        "undefined" != typeof moment ? moment.locale(this.currentLang) : "undefined" != typeof window.moment && window.moment.locale(this.currentLang)
      },
      s: function (e) {
        return "undefined" == typeof window["lang_" + this.currentLang] ? e : "undefined" != typeof window["lang_" + this.currentLang][e] ? window["lang_" + this.currentLang][e] : e
      },
      initJSfile: function () {
        var e = this,
          t = new XMLHttpRequest,
          n = (window.pathPrefix || "") + "../common/js/" + this.currentLang + ".json",
          a = new Event("langLoaded");
        t.onreadystatechange = function () {
          4 == t.readyState && t.responseText && (window["lang_" + e.currentLang] = JSON.parse(t.responseText), window.languageLoaded = !0, window.dispatchEvent(a))
        }, t.open("GET", n, !0), t.send()
      }
    }
  }, {
    "moment/locale/de.js": "moment/locale/de.js",
    "moment/locale/es.js": "moment/locale/es.js",
    "moment/locale/fi.js": "moment/locale/fi.js",
    "moment/locale/fr.js": "moment/locale/fr.js",
    "moment/locale/id.js": "moment/locale/id.js",
    "moment/locale/ko.js": "moment/locale/ko.js",
    "moment/locale/nl.js": "moment/locale/nl.js",
    "moment/locale/pl.js": "moment/locale/pl.js",
    "moment/locale/pt.js": "moment/locale/pt.js",
    "moment/locale/ru.js": "moment/locale/ru.js",
    "moment/locale/tr.js": "moment/locale/tr.js",
    "moment/locale/uk.js": "moment/locale/uk.js",
    "moment/locale/zh-cn.js": "moment/locale/zh-cn.js",
    "moment/locale/zh-tw.js": "moment/locale/zh-tw.js"
  }],
  15: [function (e, t, n) {
    var a = e("react/addons").addons.CSSTransitionGroup;
    t.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          index: 0
        }
      },
      handleForward: function (e) {
        e.preventDefault(), this.props.images.length > this.state.index + 1 ? this.setState({
          index: this.state.index + 1
        }) : this.setState({
          index: 0
        })
      },
      render: function () {
        var e = null;
        return this.props.images.length > 1 && (e = React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleForward
        }, React.createElement(Icon, {
          name: "forward"
        }))), React.createElement("div", {
          className: "slider"
        }, e, React.createElement(a, {
          transitionName: "carousel"
        }, React.createElement("img", {
          src: this.props.images[this.state.index],
          alt: "",
          key: this.props.images[this.state.index]
        })), React.createElement("img", {
          className: "space",
          src: this.props.images[this.state.index],
          alt: ""
        }))
      }
    })
  }, {
    "react/addons": "react/addons"
  }],
  16: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      componentDidMount: function () {
        this.props.changeTitle(t.s("exportBookmarks"))
      },
      render: function () {
        return React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("exportBookmarks"))), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, React.createElement("a", {
          href: consts.host + "/api/export",
          target: window.targetLink,
          className: "item",
          download: !0
        }, React.createElement("span", {
          className: "title"
        }, t.s("allBookmarks")), React.createElement("span", {
          className: "block"
        }, ".html"), React.createElement("span", {
          className: "forward last-icon"
        }, React.createElement(Icon, {
          name: "chevron-right"
        })))))))
      }
    })
  }, {}],
  17: [function (e, n, a) {
    var o = e("../../app/components/Helpers/UserVoice");
    n.exports = React.createClass({
      displayName: "exports",
      componentDidMount: function () {
        this.props.changeTitle(t.s("help"))
      },
      render: function () {
        return React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("help")), React.createElement("p", null, t.s("haveIdeas"))), React.createElement("article", null, React.createElement(o, null), React.createElement("br", null), "Send your emails to ", React.createElement("a", {
          href: "mailto:info@raindrop.io"
        }, "info@raindrop.io"))))
      }
    })
  }, {
    "../../app/components/Helpers/UserVoice": 9
  }],
  18: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      componentDidMount: function () {
        this.props.changeTitle(t.s("importBookmarks"))
      },
      render: function () {
        return React.createElement("iframe", {
          src: consts.host + "/other/import/import.html"
        })
      }
    })
  }, {}],
  19: [function (e, n, a) {
    e("../components/Slider");
    n.exports = React.createClass({
      displayName: "exports",
      componentDidMount: function () {
        this.props.changeTitle(t.s("install"))
      },
      render: function () {
        return React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("div", {
          className: "platforms"
        }, React.createElement("div", {
          className: "item hide-on-clipper",
          style: {
            backgroundColor: "#707D87"
          }
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/extension.png",
          alt: ""
        }), React.createElement("div", {
          className: "title"
        }, React.createElement("div", {
          className: "desc"
        }, t.s("browserPlugin")), React.createElement("div", {
          className: "links"
        }, React.createElement("a", {
          href: "https://chrome.google.com/webstore/detail/raindropio/ldgfbffkinooeloadekpmfoklnobpien",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-chrome.png",
          height: "32",
          alt: ""
        })), React.createElement("a", {
          href: "https://addons.mozilla.org/firefox/addon/raindropio/",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-firefox.png",
          height: "32",
          alt: ""
        })), React.createElement("a", {
          href: "https://raindrop.io/releases/safari.safariextz",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-safari.png",
          height: "32",
          alt: ""
        })), React.createElement("a", {
          href: "https://addons.opera.com/extensions/details/raindropio-smart-bookmarks",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-opera.png",
          height: "32",
          alt: ""
        }))))), React.createElement("div", {
          className: "item",
          style: {
            backgroundColor: "#4B88B7"
          }
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/ios.png",
          alt: ""
        }), React.createElement("div", {
          className: "title"
        }, React.createElement("div", {
          className: "desc"
        }, "iPhone & iPad"), React.createElement("div", {
          className: "links"
        }, React.createElement("a", {
          href: "https://itunes.apple.com/us/app/raindrop.io-keep-your-favorites/id1021913807",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-ios.png",
          height: "32",
          alt: ""
        }))))), React.createElement("div", {
          className: "item hide-on-mac",
          style: {
            backgroundColor: "#4CB580"
          }
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/android.png",
          alt: ""
        }), React.createElement("div", {
          className: "title"
        }, React.createElement("div", {
          className: "desc"
        }, "Android Phone & Tablet"), React.createElement("div", {
          className: "links"
        }, React.createElement("a", {
          href: "https://play.google.com/store/apps/details?id=io.raindrop.raindropio&hl=en",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-android.png",
          height: "38",
          alt: ""
        }))))), React.createElement("div", {
          className: "item",
          style: {
            backgroundColor: "#7753CD"
          }
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/mac.png",
          alt: ""
        }), React.createElement("div", {
          className: "title"
        }, React.createElement("div", {
          className: "desc"
        }, "Mac OS X"), React.createElement("div", {
          className: "links"
        }, React.createElement("a", {
          href: "https://itunes.apple.com/app/raindrop.io-keep-your-favorites/id957810159",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-mac.png",
          height: "32",
          alt: ""
        }))))), React.createElement("div", {
          className: "item",
          style: {
            backgroundColor: "#E8674F"
          }
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/mac.png",
          alt: ""
        }), React.createElement("div", {
          className: "title"
        }, React.createElement("div", {
          className: "desc"
        }, t.s("pro_speed_dial")), React.createElement("div", {
          className: "links"
        }, React.createElement("a", {
          href: "https://chrome.google.com/webstore/detail/raindropio-new-tab-speed/knifgjkgmgdinjeecneiphoniamhgbof",
          target: "_blank"
        }, React.createElement("img", {
          src: consts.host + "/img/marketing/teaser/badge-chrome.png",
          height: "32",
          alt: ""
        })))))))
      }
    })
  }, {
    "../components/Slider": 15
  }],
  20: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          user: UserStore.getUser(),
          loading: !0
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e,
          password: {},
          loading: !1
        })
      },
      componentWillMount: function () {
        UserStore.onLoad()
      },
      componentDidMount: function () {
        this.props.changeTitle("Integration"), this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      render: function () {
        var e = !1,
          n = consts.host + "/dropbox/authorize";
        _this = this;
        try {
          e = _this.state.user.dropbox.enabled
        } catch (a) {}
        return e && (n = consts.host + "/dropbox/revoke"), UserStore.isPro() || (n = "#/settings/pro"), React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, "Integration")), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, React.createElement("a", {
          href: n,
          target: window.targetLink,
          className: "item"
        }, React.createElement("span", {
          className: "title",
          style: {
            flex: 1
          }
        }, t.s("pro_dropbox"), React.createElement("span", {
          className: "subtitle"
        }, t.s("pro_dropboxD"))), React.createElement("span", {
          className: "last-icon"
        }, React.createElement("div", {
          className: "extra-checkbox" + (e ? " active" : "")
        })))))))
      }
    })
  }, {}],
  21: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          user: UserStore.getUser(),
          loading: !0
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e,
          loading: !1
        })
      },
      componentWillMount: function () {
        UserStore.onLoad()
      },
      componentDidMount: function () {
        this.props.changeTitle(t.s("upgradeAccount")), this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      renderFree: function () {
        return this.state.loading ? React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("loading"), "...")))) : React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("upgradeAccount"))), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, React.createElement("div", {
          className: "text"
        }, React.createElement("img", {
          className: "pull-right",
          src: consts.host + "/img/v3/pro-buy.png",
          width: "109",
          alt: ""
        }), React.createElement("strong", null, t.s("footerProAd"), " ", t.s("footerProAdD"), ":"), React.createElement("ul", null, React.createElement("li", null, t.s("nestedCollections")), React.createElement("li", null, t.s("dropboxBackup")), React.createElement("li", null, t.s("pro_nextFeatures")), React.createElement("li", null, t.s("pro_support")), React.createElement("li", null, t.s("pro_noAds")))), React.createElement("a", {
          href: consts.host + "/pages/pricing",
          target: window.targetLink,
          className: "item"
        }, React.createElement("span", {
          className: "title",
          style: {
            flex: 1
          }
        }, t.s("compareFreePro")), React.createElement("span", {
          className: "forward"
        }, React.createElement(Icon, {
          name: "chevron-right"
        }))), React.createElement("a", {
          href: consts.host + "/static/pro",
          target: window.targetLink,
          className: "item accent"
        }, React.createElement("span", {
          className: "title"
        }, t.s("upgradeToPro")), React.createElement("span", {
          className: "forward"
        }, React.createElement(Icon, {
          name: "chevron-right"
        }))))))
      },
      renderPro: function () {
        return React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("upgradeAccount"))), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, React.createElement("div", {
          className: "text"
        }, React.createElement("strong", {
          style: {
            textTransform: "capitalize"
          }
        }, React.createElement(Icon, {
          name: "done",
          className: "icn-green pull-right"
        }), t.s("until") + " " + moment(UserStore.getUser().proExpire).format("ll"))), React.createElement("a", {
          href: consts.host + "/static/pro",
          target: window.targetLink,
          className: "item accent"
        }, React.createElement("span", {
          className: "title"
        }, t.s("renewPro")), React.createElement("span", {
          className: "forward"
        }, React.createElement(Icon, {
          name: "chevron-right"
        }))))))
      },
      render: function () {
        return React.createElement("div", {
          className: "page-wrap"
        }, UserStore.isPro() ? this.renderPro() : this.renderFree(), React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, "Q&A")), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "Where do I get started?"), React.createElement("p", null, "Start with the free plan — it’s the best choice if you want to test our apps. Plus, it’s completely free.")), React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "Do I have to pay for my nested collections to keep them accessible?"), React.createElement("p", null, "No. Don’t worry, we won’t charge you for hosting your nested collections. The great news is that all your nested collections remain accessible even if your subscription ends or you’ve switched to the free plan.")), React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "How can I cancel my subscription?"), React.createElement("p", null, "At any time you can cancel the subscription and get your money back. To do this, please ", React.createElement("a", {
          href: "#/settings/help"
        }, "contact us"), ".")), React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "What happens at the end of the paid period?"), React.createElement("p", null, "When the period of paid subscription ends you automatically switch to the free plan. All your collections (including nested) will remain accessible, but if you want to create more nested collections you will have to switch to paid plan. Also Dropbox backup will be stopped.")), React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "Is there any discount for an annual subscription?"), React.createElement("p", null, "Yes, we offer a 20% discount if you choose annual subscription.")), React.createElement("div", {
          className: "text"
        }, React.createElement("strong", null, "Got more questions?"), React.createElement("p", null, "We are happy to help you. ", React.createElement("a", {
          href: "#/settings/help"
        }, "Contact us"), "."))))))
      }
    })
  }, {}],
  22: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          user: UserStore.getUser(),
          loading: !0
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e,
          password: {},
          loading: !1
        })
      },
      componentWillMount: function () {
        UserStore.onLoad()
      },
      componentDidMount: function () {
        this.props.changeTitle(t.s("profile")), this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      handleFullNameChange: function (e) {
        this.state.user.fullName = e.target.value, this.setState({
          user: this.state.user
        })
      },
      handleEmailChange: function (e) {
        this.state.user.email = e.target.value, this.setState({
          user: this.state.user
        })
      },
      handleSaveProfile: function (e) {
        e.preventDefault();
        var n = {
          fullName: this.state.user.fullName
        };
        this.state.user.email && (n.email = this.state.user.email, this.state.user.password || (n.newpassword = this.state.password.next)), this.setState({
          loading: !0
        }), Api.put("user", n, function (e) {
          e.result ? Toasts.show({
            text: t.s("saveSuccess")
          }) : Toasts.show({
            text: t.s("server" + e.error)
          }), UserStore.onLoad()
        })
      },
      handleLangChange: function (e) {
        e.preventDefault();
        var n = React.findDOMNode(this.refs.lang),
          a = n.options[n.selectedIndex].value;
        this.setState({
          loading: !0
        }), UserActions.updateLanguage({
          lang: a
        }, function () {
          t.setLang(a), location.reload()
        })
      },
      handleOldPasswordChange: function (e) {
        this.state.password.old = e.target.value, this.setState({
          password: this.state.password
        })
      },
      handleNewPasswordChange: function (e) {
        this.state.password.next = e.target.value, this.setState({
          password: this.state.password
        })
      },
      handleSavePassword: function (e) {
        e.preventDefault();
        var n = {
          oldpassword: this.state.password.old,
          newpassword: this.state.password.next,
          email: this.state.user.email,
          fullName: this.state.user.fullName
        };
        this.setState({
          loading: !0
        }), Api.put("user", n, function (e) {
          e.result ? Toasts.show({
            text: t.s("saveSuccess")
          }) : Toasts.show({
            text: t.s("server" + e.error)
          }), UserStore.onLoad()
        })
      },
      handleRemoveAccount: function (e) {
        e.preventDefault(), confirm(t.s("removeAccountD")) && (window.location = consts.host + "/api/user-remove")
      },
      render: function () {
        if (this.state.loading) return React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("loading"), "..."))));
        if (!UserStore.isLogged()) return React.createElement("div", {
          className: "page-wrap"
        });
        var e = [];
        for (var n in consts.languages) e.push(React.createElement("option", {
          selected: t.getLang() == n,
          value: n
        }, consts.languages[n]));
        var a = null;
        return this.state.user.password || (a = React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, t.s("password")), React.createElement("span", {
          className: "block"
        }, React.createElement("input", {
          type: "password",
          onChange: this.handleNewPasswordChange,
          placeholder: t.s("newPassword"),
          required: !0
        })))), React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("basicData")), React.createElement("p", null, t.s("changeAvatarInfo"))), React.createElement("article", null, React.createElement("form", {
          onSubmit: this.handleSaveProfile
        }, React.createElement("div", {
          className: "list"
        }, React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, t.s("yourName")), React.createElement("span", {
          className: "block"
        }, React.createElement("input", {
          type: "text",
          defaultValue: this.state.user.fullName,
          onChange: this.handleFullNameChange,
          required: !0
        }))), React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, "Email"), React.createElement("span", {
          className: "block"
        }, React.createElement("input", {
          type: "email",
          defaultValue: this.state.user.email,
          onChange: this.handleEmailChange,
          placeholder: "your@email.com",
          required: !0
        }))), a, React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, t.s("language")), React.createElement("span", {
          className: "block"
        }, React.createElement("select", {
          ref: "lang",
          onChange: this.handleLangChange
        }, e))), React.createElement("div", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, "ID"), React.createElement("span", {
          className: "block"
        }, this.state.user._id)), React.createElement("a", {
          href: "https://gravatar.com",
          target: "_blank",
          className: "item"
        }, React.createElement("span", {
          className: "title",
          style: {
            flex: 1
          }
        }, t.s("changeAvatar")), React.createElement("span", {
          className: "forward"
        }, React.createElement(Icon, {
          name: "chevron-right"
        })))), React.createElement("div", {
          className: "actions"
        }, React.createElement("input", {
          type: "submit",
          value: t.s("save")
        }))))), React.createElement("section", {
          className: this.state.user.password ? "" : "hidden"
        }, React.createElement("header", null, React.createElement("h2", null, t.s("changePassword"))), React.createElement("article", null, React.createElement("form", {
          onSubmit: this.handleSavePassword
        }, React.createElement("div", {
          className: "list"
        }, React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, t.s("currentPassword")), React.createElement("span", {
          className: "block"
        }, React.createElement("input", {
          type: "password",
          onChange: this.handleOldPasswordChange,
          placeholder: t.s("currentPassword"),
          required: !0
        }))), React.createElement("label", {
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, t.s("newPassword")), React.createElement("span", {
          className: "block"
        }, React.createElement("input", {
          type: "password",
          onChange: this.handleNewPasswordChange,
          placeholder: t.s("newPassword"),
          required: !0
        })))), React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: consts.host + "/account/reset",
          target: "_blank"
        }, t.s("recoverPassword")), React.createElement("input", {
          type: "submit",
          value: t.s("changePassword")
        }))))), React.createElement("section", null, React.createElement("article", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          onClick: this.handleRemoveAccount
        }, t.s("removeAccount"))))))
      }
    })
  }, {}],
  23: [function (e, n, a) {
    var o = (e("../../actions/Collections"),
      e("../../stores/Collections"));
    n.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          collections: o.getCollections(),
          childrens: []
        }
      },
      onCollectionsChange: function (e) {
        this.isMounted() && this.setState({
          collections: e
        })
      },
      componentWillMount: function () {
        o.onLoad()
      },
      componentDidMount: function () {
        this.props.changeTitle("RSS");
        var e = this;
        this.unsubscribeCollections = o.listen(this.onCollectionsChange), Api.get("childrens", function (t) {
          e.setState({
            childrens: t.items || []
          })
        })
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections()
      },
      renderItem: function (e) {
        var t = consts.defaultCollectionIcon();
        try {
          t = network.fixURL(e.cover[0])
        } catch (n) {}
        return React.createElement("a", {
          href: e.link,
          target: window.targetLink,
          className: "item"
        }, React.createElement("span", {
          className: "title"
        }, e.title), React.createElement("span", {
          className: "block"
        }, e.link), React.createElement("span", {
          className: "last-icon",
          style: {
            marginLeft: "20px"
          }
        }, React.createElement("img", {
          src: t,
          className: "icon",
          height: "24",
          alt: ""
        })))
      },
      render: function () {
        var e = this,
          n = this.state.collections.concat(this.state.childrens);
        n = _.sortBy(n, "title");
        var a = [];
        n.forEach(function (t) {
          t._id > 0 && t.uniqKey && a.push(e.renderItem({
            title: t.title,
            link: consts.host + "/feed/" + t.uniqKey,
            cover: t.cover
          }))
        });
        var o = [];
        return n.forEach(function (t) {
          t._id > 0 && o.push(e.renderItem({
            title: t.title,
            link: consts.host + "/collection/" + t._id + "/feed",
            cover: t.cover
          }))
        }), React.createElement("div", {
          className: "page-wrap"
        }, React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("privateRSSfeed")), React.createElement("p", null, t.s("feedWarning"))), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, this.renderItem({
          title: t.s("myCollections"),
          link: consts.host + "/feeds/" + UserStore.getUser().uniqKey
        }), this.renderItem({
          title: t.s("orAlternativeFeed"),
          link: consts.host + "/feed/" + UserStore.getUser().uniqKey
        }), a))), React.createElement("section", null, React.createElement("header", null, React.createElement("h2", null, t.s("publicRSSfeed"))), React.createElement("article", null, React.createElement("div", {
          className: "list"
        }, o))))
      }
    })
  }, {
    "../../actions/Collections": 3,
    "../../stores/Collections": 26
  }],
  24: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "exports",
      contextTypes: {
        router: React.PropTypes.func
      },
      mixins: [Router.State],
      getInitialState: function () {
        return {
          user: UserStore.getUser(),
          loading: !0,
          sidebar: !1,
          title: ""
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e,
          password: {},
          loading: !1
        })
      },
      componentWillMount: function () {
        UserStore.onLoad()
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      componentWillReceiveProps: function (e) {
        this.handleSidebar()
      },
      handleSidebar: function (e) {
        e && e.preventDefault();
        var t = !this.state.sidebar;
        this.setState({
          sidebar: t
        }), t ? document.documentElement.classList.add("sidebar-open") : document.documentElement.classList.remove("sidebar-open")
      },
      handleTitle: function (e) {
        this.setState({
          title: e
        })
      },
      renderLogged: function () {
        var e = React.createElement("a", {
          href: "#/settings/import"
        }, t.s("importBookmarks"));
        return -1 != window.environment.indexOf("mac") && (e = React.createElement("a", {
          href: consts.host + "/other/import/import.html",
          target: "_blank"
        }, t.s("importBookmarks"))), React.createElement("menu", null, React.createElement("li", {
          className: "section"
        }, t.s("account")), React.createElement("li", {
          className: "item hide-on-mac " + (this.context.router.isActive("pro") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/pro"
        }, t.s("upgradeAccount"))), React.createElement("li", {
          className: "item " + (this.context.router.isActive("profile") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings"
        }, t.s("profile"))), React.createElement("li", {
          className: "section"
        }, t.s("basicData")), React.createElement("li", {
          className: "item " + (this.context.router.isActive("import") ? "active" : "")
        }, e), React.createElement("li", {
          className: "item " + (this.context.router.isActive("export") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/export"
        }, t.s("exportBookmarks"))), React.createElement("li", {
          className: "item " + (this.context.router.isActive("integration") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/integration"
        }, "Integration")), React.createElement("li", {
          className: "item " + (this.context.router.isActive("rss") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/rss"
        }, "RSS")), React.createElement("li", {
          className: "section"
        }), React.createElement("li", {
          className: "item " + (this.context.router.isActive("install") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/install"
        }, t.s("install"), "   ", React.createElement(Icon, {
          name: "apple"
        }), " ", React.createElement(Icon, {
          name: "android",
          className: "hide-on-mac"
        }), " ", React.createElement(Icon, {
          name: "google-chrome"
        }), " ", React.createElement(Icon, {
          name: "laptop"
        }))), React.createElement("li", {
          className: "item " + (this.context.router.isActive("help") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/help"
        }, t.s("help"))), React.createElement("li", {
          className: "item " + (UserStore.isPro() ? "" : "hidden")
        }, React.createElement("a", {
          href: consts.host + "/static/upcoming",
          target: window.targetLink
        }, t.s("pro_nextFeatures"))), React.createElement("li", {
          className: "item"
        }, React.createElement("a", {
          href: consts.host + "/dev",
          target: window.targetLink
        }, t.s("forDevelopers"))))
      },
      renderStatic: function () {
        return React.createElement("menu", null, React.createElement("li", {
          className: "section"
        }, "Raindrop.io"), React.createElement("li", {
          className: "item " + (this.context.router.isActive("install") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/install"
        }, t.s("install"))), React.createElement("li", {
          className: "item " + (this.context.router.isActive("help") ? "active" : "")
        }, React.createElement("a", {
          href: "#/settings/help"
        }, t.s("help"))), React.createElement("li", {
          className: "item"
        }, React.createElement("a", {
          href: consts.host + "/dev",
          target: window.targetLink
        }, t.s("forDevelopers"))))
      },
      render: function () {
        var e = "/";
        return -1 != window.environment.indexOf("extension") && (e = "../../app/index.html"), -1 != window.environment.indexOf("mac") && (e = "../mac/index.html"), -1 != window.environment.indexOf("clipper") && (e = "../app/index.html" + window.location.search), React.createElement("div", {
          id: "page"
        }, React.createElement("div", {
          id: "sidebar"
        }, React.createElement("header", {
          className: "desktop_hide"
        }, React.createElement("a", {
          href: "",
          onClick: this.handleSidebar
        }, React.createElement(Icon, {
          name: "clear"
        }))), UserStore.isLogged() ? this.renderLogged() : this.renderStatic()), React.createElement("div", {
          id: "content"
        }, React.createElement(DocumentTitle, {
          title: this.state.title || ""
        }), React.createElement(RouteHandler, {
          changeTitle: this.handleTitle
        })), React.createElement("div", {
          id: "toolbar"
        }, React.createElement("a", {
          href: e,
          id: "go-back"
        }, React.createElement(Icon, {
          name: "back"
        })), React.createElement("a", {
          href: "",
          className: "title",
          onClick: this.handleSidebar
        }, this.state.title, React.createElement(Icon, {
          name: "arrow-down",
          size: "small",
          className: "mobileMenu desktop_hide"
        }))))
      }
    })
  }, {}],
  25: [function (e, n, a) {
    React = e("react"), Reflux = e("reflux"), consts = e("../app/config"), Api = e("../modules/api.js"), t = e("../modules/translate"), window.moment = e("moment"), t.setLang(), t.initJSfile(), _ = e("lodash"), network = e("../modules/network.js"), S = e("string"), Icon = e("../app/components/Helpers/Icon.js"), ls = e("localforage"), Toasts = e("../actions/Toast"), DocumentTitle = e("react-document-title"), UserActions = e("../actions/User"), UserStore = e("../stores/User"), Router = e("react-router");
    var o = Router.DefaultRoute,
      s = Router.Route,
      i = Router.Redirect;
    RouteHandler = Router.RouteHandler, Link = Router.Link;
    var r = React.createClass({
        displayName: "AppRoute",
        render: function () {
          return React.createElement(RouteHandler, null)
        }
      }),
      c = {
        loaded: !1,
        load: function () {
          if (this.loaded) return !1;
          UserStore.onLoad();
          var t = document.getElementById("app-toast"),
            n = e("../app/components/Toast.js");
          React.render(React.createElement(n, null), t), this.loaded = !0
        }
      };
    window.addEventListener(window.languageLoaded ? "DOMContentLoaded" : "langLoaded", function () {
      var t = document.getElementById("app-content"),
        n = e("./routes/Settings"),
        a = e("./routes/Pro"),
        l = e("./routes/Profile"),
        u = e("./routes/Import"),
        m = e("./routes/Export"),
        d = e("./routes/Integration"),
        p = e("./routes/RSS"),
        h = e("./routes/Install"),
        g = e("./routes/Help"),
        f = React.createElement(s, {
          path: "/",
          handler: r
        }, React.createElement(s, {
          name: "settings",
          path: "/settings",
          handler: n
        }, React.createElement(o, {
          name: "profile",
          handler: l
        }), React.createElement(s, {
          name: "pro",
          path: "pro",
          handler: a
        }), React.createElement(s, {
          name: "import",
          path: "import",
          handler: u
        }), React.createElement(s, {
          name: "export",
          path: "export",
          handler: m
        }), React.createElement(s, {
          name: "integration",
          path: "integration",
          handler: d
        }), React.createElement(s, {
          name: "rss",
          path: "rss",
          handler: p
        }), React.createElement(s, {
          name: "install",
          path: "install",
          handler: h
        }), React.createElement(s, {
          name: "help",
          path: "help",
          handler: g
        })), React.createElement(i, {
          to: "settings"
        }));
      Router.run(f, function (e, n) {
        var a = null;
        try {
          a = n.routes[1].name, a = n.routes[2].name
        } catch (o) {}
        document.body.setAttribute("data-route", a || ""), React.render(React.createElement(e, null), t, function () {
          c.load()
        })
      })
    }), window.environment = [], window.targetLink = "_self", -1 == window.location.protocol.indexOf("http") ? window.environment.push("extension") : window.environment.push("site"), -1 != window.location.href.indexOf("clipper/") ? window.environment.push("clipper") : -1 != window.location.search.indexOf("isMac") && (window.environment.push("mac"), window.targetLink = "_blank"), -1 != window.location.href.indexOf("only_current") && window.environment.push("only_current"), -1 != navigator.appVersion.indexOf("Win") && window.environment.push("Windows"), -1 != navigator.appVersion.indexOf("Mac") && window.environment.push("MacOS"), -1 != navigator.appVersion.indexOf("X11") && window.environment.push("UNIX"), -1 != navigator.appVersion.indexOf("Linux") && window.environment.push("Linux");
    for (var l in window.environment) document.documentElement.classList.add(window.environment[l])
  }, {
    "../actions/Toast": 6,
    "../actions/User": 7,
    "../app/components/Helpers/Icon.js": 8,
    "../app/components/Toast.js": 10,
    "../app/config": 11,
    "../modules/api.js": 12,
    "../modules/network.js": 13,
    "../modules/translate": 14,
    "../stores/User": 29,
    "./routes/Export": 16,
    "./routes/Help": 17,
    "./routes/Import": 18,
    "./routes/Install": 19,
    "./routes/Integration": 20,
    "./routes/Pro": 21,
    "./routes/Profile": 22,
    "./routes/RSS": 23,
    "./routes/Settings": 24,
    localforage: "localforage",
    lodash: "lodash",
    moment: "moment",
    react: "react",
    "react-document-title": "react-document-title",
    "react-router": "react-router",
    reflux: "reflux",
    string: "string"
  }],
  26: [function (e, n, a) {
    var o = e("../actions/Collections"),
      s = e("../actions/Childrens"),
      i = e("../actions/User"),
      r = e("../stores/Stats"),
      c = e("../actions/Bookmarks"),
      l = [],
      u = -2,
      m = !1,
      d = "sync";
    "undefined" != typeof isIOSapp && (u = 0);
    var p = [],
      h = function () {
        p = [{
          _id: 0,
          title: t.s("all"),
          view: "list"
        }, {
          _id: -2,
          title: t.s("favoriteSites"),
          view: "simple"
        }, {
          _id: -1,
          title: t.s("defaultCollection--1"),
          view: "list"
        }, {
          _id: -99,
          title: t.s("defaultCollection--99"),
          view: "list"
        }, {
          _id: -3,
          title: t.s("articles"),
          view: "list"
        }, {
          _id: -4,
          title: t.s("images") + " " + t.s("und") + " " + t.s("videos").toLowerCase(),
          view: "masonry"
        }];
        for (var e in p) p[e].view = Api.getItem("collection/" + p[e]._id + "/view") || p[e].view, p[e].cover = [(window.pathPrefix || "") + "../common/images/collection" + p[e]._id + ".png"]
      };
    document ? window.languageLoaded ? h() : window.addEventListener("langLoaded", h) : h();
    var g = Reflux.createStore({
      init: function () {
        this.listenTo(o.load, this.onLoad), this.listenTo(o.setCurrent, this.onSetCurrent), this.listenTo(o.updateCollection, this.onUpdateCollection), this.listenTo(o.insertCollection, this.onInsertCollection), this.listenTo(o.removeCollection, this.onRemoveCollection), this.listenTo(o.updateCountCollection, this.onUpdateCountCollection), this.listenTo(o.updateColorCollection, this.onUpdateColorCollection)
      },
      _saveCache: function () {
        switch (d) {
          case "async":
            try {
              ls.setItem("collections", l).then(function () {})["catch"](function (e) {})
            } catch (e) {}
            break;
          case "sync":
            Api.setItem("collections", JSON.stringify(l))
        }
      },
      onLoad: function (e) {
        var t = this;
        m || Api.get("collections", function (e) {
          if (m = !0, e.result) {
            l = e.items || [], t._insertDefaults(), t.trigger(l), t._saveCache(), UserStore._checkGroupsStability();
            try {
              window.Intercom("update", {
                collections: l.length
              })
            } catch (n) {}
          }
        })
      },
      onLoadId: function (e, t) {
        var n = this,
          a = _.findIndex(l, {
            _id: e
          }); - 1 == a ? Api.get("collection/" + e, function (e) {
          e.result && (n._updateOrInsertItem(e.item), n.trigger(l)), "function" == typeof t && t()
        }) : "function" == typeof t && t()
      },
      onSetCurrent: function (e) {
        if (null == e) return u = null, void this.trigger(l);
        u = parseInt(e);
        var t = _.findIndex(l, {
          _id: u
        }); - 1 != t ? this.trigger(l) : this.onLoadId(u)
      },
      onUpdateCollection: function (e, n) {
        var a = this,
          o = !1;
        "undefined" == typeof e.updateModel && (e.updateModel = !0), ("number" == typeof e.item.group || "number" == typeof e.item.parentId) && (o = !0), "number" == typeof e.item.group ? e.item.parentId = "root" : delete e.item.group, o && i.updateCollection({
          _id: e.item._id,
          group: e.item.group
        }), Api.put("collection/" + e.item._id, e.item, function (o) {
          o.result ? (a._updateOrInsertItem(o.item), e.silent || Toasts.show({
            text: t.s("saveSuccess"),
            title: e.item.title
          })) : e.silent || Toasts.show({
            text: strings.getErrorFromJSON(o),
            title: e.item.title,
            status: "error"
          }), "function" == typeof n && n((o.item || [])._id || !1)
        });
        var s = _.findIndex(l, {
          _id: parseInt(e.item._id)
        });
        if (-1 != s && e.updateModel) {
          for (var r in e.item) l[s][r] = e.item[r];
          if (this.trigger(l), l[s]._id <= 0)
            for (var r in e.item) Api.setItem("collection/" + e.item._id + "/" + r, e.item[r]);
          this._saveCache()
        }
      },
      onInsertCollection: function (e, n) {
        var a = this;
        Api.post("collection", e.item, function (o) {
          o.result ? (l.push(o.item), "number" == typeof e.item.group && (e.item.parentId = "root", i.updateCollection({
            _id: o.item._id,
            group: e.item.group
          })), e.silent || Toasts.show({
            text: t.s("addSuccess"),
            title: e.item.title
          }), a.trigger(l), a._saveCache()) : e.silent || Toasts.show({
            text: strings.getErrorFromJSON(o),
            title: e.item.title,
            status: "error"
          }), "function" == typeof n && n((o.item || [])._id || !1)
        })
      },
      onRemoveCollection: function (e, n) {
        var a = this,
          o = function () {
            Api.del("collection/" + e.item._id, function (o) {
              if (o.result) {
                if (e.item._id > 0) {
                  var r = _.findIndex(l, {
                    _id: e.item._id
                  }); - 1 != r && l.splice(r, 1)
                }
                Toasts.show({
                  text: -99 != e.item._id ? t.s("removeCollectionSuccess") : t.s("trashEmpty"),
                  title: e.item.title
                }), a.trigger(l), a._saveCache(), s.removeCollection(e), i.saveGroups(), a.getCurrentId() == e.item._id && c.reset(!0)
              } else Toasts.show({
                text: strings.getErrorFromJSON(o),
                title: e.item.title,
                status: "error"
              });
              "function" == typeof n && n(o.result)
            })
          };
        e.silent ? o() : confirm(t.s("collectionDeleteConfirm")) ? o() : "function" == typeof n && n(!1)
      },
      onUpdateCountCollection: function (e) {
        var t = _.findIndex(l, {
          _id: parseInt(e._id)
        });
        if (-1 != t) {
          switch (e.count) {
            case "+":
              l[t].count++;
              break;
            case "-":
              l[t].count--;
              break;
            default:
              l[t].count = e.count
          }
          this.trigger(l)
        }
      },
      onUpdateColorCollection: function (e) {
        var t = _.findIndex(l, {
          _id: parseInt(e._id)
        }); - 1 != t && (l[t].color = e.color, (l[t].cover || []).length > 0 && Api.setItem("collection_color_" + l[t].cover[0], e.color), this.trigger(l))
      },
      getCollections: function () {
        return l
      },
      getCurrentId: function (e) {
        if (e) switch (e) {
          case "file":
            if (0 > u && -1 > u) return -1
        }
        return u
      },
      getCollection: function (e) {
        e = parseInt(e);
        var t = _.findIndex(l, {
          _id: e
        });
        return -1 != t ? (0 === e ? l[t].count = r.getAllCount() : 0 > e && (l[t].count = r.getCollectionCount(e)), this._prepareItem(l[t])) : null
      },
      getCount: function () {
        return l.length
      },
      reset: function (e) {
        e = e || {}, d = "undefined" != typeof e.speed ? e.speed : "sync", l = [], u = -2, "undefined" != typeof isIOSapp && (u = 0), m = !1, 0 != l.length || m || this._resetFromCache()
      },
      _updateOrInsertItem: function (e) {
        var t = _.findIndex(l, {
          _id: parseInt(e._id)
        }); - 1 != t ? l[t] = e : l.push(e)
      },
      _insertDefaults: function () {
        var e = this;
        p.forEach(function (t) {
          e._updateOrInsertItem(t)
        })
      },
      _resetFromCache: function () {
        if (!window.cacheDisabled) switch (d) {
          case "async":
            var e = this;
            try {
              ls.getItem("collections").then(function (t) {
                t && 0 == l.length && (l = t, e._insertDefaults(), e.trigger(l))
              })["catch"](function (e) {})
            } catch (t) {}
            break;
          case "sync":
            var n = Api.getItem("collections");
            try {
              n = JSON.parse(n)
            } catch (t) {
              t && (n = null)
            }
            "object" == typeof n && null != n && (l = n, this._insertDefaults())
        }
      },
      _prepareItem: function (e) {
        if ("undefined" != typeof e.parent && "undefined" != typeof e.parent.$id && (e.parentId = e.parent.$id, delete e.group), "undefined" == typeof e.parentId) {
          var t = UserStore.getCollectionGroup(e._id);
          null != t && (e.group = parseInt(t))
        }
        return (e.cover || []).length > 0 && (e.color = Api.getItem("collection_color_" + e.cover[0])), e
      },
      _forceUpdate: function () {
        this.trigger(l)
      },
      isLoading: function () {
        return !m
      }
    });
    g.reset(), n.exports = g
  }, {
    "../actions/Bookmarks": 1,
    "../actions/Childrens": 2,
    "../actions/Collections": 3,
    "../actions/User": 7,
    "../stores/Stats": 27
  }],
  27: [function (e, t, n) {
    var a = e("../actions/Stats"),
      o = e("../actions/Collections"),
      s = {},
      i = !1,
      r = 0,
      c = !1,
      l = Reflux.createStore({
        init: function () {
          this.listenTo(a.load, this.onLoad), this.listenTo(o.updateCountCollection, this.onUpdate)
        },
        onLoad: function () {
          var e = this;
          if (!i) {
            try {
              ls.getItem("stat").then(function (t) {
                t && !c && (s = t, e._countAll(), e.trigger(s))
              })["catch"](function (e) {})
            } catch (t) {}
            i = !0, Api.get("stat", function (t) {
              if (t.result) {
                s = t.items, e._countAll();
                try {
                  ls.setItem("stat", s).then(function () {})["catch"](function (e) {})
                } catch (n) {}
                e.trigger(s)
              }
              i = !1, c = !0
            })
          }
        },
        onUpdate: function (e) {
          var t = _.findIndex(s, {
            _id: e._id
          });
          switch (e.count) {
            case "+":
              -99 != e._id && r++, -1 != t && s[t].count++, this.trigger(s);
              break;
            case "-":
              -99 != e._id && r--, 0 > r && (r = 0), -1 != t && (s[t].count--, s[t].count < 0 && (s[t].count = 0)), this.trigger(s)
          }
        },
        _countAll: function () {
          r = 0;
          for (var e in s) - 2 === s[e]._id ? r -= s[e].count || 0 : "number" != typeof s[e]._id && (r += parseInt(s[e].count || 0));
          0 > r && (r = 0)
        },
        getStat: function () {
          return s
        },
        getAllCount: function () {
          return r
        },
        getCollectionCount: function (e) {
          var t = _.findIndex(s, {
            _id: e
          });
          return -1 != t ? s[t].count : 0
        }
      });
    t.exports = l
  }, {
    "../actions/Collections": 3,
    "../actions/Stats": 5
  }],
  28: [function (e, t, n) {
    var a = [],
      o = 3e3,
      s = Reflux.createStore({
        init: function () {
          this.listenTo(Toasts.show, this.onShow), this.listenTo(Toasts.close, this.onClose), this.listenTo(Toasts.stopTimer, this.onStopTimer)
        },
        onShow: function (e) {
          e.id = parseInt((new Date).getTime() / 1e3), e.timeout = setTimeout(function () {
            Toasts.close({
              id: e.id
            })
          }, o), e.closing = !1, a.push(e), this.trigger(a)
        },
        onClose: function (e) {
          this._removeItem(parseInt(e.id))
        },
        onStopTimer: function (e) {
          var t = _.findIndex(a, {
            id: parseInt(e.id)
          }); - 1 != t && clearTimeout(a[t].timeout)
        },
        _removeItem: function (e, t) {
          var n = this,
            o = _.findIndex(a, {
              id: e
            });
          if (-1 != o) {
            try {
              clearTimeout(a[o].timeout)
            } catch (s) {}
            a.splice(o, 1), "undefined" == typeof t && n.trigger(a)
          }
        },
        getToasts: function () {
          return a
        },
        reset: function () {
          a = []
        }
      });
    t.exports = s
  }, {}],
  29: [function (e, n, a) {
    var o = e("../actions/User"),
      s = (e("../actions/ModalFrame"), e("./Collections")),
      i = {},
      r = !1,
      c = !1,
      l = Reflux.createStore({
        init: function () {
          this.listenTo(o.load, this.onLoad), this.listenTo(o.toggleGroup, this.onToggleGroup), this.listenTo(o.updateGroup, this.onUpdateGroup), this.listenTo(o.insertGroup, this.onInsertGroup), this.listenTo(o.removeGroup, this.onRemoveGroup), this.listenTo(o.swapGroups, this.onSwapGroups), this.listenTo(o.saveGroups, this.saveGroups), this.listenTo(o.updateCollection, this.onUpdateCollection), this.listenTo(o.swapCollections, this.onSwapCollections), this.listenTo(o.updateLanguage, this.onUpdateLanguage), this.listenTo(o.updateConfig, this.onUpdateConfig), this.listenTo(o.logOut, this.onLogOut), this.listenTo(o.signIn, this.onSignIn), this.listenTo(o.signUp, this.onSignUp)
        },
        onLoad: function (e) {
          if (c) return void("function" == typeof e && e(!1));
          var t = this;
          c = !0, this._resetFromCache(), Api.get("user", function (n) {
            var a = function () {
              n.result ? (i = n.user, r = !0, t.cleanGroups()) : (i = {}, r = !1), Api.setItem("user", JSON.stringify(i));
              try {
                ls.setItem("user_id", i._id || 0).then(function () {})["catch"](function (e) {})
              } catch (e) {}
              c = !1, t.trigger(i), t._checkGroupsStability(), t.updateIntercom()
            };
            if ("boolean" == typeof n.result || "boolean" == typeof n.auth) try {
              ls.getItem("user_id").then(function (o) {
                var s = null;
                try {
                  s = parseInt(n.user._id)
                } catch (i) {}
                n.result && parseInt(o) == s ? a() : t._cleanCache(a), "function" == typeof e && e(n.result)
              })["catch"](function (e) {
                a()
              })
            } catch (o) {
              a()
            } else "function" == typeof e && e(n.result)
          })
        },
        updateIntercom: function () {
          try {
            var e = {
              app_id: "ar0opykp",
              user_id: i._id,
              name: i.fullName,
              email: i.email || "",
              created_at: Math.floor(new Date(i.registered).getTime() / 1e3),
              pro: i.pro || !1,
              groups: (i.groups || []).length || 0,
              platform: "web"
            };
            i.proExpire && (e.pro_expire = Math.floor(new Date(i.proExpire).getTime() / 1e3)), "undefined" != typeof window && "undefined" != typeof window.Intercom && window.Intercom("boot", e), "undefined" != typeof NativeHelpers && (e.platform = "ios", delete e.app_id, NativeHelpers.intercomSetUser(e.user_id + "", e))
          } catch (t) {}
          try {
            Raven.setUserContext({
              email: i.email,
              id: i._id
            })
          } catch (t) {}
        },
        onToggleGroup: function (e) {
          var t = _.findIndex(i.groups || [], {
            id: e.id
          }); - 1 != t && (i.groups[t].hidden = !i.groups[t].hidden, this.saveGroups())
        },
        onUpdateGroup: function (e) {
          var n = _.findIndex(i.groups || [], {
            id: e.id
          });
          if (-1 != n) {
            for (var a in e.item) i.groups[n][a] = e.item[a];
            this.saveGroups(function (n) {
              n.result ? Toasts.show({
                text: t.s("saveSuccess"),
                title: e.item.title
              }) : Toasts.show({
                text: t.s("saveError"),
                title: e.item.title,
                status: "error"
              })
            })
          }
        },
        onInsertGroup: function (e, n) {
          "string" == typeof e.item.collections && (e.item.collections = JSON.parse(e.item.collections)), i.groups.push({
            title: e.item.title,
            hidden: !1,
            id: (new Date).getTime(),
            sort: (i.groups || []).length,
            collections: e.item.collections || []
          }), this.saveGroups(function (a) {
            e.silent || (a.result ? Toasts.show({
              text: t.s("addSuccess"),
              title: e.item.title
            }) : Toasts.show({
              text: t.s("saveError"),
              title: e.item.title,
              status: "error"
            })), "function" == typeof n && n(a.result)
          }, e)
        },
        onRemoveGroup: function (e) {
          var n = _.findIndex(i.groups || [], {
              id: e.id
            }),
            a = !1,
            o = ""; - 1 != n && (o = i.groups[n].title, 0 == (i.groups[n].collections || []).length && (i.groups.splice(n, 1), a = !0)), a ? (this.saveGroups(), Toasts.show({
            text: t.s("removeSuccess"),
            title: o
          })) : Toasts.show({
            text: t.s("removeGroupError"),
            title: o,
            status: "error"
          })
        },
        onSwapGroups: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = _.findIndex(i.groups, {
              id: parseInt(e.fromId)
            }),
            n = _.findIndex(i.groups, {
              id: parseInt(e.toId)
            });
          if (-1 == t || -1 == n) return !1;
          i.groups = strings.swapArray(i.groups, t, n);
          for (var a in i.groups) i.groups[a].sort = a;
          this.saveGroups()
        },
        onUpdateCollection: function (e) {
          var t = !1,
            n = !1;
          "undefined" == typeof e.group && (e.group = -1);
          for (var a in i.groups)
            for (var o in i.groups[a].collections || []) i.groups[a].collections[o] == e._id && (e.group != a && (i.groups[a].collections.splice(o, 1), t = !0), n = !0);
          (t || !n) && (e.group >= 0 && ("object" != typeof i.groups[e.group].collections && (i.groups[e.group].collections = []), "undefined" != typeof e.toTop ? i.groups[e.group].collections.unshift(e._id) : i.groups[e.group].collections.push(e._id), i.groups[e.group].hidden = !1), this.saveGroups())
        },
        onSwapCollections: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = {
              index: -1
            },
            n = {
              index: -1
            };
          for (var a in i.groups) {
            var o = (i.groups[a].collections || []).indexOf(parseInt(e.fromId)),
              s = (i.groups[a].collections || []).indexOf(parseInt(e.toId));
            if (-1 != o && (t.index = o, t.group = a), -1 != s && (n.index = s, n.group = a), -1 != t.index && -1 != n.index) break
          }
          if (-1 != t.index && -1 != n.index) {
            if (t.group == n.group) i.groups[t.group].collections = strings.swapArray(i.groups[t.group].collections, t.index, n.index);
            else {
              var o = i.groups[t.group].collections[t.index];
              i.groups[t.group].collections.splice(t.index, 1), i.groups[n.group].collections.splice(n.index, 0, o)
            }
            this.saveGroups()
          }
        },
        onUpdateLanguage: function (e, t) {
          "object" != typeof i.config && (i.config = {}), i.config.lang = e.lang, this.saveConfig({
            lang: i.config.lang
          }, t)
        },
        onUpdateConfig: function (e, t) {
          "object" != typeof i.config && (i.config = {});
          for (var n in e) i.config[n] = e[n];
          this.saveConfig(e, t)
        },
        onLogOut: function (e) {
          var t = this;
          t._cleanCache(function () {
            Api.get(network.fixURL("/auth/logout"), function () {
              t.reset(), e()
            })
          })
        },
        onSignIn: function (e, t) {
          var n = this;
          "undefined" == typeof t && (t = {});
          var a = "/account" + (-1 == (window.environment || []).indexOf("web") ? "?extension" : "");
          t.google && (a = "/auth/google" + (-1 == (window.environment || []).indexOf("web") ? "?redirect=%2Fother%2Fmodal-login.html" : "")), -1 != (window.environment || []).indexOf("desktop") ? window.location = network.fixURL(a) : -1 != (window.environment || []).indexOf("clipper") ? (window.location.hash = "#/waitauth", BrowserBridge.openModal(network.fixURL(a), {
            width: 700,
            height: 600
          })) : "undefined" != typeof chrome ? chrome.windows.create({
            url: network.fixURL(a),
            type: "popup",
            width: 700,
            height: 600
          }, function (t) {
            chrome.windows.onRemoved.addListener(function (a) {
              a == t.id && n._cleanCache(e)
            })
          }) : (window.open(network.fixURL(a), "raindropwindow", "width=700,height=600,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no"), window.location.hash = "#/waitauth")
        },
        onSignUp: function (e) {
          var t = this; - 1 != (window.environment || []).indexOf("desktop") ? window.location = network.fixURL("/account/signup" + (-1 == (window.environment || []).indexOf("web") ? "?extension" : "")) : -1 != (window.environment || []).indexOf("clipper") ? (window.location.hash = "#/waitauth", BrowserBridge.openModal(network.fixURL("/account/signup?extension"), {
            width: 700,
            height: 600
          })) : "undefined" != typeof chrome ? chrome.windows.create({
            url: network.fixURL("/account/signup?extension"),
            type: "popup",
            width: 700,
            height: 600
          }, function (n) {
            chrome.windows.onRemoved.addListener(function (a) {
              a == n.id && t._cleanCache(e)
            })
          }) : (window.open(network.fixURL("/account/signup?extension"), "raindropwindow", "width=700,height=600,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no"), window.location.hash = "#/waitauth")
        },
        _cleanCache: function (e) {
          var t = Api.getItem("background-image");
          Api.clear(), Api.setItem("welcome-onboard", "true"), Api.setItem("background-image", t);
          try {
            ls.clear(function (t) {
              e()
            })
          } catch (n) {
            e()
          }
        },
        getUser: function () {
          return "undefined" == typeof i._id && this._resetFromCache(), _.clone(i)
        },
        getGroup: function (e) {
          var t = _.findIndex(i.groups || [], {
            id: e
          });
          return -1 != t ? i.groups[t] : null
        },
        isLogged: function () {
          return r
        },
        isLoading: function () {
          return c
        },
        isPro: function () {
          return r && i.pro ? !0 : !1
        },
        reset: function () {
          i = {}, r = !1, c = !1
        },
        cleanGroups: function () {
          if ((i.groups || []).length > 0) {
            for (var e in i.groups) null == (i.groups[e].id || null) && (i.groups[e].id = parseInt(e));
            i.groups = _.sortBy(i.groups, function (e) {
              return e.sort
            })
          } else i.groups = [{
            id: 0,
            sort: 0,
            title: t.s("myCollections"),
            hidden: !1
          }]
        },
        saveGroups: function (e, t) {
          if (t = t || {}, "undefined" == typeof t.cleanCollections && (t.cleanCollections = !0), s.getCount() > 0 && t.cleanCollections)
            for (var n in i.groups) {
              var a = [];
              for (var o in i.groups[n].collections || []) null == s.getCollection(i.groups[n].collections[o]) && a.push(o);
              _.pullAt(i.groups[n].collections, a)
            }
          this.saveConfig({
            groups: i.groups
          }, e)
        },
        removeEmptyGroups: function (e) {
          var t = [];
          for (var n in i.groups) 0 == (i.groups[n].collections || []).length && t.push(n);
          _.pullAt(i.groups, t), this.saveGroups(e, {
            cleanCollections: !1
          })
        },
        saveConfig: function (e, t) {
          "undefined" == typeof e.updateModel && (e.updateModel = !0);
          try {
            e.updateModel && (i.config[e.name] = !0)
          } catch (n) {}
          Api.put("userConfig", e, function (e) {
            "function" == typeof t && t(e)
          }), Api.setItem("user", JSON.stringify(i)), this.trigger(i)
        },
        getCollectionGroup: function (e) {
          for (var t in i.groups)
            for (var n in i.groups[t].collections || [])
              if (i.groups[t].collections[n] == e) return parseInt(t);
          return null
        },
        getConfig: function (e) {
          var t = !1;
          try {
            t = i.config[e]
          } catch (n) {}
          return t
        },
        _checkGroupsStability: function () {
          if (l.isLogged() && !l.isLoading() && s.getCount() > 0 && !s.isLoading()) {
            var e = [],
              n = s.getCollections();
            if (n.forEach(function (t) {
                var n = t._id <= 0;
                "undefined" != typeof t.parent && (n = !0), "undefined" != typeof t.parentId && (n = !0), (i.groups || []).forEach(function (e) {
                  var a = (e.collections || []).some(function (e) {
                    return parseInt(e) == parseInt(t._id)
                  });
                  a && (n = !0)
                }), n || e.push(parseInt(t._id))
              }), e.length > 0) {
              e = _.uniq(e);
              var a = _.findIndex(i.groups || [], {
                title: t.s("myCollections")
              }); - 1 != a ? i.groups[a].collections = (i.groups[a].collections || []).concat(e) : (i.groups = i.groups || [], i.groups.push({
                id: i.groups.length,
                sort: i.groups.length,
                title: t.s("myCollections"),
                hidden: !1,
                collections: e
              })), l.saveGroups()
            }
          }
        },
        _resetFromCache: function () {
          if (!window.cacheDisabled && !r) {
            r = !1;
            var e = Api.getItem("user");
            try {
              e = JSON.parse(e)
            } catch (t) {
              t && (e = null)
            }
            "object" == typeof e && null != e && (i = e, i._id && (r = !0, this.cleanGroups()))
          }
        },
        _setProData: function (e, t) {
          i.pro = e, i.proExpire = t
        }
      });
    n.exports = l
  }, {
    "../actions/ModalFrame": 4,
    "../actions/User": 7,
    "./Collections": 26
  }]
}, {}, [25]);
//# sourceMappingURL=settings.js.map
