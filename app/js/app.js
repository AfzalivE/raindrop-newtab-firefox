! function e(t, n, a) {
  function o(s, r) {
    if (!n[s]) {
      if (!t[s]) {
        var c = "function" == typeof require && require;
        if (!r && c) return c(s, !0);
        if (i) return i(s, !0);
        var l = new Error("Cannot find module '" + s + "'");
        throw l.code = "MODULE_NOT_FOUND", l
      }
      var d = n[s] = {
        exports: {}
      };
      t[s][0].call(d.exports, function (e) {
        var n = t[s][1][e];
        return o(n ? n : e)
      }, d, d.exports, e, t, n, a)
    }
    return n[s].exports
  }
  for (var i = "function" == typeof require && require, s = 0; s < a.length; s++) o(a[s]);
  return o
}({
  1: [function (e, t, n) {
    var a = Reflux.createActions(["load"]);
    t.exports = a
  }, {}],
  2: [function (e, t, n) {
    var a = Reflux.createActions(["load", "parseURL", "loadBookmark", "insertBookmark", "updateBookmark", "updateSelectedBookmarks", "removeBookmark", "removeSelectedBookmarks", "copySelectedBookmarks", "swapBookmarks", "saveAllSort", "syncMove", "initFavorites", "setSelected", "selectAll", "clearSelect", "reset"]);
    t.exports = a
  }, {}],
  3: [function (e, t, n) {
    var a = Reflux.createActions(["load", "swapCollections", "saveAllSort", "removeCollection"]);
    t.exports = a
  }, {}],
  4: [function (e, t, n) {
    var a = Reflux.createActions(["load", "setCurrent", "updateCollection", "insertCollection", "removeCollection", "updateCountCollection", "updateColorCollection"]);
    t.exports = a
  }, {}],
  5: [function (e, t, n) {
    t.exports = Reflux.createActions(["insert", "update", "remove"])
  }, {}],
  6: [function (e, t, n) {
    var a = Reflux.createActions(["show"]);
    t.exports = a
  }, {}],
  7: [function (e, t, n) {
    var a = Reflux.createActions(["load", "reset"]);
    t.exports = a
  }, {}],
  8: [function (e, t, n) {
    t.exports = Reflux.createActions(["show", "close"])
  }, {}],
  9: [function (e, t, n) {
    t.exports = Reflux.createActions(["change"])
  }, {}],
  10: [function (e, t, n) {
    t.exports = Reflux.createActions(["load"])
  }, {}],
  11: [function (e, t, n) {
    t.exports = Reflux.createActions(["load"])
  }, {}],
  12: [function (e, t, n) {
    var a = Reflux.createActions(["load"]);
    t.exports = a
  }, {}],
  13: [function (e, t, n) {
    var a = Reflux.createActions(["show", "close", "stopTimer"]);
    t.exports = a
  }, {}],
  14: [function (e, t, n) {
    var a = Reflux.createActions(["load", "toggleGroup", "updateGroup", "insertGroup", "removeGroup", "swapGroups", "saveGroups", "updateCollection", "updateLanguage", "updateConfig", "swapCollections", "logOut", "signIn", "signUp"]);
    t.exports = a
  }, {}],
  15: [function (e, n, a) {
    function o(e) {
      window.mousePos.x = e.clientX || e.pageX, window.mousePos.y = e.clientY || e.pageY
    }
    aboutApp = JSON.parse(e("../newtab/manifest.json")), Raven = e("raven-js"), Raven.config("https://37d1786e89b7423d9309613f33bb56c3@app.getsentry.com/16738", {
      release: aboutApp.version
    }).install();
    try {
      ga("send", "event", "new_tab_" + aboutApp.version, "open")
    } catch (i) {}
    React = e("react"), Reflux = e("reflux"), consts = e("./config"), strings = e("../modules/strings.js"), Api = e("../modules/api.js"), t = e("../modules/translate"), window.moment = e("moment"), t.setLang(), _ = e("lodash"), network = e("../modules/network.js"), dropfiles = e("../modules/dropfiles.js"), ls = {};
    try {
      localStorage.getItem("a"), ls = e("localforage")
    } catch (i) {}
    Icon = e("./components/Helpers/Icon.js"), DocumentTitle = e("react-document-title"), Modal = e("./components/Modals/Modal"), Toasts = e("../actions/Toast"), S = e("string"), UserStore = e("../stores/User"), Pop = e("../actions/Pop"), Router = e("react-router");
    var s = Router.DefaultRoute,
      r = Router.NotFoundRoute,
      c = Router.Route,
      l = Router.RouteHandler;
    Link = Router.Link;
    var d = React.createClass({
        displayName: "AppRoute",
        render: function () {
          return React.createElement(l, null)
        }
      }),
      m = {
        loaded: !1,
        load: function () {
          if (this.loaded) return !1;
          var t = (document.getElementById("app-actions"), document.getElementById("app-sidebar")),
            n = document.getElementById("app-toast"),
            a = document.getElementById("app-modal-frame");
          UserStore.onLoad();
          var o = e("./components/Sidebar.js");
          React.render(React.createElement(o, null), t);
          var i = e("./components/Toast.js");
          React.render(React.createElement(i, null), n);
          var s = e("./components/ModalFrame.js");
          React.render(React.createElement(s, null), a);
          var r = e("./components/Pop/Pop"),
            c = document.createElement("div");
          c.id = "app-pop", document.body.appendChild(c), React.render(React.createElement(r, null), c), dropfiles.bind(), this.loaded = !0
        }
      };
    window.addEventListener(window.languageLoaded ? "DOMContentLoaded" : "langLoaded", function () {
      var t = (document.getElementById("app-markup"), document.getElementById("app-content")),
        n = e("./routes/404.js"),
        a = e("./routes/WebHome.js"),
        o = e("./routes/Dashboard.js"),
        i = e("./routes/Collection.js"),
        l = e("./routes/Interface.js"),
        u = e("./routes/WaitAuth.js"),
        h = e("./routes/Tools.js"),
        p = e("./routes/Tools/Index.js"),
        f = e("./routes/Tools/Tags.js"),
        g = null,
        v = null; - 1 != (window.environment || []).indexOf("web") ? (v = React.createElement(c, {
        name: "dashboard",
        handler: o
      }), g = React.createElement(s, {
        name: "home",
        handler: a
      })) : (v = React.createElement(c, {
        name: "home",
        handler: a
      }), g = React.createElement(s, {
        name: "dashboard",
        handler: o
      }));
      var R = React.createElement(c, {
        name: "app",
        path: "/",
        handler: d
      }, React.createElement(c, {
        name: "collection",
        path: "/collection/:cId/?:search?",
        handler: i
      }), React.createElement(c, {
        name: "interface",
        path: "/interface",
        handler: l
      }), React.createElement(c, {
        name: "waitauth",
        path: "/waitauth",
        handler: u
      }), React.createElement(c, {
        name: "tools",
        path: "/tools",
        handler: h
      }, React.createElement(s, {
        name: "index",
        handler: p
      }), React.createElement(c, {
        name: "tags",
        path: "tags",
        handler: f
      })), v, g, React.createElement(r, {
        name: "not-found",
        handler: n
      }));
      Router.run(R, function (e, n) {
        var a = null;
        try {
          a = n.routes[1].name
        } catch (o) {}
        document.body.setAttribute("data-route", a || "");
        try {
          ga("send", "pageview"), window.Intercom("update")
        } catch (o) {}
        React.render(React.createElement(e, null), t, function () {
          document.documentElement.classList.add("show"), m.load()
        })
      })
    }), window.mousePos = {
      x: 0,
      y: 0
    }, document.addEventListener("mousedown", o, !1)
  }, {
    "../actions/Pop": 8,
    "../actions/Toast": 13,
    "../modules/api.js": 103,
    "../modules/dropfiles.js": 106,
    "../modules/network.js": 107,
    "../modules/strings.js": 108,
    "../modules/translate": 109,
    "../newtab/manifest.json": 111,
    "../stores/User": 125,
    "./components/Helpers/Icon.js": 44,
    "./components/ModalFrame.js": 52,
    "./components/Modals/Modal": 59,
    "./components/Pop/Pop": 71,
    "./components/Sidebar.js": 85,
    "./components/Toast.js": 88,
    "./config": 90,
    "./routes/404.js": 92,
    "./routes/Collection.js": 93,
    "./routes/Dashboard.js": 94,
    "./routes/Interface.js": 95,
    "./routes/Tools.js": 96,
    "./routes/Tools/Index.js": 97,
    "./routes/Tools/Tags.js": 98,
    "./routes/WaitAuth.js": 99,
    "./routes/WebHome.js": 100,
    localforage: "localforage",
    lodash: "lodash",
    moment: "moment",
    "raven-js": "raven-js",
    react: "react",
    "react-document-title": "react-document-title",
    "react-router": "react-router",
    reflux: "reflux",
    string: "string"
  }],
  16: [function (e, n, a) {
    var o = e("../Modals/BookmarksMove"),
      i = e("../Modals/BookmarksCopy"),
      s = e("../Modals/BookmarksRemove"),
      r = e("../Modals/BookmarksAddTags");
    n.exports = React.createClass({
      displayName: "Bookmarks/BatchEdit",
      getInitialState: function () {
        return {
          count: this.props.count,
          bookmarksCount: this.props.bookmarksCount,
          modalMoveShow: !1,
          modalCopyShow: !1,
          modalRemoveShow: !1,
          modalAddTagsShow: !1
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          count: e.count,
          bookmarksCount: e.bookmarksCount
        })
      },
      handleModalMoveClose: function () {
        this.isMounted() && this.setState({
          modalMoveShow: !1
        })
      },
      handleModalCopyClose: function () {
        this.isMounted() && this.setState({
          modalCopyShow: !1
        })
      },
      handleModalRemoveClose: function () {
        this.isMounted() && this.setState({
          modalRemoveShow: !1
        })
      },
      handleModalAddTagsClose: function () {
        this.isMounted() && this.setState({
          modalAddTagsShow: !1
        })
      },
      handleMove: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          modalMoveShow: !0
        })
      },
      handleCopy: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          modalCopyShow: !0
        })
      },
      handleRemove: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          modalRemoveShow: !0
        })
      },
      handleTags: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          modalAddTagsShow: !0
        })
      },
      handleSelectAll: function (e) {
        e.preventDefault(), this.props.onSelectAll()
      },
      handleCancel: function (e) {
        e.preventDefault(), this.props.onCancel()
      },
      render: function () {
        return React.createElement("div", {
          className: "context-actions"
        }, React.createElement("div", {
          className: "badge"
        }, this.state.count, " ", t.s("of"), " ", this.state.bookmarksCount), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleMove
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "move-all"
        })), React.createElement("span", {
          className: "title"
        }, t.s("moveSelectedBookmarks"))), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleCopy
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "copy"
        })), React.createElement("span", {
          className: "title"
        }, "Copy")), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleTags
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "tags",
          size: "mac"
        })), React.createElement("span", {
          className: "title"
        }, t.s("addTags"))), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleRemove
        }, React.createElement("span", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "trash",
          size: "mac",
          className: "icn-red"
        })), React.createElement("span", {
          className: "title"
        }, t.s("remove"))), React.createElement("div", {
          className: "divider"
        }), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleSelectAll
        }, React.createElement(Icon, {
          name: "select-all"
        }), React.createElement("span", {
          className: "title"
        }, t.s("selectAll"))), React.createElement("a", {
          href: "",
          className: "action",
          onClick: this.handleCancel
        }, React.createElement(Icon, {
          name: "clear",
          size: "mac"
        }), React.createElement("span", {
          className: "title"
        }, t.s("cancel"))), React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.modalMoveShow,
          onClose: this.handleModalMoveClose
        }, React.createElement(o, null)), React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.modalCopyShow,
          onClose: this.handleModalCopyClose
        }, React.createElement(i, null)), React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.modalRemoveShow,
          onClose: this.handleModalRemoveClose
        }, React.createElement(s, null)), React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.modalAddTagsShow,
          onClose: this.handleModalAddTagsClose
        }, React.createElement(r, null)))
      }
    })
  }, {
    "../Modals/BookmarksAddTags": 53,
    "../Modals/BookmarksCopy": 54,
    "../Modals/BookmarksMove": 55,
    "../Modals/BookmarksRemove": 56
  }],
  17: [function (e, t, n) {
    var a = e("../../../actions/Bookmarks"),
      o = e("../Popovers/Bookmark"),
      i = e("../../../modules/colors.js"),
      s = (e("../../../modules/colorThief.js"), e("../../../modules/ReactDND").DragDropMixin);
    t.exports = React.createClass({
      displayName: "Bookmarks/Favorite",
      mixins: [s],
      statics: {
        configureDragDrop: function (e) {
          e("favicon", {
            dragSource: {
              beginDrag: function (e) {
                return {
                  item: {
                    _id: e.state._id
                  }
                }
              },
              endDrag: function (e) {
                "function" == typeof e.props.onEndDrag && e.props.onEndDrag(e.state._id)
              }
            },
            dropTarget: {
              over: function (e, t) {
                "function" == typeof e.props.onMove && e.props.onMove(t._id, e.state._id)
              }
            }
          })
        }
      },
      getInitialState: function () {
        return this.props.item.scaleDown = Api.getItem("scaleDown-" + (this.props.item.cover || this.props.item.domain)) || null, this.props.item.showPopover = !1, this.props.item.mousePos = !1, this.props.item
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState(e.item)
      },
      initPalette: function (e) {
        if (this.isMounted()) {
          var t = this;
          try {
            var n = e.target.parentNode.offsetWidth > e.target.naturalWidth || e.target.parentNode.offsetHeight > e.target.offsetHeight;
            t.state.scaleDown != n && n && (Api.setItem("scaleDown-" + (t.state.cover || t.state.domain), n), t.isMounted() && t.setState({
              scaleDown: n
            }))
          } catch (e) {}
        }
      },
      onErrorImg: function (e) {
        this.isMounted() && this.setState({
          noFavIcon: !0
        })
      },
      handleMore: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          showPopover: !0,
          mousePos: !e.target.classList.contains("icon-more")
        })
      },
      handleEdit: function (e) {
        e && e.preventDefault(), Pop.show("bookmark", {
          id: this.state._id,
          pin: "element-" + this.state._id
        })
      },
      handleRemove: function (e) {
        e.preventDefault(), a.removeBookmark({
          item: this.state
        })
      },
      handlePopoverClose: function () {
        this.isMounted() && this.setState({
          showPopover: !1
        })
      },
      render: function () {
        var e = "card favorite-item favorite-" + this.state.contrast;
        this.getDragState("favicon").isDragging && (e += " no-opacity"), this.state.scaleDown && !this.state.noFavIcon && (e += " scaleDown");
        var t = this.state.title;
        try {
          t = t.trim()
        } catch (n) {}
        var a = null,
          s = "white";
        if (this.state.noFavIcon) {
          var r = i.colorFromString(this.state.domain);
          s = "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")", a = React.createElement(Icon, {
            name: "best",
            size: "big"
          }), e += " noFavIcon"
        } else a = React.createElement("img", {
          src: this.state.cover ? network.thumb(this.state.cover, 230) : network.favIcon(this.state.domain),
          onLoad: this.initPalette,
          onError: this.onErrorImg,
          alt: ""
        });
        return React.createElement("figure", React.__spread({
          ref: "item",
          id: "element-" + this.props.item._id
        }, this.dragSourceFor("favicon"), this.dropTargetFor("favicon"), {
          className: e,
          onContextMenu: this.handleMore
        }), React.createElement("div", {
          className: "favicon",
          style: {
            backgroundColor: s
          }
        }, a), React.createElement("figcaption", {
          className: "about"
        }, React.createElement("div", {
          className: "title",
          title: t
        }, t)), React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          id: "more-" + this.props.item._id,
          className: "action-icon icon-more",
          onClick: this.handleEdit
        }, React.createElement(Icon, {
          name: "more",
          size: "mac",
          style: {
            backgroundColor: this.state.palette
          }
        }))), React.createElement("a", {
          href: this.state.link,
          className: "permalink"
        }), React.createElement(o, React.__spread({
          position: this.state.mousePos ? "left" : "",
          onClose: this.handlePopoverClose,
          show: this.state.showPopover,
          attachId: "more-" + this.props.item._id
        }, this.props.item, {
          handleEdit: this.handleEdit,
          handleRemove: this.handleRemove,
          mousePos: this.state.mousePos
        })))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../modules/ReactDND": 102,
    "../../../modules/colorThief.js": 104,
    "../../../modules/colors.js": 105,
    "../Popovers/Bookmark": 74
  }],
  18: [function (e, n, a) {
    var o = e("./Tag.js"),
      i = e("../Helpers/Cover.js"),
      s = e("../Helpers/Favicon.js"),
      r = e("../Helpers/Checkbox.js"),
      c = e("../Collections/Path.js"),
      l = e("../Popovers/Bookmark"),
      d = e("../../../actions/Bookmarks"),
      m = e("../../../modules/ReactDND").DragDropMixin,
      u = e("react/addons").addons.PureRenderMixin;
    n.exports = React.createClass({
      displayName: "Bookmarks/Item",
      mixins: [m, Router.State, u],
      statics: {
        configureDragDrop: function (e) {
          e("bookmark", {
            dragSource: {
              beginDrag: function (e) {
                return React.findDOMNode(e.refs.bookmark).classList.add("drag-preview"), {
                  item: {
                    _id: e.state._id
                  }
                }
              },
              canDrag: function (e) {
                return e.props.canDrag && e.props.canEdit
              },
              endDrag: function (e) {
                "function" == typeof e.props.onMoveEnd && e.props.onMoveEnd()
              }
            },
            dropTarget: {
              over: function (e, t) {
                "function" == typeof e.props.onMove && e.props.canDropSort && e.props.onMove(t._id, e.state._id)
              }
            }
          })
        }
      },
      getInitialState: function () {
        var e = this.props.item;
        return e.selectMode = this.props.selectMode || !1, e.showPopover = !1, e.mousePos = !1, e
      },
      componentWillReceiveProps: function (e) {
        var t = e.item;
        t.selectMode = e.selectMode || !1, this.isMounted() && this.setState(t)
      },
      handleMore: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          showPopover: !0,
          mousePos: !e.target.classList.contains("icon-more")
        })
      },
      handleEdit: function (e) {
        e.preventDefault(), Pop.show("bookmark", {
          id: this.state._id,
          pin: "element-" + this.state._id
        })
      },
      handleRemove: function (e) {
        e.preventDefault(), d.removeBookmark({
          item: this.state
        })
      },
      handleSelect: function (e) {
        var t = e;
        "object" == typeof e ? (this.state.selectMode || e.nativeEvent.shiftKey) && (e.preventDefault(), t = !this.state.selected, this.props.onSelect({
          id: this.state._id,
          selected: t,
          shift: e.nativeEvent.shiftKey
        })) : this.props.onSelect({
          id: this.state._id,
          selected: t
        })
      },
      handlePopoverClose: function () {
        this.isMounted() && this.setState({
          showPopover: !1
        })
      },
      render: function () {
        var e = null,
          n = null,
          a = "card",
          d = null;
        this.getDragState("bookmark").isDragging && (a += " no-opacity"), this.state.selected && (a += " selected"), this.state.selectMode && (a += " select-mode"), this.state.loading && (a += " loading"), this.state.tags && (n = this.state.tags.map(function (e, t) {
          return React.createElement(o, {
            key: "tag" + t,
            name: e
          })
        })), "video" == this.state.type && (e = React.createElement("div", {
          className: "play"
        }, React.createElement("div", {
          className: "play-icon"
        }, React.createElement(Icon, {
          name: "play"
        })), React.createElement("img", {
          className: "cover-img",
          src: network.thumb(this.state.cover, 230)
        }))), this.state.loading === !0 && (e = React.createElement("div", {
          className: "progress",
          id: "bookmark-loading-progress-" + this.state._id
        }, React.createElement("div", {
          className: "progress-preloader"
        }, (this.state.progress || 0) < 100 ? this.state.progress || null : 99)));
        var m = "",
          u = network.linkTarget();
        this.state.selectMode ? m = "" : "link" == this.state.type ? m = this.state.link : (m = "#" + this.context.router.getCurrentPathname() + "?viewer=" + this.state._id, u = "_self");
        var h = null;
        if (this.props.canEdit) {
          var p = null;
          this.state.loading || (-1 != (window.environment || []).indexOf("clipper") ? "link" == this.state.type || this.state.file || (p = React.createElement("a", {
            href: m,
            className: "action-icon"
          }, React.createElement(Icon, {
            name: "eye"
          })), m = this.state.link, u = network.linkTarget()) : p = React.createElement("a", {
            href: this.state.link,
            className: "action-icon",
            target: "_blank"
          }, React.createElement(Icon, {
            name: "open-link",
            size: "mac"
          }))), h = React.createElement("div", {
            className: "more"
          }, p, this.state.loading ? null : React.createElement("a", {
            href: "",
            className: "action-icon",
            id: "more-" + this.state._id,
            onClick: this.handleEdit
          }, React.createElement(Icon, {
            name: "edit",
            size: "mac"
          })), React.createElement("a", {
            href: "",
            className: "action-icon",
            onClick: this.handleRemove
          }, React.createElement(Icon, {
            name: "trash",
            size: "mac"
          })), React.createElement(r, {
            active: this.state.selected,
            onClick: this.handleSelect
          }))
        }
        var f = [React.createElement("a", {
            href: m,
            target: u,
            onClick: this.handleSelect,
            className: "permalink",
            key: "permalink1"
          }), React.createElement(l, React.__spread({
            key: "permalink2",
            position: this.state.mousePos ? "left" : "",
            onClose: this.handlePopoverClose,
            show: this.state.showPopover,
            attachId: "more-" + this.state._id
          }, this.state, {
            handleEdit: this.handleEdit,
            handleRemove: this.handleRemove
          }))],
          g = null;
        this.props.showPath && (g = React.createElement("figcaption", {
          className: "path"
        }, React.createElement(c, {
          _id: this.state.collection.$id
        })), a += " with-path");
        var v = null;
        switch ("link" != this.state.type && (v = React.createElement(Icon, {
          name: this.state.type
        })), this.props.view) {
          case "masonry":
          case "grid":
            a += " grid-item", d = React.createElement("figure", React.__spread({
              ref: "bookmark",
              id: "element-" + this.state._id
            }, this.dragSourceFor("bookmark"), this.dropTargetFor("bookmark"), {
              className: a,
              "data-type": this.state.type,
              onContextMenu: this.handleMore
            }), React.createElement("div", {
              className: "cover"
            }, e, React.createElement(i, {
              src: this.state.cover,
              link: this.state.link,
              domain: this.state.domain,
              width: "230",
              className: "cover-img",
              preHeight: "masonry" == this.props.view,
              proportions: this.props.item.coverHeight
            })), React.createElement("figcaption", {
              className: "about"
            }, React.createElement("div", {
              className: "title"
            }, this.state.title, " ", React.createElement("span", {
              className: "tags"
            }, n)), React.createElement("div", {
              className: "type"
            }, v)), g, h, f);
            break;
          case "simple":
            a += " list-item", d = React.createElement("figure", React.__spread({
              ref: "bookmark",
              id: "element-" + this.state._id
            }, this.dragSourceFor("bookmark"), this.dropTargetFor("bookmark"), {
              className: a,
              "data-type": this.state.type,
              onContextMenu: this.handleMore
            }), React.createElement("div", {
              className: "favicon"
            }, React.createElement(s, {
              domain: this.state.domain,
              className: "icon"
            })), React.createElement("figcaption", {
              className: "about"
            }, React.createElement("div", {
              className: "title"
            }, this.state.title, " ", React.createElement("span", {
              className: "tags"
            }, n))), g, React.createElement("div", {
              className: "type"
            }, v), h, f);
            break;
          default:
            a += " list-item";
            var R = "";
            try {
              R = S(this.state.excerpt).truncate(150).s
            } catch (k) {}
            R || (R = t.s(this.state.type) + " " + t.s("from") + " " + this.state.domain);
            var C = null;
            this.state.cover && (C = React.createElement(s, {
              domain: this.state.domain,
              className: "icon"
            })), d = React.createElement("figure", React.__spread({
              ref: "bookmark",
              id: "element-" + this.state._id
            }, this.dragSourceFor("bookmark"), this.dropTargetFor("bookmark"), {
              className: a,
              "data-type": this.state.type,
              onContextMenu: this.handleMore
            }), React.createElement("div", {
              className: "cover"
            }, e, React.createElement(i, {
              src: this.state.cover,
              link: this.state.link,
              domain: this.state.domain,
              width: "100",
              className: "cover-img",
              proportions: this.props.item.coverHeight
            })), React.createElement("figcaption", {
              className: "about"
            }, React.createElement("div", {
              className: "title"
            }, this.state.title), React.createElement("div", {
              className: "excerpt"
            }, React.createElement("span", {
              className: "description"
            }, R), " ", React.createElement("span", {
              className: "tags"
            }, n)), g), React.createElement("div", {
              className: "type"
            }, v), h, f)
        }
        return d
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../modules/ReactDND": 102,
    "../Collections/Path.js": 33,
    "../Helpers/Checkbox.js": 38,
    "../Helpers/Cover.js": 40,
    "../Helpers/Favicon.js": 42,
    "../Popovers/Bookmark": 74,
    "./Tag.js": 22,
    "react/addons": "react/addons"
  }],
  19: [function (e, t, n) {
    var a = e("./Item.js"),
      o = e("./Favorite"),
      i = e("./Section");
    e("./Upgrade"), e("react/addons").addons.CSSTransitionGroup;
    t.exports = React.createClass({
      displayName: "Bookmarks/List",
      getInitialState: function () {
        return {
          items: this.props.items,
          view: this.props.view,
          sort: this.props.sort
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          items: e.items,
          view: e.view,
          sort: e.sort
        })
      },
      render: function () {
        var e = this,
          t = [],
          n = "bookmarks view-" + this.state.view;
        if (this.state.view) {
          var s = null,
            r = null;
          return this.state.items.forEach(function (n, c) {
            var l = null;
            if (l = "favorites" == e.state.view ? React.createElement(o, {
                key: "favorite_" + n._id,
                item: n,
                onMore: e.props.onMore,
                onMove: e.props.onMove,
                onEndDrag: e.props.onMoveEnd
              }) : React.createElement(a, {
                item: n,
                view: e.state.view,
                key: "bookmark_" + n._id,
                selectMode: e.props.selectMode,
                showPath: e.props.showPath,
                canDrag: !0,
                canDropSort: "sort" == e.state.sort,
                canEdit: e.props.canEdit,
                onMore: e.props.onMore,
                onMove: e.props.onMove,
                onMoveEnd: e.props.onMoveEnd,
                onSelect: e.props.onSelect
              }), "sort" != e.state.sort) {
              var d = [l];
              switch (e.state.sort) {
                case "lastUpdate":
                  r = new Date(n.lastUpdate).getMonth();
                  break;
                case "title":
                  r = "—";
                  try {
                    r = n.title.trim().toUpperCase().substr(0, 1)
                  } catch (m) {}
                  S(r).isNumeric() && (r = "#")
              }
              if (r != s) {
                switch (s = r, e.state.sort) {
                  case "lastUpdate":
                    n.section = {
                      type: "date",
                      value: n.lastUpdate
                    };
                    break;
                  case "title":
                    n.section = {
                      type: "text",
                      value: s
                    }
                }
                d.unshift(React.createElement(i, {
                  item: n.section,
                  key: "books_sec_" + n.value
                }))
              }
              t.push(d)
            } else t.push(l)
          }), React.createElement("div", {
            className: n
          }, t)
        }
        return null
      }
    })
  }, {
    "./Favorite": 17,
    "./Item.js": 18,
    "./Section": 21,
    "./Upgrade": 23,
    "react/addons": "react/addons"
  }],
  20: [function (e, t, n) {
    var a = e("./Item.js"),
      o = e("react-masonry-component")(React);
    t.exports = React.createClass({
      displayName: "Bookmarks/Masonry",
      getInitialState: function () {
        return {
          items: this.props.items,
          view: this.props.view,
          sort: this.props.sort
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          items: e.items,
          view: e.view,
          sort: e.sort
        })
      },
      render: function () {
        var e = this,
          t = null;
        this.state.view && (t = this.state.items.map(function (t) {
          return React.createElement(a, {
            item: t,
            view: e.state.view,
            key: "bookmark_" + t._id,
            selectMode: e.props.selectMode,
            showPath: e.props.showPath,
            canDrag: !0,
            canDropSort: !1,
            canEdit: e.props.canEdit,
            onMore: e.props.onMore,
            onMove: e.props.onMove,
            onMoveEnd: e.props.onMoveEnd,
            onSelect: e.props.onSelect
          })
        }));
        var n = "bookmarks view-" + this.state.view;
        return UserStore.getConfig("view_cover_disable") && (n += " view-cover-disable"), React.createElement(o, {
          className: n,
          elementType: "figure"
        }, t)
      }
    })
  }, {
    "./Item.js": 18,
    "react-masonry-component": "react-masonry-component"
  }],
  21: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Bookmarks/Section",
      render: function () {
        var e = "";
        switch (this.props.item.type) {
          case "date":
            var t = "MMMM",
              n = moment(this.props.item.value);
            n.format("YY") != moment().format("YY") && (t += " YYYY"), e = n.format(t);
            break;
          case "text":
            e = this.props.item.value
        }
        return React.createElement("div", {
          className: "section"
        }, e)
      }
    })
  }, {}],
  22: [function (e, t, n) {
    var a = e("../../../stores/Collections");
    t.exports = React.createClass({
      displayName: "Bookmarks/Tag",
      shouldComponentUpdate: function (e) {
        return this.props.name != e.name
      },
      render: function () {
        var e = 0;
        try {
          e = a.getCurrentId() || 0
        } catch (t) {}
        return React.createElement("a", {
          href: "#/collection/" + e + "/" + encodeURIComponent(JSON.stringify([{
            key: "tag",
            val: this.props.name
          }])),
          className: "tag"
        }, "#", this.props.name)
      }
    })
  }, {
    "../../../stores/Collections": 115
  }],
  23: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "Bookmarks/Upgrade",
      render: function () {
        if (!this.props.force) {
          if (UserStore.isPro()) return null;
          if (parseInt(Api.getItem("openCount") || 0) % 10 != 0) return null
        }
        var e = "card upgrade-bookmark";
        switch (this.props.view) {
          case "grid":
          case "masonry":
            e += " grid-item";
            break;
          default:
            e += " list-item"
        }
        var n = this.props.title || t.s("footerProAd") + " " + t.s("footerProAdD"),
          a = this.props.excerpt || "$2 " + t.s("und") + " " + t.s("pro_noAds").toLowerCase();
        return React.createElement("figure", {
          className: e
        }, React.createElement("img", {
          className: "upgrade-bookmark-icon",
          src: (window.pathPrefix || "") + "../common/images/upgrade.png"
        }), React.createElement("div", {
          className: "upgrade-bookmark-text"
        }, React.createElement("b", null, n), a), React.createElement("a", {
          href: consts.proPage,
          target: "_blank",
          className: "permalink"
        }))
      }
    })
  }, {}],
  24: [function (e, t, n) {
    var a = e("../../../modules/ReactDND").DragDropMixin;
    t.exports = React.createClass({
      displayName: "Collections/Breadcrumb",
      mixins: [a],
      statics: {
        configureDragDrop: function (e) {
          e("bookmark", {
            dropTarget: {
              acceptDrop: function (e, t) {
                "function" == typeof e.props.onDropBookmark && e.props.onDropBookmark(t._id, e.props._id)
              }
            }
          })
        }
      },
      render: function () {
        var e = "item";
        this.getDropState("bookmark").isHovering && (e += " drag-hover");
        var t = null;
        if (this.props.cover) {
          var n = consts.defaultCollectionIcon();
          try {
            n = network.fixURL(this.props.cover[0])
          } catch (a) {}
          t = React.createElement("img", {
            src: n,
            alt: ""
          })
        }
        return React.createElement("li", React.__spread({
          className: e,
          key: "bread_" + this.props._id
        }, this.dropTargetFor("bookmark")), t, React.createElement("a", {
          href: "#collection/" + this.props._id
        }, this.props.children))
      }
    })
  }, {
    "../../../modules/ReactDND": 102
  }],
  25: [function (e, n, a) {
    var o = e("../../../stores/Collections"),
      i = e("./Breadcrumb"),
      s = e("react/addons").addons.PureRenderMixin;
    n.exports = React.createClass({
      displayName: "Collections/Breadcrumbs",
      mixins: [s],
      getInitialState: function () {
        return {
          collection: this.props.collection,
          parents: this.props.parents
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          collection: e.collection,
          parents: e.parents
        })
      },
      handleEdit: function (e) {
        e.preventDefault(), Pop.show("collection", {
          id: this.state.collection._id,
          forceEdit: !0,
          pin: "current-collection-settings-button",
          force: "vertical"
        })
      },
      handleShare: function (e) {
        e.preventDefault(), Pop.show("collection", {
          id: this.state.collection._id,
          pin: "current-collection-share-button",
          force: "vertical",
          step: "sharing"
        })
      },
      handleAddFolder: function (e) {
        e.preventDefault(), Pop.show("collection", {
          parentId: this.state.collection._id,
          pin: "current-collection-sub-folder-button",
          force: "vertical"
        })
      },
      handleRemove: function (e) {
        e.preventDefault(), o.onRemoveCollection({
          item: this.state.collection
        })
      },
      render: function () {
        var e = null,
          n = null,
          a = this;
        return (this.state.parents || []).length > 0 && (e = this.state.parents.map(function (e) {
          return [React.createElement(i, {
            key: "breaditem_" + e._id,
            _id: e._id,
            onDropBookmark: a.props.onDropBookmark
          }, e.title), React.createElement("li", {
            className: "item separator",
            key: e._id + "_"
          }, React.createElement(Icon, {
            name: "chevron-right",
            size: "small"
          }))]
        })), this.state.collection.author && (n = React.createElement("ul", {
          className: "breadcrumbs"
        }, React.createElement("li", {
          className: "item more active"
        }, React.createElement("a", {
          href: "",
          title: t.s("createSubFolder"),
          className: "action-icon",
          onClick: this.handleAddFolder,
          style: {
            paddingLeft: "14px",
            paddingRight: "14px"
          },
          id: "current-collection-sub-folder-button"
        }, React.createElement(Icon, {
          name: "folder-add",
          size: "mac"
        }))), React.createElement("li", {
          className: "item more active"
        }, React.createElement("a", {
          href: "",
          title: t.s("sharing"),
          className: "action-icon",
          onClick: this.handleShare,
          style: {
            paddingLeft: "14px",
            paddingRight: "14px"
          },
          id: "current-collection-share-button"
        }, React.createElement(Icon, {
          name: "share",
          size: "mac"
        }))))), -99 === this.state.collection._id && (n = React.createElement("ul", {
          className: "breadcrumbs"
        }, React.createElement("li", {
          className: "item more active"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleRemove,
          style: {
            paddingLeft: "14px",
            paddingRight: "14px"
          }
        }, React.createElement(Icon, {
          name: "trash",
          size: "mac"
        }))))), React.createElement("div", {
          className: "breadcrumbs-wrap"
        }, React.createElement("ul", {
          className: "breadcrumbs"
        }, React.createElement("li", {
          className: "item"
        }, React.createElement("a", {
          href: "#/",
          className: "action-icon"
        }, React.createElement(Icon, {
          name: "home"
        }))), React.createElement("li", {
          className: "item separator"
        }, React.createElement(Icon, {
          name: "chevron-right",
          size: "small"
        }))), React.createElement("ul", {
          className: "breadcrumbs"
        }, e, React.createElement("li", {
          className: "item active",
          id: "current-collection-settings-button"
        }, React.createElement("a", {
          href: "",
          onClick: this.handleEdit
        }, this.state.collection.title, " ", React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        })))), n)
      }
    })
  }, {
    "../../../stores/Collections": 115,
    "./Breadcrumb": 24,
    "react/addons": "react/addons"
  }],
  26: [function (e, n, a) {
    var o = e("./Item.js");
    n.exports = React.createClass({
      displayName: "Collections/Childrens",
      getInitialState: function () {
        return {
          items: this.props.items
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          items: e.items
        })
      },
      render: function () {
        var e = null,
          n = this;
        return (this.state.items || []).length > 0 && (e = this.state.items.map(function (e) {
          return React.createElement(o, {
            item: e,
            look: "simple",
            key: "child_" + e._id,
            dragParent: "childrens",
            onMore: n.props.onCollectionMore,
            onMove: n.props.onCollectionMove,
            onEndDrag: n.props.onCollectionMoveEnd,
            onDropBookmark: n.props.onDropBookmark
          })
        })), null != e ? React.createElement("div", {
          className: "bookmarks view-childrens childrens"
        }, React.createElement("div", {
          className: "section"
        }, t.s("nestedCollections")), e) : React.createElement("div", null)
      }
    })
  }, {
    "./Item.js": 31
  }],
  27: [function (e, n, a) {
    var o = e("../Collections/Breadcrumb"),
      i = e("../../../actions/Sidebar"),
      s = (e("../Popovers/CollectionMore"), e("../Modals/CollectionView")),
      r = e("../Search/Search.js"),
      c = e("../Helpers/ClipperAction.js"),
      l = e("../Helpers/Select.js"),
      d = null; - 1 != (window.environment || []).indexOf("mac") && (d = "mac");
    var m = !1,
      u = null,
      h = [],
      p = function () {
        h = [{
          key: "sort",
          value: t.s("custom")
        }, {
          key: "lastUpdate",
          value: t.s("byDate")
        }, {
          key: "title",
          value: t.s("byName")
        }]
      };
    document ? window.languageLoaded ? p() : window.addEventListener("langLoaded", p) : p();
    var f = ["grid", "list", "masonry", "simple"];
    n.exports = React.createClass({
      displayName: "Collections/ClipperToolbar",
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        return {
          collection: this.props.collection,
          parents: this.props.parents,
          sortSelected: this.props.sortSelected,
          collectionPopover: !1,
          viewModal: {
            show: !1
          },
          queries: this.props.queries,
          showSearch: this.props.queries.length > 0,
          more: !1
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          collection: e.collection,
          parents: e.parents,
          sortSelected: e.sortSelected,
          queries: e.queries,
          more: !1
        });
        var t = !1;
        try {
          this.state.collection._id != e.collection._id && 0 == e.queries.length && (t = !0)
        } catch (n) {}
        t && this.isMounted() && this.setState({
          showSearch: !1
        })
      },
      handleFab: function (e) {
        e.preventDefault(), this.props.handleFab()
      },
      handleBack: function (e) {
        e && e.preventDefault(), window.history.back()
      },
      handleSidebar: function (e) {
        e && e.preventDefault(), i.change(!0)
      },
      handleSidebarOver: function (e) {
        m = !0;
        var t = this;
        u = setTimeout(function () {
          m && t.handleSidebar()
        }, 150)
      },
      handleSidebarLeave: function (e) {
        clearTimeout(u), m = !1
      },
      handleCollectionPopover: function (e) {
        e && e.preventDefault(), Pop.show("collection", {
          id: this.state.collection._id,
          pin: "clipper-toolbar-header",
          forceEdit: !0
        })
      },
      handleEdit: function (e) {
        Pop.show("collection", {
          id: this.state.collection._id,
          pin: "clipper-toolbar-header",
          forceEdit: !0
        }), this.handleCloseMore()
      },
      handleShare: function () {
        Pop.show("collection", {
          id: this.state.collection._id,
          step: "sharing",
          pin: "clipper-toolbar-share"
        })
      },
      handleViewModalShow: function () {
        var e = JSON.parse(JSON.stringify(this.state.viewModal));
        e.show = !0, this.isMounted() && this.setState({
          viewModal: e
        })
      },
      handleViewModalClose: function () {
        var e = JSON.parse(JSON.stringify(this.state.viewModal));
        e.show = !1, this.isMounted() && this.setState({
          viewModal: e
        })
      },
      handleChangeView: function (e) {
        this.props.handleChangeView(e)
      },
      handleSearchOpen: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          showSearch: !0,
          more: !1
        })
      },
      handleSearchReset: function () {
        this.isMounted() && this.setState({
          showSearch: !1,
          more: !1
        }), this.props.onSearchReset()
      },
      handleAddFolder: function (e) {
        e.preventDefault(), Pop.show("collection", {
          parentId: this.state.collection._id,
          pin: "clipper-toolbar-sub-folder"
        }), this.handleCloseMore()
      },
      handleClose: function (e) {
        e.preventDefault(), BrowserBridge.close()
      },
      handleCloseMore: function () {
        this.isMounted() && this.setState({
          more: !1
        })
      },
      handleSortChange: function (e) {
        e.preventDefault(), this.props.handleSortChange(e.target.getAttribute("data-sort"))
      },
      handleChangeViewItem: function (e) {
        e.preventDefault();
        var t = e.target.getAttribute("data-view");
        this.handleChangeView(t)
      },
      renderMore: function () {
        var e = this,
          n = [];
        this.state.collection.author && (n.push(React.createElement("a", {
          href: "",
          onClick: this.handleEdit,
          className: "item"
        }, React.createElement("span", {
          className: "icon currentCollectionBackground"
        }, React.createElement(Icon, {
          name: "edit"
        })), React.createElement("span", {
          className: "title"
        }, t.s("collectionEdit")))), n.push(React.createElement("a", {
          href: "",
          onClick: this.handleShare,
          className: "item"
        }, React.createElement("span", {
          className: "icon currentCollectionBackground"
        }, React.createElement(Icon, {
          name: "share"
        })), React.createElement("span", {
          className: "title"
        }, t.s("shareCollection")))), -1 == (window.environment || []).indexOf("mobile") && n.push(React.createElement("a", {
          href: network.fixURL("/app#/collection/" + this.state.collection._id),
          target: "_blank",
          onClick: this.handleCloseMore,
          className: "item"
        }, React.createElement("span", {
          className: "icon currentCollectionBackground"
        }, React.createElement(Icon, {
          name: "open-link"
        })), React.createElement("span", {
          className: "title"
        }, t.s("openInBrowser")))), n.push(React.createElement("a", {
          href: "",
          onClick: this.handleAddFolder,
          className: "item"
        }, React.createElement("span", {
          className: "icon currentCollectionBackground"
        }, React.createElement(Icon, {
          name: "folder-add"
        })), React.createElement("span", {
          className: "title"
        }, t.s("createSubFolder")))));
        var a = h.map(function (t) {
          return React.createElement("div", {
            className: "item " + (e.state.sortSelected == t.key ? "active" : null),
            "data-sort": t.key,
            onClick: e.handleSortChange
          }, t.value)
        });
        (0 == this.state.collection._id || -99 == this.state.collection._id) && a.splice(0, 1);
        var o = f.map(function (t, n) {
          return React.createElement("a", {
            href: "",
            key: "style_" + t,
            className: t == e.state.collection.view ? "active" : "",
            "data-view": t,
            onClick: e.handleChangeViewItem
          }, React.createElement("img", {
            src: (window.pathPrefix || "") + "images/views/" + t + ".svg",
            style: {
              width: "80px",
              height: "80px"
            }
          }))
        });
        return React.createElement("div", {
          className: "clipper-toolbar-more " + (this.state.more ? "clipper-toolbar-show" : "")
        }, React.createElement("div", {
          className: "fast-links"
        }, n), React.createElement("div", {
          className: "picker-list"
        }, React.createElement("div", {
          className: "separator",
          style: {
            marginTop: "-1px"
          }
        }), React.createElement("div", {
          className: "section"
        }, t.s("view"))), React.createElement("div", {
          className: "img-selector",
          style: {
            padding: "8px 16px"
          }
        }, o), React.createElement("div", {
          className: "picker-list"
        }, React.createElement("div", {
          className: "separator"
        }), React.createElement("div", {
          className: "section"
        }, t.s("collectionsSorting"))), React.createElement("div", {
          className: "ioslike-tab"
        }, a))
      },
      render: function () {
        var e = [],
          n = this;
        (this.state.parents || []).length > 0 && (e = this.state.parents.map(function (e) {
          return [React.createElement(o, {
            key: "bread_" + e._id,
            _id: e._id,
            onDropBookmark: n.props.onDropBookmark
          }, e.title), React.createElement("li", {
            className: "item separator",
            key: e._id + "_"
          }, React.createElement(Icon, {
            name: "chevron-right",
            size: "small"
          }))]
        }));
        var a = null;
        UserStore.isLogged() && -99 != this.state.collection._id && "undefined" != typeof BrowserBridge && (a = React.createElement(c, {
          collection: this.state.collection,
          handleBookmarkEdit: this.props.handleBookmarkEdit,
          handleFab: this.props.handleFab
        }));
        var i = null;
        i = this.state.showSearch ? React.createElement("section", {
          className: "search-bar"
        }, React.createElement(r, {
          queries: this.state.queries,
          onSearchReset: this.handleSearchReset,
          autoFocus: !0
        })) : React.createElement("section", {
          className: "navigation"
        }, React.createElement("ul", {
          className: "path " + (this.state.collection.parent ? "" : "hidden")
        }, e), React.createElement("h1", null, React.createElement("a", {
          href: "",
          title: t.s("collectionEdit"),
          className: "path-more",
          id: "clipper-toolbar-setting",
          onClick: this.handleCollectionPopover
        }, UserStore.isLogged() ? this.state.collection.title : "Raindrop.io", React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }))));
        var d = cx({
          "clipper-toolbar": !0,
          currentCollectionBackground: !0,
          "search-mode": this.state.showSearch
        });
        return React.createElement("div", {
          className: d
        }, React.createElement("header", {
          className: UserStore.isLogged() ? "" : "hidden",
          id: "clipper-toolbar-header"
        }, React.createElement("section", {
          className: "menu"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleSidebar
        }, React.createElement(Icon, {
          name: "menu"
        }))), i, React.createElement("section", {
          className: UserStore.isLogged() ? "actions" : "hidden"
        }, React.createElement("span", {
          className: this.state.showSearch ? "hidden" : "action-icon",
          title: t.s("sortBy")
        }, React.createElement(l, {
          arrowIcon: !1,
          items: h,
          disableTitle: !0,
          selected: this.state.sortSelected,
          handleChange: this.props.handleSortChange
        }, React.createElement(Icon, {
          name: "sorting",
          size: "mac"
        }))), React.createElement("a", {
          href: "",
          className: this.state.showSearch ? "hidden" : "action-icon",
          onClick: this.handleSearchOpen
        }, React.createElement(Icon, {
          name: "search",
          size: "mac"
        })), self != top ? React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: "clear",
          size: "mac"
        })) : null)), a, React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.viewModal.show,
          onClose: this.handleViewModalClose,
          closeOnOutsideClick: !0,
          params: this.state.collection
        }, React.createElement(s, {
          onChangeView: this.handleChangeView
        })))
      }
    })
  }, {
    "../../../actions/Sidebar": 9,
    "../Collections/Breadcrumb": 24,
    "../Helpers/ClipperAction.js": 39,
    "../Helpers/Select.js": 49,
    "../Modals/CollectionView": 57,
    "../Popovers/CollectionMore": 76,
    "../Search/Search.js": 84
  }],
  28: [function (e, t, n) {
    var a = e("../Popovers/Collection"),
      o = e("../Modals/CollectionView"),
      i = e("../Search/Search.js");
    t.exports = React.createClass({
      displayName: "Collections/Toolbar",
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        return {
          collectionPopover: !1,
          viewModal: {
            show: !1
          },
          queries: this.props.queries || [],
          showSearch: (this.props.queries || []).length > 0
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          queries: e.queries || [],
          showSearch: (e.queries || []).length > 0
        })
      },
      componentWillMount: function () {
        window.addEventListener("macMoreMenu", this.handleCollectionPopover, !0), window.macSearchIsActive = !0, window.addEventListener("macSearch", this.handleSearch, !0)
      },
      componentWillUnmount: function () {
        window.removeEventListener("macMoreMenu", this.handleCollectionPopover, !0), window.removeEventListener("macSearch", this.handleSearch, !0), window.macSearchIsActive = !1
      },
      handleSearch: function () {
        UserStore.isLogged() && this.setState({
          showSearch: this.state.queries.length > 0
        })
      },
      handleCollectionPopover: function (e) {
        e && e.preventDefault(), UserStore.isLogged() && this.setState({
          collectionPopover: !this.state.collectionPopover
        })
      },
      handleCollectionPopoverClose: function () {
        this.setState({
          collectionPopover: !1
        })
      },
      handleEdit: function (e) {
        this.props.handleEditCollection(parseInt(e))
      },
      handleViewModalShow: function () {
        var e = JSON.parse(JSON.stringify(this.state.viewModal));
        e.show = !0, this.setState({
          viewModal: e
        })
      },
      handleViewModalClose: function () {
        var e = JSON.parse(JSON.stringify(this.state.viewModal));
        e.show = !1, this.setState({
          viewModal: e
        })
      },
      handleChangeView: function (e) {
        this.props.handleChangeView(e)
      },
      handleSearchReset: function () {
        this.props.q || this.setState({
          showSearch: !1
        }), this.props.onSearchReset()
      },
      render: function () {
        var e = null,
          t = null;
        return e = React.createElement("div", {
          className: "clipper-toolbar search-mode"
        }, React.createElement("header", null, React.createElement("section", {
          className: "search-bar"
        }, React.createElement(i, {
          queries: this.state.queries,
          onSearchReset: this.handleSearchReset,
          autoFocus: 0 != (this.props.collection || {})._id
        })))), t = {
          height: "38px"
        }, React.createElement("div", {
          className: "desktop-toolbar",
          style: t
        }, React.createElement("div", {
          id: "collection-more-placeholder"
        }), React.createElement(a, {
          onClose: this.handleCollectionPopoverClose,
          show: this.state.collectionPopover,
          attachId: "collection-more-placeholder",
          collection: this.props.collection,
          sortSelected: this.props.sortSelected,
          handleSortChange: this.props.handleSortChange,
          handleEdit: this.handleEdit,
          handleViewModalShow: this.handleViewModalShow,
          handleAddFolder: this.props.handleAddFolder
        }), React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.viewModal.show,
          onClose: this.handleViewModalClose,
          closeOnOutsideClick: !0,
          params: this.props.collection
        }, React.createElement(o, {
          onChangeView: this.handleChangeView
        })), e)
      }
    })
  }, {
    "../Modals/CollectionView": 57,
    "../Popovers/Collection": 75,
    "../Search/Search.js": 84
  }],
  29: [function (e, t, n) {
    var a = e("../../../modules/ReactDND").DragDropMixin,
      o = e("./GroupTabDragDropMixin");
    t.exports = React.createClass({
      displayName: "Collections/GroupTab",
      mixins: [a, o],
      getInitialState: function () {
        return {
          id: this.props.id,
          active: this.props.active || !1
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          id: e.id,
          active: e.active || !1
        })
      },
      handleMore: function (e) {
        e.preventDefault(), Pop.show("group", {
          id: this.state.id,
          pin: "tab-group-" + this.state.id,
          force: "vertical"
        })
      },
      handleAdd: function (e) {
        e.preventDefault(), "function" == typeof this.props.onAdd && this.props.onAdd(this.state.id)
      },
      render: function () {
        var e = "item" + (this.state.active ? " active" : "");
        return React.createElement("div", React.__spread({
          ref: "group",
          className: e,
          key: "grouptab_" + this.state.id,
          id: "tab-group-" + this.state.id
        }, this.dropTargetFor("collection", "group"), this.dragSourceFor("group"), {
          "data-id": this.state.id,
          onClick: this.props.onClick,
          onContextMenu: this.handleMore
        }), React.createElement("div", {
          className: "title"
        }, this.props.children), React.createElement("div", {
          className: "action-icon",
          onClick: this.handleMore
        }, React.createElement(Icon, {
          name: "edit",
          size: "mac"
        })))
      }
    })
  }, {
    "../../../modules/ReactDND": 102,
    "./GroupTabDragDropMixin": 30
  }],
  30: [function (e, t, n) {
    t.exports = {
      statics: {
        configureDragDrop: function (e) {
          e("collection", {
            dropTarget: {
              over: function (e, t) {
                "function" == typeof e.props.onClick && e.props.onClick({
                  id: e.state.id
                }), "function" == typeof e.props.onDrop && e.props.onDrop(t._id, e.state.id || e.props.id, t.dragParent)
              }
            }
          }), e("group", {
            dragSource: {
              beginDrag: function (e) {
                return React.findDOMNode(e.refs.group).classList.add("drag-preview"), {
                  item: {
                    id: e.state.id || e.props.id
                  }
                }
              }
            },
            dropTarget: {
              over: function (e, t) {
                "function" == typeof e.props.onMove && e.props.onMove(t.id, e.state.id || e.props.id)
              }
            }
          })
        }
      }
    }
  }, {}],
  31: [function (e, t, n) {
    var a = e("../../../modules/ReactDND").DragDropMixin,
      o = e("./ItemDragDropMixin"),
      i = e("react/addons").addons.PureRenderMixin,
      s = e("../Popovers/Collection");
    t.exports = React.createClass({
      displayName: "Collections/Item",
      mixins: [a, o, i],
      getInitialState: function () {
        var e = this.props.item;
        return e.showPopover = !1, e.mousePos = !1, e
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState(e.item)
      },
      handleMore: function (e) {
        e && e.preventDefault && e.preventDefault(), this.isMounted() && this.setState({
          showPopover: !0,
          mousePos: !e.target.classList.contains("icon-more")
        })
      },
      handleShare: function (e) {
        e && e.preventDefault && e.preventDefault(), Pop.show("collection", {
          id: this.props.item._id,
          pin: "child-collection-" + this.props.item._id,
          step: "sharing"
        })
      },
      handleEdit: function (e, t) {
        e && e.preventDefault && e.preventDefault(), Pop.show("collection", {
          id: this.props.item._id,
          pin: "child-collection-" + this.props.item._id,
          step: t
        })
      },
      handlePopoverClose: function () {
        this.isMounted() && this.setState({
          showPopover: !1
        })
      },
      render: function () {
        var e = consts.defaultCollectionIcon();
        try {
          e = network.fixURL(this.state.cover[0])
        } catch (t) {}
        var n = null,
          a = "#/collection/" + this.state._id,
          o = null,
          i = null;
        this.state.collaborators && this.state.author ? o = React.createElement(Icon, {
          name: "shared",
          size: "small"
        }) : this.state.collaborators && !this.state.author && (o = React.createElement(Icon, {
          name: "public",
          size: "small"
        })), this.state["public"] && (i = React.createElement(Icon, {
          name: "link",
          size: "mac"
        }));
        var r = null;
        this.state.author && (r = React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          id: "edit-" + this.props.item._id,
          className: "action-icon icon-more",
          onClick: this.handleShare
        }, React.createElement(Icon, {
          name: "share",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          id: "edit-" + this.props.item._id,
          className: "action-icon icon-more",
          onClick: this.handleEdit
        }, React.createElement(Icon, {
          name: "settings",
          size: "mac"
        }))));
        var c = "card collection-item" + (this.props.look || "");
        this.getDragState("collection").isDragging && (c += " no-opacity"), this.getDropState("bookmark").isHovering && (c += " drag-hover");
        var l = null,
          d = "favicon";
        switch (this.state._id) {
          case -1:
            l = React.createElement(Icon, {
              name: "inbox",
              className: "icn-orange"
            }), d += " favicon-svg";
            break;
          default:
            l = React.createElement("img", {
              src: e,
              className: "icon",
              alt: ""
            })
        }
        return React.createElement("figure", React.__spread({}, this.dragSourceFor("collection"), this.dropTargetFor("collection", "bookmark"), {
          className: c,
          ref: "collection",
          id: "child-collection-" + this.props.item._id,
          onContextMenu: this.handleMore
        }), React.createElement("div", {
          className: d
        }, n, l), React.createElement("figcaption", {
          className: "about"
        }, React.createElement("div", {
          className: "title"
        }, this.state.title)), React.createElement("div", {
          className: "info"
        }, React.createElement("div", {
          className: "count"
        }, this.state.count), o, i), r, React.createElement("a", {
          href: a,
          className: "permalink"
        }), React.createElement(s, React.__spread({
          position: this.state.mousePos ? "left" : "",
          onClose: this.handlePopoverClose,
          show: this.state.showPopover,
          attachId: "more-" + this.props.item._id
        }, {
          collection: this.props.item
        }, {
          onlyBasic: !0,
          handleEdit: this.handleEdit,
          handleRemove: this.handleRemove,
          mousePos: this.state.mousePos
        })))
      }
    })
  }, {
    "../../../modules/ReactDND": 102,
    "../Popovers/Collection": 75,
    "./ItemDragDropMixin": 32,
    "react/addons": "react/addons"
  }],
  32: [function (e, t, n) {
    t.exports = {
      statics: {
        configureDragDrop: function (e) {
          e("collection", {
            dragSource: {
              canDrag: function (e) {
                return (e.state._id || e.props._id) <= 0 ? !1 : !0
              },
              beginDrag: function (e) {
                return React.findDOMNode(e.refs.collection).classList.add("drag-preview"), {
                  effectsAllowed: ["move"],
                  dragPreview: React.findDOMNode(e.refs.collection),
                  item: {
                    _id: e.state._id || e.props._id,
                    dragParent: e.props.dragParent
                  }
                }
              },
              endDrag: function (e, t) {
                "function" == typeof e.props.onEndDrag && e.props.onEndDrag(e.state._id || e.props._id)
              }
            },
            dropTarget: {
              over: function (e, t) {
                return t._id == (e.state._id || e.props._id) ? !1 : void("function" == typeof e.props.onMove && e.props.onMove(t._id, e.state._id || e.props._id, t.dragParent))
              }
            }
          }), e("bookmark", {
            dropTarget: {
              acceptDrop: function (e, t) {
                "function" == typeof e.props.onDropBookmark && e.props.onDropBookmark(t._id, e.state._id || e.props._id)
              }
            }
          })
        }
      }
    }
  }, {}],
  33: [function (e, t, n) {
    var a = (e("../../../actions/Collections"), e("../../../stores/Collections"));
    t.exports = React.createClass({
      displayName: "Collections/Path",
      getInitialState: function () {
        return {
          _id: this.props._id,
          cover: null,
          title: null
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          _id: e._id
        })
      },
      shouldComponentUpdate: function (e, t) {
        return this.state.title != t.title ? !0 : this.state.cover != t.cover ? !0 : this.state._id != t._id ? !0 : !1
      },
      onCollectionsChange: function () {
        return null != this.state.title ? !0 : void this.parseCollection()
      },
      componentDidMount: function () {
        this.unsubscribeCollections = a.listen(this.onCollectionsChange), null == this.parseCollection() && a.onLoadId(this.state._id)
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections()
      },
      parseCollection: function () {
        var e = a.getCollection(this.state._id);
        if (null == e) return null;
        var t = "";
        if (e._id > 0) try {
          t = network.fixURL(e.cover[0])
        } catch (n) {}
        return this.isMounted() && this.setState({
          title: e.title,
          cover: t
        }), !0
      },
      render: function () {
        return React.createElement("a", {
          href: "#/collection/" + this.state._id,
          className: "from-collection"
        }, this.state.cover ? React.createElement("img", {
          src: this.state.cover,
          className: "collection-icon",
          alt: ""
        }) : React.createElement(Icon, {
          name: network.defaultIcons(this.state._id),
          className: "collection-icon"
        }), this.state.title)
      }
    })
  }, {
    "../../../actions/Collections": 4,
    "../../../stores/Collections": 115
  }],
  34: [function (e, n, a) {
    var o = e("./Breadcrumbs.js"),
      i = e("../Helpers/Select.js"),
      s = e("../Modals/CollectionView"),
      r = [{
        key: "sort",
        value: t.s("custom")
      }, {
        key: "lastUpdate",
        value: t.s("byDate")
      }, {
        key: "title",
        value: t.s("byName")
      }];
    n.exports = React.createClass({
      displayName: "Collections/Toolbar",
      getInitialState: function () {
        return {
          collection: this.props.collection,
          parents: this.props.parents,
          sortSelected: this.props.sortSelected,
          viewModal: {
            show: !1
          }
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          collection: e.collection,
          parents: e.parents,
          sortSelected: e.sortSelected
        })
      },
      handleChangeView: function (e) {
        this.props.handleChangeView(e)
      },
      handleEdit: function (e) {
        e.preventDefault(), this.props.handleEditCollection(parseInt(e.target.getAttribute("data-tab")))
      },
      handleViewModalShow: function (e) {
        e.preventDefault();
        var t = JSON.parse(JSON.stringify(this.state.viewModal));
        t.show = !0, this.isMounted() && this.setState({
          viewModal: t
        })
      },
      handleViewModalClose: function () {
        var e = JSON.parse(JSON.stringify(this.state.viewModal));
        e.show = !1, this.isMounted() && this.setState({
          viewModal: e
        })
      },
      render: function () {
        return UserStore.isLogged() ? React.createElement("div", {
          className: "collection-toolbar"
        }, React.createElement(Modal, {
          position: "right-top",
          isOpened: this.state.viewModal.show,
          onClose: this.handleViewModalClose,
          closeOnOutsideClick: !0,
          params: this.state.collection
        }, React.createElement(s, {
          onChangeView: this.handleChangeView
        })), React.createElement(o, {
          collection: this.state.collection,
          parents: this.state.parents,
          handleEditCollection: this.props.handleEditCollection,
          handleAddFolder: this.props.handleAddFolder,
          onDropBookmark: this.props.onDropBookmark
        }), React.createElement("div", {
          className: "toolbar-icons"
        }, React.createElement("span", {
          className: "action-icon",
          title: t.s("sortBy")
        }, React.createElement(i, {
          arrowIcon: "true",
          items: r,
          disableTitle: !1,
          selected: this.state.sortSelected,
          handleChange: this.props.handleSortChange
        }, React.createElement(Icon, {
          name: "sorting",
          size: "mac"
        }))))) : null
      }
    })
  }, {
    "../Helpers/Select.js": 49,
    "../Modals/CollectionView": 57,
    "./Breadcrumbs.js": 25
  }],
  35: [function (e, t, n) {
    var a = e("../../stores/Collections"),
      o = React.createClass({
        displayName: "Fab",
        getDefaultProps: function () {
          return {}
        },
        shouldComponentUpdate: function () {
          return !1
        },
        componentDidMount: function () {
          React.render(React.createElement(i, React.__spread({}, this.props)), document.getElementById("app-overlay-action"))
        },
        componentWillUnmount: function () {
          var e = document.getElementById("app-overlay-action");
          e && e.removeChild(document.getElementById("fabAppButton"))
        },
        render: function () {
          return null
        }
      }),
      i = React.createClass({
        displayName: "_fab",
        handleClick: function (e) {
          e.preventDefault();
          var t = a.getCurrentId() <= 0;
          Pop.show("fab", {
            parentId: a.getCurrentId(),
            pin: "fabAppButton",
            onlyURL: t
          })
        },
        render: function () {
          return React.createElement("a", {
            href: "",
            id: "fabAppButton",
            className: "fab",
            style: {
              position: "fixed"
            },
            onClick: this.handleClick
          }, React.createElement(Icon, {
            name: "add",
            size: "small"
          }))
        }
      });
    t.exports = o
  }, {
    "../../stores/Collections": 115
  }],
  36: [function (e, t, n) {
    var a = e("../../../actions/Collections"),
      o = e("../../../stores/Collections");
    t.exports = React.createClass({
      displayName: "Forms/CollectionsList",
      scrolled: !1,
      getInitialState: function () {
        return {
          items: o.getCollections(),
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
        a.load()
      },
      componentDidMount: function () {
        var e = this;
        this.unsubscribeCollections = o.listen(this.onCollectionsChange), this.unsubscribeUser = UserStore.listen(this.onUserChange);
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
        for (var a in this.state.items)
          if (this.state.items[a]._id == n) {
            t = this.state.items[a];
            break
          } for (var a in this.state.childrens)
          if (this.state.childrens[a]._id == n) {
            t = this.state.childrens[a];
            break
          } this.props.onSelectCollection(t)
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
          a = function (e) {
            var n = "https://raindrop.io/other/popup/img/icon-folder.png";
            try {
              n = network.fixURL(e.cover[0])
            } catch (a) {}
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
          i = function (e, a) {
            if (n) {
              var o = null;
              return a > 0 && (o = React.createElement("div", {
                className: "section"
              })), React.createElement("div", null, o, React.createElement("div", {
                id: "cl-group-" + a,
                className: "item" + (t.props.activeGroup == a ? " active" : "")
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
                "data-index": a,
                onClick: t.handleGroupSelect
              })))
            }
            return React.createElement("div", {
              className: "section"
            }, e.title)
          },
          s = function (n, o) {
            t.state.childrens.forEach(function (i) {
              i.parent.$id == n && i._id != t.props.skipCollection && (i.level = o, e.push(a(i)), s(i._id, o + 1))
            })
          };
        return (this.state.user.groups || []).length > 0 && this.state.user.groups.forEach(function (r, c) {
          (n || (r.collections || []).length > 0) && e.push(i(r, c)), (r.collections || []).length > 0 && r.collections.forEach(function (i) {
            var r = o.getCollection(i);
            null != r && r._id != t.props.skipCollection && r.author && (r.level = n ? 2 : 1, e.push(a(r)), s(r._id, n ? 3 : 2))
          })
        }), n || (e.push(React.createElement("div", {
          className: "section"
        })), e.push(a(o.getCollection(-2))), UserStore.isLogged() && (e.push(a(o.getCollection(-1))), e.push(a(o.getCollection(-99))))), React.createElement("div", {
          className: "picker-list"
        }, e)
      }
    })
  }, {
    "../../../actions/Collections": 4,
    "../../../stores/Collections": 115
  }],
  37: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/Avatar",
      shouldComponentUpdate: function (e) {
        return this.props.src != e.src
      },
      render: function () {
        return this.props.src ? React.createElement("img", {
          className: "icn-circle",
          src: "https://www.gravatar.com/avatar/" + this.props.src + "?d=mm&s=" + (this.props.size || 24),
          alt: ""
        }) : React.createElement(Icon, {
          name: "default-avatar"
        })
      }
    })
  }, {}],
  38: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/Checkbox",
      shouldComponentUpdate: function (e) {
        return this.props.active != e.active
      },
      handleClick: function (e) {
        e.preventDefault(), this.props.onClick(!this.props.active)
      },
      render: function () {
        var e = "checkbox";
        return this.props.active && (e += " active"), React.createElement("a", {
          href: "",
          onClick: this.handleClick,
          className: e
        }, React.createElement(Icon, {
          name: "done"
        }))
      }
    })
  }, {}],
  39: [function (e, n, a) {
    var o = e("../../../actions/Bookmarks"),
      i = e("../../../stores/Bookmarks"),
      s = e("../../../stores/LastBookmark"),
      r = e("../../../stores/Collections");
    n.exports = React.createClass({
      displayName: "Helpers/ClipperAction",
      getInitialState: function () {
        return {
          step: "loading",
          bookmark: {}
        }
      },
      componentWillUnmount: function () {
        "function" == typeof this.unsubscribeLastBookmark && this.unsubscribeLastBookmark(), this.unsubscribeUser(), window.bridgeSaveURL = !1
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
        var e = this; - 1 == (window.environment || []).indexOf("mobile") ? (this.unsubscribeLastBookmark = s.listen(this.onLastBookmark), UserStore.isLogged() ? BrowserBridge.currentURL(function (t) {
          e.isMounted() && e.setState({
            url: t
          }), o.loadBookmark({
            url: t
          }, function (t) {
            e.isMounted() && e.setState({
              step: t ? "saved" : "new",
              bookmark: t || {}
            })
          })
        }) : this.isMounted() && this.setState({
          step: "unsupported"
        }), window.bridgeNewURL = function (t) {
          e.isMounted() && e.setState({
            step: "loading",
            bookmark: {},
            url: t
          }), o.loadBookmark({
            url: t
          }, function (t) {
            e.isMounted() && e.setState({
              step: t ? "saved" : "new",
              bookmark: t || {}
            })
          })
        }, window.bridgeSaveURL = this.handleSaveURL) : this.isMounted() && this.setState({
          step: "new"
        })
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e
        })
      },
      onLastBookmark: function (e) {
        if ("unsupported" != this.state.step) switch (e.name) {
          case "insert":
            var t = document.getElementById("element-" + e.bookmark._id);
            t && t.classList.add("is-new");
            var n = this;
            BrowserBridge.currentURL(function (t) {
              (t == e.bookmark.link || t == e.bookmark.link + "/" || t + "/" == e.bookmark.link) && n.setState({
                step: "saved",
                bookmark: e.bookmark
              })
            }), BrowserBridge.updateExtensionIconForURL(e.bookmark.link, !0);
            break;
          case "remove":
            e.bookmark._id == this.state.bookmark._id && this.setState({
              step: "new",
              bookmark: {}
            }), BrowserBridge.updateExtensionIconForURL(e.bookmark.link, !1)
        }
      },
      handleBookmarkEdit: function (e) {
        e.preventDefault(), Pop.show("bookmark", {
          id: this.state.bookmark._id,
          pin: "bookmark-edit-clipper"
        })
      },
      handleSaveURL: function (e) {
        var n = this;
        Toasts.show({
          title: t.s("loading"),
          text: e
        }), this.isMounted() && this.setState({
          url: e
        }), o.parseURL({
          item: {
            url: e
          }
        }, function (e) {
          e ? (e.collectionId = n.props.collection._id, o.insertBookmark({
            item: e,
            toEndOfList: -2 == e.collectionId
          }, function (e) {})) : Toasts.show({
            text: t.s("supportOnlyUrls"),
            status: "error"
          })
        })
      },
      handleFab: function (e) {
        e && "undefined" != typeof e.preventDefault && e.preventDefault();
        var t = r.getCurrentId() <= 0;
        Pop.show("fab", {
          parentId: r.getCurrentId(),
          pin: "clipper-add-zone",
          onlyURL: t
        })
      },
      handleURL: function (e) {
        e.preventDefault(), Pop.show("fab", {
          parentId: r.getCurrentId(),
          pin: "clipper-add-zone",
          onlyURL: !0
        })
      },
      handleSave: function (e) {
        if (e.preventDefault(), -1 == (window.environment || []).indexOf("mobile")) {
          this.isMounted() && this.setState({
            step: "loading"
          });
          var t = this;
          BrowserBridge.currentURL(function (e) {
            t.isMounted() && t.setState({
              url: e
            });
            var n = function (e) {
              var n = JSON.parse(JSON.stringify(e || {}));
              n = i._prepareBookmark(n, n), n.collectionId = t.props.collection._id, o.insertBookmark({
                item: n
              }, function (e) {
                e || t.isMounted() && t.setState({
                  step: "new",
                  bookmark: {}
                })
              })
            };
            BrowserBridge.parseCurrentPage(function (t) {
              t ? n(t) : o.parseURL({
                item: {
                  url: e
                }
              }, n)
            })
          })
        } else this.handleFab()
      },
      render: function () {
        var e = null;
        switch (this.state.step) {
          case "loading":
            e = React.createElement("div", {
              className: "sub",
              key: "loading"
            }, React.createElement("section", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "loading",
              className: "rotating-animation",
              size: "mac"
            })), React.createElement("section", {
              className: "text"
            }, t.s("loading"), "...", React.createElement("div", {
              className: "subinfo"
            }, this.state.url || t.s("orAlternativeFeed"))));
            break;
          case "new":
            e = React.createElement("div", {
              className: "sub",
              onClick: this.handleSave,
              key: "new"
            }, React.createElement("section", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "add-box-clean",
              size: "mac",
              className: "currentCollectionBackground"
            })), React.createElement("section", {
              className: "text"
            }, t.s("saveLink"), React.createElement("div", {
              className: "subinfo"
            }, t.s("or"), " ", t.s("noBookmarksD").toLowerCase())));
            break;
          case "saved":
            e = React.createElement("div", {
              className: "sub",
              id: "bookmark-edit-clipper",
              onClick: this.handleBookmarkEdit,
              key: "saved"
            }, React.createElement("section", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "done-circle",
              size: "mac",
              className: "icn-green"
            })), React.createElement("section", {
              className: "text"
            }, t.s((this.state.bookmark.type || "link") + "Saved"), React.createElement("div", {
              className: "subinfo"
            }, t.s("alreadyInCollectionDD"))));
            break;
          case "unsupported":
            e = React.createElement("div", {
              className: "sub",
              style: {
                cursor: "default"
              },
              key: "unsupported"
            }, React.createElement("section", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "clear",
              size: "mac"
            })), React.createElement("section", {
              className: "text"
            }, t.s("unableToRecognizeSpecifiedLink"), ".", React.createElement("br", null), React.createElement("a", {
              href: "",
              onClick: this.handleURL
            }, t.s("enterLink"), " (URL)")))
        }
        return e = [e], e.push(React.createElement("div", {
          className: "sub padding",
          onClick: this.handleFab,
          key: "more"
        }, React.createElement("section", {
          className: "text"
        }, t.s("more"), " ", React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        })))), React.createElement("footer", {
          id: "clipper-add-zone"
        }, e)
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../stores/Bookmarks": 113,
    "../../../stores/Collections": 115,
    "../../../stores/LastBookmark": 116
  }],
  40: [function (e, t, n) {
    var a = e("../../../modules/colors.js");
    t.exports = React.createClass({
      displayName: "Helpers/Cover",
      cleanSource: function (e, t) {
        return e ? e : consts.screenshotService + encodeURIComponent(t || "")
      },
      makeNextState: function (e) {
        var t = e.scaleDown || null,
          n = null;
        return e.src && (t = Api.getItem("scaleDown-" + e.src) || null, n = parseFloat(e.proportions || 0).toFixed(1) || Api.getItem("proportions-" + e.src) || null), {
          src: this.cleanSource(e.src, e.link),
          domain: e.domain || "",
          scaleDown: t,
          width: e.width || 230,
          className: e.className
        }
      },
      getInitialState: function () {
        return this.makeNextState(this.props)
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState(this.makeNextState(e))
      },
      handleImgLoadSuccess: function (e) {
        if (this.isMounted()) {
          var t = this;
          if (0 != (t.state.src || "").indexOf("data:")) try {
            var n = e.target.parentNode.offsetWidth > e.target.naturalWidth + 30 || e.target.parentNode.offsetHeight > e.target.naturalHeight + 30;
            t.state.scaleDown != n && n && (Api.setItem("scaleDown-" + t.state.src, n), t.isMounted() && t.setState({
              scaleDown: n
            }))
          } catch (e) {}
          try {
            React.findDOMNode(this.refs.img).parentElement.style.backgroundImage = "none"
          } catch (e) {}
        }
      },
      handleImgLoadError: function () {
        if (this.isMounted()) {
          this.setState({
            src: !1
          });
          try {
            React.findDOMNode(this.refs.img).parentElement.style.backgroundImage = "none"
          } catch (e) {}
        }
      },
      shouldComponentUpdate: function (e, t) {
        return this.state.src != t.src ? !0 : this.state.domain != t.domain ? !0 : this.state.scaleDown != t.scaleDown ? !0 : !1
      },
      render: function () {
        if (this.state.src) {
          var e = this.state.className;
          this.props.preHeight && "null" != this.state.proportions && (e += " with-proportions"), 0 == this.state.src.indexOf(consts.screenshotService) && (e += " is-screenshot");
          var t = 230;
          return 230 == this.state.width && (t = 460), React.createElement("img", {
            ref: "img",
            className: e,
            "data-scale-down": this.state.scaleDown,
            src: network.thumb(this.state.src, this.state.width),
            srcSet: network.thumb(this.state.src, t) + " 2x",
            alt: "",
            onLoad: this.handleImgLoadSuccess,
            onError: this.handleImgLoadError
          })
        }
        if (this.state.domain) {
          var n = a.colorFromString(strings.beautifulDomain(this.state.domain));
          return React.createElement("span", {
            ref: "img",
            className: this.state.className + " cover-placeholder",
            style: {
              backgroundColor: "rgba(" + n[0] + "," + n[1] + "," + n[2] + ",.5)"
            }
          }, React.createElement(Icon, {
            name: "safari"
          }))
        }
        return React.createElement("span", {
          ref: "img",
          className: this.state.className + " cover-placeholder"
        })
      }
    })
  }, {
    "../../../modules/colors.js": 105
  }],
  41: [function (e, t, n) {
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
            var a = "item";
            if (parseInt(e.state.selected) == parseInt(n) && (a += " active"), "" == t && (a += " blank"), e.props.thumbs) {
              var o = t.indexOf(".jpg");
              o > 0 && (t = t.substr(0, o) + "-thumb" + t.substr(o, 1e3))
            }
            var i = {
              backgroundImage: "url(" + t + ")"
            };
            return "undefined" != typeof e.props.imageSize && (i.backgroundSize = e.props.imageSize), React.createElement("div", {
              className: a,
              style: i,
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
  42: [function (e, t, n) {
    var a = e("../../../modules/colors.js");
    t.exports = React.createClass({
      displayName: "Helpers/Favicon",
      _generate: function (e) {
        var t = null,
          n = !0,
          a = network.cleanDomain(e.domain);
        return e.domain && (t = Api.getItem("palette_" + e.domain) || null), {
          domain: e.domain || "",
          cleanDomain: a,
          show: n,
          className: e.className || "",
          palette: t
        }
      },
      getInitialState: function () {
        return this._generate(this.props)
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState(this._generate(e))
      },
      handleImgLoadError: function () {
        if (this.isMounted()) {
          if (!this.state.domain) return;
          var e = a.colorFromString(this.state.domain);
          e = "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")", Api.setItem("palette_" + this.state.domain, e), this.isMounted() && this.setState({
            show: !1,
            palette: e
          })
        }
      },
      shouldComponentUpdate: function (e, t) {
        return this.state.show != t.show ? !0 : this.state.palette != t.palette ? !0 : this.state.domain != t.domain ? !0 : !1
      },
      render: function () {
        return this.state.domain ? this.state.show || null == this.state.palette ? React.createElement("img", {
          className: this.state.className,
          src: network.favIcon(this.state.cleanDomain),
          onError: this.handleImgLoadError,
          alt: ""
        }) : React.createElement("div", {
          className: this.state.className + " default-favicon",
          style: {
            color: "white",
            backgroundColor: this.state.palette
          }
        }, React.createElement("span", null, (this.state.cleanDomain || "&").substr(0, 1))) : React.createElement("div", {
          className: this.state.className + " default-favicon"
        }, React.createElement("span", null))
      }
    })
  }, {
    "../../../modules/colors.js": 105
  }],
  43: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/FileLimit",
      render: function () {
        var e = 0,
          t = 1,
          n = null;
        try {
          e = UserStore.getUser().files.used, t = UserStore.getUser().files.size
        } catch (a) {}
        return UserStore.isPro() || (n = React.createElement("div", null, "Whant more? ", React.createElement("a", {
          href: consts.proPage,
          target: "_blank"
        }, "Try PRO plan"), " with 1 GB of new uploads each month.")), React.createElement("div", {
          className: "file-limit-widget",
          style: this.props.style
        }, React.createElement("strong", null, strings.humanFileSize(e, !0)), " of ", React.createElement("strong", null, strings.humanFileSize(t, !0)), " in this month.", n, React.createElement("progress", {
          max: t,
          value: e
        }))
      }
    })
  }, {}],
  44: [function (e, t, n) {
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
  45: [function (e, n, a) {
    var o = e("../../../actions/User"),
      i = {};
    i.bookmarks = e("../../images/onboard/bookmarks.svg"), n.exports = React.createClass({
      displayName: "Helpers/Onboard",
      componentDidMount: function () {
        this._renderImage()
      },
      componentDidUpdate: function () {
        this._renderImage()
      },
      _renderImage: function () {
        var e = this;
        React.findDOMNode(e.refs.svg).innerHTML = "", React.findDOMNode(e.refs.svg).innerHTML = i[this.props.scenario]
      },
      handleSignIn: function (e) {
        e.preventDefault(), o.signIn(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleSignUp: function (e) {
        e.preventDefault(), o.signUp(function () {
          location.hash = "#/", location.reload()
        })
      },
      render: function () {
        var e = null,
          n = "onboard onboard-" + this.props.scenario;
        switch (this.props.scenario) {
          case "start":
            var a = "Welcome to your new home page! Now all your favorite sites and bookmarks here.";
            window.environment && (a = React.createElement("div", null, t.s("welcome"), " Raindrop.io", React.createElement("div", {
              className: "external"
            }, t.s("appDesc")))), e = React.createElement("div", {
              className: "about about-blue"
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "tab",
              size: "big"
            })), React.createElement("div", {
              className: "text"
            }, a));
            break;
          case "clipper":
            e = React.createElement("div", {
              className: "about about-green"
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "storm",
              size: "big"
            })), React.createElement("div", {
              className: "text"
            }, React.createElement("strong", null, "Web Clipper"), " — ", t.s("extensionDescription"), React.createElement("div", {
              className: "external"
            }, t.s("browserExtensionD"))));
            break;
          case "sharing":
            e = React.createElement("div", {
              className: "about about-red"
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "group",
              size: "big"
            })), React.createElement("div", {
              className: "text"
            }, "Share bookmarks and collaborate with friends and colleagues."));
            break;
          case "bookmarks":
            var o = null;
            (this.props.params || {}).actions && (o = React.createElement("footer", null, React.createElement("a", {
              href: "",
              className: "action-icon",
              onClick: this.handleSignIn
            }, t.s("signIn")), React.createElement("a", {
              href: "",
              className: "action-icon sign-in",
              onClick: this.handleSignUp
            }, t.s("signUp")))), e = React.createElement("div", {
              className: "about"
            }, React.createElement("div", {
              className: "icon"
            }, React.createElement(Icon, {
              name: "bookmark-outline",
              size: "big"
            })), React.createElement("div", {
              className: "text"
            }, t.s("welcomeSlide1D"), " ", t.s("welcomeSlide1DD"), React.createElement("div", {
              className: "external"
            }, React.createElement(Icon, {
              name: "external",
              size: "small"
            }), "  ", React.createElement("a", {
              href: network.fixURL("/welcome"),
              target: "_blank",
              className: "learn-more"
            }, t.s("howToUse"))), o))
        }
        return this.props.className && (n += " " + this.props.className), React.createElement("div", {
          className: n
        }, React.createElement("div", {
          className: "image"
        }, React.createElement("div", {
          id: "image-svg",
          ref: "svg"
        })), e)
      }
    })
  }, {
    "../../../actions/User": 14,
    "../../images/onboard/bookmarks.svg": 91
  }],
  46: [function (e, t, n) {
    var a = e("./ScrollFixMixin.js");
    t.exports = React.createClass({
      displayName: "Helpers/OverflowScroll",
      mixins: [a],
      getInitialState: function () {
        return {
          children: this.props.children
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          children: e.children
        })
      },
      render: function () {
        var e = "overflow-scroll";
        return this.props.className && (e += " " + this.props.className), React.createElement("div", {
          className: e,
          style: this.props.style || null,
          onWheel: this.handleScroll,
          ref: "div"
        }, this.state.children)
      }
    })
  }, {
    "./ScrollFixMixin.js": 48
  }],
  47: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/RenderInBody",
      componentDidMount: function () {
        this.popup = document.createElement("div"), document.body.appendChild(this.popup), document.body.classList.add(this.props.name + "-mode"), document.body.classList.add(this.props.name + "-mode-" + this.props.category), this._renderLayer()
      },
      componentDidUpdate: function () {
        this._renderLayer()
      },
      componentWillUnmount: function () {
        React.unmountComponentAtNode(this.popup), document.body.removeChild(this.popup), document.body.classList.remove(this.props.name + "-mode"), document.body.classList.remove(this.props.name + "-mode-" + this.props.category)
      },
      _renderLayer: function () {
        React.render(this.props.children, this.popup)
      },
      render: function () {
        return React.createElement("div", null)
      }
    })
  }, {}],
  48: [function (e, t, n) {
    t.exports = {
      handleScroll: function (e, t) {
        if (!("MozAppearance" in document.documentElement.style)) {
          var n, a, o, i = React.findDOMNode(this.refs.div);
          if ("function" == typeof window.getComputedStyle && null != window.getComputedStyle(i, null) && ("auto" == window.getComputedStyle(i, null).getPropertyValue("overflow-y") || "overlay" == window.getComputedStyle(i, null).getPropertyValue("overflow-y") || "scroll" == window.getComputedStyle(i, null).getPropertyValue("overflow-y"))) return n = e.nativeEvent.wheelDelta || -e.nativeEvent.detail, a = n > 0 ? "up" : "down", o = "up" === a && 0 === i.scrollTop || "down" === a && i.scrollTop === i.scrollHeight - i.offsetHeight, o && "function" == typeof t && t(!0), void(o && e.preventDefault())
        }
      }
    }
  }, {}],
  49: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "Helpers/Select",
      getInitialState: function () {
        return {
          items: this.props.items || [],
          selected: this.props.selected || -1,
          disabled: this.props.disabled || !1
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          items: e.items,
          selected: e.selected,
          disabled: e.disabled || !1
        })
      },
      handleChange: function (e) {
        var t = e.target.options[e.target.selectedIndex].value;
        this.isMounted() && this.setState({
          selected: t
        }), this.props.handleChange(t, this.props)
      },
      render: function () {
        var e = this,
          t = null,
          n = this.props.placeholder || "";
        t = this.state.items.map(function (t, a) {
          return t.key == e.state.selected && "" == n && (n = t.value), React.createElement("option", {
            value: t.key,
            key: "select_option_" + t.key
          }, t.value)
        });
        var a = null,
          o = null;
        return this.state.disabled || (a = React.createElement("select", {
          onChange: this.handleChange,
          defaultValue: e.state.selected
        }, t), this.props.arrowIcon && (o = React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }))), React.createElement("label", {
          className: "mini-select"
        }, React.createElement("span", {
          className: "child"
        }, this.props.children), React.createElement("span", {
          className: "title"
        }, this.props.disableTitle ? null : React.createElement("span", {
          className: "title-text"
        }, n), " ", o), a)
      }
    })
  }, {}],
  50: [function (e, t, n) {
    t.exports = {
      handleSelectFilter: function (e, t, n) {
        var a = n.map(function (e) {
            return e
          }),
          o = function (e) {
            return a.indexOf(e.value) > -1 ? !1 : -1 != e.value.indexOf(t)
          },
          i = (e || []).filter(o, this);
        return "" != t.trim() && i.unshift({
          value: t,
          label: t
        }), i
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
  51: [function (e, n, a) {
    var o = e("../../../stores/Bookmarks"),
      i = e("../../../stores/Collections"),
      s = e("../../../stores/Childrens"),
      r = e("../../../stores/Parents"),
      c = e("../../../actions/User"),
      l = e("react/addons").addons.PureRenderMixin,
      d = (e("../../../stores/Stats"), "web_tip_"),
      m = [],
      u = "Win"; - 1 != strings.getCurrentBrowser().indexOf("MacOS") && (u = "Mac");
    var h = function () {
      m = [{
        name: "need_login",
        color: "light",
        title: t.s("welcome") + " Raindrop.io",
        text: React.createElement("div", null, t.s("welcomeSlide1D") + " " + t.s("welcomeSlide1DD")),
        actions: function (e) {
          return React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon not-main",
            onClick: e.handleSignIn
          }, t.s("signIn")), React.createElement("a", {
            href: "",
            className: "action-icon",
            onClick: e.handleSignUp
          }, t.s("signUp")))
        },
        check: function (e, t) {
          return UserStore.isLoading() || UserStore.isLogged() ? ("undefined" != typeof document && document.body.classList.remove("authfalse"), !1) : ("undefined" != typeof document && document.body.classList.add("authfalse"), !0)
        }
      }, {
        name: "no_bookmarks",
        color: "light",
        title: t.s("collectionEmpty"),
        text: null,
        actions: function (e) {
          return -1 != (window.environment || []).indexOf("clipper") ? null : React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon",
            id: "tip-handleAddBookmark",
            onClick: e.handleAddBookmark
          }, t.s("add")))
        },
        check: function (e, t) {
          if ("bookmarks" != e) return !1;
          var n = !1;
          i.getCurrentId() < -2 && (n = !0);
          try {
            t.context.router.getCurrentParams().search && (n = !0)
          } catch (a) {}
          return n ? !1 : o.getIsLoading() || s.getIsLoading() || 0 != o.getCount() || 0 != s.getCount() || !o.getIsNoMore() ? !1 : !0
        }
      }, {
        name: "not_found",
        color: "light",
        title: t.s("nothingFound"),
        text: null,
        actions: function (e) {
          return null
        },
        check: function (e, t) {
          if ("bookmarks" != e) return !1;
          var n = !1;
          0 == i.getCurrentId() && (n = !0);
          try {
            t.context.router.getCurrentParams().search && (n = !0)
          } catch (a) {}
          return n && !o.getIsLoading() && 0 == o.getCount() && o.getIsNoMore() ? !0 : !1
        }
      }, {
        name: "hotkey",
        title: t.s("helpHotKey") + (-1 == strings.getCurrentBrowser().indexOf("opera") ? " (" + ("Mac" == u ? "Command" : "Ctrl") + "+E)" : ""),
        text: React.createElement("div", null, "Bind it on extensions settings. Also you can save page or image from context menu."),
        closable: !0,
        actions: function (e) {
          var n = "chrome://extensions/configureCommands";
          return -1 != strings.getCurrentBrowser().indexOf("opera") && (n = "chrome://settings/configureCommands"), React.createElement("div", null, React.createElement("a", {
            href: n,
            className: "action-icon",
            onClick: e.handleChromeHotKeys
          }, t.s("settings")))
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : -1 != (window.environment || []).indexOf("clipper") && -1 != strings.getCurrentBrowser().indexOf("chrome") ? !0 : !1
        }
      }, {
        name: "change_view",
        title: "Change collection icon and view",
        text: React.createElement("div", null, "Make collection beautiful — change icon and choose the right view (grid, list, magazine or simple)"),
        closable: !0,
        actions: function (e) {
          return React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon",
            onClick: e.handleIconCollection
          }, t.s("changeIcon")))
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : i.getCurrentId() <= 0 ? !1 : !o.getIsLoading() && o.getCount() >= 3 ? !0 : !1
        }
      }, {
        name: "collaborate",
        title: "Share collection and collaborate",
        text: React.createElement("div", null, "Share URL or invite more members and edit collection together."),
        closable: !0,
        actions: function (e) {
          return React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon",
            onClick: e.handleSharingCollection
          }, t.s("sharing")))
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : i.getCurrentId() <= 0 ? !1 : !o.getIsLoading() && o.getCount() >= 5 ? !0 : !1
        }
      }, {
        name: "nested_collection",
        title: t.s("createSubFolder"),
        text: React.createElement("div", null, "You have many bookmarks. Maybe you need create nested collections?"),
        closable: !0,
        actions: function (e) {
          return React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon",
            id: "tip-handleAddFolder",
            onClick: e.handleAddFolder
          }, t.s("create")))
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : i.getCurrentId() <= 0 ? !1 : !o.getIsLoading() && o.getCount() >= 10 ? !0 : !1
        }
      }, {
        name: "batch_edit",
        title: "Batch edit",
        text: React.createElement("div", null, "Check some bookmarks for actions (You can use Shift or Command/Ctrl key with click for selection)."),
        closable: !0,
        actions: function () {
          return null
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : !o.getIsLoading() && o.getCount() >= 10 ? !0 : !1
        }
      }, {
        name: "create_collection",
        color: "blue",
        title: t.s("createFirstCollection"),
        text: React.createElement("div", null, "Create collection for each of your interest."),
        actions: function (e) {
          return React.createElement("div", null, React.createElement("a", {
            href: "",
            className: "action-icon",
            id: "tip-handleAddFolder",
            onClick: e.handleAddFolder
          }, t.s("create")))
        },
        check: function (e, t) {
          return "collections" != e ? !1 : (t.props.params || {}).collectionsCount ? !1 : !0
        }
      }, {
        name: "trash_empty",
        color: "light",
        title: t.s("trashEmpty"),
        text: null,
        actions: function (e) {
          return null
        },
        check: function (e) {
          return "bookmarks" != e ? !1 : -99 != i.getCurrentId() ? !1 : !o.getIsLoading() && 0 == o.getCount() && o.getIsNoMore() ? !0 : !1
        }
      }]
    };
    n.exports = React.createClass({
      displayName: "Helpers/Tips",
      mixins: [l],
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        return {
          scenario: "",
          force: !1
        }
      },
      onStoresChanged: function () {
        var e = "";
        if (!UserStore.isLoading())
          if (this.props.force) {
            var t = _.findIndex(m, {
              name: this.props.force
            }); - 1 != t && (e = m[t].name)
          } else
            for (var n in m)
              if (m[n].check(this.props.scope, this) && !((UserStore.getUser() || {}).config || {})[d + m[n].name]) {
                e = m[n].name;
                break
              } this.isMounted() && this.setState({
          scenario: e
        })
      },
      componentDidMount: function () {
        this.onStoresChanged(), this.unsubscribeBookmarks = o.listen(this.onStoresChanged), this.unsubscribeCollections = i.listen(this.onStoresChanged), this.unsubscribeChildrens = s.listen(this.onStoresChanged), this.unsubscribeParents = r.listen(this.onStoresChanged), this.unsubscribeUser = UserStore.listen(this.onStoresChanged)
      },
      componentWillUnmount: function () {
        this.unsubscribeBookmarks(), this.unsubscribeCollections(), this.unsubscribeChildrens(), this.unsubscribeParents(), this.unsubscribeUser()
      },
      handleEditCollection: function (e) {
        e.preventDefault(), Pop.show("collection", {
          id: i.getCurrentId()
        })
      },
      handleSharingCollection: function (e) {
        e.preventDefault(), Pop.show("collection", {
          id: i.getCurrentId(),
          step: "sharing"
        })
      },
      handleIconCollection: function (e) {
        e.preventDefault(), Pop.show("collection", {
          id: i.getCurrentId(),
          step: "icon"
        })
      },
      handleAddFolder: function (e) {
        e.preventDefault(), Pop.show("collection", {
          parentId: i.getCurrentId(),
          pin: "tip-handleAddFolder"
        })
      },
      handleAddBookmark: function (e) {
        e.preventDefault(), Pop.show("URL", {
          parentId: i.getCurrentId(),
          pin: "fabAppButton"
        })
      },
      handleCloseTip: function (e) {
        if (e.preventDefault(), e.target) {
          var t = parseInt(e.target.getAttribute("data-index"));
          UserStore.saveConfig({
            notify: !0,
            name: d + m[t].name
          })
        }
      },
      handleSignIn: function (e) {
        e.preventDefault(), c.signIn(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleSignUp: function (e) {
        e.preventDefault(), c.signUp(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleChromeHotKeys: function (e) {
        e.preventDefault(), e.stopPropagation(), -1 == strings.getCurrentBrowser().indexOf("opera") && BrowserBridge.openURL("chrome://extensions/configureCommands")
      },
      render: function () {
        0 == m.length && h();
        var e = null,
          t = _.findIndex(m, {
            name: this.state.scenario
          });
        if (-1 != t && (e = (m || [])[t] || null), null != e) {
          var n = null;
          return e.closable && (n = React.createElement("div", {
            className: "close"
          }, React.createElement("a", {
            href: "",
            "data-index": t,
            onClick: this.handleCloseTip
          }, React.createElement(Icon, {
            name: "clear"
          }), " ", React.createElement("span", {
            className: "close-text"
          }, "OK")))), m[t].showed = m[t].showed || 0, m[t].showed++, React.createElement("div", {
            className: "tips",
            "data-current-tip": e.name
          }, React.createElement("div", {
            className: "tip tip-color-" + (e.color || "light"),
            id: "tip-" + e.name
          }, React.createElement("div", {
            className: "content"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement("img", {
            src: (window.pathPrefix || "") + "images/tips/" + e.name + ".svg",
            alt: ""
          })), React.createElement("div", {
            className: "text"
          }, React.createElement("h3", null, e.title), React.createElement("div", {
            className: "info"
          }, e.text)), React.createElement("div", {
            className: "actions"
          }, e.actions(this)), n)))
        }
        return null
      }
    })
  }, {
    "../../../actions/User": 14,
    "../../../stores/Bookmarks": 113,
    "../../../stores/Childrens": 114,
    "../../../stores/Collections": 115,
    "../../../stores/Parents": 118,
    "../../../stores/Stats": 122,
    "react/addons": "react/addons"
  }],
  52: [function (e, t, n) {
    var a = e("../../stores/ModalFrame"),
      o = e("./Modals/Frame");
    t.exports = React.createClass({
      displayName: "ModalFrame",
      getInitialState: function () {
        return {
          show: !1
        }
      },
      onModalFrameChange: function (e) {
        e.url || (e = {
          show: !1
        }), this.setState(e)
      },
      componentDidMount: function () {
        this.unsubscribeModalFrame = a.listen(this.onModalFrameChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeModalFrame()
      },
      handleFrameClose: function () {
        this.setState({
          show: !1
        })
      },
      render: function () {
        return React.createElement("div", null, React.createElement(Modal, {
          isOpened: this.state.show,
          onClose: this.handleFrameClose,
          params: this.state
        }, React.createElement(o, null)))
      }
    })
  }, {
    "../../stores/ModalFrame": 117,
    "./Modals/Frame": 58
  }],
  53: [function (e, n, a) {
    var o = e("../../../actions/Bookmarks"),
      i = e("../../../actions/Tags"),
      s = e("../../../stores/Tags"),
      r = e("react-select"),
      c = e("../Helpers/SelectMixin");
    n.exports = React.createClass({
      displayName: "Modals/BookmarksAddTags",
      mixins: [c, e("./ModalMixin")],
      getInitialState: function () {
        return {
          tags: [],
          addTags: [],
          loading: !1
        }
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
      componentDidMount: function () {
        this.unsubscribeTags = s.listen(this.onTagsChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeTags()
      },
      handleTagsChange: function (e) {
        var t = e.split(",");
        "" == t[0] && (t = []), this.setState({
          addTags: t
        })
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.state.loading || this.props.closePortal()
      },
      handleSave: function (e) {
        var n = this;
        e.preventDefault(), this.setState({
          loading: !0
        }), o.updateSelectedBookmarks({
          item: {
            tags: this.state.addTags
          },
          silent: !0,
          append: ["tags"]
        }, function (e) {
          e ? Toasts.show({
            text: t.s("saveSuccess")
          }) : Toasts.show({
            text: t.s("error"),
            status: "error"
          }), n.props.closePortal()
        })
      },
      render: function () {
        var e = null;
        return this.state.loading && (e = React.createElement("div", {
          className: "absoluteLoading"
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)))), React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, t.s("addTags")))), React.createElement("article", null, React.createElement("form", {
          onSubmit: this.handleSave,
          style: {
            position: "relative"
          }
        }, React.createElement("div", {
          style: {
            visibility: this.state.loading ? "hidden" : null
          }
        }, React.createElement("div", {
          className: "form-editor"
        }, React.createElement("div", {
          className: "oneline"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "tags"
        })), React.createElement("div", {
          className: "area"
        }, React.createElement("label", null, t.s("tags")), React.createElement(r, {
          name: "tags",
          value: this.state.addTags,
          options: this.state.tags,
          multi: !0,
          placeholder: t.s("addTags") + "...",
          onChange: this.handleTagsChange,
          filterOptions: this.handleSelectFilter
        })))), React.createElement("footer", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("input", {
          type: "submit",
          className: "action-icon active",
          value: t.s("save")
        })))), e)))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../actions/Tags": 12,
    "../../../stores/Tags": 123,
    "../Helpers/SelectMixin": 50,
    "./ModalMixin": 60,
    "react-select": "react-select"
  }],
  54: [function (e, n, a) {
    var o = e("../Forms/CollectionsList"),
      i = e("../Helpers/OverflowScroll"),
      s = e("../../../actions/Bookmarks");
    e("../../../stores/Collections");
    n.exports = React.createClass({
      mixins: [e("./ModalMixin")],
      displayName: "Modals/BookmarksCopy",
      getInitialState: function () {
        return {
          loading: !1
        }
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.state.loading || this.props.closePortal()
      },
      handleChangeCollection: function (e) {
        var n = this;
        this.setState({
          loading: !0
        }), s.copySelectedBookmarks({
          collectionId: e._id
        }, function (e) {
          e ? Toasts.show({
            text: t.s("success")
          }) : Toasts.show({
            text: t.s("error"),
            status: "error"
          }), n.props.closePortal()
        })
      },
      render: function () {
        var e = null,
          n = "noMargin";
        return this.state.loading ? (n += " centered-content", e = React.createElement("div", null, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)))) : e = React.createElement(o, {
          onSelectCollection: this.handleChangeCollection
        }), React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, t.s("selectCollection")))), React.createElement("article", null, React.createElement(i, {
          className: n,
          style: {
            height: "400px"
          }
        }, e)))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../stores/Collections": 115,
    "../Forms/CollectionsList": 36,
    "../Helpers/OverflowScroll": 46,
    "./ModalMixin": 60
  }],
  55: [function (e, n, a) {
    var o = e("../Forms/CollectionsList"),
      i = e("../Helpers/OverflowScroll"),
      s = e("../../../actions/Bookmarks"),
      r = e("../../../stores/Collections");
    n.exports = React.createClass({
      mixins: [e("./ModalMixin")],
      displayName: "Modals/BookmarksMove",
      getInitialState: function () {
        return {
          loading: !1
        }
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.state.loading || this.props.closePortal()
      },
      handleChangeCollection: function (e) {
        var n = this;
        this.setState({
          loading: !0
        }), s.updateSelectedBookmarks({
          item: {
            collectionId: e._id,
            collection: {
              $id: e._id
            }
          },
          showingCollectionId: parseInt(r.getCurrentId()),
          silent: !0
        }, function (e) {
          e ? Toasts.show({
            text: t.s("moveSuccess")
          }) : Toasts.show({
            text: t.s("moveError"),
            status: "error"
          }), n.props.closePortal()
        })
      },
      render: function () {
        var e = null,
          n = "noMargin";
        return this.state.loading ? (n += " centered-content", e = React.createElement("div", null, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)))) : e = React.createElement(o, {
          onSelectCollection: this.handleChangeCollection
        }), React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, t.s("moveSelectedBookmarks")))), React.createElement("article", null, React.createElement(i, {
          className: n,
          style: {
            height: "400px"
          }
        }, e)))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../stores/Collections": 115,
    "../Forms/CollectionsList": 36,
    "../Helpers/OverflowScroll": 46,
    "./ModalMixin": 60
  }],
  56: [function (e, n, a) {
    var o = e("../Helpers/OverflowScroll"),
      i = e("../../../actions/Bookmarks");
    n.exports = React.createClass({
      displayName: "Modals/BookmarksRemove",
      handleClose: function (e) {
        e && e.preventDefault(), this.state.loading || this.props.closePortal()
      },
      componentDidMount: function () {
        var e = this;
        i.removeSelectedBookmarks({
          silent: !0
        }, function (n, a) {
          n ? Toasts.show({
            text: t.s("bookmarksRemoved" + a)
          }) : Toasts.show({
            text: t.s("error"),
            status: "error"
          }), e.props.closePortal()
        })
      },
      render: function () {
        return React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("h3", null, t.s("remove")))), React.createElement("article", null, React.createElement(o, {
          className: "noMargin centered-content",
          style: {
            height: "400px"
          }
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)))))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../Helpers/OverflowScroll": 46
  }],
  57: [function (e, n, a) {
    var o = ["grid", "list", "masonry", "simple"];
    n.exports = React.createClass({
      mixins: [e("./ModalMixin")],
      displayName: "Modals/CollectionView",
      getInitialState: function () {
        return {
          view: this.props.view
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          view: e.view
        })
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.props.closePortal()
      },
      handleChangeView: function (e) {
        e.preventDefault();
        var t = e.target.getAttribute("data-view");
        this.setState({
          view: t
        }), this.props.onChangeView(t), this.props.closePortal()
      },
      handleCover: function () {
        UserStore.saveConfig({
          notify: !0,
          name: "view_cover_disable",
          remove: UserStore.getConfig("view_cover_disable")
        }), this.setState({
          view: this.state.view
        })
      },
      handleInvertPosition: function () {
        UserStore.saveConfig({
          notify: !0,
          name: "view_cover_invert_position",
          remove: UserStore.getConfig("view_cover_invert_position")
        }), this.setState({
          view: this.state.view
        })
      },
      handleRefresh: function () {
        window.location.reload()
      },
      render: function () {
        var e = this,
          n = o.map(function (t, n) {
            return React.createElement("a", {
              href: "",
              key: "style_" + t,
              className: t == e.state.view ? "active" : "",
              "data-view": t,
              onClick: e.handleChangeView
            }, React.createElement("img", {
              src: (window.pathPrefix || "") + "images/views/" + t + ".svg",
              style: {
                width: "80px",
                height: "80px"
              }
            }))
          });
        return React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("div", {
          className: "modal-dialog-wrap"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, t.s("view")))), React.createElement("article", null, React.createElement("div", {
          className: "img-selector"
        }, n))))
      }
    })
  }, {
    "./ModalMixin": 60
  }],
  58: [function (e, t, n) {
    t.exports = React.createClass({
      mixins: [e("./ModalMixin")],
      displayName: "Modals/Frame",
      handleClose: function (e) {
        e && e.preventDefault(), "function" == typeof this.props.onClose && this.props.onClose(), this.props.closePortal()
      },
      render: function () {
        return React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, this.props.title))), React.createElement("iframe", {
          src: this.props.url,
          width: this.props.width,
          height: this.props.height,
          frameBorder: "0"
        }))
      }
    })
  }, {
    "./ModalMixin": 60
  }],
  59: [function (e, t, n) {
    "use strict";

    function a(e, t) {
      for (; e;) {
        if (e === t) return !0;
        e = e.parentNode
      }
      return !1
    }
    var o = function (e) {
        return e && e.__esModule ? e["default"] : e
      },
      i = function () {
        function e(e, t) {
          for (var n in t) {
            var a = t[n];
            a.configurable = !0, a.value && (a.writable = !0)
          }
          Object.defineProperties(e, t)
        }
        return function (t, n, a) {
          return n && e(t.prototype, n), a && e(t, a), t
        }
      }(),
      s = function f(e, t, n) {
        var a = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === a) {
          var o = Object.getPrototypeOf(e);
          return null === o ? void 0 : f(o, t, n)
        }
        if ("value" in a && a.writable) return a.value;
        var i = a.get;
        if (void 0 !== i) return i.call(n)
      },
      r = function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (e.__proto__ = t)
      },
      c = function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      },
      l = e("react"),
      d = o(l),
      m = l.findDOMNode,
      u = o(e("react/lib/shallowEqual")),
      h = o(e("keymaster")),
      p = function (e) {
        function t() {
          c(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.state = {
            active: !1
          }, this.openPortal = this.openPortal.bind(this), this.closePortal = this.closePortal.bind(this), this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this), this.portal = null, this.node = null
        }
        return r(t, e), i(t, {
          componentDidMount: {
            value: function () {
              var e = this;
              this.props.closeOnEsc && h("esc", function () {
                e.closePortal()
              }), this.props.closeOnOutsideClick && document.addEventListener("mousedown", this.handleOutsideMouseClick)
            }
          },
          componentWillMount: {
            value: function () {
              this.props.isOpened && this.openPortal()
            }
          },
          componentWillReceiveProps: {
            value: function (e) {
              if (this.props = e, void 0 === e.isOpened) {
                if (!this.state.active) return;
                this.renderPortal(e)
              } else if (e.isOpened) {
                if (this.state.active && !e.forceUpdated) return;
                this.openPortal()
              } else {
                if (!this.state.active) return;
                this.closePortal()
              }
            }
          },
          componentWillUnmount: {
            value: function () {
              this.props.closeOnEsc && h.unbind("esc"), this.props.closeOnOutsideClick && document.removeEventListener("mousedown", this.handleOutsideMouseClick), this.closePortal()
            }
          },
          shouldComponentUpdate: {
            value: function (e, t) {
              return !u(this.props, e) || !u(this.state, t)
            }
          },
          renderPortal: {
            value: function (e, t) {
              this.node || (this.node = document.createElement("div"), e.pinTo && (e.position = "none"), this.node.className = "overlay overlay-" + (e.position || ""), document.body.appendChild(this.node));
              var n = e.params || {};
              n.closePortal = this.closePortal;
              var a = document.getElementById("modal-anim-style");
              a && document.body.removeChild(a), t = !0, this.portal = d.render(d.cloneElement(e.children, n), this.node, function () {
                if (e.pinTo && -1 == (window.environment || []).indexOf("clipper")) {
                  var n = document.getElementById(e.pinTo),
                    o = n.getBoundingClientRect(),
                    i = document.getElementsByClassName("modal-dialog")[0],
                    s = {
                      w: i.offsetWidth,
                      h: i.offsetHeight
                    },
                    r = {
                      left: o.left || 0,
                      top: o.top || 0
                    };
                  r.left + s.w > window.innerWidth && (r.left = window.innerWidth - s.w - 20), r.left < 0 && (r.left = 20), r.top + s.h > window.innerHeight && (r.top = window.innerHeight - s.h - 20), r.top < 0 && (r.top = 20), i.style.left = r.left + "px", i.style.top = r.top + "px"
                }
                if (!t) {
                  var c = {
                    x: 0,
                    y: 0,
                    w: 430,
                    h: 430,
                    offsetX: 0,
                    offsetY: 0
                  };
                  window.mousePos = window.mousePos || {
                    x: parseInt(window.innerWidth / 2),
                    y: parseInt(window.innerHeight / 2)
                  };
                  try {
                    c.w = document.getElementsByClassName("modal-dialog")[0].offsetWidth, c.h = document.getElementsByClassName("modal-dialog")[0].offsetHeight
                  } catch (l) {}
                  switch (e.position) {
                    case "left-top":
                      mousePos.x += consts.modalMargin, c.x = consts.modalMargin, c.y = consts.modalMargin;
                      break;
                    case "right-top":
                      mousePos.x += consts.modalMargin, c.x = window.innerWidth - c.w, c.y = consts.modalMargin;
                      break;
                    case "right-bottom":
                      mousePos.x += consts.modalMargin, mousePos.y += consts.modalMargin, c.x = window.innerWidth - c.w, c.y = window.innerHeight - c.h;
                      break;
                    default:
                      c.x = parseInt((window.innerWidth - c.w) / 2), c.y = parseInt((window.innerHeight - c.h) / 2)
                  }
                  c.offsetX = mousePos.x - c.x, mousePos.x < c.x ? c.x = 0 : (c.x = parseInt(100 / c.w * (mousePos.x - c.x)), c.offsetX = c.offsetX - c.w), c.offsetY = mousePos.y - c.y, mousePos.y < c.y ? c.y = 0 : (c.y = parseInt(100 / c.h * (mousePos.y - c.y)), c.offsetY = c.offsetY - c.h), c.x = (c.x > 100 ? 100 : c.x) + "%", c.y = (c.y > 100 ? 100 : c.y) + "%", c.start = "clip-path: circle(0px at " + c.x + " " + c.y + "); ", c.start1 = "shape-inside: circle(0px at " + c.x + " " + c.y + "); ", c.start2 = "";
                  var d = "";
                  "" != d && (c.start2 += "transform: " + d), c.end = "clip-path: circle(" + (c.w > c.h ? c.w : c.h) + "px at 50% 50%); ", c.end1 = "shape-inside: circle(" + (c.w > c.h ? c.w : c.h) + "px at 50% 50%); ", a = document.createElement("style"), a.id = "modal-anim-style";
                  var m = ["Show", "Close"],
                    u = ["-webkit-", "-moz-", "-o-"],
                    h = "";
                  m.forEach(function (e) {
                    u.forEach(function (t) {
                      var n = 0,
                        a = 100;
                      "Close" == e && (n = 100, a = 0), h += "/* " + e + " " + t + " */ @" + t + "keyframes modal" + e + " {" + n + "% {" + t + c.start + t + c.start1 + t + c.start2 + "} " + a + "% {" + t + c.end + t + c.end1 + t + c.end2 + "}}  "
                    })
                  }), a.innerText = h, document.body.appendChild(a)
                }
              })
            }
          },
          render: {
            value: function () {
              return this.props.openByClickOn ? d.createElement("div", {
                onClick: this.openPortal,
                className: "openByClickOn"
              }, this.props.openByClickOn) : null
            }
          },
          openPortal: {
            value: function (e) {
              e && (e.preventDefault(), e.stopPropagation());
              var t = this.state.active;
              this.setState({
                active: !0
              }), this.renderPortal(this.props, t);
              try {
                if (document.body.scrollHeight > window.innerHeight) {
                  var n = document.querySelector("#app-background");
                  n && (document.body.style.paddingRight = window.innerWidth - n.offsetWidth + "px")
                }
              } catch (e) {}
              document.body.classList.add("modal-mode")
            }
          },
          closePortal: {
            value: function () {
              var e = this;
              setTimeout(function () {
                e.node && (d.unmountComponentAtNode(e.node), document.body.removeChild(e.node)), e.portal = null, e.node = null, e.setState({
                  active: !1
                }), document.body.classList.remove("modal-now-closing"), "undefined" != typeof e.props.onClose && e.props.onClose()
              }, 190), e.node && (document.body.style.paddingRight = 0, document.body.classList.remove("modal-mode"), document.body.classList.add("modal-now-closing"))
            }
          },
          handleOutsideMouseClick: {
            value: function (e) {
              this.state.active && (a(e.target, m(this.portal)) || (e.stopPropagation(), this.closePortal()))
            }
          }
        }), t
      }(d.Component);
    t.exports = p, p.propTypes = {
      children: d.PropTypes.element.isRequired,
      openByClickOn: d.PropTypes.element,
      closeOnEsc: d.PropTypes.bool,
      closeOnOutsideClick: d.PropTypes.bool,
      isOpened: d.PropTypes.bool
    }
  }, {
    keymaster: "keymaster",
    react: "react",
    "react/lib/shallowEqual": "react/lib/shallowEqual"
  }],
  60: [function (e, t, n) {
    t.exports = {
      iconCloseBack: function () {
        return -1 != (window.environment || []).indexOf("clipper") ? "back" : "clear"
      }
    }
  }, {}],
  61: [function (e, n, a) {
    var o = e("../../../stores/Tags");
    n.exports = React.createClass({
      mixins: [e("./ModalMixin")],
      displayName: "Modals/GroupEdit",
      getInitialState: function () {
        return {
          index: this.props.index,
          title: o.getTags()[this.props.index]._id
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          index: e.index
        })
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.props.closePortal()
      },
      handleTitleChange: function (e) {
        this.setState({
          title: e
        })
      },
      handleRemove: function (e) {
        e && e.preventDefault(), o.onRemove({
          _id: o.getTags()[this.props.index]._id
        }), this.props.closePortal()
      },
      handleSave: function (e) {
        e && e.preventDefault(), o.onUpdate({
          _id: o.getTags()[this.props.index]._id,
          replace: this.state.title
        }), this.props.closePortal()
      },
      render: function () {
        return React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: this.iconCloseBack()
        }))), React.createElement("h3", null, t.s("tags")))), React.createElement("article", null, React.createElement("form", {
          onSubmit: this.handleSave
        }, React.createElement("div", {
          className: "form-editor"
        }, React.createElement("div", {
          className: "oneline"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "tag"
        })), React.createElement("div", {
          className: "area"
        }, React.createElement("label", null, t.s("name")), React.createElement("input", {
          type: "text",
          className: "important",
          required: !0,
          autoFocus: !0,
          valueLink: {
            value: this.state.title,
            requestChange: this.handleTitleChange
          },
          ref: "title"
        })))), React.createElement("footer", null, React.createElement("div", {
          className: "actions left"
        }, React.createElement("a", {
          href: "",
          className: "action-icon active",
          onClick: this.handleRemove
        }, t.s("remove"))), React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon active",
          onClick: this.handleClose
        }, t.s("cancel")), React.createElement("input", {
          type: "submit",
          className: "action-icon active",
          value: t.s("save")
        }))))))
      }
    })
  }, {
    "../../../stores/Tags": 123,
    "./ModalMixin": 60
  }],
  62: [function (e, n, a) {
    var o = e("../../../newtab/images/logo-text.svg"),
      i = e("../../../actions/Bookmark"),
      s = e("../../../stores/Bookmark"),
      r = (e("../../../actions/Bookmarks"), e("../../../stores/Bookmarks")),
      c = e("../Bookmarks/Item"),
      l = e("../Popovers/Font"),
      d = e("../Helpers/Favicon"),
      m = e("../Helpers/ScrollFixMixin.js");
    n.exports = React.createClass({
      mixins: [m],
      displayName: "Modals/Viewer",
      _getBookmark: function (e) {
        var t = r.getBookmark(e);
        return null == t && (t = {}), t._id = t._id || e, t.navigation = r._bookmarkNavigation(e), t.navigation.next || this.props.loadMore(), t
      },
      getInitialState: function () {
        var e = 0,
          t = "",
          n = "";
        try {
          e = UserStore.getUser().config.font_size || 0
        } catch (a) {}
        try {
          t = UserStore.getUser().config.font_color || ""
        } catch (a) {}
        try {
          n = UserStore.getUser().config.font_family || ""
        } catch (a) {}
        return {
          item: this._getBookmark(this.props.id),
          fontSize: e,
          fontColor: t,
          fontFamily: n,
          fontPopover: !1
        }
      },
      handleClose: function (e) {
        e && e.preventDefault(), this.props.closePortal()
      },
      handleFont: function (e) {
        e && e.preventDefault(), this.setState({
          fontPopover: !0
        })
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          item: this._getBookmark(e.id)
        }), i.load(e.id)
      },
      onBookmarkChange: function (e) {
        e._id == this.state.item._id && (e.navigation = r._bookmarkNavigation(e._id), this.setState({
          item: e
        }))
      },
      onBookmarksChange: function () {
        this.state.item.navigation = r._bookmarkNavigation(this.state.item._id), this.setState({
          item: this.state.item
        })
      },
      componentWillMount: function () {
        i.load(this.props.id)
      },
      componentDidMount: function () {
        this.unsubscribeBookmark = s.listen(this.onBookmarkChange), this.unsubscribeBookmarks = s.listen(this.onBookmarksChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeBookmark(), this.unsubscribeBookmarks()
      },
      componentDidUpdate: function () {},
      handleFontClose: function () {
        this.setState({
          fontPopover: !1
        })
      },
      handleIncrementFont: function (e) {
        e.preventDefault(), this.state.fontSize < 9 && (UserStore.onUpdateConfig({
          font_size: this.state.fontSize + 1
        }), this.setState({
          fontSize: this.state.fontSize + 1
        }))
      },
      handleDicrementFont: function (e) {
        e.preventDefault(), this.state.fontSize > 0 && (UserStore.onUpdateConfig({
          font_size: this.state.fontSize - 1
        }), this.setState({
          fontSize: this.state.fontSize - 1
        }))
      },
      handleFontColor: function (e) {
        UserStore.onUpdateConfig({
          font_color: e
        }), this.setState({
          fontColor: e
        })
      },
      handleFontFamily: function (e) {
        UserStore.onUpdateConfig({
          font_family: e
        }), this.setState({
          fontFamily: e
        })
      },
      handleBookmarkEdit: function (e) {
        e.preventDefault(), Pop.show("bookmark", {
          id: this.state.item._id,
          pin: "bookmark-viewer-edit-" + this.state.item._id,
          force: "vertical"
        })
      },
      render: function () {
        var e = null,
          n = null;
        this.state.item.navigation.prev && (e = React.createElement("a", {
          href: "#" + this.props.router.getCurrentPathname() + "?viewer=" + this.state.item.navigation.prev,
          className: "nav-left action-icon"
        }, React.createElement(Icon, {
          name: "left"
        }))), this.state.item.navigation.next && (n = React.createElement("a", {
          href: "#" + this.props.router.getCurrentPathname() + "?viewer=" + this.state.item.navigation.next,
          className: "nav-right action-icon"
        }, React.createElement(Icon, {
          name: "right"
        })));
        var a = null;
        a = "link" == this.state.item.type ? React.createElement("div", {
          style: {
            paddingTop: "10px"
          }
        }, React.createElement("div", {
          className: "bookmarks"
        }, React.createElement(c, {
          item: this.state.item,
          view: "list"
        }))) : React.createElement("div", {
          className: "text-viewer-raindrop"
        }, React.createElement("article", {
          dangerouslySetInnerHTML: {
            __html: this.state.item.html || ""
          }
        }), React.createElement("br", null), React.createElement("a", {
          href: this.state.item.link,
          target: network.linkTarget(),
          className: "read-more"
        }, t.s("viewOn"), " ", strings.beautifulDomain(this.state.item.domain)));
        var i = this.state.fontSize;
        return -1 != (window.environment || []).indexOf("clipper") && (i = 0), React.createElement("div", {
          className: "modal-dialog modal-fullsize vfontcolor-" + this.state.fontColor
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon viewer-raindrop-logo",
          onClick: this.handleClose
        }, React.createElement("span", {
          className: "logo-text",
          dangerouslySetInnerHTML: {
            __html: o
          }
        })), e, n), React.createElement("h3", {
          className: "center"
        }, " "), React.createElement("div", {
          className: "actions right"
        }, React.createElement("a", {
          href: this.state.item.link,
          target: "_blank",
          className: "action-icon"
        }, React.createElement(Icon, {
          name: "open-link",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleFont,
          id: "font-select-link"
        }, React.createElement(Icon, {
          name: "font",
          size: "mac"
        }), " ", React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleBookmarkEdit,
          id: "bookmark-viewer-edit-" + this.state.item._id
        }, React.createElement(Icon, {
          name: "edit",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: "clear",
          size: "mac"
        }))))), React.createElement("div", {
          className: "navi"
        }, e, n), React.createElement("section", {
          id: "main-viewer-frame-raindrop",
          onWheel: this.handleScroll,
          ref: "div",
          className: "typography-viewer-raindrop typography-viewer-raindrop-type" + this.state.item.type + " vfontsize-" + i + " vfontfamily-" + this.state.fontFamily
        }, React.createElement("div", null, React.createElement("h1", null, this.state.item.title), React.createElement("div", {
          className: "domain"
        }, React.createElement("div", {
          className: "favicon"
        }, React.createElement(d, {
          domain: this.state.item.domain
        })), React.createElement("div", {
          className: "title"
        }, strings.beautifulDomain(this.state.item.domain), React.createElement("div", {
          className: "subinfo"
        }, moment(this.state.item.lastUpdate).format("ll"))), React.createElement("a", {
          href: this.state.item.link,
          target: network.linkTarget()
        })), a, React.createElement("br", null))), React.createElement(l, {
          onClose: this.handleFontClose,
          show: this.state.fontPopover,
          attachId: "font-select-link",
          fontColor: this.state.fontColor,
          fontFamily: this.state.fontFamily,
          handleIncrementFont: this.handleIncrementFont,
          handleDicrementFont: this.handleDicrementFont,
          handleFontColor: this.handleFontColor,
          handleFontFamily: this.handleFontFamily
        }))
      }
    })
  }, {
    "../../../actions/Bookmark": 1,
    "../../../actions/Bookmarks": 2,
    "../../../newtab/images/logo-text.svg": 110,
    "../../../stores/Bookmark": 112,
    "../../../stores/Bookmarks": 113,
    "../Bookmarks/Item": 18,
    "../Helpers/Favicon": 42,
    "../Helpers/ScrollFixMixin.js": 48,
    "../Popovers/Font": 77
  }],
  63: [function (e, n, a) {
    var o = e("../../../stores/Collections"),
      i = (e("../Helpers/Favicon.js"), e("../Helpers/Cover.js")),
      s = e("../../../actions/Tags"),
      r = e("../../../stores/Tags"),
      c = e("react-select"),
      l = e("../Helpers/SelectMixin"),
      d = e("react-textarea-autosize"),
      m = e("../../../actions/Parents"),
      u = e("../../../actions/Bookmarks"),
      h = e("../../../stores/Bookmarks"),
      p = e("../Forms/CollectionsList"),
      f = e("./Bookmark/Icon.js");
    _collectionIdChanged = !1, n.exports = React.createClass({
      displayName: "Pop/Form/Bookmark",
      mixins: [l],
      getInitialState: function () {
        return {
          step: "form",
          tags: [],
          item: h.getBookmark(this.props.id) || {},
          loading: !1
        }
      },
      componentWillReceiveProps: function (e) {
        var t = h.getBookmark(e.id);
        this._testItem(t, e.id), this.isMounted() && this.setState({
          item: t
        })
      },
      onCollectionsChange: function () {
        this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      onTagsChange: function (e) {
        var t = e.map(function (e) {
          return {
            value: e._id,
            label: e._id
          }
        });
        this.isMounted() && this.setState({
          tags: t
        })
      },
      componentWillMount: function () {
        s.load()
      },
      componentDidMount: function () {
        this._testItem(this.state.item, this.props.id), this.focusMainInput(), this.unsubscribeCollections = o.listen(this.onCollectionsChange), this.unsubscribeTags = r.listen(this.onTagsChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections(), this.unsubscribeTags()
      },
      _testItem: function (e, t) {
        var n = this;
        0 == Object.keys(e).length && u.loadBookmark({
          _id: t
        }, function (e) {
          if (n.isMounted()) {
            try {
              e.cover = e.media[e.coverId].link
            } catch (t) {}
            n.setState({
              item: e
            })
          }
        })
      },
      focusMainInput: function () {
        var e = this;
        setTimeout(function () {
          var t = React.findDOMNode(e.refs.title);
          t && (t.focus(), t.setSelectionRange(t.value.length, t.value.length))
        }, 300)
      },
      handleOpenCollectionsList: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          step: "collection"
        })
      },
      handleOpenIcons: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          step: "icons"
        })
      },
      handleChangeCollection: function (e) {
        _collectionIdChanged = this.state.item.collectionId != e._id, this.state.item.collectionId = e._id, this.isMounted() && this.setState({
          item: this.state.item,
          step: "form"
        }), this.focusMainInput()
      },
      handleTypeChange: function (e) {
        this.state.item.type = e.target.value, this.isMounted() && this.setState({
          item: this.state.item,
          step: "form"
        })
      },
      handleTitleChange: function (e) {
        this.state.item.title = e.target.value, this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      handleTitleReset: function (e) {
        e.preventDefault(), React.findDOMNode(this.refs.title).value = "", this.state.item.title = "", this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      handleExcerptChange: function (e) {
        this.state.item.excerpt = e.target.value, this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      handleLinkChange: function (e) {
        this.state.item.link = e.target.value, this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      handleExcerptReset: function (e) {
        e.preventDefault(), React.findDOMNode(this.refs.excerpt).value = "", this.state.item.excerpt = "", this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      handleTagsChange: function (e) {
        this.state.item.tags = e.split(","), "" == this.state.item.tags[0] && (this.state.item.tags = []), this.isMounted() && this.setState({
          item: this.state.item
        })
      },
      goToForm: function (e) {
        e && e.preventDefault(), this.isMounted() && this.setState({
          step: "form"
        }), this.focusMainInput()
      },
      handleSave: function (e) {
        e.preventDefault();
        var t = this;
        this.isMounted() && this.setState({
          loading: !0
        }), u.updateBookmark({
          item: {
            _id: this.state.item._id,
            title: this.state.item.title,
            excerpt: this.state.item.excerpt,
            tags: this.state.item.tags,
            collectionId: this.state.item.collectionId,
            type: this.state.item.type,
            media: this.state.item.media,
            cover: this.state.item.coverId,
            coverId: this.state.item.coverId
          },
          silent: this.props.silent
        }, function (e) {
          e ? t.handleSaveSuccess(_collectionIdChanged ? t.state.item.collectionId : void 0) : t.isMounted() && t.setState({
            loading: !1
          })
        })
      },
      handleRemoveBookmark: function (e) {
        e.preventDefault();
        var t = this;
        u.removeBookmark({
          item: this.state.item,
          silent: this.props.silent
        }, function (e) {
          e && t.handleClose()
        })
      },
      handleSaveSuccess: function (e) {
        m.reset(), this.handleClose(), "undefined" == typeof e || this.props.silent || (window.location.hash = "#/collection/" + e)
      },
      setMedia: function (e, t) {
        e && (this.state.item.media = e), this.state.item.coverId = t, this.state.item.cover = this.state.item.media[this.state.item.coverId].link, this.isMounted() && this.setState({
          step: "form",
          item: this.state.item
        })
      },
      handleClose: function (e) {
        e && e.preventDefault(), "function" == typeof this.props.onClose ? this.props.onClose() : Pop.close()
      },
      componentDidUpdate: function () {
        "function" == typeof this.props.onUpdate && this.props.onUpdate()
      },
      render: function () {
        var e = this;
        if ("collection" == this.state.step) return React.createElement("div", {
          className: "pop-content"
        }, React.createElement("div", {
          className: "pop-sticky-header"
        }, React.createElement("div", {
          className: "sticky-header"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "but default onlyicons",
          onClick: this.goToForm
        }, React.createElement(Icon, {
          name: "back",
          size: "mac"
        }))), React.createElement("div", {
          className: "max title center"
        }, t.s("selectCollection")), React.createElement("div", {
          className: "actions"
        }))), React.createElement(p, {
          activeCollection: this.state.item.collectionId,
          onSelectCollection: this.handleChangeCollection,
          onCancel: this.goToForm
        })));
        if ("icons" == this.state.step) return React.createElement(f, {
          bookmark: this.state.item,
          goToForm: this.goToForm,
          onUpdate: this.props.onUpdate,
          setMedia: this.setMedia
        });
        var n = o.getCollection(this.state.item.collectionId);
        null == n && (o.onLoadId(this.state.item.collectionId), n = {
          title: ""
        });
        var a = consts.defaultCollectionIcon();
        try {
          a = network.fixURL(n.cover[0])
        } catch (s) {}
        var r = -2 == (this.state.item || {}).collectionId,
          l = null;
        try {
          l = this.state.item.media.map(function (t, n) {
            return 7 > n ? React.createElement("span", {
              className: e.state.item.coverId == n ? "active" : null
            }) : void 0
          }), l.length <= 1 && (l = null)
        } catch (s) {}
        var m = 0 == Object.keys(this.state.item).length || this.state.loading,
          u = {
            save: t.s("save"),
            cancel: t.s("cancel")
          };
        return React.createElement("div", null, React.createElement("div", {
          className: (this.props.isSubContent ? "pop-sub-content" : "pop-content") + " " + (m ? "invisible" : null)
        }, React.createElement("form", {
          onSubmit: this.handleSave
        }, React.createElement("header", null, React.createElement("div", {
          className: "max title",
          style: {
            marginRight: 0
          }
        }, React.createElement(d, {
          required: !0,
          value: this.state.item.title,
          onChange: this.handleTitleChange,
          ref: "title",
          placeholder: t.s("enterTitle"),
          rows: "1"
        }), React.createElement(d, {
          className: "small" + (r ? " hidden" : ""),
          value: this.state.item.excerpt,
          onChange: this.handleExcerptChange,
          ref: "excerpt",
          placeholder: t.s("enterDescription"),
          rows: "1"
        })), React.createElement("div", {
          className: "cover",
          onClick: this.handleOpenIcons
        }, React.createElement(i, {
          src: this.state.item.cover,
          link: this.state.item.link,
          domain: this.state.item.domain,
          className: "cover-img"
        }), React.createElement("div", {
          className: "dots"
        }, l))), React.createElement("div", {
          className: "entries"
        }, React.createElement("div", {
          className: "row"
        }, React.createElement("div", {
          className: "title"
        }, t.s("collection")), React.createElement("div", {
          className: "content"
        }, React.createElement("a", {
          href: "",
          className: "block-link",
          onClick: this.handleOpenCollectionsList
        }, React.createElement("img", {
          className: "small-icon",
          src: a,
          alt: ""
        }), n.title))), React.createElement("div", {
          className: "row " + (r ? " hidden" : "")
        }, React.createElement("div", {
          className: "title"
        }, t.s("tags")), React.createElement("div", {
          className: "content max"
        }, React.createElement(c, {
          name: "tags",
          value: this.state.item.tags,
          options: this.state.tags,
          multi: !0,
          placeholder: t.s("addTags") + "...",
          onChange: this.handleTagsChange,
          onFocus: this.handleSelectFocus,
          onBlur: this.handleSelectBlur,
          filterOptions: this.handleSelectFilter
        }))), React.createElement("div", {
          className: "row"
        }, React.createElement("div", {
          className: "title"
        }, "URL"), React.createElement("div", {
          className: "content"
        }, React.createElement(d, {
          className: "small",
          value: this.state.item.link,
          readOnly: "true",
          ref: "link",
          placeholder: t.s("enterLink"),
          rows: "1"
        })))), React.createElement("footer", null, React.createElement("input", {
          type: "submit",
          className: "but accent pull-right",
          value: u.save
        }), React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, u.cancel), React.createElement("a", {
          href: "",
          className: "but ",
          onClick: this.handleRemoveBookmark
        }, t.s("remove")), React.createElement("label", {
          className: "but select onlyicons " + (r ? " hidden" : ""),
          title: t.s(this.state.item.type),
          style: {
            marginRight: 0
          }
        }, React.createElement(Icon, {
          name: this.state.item.type,
          size: "link" == this.state.item.type ? "mac" : null
        }), React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }), React.createElement("select", {
          value: this.state.item.type,
          onChange: this.handleTypeChange
        }, React.createElement("option", {
          value: "link"
        }, t.s("link")), React.createElement("option", {
          value: "article"
        }, t.s("article")), React.createElement("option", {
          value: "image"
        }, t.s("image")), React.createElement("option", {
          value: "video"
        }, t.s("video"))))))), React.createElement("div", {
          className: "pop-loader " + (m ? null : "hidden")
        }))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../actions/Parents": 7,
    "../../../actions/Tags": 12,
    "../../../stores/Bookmarks": 113,
    "../../../stores/Collections": 115,
    "../../../stores/Tags": 123,
    "../Forms/CollectionsList": 36,
    "../Helpers/Cover.js": 40,
    "../Helpers/Favicon.js": 42,
    "../Helpers/SelectMixin": 50,
    "./Bookmark/Icon.js": 64,
    "react-select": "react-select",
    "react-textarea-autosize": "react-textarea-autosize"
  }],
  64: [function (e, n, a) {
    var o = e("../../Helpers/CoverSelector"),
      i = e("validator"),
      s = e("../../Search/Mini"),
      r = e("../../../../modules/Iconfinder");
    n.exports = React.createClass({
      displayName: "Bookmark/Icon",
      getInitialState: function () {
        return {
          bookmark: this.props.bookmark,
          search: "",
          icons: [],
          loading: !1,
          haveMore: !0
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          bookmark: e.bookmark
        })
      },
      handleChangeIcon: function (e, t) {
        var n = {
          _id: this.state.bookmark._id,
          cover: e,
          coverId: e,
          coverEnabled: !0
        };
        t ? n.media = t : "" != this.state.search ? (n.media = this.state.bookmark.media || [], n.media.push({
          link: this.state.icons[e],
          type: "image"
        }), n.cover = n.media.length - 1, n.coverId = n.cover) : -2 == this.state.bookmark.collectionId && "undefined" == typeof this.state.bookmark.media[e] && (n.media = this.state.bookmark.media || [], n.media.push({
          link: network.favIcon(this.state.bookmark.domain),
          type: "image"
        }), n.cover = n.media.length - 1, n.coverId = n.cover), this.props.setMedia(n.media, n.coverId)
      },
      handleScreenshot: function (e) {
        var t = this;
        e.preventDefault();
        var n = function (e) {
            var n = JSON.parse(JSON.stringify(t.state.bookmark)),
              a = -1;
            n.media = n.media || [];
            for (var o in n.media)
              if (n.media[o].screenshot) {
                a = o;
                break
              } - 1 == a ? (n.media.push(e), n.coverId = n.media.length - 1) : (n.media[a] = e, n.coverId = a), n.coverEnabled = !0, t.setState({
              bookmark: n
            }), t.handleChangeIcon(n.coverId, n.media)
          },
          a = function () {
            n({
              link: consts.screenshotService + encodeURIComponent(t.state.bookmark.link),
              type: "image",
              screenshot: !0
            })
          };
        "undefined" != typeof BrowserBridge ? BrowserBridge.currentURL(function (e) {
          t.state.bookmark.link == e ? BrowserBridge.capturePage(function (e) {
            e ? n({
              link: e,
              type: "image",
              screenshot: !0,
              dataURI: !0
            }) : a()
          }) : a()
        }) : a()
      },
      handleSearch: function (e) {
        this.setState({
          search: e,
          loading: !0
        });
        var t = this;
        r.search(e, 0, function (e) {
          t.setState({
            icons: e,
            loading: !1,
            haveMore: !0
          })
        })
      },
      handleNextSearchPage: function (e) {
        e.preventDefault();
        var t = this;
        this.setState({
          haveMore: !1
        }), r.search(this.state.search, 1, function (e) {
          t.setState({
            icons: t.state.icons.concat(e),
            loading: !1
          })
        })
      },
      handleURL: function (e) {
        e.preventDefault();
        var n = prompt(t.s("enterLink"));
        if (i.isURL(n)) {
          this.state.bookmark.media = this.state.bookmark.media || [], this.state.bookmark.media.push({
            link: n,
            type: "image"
          }), this.setState({
            bookmark: this.state.bookmark
          });
          var a = this;
          setTimeout(function () {
            a.handleChangeIcon(a.state.bookmark.media.length - 1, a.state.bookmark.media)
          }, 200)
        } else Toasts.show({
          text: t.s("serverincorrect url"),
          status: "error"
        })
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        var e = null,
          n = null,
          a = [];
        "" == this.state.search ? (a = (this.state.bookmark.media || []).map(function (e, t) {
          return network.fixURL(e.link)
        }), -2 == this.state.bookmark.collectionId && a.push(network.favIcon(this.state.bookmark.domain))) : (a = (this.state.icons || []).map(function (e, t) {
          return network.fixURL(e)
        }), this.state.haveMore && (n = React.createElement("div", {
          className: "btn btn-card show-more-button show-more-button-visible"
        }, t.s("more"), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleNextSearchPage
        }))));
        var i = [React.createElement("div", {
            className: "action-item action-item-gray"
          }, React.createElement("a", {
            href: "",
            onClick: this.handleURL
          }, React.createElement(Icon, {
            name: "add"
          }), React.createElement("span", null, "URL")))],
          r = !1;
        try {
          r = -1 != _.findIndex(this.state.bookmark.media || [], {
            screenshot: !0
          })
        } catch (c) {}
        if (r || i.unshift(React.createElement("div", {
            className: "action-item"
          }, React.createElement("a", {
            href: "",
            onClick: this.handleScreenshot
          }, React.createElement(Icon, {
            name: "web"
          }), React.createElement("span", null, t.s("clickToMakeScreenshot"))))), this.state.loading) e = React.createElement("div", {
          className: "centered-content"
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null))), n = null;
        else {
          var l = "" == this.state.search ? this.state.bookmark.coverId : -1;
          void 0 == typeof (this.state.bookmark.media || [])[this.state.bookmark.coverId] && (l = -1), e = React.createElement(o, {
            items: a,
            selected: l,
            onSelect: this.handleChangeIcon
          }, i)
        }
        return React.createElement("div", {
          className: "pop-content"
        }, React.createElement("div", {
          className: "pop-sticky-header"
        }, React.createElement("div", {
          className: "sticky-header"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "but default onlyicons",
          onClick: this.props.goToForm
        }, React.createElement(Icon, {
          name: "back",
          size: "mac"
        }))), React.createElement("div", {
          className: "max title center"
        }, React.createElement(s, {
          onChange: this.handleSearch
        })), React.createElement("div", {
          className: "actions"
        }))), e, n))
      }
    })
  }, {
    "../../../../modules/Iconfinder": 101,
    "../../Helpers/CoverSelector": 41,
    "../../Search/Mini": 81,
    validator: "validator"
  }],
  65: [function (e, n, a) {
    var o = e("../../../actions/Bookmarks"),
      i = e("../../../actions/Collections"),
      s = e("../../../stores/Collections"),
      r = e("../Forms/CollectionsList"),
      c = e("../../../actions/Parents"),
      l = e("../Bookmarks/Upgrade"),
      d = e("./Collection/Icon"),
      m = e("./Collection/Sharing"),
      u = (e("react-textarea-autosize"), {}),
      h = function () {
        u = {
          _id: 0,
          title: t.s("collectionNew"),
          view: "list",
          group: 0,
          empty: !0,
          blank: !0
        }
      };
    document ? window.languageLoaded ? h() : window.addEventListener("langLoaded", h) : h(), n.exports = React.createClass({
      displayName: "Pop/Collection",
      updateCover: !1,
      getInitialState: function () {
        var e, n = !1;
        if (u.group = this.props.group || 0, this.props.id || this.props.forceEdit) {
          var e = {
            _id: parseInt(this.props.id || 0),
            empty: !0
          };
          collection = s.getCollection(this.props.id), null == collection ? s.onLoadId(this.props.id) : e = JSON.parse(JSON.stringify(collection))
        }
        var a = (e || {}).empty;
        return e || (a = !1), e = e || JSON.parse(JSON.stringify(u)), e.blank && (this.props.parentId || 0) > 0 && (e.title = t.s("nestedCollections").split(" ")[0] + " " + t.s("collection").toLowerCase(), UserStore.isPro() || (n = !0)), {
          step: this.props.step ? this.props.step : "form",
          loading: a,
          item: e,
          collaboratorsText: "",
          disableNested: n
        }
      },
      onCollectionsChange: function () {
        var e = null;
        this.state.item.empty && this.state.item._id && (collection = s.getCollection(this.state.item._id), null != collection && (e = JSON.parse(JSON.stringify(collection)))), null != e && this.setState({
          item: e,
          loading: !1
        }), this.setState({
          step: this.state.step
        })
      },
      componentDidMount: function () {
        var e = this;
        this.focusMainInput(), this.unsubscribeCollections = s.listen(this.onCollectionsChange), (this.props.parentId || 0) > 0 && this.handleChangeCollection({
          _id: this.props.parentId
        }), this.state.item._id && Api.get("collection/" + this.state.item._id + "/collaborators", function (n) {
          if (n.items) {
            var a = 0,
              o = 0;
            for (var i in n.items) "member" == n.items[i].role ? a++ : "owner" == n.items[i].role && e.state.item["public"] ? a++ : "viewer" == n.items[i].role && o++;
            var s = "";
            (a || o) && (s = t.s("und") + " " + parseInt(a + o) + " " + t.s("members").toLowerCase()), o && (s += " (" + o + " " + t.s("role_viewer").toLowerCase() + ")"), s && e.setState({
              collaboratorsText: s
            })
          }
        })
      },
      componentWillUnmount: function () {
        this.unsubscribeCollections()
      },
      focusMainInput: function () {
        var e = this;
        setTimeout(function () {
          var t = React.findDOMNode(e.refs.title);
          t && (t.focus(), 0 == e.state.item._id ? t.setSelectionRange(0, t.value.length) : t.setSelectionRange(t.value.length, t.value.length))
        }, 0)
      },
      handleTitleChange: function (e) {
        this.state.item.title = e, this.setState({
          item: this.state.item
        })
      },
      handleExcerptChange: function (e) {
        this.state.item.excerpt = e.target.value, this.setState({
          item: this.state.item
        })
      },
      handleOpenCollectionsList: function (e) {
        e.preventDefault(), this.setState({
          step: "parent"
        })
      },
      handleOpenIcons: function (e) {
        e.preventDefault(), (this.state.item.author && this.state.item._id >= 0 || this.state.item.blank) && this.setState({
          step: "icons"
        })
      },
      handleOpenSharing: function (e) {
        e.preventDefault(), this.setState({
          step: "sharing"
        })
      },
      handleChangeCollection: function (e) {
        UserStore.isPro() && (this.state.item.parentId = e._id, delete this.state.item.group), this.setState({
          item: this.state.item,
          step: "form"
        }), this.focusMainInput()
      },
      handleChangeGroup: function (e, t) {
        this.state.item.group = t, delete this.state.item.parentId, this.setState({
          item: this.state.item,
          step: "form"
        }), this.focusMainInput()
      },
      goToForm: function (e) {
        e.preventDefault(), this.setState({
          step: "form"
        }), this.focusMainInput()
      },
      handleCollectionSave: function (e) {
        c.reset(), (0 == this.state.item._id || e == s.getCurrentId()) && (window.location.hash = "#/collection/" + e + "?d=" + (new Date).getTime()), Pop.close()
      },
      handleSave: function (e) {
        e.preventDefault();
        var t = this;
        if (0 == this.state.item._id) i.insertCollection({
          item: this.state.item
        }, function (e) {
          e > 0 ? t.handleCollectionSave(e) : t.setState({
            loading: !1
          })
        });
        else {
          var n = {
            _id: this.state.item._id,
            title: this.state.item.title,
            excerpt: this.state.item.excerpt,
            parentId: this.state.item.parentId,
            group: this.state.item.group,
            view: this.state.item.view
          };
          this.updateCover && (n.cover = this.state.item.cover, n.cover_path = this.state.item.cover_path), i.updateCollection({
            item: n
          }, function (e) {
            e > 0 ? t.handleCollectionSave(e) : t.setState({
              loading: !1
            })
          })
        }
        this.setState({
          loading: !0
        })
      },
      handleRemoveCollection: function (e) {
        e.preventDefault();
        var t = this.state.item._id;
        i.removeCollection({
          item: this.state.item
        }, function (e) {
          e && (s.getCurrentId() == t && (window.location.hash = "#/?reset=true&d=" + (new Date).getTime()), Pop.close())
        })
      },
      setCover: function (e, t) {
        this.updateCover = !0, this.state.item.cover = [e], this.state.item.cover_path = t, this.setState({
          item: this.state.item,
          step: "form"
        })
      },
      handleChangeView: function (e) {
        e.preventDefault(), this.state.item.view = e.target.getAttribute("data-view"), this.setState({
          item: this.state.item
        }), s.getCurrentId() == this.state.item._id && o.clearSelect(), i.updateCollection({
          item: {
            _id: this.state.item._id,
            view: this.state.item.view
          },
          silent: !0
        })
      },
      handleClose: function (e) {
        e.preventDefault(), Pop.close()
      },
      handleRSS: function (e) {
        var t = consts.host + "/collection/" + this.state.item._id + "/feed";
        "private" == e.target.value && (t = consts.host + "/feed/" + this.state.item.uniqKey), window.open(t)
      },
      handleSubFolder: function (e) {
        e.preventDefault(), Pop.close(), Pop.show("collection", {
          parentId: this.state.item._id,
          pin: this.props.pin,
          force: this.props.force
        })
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        if (this.state.disableNested) return React.createElement("div", {
          className: this.props.isSubContent ? "pop-sub-content" : "pop-content"
        }, React.createElement(l, {
          view: "list",
          force: "true",
          title: t.s("createSubFolder"),
          excerpt: t.s("onlyInPro") + ". " + t.s("footerProAd") + " " + t.s("footerProAdD")
        }), React.createElement("footer", null, React.createElement("a", {
          href: consts.proPage,
          target: "_blank",
          className: "but accent pull-right"
        }, t.s("goToPRO")), React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, t.s("cancel")), u));
        var e = this.state.loading;
        if (!e) {
          if ("parent" == this.state.step) return React.createElement("div", {
            className: "pop-content"
          }, React.createElement("div", {
            className: "pop-sticky-header"
          }, React.createElement("div", {
            className: "sticky-header"
          }, React.createElement("header", null, React.createElement("div", {
            className: "actions"
          }, React.createElement("a", {
            href: "",
            className: "but default onlyicons",
            onClick: this.goToForm
          }, React.createElement(Icon, {
            name: "back",
            size: "mac"
          }))), React.createElement("div", {
            className: "max title center"
          }, t.s("parent")), React.createElement("div", {
            className: "actions"
          }))), React.createElement(r, {
            skipCollection: this.state.item._id,
            activeCollection: this.state.item.parentId,
            activeGroup: this.state.item.group,
            onSelectCollection: this.handleChangeCollection,
            onSelectGroup: this.handleChangeGroup,
            onCancel: this.goToForm
          })));
          if ("icons" == this.state.step) return React.createElement(d, {
            collection: this.state.item,
            goToForm: this.goToForm,
            onUpdate: this.props.onUpdate,
            setCover: this.setCover
          });
          if ("sharing" == this.state.step) return React.createElement(m, {
            collection: this.state.item,
            goToForm: this.goToForm,
            onUpdate: this.props.onUpdate
          })
        }
        var n = null,
          a = "",
          o = null;
        if ("number" == typeof this.state.item.parentId)
          if (n = s.getCollection(this.state.item.parentId), a = t.s("collection"), null == n) s.onLoadId(this.state.item.parentId);
          else {
            o = "https://raindrop.io/other/popup/img/icon-folder.png";
            try {
              o = network.fixURL(n.cover[0])
            } catch (i) {}
            o = React.createElement("img", {
              src: o,
              alt: "",
              className: "small-icon"
            })
          }
        else if ("number" == typeof this.state.item.group) {
          try {
            n = {
              isGroup: !0,
              title: UserStore.getUser().groups[this.state.item.group].title
            }
          } catch (i) {}
          a = t.s("group"), o = React.createElement(Icon, {
            name: "group",
            size: "mac",
            className: "content-icon"
          })
        }
        null == n && (n = {
          title: ""
        });
        var c = consts.defaultCollectionIcon();
        try {
          c = network.fixURL(this.state.item.cover[0])
        } catch (i) {}
        var u = null;
        this.state.item._id > 0 && (u = React.createElement("a", {
          href: "",
          className: "but ",
          onClick: this.handleRemoveCollection
        }, t.s("remove")));
        var h = "";
        switch (this.state.item.view) {
          case "grid":
            h = t.s("visualBookmarks");
            break;
          case "masonry":
            h = t.s("visualBookmarks") + " (Moodboard)";
            break;
          case "simple":
            h = t.s("icon") + ", " + t.s("title").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase();
            break;
          default:
            h = t.s("cover") + ", " + t.s("title").toLowerCase() + ", " + t.s("description").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase()
        }
        return React.createElement("div", null, React.createElement("div", {
          className: (this.props.isSubContent ? "pop-sub-content" : "pop-content") + " " + (e ? "invisible" : null)
        }, React.createElement("form", {
          onSubmit: this.handleSave
        }, React.createElement("header", null, React.createElement("div", {
          className: "max title",
          style: {
            marginRight: 0
          }
        }, React.createElement("input", {
          type: "text",
          className: "important",
          required: !0,
          autoFocus: !0,
          valueLink: {
            value: this.state.item.title,
            requestChange: this.handleTitleChange
          },
          ref: "title"
        }), React.createElement("div", {
          className: "sublinks" + (this.state.item._id <= 0 ? " hidden" : "")
        }, React.createElement("a", {
          href: consts.host + "/collection/" + this.state.item._id,
          target: "_blank",
          className: "but " + (this.state.item["public"] ? "" : "hidden")
        }, React.createElement(Icon, {
          name: "link",
          size: "mac"
        }), " ", t.s("link")), React.createElement("label", {
          className: "but select"
        }, React.createElement(Icon, {
          name: "rss",
          size: "mac"
        }), " RSS", React.createElement("select", {
          value: "-1",
          onChange: this.handleRSS
        }, this.state.item["public"] ? React.createElement("option", {
          value: "public"
        }, t.s("publicRSSfeed")) : null, React.createElement("option", {
          value: "private"
        }, t.s("privateRSSfeed")), React.createElement("option", {
          value: "-1",
          disabled: !0
        }, t.s("feedWarning")))))), React.createElement("div", {
          className: "cover",
          onClick: this.handleOpenIcons
        }, React.createElement("img", {
          src: c,
          alt: "",
          className: "cover-img cover-small"
        }))), React.createElement("div", {
          className: "entries"
        }, React.createElement("div", {
          className: "row"
        }, React.createElement("div", {
          className: "title"
        }, a), React.createElement("div", {
          className: "content"
        }, React.createElement("a", {
          href: "",
          className: "block-link",
          onClick: this.handleOpenCollectionsList
        }, o, n.title))), React.createElement("div", {
          className: "row" + (this.state.item._id <= 0 ? " hidden" : "")
        }, React.createElement("div", {
          className: "title wrap-text"
        }, t.s("sharing")), React.createElement("div", {
          className: "content"
        }, React.createElement("a", {
          href: "",
          className: "block-link",
          onClick: this.handleOpenSharing
        }, React.createElement(Icon, {
          name: this.state.item["public"] ? "link" : "lock",
          size: "mac",
          className: "content-icon"
        }), t.s(this.state.item["public"] ? "accessViaLink" : "privateD"), " ", this.state.collaboratorsText), React.createElement("br", null))), React.createElement("div", {
          className: "row"
        }, React.createElement("div", {
          className: "title ",
          style: {
            paddingTop: "10px"
          }
        }, t.s("view")), React.createElement("div", {
          className: "content max"
        }, React.createElement("div", {
          className: "stag"
        }, React.createElement("a", {
          href: "",
          className: "list" == this.state.item.view ? "active" : null,
          "data-view": "list",
          onClick: this.handleChangeView
        }, React.createElement(Icon, {
          name: "list",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "grid" == this.state.item.view ? "active" : null,
          "data-view": "grid",
          onClick: this.handleChangeView
        }, React.createElement(Icon, {
          name: "grid",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "simple" == this.state.item.view ? "active" : null,
          "data-view": "simple",
          onClick: this.handleChangeView
        }, React.createElement(Icon, {
          name: "simple",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "masonry" == this.state.item.view ? "active" : null,
          "data-view": "masonry",
          onClick: this.handleChangeView
        }, React.createElement(Icon, {
          name: "masonry",
          size: "mac"
        }))), React.createElement("div", {
          className: "subinfo",
          style: {
            marginTop: "8px"
          }
        }, h)))), React.createElement("div", {
          className: "nice-action" + (!this.state.item.author || this.state.item._id <= 0 ? " hidden" : "")
        }, React.createElement("a", {
          href: "",
          className: "block-link",
          onClick: this.handleSubFolder
        }, React.createElement(Icon, {
          name: "folder-add",
          size: "mac",
          className: "content-icon"
        }), t.s("createSubFolder"))), React.createElement("footer", null, React.createElement("input", {
          type: "submit",
          className: "but accent pull-right " + (this.state.item.author && !(this.state.item._id < 0) || this.state.item.blank ? "" : "hidden"),
          value: this.state.item._id > 0 ? t.s("save") : t.s("createNewCollection")
        }), React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, t.s("cancel")), u))), React.createElement("div", {
          className: "pop-loader " + (e ? null : "hidden")
        }))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../actions/Collections": 4,
    "../../../actions/Parents": 7,
    "../../../stores/Collections": 115,
    "../Bookmarks/Upgrade": 23,
    "../Forms/CollectionsList": 36,
    "./Collection/Icon": 66,
    "./Collection/Sharing": 67,
    "react-textarea-autosize": "react-textarea-autosize"
  }],
  66: [function (e, n, a) {
    var o = e("../../Helpers/CoverSelector");
    n.exports = React.createClass({
      displayName: "Collection/Icon",
      scrolled: !1,
      getInitialState: function () {
        return {
          icons: [],
          selected: -1,
          theme: 0,
          path: "",
          collection: this.props.collection,
          step: !1
        }
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          collection: e.collection
        })
      },
      componentDidMount: function () {
        var e = this,
          t = null,
          n = "";
        try {
          t = JSON.parse(Api.getItem("coverTemplates")), n = Api.getItem("coverTemplatesPath")
        } catch (a) {}
        if (t && 0 == this.state.icons.length) {
          this.state.icons = t;
          var o = e.findSelected();
          this.setState({
            icons: this.state.icons,
            path: n,
            theme: o.theme,
            selected: o.selected
          })
        }
        Api.get("coverTemplates", function (t) {
          var n = [];
          n.push({
            name: "defaults",
            items: t.items
          });
          for (var a in t.pro) n.push({
            name: a,
            items: t.pro[a]
          });
          e.state.icons = n;
          var o = e.findSelected();
          Api.setItem("coverTemplates", JSON.stringify(n)), Api.setItem("coverTemplatesPath", t.path), e.setState({
            icons: n,
            path: t.path,
            theme: o.theme,
            selected: o.selected
          })
        })
      },
      findSelected: function () {
        var e = -1,
          t = 0,
          n = this;
        return this.state.icons.forEach(function (a, o) {
          a.items.forEach(function (a, i) {
            a == (n.state.collection.cover_path || -1) && (e = i, t = o)
          })
        }), {
          selected: e,
          theme: t
        }
      },
      handleChangeIcon: function (e) {
        var t = this.state.icons[this.state.theme].items[e];
        this.props.setCover(this.state.path + t + ".png", t), this.setState({
          collection: this.state.collection,
          selected: e
        })
      },
      handleChangeTheme: function (e) {
        var t = this.findSelected(),
          n = -1;
        t.theme == e && (n = t.selected), this.setState({
          theme: e,
          selected: n,
          step: !1
        })
      },
      scrollToActive: function () {
        if (!this.scrolled) {
          var e = document.getElementById("coveritem_" + this.state.selected);
          e && (e.scrollIntoView(!1), this.scrolled = !0)
        }
      },
      componentDidUpdate: function () {
        this.props.onUpdate(), this.scrollToActive()
      },
      handleThemes: function (e) {
        e.preventDefault(), this.scrolled = !1, this.setState({
          step: !this.state.step
        })
      },
      render: function () {
        var e = null,
          n = this;
        React.createElement("div", {
          className: "mini-tab"
        }, React.createElement("a", {
          className: "item"
        }, React.createElement("img", {
          src: "about:blank",
          style: {
            width: "32px",
            height: "32px"
          },
          alt: ""
        })));
        if (this.state.step) {
          var a = this.state.icons.map(function (e, t) {
            return network.fixURL(n.state.path + e.items[parseInt(e.items.length / 2)] + ".png")
          });
          e = React.createElement(o, {
            items: a,
            selected: this.state.theme,
            onSelect: this.handleChangeTheme,
            imageSize: "64px 64px"
          })
        } else if ("" != this.state.path) {
          var a = this.state.icons[this.state.theme].items.map(function (e, t) {
            return network.fixURL(n.state.path + e + ".png")
          });
          e = React.createElement(o, {
            items: a,
            selected: this.state.selected,
            onSelect: this.handleChangeIcon,
            imageSize: "64px 64px"
          });
          this.state.icons.map(function (e, t) {
            return React.createElement("a", {
              href: "",
              className: "item" + (n.state.theme == t ? " active" : ""),
              "data-index": t,
              onClick: n.handleChangeTheme
            }, React.createElement("img", {
              src: network.fixURL(n.state.path + e.items[parseInt(e.items.length / 2)] + ".png"),
              style: {
                width: "32px",
                height: "32px"
              },
              alt: ""
            }))
          })
        } else e = React.createElement("div", {
          className: "centered-content"
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)));
        return React.createElement("div", {
          className: "pop-content"
        }, React.createElement("div", {
          className: "pop-sticky-header"
        }, React.createElement("div", {
          className: "sticky-header"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "but default onlyicons",
          onClick: this.props.goToForm
        }, React.createElement(Icon, {
          name: "back",
          size: "mac"
        }))), React.createElement("div", {
          className: "max title center"
        }, React.createElement("a", {
          href: "",
          className: "but " + (this.state.step ? "active" : ""),
          onClick: this.handleThemes
        }, t.s("selectAIconSet"), " ", React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }))), React.createElement("div", {
          className: "actions"
        }))), e))
      }
    })
  }, {
    "../../Helpers/CoverSelector": 41
  }],
  67: [function (e, n, a) {
    var o = e("../../../../actions/Collections"),
      i = e("../../Helpers/Avatar");
    [{
      key: "owner",
      value: t.s("role_owner")
    }, {
      key: "member",
      value: t.s("role_member")
    }, {
      key: "viewer",
      value: t.s("role_viewer")
    }];
    n.exports = React.createClass({
      displayName: "Collection/Sharing",
      mixins: [strings.inputSelectAllMixin],
      getInitialState: function () {
        return {
          collection: this.props.collection,
          collaborators: [],
          invite: {
            emails: "",
            role: "member",
            loading: !1
          }
        }
      },
      componentDidMount: function () {
        this.loadCollaborators()
      },
      componentWillReceiveProps: function (e) {
        this.state.collection = e.collection, this.loadCollaborators(), this.setState({
          collection: e.collection
        })
      },
      loadCollaborators: function (e) {
        var t = this,
          n = "collection/" + this.state.collection._id + "/collaborators";
        if (0 == this.state.collaborators.length) {
          var a = null;
          try {
            a = JSON.parse(Api.getItem(n))
          } catch (o) {}
          a && this.setState({
            collaborators: a || []
          })
        }(0 == this.state.collaborators.length || "undefined" != typeof e) && Api.get(n, function (e) {
          t.setState({
            collaborators: e.items || []
          }), Api.setItem(n, JSON.stringify(e.items || []))
        })
      },
      handleChangePublic: function (e) {
        e.preventDefault(), this.state.collection["public"] = !this.state.collection["public"], o.updateCollection({
          item: {
            _id: this.state.collection._id,
            "public": this.state.collection["public"]
          },
          silent: !0
        }, function (e) {}), this.setState({
          collection: this.state.collection
        })
      },
      handleChangeRole: function (e) {
        var t = e.target.value,
          n = parseInt(e.target.getAttribute("data-userid")),
          a = this;
        Api.put("collection/" + this.state.collection._id + "/role", {
          accesslevel: t,
          userId: n
        }, function (e) {
          e.result && a.loadCollaborators(!0)
        })
      },
      handleRemoveRole: function (e) {
        e.preventDefault(), this.handleChangeRole("", {
          userId: e.target.getAttribute("data-userid")
        })
      },
      handleUnshareCollection: function (e) {
        e.preventDefault();
        var n = this;
        Api.put("collection/" + this.state.collection._id + "/unshare", {}, function (e) {
          Toasts.show({
            text: t.s("unshareSuccess"),
            title: n.state.collection.title
          }), n.loadCollaborators(!0)
        })
      },
      handleEmailsChange: function (e) {
        this.state.invite.emails = e, this.setState({
          invite: this.state.invite
        })
      },
      handleChangeInviteRole: function (e) {
        this.state.invite.role = e.target.value, this.setState({
          invite: this.state.invite
        })
      },
      handleSendInvites: function (e) {
        e.preventDefault();
        var n = this;
        this.state.invite.loading = !0, this.setState({
          invite: this.state.invite
        }), Api.get("collection/" + this.state.collection._id + "/invite?emails=" + this.state.invite.emails + "&accesslevel=" + this.state.invite.role, function (e) {
          e.result ? (n.state.invite.emails = "", Toasts.show({
            title: t.s("invitesSendTo"),
            text: e.emails.join(", ")
          })) : Toasts.show({
            text: t.s("error"),
            status: "error"
          }), n.state.invite.loading = !1, n.setState({
            invite: n.state.invite
          })
        })
      },
      renderMember: function (e, n) {
        var a = t.s("role_" + e.role);
        return "owner" != e.role && this.state.collection.author && (a = React.createElement("label", {
          className: "but select default onlyicons"
        }, React.createElement(Icon, {
          name: "settings",
          size: "mac"
        }), React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }), React.createElement("select", {
          value: e.role,
          "data-userid": e._id,
          onChange: this.handleChangeRole
        }, React.createElement("optgroup", {
          label: t.s("withAccessLevel")
        }, "owner" == e.role ? React.createElement("option", {
          value: "owner"
        }, t.s("role_owner")) : null, React.createElement("option", {
          value: "member"
        }, t.s("role_member")), React.createElement("option", {
          value: "viewer"
        }, t.s("role_viewer"))), React.createElement("optgroup", {
          label: "⌘"
        }, React.createElement("option", {
          value: ""
        }, t.s("remove")))))), React.createElement("div", {
          className: "item " + (n ? "first" : "")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(i, {
          src: e.email_MD5,
          size: "64"
        })), React.createElement("div", {
          className: "title"
        }, e.fullName, React.createElement("input", {
          type: "text",
          value: e.email,
          readonly: !0,
          onFocus: this.handleSelectAll,
          onMouseUp: this.handleSelectAll
        })), React.createElement("div", {
          className: "actions"
        }, a))
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        var e = this,
          n = [],
          a = [],
          o = [];
        a = this.state.collaborators.filter(function (e) {
          return "owner" == e.role || "member" == e.role
        }), o = this.state.collaborators.filter(function (e) {
          return "viewer" == e.role
        }), a.length > 0 && (n.push(React.createElement("div", {
          className: "separator"
        }, t.s("role_members"))), a.forEach(function (t, a) {
          n.push(e.renderMember(t, 0 == a))
        })), o.length > 0 && (n.push(React.createElement("div", {
          className: "separator"
        }, t.s("role_viewer"))), o.forEach(function (t, a) {
          n.push(e.renderMember(t, 0 == a))
        }));
        var i = null;
        this.state.collection.user.$id == UserStore.getUser()._id && (i = React.createElement("a", {
          href: "",
          className: "but",
          onClick: this.handleUnshareCollection
        }, t.s("unshareCollection")));
        var s = null;
        return "" != this.state.invite.emails.trim() && (i = null, s = this.state.invite.loading ? React.createElement("div", {
          className: "pull-right"
        }, t.s("loading")) : React.createElement("a", {
          href: "",
          className: "but accent pull-right",
          onClick: this.handleSendInvites
        }, t.s("sendInvites"))), React.createElement("div", {
          className: "pop-content"
        }, React.createElement("div", {
          className: "pop-sticky-header"
        }, React.createElement("div", {
          className: "sticky-header"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "but default onlyicons",
          onClick: this.props.goToForm
        }, React.createElement(Icon, {
          name: "back",
          size: "mac"
        }))), React.createElement("div", {
          className: "max title center"
        }, t.s("sharing")), React.createElement("div", {
          className: "actions"
        }))), React.createElement("div", {
          className: "list"
        }, React.createElement("div", {
          className: "item first"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement("div", {
          className: "icon-link"
        }, React.createElement(Icon, {
          name: "link",
          size: "mac"
        }))), React.createElement("div", {
          className: "title"
        }, t.s("accessViaLink"), React.createElement("input", {
          type: "text",
          className: this.state.collection["public"] ? "" : "hidden",
          readOnly: !0,
          autoFocus: !0,
          value: network.fixURL("/collection/" + this.state.collection._id || ""),
          onFocus: this.handleSelectAll,
          onMouseUp: this.handleSelectAll
        })), React.createElement("div", {
          className: "actions"
        }, React.createElement("div", {
          onClick: this.handleChangePublic,
          className: "extra-checkbox" + (this.state.collection["public"] ? " active" : "")
        }))), n, React.createElement("div", {
          className: "separator"
        }, t.s("inviteMorePeople")), React.createElement("div", {
          className: "item first"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "add-box-clean",
          size: "mac",
          className: "icn-blue"
        })), React.createElement("div", {
          className: "title"
        }, React.createElement("textarea", {
          placeholder: t.s("enterEmails"),
          disabled: this.state.invite.loading,
          valueLink: {
            value: this.state.invite.emails,
            requestChange: this.handleEmailsChange
          }
        }))), React.createElement("div", {
          className: "item " + (s ? null : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "lock",
          size: "mac",
          className: "icn-blue"
        })), React.createElement("div", {
          className: "title"
        }, " "), React.createElement("div", {
          className: "actions"
        }, React.createElement("label", {
          className: "but select default"
        }, t.s("role_" + this.state.invite.role), React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }), React.createElement("select", {
          value: this.state.invite.role,
          onChange: this.handleChangeInviteRole
        }, React.createElement("optgroup", {
          label: t.s("withAccessLevel")
        }, React.createElement("option", {
          value: "member"
        }, t.s("role_member")), React.createElement("option", {
          value: "viewer"
        }, t.s("role_viewer"))))))), React.createElement("footer", {
          className: s || i ? null : "hidden"
        }, s, i))))
      }
    })
  }, {
    "../../../../actions/Collections": 4,
    "../../Helpers/Avatar": 37
  }],
  68: [function (e, n, a) {
    var o = e("./URL"),
      i = e("./Collection"),
      s = e("./File");
    n.exports = React.createClass({
      displayName: "Pop/Fab",
      getInitialState: function () {
        var e = parseInt(this.props.tab || Api.getItem("fab-modal-tab") || 1);
        return this.props.onlyURL && (e = 1), {
          tab: e,
          hideTabs: this.props.onlyURL ? !0 : !1
        }
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      handleChangeTab: function (e) {
        e.preventDefault();
        var t = parseInt(e.target.getAttribute("data-tab"));
        this.setState({
          tab: t
        }), Api.setItem("fab-modal-tab", t)
      },
      render: function () {
        var e = o;
        switch (this.state.tab) {
          case 2:
            e = i;
            break;
          case 3:
            e = s
        }
        var n = null;
        return this.state.hideTabs || (n = React.createElement("div", {
          className: "simple-tab"
        }, React.createElement("a", {
          href: "",
          "data-tab": "1",
          className: "item " + (1 == this.state.tab ? "active" : ""),
          onClick: this.handleChangeTab
        }, "URL"), React.createElement("a", {
          href: "",
          "data-tab": "2",
          className: "item " + (2 == this.state.tab ? "active" : ""),
          onClick: this.handleChangeTab
        }, t.s("nestedCollections")), React.createElement("a", {
          href: "",
          "data-tab": "3",
          className: "item " + (3 == this.state.tab ? "active" : ""),
          onClick: this.handleChangeTab
        }, "File"))), React.createElement("div", null, React.createElement("div", {
          className: "pop-content"
        }, n, React.createElement(e, React.__spread({}, this.props, {
          isSubContent: !0
        }))))
      }
    })
  }, {
    "./Collection": 65,
    "./File": 69,
    "./URL": 73
  }],
  69: [function (e, n, a) {
    var o = e("../Helpers/FileLimit");
    n.exports = React.createClass({
      displayName: "Pop/File",
      handleFile: function (e) {
        var t = dropfiles.validateFiles(React.findDOMNode(this.refs.file).files);
        window.dropFiles({
          files: t
        }), t.length > 0 && Pop.close()
      },
      handleClose: function (e) {
        e && "undefined" != typeof e.preventDefault && e.preventDefault(), Pop.close()
      },
      componentDidMount: function () {
        window.addEventListener("fileDropped", this.handleClose, !0)
      },
      componentWillUnmount: function () {
        window.removeEventListener("fileDropped", this.handleClose, !0)
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        return React.createElement("div", {
          className: this.props.isSubContent ? "pop-sub-content" : "pop-content"
        }, React.createElement("form", {
          style: {
            position: "relative"
          }
        }, React.createElement("header", null, React.createElement("div", {
          className: "max title"
        }, React.createElement("div", null, t.s("select") + " " + t.s("dropFilesHere").toLowerCase()), React.createElement("div", {
          style: {
            marginTop: "2px",
            opacity: .7,
            fontSize: "13px"
          }
        }, dropfiles.getHumanAcceptString()))), React.createElement("div", {
          className: "entries"
        }, React.createElement("div", {
          className: "row "
        }, React.createElement("div", {
          className: "title"
        }, "Used"), React.createElement("div", {
          className: "content max"
        }, React.createElement(o, {
          style: {
            marginTop: "-4px"
          }
        })))), React.createElement("footer", null, React.createElement("label", {
          className: "file-block but accent pull-right"
        }, t.s("select"), React.createElement("input", {
          type: "file",
          multiple: "multiple",
          accept: dropfiles.getAcceptString(),
          placeholder: "",
          ref: "file",
          onChange: this.handleFile
        })), React.createElement("a", {
          href: "",
          className: "but default pull-right",
          onClick: this.handleClose
        }, t.s("cancel")))))
      }
    })
  }, {
    "../Helpers/FileLimit": 43
  }],
  70: [function (e, n, a) {
    var o = e("../../../actions/User");
    n.exports = React.createClass({
      displayName: "Pop/Group",
      getInitialState: function () {
        return {
          step: "form",
          id: this.props.id,
          item: {
            title: t.s("newString") + " " + t.s("group").toLowerCase()
          }
        }
      },
      componentWillMount: function () {
        -1 != this.state.id && (this.state.item.title = UserStore.getGroup(this.state.id).title)
      },
      componentDidMount: function () {
        this.focusMainInput()
      },
      focusMainInput: function () {
        var e = this;
        setTimeout(function () {
          var t = React.findDOMNode(e.refs.title);
          t && (t.focus(), -1 == e.state.id ? t.setSelectionRange(0, t.value.length) : t.setSelectionRange(t.value.length, t.value.length))
        }, 0)
      },
      componentWillReceiveProps: function (e) {
        this.setState({
          id: e.id
        })
      },
      handleTitleChange: function (e) {
        this.state.item.title = e, this.setState({
          item: this.state.item
        })
      },
      handleSave: function (e) {
        e.preventDefault(), -1 == this.state.id ? o.insertGroup({
          item: this.state.item
        }, function (e) {
          e && window.location.reload()
        }) : o.updateGroup({
          item: this.state.item,
          id: this.state.id
        }), Pop.close()
      },
      handleRemoveGroup: function (e) {
        e.preventDefault(), o.removeGroup({
          id: this.state.id
        }), Pop.close()
      },
      handleClose: function (e) {
        e.preventDefault(), Pop.close()
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        var e = null;
        return -1 != this.state.id && (e = React.createElement("a", {
          href: "",
          className: "but",
          onClick: this.handleRemoveGroup
        }, t.s("remove"))), React.createElement("div", {
          className: "pop-content"
        }, React.createElement("form", {
          onSubmit: this.handleSave
        }, React.createElement("header", null, React.createElement("div", {
          className: "max title"
        }, React.createElement("input", {
          type: "text",
          className: "important",
          required: !0,
          autoFocus: !0,
          valueLink: {
            value: this.state.item.title,
            requestChange: this.handleTitleChange
          },
          ref: "title"
        }))), React.createElement("footer", null, React.createElement("input", {
          type: "submit",
          className: "but accent pull-right",
          value: this.state.id > 0 ? t.s("save") : t.s("create")
        }), React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, t.s("cancel")), e)))
      }
    })
  }, {
    "../../../actions/User": 14
  }],
  71: [function (e, t, n) {
    var a = e("../../../stores/Pop"),
      o = 10,
      i = !1,
      s = e("../Helpers/OverflowScroll"); - 1 != (window.environment || []).indexOf("clipper") && (o = 0), t.exports = React.createClass({
      displayName: "Pop/Pop",
      getInitialState: function () {
        return {
          params: a.getParams()
        }
      },
      componentDidMount: function () {
        this.unsubscribePop = a.listen(this.onPopChange), window.addEventListener("resize", this.afterComponentsUpdate), window.addEventListener("scroll", this.afterComponentsUpdate), window.addEventListener("wheel", this.afterComponentsUpdate)
      },
      componentWillUnmount: function () {
        this.unsubscribePop(), window.removeEventListener("resize", this.afterComponentsUpdate), window.removeEventListener("scroll", this.afterComponentsUpdate), window.removeEventListener("wheel", this.afterComponentsUpdate)
      },
      onPopChange: function (e) {
        var t = this;
        0 == e ? t.setState({
          params: e
        }) : this.setState({
          params: e
        })
      },
      afterComponentsUpdate: function () {
        this.updatePosition()
      },
      updatePosition: function () {
        var e = React.findDOMNode(this.refs.body);
        if (e) {
          var t = [],
            n = {},
            a = e.offsetWidth < window.innerWidth && e.offsetHeight < window.innerHeight,
            i = !1,
            s = "",
            r = document.getElementById(this.state.params.pin);
          if (r) {
            var c = r.getBoundingClientRect();
            i = window.innerHeight + window.pageYOffset > c.top + window.scrollY && window.pageYOffset - window.innerHeight < c.top + window.scrollY + r.offsetHeight, e.offsetHeight < c.top && a && i && (n.top = c.top, t.push("top")), e.offsetWidth < c.left && a && i && (n.left = c.left, t.push("left")), c.left + r.offsetWidth + e.offsetWidth < window.innerWidth && a && i && (n.right = window.innerWidth - (c.left + r.offsetWidth), t.push("right")), c.top + r.offsetHeight + e.offsetHeight < window.innerHeight && a && i && (n.bottom = window.innerHeight - (c.top + r.offsetHeight), t.push("bottom"))
          }
          a && (t.push("center"), n.center = 0);
          var l = -1;
          "vertical" == this.state.params.force && (n.bottom ? n.bottom += 1e4 : n.top && (n.top += 1e4));
          for (var d in n) n[d] > l && (l = n[d], s = d);
          switch (e.setAttribute("data-dir", s), s) {
            case "top":
              e.style.bottom = parseInt(window.innerHeight - c.top - o) + "px", e.style.top = "";
              break;
            case "bottom":
              e.style.top = parseInt(c.top + r.offsetHeight - o) + "px", e.style.bottom = "";
              break;
            case "left":
              e.style.right = parseInt(window.innerWidth - c.left + o) + "px", e.style.left = "";
              break;
            case "right":
              e.style.left = parseInt(c.left + r.offsetWidth - o) + "px", e.style.right = "";
              break;
            case "center":
              e.style.left = parseInt(window.innerWidth / 2 - e.offsetWidth / 2) + "px", e.style.top = parseInt(window.innerHeight / 2 - e.offsetHeight / 2) + "px", e.style.right = "", e.style.bottom = "";
              break;
            default:
              e.style.left = 0, e.style.top = 0, e.style.right = "", e.style.bottom = ""
          }
          var m = React.findDOMNode(this.refs.arrow);
          switch (s) {
            case "left":
            case "right":
              var u = parseInt(c.top + r.offsetHeight / 2 - e.offsetHeight / 2);
              u + e.offsetHeight > window.innerHeight && (u = window.innerHeight - e.offsetHeight - o), 0 > u && (u = o), e.style.top = u + "px", m.style.top = parseInt(c.top - u + r.offsetHeight / 2 + 5) + "px", m.style.left = "";
              break;
            case "top":
            case "bottom":
              var h = parseInt(c.left + r.offsetWidth / 2 - e.offsetWidth / 2);
              h + e.offsetWidth > window.innerWidth && (h = window.innerWidth - e.offsetWidth - o), 0 > h && (h = o), e.style.left = h + "px", m.style.left = parseInt(c.left - h + r.offsetWidth / 2) + "px", m.style.top = ""
          }
        }
      },
      componentDidUpdate: function () {
        this.afterComponentsUpdate()
      },
      canCloseSmoothly: function () {
        return !0
      },
      handleBeyondClick: function (e) {
        var t = React.findDOMNode(this.refs.body);
        if (t) {
          var n = t.getBoundingClientRect(),
            a = e.clientX > n.left && e.clientX < n.left + t.offsetWidth && e.clientY > n.top && e.clientY < n.top + t.offsetHeight;
          a || this.canCloseSmoothly() && Pop.close()
        }
      },
      handleGlobalKeyPress: function (e) {
        27 == e.keyCode && Pop.close()
      },
      render: function () {
        if (!this.state.params) return document.body.classList.remove("pop-mode"), document.body.removeEventListener("mousedown", this.handleBeyondClick), document.removeEventListener("keyup", this.handleGlobalKeyPress), i = !1, null;
        var t = null; - 1 == (window.environment || []).indexOf("clipper") && this.canCloseSmoothly() || (document.body.classList.add("pop-mode"), t = React.createElement("div", {
          id: "pop-body-black",
          onMouseDown: this.handleBeyondClick
        })), i || (i = !0, document.body.addEventListener("mousedown", this.handleBeyondClick), document.addEventListener("keyup", this.handleGlobalKeyPress));
        var n = null;
        switch (this.state.params.name) {
          case "bookmark":
            n = e("./Bookmark");
            break;
          case "collection":
            n = e("./Collection");
            break;
          case "group":
            n = e("./Group");
            break;
          case "URL":
            n = e("./URL");
            break;
          case "fab":
            n = e("./Fab");
            break;
          case "saveas":
            n = e("./SaveAs")
        }
        return React.createElement("div", {
          key: "pop"
        }, t, React.createElement("div", {
          id: "pop-body",
          "data-name": this.state.params.name,
          ref: "body"
        }, React.createElement("div", {
          id: "pop-arrow",
          ref: "arrow"
        }), React.createElement(s, null, n ? React.createElement(n, React.__spread({}, this.state.params, {
          onUpdate: this.afterComponentsUpdate
        })) : null)))
      }
    })
  }, {
    "../../../stores/Pop": 119,
    "../Helpers/OverflowScroll": 46,
    "./Bookmark": 63,
    "./Collection": 65,
    "./Fab": 68,
    "./Group": 70,
    "./SaveAs": 72,
    "./URL": 73
  }],
  72: [function (e, n, a) {
    var o = e("../../../actions/Bookmarks"),
      i = e("../../../stores/Collections"),
      s = (e("../../../stores/Parents"), !1),
      r = !0;
    n.exports = React.createClass({
      displayName: "Pop/SaveAs",
      getInitialState: function () {
        return {
          id: 0,
          step: "loading"
        }
      },
      onUserChange: function () {
        this.checkURL()
      },
      onCollectionsChange: function () {
        this.isMounted() && this.setState({
          id: this.state.id
        })
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange), this.unsubscribeCollections = i.listen(this.onCollectionsChange), this.checkURL()
      },
      componentWillUnmount: function () {
        this.unsubscribeUser(), this.unsubscribeCollections()
      },
      checkURL: function () {
        if (!s && UserStore.isLogged() && "edit" != this.state.step) {
          s = !0;
          var e = this,
            n = this.props.query;
          n.url && o.loadBookmark({
            url: n.url,
            nohtml: !0
          }, function (a) {
            a ? (s = !1, e.setState({
              step: "edit",
              id: a._id,
              item: a,
              already: !0
            })) : o.parseURL({
              item: {
                url: n.url
              }
            }, function (n) {
              s = !1, n ? (n.collectionId = parseInt(Api.getItem("last_collection") || 0) || -1, o.insertBookmark({
                item: n,
                silent: !0
              }, function (t) {
                t ? e.setState({
                  step: "edit",
                  id: t._id,
                  item: n
                }) : (Api.removeItem("last_collection"), e.setState({
                  step: "unsupported"
                }))
              })) : (e.setState({
                step: "unsupported"
              }), Toasts.show({
                text: t.s("supportOnlyUrls"),
                step: "error"
              }))
            })
          })
        }
      },
      handleEdit: function (e) {
        r && (e && e.preventDefault(), Pop.show("bookmark", {
          id: this.state.id,
          silent: !0,
          onClose: this.props.onClose
        }))
      },
      handleClose: function (e) {
        e && e.preventDefault(), "function" == typeof this.props.onClose ? this.props.onClose() : Pop.close()
      },
      closeOver: function () {
        r = !1
      },
      closeLeave: function () {
        r = !0
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        var e = React.createElement("div", {
          className: "content"
        });
        switch (this.state.step) {
          case "unsupported":
            e = React.createElement("div", {
              className: "content",
              onClick: this.handleClose
            }, React.createElement("div", {
              className: "cover"
            }, React.createElement(Icon, {
              name: "minus-box-clean",
              size: "mac"
            })), React.createElement("div", {
              className: "title"
            }, React.createElement("strong", null, t.s("error")), React.createElement("div", {
              className: "subinfo"
            }, t.s("serverundefined"))), React.createElement("a", {
              href: "",
              className: "close"
            }, React.createElement(Icon, {
              name: "clear",
              size: "mac"
            })));
            break;
          case "edit":
            var n = i.getCollection(this.state.item.collectionId);
            null == n && (i.onLoadId(this.state.item.collectionId), n = {
              title: ""
            });
            var a = consts.defaultCollectionIcon();
            try {
              a = network.fixURL(n.cover[0])
            } catch (o) {}
            var s = t.s(this.state.item.type + "Saved") + " " + t.s("to");
            this.state.already && (s = t.s("alreadyInCollection")), e = React.createElement("div", {
              className: "content",
              onClick: this.handleEdit
            }, React.createElement("div", {
              className: "cover"
            }, React.createElement("img", {
              className: "small-icon",
              src: a,
              alt: ""
            })), React.createElement("div", {
              className: "title"
            }, React.createElement("strong", null, s, " ", React.createElement("b", null, n.title)), React.createElement("div", {
              className: "subinfo"
            }, t.s("alreadyInCollectionD"))), React.createElement("a", {
              href: "",
              className: "close",
              onClick: this.handleClose,
              onMouseOver: this.closeOver,
              onMouseLeave: this.closeLeave
            }, React.createElement(Icon, {
              name: "done-circle",
              size: "mac"
            })))
        }
        var r = "";
        return "loading" == this.state.step ? r = "mini" : "edit" == this.state.step && (r = "done"), React.createElement("div", {
          className: "pop-saver " + r
        }, React.createElement(Icon, {
          name: "preloader-circle",
          className: "colorful-preloader",
          size: "big"
        }), e)
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../stores/Collections": 115,
    "../../../stores/Parents": 118
  }],
  73: [function (e, n, a) {
    var o = e("../../../actions/Bookmarks"),
      i = e("../../../stores/Parents");
    n.exports = React.createClass({
      displayName: "Pop/URL",
      getInitialState: function () {
        var e = parseInt(this.props.parentId || -1);
        return {
          loading: !1,
          item: {
            url: "",
            collectionId: e
          }
        }
      },
      componentDidMount: function () {
        this.focusMainInput()
      },
      focusMainInput: function () {
        var e = this;
        setTimeout(function () {
          var t = React.findDOMNode(e.refs.url);
          t && t.focus()
        }, 0)
      },
      handleURLChange: function (e) {
        this.state.item.url = e, this.setState({
          item: this.state.item
        })
      },
      handleSave: function (e) {
        e.preventDefault();
        var n = this;
        this.setState({
          loading: !0
        }), o.parseURL({
          item: this.state.item
        }, function (e) {
          if (e) {
            e.collectionId = n.state.item.collectionId;
            var a = parseInt(e.collectionId) != parseInt(n.props.parentId);
            o.insertBookmark({
              item: e,
              dontAdd: a,
              possibleWithoutAuth: -2 == e.collectionId,
              toEndOfList: -2 == e.collectionId
            }, function (t) {
              t && (-2 != e.collectionId ? (i.reset(), window.location.hash = "#/collection/" + e.collectionId) : (window.location.hash = "#/", o.saveAllSort()), Pop.close()), n.setState({
                loading: !1
              })
            })
          } else n.setState({
            loading: !1
          }), Toasts.show({
            text: t.s("supportOnlyUrls"),
            status: "error"
          })
        })
      },
      handleClose: function (e) {
        e.preventDefault(), Pop.close()
      },
      componentDidUpdate: function () {
        this.props.onUpdate()
      },
      render: function () {
        return React.createElement("div", null, React.createElement("div", {
          className: (this.props.isSubContent ? "pop-sub-content" : "pop-content") + " " + (this.state.loading ? "invisible" : null)
        }, React.createElement("form", {
          onSubmit: this.handleSave
        }, React.createElement("header", null, React.createElement("div", {
          className: "max title"
        }, React.createElement("input", {
          type: "text",
          className: "important",
          required: !0,
          autoFocus: !0,
          valueLink: {
            value: this.state.item.url,
            requestChange: this.handleURLChange
          },
          ref: "url",
          placeholder: t.s("enterLink") + " (URL)"
        }))), React.createElement("div", {
          className: "entries"
        }, React.createElement("div", {
          className: "row "
        }, React.createElement("div", {
          className: "title"
        }, t.s("more")), React.createElement("div", {
          className: "content max"
        }, React.createElement("a", {
          href: consts.getImportLink(),
          target: "_blank",
          className: "block-link"
        }, React.createElement(Icon, {
          name: "import",
          size: "mac",
          className: "content-icon icn-blue"
        }), t.s("importBookmarks")), React.createElement("br", null), React.createElement("a", {
          href: network.settingsURL() + "/install",
          target: "_blank",
          className: "block-link"
        }, React.createElement(Icon, {
          name: "install",
          size: "mac",
          className: "content-icon icn-green"
        }), t.s("browserExtension"), ", ", t.s("mobileApp").toLowerCase())))), React.createElement("footer", null, React.createElement("input", {
          type: "submit",
          className: "but accent pull-right",
          value: t.s("add")
        }), React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, t.s("cancel"))))), React.createElement("div", {
          className: "pop-loader " + (this.state.loading ? null : "hidden")
        }, React.createElement("div", {
          className: "pop-content"
        }, React.createElement("a", {
          href: "",
          onClick: this.handleClose,
          className: "but default pull-right"
        }, t.s("cancel")))))
      }
    })
  }, {
    "../../../actions/Bookmarks": 2,
    "../../../stores/Parents": 118
  }],
  74: [function (e, n, a) {
    var o = e("./Mixin");
    n.exports = React.createClass({
      displayName: "Popovers/Bookmark",
      mixins: [o],
      handleClick: function (e) {
        e.preventDefault()
      },
      handleCopyToClipboard: function (e) {
        e.preventDefault(), strings.copyTextToClipboard(this.props.link), this.props.onClose()
      },
      handleEdit: function (e) {
        e.preventDefault(), this.props.handleEdit(e), this.props.onClose()
      },
      handleRemove: function (e) {
        e.preventDefault(), this.props.handleRemove(e), this.props.onClose()
      },
      render: function () {
        return this.props.show ? this._makeWrap(React.createElement("div", {
          className: "picker-list"
        }, React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "open-link",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("openInBrowser")), React.createElement("a", {
          href: this.props.link,
          target: "_blank",
          className: "permalink",
          onClick: this.props.onClose
        })), React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "link",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("copyLinkToClipboard")), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleCopyToClipboard
        })), React.createElement("div", {
          className: "separator"
        }), React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "edit",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("edit")), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleEdit
        })), React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "trash",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("remove")), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleRemove
        })))) : null
      }
    })
  }, {
    "./Mixin": 78
  }],
  75: [function (e, n, a) {
    var o = e("./Mixin"),
      i = (e("../../../stores/Collections"), []),
      s = function () {
        i = [{
          key: "sort",
          value: t.s("custom")
        }, {
          key: "lastUpdate",
          value: t.s("byDate")
        }, {
          key: "title",
          value: t.s("byName")
        }]
      };
    document ? window.languageLoaded ? s() : window.addEventListener("langLoaded", s) : s(), n.exports = React.createClass({
      displayName: "Popovers/Collection",
      mixins: [o],
      handleSortChange: function (e) {
        e && e.preventDefault && e.preventDefault(), this.props.handleSortChange(e.target.getAttribute("data-sort")), this.props.onClose()
      },
      handleEdit: function (e) {
        e && e.preventDefault && e.preventDefault(), this.props.handleEdit(), this.props.onClose()
      },
      handleShare: function (e) {
        e && e.preventDefault && e.preventDefault(), this.props.handleEdit(void 0, "sharing"), this.props.onClose()
      },
      handleViewModalShow: function (e) {
        e && e.preventDefault && e.preventDefault(), this.props.handleViewModalShow(), this.props.onClose()
      },
      handleAddFolder: function (e) {
        e && e.preventDefault && e.preventDefault(), this.props.handleAddFolder(), this.props.onClose()
      },
      render: function () {
        if (this.props.show) {
          var e = this,
            n = i.map(function (t) {
              return React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: "icon"
              }, e.props.sortSelected == t.key ? React.createElement(Icon, {
                name: "done"
              }) : null), React.createElement("div", {
                className: "title",
                style: {
                  textTransform: "capitalize"
                }
              }, t.value), React.createElement("a", {
                href: "",
                className: "permalink",
                "data-sort": t.key,
                onClick: e.handleSortChange
              }))
            });
          (0 == this.props.collection._id || -99 == this.props.collection._id) && n.splice(0, 1);
          var a = this.props.onlyBasic;
          return this._makeWrap(React.createElement("div", {
            className: "picker-list"
          }, React.createElement("div", {
            className: -1 != (window.environment || []).indexOf("mobile") ? "hidden" : "item"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement(Icon, {
            name: "open-link",
            size: "mac"
          })), React.createElement("div", {
            className: "title"
          }, t.s("openInBrowser")), React.createElement("a", {
            href: network.fixURL("/app#/collection/" + this.props.collection._id),
            target: "_blank",
            onClick: this.props.onClose,
            className: "permalink"
          })), React.createElement("div", {
            className: this.props.collection.author && !a ? "item" : "hidden"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement(Icon, {
            name: "folder-add",
            size: "mac"
          })), React.createElement("div", {
            className: "title"
          }, t.s("createSubFolder")), React.createElement("a", {
            href: "",
            className: "permalink",
            onClick: this.handleAddFolder
          })), React.createElement("div", {
            className: this.props.collection.author ? "item" : "hidden"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement(Icon, {
            name: "edit",
            size: "mac"
          })), React.createElement("div", {
            className: "title"
          }, t.s("collectionEdit")), React.createElement("a", {
            href: "",
            className: "permalink",
            onClick: this.handleEdit
          })), React.createElement("div", {
            className: this.props.collection.author ? "item" : "hidden"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement(Icon, {
            name: "share",
            size: "mac"
          })), React.createElement("div", {
            className: "title"
          }, t.s("sharing")), React.createElement("a", {
            href: "",
            className: "permalink",
            onClick: this.handleShare
          })), React.createElement("div", {
            className: a ? "hidden" : "item"
          }, React.createElement("div", {
            className: "icon"
          }, React.createElement(Icon, {
            name: this.props.collection.view
          })), React.createElement("div", {
            className: "title"
          }, t.s("view")), React.createElement("a", {
            href: "",
            className: "permalink",
            onClick: this.handleViewModalShow
          })), React.createElement("span", {
            className: a ? "hidden" : ""
          }, React.createElement("div", {
            className: "separator"
          }), React.createElement("div", {
            className: "section"
          }, t.s("collectionsSorting")), n)))
        }
        return null
      }
    })
  }, {
    "../../../stores/Collections": 115,
    "./Mixin": 78
  }],
  76: [function (e, n, a) {
    var o = e("./Mixin"),
      i = (e("../../../stores/Collections"), []),
      s = function () {
        i = [{
          key: "sort",
          value: t.s("custom")
        }, {
          key: "lastUpdate",
          value: t.s("byDate")
        }, {
          key: "title",
          value: t.s("byName")
        }]
      };
    document ? window.languageLoaded ? s() : window.addEventListener("langLoaded", s) : s(), n.exports = React.createClass({
      displayName: "Popovers/Collection",
      mixins: [o],
      handleSortChange: function (e) {
        e.preventDefault(), this.props.handleSortChange(e.target.getAttribute("data-sort")), this.props.onClose()
      },
      handleEdit: function (e) {
        e.preventDefault(), this.props.handleEdit(), this.props.onClose()
      },
      handleShare: function (e) {
        e.preventDefault(), this.props.handleEdit(void 0, "sharing"), this.props.onClose()
      },
      handleViewModalShow: function (e) {
        e.preventDefault(), this.props.handleViewModalShow(), this.props.onClose()
      },
      handleAddFolder: function (e) {
        e.preventDefault(), this.props.handleAddFolder(), this.props.onClose()
      },
      render: function () {
        if (this.props.show) {
          var e = this,
            n = i.map(function (t) {
              return React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: "icon"
              }, e.props.sortSelected == t.key ? React.createElement(Icon, {
                name: "done"
              }) : null), React.createElement("div", {
                className: "title",
                style: {
                  textTransform: "capitalize"
                }
              }, t.value), React.createElement("a", {
                href: "",
                className: "permalink",
                "data-sort": t.key,
                onClick: e.handleSortChange
              }))
            });
          (0 == this.props.collection._id || -99 == this.props.collection._id) && n.splice(0, 1);
          var a = this.props.onlyBasic,
            o = [];
          return this.props.collection.author && (o.push(React.createElement("a", {
            href: "",
            onClick: this.handleEdit,
            className: "item"
          }, React.createElement("span", {
            className: "icon blue"
          }, React.createElement(Icon, {
            name: "edit"
          })), React.createElement("span", {
            className: "title"
          }, t.s("collectionEdit")))), o.push(React.createElement("a", {
            href: "",
            onClick: this.handleShare,
            className: "item"
          }, React.createElement("span", {
            className: "icon tomato"
          }, React.createElement(Icon, {
            name: "share"
          })), React.createElement("span", {
            className: "title"
          }, t.s("sharing"))))), -1 == (window.environment || []).indexOf("mobile") && o.push(React.createElement("a", {
            href: network.fixURL("/app#/collection/" + this.props.collection._id),
            target: "_blank",
            onClick: this.props.onClose,
            className: "item"
          }, React.createElement("span", {
            className: "icon asphalt"
          }, React.createElement(Icon, {
            name: "open-link"
          })), React.createElement("span", {
            className: "title"
          }, t.s("openInBrowser")))), this.props.collection.author && !a && o.push(React.createElement("a", {
            href: "",
            onClick: this.handleAddFolder,
            className: "item"
          }, React.createElement("span", {
            className: "icon green"
          }, React.createElement(Icon, {
            name: "folder-add"
          })), React.createElement("span", {
            className: "title"
          }, t.s("createSubFolder")))), this._makeWrap(React.createElement("div", null, React.createElement("div", {
            className: "fast-links"
          }, o), React.createElement("div", {
            className: "picker-list"
          }, React.createElement("div", {
            className: "section"
          }, t.s("view"))), React.createElement("div", {
            className: "picker-list"
          }, React.createElement("span", {
            className: a ? "hidden" : ""
          }, React.createElement("div", {
            className: "separator"
          }), React.createElement("div", {
            className: "section"
          }, t.s("collectionsSorting")), n))))
        }
        return null
      }
    })
  }, {
    "../../../stores/Collections": 115,
    "./Mixin": 78
  }],
  77: [function (e, n, a) {
    var o = e("./Mixin");
    n.exports = React.createClass({
      displayName: "Popovers/Font",
      mixins: [o],
      handleFontColor: function (e) {
        e.preventDefault(), this.props.handleFontColor(e.target.getAttribute("data-color"))
      },
      handleFontFamily: function (e) {
        e.preventDefault(), this.props.handleFontFamily(e.target.getAttribute("data-family"))
      },
      render: function () {
        return this.props.show ? this._makeWrap(React.createElement("div", null, React.createElement("div", {
          className: "font-edit popover-font-size"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.props.handleDicrementFont
        }, React.createElement(Icon, {
          name: "minus-box-clean",
          size: "mac"
        })), React.createElement("div", null, t.s("fontSize")), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.props.handleIncrementFont
        }, React.createElement(Icon, {
          name: "add-box-clean",
          size: "mac"
        }))), React.createElement("div", {
          className: "font-edit"
        }, React.createElement("a", {
          href: "",
          className: "item orange " + ("" == this.props.fontColor ? "active" : ""),
          "data-color": "",
          onClick: this.handleFontColor
        }, React.createElement(Icon, {
          name: "sun",
          size: "big"
        })), React.createElement("a", {
          href: "",
          className: "item red " + ("sunset" == this.props.fontColor ? "active" : ""),
          "data-color": "sunset",
          onClick: this.handleFontColor
        }, React.createElement(Icon, {
          name: "sunset",
          size: "big"
        })), React.createElement("a", {
          href: "",
          className: "item " + ("night" == this.props.fontColor ? "active" : ""),
          "data-color": "night",
          onClick: this.handleFontColor
        }, React.createElement(Icon, {
          name: "moon",
          size: "big"
        }))), React.createElement("div", {
          className: "font-edit"
        }, React.createElement("a", {
          href: "",
          className: "family " + ("" == this.props.fontFamily ? "active" : ""),
          "data-family": "",
          onClick: this.handleFontFamily
        }, "Aa"), React.createElement("a", {
          href: "",
          className: "family georgia " + ("georgia" == this.props.fontFamily ? "active" : ""),
          "data-family": "georgia",
          onClick: this.handleFontFamily
        }, "Aa"), React.createElement("a", {
          href: "",
          className: "family helvetica " + ("helvetica" == this.props.fontFamily ? "active" : ""),
          "data-family": "helvetica",
          onClick: this.handleFontFamily
        }, "Aa"), React.createElement("a", {
          href: "",
          className: "family verdana " + ("verdana" == this.props.fontFamily ? "active" : ""),
          "data-family": "verdana",
          onClick: this.handleFontFamily
        }, "Aa")))) : null
      }
    })
  }, {
    "./Mixin": 78
  }],
  78: [function (e, t, n) {
    var a = e("../Helpers/RenderInBody");
    t.exports = {
      handleBeyondClick: function (e) {
        "popover" == e.target.className && this.props.onClose()
      },
      handleContext: function (e) {
        e.preventDefault(), this.props.onClose()
      },
      handleWeel: function (e) {
        e.preventDefault()
      },
      _makeWrap: function (e) {
        var t = document.getElementById(this.props.attachId),
          n = {};
        null == t ? t = {} : n = t.getBoundingClientRect();
        var o = this.props.position;
        if (this.props.mousePos) var i = {
          left: window.mousePos.x,
          top: window.mousePos.y
        };
        else {
          var i = {
            left: n.left || 0,
            top: n.top || 0
          };
          i.top += t.offsetHeight
        }
        return i.left < 200 ? o = "left" : i.left + 200 > window.innerWidth && "left" == o && (o = ""), i.top + 300 > window.innerHeight && (i.top = i.top - 150), React.createElement(a, {
          name: "popover",
          category: this.props.attachId || ""
        }, React.createElement("div", {
          className: "popover",
          id: "popover-for-" + (this.props.attachId || ""),
          onClick: this.handleBeyondClick,
          onContextMenu: this.handleContext,
          onWheel: this.handleWeel
        }, React.createElement("div", {
          className: "popover-wrap",
          style: {
            top: i.top + "px",
            left: i.left + "px",
            width: t.offsetWidth
          }
        }, React.createElement("div", {
          className: "popover-body popover-pos-" + o
        }, e))))
      }
    }
  }, {
    "../Helpers/RenderInBody": 47
  }],
  79: [function (e, n, a) {
    var o = e("./Mixin"),
      i = e("../../../actions/User");
    n.exports = React.createClass({
      displayName: "Popovers/Collection",
      mixins: [o],
      handleLogOut: function (e) {
        e.preventDefault();
        i.logOut(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleClick: function (e) {
        -1 != (window.environment || []).indexOf("clipper") && (e.preventDefault(), e.stopPropagation(), BrowserBridge.openURL(e.target.href)), this.props.onClose()
      },
      render: function () {
        var e = network.settingsURL(),
          n = "_self"; - 1 != (window.environment || []).indexOf("clipper") && (n = "_blank");
        var a = null;
        return -1 == (window.environment || []).indexOf("mac") && (a = React.createElement("div", {
          className: "item " + (UserStore.isLogged() ? "" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "pro",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, React.createElement("strong", null, t.s("upgradeAccount"))), React.createElement("a", {
          href: e + "/pro",
          target: n,
          className: "permalink",
          onClick: this.handleClick
        }))), this.props.show ? this._makeWrap(React.createElement("div", {
          className: "picker-list"
        }, React.createElement("div", {
          className: "section",
          style: {
            margin: 0
          }
        }, UserStore.getUser().email || UserStore.getUser().fullName || t.s("settings")), a, React.createElement("div", {
          className: "item " + (UserStore.isLogged() ? "" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "settings",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("settings") + " " + t.s("und") + " " + t.s("profile").toLowerCase()), React.createElement("a", {
          href: e,
          target: n,
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "item " + (-1 == (window.environment || []).indexOf("clipper") && -1 == (window.environment || []).indexOf("mac") ? "" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "web",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("background")), React.createElement("a", {
          href: "#/interface",
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "separator"
        }), React.createElement("div", {
          className: "item " + (UserStore.isLogged() ? "" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "import",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("importBookmarks")), React.createElement("a", {
          href: e + "/import",
          target: n,
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "item " + (UserStore.isLogged() ? "" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "export",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("exportBookmarks")), React.createElement("a", {
          href: e + "/export",
          target: n,
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "separator"
        }), React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "install",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("install"), React.createElement("div", {
          style: {
            fontSize: "13px",
            opacity: ".7"
          }
        }, t.s("browserExtension"), React.createElement("br", null), t.s("und"), " ", t.s("mobileApp").toLowerCase())), React.createElement("a", {
          href: e + "/install",
          target: n,
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "help",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("help")), React.createElement("a", {
          href: e + "/help",
          target: n,
          className: "permalink",
          onClick: this.handleClick
        })), React.createElement("div", {
          className: "item " + (UserStore.isLogged() ? "actions" : "hidden")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: "exit",
          size: "mac"
        })), React.createElement("div", {
          className: "title"
        }, t.s("logOut")), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleLogOut
        })))) : null
      }
    })
  }, {
    "../../../actions/User": 14,
    "./Mixin": 78
  }],
  80: [function (e, t, n) {
    var a = e("../Helpers/Cover"),
      o = e("../Helpers/Favicon");
    t.exports = React.createClass({
      displayName: "Search/Item",
      getInitialState: function () {
        return {
          item: this.props.item,
          active: this.props.active,
          index: this.props.index
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          item: e.item,
          active: e.active,
          index: e.index
        })
      },
      handleClick: function (e) {
        var t = this.props.onClick(this.props.item.gist, "word" == this.props.item.gist ? this.props.item.title : this.props.item._id);
        t || e.preventDefault()
      },
      render: function () {
        function e(e) {
          return {
            __html: e
          }
        }
        var t = this.state.item.domain ? React.createElement(o, {
            domain: this.state.item.domain || "",
            className: "icon"
          }) : null,
          n = React.createElement(a, {
            src: this.state.item.image,
            className: "image",
            width: "100"
          });
        this.state.item.icon && (n = 0 == this.state.item.icon.indexOf("http") ? React.createElement("div", {
          className: "small-icon",
          style: {
            backgroundImage: "url('" + this.state.item.icon + "')"
          }
        }) : React.createElement(Icon, {
          name: this.state.item.icon
        }));
        var i = null;
        this.state.item.excerpt && (i = React.createElement("div", {
          className: "excerpt",
          dangerouslySetInnerHTML: e(this.state.item.excerpt || "")
        }));
        var s = "item searchResultItem";
        return this.state.active && (s += " active"), this.state.item.className && (s += " " + this.state.item.className), React.createElement("figure", {
          className: s,
          id: "searchResultItem_" + this.state.index
        }, React.createElement("div", {
          className: "cover"
        }, n, t), React.createElement("figcaption", {
          className: "about"
        }, React.createElement("div", {
          className: "title",
          dangerouslySetInnerHTML: e(this.state.item.title)
        }), i), React.createElement("a", {
          href: this.state.item.link || null,
          className: "permalink searchResultItemLink",
          id: "searchResultItemLink_" + this.state.index,
          onClick: this.state.item.link ? null : this.handleClick,
          "data-noclick": !this.state.item.link,
          onMouseDown: this.state.item.link ? null : this.handleClick
        }))
      }
    })
  }, {
    "../Helpers/Cover": 40,
    "../Helpers/Favicon": 42
  }],
  81: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "Search/Mini",
      getInitialState: function () {
        return {
          query: ""
        }
      },
      componentDidMount: function () {
        React.findDOMNode(this.refs.input).addEventListener("keyup", this.handleKey)
      },
      componentWillUnmount: function () {
        React.findDOMNode(this.refs.input).removeEventListener("keyup", this.handleKey)
      },
      handleKey: function (e) {
        27 == e.keyCode && this.handleReset(e)
      },
      handleChange: function (e) {
        this.isMounted() && this.setState({
          query: e.target.value || ""
        })
      },
      handleSubmit: function (e) {
        e.preventDefault(), this.props.onChange(this.state.query)
      },
      handleReset: function (e) {
        e.preventDefault(), e.stopPropagation(), React.findDOMNode(this.refs.input).value = "", this.isMounted() && this.setState({
          query: ""
        }), this.props.onChange("")
      },
      render: function () {
        return React.createElement("form", {
          className: "mini-search",
          onSubmit: this.handleSubmit
        }, React.createElement("label", null, React.createElement(Icon, {
          name: "search",
          size: "mac"
        }), React.createElement("input", {
          type: "text",
          placeholder: t.s("defaultCollection-0") + (this.props.placeholder ? " (" + this.props.placeholder + ")..." : ""),
          ref: "input",
          onChange: this.handleChange
        }), React.createElement("a", {
          href: "",
          className: "action-icon " + ("" == this.state.query ? "hidden" : ""),
          onClick: this.handleReset
        }, React.createElement(Icon, {
          name: "clear",
          size: "mac"
        }))))
      }
    })
  }, {}],
  82: [function (e, n, a) {
    e("../../../stores/Collections");
    n.exports = React.createClass({
      displayName: "Search/Query",
      getInitialState: function () {
        return {
          focus: !1
        }
      },
      changeQuery: function (e) {
        this.props.changeQuery(this.props.index, e.target.value)
      },
      handleClick: function (e) {
        e.preventDefault()
      },
      handleFocus: function () {
        this.isMounted() && this.setState({
          focus: !0
        })
      },
      handleBlur: function () {
        this.isMounted() && this.setState({
          focus: !1
        })
      },
      handleRemove: function (e) {
        e && e.preventDefault(), this.props.changeQuery(this.props.index, null)
      },
      handleKey: function (e) {
        switch (e.keyCode) {
          case 46:
          case 8:
            this.handleRemove(e);
            break;
          case 37:
            this.props.focusOnQuery(this.props.index - 1);
            break;
          case 39:
            this.props.focusOnQuery(this.props.index + 1);
            break;
          case 38:
          case 40:
            React.findDOMNode(this.refs.select).focus()
        }
      },
      render: function () {
        var e = "",
          n = !0,
          a = t.s("tags").substr(0, t.s("tags").length - 1),
          o = _.capitalize(t.s("all")),
          i = "";
        try {
          i = String(this.props.item.val)
        } catch (s) {}
        var r = i.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/)),
          c = i.match(new RegExp(/(image|video|link|article|note|document)/i));
        switch (this.props.item.key) {
          case "type":
            o = t.s("type"), i = t.s(this.props.item.val);
            break;
          case "domain":
            o = t.s("sites");
            break;
          case "tag":
            o = a;
            break;
          case "collection":
            o = t.s("collection"), i = t.s("inCollection"), i = i.charAt(0).toUpperCase() + i.slice(1), n = !1
        }
        this.state.focus && (e += " query-focus");
        var l = null;
        return n && (l = [React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        }), React.createElement("select", {
          ref: "select",
          tabIndex: "-1",
          value: this.props.item.key,
          onChange: this.changeQuery
        }, c ? React.createElement("option", {
          value: "type"
        }, t.s("type")) : null, React.createElement("option", {
          value: "tag"
        }, a), r ? React.createElement("option", {
          value: "domain"
        }, t.s("sites")) : null, React.createElement("option", {
          value: "word"
        }, _.capitalize(t.s("all"))))]), React.createElement("figure", {
          className: e
        }, n ? React.createElement("label", {
          className: "type"
        }, o, l) : null, React.createElement("a", {
          href: "",
          id: "focus-zone-" + this.props.index,
          onClick: this.handleClick,
          onDoubleClick: this.handleRemove,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyDown: this.handleKey,
          className: "text"
        }, i))
      }
    })
  }, {
    "../../../stores/Collections": 115
  }],
  83: [function (e, n, a) {
    var o = e("../Helpers/ScrollFixMixin.js"),
      i = e("./Item.js"),
      s = e("../../../stores/Stats"),
      r = e("../../../actions/Stats"),
      c = e("../../../actions/Tags"),
      l = e("../../../stores/Tags"),
      d = e("../../../actions/Sites"),
      m = e("../../../stores/Sites"),
      u = e("../../../stores/Collections"),
      h = 0,
      p = 0,
      f = function (e, t) {
        try {
          e = e.trim()
        } catch (n) {
          n && (e = "")
        }
        try {
          t = t.trim()
        } catch (n) {
          n && (t = "")
        }
        var a = S(t).escapeHTML().s;
        try {
          a = a.replace(new RegExp(e, "gi"), function (e) {
            return "<strong>" + e + "</strong>"
          })
        } catch (n) {
          n && (a = t)
        }
        return a
      };
    n.exports = React.createClass({
      displayName: "Search/Results",
      mixins: [o],
      _makeTag: function (e) {
        return {
          _id: e._id,
          title: e._id,
          excerpt: e.count,
          sort: e.count,
          icon: "tag",
          gist: "tag",
          className: "small"
        }
      },
      _makeSite: function (e) {
        return {
          _id: e._id,
          title: e._id,
          excerpt: e.count,
          sort: e.count,
          icon: network.favIcon(e._id),
          gist: "domain",
          className: "small"
        }
      },
      _makeType: function (e) {
        return {
          _id: e,
          title: t.s(e),
          icon: e,
          gist: "type",
          className: "small"
        }
      },
      _makeCollection: function (e, n) {
        var a = t.s("noBookmarks");
        return n.count && (a = (n.count || "") + " " + t.s("bookmarks")), {
          _id: n._id,
          titleStr: n.title,
          title: f(e, n.title),
          excerpt: a,
          image: (n.cover || [])[0] || "",
          sort: 4,
          link: "#/collection/" + n._id,
          gist: "collection"
        }
      },
      getDefaults: function (e) {
        e = (e || "").trim().toLowerCase();
        var n = this,
          a = function (e) {
            var t = -1;
            try {
              t = _.findIndex(n.state.items, {
                id: e
              })
            } catch (a) {}
            return t
          },
          o = [{
            title: t.s("tags"),
            className: "list",
            childrens: []
          }, {
            title: t.s("type"),
            className: "list",
            childrens: []
          }, {
            title: t.s("collections"),
            id: "collections",
            childrens: "" != e ? (this.state.items[a("collections")] || []).childrens || [] : []
          }, {
            title: t.s("elements"),
            id: "elements",
            childrens: "" != e ? (this.state.items[a("elements")] || []).childrens || [] : []
          }, {
            title: t.s("sites"),
            childrens: []
          }];
        return (consts.contentTypes || []).forEach(function (a) {
          var i = !0;
          "" != e && -1 == a.indexOf(e) && -1 == t.s(a).toLowerCase().indexOf(e) && (i = !1), i && o[1].childrens.push(n._makeType(a))
        }), (this.state.tags || []).forEach(function (t) {
          -1 != t._id.indexOf(e) && o[0].childrens.push(n._makeTag(t))
        }), "" != e && (this.state.sites || []).forEach(function (t) {
          -1 != t._id.indexOf(e) && o[4].childrens.push(n._makeSite(t))
        }), o
      },
      getInitialState: function () {
        return {
          index: -1,
          val: this.props.val || "",
          stat: s.getStat() || [],
          items: [],
          tags: l.getTags() || [],
          sites: m.getSites() || []
        }
      },
      componentDidMount: function () {
        this.unsubscribeTags = l.listen(this.onTagsChange), this.unsubscribeStats = s.listen(this.onStatsChange), this.unsubscribeSites = m.listen(this.onSitesChange), 0 == this.state.tags.length && c.load(), 0 == this.state.stat.length && r.load(), 0 == this.state.sites.length && d.load(), this.handleAutoComplete()
      },
      componentWillUnmount: function () {
        this.unsubscribeTags(), this.unsubscribeStats(), this.unsubscribeSites()
      },
      onStatsChange: function (e) {
        this.isMounted() && this.setState({
          stat: e
        }), this.handleAutoComplete()
      },
      onTagsChange: function (e) {
        this.isMounted() && this.setState({
          tags: e
        }), this.handleAutoComplete()
      },
      onSitesChange: function (e) {
        this.isMounted() && this.setState({
          sites: e
        }), this.handleAutoComplete()
      },
      handleResultsMouseOver: function () {
        h = 300
      },
      handleResultsMouseLeave: function () {
        h = 0
      },
      componentWillReceiveProps: function (e) {
        e.val = (e.val || "").trim(), e.val != this.state.val && (this.handleAutoComplete(e.val), this.isMounted() && this.setState({
          val: e.val
        }))
      },
      handleAutoComplete: function (e) {
        "undefined" == typeof e && (e = this.state.val), "" == e ? this.isMounted() && this.setState({
          items: this.getDefaults(),
          index: -1
        }) : (items = this.getDefaults(e), items.unshift({
          childrens: [{
            _id: "text",
            title: e,
            className: "small",
            icon: "search",
            gist: "word"
          }]
        }), this.findCollections(e), this.findBookmarks(e), this.isMounted() && this.setState({
          items: items,
          index: 0
        }));
        var t = document.getElementById("searchResults");
        t.scrollTop = 0
      },
      findCollections: function (e) {
        var t = [],
          n = this,
          a = _.filter(u.getCollections(), function (t) {
            return (t.title || "").toLowerCase().indexOf(e.toLowerCase()) >= 0
          });
        Api.get("childrens", function (o) {
          if (e == n.state.val) {
            (o.items || []).forEach(function (t) {
              (t.title || "").toLowerCase().indexOf(e.toLowerCase()) >= 0 && a.push(t)
            }), t = (a || []).map(function (t) {
              return n._makeCollection(e, t)
            }), t = _.orderBy(t, ["sort", "titleStr"], ["asc", "desc"]);
            var i = _.findIndex(n.state.items, {
              id: "collections"
            });
            n.state.items[i].childrens = t, n.isMounted() && n.setState({
              items: n.state.items
            })
          }
        })
      },
      findBookmarks: function (e) {
        var t = this,
          n = JSON.parse(JSON.stringify(this.props.queries));
        n.push({
          key: "word",
          val: e
        });
        var a = 0;
        n.length > 0 && "collection" === n[0].key && (a = n[0].val), Api.get("raindrops/" + a + "?search=" + JSON.stringify(n), function (n) {
          var a = (n.items || []).map(function (t) {
            var n = (t.tags || []).map(function (e) {
              return "#" + e
            });
            return n = (n || []).join(", "), {
              _id: t._id,
              titleStr: t.title,
              title: f(e, t.title),
              excerpt: f(e, t.excerpt + " " + n),
              domain: t.domain,
              image: t.cover || "",
              sort: (t.title.toLowerCase().indexOf(e.toLowerCase()) >= 0 ? 2 : 0) + ((t.excerpt || "").toLowerCase().indexOf(e.toLowerCase()) >= 0 ? 1 : 0),
              link: t.link,
              gist: "bookmark"
            }
          });
          a = _.orderBy(a, ["sort", "titleStr"], ["asc", "desc"]);
          var o = _.findIndex(t.state.items, {
            id: "elements"
          });
          t.state.items[o].childrens = a, t.isMounted() && t.setState({
            items: t.state.items
          })
        })
      },
      scrollTo: function (e) {
        var t = null;
        if ("top" == e && this.state.index > 0 && (t = this.state.index - 1), "bottom" == e && p - 1 > this.state.index && (t = this.state.index + 1), null != t) {
          var n = document.getElementById("searchResults"),
            a = document.getElementsByClassName("searchResultItem")[t],
            o = a.offsetTop;
          o - n.scrollTop + a.clientHeight > n.clientHeight && "bottom" == e ? n.scrollTop = n.scrollTop + a.clientHeight : o < n.scrollTop && "top" == e && (n.scrollTop = o), this.isMounted() && this.setState({
            index: t
          })
        }
      },
      clickActive: function () {
        var e = document.getElementsByClassName("searchResultItemLink")[this.state.index];
        e && e.click()
      },
      render: function () {
        var e = [],
          t = 0,
          n = this;
        return this.state.items.forEach(function (a, o) {
          if ((a.childrens || []).length > 0) {
            a.title && e.push(React.createElement("div", {
              className: "section",
              key: "group" + o
            }, a.title, " ", React.createElement("span", {
              className: "count"
            }, a.id ? a.childrens.length : null)));
            var s = [];
            a.childrens.forEach(function (e, a) {
              s.push(React.createElement(i, {
                item: e,
                active: t + a == n.state.index,
                index: t + a,
                key: "search_item_" + (e.gist || "") + e._id,
                onClick: n.props.addQuery
              }))
            }), t += s.length, s.length > 0 && e.push(React.createElement("div", {
              className: "childrens_" + (a.className || ""),
              key: "childrens" + o
            }, s))
          }
        }), p = t, React.createElement("div", {
          className: "search-results",
          id: "searchResults",
          ref: "div",
          onWheel: this.handleScroll,
          onMouseEnter: this.handleResultsMouseOver,
          onMouseLeave: this.handleResultsMouseLeave
        }, e)
      }
    })
  }, {
    "../../../actions/Sites": 10,
    "../../../actions/Stats": 11,
    "../../../actions/Tags": 12,
    "../../../stores/Collections": 115,
    "../../../stores/Sites": 121,
    "../../../stores/Stats": 122,
    "../../../stores/Tags": 123,
    "../Helpers/ScrollFixMixin.js": 48,
    "./Item.js": 80
  }],
  84: [function (e, n, a) {
    var o = e("./Query"),
      i = e("./Results"),
      s = e("../../../stores/Collections");
    n.exports = React.createClass({
      displayName: "Search/Search",
      cleanQueries: function (e) {
        if (e = e || [], 0 != s.getCurrentId() && -2 != s.getCurrentId()) {
          var t = {
            key: "collection",
            val: s.getCurrentId()
          };
          "collection" === (e[0] || {}).key ? e[0] = t : e.unshift(t)
        }
        return e
      },
      getInitialState: function () {
        return {
          val: "",
          focus: !1,
          reseted: !0,
          queries: this.cleanQueries(this.props.queries)
        }
      },
      componentWillReceiveProps: function (e) {
        this.isMounted() && this.setState({
          queries: this.cleanQueries(e.queries),
          val: e.val || ""
        })
      },
      changeQuery: function (e, t) {
        this.state.queries[e] && (null != t ? (this.state.queries[e].key = t, this.focusOnQuery(e)) : (React.findDOMNode(this.refs.searchInput).focus(), this.state.queries.splice(e, 1)), this.isMounted() && this.setState({
          queries: this.state.queries
        }), this.changeLocation())
      },
      focusOnQuery: function (e) {
        e = parseInt(e), console.log(e);
        var t = document.getElementById("focus-zone-" + e);
        t ? t.focus() : document.getElementById("searchInput").focus()
      },
      handleFocus: function () {
        _timeout = 0, this.isMounted() && this.setState({
          reseted: !0,
          focus: !0
        })
      },
      handleBlur: function () {
        var e = this;
        setTimeout(function () {
          e.isMounted() && e.setState({
            reseted: !0,
            focus: !1
          })
        }, _timeout)
      },
      handleKey: function (e) {
        var t = React.findDOMNode(this.refs.searchInput);
        switch (e.keyCode) {
          case 8:
            0 == t.selectionStart && 0 == t.selectionEnd && (e.preventDefault(), this.focusOnQuery(this.state.queries.length - 1));
            break;
          case 37:
            0 == t.selectionStart && 0 == t.selectionEnd && (e.preventDefault(), this.focusOnQuery(this.state.queries.length - 1));
            break;
          case 38:
            e.preventDefault(), this.refs.results.scrollTo("top");
            break;
          case 40:
            e.preventDefault(), this.refs.results.scrollTo("bottom");
            break;
          case 27:
            0 == this.state.queries.length && "" == this.state.val ? this.handleFormReset() : t.blur()
        }
      },
      handleType: function (e) {
        var t = e.target.value || "";
        this.isMounted() && this.setState({
          val: t
        })
      },
      addQuery: function (e, t) {
        var n = !0;
        return e = e || "word", this.state.queries.forEach(function (a) {
          a.key == e && a.val == t && (n = !1)
        }), n && (this.state.queries.push({
          key: e,
          val: t
        }), this.isMounted() && this.setState({
          queries: this.state.queries,
          val: "",
          reseted: !0
        }), this.refs.results.setState({
          index: -1
        }), this.changeLocation()), n
      },
      changeLocation: function () {
        var e = 0;
        this.state.queries.length > 0 && "collection" === this.state.queries[0].key && (e = this.state.queries[0].val), window.location = "#/collection/" + e + "/" + encodeURIComponent(JSON.stringify(this.state.queries))
      },
      handleSubmit: function (e) {
        e.preventDefault(), this.refs.results.clickActive()
      },
      handleFormReset: function (e) {
        e && e.preventDefault();
        var t = document.getElementById("searchForm");
        t && t.reset(), this.isMounted() && this.setState({
          val: "",
          reseted: !0
        }), "undefined" != typeof this.props.onSearchReset && this.props.onSearchReset()
      },
      handleNotReseted: function () {
        this.state.focus && this.isMounted() && this.setState({
          reseted: !this.state.reseted
        })
      },
      render: function () {
        var e = "search-form",
          n = this;
        "" == this.state.val && this.state.reseted && (e += " search-empty"), this.state.focus && (e += " search-show-results");
        var a = this.state.queries.map(function (e, t) {
          return React.createElement(o, {
            key: "query_" + t,
            index: t,
            item: e,
            changeQuery: n.changeQuery,
            focusOnQuery: n.focusOnQuery
          })
        });
        return React.createElement("div", {
          className: e
        }, React.createElement("form", {
          onSubmit: this.handleSubmit,
          id: "searchForm"
        }, React.createElement("div", {
          className: "queries"
        }, React.createElement(Icon, {
          name: "search",
          size: "mac"
        }), a, React.createElement("input", {
          ref: "searchInput",
          className: "search-input",
          id: "searchInput",
          type: "search",
          name: "q",
          value: this.state.val,
          onMouseDown: this.handleNotReseted,
          onChange: this.handleType,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyDown: this.handleKey,
          autoComplete: "off",
          placeholder: t.s("defaultCollection-0"),
          autoFocus: this.props.autoFocus || !1
        }), a.length > 0 || this.state.focus || this.props.autoFocus ? React.createElement("a", {
          href: "",
          className: "action-icon",
          onMouseDown: this.handleFormReset,
          onClick: this.handleFormReset,
          "data-noclick": "true"
        }, React.createElement(Icon, {
          name: "clear",
          size: "mac"
        })) : null), React.createElement(i, {
          ref: "results",
          val: this.state.val,
          queries: this.state.queries,
          addQuery: this.addQuery
        })))
      }
    })
  }, {
    "../../../stores/Collections": 115,
    "./Query": 82,
    "./Results": 83
  }],
  85: [function (e, n, a) {
    var o = e("../../actions/Sidebar"),
      i = e("../../stores/Sidebar"),
      s = (e("../../actions/Collections"), e("../../stores/Collections")),
      r = e("../../actions/Bookmarks"),
      c = e("../../actions/User"),
      l = e("../../stores/Stats"),
      d = e("../../actions/Stats"),
      m = e("../components/Helpers/OverflowScroll"),
      u = e("../components/Popovers/Settings"),
      h = e("./Sidebar/Group"),
      p = e("./Sidebar/Collection");
    n.exports = React.createClass({
      displayName: "Sidebar",
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        return {
          collections: s.getCollections(),
          user: UserStore.getUser(),
          open: i.getState(),
          stat: l.getStat(),
          settingsPopover: !1
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e
        })
      },
      onCollectionsChange: function (e) {
        this.isMounted() && this.setState({
          collections: e
        })
      },
      onSidebarChange: function (e) {
        this.isMounted() && this.setState({
          open: e
        })
      },
      onStatsChange: function (e) {
        this.isMounted() && this.setState({
          stat: e
        })
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange), this.unsubscribeCollections = s.listen(this.onCollectionsChange), this.unsubscribeSidebar = i.listen(this.onSidebarChange), this.unsubscribeStats = l.listen(this.onStatsChange), d.load(), window.addEventListener("macMainMenu", this.handleSettingsPopoverShow, !0), window.addEventListener("macAdd", this.defaultMacFab, !0)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser(), this.unsubscribeCollections(), this.unsubscribeSidebar(), this.unsubscribeStats(), window.removeEventListener("macMainMenu", this.handleSettingsPopoverShow, !0), window.removeEventListener("macAdd", this.defaultMacFab, !0)
      },
      defaultMacFab: function (e) {
        window.macAdd || UserStore.isLogged() && Pop.show("fab")
      },
      handleSidebarOpen: function (e) {
        e.preventDefault(), o.change(!this.state.open)
      },
      handleGroupToggle: function (e) {
        c.toggleGroup({
          id: e
        })
      },
      handleMoveGroup: function (e, t) {
        UserStore.onSwapGroups({
          fromId: e,
          toId: t
        })
      },
      handleDropCollectionToGroup: function (e, t, n) {
        "childrens" != n && UserStore.onUpdateCollection({
          _id: e,
          group: t,
          toTop: !0
        })
      },
      handleMoveCollection: function (e, t) {
        UserStore.onSwapCollections({
          fromId: e,
          toId: t
        })
      },
      handleDropBookmark: function (e, n) {
        r.updateBookmark({
          item: {
            _id: e,
            collectionId: n
          },
          showingCollectionId: parseInt(s.getCurrentId()),
          successMessage: t.s("moveSuccess")
        })
      },
      handleGroupNewCollectionModalOpen: function (e) {
        if ("number" == typeof e) t = e;
        else {
          e.preventDefault();
          var t = parseInt(e.target.getAttribute("data-group"))
        }
        Pop.show("collection", {
          group: t,
          pin: "side-group-" + t
        })
      },
      handleSignIn: function (e) {
        e.preventDefault(), c.signIn(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleSignUp: function (e) {
        e.preventDefault(), c.signUp(function () {
          location.hash = "#/", location.reload()
        })
      },
      handleSettingsPopoverShow: function (e) {
        e.preventDefault(), this.isMounted() && this.setState({
          settingsPopover: !this.state.settingsPopover
        })
      },
      handleSettingsPopoverClose: function () {
        this.isMounted() && this.setState({
          settingsPopover: !1
        })
      },
      handleNewGroup: function (e) {
        e.preventDefault(), Pop.show("group", {
          id: -1,
          pin: "sidebar-new-group"
        })
      },
      renderLink: function (e) {
        return React.createElement("figure", {
          id: e.id || null,
          className: "card collection " + (-1 != window.location.href.indexOf(e.href || {}) ? "active" : "")
        }, React.createElement("div", {
          className: "icon"
        }, React.createElement(Icon, {
          name: e.icon
        })), React.createElement("figcaption", {
          className: "about"
        }, e.title), React.createElement("a", {
          href: e.href || "",
          onClick: e.onClick,
          className: "permalink"
        }))
      },
      render: function () {
        var e = null,
          n = this;
        e = React.createElement(Icon, {
          key: "avatar",
          name: "settings",
          size: -1 != (window.environment || []).indexOf("mac") ? "mac" : ""
        });
        var a = null;
        if (this.state.open || -1 != (window.environment || []).indexOf("clipper"))
          if (UserStore.isLogged()) {
            var o = (this.state.user.groups || []).map(function (e) {
              var a = [];
              return e.hidden || ((e.collections || []).forEach(function (e) {
                var t = s.getCollection(e);
                null != t && a.push(React.createElement(p, React.__spread({}, t, {
                  key: "collection_" + t._id,
                  onMove: n.handleMoveCollection,
                  onDropBookmark: n.handleDropBookmark
                })))
              }), 0 == a.length && a.push(React.createElement("figure", {
                className: "card collection",
                key: "empty_" + e.id
              }, React.createElement("div", {
                className: "icon"
              }, React.createElement(Icon, {
                name: "folder-add"
              })), React.createElement("figcaption", {
                className: "about"
              }, t.s("createFirstCollection"), "..."), React.createElement("a", {
                href: "",
                "data-group": e.id,
                onClick: n.handleGroupNewCollectionModalOpen,
                id: "newCollectionGroup" + e.id,
                className: "permalink"
              })))), React.createElement("section", {
                key: "sec_" + e.id,
                className: e.hidden ? "section-hidden" : ""
              }, React.createElement(h, React.__spread({}, e, {
                key: "group_" + e.id,
                onToggle: n.handleGroupToggle,
                onMove: n.handleMoveGroup,
                onDrop: n.handleDropCollectionToGroup
              })), a)
            });
            o.unshift(React.createElement("section", {
              key: "sec_defaults_first"
            }, React.createElement(p, React.__spread({}, s.getCollection(0), {
              key: "d0"
            })), React.createElement(p, React.__spread({}, s.getCollection(-1), {
              onDropBookmark: n.handleDropBookmark,
              key: "d-1"
            })))), o.push(React.createElement("section", {
              key: "sec_add_group"
            }, React.createElement("figure", {
              className: "card group",
              id: "sidebar-new-group"
            }, React.createElement("figcaption", {
              className: "about"
            }, t.s("createGroup")), React.createElement("a", {
              href: "",
              className: "permalink group-permalink",
              onClick: this.handleNewGroup
            })))), o.push(React.createElement("section", {
              key: "sec_defaults_last"
            }, this.renderLink({
              icon: "auto",
              title: t.s("tools"),
              href: "#/tools"
            }), React.createElement(p, React.__spread({}, s.getCollection(-2), {
              onDropBookmark: n.handleDropBookmark,
              key: "d-2"
            })), React.createElement(p, React.__spread({}, s.getCollection(-99), {
              onDropBookmark: n.handleDropBookmark,
              key: "d-99"
            })))), a = React.createElement("div", {
              className: "collections-list"
            }, o)
          } else a = React.createElement("div", {
            className: "collections-list"
          }, React.createElement("section", null, this.renderLink({
            icon: "person",
            title: t.s("signIn"),
            onClick: this.handleSignIn
          }), this.renderLink({
            icon: "person-add",
            title: t.s("signUp"),
            onClick: this.handleSignUp
          })), React.createElement("section", null, this.renderLink({
            icon: "help",
            title: t.s("help"),
            href: network.settingsURL() + "/help"
          }), this.renderLink({
            icon: "install",
            title: t.s("install"),
            href: network.settingsURL() + "/install"
          })));
        var i = null; - 1 == (window.environment || []).indexOf("mac") && (i = React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleSidebarOpen
        }, React.createElement(Icon, {
          name: "menu"
        })));
        var r = React.createElement("header", null, i, React.createElement("div", {
            className: "header-center"
          }, React.createElement("div", {
            id: "settings-popover-link",
            className: this.state.open ? "header-user-block" : "hidden",
            onClick: this.handleSettingsPopoverShow
          }, React.createElement("img", {
            key: "avatar",
            className: "icn icn-circle pull-right",
            src: "https://www.gravatar.com/avatar/" + this.state.user.email_MD5 + "?d=mm&s=48"
          }), this.state.user.fullName || t.s("settings"), " ", React.createElement(Icon, {
            name: "arrow-down",
            size: "small"
          })))),
          c = "settings-popover-link";
        return -1 != (window.environment || []).indexOf("mac") && (c = "mac-settings-placeholder"), React.createElement(m, null, r, React.createElement("div", {
          id: "mac-settings-placeholder"
        }), a, React.createElement(u, {
          onClose: this.handleSettingsPopoverClose,
          show: this.state.settingsPopover,
          attachId: c,
          position: ""
        }))
      }
    })
  }, {
    "../../actions/Bookmarks": 2,
    "../../actions/Collections": 4,
    "../../actions/Sidebar": 9,
    "../../actions/Stats": 11,
    "../../actions/User": 14,
    "../../stores/Collections": 115,
    "../../stores/Sidebar": 120,
    "../../stores/Stats": 122,
    "../components/Helpers/OverflowScroll": 46,
    "../components/Popovers/Settings": 79,
    "./Sidebar/Collection": 86,
    "./Sidebar/Group": 87
  }],
  86: [function (e, n, a) {
    var o = e("../../../stores/Collections"),
      i = (e("../../../stores/Parents"), e("../../../modules/ReactDND").DragDropMixin),
      s = e("../Collections/ItemDragDropMixin"),
      r = e("../Popovers/Collection");
    n.exports = React.createClass({
      displayName: "Sidebar/Collection",
      mixins: [i, s],
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        return {
          showPopover: !1,
          mousePos: !1
        }
      },
      handleMore: function (e) {
        "object" == typeof e && e.preventDefault(), this.isMounted() && this.setState({
          showPopover: !0,
          mousePos: !e.target.classList.contains("icon-more")
        })
      },
      handleEdit: function (e, t) {
        "object" == typeof e && e.preventDefault(), Pop.show("collection", {
          id: this.props._id,
          pin: "side-collection-" + this.props._id,
          step: t
        })
      },
      handleSharing: function (e) {
        "object" == typeof e && e.preventDefault(), Pop.show("collection", {
          id: this.props._id,
          pin: "side-collection-" + this.props._id,
          step: "sharing"
        })
      },
      handleSubFolder: function (e) {
        "object" == typeof e && e.preventDefault(), Pop.show("collection", {
          parentId: this.props._id,
          pin: "side-collection-" + this.props._id
        })
      },
      handlePopoverClose: function () {
        this.isMounted() && this.setState({
          showPopover: !1
        })
      },
      handleRemove: function (e) {
        "object" == typeof e && e.preventDefault(), o.onRemoveCollection({
          item: this.props
        })
      },
      render: function () {
        var e = "";
        try {
          e = network.fixURL(this.props.cover[0])
        } catch (n) {}
        var a = null;
        a = -2 != this.props._id ? "#/collection/" + this.props._id : -1 != (window.environment || []).indexOf("mac") || -1 != (window.environment || []).indexOf("clipper") ? "#/collection/-2" : -1 != (window.environment || []).indexOf("web") ? "#/dashboard" : "#/";
        var i = o.getCurrentId() == this.props._id,
          s = "card collection" + (i ? " active" : ""),
          c = null;
        i && this.props.color && this.props._id > 0 && (c = {
          color: this.props.color
        }), this.getDragState("collection").isDragging && (s += " no-opacity"), this.getDropState("bookmark").isHovering && (s += " drag-hover");
        var l = null,
          d = null;
        this.props.collaborators && this.props.author ? l = React.createElement(Icon, {
          name: "shared",
          size: "small"
        }) : this.props.collaborators && !this.props.author && (l = React.createElement(Icon, {
          name: "public",
          size: "small"
        }));
        var m = null;
        this.props.author ? m = React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleSharing,
          title: t.s("sharing")
        }, React.createElement(Icon, {
          name: "share",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleSubFolder,
          title: t.s("createSubFolder")
        }, React.createElement(Icon, {
          name: "folder-add",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleEdit,
          id: "side-collection-more-" + this.props._id,
          title: t.s("collectionEdit")
        }, React.createElement(Icon, {
          name: "settings",
          size: "mac"
        }))) : this.props._id > 0 && (m = React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleSharing,
          title: t.s("sharing")
        }, React.createElement(Icon, {
          name: "share",
          size: "mac"
        })))), -99 == this.props._id && (m = React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleRemove
        }, React.createElement(Icon, {
          name: "trash",
          size: "mac"
        }))));
        var u = null;
        return u = !e || this.props._id <= 0 ? React.createElement(Icon, {
          name: network.defaultIcons(this.props._id)
        }) : React.createElement("img", {
          src: e,
          alt: ""
        }), React.createElement("figure", React.__spread({}, this.dragSourceFor("collection"), this.dropTargetFor("collection", "bookmark"), {
          onContextMenu: this.handleMore,
          className: s,
          style: c,
          ref: "collection",
          id: "side-collection-" + this.props._id
        }), React.createElement("div", {
          className: "icon"
        }, u), React.createElement("figcaption", {
          className: "about"
        }, this.props.title), React.createElement("div", {
          className: "info"
        }, l, d), React.createElement("div", {
          className: "count"
        }, this.props.count || null), m, React.createElement("a", {
          href: a,
          className: "permalink"
        }), React.createElement(r, React.__spread({
          position: this.state.mousePos ? "left" : "",
          onClose: this.handlePopoverClose,
          show: this.state.showPopover,
          attachId: "more-" + this.props._id
        }, {
          collection: this.props
        }, {
          onlyBasic: !0,
          handleEdit: this.handleEdit,
          handleRemove: this.handleRemove,
          mousePos: this.state.mousePos
        })))
      }
    })
  }, {
    "../../../modules/ReactDND": 102,
    "../../../stores/Collections": 115,
    "../../../stores/Parents": 118,
    "../Collections/ItemDragDropMixin": 32,
    "../Popovers/Collection": 75
  }],
  87: [function (e, n, a) {
    var o = e("../../../modules/ReactDND").DragDropMixin,
      i = e("../Collections/GroupTabDragDropMixin"),
      s = e("react/addons").addons.PureRenderMixin;
    n.exports = React.createClass({
      displayName: "Sidebar/Group",
      mixins: [o, i, s],
      onToggleGroup: function (e) {
        e.preventDefault(), this.props.onToggle(this.props.id)
      },
      handleMore: function (e) {
        e.preventDefault(), Pop.show("group", {
          id: this.props.id,
          pin: "side-group-" + this.props.id
        })
      },
      handleAdd: function (e) {
        e.preventDefault(), Pop.show("collection", {
          group: this.props.id,
          pin: "side-group-" + this.props.id
        })
      },
      render: function () {
        return React.createElement("figure", React.__spread({
          className: "card group " + (this.props.hidden ? "closed" : "open"),
          onContextMenu: this.handleMore
        }, this.dropTargetFor("collection", "group"), this.dragSourceFor("group"), {
          "data-id": this.props.id,
          ref: "group",
          id: "side-group-" + this.props.id
        }), React.createElement("figcaption", {
          className: "about"
        }, this.props.title), React.createElement("div", {
          className: "status" + (this.props.hidden ? "" : " invisible")
        }, React.createElement(Icon, {
          name: "arrow-down",
          size: "small"
        })), React.createElement("div", {
          className: "more"
        }, React.createElement("a", {
          href: "",
          className: "action-icon icon-more",
          onClick: this.handleMore,
          title: t.s("edit")
        }, React.createElement(Icon, {
          name: "edit",
          size: "mac"
        })), React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleAdd,
          title: t.s("createNewCollection")
        }, React.createElement(Icon, {
          name: "folder-add",
          size: "mac"
        }))), React.createElement("a", {
          href: "",
          className: "permalink group-permalink",
          onClick: this.onToggleGroup
        }))
      }
    })
  }, {
    "../../../modules/ReactDND": 102,
    "../Collections/GroupTabDragDropMixin": 30,
    "react/addons": "react/addons"
  }],
  88: [function (e, t, n) {
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
    "../../stores/Toast": 124
  }],
  89: [function (e, t, n) {
    var a = e("../../actions/Sidebar");
    t.exports = React.createClass({
      displayName: "UnifiedTitleBar",
      handleSidebar: function (e) {
        e && e.preventDefault(), a.change(!0)
      },
      render: function () {
        var e = this,
          t = this.props.path.map(function (t, n) {
            return n == e.props.path.length - 1 ? React.createElement("li", {
              className: "item active"
            }, t.title) : [React.createElement("li", {
              className: "item"
            }, React.createElement("a", {
              href: t.href
            }, t.title)), React.createElement("li", {
              className: "item separator"
            }, React.createElement(Icon, {
              name: "chevron-right",
              size: "small"
            }))]
          });
        return -1 != (window.environment || []).indexOf("clipper") ? React.createElement("div", {
          className: "clipper-toolbar"
        }, React.createElement("header", null, React.createElement("section", {
          className: "menu"
        }, React.createElement("a", {
          href: "#/",
          className: "action-icon"
        }, React.createElement(Icon, {
          name: "back"
        }))), React.createElement("section", {
          className: "navigation"
        }, t.length > 1 ? React.createElement("ul", {
          className: "path"
        }, t.splice(0, 1)) : null, React.createElement("h1", null, this.props.path[this.props.path.length - 1].title)))) : -1 != (window.environment || []).indexOf("mac") ? React.createElement("div", null) : React.createElement("div", {
          className: "collection-toolbar unified-titlebar"
        }, React.createElement("div", {
          className: "breadcrumbs-wrap"
        }, React.createElement("ul", {
          className: "breadcrumbs"
        }, React.createElement("li", {
          className: "item"
        }, React.createElement("a", {
          href: "#/",
          className: "action-icon"
        }, React.createElement(Icon, {
          name: "home"
        }))), React.createElement("li", {
          className: "item separator"
        }, React.createElement(Icon, {
          name: "chevron-right",
          size: "small"
        }))), React.createElement("ul", {
          className: "breadcrumbs"
        }, t)))
      }
    })
  }, {
    "../../actions/Sidebar": 9
  }],
  90: [function (e, t, n) {
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
            i = null;
          try {
            localStorage.getItem(o)
          } catch (s) {}
          if (null == i) {
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
          } else a(i)
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
  91: [function (e, t, n) {
    t.exports = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg width="500px" height="250px" viewBox="0 0 500 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n    <!-- Generator: Sketch 3.3.1 (12002) - http://www.bohemiancoding.com/sketch -->\n    <title>bookmarks</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="bookmarks" sketch:type="MSArtboardGroup">\n            <circle id="Oval-1" stroke="#DCDCDC" fill="#FFFFFF" sketch:type="MSShapeGroup" cx="250" cy="151" r="87"></circle>\n            <circle id="Oval-4" stroke="#DCDCDC" sketch:type="MSShapeGroup" cx="250" cy="151" r="237"></circle>\n            <circle id="Oval-7" stroke="#DCDCDC" sketch:type="MSShapeGroup" cx="250" cy="151" r="157"></circle>\n            <path d="M252.645968,135.706433 L280,136 L280,130.998101 C280,129.886706 279.103546,129 277.997715,129 L247,129 L252.269167,135.534166 C251.686895,135.237645 251.160069,134.824097 250.833302,134.366623 L243.166698,123.633377 C242.523564,122.732989 241.10853,122 240.008845,122 L221.991155,122 C220.889674,122 220,122.894047 220,123.99691 L220,173.00309 C220,174.102324 220.893777,175 221.996307,175 L278.003693,175 C279.10527,175 280,174.10406 280,172.998861 L280,136 L253.991244,136 C253.570798,136 253.101239,135.891461 252.645968,135.706433 Z" id="Oval-4" stroke="#848484" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" sketch:type="MSShapeGroup"></path>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(413.000000, 196.000000)">\n                <circle id="Oval-1" fill="#1DD3AB" sketch:type="MSShapeGroup" cx="22" cy="22" r="22"></circle>\n                <path d="M10.3125,10.3125 L12.4377185,33.7925926 L21.9667342,36.4375 L31.5622815,33.7925926 L33.6875,10.3125 L10.3125,10.3125 L10.3125,10.3125 Z M29.0718346,17.9702351 L17.8831956,17.9702351 L18.1316774,20.9260301 L28.823416,20.9260301 L27.9925924,29.8080324 L22.0328231,31.4246723 L22.0328231,31.4413426 L21.9667342,31.4413426 L15.9568131,29.8080324 L15.5915847,25.2688137 L18.4969058,25.2688137 L18.7125645,27.555 L21.9667342,28.4204839 L25.2368411,27.555 L25.6025122,23.8324363 L15.4424576,23.8324363 L14.662355,15.1131554 L29.3377083,15.1131554 L29.0718346,17.9702351 L29.0718346,17.9702351 Z" id="Shape" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(260.000000, 192.000000)">\n                <path d="M32,64 C49.673112,64 64,49.673112 64,32 C64,14.326888 49.673112,0 32,0 C14.326888,0 0,14.326888 0,32 C0,49.673112 14.326888,64 32,64 Z" id="Oval-6" fill="#FF3B30" sketch:type="MSShapeGroup"></path>\n                <path d="M17.4011461,42.3443502 C14.9770774,42.3443502 13,44.2876284 13,46.6721751 C13,49.0567218 14.9770774,51 17.4011461,51 L20.5988539,51 C21.9140401,51 23.0830946,50.4229567 23.8911175,49.523448 C23.8997135,49.514962 23.9169054,49.514962 23.9255014,49.5064761 C23.9770774,49.4555605 24.0114613,49.3791871 24.0544413,49.3282715 C24.1661891,49.1924967 24.269341,49.0567218 24.3553009,48.903975 C25.1719198,47.6989728 25.5587393,46.1121036 25.5587393,44.8986155 L25.5587393,28.1558732 L25.5587393,28.0116123 L25.5587393,27.8758374 C25.6275072,26.6708352 26.52149,25.6949531 27.7163324,25.4234033 C27.8624642,25.3894596 28.1805158,25.3215721 28.1805158,25.3215721 L41.0659026,22.9115677 C41.1260745,22.9030817 41.1776504,22.8945958 41.2378223,22.8861099 C41.3065903,22.8776239 41.3667622,22.8776239 41.4441261,22.8776239 C42.4842407,22.8776239 43.2578797,23.6837874 43.2578797,24.6766414 L43.2578797,35.827155 C43.2578797,37.9910674 43.5071633,38.534167 39.7765043,38.534167 L38.0487106,38.534167 C35.6160458,38.534167 33.6475645,40.4774453 33.6475645,42.861992 C33.6475645,45.2465386 35.6160458,47.1898169 38.0487106,47.1898169 L41.2464183,47.1898169 C42.8108883,47.1898169 44.1776504,46.3921393 44.9598854,45.1871371 C44.9598854,45.1786512 44.9684814,45.1871371 44.9770774,45.1871371 C45.7507163,44.1518535 46,42.5904422 46,40.4944172 L46,14.7990174 C46,13.8061635 45.1489971,13 44.1088825,13 C44.0487106,13 43.9885387,13.0084859 43.9369628,13.0084859 L43.6704871,13.0509156 L24.974212,16.5471192 C23.7879656,16.8610987 22.713467,17.9812416 22.6275072,19.2117017 L22.6275072,19.2286735 L22.6275072,19.2456454 L22.6275072,40.4689594 C22.6275072,41.6485038 22.7994269,42.3528361 18.5272206,42.3528361 L17.4011461,42.3528361 L17.4011461,42.3443502 Z" id="Shape" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(175.000000, 192.000000)">\n                <ellipse id="Oval-5" fill="#8F9BAC" sketch:type="MSShapeGroup" cx="32" cy="32" rx="32" ry="32"></ellipse>\n                <path d="M40,34 L24,34 L24,34 L24,36 L40,36 L40,34 L40,34 Z M46,34 L51,34 L51,36 L46,36 L46,34 L46,34 Z M18,34 L13,34 L13,36 L18,36 L18,34 L18,34 Z M39,21 L39,16.999615 C39,15.8874333 38.1019465,15 36.9941413,15 L27.0058587,15 C25.8970601,15 25,15.8952581 25,16.999615 L25,21 L15.0028592,21 C13.9018508,21 13,21.8987122 13,23.0073299 L13,45.9926701 C13,47.1016617 13.8967106,48 15.0028592,48 L48.9971408,48 C50.0981492,48 51,47.1012878 51,45.9926701 L51,23.0073299 C51,21.8983383 50.1032894,21 48.9971408,21 L39,21 L39,21 Z M37,21 L37,17 L27,17 L27,21 L37,21 Z M20,31 L22,31 L22,40 L20,40 L20,31 Z M42,31 L44,31 L44,40 L42,40 L42,31 Z" id="Rectangle-176" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(300.000000, 118.000000)">\n                <ellipse id="Oval-4" fill="#2196F3" sketch:type="MSShapeGroup" cx="32" cy="32" rx="32" ry="32"></ellipse>\n                <path d="M12,34.1732174 L12,28.5945557 C12,28.0834182 12.4084444,27.6654639 12.9088889,27.6654639 L22.5004444,27.6654639 L18.3244444,35.1032227 L12.9088889,35.1032227 C12.4084444,35.1032227 12,34.686182 12,34.1732174 L12,34.1732174 Z M18.8324444,45.5959303 L15.7715556,47.7272686 C15.3595556,48.0154972 15.0684444,47.8327849 15.1253333,47.3248449 L15.5337778,43.6783652 C15.5906667,43.1704252 15.9915556,42.9630468 16.4248889,43.21656 L18.7937778,44.607457 C19.2266667,44.8627974 19.2444444,45.3099856 18.8324444,45.5959303 L18.8324444,45.5959303 Z M19.5675556,43.5404175 L17.1986667,42.1495205 C16.7653333,41.8946369 16.6128889,41.3245747 16.8648889,40.8819543 L27.8342222,21.3381388 C28.0831111,20.894148 28.644,20.7383858 29.0768889,20.9960101 L31.4457778,22.3837096 C31.8791111,22.6413339 32.0284444,23.2118529 31.7795556,23.6544733 L20.8102222,43.1987456 C20.5617778,43.6422796 20.0004444,43.7943875 19.5675556,43.5404175 L19.5675556,43.5404175 Z M27.916,35.1032227 L32.092,27.6654639 L34.4964444,27.6654639 L37.8875556,35.1032227 L27.916,35.1032227 L27.916,35.1032227 Z M41.5168889,37.3231765 C40.5684444,36.8362484 35.8453333,25.6853199 34.6355556,22.7760842 C33.424,19.8668484 29.7662222,12.1230466 30.9497778,11.5200962 C31.7915556,11.0879817 34.8133333,17.186003 37.0786667,20.8470996 C39.3404444,24.5081963 44.0706667,33.9480245 44.6528889,35.0232861 C45.232,36.1008316 44.0955556,36.9997758 43.4635556,37.2683628 C42.8311111,37.5374066 42.4648889,37.8055368 41.5168889,37.3231765 L41.5168889,37.3231765 Z M44.6204444,42.4477982 L43.1933333,40.1410561 C42.8982222,39.6614365 43.0515556,39.068992 43.5302222,38.8159356 L44.8906667,38.1006171 C45.3702222,37.8498446 45.9706667,38.0531119 46.2257778,38.554657 L47.3515556,40.7704998 C47.6075556,41.2715882 47.4333333,41.9147353 46.9715556,42.1979392 L45.9991111,42.7931244 C45.5368889,43.0795258 44.916,42.9233069 44.6204444,42.4477982 L44.6204444,42.4477982 Z M49.8728889,48.4983143 C49.5746667,47.5212606 47.2982222,47.4563977 46.2791111,45.9846506 C45.2564444,44.517928 46.1017778,43.7624129 46.4564444,43.4134325 C50.5902222,41.0308648 49.8728889,48.4983143 49.8728889,48.4983143 L49.8728889,48.4983143 Z M52,34.1732174 C52,34.686182 51.5915556,35.1032227 51.0911111,35.1032227 L46.2897778,35.1032227 C46.2368889,34.8163645 46.1511111,34.5295062 46.0057778,34.2604625 C45.8808889,34.0316154 45.5648889,33.4145048 45.1248889,32.5539301 C44.4893333,31.3119436 43.5768889,29.5359805 42.5995556,27.6654639 L51.0902222,27.6654639 C51.5906667,27.6654639 51.9991111,28.0834182 51.9991111,28.5945557 L52,34.1732174 L52,34.1732174 Z" id="Shape" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(51.000000, 40.000000)">\n                <circle id="Oval-1" fill="#795548" sketch:type="MSShapeGroup" cx="22" cy="22" r="22"></circle>\n                <path d="M21.4495678,35.75 L21.4495678,22.5504324 L17.0353019,22.5504324 C16.8871731,26.3159998 15.2259067,29.6927963 12.6426509,32.0896735 C14.9727592,34.2516675 18.053009,35.6163873 21.4495678,35.75 L21.4495678,35.75 L21.4495678,35.75 Z M11.1128701,30.4171444 C9.4161037,28.225673 8.36634248,25.5079644 8.25,22.5504324 L15.9334939,22.5504324 C15.7854601,26.0108595 14.2483299,29.1114895 11.8655575,31.3088677 C11.8804422,31.3250641 11.3647441,30.7424542 11.1128701,30.4171444 L11.1128701,30.4171444 L11.1128701,30.4171444 Z M32.1344425,31.3088677 C34.2704964,28.9845945 35.6173119,25.9234864 35.75,22.5504324 L35.75,22.5504324 L28.0665061,22.5504324 C28.2145399,26.0108595 29.7516702,29.1114895 32.1344425,31.3088677 L32.1344425,31.3088677 L32.1344425,31.3088677 Z M31.3573491,32.0896735 C29.0272408,34.2516675 25.946991,35.6163873 22.5504324,35.75 L22.5504324,35.75 L22.5504324,22.5504324 L26.9646981,22.5504324 C27.1128269,26.3159998 28.7740933,29.6927963 31.3573491,32.0896735 L31.3573491,32.0896735 L31.3573491,32.0896735 Z M32.1344425,12.6911323 C34.2704965,15.0154055 35.6173119,18.0765136 35.75,21.4495678 L35.75,21.4495678 L28.0665061,21.4495678 C28.2145399,17.9891405 29.7516702,14.8885105 32.1344425,12.6911323 L32.1344425,12.6911323 L32.1344425,12.6911323 Z M31.3573494,11.9103267 C29.0272411,9.74833265 25.9469911,8.38361276 22.5504324,8.25 L22.5504324,21.4495678 L26.9646981,21.4495678 C27.1128269,17.6840002 28.7740933,14.3072037 31.3573491,11.9103265 L31.3573494,11.9103267 L31.3573494,11.9103267 Z M11.8655578,12.691132 C9.72950364,15.0154053 8.38268816,18.0765135 8.25,21.4495678 L8.25,21.4495678 L15.9334939,21.4495678 C15.7854601,17.9891405 14.2483299,14.8885105 11.8655575,12.6911323 L11.8655578,12.691132 L11.8655578,12.691132 Z M12.6426509,11.9103265 C14.9727592,9.74833255 18.053009,8.38361276 21.4495678,8.25 L21.4495678,8.25 L21.4495678,21.4495678 L17.0353019,21.4495678 C16.8871731,17.6840002 15.2259067,14.3072037 12.6426509,11.9103265 L12.6426509,11.9103265 L12.6426509,11.9103265 Z" id="basketball" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(135.000000, 118.000000)">\n                <ellipse id="Oval-7" fill="#5AC8FA" sketch:type="MSShapeGroup" cx="32" cy="32" rx="32" ry="32"></ellipse>\n                <path d="M50.3112727,15.6677619 C48.7270902,14.1258358 44.7614971,15.4917703 42.8629437,17.3396817 L35.640633,24.3773445 C34.9358669,23.741375 17.3886312,17.6516668 16.7598895,18.2616376 L14.470941,20.4875309 C13.8380899,21.1015015 13.8380899,22.0974537 14.470941,22.7114243 L27.2964498,32.5029551 L22.2418597,37.4247192 C21.8576286,37.8007012 21.3747714,38.3786735 20.865203,39.0606408 L20.6617866,38.8646502 C20.3412516,38.5526652 15.7345885,37.9866923 15.4119988,38.2986774 L14.2449227,39.4306231 C13.9243877,39.7446081 13.9243877,40.2505838 14.2449227,40.5625689 L14.8202419,41.1205421 L17.9043638,44.1183985 C17.2920598,45.6023273 17.0680962,46.8902656 17.6577984,47.466238 C18.2495553,48.0422104 19.5748442,47.822221 21.1014948,47.2222497 L24.140413,50.1781081 L24.7465529,50.76408 C25.0670879,51.0780649 25.5910393,51.0780649 25.9115743,50.76408 L27.0786504,49.6321342 C27.3991854,49.3201492 26.817702,44.8443637 26.4951123,44.5323786 L26.2958053,44.3383879 C26.9964619,43.8444116 27.5841094,43.376434 27.9662857,43.0044518 L33.0208759,38.0806878 L43.0848525,50.5240915 C43.7177037,51.1380621 44.7430047,51.1380621 45.3738011,50.5240915 L47.6627496,48.3001981 C48.2956007,47.6842276 42.0184573,30.6090459 41.3712232,29.9470776 L48.5873698,22.9174145 C50.4900326,21.0715029 51.8934005,17.2076881 50.3112727,15.6677619 L50.3112727,15.6677619 Z" id="Shape" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(260.000000, 44.000000)">\n                <ellipse id="Oval-3" fill="#FF9500" sketch:type="MSShapeGroup" cx="32" cy="32" rx="32" ry="32"></ellipse>\n                <path d="M22,31 L22,21 C22,15.4771525 26.4759382,11 32,11 L32,11 C37.5228475,11 42,15.4759382 42,21 L42,31" id="Rectangle-154" stroke="#FFFFFF" stroke-width="2" sketch:type="MSShapeGroup"></path>\n                <path d="M15.7794028,23.9853745 C15.9012353,22.8888824 16.8892617,22 18.0017433,22 L45.9982567,22 C47.103789,22 48.0998154,22.8983383 48.2205972,23.9853745 L50.7794028,47.0146255 C50.9012353,48.1111176 50.0981492,49 48.9971408,49 L15.0028592,49 C13.8967106,49 13.0998154,48.1016617 13.2205972,47.0146255 L15.7794028,23.9853745 Z" id="Rectangle-153" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n                <path d="M23,23 L23,28.5990195" id="Line" stroke="#FF9500" stroke-width="2" stroke-linecap="square" sketch:type="MSShapeGroup"></path>\n                <path d="M41,23 L41,28.5990195" id="Line-Copy" stroke="#FF9500" stroke-width="2" stroke-linecap="square" sketch:type="MSShapeGroup"></path>\n                <path d="M23,34 C24.6568542,34 26,32.6568542 26,31 C26,29.3431458 24.6568542,28 23,28 C21.3431458,28 20,29.3431458 20,31 C20,32.6568542 21.3431458,34 23,34 Z M41,34 C42.6568542,34 44,32.6568542 44,31 C44,29.3431458 42.6568542,28 41,28 C39.3431458,28 38,29.3431458 38,31 C38,32.6568542 39.3431458,34 41,34 Z" id="Oval-14" fill="#FF9500" sketch:type="MSShapeGroup"></path>\n            </g>\n            <g id="item" sketch:type="MSLayerGroup" transform="translate(175.000000, 44.000000)">\n                <ellipse id="Oval-2" fill="#FF3B30" sketch:type="MSShapeGroup" cx="32" cy="32" rx="32" ry="32"></ellipse>\n                <path d="M14,16.0023996 C14,14.8965048 14.8898926,14 15.9997073,14 L48.0002927,14 C49.1047006,14 50,14.8962786 50,16.0023996 L50,48.9976004 C50,50.1034952 49.1101074,51 48.0002927,51 L15.9997073,51 C14.8952994,51 14,50.1037214 14,48.9976004 L14,16.0023996 Z M16,16 L19,16 L19,19 L16,19 L16,16 Z M16,21 L19,21 L19,24 L16,24 L16,21 Z M16,26 L19,26 L19,29 L16,29 L16,26 Z M16,31 L19,31 L19,34 L16,34 L16,31 Z M16,36 L19,36 L19,39 L16,39 L16,36 Z M16,41 L19,41 L19,44 L16,44 L16,41 Z M16,46 L19,46 L19,49 L16,49 L16,46 Z M45,16 L48,16 L48,19 L45,19 L45,16 Z M45,21 L48,21 L48,24 L45,24 L45,21 Z M45,26 L48,26 L48,29 L45,29 L45,26 Z M45,31 L48,31 L48,34 L45,34 L45,31 Z M45,36 L48,36 L48,39 L45,39 L45,36 Z M45,41 L48,41 L48,44 L45,44 L45,41 Z M45,46 L48,46 L48,49 L45,49 L45,46 Z M21,16 L43,16 L43,31 L21,31 L21,16 Z M21,33 L43,33 L43,49 L21,49 L21,33 Z" id="Rectangle-154" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n            </g>\n        </g>\n    </g>\n</svg>';
  }, {}],
  92: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "exports",
      contextTypes: {
        router: React.PropTypes.func
      },
      componentDidMount: function () {
        this.context.router.transitionTo("/")
      },
      render: function () {
        return null
      }
    })
  }, {}],
  93: [function (e, n, a) {
    var o = e("../components/Bookmarks/List.js"),
      i = e("../components/Bookmarks/Masonry.js"),
      s = e("../components/Collections/Childrens.js"),
      r = e("../components/Search/Search.js"),
      c = e("react-infinite-scroll")(React),
      l = e("../components/Fab.js"),
      d = e("../components/Bookmarks/BatchEdit.js"),
      m = e("../components/Helpers/Tips.js"),
      u = e("../components/Helpers/ScrollFixMixin.js");
    if (-1 != (window.environment || []).indexOf("mac")) var h = e("../components/Collections/DesktopToolbar.js");
    else if (-1 != (window.environment || []).indexOf("clipper")) var h = e("../components/Collections/ClipperToolbar.js");
    else var h = e("../components/Collections/Toolbar.js");
    var p = e("../components/Modals/Viewer"),
      f = e("../../actions/Bookmarks"),
      g = e("../../stores/Bookmarks"),
      v = e("../../actions/Collections"),
      R = e("../../stores/Collections"),
      k = e("../../actions/Childrens"),
      C = e("../../stores/Childrens"),
      E = (e("../../actions/Parents"), e("../../stores/Parents")),
      w = e("../../modules/colorThief.js"),
      y = {};
    n.exports = React.createClass({
      displayName: "routes/Collection",
      mixins: [u],
      getInitialState: function () {
        return {
          bookmarks: g.getBookmarks(),
          childrens: [],
          collection: {},
          parents: [],
          viewerModal: {
            show: !1,
            id: 0
          }
        }
      },
      onUserChange: function (e) {
        this.isMounted() && this.setState({
          user: e
        })
      },
      onBookmarksChange: function (e) {
        this.isMounted() && this.setState({
          bookmarks: e
        }), this._hasMore = !0
      },
      onCollectionsChange: function (e) {
        if (this.isMounted()) {
          var t = R.getCollection(R.getCurrentId());
          null != t && (this.handleActionBarBackground(t.color || null), this.isMounted() && this.setState({
            collection: t
          }))
        }
      },
      onChildrensChange: function (e) {
        this.isMounted() && this.setState({
          childrens: e
        })
      },
      onParentsChange: function (e) {
        this.isMounted() && this.setState({
          parents: e
        })
      },
      componentWillReceiveProps: function (e) {
        this._checkViewer() || (this._hasMore = !1, this.isMounted() && (this.setState({
          bookmarks: [],
          childrens: [],
          collection: {}
        }), this.loadAll()))
      },
      _checkViewer: function () {
        var e = this.context.router.getCurrentQuery(),
          t = {
            id: parseInt(e.viewer || 0),
            show: parseInt(e.viewer || 0) > 0
          };
        return t.id != this.state.viewerModal.id || t.show != this.state.viewerModal.show ? (this.isMounted() && this.setState({
          viewerModal: t
        }), !0) : !1
      },
      loadAll: function () {
        R.onLoad();
        var e = {};
        try {
          e = this.context.router.getCurrentParams()
        } catch (t) {}
        y.cId != e.cId && (y.sort = 0 == e.cId || -99 == e.cId ? "lastUpdate" : "sort"), y.cId = e.cId, y.page = 0, y.search = !1, y.perpage = 40, y.search = {};
        try {
          y.search = decodeURIComponent(e.search || "{}")
        } catch (t) {} - 2 != e.cId && (y.speed = "async"), C.onLoad(y), R.onSetCurrent(e.cId), g.onLoad(y), E.onLoad({
          cId: e.cId
        })
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange), this.unsubscribeBookmarks = g.listen(this.onBookmarksChange), this.unsubscribeCollections = R.listen(this.onCollectionsChange), this.unsubscribeChildrens = C.listen(this.onChildrensChange), this.unsubscribeParents = E.listen(this.onParentsChange), this.loadAll(), this._checkViewer(), window.macAdd = !0, window.dropFiles = g.handleDropFiles
      },
      componentWillUnmount: function () {
        g.reset(), this.unsubscribeUser(), this.unsubscribeBookmarks(), this.unsubscribeCollections(), this.unsubscribeChildrens(), this.unsubscribeParents(), window.macAdd = !1, delete window.dropFiles
      },
      handleActionBarBackground: function (e) {
        try {
          var t = document.getElementsByClassName("currentCollectionBackground");
          if (t.length > 0)
            for (var n in t) t[n].classList.contains("icn") || (t[n].style.backgroundColor = e), t[n].style.fill = e
        } catch (a) {}
      },
      handleCollectionColor: function () {
        if ("undefined" == typeof this.state.collection._id) return !1;
        if (this.state.collection.color && null != this.state.collection.color) t = this.state.collection.color;
        else {
          var e = null,
            t = null;
          try {
            e = this.state.collection.cover[0]
          } catch (n) {}
          null != e && (t = Api.getItem("palette_" + e) || null, null == t && (t = w.getDarkPalette(React.findDOMNode(this.refs.collectionIcon)), "0,0,0" != t ? Api.setItem("palette_" + e, t) : t = null)), null != t && (t = "rgb(" + t + ")"), v.updateColorCollection({
            _id: this.state.collection._id,
            color: t
          })
        }
        this.handleActionBarBackground(t)
      },
      handleCollectionColorError: function () {
        this.handleActionBarBackground(null)
      },
      handleChangeView: function (e) {
        this.state.collection.view != e && (f.clearSelect(), v.updateCollection({
          item: {
            _id: this.state.collection._id,
            view: e
          },
          silent: !0
        }), this.isMounted() && this.componentWillReceiveProps())
      },
      handleSortChange: function (e) {
        y.sort = e, this.isMounted() && this.componentWillReceiveProps()
      },
      handleNextPage: function (e) {
        try {
          e.preventDefault()
        } catch (e) {}!g.getIsLoading() && !g.getIsNoMore() && this._hasMore && this.isMounted() && (y.page++, f.load(y))
      },
      handleSearchReset: function (e) {
        var t = !1;
        "undefined" != typeof y.search && 0 != y.search && (t = !0), t && (window.location.hash = "#/collection/" + y.cId)
      },
      contextTypes: {
        router: React.PropTypes.func
      },
      handleMoveCollection: function (e, t) {
        C.onSwapCollections({
          fromId: e,
          toId: t
        })
      },
      handleMoveCollectionEnd: function () {
        k.saveAllSort()
      },
      handleMoveBookmark: function (e, t) {
        g.onSwapBookmarks({
          fromId: e,
          toId: t,
          preservList: !0
        })
      },
      handleMoveBookmarkEnd: function () {
        f.syncMove()
      },
      handleDropBookmark: function (e, n) {
        f.updateBookmark({
          item: {
            _id: e,
            collectionId: n
          },
          successMessage: t.s("moveSuccess")
        })
      },
      handleSelectBookmark: function (e) {
        f.setSelected(e)
      },
      handleSelectBookmarksCancel: function () {
        f.clearSelect()
      },
      handleSelectAllBookmarks: function () {
        f.selectAll()
      },
      handleViewerModalClose: function () {
        this.context.router.transitionTo(this.context.router.getCurrentPathname())
      },
      mainContentScroll: function (e) {
        var t = this;
        this.handleScroll(e, function (e) {
          -1 != (window.environment || []).indexOf("clipper") && t.handleNextPage()
        })
      },
      render: function () {
        var e = null,
          n = null;
        "undefined" != typeof this.state.collection._id && this.state.bookmarks.length > 0 && (e = "masonry" == this.state.collection.view ? React.createElement(i, {
          view: this.state.collection.view,
          sort: y.sort,
          items: this.state.bookmarks,
          canEdit: this.state.collection.author || this.state.collection._id <= 0,
          selectMode: g.getSelectedCount() > 0,
          showPath: 0 == this.state.collection._id,
          onMove: this.handleMoveBookmark,
          onMoveEnd: this.handleMoveBookmarkEnd,
          onSelect: this.handleSelectBookmark
        }) : React.createElement(o, {
          view: this.state.collection.view,
          sort: y.sort,
          items: this.state.bookmarks,
          canEdit: this.state.collection.author || this.state.collection._id <= 0,
          selectMode: g.getSelectedCount() > 0,
          showPath: 0 == this.state.collection._id,
          onMove: this.handleMoveBookmark,
          onMoveEnd: this.handleMoveBookmarkEnd,
          onSelect: this.handleSelectBookmark
        }));
        try {
          n = network.fixURL(this.state.collection.cover[0])
        } catch (a) {}
        var u = null;
        g.getSelectedCount() > 0 ? (u = React.createElement(d, {
          count: g.getSelectedCount(),
          bookmarksCount: this.state.collection.count,
          onCancel: this.handleSelectBookmarksCancel,
          onSelectAll: this.handleSelectAllBookmarks
        }), document.documentElement.classList.add("side-actions-open")) : document.documentElement.classList.remove("side-actions-open");
        var f = null; - 99 != this.state.collection._id && -1 == (window.environment || []).indexOf("mac") && -1 == (window.environment || []).indexOf("clipper") && (f = React.createElement(l, null));
        var v = null,
          R = [];
        try {
          R = JSON.parse(decodeURIComponent(this.context.router.getCurrentParams().search || ""))
        } catch (a) {} - 1 != (window.environment || []).indexOf("mac") || -1 != (window.environment || []).indexOf("clipper") || (v = React.createElement(r, {
          queries: R,
          onSearchReset: this.handleSearchReset
        }));
        var k = null;
        null == (this.state.collection.color || null) && (k = React.createElement("img", {
          src: n,
          alt: "",
          ref: "collectionIcon",
          className: "hidden",
          onLoad: this.handleCollectionColor,
          onError: this.handleCollectionColorError
        }));
        var E = React.createElement(h, {
          collection: this.state.collection,
          parents: this.state.parents,
          sortSelected: y.sort,
          handleChangeView: this.handleChangeView,
          handleSortChange: this.handleSortChange,
          onDropBookmark: this.handleDropBookmark,
          queries: R,
          onSearchReset: this.handleSearchReset
        });
        UserStore.isLogged() || (v = null);
        var w = !1;
        return 0 == y.page && (g.getIsLoading() && (w = !0), C.getIsLoading() && (w = !0)), React.createElement("div", {
          className: "max-width main-content-wrap"
        }, k, v, E, React.createElement("div", {
          className: "main-content " + (w ? "loading" : ""),
          onWheel: this.mainContentScroll,
          ref: "div"
        }, React.createElement(m, {
          scope: "bookmarks"
        }), React.createElement(s, {
          items: this.state.childrens,
          onCollectionMove: this.handleMoveCollection,
          onCollectionMoveEnd: this.handleMoveCollectionEnd,
          onDropBookmark: this.handleDropBookmark
        }), React.createElement(c, {
          pageStart: 0,
          loadMore: this.handleNextPage,
          hasMore: !0,
          loader: React.createElement("span", null)
        }, e, React.createElement("div", {
          className: "show-more-button " + (g.getIsLoading() || g.getIsNoMore() || !UserStore.isLogged() ? "" : "show-more-button-visible")
        }, t.s("more"), React.createElement("a", {
          href: "",
          className: "permalink",
          onClick: this.handleNextPage
        }))), u, React.createElement("span", {
          className: "loading-placeholder"
        })), React.createElement(DocumentTitle, {
          title: this.state.collection.title || ""
        }), f, React.createElement(Modal, {
          position: "viewer",
          forceUpdated: !0,
          isOpened: this.state.viewerModal.show,
          onClose: this.handleViewerModalClose,
          closeOnOutsideClick: !1,
          closeOnEsc: !0,
          params: this.state.viewerModal
        }, React.createElement(p, {
          router: this.context.router,
          loadMore: this.handleNextPage
        })))
      }
    })
  }, {
    "../../actions/Bookmarks": 2,
    "../../actions/Childrens": 3,
    "../../actions/Collections": 4,
    "../../actions/Parents": 7,
    "../../modules/colorThief.js": 104,
    "../../stores/Bookmarks": 113,
    "../../stores/Childrens": 114,
    "../../stores/Collections": 115,
    "../../stores/Parents": 118,
    "../components/Bookmarks/BatchEdit.js": 16,
    "../components/Bookmarks/List.js": 19,
    "../components/Bookmarks/Masonry.js": 20,
    "../components/Collections/Childrens.js": 26,
    "../components/Collections/ClipperToolbar.js": 27,
    "../components/Collections/DesktopToolbar.js": 28,
    "../components/Collections/Toolbar.js": 34,
    "../components/Fab.js": 35,
    "../components/Helpers/ScrollFixMixin.js": 48,
    "../components/Helpers/Tips.js": 51,
    "../components/Modals/Viewer": 62,
    "../components/Search/Search.js": 84,
    "react-infinite-scroll": "react-infinite-scroll"
  }],
  94: [function (e, n, a) {
    var o = e("../components/Bookmarks/Favorite.js"),
      i = e("../components/Search/Search.js"),
      s = e("../components/Collections/Item.js"),
      r = e("../components/Collections/GroupTab.js"),
      c = e("../components/Fab.js"),
      l = e("../components/Helpers/Tips.js"),
      d = e("../../actions/Bookmarks"),
      m = e("../../stores/Bookmarks"),
      u = e("../../actions/Collections"),
      h = e("../../stores/Collections"),
      p = e("../../actions/User"),
      f = (e("../../actions/Sidebar"), e("../../stores/Sidebar")),
      g = e("../components/Helpers/Onboard.js"),
      v = React.createClass({
        displayName: "routes/Dashboard",
        contextTypes: {
          router: React.PropTypes.func
        },
        getInitialState: function () {
          return m.onLoad({
            cId: -2,
            page: 0,
            sort: "sort",
            speed: "sync"
          }, function () {}), {
            favorites: m.getBookmarks(),
            collections: h.getCollections(),
            user: UserStore.getUser(),
            sidebarOpen: f.getState(),
            group: {
              active: parseInt(Api.getItem("dashboard-active-group") || -1),
              direction: "right"
            }
          }
        },
        onBookmarksChange: function (e) {
          this.isMounted() && this.setState({
            favorites: e
          })
        },
        onCollectionsChange: function (e) {
          this.isMounted() && this.setState({
            collections: e
          })
        },
        onUserChange: function (e) {
          this.isMounted() && this.setState({
            user: e
          })
        },
        onToggleGroup: function (e) {
          return p.toggleGroup({
            id: e
          }), !1
        },
        onSidebarChange: function (e) {
          this.isMounted() && this.setState({
            sidebarOpen: e
          })
        },
        componentWillMount: function () {
          h.onLoad()
        },
        componentDidMount: function () {
          this.unsubscribeBookmarks = m.listen(this.onBookmarksChange), this.unsubscribeCollections = h.listen(this.onCollectionsChange), this.unsubscribeUser = UserStore.listen(this.onUserChange), this.unsubscribeSidebar = f.listen(this.onSidebarChange), u.setCurrent(-2), window.dropFiles = m.handleDropFiles
        },
        componentWillUnmount: function () {
          m.reset(), this.unsubscribeBookmarks(), this.unsubscribeCollections(), this.unsubscribeUser(), this.unsubscribeSidebar(), delete window.dropFiles
        },
        handleFavAddClick: function (e) {
          e && e.preventDefault(), Pop.show("URL", {
            pin: "fabAppButton",
            parentId: h.getCurrentId()
          })
        },
        handleMoveFavorite: function (e, t) {
          m.onSwapBookmarks({
            fromId: e,
            toId: t
          })
        },
        handleSaveSortFavorites: function () {
          d.saveAllSort()
        },
        handleMoveCollection: function (e, t) {
          UserStore.onSwapCollections({
            fromId: e,
            toId: t
          })
        },
        handleMoveCollectionEnd: function () {},
        handleMoveGroup: function (e, t) {
          UserStore.onSwapGroups({
            fromId: e,
            toId: t
          })
        },
        handleTabChange: function (e) {
          var t = _.clone(this.state.group);
          if ("undefined" != typeof e.target) {
            if (!e.target.getAttribute("data-id")) return !1;
            t.active = parseInt(e.target.getAttribute("data-id"))
          } else t.active = e.id;
          t.direction = "right";
          var n = _.findIndex(this.state.user.groups, {
              id: this.state.group.active
            }),
            a = _.findIndex(this.state.user.groups, {
              id: t.active
            });
          n > a && (t.direction = "left"), this.isMounted() && this.setState({
            group: t
          }), Api.setItem("dashboard-active-group", t.active)
        },
        handleSignInGoogle: function (e) {
          e.preventDefault(), p.signIn(function () {
            location.hash = "#/", location.reload()
          }, {
            google: !0
          })
        },
        render: function () {
          var e = this,
            n = [];
          if (!this.state.sidebarOpen && UserStore.isLogged()) {
            var a = [],
              d = null;
            if (this.state.group.active >= 0) {
              var m = _.findIndex(this.state.user.groups, {
                id: this.state.group.active
              }); - 1 == m && (this.state.group.active = -1)
            }
            UserStore.isLogged() && (this.state.user.groups || []).length > 0 && this.state.user.groups.forEach(function (t, n) {
              a.push(React.createElement(r, {
                id: t.id,
                key: "grouptab_item_" + t.id,
                active: e.state.group.active == t.id,
                onClick: e.handleTabChange,
                onMove: e.handleMoveGroup
              }, t.title))
            }), d = React.createElement("div", {
              className: "groups-tab",
              "data-direction": this.state.group.direction
            }, React.createElement("div", {
              className: "item" + (-1 == this.state.group.active ? " active" : ""),
              "data-id": "-1",
              onClick: e.handleTabChange
            }, React.createElement("div", {
              className: "title no-padding"
            }, React.createElement(Icon, {
              name: "best"
            }))), a)
          } else this.state.group.active = -1;
          switch (this.state.group.active) {
            case -1:
              UserStore.isLogged() ? (n = (this.state.favorites || []).map(function (t) {
                return React.createElement(o, {
                  item: t,
                  key: "fav_" + t._id,
                  onMove: e.handleMoveFavorite,
                  onEndDrag: e.handleSaveSortFavorites
                })
              }), 0 == n.length && n.push(React.createElement("figure", {
                className: "card favorite-item favorite-white favorite-add",
                id: "fav_add",
                key: "fav_add"
              }, React.createElement("div", {
                className: "favicon favicon-svg"
              }, React.createElement(Icon, {
                name: "bookmark-outline",
                size: "big"
              })), React.createElement("figcaption", {
                className: "about"
              }, React.createElement("div", {
                className: "title"
              }, t.s("add"))), React.createElement("a", {
                href: "",
                onClick: e.handleFavAddClick,
                className: "permalink"
              })))) : UserStore.isLoading() || (n = [React.createElement("div", {
                className: "max-width",
                key: "fav_onboard"
              }, React.createElement(g, {
                className: "anim-material-from-center",
                scenario: "bookmarks",
                params: {
                  actions: !0
                }
              }))]);
              break;
            default:
              "undefined" != typeof this.state.user.groups[m] && (this.state.user.groups[m].collections || []).forEach(function (t) {
                var a = h.getCollection(t);
                null != a && n.push(React.createElement(s, {
                  item: a,
                  key: "collection_item_" + a._id,
                  onMove: e.handleMoveCollection,
                  onEndDrag: e.props.handleMoveCollectionEnd
                }))
              }), n.push(React.createElement(l, {
                key: "fav_tips",
                scope: "collections",
                params: {
                  collectionsCount: n.length
                }
              }))
          }
          var u = React.createElement(i, {
              q: ""
            }),
            p = React.createElement(c, null);
          return UserStore.isLogged() || UserStore.isLoading() || (p = null, u = null), React.createElement("div", {
            className: "max-width"
          }, u, React.createElement("div", {
            className: "dashboard-wrap"
          }, React.createElement("div", {
            className: "dashboard"
          }, n)), React.createElement(DocumentTitle, {
            title: strings.defaultTitle()
          }), p, d)
        }
      });
    n.exports = v
  }, {
    "../../actions/Bookmarks": 2,
    "../../actions/Collections": 4,
    "../../actions/Sidebar": 9,
    "../../actions/User": 14,
    "../../stores/Bookmarks": 113,
    "../../stores/Collections": 115,
    "../../stores/Sidebar": 120,
    "../components/Bookmarks/Favorite.js": 17,
    "../components/Collections/GroupTab.js": 29,
    "../components/Collections/Item.js": 31,
    "../components/Fab.js": 35,
    "../components/Helpers/Onboard.js": 45,
    "../components/Helpers/Tips.js": 51,
    "../components/Search/Search.js": 84
  }],
  95: [function (e, n, a) {
    var o = (e("../../actions/User"), e("../../stores/Collections"), e("../components/Helpers/CoverSelector"));
    e("../components/Helpers/OverflowScroll");
    n.exports = React.createClass({
      displayName: "routes/Interface",
      contextTypes: {
        router: React.PropTypes.func
      },
      getInitialState: function () {
        var e = consts.backgroundImages.map(function (e) {
          return e.src
        });
        return {
          backgroundImages: e,
          backgroundImageSelected: consts.getBackgroundSelected(),
          user: UserStore.getUser()
        }
      },
      handleClose: function (e) {
        e && e.preventDefault();
        try {
          window.history.back()
        } catch (e) {
          e && (window.location.hash = "#/")
        }
      },
      handleChangeBackground: function (e) {
        Api.setItem("background-image", this.state.backgroundImages[e]), consts.setBackground()
      },
      onUserChange: function (e) {
        this.setState({
          user: e
        })
      },
      componentDidMount: function () {
        this.unsubscribeUser = UserStore.listen(this.onUserChange)
      },
      componentWillUnmount: function () {
        this.unsubscribeUser()
      },
      render: function () {
        return React.createElement("div", {
          className: "max-width"
        }, React.createElement("div", {
          className: "centered-content",
          style: {
            height: "100vh"
          }
        }, React.createElement("div", {
          className: "modal-dialog"
        }, React.createElement("header", null, React.createElement("div", {
          className: "actionBar"
        }, React.createElement("div", {
          className: "actions"
        }, React.createElement("a", {
          href: "",
          className: "action-icon",
          onClick: this.handleClose
        }, React.createElement(Icon, {
          name: "back"
        }))), React.createElement("h3", null, t.s("interfaceStyle")))), React.createElement("article", null, React.createElement("div", {
          style: {
            margin: "0 -16px"
          }
        }, React.createElement(o, {
          items: this.state.backgroundImages,
          thumbs: !0,
          selected: this.state.backgroundImageSelected,
          onSelect: this.handleChangeBackground
        }))))), React.createElement(DocumentTitle, {
          title: t.s("interfaceStyle")
        }))
      }
    })
  }, {
    "../../actions/User": 14,
    "../../stores/Collections": 115,
    "../components/Helpers/CoverSelector": 41,
    "../components/Helpers/OverflowScroll": 46
  }],
  96: [function (e, n, a) {
    var o = Router.RouteHandler,
      i = e("../../stores/Collections");
    n.exports = React.createClass({
      displayName: "exports",
      contextTypes: {
        router: React.PropTypes.func
      },
      componentDidMount: function () {
        i.onSetCurrent(null)
      },
      render: function () {
        var e = [{
          title: t.s("tools"),
          href: "#/tools"
        }];
        return React.createElement("div", {
          className: "max-width main-content-wrap"
        }, React.createElement(o, {
          path: e
        }))
      }
    })
  }, {
    "../../stores/Collections": 115
  }],
  97: [function (e, n, a) {
    var o = e("../../components/UnifiedTitleBar");
    n.exports = React.createClass({
      displayName: "exports",
      renderItem: function (e) {
        return React.createElement("figure", {
          className: "card collection-item"
        }, React.createElement("div", {
          className: "favicon"
        }, e.icon), React.createElement("figcaption", {
          className: "about"
        }, React.createElement("div", {
          className: "title"
        }, e.title)), React.createElement("a", {
          href: e.href,
          className: "permalink"
        }))
      },
      render: function () {
        return React.createElement("div", null, React.createElement(DocumentTitle, {
          title: t.s("tools")
        }), React.createElement(o, {
          path: this.props.path
        }), React.createElement("div", {
          className: "bookmarks view-grid childrens"
        }, this.renderItem({
          title: t.s("tags"),
          href: "#/tools/tags",
          icon: React.createElement("img", {
            className: "icon",
            src: network.fixURL("/other/welcome3/images/tag.svg")
          })
        })))
      }
    })
  }, {
    "../../components/UnifiedTitleBar": 89
  }],
  98: [function (e, n, a) {
    var o = e("../../components/UnifiedTitleBar"),
      i = e("../../../stores/Tags"),
      s = e("../../components/Modals/TagEdit");
    n.exports = React.createClass({
      displayName: "exports",
      getInitialState: function () {
        return {
          tags: i.getTags(),
          sort: "count",
          tagModal: {
            index: 0,
            show: !1
          }
        }
      },
      componentDidMount: function () {
        this.unsubscribeTags = i.listen(this.onTagsChange), i.onLoad()
      },
      componentWillUnmount: function () {
        this.unsubscribeTags()
      },
      onTagsChange: function (e) {
        this.setState({
          tags: e
        })
      },
      handleSortTitle: function (e) {
        e.preventDefault(), this.setState({
          sort: "title"
        })
      },
      handleSortCount: function (e) {
        e.preventDefault(), this.setState({
          sort: "count"
        })
      },
      handleTagEditModalClose: function () {
        if (this.isMounted()) {
          var e = JSON.parse(JSON.stringify(this.state.tagModal));
          e.show = !1, this.setState({
            tagModal: e
          })
        }
      },
      handleTagEditModalOpen: function (e) {
        if (e.preventDefault(), this.isMounted()) {
          var t = JSON.parse(JSON.stringify(this.state.tagModal));
          t.index = _.findIndex(this.state.tags, {
            _id: e.target.getAttribute("data-title")
          }), t.show = !0, this.setState({
            tagModal: t
          })
        }
      },
      handleRemove: function (e) {
        e.preventDefault(), i.onRemove({
          _id: e.target.getAttribute("data-title")
        })
      },
      render: function () {
        var e = this,
          n = _.sortBy(this.state.tags, [this.state.sort]).map(function (t) {
            return React.createElement("figure", {
              className: "card list-item"
            }, React.createElement("div", {
              className: "favicon"
            }, React.createElement(Icon, {
              name: "tag"
            })), React.createElement("figcaption", {
              className: "about"
            }, React.createElement("div", {
              className: "title"
            }, t._id)), React.createElement("figcaption", {
              className: "type subinfo"
            }, t.count), React.createElement("div", {
              className: "more"
            }, React.createElement("a", {
              href: "#/collection/0/%23" + t._id,
              className: "action-icon icon-more"
            }, React.createElement(Icon, {
              name: "open-link"
            })), React.createElement("a", {
              href: "",
              className: "action-icon",
              "data-title": t._id,
              onClick: e.handleTagEditModalOpen
            }, React.createElement(Icon, {
              name: "pencil"
            })), React.createElement("a", {
              href: "",
              className: "action-icon",
              "data-title": t._id,
              onClick: e.handleRemove
            }, React.createElement(Icon, {
              name: "trash"
            }))), React.createElement("a", {
              href: "",
              onClick: e.handleTagEditModalOpen,
              "data-title": t._id,
              className: "permalink"
            }))
          });
        "count" == this.state.sort && n.reverse();
        var a = null;
        return a = n.length > 0 ? React.createElement("div", {
          className: "bookmarks view-simple small-table"
        }, React.createElement("figure", {
          className: "card list-item table-head"
        }, React.createElement("div", {
          className: "favicon"
        }), React.createElement("figcaption", {
          className: "about " + ("title" == this.state.sort ? "active" : "")
        }, React.createElement("a", {
          href: "",
          onClick: this.handleSortTitle
        }, t.s("name")), React.createElement(Icon, {
          name: "arrow-top",
          size: "small",
          className: "sorting-icon"
        })), React.createElement("figcaption", {
          className: "count" == this.state.sort ? "active" : null
        }, React.createElement("a", {
          href: "",
          onClick: this.handleSortCount
        }, _.capitalize(t.s("byBookmarksCount"))), React.createElement(Icon, {
          name: "arrow-bottom",
          size: "small",
          className: "sorting-icon"
        }))), n) : React.createElement("div", {
          className: "tips"
        }, React.createElement("div", {
          className: "tip tip-color-light"
        }, React.createElement("div", {
          className: "content"
        }, React.createElement("div", {
          className: "text"
        }, React.createElement("h3", null, t.s("noTags")))))), React.createElement("div", null, React.createElement(DocumentTitle, {
          title: t.s("tools") + " / " + t.s("tags")
        }), React.createElement(o, {
          path: this.props.path.concat([{
            title: t.s("tags")
          }])
        }), a, React.createElement(Modal, {
          isOpened: this.state.tagModal.show,
          onClose: this.handleTagEditModalClose,
          closeOnOutsideClick: !0,
          params: this.state.tagModal
        }, React.createElement(s, null)))
      }
    })
  }, {
    "../../../stores/Tags": 123,
    "../../components/Modals/TagEdit": 61,
    "../../components/UnifiedTitleBar": 89
  }],
  99: [function (e, n, a) {
    n.exports = React.createClass({
      displayName: "routes/WaitAuth",
      contextTypes: {
        router: React.PropTypes.func
      },
      _checker: null,
      componentDidMount: function () {
        var e = (this.context.router.getCurrentQuery(), this);
        return null != Api.getItem("logged") ? (Api.removeItem("logged"), void(window.location.hash = "#/")) : void(this._checker = setInterval(function () {
          Api.removeItem("logged"), Api.get("user", function (t) {
            t.result && (Api.setItem("logged", "true"), e.handleRefresh())
          })
        }, 2e3))
      },
      handleRefresh: function (e) {
        "undefined" != typeof e && e.preventDefault(), window.location.reload()
      },
      componentWillUnmount: function () {
        clearInterval(this._checker)
      },
      render: function () {
        return React.createElement("div", {
          className: "absoluteLoading"
        }, React.createElement("div", {
          className: "loader-inner line-scale"
        }, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)), React.createElement("br", null), React.createElement("a", {
          href: "",
          onClick: this.handleRefresh,
          className: "action-icon active"
        }, t.s("refresh")))
      }
    })
  }, {}],
  100: [function (e, t, n) {
    t.exports = React.createClass({
      displayName: "routes/WebHome",
      contextTypes: {
        router: React.PropTypes.func
      },
      componentDidMount: function () {
        window.location.hash = "#/collection/0"
      },
      render: function () {
        return React.createElement("div", null)
      }
    })
  }, {}],
  101: [function (e, t, n) {
    t.exports = {
      search: function (e, t, n) {
        Api.get("https://api.iconfinder.com/v2/icons/search?query=" + encodeURIComponent("" + e) + "&minimum_size=128&count=100&offset=" + 100 * t, function (e) {
          if (e.icons) {
            var t = [];
            e.icons.forEach(function (e) {
              e.is_premium || t.push(e.raster_sizes[e.raster_sizes.length - 1].formats[0].preview_url)
            }), n(t)
          } else n([])
        })
      }
    }
  }, {}],
  102: [function (e, t, n) {
    ! function (e, a) {
      "object" == typeof n && "object" == typeof t ? t.exports = a() : "function" == typeof define && define.amd ? define(a) : "object" == typeof n ? n.ReactDND = a() : e.ReactDND = a()
    }(this, function () {
      return function (e) {
        function t(a) {
          if (n[a]) return n[a].exports;
          var o = n[a] = {
            exports: {},
            id: a,
            loaded: !1
          };
          return e[a].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
      }([function (e, t, n) {
        "use strict";
        var a = n(32),
          o = a.HTML5,
          i = n(39);
        e.exports = {
          DragDropMixin: i(o),
          ImagePreloaderMixin: n(34),
          DragLayerMixin: n(33),
          HorizontalDragAnchors: n(19),
          VerticalDragAnchors: n(20),
          NativeDragItemTypes: n(8),
          DropEffects: n(7)
        }
      }, function (e) {
        function t(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && n >= e
        }
        var n = Math.pow(2, 53) - 1;
        e.exports = t
      }, function (e) {
        function t(e) {
          var t = typeof e;
          return "function" == t || e && "object" == t || !1
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e) {
          return null == e ? !1 : d.call(e) == s ? m.test(l.call(e)) : i(e) && r.test(e) || !1
        }
        var o = n(73),
          i = n(4),
          s = "[object Function]",
          r = /^\[object .+?Constructor\]$/,
          c = Object.prototype,
          l = Function.prototype.toString,
          d = c.toString,
          m = RegExp("^" + o(d).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = a
      }, function (e) {
        function t(e) {
          return e && "object" == typeof e || !1
        }
        e.exports = t
      }, function (e, t, n) {
        var a = n(1),
          o = n(3),
          i = n(4),
          s = "[object Array]",
          r = Object.prototype,
          c = r.toString,
          l = o(l = Array.isArray) && l,
          d = l || function (e) {
            return i(e) && a(e.length) && c.call(e) == s || !1
          };
        e.exports = d
      }, function (e, t, n) {
        "use strict";
        var a = n(17),
          o = a({
            DRAG_START: null,
            DRAG_END: null,
            DRAG: null,
            DROP: null
          });
        e.exports = o
      }, function (e) {
        "use strict";
        var t = {
          COPY: "copy",
          MOVE: "move",
          LINK: "link"
        };
        e.exports = t
      }, function (e) {
        "use strict";
        var t = {
          FILE: "__NATIVE_FILE__",
          URL: "__NATIVE_URL__"
        };
        e.exports = t
      }, function (e, t, n) {
        "use strict";
        var a = n(48).Dispatcher,
          o = n(15),
          i = o(new a, {
            handleAction: function (e) {
              this.dispatch({
                action: e
              })
            }
          });
        e.exports = i
      }, function (e, t, n) {
        "use strict";
        var a = n(9),
          o = n(6),
          i = n(22),
          s = null,
          r = null,
          c = null,
          l = i({
            getInitialOffsetFromContainer: function () {
              return s
            },
            getInitialOffsetFromClient: function () {
              return r
            },
            getCurrentOffsetFromClient: function () {
              return c
            }
          });
        l.dispatchToken = a.register(function (e) {
          var t = e.action;
          switch (t.type) {
            case o.DRAG_START:
              s = t.offsetFromContainer, r = t.offsetFromClient, c = t.offsetFromClient, l.emitChange();
              break;
            case o.DRAG:
              c = t.offsetFromClient, l.emitChange();
              break;
            case o.DRAG_END:
              s = null, r = null, c = null, l.emitChange()
          }
        }), e.exports = l
      }, function (e, t, n) {
        "use strict";
        var a = n(9),
          o = n(6),
          i = n(10),
          s = n(22),
          r = null,
          c = null,
          l = null,
          d = null,
          m = s({
            isDragging: function () {
              return !!r
            },
            getEffectsAllowed: function () {
              return l
            },
            getDropEffect: function () {
              return d
            },
            getDraggedItem: function () {
              return r
            },
            getDraggedItemType: function () {
              return c
            }
          });
        m.dispatchToken = a.register(function (e) {
          a.waitFor([i.dispatchToken]);
          var t = e.action;
          switch (t.type) {
            case o.DRAG_START:
              d = null, r = t.item, c = t.itemType, l = t.effectsAllowed, m.emitChange();
              break;
            case o.DROP:
              d = t.dropEffect, m.emitChange();
              break;
            case o.DRAG_END:
              r = null, c = null, l = null, d = null, m.emitChange()
          }
        }), e.exports = m
      }, function (e) {
        "use strict";

        function t() {
          return !!window.safari
        }
        e.exports = t
      }, function (e) {
        function t(e, t) {
          return e = +e, t = null == t ? n : t, e > -1 && e % 1 == 0 && t > e
        }
        var n = Math.pow(2, 53) - 1;
        e.exports = t
      }, function (e, t, n) {
        function a(e) {
          var t = i(e) ? e.length : void 0;
          return o(t) && c.call(e) == s || !1
        }
        var o = n(1),
          i = n(4),
          s = "[object Arguments]",
          r = Object.prototype,
          c = r.toString;
        e.exports = a
      }, function (e) {
        function t(e) {
          if (null == e) throw new TypeError("Object.assign target cannot be null or undefined");
          for (var t = Object(e), n = Object.prototype.hasOwnProperty, a = 1; a < arguments.length; a++) {
            var o = arguments[a];
            if (null != o) {
              var i = Object(o);
              for (var s in i) n.call(i, s) && (t[s] = i[s])
            }
          }
          return t
        }
        e.exports = t
      }, function (e) {
        "use strict";
        var t = function (e, t, n, a, o, i, s, r) {
          if (!e) {
            var c;
            if (void 0 === t) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
              var l = [n, a, o, i, s, r],
                d = 0;
              c = new Error("Invariant Violation: " + t.replace(/%s/g, function () {
                return l[d++]
              }))
            }
            throw c.framesToPop = 1, c
          }
        };
        e.exports = t
      }, function (e, t, n) {
        "use strict";
        var a = n(16),
          o = function (e) {
            var t, n = {};
            a(e instanceof Object && !Array.isArray(e));
            for (t in e) e.hasOwnProperty(t) && (n[t] = t);
            return n
          };
        e.exports = o
      }, function (e, t, n) {
        "use strict";
        var a = n(9),
          o = n(6),
          i = {
            startDragging: function (e, t, n, i, s) {
              a.handleAction({
                type: o.DRAG_START,
                itemType: e,
                item: t,
                effectsAllowed: n,
                offsetFromClient: i,
                offsetFromContainer: s
              })
            },
            drag: function (e) {
              a.handleAction({
                type: o.DRAG,
                offsetFromClient: e
              })
            },
            recordDrop: function (e) {
              a.handleAction({
                type: o.DROP,
                dropEffect: e
              })
            },
            endDragging: function () {
              a.handleAction({
                type: o.DRAG_END
              })
            }
          };
        e.exports = i
      }, function (e, t, n) {
        "use strict";
        var a = n(17),
          o = a({
            LEFT: null,
            CENTER: null,
            RIGHT: null
          });
        e.exports = o
      }, function (e, t, n) {
        "use strict";
        var a = n(17),
          o = a({
            TOP: null,
            CENTER: null,
            BOTTOM: null
          });
        e.exports = o
      }, function (e, t, n) {
        "use strict";
        var a = function (e, t, n) {
            t && Object.defineProperties(e, t), n && Object.defineProperties(e.prototype, n)
          },
          o = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          },
          i = n(51),
          s = n(52),
          r = function () {
            function e() {
              o(this, e), this._entered = []
            }
            return a(e, null, {
              enter: {
                value: function (e) {
                  return this._entered = i(this._entered.filter(function (t) {
                    return document.body.contains(t) && (!t.contains || t.contains(e))
                  }), [e]), 1 === this._entered.length
                },
                writable: !0,
                configurable: !0
              },
              leave: {
                value: function (e) {
                  return this._entered = s(this._entered.filter(function (e) {
                    return document.body.contains(e)
                  }), e), 0 === this._entered.length
                },
                writable: !0,
                configurable: !0
              },
              reset: {
                value: function () {
                  this._entered = []
                },
                writable: !0,
                configurable: !0
              }
            }), e
          }();
        e.exports = r
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          var t = i({
            emitChange: function () {
              this.emit(s)
            },
            addChangeListener: function (e) {
              this.on(s, e)
            },
            removeChangeListener: function (e) {
              this.removeListener(s, e)
            }
          }, e, o.prototype);
          return t.setMaxListeners(0), t
        }
        var o = n(77).EventEmitter,
          i = n(15),
          s = "change";
        e.exports = a
      }, function (e) {
        "use strict";

        function t(e) {
          if (!e.dataTransfer) return !1;
          var t = Array.prototype.slice.call(e.dataTransfer.types);
          return -1 !== t.indexOf("Files")
        }
        e.exports = t
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          switch (e) {
            case o.FILE:
            case o.URL:
              return !0;
            default:
              return !1
          }
        }
        var o = n(8);
        e.exports = a
      }, function (e) {
        "use strict";

        function t(e) {
          var t = Array.prototype.slice.call(e.dataTransfer.types);
          return -1 !== t.indexOf("Url") || -1 !== t.indexOf("text/uri-list")
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e, t, n) {
          if (t !== t) return o(e, n);
          for (var a = n - 1, i = e.length; ++a < i;)
            if (e[a] === t) return a;
          return -1
        }
        var o = n(66);
        e.exports = a
      }, function (e, t, n) {
        function a(e, t) {
          var n = e.data,
            a = "string" == typeof t || o(t) ? n.set.has(t) : n.hash[t];
          return a ? 0 : -1
        }
        var o = n(2);
        e.exports = a
      }, function (e, t, n) {
        (function (t) {
          var a = n(53),
            o = n(74),
            i = n(3),
            s = i(s = t.Set) && s,
            r = i(r = Object.create) && r,
            c = r && s ? function (e) {
              return new a(e)
            } : o(null);
          e.exports = c
        }).call(t, function () {
          return this
        }())
      }, function (e, t, n) {
        (function (t) {
          var a = n(3),
            o = /\bthis\b/,
            i = Object.prototype,
            s = (s = t.window) && s.document,
            r = i.propertyIsEnumerable,
            c = {};
          ! function () {
            c.funcDecomp = !a(t.WinRTError) && o.test(function () {
              return this
            }), c.funcNames = "string" == typeof Function.name;
            try {
              c.dom = 11 === s.createDocumentFragment().nodeType
            } catch (e) {
              c.dom = !1
            }
            try {
              c.nonEnumArgs = !r.call(arguments, 1)
            } catch (e) {
              c.nonEnumArgs = !0
            }
          }(0, 0), e.exports = c
        }).call(t, function () {
          return this
        }())
      }, function (e) {
        function t() {}
        e.exports = t
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          if (e.nodeType !== I && (e = e.parentElement), !e) return null;
          var t = e.getBoundingClientRect();
          return {
            top: t.top,
            left: t.left,
            width: t.width,
            height: t.height
          }
        }

        function o(e) {
          return {
            x: e.clientX,
            y: e.clientY
          }
        }

        function i() {
          if (!g) {
            var e = a(h);
            g = !x(f, e)
          }
          return g
        }

        function s() {
          if (p && !document.body.contains(h)) {
            var e = k.getDraggedItemType();
            p.handleDragEnd(e, null)
          }
        }

        function r() {
          var e = k.getDraggedItemType();
          return b(e)
        }

        function c(e) {
          k.isDragging() || (y(e) ? R.startDragging(C.URL, null) : e.preventDefault())
        }

        function l(e) {
          e.preventDefault();
          var t = _.enter(e.target);
          t && !k.isDragging() && (w(e) ? R.startDragging(C.FILE, null) : y(e) && R.startDragging(C.URL, null))
        }

        function d(e) {
          r() && e.preventDefault();
          var t = o(e);
          R.drag(t), v && (e.dataTransfer.dropEffect = v, v = null), h && N() && i() && e.preventDefault()
        }

        function m(e) {
          r() && e.preventDefault();
          var t = _.leave(e.target);
          t && r() && R.endDragging()
        }

        function u(e) {
          r() && e.preventDefault(), _.reset(), r() && R.endDragging(), s()
        }
        var h, p, f, g, v, R = n(18),
          k = n(11),
          C = n(8),
          E = n(21),
          w = n(23),
          y = n(25),
          b = n(24),
          S = n(38),
          x = n(76),
          N = n(46),
          I = 1,
          _ = new E,
          L = {
            setup: function () {
              "undefined" != typeof window && (window.addEventListener("dragstart", c), window.addEventListener("dragenter", l, !0), window.addEventListener("dragleave", m, !0), window.addEventListener("dragover", d), window.addEventListener("drop", u))
            },
            teardown: function () {
              "undefined" != typeof window && (window.removeEventListener("dragstart", c), window.removeEventListener("dragenter", l, !0), window.removeEventListener("dragleave", m, !0), window.removeEventListener("dragover", d), window.removeEventListener("drop", u))
            },
            beginDrag: function (e, t, n, o, i, r, c) {
              var l = t.nativeEvent,
                d = l.dataTransfer,
                m = l.target;
              S(d, n, o, i, r, c), p = e, h = m, f = a(m), g = !1, window.addEventListener("mousemove", s, !0)
            },
            endDrag: function () {
              h = null, p = null, f = null, g = !1, window.removeEventListener("mousemove", s, !0)
            },
            dragOver: function (e, t, n) {
              v || (v = n)
            },
            getDragSourceProps: function (e, t) {
              return {
                draggable: !0,
                onDragStart: e.handleDragStart.bind(e, t),
                onDragEnd: e.handleDragEnd.bind(e, t)
              }
            },
            getDropTargetProps: function (e, t) {
              return {
                onDragEnter: e.handleDragEnter.bind(e, t),
                onDragOver: e.handleDragOver.bind(e, t),
                onDragLeave: e.handleDragLeave.bind(e, t),
                onDrop: e.handleDrop.bind(e, t)
              }
            },
            getOffsetFromClient: function (e, t) {
              return o(t)
            }
          };
        e.exports = L
      }, function (e, t, n) {
        "use strict";
        e.exports = {
          HTML5: n(31)
        }
      }, function (e, t, n) {
        "use strict";
        var a = n(11),
          o = n(10),
          i = {
            getInitialState: function () {
              return this.getStateForDragLayerMixin()
            },
            getDragLayerState: function () {
              var e = this.state,
                t = e.isDragging,
                n = e.draggedItemType,
                a = e.draggedItem,
                o = e.initialOffset,
                i = e.currentOffset,
                s = e.currentOffsetFromClient,
                r = e.initialOffsetFromClient,
                c = e.initialOffsetFromContainer;
              return {
                isDragging: t,
                draggedItemType: n,
                draggedItem: a,
                initialOffset: o,
                currentOffset: i,
                currentOffsetFromClient: s,
                initialOffsetFromClient: r,
                initialOffsetFromContainer: c
              }
            },
            getStateForDragLayerMixin: function () {
              var e = o.getInitialOffsetFromClient(),
                t = o.getCurrentOffsetFromClient(),
                n = o.getInitialOffsetFromContainer(),
                i = !1,
                s = null,
                r = null,
                c = null,
                l = null;
              return e && t && (i = !0, s = a.getDraggedItemType(), r = a.getDraggedItem(), c = {
                x: e.x - n.x,
                y: e.y - n.y
              }, l = {
                x: t.x - n.x,
                y: t.y - n.y
              }), {
                isDragging: i,
                draggedItemType: s,
                draggedItem: r,
                initialOffset: c,
                currentOffset: l,
                currentOffsetFromClient: t,
                initialOffsetFromClient: e,
                initialOffsetFromContainer: n
              }
            },
            handleStoreChangeInDragLayerMixin: function () {
              this.isMounted() && this.setState(this.getStateForDragLayerMixin())
            },
            componentDidMount: function () {
              o.addChangeListener(this.handleStoreChangeInDragLayerMixin), a.addChangeListener(this.handleStoreChangeInDragLayerMixin)
            },
            componentWillUnmount: function () {
              o.removeChangeListener(this.handleStoreChangeInDragLayerMixin), a.removeChangeListener(this.handleStoreChangeInDragLayerMixin)
            }
          };
        e.exports = i
      }, function (e, t, n) {
        "use strict";
        var a = n(44),
          o = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
          i = {
            componentDidMount: function () {
              this._cachedImages = {}, this._readyImages = {}, this.preloadImages()
            },
            componentDidUpdate: function () {
              this.preloadImages()
            },
            componentWillUnmount: function () {
              for (var e in this._cachedImages) this._cachedImages[e].src = o;
              this._cachedImages = {}
            },
            hasPreloadedImage: function (e) {
              return !!this._readyImages[e]
            },
            getPreloadedImage: function (e) {
              return this.hasPreloadedImage(e) ? this._cachedImages[e] : void 0
            },
            preloadImages: function () {
              var e = this.getImageUrlsToPreload();
              e.forEach(this.preloadImage)
            },
            preloadImage: function (e) {
              var t = this;
              if (e && !this._cachedImages[e]) {
                var n = new Image;
                n.onload = function () {
                  t.isMounted() && (t._readyImages[e] = !0)
                }, n.onerror = function () {
                  t.isMounted() && delete t._cachedImages[e]
                }, n.src = e, this._cachedImages[e] = n
              }
            },
            getDragImageScale: a
          };
        e.exports = i
      }, function (e, t, n) {
        "use strict";
        var a = n(16),
          o = n(30),
          i = {
            canDrag: function () {
              return !0
            },
            beginDrag: function () {
              a(!1, "Drag source must contain a method called beginDrag. See https://github.com/gaearon/react-dnd#drag-source-api")
            },
            endDrag: o
          };
        e.exports = i
      }, function (e, t, n) {
        "use strict";
        var a = n(30),
          o = {
            canDrop: function () {
              return !0
            },
            getDropEffect: function (e, t) {
              return t[0]
            },
            enter: a,
            over: a,
            leave: a,
            acceptDrop: a
          };
        e.exports = o
      }, function (e, t, n) {
        "use strict";
        var a = n(10),
          o = {
            getCurrentOffsetDelta: function () {
              var e = a.getInitialOffsetFromClient(),
                t = a.getCurrentOffsetFromClient();
              return {
                x: t.x - e.x,
                y: t.y - e.y
              }
            },
            getInitialOffsetFromClient: function () {
              return a.getInitialOffsetFromClient()
            },
            getCurrentOffsetFromClient: function () {
              return a.getCurrentOffsetFromClient()
            },
            getInitialOffsetFromContainer: function () {
              return a.getInitialOffsetFromContainer()
            }
          };
        e.exports = o
      }, function (e, t, n) {
        "use strict";

        function a(e, t, n, a, r, c) {
          try {
            e.setData("application/json", {})
          } catch (l) {}
          if (o(n) && e.setDragImage) {
            var d = i(t, n, a, r);
            e.setDragImage(n, d.x, d.y)
          }
          e.effectAllowed = s(c)
        }
        var o = n(47),
          i = n(43),
          s = n(42);
        e.exports = a
      }, function (e, t, n) {
        "use strict";

        function a(e, t) {
          g(t && ("string" == typeof t || "symbol" == typeof t), "Expected item type to be a non-empty string or a symbol. See %s", e.constructor.displayName)
        }

        function o(e, t) {
          var n = e.constructor.displayName;
          g(e._dragSources[t], 'There is no drag source for "%s" registered in %s. Have you forgotten to register it? See configureDragDrop in %s', t, n, n)
        }

        function i(e, t) {
          var n = e.constructor.displayName;
          g(e._dropTargets[t], 'There is no drop target for "%s" registered in %s. Have you forgotten to register it? See configureDragDrop in %s', t, n, n)
        }

        function s(e) {
          function t(t) {
            0 === s && e.setup(t), s++
          }

          function n(t) {
            s--, 0 === s && e.teardown(t)
          }
          var s = 0;
          return {
            getInitialState: function () {
              var e = {
                ownDraggedItemType: null,
                currentDropEffect: null
              };
              return v(e, this.getStateForDragDropMixin())
            },
            getActiveDropTargetType: function () {
              var e = this.state,
                t = e.draggedItemType,
                n = e.draggedItem,
                a = e.ownDraggedItemType,
                o = this._dropTargets[t];
              if (!o) return null;
              if (t === a) return null;
              var i = o.canDrop;
              return i(this, n) ? t : null
            },
            isAnyDropTargetActive: function (e) {
              return e.indexOf(this.getActiveDropTargetType()) > -1
            },
            getStateForDragDropMixin: function () {
              return {
                draggedItem: c.getDraggedItem(),
                draggedItemType: c.getDraggedItemType()
              }
            },
            getDragState: function (e) {
              return a(this, e), o(this, e), {
                isDragging: this.state.ownDraggedItemType === e
              }
            },
            getDropState: function (e) {
              a(this, e), i(this, e);
              var t = this.getActiveDropTargetType() === e,
                n = !!this.state.currentDropEffect;
              return {
                isDragging: t,
                isHovering: t && n
              }
            },
            componentWillMount: function () {
              this._monitor = new d, this._dragSources = {}, this._dropTargets = {}, g(this.constructor.configureDragDrop, "%s must implement static configureDragDrop(register, context) to use DragDropMixin", this.constructor.displayName), this.constructor.configureDragDrop(this.registerDragDropItemTypeHandlers, l)
            },
            componentDidMount: function () {
              t(this), c.addChangeListener(this.handleStoreChangeInDragDropMixin)
            },
            componentWillUnmount: function () {
              n(this), c.removeChangeListener(this.handleStoreChangeInDragDropMixin)
            },
            registerDragDropItemTypeHandlers: function (e, t) {
              a(this, e);
              var n = t.dragSource,
                o = t.dropTarget;
              n && (g(!this._dragSources[e], "Drag source for %s specified twice. See configureDragDrop in %s", e, this.constructor.displayName), this._dragSources[e] = R(n, u)), o && (g(!this._dropTargets[e], "Drop target for %s specified twice. See configureDragDrop in %s", e, this.constructor.displayName), this._dropTargets[e] = R(o, h))
            },
            handleStoreChangeInDragDropMixin: function () {
              this.isMounted() && this.setState(this.getStateForDragDropMixin())
            },
            dragSourceFor: function (t) {
              return a(this, t), o(this, t), e.getDragSourceProps(this, t)
            },
            handleDragStart: function (t, n) {
              var a = this,
                o = this._dragSources[t],
                i = o.canDrag,
                s = o.beginDrag;
              if (!c.isDragging() && i(this)) {
                var l, d = s(this),
                  u = d.item,
                  h = d.dragPreview,
                  p = d.dragAnchors,
                  f = d.effectsAllowed,
                  v = this.getDOMNode(),
                  R = v.getBoundingClientRect(),
                  E = e.getOffsetFromClient(this, n);
                l = {
                  x: E.x - R.left,
                  y: E.y - R.top
                }, h || (h = v), f || (f = [m.MOVE]), g(k(f) && f.length > 0, "Expected effectsAllowed to be non-empty array"), g(C(u), 'Expected return value of beginDrag to contain "item" object'), e.beginDrag(this, n, v, h, p, l, f), r.startDragging(t, u, f, E, l), setTimeout(function () {
                  a.isMounted() && c.getDraggedItem() === u && a.setState({
                    ownDraggedItemType: t
                  })
                })
              }
            },
            handleDragEnd: function (t) {
              e.endDrag(this);
              var n = this._dragSources[t].endDrag,
                a = c.getDropEffect();
              r.endDragging(), this.isMounted() && this.setState({
                ownDraggedItemType: null
              }), n(this, a)
            },
            dropTargetFor: function () {
              for (var t = this, n = arguments.length, o = Array(n), s = 0; n > s; s++) o[s] = arguments[s];
              return o.forEach(function (e) {
                a(t, e), i(t, e)
              }), e.getDropTargetProps(this, o)
            },
            handleDragEnter: function (e, t) {
              if (this.isAnyDropTargetActive(e) && this._monitor.enter(t.target)) {
                t.preventDefault();
                var n = this._dropTargets[this.state.draggedItemType],
                  a = n.enter,
                  o = n.getDropEffect,
                  i = c.getEffectsAllowed(),
                  s = c.getDraggedItemType();
                f(s) && (i = [m.COPY]);
                var r = o(this, i);
                r && g(i.indexOf(r) > -1, "Effect %s supplied by drop target is not one of the effects allowed by drag source: %s", r, i.join(", ")), this.setState({
                  currentDropEffect: r
                }), a(this, this.state.draggedItem)
              }
            },
            handleDragOver: function (t, n) {
              if (this.isAnyDropTargetActive(t)) {
                n.preventDefault();
                var a = this._dropTargets[this.state.draggedItemType].over;
                a(this, this.state.draggedItem), e.dragOver(this, n, this.state.currentDropEffect || "move")
              }
            },
            handleDragLeave: function (e, t) {
              if (this.isAnyDropTargetActive(e) && this._monitor.leave(t.target)) {
                this.setState({
                  currentDropEffect: null
                });
                var n = this._dropTargets[this.state.draggedItemType].leave;
                n(this, this.state.draggedItem)
              }
            },
            handleDrop: function (e, t) {
              if (this.isAnyDropTargetActive(e)) {
                t.preventDefault();
                var n = this.state.draggedItem,
                  a = this._dropTargets[this.state.draggedItemType].acceptDrop,
                  o = this.state.currentDropEffect,
                  i = !!c.getDropEffect();
                n || (n = p(t)), this._monitor.reset(), i || r.recordDrop(o), this.setState({
                  currentDropEffect: null
                }), a(this, n, i, c.getDropEffect())
              }
            }
          }
        }
        var r = n(18),
          c = n(11),
          l = n(37),
          d = n(21),
          m = n(7),
          u = n(35),
          h = n(36),
          p = n(41),
          f = n(24),
          g = n(16),
          v = n(15),
          R = n(70),
          k = n(5),
          C = n(2);
        e.exports = s
      }, function (e) {
        "use strict";

        function t(e, t) {
          return -1 !== e.indexOf(t, e.length - t.length)
        }
        e.exports = t
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          return o(e) ? {
            files: Array.prototype.slice.call(e.dataTransfer.files)
          } : i(e) ? {
            urls: (e.dataTransfer.getData("Url") || e.dataTransfer.getData("text/uri-list") || "").split("\n")
          } : void 0
        }
        var o = n(23),
          i = n(25);
        e.exports = a
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          var t = e.indexOf(o.COPY) > -1,
            n = e.indexOf(o.MOVE) > -1,
            a = e.indexOf(o.LINK) > -1;
          return t && n && a ? "all" : t && n ? "copyMove" : a && n ? "linkMove" : t && a ? "copyLink" : t ? "copy" : n ? "move" : a ? "link" : "none"
        }
        var o = n(7);
        e.exports = a
      }, function (e, t, n) {
        "use strict";

        function a(e, t, n, a) {
          n = n || {};
          var r = e.offsetWidth,
            c = e.offsetHeight,
            l = t instanceof Image,
            d = l ? t.width : r,
            m = l ? t.height : c,
            u = n.horizontal || o.CENTER,
            h = n.vertical || i.CENTER,
            p = a.x,
            f = a.y;
          switch (s() && (m /= window.devicePixelRatio, d /= window.devicePixelRatio), u) {
            case o.LEFT:
              break;
            case o.CENTER:
              p *= d / r;
              break;
            case o.RIGHT:
              p = d - d * (1 - p / r)
          }
          switch (h) {
            case i.TOP:
              break;
            case i.CENTER:
              f *= m / c;
              break;
            case i.BOTTOM:
              f = m - m * (1 - f / c)
          }
          return s() && (f += (window.devicePixelRatio - 1) * m), {
            x: p,
            y: f
          }
        }
        var o = n(19),
          i = n(20),
          s = n(12);
        e.exports = a
      }, function (e, t, n) {
        "use strict";

        function a() {
          return o() || i() ? window.devicePixelRatio : 1
        }
        var o = n(45),
          i = n(12);
        e.exports = a
      }, function (e) {
        "use strict";

        function t() {
          return /firefox/i.test(navigator.userAgent)
        }
        e.exports = t
      }, function (e) {
        "use strict";

        function t() {
          return "WebkitAppearance" in document.documentElement.style
        }
        e.exports = t
      }, function (e, t, n) {
        "use strict";

        function a(e) {
          return e ? o() && e instanceof Image && i(e.src, ".gif") ? !1 : !0 : !1
        }
        var o = n(12),
          i = n(40);
        e.exports = a
      }, function (e, t, n) {
        e.exports.Dispatcher = n(49)
      }, function (e, t, n) {
        "use strict";

        function a() {
          this.$Dispatcher_callbacks = {}, this.$Dispatcher_isPending = {}, this.$Dispatcher_isHandled = {}, this.$Dispatcher_isDispatching = !1, this.$Dispatcher_pendingPayload = null
        }
        var o = n(50),
          i = 1,
          s = "ID_";
        a.prototype.register = function (e) {
          var t = s + i++;
          return this.$Dispatcher_callbacks[t] = e, t
        }, a.prototype.unregister = function (e) {
          o(this.$Dispatcher_callbacks[e], "Dispatcher.unregister(...): `%s` does not map to a registered callback.", e), delete this.$Dispatcher_callbacks[e]
        }, a.prototype.waitFor = function (e) {
          o(this.$Dispatcher_isDispatching, "Dispatcher.waitFor(...): Must be invoked while dispatching.");
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            this.$Dispatcher_isPending[n] ? o(this.$Dispatcher_isHandled[n], "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", n) : (o(this.$Dispatcher_callbacks[n], "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", n), this.$Dispatcher_invokeCallback(n))
          }
        }, a.prototype.dispatch = function (e) {
          o(!this.$Dispatcher_isDispatching, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."), this.$Dispatcher_startDispatching(e);
          try {
            for (var t in this.$Dispatcher_callbacks) this.$Dispatcher_isPending[t] || this.$Dispatcher_invokeCallback(t)
          } finally {
            this.$Dispatcher_stopDispatching()
          }
        }, a.prototype.isDispatching = function () {
          return this.$Dispatcher_isDispatching
        }, a.prototype.$Dispatcher_invokeCallback = function (e) {
          this.$Dispatcher_isPending[e] = !0, this.$Dispatcher_callbacks[e](this.$Dispatcher_pendingPayload), this.$Dispatcher_isHandled[e] = !0
        }, a.prototype.$Dispatcher_startDispatching = function (e) {
          for (var t in this.$Dispatcher_callbacks) this.$Dispatcher_isPending[t] = !1, this.$Dispatcher_isHandled[t] = !1;
          this.$Dispatcher_pendingPayload = e, this.$Dispatcher_isDispatching = !0
        }, a.prototype.$Dispatcher_stopDispatching = function () {
          this.$Dispatcher_pendingPayload = null, this.$Dispatcher_isDispatching = !1
        }, e.exports = a
      }, function (e) {
        "use strict";
        var t = function (e, t, n, a, o, i, s, r) {
          if (!e) {
            var c;
            if (void 0 === t) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
              var l = [n, a, o, i, s, r],
                d = 0;
              c = new Error("Invariant Violation: " + t.replace(/%s/g, function () {
                return l[d++]
              }))
            }
            throw c.framesToPop = 1, c
          }
        };
        e.exports = t
      }, function (e, t, n) {
        function a() {
          return i(o(arguments, !1, !0, 0))
        }
        var o = n(59),
          i = n(62);
        e.exports = a
      }, function (e, t, n) {
        function a(e) {
          return o(e, i(arguments, 1))
        }
        var o = n(58),
          i = n(60);
        e.exports = a
      }, function (e, t, n) {
        (function (t) {
          function a(e) {
            var t = e ? e.length : 0;
            for (this.data = {
                hash: r(null),
                set: new s
              }; t--;) this.push(e[t])
          }
          var o = n(64),
            i = n(3),
            s = i(s = t.Set) && s,
            r = i(r = Object.create) && r;
          a.prototype.push = o, e.exports = a
        }).call(t, function () {
          return this
        }())
      }, function (e) {
        function t(e, t) {
          var n = -1,
            a = e.length;
          for (t || (t = Array(a)); ++n < a;) t[n] = e[n];
          return t
        }
        e.exports = t
      }, function (e) {
        function t(e, t) {
          return "undefined" == typeof e ? t : e
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e, t, n) {
          var a = i(t);
          if (!n) return o(t, e, a);
          for (var s = -1, r = a.length; ++s < r;) {
            var c = a[s],
              l = e[c],
              d = n(l, t[c], c, e, t);
            (d === d ? d === l : l !== l) && ("undefined" != typeof l || c in e) || (e[c] = d)
          }
          return e
        }
        var o = n(57),
          i = n(71);
        e.exports = a
      }, function (e) {
        function t(e, t, n) {
          n || (n = t, t = {});
          for (var a = -1, o = n.length; ++a < o;) {
            var i = n[a];
            t[i] = e[i]
          }
          return t
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e, t) {
          var n = e ? e.length : 0,
            a = [];
          if (!n) return a;
          var r = -1,
            c = o,
            l = !0,
            d = l && t.length >= 200 ? s(t) : null,
            m = t.length;
          d && (c = i, l = !1, t = d);
          e: for (; ++r < n;) {
            var u = e[r];
            if (l && u === u) {
              for (var h = m; h--;)
                if (t[h] === u) continue e;
              a.push(u)
            } else c(t, u, 0) < 0 && a.push(u)
          }
          return a
        }
        var o = n(26),
          i = n(27),
          s = n(28);
        e.exports = a
      }, function (e, t, n) {
        function a(e, t, n, c) {
          for (var l = c - 1, d = e.length, m = -1, u = []; ++l < d;) {
            var h = e[l];
            if (r(h) && s(h.length) && (i(h) || o(h))) {
              t && (h = a(h, t, n, 0));
              var p = -1,
                f = h.length;
              for (u.length += f; ++p < f;) u[++m] = h[p]
            } else n || (u[++m] = h)
          }
          return u
        }
        var o = n(14),
          i = n(5),
          s = n(1),
          r = n(4);
        e.exports = a
      }, function (e) {
        function t(e, t, n) {
          var a = -1,
            o = e.length;
          t = null == t ? 0 : +t || 0, 0 > t && (t = -t > o ? 0 : o + t), n = "undefined" == typeof n || n > o ? o : +n || 0, 0 > n && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
          for (var i = Array(o); ++a < o;) i[a] = e[a + t];
          return i
        }
        e.exports = t
      }, function (e) {
        function t(e) {
          return "string" == typeof e ? e : null == e ? "" : e + ""
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e, t) {
          var n = -1,
            a = o,
            r = e.length,
            c = !0,
            l = c && r >= 200,
            d = l ? s() : null,
            m = [];
          d ? (a = i, c = !1) : (l = !1, d = t ? [] : m);
          e: for (; ++n < r;) {
            var u = e[n],
              h = t ? t(u, n, e) : u;
            if (c && u === u) {
              for (var p = d.length; p--;)
                if (d[p] === h) continue e;
              t && d.push(h), m.push(u)
            } else a(d, h, 0) < 0 && ((t || l) && d.push(h), m.push(u))
          }
          return m
        }
        var o = n(26),
          i = n(27),
          s = n(28);
        e.exports = a
      }, function (e, t, n) {
        function a(e, t, n) {
          if ("function" != typeof e) return o;
          if ("undefined" == typeof t) return e;
          switch (n) {
            case 1:
              return function (n) {
                return e.call(t, n)
              };
            case 3:
              return function (n, a, o) {
                return e.call(t, n, a, o)
              };
            case 4:
              return function (n, a, o, i) {
                return e.call(t, n, a, o, i)
              };
            case 5:
              return function (n, a, o, i, s) {
                return e.call(t, n, a, o, i, s)
              }
          }
          return function () {
            return e.apply(t, arguments)
          }
        }
        var o = n(75);
        e.exports = a
      }, function (e, t, n) {
        function a(e) {
          var t = this.data;
          "string" == typeof e || o(e) ? t.set.add(e) : t.hash[e] = !0
        }
        var o = n(2);
        e.exports = a
      }, function (e, t, n) {
        function a(e) {
          return function () {
            var t = arguments,
              n = t.length,
              a = t[0];
            if (2 > n || null == a) return a;
            var s = t[n - 2],
              r = t[n - 1],
              c = t[3];
            n > 3 && "function" == typeof s ? (s = o(s, r, 5), n -= 2) : (s = n > 2 && "function" == typeof r ? r : null, n -= s ? 1 : 0), c && i(t[1], t[2], c) && (s = 3 == n ? null : s, n = 2);
            for (var l = 0; ++l < n;) {
              var d = t[l];
              d && e(a, d, s)
            }
            return a
          }
        }
        var o = n(63),
          i = n(67);
        e.exports = a
      }, function (e) {
        function t(e, t, n) {
          for (var a = e.length, o = t + (n ? 0 : -1); n ? o-- : ++o < a;) {
            var i = e[o];
            if (i !== i) return o
          }
          return -1
        }
        e.exports = t
      }, function (e, t, n) {
        function a(e, t, n) {
          if (!s(n)) return !1;
          var a = typeof t;
          if ("number" == a) var r = n.length,
            c = i(r) && o(t, r);
          else c = "string" == a && t in n;
          if (c) {
            var l = n[t];
            return e === e ? e === l : l !== l
          }
          return !1
        }
        var o = n(13),
          i = n(1),
          s = n(2);
        e.exports = a
      }, function (e, t, n) {
        function a(e) {
          for (var t = c(e), n = t.length, a = n && e.length, d = a && r(a) && (i(e) || l.nonEnumArgs && o(e)), u = -1, h = []; ++u < n;) {
            var p = t[u];
            (d && s(p, a) || m.call(e, p)) && h.push(p)
          }
          return h
        }
        var o = n(14),
          i = n(5),
          s = n(13),
          r = n(1),
          c = n(72),
          l = n(29),
          d = Object.prototype,
          m = d.hasOwnProperty;
        e.exports = a
      }, function (e, t, n) {
        var a = n(56),
          o = n(65),
          i = o(a);
        e.exports = i
      }, function (e, t, n) {
        function a(e) {
          if (null == e) return e;
          var t = o(arguments);
          return t.push(s), i.apply(void 0, t)
        }
        var o = n(54),
          i = n(69),
          s = n(55);
        e.exports = a
      }, function (e, t, n) {
        var a = n(1),
          o = n(3),
          i = n(2),
          s = n(68),
          r = o(r = Object.keys) && r,
          c = r ? function (e) {
            if (e) var t = e.constructor,
              n = e.length;
            return "function" == typeof t && t.prototype === e || "function" != typeof e && n && a(n) ? s(e) : i(e) ? r(e) : []
          } : s;
        e.exports = c
      }, function (e, t, n) {
        function a(e) {
          if (null == e) return [];
          c(e) || (e = Object(e));
          var t = e.length;
          t = t && r(t) && (i(e) || l.nonEnumArgs && o(e)) && t || 0;
          for (var n = e.constructor, a = -1, d = "function" == typeof n && n.prototype === e, u = Array(t), h = t > 0; ++a < t;) u[a] = a + "";
          for (var p in e) h && s(p, t) || "constructor" == p && (d || !m.call(e, p)) || u.push(p);
          return u
        }
        var o = n(14),
          i = n(5),
          s = n(13),
          r = n(1),
          c = n(2),
          l = n(29),
          d = Object.prototype,
          m = d.hasOwnProperty;
        e.exports = a
      }, function (e, t, n) {
        function a(e) {
          return e = o(e), e && s.test(e) ? e.replace(i, "\\$&") : e
        }
        var o = n(61),
          i = /[.*+?^${}()|[\]\/\\]/g,
          s = RegExp(i.source);
        e.exports = a
      }, function (e) {
        function t(e) {
          return function () {
            return e
          }
        }
        e.exports = t
      }, function (e) {
        function t(e) {
          return e
        }
        e.exports = t
      }, function (e) {
        "use strict";

        function t(e, t) {
          if (e === t) return !0;
          var n;
          for (n in e)
            if (e.hasOwnProperty(n) && (!t.hasOwnProperty(n) || e[n] !== t[n])) return !1;
          for (n in t)
            if (t.hasOwnProperty(n) && !e.hasOwnProperty(n)) return !1;
          return !0
        }
        e.exports = t
      }, function (e) {
        function t() {
          this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function n(e) {
          return "function" == typeof e
        }

        function a(e) {
          return "number" == typeof e
        }

        function o(e) {
          return "object" == typeof e && null !== e
        }

        function i(e) {
          return void 0 === e
        }
        e.exports = t, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._maxListeners = void 0, t.defaultMaxListeners = 10, t.prototype.setMaxListeners = function (e) {
          if (!a(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
          return this._maxListeners = e, this
        }, t.prototype.emit = function (e) {
          var t, a, s, r, c, l;
          if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
            if (t = arguments[1], t instanceof Error) throw t;
            throw TypeError('Uncaught, unspecified "error" event.')
          }
          if (a = this._events[e], i(a)) return !1;
          if (n(a)) switch (arguments.length) {
            case 1:
              a.call(this);
              break;
            case 2:
              a.call(this, arguments[1]);
              break;
            case 3:
              a.call(this, arguments[1], arguments[2]);
              break;
            default:
              for (s = arguments.length, r = new Array(s - 1), c = 1; s > c; c++) r[c - 1] = arguments[c];
              a.apply(this, r)
          } else if (o(a)) {
            for (s = arguments.length, r = new Array(s - 1), c = 1; s > c; c++) r[c - 1] = arguments[c];
            for (l = a.slice(), s = l.length, c = 0; s > c; c++) l[c].apply(this, r)
          } return !0
        }, t.prototype.addListener = function (e, a) {
          var s;
          if (!n(a)) throw TypeError("listener must be a function");
          if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(a.listener) ? a.listener : a), this._events[e] ? o(this._events[e]) ? this._events[e].push(a) : this._events[e] = [this._events[e], a] : this._events[e] = a, o(this._events[e]) && !this._events[e].warned) {
            var s;
            s = i(this._maxListeners) ? t.defaultMaxListeners : this._maxListeners, s && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
          }
          return this
        }, t.prototype.on = t.prototype.addListener, t.prototype.once = function (e, t) {
          function a() {
            this.removeListener(e, a), o || (o = !0, t.apply(this, arguments))
          }
          if (!n(t)) throw TypeError("listener must be a function");
          var o = !1;
          return a.listener = t, this.on(e, a), this
        }, t.prototype.removeListener = function (e, t) {
          var a, i, s, r;
          if (!n(t)) throw TypeError("listener must be a function");
          if (!this._events || !this._events[e]) return this;
          if (a = this._events[e], s = a.length, i = -1, a === t || n(a.listener) && a.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
          else if (o(a)) {
            for (r = s; r-- > 0;)
              if (a[r] === t || a[r].listener && a[r].listener === t) {
                i = r;
                break
              } if (0 > i) return this;
            1 === a.length ? (a.length = 0, delete this._events[e]) : a.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
          }
          return this
        }, t.prototype.removeAllListeners = function (e) {
          var t, a;
          if (!this._events) return this;
          if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
          if (0 === arguments.length) {
            for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"), this._events = {}, this
          }
          if (a = this._events[e], n(a)) this.removeListener(e, a);
          else
            for (; a.length;) this.removeListener(e, a[a.length - 1]);
          return delete this._events[e], this
        }, t.prototype.listeners = function (e) {
          var t;
          return t = this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, t.listenerCount = function (e, t) {
          var a;
          return a = e._events && e._events[t] ? n(e._events[t]) ? 1 : e._events[t].length : 0
        }
      }])
    })
  }, {}],
  103: [function (e, n, a) {
    function o(e) {
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
    var i = e("superagent");
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
        i.get(e).set("Content-Encoding", "gzip").set(this.defaultHeaders).end(function (a, o) {
          return !o || a ? (n.errorHappen(e), void t({})) : void t((o || {}).text || null)
        })
      },
      get: function (e, t, n) {
        var a = this;
        n = n || {}, i.get(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json;charset=UTF-8").set("Content-Encoding", "gzip").set(this.defaultHeaders).end(function (o, i) {
          return !i || o ? (a.errorHappen(e), void t({})) : void t(n.text ? i.text || "" : i.body || {})
        })
      },
      post: function (e, t, n) {
        var a = this;
        i.post(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (t, o) {
          return !o || t ? (a.errorHappen(e), void n({})) : void n(o.body || {})
        })
      },
      put: function (e, t, n) {
        var a = this;
        i.put(this.makeFinalURL(e)).timeout(this.timeout).send(t).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (t, o) {
          return !o || t ? (a.errorHappen(e), void n({})) : void n(o.body || {})
        })
      },
      del: function (e, t) {
        var n = this;
        i.del(this.makeFinalURL(e)).timeout(this.timeout).set("Accept", "application/json;charset=UTF-8").set(this.defaultHeaders).end(function (a, o) {
          return !o || a ? (n.errorHappen(e), void t({})) : void t(o.body || {})
        })
      },
      upload: function (e, t, n, a) {
        var o = this;
        i.post(this.makeFinalURL(e)).set(this.defaultHeaders).attach(t.name, t.file, t.file.name).on("progress", function (e) {
          var t = parseInt(e.percent || 0);
          n(t)
        }).end(function (t, n) {
          return !n || t ? (o.errorHappen(e), void a({})) : void a(n.body || {})
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
        } catch (a) {}
        if (n) try {
          n.setItem(e, t)
        } catch (a) {
          o(a) && n.clear()
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
  104: [function (e, t, n) {
    var a = function (e) {
      this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), document.body.appendChild(this.canvas), this.width = this.canvas.width = e.width, this.height = this.canvas.height = e.height, this.context.drawImage(e, 0, 0, this.width, this.height)
    };
    a.prototype.clear = function () {
      this.context.clearRect(0, 0, this.width, this.height)
    }, a.prototype.update = function (e) {
      this.context.putImageData(e, 0, 0)
    }, a.prototype.getPixelCount = function () {
      return this.width * this.height
    }, a.prototype.getImageData = function () {
      return this.context.getImageData(0, 0, this.width, this.height)
    }, a.prototype.removeCanvas = function () {
      this.canvas.parentNode.removeChild(this.canvas)
    };
    var o = function () {};
    if (o.prototype.getColor = function (e, t) {
        var n = this.getPalette(e, 5, t),
          a = n[0];
        return a
      }, o.prototype.getPalette = function (e, t, n) {
        "undefined" == typeof t && (t = 10), "undefined" == typeof n && (n = 10);
        for (var o, i, r, c, l, d = new a(e), m = d.getImageData(), u = m.data, h = d.getPixelCount(), p = [], f = 0; h > f; f += n) o = 4 * f, i = u[o + 0], r = u[o + 1], c = u[o + 2], l = u[o + 3], l >= 125 && (i > 250 && r > 250 && c > 250 || p.push([i, r, c]));
        var g = s.quantize(p, t),
          v = [];
        try {
          v = g.palette()
        } catch (R) {}
        return d.removeCanvas(), v
      }, !i) var i = {
      map: function (e, t) {
        var n = {};
        return t ? e.map(function (e, a) {
          return n.index = a, t.call(n, e)
        }) : e.slice()
      },
      naturalOrder: function (e, t) {
        return t > e ? -1 : e > t ? 1 : 0
      },
      sum: function (e, t) {
        var n = {};
        return e.reduce(t ? function (e, a, o) {
          return n.index = o, e + t.call(n, a)
        } : function (e, t) {
          return e + t
        }, 0)
      },
      max: function (e, t) {
        return Math.max.apply(null, t ? i.map(e, t) : e)
      }
    };
    var s = function () {
      function e(e, t, n) {
        return (e << 2 * l) + (t << l) + n
      }

      function t(e) {
        function t() {
          n.sort(e), a = !0
        }
        var n = [],
          a = !1;
        return {
          push: function (e) {
            n.push(e), a = !1
          },
          peek: function (e) {
            return a || t(), void 0 === e && (e = n.length - 1), n[e]
          },
          pop: function () {
            return a || t(), n.pop()
          },
          size: function () {
            return n.length
          },
          map: function (e) {
            return n.map(e)
          },
          debug: function () {
            return a || t(), n
          }
        }
      }

      function n(e, t, n, a, o, i, s) {
        var r = this;
        r.r1 = e, r.r2 = t, r.g1 = n, r.g2 = a, r.b1 = o, r.b2 = i, r.histo = s
      }

      function a() {
        this.vboxes = new t(function (e, t) {
          return i.naturalOrder(e.vbox.count() * e.vbox.volume(), t.vbox.count() * t.vbox.volume())
        })
      }

      function o(t) {
        var n, a, o, i, s = 1 << 3 * l,
          r = new Array(s);
        return t.forEach(function (t) {
          a = t[0] >> d, o = t[1] >> d, i = t[2] >> d, n = e(a, o, i), r[n] = (r[n] || 0) + 1
        }), r
      }

      function s(e, t) {
        var a, o, i, s = 1e6,
          r = 0,
          c = 1e6,
          l = 0,
          m = 1e6,
          u = 0;
        return e.forEach(function (e) {
          a = e[0] >> d, o = e[1] >> d, i = e[2] >> d, s > a ? s = a : a > r && (r = a), c > o ? c = o : o > l && (l = o), m > i ? m = i : i > u && (u = i)
        }), new n(s, r, c, l, m, u, t)
      }

      function r(t, n) {
        function a(e) {
          var t, a, o, i, s, r = e + "1",
            c = e + "2",
            d = 0;
          for (l = n[r]; l <= n[c]; l++)
            if (f[l] > p / 2) {
              for (o = n.copy(), i = n.copy(), t = l - n[r], a = n[c] - l, s = a >= t ? Math.min(n[c] - 1, ~~(l + a / 2)) : Math.max(n[r], ~~(l - 1 - t / 2)); !f[s];) s++;
              for (d = g[s]; !d && f[s - 1];) d = g[--s];
              return o[c] = s, i[r] = o[c] + 1, [o, i]
            }
        }
        if (n.count()) {
          var o = n.r2 - n.r1 + 1,
            s = n.g2 - n.g1 + 1,
            r = n.b2 - n.b1 + 1,
            c = i.max([o, s, r]);
          if (1 == n.count()) return [n.copy()];
          var l, d, m, u, h, p = 0,
            f = [],
            g = [];
          if (c == o)
            for (l = n.r1; l <= n.r2; l++) {
              for (u = 0, d = n.g1; d <= n.g2; d++)
                for (m = n.b1; m <= n.b2; m++) h = e(l, d, m), u += t[h] || 0;
              p += u, f[l] = p
            } else if (c == s)
              for (l = n.g1; l <= n.g2; l++) {
                for (u = 0, d = n.r1; d <= n.r2; d++)
                  for (m = n.b1; m <= n.b2; m++) h = e(d, l, m), u += t[h] || 0;
                p += u, f[l] = p
              } else
                for (l = n.b1; l <= n.b2; l++) {
                  for (u = 0, d = n.r1; d <= n.r2; d++)
                    for (m = n.g1; m <= n.g2; m++) h = e(d, m, l), u += t[h] || 0;
                  p += u, f[l] = p
                }
          return f.forEach(function (e, t) {
            g[t] = p - e
          }), a(c == o ? "r" : c == s ? "g" : "b")
        }
      }

      function c(e, n) {
        function c(e, t) {
          for (var n, a = 1, o = 0; m > o;)
            if (n = e.pop(), n.count()) {
              var i = r(l, n),
                s = i[0],
                c = i[1];
              if (!s) return;
              if (e.push(s), c && (e.push(c), a++), a >= t) return;
              if (o++ > m) return
            } else e.push(n), o++
        }
        if (!e.length || 2 > n || n > 256) return !1;
        var l = o(e),
          d = 0;
        l.forEach(function () {
          d++
        });
        var h = s(e, l),
          p = new t(function (e, t) {
            return i.naturalOrder(e.count(), t.count())
          });
        p.push(h), c(p, u * n);
        for (var f = new t(function (e, t) {
            return i.naturalOrder(e.count() * e.volume(), t.count() * t.volume())
          }); p.size();) f.push(p.pop());
        c(f, n - f.size());
        for (var g = new a; f.size();) g.push(f.pop());
        return g
      }
      var l = 5,
        d = 8 - l,
        m = 1e3,
        u = .75;
      return n.prototype = {
        volume: function (e) {
          var t = this;
          return (!t._volume || e) && (t._volume = (t.r2 - t.r1 + 1) * (t.g2 - t.g1 + 1) * (t.b2 - t.b1 + 1)), t._volume
        },
        count: function (t) {
          var n = this,
            a = n.histo;
          if (!n._count_set || t) {
            var o, i, s, r = 0;
            for (o = n.r1; o <= n.r2; o++)
              for (i = n.g1; i <= n.g2; i++)
                for (s = n.b1; s <= n.b2; s++) index = e(o, i, s), r += a[index] || 0;
            n._count = r, n._count_set = !0
          }
          return n._count
        },
        copy: function () {
          var e = this;
          return new n(e.r1, e.r2, e.g1, e.g2, e.b1, e.b2, e.histo)
        },
        avg: function (t) {
          var n = this,
            a = n.histo;
          if (!n._avg || t) {
            var o, i, s, r, c, d = 0,
              m = 1 << 8 - l,
              u = 0,
              h = 0,
              p = 0;
            for (i = n.r1; i <= n.r2; i++)
              for (s = n.g1; s <= n.g2; s++)
                for (r = n.b1; r <= n.b2; r++) c = e(i, s, r), o = a[c] || 0, d += o, u += o * (i + .5) * m, h += o * (s + .5) * m, p += o * (r + .5) * m;
            d ? n._avg = [~~(u / d), ~~(h / d), ~~(p / d)] : n._avg = [~~(m * (n.r1 + n.r2 + 1) / 2), ~~(m * (n.g1 + n.g2 + 1) / 2), ~~(m * (n.b1 + n.b2 + 1) / 2)]
          }
          return n._avg
        },
        contains: function (e) {
          var t = this,
            n = e[0] >> d;
          return gval = e[1] >> d, bval = e[2] >> d, n >= t.r1 && n <= t.r2 && gval >= t.g1 && gval <= t.g2 && bval >= t.b1 && bval <= t.b2
        }
      }, a.prototype = {
        push: function (e) {
          this.vboxes.push({
            vbox: e,
            color: e.avg()
          })
        },
        palette: function () {
          return this.vboxes.map(function (e) {
            return e.color
          })
        },
        size: function () {
          return this.vboxes.size()
        },
        map: function (e) {
          for (var t = this.vboxes, n = 0; n < t.size(); n++)
            if (t.peek(n).vbox.contains(e)) return t.peek(n).color;
          return this.nearest(e)
        },
        nearest: function (e) {
          for (var t, n, a, o = this.vboxes, i = 0; i < o.size(); i++) n = Math.sqrt(Math.pow(e[0] - o.peek(i).color[0], 2) + Math.pow(e[1] - o.peek(i).color[1], 2) + Math.pow(e[2] - o.peek(i).color[2], 2)), (t > n || void 0 === t) && (t = n, a = o.peek(i).color);
          return a
        },
        forcebw: function () {
          var e = this.vboxes;
          e.sort(function (e, t) {
            return i.naturalOrder(i.sum(e.color), i.sum(t.color))
          });
          var t = e[0].color;
          t[0] < 5 && t[1] < 5 && t[2] < 5 && (e[0].color = [0, 0, 0]);
          var n = e.length - 1,
            a = e[n].color;
          a[0] > 251 && a[1] > 251 && a[2] > 251 && (e[n].color = [255, 255, 255])
        }
      }, {
        quantize: c
      }
    }();
    o.prototype.contrast = function (e) {
      var t = "white",
        n = 255;
      try {
        n = .2126 * e[0] + .7152 * e[1] + .0722 * e[2], n > 128 && (t = "black")
      } catch (a) {}
      return [t, n]
    }, o.prototype.shadeRGBColor = function (e, t) {
      var n = e.split(","),
        a = 0 > t ? 0 : 255,
        o = 0 > t ? -1 * t : t,
        i = parseInt(n[0].slice(4)),
        s = parseInt(n[1]),
        r = parseInt(n[2]);
      return [Math.round((a - i) * o) + i, Math.round((a - s) * o) + s, Math.round((a - r) * o) + r]
    }, o.prototype.getDarkPalette = function (e, t) {
      var n = [0, 0, 0];
      _this = this;
      try {
        n = "undefined" != typeof t ? e : _this.getColor(e, 1), "object" != typeof n && (n = [0, 0, 0]), 3 != n.length && (n = [0, 0, 0]);
        var a = _this.contrast(n);
        "black" == a[0] && (n = _this.shadeRGBColor("rgb(" + n[0] + "," + n[1] + "," + n[2] + ")", .390625 * (a[1] - 100) / 100 * -1))
      } catch (o) {}
      return n[0] + "," + n[1] + "," + n[2]
    }, t.exports = o.prototype
  }, {}],
  105: [function (e, t, n) {
    t.exports = {
      colorFromString: function (e) {
        try {
          e = e.trim()
        } catch (t) {
          t && (e = "")
        }
        if ("" != e) {
          var n, a, o, i, s, r, c, l;
          for (s = 0, r = 0; r < e.length;) s = e.charCodeAt(r) + ((s << 5) - s), r++;
          for (o = "", r = 0; 3 > r;) l = s >> 8 * r & 255, o += ("00" + l.toString(16)).substr(-2), r++;
          return a = parseInt(o, 16), c = a >> 16 & 255, i = a >> 8 & 255, n = 255 & a, [c, i, n]
        }
        return [0, 0, 0]
      }
    }
  }, {}],
  106: [function (e, n, a) {
    n.exports = {
      maxFileSize: 10485760,
      fileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      getAcceptString: function () {
        return this.fileTypes.join(",")
      },
      getHumanAcceptString: function () {
        return t.s("images") + " (PNG, JPEG, GIF), " + t.s("links") + ". Soon: PDF, Mark Down"
      },
      containsFiles: function (e) {
        if ("function" != typeof window.dropFiles) return !1;
        if (e.dataTransfer.types)
          for (var t = 0; t < e.dataTransfer.types.length; t++)
            if ("Files" == e.dataTransfer.types[t]) return !0;
        return !1
      },
      makeInfoDiv: function () {
        if (!document.getElementById("drop-zone-info")) {
          var e = document.createElement("div");
          e.id = "drop-zone-info", document.body.appendChild(e), React.render(React.createElement("div", null, React.createElement("img", {
            id: "drop-zone-image",
            src: (window.pathPrefix || "") + "../common/images/filetypes.svg",
            alt: ""
          }), React.createElement("strong", null, "Drag & Drop"), React.createElement("span", null, this.getHumanAcceptString())), e)
        }
      },
      removeInfoDiv: function () {
        var e = document.getElementById("drop-zone-info");
        e && document.body.removeChild(e)
      },
      validateFiles: function (e) {
        var t = [];
        for (var n in e) {
          var a = e[n]; - 1 != this.fileTypes.indexOf(a.type) && a.size <= this.maxFileSize && t.push({
            type: "image",
            file: a
          })
        }
        return t
      },
      bind: function () {
        var e = this,
          t = document.body;
        new Event("fileDropped");
        t.addEventListener("dragover", function (t) {
          e.containsFiles(t) && (t.dataTransfer.dropEffect = "copy", t.preventDefault && t.preventDefault(), this.classList.add("dropfile-over"), e.makeInfoDiv())
        }), t.addEventListener("dragenter", function (t) {
          e.containsFiles(t) && (t.dataTransfer.dropEffect = "copy", this.classList.add("dropfile-over"), e.makeInfoDiv())
        }), t.addEventListener("dragleave", function (t) {
          this.classList.remove("dropfile-over"), e.removeInfoDiv()
        }), t.addEventListener("drop", function (t) {
          if (e.containsFiles(t)) {
            t.preventDefault(), t.stopPropagation && t.stopPropagation(), this.classList.remove("dropfile-over"), window.dropFiles({
              files: e.validateFiles(t.dataTransfer.files)
            });
            try {
              window.dispatchEvent(t)
            } catch (t) {}
          }
          e.removeInfoDiv()
        })
      }
    }
  }, {}],
  107: [function (e, t, n) {
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
  108: [function (e, n, a) {
    n.exports = {
      getCurrentBrowser: function () {
        var e = [];
        return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && e.push("chrome"), /constructor/i.test(window.HTMLElement) && e.push("safari"), "MozAppearance" in document.documentElement.style && e.push("firefox"), (window.opera || /opera|opr/i.test(navigator.userAgent)) && e.push("opera"), "WebkitAppearance" in document.documentElement.style && e.push("webkit"), -1 != navigator.appVersion.indexOf("Win") && e.push("Windows"), -1 != navigator.appVersion.indexOf("Mac") && e.push("MacOS"), -1 != navigator.appVersion.indexOf("X11") && e.push("UNIX"), -1 != navigator.appVersion.indexOf("Linux") && e.push("Linux"), e
      },
      swapArray: function (e, t, n) {
        var e = _.clone(e),
          a = _.clone(e[t]);
        return e[t] = _.clone(e[n]), e[n] = _.clone(a), e
      },
      parseSearch: function (e) {
        var t = "word",
          n = /type\-(image|video|link|article)/i;
        return e.match(new RegExp(/(^|\s)#([^ ]*)/i)) ? (t = "tag", e = e.replace(/,/g, "").replace(/#/g, "")) : e.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/)) ? (t = "domain", e = e.toLowerCase()) : e.match(new RegExp(n)) && (t = "type", e = e.match(n)[1]), {
          key: t,
          val: e
        }
      },
      inputSelectAllMixin: {
        handleSelectAll: function (e) {
          e.target.focus(), e.target.select()
        }
      },
      getErrorFromJSON: function (e) {
        return "undefined" != typeof e.error ? t.s("server" + e.error) : "undefined" == typeof e.auth || e.auth ? t.s("server") : t.s("startToSave")
      },
      defaultTitle: function () {
        if (-1 != (window.environment || []).indexOf("desktop")) return "Raindrop.io";
        var e = t.s("pro_speed_dial");
        return -1 != e.indexOf("(") && (e = e.substr(0, e.indexOf("(") - 1)), e = S(e).replaceAll('"', "").s, -1 != e.indexOf("-") && (e = e.substr(0, e.indexOf("-") - 1)), e
      },
      beautifulDomain: function (e) {
        var t = "";
        try {
          t = network.cleanDomain(e)
        } catch (n) {}
        try {
          t = t.match(/(.*)\./i)[1]
        } catch (n) {}
        try {
          t = t.replace(/-/g, " ").replace(/_/g, " ")
        } catch (n) {}
        try {
          t = t.replace(/\w\S*/g, function (e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
          })
        } catch (n) {}
        return t || e
      },
      copyTextToClipboard: function (e) {
        if ("undefined" != typeof MacGap) return void MacGap.Clipboard.copy(e);
        var t = document.createElement("textarea");
        t.style.position = "fixed", t.style.top = 0, t.style.left = 0, t.style.width = "2em", t.style.height = "2em", t.style.padding = 0, t.style.border = "none", t.style.outline = "none", t.style.boxShadow = "none", t.style.background = "transparent", t.value = e, document.body.appendChild(t), t.select();
        try {
          var n = document.execCommand("copy"),
            a = n ? "successful" : "unsuccessful";
          console.log("Copying text command was " + a)
        } catch (o) {
          console.log("Oops, unable to copy")
        }
        document.body.removeChild(t)
      },
      humanFileSize: function (e, t) {
        var n = t ? 1e3 : 1024;
        if (Math.abs(e) < n) return e + " B";
        var a = t ? ["Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
          o = -1;
        do e /= n, ++o; while (Math.abs(e) >= n && o < a.length - 1);
        return e.toFixed(1) + " " + a[o]
      },
      parseBrowserQuery: function () {
        var e = {};
        try {
          var t = window.location.search.substr(1, window.location.search.length).split("&");
          t.forEach(function (t) {
            var n = t.split("=");
            e[n[0]] = decodeURIComponent(n[1])
          })
        } catch (n) {}
        return e
      }
    }
  }, {}],
  109: [function (e, t, n) {
    e("moment/locale/id.js"), e("moment/locale/de.js"), e("moment/locale/es.js"), e("moment/locale/fr.js"), e("moment/locale/nl.js"), e("moment/locale/pl.js"), e("moment/locale/pt.js"), e("moment/locale/fi.js"), e("moment/locale/tr.js"), e("moment/locale/ru.js"), e("moment/locale/uk.js"), e("moment/locale/ko.js"), e("moment/locale/zh-cn.js"), e("moment/locale/zh-tw.js"), t.exports = {
      defaultLang: "de_DE",
      currentLang: "de_DE",
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
  110: [function (e, t, n) {
    t.exports = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg width="96px" height="12px" viewBox="0 0 96 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n    <!-- Generator: Sketch 3.3.1 (12002) - http://www.bohemiancoding.com/sketch -->\n    <title>logo-text</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Home" sketch:type="MSArtboardGroup" transform="translate(-73.000000, -34.000000)" fill="#000000">\n            <g id="sidebar" sketch:type="MSLayerGroup" transform="translate(-9.000000, 1.000000)">\n                <g id="logo-text" transform="translate(82.000000, 33.000000)" sketch:type="MSShapeGroup">\n                    <path d="M92.5,7 C94.4329966,7 96,5.43299662 96,3.5 C96,1.56700338 94.4329966,0 92.5,0 C90.5670034,0 89,1.56700338 89,3.5 C89,5.43299662 90.5670034,7 92.5,7 Z M92.5,6 C93.8807119,6 95,4.88071187 95,3.5 C95,2.11928813 93.8807119,1 92.5,1 C91.1192881,1 90,2.11928813 90,3.5 C90,4.88071187 91.1192881,6 92.5,6 Z M86,0 L87,0 L87,7 L86,7 L86,0 Z M83,7 C83.5522847,7 84,6.55228475 84,6 C84,5.44771525 83.5522847,5 83,5 C82.4477153,5 82,5.44771525 82,6 C82,6.55228475 82.4477153,7 83,7 Z" id="io" opacity="0.5"></path>\n                    <path d="M8.392,11 L5.784,6.808 C7.064,6.6 8.312,5.576 8.312,3.672 C8.312,1.704 6.936,0.328 4.824,0.328 L0.136,0.328 L0.136,11 L2.008,11 L2.008,7.016 L3.864,7.016 L6.232,11 L8.392,11 Z M4.568,5.368 L2.008,5.368 L2.008,1.976 L4.568,1.976 C5.624,1.976 6.392,2.648 6.392,3.672 C6.392,4.696 5.624,5.368 4.568,5.368 L4.568,5.368 Z M19.784,11 L15.592,0.328 L13.256,0.328 L9.064,11 L11.192,11 L11.976,8.952 L16.872,8.952 L17.656,11 L19.784,11 Z M16.344,7.304 L12.504,7.304 L14.424,2.216 L16.344,7.304 Z M22.824,11 L22.824,0.328 L20.952,0.328 L20.952,11 L22.824,11 Z M34.344,11 L34.344,0.328 L32.472,0.328 L32.472,7.736 L27.016,0.328 L25.096,0.328 L25.096,11 L26.968,11 L26.968,3.384 L32.536,11 L34.344,11 Z M40.584,11 C43.912,11 46.168,8.808 46.168,5.672 C46.168,2.536 43.912,0.328 40.584,0.328 L36.616,0.328 L36.616,11 L40.584,11 Z M40.584,9.352 L38.488,9.352 L38.488,1.976 L40.584,1.976 C42.968,1.976 44.248,3.608 44.248,5.672 C44.248,7.688 42.904,9.352 40.584,9.352 L40.584,9.352 Z M56.232,11 L53.624,6.808 C54.904,6.6 56.152,5.576 56.152,3.672 C56.152,1.704 54.776,0.328 52.664,0.328 L47.976,0.328 L47.976,11 L49.848,11 L49.848,7.016 L51.704,7.016 L54.072,11 L56.232,11 Z M52.408,5.368 L49.848,5.368 L49.848,1.976 L52.408,1.976 C53.464,1.976 54.232,2.648 54.232,3.672 C54.232,4.696 53.464,5.368 52.408,5.368 L52.408,5.368 Z M63,11.192 C66.2,11.192 68.456,8.856 68.456,5.672 C68.456,2.488 66.2,0.152 63,0.152 C59.8,0.152 57.544,2.488 57.544,5.672 C57.544,8.856 59.8,11.192 63,11.192 L63,11.192 Z M63,9.528 C60.84,9.528 59.464,7.864 59.464,5.672 C59.464,3.464 60.84,1.816 63,1.816 C65.144,1.816 66.536,3.464 66.536,5.672 C66.536,7.864 65.144,9.528 63,9.528 L63,9.528 Z M72.136,11 L72.136,7.016 L74.952,7.016 C77.176,7.016 78.44,5.48 78.44,3.672 C78.44,1.864 77.192,0.328 74.952,0.328 L70.264,0.328 L70.264,11 L72.136,11 Z M74.696,5.368 L72.136,5.368 L72.136,1.976 L74.696,1.976 C75.752,1.976 76.52,2.648 76.52,3.672 C76.52,4.696 75.752,5.368 74.696,5.368 L74.696,5.368 Z" id="raindrop"></path>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>'
  }, {}],
  111: [function (e, t, n) {
    t.exports = t.exports = '{\n  "manifest_version": 2,\n  "name": "Raindrop.io New Tab / Speed Dial",\n  "default_locale": "en",\n  "description": "Your beautiful start page with favorite sites and bookmarks.",\n  "homepage_url": "https://raindrop.io",\n  "short_name": "RaindropNewTab",\n  "version": "0.7.5",\n  "default_locale": "en",\n\n  "offline_enabled": true,\n\n  "commands": {\n    "_execute_page_action": {\n      "suggested_key": {\n        "windows": "Ctrl+E",\n        "mac": "Command+E",\n        "chromeos": "Ctrl+E",\n        "linux": "Ctrl+E"\n      }\n    }\n  },\n\n  "background": {\n		"scripts": ["background.js"],\n		"persistent": true\n	},\n\n  "permissions": [\n    "tabs",\n    "storage",\n    "*://*/*",\n    "<all_urls>",\n    "notifications"\n  ],\n\n  "icons" : {\n    "16": "common/images/icon-16.png",\n    "48" : "common/images/icon-48.png",\n    "128" : "common/images/icon-128.png"\n  },\n\n  "chrome_url_overrides" : {\n    "newtab": "app/index.html#/"\n  },\n\n  "options_page": "settings/settings.html",\n  \n  "options_ui": {\n    "page": "settings/settings.html",\n    "chrome_style": true\n  },\n\n  "page_action": {\n    "default_icon": {\n      "19": "common/images/page-action-19.png",\n      "38": "common/images/page-action-38.png"\n    },\n    "default_title": "Save to Raindrop.io",\n    "default_popup": "miniclipper/index.html"\n  },\n\n  "content_security_policy": "script-src \'self\' https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.intercom.io https://*.intercomcdn.com https://*.getsentry.com https://*.ravenjs.com https://*.uservoice.com; object-src \'self\'"\n}\n'
  }, {}],
  112: [function (e, t, n) {
    var a = e("../actions/Bookmark"),
      o = {};
    t.exports = Reflux.createStore({
      init: function () {
        this.listenTo(a.load, this.onLoad)
      },
      onLoad: function (e) {
        var t = this;
        Api.get("raindrop/" + e, function (e) {
          o = e.item || {}, t.trigger(o)
        })
      },
      getItem: function (e) {
        return o = {}, o._id = e, o.navigation = {}, o
      }
    })
  }, {
    "../actions/Bookmark": 1
  }],
  113: [function (e, n, a) {
    var o = e("../actions/Bookmarks"),
      i = e("../actions/Collections"),
      s = e("../stores/Collections"),
      r = e("../actions/LastBookmark"),
      c = e("validator"),
      l = [],
      d = !1,
      m = !1,
      u = !1,
      h = !1,
      p = "",
      f = "sync",
      g = [],
      v = 0,
      R = {
        excerpt: "",
        html: "",
        media: [],
        title: "",
        type: "link"
      },
      k = {
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
          this.listenTo(o.load, this.onLoad), this.listenTo(o.reset, this.reset), this.listenTo(o.parseURL, this.onParseURL), this.listenTo(o.loadBookmark, this.onLoadBookmark), this.listenTo(o.insertBookmark, this.onInsertBookmark), this.listenTo(o.updateBookmark, this.onUpdateBookmark), this.listenTo(o.updateSelectedBookmarks, this.onUpdateSelectedBookmarks), this.listenTo(o.removeBookmark, this.onRemoveBookmark), this.listenTo(o.removeSelectedBookmarks, this.onRemoveSelectedBookmarks), this.listenTo(o.copySelectedBookmarks, this.onCopySelectedBookmarks), this.listenTo(o.swapBookmarks, this.onSwapBookmarks), this.listenTo(o.saveAllSort, this.onSaveAllSort), this.listenTo(o.syncMove, this.onSyncMove), this.listenTo(o.setSelected, this.onSetSelected), this.listenTo(o.selectAll, this.onSelectAll), this.listenTo(o.clearSelect, this.onClearSelect), this.listenTo(o.initFavorites, this.onInitFavorites)
        },
        onLoad: function (e, t) {
          if (f = "undefined" != typeof e.speed ? e.speed : "sync", d || 0 == e.page && this.reset(), d || u) "undefined" != typeof t && t();
          else {
            d = !0;
            var n = this;
            p = "raindrops/" + e.cId, e.sort = e.sort || "lastUpdate";
            var a = _.map(e, function (e, t) {
              return t + "=" + e
            });
            if (a.length > 0 && (p += "?" + a.join("&")), h = "title" != e.sort && !e.page, window.cacheDisabled && (h = !1), h) switch (f) {
              case "async":
                try {
                  ls.getItem(p).then(function (e) {
                    e && !m && (l = e, n.trigger(l))
                  })["catch"](function (e) {})
                } catch (o) {}
                break;
              case "sync":
                l = [];
                try {
                  l = JSON.parse(Api.getItem(p)) || []
                } catch (o) {
                  o && (l = [])
                }
                l.length > 0 && n.trigger(l)
            }
            Api.get(p, function (a) {
              a.result && parseInt(s.getCurrentId()) == a.collectionId ? (0 == e.page ? (l = a.items || [], i.updateCountCollection({
                _id: e.cId,
                count: a.count || 0
              })) : l = l.concat(a.items || []), u = 0 == (a.items || []).length, d = !1) : (l = [], u = !0, d = !1), m = !0, n.update(), "undefined" != typeof t && t()
            })
          }
        },
        onLoadBookmark: function (e, t) {
          var n = this,
            a = function (e, a) {
              var o = [];
              for (var i in a) o.push(i + "=" + a[i]);
              Api.get("raindrop/" + e + "?" + o.join("&"), function (e) {
                t(e.result ? n._prepareBookmark(e.item, e.item) : !1)
              })
            };
          "undefined" != typeof e.url ? Api.post("check/url", {
            url: e.url
          }, function (n) {
            n.result ? e.onlyId ? t({
              _id: n.id
            }) : a(n.id, e) : t(!1)
          }) : a(e._id, {})
        },
        onParseURL: function (e, t) {
          var n = e.item.url || "",
            a = this;
          try {
            n.indexOf("://") < 3 && (n = "http://" + n)
          } catch (o) {}
          c.isURL(n, {
            require_tld: !1,
            require_valid_protocol: !1
          }) ? Api.get("parse?url=" + encodeURIComponent(n), function (n) {
            try {
              n = JSON.parse(n)
            } catch (o) {}
            n = n || {
              result: !1
            }, n.item = a._prepareBookmark(e.item, n.item), t(n.item)
          }, {
            text: !0
          }) : t(!1)
        },
        _prepareBookmark: function (e, t) {
          var n = !1;
          if ("undefined" == typeof t ? n = !0 : null == t && (n = !0), n && (t = _.clone(R)), t.link = e.url || t.link, t.url = e.url, t.cover = 0, t.coverId = e.coverId, t.coverEnabled = !0, t.domain = t.domain || network.getDomain(e.url), "" == t.title) {
            t.title = S(t.domain).capitalize().s;
            try {
              t.title = t.title.split(".")[0]
            } catch (a) {}
          }
          return "undefined" != typeof e.collection && (t.collectionId = e.collection.$id), "undefined" != typeof e.collectionId && (t.collectionId = e.collectionId, t.collection = {
            $id: e.collectionId
          }), t
        },
        onInsertBookmark: function (e, n) {
          var a = this;
          e.dontAdd = e.dontAdd || !1, e.toEndOfList && (e.item.sort = 0);
          var o = function (n) {
            if (!e.dontAdd) {
              if (n._id = n._id || (new Date).getTime(), "object" == typeof e.placeholder)
                for (var o in e.placeholder) n[o] = e.placeholder[o];
              e.toEndOfList ? l.push(n) : l.unshift(n), i.updateCountCollection({
                _id: e.item.collectionId,
                count: "+"
              }), a.update()
            }
            e.silent || Toasts.show({
              text: t.s((e.item.type || "link") + "Saved"),
              title: e.item.title
            }), Api.setItem("last_collection", e.item.collectionId), r.insert(n)
          };
          UserStore.isLogged() ? Api.post("raindrop", e.item, function (t) {
            t.result ? o(t.item) : e.silent || Toasts.show({
              text: strings.getErrorFromJSON(t),
              title: e.item.title,
              status: "error"
            }), n(t.item || !1)
          }) : e.possibleWithoutAuth ? (o(e.item), n(e.item)) : n(!1)
        },
        onUploadFile: function (e, n) {
          var a = this;
          Api.upload("raindrop/" + e.item._id + "/file", {
            name: "file",
            file: e.file
          }, function (t) {
            if (t) {
              var n = _.findIndex(l, {
                _id: e.item._id
              }); - 1 != n && (l[n].progress = t), a.update()
            }
          }, function (o) {
            if (o.result) {
              var i = _.findIndex(l, {
                _id: e.item._id
              }); - 1 != i && (l[i] = o.item, l[i].loading = !1), a.update()
            } else Toasts.show({
              text: t.s("fileUploadUnable"),
              title: e.item.title,
              status: "error"
            }), a.onRemoveBookmark({
              item: e.item,
              silent: !0
            });
            n(o)
          })
        },
        onUpdateBookmark: function (e, n) {
          var a = _.clone(e),
            o = this;
          if ("undefined" == typeof a.updateModel && (a.updateModel = !0), "undefined" == typeof a.successMessage && (a.successMessage = t.s("saveSuccess")), "object" == typeof a.append && a.append.length > 0) {
            var s = _.findIndex(l, {
              _id: a.item._id
            });
            if (-1 != s)
              for (var r in a.append) switch (typeof l[s][a.append[r]]) {
                case "object":
                  a.item[a.append[r]] = l[s][a.append[r]].concat(a.item[a.append[r]]), a.item[a.append[r]] = _.uniq(a.item[a.append[r]]);
                  break;
                case "string":
                  a.item[a.append[r]] = l[s][a.append[r]] + a.item[a.append[r]]
              }
          }
          Api.put("raindrop/" + a.item._id, a.item, function (e) {
            if (e.result) {
              if (Api.setItem("last_collection", e.item.collection.$id), a.updateModel) {
                var t = _.findIndex(l, {
                  _id: a.item._id
                });
                if (-1 != t) {
                  var s = "update";
                  switch (e.item.collection.$id != l[t].collection.$id && (s = "remove"), 0 === a.showingCollectionId && (s = "update"), s) {
                    case "update":
                      l[t] = e.item;
                      break;
                    case "remove":
                      i.updateCountCollection({
                        _id: l[t].collection.$id,
                        count: "-"
                      }), i.updateCountCollection({
                        _id: e.item.collection.$id,
                        count: "+"
                      }), l.splice(t, 1)
                  }
                  o.update()
                }
              }
              a.silent || Toasts.show({
                text: a.successMessage,
                title: e.item.title
              })
            } else a.silent || Toasts.show({
              text: strings.getErrorFromJSON(e),
              status: "error"
            });
            "function" == typeof n && n((e.item || [])._id || !1)
          })
        },
        onUpdateSelectedBookmarks: function (e, t) {
          var n = [],
            a = this;
          for (var i in l) l[i].selected && n.push(l[i]._id);
          var s = 0,
            r = v,
            c = function (e) {
              e ? (s++, r - 1 >= s ? d() : (a.onClearSelect(), t(!0))) : (a.onClearSelect(), t(!1))
            },
            d = function () {
              var t = JSON.parse(JSON.stringify(e));
              t.item._id = parseInt(n[s]), o.updateBookmark(t, c)
            };
          d()
        },
        onCopySelectedBookmarks: function (e, t) {
          var n = [],
            a = this;
          for (var i in l) l[i].selected && n.push(l[i]._id);
          var s = 0,
            r = v,
            c = function (e) {
              e ? (s++, r - 1 >= s ? d() : (a.onClearSelect(), t(!0))) : (a.onClearSelect(), t(!1))
            },
            d = function () {
              Api.get("raindrop/" + n[s], function (n) {
                if (n.result) {
                  var i = n.item.link;
                  n.item = a._prepareBookmark(n.item, n.item), n.item.link = n.item.url = i, n.item.collectionId = e.collectionId, delete n.item._id, delete n.item.sort, delete n.item.collection, delete n.item.lastUpdate, o.insertBookmark({
                    item: n.item,
                    dontAdd: !0,
                    silent: !0
                  }, c)
                } else a.onClearSelect(), t(!1)
              })
            };
          d()
        },
        onRemoveBookmark: function (e, n) {
          var a = this,
            o = "",
            s = function () {
              "undefined" != typeof e.item.collection && -99 == e.item.collection.$id && (o = "Permament"), UserStore.isLogged() || (o = "Permament");
              var n = _.findIndex(l, {
                _id: e.item._id
              });
              try {
                i.updateCountCollection({
                  _id: e.item.collection.$id,
                  count: "-"
                })
              } catch (s) {} - 1 != n && (l.splice(n, 1), a.update()), e.silent || Toasts.show({
                text: t.s((e.item.type || "link") + "Removed" + o),
                title: e.item.title
              }), r.remove(e.item)
            };
          UserStore.isLogged() ? Api.del("raindrop/" + e.item._id, function (t) {
            t.result ? s() : e.silent || Toasts.show({
              text: strings.getErrorFromJSON(t),
              title: e.item.title,
              status: "error"
            }), "function" == typeof n && n(t.result || !1, o)
          }) : (s(), "function" == typeof n && n(!0, o))
        },
        onRemoveSelectedBookmarks: function (e, t) {
          var n = [],
            a = this;
          for (var i in l) l[i].selected && n.push(l[i]);
          var s = 0,
            r = v,
            c = function (e, n) {
              e ? (s++, r - 1 >= s ? d() : (a.onClearSelect(), t(!0, n))) : (a.onClearSelect(), t(!1))
            },
            d = function () {
              var t = e;
              t.item = n[s], o.removeBookmark(t, c)
            };
          d()
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
          var a = _.clone(l[t].sort),
            o = _.clone(l[n].sort),
            i = _.clone(l[t]);
          l[t] = l[n], l[n] = i, l[t].sort = a, l[n].sort = o, this.update(), e.preservList && (g[e.fromId] = !0, g[e.toId] = !0)
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
              a = 0;
            if (l.forEach(function (e, a) {
                e.selected && a != t && n.push(a)
              }), n.length > 0 && (a = n.reduce(function (e, n) {
                return Math.abs(n - t) < Math.abs(e - t) ? n : e
              })), t > a)
              for (var o = a; t > o; o++) l[o].selected = !0;
            else
              for (var o = t; a > o; o++) l[o].selected = !0
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
          return d
        },
        getIsNoMore: function () {
          return u
        },
        getCount: function () {
          return l.length
        },
        getSelectedCount: function () {
          return v
        },
        update: function (e) {
          if ("undefined" == typeof e && (e = !0), this.trigger(l), h && e) switch (f) {
            case "async":
              try {
                ls.setItem(p, l).then(function () {})["catch"](function (e) {})
              } catch (t) {}
              break;
            case "sync":
              Api.setItem(p, JSON.stringify(l))
          }
        },
        onInitFavorites: function () {
          var e = this,
            n = !1,
            a = !0;
          try {
            UserStore.getUser().config.web_init_favorites && (a = !1)
          } catch (o) {}
          "undefined" != typeof chrome && "undefined" != typeof chrome.topSites && (n = !0);
          var i = function () {
              var e = t.getLang();
              "undefined" == typeof k[e] && (e = "en_US"), l = k[e]
            },
            s = function () {
              l.forEach(function (e) {
                e.url = e.link, Api.post("raindrop", e, function (e) {})
              }), UserStore.saveConfig({
                notify: !0,
                name: "web_init_favorites",
                updateModel: !1
              })
            };
          0 == l.length && a && (n ? chrome.topSites.get(function (t) {
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
            0 == l.length && i(), e.update(), s()
          }) : (i(), e.update(), s()))
        },
        handleDropFiles: function (e) {
          var n = s.getCurrentId("file"),
            a = Promise.resolve(),
            o = e.files.map(function (e) {
              return a = a.then(function () {
                return new Promise(function (e, t) {
                  n != s.getCurrentId() ? (window.location.hash = "#/collection/" + n, setTimeout(function () {
                    e(!0)
                  }, 200)) : e(!0)
                })
              }).then(function () {
                return new Promise(function (t, n) {
                  if (e.file.size < 1048576) {
                    var a = new FileReader;
                    a.onloadend = function () {
                      t(a.result)
                    }, a.onerror = function () {
                      t(null)
                    }, a.readAsDataURL(e.file)
                  } else t(null)
                })
              }).then(function (t) {
                return new Promise(function (a, o) {
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
                      } catch (a) {}
                      if (e) try {
                        t && (e.src = t || "", e.removeAttribute("srcset"))
                      } catch (a) {}
                    }, 1), a({
                      item: n,
                      file: e.file
                    })
                  })
                })
              })
            });
          o.length > 0 ? (Toasts.show({
            text: t.s("importingInfo2"),
            title: t.s("uploadProgress")
          }), Promise.all(o).then(function (e) {
            e.reverse();
            var t = Promise.resolve(),
              n = e.map(function (e) {
                var n = e.item;
                return t = t.then(function () {
                  return new Promise(function (t, a) {
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
            for (var a in e) e[a].result && n++;
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
              a = 0;
            return "undefined" != typeof l[t + 1] && (n = l[t + 1]._id), "undefined" != typeof l[t - 1] && (a = l[t - 1]._id), {
              next: n,
              prev: a
            }
          }
          return {
            next: 0,
            prev: 0
          }
        },
        reset: function (e) {
          l = [], d = !1, m = !1, u = !1, v = 0, e && this.update()
        }
      });
    n.exports = C
  }, {
    "../actions/Bookmarks": 2,
    "../actions/Collections": 4,
    "../actions/LastBookmark": 5,
    "../stores/Collections": 115,
    validator: "validator"
  }],
  114: [function (e, t, n) {
    var a = e("../actions/Childrens"),
      o = e("../actions/Collections"),
      i = e("../stores/Collections"),
      s = [],
      r = !1,
      c = "sync",
      l = Reflux.createStore({
        init: function () {
          this.listenTo(a.load, this.onLoad), this.listenTo(a.swapCollections, this.onSwapCollections), this.listenTo(a.saveAllSort, this.onSaveAllSort), this.listenTo(o.updateCollection, this.onUpdateCollection), this.listenTo(a.removeCollection, this.onRemoveCollection)
        },
        onLoad: function (e) {
          c = "undefined" != typeof e.speed ? e.speed : "sync";
          var t = this,
            n = "collections?parent=" + e.cId;
          if (r = !0, e.cId > 0) {
            switch (s = [], c) {
              case "async":
                try {
                  ls.getItem(n).then(function (e) {
                    e && 0 == s.length && (s = e, t.trigger(s))
                  })["catch"](function (e) {})
                } catch (a) {}
                break;
              case "sync":
                try {
                  s = JSON.parse(Api.getItem(n)) || []
                } catch (a) {
                  a && (s = [])
                }
                s.length > 0 && t.trigger(s)
            }
            Api.get(n, function (a) {
              if (r = !1, parseInt(i.getCurrentId()) != parseInt(e.cId)) return !1;
              switch (s = a.result ? a.items : [], c) {
                case "async":
                  try {
                    ls.setItem(n, s).then(function () {})["catch"](function (e) {})
                  } catch (o) {}
                  break;
                case "sync":
                  Api.setItem(n, JSON.stringify(s))
              }
              t.trigger(s)
            })
          } else r = !1
        },
        onSwapCollections: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = _.findIndex(s, {
              _id: parseInt(e.fromId)
            }),
            n = _.findIndex(s, {
              _id: parseInt(e.toId)
            });
          if (-1 == t || -1 == n) return !1;
          var a = (_.clone(s[t].sort), _.clone(s[n].sort), _.clone(s[t]));
          s[t] = s[n], s[n] = a, this.trigger(s)
        },
        onSaveAllSort: function () {
          for (var e in s) s[e].sort = e, UserStore.isLogged() && o.updateCollection({
            item: {
              _id: s[e]._id,
              sort: s[e].sort
            },
            silent: !0,
            updateModel: !1
          })
        },
        getChildrens: function () {
          return s
        },
        onUpdateCollection: function (e) {
          var t = _.findIndex(s, {
            _id: e.item._id
          });
          if (-1 != t)
            for (var n in e.item) s[t][n] = e.item[n]
        },
        onRemoveCollection: function (e) {
          var t = _.findIndex(s, {
            _id: e.item._id
          }); - 1 != t && s.splice(t, 1)
        },
        getIsLoading: function () {
          return r
        },
        getCount: function () {
          return s.length
        },
        reset: function () {
          s = []
        }
      });
    t.exports = l
  }, {
    "../actions/Childrens": 3,
    "../actions/Collections": 4,
    "../stores/Collections": 115
  }],
  115: [function (e, n, a) {
    var o = e("../actions/Collections"),
      i = e("../actions/Childrens"),
      s = e("../actions/User"),
      r = e("../stores/Stats"),
      c = e("../actions/Bookmarks"),
      l = [],
      d = -2,
      m = !1,
      u = "sync";
    "undefined" != typeof isIOSapp && (d = 0);
    var h = [],
      p = function () {
        h = [{
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
        for (var e in h) h[e].view = Api.getItem("collection/" + h[e]._id + "/view") || h[e].view, h[e].cover = [(window.pathPrefix || "") + "../common/images/collection" + h[e]._id + ".png"]
      };
    document ? window.languageLoaded ? p() : window.addEventListener("langLoaded", p) : p();
    var f = Reflux.createStore({
      init: function () {
        this.listenTo(o.load, this.onLoad), this.listenTo(o.setCurrent, this.onSetCurrent), this.listenTo(o.updateCollection, this.onUpdateCollection), this.listenTo(o.insertCollection, this.onInsertCollection), this.listenTo(o.removeCollection, this.onRemoveCollection), this.listenTo(o.updateCountCollection, this.onUpdateCountCollection), this.listenTo(o.updateColorCollection, this.onUpdateColorCollection)
      },
      _saveCache: function () {
        switch (u) {
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
        if (null == e) return d = null, void this.trigger(l);
        d = parseInt(e);
        var t = _.findIndex(l, {
          _id: d
        }); - 1 != t ? this.trigger(l) : this.onLoadId(d)
      },
      onUpdateCollection: function (e, n) {
        var a = this,
          o = !1;
        "undefined" == typeof e.updateModel && (e.updateModel = !0), ("number" == typeof e.item.group || "number" == typeof e.item.parentId) && (o = !0), "number" == typeof e.item.group ? e.item.parentId = "root" : delete e.item.group, o && s.updateCollection({
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
        var i = _.findIndex(l, {
          _id: parseInt(e.item._id)
        });
        if (-1 != i && e.updateModel) {
          for (var r in e.item) l[i][r] = e.item[r];
          if (this.trigger(l), l[i]._id <= 0)
            for (var r in e.item) Api.setItem("collection/" + e.item._id + "/" + r, e.item[r]);
          this._saveCache()
        }
      },
      onInsertCollection: function (e, n) {
        var a = this;
        Api.post("collection", e.item, function (o) {
          o.result ? (l.push(o.item), "number" == typeof e.item.group && (e.item.parentId = "root", s.updateCollection({
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
                }), a.trigger(l), a._saveCache(), i.removeCollection(e), s.saveGroups(), a.getCurrentId() == e.item._id && c.reset(!0)
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
            if (0 > d && -1 > d) return -1
        }
        return d
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
        e = e || {}, u = "undefined" != typeof e.speed ? e.speed : "sync", l = [], d = -2, "undefined" != typeof isIOSapp && (d = 0), m = !1, 0 != l.length || m || this._resetFromCache()
      },
      _updateOrInsertItem: function (e) {
        var t = _.findIndex(l, {
          _id: parseInt(e._id)
        }); - 1 != t ? l[t] = e : l.push(e)
      },
      _insertDefaults: function () {
        var e = this;
        h.forEach(function (t) {
          e._updateOrInsertItem(t)
        })
      },
      _resetFromCache: function () {
        if (!window.cacheDisabled) switch (u) {
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
    f.reset(), n.exports = f
  }, {
    "../actions/Bookmarks": 2,
    "../actions/Childrens": 3,
    "../actions/Collections": 4,
    "../actions/User": 14,
    "../stores/Stats": 122
  }],
  116: [function (e, t, n) {
    var a = e("../actions/LastBookmark"),
      o = Reflux.createStore({
        init: function () {
          this.listenTo(a.insert, this.onInsert), this.listenTo(a.remove, this.onRemove)
        },
        onInsert: function (e) {
          this.trigger({
            name: "insert",
            bookmark: e
          })
        },
        onRemove: function (e) {
          this.trigger({
            name: "remove",
            bookmark: e
          })
        }
      });
    t.exports = o
  }, {
    "../actions/LastBookmark": 5
  }],
  117: [function (e, t, n) {
    var a = e("../actions/ModalFrame"),
      o = Reflux.createStore({
        init: function () {
          this.listenTo(a.show, this.onShow)
        },
        onShow: function (e) {
          e.show = !0, this.trigger(e)
        }
      });
    t.exports = o
  }, {
    "../actions/ModalFrame": 6
  }],
  118: [function (e, t, n) {
    var a = e("../actions/Parents"),
      o = e("../stores/Collections"),
      i = [],
      s = [],
      r = Reflux.createStore({
        init: function () {
          this.listenTo(a.load, this.onLoad), this.listenTo(a.reset, this.reset)
        },
        onLoad: function (e) {
          var t = this;
          0 == s.length ? Api.get("childrens", function (n) {
            n.result && (s = n.items), t.findParents(e.cId)
          }) : t.findParents(e.cId)
        },
        getParents: function () {
          return i
        },
        findParents: function (e) {
          var t = [e],
            n = [],
            a = function (o) {
              s.forEach(function (i) {
                o == i._id && (i._id != e && n.push(i), t.push(i.parent.$id), a(i.parent.$id))
              })
            };
          a(t[0]);
          var i = o.getCollection(t[t.length - 1]);
          null != i && i._id != e && n.push(i), n.reverse(), this.trigger(n)
        },
        reset: function () {
          i = [], s = []
        }
      });
    t.exports = r
  }, {
    "../actions/Parents": 7,
    "../stores/Collections": 115
  }],
  119: [function (e, t, n) {
    var a = e("../actions/Pop"),
      o = !1;
    t.exports = Reflux.createStore({
      init: function () {
        this.listenTo(a.show, this.onShow), this.listenTo(a.close, this.onClose)
      },
      onShow: function (e, t) {
        o = t, o.name = e, this.trigger(o)
      },
      onClose: function () {
        o = !1, this.trigger(o)
      },
      getParams: function () {
        return o
      }
    })
  }, {
    "../actions/Pop": 8
  }],
  120: [function (e, t, n) {
    var a = e("../actions/Sidebar"),
      o = !1;
    try {
      o = window.sidebar.open
    } catch (i) {}
    t.exports = Reflux.createStore({
      init: function () {
        this.listenTo(a.change, this.onChange)
      },
      onChange: function (e) {
        o = e, window.sidebar.change(o), this.trigger(o)
      },
      getState: function () {
        return o
      }
    })
  }, {
    "../actions/Sidebar": 9
  }],
  121: [function (e, t, n) {
    var a = e("../actions/Sites"),
      o = [],
      i = !1,
      s = Reflux.createStore({
        init: function () {
          this.listenTo(a.load, this.onLoad)
        },
        onLoad: function () {
          var e = this;
          i || (i = !0, Api.get("sites", function (t) {
            t.result && (o = t.items, e.trigger(o)), i = !1
          }))
        },
        getSites: function () {
          return o
        }
      });
    t.exports = s
  }, {
    "../actions/Sites": 10
  }],
  122: [function (e, t, n) {
    var a = e("../actions/Stats"),
      o = e("../actions/Collections"),
      i = {},
      s = !1,
      r = 0,
      c = !1,
      l = Reflux.createStore({
        init: function () {
          this.listenTo(a.load, this.onLoad), this.listenTo(o.updateCountCollection, this.onUpdate)
        },
        onLoad: function () {
          var e = this;
          if (!s) {
            try {
              ls.getItem("stat").then(function (t) {
                t && !c && (i = t, e._countAll(), e.trigger(i))
              })["catch"](function (e) {})
            } catch (t) {}
            s = !0, Api.get("stat", function (t) {
              if (t.result) {
                i = t.items, e._countAll();
                try {
                  ls.setItem("stat", i).then(function () {})["catch"](function (e) {})
                } catch (n) {}
                e.trigger(i)
              }
              s = !1, c = !0
            })
          }
        },
        onUpdate: function (e) {
          var t = _.findIndex(i, {
            _id: e._id
          });
          switch (e.count) {
            case "+":
              -99 != e._id && r++, -1 != t && i[t].count++, this.trigger(i);
              break;
            case "-":
              -99 != e._id && r--, 0 > r && (r = 0), -1 != t && (i[t].count--, i[t].count < 0 && (i[t].count = 0)), this.trigger(i)
          }
        },
        _countAll: function () {
          r = 0;
          for (var e in i) - 2 === i[e]._id ? r -= i[e].count || 0 : "number" != typeof i[e]._id && (r += parseInt(i[e].count || 0));
          0 > r && (r = 0)
        },
        getStat: function () {
          return i
        },
        getAllCount: function () {
          return r
        },
        getCollectionCount: function (e) {
          var t = _.findIndex(i, {
            _id: e
          });
          return -1 != t ? i[t].count : 0
        }
      });
    t.exports = l
  }, {
    "../actions/Collections": 4,
    "../actions/Stats": 11
  }],
  123: [function (e, n, a) {
    var o = e("../actions/Tags"),
      i = [],
      s = Reflux.createStore({
        url: "tags",
        init: function () {
          this.listenTo(o.load, this.onLoad)
        },
        onLoad: function () {
          var e = this;
          if (0 == i.length) {
            try {
              ls.getItem(e.url).then(function (t) {
                t && 0 == i.length && (i = t, e.trigger(i))
              })["catch"](function (e) {})
            } catch (t) {}
            Api.get(e.url, function (t) {
              if (t.result) {
                i = t.items;
                try {
                  ls.setItem(e.url, i).then(function () {})["catch"](function (e) {})
                } catch (n) {}
                e.trigger(i)
              }
            })
          } else e.trigger(i)
        },
        onUpdate: function (e) {
          var n = this;
          Api.put("tag", {
            tag: e._id,
            replace: e.replace
          }, function (a) {
            if (a.result) {
              i[_.findIndex(i, {
                _id: e._id
              })]._id = e.replace;
              try {
                ls.setItem(n.url, i).then(function () {})["catch"](function (e) {})
              } catch (o) {}
              n.trigger(i), Toasts.show({
                text: t.s("saveSuccess"),
                title: e._id
              })
            }
          })
        },
        onRemove: function (e) {
          var n = this;
          Api.del("tag?tag=" + encodeURIComponent(e._id), function (a) {
            if (a.result) {
              i.splice(_.findIndex(i, {
                _id: e._id
              }), 1);
              try {
                ls.setItem(n.url, i).then(function () {})["catch"](function (e) {})
              } catch (o) {}
              n.trigger(i), Toasts.show({
                text: t.s("removeSuccess"),
                title: e._id
              })
            }
          })
        },
        getTags: function () {
          return i
        },
        reset: function () {
          i = []
        }
      });
    n.exports = s
  }, {
    "../actions/Tags": 12
  }],
  124: [function (e, t, n) {
    var a = [],
      o = 3e3,
      i = Reflux.createStore({
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
            } catch (i) {}
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
    t.exports = i
  }, {}],
  125: [function (e, n, a) {
    var o = e("../actions/User"),
      i = (e("../actions/ModalFrame"), e("./Collections")),
      s = {},
      r = !1,
      c = !1,
      l = !1,
      d = Reflux.createStore({
        init: function () {
          this.listenTo(o.load, this.onLoad), this.listenTo(o.toggleGroup, this.onToggleGroup), this.listenTo(o.updateGroup, this.onUpdateGroup), this.listenTo(o.insertGroup, this.onInsertGroup), this.listenTo(o.removeGroup, this.onRemoveGroup), this.listenTo(o.swapGroups, this.onSwapGroups), this.listenTo(o.saveGroups, this.saveGroups), this.listenTo(o.updateCollection, this.onUpdateCollection), this.listenTo(o.swapCollections, this.onSwapCollections), this.listenTo(o.updateLanguage, this.onUpdateLanguage), this.listenTo(o.updateConfig, this.onUpdateConfig), this.listenTo(o.logOut, this.onLogOut), this.listenTo(o.signIn, this.onSignIn), this.listenTo(o.signUp, this.onSignUp)
        },
        isTrusted: function () {
          return l
        },
        onLoad: function (e, t) {
          var n = !0;
          if (c && (n = !1), r && l && (n = !1), !n) return "function" == typeof e && e(!1), void this.trigger(s);
          var a = this;
          c = !0, this._resetFromCache(t), Api.get("user", function (t) {
            var n = function () {
              t.result ? (s = t.user, r = !0, a.cleanGroups()) : (s = {}, r = !1), Api.setItem("user", JSON.stringify(s));
              try {
                ls.setItem("user", s).then(function () {})["catch"](function (e) {}), ls.setItem("user_id", s._id || 0).then(function () {})["catch"](function (e) {})
              } catch (e) {}
              c = !1, l = !0, a.trigger(s), a._checkGroupsStability(), a.updateIntercom()
            };
            if ("boolean" == typeof t.result || "boolean" == typeof t.auth) try {
              ls.getItem("user_id").then(function (o) {
                var i = null;
                try {
                  i = parseInt(t.user._id)
                } catch (s) {}
                t.result && parseInt(o) == i ? n() : a._cleanCache(n), "function" == typeof e && e(t.result)
              })["catch"](function (e) {
                n()
              })
            } catch (o) {
              n()
            } else c = !1, l = !0, a.trigger(s), "function" == typeof e && e(t.result)
          })
        },
        updateIntercom: function () {
          try {
            var e = {
              app_id: "ar0opykp",
              user_id: s._id,
              name: s.fullName,
              email: s.email || "",
              created_at: Math.floor(new Date(s.registered).getTime() / 1e3),
              pro: s.pro || !1,
              groups: (s.groups || []).length || 0,
              platform: "web"
            };
            s.proExpire && (e.pro_expire = Math.floor(new Date(s.proExpire).getTime() / 1e3)), "undefined" != typeof window && "undefined" != typeof window.Intercom && window.Intercom("boot", e), "undefined" != typeof NativeHelpers && (e.platform = "ios", delete e.app_id, NativeHelpers.intercomSetUser(e.user_id + "", e))
          } catch (t) {}
          try {
            Raven.setUserContext({
              email: s.email,
              id: s._id
            })
          } catch (t) {}
        },
        onToggleGroup: function (e) {
          var t = _.findIndex(s.groups || [], {
            id: e.id
          }); - 1 != t && (s.groups[t].hidden = !s.groups[t].hidden, this.saveGroups())
        },
        onUpdateGroup: function (e) {
          var n = _.findIndex(s.groups || [], {
            id: e.id
          });
          if (-1 != n) {
            for (var a in e.item) s.groups[n][a] = e.item[a];
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
          "string" == typeof e.item.collections && (e.item.collections = JSON.parse(e.item.collections)), s.groups.push({
            title: e.item.title,
            hidden: !1,
            id: (new Date).getTime(),
            sort: (s.groups || []).length,
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
          var n = _.findIndex(s.groups || [], {
              id: e.id
            }),
            a = !1,
            o = ""; - 1 != n && (o = s.groups[n].title, 0 == (s.groups[n].collections || []).length && (s.groups.splice(n, 1), a = !0)), a ? (this.saveGroups(), Toasts.show({
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
          var t = _.findIndex(s.groups, {
              id: parseInt(e.fromId)
            }),
            n = _.findIndex(s.groups, {
              id: parseInt(e.toId)
            });
          if (-1 == t || -1 == n) return !1;
          s.groups = strings.swapArray(s.groups, t, n);
          for (var a in s.groups) s.groups[a].sort = a;
          this.saveGroups()
        },
        onUpdateCollection: function (e) {
          var t = !1,
            n = !1;
          "undefined" == typeof e.group && (e.group = -1);
          for (var a in s.groups)
            for (var o in s.groups[a].collections || []) s.groups[a].collections[o] == e._id && (e.group != a && (s.groups[a].collections.splice(o, 1), t = !0), n = !0);
          (t || !n) && (e.group >= 0 && ("object" != typeof s.groups[e.group].collections && (s.groups[e.group].collections = []), "undefined" != typeof e.toTop ? s.groups[e.group].collections.unshift(e._id) : s.groups[e.group].collections.push(e._id), s.groups[e.group].hidden = !1), this.saveGroups())
        },
        onSwapCollections: function (e) {
          if (e.fromId == e.toId) return !1;
          var t = {
              index: -1
            },
            n = {
              index: -1
            };
          for (var a in s.groups) {
            var o = (s.groups[a].collections || []).indexOf(parseInt(e.fromId)),
              i = (s.groups[a].collections || []).indexOf(parseInt(e.toId));
            if (-1 != o && (t.index = o, t.group = a), -1 != i && (n.index = i, n.group = a), -1 != t.index && -1 != n.index) break
          }
          if (-1 != t.index && -1 != n.index) {
            if (t.group == n.group) s.groups[t.group].collections = strings.swapArray(s.groups[t.group].collections, t.index, n.index);
            else {
              var o = s.groups[t.group].collections[t.index];
              s.groups[t.group].collections.splice(t.index, 1), s.groups[n.group].collections.splice(n.index, 0, o)
            }
            this.saveGroups()
          }
        },
        onUpdateLanguage: function (e, t) {
          "object" != typeof s.config && (s.config = {}), s.config.lang = e.lang, this.saveConfig({
            lang: s.config.lang
          }, t)
        },
        onUpdateConfig: function (e, t) {
          "object" != typeof s.config && (s.config = {});
          for (var n in e) s.config[n] = e[n];
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
            n && e()
          }
        },
        getUser: function () {
          return "undefined" == typeof s._id && this._resetFromCache(), _.clone(s)
        },
        getGroup: function (e) {
          var t = _.findIndex(s.groups || [], {
            id: e
          });
          return -1 != t ? s.groups[t] : null
        },
        isLogged: function () {
          return r
        },
        isLoading: function () {
          return c
        },
        isPro: function () {
          return r && s.pro ? !0 : !1
        },
        reset: function () {
          s = {}, r = !1, c = !1
        },
        cleanGroups: function () {
          if ((s.groups || []).length > 0) {
            for (var e in s.groups) null == (s.groups[e].id || null) && (s.groups[e].id = parseInt(e));
            s.groups = _.sortBy(s.groups, function (e) {
              return e.sort
            })
          } else s.groups = [{
            id: 0,
            sort: 0,
            title: t.s("myCollections"),
            hidden: !1
          }]
        },
        saveGroups: function (e, t) {
          if (t = t || {}, "undefined" == typeof t.cleanCollections && (t.cleanCollections = !0), i.getCount() > 0 && t.cleanCollections)
            for (var n in s.groups) {
              var a = [];
              for (var o in s.groups[n].collections || []) null == i.getCollection(s.groups[n].collections[o]) && a.push(o);
              _.pullAt(s.groups[n].collections, a)
            }
          this.saveConfig({
            groups: s.groups
          }, e)
        },
        removeEmptyGroups: function (e) {
          var t = [];
          for (var n in s.groups) 0 == (s.groups[n].collections || []).length && t.push(n);
          _.pullAt(s.groups, t), this.saveGroups(e, {
            cleanCollections: !1
          })
        },
        saveConfig: function (e, t) {
          "undefined" == typeof e.updateModel && (e.updateModel = !0);
          try {
            e.updateModel && (s.config[e.name] = !0)
          } catch (n) {}
          Api.put("userConfig", e, function (e) {
            "function" == typeof t && t(e)
          }), Api.setItem("user", JSON.stringify(s));
          try {
            ls.setItem("user", s).then(function () {})["catch"](function (e) {})
          } catch (n) {}
          this.trigger(s)
        },
        getCollectionGroup: function (e) {
          for (var t in s.groups)
            for (var n in s.groups[t].collections || [])
              if (s.groups[t].collections[n] == e) return parseInt(t);
          return null
        },
        getConfig: function (e) {
          var t = !1;
          try {
            t = s.config[e]
          } catch (n) {}
          return t
        },
        _checkGroupsStability: function () {
          if (d.isLogged() && !d.isLoading() && i.getCount() > 0 && !i.isLoading()) {
            var e = [],
              n = i.getCollections();
            if (n.forEach(function (t) {
                var n = t._id <= 0;
                "undefined" != typeof t.parent && (n = !0), "undefined" != typeof t.parentId && (n = !0), (s.groups || []).forEach(function (e) {
                  var a = (e.collections || []).some(function (e) {
                    return parseInt(e) == parseInt(t._id)
                  });
                  a && (n = !0)
                }), n || e.push(parseInt(t._id))
              }), e.length > 0) {
              e = _.uniq(e);
              var a = _.findIndex(s.groups || [], {
                title: t.s("myCollections")
              }); - 1 != a ? s.groups[a].collections = (s.groups[a].collections || []).concat(e) : (s.groups = s.groups || [], s.groups.push({
                id: s.groups.length,
                sort: s.groups.length,
                title: t.s("myCollections"),
                hidden: !1,
                collections: e
              })), d.saveGroups()
            }
          }
        },
        _checkCache: function (e, t) {
          return r ? void("function" == typeof t && t(r)) : ("object" == typeof e && null != e && (s = e || {}, s._id && (r = !0, this.cleanGroups())), void("function" == typeof t && t(r)))
        },
        _resetFromCache: function (e) {
          if (window.cacheDisabled) {
            if ("function" == typeof e) return e(r)
          } else if (r) {
            if ("function" == typeof e) return e(r)
          } else {
            r = !1;
            var t = Api.getItem("user");
            try {
              t = JSON.parse(t)
            } catch (n) {
              n && (t = null)
            }
            var a = this;
            if (null == t) try {
              ls.getItem("user").then(function (t) {
                a._checkCache(t, e)
              })["catch"](function (t) {
                return t && "function" == typeof e ? e(r) : void 0
              })
            } catch (n) {
              if (n && "function" == typeof e) return e(r)
            } else this._checkCache(t, e)
          }
        },
        _setProData: function (e, t) {
          s.pro = e, s.proExpire = t
        }
      });
    n.exports = d
  }, {
    "../actions/ModalFrame": 6,
    "../actions/User": 14,
    "./Collections": 115
  }]
}, {}, [15]);
//# sourceMappingURL=app.js.map
