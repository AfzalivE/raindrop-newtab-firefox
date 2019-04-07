! function e(t, n, o) {
  function i(r, a) {
    if (!n[r]) {
      if (!t[r]) {
        var c = "function" == typeof require && require;
        if (!a && c) return c(r, !0);
        if (s) return s(r, !0);
        var l = new Error("Cannot find module '" + r + "'");
        throw l.code = "MODULE_NOT_FOUND", l
      }
      var u = n[r] = {
        exports: {}
      };
      t[r][0].call(u.exports, function (e) {
        var n = t[r][1][e];
        return i(n ? n : e)
      }, u, u.exports, e, t, n, o)
    }
    return n[r].exports
  }
  for (var s = "function" == typeof require && require, r = 0; r < o.length; r++) i(o[r]);
  return i
}({
  1: [function (e, t, n) {
    var o = Reflux.createActions(["load", "parseURL", "loadBookmark", "insertBookmark", "updateBookmark", "updateSelectedBookmarks", "removeBookmark", "removeSelectedBookmarks", "copySelectedBookmarks", "swapBookmarks", "saveAllSort", "syncMove", "initFavorites", "setSelected", "selectAll", "clearSelect", "reset"]);
    t.exports = o
  }, {}],
  2: [function (e, t, n) {
    var o = Reflux.createActions(["load", "swapCollections", "saveAllSort", "removeCollection"]);
    t.exports = o
  }, {}],
  3: [function (e, t, n) {
    var o = Reflux.createActions(["load", "setCurrent", "updateCollection", "insertCollection", "removeCollection", "updateCountCollection", "updateColorCollection"]);
    t.exports = o
  }, {}],
  4: [function (e, t, n) {
    t.exports = Reflux.createActions(["insert", "update", "remove"])
  }, {}],
  5: [function (e, t, n) {
    var o = Reflux.createActions(["show"]);
    t.exports = o
  }, {}],
  6: [function (e, t, n) {
    t.exports = Reflux.createActions(["load"])
  }, {}],
  7: [function (e, t, n) {
    var o = Reflux.createActions(["load"]);
    t.exports = o
  }, {}],
  8: [function (e, t, n) {
    var o = Reflux.createActions(["load", "toggleGroup", "updateGroup", "insertGroup", "removeGroup", "swapGroups", "saveGroups", "updateCollection", "updateLanguage", "updateConfig", "swapCollections", "logOut", "signIn", "signUp"]);
    t.exports = o
  }, {}],
  9: [function (e, t, n) {
    var o = e("../../../actions/Collections"),
      i = e("../../../stores/Collections");
    t.exports = React.createClass({
      displayName: "Forms/CollectionsList",
      scrolled: !1,
      getInitialState: function () {
        return {
          items: i.getCollections(),
          childrens: [],
          user: UserStore.getUser()
        }
      },
      onCollectionsChange: function (e) {
        this.setState({
          items: e
        })
      },
      onUserChange: function (e) {
        this.setState({
          user: e
        })
      },
      scrollToActive: function () {
        if (!this.scrolled) {
          var e = !1;
          this.props.activeCollection ? e = document.getElementById("cl-collection-" + this.props.activeCollection) : this.props.activeGroup && (e = document.getElementById("cl-group-" + this.props.activeGroup)), e && (e.scrollIntoView(!1), this.scrolled = !0)
        }
      },
      componentWillMount: function () {
        o.load()
      },
      componentDidMount: function () {
        var e = this;
        this.unsubscribeCollections = i.listen(this.onCollectionsChange), this.unsubscribeUser = UserStore.listen(this.onUserChange);
        var t = null;
        try {
          t = JSON.parse(Api.getItem("childrens"))
        } catch (n) {}
        t && 0 == e.state.childrens.length && (e.state.childrens = _.sortBy(t, function (e) {
          return e.sort
        }), e.setState({
          childrens: e.state.childrens
        })), Api.get("childrens", function (t) {
          var n = _.sortBy(t.items || [], function (e) {
            return e.sort
          });
          e.setState({
            childrens: n
          }), Api.setItem("childrens", JSON.stringify(n))
        })
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections(), this.unsubscribeUser()
      },
      handleCollectionSelect: function (e) {
        e.preventDefault();
        var t = null,
          n = parseInt(e.target.getAttribute("data-cid"));
        for (var o in this.state.items)
          if (this.state.items[o]._id == n) {
            t = this.state.items[o];
            break
          }
        for (var o in this.state.childrens)
          if (this.state.childrens[o]._id == n) {
            t = this.state.childrens[o];
            break
          }
        this.props.onSelectCollection(t)
      },
      handleGroupSelect: function (e) {
        e.preventDefault();
        var t = parseInt(e.target.getAttribute("data-index"));
        this.props.onSelectGroup(this.state.user.groups[t], t)
      },
      componentDidUpdate: function () {
        this.props.onUpdate && this.props.onUpdate(), this.scrollToActive()
      },
      render: function () {
        var e = [],
          t = this,
          n = "function" == typeof t.props.onSelectGroup,
          o = function (e) {
            var n = "https://raindrop.io/other/popup/img/icon-folder.png";
            try {
              n = network.fixURL(e.cover[0])
            } catch (o) {}
            return React.createElement("div", {
              id: "cl-collection-" + e._id,
              className: "item" + ((t.props.activeCollection || 0) == e._id ? " active" : ""),
              style: {
                paddingLeft: 20 * e.level + "px"
              }
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement("img", {
              src: n,
              alt: ""
            })), React.createElement("div", {
              className: "title"
            }, e.title), React.createElement("a", {
              href: "",
              className: "permalink",
              "data-cid": e._id,
              onClick: t.handleCollectionSelect
            }))
          },
          s = function (e, o) {
            if (n) {
              var i = null;
              return o > 0 && (i = React.createElement("div", {
                className: "section"
              })), React.createElement("div", null, i, React.createElement("div", {
                id: "cl-group-" + o,
                className: "item" + (t.props.activeGroup == o ? " active" : "")
              }, React.createElement("div", {
                className: "icon"
              }, React.createElement(Icon, {
                name: "group",
                size: "mac"
              })), React.createElement("div", {
                className: "title"
              }, e.title), React.createElement("a", {
                href: "",
                className: "permalink",
                "data-index": o,
                onClick: t.handleGroupSelect
              })))
            }
            return React.createElement("div", {
              className: "section"
            }, e.title)
          },
          r = function (n, i) {
            t.state.childrens.forEach(function (s) {
              s.parent.$id == n && s._id != t.props.skipCollection && (s.level = i, e.push(o(s)), r(s._id, i + 1))
            })
          };
        return (this.state.user.groups || []).length > 0 && this.state.user.groups.forEach(function (a, c) {
          (n || (a.collections || []).length > 0) && e.push(s(a, c)), (a.collections || []).length > 0 && a.collections.forEach(function (s) {
            var a = i.getCollection(s);
            null != a && a._id != t.props.skipCollection && a.author && (a.level = n ? 2 : 1, e.push(o(a)), r(a._id, n ? 3 : 2))
          })
        }), n || (e.push(React.createElement("div", {
          className: "section"
        })), e.push(o(i.getCollection(-2))), UserStore.isLogged() && (e.push(o(i.getCollection(-1))), e.push(o(i.getCollection(-99))))), React.createElement("div", {
          className: "picker-list"
        }, e)
      }
    })
  }, {
    "../../../actions/Collections": 3,
    "../../../stores/Collections": 25
  }],
  10: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/CoverSelector",
      getInitialState: function () {
        var e = 0;
        return e = "undefined" == typeof this.props.selected ? -1 : this.props.selected, {
          items: this.props.items || [],
          selected: e
        }
      },
      componentWillReceiveProps: function (e) {
        var t = 0;
        t = "undefined" == typeof e.selected ? -1 : e.selected, this.isMounted() && this.setState({
          items: e.items,
          selected: t
        })
      },
      handleSelect: function (e) {
        e.preventDefault();
        var t = parseInt(e.target.getAttribute("data-index"));
        this.isMounted() && this.setState({
          selected: t
        }), this.props.onSelect(t)
      },
      render: function () {
        var e = this,
          t = this.state.items.map(function (t, n) {
            var o = "item";
            if (parseInt(e.state.selected) == parseInt(n) && (o += " active"), "" == t && (o += " blank"), e.props.thumbs) {
              var i = t.indexOf(".jpg");
              i > 0 && (t = t.substr(0, i) + "-thumb" + t.substr(i, 1e3))
            }
            var s = {
              backgroundImage: "url(" + t + ")"
            };
            return "undefined" != typeof e.props.imageSize && (s.backgroundSize = e.props.imageSize), React.createElement("div", {
              className: o,
              style: s,
              key: "coveritem_" + t,
              id: "coveritem_" + n
            }, React.createElement("a", {
              href: "",
              "data-index": n,
              onClick: e.handleSelect
            }, React.createElement(Icon, {
              name: "done"
            })))
          });
        return React.createElement("div", {
          className: "cover-selector"
        }, t, this.props.children)
      }
    })
  }, {}],
  11: [function (e, t, n) {
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
  12: [function (e, t, n) {
    t.exports = {
      handleSelectFilter: function (e, t, n) {
        var o = n.map(function (e) {
            return e
          }),
          i = function (e) {
            return o.indexOf(e.value) > -1 ? !1 : -1 != e.value.indexOf(t)
          },
          s = (e || []).filter(i, this);
        return "" != t.trim() && s.unshift({
          value: t,
          label: t
        }), s
      },
      handleSelectFocus: function () {
        document.body.classList.add("selectize-overflow-visible")
      },
      handleSelectBlur: function () {
        setTimeout(function () {
          document.body.classList.remove("selectize-overflow-visible")
        }, 50)
      }
    }
  }, {}],
  13: [function (e, t, n) {
    var o = "https://raindrop.io",
      i = "/api/";
    t.exports = {
      host: o,
      apiPrefix: o + i,
      screenshotService: o + "/screenshot/?url=",
      contentTypes: ["link", "article", "image", "video"],
      proPage: o + "/static/pro",
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
        for (var o in this.backgroundImages)
          if (this.backgroundImages[o].src == e) {
            t = o;
            break
          }
        return t
      },
      setBackground: function (e) {
        var t = this.getBackgroundSelected();
        if (t >= 0) {
          var n = this.backgroundImages[t];
          document.documentElement.classList.remove("contrast-white"), document.documentElement.classList.remove("contrast-black"), document.documentElement.classList.add("contrast-" + n.contrast || "black");
          var o = function (e) {
            var t = function () {
              null != document.getElementById("app-background") && (document.getElementById("app-background").style.backgroundImage = 'url("' + e + '")')
            };
            null != document.getElementById("app-background") ? t() : document.addEventListener("DOMContentLoaded", t)
          };
          if (!n.src) return void o("about:blank");
          var i = (e || "") + n.src,
            s = null;
          try {
            localStorage.getItem(i)
          } catch (r) {}
          if (null == s) {
            var a = new XMLHttpRequest,
              c = new FileReader;
            a.onload = function () {
              if (4 == a.readyState && 200 == a.status) {
                var e = new Blob([a.response], {
                  type: "image/jpeg"
                });
                c.onload = function (e) {
                  var t = e.target.result;
                  o(t);
                  try {
                    localStorage.setItem(i, t)
                  } catch (n) {}
                }, c.readAsDataURL(e)
              }
            }, a.open("GET", i, !0), a.responseType = "arraybuffer", a.send()
          } else o(s)
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
  14: [function (e, n, o) {
    aboutApp = JSON.parse(e("../newtab/manifest.json")), Raven = e("raven-js"), Raven.config("https://37d1786e89b7423d9309613f33bb56c3@app.getsentry.com/16738", {
      release: aboutApp.version
    }).install();
    try {
      ga("send", "pageview")
    } catch (i) {}
    React = e("react"), Reflux = e("reflux"), consts = e("../app/config"), Api = e("../modules/api.js"), t = e("../modules/translate"), window.moment = e("moment"), t.setLang(), t.initJSfile(), _ = e("lodash"), network = e("../modules/network.js"), S = e("string"), Icon = e("../app/components/Helpers/Icon.js"), ls = e("localforage"), bridge = e("./bridge"), UserActions = e("../actions/User"), UserStore = e("../stores/User");
    var s = e("./components/Bookmark.js"),
      r = e("./components/Welcome.js"),
      a = e("./components/Login.js"),
      c = React.createClass({
        displayName: "AppRoute",
        getInitialState: function () {
          var e = "bookmark";
          return {
            step: e
          }
        },
        shouldComponentUpdate: function (e, t) {
          return this.state.step != t.step
        },
        onUserChange: function (e) {
          this.isMounted() && (UserStore.isLogged() || "bookmark" != this.state.step || this.setState({
            step: "login"
          }))
        },
        componentDidMount: function () {
          this.unsubscribeUser = UserStore.listen(this.onUserChange), UserActions.load()
        },
        componentWillUnmount: function () {
          this.unsubscribeUser()
        },
        render: function () {
          switch (this.state.step) {
            case "bookmark":
              return React.createElement(s, null);
            case "welcome":
              return React.createElement(r, null);
            case "login":
              return React.createElement(a, null)
          }
        }
      });
    window.addEventListener(window.languageLoaded ? "DOMContentLoaded" : "langLoaded", function () {
      React.render(React.createElement(c, null), document.getElementById("app-content"))
    })
  }, {
    "../actions/User": 8,
    "../app/components/Helpers/Icon.js": 11,
    "../app/config": 13,
    "../modules/api.js": 20,
    "../modules/network.js": 21,
    "../modules/translate": 22,
    "../newtab/manifest.json": 23,
    "../stores/User": 28,
    "./bridge": 15,
    "./components/Bookmark.js": 16,
    "./components/Login.js": 18,
    "./components/Welcome.js": 19,
    localforage: "localforage",
    lodash: "lodash",
    moment: "moment",
    "raven-js": "raven-js",
    react: "react",
    reflux: "reflux",
    string: "string"
  }],
  15: [function (e, t, n) {
    var o = "";
    "undefined" != typeof chrome && (o = "chrome");
    var i = {
      callbacks: {},
      getCurrentPage: function (e) {
        switch (o) {
          case "chrome":
            chrome.tabs.query({
            "currentWindow": true
            }, function (t) {
              e({
                title: t.title,
                url: t.url
              })
            })
        }
      },
      parseCurrentPage: function (e) {
        switch (o) {
          case "chrome":
            i.callbacks.doneParse = e, chrome.tabs.executeScript(null, {
              code: "window.raindropMiniClipper.parseCurrentPage()"
            }, function (t) {
              "undefined" == typeof t && e(null)
            })
        }
      },
      setPageActionStatus: function (e) {
        var t = e ? "-active" : "";
        chrome.tabs.query({
          "currentWindow": true
        }, function (e) {
          chrome.pageAction.setIcon({
            tabId: e.id,
            path: {
              19: "../common/images/page-action" + t + "-19.png",
              38: "../common/images/page-action" + t + "-38.png"
            }
          })
        })
      },
      capturePage: function (e) {
        chrome.tabs.captureVisibleTab(null, {
          format: "jpeg",
          quality: 100
        }, e)
      },
      close: function () {
        switch (o) {
          case "chrome":
            window.close()
        }
      }
    };
    switch (t.exports = i, o) {
      case "chrome":
        chrome.tabs.executeScript(null, {
          file: "miniclipper/js/jquery.js"
        }), chrome.tabs.executeScript(null, {
          file: "miniclipper/js/inject.js"
        }), chrome.tabs.executeScript(null, {
          file: "miniclipper/js/chrome-inject.js"
        }), chrome.runtime.onMessage.addListener(function (e, t, n) {
          switch (e.action) {
            case "doneParse":
              i.callbacks.doneParse(e.item)
          }
        })
    }
  }, {}],
  16: [function (e, n, o) {
    var i = e("../../actions/Bookmarks"),
      s = e("../../stores/Bookmarks"),
      r = e("../../actions/Collections"),
      a = (e("../../stores/Collections"), e("./Form.js")),
      c = e("../../app/components/Forms/CollectionsList"),
      l = e("../../app/components/Helpers/CoverSelector"),
      u = "../common/images/screenshot.svg";
    n.exports = React.createClass({
      displayName: "components/Bookmark",
      getInitialState: function () {
        var e = -1;
        try {
          e = UserStore.getUser().config.last_collection
        } catch (t) {}
        return {
          item: {
            url: "",
            collectionId: e || -1
          },
          already: !1,
          step: "form",
          loading: !0
        }
      },
      componentWillMount: function () {
        var e = this;
        bridge.getCurrentPage(function (t) {
          e.state.item.url = t.url, e.isMounted() && e.setState({
            item: e.state.item
          }), i.loadBookmark({
            url: e.state.item.url,
            nohtml: !0
          }, function (t) {
            t ? (bridge.setPageActionStatus(!0), e.isMounted() ? e.setState({
              item: t,
              loading: !1,
              already: !0
            }) : (e.state.item = t, e.state.loading = !1, e.state.already = !0)) : bridge.parseCurrentPage(function (t) {
              t = s._prepareBookmark(e.state.item, t), i.insertBookmark({
                item: t,
                dontAdd: !0,
                silent: !0
              }, function (t) {
                t = s._prepareBookmark(t, t), bridge.setPageActionStatus(!0), e.isMounted() ? e.setState({
                  item: t,
                  loading: !1
                }) : (e.state.item = t, e.state.loading = !1)
              })
            })
          })
        }), r.load()
      },
      componentDidMount: function () {},
      handleChangeCollection: function (e) {
        this.goToForm(), UserActions.updateConfig({
          last_collection: e._id
        }), this.updateBookmark({
          collectionId: e._id
        }), this.setState({
          already: !1
        })
      },
      handleChangeIcon: function (e, t) {
        this.goToForm();
        var n = {
          cover: e,
          coverId: e,
          coverEnabled: !0
        };
        t && (n.media = t), this.updateBookmark(n), this.setState({
          already: !1
        })
      },
      handleScreenshot: function () {
        var e = this;
        bridge.capturePage(function (t) {
          var n = JSON.parse(JSON.stringify(e.state.item)),
            o = -1,
            i = {
              link: t,
              type: "image",
              screenshot: !0,
              dataURI: !0
            };
          n.media = n.media || [];
          for (var s in n.media)
            if (n.media[s].screenshot) {
              o = s;
              break
            } - 1 == o ? (n.media.push(i), n.coverId = n.media.length - 1) : (n.media[o] = i, n.coverId = o), n.coverEnabled = !0, e.setState({
            item: n
          }), e.handleChangeIcon(n.coverId, n.media)
        })
      },
      updateBookmark: function (e) {
        var t = !1,
          n = this;
        for (var o in e) this.state.item[o] != e[o] && (t = !0);
        if (t) {
          var s = {
              _id: this.state.item._id
            },
            r = JSON.parse(JSON.stringify(this.state.item));
          for (var o in e) s[o] = e[o], r[o] = e[o];
          this.setState({
            item: r,
            loading: !0
          }), i.updateBookmark({
            item: s,
            silent: !0
          }, function () {
            n.setState({
              loading: !1
            })
          })
        }
      },
      removeBookmark: function (e) {
        "undefined" != typeof e && e.preventDefault(), i.removeBookmark({
          item: this.state.item,
          silent: !0
        }, function () {
          bridge.setPageActionStatus(!1), bridge.close()
        })
      },
      goToCollections: function () {
        this.state.loading || this.setState({
          step: "collections"
        })
      },
      goToCover: function () {
        this.state.loading || this.setState({
          step: "cover"
        })
      },
      goToForm: function () {
        this.setState({
          step: "form"
        })
      },
      render: function () {
        switch (this.state.step) {
          case "form":
            return React.createElement(a, {
              item: this.state.item,
              already: this.state.already,
              loading: this.state.loading,
              onGoToCollections: this.goToCollections,
              onGoToCover: this.goToCover,
              onUpdateBookmark: this.updateBookmark,
              onRemoveBookmark: this.removeBookmark
            });
          case "collections":
            return React.createElement("div", null, React.createElement("div", {
              className: "snap"
            }, React.createElement("figure", {
              className: "action-link clickable",
              onClick: this.goToForm
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "back"
            })), React.createElement("figcaption", null, t.s("saveToCollection")))), React.createElement("div", {
              className: "slideFromBottom"
            }, React.createElement(c, {
              activeCollection: this.state.item.collectionId,
              onSelectCollection: this.handleChangeCollection,
              onCancel: this.goToForm
            })));
          case "cover":
            var e = this.state.item.media.map(function (e, t) {
              return network.fixURL(e.link)
            });
            return React.createElement("div", null, React.createElement("div", {
              className: "snap"
            }, React.createElement("figure", {
              className: "action-link clickable",
              onClick: this.goToForm
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "back"
            })), React.createElement("figcaption", null, t.s("cover")))), React.createElement(l, {
              items: e,
              selected: this.state.item.coverId,
              onSelect: this.handleChangeIcon
            }), React.createElement("figure", {
              className: "action-link clickable",
              onClick: this.handleScreenshot
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement("img", {
              src: u,
              style: {
                width: "60px",
                height: "60px"
              }
            })), React.createElement("figcaption", null, t.s("clickToMakeScreenshot"))))
        }
      }
    })
  }, {
    "../../actions/Bookmarks": 1,
    "../../actions/Collections": 3,
    "../../app/components/Forms/CollectionsList": 9,
    "../../app/components/Helpers/CoverSelector": 10,
    "../../stores/Bookmarks": 24,
    "../../stores/Collections": 25,
    "./Form.js": 17
  }],
  17: [function (e, n, o) {
    var i = e("../../actions/Tags"),
      s = e("../../stores/Tags"),
      r = (e("../../actions/Collections"), e("../../stores/Collections")),
      a = e("react-select"),
      c = e("../../app/components/Helpers/SelectMixin"),
      l = e("react-textarea-autosize");
    n.exports = React.createClass({
      displayName: "Form",
      mixins: [c],
      getInitialState: function () {
        return {
          item: this.props.item,
          tags: [],
          collection: {}
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          item: e.item
        }), null == this._parseCollection(e.item.collectionId) && r.onLoadId(e.item.collectionId)
      },
      onTagsChange: function (e) {
        var t = e.map(function (e) {
          return {
            value: e._id,
            label: e._id
          }
        });
        this.setState({
          tags: t
        })
      },
      componentWillMount: function () {
        i.load()
      },
      onCollectionsChange: function (e) {
        this._parseCollection(this.state.item.collectionId)
      },
      _parseCollection: function (e) {
        var t = r.getCollection(e);
        if (null == t) return null;
        var n = "";
        try {
          n = network.fixURL(t.cover[0])
        } catch (o) {}
        return this.setState({
          collection: {
            title: t.title,
            cover: n
          }
        }), !0
      },
      componentDidMount: function () {
        this.unsubscribeCollections = r.listen(this.onCollectionsChange), this.unsubscribeTags = s.listen(this.onTagsChange), null == this._parseCollection(this.state.item.collectionId) && r.onLoadId(this.state.item.collectionId)
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections(), this.unsubscribeTags()
      },
      handleTitleChange: function (e) {
        this.props.onUpdateBookmark({
          title: e.target.value
        })
      },
      handleExcerptChange: function (e) {
        this.props.onUpdateBookmark({
          excerpt: e.target.value
        })
      },
      handleTagsChange: function (e) {
        var t = e.split(",");
        "" == t[0] && (t = []), this.props.onUpdateBookmark({
          tags: t
        })
      },
      render: function () {
        var e = null;
        try {
          e = React.createElement("div", {
            className: "cover",
            style: {
              backgroundImage: "url(" + network.fixURL(this.state.item.media[this.state.item.coverId].link) + ")"
            }
          })
        } catch (n) {}
        var o = React.createElement("div", {
          className: "icon"
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)));
        this.props.loading || (o = React.createElement("div", {
          className: "icon icon-done"
        }, React.createElement(Icon, {
          name: "done-circle",
          className: "icn-green"
        })));
        var i = null;
        this.state.collection.cover && (i = React.createElement("div", {
          className: "icon",
          style: {
            paddingRight: "0"
          }
        }, React.createElement("img", {
          src: this.state.collection.cover
        })));
        var s = "";
        return s = this.props.already ? t.s("alreadyInCollection") : t.s(this.props.loading ? "loading" : (this.state.item.type || "link") + "Saved") + " " + t.s("to"), React.createElement("div", null, React.createElement("form", {
          className: "edit-form"
        }, React.createElement(l, {
          className: "important",
          required: !0,
          autoFocus: !0,
          ref: "title",
          placeholder: t.s(this.props.loading ? "loading" : "enterTitle") + "...",
          rows: "1",
          value: this.state.item.title,
          onChange: this.handleTitleChange
        }), React.createElement("div", {
          className: "textarea-wrap"
        }, React.createElement(l, {
          ref: "excerpt",
          placeholder: this.props.loading ? "" : t.s("enterDescription") + "...",
          rows: "1",
          value: this.state.item.excerpt,
          onChange: this.handleExcerptChange
        })), React.createElement("figure", {
          className: "action-link tags-area"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "tags"
        })), React.createElement("figcaption", null, React.createElement(a, {
          name: "tags",
          value: this.state.item.tags || [],
          options: this.state.tags,
          multi: !0,
          placeholder: t.s("addTags") + "...",
          onChange: this.handleTagsChange,
          filterOptions: this.handleSelectFilter
        }))), React.createElement("figure", {
          className: "action-link clickable",
          onClick: this.props.onGoToCover
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "web"
        })), React.createElement("figcaption", null, t.s("cover"), " ", t.s("or"), " ", t.s("screenshot")), e), React.createElement("figure", {
          className: "action-link clickable collection-area",
          onClick: this.props.onGoToCollections
        }, o, React.createElement("figcaption", null, React.createElement("strong", null, s), React.createElement("br", null), this.state.collection.title || "..."), i, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        })))), React.createElement("footer", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          onClick: this.props.onRemoveBookmark,
          className: "btn" + (this.props.loading ? " invisible" : "")
        }, t.s("remove")), React.createElement("a", {
          href: "../app/index.html#/collection/" + this.state.item.collectionId,
          className: "btn btn-important",
          target: "_blank"
        }, t.s("showAllBookmarks")))))
      }
    })
  }, {
    "../../actions/Collections": 3,
    "../../actions/Tags": 7,
    "../../app/components/Helpers/SelectMixin": 12,
    "../../stores/Collections": 25,
    "../../stores/Tags": 27,
    "react-select": "react-select",
    "react-textarea-autosize": "react-textarea-autosize"
  }],
  18: [function (e, n, o) {
    var i = e("vivus");
    n.exports = React.createClass({
      displayName: "Login",
      getInitialState: function () {
        return {}
      },
      componentDidMount: function () {
        new i("login-img", {
          type: "async",
          duration: 300,
          pathTimingFunction: i.EASE_IN,
          animTimingFunction: i.EASE_OUT_BOUNCE,
          file: "../common/images/login.svg"
        })
      },
      handleLogin: function (e) {
        e.preventDefault(), UserActions.signIn(function () {
          window.location.reload()
        })
      },
      handleSignUp: function (e) {
        e.preventDefault(), UserActions.signUp(function () {
          window.location.reload()
        })
      },
      render: function () {
        return React.createElement("div", {
          className: "tip-screen"
        }, React.createElement("div", {
          id: "login-img",
          className: "icon"
        }), React.createElement("div", {
          className: "about"
        }, t.s("startToSave")), React.createElement("footer", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "btn btn-important",
          onClick: this.handleLogin
        }, t.s("signIn")), React.createElement("a", {
          href: "",
          className: "btn btn-important",
          onClick: this.handleSignUp
        }, t.s("signUp")))))
      }
    })
  }, {
    vivus: "vivus"
  }],
  19: [function (e, n, o) {
    var i = e("vivus");
    n.exports = React.createClass({
      displayName: "Welcome",
      getInitialState: function () {
        return {}
      },
      componentDidMount: function () {
        new i("welcome-img", {
          type: "delayed",
          duration: 300,
          pathTimingFunction: i.EASE_IN,
          animTimingFunction: i.EASE_OUT,
          file: "../common/images/welcome.svg"
        })
      },
      handleClick: function (e) {
        e.preventDefault(), Api.setItem("miniclipper-first-run", "true"), window.location.reload()
      },
      render: function () {
        return React.createElement("div", {
          className: "tip-screen"
        }, React.createElement("div", {
          id: "welcome-img",
          className: "icon"
        }), React.createElement("div", {
          className: "about"
        }, t.s("welcomeSlide1D"), " ", t.s("welcomeSlide1DD")), React.createElement("footer", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "btn btn-important",
          onClick: this.handleClick
        }, "OK"))))
      }
    })
  }, {
    vivus: "vivus"
  }],
  20: [function (e, n, o) {
    function i(e) {
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
    var s = e("superagent");
    n.exports = {
      timeout: 6e3,
      defaultHeaders: {},
      makeFinalURL: function (e) {
        return 0 == e.indexOf("http") ? e : consts.apiPrefix + e
      },
      errorHappen: function (e) {
        "undefined" != typeof Toasts && Toasts.show({
          title: t.s("server"),
          text: e,
          status: "error"
        })
      },
      getText: function (e, t) {
        var n = this;
        s.get(e).set("Content-Encoding", "gzip").set(this.defaultHeaders).end(function (o, i) {
          return !i || o ? (n.errorHappen(e), void t({})) : void t((i || {}).text || null)
        })
      },
      get: function (e, t, n) {
        var o = this;
        n = n || {}, s.get(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json;charset=UTF-8").set("Content-Encoding", "gzip").set(this.defaultHeaders).end(function (i, s) {
          return !s || i ? (o.errorHappen(e), void t({})) : void t(n.text ? s.text || "" : s.body || {})
        })
      },
      post: function (e, t, n) {
        var o = this;
        s.post(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (t, i) {
          return !i || t ? (o.errorHappen(e), void n({})) : void n(i.body || {})
        })
      },
      put: function (e, t, n) {
        var o = this;
        s.put(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (t, i) {
          return !i || t ? (o.errorHappen(e), void n({})) : void n(i.body || {})
        })
      },
      del: function (e, t) {
        var n = this;
        s.del(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (o, i) {
          return !i || o ? (n.errorHappen(e), void t({})) : void t(i.body || {})
        })
      },
      upload: function (e, t, n, o) {
        var i = this;
        s.post(this.makeFinalURL(e)).set(this.defaultHeaders).attach(t.name, t.file, t.file.name).on("progress", function (e) {
          var t = parseInt(e.percent || 0);
          n(t)
        }).end(function (t, n) {
          return !n || t ? (i.errorHappen(e), void o({})) : void o(n.body || {})
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
          i(o) && n.clear()
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
  21: [function (e, t, n) {
    t.exports = {
      defaultIcons: function (e) {
        switch (parseInt(e)) {
          case 0:
            return "infinite";
          case -1:
            return "inbox";
          case -2:
            return "best";
          case -99:
            return "trash";
          default:
            return "default-folder"
        }
      },
      getDomain: function (e) {
        if (e = e || "", "undefined" != typeof document) {
          var t = document.createElement("a");
          t.href = e;
          var n = t.hostname;
          return delete t, n
        }
        var o;
        return o = e.indexOf("://") > -1 ? e.split("/")[2] : e.split("/")[0], o = o.split(":")[0]
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
        return "https://logo.clearbit.com/" + (e || "") + "?size=24"
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
        } catch (o) {}
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
  22: [function (e, t, n) {
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
          n = (window.pathPrefix || "") + "../common/js/" + this.currentLang + ".js",
          o = new Event("langLoaded");
        t.onreadystatechange = function () {
          4 == t.readyState && t.responseText && (window["lang_" + e.currentLang] = JSON.parse(t.responseText), window.languageLoaded = !0, window.dispatchEvent(o))
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
  23: [function (e, t, n) {
    t.exports = t.exports = '{\n  "manifest_version": 2,\n  "name": "Raindrop.io New Tab / Speed Dial",\n  "default_locale": "en",\n  "description": "Your beautiful start page with favorite sites and bookmarks.",\n  "homepage_url": "https://raindrop.io",\n  "short_name": "RaindropNewTab",\n  "version": "0.7.4",\n  "default_locale": "en",\n\n  "offline_enabled": true,\n\n  "background": {\n		"scripts": ["background.js"],\n		"persistent": true\n	},\n\n  "permissions": [\n    "tabs",\n    "storage",\n    "*://*/*",\n    "<all_urls>",\n    "notifications"\n  ],\n\n  "icons" : {\n    "16": "common/images/icon-16.png",\n    "48" : "common/images/icon-48.png",\n    "128" : "common/images/icon-128.png"\n  },\n\n  "chrome_url_overrides" : {\n    "newtab": "app/index.html#/"\n  },\n\n  "options_page": "settings/settings.html",\n  \n  "options_ui": {\n    "page": "settings/settings.html",\n    "chrome_style": true\n  },\n\n  "page_action": {\n    "default_icon": {\n      "19": "common/images/page-action-19.png",\n      "38": "common/images/page-action-38.png"\n    },\n    "default_title": "Save to Raindrop.io",\n    "default_popup": "miniclipper/index.html"\n  },\n\n  "content_security_policy": "script-src \'self\' https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.intercom.io https://*.intercomcdn.com https://*.getsentry.com https://*.ravenjs.com https://*.uservoice.com; object-src \'self\'"\n}\n';
  }, {}],
  24: [function (e, n, o) {
    var i = e("../actions/Bookmarks"),
      s = e("../actions/Collections"),
      r = e("../stores/Collections"),
      a = e("../actions/LastBookmark"),
      c = e("validator"),
      l = [],
      u = !1,
      d = !1,
      p = !1,
      m = !1,
      f = "",
      h = "sync",
      g = [],
      v = 0,
      k = {
        excerpt: "",
        html: "",
        media: [],
        title: "",
        type: "link"
      },
      w = {
        en_US: [{
          _id: 1,
          sort: 4,
          title: "Raindrop.io",
          link: "https://raindrop.io",
          domain: "raindrop.io",
          collectionId: -2
        }, {
          _id: 2,
          sort: 3,
          title: "Facebook",
          link: "https://facebook.com",
          domain: "facebook.com",
          collectionId: -2
        }, {
          _id: 3,
          sort: 2,
          title: "Twitter",
          link: "https://twitter.com",
          domain: "twitter.com",
          collectionId: -2
        }, {
          _id: 4,
          sort: 1,
          title: "Wikipedia.org",
          link: "http://en.wikipedia.org",
          domain: "wikipedia.org",
          collectionId: -2
        }],
        ru_RU: [{
          _id: 1,
          sort: 4,
          title: "Raindrop.io",
          link: "https://raindrop.io",
          domain: "raindrop.io",
          collectionId: -2
        }, {
          _id: 2,
          sort: 3,
          title: "Вконтакте",
          link: "https://vk.com",
          domain: "vk.com",
          collectionId: -2
        }, {
          _id: 3,
          sort: 2,
          title: "Яндекс",
          link: "https://yandex.ru",
          domain: "yandex.ru",
          collectionId: -2
        }, {
          _id: 4,
          sort: 1,
          title: "Wikipedia.org",
          link: "https://ru.wikipedia.org",
          domain: "wikipedia.org",
          collectionId: -2
        }]
      },
      C = Reflux.createStore({
        init: function () {
          this.listenTo(i.load, this.onLoad), this.listenTo(i.reset, this.reset), this.listenTo(i.parseURL, this.onParseURL), this.listenTo(i.loadBookmark, this.onLoadBookmark), this.listenTo(i.insertBookmark, this.onInsertBookmark), this.listenTo(i.updateBookmark, this.onUpdateBookmark), this.listenTo(i.updateSelectedBookmarks, this.onUpdateSelectedBookmarks), this.listenTo(i.removeBookmark, this.onRemoveBookmark), this.listenTo(i.removeSelectedBookmarks, this.onRemoveSelectedBookmarks), this.listenTo(i.copySelectedBookmarks, this.onCopySelectedBookmarks), this.listenTo(i.swapBookmarks, this.onSwapBookmarks), this.listenTo(i.saveAllSort, this.onSaveAllSort), this.listenTo(i.syncMove, this.onSyncMove), this.listenTo(i.setSelected, this.onSetSelected), this.listenTo(i.selectAll, this.onSelectAll), this.listenTo(i.clearSelect, this.onClearSelect), this.listenTo(i.initFavorites, this.onInitFavorites)
        },
        onLoad: function (e, t) {
          if (h = "undefined" != typeof e.speed ? e.speed : "sync", u || 0 == e.page && this.reset(), u || p) "undefined" != typeof t && t();
          else {
            u = !0;
            var n = this;
            f = "raindrops/" + e.cId, e.sort = e.sort || "lastUpdate";
            var o = _.map(e, function (e, t) {
              return t + "=" + e
            });
            if (o.length > 0 && (f += "?" + o.join("&")), m = "title" != e.sort && !e.page, window.cacheDisabled && (m = !1), m) switch (h) {
              case "async":
                try {
                  ls.getItem(f).then(function (e) {
                    e && !d && (l = e, n.trigger(l))
                  })["catch"](function (e) {})
                } catch (i) {}
                break;
              case "sync":
                l = [];
                try {
                  l = JSON.parse(Api.getItem(f)) || []
                } catch (i) {
                  i && (l = [])
                }
                l.length > 0 && n.trigger(l)
            }
            Api.get(f, function (o) {
              o.result && parseInt(r.getCurrentId()) == o.collectionId ? (0 == e.page ? (l = o.items || [], s.updateCountCollection({
                _id: e.cId,
                count: o.count || 0
              })) : l = l.concat(o.items || []), p = 0 == (o.items || []).length, u = !1) : (l = [], p = !0, u = !1), d = !0, n.update(), "undefined" != typeof t && t()
            })
          }
        },
        onLoadBookmark: function (e, t) {
          var n = this,
            o = function (e, o) {
              var i = [];
              for (var s in o) i.push(s + "=" + o[s]);
              Api.get("raindrop/" + e + "?" + i.join("&"), function (e) {
                t(e.result ? n._prepareBookmark(e.item, e.item) : !1)
              })
            };
          "undefined" != typeof e.url ? Api.post("check/url", {
            url: e.url
          }, function (n) {
            n.result ? e.onlyId ? t({
              _id: n.id
            }) : o(n.id, e) : t(!1)
          }) : o(e._id, {})
        },
        onParseURL: function (e, t) {
          var n = e.item.url || "",
            o = this;
          try {
            n.indexOf("://") < 3 && (n = "http://" + n)
          } catch (i) {}
          c.isURL(n, {
            require_tld: !1,
            require_valid_protocol: !1
          }) ? Api.get("parse?url=" + encodeURIComponent(n), function (n) {
            try {
              n = JSON.parse(n)
            } catch (i) {}
            n = n || {
              result: !1
            }, n.item = o._prepareBookmark(e.item, n.item), t(n.item)
          }, {
            text: !0
          }) : t(!1)
        },
        _prepareBookmark: function (e, t) {
          var n = !1;
          if ("undefined" == typeof t ? n = !0 : null == t && (n = !0), n && (t = _.clone(k)), t.link = e.url || t.link, t.url = e.url, t.cover = 0, t.coverId = e.coverId, t.coverEnabled = !0, t.domain = t.domain || network.getDomain(e.url), "" == t.title) {
            t.title = S(t.domain).capitalize().s;
            try {
              t.title = t.title.split(".")[0]
            } catch (o) {}
          }
          return "undefined" != typeof e.collection && (t.collectionId = e.collection.$id), "undefined" != typeof e.collectionId && (t.collectionId = e.collectionId, t.collection = {
            $id: e.collectionId
          }), t
        },
        onInsertBookmark: function (e, n) {
          var o = this;
          e.dontAdd = e.dontAdd || !1, e.toEndOfList && (e.item.sort = 0);
          var i = function (n) {
            if (!e.dontAdd) {
              if (n._id = n._id || (new Date).getTime(), "object" == typeof e.placeholder)
                for (var i in e.placeholder) n[i] = e.placeholder[i];
              e.toEndOfList ? l.push(n) : l.unshift(n), s.updateCountCollection({
                _id: e.item.collectionId,
                count: "+"
              }), o.update()
            }
            e.silent || Toasts.show({
              text: t.s((e.item.type || "link") + "Saved"),
              title: e.item.title
            }), Api.setItem("last_collection", e.item.collectionId), a.insert(n)
          };
          UserStore.isLogged() ? Api.post("raindrop", e.item, function (t) {
            t.result ? i(t.item) : e.silent || Toasts.show({
              text: strings.getErrorFromJSON(t),
              title: e.item.title,
              status: "error"
            }), n(t.item || !1)
          }) : e.possibleWithoutAuth ? (i(e.item), n(e.item)) : n(!1)
        },
        onUploadFile: function (e, n) {
          var o = this;
          Api.upload("raindrop/" + e.item._id + "/file", {
            name: "file",
            file: e.file
          }, function (t) {
            if (t) {
              var n = _.findIndex(l, {
                _id: e.item._id
              }); - 1 != n && (l[n].progress = t), o.update()
            }
          }, function (i) {
            if (i.result) {
              var s = _.findIndex(l, {
                _id: e.item._id
              }); - 1 != s && (l[s] = i.item, l[s].loading = !1), o.update()
            } else Toasts.show({
              text: t.s("fileUploadUnable"),
              title: e.item.title,
              status: "error"
            }), o.onRemoveBookmark({
              item: e.item,
              silent: !0
            });
            n(i)
          })
        },
        onUpdateBookmark: function (e, n) {
          var o = _.clone(e),
            i = this;
          if ("undefined" == typeof o.updateModel && (o.updateModel = !0), "undefined" == typeof o.successMessage && (o.successMessage = t.s("saveSuccess")), "object" == typeof o.append && o.append.length > 0) {
            var r = _.findIndex(l, {
              _id: o.item._id
            });
            if (-1 != r)
              for (var a in o.append) switch (typeof l[r][o.append[a]]) {
                case "object":
                  o.item[o.append[a]] = l[r][o.append[a]].concat(o.item[o.append[a]]), o.item[o.append[a]] = _.uniq(o.item[o.append[a]]);
                  break;
                case "string":
                  o.item[o.append[a]] = l[r][o.append[a]] + o.item[o.append[a]]
              }
          }
          Api.put("raindrop/" + o.item._id, o.item, function (e) {
            if (e.result) {
              if (Api.setItem("last_collection", e.item.collection.$id), o.updateModel) {
                var t = _.findIndex(l, {
                  _id: o.item._id
                });
                if (-1 != t) {
                  var r = "update";
                  switch (e.item.collection.$id != l[t].collection.$id && (r = "remove"), 0 === o.showingCollectionId && (r = "update"), r) {
                    case "update":
                      l[t] = e.item;
                      break;
                    case "remove":
                      s.updateCountCollection({
                        _id: l[t].collection.$id,
                        count: "-"
                      }), s.updateCountCollection({
                        _id: e.item.collection.$id,
                        count: "+"
                      }), l.splice(t, 1)
                  }
                  i.update()
                }
              }
              o.silent || Toasts.show({
                text: o.successMessage,
                title: e.item.title
              })
            } else o.silent || Toasts.show({
              text: strings.getErrorFromJSON(e),
              status: "error"
            });
            "function" == typeof n && n((e.item || [])._id || !1)
          })
        },
        onUpdateSelectedBookmarks: function (e, t) {
          var n = [],
            o = this;
          for (var s in l) l[s].selected && n.push(l[s]._id);
          var r = 0,
            a = v,
            c = function (e) {
              e ? (r++, a - 1 >= r ? u() : (o.onClearSelect(), t(!0))) : (o.onClearSelect(), t(!1))
            },
            u = function () {
              var t = JSON.parse(JSON.stringify(e));
              t.item._id = parseInt(n[r]), i.updateBookmark(t, c)
            };
          u()
        },
        onCopySelectedBookmarks: function (e, t) {
          var n = [],
            o = this;
          for (var s in l) l[s].selected && n.push(l[s]._id);
          var r = 0,
            a = v,
            c = function (e) {
              e ? (r++, a - 1 >= r ? u() : (o.onClearSelect(), t(!0))) : (o.onClearSelect(), t(!1))
            },
            u = function () {
              Api.get("raindrop/" + n[r], function (n) {
                if (n.result) {
                  var s = n.item.link;
                  n.item = o._prepareBookmark(n.item, n.item), n.item.link = n.item.url = s, n.item.collectionId = e.collectionId, delete n.item._id, delete n.item.sort, delete n.item.collection, delete n.item.lastUpdate, i.insertBookmark({
                    item: n.item,
                    dontAdd: !0,
                    silent: !0
                  }, c)
                } else o.onClearSelect(), t(!1)
              })
            };
          u()
        },
        onRemoveBookmark: function (e, n) {
          var o = this,
            i = "",
            r = function () {
              "undefined" != typeof e.item.collection && -99 == e.item.collection.$id && (i = "Permament"), UserStore.isLogged() || (i = "Permament");
              var n = _.findIndex(l, {
                _id: e.item._id
              });
              try {
                s.updateCountCollection({
                  _id: e.item.collection.$id,
                  count: "-"
                })
              } catch (r) {} - 1 != n && (l.splice(n, 1), o.update()), e.silent || Toasts.show({
                text: t.s((e.item.type || "link") + "Removed" + i),
                title: e.item.title
              }), a.remove(e.item)
            };
          UserStore.isLogged() ? Api.del("raindrop/" + e.item._id, function (t) {
            t.result ? r() : e.silent || Toasts.show({
              text: strings.getErrorFromJSON(t),
              title: e.item.title,
              status: "error"
            }), "function" == typeof n && n(t.result || !1, i)
          }) : (r(), "function" == typeof n && n(!0, i))
        },
        onRemoveSelectedBookmarks: function (e, t) {
          var n = [],
            o = this;
          for (var s in l) l[s].selected && n.push(l[s]);
          var r = 0,
            a = v,
            c = function (e, n) {
              e ? (r++, a - 1 >= r ? u() : (o.onClearSelect(), t(!0, n))) : (o.onClearSelect(), t(!1))
            },
            u = function () {
              var t = e;
              t.item = n[r], i.removeBookmark(t, c)
            };
          u()
        },
        onSwapBookmarks: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = _.findIndex(l, {
              _id: parseInt(e.fromId)
            }),
            n = _.findIndex(l, {
              _id: parseInt(e.toId)
            });
          if (-1 == t || -1 == n) return !1;
          var o = _.clone(l[t].sort),
            i = _.clone(l[n].sort),
            s = _.clone(l[t]);
          l[t] = l[n], l[n] = s, l[t].sort = o, l[n].sort = i, this.update(), e.preservList && (g[e.fromId] = !0, g[e.toId] = !0)
        },
        onSaveAllSort: function () {
          for (var e in l) l[e].sort = l.length - e, UserStore.isLogged() && this.onUpdateBookmark({
            item: {
              _id: l[e]._id,
              sort: l[e].sort
            },
            silent: !0,
            updateModel: !1
          })
        },
        onSyncMove: function () {
          for (var e in g) {
            var t = _.findIndex(l, {
              _id: parseInt(e)
            }); - 1 != t && this.onUpdateBookmark({
              item: {
                _id: l[t]._id,
                sort: l[t].sort
              },
              silent: !0,
              updateModel: !1
            })
          }
          g = []
        },
        onSetSelected: function (e) {
          var t = _.findIndex(l, {
            _id: e.id
          });
          if (-1 == t) return null;
          if (l[t].selected = e.selected, e.shift) {
            var n = [],
              o = 0;
            if (l.forEach(function (e, o) {
                e.selected && o != t && n.push(o)
              }), n.length > 0 && (o = n.reduce(function (e, n) {
                return Math.abs(n - t) < Math.abs(e - t) ? n : e
              })), t > o)
              for (var i = o; t > i; i++) l[i].selected = !0;
            else
              for (var i = t; o > i; i++) l[i].selected = !0
          }
          v = 0, l.forEach(function (e) {
            e.selected && v++
          }), this.trigger(l)
        },
        onSelectAll: function () {
          for (var e in l) l[e].selected = !0;
          v = l.length, this.trigger(l)
        },
        onClearSelect: function () {
          v = 0;
          for (var e in l) l[e].selected = !1;
          this.trigger(l)
        },
        getBookmarks: function () {
          return l
        },
        getBookmark: function (e) {
          var t = _.findIndex(l, {
            _id: e
          });
          if (-1 != t) {
            try {
              l[t].collectionId = l[t].collection.$id
            } catch (n) {}
            return l[t].coverEnabled = !0, JSON.parse(JSON.stringify(l[t]))
          }
          return null
        },
        getIsLoading: function () {
          return u
        },
        getIsNoMore: function () {
          return p
        },
        getCount: function () {
          return l.length
        },
        getSelectedCount: function () {
          return v
        },
        update: function (e) {
          if ("undefined" == typeof e && (e = !0), this.trigger(l), m && e) switch (h) {
            case "async":
              try {
                ls.setItem(f, l).then(function () {})["catch"](function (e) {})
              } catch (t) {}
              break;
            case "sync":
              Api.setItem(f, JSON.stringify(l))
          }
        },
        onInitFavorites: function () {
          var e = this,
            n = !1,
            o = !0;
          try {
            UserStore.getUser().config.web_init_favorites && (o = !1)
          } catch (i) {}
          "undefined" != typeof chrome && "undefined" != typeof chrome.topSites && (n = !0);
          var s = function () {
              var e = t.getLang();
              "undefined" == typeof w[e] && (e = "en_US"), l = w[e]
            },
            r = function () {
              l.forEach(function (e) {
                e.url = e.link, Api.post("raindrop", e, function (e) {})
              }), UserStore.saveConfig({
                notify: !0,
                name: "web_init_favorites",
                updateModel: !1
              })
            };
          0 == l.length && o && (n ? chrome.topSites.get(function (t) {
            for (var n in t) {
              if (!(5 >= n)) break;
              l.push({
                _id: parseInt(n) + 1,
                title: t[n].title,
                link: t[n].url,
                domain: network.getDomain(t[n].url),
                collectionId: -2,
                sort: t.length - n
              })
            }
            0 == l.length && s(), e.update(), r()
          }) : (s(), e.update(), r()))
        },
        handleDropFiles: function (e) {
          var n = r.getCurrentId("file"),
            o = Promise.resolve(),
            i = e.files.map(function (e) {
              return o = o.then(function () {
                return new Promise(function (e, t) {
                  n != r.getCurrentId() ? (window.location.hash = "#/collection/" + n, setTimeout(function () {
                    e(!0)
                  }, 200)) : e(!0)
                })
              }).then(function () {
                return new Promise(function (t, n) {
                  if (e.file.size < 1048576) {
                    var o = new FileReader;
                    o.onloadend = function () {
                      t(o.result)
                    }, o.onerror = function () {
                      t(null)
                    }, o.readAsDataURL(e.file)
                  } else t(null)
                })
              }).then(function (t) {
                return new Promise(function (o, i) {
                  C.onInsertBookmark({
                    silent: !0,
                    item: {
                      title: e.file.name.split(".")[0],
                      collectionId: n,
                      url: "https://raindrop.io/ping",
                      type: e.type
                    },
                    placeholder: {
                      loading: !0
                    }
                  }, function (n) {
                    setTimeout(function () {
                      var e = null;
                      try {
                        e = document.getElementById("bookmark-loading-progress-" + n._id).parentElement.getElementsByClassName("cover-img")[0]
                      } catch (o) {}
                      if (e) try {
                        t && (e.src = t || "", e.removeAttribute("srcset"))
                      } catch (o) {}
                    }, 1), o({
                      item: n,
                      file: e.file
                    })
                  })
                })
              })
            });
          i.length > 0 ? (Toasts.show({
            text: t.s("importingInfo2"),
            title: t.s("uploadProgress")
          }), Promise.all(i).then(function (e) {
            e.reverse();
            var t = Promise.resolve(),
              n = e.map(function (e) {
                var n = e.item;
                return t = t.then(function () {
                  return new Promise(function (t, o) {
                    n ? C.onUploadFile({
                      item: n,
                      file: e.file
                    }, function (e) {
                      t(e)
                    }) : t(null)
                  })
                })
              });
            return Promise.all(n)
          }).then(function (e) {
            var n = 0;
            for (var o in e) e[o].result && n++;
            n && Toasts.show({
              text: t.s("saveSuccess"),
              title: n + " files"
            })
          })) : Toasts.show({
            text: t.s("fileUploadError"),
            status: "error"
          })
        },
        _bookmarkNavigation: function (e) {
          var t = _.findIndex(l, {
            _id: e
          });
          if (-1 != t) {
            var n = 0,
              o = 0;
            return "undefined" != typeof l[t + 1] && (n = l[t + 1]._id), "undefined" != typeof l[t - 1] && (o = l[t - 1]._id), {
              next: n,
              prev: o
            }
          }
          return {
            next: 0,
            prev: 0
          }
        },
        reset: function (e) {
          l = [], u = !1, d = !1, p = !1, v = 0, e && this.update()
        }
      });
    n.exports = C
  }, {
    "../actions/Bookmarks": 1,
    "../actions/Collections": 3,
    "../actions/LastBookmark": 4,
    "../stores/Collections": 25,
    validator: "validator"
  }],
  25: [function (e, n, o) {
    var i = e("../actions/Collections"),
      s = e("../actions/Childrens"),
      r = e("../actions/User"),
      a = e("../stores/Stats"),
      c = e("../actions/Bookmarks"),
      l = [],
      u = -2,
      d = !1,
      p = "sync";
    "undefined" != typeof isIOSapp && (u = 0);
    var m = [],
      f = function () {
        m = [{
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
        for (var e in m) m[e].view = Api.getItem("collection/" + m[e]._id + "/view") || m[e].view, m[e].cover = [(window.pathPrefix || "") + "../common/images/collection" + m[e]._id + ".png"]
      };
    document ? window.languageLoaded ? f() : window.addEventListener("langLoaded", f) : f();
    var h = Reflux.createStore({
      init: function () {
        this.listenTo(i.load, this.onLoad), this.listenTo(i.setCurrent, this.onSetCurrent), this.listenTo(i.updateCollection, this.onUpdateCollection), this.listenTo(i.insertCollection, this.onInsertCollection), this.listenTo(i.removeCollection, this.onRemoveCollection), this.listenTo(i.updateCountCollection, this.onUpdateCountCollection), this.listenTo(i.updateColorCollection, this.onUpdateColorCollection)
      },
      _saveCache: function () {
        switch (p) {
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
        d || Api.get("collections", function (e) {
          if (d = !0, e.result) {
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
          o = _.findIndex(l, {
            _id: e
          }); - 1 == o ? Api.get("collection/" + e, function (e) {
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
        var o = this,
          i = !1;
        "undefined" == typeof e.updateModel && (e.updateModel = !0), ("number" == typeof e.item.group || "number" == typeof e.item.parentId) && (i = !0), "number" == typeof e.item.group ? e.item.parentId = "root" : delete e.item.group, i && r.updateCollection({
          _id: e.item._id,
          group: e.item.group
        }), Api.put("collection/" + e.item._id, e.item, function (i) {
          i.result ? (o._updateOrInsertItem(i.item), e.silent || Toasts.show({
            text: t.s("saveSuccess"),
            title: e.item.title
          })) : e.silent || Toasts.show({
            text: strings.getErrorFromJSON(i),
            title: e.item.title,
            status: "error"
          }), "function" == typeof n && n((i.item || [])._id || !1)
        });
        var s = _.findIndex(l, {
          _id: parseInt(e.item._id)
        });
        if (-1 != s && e.updateModel) {
          for (var a in e.item) l[s][a] = e.item[a];
          if (this.trigger(l), l[s]._id <= 0)
            for (var a in e.item) Api.setItem("collection/" + e.item._id + "/" + a, e.item[a]);
          this._saveCache()
        }
      },
      onInsertCollection: function (e, n) {
        var o = this;
        Api.post("collection", e.item, function (i) {
          i.result ? (l.push(i.item), "number" == typeof e.item.group && (e.item.parentId = "root", r.updateCollection({
            _id: i.item._id,
            group: e.item.group
          })), e.silent || Toasts.show({
            text: t.s("addSuccess"),
            title: e.item.title
          }), o.trigger(l), o._saveCache()) : e.silent || Toasts.show({
            text: strings.getErrorFromJSON(i),
            title: e.item.title,
            status: "error"
          }), "function" == typeof n && n((i.item || [])._id || !1)
        })
      },
      onRemoveCollection: function (e, n) {
        var o = this,
          i = function () {
            Api.del("collection/" + e.item._id, function (i) {
              if (i.result) {
                if (e.item._id > 0) {
                  var a = _.findIndex(l, {
                    _id: e.item._id
                  }); - 1 != a && l.splice(a, 1)
                }
                Toasts.show({
                  text: -99 != e.item._id ? t.s("removeCollectionSuccess") : t.s("trashEmpty"),
                  title: e.item.title
                }), o.trigger(l), o._saveCache(), s.removeCollection(e), r.saveGroups(), o.getCurrentId() == e.item._id && c.reset(!0)
              } else Toasts.show({
                text: strings.getErrorFromJSON(i),
                title: e.item.title,
                status: "error"
              });
              "function" == typeof n && n(i.result)
            })
          };
        e.silent ? i() : confirm(t.s("collectionDeleteConfirm")) ? i() : "function" == typeof n && n(!1)
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
        return -1 != t ? (0 === e ? l[t].count = a.getAllCount() : 0 > e && (l[t].count = a.getCollectionCount(e)), this._prepareItem(l[t])) : null
      },
      getCount: function () {
        return l.length
      },
      reset: function (e) {
        e = e || {}, p = "undefined" != typeof e.speed ? e.speed : "sync", l = [], u = -2, "undefined" != typeof isIOSapp && (u = 0), d = !1, 0 != l.length || d || this._resetFromCache()
      },
      _updateOrInsertItem: function (e) {
        var t = _.findIndex(l, {
          _id: parseInt(e._id)
        }); - 1 != t ? l[t] = e : l.push(e)
      },
      _insertDefaults: function () {
        var e = this;
        m.forEach(function (t) {
          e._updateOrInsertItem(t)
        })
      },
      _resetFromCache: function () {
        if (!window.cacheDisabled) switch (p) {
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
        return !d
      }
    });
    h.reset(), n.exports = h
  }, {
    "../actions/Bookmarks": 1,
    "../actions/Childrens": 2,
    "../actions/Collections": 3,
    "../actions/User": 8,
    "../stores/Stats": 26
  }],
  26: [function (e, t, n) {
    var o = e("../actions/Stats"),
      i = e("../actions/Collections"),
      s = {},
      r = !1,
      a = 0,
      c = !1,
      l = Reflux.createStore({
        init: function () {
          this.listenTo(o.load, this.onLoad), this.listenTo(i.updateCountCollection, this.onUpdate)
        },
        onLoad: function () {
          var e = this;
          if (!r) {
            try {
              ls.getItem("stat").then(function (t) {
                t && !c && (s = t, e._countAll(), e.trigger(s))
              })["catch"](function (e) {})
            } catch (t) {}
            r = !0, Api.get("stat", function (t) {
              if (t.result) {
                s = t.items, e._countAll();
                try {
                  ls.setItem("stat", s).then(function () {})["catch"](function (e) {})
                } catch (n) {}
                e.trigger(s)
              }
              r = !1, c = !0
            })
          }
        },
        onUpdate: function (e) {
          var t = _.findIndex(s, {
            _id: e._id
          });
          switch (e.count) {
            case "+":
              -99 != e._id && a++, -1 != t && s[t].count++, this.trigger(s);
              break;
            case "-":
              -99 != e._id && a--, 0 > a && (a = 0), -1 != t && (s[t].count--, s[t].count < 0 && (s[t].count = 0)), this.trigger(s)
          }
        },
        _countAll: function () {
          a = 0;
          for (var e in s) - 2 === s[e]._id ? a -= s[e].count || 0 : "number" != typeof s[e]._id && (a += parseInt(s[e].count || 0));
          0 > a && (a = 0)
        },
        getStat: function () {
          return s
        },
        getAllCount: function () {
          return a
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
    "../actions/Stats": 6
  }],
  27: [function (e, n, o) {
    var i = e("../actions/Tags"),
      s = [],
      r = Reflux.createStore({
        url: "tags",
        init: function () {
          this.listenTo(i.load, this.onLoad)
        },
        onLoad: function () {
          var e = this;
          if (0 == s.length) {
            try {
              ls.getItem(e.url).then(function (t) {
                t && 0 == s.length && (s = t, e.trigger(s))
              })["catch"](function (e) {})
            } catch (t) {}
            Api.get(e.url, function (t) {
              if (t.result) {
                s = t.items;
                try {
                  ls.setItem(e.url, s).then(function () {})["catch"](function (e) {})
                } catch (n) {}
                e.trigger(s)
              }
            })
          } else e.trigger(s)
        },
        onUpdate: function (e) {
          var n = this;
          Api.put("tag", {
            tag: e._id,
            replace: e.replace
          }, function (o) {
            if (o.result) {
              s[_.findIndex(s, {
                _id: e._id
              })]._id = e.replace;
              try {
                ls.setItem(n.url, s).then(function () {})["catch"](function (e) {})
              } catch (i) {}
              n.trigger(s), Toasts.show({
                text: t.s("saveSuccess"),
                title: e._id
              })
            }
          })
        },
        onRemove: function (e) {
          var n = this;
          Api.del("tag?tag=" + encodeURIComponent(e._id), function (o) {
            if (o.result) {
              s.splice(_.findIndex(s, {
                _id: e._id
              }), 1);
              try {
                ls.setItem(n.url, s).then(function () {})["catch"](function (e) {})
              } catch (i) {}
              n.trigger(s), Toasts.show({
                text: t.s("removeSuccess"),
                title: e._id
              })
            }
          })
        },
        getTags: function () {
          return s
        },
        reset: function () {
          s = []
        }
      });
    n.exports = r
  }, {
    "../actions/Tags": 7
  }],
  28: [function (e, n, o) {
    var i = e("../actions/User"),
      s = (e("../actions/ModalFrame"), e("./Collections")),
      r = {},
      a = !1,
      c = !1,
      l = !1,
      u = Reflux.createStore({
        init: function () {
          this.listenTo(i.load, this.onLoad), this.listenTo(i.toggleGroup, this.onToggleGroup), this.listenTo(i.updateGroup, this.onUpdateGroup), this.listenTo(i.insertGroup, this.onInsertGroup), this.listenTo(i.removeGroup, this.onRemoveGroup), this.listenTo(i.swapGroups, this.onSwapGroups), this.listenTo(i.saveGroups, this.saveGroups), this.listenTo(i.updateCollection, this.onUpdateCollection), this.listenTo(i.swapCollections, this.onSwapCollections), this.listenTo(i.updateLanguage, this.onUpdateLanguage), this.listenTo(i.updateConfig, this.onUpdateConfig), this.listenTo(i.logOut, this.onLogOut), this.listenTo(i.signIn, this.onSignIn), this.listenTo(i.signUp, this.onSignUp)
        },
        isTrusted: function () {
          return l
        },
        onLoad: function (e, t) {
          var n = !0;
          if (c && (n = !1), a && l && (n = !1), !n) return "function" == typeof e && e(!1), void this.trigger(r);
          var o = this;
          c = !0, this._resetFromCache(t), Api.get("user", function (t) {
            var n = function () {
              t.result ? (r = t.user, a = !0, o.cleanGroups()) : (r = {}, a = !1), Api.setItem("user", JSON.stringify(r));
              try {
                ls.setItem("user", r).then(function () {})["catch"](function (e) {}), ls.setItem("user_id", r._id || 0).then(function () {})["catch"](function (e) {})
              } catch (e) {}
              c = !1, l = !0, o.trigger(r), o._checkGroupsStability(), o.updateIntercom()
            };
            if ("boolean" == typeof t.result || "boolean" == typeof t.auth) try {
              ls.getItem("user_id").then(function (i) {
                var s = null;
                try {
                  s = parseInt(t.user._id)
                } catch (r) {}
                t.result && parseInt(i) == s ? n() : o._cleanCache(n), "function" == typeof e && e(t.result)
              })["catch"](function (e) {
                n()
              })
            } catch (i) {
              n()
            } else c = !1, l = !0, o.trigger(r), "function" == typeof e && e(t.result)
          })
        },
        updateIntercom: function () {
          try {
            var e = {
              app_id: "ar0opykp",
              user_id: r._id,
              name: r.fullName,
              email: r.email || "",
              created_at: Math.floor(new Date(r.registered).getTime() / 1e3),
              pro: r.pro || !1,
              groups: (r.groups || []).length || 0,
              platform: "web"
            };
            r.proExpire && (e.pro_expire = Math.floor(new Date(r.proExpire).getTime() / 1e3)), "undefined" != typeof window && "undefined" != typeof window.Intercom && window.Intercom("boot", e), "undefined" != typeof NativeHelpers && (e.platform = "ios", delete e.app_id, NativeHelpers.intercomSetUser(e.user_id + "", e))
          } catch (t) {}
          try {
            Raven.setUserContext({
              email: r.email,
              id: r._id
            })
          } catch (t) {}
        },
        onToggleGroup: function (e) {
          var t = _.findIndex(r.groups || [], {
            id: e.id
          }); - 1 != t && (r.groups[t].hidden = !r.groups[t].hidden, this.saveGroups())
        },
        onUpdateGroup: function (e) {
          var n = _.findIndex(r.groups || [], {
            id: e.id
          });
          if (-1 != n) {
            for (var o in e.item) r.groups[n][o] = e.item[o];
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
          "string" == typeof e.item.collections && (e.item.collections = JSON.parse(e.item.collections)), r.groups.push({
            title: e.item.title,
            hidden: !1,
            id: (new Date).getTime(),
            sort: (r.groups || []).length,
            collections: e.item.collections || []
          }), this.saveGroups(function (o) {
            e.silent || (o.result ? Toasts.show({
              text: t.s("addSuccess"),
              title: e.item.title
            }) : Toasts.show({
              text: t.s("saveError"),
              title: e.item.title,
              status: "error"
            })), "function" == typeof n && n(o.result)
          }, e)
        },
        onRemoveGroup: function (e) {
          var n = _.findIndex(r.groups || [], {
              id: e.id
            }),
            o = !1,
            i = ""; - 1 != n && (i = r.groups[n].title, 0 == (r.groups[n].collections || []).length && (r.groups.splice(n, 1), o = !0)), o ? (this.saveGroups(), Toasts.show({
            text: t.s("removeSuccess"),
            title: i
          })) : Toasts.show({
            text: t.s("removeGroupError"),
            title: i,
            status: "error"
          })
        },
        onSwapGroups: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = _.findIndex(r.groups, {
              id: parseInt(e.fromId)
            }),
            n = _.findIndex(r.groups, {
              id: parseInt(e.toId)
            });
          if (-1 == t || -1 == n) return !1;
          r.groups = strings.swapArray(r.groups, t, n);
          for (var o in r.groups) r.groups[o].sort = o;
          this.saveGroups()
        },
        onUpdateCollection: function (e) {
          var t = !1,
            n = !1;
          "undefined" == typeof e.group && (e.group = -1);
          for (var o in r.groups)
            for (var i in r.groups[o].collections || []) r.groups[o].collections[i] == e._id && (e.group != o && (r.groups[o].collections.splice(i, 1), t = !0), n = !0);
          (t || !n) && (e.group >= 0 && ("object" != typeof r.groups[e.group].collections && (r.groups[e.group].collections = []), "undefined" != typeof e.toTop ? r.groups[e.group].collections.unshift(e._id) : r.groups[e.group].collections.push(e._id), r.groups[e.group].hidden = !1), this.saveGroups())
        },
        onSwapCollections: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = {
              index: -1
            },
            n = {
              index: -1
            };
          for (var o in r.groups) {
            var i = (r.groups[o].collections || []).indexOf(parseInt(e.fromId)),
              s = (r.groups[o].collections || []).indexOf(parseInt(e.toId));
            if (-1 != i && (t.index = i, t.group = o), -1 != s && (n.index = s, n.group = o), -1 != t.index && -1 != n.index) break
          }
          if (-1 != t.index && -1 != n.index) {
            if (t.group == n.group) r.groups[t.group].collections = strings.swapArray(r.groups[t.group].collections, t.index, n.index);
            else {
              var i = r.groups[t.group].collections[t.index];
              r.groups[t.group].collections.splice(t.index, 1), r.groups[n.group].collections.splice(n.index, 0, i)
            }
            this.saveGroups()
          }
        },
        onUpdateLanguage: function (e, t) {
          "object" != typeof r.config && (r.config = {}), r.config.lang = e.lang, this.saveConfig({
            lang: r.config.lang
          }, t)
        },
        onUpdateConfig: function (e, t) {
          "object" != typeof r.config && (r.config = {});
          for (var n in e) r.config[n] = e[n];
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
          var o = "/account" + (-1 == (window.environment || []).indexOf("web") ? "?extension" : "");
          t.google && (o = "/auth/google" + (-1 == (window.environment || []).indexOf("web") ? "?redirect=%2Fother%2Fmodal-login.html" : "")), -1 != (window.environment || []).indexOf("desktop") ? window.location = network.fixURL(o) : -1 != (window.environment || []).indexOf("clipper") ? (window.location.hash = "#/waitauth", BrowserBridge.openModal(network.fixURL(o), {
            width: 700,
            height: 600
          })) : "undefined" != typeof chrome ? chrome.windows.create({
            url: network.fixURL(o),
            type: "popup",
            width: 700,
            height: 600
          }, function (t) {
            chrome.windows.onRemoved.addListener(function (o) {
              o == t.id && n._cleanCache(e)
            })
          }) : (window.open(network.fixURL(o), "raindropwindow", "width=700,height=600,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no"), window.location.hash = "#/waitauth")
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
            chrome.windows.onRemoved.addListener(function (o) {
              o == n.id && t._cleanCache(e)
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
            n && e()
          }
        },
        getUser: function () {
          return "undefined" == typeof r._id && this._resetFromCache(), _.clone(r)
        },
        getGroup: function (e) {
          var t = _.findIndex(r.groups || [], {
            id: e
          });
          return -1 != t ? r.groups[t] : null
        },
        isLogged: function () {
          return a
        },
        isLoading: function () {
          return c
        },
        isPro: function () {
          return a && r.pro ? !0 : !1
        },
        reset: function () {
          r = {}, a = !1, c = !1
        },
        cleanGroups: function () {
          if ((r.groups || []).length > 0) {
            for (var e in r.groups) null == (r.groups[e].id || null) && (r.groups[e].id = parseInt(e));
            r.groups = _.sortBy(r.groups, function (e) {
              return e.sort
            })
          } else r.groups = [{
            id: 0,
            sort: 0,
            title: t.s("myCollections"),
            hidden: !1
          }]
        },
        saveGroups: function (e, t) {
          if (t = t || {}, "undefined" == typeof t.cleanCollections && (t.cleanCollections = !0), s.getCount() > 0 && t.cleanCollections)
            for (var n in r.groups) {
              var o = [];
              for (var i in r.groups[n].collections || []) null == s.getCollection(r.groups[n].collections[i]) && o.push(i);
              _.pullAt(r.groups[n].collections, o)
            }
          this.saveConfig({
            groups: r.groups
          }, e)
        },
        removeEmptyGroups: function (e) {
          var t = [];
          for (var n in r.groups) 0 == (r.groups[n].collections || []).length && t.push(n);
          _.pullAt(r.groups, t), this.saveGroups(e, {
            cleanCollections: !1
          })
        },
        saveConfig: function (e, t) {
          "undefined" == typeof e.updateModel && (e.updateModel = !0);
          try {
            e.updateModel && (r.config[e.name] = !0)
          } catch (n) {}
          Api.put("userConfig", e, function (e) {
            "function" == typeof t && t(e)
          }), Api.setItem("user", JSON.stringify(r));
          try {
            ls.setItem("user", r).then(function () {})["catch"](function (e) {})
          } catch (n) {}
          this.trigger(r)
        },
        getCollectionGroup: function (e) {
          for (var t in r.groups)
            for (var n in r.groups[t].collections || [])
              if (r.groups[t].collections[n] == e) return parseInt(t);
          return null
        },
        getConfig: function (e) {
          var t = !1;
          try {
            t = r.config[e]
          } catch (n) {}
          return t
        },
        _checkGroupsStability: function () {
          if (u.isLogged() && !u.isLoading() && s.getCount() > 0 && !s.isLoading()) {
            var e = [],
              n = s.getCollections();
            if (n.forEach(function (t) {
                var n = t._id <= 0;
                "undefined" != typeof t.parent && (n = !0), "undefined" != typeof t.parentId && (n = !0), (r.groups || []).forEach(function (e) {
                  var o = (e.collections || []).some(function (e) {
                    return parseInt(e) == parseInt(t._id)
                  });
                  o && (n = !0)
                }), n || e.push(parseInt(t._id))
              }), e.length > 0) {
              e = _.uniq(e);
              var o = _.findIndex(r.groups || [], {
                title: t.s("myCollections")
              }); - 1 != o ? r.groups[o].collections = (r.groups[o].collections || []).concat(e) : (r.groups = r.groups || [], r.groups.push({
                id: r.groups.length,
                sort: r.groups.length,
                title: t.s("myCollections"),
                hidden: !1,
                collections: e
              })), u.saveGroups()
            }
          }
        },
        _checkCache: function (e, t) {
          return a ? void("function" == typeof t && t(a)) : ("object" == typeof e && null != e && (r = e || {}, r._id && (a = !0, this.cleanGroups())), void("function" == typeof t && t(a)))
        },
        _resetFromCache: function (e) {
          if (window.cacheDisabled) {
            if ("function" == typeof e) return e(a)
          } else if (a) {
            if ("function" == typeof e) return e(a)
          } else {
            a = !1;
            var t = Api.getItem("user");
            try {
              t = JSON.parse(t)
            } catch (n) {
              n && (t = null)
            }
            var o = this;
            if (null == t) try {
              ls.getItem("user").then(function (t) {
                o._checkCache(t, e)
              })["catch"](function (t) {
                return t && "function" == typeof e ? e(a) : void 0
              })
            } catch (n) {
              if (n && "function" == typeof e) return e(a)
            } else this._checkCache(t, e)
          }
        },
        _setProData: function (e, t) {
          r.pro = e, r.proExpire = t
        }
      });
    n.exports = u
  }, {
    "../actions/ModalFrame": 5,
    "../actions/User": 8,
    "./Collections": 25
  }]
}, {}, [14]);
