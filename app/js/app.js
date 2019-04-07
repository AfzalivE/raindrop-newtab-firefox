(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BookmarkActions = Reflux.createActions([
    'load'
]);

module.exports = BookmarkActions;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var ChildrensActions = Reflux.createActions([
    'load',
    'swapCollections',
    'saveAllSort',
    'removeCollection'
]);

module.exports = ChildrensActions;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = Reflux.createActions([
    'insert',
    'update',
    'remove'
]);

},{}],6:[function(require,module,exports){
var ModalFrameActions = Reflux.createActions([
    'show'
]);

module.exports = ModalFrameActions;

},{}],7:[function(require,module,exports){
var ParentsActions = Reflux.createActions([
    'load',
    'reset'
]);

module.exports = ParentsActions;

},{}],8:[function(require,module,exports){
module.exports = Reflux.createActions([
    'show',
    'close'
]);

},{}],9:[function(require,module,exports){
module.exports = Reflux.createActions([
    'change'
]);

},{}],10:[function(require,module,exports){
module.exports = Reflux.createActions([
    'load'
]);

},{}],11:[function(require,module,exports){
module.exports = Reflux.createActions([
    'load'
]);

},{}],12:[function(require,module,exports){
var TagsActions = Reflux.createActions([
    'load'
]);

module.exports = TagsActions;

},{}],13:[function(require,module,exports){
var ToastActions = Reflux.createActions([
    'show',
    'close',
    'stopTimer'
]);

module.exports = ToastActions;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
/** @jsx React.DOM */
aboutApp = JSON.parse(require('../newtab/manifest.json'));
Raven = require('raven-js');
Raven.config('https://37d1786e89b7423d9309613f33bb56c3@app.getsentry.com/16738', {release: aboutApp.version}).install();

try{ga('send', 'event', "new_tab_"+aboutApp.version, "open");}catch(e){}

React = require('react');
Reflux = require('reflux');
//PureRenderMixin = require('react/addons').addons.PureRenderMixin;

/* Const */
consts = require('./config');
strings = require('../modules/strings.js');

/* Translate */
Api = require('../modules/api.js');
t = require('../modules/translate');
window.moment = require('moment');
t.setLang();

/* Helpers */
_ = require("lodash");
network = require('../modules/network.js');
dropfiles = require('../modules/dropfiles.js');

ls = {}; try{localStorage.getItem("a"); ls = require('localforage');}catch(e){}
/*chromeStorageLocal = require('../modules/chromestoragelocal.js');

if ((window.environment||[]).indexOf("web")!=-1){
  ls.setDriver([ls.LOCALSTORAGE, ls.INDEXEDDB]);
}
else{
  ls.defineDriver(chromeStorageLocal).then(function() {
    ls.setDriver([chromeStorageLocal._driver, ls.INDEXEDDB, ls.LOCALSTORAGE]);
  });
}*/

Icon = require('./components/Helpers/Icon.js');
DocumentTitle = require('react-document-title');
Modal = require('./components/Modals/Modal');
Toasts = require('../actions/Toast');
S = require('string');
UserStore = require('../stores/User');

Pop = require('../actions/Pop');

/* Routing */
Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
Link = Router.Link;

var AppRoute = React.createClass({displayName: "AppRoute",
    render: function () {
        return React.createElement(RouteHandler, null);
    }
});


var commonComponents = {
  loaded: false,
  load: function() {
    if (this.loaded) return false;

    var eSideActions = document.getElementById('app-actions'),
        eSidebar = document.getElementById('app-sidebar'),
        eToast = document.getElementById('app-toast'),
        eModalFrame = document.getElementById('app-modal-frame');

    /* User */
    UserStore.onLoad();

    /* App views */
    var Sidebar = require('./components/Sidebar.js');
    React.render(React.createElement(Sidebar, null), eSidebar);

    var Toast = require('./components/Toast.js');
    React.render(React.createElement(Toast, null), eToast);

    var ModalFrame = require('./components/ModalFrame.js');
    React.render(React.createElement(ModalFrame, null), eModalFrame);

    //POP
    var PopComponent = require("./components/Pop/Pop");
    var popDiv = document.createElement("div");
    popDiv.id="app-pop";
    document.body.appendChild(popDiv);
    React.render(React.createElement(PopComponent, null), popDiv);

    dropfiles.bind();

    this.loaded = true;
  }
}

/* Base elements */
window.addEventListener((window.languageLoaded ? "DOMContentLoaded" : "langLoaded"), function() {
  var eMarkup = document.getElementById('app-markup'),
      eContent = document.getElementById('app-content');

  var notFound = require('./routes/404.js');
  var WebHome = require('./routes/WebHome.js');
  var DashboardRoute = require('./routes/Dashboard.js');
  var CollectionRoute = require('./routes/Collection.js');
  var InterfaceRoute = require('./routes/Interface.js');
  var WaitAuth = require('./routes/WaitAuth.js');
  var ToolsRoute = require('./routes/Tools.js');
  var ToolsIndexRoute = require('./routes/Tools/Index.js');
  var ToolsTagsRoute = require('./routes/Tools/Tags.js');

  var routeDefaultRoute = null, routeInitRoute = null;
  if ((window.environment||[]).indexOf("web")!=-1){
    //Web verison
    routeInitRoute = React.createElement(Route, {name: "dashboard", handler: DashboardRoute});
    routeDefaultRoute = React.createElement(DefaultRoute, {name: "home", handler: WebHome});
  }else{
    //New tab version
    routeInitRoute = React.createElement(Route, {name: "home", handler: WebHome});
    routeDefaultRoute = React.createElement(DefaultRoute, {name: "dashboard", handler: DashboardRoute});
  }

  var routes = (
      React.createElement(Route, {name: "app", path: "/", handler: AppRoute}, 
          React.createElement(Route, {name: "collection", path: "/collection/:cId/?:search?", handler: CollectionRoute}), 
          React.createElement(Route, {name: "interface", path: "/interface", handler: InterfaceRoute}), 
          React.createElement(Route, {name: "waitauth", path: "/waitauth", handler: WaitAuth}), 
          React.createElement(Route, {name: "tools", path: "/tools", handler: ToolsRoute}, 
            React.createElement(DefaultRoute, {name: "index", handler: ToolsIndexRoute}), 
            React.createElement(Route, {name: "tags", path: "tags", handler: ToolsTagsRoute})
          ), 
          routeInitRoute, routeDefaultRoute, 
          React.createElement(NotFoundRoute, {name: "not-found", handler: notFound})
      )
  );

  /* Init */
  Router.run(routes, function (Handler,s) {
      var r=null;
      try {
          r = s.routes[1].name;
      }catch(e){}
      document.body.setAttribute('data-route', r||"");
      try{
        ga('send', 'pageview');
        window.Intercom('update');
      }catch(e){}
      
      React.render(React.createElement(Handler, null), eContent, function(){
        document.documentElement.classList.add("show");
        commonComponents.load();
      });
  });
});

/* Mouse position */
window.mousePos = {x:0,y:0};
document.addEventListener('mousedown', onMouseUpdate, false);

function onMouseUpdate(e) {
  window.mousePos.x = e.clientX || e.pageX;
  window.mousePos.y = e.clientY || e.pageY;
}

},{"../actions/Pop":8,"../actions/Toast":13,"../modules/api.js":103,"../modules/dropfiles.js":106,"../modules/network.js":107,"../modules/strings.js":108,"../modules/translate":109,"../newtab/manifest.json":111,"../stores/User":125,"./components/Helpers/Icon.js":44,"./components/ModalFrame.js":52,"./components/Modals/Modal":59,"./components/Pop/Pop":71,"./components/Sidebar.js":85,"./components/Toast.js":88,"./config":90,"./routes/404.js":92,"./routes/Collection.js":93,"./routes/Dashboard.js":94,"./routes/Interface.js":95,"./routes/Tools.js":96,"./routes/Tools/Index.js":97,"./routes/Tools/Tags.js":98,"./routes/WaitAuth.js":99,"./routes/WebHome.js":100,"localforage":"localforage","lodash":"lodash","moment":"moment","raven-js":"raven-js","react":"react","react-document-title":"react-document-title","react-router":"react-router","reflux":"reflux","string":"string"}],16:[function(require,module,exports){
/** @jsx React.DOM */
var ModalBookmarksMove = require("../Modals/BookmarksMove"),
    ModalBookmarksCopy = require("../Modals/BookmarksCopy"),
    ModalBookmarksRemove = require("../Modals/BookmarksRemove"),
    ModalBookmarksAddTags = require("../Modals/BookmarksAddTags");

module.exports = React.createClass({
    displayName: "Bookmarks/BatchEdit",

    getInitialState: function() {
      return {
        count: this.props.count,
        bookmarksCount: this.props.bookmarksCount,
        modalMoveShow: false,
        modalCopyShow: false,
        modalRemoveShow: false,
        modalAddTagsShow: false
      }
    },

    componentWillReceiveProps: function(nextProps) {
      if (this.isMounted())
        this.setState({
          count: nextProps.count,
          bookmarksCount: nextProps.bookmarksCount
        });
    },

    handleModalMoveClose: function() {
      if (this.isMounted())
      this.setState({modalMoveShow: false});
    },

    handleModalCopyClose: function() {
      if (this.isMounted())
      this.setState({modalCopyShow: false});
    },

    handleModalRemoveClose: function() {
      if (this.isMounted())
      this.setState({modalRemoveShow: false});
    },

    handleModalAddTagsClose: function() {
      if (this.isMounted())
      this.setState({modalAddTagsShow: false});
    },

    handleMove: function(e) {
      e.preventDefault();
      if (this.isMounted())
      this.setState({modalMoveShow: true});
    },

    handleCopy: function(e) {
      e.preventDefault();
      if (this.isMounted())
      this.setState({modalCopyShow: true});
    },

    handleRemove: function(e) {
      e.preventDefault();
      if (this.isMounted())
      this.setState({modalRemoveShow: true});
    },

    handleTags: function(e) {
      e.preventDefault();
      if (this.isMounted())
      this.setState({modalAddTagsShow: true});
    },

    handleSelectAll: function(e) {
      e.preventDefault();
      this.props.onSelectAll();
    },

    handleCancel: function(e) {
      e.preventDefault();
      this.props.onCancel();
    },

    render: function() {
      return (
        React.createElement("div", {className: "context-actions"}, 
          React.createElement("div", {className: "badge"}, this.state.count, " ", t.s("of"), " ", this.state.bookmarksCount), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleMove}, 
            React.createElement("span", {className: "icon"}, React.createElement(Icon, {name: "move-all"})), 
            React.createElement("span", {className: "title"}, t.s("moveSelectedBookmarks"))
          ), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleCopy}, 
            React.createElement("span", {className: "icon"}, React.createElement(Icon, {name: "copy"})), 
            React.createElement("span", {className: "title"}, "Copy")
          ), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleTags}, 
            React.createElement("span", {className: "icon"}, React.createElement(Icon, {name: "tags", size: "mac"})), 
            React.createElement("span", {className: "title"}, t.s("addTags"))
          ), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleRemove}, 
            React.createElement("span", {className: "icon"}, React.createElement(Icon, {name: "trash", size: "mac", className: "icn-red"})), 
            React.createElement("span", {className: "title"}, t.s("remove"))
          ), 

          React.createElement("div", {className: "divider"}), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleSelectAll}, 
            React.createElement(Icon, {name: "select-all"}), 
            React.createElement("span", {className: "title"}, t.s("selectAll"))
          ), 

          React.createElement("a", {href: "", className: "action", onClick: this.handleCancel}, 
            React.createElement(Icon, {name: "clear", size: "mac"}), 
            React.createElement("span", {className: "title"}, t.s("cancel"))
          ), 

          React.createElement(Modal, {position: "right-top", isOpened: this.state.modalMoveShow, onClose: this.handleModalMoveClose}, 
            React.createElement(ModalBookmarksMove, null)
          ), 

          React.createElement(Modal, {position: "right-top", isOpened: this.state.modalCopyShow, onClose: this.handleModalCopyClose}, 
            React.createElement(ModalBookmarksCopy, null)
          ), 

          React.createElement(Modal, {position: "right-top", isOpened: this.state.modalRemoveShow, onClose: this.handleModalRemoveClose}, 
            React.createElement(ModalBookmarksRemove, null)
          ), 

          React.createElement(Modal, {position: "right-top", isOpened: this.state.modalAddTagsShow, onClose: this.handleModalAddTagsClose}, 
            React.createElement(ModalBookmarksAddTags, null)
          )
        )
      );
    }
});

},{"../Modals/BookmarksAddTags":53,"../Modals/BookmarksCopy":54,"../Modals/BookmarksMove":55,"../Modals/BookmarksRemove":56}],17:[function(require,module,exports){
/** @jsx React.DOM */
var BookmarkActions = require('../../../actions/Bookmarks');
var Popover = require("../Popovers/Bookmark");

var colors = require('../../../modules/colors.js');
var colorThief = require('../../../modules/colorThief.js');
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;

module.exports = React.createClass({
    displayName: "Bookmarks/Favorite",

    mixins: [DragDropMixin],

    statics: {
      configureDragDrop: function(register) {
        register('favicon', {
          dragSource: {
            beginDrag: function(component) {
              return {
                item: {
                  _id: component.state._id
                }
              };
            },

            endDrag: function(component) {
              if (typeof component.props.onEndDrag == "function"){
                component.props.onEndDrag(component.state._id);
              }
            }
          },

          dropTarget: {
            over: function(componentReceiver, originItem) {
              if (typeof componentReceiver.props.onMove == "function"){
                componentReceiver.props.onMove(originItem._id, componentReceiver.state._id);
              }
            }
          }
        });
      }
    },

    getInitialState: function() {
        //var temp = JSON.parse(JSON.stringify(this.props.item));
        //temp.palette = Api.getItem("palette_"+temp.domain) || null;
        //temp.contrast = Api.getItem("contrast_"+temp.domain) || "black";
        this.props.item.scaleDown = Api.getItem("scaleDown-"+ (this.props.item.cover||this.props.item.domain) ) || null;
        //temp.noFavIcon = Api.getItem("noFavIcon-"+temp.domain) || false;
        this.props.item.showPopover=false;
        this.props.item.mousePos=false;
        return this.props.item;
        //return temp;
    },

    componentWillReceiveProps: function(nextProps) {
      if (this.isMounted())
        this.setState(nextProps.item);
    },

    initPalette: function(e) {
        if (this.isMounted()){
          var _this = this;
          //if (_this.state.scaleDown==null)
          try {
              var coverScaleDown = ((e.target.parentNode.offsetWidth > e.target.naturalWidth) || (e.target.parentNode.offsetHeight > e.target.offsetHeight))
              if (_this.state.scaleDown != coverScaleDown) {
                  if (coverScaleDown) {
                      Api.setItem("scaleDown-"+(_this.state.cover||_this.state.domain), coverScaleDown);
                      if (_this.isMounted())
                        _this.setState({scaleDown: coverScaleDown});
                  }
              }
          }catch(e){}
        }

        //if (this.state.palette == null) {
        /*    var p = "0,0,0";
            try {
                p = colorThief.getDarkPalette(e.target);
            } catch (e) {}

            var palette = "rgb("+p+")";
            var contrast = "white";
            this.setState({palette: palette, contrast: contrast});
            Api.setItem("palette_"+this.state.domain, palette);
            Api.setItem("contrast_"+this.state.domain, contrast);*/
        //}
    },

    onErrorImg: function(e) {
      /*var p ="0,0,0", _this = this;

      try{
        p = colors.colorFromString(_this.state.domain);

        p = colorThief.getDarkPalette(p,true);
      }catch(e){}

      var palette = "rgb("+p+")";
      var contrast = "white";
      Api.setItem("palette_"+this.state.domain, palette);
      Api.setItem("contrast_"+this.state.domain, contrast);

      Api.setItem("noFavIcon-"+this.state.domain, "true");*/
      if (this.isMounted())
      this.setState({noFavIcon: true/*, palette: palette, contrast: contrast*/});
    },

    handleMore: function(e) {
        e.preventDefault();
        /*if (typeof this.props.onMore == "function")
            this.props.onMore(this.props.item._id);*/
        if (this.isMounted())
        this.setState({showPopover:true, mousePos: !e.target.classList.contains("icon-more")});
    },

    handleEdit: function(e) {
        if (e) e.preventDefault();
        Pop.show("bookmark", {
          id: this.state._id,
          pin: "element-"+this.state._id,
          //force: "vertical"
        });
        //this.props.onMore(this.props.item._id);
    },

    handleRemove: function(e) {
        e.preventDefault();
        BookmarkActions.removeBookmark({item: this.state});
    },

    handlePopoverClose: function() {
      if (this.isMounted())
        this.setState({showPopover:false});
    },

    render: function(){
        var className = "card favorite-item favorite-"+this.state.contrast;

        if (this.getDragState('favicon').isDragging)
          className += " no-opacity";

        if ((this.state.scaleDown)&&(!this.state.noFavIcon))
          className += " scaleDown";

        var title = this.state.title;
        try{
          title = title.trim()/*.split(" ")[0]*/;
        }catch(e){}

        var favicon = null, faviconBg = "white";
        if (!this.state.noFavIcon){
          favicon = React.createElement("img", {src: this.state.cover ? network.thumb(this.state.cover, 230) : network.favIcon((this.state.domain)), onLoad: this.initPalette, onError: this.onErrorImg, alt: ""});
        }
        else{
          var color = colors.colorFromString(this.state.domain);
          faviconBg = "rgb("+color[0]+","+color[1]+","+color[2]+")";
          favicon = React.createElement(Icon, {name: "best", size: "big"});
          className += " noFavIcon";
        }

        return (
            React.createElement("figure", React.__spread({ref: "item", id: "element-"+this.props.item._id},  this.dragSourceFor('favicon'),  this.dropTargetFor('favicon'), {className: className, onContextMenu: this.handleMore}), 
                React.createElement("div", {className: "favicon", style: {backgroundColor: faviconBg}}, 
                    favicon
                ), 

                React.createElement("figcaption", {className: "about"}, 
                    React.createElement("div", {className: "title", title: title}, title)
                ), 

                React.createElement("div", {className: "more"}, 
                  React.createElement("a", {href: "", id: "more-"+this.props.item._id, className: "action-icon icon-more", onClick: this.handleEdit}, React.createElement(Icon, {name: "more", size: "mac", style: {backgroundColor: this.state.palette}}))
                  /*<a href="" className="action-icon" onClick={this.handleRemove}><Icon name="trash" style={{backgroundColor: this.state.palette}} /></a>*/
                ), 

                React.createElement("a", {href: this.state.link, className: "permalink"}), 
                React.createElement(Popover, React.__spread({position: this.state.mousePos ? "left" : "", onClose: this.handlePopoverClose, show: this.state.showPopover, attachId: "more-"+this.props.item._id},  this.props.item, {handleEdit: this.handleEdit, handleRemove: this.handleRemove, mousePos: this.state.mousePos}))
            )
        );
    }
});

},{"../../../actions/Bookmarks":2,"../../../modules/ReactDND":102,"../../../modules/colorThief.js":104,"../../../modules/colors.js":105,"../Popovers/Bookmark":74}],18:[function(require,module,exports){
/** @jsx React.DOM */
var Tag = require('./Tag.js'),
    Cover = require('../Helpers/Cover.js'),
    Favicon = require('../Helpers/Favicon.js'),
    Checkbox = require('../Helpers/Checkbox.js'),
    Path = require('../Collections/Path.js'),
    Popover = require("../Popovers/Bookmark");

var BookmarkActions = require('../../../actions/Bookmarks');

var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({
    displayName: "Bookmarks/Item",

    mixins: [DragDropMixin, Router.State, PureRenderMixin],

    statics: {
      configureDragDrop: function(register) {
        register('bookmark', {
          dragSource: {
            beginDrag: function(component) {
              React.findDOMNode(component.refs.bookmark).classList.add('drag-preview');
              return {
                item: {
                  _id: component.state._id
                }
              };
            },

            canDrag: function(component) {
              return component.props.canDrag && component.props.canEdit;
            },

            endDrag: function(component) {
              if (typeof component.props.onMoveEnd == "function"){
                component.props.onMoveEnd();
              }
            }
          },

          dropTarget: {
            over: function(componentReceiver, originItem) {
              if ((typeof componentReceiver.props.onMove == "function")&&(componentReceiver.props.canDropSort||false)) {
                componentReceiver.props.onMove(originItem._id, componentReceiver.state._id);
              }
            }
          }
        });
      }
    },

    getInitialState: function() {
        var temp = this.props.item;
        temp.selectMode = this.props.selectMode || false;
        temp.showPopover = false;
        temp.mousePos = false;
        return temp;
    },

    componentWillReceiveProps: function(nextProps) {
        var temp = nextProps.item;
        temp.selectMode = nextProps.selectMode || false;
        if (this.isMounted())
        this.setState(temp);
    },

    handleMore: function(e) {
        e.preventDefault();
        if (this.isMounted())
        this.setState({showPopover:true, mousePos: !e.target.classList.contains("icon-more")});
        /*if (typeof this.props.onMore == "function")
            this.props.onMore(this.state._id);*/
    },

    handleEdit: function(e) {
        e.preventDefault();
        Pop.show("bookmark", {
            id: this.state._id,
            pin: /*(this.props.view == "simple" ? e.target.id : false) ||*/ "element-"+this.state._id,
            //force: (this.props.view != "simple" ? "vertical" : "")
        });
        //this.props.onMore(this.state._id);
    },

    handleRemove: function(e) {
        e.preventDefault();
        BookmarkActions.removeBookmark({item: this.state});
    },

    handleSelect: function(val) {
        var selected = val;
        if (typeof val == "object"){
          if ((this.state.selectMode)/*||(val.nativeEvent.ctrlKey)||(val.nativeEvent.metaKey)*/||(val.nativeEvent.shiftKey)) {
            val.preventDefault();
            selected = !(this.state.selected || false);
            this.props.onSelect({id: this.state._id, selected: selected, shift: val.nativeEvent.shiftKey});
          }
        }
        else
          this.props.onSelect({id: this.state._id, selected: selected});
    },

    handlePopoverClose: function() {
        if (this.isMounted())
        this.setState({showPopover:false});
    },

    render: function() {
        var cover_icon = null,
            tags = null,
            className = "card",
            content = null;

        if (this.getDragState('bookmark').isDragging)
          className += " no-opacity";

        if (this.state.selected)
          className += " selected";

        if (this.state.selectMode)
          className += " select-mode";

        if (this.state.loading)
          className += " loading";

        if (this.state.tags)
            tags = this.state.tags.map(function(tag,index) {
                return React.createElement(Tag, {key: "tag"+index, name: tag})
            });

        if (this.state.type == 'video')
            cover_icon = React.createElement("div", {className: "play"}, React.createElement("div", {className: "play-icon"}, React.createElement(Icon, {name: "play"})), React.createElement("img", {className: "cover-img", src: network.thumb(this.state.cover, 230)}));

        if (this.state.loading===true){
            //<div className="progress-wrap"><progress max="100" value={this.state.progress||0} /></div>
            cover_icon = React.createElement("div", {className: "progress", id: "bookmark-loading-progress-"+this.state._id}, React.createElement("div", {className: "progress-preloader"}, (this.state.progress||0) < 100 ? (this.state.progress||null) : 99));
        }

        var fullLink = "", _target = network.linkTarget();
        if (this.state.selectMode)
            fullLink = "";
        else if (this.state.type == "link"){
            fullLink = this.state.link;
        }
        else{
            fullLink = "#"+this.context.router.getCurrentPathname()+"?viewer="+this.state._id;
            _target = "_self";
        }

        var more = null;

        if (this.props.canEdit){
            var viewOrOpen = null;

            if (!this.state.loading){
                if ((window.environment||[]).indexOf("clipper")!=-1){
                    if ((this.state.type != "link")&&(!this.state.file)) {
                        viewOrOpen = React.createElement("a", {href: fullLink, className: "action-icon"}, React.createElement(Icon, {name: "eye"}));
                        fullLink = this.state.link; _target = network.linkTarget();
                    }
                }
                else
                    viewOrOpen = React.createElement("a", {href: this.state.link, className: "action-icon", target: "_blank"}, React.createElement(Icon, {name: "open-link", size: "mac"}));
            }

            more = (React.createElement("div", {className: "more"}, 
                viewOrOpen, 
                /*!this.state.loading ? <a href="" className="action-icon icon-more"   onClick={this.handleMore}><Icon name="more" size="mac" /></a> : null*/
                !this.state.loading ? React.createElement("a", {href: "", className: "action-icon", id: "more-"+this.state._id, onClick: this.handleEdit}, React.createElement(Icon, {name: "edit", size: "mac"})) : null, 
                React.createElement("a", {href: "", className: "action-icon", onClick: this.handleRemove}, React.createElement(Icon, {name: "trash", size: "mac"})), 
                React.createElement(Checkbox, {active: this.state.selected, onClick: this.handleSelect})
            ));
        }

        var permalink = [
            (React.createElement("a", {href: fullLink, target: _target, onClick: this.handleSelect, className: "permalink", key: "permalink1"})),
            (React.createElement(Popover, React.__spread({key: "permalink2", position: this.state.mousePos ? "left" : "", onClose: this.handlePopoverClose, show: this.state.showPopover, attachId: "more-"+this.state._id},  this.state, {handleEdit: this.handleEdit, handleRemove: this.handleRemove})))];

        var path = null;
        if (this.props.showPath){
          path = React.createElement("figcaption", {className: "path"}, React.createElement(Path, {_id: this.state.collection["$id"]}));
          className += " with-path";
        }

        var typeIcon = null;
        if (this.state.type!="link")
            typeIcon = React.createElement(Icon, {name: this.state.type});

        switch(this.props.view){
            case 'masonry':
            case 'grid':
                className += " grid-item";

                content = (
                    React.createElement("figure", React.__spread({ref: "bookmark", id: "element-"+this.state._id},  this.dragSourceFor('bookmark'),  this.dropTargetFor('bookmark'), {className: className, "data-type": this.state.type, onContextMenu: this.handleMore}), 
                        React.createElement("div", {className: "cover"}, 
                            cover_icon, 
                            React.createElement(Cover, {src: this.state.cover, link: this.state.link, domain: this.state.domain, width: "230", className: "cover-img", preHeight: this.props.view=="masonry", proportions: this.props.item.coverHeight})
                            /*<Favicon domain={this.state.domain} className="icon" />*/
                        ), 

                        React.createElement("figcaption", {className: "about"}, 
                            React.createElement("div", {className: "title"}, this.state.title, " ", React.createElement("span", {className: "tags"}, tags)), 
                            React.createElement("div", {className: "type"}, typeIcon)
                        ), 
                        path, 

                        more, 
                        permalink
                    ));
            break;

            case 'simple':
                className += " list-item";

                content = (
                    React.createElement("figure", React.__spread({ref: "bookmark", id: "element-"+this.state._id},  this.dragSourceFor('bookmark'),  this.dropTargetFor('bookmark'), {className: className, "data-type": this.state.type, onContextMenu: this.handleMore}), 
                        React.createElement("div", {className: "favicon"}, 
                            React.createElement(Favicon, {domain: this.state.domain, className: "icon"})
                        ), 

                        React.createElement("figcaption", {className: "about"}, 
                            React.createElement("div", {className: "title"}, this.state.title, " ", React.createElement("span", {className: "tags"}, tags))
                        ), 

                        path, 

                        React.createElement("div", {className: "type"}, typeIcon), 

                        more, 
                        permalink
                    ))
            break;

            default:
                className += " list-item";
                var excerptText = "";
                try{
                  excerptText = S(this.state.excerpt).truncate(150).s;
                }catch(e){}
                if (!excerptText)
                    excerptText = t.s(this.state.type) + " " + t.s("from") + " " + this.state.domain;

                var favicon = null;
                if (this.state.cover)
                    favicon = React.createElement(Favicon, {domain: this.state.domain, className: "icon"});

                content = (
                    React.createElement("figure", React.__spread({ref: "bookmark", id: "element-"+this.state._id},  this.dragSourceFor('bookmark'),  this.dropTargetFor('bookmark'), {className: className, "data-type": this.state.type, onContextMenu: this.handleMore}), 
                        React.createElement("div", {className: "cover"}, 
                            cover_icon, 
                            React.createElement(Cover, {src: this.state.cover, link: this.state.link, domain: this.state.domain, width: "100", className: "cover-img", proportions: this.props.item.coverHeight})
                            
                            /*<div className="light-border"></div>*/
                        ), 

                        React.createElement("figcaption", {className: "about"}, 
                            React.createElement("div", {className: "title"}, this.state.title), 
                            
                            React.createElement("div", {className: "excerpt"}, React.createElement("span", {className: "description"}, excerptText), " ", React.createElement("span", {className: "tags"}, tags)), 
                            path
                        ), 

                        React.createElement("div", {className: "type"}, typeIcon), 

                        more, 
                        permalink
                    ))
            break;
        }

        return content;
    }
}); 

},{"../../../actions/Bookmarks":2,"../../../modules/ReactDND":102,"../Collections/Path.js":33,"../Helpers/Checkbox.js":38,"../Helpers/Cover.js":40,"../Helpers/Favicon.js":42,"../Popovers/Bookmark":74,"./Tag.js":22,"react/addons":"react/addons"}],19:[function(require,module,exports){
/** @jsx React.DOM */
var Bookmark = require('./Item.js'),
    Favorite = require("./Favorite"),
    Section = require('./Section'),
    Upgrade = require("./Upgrade");
var ReactCSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup;

//var GoogleAd = require("../Helpers/GoogleAd");

module.exports = React.createClass({
    displayName: "Bookmarks/List",

    getInitialState: function() {
        return {
            items: this.props.items,
            view: this.props.view,
            sort: this.props.sort
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState({
            items: nextProps.items,
            view: nextProps.view,
            sort: nextProps.sort
        });
    },

    render: function() {
        var _this = this,
            items = [];

        var className = "bookmarks view-"+this.state.view;

        /*if (UserStore.getConfig("view_cover_disable"))
            className+=" view-cover-disable";

        if (UserStore.getConfig("view_cover_invert_position"))
            className+=" view-cover-invert-position";*/

        if (this.state.view) {
            var lastSection = null, currentSection = null;
            this.state.items.forEach(function (item, itterIndex) {
                var element = null;

                if (_this.state.view == "favorites")
                    element = (React.createElement(Favorite, {
                        key: "favorite_"+item._id, 
                        item: item, 
                        onMore: _this.props.onMore, 
                        onMove: _this.props.onMove, 
                        onEndDrag: _this.props.onMoveEnd}));
                else
                    element = React.createElement(Bookmark, {item: item, 
                                      view: _this.state.view, 
                                      key: "bookmark_"+item._id, 
                                      selectMode: _this.props.selectMode, 
                                      showPath: _this.props.showPath, 
                                      canDrag: true, 
                                      canDropSort: _this.state.sort=="sort", 
                                      canEdit: _this.props.canEdit, 
                                      onMore: _this.props.onMore, 
                                      onMove: _this.props.onMove, 
                                      onMoveEnd: _this.props.onMoveEnd, 
                                      onSelect: _this.props.onSelect});

                if (_this.state.sort!="sort") {
                    var html = [element];

                    switch(_this.state.sort){
                        case "lastUpdate":
                            currentSection = new Date(item.lastUpdate).getMonth();
                        break;
                        case "title":
                            currentSection = "—";
                            try {
                                currentSection = item.title.trim().toUpperCase().substr(0, 1);
                            }catch(e){}

                            if (S(currentSection).isNumeric())
                                currentSection = "#";
                        break;
                    }

                    if (currentSection != lastSection) {
                        lastSection = currentSection;

                        switch(_this.state.sort) {
                            case "lastUpdate":
                                item.section = {type: "date", value: item.lastUpdate};
                            break;
                            case "title":
                                item.section = {type: "text", value: lastSection};
                            break;
                        }

                        html.unshift(
                            React.createElement(Section, {item: item.section, key: "books_sec_"+item.value})
                        );
                    }

                    items.push(html);
                }
                else
                  items.push(element);
            });

            return (React.createElement("div", {className: className}, items));
        }
        else
            return null;
    }
});

},{"./Favorite":17,"./Item.js":18,"./Section":21,"./Upgrade":23,"react/addons":"react/addons"}],20:[function(require,module,exports){
/** @jsx React.DOM */
var Bookmark = require('./Item.js');
var Masonry = require('react-masonry-component')(React);

module.exports = React.createClass({
    displayName: "Bookmarks/Masonry",

    getInitialState: function() {
        return {
            items: this.props.items,
            view: this.props.view,
            sort: this.props.sort
        }
    },

    componentWillReceiveProps: function(nextProps) {
      if (this.isMounted())
        this.setState({
            items: nextProps.items,
            view: nextProps.view,
            sort: nextProps.sort
        });
    },

    render: function() {
        var _this = this,
            items = null;

        if (this.state.view) {
            items = this.state.items.map(function (item) {
                return (React.createElement(Bookmark, {item: item, 
                                  view: _this.state.view, 
                                  key: "bookmark_"+item._id, 
                                  selectMode: _this.props.selectMode, 
                                  showPath: _this.props.showPath, 
                                  canDrag: true, 
                                  canDropSort: /*_this.state.sort=="sort"*/false, 
                                  canEdit: _this.props.canEdit, 
                                  onMore: _this.props.onMore, 
                                  onMove: _this.props.onMove, 
                                  onMoveEnd: _this.props.onMoveEnd, 
                                  onSelect: _this.props.onSelect}));
            });
        }

        var className = "bookmarks view-"+this.state.view;
        if (UserStore.getConfig("view_cover_disable"))
            className+=" view-cover-disable";

        return (
          React.createElement(Masonry, {
              className: className, 
              elementType: 'figure'}, 
              items
          )
        );
        //return (<div className={className} ref="view-masonry">{items}</div>);
    }
});

},{"./Item.js":18,"react-masonry-component":"react-masonry-component"}],21:[function(require,module,exports){
/** @jsx React.DOM */
module.exports = React.createClass({
    displayName: "Bookmarks/Section",

    render: function() {
        var content = "";
        switch(this.props.item.type){
            case 'date':
                var format = "MMMM", m = moment(this.props.item.value);
                if (m.format("YY") != moment().format("YY"))
                    format += " YYYY";
                content = m.format(format);
            break;

            case 'text':
                content = this.props.item.value;
            break;
        }

        return (
            React.createElement("div", {className: "section"}, content)
        )
    }
});

},{}],22:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
    displayName: "Bookmarks/Tag",

    shouldComponentUpdate: function(nextProps) {
      return this.props.name != nextProps.name;
    },

    render: function() {
    	var cId = 0;
    	try{cId = CollectionsStore.getCurrentId()||0;}catch(e){};
    	
        return React.createElement("a", {href: "#/collection/"+cId+"/"+encodeURIComponent(JSON.stringify([{key: "tag", val: this.props.name}])), className: "tag"}, "#", this.props.name)
    }
});

},{"../../../stores/Collections":115}],23:[function(require,module,exports){
module.exports = React.createClass({
	displayName: "Bookmarks/Upgrade",
	render: function() {
		if (!this.props.force){
			if (UserStore.isPro())
				return null;

			if (parseInt(Api.getItem("openCount")||0)%10 != 0)
				return null;
		}
		
		var className = "card upgrade-bookmark";
		switch(this.props.view){
			case "grid":
			case "masonry":
				className+=" grid-item";
			break;

			default:
				className+=" list-item";
			break;
		}

		var title = this.props.title || t.s("footerProAd") + " " + t.s("footerProAdD"),
			excerpt = this.props.excerpt || "$2 "+t.s("und")+" "+t.s("pro_noAds").toLowerCase();

		return (
			React.createElement("figure", {className: className}, 
				React.createElement("img", {className: "upgrade-bookmark-icon", src: (window.pathPrefix||"") + "../common/images/upgrade.png"}), 
				React.createElement("div", {className: "upgrade-bookmark-text"}, 
					React.createElement("b", null, title), 
					excerpt
				), 

				React.createElement("a", {href: consts.proPage, target: "_blank", className: "permalink"})
			)
		);
	}
});

},{}],24:[function(require,module,exports){
/** @jsx React.DOM */
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;

module.exports = React.createClass({
    displayName: "Collections/Breadcrumb",

    mixins: [DragDropMixin],

    statics: {
      configureDragDrop: function(register) {
        register('bookmark', {
          dropTarget: {
            acceptDrop: function(collection, bookmarkItem) {
              if (typeof collection.props.onDropBookmark == "function")
                collection.props.onDropBookmark(bookmarkItem._id, collection.props._id);
            }
          }
        });
      }
    },

    /*shouldComponentUpdate: function(nextProps) {
      if (this.props._id != nextProps._id)
        return true;

      if (this.props.children != nextProps.children)
        return true;

      return false;
    },*/

    render: function() {
      var className = "item";

      if (this.getDropState('bookmark').isHovering)
        className += " drag-hover";

      var coverImg = null;
      if (this.props.cover){
        var cover = consts.defaultCollectionIcon();
        try{cover = network.fixURL(this.props.cover[0]);}catch(e){}
        coverImg = React.createElement("img", {src: cover, alt: ""});
      }

      return React.createElement("li", React.__spread({className: className, key: "bread_"+this.props._id},  this.dropTargetFor('bookmark')), coverImg, React.createElement("a", {href: "#collection/"+this.props._id}, this.props.children));
    }
});

},{"../../../modules/ReactDND":102}],25:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsStore = require('../../../stores/Collections');
var Breadcrumb = require("./Breadcrumb");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({
    displayName: "Collections/Breadcrumbs",

    mixins: [PureRenderMixin],

    getInitialState: function() {
      return {
          collection: this.props.collection,
          parents: this.props.parents
      }
    },

    componentWillReceiveProps: function(nextProps) {
      if (this.isMounted())
      this.setState({
          collection: nextProps.collection,
          parents: nextProps.parents
      });
    },

    handleEdit: function(e) {
      e.preventDefault();
      Pop.show("collection", {
        id: this.state.collection._id,
        forceEdit: true,
        pin: "current-collection-settings-button",
        force: "vertical"
      });
    },

    handleShare: function(e) {
      e.preventDefault();
      Pop.show("collection", {
        id: this.state.collection._id,
        pin: "current-collection-share-button",
        force: "vertical",
        step: "sharing"
      });
    },

    handleAddFolder: function(e) {
      e.preventDefault();
      Pop.show("collection", {
        parentId: this.state.collection._id,
        pin: "current-collection-sub-folder-button",
        force: "vertical"
      });
    },

    handleRemove: function(e) {
      e.preventDefault();
      CollectionsStore.onRemoveCollection({item: this.state.collection});
    },

    render: function() {
        var items = null, actionLinks = null, _this = this;
        if ((this.state.parents||[]).length>0)
            items = this.state.parents.map(function(item){
                return [React.createElement(Breadcrumb, {key: "breaditem_"+item._id, _id: item._id, onDropBookmark: _this.props.onDropBookmark}, item.title), React.createElement("li", {className: "item separator", key: item._id+"_"}, React.createElement(Icon, {name: "chevron-right", size: "small"}))];
            });

        if (this.state.collection.author)
            actionLinks = (
              React.createElement("ul", {className: "breadcrumbs"}, 
                React.createElement("li", {className: "item more active"}, 
                    React.createElement("a", {href: "", title: t.s("createSubFolder"), className: "action-icon", onClick: this.handleAddFolder, style: {paddingLeft: "14px",paddingRight:"14px"}, id: "current-collection-sub-folder-button"}, React.createElement(Icon, {name: "folder-add", size: "mac"}))
                ), 

                React.createElement("li", {className: "item more active"}, 
                    React.createElement("a", {href: "", title: t.s("sharing"), className: "action-icon", onClick: this.handleShare, style: {paddingLeft: "14px",paddingRight:"14px"}, id: "current-collection-share-button"}, React.createElement(Icon, {name: "share", size: "mac"}))
                )
              )
            );

        if (this.state.collection._id===-99)
            actionLinks = (
              React.createElement("ul", {className: "breadcrumbs"}, 
                React.createElement("li", {className: "item more active"}, 
                    React.createElement("a", {href: "", className: "action-icon", onClick: this.handleRemove, style: {paddingLeft:"14px",paddingRight:"14px"}}, React.createElement(Icon, {name: "trash", size: "mac"}))
                )
              )
            );

        return (
            React.createElement("div", {className: "breadcrumbs-wrap"}, 
                React.createElement("ul", {className: "breadcrumbs"}, 
                    React.createElement("li", {className: "item"}, React.createElement("a", {href: "#/", className: "action-icon"}, React.createElement(Icon, {name: "home"}))), 
                    React.createElement("li", {className: "item separator"}, React.createElement(Icon, {name: "chevron-right", size: "small"}))
                ), 
                React.createElement("ul", {className: "breadcrumbs"}, 
                    items, 
                    React.createElement("li", {className: "item active", id: "current-collection-settings-button"}, React.createElement("a", {href: "", onClick: this.handleEdit}, this.state.collection.title, " ", React.createElement(Icon, {name: "arrow-down", size: "small"})))
                ), 

                actionLinks
            )
        );
    }
});

},{"../../../stores/Collections":115,"./Breadcrumb":24,"react/addons":"react/addons"}],26:[function(require,module,exports){
/** @jsx React.DOM */
var Collection = require('./Item.js');

module.exports = React.createClass({
    displayName: "Collections/Childrens",

    //mixins: [PureRenderMixin],

    getInitialState: function() {
        return {items: this.props.items};
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState({
            items: nextProps.items
        });
    },

    render: function() {
        var items = null, _this = this;
        if ((this.state.items||[]).length>0)
            items = this.state.items.map(function (item) {
                return React.createElement(Collection, {item: item, 
                                    look: "simple", 
                                    key: "child_"+item._id, 
                                    dragParent: "childrens", 
                                    onMore: _this.props.onCollectionMore, 
                                    onMove: _this.props.onCollectionMove, 
                                    onEndDrag: _this.props.onCollectionMoveEnd, 
                                    onDropBookmark: _this.props.onDropBookmark});
            });

        if (items!=null)
            return React.createElement("div", {className: "bookmarks view-childrens childrens"}, React.createElement("div", {className: "section"}, t.s("nestedCollections")), items);
        else
            return React.createElement("div", null);
    }
});

},{"./Item.js":31}],27:[function(require,module,exports){
/** @jsx React.DOM */
var Breadcrumb = require("../Collections/Breadcrumb");
var SidebarActions = require('../../../actions/Sidebar');
var PopoverCollection = require('../Popovers/CollectionMore');
var CollectionViewModal = require('../Modals/CollectionView');
var Search = require('../Search/Search.js');
var ClipperAction = require('../Helpers/ClipperAction.js');
var Select = require('../Helpers/Select.js');

var iconSize = null;
if ((window.environment||[]).indexOf("mac")!=-1)
    iconSize = "mac";

var overSidebarIcon = false, overSidebarTimeout = null;

var _sorting = [];

var setDefaults = function() {
  _sorting = [
      {
          key: "sort",
          value: t.s("custom")
      },
      {
          key: "lastUpdate",
          value: t.s("byDate")
      },
      {
          key: "title",
          value: t.s("byName")
      }
  ];
}

if (document)
    if (window.languageLoaded)
        setDefaults();
    else
        window.addEventListener("langLoaded", setDefaults);
else
    setDefaults();

var _styles = ["grid","list","masonry","simple"];

module.exports = React.createClass({
    displayName: "Collections/ClipperToolbar",

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            collection: this.props.collection,
            parents: this.props.parents,
            sortSelected: this.props.sortSelected,
            collectionPopover: false,
            viewModal: {
                show: false
            },
            queries: this.props.queries,
            showSearch: (this.props.queries.length>0),
            more: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState({
            collection: nextProps.collection,
            parents: nextProps.parents,
            sortSelected: nextProps.sortSelected,
            queries: nextProps.queries,
            //showSearch: (this.props.queries.length>0),
            more: false
        });

        var hideSearch = false;
        try{if ((this.state.collection._id != nextProps.collection._id)&&(nextProps.queries.length==0)) hideSearch = true;}catch(e){}
        if (hideSearch)
            if (this.isMounted())
            this.setState({showSearch:false});
    },

    handleFab: function(e) {
        e.preventDefault();
        this.props.handleFab();
    },


    handleBack: function(e) {
        if (e)
            e.preventDefault();
        //this.context.router.goBack();
        window.history.back();
    },

    handleSidebar: function(e) {
        if (e) e.preventDefault();
        SidebarActions.change(true);
    },

    handleSidebarOver: function(e) {
        overSidebarIcon = true;
        var _this = this;
        overSidebarTimeout = setTimeout(function() {
            if (overSidebarIcon) _this.handleSidebar();
        }, 150);
    },

    handleSidebarLeave: function(e) {
        clearTimeout(overSidebarTimeout);
        overSidebarIcon = false;
    },

    handleCollectionPopover: function(e) {
        if (e)
            e.preventDefault();

        Pop.show("collection", {id: this.state.collection._id, pin: "clipper-toolbar-header", forceEdit: true});
        //this.setState({more: !this.state.more});
    },

    handleEdit: function(tab) {
        //this.props.handleEditCollection( parseInt(tab) );
        Pop.show("collection", {id: this.state.collection._id, pin: "clipper-toolbar-header", forceEdit: true});
        this.handleCloseMore();
    },

    handleShare: function() {
        Pop.show("collection", {id: this.state.collection._id, step: "sharing", pin: "clipper-toolbar-share"});
    },

    handleViewModalShow: function() {
        var temp = JSON.parse(JSON.stringify(this.state.viewModal));
        temp.show = true;
        if (this.isMounted())
        this.setState({viewModal: temp});
    },

    handleViewModalClose: function() {
      var temp = JSON.parse(JSON.stringify(this.state.viewModal));
      temp.show = false;
      if (this.isMounted())
      this.setState({viewModal: temp});
    },

    handleChangeView: function(view) {
        this.props.handleChangeView(view);
    },

    handleSearchOpen: function(e) {
        e.preventDefault();
        if (this.isMounted())
        this.setState({showSearch: true, more: false});
    },

    handleSearchReset: function()  {
        //if (this.props.queries.length==0)
        if (this.isMounted())
            this.setState({showSearch: false, more: false});
        this.props.onSearchReset();
    },

    handleAddFolder: function(e) {
        e.preventDefault();
        Pop.show("collection", {parentId: this.state.collection._id, pin: "clipper-toolbar-sub-folder"});
        //this.props.handleAddFolder();
        this.handleCloseMore();
    },

    handleClose: function(e) {
        e.preventDefault();
        BrowserBridge.close();
    },

    handleCloseMore: function() {
        if (this.isMounted())
        this.setState({more: false});
    },

    handleSortChange: function(e) {
        e.preventDefault();
        this.props.handleSortChange(e.target.getAttribute("data-sort"));
    }, 

    handleChangeViewItem: function(e) {
        e.preventDefault();
        var view = e.target.getAttribute("data-view");
        this.handleChangeView(view);
    },

    renderMore: function() {
        var _this = this;

        var fastLinks = [];
        if (this.state.collection.author){
            fastLinks.push(
              React.createElement("a", {href: "", onClick: this.handleEdit, className: "item"}, 
                  React.createElement("span", {className: "icon currentCollectionBackground"}, React.createElement(Icon, {name: "edit"})), 
                  React.createElement("span", {className: "title"}, t.s("collectionEdit"))
              )
            );

            fastLinks.push(
              React.createElement("a", {href: "", onClick: this.handleShare, className: "item"}, 
                  React.createElement("span", {className: "icon currentCollectionBackground"}, React.createElement(Icon, {name: "share"})), 
                  React.createElement("span", {className: "title"}, t.s("shareCollection"))
              )
            );

            if ((window.environment||[]).indexOf("mobile")==-1){
                fastLinks.push(
                  React.createElement("a", {href: network.fixURL("/app#/collection/"+this.state.collection._id), target: "_blank", onClick: this.handleCloseMore, className: "item"}, 
                      React.createElement("span", {className: "icon currentCollectionBackground"}, React.createElement(Icon, {name: "open-link"})), 
                      React.createElement("span", {className: "title"}, t.s("openInBrowser"))
                  )
                );
            }

            fastLinks.push(
              React.createElement("a", {href: "", onClick: this.handleAddFolder, className: "item"}, 
                  React.createElement("span", {className: "icon currentCollectionBackground"}, React.createElement(Icon, {name: "folder-add"})), 
                  React.createElement("span", {className: "title"}, t.s("createSubFolder"))
              )
            );
        }

        var sort = _sorting.map(function(item){
            return (
              React.createElement("div", {className: "item "+(_this.state.sortSelected == item.key ? "active":null), "data-sort": item.key, onClick: _this.handleSortChange}, 
                  item.value
              )
            );
          });
          if ((this.state.collection._id == 0)||
              (this.state.collection._id == -99))
            sort.splice(0,1);

        var styles = _styles.map(function(item,index){
            return React.createElement("a", {href: "", key: "style_"+item, className: item==_this.state.collection.view ? "active" : "", "data-view": item, onClick: _this.handleChangeViewItem}, React.createElement("img", {src: (window.pathPrefix||"") + "images/views/" + item + ".svg", style: {width:"80px",height:"80px"}}))
        });

        return (
            React.createElement("div", {className: "clipper-toolbar-more "+(this.state.more ? "clipper-toolbar-show" : "")}, 
                React.createElement("div", {className: "fast-links"}, 
                    fastLinks
                ), 

                React.createElement("div", {className: "picker-list"}, 
                    React.createElement("div", {className: "separator", style: {marginTop:"-1px"}}), 
                    React.createElement("div", {className: "section"}, t.s("view"))
                ), 

                React.createElement("div", {className: "img-selector", style: {padding: "8px 16px"}}, 
                    styles
                ), 

                React.createElement("div", {className: "picker-list"}, 
                    React.createElement("div", {className: "separator"}), 
                    React.createElement("div", {className: "section"}, t.s("collectionsSorting"))
                ), 

                React.createElement("div", {className: "ioslike-tab"}, 
                    sort
                )
            )
        );
    },

    render: function() {
        var items = [], _this = this;
        if ((this.state.parents||[]).length>0)
            items = this.state.parents.map(function(item){
                return [React.createElement(Breadcrumb, {key: "bread_"+item._id, _id: item._id, onDropBookmark: _this.props.onDropBookmark}, item.title), React.createElement("li", {className: "item separator", key: item._id+"_"}, React.createElement(Icon, {name: "chevron-right", size: "small"}))];
            });

        var footer = null;

        if (UserStore.isLogged())
        if ((this.state.collection._id != -99)&&(typeof BrowserBridge != "undefined"))
            footer = (
                React.createElement(ClipperAction, {
                    collection: this.state.collection, 
                    handleBookmarkEdit: this.props.handleBookmarkEdit, 
                    handleFab: this.props.handleFab}
                    )
            );

        var titleBar = null;
        if (this.state.showSearch)
            titleBar = (
                React.createElement("section", {className: "search-bar"}, 
                    React.createElement(Search, {queries: this.state.queries, onSearchReset: this.handleSearchReset, autoFocus: true})
                )
            );
        else
            titleBar = (
                React.createElement("section", {className: "navigation"}, 
                    React.createElement("ul", {className: "path "+(this.state.collection.parent ? "" : "hidden")}, 
                        items
                    ), 
                    React.createElement("h1", null, 
                        React.createElement("a", {href: "", title: t.s("collectionEdit"), className: "path-more", id: "clipper-toolbar-setting", onClick: this.handleCollectionPopover}, UserStore.isLogged() ? this.state.collection.title : "Raindrop.io", 
                        React.createElement(Icon, {name: "arrow-down", size: "small"}))
                    )
                )
            );

        var className = cx({
            "clipper-toolbar": true,
            "currentCollectionBackground": true,
            "search-mode": this.state.showSearch
        })

        //onMouseOver={this.handleSidebarOver} onMouseLeave={this.handleSidebarLeave}
        //{this.renderMore()}
        return (
                React.createElement("div", {className: className}, 
                    React.createElement("header", {className: UserStore.isLogged() ? "" : "hidden", id: "clipper-toolbar-header"}, 
                        React.createElement("section", {className: "menu"}, 
                            React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSidebar}, React.createElement(Icon, {name: "menu"}))
                        ), 
                        
                        titleBar, 

                        React.createElement("section", {className: UserStore.isLogged() ? "actions" : "hidden"}, 
                            React.createElement("span", {className: this.state.showSearch ? "hidden" : "action-icon", title: t.s("sortBy")}, React.createElement(Select, {arrowIcon: false, items: _sorting, disableTitle: true, selected: this.state.sortSelected, handleChange: this.props.handleSortChange}, React.createElement(Icon, {name: "sorting", size: "mac"}))), 

                            React.createElement("a", {href: "", className: this.state.showSearch ? "hidden" : "action-icon", onClick: this.handleSearchOpen}, React.createElement(Icon, {name: "search", size: "mac"})), 
                            self!=top ? React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: "clear", size: "mac"})) : null
                        )
                    ), 

                    

                    footer, 

                    React.createElement(Modal, {position: "right-top", isOpened: this.state.viewModal.show, onClose: this.handleViewModalClose, closeOnOutsideClick: true, params: this.state.collection}, 
                        React.createElement(CollectionViewModal, {onChangeView: this.handleChangeView})
                    )
                )
        );
    }
});

},{"../../../actions/Sidebar":9,"../Collections/Breadcrumb":24,"../Helpers/ClipperAction.js":39,"../Helpers/Select.js":49,"../Modals/CollectionView":57,"../Popovers/CollectionMore":76,"../Search/Search.js":84}],28:[function(require,module,exports){
/** @jsx React.DOM */
var PopoverCollection = require('../Popovers/Collection');
var CollectionViewModal = require('../Modals/CollectionView');
var Search = require('../Search/Search.js');

module.exports = React.createClass({
    displayName: "Collections/Toolbar",

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            collectionPopover: false,
            viewModal: {
                show: false
            },
            queries: this.props.queries||[],
            showSearch: ((this.props.queries||[]).length>0),
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            queries: nextProps.queries||[],
            showSearch: ((nextProps.queries||[]).length>0)
        });
    },

    componentWillMount: function() {
        window.addEventListener('macMoreMenu', this.handleCollectionPopover, true);
        window.macSearchIsActive = true;
        window.addEventListener('macSearch', this.handleSearch, true);
    },

    componentWillUnmount: function() {
        window.removeEventListener('macMoreMenu', this.handleCollectionPopover, true);
        window.removeEventListener('macSearch', this.handleSearch, true);
        window.macSearchIsActive = false;
    },

    handleSearch: function() {
        if (UserStore.isLogged())
            this.setState({showSearch: this.state.queries.length>0});
    },

    handleCollectionPopover: function(e) {
        if (e)
            e.preventDefault();

        if (UserStore.isLogged())
            this.setState({collectionPopover: !this.state.collectionPopover});
    },

    handleCollectionPopoverClose: function() {
        this.setState({collectionPopover: false});
    },

    handleEdit: function(tab) {
        this.props.handleEditCollection( parseInt(tab) );
    },

    handleViewModalShow: function() {
        var temp = JSON.parse(JSON.stringify(this.state.viewModal));
        temp.show = true;
        this.setState({viewModal: temp});
    },

    handleViewModalClose: function() {
      var temp = JSON.parse(JSON.stringify(this.state.viewModal));
      temp.show = false;
      this.setState({viewModal: temp});
    },

    handleChangeView: function(view) {
        this.props.handleChangeView(view);
    },

    handleSearchReset: function()  {
        if (!this.props.q)
            this.setState({showSearch: false});
        this.props.onSearchReset();
    },

    render: function() {
        var search = null, style=null;
        //if ((this.state.showSearch)||((this.props.collection||{})._id==0)) {
            search = (
                React.createElement("div", {className: "clipper-toolbar search-mode"}, 
                    React.createElement("header", null, 
                        React.createElement("section", {className: "search-bar"}, 
                            React.createElement(Search, {queries: this.state.queries, onSearchReset: this.handleSearchReset, autoFocus: (this.props.collection||{})._id!=0})
                        )
                    )
                )
            );

            style = {height: "38px"};
        //}

        return (
            React.createElement("div", {className: "desktop-toolbar", style: style}, 
                React.createElement("div", {id: "collection-more-placeholder"}), 
                React.createElement(PopoverCollection, {onClose: this.handleCollectionPopoverClose, 
                      show: this.state.collectionPopover, 
                      attachId: "collection-more-placeholder", 
                      collection: this.props.collection, 
                      sortSelected: this.props.sortSelected, 
                      handleSortChange: this.props.handleSortChange, 
                      handleEdit: this.handleEdit, 
                      handleViewModalShow: this.handleViewModalShow, 
                      handleAddFolder: this.props.handleAddFolder}), 
                React.createElement(Modal, {position: "right-top", isOpened: this.state.viewModal.show, onClose: this.handleViewModalClose, closeOnOutsideClick: true, params: this.props.collection}, 
                    React.createElement(CollectionViewModal, {onChangeView: this.handleChangeView})
                ), 

                search
            )
        );
    }
});

},{"../Modals/CollectionView":57,"../Popovers/Collection":75,"../Search/Search.js":84}],29:[function(require,module,exports){
/** @jsx React.DOM */
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;
var GroupTabDragDropMixin = require('./GroupTabDragDropMixin');

module.exports = React.createClass({
    displayName: "Collections/GroupTab",

    mixins: [DragDropMixin, GroupTabDragDropMixin],

    getInitialState: function() {
        return {
          id: this.props.id,
          active: this.props.active || false
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState({
          id: nextProps.id,
          active: nextProps.active || false
        });
    },

    handleMore: function(e) {
        e.preventDefault();
        Pop.show("group", {
          id: this.state.id,
          pin: "tab-group-"+this.state.id,
          force: "vertical"
        });
    },

    handleAdd: function(e) {
        e.preventDefault();
        if (typeof this.props.onAdd == "function")
            this.props.onAdd(this.state.id);
    },

    render: function() {
        var className = "item"+(this.state.active?" active":"");
        //if (this.getDragState('group').isDragging)
        //  className += " invisible";

        return (
          React.createElement("div", React.__spread({ref: "group", 
            className: className, 
            key: "grouptab_"+this.state.id, 
            id: "tab-group-"+this.state.id}, 
            this.dropTargetFor('collection', 'group'), 
            this.dragSourceFor('group'), 
            {"data-id": this.state.id, 
            onClick: this.props.onClick, 
            onContextMenu: this.handleMore}), 
            /*<div className="action-icon" onClick={this.handleAdd}><Icon name="add" size="small" /></div>*/
            React.createElement("div", {className: "title"}, this.props.children), 
            React.createElement("div", {className: "action-icon", onClick: this.handleMore}, React.createElement(Icon, {name: "edit", size: "mac"}))
          )
        )
    }
});

},{"../../../modules/ReactDND":102,"./GroupTabDragDropMixin":30}],30:[function(require,module,exports){
module.exports = {
  statics: {
    configureDragDrop: function(register) {
      register('collection', {
        dropTarget: {
          over: function(componentReceiver, originItem) {
            if (typeof componentReceiver.props.onClick == "function"){
              componentReceiver.props.onClick({id: componentReceiver.state.id});
            }

            if (typeof componentReceiver.props.onDrop == "function"){
              componentReceiver.props.onDrop(originItem._id, componentReceiver.state.id || componentReceiver.props.id, originItem.dragParent);
            }
          }
        }
      });

      register('group', {
        dragSource: {
          beginDrag: function(component) {
            React.findDOMNode(component.refs.group).classList.add('drag-preview');
            return {
              item: {
                id: component.state.id || component.props.id
              }
            };
          }
        },

        dropTarget: {
          over: function(componentReceiver, originItem) {
            if (typeof componentReceiver.props.onMove == "function"){
              componentReceiver.props.onMove(originItem.id, componentReceiver.state.id || componentReceiver.props.id);
            }
          }
        }
      });
    }
  },
}

},{}],31:[function(require,module,exports){
/** @jsx React.DOM */
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;
var ItemDragDropMixin = require('./ItemDragDropMixin');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Popover = require("../Popovers/Collection");

module.exports = React.createClass({
    displayName: "Collections/Item",

    mixins: [DragDropMixin, ItemDragDropMixin, PureRenderMixin],

    getInitialState: function() {
        var state = this.props.item;
        state.showPopover=false;
        state.mousePos=false;
        return state;
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState(nextProps.item);
    },

    handleMore: function(e) {
        if (e) if (e.preventDefault) e.preventDefault();
        if (this.isMounted())
        this.setState({showPopover:true, mousePos: !e.target.classList.contains("icon-more")});
        /*if (typeof this.props.onMore == "function")
            this.props.onMore(0, this.props.item._id);*/
    },

    handleShare: function(e) {
        if (e) if (e.preventDefault) e.preventDefault();
        Pop.show("collection", {
          id: this.props.item._id,
          pin: "child-collection-"+this.props.item._id,
          step: "sharing"
        });
    },

    handleEdit: function(e, step) {
        if (e) if (e.preventDefault) e.preventDefault();
        //this.props.onMore(0, this.props.item._id);
        Pop.show("collection", {
          id: this.props.item._id,
          pin: "child-collection-"+this.props.item._id,
          step: step
        });
    },

    handlePopoverClose: function() {
        if (this.isMounted())
        this.setState({showPopover:false});
    },

    render: function() {
        var cover = consts.defaultCollectionIcon();
        try{cover = network.fixURL(this.state.cover[0]);}catch(e){}

        var ghostIcon = null;
        /*if (this.state._id>0)
            ghostIcon = <img src={cover} className="ghost-icon" alt="" />;*/

        var link = "#/collection/"+this.state._id;

        var statusShared = null, statusPublic = null;
        if (this.state.collaborators && this.state.author)
            statusShared = React.createElement(Icon, {name: "shared", size: "small"});
        else if (this.state.collaborators && !this.state.author)
            statusShared = React.createElement(Icon, {name: "public", size: "small"});
        if (this.state.public)
            statusPublic = React.createElement(Icon, {name: "link", size: "mac"});

        var actions = null;
        if ((this.state.author)/*&&(typeof this.props.onMore == 'function')*/) {
            actions = (React.createElement("div", {className: "more"}, 
                React.createElement("a", {href: "", id: "edit-"+this.props.item._id, className: "action-icon icon-more", onClick: this.handleShare}, React.createElement(Icon, {name: "share", size: "mac"})), 
                React.createElement("a", {href: "", id: "edit-"+this.props.item._id, className: "action-icon icon-more", onClick: this.handleEdit}, React.createElement(Icon, {name: "settings", size: "mac"}))
                
                /*<a href="" id={"more-"+this.props.item._id} className="action-icon icon-more" onClick={this.handleMore}><Icon name="more" size="mac" /></a>*/
            ));
        }

        var className="card collection-item"+(this.props.look || "");
        if (this.getDragState('collection').isDragging)
          className += " no-opacity";

        if (this.getDropState('bookmark').isHovering)
          className += " drag-hover";

        //default icons
        var icon = null, favIconClass = "favicon";
        switch(this.state._id){
            case -1:
                icon = React.createElement(Icon, {name: "inbox", className: "icn-orange"});
                favIconClass+= " favicon-svg";
            break;

            default:
                icon = React.createElement("img", {src: cover, className: "icon", alt: ""});
            break;
        }

        return (
            React.createElement("figure", React.__spread({},  this.dragSourceFor('collection'),  this.dropTargetFor('collection', 'bookmark'), {className: className, ref: "collection", id: "child-collection-"+this.props.item._id, onContextMenu: this.handleMore}), 
                React.createElement("div", {className: favIconClass}, 
                    ghostIcon, 
                    icon
                ), 

                React.createElement("figcaption", {className: "about"}, 
                    React.createElement("div", {className: "title"}, this.state.title)
                ), 

                React.createElement("div", {className: "info"}, 
                    React.createElement("div", {className: "count"}, this.state.count), 
                    statusShared, 
                    statusPublic
                ), 

                actions, 
                React.createElement("a", {href: link, className: "permalink"}), 
                React.createElement(Popover, React.__spread({position: this.state.mousePos ? "left" : "", onClose: this.handlePopoverClose, show: this.state.showPopover, attachId: "more-"+this.props.item._id},  {collection:this.props.item}, {onlyBasic: true, handleEdit: this.handleEdit, handleRemove: this.handleRemove, mousePos: this.state.mousePos}))
            )
        );
    }
});

},{"../../../modules/ReactDND":102,"../Popovers/Collection":75,"./ItemDragDropMixin":32,"react/addons":"react/addons"}],32:[function(require,module,exports){
module.exports = {
  statics: {
    configureDragDrop: function(register) {
      register('collection', {
        dragSource: {
          canDrag: function(component) {
            if ( (component.state._id || component.props._id) <=0)
              return false;
            return true;
          },

          beginDrag: function(component) {
            React.findDOMNode(component.refs.collection).classList.add('drag-preview');
            return {
              effectsAllowed: ["move"],
              dragPreview: React.findDOMNode(component.refs.collection),
              item: {
                _id: component.state._id || component.props._id,
                dragParent: component.props.dragParent,
              }
            };
          },

          endDrag: function(component, dragEffect) {
            if (typeof component.props.onEndDrag == "function")
              component.props.onEndDrag(component.state._id || component.props._id);
          }
        },

        dropTarget: {
          over: function(componentReceiver, originItem) {
            if (originItem._id == (componentReceiver.state._id || componentReceiver.props._id)){
              return false;
            }

            if (typeof componentReceiver.props.onMove == "function"){
              componentReceiver.props.onMove(originItem._id, (componentReceiver.state._id || componentReceiver.props._id), originItem.dragParent);
            }
          }
        }
      });


      register('bookmark', {
        dropTarget: {
          acceptDrop: function(collection, bookmarkItem) {
            if (typeof collection.props.onDropBookmark == "function")
              collection.props.onDropBookmark(bookmarkItem._id, collection.state._id || collection.props._id);
          }
        }
      });
    }
  },
}

},{}],33:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsActions = require('../../../actions/Collections');
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
    displayName: "Collections/Path",

    getInitialState: function() {
        return {
          _id: this.props._id,
          cover: null,
          title: null
        };
    },

    componentWillReceiveProps: function(nextProps) {
      if (this.isMounted())
        this.setState({
          _id: nextProps._id
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      if (this.state.title != nextState.title)
        return true;

      if (this.state.cover != nextState.cover)
        return true;

      if (this.state._id != nextState._id){
        return true;
      }

      return false;
    },

    onCollectionsChange: function() {
        if (this.state.title != null)
          return true;

        this.parseCollection();
    },

    componentDidMount: function() {
      this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);

      if (this.parseCollection()==null)
        CollectionsStore.onLoadId(this.state._id);
    },

    componentWillUnmount: function() {
      this.unsubscribeCollections();
    },

    parseCollection: function() {
      var collection = CollectionsStore.getCollection(this.state._id);

      if (collection == null)
        return null;
      else{
        var cover = "";//consts.defaultCollectionIcon();
        if (collection._id>0)
        try{
          cover = network.fixURL(collection.cover[0]);
        }catch(e){}
        if (this.isMounted())
        this.setState({title: collection.title, cover: cover});
      }

      return true;
    },

    render: function() {
      return (
        React.createElement("a", {href: "#/collection/"+this.state._id, className: "from-collection"}, 
          !this.state.cover ? React.createElement(Icon, {name: network.defaultIcons(this.state._id), className: "collection-icon"}) : React.createElement("img", {src: this.state.cover, className: "collection-icon", alt: ""}), 
          this.state.title
        )
      );
    }
});

},{"../../../actions/Collections":4,"../../../stores/Collections":115}],34:[function(require,module,exports){
/** @jsx React.DOM */
var Breadcrumbs = require('./Breadcrumbs.js'),
    Select = require('../Helpers/Select.js');

var CollectionViewModal = require('../Modals/CollectionView');

var _sorting = [
    {
        key: "sort",
        value: t.s("custom")
    },
    {
        key: "lastUpdate",
        value: t.s("byDate")
    },
    {
        key: "title",
        value: t.s("byName")
    }
]

module.exports = React.createClass({
    displayName: "Collections/Toolbar",

    getInitialState: function() {
        return {
            collection: this.props.collection,
            parents: this.props.parents,
            sortSelected: this.props.sortSelected,

            viewModal: {
                show: false
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted())
        this.setState({
            collection: nextProps.collection,
            parents: nextProps.parents,
            sortSelected: nextProps.sortSelected
        });
    },

    handleChangeView: function(view) {
        this.props.handleChangeView(view);
    },

    handleEdit: function(e) {
        e.preventDefault();
        this.props.handleEditCollection( parseInt(e.target.getAttribute('data-tab')) );
    },

    handleViewModalShow: function(e) {
        e.preventDefault();
        var temp = JSON.parse(JSON.stringify(this.state.viewModal));
        temp.show = true;
        if (this.isMounted())
        this.setState({viewModal: temp});
    },

    handleViewModalClose: function() {
      var temp = JSON.parse(JSON.stringify(this.state.viewModal));
      temp.show = false;
      if (this.isMounted())
      this.setState({viewModal: temp});
    },

    render: function() {
        if (!UserStore.isLogged())
            return null;

        return (
            React.createElement("div", {className: "collection-toolbar"}, 
                React.createElement(Modal, {position: "right-top", isOpened: this.state.viewModal.show, onClose: this.handleViewModalClose, closeOnOutsideClick: true, params: this.state.collection}, 
                    React.createElement(CollectionViewModal, {onChangeView: this.handleChangeView})
                ), 

                React.createElement(Breadcrumbs, {
                    collection: this.state.collection, 
                    parents: this.state.parents, 
                    handleEditCollection: this.props.handleEditCollection, 
                    handleAddFolder: this.props.handleAddFolder, 
                    onDropBookmark: this.props.onDropBookmark}
                    ), 
                React.createElement("div", {className: "toolbar-icons"}, 
                    React.createElement("span", {className: "action-icon", title: t.s("sortBy")}, React.createElement(Select, {arrowIcon: "true", items: _sorting, disableTitle: false, selected: this.state.sortSelected, handleChange: this.props.handleSortChange}, React.createElement(Icon, {name: "sorting", size: "mac"})))
                )
            )
        );
        //
        //<Icon name={this.state.collection.view} /> 
    }
});

},{"../Helpers/Select.js":49,"../Modals/CollectionView":57,"./Breadcrumbs.js":25}],35:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsStore = require('../../stores/Collections');

var fab = React.createClass({
  displayName: "Fab",

    getDefaultProps: function() {
        return {};
    },

    shouldComponentUpdate: function() {
      return false;
    },

    componentDidMount: function() {
        React.render(React.createElement(_fab, React.__spread({},  this.props)), document.getElementById('app-overlay-action'));
    },

    componentWillUnmount: function() {
        var elem = document.getElementById('app-overlay-action');
        if (elem) elem.removeChild(document.getElementById('fabAppButton'));
    },

    render: function() {
        return null;
    }
});

var _fab = React.createClass({
  displayName: "_fab",

    handleClick: function(e) {
        e.preventDefault();
        var isSystem = (CollectionsStore.getCurrentId() <= 0);

        Pop.show("fab", {
            parentId: CollectionsStore.getCurrentId(),
            pin: "fabAppButton",
            onlyURL: isSystem
        });
    },

    render: function() {
        return (
            React.createElement("a", {href: "", id: "fabAppButton", className: "fab", style: {position: 'fixed'}, onClick: this.handleClick}, React.createElement(Icon, {name: "add", size: "small"}))
        );
    }
});

module.exports = fab;

},{"../../stores/Collections":115}],36:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsActions = require('../../../actions/Collections');
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
    displayName: "Forms/CollectionsList",

    scrolled: false,

    getInitialState: function() {
        return {
            items: CollectionsStore.getCollections(),
            childrens: [],
            user: UserStore.getUser()
        };
    },

    onCollectionsChange: function(collections) {
        this.setState({items: collections});
    },

    onUserChange: function(user) {
        this.setState({
            user: user
        });
    },

    scrollToActive: function() {
        if (this.scrolled) return;

        var activeElem = false;
        if (this.props.activeCollection)
            activeElem = document.getElementById("cl-collection-"+this.props.activeCollection);
        else if (this.props.activeGroup)
            activeElem = document.getElementById("cl-group-"+this.props.activeGroup);

        if (activeElem){
            activeElem.scrollIntoView(false);
            this.scrolled=true;
        }
    },

    componentWillMount: function() {
        CollectionsActions.load();
    },

    componentDidMount: function() {
        var _this = this;

        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        this.unsubscribeUser = UserStore.listen(this.onUserChange);

        var temp = null;
        try{temp = JSON.parse(Api.getItem("childrens"));} catch(e) {}
        if ((temp) && (_this.state.childrens.length == 0)) {
            _this.state.childrens = _.sortBy(temp, function(item){
              return item.sort;
            });
            _this.setState({childrens: _this.state.childrens});
        }

        Api.get("childrens", function(json){
            var childrens = _.sortBy(json.items||[], function(item){
              return item.sort;
            });

            _this.setState({childrens: childrens});
            Api.setItem("childrens", JSON.stringify(childrens));
        });
    },

    componentWillUnmount: function() {
        this.unsubscribeCollections();
        this.unsubscribeUser();
    },

    handleCollectionSelect: function(e) {
        e.preventDefault();
        var collection = null, id = parseInt(e.target.getAttribute('data-cid'));

        for(var i in this.state.items)
            if (this.state.items[i]._id == id){
                collection = this.state.items[i];
                break;
            }

        for(var i in this.state.childrens)
            if (this.state.childrens[i]._id == id){
                collection = this.state.childrens[i];
                break;
            }

        this.props.onSelectCollection(collection);
    },

    handleGroupSelect: function(e) {
        e.preventDefault();
        var index = parseInt(e.target.getAttribute('data-index'));

        this.props.onSelectGroup(this.state.user.groups[index], index);
    },

    componentDidUpdate: function() {
        if(this.props.onUpdate) this.props.onUpdate();

        this.scrollToActive();
    },

    render: function() {
        var items = [], _this = this,
            withGroups = (typeof _this.props.onSelectGroup == 'function');

        var _makeItem = function(item) {
            var cover = "https://raindrop.io/other/popup/img/icon-folder.png";
            try{cover = network.fixURL(item.cover[0]);}catch(e){}

            return (
                React.createElement("div", {id: "cl-collection-"+item._id, className: "item"+((_this.props.activeCollection||0) == item._id ? " active":""), style: {paddingLeft: (item.level*20)+"px"}}, 
                    React.createElement("div", {className: "icon"}, 
                        React.createElement("img", {src: cover, alt: ""})
                    ), 
                    React.createElement("div", {className: "title"}, 
                        item.title
                    ), 
                    React.createElement("a", {href: "", className: "permalink", "data-cid": item._id, onClick: _this.handleCollectionSelect})
                )
            );
        }

        var _makeGroup = function(item, index) {
            if (withGroups) {
                var placeholder = null;
                if (index>0)
                    placeholder = React.createElement("div", {className: "section"});
                return (
                    React.createElement("div", null, 
                        placeholder, 
                        React.createElement("div", {id: "cl-group-"+index, className: "item"+(_this.props.activeGroup == index ? " active":"")}, 
                            React.createElement("div", {className: "icon"}, 
                                React.createElement(Icon, {name: "group", size: "mac"})
                            ), 
                            React.createElement("div", {className: "title"}, 
                                item.title
                            ), 
                            React.createElement("a", {href: "", className: "permalink", "data-index": index, onClick: _this.handleGroupSelect})
                        )
                    )
                );
            }
            else
                return React.createElement("div", {className: "section"}, item.title);
        }

        var findChildrens = function(parentId, level) {
            _this.state.childrens.forEach(function(c){
                if ((c.parent["$id"]==parentId)&&(c._id != _this.props.skipCollection)) {
                    c.level = level;
                    items.push(_makeItem(c));
                    findChildrens(c._id, level+1);
                }
            });
        }

        if ((this.state.user.groups||[]).length>0)
        this.state.user.groups.forEach(function(item, index){
            if ((withGroups)||((item.collections||[]).length>0))
              items.push(_makeGroup(item, index));

            if ((item.collections||[]).length>0)
                item.collections.forEach(function(c){
                    var collection = CollectionsStore.getCollection(c);
                    if ((collection!=null)&&(collection._id != _this.props.skipCollection)&&(collection.author)) {
                        collection.level = (withGroups?2:1);
                        items.push(_makeItem(collection));
                        findChildrens(collection._id, (withGroups?3:2) );
                    }
                });
        });

        if (!withGroups) {
            items.push(React.createElement("div", {className: "section"}));
            items.push(_makeItem(CollectionsStore.getCollection(-2)));
            if (UserStore.isLogged()){
              items.push(_makeItem(CollectionsStore.getCollection(-1)));
              items.push(_makeItem(CollectionsStore.getCollection(-99)));
            }
        }

        return (
            React.createElement("div", {className: "picker-list"}, 
                items
            )
        );
    }
});

},{"../../../actions/Collections":4,"../../../stores/Collections":115}],37:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({
  displayName: "Helpers/Avatar",

  shouldComponentUpdate: function(nextProps) {
    return (this.props.src != nextProps.src);
  },

  render: function() {
      if (this.props.src)
          return React.createElement("img", {className: "icn-circle", src: "https://www.gravatar.com/avatar/"+this.props.src+"?d=mm&s="+(this.props.size||24), alt: ""});
      else
          return React.createElement(Icon, {name: "default-avatar"});
  }
});

},{}],38:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({
  displayName: "Helpers/Checkbox",

  shouldComponentUpdate: function(nextProps) {
    return (this.props.active != nextProps.active);
  },

  handleClick: function(e) {
    e.preventDefault();

    this.props.onClick(!this.props.active);
  },

  render: function() {
    var className = "checkbox";
    if (this.props.active)
      className += " active";

    return (
      React.createElement("a", {href: "", onClick: this.handleClick, className: className}, 
        React.createElement(Icon, {name: "done"})
      )
    );
  }
});

},{}],39:[function(require,module,exports){
var BookmarksActions = require("../../../actions/Bookmarks"),
	BookmarksStore = require("../../../stores/Bookmarks"),
    LastBookmarkStore = require("../../../stores/LastBookmark");

var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
    displayName: "Helpers/ClipperAction",

    getInitialState: function() {
    	return {
    		step: "loading",
    		bookmark: {}
    	}
    },

    componentWillUnmount: function() {
        if (typeof this.unsubscribeLastBookmark == "function")
            this.unsubscribeLastBookmark();
        this.unsubscribeUser();
        window.bridgeSaveURL = false;
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    	var _this = this;

        if ((window.environment||[]).indexOf("mobile")==-1){
            this.unsubscribeLastBookmark = LastBookmarkStore.listen(this.onLastBookmark);

            if (/*(window.environment.indexOf("chrome_popup")!=-1)||*/(!UserStore.isLogged())) {
                if (this.isMounted()) this.setState({step: "unsupported"});
            }
            else{
            	BrowserBridge.currentURL(function(url){
                    if (_this.isMounted()) _this.setState({url: url});
            		BookmarksActions.loadBookmark({url: url}, function(item){
            			if (_this.isMounted()) _this.setState({step: (item?"saved":"new"), bookmark: (item||{})});
            		});
            	});
            }

            window.bridgeNewURL = function(url) {
                if (_this.isMounted()) _this.setState({step: "loading", bookmark: {}, url: url});
                BookmarksActions.loadBookmark({url: url}, function(item){
                    if (_this.isMounted()) _this.setState({step: (item?"saved":"new"), bookmark: (item||{})});
                });
            }

            window.bridgeSaveURL = this.handleSaveURL;
        }else{
            if (this.isMounted()) this.setState({step: "new"});
        }
    },

    onUserChange: function(user) {
        if (this.isMounted())
        this.setState({
            user: user
        });
    },

    onLastBookmark: function(action) {
        if (this.state.step == "unsupported")
            return;

        switch(action.name){
            case "insert":
                var elem = document.getElementById("element-"+action.bookmark._id);
                if (elem) elem.classList.add("is-new");

                var _this = this;
                BrowserBridge.currentURL(function(url){
                    if ((url == action.bookmark.link)||(url == action.bookmark.link+"/")||(url+"/" == action.bookmark.link)){
                        _this.setState({step: "saved", bookmark: action.bookmark});
                    }
                });

                BrowserBridge.updateExtensionIconForURL(action.bookmark.link, true);
            break;

            case "remove":
                if (action.bookmark._id == this.state.bookmark._id)
                    this.setState({step: "new", bookmark: {}});

                BrowserBridge.updateExtensionIconForURL(action.bookmark.link, false);
            break;
        }
    },

    handleBookmarkEdit: function(e) {
    	e.preventDefault();
    	Pop.show("bookmark", {id: this.state.bookmark._id, pin: "bookmark-edit-clipper"});
        //this.props.handleBookmarkEdit(this.state.bookmark._id);
    },

    handleSaveURL: function(url) {
        var _this = this;
        Toasts.show({title: t.s('loading'), text: url});
        if (this.isMounted()) this.setState({url: url});

        BookmarksActions.parseURL({item: {url: url}}, function(item){
            if (item){
                item.collectionId = _this.props.collection._id;

                BookmarksActions.insertBookmark({item: item, toEndOfList: (item.collectionId==-2) }, function(result){

                });
            }else{
                Toasts.show({text: t.s('supportOnlyUrls'), status:"error"});
            }
        });
    },

    handleFab: function(e) {
        if (e)
            if (typeof e.preventDefault != "undefined")
                e.preventDefault();
        var isSystem = (CollectionsStore.getCurrentId() <= 0);

        Pop.show("fab", {
            parentId: CollectionsStore.getCurrentId(),
            pin: "clipper-add-zone",
            onlyURL: isSystem
        });
    },

    handleURL: function(e) {
        e.preventDefault();

        Pop.show("fab", {
            parentId: CollectionsStore.getCurrentId(),
            pin: "clipper-add-zone",
            onlyURL: true
        });
    },

    handleSave: function(e) {
    	e.preventDefault();

        //Disable if mobile
        if ((window.environment||[]).indexOf("mobile")==-1){
        	if (this.isMounted()) this.setState({step: "loading"});

        	var _this = this;
        	BrowserBridge.currentURL(function(url){
                if (_this.isMounted()) _this.setState({url:url});

                var responseFunc = function(item){
                    var clean = JSON.parse(JSON.stringify(item||{}));
                    clean = BookmarksStore._prepareBookmark(clean,clean);
                    clean.collectionId = _this.props.collection._id;

                    BookmarksActions.insertBookmark({item: clean}, function(result){
                        if (result){
                            //_this.setState({step: "saved", bookmark: (result||{})});
                        }else{
                            if (_this.isMounted()) _this.setState({step: "new", bookmark: {}});
                        }
                    });
                }

                BrowserBridge.parseCurrentPage(function(item) {
                    if (!item)
                        BookmarksActions.parseURL({item: {url:url} }, responseFunc);
                    else
                        responseFunc(item);
                });
        	});
        }else{
            this.handleFab();
        }
    },

    render: function() {
        var content = null;

    	switch(this.state.step){
    		case "loading":
    			content = (
		    		React.createElement("div", {className: "sub", key: "loading"}, 
		                React.createElement("section", {className: "icon"}, 
		                    React.createElement(Icon, {name: "loading", className: "rotating-animation", size: "mac"})
		                ), 
		                React.createElement("section", {className: "text"}, 
		                    t.s("loading"), "...", 
                            React.createElement("div", {className: "subinfo"}, this.state.url||t.s("orAlternativeFeed"))
		                )
		            )
		    	);
    		break;

    		case "new":
    			content = (
		    		React.createElement("div", {className: "sub", onClick: this.handleSave, key: "new"}, 
		                React.createElement("section", {className: "icon"}, 
		                    React.createElement(Icon, {name: "add-box-clean", size: "mac", className: "currentCollectionBackground"})
		                ), 
		                React.createElement("section", {className: "text"}, 
		                    t.s("saveLink"), 
                            React.createElement("div", {className: "subinfo"}, t.s("or"), " ", t.s("noBookmarksD").toLowerCase())
		                )
		            )
		    	);
    		break;

    		case "saved":
    			content = (
		    		React.createElement("div", {className: "sub", id: "bookmark-edit-clipper", onClick: this.handleBookmarkEdit, key: "saved"}, 
		                React.createElement("section", {className: "icon"}, 
		                    React.createElement(Icon, {name: "done-circle", size: "mac", className: "icn-green"})
		                ), 
		                React.createElement("section", {className: "text"}, 
		                    t.s((this.state.bookmark.type||"link") + "Saved"), 
		                    React.createElement("div", {className: "subinfo"}, t.s("alreadyInCollectionDD"))
		                )
		            )
		    	);
    		break;

            case "unsupported":
                content = /*null;*/(
                    React.createElement("div", {className: "sub", style: {cursor:"default"}, key: "unsupported"}, 
                        React.createElement("section", {className: "icon"}, 
                            React.createElement(Icon, {name: "clear", size: "mac"})
                        ), 
                        React.createElement("section", {className: "text"}, 
                            t.s("unableToRecognizeSpecifiedLink"), ".", React.createElement("br", null), 
                            React.createElement("a", {href: "", onClick: this.handleURL}, t.s("enterLink"), " (URL)")
                        )
                    )
                );
            break;
    	}

        content = [content];
        content.push(
            React.createElement("div", {className: "sub padding", onClick: this.handleFab, key: "more"}, 
                React.createElement("section", {className: "text"}, 
                    t.s("more"), " ", React.createElement(Icon, {name: "arrow-down", size: "small"})
                )
            )
        );

        return React.createElement("footer", {id: "clipper-add-zone"}, content);
    }
});

},{"../../../actions/Bookmarks":2,"../../../stores/Bookmarks":113,"../../../stores/Collections":115,"../../../stores/LastBookmark":116}],40:[function(require,module,exports){
/** @jsx React.DOM */
var colors = require('../../../modules/colors.js');

module.exports = React.createClass({
    displayName: "Helpers/Cover",

    cleanSource: function(src,link) {
      if (src){
        return src;
      }else{
        return (consts.screenshotService+encodeURIComponent(link||""));
      }
    },

    makeNextState: function(props) {
        var scaleDown = props.scaleDown || null,
            proportions = null;
        if (props.src){
          scaleDown = Api.getItem("scaleDown-"+props.src) || null;
          proportions = parseFloat(props.proportions||0).toFixed(1) || Api.getItem("proportions-"+props.src) || null;
        }

        return {
            src: this.cleanSource(props.src, props.link),
            domain: props.domain || "",
            scaleDown: scaleDown,
            width: props.width || 230,
            className: props.className,
            //proportions: proportions
        };
    },

    getInitialState: function() {
        return this.makeNextState(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState(this.makeNextState(nextProps));
    },

    handleImgLoadSuccess: function(e) {
        if (this.isMounted()){
          var _this = this;
          if (/*(_this.state.scaleDown==null)&&*/((_this.state.src||"").indexOf("data:")!=0))
          try {
              var coverScaleDown = ((e.target.parentNode.offsetWidth > e.target.naturalWidth+30) || (e.target.parentNode.offsetHeight > e.target.naturalHeight+30))

              if (_this.state.scaleDown != coverScaleDown) {
                  if (coverScaleDown) {
                      Api.setItem("scaleDown-"+_this.state.src, coverScaleDown);
                      if (_this.isMounted()) _this.setState({scaleDown: coverScaleDown});
                  }
              }

              /*if (_this.props.preHeight){
                Api.setItem("proportions-"+_this.state.src, (e.target.naturalHeight / e.target.naturalWidth).toFixed(1));
              }*/
          }catch(e){}

          try{(React.findDOMNode(this.refs.img).parentElement).style.backgroundImage = "none";}catch(e){}
        }
    },

    handleImgLoadError: function() {
        if (this.isMounted()){
          this.setState({src: false});

          try{(React.findDOMNode(this.refs.img).parentElement).style.backgroundImage = "none";}catch(e){}
        }
    },


    shouldComponentUpdate: function(nextProps, nextState) {
      if (this.state.src != nextState.src)
        return true;

      if (this.state.domain != nextState.domain)
        return true;

      if (this.state.scaleDown != nextState.scaleDown)
        return true;

      return false;
    },

    render: function() {
        if (this.state.src) {
            var className=this.state.className;
            if ((this.props.preHeight)&&(this.state.proportions!="null")){
              className += " with-proportions";
            }
            if (this.state.src.indexOf(consts.screenshotService)==0)
              className += " is-screenshot";

            var retinaWidth = 230;
            if (this.state.width == 230)
              retinaWidth = 460;
            //onLoad={this.handleImgLoadSuccess}
            return React.createElement("img", {ref: "img", className: className, "data-scale-down": this.state.scaleDown, 
                        //data-proportions={(this.state.proportions||"").toString()}
                        src: network.thumb(this.state.src, this.state.width), 
                        srcSet: network.thumb(this.state.src, retinaWidth)+" 2x", alt: "", 
                        onLoad: this.handleImgLoadSuccess, 
                         onError: this.handleImgLoadError});
        }else if (this.state.domain) {
            //style={{backgroundImage: "url("+network.favIcon(this.state.domain)+")"}}
            var color = colors.colorFromString(strings.beautifulDomain(this.state.domain));
            return React.createElement("span", {ref: "img", className: this.state.className+" cover-placeholder", style: {backgroundColor: "rgba("+color[0]+","+color[1]+","+color[2]+",.5)"}}, React.createElement(Icon, {name: "safari"}));
        }else{
            return React.createElement("span", {ref: "img", className: this.state.className+" cover-placeholder"});
        }
    }
});

},{"../../../modules/colors.js":105}],41:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({
    displayName: "Helpers/CoverSelector",

    getInitialState: function() {
        var selected = 0;

        if (typeof this.props.selected == "undefined")
          selected = -1;
        else
          selected = this.props.selected;

        return {
            items: this.props.items || [],
            selected: selected
        }
    },

    componentWillReceiveProps: function(nextProps) {
      var selected = 0;

      if (typeof nextProps.selected == "undefined")
        selected = -1;
      else
        selected = nextProps.selected;

      if (this.isMounted()) this.setState({items: nextProps.items, selected: selected});
    },

    handleSelect: function(e) {
        e.preventDefault();
        var sel = parseInt(e.target.getAttribute("data-index"));
        if (this.isMounted()) this.setState({selected: sel});
        this.props.onSelect(sel);
    },

    render: function() {
        var _this = this;
        var items = this.state.items.map(function(item,index){
            var className = "item";
            if (parseInt(_this.state.selected)==parseInt(index))
                className+=" active";
            if (item=="")
                className+=" blank";

            if (_this.props.thumbs) {
                var i = item.indexOf(".jpg");
                if (i > 0) {
                    item = item.substr(0, i) + "-thumb" + item.substr(i, 1000);
                }
            }

            var style = {backgroundImage:"url("+item+")"};
            if (typeof _this.props.imageSize != "undefined")
                style.backgroundSize = _this.props.imageSize;

            return (
                React.createElement("div", {className: className, style: style, key: "coveritem_"+item, id: "coveritem_"+index}, 
                    React.createElement("a", {href: "", "data-index": index, onClick: _this.handleSelect}, React.createElement(Icon, {name: "done"}))
                ));
        });
        
        return (
            React.createElement("div", {className: "cover-selector"}, 
                items, this.props.children
            )
        );
    }
});

},{}],42:[function(require,module,exports){
/** @jsx React.DOM */
var colors = require('../../../modules/colors.js');

module.exports = React.createClass({
    displayName: "Helpers/Favicon",

    _generate: function(props) {
        var palette = null, show = true, cleanDomain = network.cleanDomain(props.domain);

        if (props.domain||false){
          palette = Api.getItem("palette_" + props.domain) || null;
          //show = (palette==null);
        }

        return {
            domain: props.domain||"",
            cleanDomain: cleanDomain,
            show: show,
            className: props.className||"",
            palette: palette
        };
    },

    getInitialState: function() {
        return this._generate(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState(this._generate(nextProps));
    },

    handleImgLoadError: function() {
        if (this.isMounted()){
          if (!this.state.domain)
            return;

          var color = colors.colorFromString(this.state.domain);
          color = "rgb("+color[0]+","+color[1]+","+color[2]+")";

          Api.setItem("palette_"+this.state.domain, color);
          if (this.isMounted()) this.setState({show: false, palette: color});
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      if (this.state.show != nextState.show)
        return true;

      if (this.state.palette != nextState.palette)
        return true;

      if (this.state.domain != nextState.domain)
        return true;

      return false;
    },

    render: function() {
        if (!this.state.domain){
            return React.createElement("div", {className: this.state.className+" default-favicon"}, React.createElement("span", null));
        }
        else if ((this.state.show)||(this.state.palette==null)) {
            return React.createElement("img", {className: this.state.className, src: network.favIcon(this.state.cleanDomain), onError: this.handleImgLoadError, alt: ""});
        }else{
            return React.createElement("div", {className: this.state.className+" default-favicon", style: {color:"white",backgroundColor:this.state.palette}}, React.createElement("span", null, (this.state.cleanDomain||"&").substr(0,1)));
        }
    }
});

},{"../../../modules/colors.js":105}],43:[function(require,module,exports){
module.exports = React.createClass({
	displayName: "Helpers/FileLimit",
	render: function() {
		var used = 0, size = 1, proLine = null;
		try{
			used = UserStore.getUser().files.used;
			size = UserStore.getUser().files.size;
		}catch(e){}

		if (!UserStore.isPro())
			proLine = (React.createElement("div", null, 
				"Whant more? ", React.createElement("a", {href: consts.proPage, target: "_blank"}, "Try PRO plan"), " with 1 GB of new uploads each month."
			));

		return (
			React.createElement("div", {className: "file-limit-widget", style: this.props.style}, 
				React.createElement("strong", null, strings.humanFileSize(used,true)), " of ", React.createElement("strong", null, strings.humanFileSize(size,true)), " in this month.", 
				proLine, 
				React.createElement("progress", {max: size, value: used})
			)
		);
	}
});

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
/** @jsx React.DOM */
var UserActions = require('../../../actions/User');

var onboardSVG = {};
onboardSVG.bookmarks = require('../../images/onboard/bookmarks.svg');
/*onboardSVG.clipper = require('../../images/onboard/clipper.svg');
onboardSVG.sharing = require('../../images/onboard/sharing.svg');
onboardSVG.start = require('../../images/onboard/start.svg');*/

module.exports = React.createClass({
  displayName: "Helpers/Onboard",

  componentDidMount: function() {
    this._renderImage();
  },

  componentDidUpdate: function() {
    this._renderImage();
  },

  _renderImage: function() {
    var _this = this;
    React.findDOMNode(_this.refs.svg).innerHTML = "";
    //Api.getText('images/onboard/'+this.props.scenario+'.svg', function(svg){
      React.findDOMNode(_this.refs.svg).innerHTML = onboardSVG[this.props.scenario];
    //});
  },

  handleSignIn: function(e) {
    e.preventDefault();

    UserActions.signIn(function() {
      location.hash="#/";
      location.reload();
    });
  },

  handleSignUp: function(e) {
    e.preventDefault();

    UserActions.signUp(function() {
      location.hash="#/";
      location.reload();
    });
  },

  render: function() {
    var content = null;
    var className = "onboard onboard-"+this.props.scenario;

    switch(this.props.scenario) {
      case "start":
        var welcomeText = "Welcome to your new home page! Now all your favorite sites and bookmarks here.";
        if (window.environment)
          welcomeText = React.createElement("div", null, t.s("welcome"), " Raindrop.io", React.createElement("div", {className: "external"}, t.s("appDesc")));

        content = (
          React.createElement("div", {className: "about about-blue"}, 
            React.createElement("div", {className: "icon"}, 
              React.createElement(Icon, {name: "tab", size: "big"})
            ), 

            React.createElement("div", {className: "text"}, 
              welcomeText
            )
          )
        );
      break;

      case "clipper":
        content = (
          React.createElement("div", {className: "about about-green"}, 
            React.createElement("div", {className: "icon"}, 
              React.createElement(Icon, {name: "storm", size: "big"})
            ), 

            React.createElement("div", {className: "text"}, 
              React.createElement("strong", null, "Web Clipper"), " — ", t.s("extensionDescription"), 

              React.createElement("div", {className: "external"}, 
                t.s("browserExtensionD")
              )
            )
          )
        );
      break;

      case "sharing":
        content = (
          React.createElement("div", {className: "about about-red"}, 
            React.createElement("div", {className: "icon"}, 
              React.createElement(Icon, {name: "group", size: "big"})
            ), 

            React.createElement("div", {className: "text"}, 
              "Share bookmarks and collaborate with friends and colleagues."
            )
          )
        );
      break;

      case "bookmarks":
        var actions = null;
        if ((this.props.params||{}).actions)
          actions = (
            React.createElement("footer", null, 
              React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSignIn}, t.s("signIn")), 
              React.createElement("a", {href: "", className: "action-icon sign-in", onClick: this.handleSignUp}, t.s("signUp"))
            )
          );

        content = (
          React.createElement("div", {className: "about"}, 
            React.createElement("div", {className: "icon"}, 
              React.createElement(Icon, {name: "bookmark-outline", size: "big"})
            ), 

            React.createElement("div", {className: "text"}, 
              t.s("welcomeSlide1D"), " ", t.s("welcomeSlide1DD"), 
              React.createElement("div", {className: "external"}, 
                React.createElement(Icon, {name: "external", size: "small"}), "  ", React.createElement("a", {href: network.fixURL("/welcome"), target: "_blank", className: "learn-more"}, t.s("howToUse"))
              ), 

              actions
            )
          )
        );
      break;
    }

    if (this.props.className)
      className += " " + this.props.className;

    return (
      React.createElement("div", {className: className}, 
        React.createElement("div", {className: "image"}, 
          React.createElement("div", {id: "image-svg", ref: "svg"})
        ), 

        content
      )
    );
  }
});

},{"../../../actions/User":14,"../../images/onboard/bookmarks.svg":91}],46:[function(require,module,exports){
/** @jsx React.DOM */
var ScrollFixMixin = require('./ScrollFixMixin.js');

module.exports = React.createClass({
  displayName: "Helpers/OverflowScroll",

  mixins: [ScrollFixMixin],

    getInitialState: function() {
        return {
            children: this.props.children
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState({children: nextProps.children});
    },


    render: function(){
        var wrapClassName = "overflow-scroll";
        if (this.props.className)
            wrapClassName+=" "+this.props.className;

        return React.createElement("div", {className: wrapClassName, style: this.props.style||null, onWheel: this.handleScroll, ref: "div"}, this.state.children);
    }
});

},{"./ScrollFixMixin.js":48}],47:[function(require,module,exports){
module.exports = React.createClass({
  displayName: "Helpers/RenderInBody",
  componentDidMount: function() {
    this.popup = document.createElement("div");
    document.body.appendChild(this.popup);
    document.body.classList.add(this.props.name+"-mode");
    document.body.classList.add(this.props.name+"-mode-"+this.props.category);
    this._renderLayer();
  },


  componentDidUpdate: function() {
    this._renderLayer();
  },


  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
    document.body.classList.remove(this.props.name+"-mode");
    document.body.classList.remove(this.props.name+"-mode-"+this.props.category);
  },


  _renderLayer: function() {
    React.render(this.props.children, this.popup);
  },
  
  render: function() {
    // Render a placeholder
    return React.createElement("div", null);
  }
});

},{}],48:[function(require,module,exports){
module.exports = {
	handleScroll: function(e, callback) {
		//firefox hack
        if ('MozAppearance' in document.documentElement.style){
            return;
        }
        else{
            var d, dir, stop, div = React.findDOMNode(this.refs.div);

            if (typeof window.getComputedStyle != "function")
                return;

            if (window.getComputedStyle(div,null) == null)
                return;

            if ((window.getComputedStyle(div,null).getPropertyValue('overflow-y') != "auto")&&
                (window.getComputedStyle(div,null).getPropertyValue('overflow-y') != "overlay")&&
                (window.getComputedStyle(div,null).getPropertyValue('overflow-y') != "scroll"))
                return;

            //if (div.style.overflow=="") return;
            d = e.nativeEvent.wheelDelta || -e.nativeEvent.detail;
            dir = (d > 0 ? "up" : "down");

            stop = (dir === "up" && div.scrollTop === 0) || (dir === "down" && div.scrollTop === div.scrollHeight - div.offsetHeight);

            if ((stop)&&(typeof callback == "function"))
                callback(true);
            
            stop && e.preventDefault();

            return;
        }
	}
}

},{}],49:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({
  displayName: "Helpers/Select",

    getInitialState: function() {
        return {
            items: this.props.items || [],
            selected: this.props.selected || -1,
            disabled: this.props.disabled || false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState({
            items: nextProps.items,
            selected: nextProps.selected,
            disabled: nextProps.disabled || false
        });
    },

    handleChange: function(e) {
        var selected = e.target.options[e.target.selectedIndex].value;
        if (this.isMounted()) this.setState({selected: selected});
        this.props.handleChange(selected, this.props);
    },

    render: function() {
        var _this = this;
        var items = null, title = this.props.placeholder || "";
        items = this.state.items.map(function(item,index){
            if ((item.key == _this.state.selected)&&(title==""))
                title = item.value;
            return React.createElement("option", {value: item.key, key: "select_option_"+item.key}, item.value)
        });

        var select = null, arrowIcon = null;
        if (!this.state.disabled) {
            select = React.createElement("select", {onChange: this.handleChange, defaultValue: _this.state.selected}, items);
            if (this.props.arrowIcon)
                arrowIcon = React.createElement(Icon, {name: "arrow-down", size: "small"});
        }

        return (
            React.createElement("label", {className: "mini-select"}, 
                React.createElement("span", {className: "child"}, this.props.children), 
                React.createElement("span", {className: "title"}, this.props.disableTitle ? null : React.createElement("span", {className: "title-text"}, title), " ", arrowIcon), 
                select
            )
        );
    }
});

},{}],50:[function(require,module,exports){
module.exports = {
  handleSelectFilter: function(options, filter, currentValues) {
    var exclude = currentValues.map(function(i) {
      return i;
    });

    var filterOption = function(op) {
      if (exclude.indexOf(op.value) > -1) return false;
      return (op.value.indexOf(filter)!=-1);
    };
    var clean = (options || []).filter(filterOption, this);
    if (filter.trim()!="")
      clean.unshift({value: filter, label: filter});

    return clean;
  },

  handleSelectFocus: function() {
    document.body.classList.add('selectize-overflow-visible');
  },

  handleSelectBlur: function() {
    setTimeout(function(){
      document.body.classList.remove('selectize-overflow-visible');
    },50)
    
  }
};

},{}],51:[function(require,module,exports){
/** @jsx React.DOM */
var BookmarksStore = require('../../../stores/Bookmarks');
var CollectionsStore = require('../../../stores/Collections');
var ChildrensStore = require('../../../stores/Childrens');
var ParentsStore = require('../../../stores/Parents');
var UserActions = require('../../../actions/User');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var StatsStore = require('../../../stores/Stats');

var _configPrefix = "web_tip_";

var handleClipperClick = function(e) {
  if ((window.environment||[]).indexOf("clipper")!=-1)
  {
    e.preventDefault();
    e.stopPropagation();
    BrowserBridge.openURL(e.target.href);
  }
}

var _scenarios = [];
var os = "Win";
if (strings.getCurrentBrowser().indexOf("MacOS")!=-1)
  os = "Mac";

var initScenarios = function() {
  _scenarios = [
    {
      name: "need_login",
      color: "light",
      title: t.s("welcome") + " Raindrop.io" /*t.s("welcomeSlide1D") + " " + t.s("welcomeSlide1DD")*/,
      text: React.createElement("div", null, t.s("welcomeSlide1D") + " " + t.s("welcomeSlide1DD")),
      actions: function(component) {
        return (
          React.createElement("div", null, 
            /*<a href={network.fixURL("/welcome")} className="action-icon not-main">{t.s("howToUse")}</a>*/
            React.createElement("a", {href: "", className: "action-icon not-main", onClick: component.handleSignIn}, t.s("signIn")), 
            React.createElement("a", {href: "", className: "action-icon", onClick: component.handleSignUp}, t.s("signUp"))
          )
        )
      },
      check: function(scope, component) {
        if ((!UserStore.isLoading())&&(!UserStore.isLogged())){
          if (typeof document != "undefined")
            document.body.classList.add("authfalse");
          return true;
        }else{
          if (typeof document != "undefined")
            document.body.classList.remove("authfalse");
        }

        return false;
      }
    },
    
    {
      name: "no_bookmarks",
      color: "light",
      title: t.s("collectionEmpty"),
      text: null,//Click to <b>plus</b> or <a href={network.settingsURL()+"/import"} target="_blank"  onClick={handleClipperClick}>import your exists bookmarks</a>. <span className="clipper-hide">You can also use our <a href={network.settingsURL()+"/install"} target="_blank">Web Clipper</a>.</span>
      actions: function(component) {
        if ((window.environment||[]).indexOf("clipper")!=-1)
          return null;

        return (React.createElement("div", null, 
          React.createElement("a", {href: "", className: "action-icon", id: "tip-handleAddBookmark", onClick: component.handleAddBookmark}, t.s("add"))
        ));
      },
      check: function(scope, component) {
        if (scope!="bookmarks")
          return false;

        var isSearch = false;

        if ((CollectionsStore.getCurrentId()<-2)/*||
            (CollectionsStore.getCurrentId()==0)*/)
          isSearch = true;

        try{if (component.context.router.getCurrentParams().search)
          isSearch = true;}catch(e){}

        if (isSearch)
          return false;

        if ((!BookmarksStore.getIsLoading())&&(!ChildrensStore.getIsLoading()))
          if ((BookmarksStore.getCount()==0)&&(ChildrensStore.getCount()==0)&&(BookmarksStore.getIsNoMore()))
            return true;

        return false;
      }
    },

    /*{
      name: "go_to_pro",
      color: "light",
      title: t.s("footerProAd")+" "+t.s("footerProAdD"),
      text: <div>{t.s("pro_nesting")}, {t.s("pro_dropbox").toLowerCase()}, {t.s("pro_support").toLowerCase()} {t.s("und").toLowerCase()} {t.s("more").toLowerCase()}...</div>,
      actions: function(component) {
        var _target = "_self";
        if ((window.environment||[]).indexOf("clipper")!=-1){
            _target = "_blank";
        }

        if ((window.environment||[]).indexOf("mac")==-1)
          return (<div>
            <a href={network.settingsURL()+"/pro"} target={_target} className="action-icon" onClick={handleClipperClick}>{t.s("goToPRO")}</a>
          </div>);
        else
          return null;
      },
      check: function(scope) {
        if (
          (StatsStore.getAllCount()>15)
          &&(!UserStore.isPro())
          &&((_scenarios[1].showed||0)<=3)
          &&(parseInt(Api.getItem("openCount")||0)%10 == 0)
        ){
          return true;
        }

        return false;
      }
    },*/

    {
      name: "not_found",
      color: "light",
      title: t.s("nothingFound"),
      text: null,
      actions: function(component) {
        return null;
      },
      check: function(scope, component) {
        if (scope!="bookmarks")
          return false;

        var isSearch = false;
        if (CollectionsStore.getCurrentId()==0)
          isSearch = true;

        try{if (component.context.router.getCurrentParams().search) isSearch = true;}catch(e){}

        if (!isSearch)
          return false;

        if (!BookmarksStore.getIsLoading())
          if ((BookmarksStore.getCount()==0)&&(BookmarksStore.getIsNoMore()))
            return true;

        return false;
      },
    },

    {
      name: "hotkey",
      title: t.s("helpHotKey") + (strings.getCurrentBrowser().indexOf("opera")==-1 ? " ("+(os == "Mac" ? "Command" : "Ctrl")+"+E)" : ""),
      text: React.createElement("div", null, "Bind it on extensions settings. Also you can save page or image from context menu."),
      closable: true,
      actions: function(component) {
        var link = "chrome://extensions/configureCommands";
        if (strings.getCurrentBrowser().indexOf("opera")!=-1)
          link = "chrome://settings/configureCommands";
        return React.createElement("div", null, React.createElement("a", {href: link, className: "action-icon", onClick: component.handleChromeHotKeys}, t.s("settings")))
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (((window.environment||[]).indexOf("clipper")!=-1)&&(strings.getCurrentBrowser().indexOf("chrome")!=-1))
            return true;

        return false;
      }
    },

    {
      name: "change_view",
      title: "Change collection icon and view",
      text: React.createElement("div", null, "Make collection beautiful — change icon and choose the right view (grid, list, magazine or simple)"),
      closable: true,
      actions: function(component) {
        return React.createElement("div", null, React.createElement("a", {href: "", className: "action-icon", onClick: component.handleIconCollection}, t.s("changeIcon")))
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (CollectionsStore.getCurrentId()<=0)
          return false;

        if (!BookmarksStore.getIsLoading())
          if (BookmarksStore.getCount()>=3)
            return true;

        return false;
      }
    },

    {
      name: "collaborate",
      title: "Share collection and collaborate",
      text: React.createElement("div", null, "Share URL or invite more members and edit collection together."),
      closable: true,
      actions: function(component) {
        return React.createElement("div", null, React.createElement("a", {href: "", className: "action-icon", onClick: component.handleSharingCollection}, t.s("sharing")))
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (CollectionsStore.getCurrentId()<=0)
          return false;

        if (!BookmarksStore.getIsLoading())
          if (BookmarksStore.getCount()>=5)
            return true;

        return false;
      }
    },

    {
      name: "nested_collection",
      //color: "green",
      title: t.s("createSubFolder"),
      text: React.createElement("div", null, "You have many bookmarks. Maybe you need create nested collections?"),
      closable: true,
      actions: function(component) {
        return React.createElement("div", null, React.createElement("a", {href: "", className: "action-icon", id: "tip-handleAddFolder", onClick: component.handleAddFolder}, t.s("create")))
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (CollectionsStore.getCurrentId()<=0)
          return false;

        if (!BookmarksStore.getIsLoading())
          if (BookmarksStore.getCount()>=10)
            return true;

        return false;
      }
    },

    {
      name: "batch_edit",
      title: "Batch edit",
      text: React.createElement("div", null, "Check some bookmarks for actions (You can use Shift or Command/Ctrl key with click for selection)."),
      closable: true,
      actions: function() {
        return null;
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (!BookmarksStore.getIsLoading())
          if (BookmarksStore.getCount()>=10)
            return true;

        return false;
      }
    },

    {
      name: "create_collection",
      color: "blue",
      title: t.s("createFirstCollection"),
      text: React.createElement("div", null, "Create collection for each of your interest."),
      actions: function(component) {
        return React.createElement("div", null, React.createElement("a", {href: "", className: "action-icon", id: "tip-handleAddFolder", onClick: component.handleAddFolder}, t.s("create")))
      },
      check: function(scope, component) {
        if (scope!="collections")
          return false;

        if (!(component.props.params||{}).collectionsCount)
          return true;

        return false;
      }
    },

    {
      name: "trash_empty",
      color: "light",
      title: t.s("trashEmpty"),
      text: null,
      actions: function(component) {
        return null;
      },
      check: function(scope) {
        if (scope!="bookmarks")
          return false;

        if (CollectionsStore.getCurrentId()!=-99)
          return false;

        if (!BookmarksStore.getIsLoading())
          if ((BookmarksStore.getCount()==0)&&(BookmarksStore.getIsNoMore()))
            return true;

        return false;
      },
    }
  ]
}

/*if (document)
    window.addEventListener("load", initScenarios);*/

module.exports = React.createClass({
  displayName: "Helpers/Tips",

  mixins: [PureRenderMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      scenario: "",
      force: false
    }
  },

  onStoresChanged: function() {
    var s = "";

    if (!UserStore.isLoading()){
      if (this.props.force){
        var index = _.findIndex(_scenarios, {name: this.props.force});
        if (index!=-1)
          s = _scenarios[index].name;
      }
      else
        for(var i in _scenarios){
          if ((_scenarios[i].check(this.props.scope,this))&&(! ((UserStore.getUser()||{}).config||{}) [_configPrefix+_scenarios[i].name])) {
            s = _scenarios[i].name;
            break;
          }
        }
    }

    if (this.isMounted()) this.setState({scenario: s});
  },

  componentDidMount: function() {
    this.onStoresChanged();

    this.unsubscribeBookmarks = BookmarksStore.listen(this.onStoresChanged);
    this.unsubscribeCollections = CollectionsStore.listen(this.onStoresChanged);
    this.unsubscribeChildrens = ChildrensStore.listen(this.onStoresChanged);
    this.unsubscribeParents = ParentsStore.listen(this.onStoresChanged);
    this.unsubscribeUser = UserStore.listen(this.onStoresChanged);
  },

  componentWillUnmount: function() {
    this.unsubscribeBookmarks();
    this.unsubscribeCollections();
    this.unsubscribeChildrens();
    this.unsubscribeParents();
    this.unsubscribeUser();
  },

  /*shouldComponentUpdate: function(nextProps, nextState) {
    if (this.state.scenario != nextState.scenario)
      return true;

    if (this.props.force != (nextProps.force||false))
      return true;

    return false;
  },*/

  handleEditCollection: function(e) {
    e.preventDefault();

    Pop.show("collection", {
      id: CollectionsStore.getCurrentId()
    });
  },

  handleSharingCollection: function(e) {
    e.preventDefault();

    Pop.show("collection", {
      id: CollectionsStore.getCurrentId(),
      step: "sharing"
    });
  },

  handleIconCollection: function(e) {
    e.preventDefault();

    Pop.show("collection", {
      id: CollectionsStore.getCurrentId(),
      step: "icon"
    });
  },

  handleAddFolder: function(e) {
    e.preventDefault();

    Pop.show("collection", {
      parentId: CollectionsStore.getCurrentId(),
      pin: "tip-handleAddFolder"
    });
  },

  handleAddBookmark: function(e) {
    e.preventDefault();
    Pop.show("URL", {
      parentId: CollectionsStore.getCurrentId(),
      pin: "fabAppButton"
    });
  },

  handleCloseTip: function(e) {
    e.preventDefault();
    if (e.target){
      var index = parseInt(e.target.getAttribute("data-index"));

      UserStore.saveConfig({notify: true, name: _configPrefix+_scenarios[index].name});
    }
  },

  handleSignIn: function(e) {
    e.preventDefault();

    UserActions.signIn(function() {
      location.hash="#/";
      location.reload();
    });
  },

  handleSignUp: function(e) {
    e.preventDefault();

    UserActions.signUp(function() {
      location.hash="#/";
      location.reload();
    });
  },

  handleChromeHotKeys: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (strings.getCurrentBrowser().indexOf("opera")==-1)
      BrowserBridge.openURL("chrome://extensions/configureCommands");
  },

  render: function() {
    if (_scenarios.length==0)
      initScenarios();

    var scenario = null, index = _.findIndex(_scenarios, {name: this.state.scenario});
    if (index!=-1)
      scenario = (_scenarios||[])[index]||null;

    if (scenario!=null){
      var close = null;
      if (scenario.closable)
        close = React.createElement("div", {className: "close"}, React.createElement("a", {href: "", "data-index": index, onClick: this.handleCloseTip}, React.createElement(Icon, {name: "clear"}), " ", React.createElement("span", {className: "close-text"}, "OK")));

      _scenarios[index].showed = _scenarios[index].showed || 0;
      _scenarios[index].showed++;
      return (
        React.createElement("div", {className: "tips", "data-current-tip": scenario.name}, 
          React.createElement("div", {className: "tip tip-color-"+(scenario.color||"light"), id: "tip-"+scenario.name}, 
            React.createElement("div", {className: "content"}, 
              React.createElement("div", {className: "icon"}, 
                React.createElement("img", {src: (window.pathPrefix||"") + "images/tips/"+scenario.name+".svg", alt: ""})
              ), 

              React.createElement("div", {className: "text"}, 
                React.createElement("h3", null, scenario.title), 
                React.createElement("div", {className: "info"}, scenario.text)
              ), 

              React.createElement("div", {className: "actions"}, 
                scenario.actions(this)
              ), 

              close
            )
          )
        )
      );
    }
    else
      return null;
  }
});

},{"../../../actions/User":14,"../../../stores/Bookmarks":113,"../../../stores/Childrens":114,"../../../stores/Collections":115,"../../../stores/Parents":118,"../../../stores/Stats":122,"react/addons":"react/addons"}],52:[function(require,module,exports){
/** @jsx React.DOM */
var ModalFrameStore = require('../../stores/ModalFrame');
var FrameModal = require("./Modals/Frame");

module.exports = React.createClass({
    displayName: "ModalFrame",

    getInitialState: function() {
        return {
            show: false
        }
    },

    onModalFrameChange: function(params) {
        if (!params.url)
            params={show:false};

        this.setState(params);
    },

    componentDidMount: function() {
        this.unsubscribeModalFrame = ModalFrameStore.listen(this.onModalFrameChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeModalFrame();
    },

    handleFrameClose: function() {
        this.setState({show: false});
    },

    render: function() {
        var _this = this;

        return (
            React.createElement("div", null, 
                React.createElement(Modal, {isOpened: this.state.show, onClose: this.handleFrameClose, params: this.state}, 
                    React.createElement(FrameModal, null)
                )
            )
        );
    }
});

},{"../../stores/ModalFrame":117,"./Modals/Frame":58}],53:[function(require,module,exports){
/** @jsx React.DOM */
var BookmarkActions = require('../../../actions/Bookmarks');
var TagsActions = require('../../../actions/Tags'),
    TagsStore = require('../../../stores/Tags');

var Selectize = require('react-select');
var SelectMixin = require("../Helpers/SelectMixin");

module.exports = React.createClass({
  displayName: "Modals/BookmarksAddTags",

  mixins: [SelectMixin, require("./ModalMixin")],

  getInitialState: function() {
    return {
      tags: [],
      addTags: [],
      loading: false
    };
  },

  onTagsChange: function(tags) {
      var clean = tags.map(function(tag){
        return {value: tag._id, label: tag._id};
      });
      this.setState({
          tags: clean
      });
  },

  componentWillMount: function() {
    TagsActions.load();
  },

  componentDidMount: function() {
      this.unsubscribeTags = TagsStore.listen(this.onTagsChange);
  },

  componentWillUnmount: function() {
      this.unsubscribeTags();
  },

  handleTagsChange: function(value) {
    var temp = value.split(",");
    if (temp[0]=="")
      temp = [];
    this.setState({addTags: temp});
  },

  handleClose: function(e) {
    if (e)
      e.preventDefault();
    if (!this.state.loading)
      this.props.closePortal();
  },

  handleSave: function(e) {
    var _this = this;
    e.preventDefault();

    this.setState({loading: true});
    BookmarkActions.updateSelectedBookmarks({
      item: {
        tags: this.state.addTags
      },
      silent: true,
      append: ["tags"]
    }, function(result){
      if (result)
        Toasts.show({text: t.s("saveSuccess")});
      else
        Toasts.show({text: t.s("error"), status: "error"});

      _this.props.closePortal();
    });
  },

  render: function() {
    var loadingBlock = null;
    if (this.state.loading)
        loadingBlock = React.createElement("div", {className: "absoluteLoading"}, React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)));

    return (
        React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("header", null, 
                React.createElement("div", {className: "actionBar"}, 
                    React.createElement("div", {className: "actions"}, 
                        React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                    ), 
                    React.createElement("h3", null, t.s("addTags"))
                )
            ), 

            React.createElement("article", null, 
              React.createElement("form", {onSubmit: this.handleSave, style: {position:"relative"}}, 
                  React.createElement("div", {style: {visibility: (this.state.loading?"hidden":null)}}, 
                      React.createElement("div", {className: "form-editor"}, 
                          React.createElement("div", {className: "oneline"}, 
                              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "tags"})), 
                              React.createElement("div", {className: "area"}, 
                                  React.createElement("label", null, t.s("tags")), 
                                  React.createElement(Selectize, {
                                      name: "tags", 
                                      value: this.state.addTags, 
                                      options: this.state.tags, 
                                      multi: true, 
                                      placeholder: t.s("addTags")+"...", 
                                      onChange: this.handleTagsChange, 
                                      filterOptions: this.handleSelectFilter}
                                  )
                              )
                          )
                      ), 

                      React.createElement("footer", null, 
                          React.createElement("div", {className: "actions"}, 
                              React.createElement("input", {type: "submit", className: "action-icon active", value: t.s("save")})
                          )
                      )
                  ), 

                  loadingBlock
              )
            )
        )
    );
  }
});

},{"../../../actions/Bookmarks":2,"../../../actions/Tags":12,"../../../stores/Tags":123,"../Helpers/SelectMixin":50,"./ModalMixin":60,"react-select":"react-select"}],54:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsList = require("../Forms/CollectionsList");
var OverflowScroll = require("../Helpers/OverflowScroll");
var BookmarkActions = require('../../../actions/Bookmarks');
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
  mixins: [require("./ModalMixin")],
  
  displayName: "Modals/BookmarksCopy",

  getInitialState: function() {
    return {
      loading: false
    };
  },

  handleClose: function(e) {
    if (e)
      e.preventDefault();
    if (!this.state.loading)
      this.props.closePortal();
  },

  handleChangeCollection: function(collection) {
    var _this = this;
    this.setState({loading:true});

    BookmarkActions.copySelectedBookmarks({
      collectionId: collection._id
    }, function(result){
      if (result)
        Toasts.show({text: t.s("success")});
      else
        Toasts.show({text: t.s("error"), status: "error"});

      _this.props.closePortal();
    });
  },

  render: function() {
    var content = null, wrapClassName = "noMargin";

    if (this.state.loading){
      wrapClassName += " centered-content";
      content = (React.createElement("div", null, 
        React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null))
      ));
    }else{
      content = React.createElement(CollectionsList, {
        onSelectCollection: this.handleChangeCollection});
    }

    return (
        React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("header", null, 
                React.createElement("div", {className: "actionBar"}, 
                    React.createElement("div", {className: "actions"}, 
                        React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                    ), 
                    React.createElement("h3", null, t.s("selectCollection"))
                )
            ), 

            React.createElement("article", null, 
              React.createElement(OverflowScroll, {className: wrapClassName, style: {height: "400px"}}, 
                content
              )
            )
        )
    );
  }
});

},{"../../../actions/Bookmarks":2,"../../../stores/Collections":115,"../Forms/CollectionsList":36,"../Helpers/OverflowScroll":46,"./ModalMixin":60}],55:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsList = require("../Forms/CollectionsList");
var OverflowScroll = require("../Helpers/OverflowScroll");
var BookmarkActions = require('../../../actions/Bookmarks');
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
  mixins: [require("./ModalMixin")],
  
  displayName: "Modals/BookmarksMove",

  getInitialState: function() {
    return {
      loading: false
    };
  },

  handleClose: function(e) {
    if (e)
      e.preventDefault();
    if (!this.state.loading)
      this.props.closePortal();
  },

  handleChangeCollection: function(collection) {
    var _this = this;
    this.setState({loading:true});

    BookmarkActions.updateSelectedBookmarks({
      item: {
        collectionId: collection._id,
        collection: {"$id": collection._id},
      },
      showingCollectionId: parseInt(CollectionsStore.getCurrentId()),
      silent: true
    }, function(result){
      if (result)
        Toasts.show({text: t.s("moveSuccess")});
      else
        Toasts.show({text: t.s("moveError"), status: "error"});

      _this.props.closePortal();
    });
  },

  render: function() {
    var content = null, wrapClassName = "noMargin";

    if (this.state.loading){
      wrapClassName += " centered-content";
      content = (React.createElement("div", null, 
        React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null))
      ));
    }else{
      content = React.createElement(CollectionsList, {
        onSelectCollection: this.handleChangeCollection});
    }

    return (
        React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("header", null, 
                React.createElement("div", {className: "actionBar"}, 
                    React.createElement("div", {className: "actions"}, 
                        React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                    ), 
                    React.createElement("h3", null, t.s("moveSelectedBookmarks"))
                )
            ), 

            React.createElement("article", null, 
              React.createElement(OverflowScroll, {className: wrapClassName, style: {height: "400px"}}, 
                content
              )
            )
        )
    );
  }
});

},{"../../../actions/Bookmarks":2,"../../../stores/Collections":115,"../Forms/CollectionsList":36,"../Helpers/OverflowScroll":46,"./ModalMixin":60}],56:[function(require,module,exports){
/** @jsx React.DOM */
var OverflowScroll = require("../Helpers/OverflowScroll");
var BookmarkActions = require('../../../actions/Bookmarks');

module.exports = React.createClass({
  displayName: "Modals/BookmarksRemove",

  handleClose: function(e) {
    if (e)
      e.preventDefault();
    if (!this.state.loading)
      this.props.closePortal();
  },

  componentDidMount: function() {
    var _this = this;

    BookmarkActions.removeSelectedBookmarks({
      silent: true
    },
    function(result, perm){
      if (result)
        Toasts.show({text: t.s("bookmarksRemoved"+perm)});
      else
        Toasts.show({text: t.s("error"), status: "error"});

      _this.props.closePortal();
    });
  },

  render: function() {
    return (
        React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("header", null, 
                React.createElement("div", {className: "actionBar"}, 
                    React.createElement("h3", null, t.s("remove"))
                )
            ), 

            React.createElement("article", null, 
              React.createElement(OverflowScroll, {className: "noMargin centered-content", style: {height: "400px"}}, 
                  React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null))
              )
            )
        )
    );
  }
});

},{"../../../actions/Bookmarks":2,"../Helpers/OverflowScroll":46}],57:[function(require,module,exports){
var _styles = ["grid","list","masonry","simple"];

module.exports = React.createClass({
    mixins: [require("./ModalMixin")],

    displayName: "Modals/CollectionView",

    getInitialState: function() {
        return {
            view: this.props.view
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            view: nextProps.view
        });
    },

    handleClose: function(e) {
        if (e)
            e.preventDefault();
        this.props.closePortal();
    },

    handleChangeView: function(e) {
        e.preventDefault();
        var view = e.target.getAttribute("data-view");
        this.setState({view: view});
        this.props.onChangeView(view);
        this.props.closePortal();
    },

    handleCover: function() {
        UserStore.saveConfig({notify: true, name: "view_cover_disable", remove: UserStore.getConfig("view_cover_disable")});
        this.setState({view: this.state.view});
    },

    handleInvertPosition: function() {
        UserStore.saveConfig({notify: true, name: "view_cover_invert_position", remove: UserStore.getConfig("view_cover_invert_position")});
        this.setState({view: this.state.view});
    },

    handleRefresh: function() {
        window.location.reload();
    },

    render: function() {
        var _this = this;

        var styles = _styles.map(function(item,index){
            return React.createElement("a", {href: "", key: "style_"+item, className: item==_this.state.view ? "active" : "", "data-view": item, onClick: _this.handleChangeView}, React.createElement("img", {src: (window.pathPrefix||"") + "images/views/" + item + ".svg", style: {width:"80px",height:"80px"}}))
        });

        /*
        <div className="oneline" style={{margin:"0"}}>
                            <div className="icon"><Icon name="select-all" /></div>
                            <div className="area">
                                <div className="checkbox-wrap" onClick={this.handleCover}>
                                    <div>Make default for all collections</div>
                                    <div className={"extra-checkbox"+(UserStore.getConfig("default_view")==this.state.view?" active":"")}></div>
                                </div>
                            </div>
                        </div>
        */

        return (
            React.createElement("div", {className: "modal-dialog"}, React.createElement("div", {className: "modal-dialog-wrap"}, 
                React.createElement("header", null, 
                    React.createElement("div", {className: "actionBar"}, 
                        React.createElement("div", {className: "actions"}, 
                            React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                        ), 
                        React.createElement("h3", null, t.s("view"))
                    )
                ), 

                React.createElement("article", null, 
                    React.createElement("div", {className: "img-selector"}, 
                        styles
                    )

                    /*<br />
                    <div className="form-editor">
                        <div className="section">
                            {t.s("settings")}
                        </div>
                        

                        <div className="oneline" style={{margin:"0"}}>
                            <div className="icon"><Icon name="visual" /></div>
                            <div className="area">
                                <div className="checkbox-wrap" onClick={this.handleCover}>
                                    <div>{t.s("cover")}</div>
                                    <div className={"extra-checkbox"+(!UserStore.getConfig("view_cover_disable")?" active":"")}></div>
                                </div>
                            </div>
                        </div>

                        <div className={"oneline "+(this.state.view=="list"?"":"hidden")} style={{margin:"0"}}>
                            <div className="icon"><Icon name="forward" /></div>
                            <div className="area">
                                <div className="checkbox-wrap" onClick={this.handleInvertPosition}>
                                    <div>Align cover to right corner</div>
                                    <div className={"extra-checkbox"+(UserStore.getConfig("view_cover_invert_position")?" active":"")}></div>
                                </div>
                            </div>
                        </div>
                    </div>*/
                )


                    /*<div style={{padding:"0px 16px",opacity:0.5,textAlign:"right",marginBottom:"16px"}}>
                        * Refresh page for apply changes
                    </div>*/

            ))
        );
    }
});

},{"./ModalMixin":60}],58:[function(require,module,exports){
/** @jsx React.DOM */
module.exports = React.createClass({
  mixins: [require("./ModalMixin")],
  
  displayName: "Modals/Frame",

  handleClose: function(e) {
      if (e)
          e.preventDefault();
      if (typeof this.props.onClose == "function")
        this.props.onClose();
      this.props.closePortal();
  },

  render: function() {
    return (
      React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("header", null, 
            React.createElement("div", {className: "actionBar"}, 
                React.createElement("div", {className: "actions"}, 
                    React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                ), 
                React.createElement("h3", null, this.props.title)
            )
        ), 

        React.createElement("iframe", {src: this.props.url, width: this.props.width, height: this.props.height, frameBorder: "0"})
      )
    );
  }
});

},{"./ModalMixin":60}],59:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var findDOMNode = _react.findDOMNode;

var shallowEqual = _interopRequire(require("react/lib/shallowEqual"));

var Key = _interopRequire(require("keymaster"));

var materialCircleAnim = "";

var Portal = (function (_React$Component) {
    function Portal() {
        _classCallCheck(this, Portal);

        _get(Object.getPrototypeOf(Portal.prototype), "constructor", this).call(this);
        this.state = { active: false };
        this.openPortal = this.openPortal.bind(this);
        this.closePortal = this.closePortal.bind(this);
        this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
        this.portal = null;
        this.node = null;
    }

    _inherits(Portal, _React$Component);

    _createClass(Portal, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this = this;

                if (this.props.closeOnEsc) {
                    Key("esc", function () {
                        _this.closePortal();
                    });
                }

                if (this.props.closeOnOutsideClick) {
                    document.addEventListener("mousedown", this.handleOutsideMouseClick);
                }
            }
        },
        componentWillMount: {
            value: function componentWillMount() {
                if (this.props.isOpened) {
                    this.openPortal();
                }
            }
        },
        componentWillReceiveProps: {
            value: function componentWillReceiveProps(newProps) {
                this.props = newProps;
                if (newProps.isOpened === undefined) {
                    if (!this.state.active) {
                        return;
                    }this.renderPortal(newProps);
                } else {
                    if (newProps.isOpened) {
                        if ((this.state.active)&&(!newProps.forceUpdated)) {
                            return;
                        }this.openPortal();
                    } else {
                        if (!this.state.active) {
                            return;
                        }this.closePortal();
                    }
                }
            }
        },
        componentWillUnmount: {
            value: function componentWillUnmount() {
                if (this.props.closeOnEsc) {
                    Key.unbind("esc");
                }

                if (this.props.closeOnOutsideClick) {
                    document.removeEventListener("mousedown", this.handleOutsideMouseClick);
                }

                this.closePortal();
            }
        },
        shouldComponentUpdate: {
            value: function shouldComponentUpdate(nextProps, nextState) {
                return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
            }
        },
        renderPortal: {
            value: function renderPortal(props, alreadyOpened) {
                if (!this.node) {
                    this.node = document.createElement("div");
                    if (props.pinTo) props.position = "none";
                    this.node.className = "overlay overlay-"+(props.position||"");
                    document.body.appendChild(this.node);
                }

                var params = props.params || {};
                params.closePortal = this.closePortal;

                var animElem = document.getElementById("modal-anim-style");
                if (animElem) document.body.removeChild(animElem);

                //if ((window.environment||[]).indexOf("clipper")!=-1)
                    alreadyOpened = true;

                this.portal = React.render(React.cloneElement(props.children, params), this.node, function(){
                    if ((props.pinTo)&&((window.environment||[]).indexOf("clipper")==-1)) {
                        var div = document.getElementById(props.pinTo);
                        var rect = div.getBoundingClientRect();
                        var modalDiv = document.getElementsByClassName("modal-dialog")[0];
                        var modalSize = {
                            w: modalDiv.offsetWidth, h: modalDiv.offsetHeight
                        }
                        var newPos = {
                            left: (rect.left||0), top: (rect.top||0)
                        }
                        if (newPos.left+modalSize.w > window.innerWidth)
                            newPos.left = (window.innerWidth-modalSize.w)-20;

                        if (newPos.left<0)
                            newPos.left = 20;

                        if (newPos.top+modalSize.h > window.innerHeight)
                            newPos.top = (window.innerHeight-modalSize.h)-20;

                        if (newPos.top<0)
                            newPos.top = 20;

                        modalDiv.style.left = newPos.left+"px";
                        modalDiv.style.top = newPos.top+"px";
                    }

                    if (!alreadyOpened){
                        //anim
                        var d={x: 0, y: 0, w: 430, h: 430, offsetX: 0, offsetY: 0};
                        window.mousePos = window.mousePos || {x: parseInt(window.innerWidth/2), y: parseInt(window.innerHeight/2)};

                        try{
                            d.w = document.getElementsByClassName("modal-dialog")[0].offsetWidth;
                            d.h = document.getElementsByClassName("modal-dialog")[0].offsetHeight;
                        }catch(e){}

                        switch(props.position){
                            case "left-top":
                                mousePos.x += consts.modalMargin;
                                d.x = consts.modalMargin;
                                d.y = consts.modalMargin;
                                break;
                            case "right-top":
                                mousePos.x += consts.modalMargin;
                                d.x = window.innerWidth - d.w;
                                d.y = consts.modalMargin;
                                break;
                            case "right-bottom":
                                mousePos.x += consts.modalMargin; mousePos.y += consts.modalMargin;
                                d.x = window.innerWidth - d.w;
                                d.y = window.innerHeight - d.h;
                                break;
                            default:
                                //center
                                d.x = parseInt((window.innerWidth - d.w)/2);
                                d.y = parseInt((window.innerHeight - d.h)/2);
                                break;
                        }

                        d.offsetX = mousePos.x - d.x;
                        if (mousePos.x < d.x) {
                            d.x = 0;
                        }
                        else {
                            d.x = parseInt((100 / d.w) * (mousePos.x - d.x));
                            d.offsetX = d.offsetX - d.w;
                        }

                        d.offsetY = mousePos.y - d.y;
                        if (mousePos.y < d.y) {
                            d.y = 0;
                        }
                        else {
                            d.y = parseInt((100 / d.h) * (mousePos.y - d.y));
                            d.offsetY = d.offsetY - d.h;
                        }

                        d.x = (d.x>100 ? 100 : d.x) + "%";
                        d.y = (d.y>100 ? 100 : d.y) + "%";
                        d.start = "clip-path: circle(0px at "+d.x+" "+d.y+"); ";
                        d.start1 = "shape-inside: circle(0px at "+d.x+" "+d.y+"); ";
                        d.start2 = "";

                        var transform = "";
                        /*if ((d.x=="0%")||(d.x=="100%"))
                            transform += "translateX("+d.offsetX+"px) ";
                        if ((d.y=="0%")||(d.y=="100%"))
                            transform += "translateY("+d.offsetY+"px); ";*/
                        if (transform!="")
                            d.start2 += "transform: "+transform;

                        d.end = "clip-path: circle("+(d.w>d.h?d.w:d.h)+"px at 50% 50%); ";
                        d.end1 = "shape-inside: circle("+(d.w>d.h?d.w:d.h)+"px at 50% 50%); ";
                        //d.end2 = "transform: translateX(0) translateY(0); ";

                        animElem = document.createElement("style");
                        animElem.id = "modal-anim-style";

                        var aStates=["Show","Close"], aPrefixes=["-webkit-","-moz-","-o-"], style="";
                        aStates.forEach(function(state){
                            aPrefixes.forEach(function(pref){
                                var p1 = 0, p2=100;
                                if (state=="Close") {
                                    p1 = 100;
                                    p2 = 0;
                                }
                                style+="/* "+state+" "+pref+" */ @"+pref+"keyframes modal"+state+" {"+p1+"% {"+pref+d.start+pref+d.start1+pref+d.start2+"} "+p2+"% {"+pref+d.end+pref+d.end1+pref+d.end2+"}}  ";
                            });
                        })
                        animElem.innerText = style;
                        document.body.appendChild(animElem);
                    }
                });
            }
        },
        render: {
            value: function render() {
                if (this.props.openByClickOn) {
                    return React.createElement(
                        "div",
                        { onClick: this.openPortal, className: "openByClickOn" },
                        this.props.openByClickOn
                    );
                } else {
                    return null;
                }
            }
        },
        openPortal: {
            value: function openPortal(e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                var alreadyOpened = this.state.active;
                this.setState({ active: true });
                this.renderPortal(this.props, alreadyOpened);

                try{
                    if (document.body.scrollHeight>window.innerHeight){
                        var elem = document.querySelector("#app-background");
                        if (elem) document.body.style.paddingRight = (window.innerWidth - elem.offsetWidth)+"px";
                    }
                }catch(e){}
                document.body.classList.add("modal-mode");
            }
        },
        closePortal: {
            value: function closePortal() {
                var _this = this;
                setTimeout(function() {
                    if (_this.node) {
                        React.unmountComponentAtNode(_this.node);
                        document.body.removeChild(_this.node);
                    }
                    _this.portal = null;
                    _this.node = null;
                    _this.setState({active: false});

                    document.body.classList.remove("modal-now-closing");

                    if (typeof _this.props.onClose != 'undefined') 
                        _this.props.onClose();
                },190);

                if (_this.node){
                    document.body.style.paddingRight=0;
                    document.body.classList.remove("modal-mode");
                    document.body.classList.add("modal-now-closing");
                }
            }
        },
        handleOutsideMouseClick: {
            value: function handleOutsideMouseClick(e) {
                if (!this.state.active) {
                    return;
                }
                if (isNodeInRoot(e.target, findDOMNode(this.portal))) {
                    return;
                }
                e.stopPropagation();
                this.closePortal();
            }
        }
    });

    return Portal;
})(React.Component);

module.exports = Portal;

Portal.propTypes = {
    children: React.PropTypes.element.isRequired,
    openByClickOn: React.PropTypes.element,
    closeOnEsc: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    isOpened: React.PropTypes.bool
};

function isNodeInRoot(node, root) {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

},{"keymaster":"keymaster","react":"react","react/lib/shallowEqual":"react/lib/shallowEqual"}],60:[function(require,module,exports){
module.exports = {
	iconCloseBack: function() {
		if ((window.environment||[]).indexOf("clipper")!=-1)
			return "back";
		
		return "clear";
	}
}

},{}],61:[function(require,module,exports){
/** @jsx React.DOM */
var TagsStore = require('../../../stores/Tags');

module.exports = React.createClass({
    mixins: [require("./ModalMixin")],
    
  displayName: "Modals/GroupEdit",

    getInitialState: function() {
        return {
            index: this.props.index,
            title: TagsStore.getTags()[this.props.index]._id
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({index: nextProps.index});
    },

    handleClose: function(e) {
        if (e)
            e.preventDefault();
        this.props.closePortal();
    },

    handleTitleChange: function(value) {
        this.setState({title: value});
    },

    handleRemove: function(e) {
        if (e)
            e.preventDefault();

        TagsStore.onRemove({_id: TagsStore.getTags()[this.props.index]._id});
        this.props.closePortal();
    },

    handleSave: function(e) {
        if (e)
            e.preventDefault();

        TagsStore.onUpdate({_id: TagsStore.getTags()[this.props.index]._id, replace: this.state.title});
        this.props.closePortal();
    },

    render: function() {
        return (
            React.createElement("div", {className: "modal-dialog"}, 
                React.createElement("header", null, 
                    React.createElement("div", {className: "actionBar"}, 
                        React.createElement("div", {className: "actions"}, 
                            React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: this.iconCloseBack()}))
                        ), 
                        React.createElement("h3", null, t.s("tags"))
                    )
                ), 

                React.createElement("article", null, 
                    React.createElement("form", {onSubmit: this.handleSave}, 
                        React.createElement("div", {className: "form-editor"}, 
                            React.createElement("div", {className: "oneline"}, 
                                React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "tag"})), 
                                React.createElement("div", {className: "area"}, 
                                    React.createElement("label", null, t.s("name")), 
                                    React.createElement("input", {type: "text", className: "important", required: true, autoFocus: true, valueLink: {value: this.state.title, requestChange: this.handleTitleChange}, ref: "title"})
                                )
                            )
                        ), 

                        React.createElement("footer", null, 
                            React.createElement("div", {className: "actions left"}, 
                                React.createElement("a", {href: "", className: "action-icon active", onClick: this.handleRemove}, t.s("remove"))
                            ), 

                            React.createElement("div", {className: "actions"}, 
                                React.createElement("a", {href: "", className: "action-icon active", onClick: this.handleClose}, t.s("cancel")), 
                                React.createElement("input", {type: "submit", className: "action-icon active", value: t.s("save")})
                            )
                        )
                    )
                )
            )
        );
    }
});

},{"../../../stores/Tags":123,"./ModalMixin":60}],62:[function(require,module,exports){
/** @jsx React.DOM */
var logoSVG = require('../../../newtab/images/logo-text.svg');

var BookmarkActions = require('../../../actions/Bookmark');
var BookmarkStore = require('../../../stores/Bookmark');
var BookmarksActions = require('../../../actions/Bookmarks');
var BookmarksStore = require('../../../stores/Bookmarks');

var BookmarkItem = require('../Bookmarks/Item');
var PopoverFont = require('../Popovers/Font');
var Favicon = require('../Helpers/Favicon');
var ScrollFixMixin = require('../Helpers/ScrollFixMixin.js');

module.exports = React.createClass({
  mixins: [ScrollFixMixin],
  displayName: "Modals/Viewer",

  _getBookmark: function(id) {
    var item = BookmarksStore.getBookmark(id); 
    if (item == null)
      item = {}
    item._id = item._id || id;
    item.navigation = BookmarksStore._bookmarkNavigation(id);

    if (!item.navigation.next)
        this.props.loadMore();

    return item;
  },

  getInitialState: function() {
    var fontSize = 0, fontColor = "", fontFamily = "";
    try {fontSize = UserStore.getUser().config["font_size"] || 0} catch(e){}
    try {fontColor = UserStore.getUser().config["font_color"] || ""} catch(e){}
    try {fontFamily = UserStore.getUser().config["font_family"] || ""} catch(e){}
    return {
      item: this._getBookmark(this.props.id),
      fontSize: fontSize,
      fontColor: fontColor,
      fontFamily: fontFamily,
      fontPopover: false
    }
  },

  handleClose: function(e) {
    if (e)
        e.preventDefault();

    this.props.closePortal();
  },

  handleFont: function(e) {
    if (e)
        e.preventDefault();

    this.setState({fontPopover: true});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({item: this._getBookmark(nextProps.id)});
    BookmarkActions.load(nextProps.id);
  },

  onBookmarkChange: function(bookmark) {
    if (bookmark._id == this.state.item._id){
      bookmark.navigation = BookmarksStore._bookmarkNavigation(bookmark._id);

      this.setState({item: bookmark});
    }
  },

  onBookmarksChange: function() {
    this.state.item.navigation = BookmarksStore._bookmarkNavigation(this.state.item._id);
    this.setState({item: this.state.item});
  },

  componentWillMount: function() {
    BookmarkActions.load(this.props.id);
  },

  componentDidMount: function() {
    this.unsubscribeBookmark = BookmarkStore.listen(this.onBookmarkChange);
    this.unsubscribeBookmarks = BookmarkStore.listen(this.onBookmarksChange);
  },

  componentWillUnmount: function() {
    this.unsubscribeBookmark();
    this.unsubscribeBookmarks();
  },

  componentDidUpdate: function() {

  },

  handleFontClose: function() {
    this.setState({fontPopover: false});
  },

  handleIncrementFont: function(e) {
    e.preventDefault();
    if (this.state.fontSize<9){
      UserStore.onUpdateConfig({font_size: this.state.fontSize+1});
      this.setState({fontSize: this.state.fontSize+1});
    }
  },

  handleDicrementFont: function(e) {
    e.preventDefault();
    if (this.state.fontSize>0){
      UserStore.onUpdateConfig({font_size: this.state.fontSize-1});
      this.setState({fontSize: this.state.fontSize-1});
    }
  },

  handleFontColor: function(c) {
    UserStore.onUpdateConfig({font_color: c});
    this.setState({fontColor: c});
  },

  handleFontFamily: function(f) {
    UserStore.onUpdateConfig({font_family: f});
    this.setState({fontFamily: f});
  },

  handleBookmarkEdit: function(e) {
    e.preventDefault();
    Pop.show("bookmark", {
        id: this.state.item._id,
        pin: "bookmark-viewer-edit-"+this.state.item._id,
        force: "vertical"
    });
    //this.props.handleBookmarkEdit(this.state.item._id);
  },

  render: function() {
    var prev = null, next = null;
    if (this.state.item.navigation.prev)
      prev = (React.createElement("a", {href: "#"+this.props.router.getCurrentPathname()+"?viewer="+this.state.item.navigation.prev, className: "nav-left action-icon"}, 
          React.createElement(Icon, {name: "left"})
        ));
    if (this.state.item.navigation.next)
      next = (React.createElement("a", {href: "#"+this.props.router.getCurrentPathname()+"?viewer="+this.state.item.navigation.next, className: "nav-right action-icon"}, 
          React.createElement(Icon, {name: "right"})
        ));

    var html = null;
    if (this.state.item.type=="link")
      html = React.createElement("div", {style: {paddingTop: "10px"}}, React.createElement("div", {className: "bookmarks"}, React.createElement(BookmarkItem, {item: this.state.item, view: "list"})));
    else
      html = (
        React.createElement("div", {className: "text-viewer-raindrop"}, 
          React.createElement("article", {dangerouslySetInnerHTML: {__html: this.state.item.html||""}}), 
          React.createElement("br", null), 
          React.createElement("a", {href: this.state.item.link, target: network.linkTarget(), className: "read-more"}, t.s("viewOn"), " ", strings.beautifulDomain(this.state.item.domain))
        )
      );

    var fontSize = this.state.fontSize;

    if ((window.environment||[]).indexOf("clipper")!=-1)
      fontSize = 0;

    return (
      React.createElement("div", {className: "modal-dialog modal-fullsize vfontcolor-"+this.state.fontColor}, 
        React.createElement("header", null, 
            React.createElement("div", {className: "actionBar"}, 
                React.createElement("div", {className: "actions"}, 
                    React.createElement("a", {href: "", className: "action-icon viewer-raindrop-logo", onClick: this.handleClose}, React.createElement("span", {className: "logo-text", dangerouslySetInnerHTML: {__html: logoSVG}})), 
                    prev, next
                ), 

                React.createElement("h3", {className: "center"}, " "), 

                React.createElement("div", {className: "actions right"}, 
                    React.createElement("a", {href: this.state.item.link, target: "_blank", className: "action-icon"}, React.createElement(Icon, {name: "open-link", size: "mac"})), 
                    React.createElement("a", {href: "", className: "action-icon", onClick: this.handleFont, id: "font-select-link"}, React.createElement(Icon, {name: "font", size: "mac"}), " ", React.createElement(Icon, {name: "arrow-down", size: "small"})), 
                    React.createElement("a", {href: "", className: "action-icon", onClick: this.handleBookmarkEdit, id: "bookmark-viewer-edit-"+this.state.item._id}, React.createElement(Icon, {name: "edit", size: "mac"})), 
                    React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: "clear", size: "mac"}))
                )
            )
        ), 

        React.createElement("div", {className: "navi"}, prev, next), 

        React.createElement("section", {id: "main-viewer-frame-raindrop", onWheel: this.handleScroll, ref: "div", className: "typography-viewer-raindrop typography-viewer-raindrop-type"+this.state.item.type+" vfontsize-"+fontSize+" vfontfamily-"+this.state.fontFamily}, 
          React.createElement("div", null, 
            React.createElement("h1", null, this.state.item.title), 

            React.createElement("div", {className: "domain"}, 
              React.createElement("div", {className: "favicon"}, 
                React.createElement(Favicon, {domain: this.state.item.domain})
              ), 
              React.createElement("div", {className: "title"}, 
                strings.beautifulDomain(this.state.item.domain), 
                React.createElement("div", {className: "subinfo"}, moment(this.state.item.lastUpdate).format("ll"))
              ), 
              React.createElement("a", {href: this.state.item.link, target: network.linkTarget()})
            ), 

            html, 

            React.createElement("br", null)

          )
        ), 

        React.createElement(PopoverFont, {onClose: this.handleFontClose, 
                      show: this.state.fontPopover, 
                      attachId: "font-select-link", 
                      fontColor: this.state.fontColor, 
                      fontFamily: this.state.fontFamily, 
                      handleIncrementFont: this.handleIncrementFont, 
                      handleDicrementFont: this.handleDicrementFont, 
                      handleFontColor: this.handleFontColor, 
                      handleFontFamily: this.handleFontFamily})
      )
    );
  }
});

},{"../../../actions/Bookmark":1,"../../../actions/Bookmarks":2,"../../../newtab/images/logo-text.svg":110,"../../../stores/Bookmark":112,"../../../stores/Bookmarks":113,"../Bookmarks/Item":18,"../Helpers/Favicon":42,"../Helpers/ScrollFixMixin.js":48,"../Popovers/Font":77}],63:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsStore = require('../../../stores/Collections');
var Favicon = require('../Helpers/Favicon.js');
var Cover = require('../Helpers/Cover.js');

var TagsActions = require('../../../actions/Tags'),
    TagsStore = require('../../../stores/Tags');

var Selectize = require('react-select');
var SelectMixin = require("../Helpers/SelectMixin");
var Textarea = require('react-textarea-autosize');

var ParentsActions = require('../../../actions/Parents');
var BookmarkActions = require('../../../actions/Bookmarks');
var BookmarksStore = require('../../../stores/Bookmarks');

var CollectionsList = require("../Forms/CollectionsList");
var BookmarkIcon = require('./Bookmark/Icon.js');

_collectionIdChanged = false;

module.exports = React.createClass({
    displayName: "Pop/Form/Bookmark",

    mixins: [SelectMixin],

    getInitialState: function() {
        return {
            step: "form",
            tags: [],
            item: BookmarksStore.getBookmark(this.props.id) || {},
            loading: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        var item = BookmarksStore.getBookmark(nextProps.id);
        this._testItem(item, nextProps.id);
        if (this.isMounted()) this.setState({
            item: item
        });
    },

    onCollectionsChange: function() {
        if (this.isMounted())this.setState({
            item: this.state.item
        });
    },

    onTagsChange: function(tags) {
        var clean = tags.map(function(tag){
          return {value: tag._id, label: tag._id};
        });
        if (this.isMounted()) this.setState({
            tags: clean
        });
    },

    componentWillMount: function() {
      TagsActions.load();
    },

    componentDidMount: function() {
        this._testItem(this.state.item, this.props.id);
        this.focusMainInput();
        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        this.unsubscribeTags = TagsStore.listen(this.onTagsChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeCollections();
        this.unsubscribeTags();
    },

    _testItem: function(item, _id) {
        var _this = this;
        if (Object.keys(item).length==0)
            BookmarkActions.loadBookmark({_id: _id}, function(item){
                if (_this.isMounted()) {
                    try{item.cover = item.media[item.coverId].link;}catch(e){}
                    _this.setState({item: item});
                }
            })
    },

    focusMainInput: function() {
        var _this = this;
        setTimeout(function() {
            var el = React.findDOMNode(_this.refs.title);
            if (el){
                el.focus();
                el.setSelectionRange(el.value.length, el.value.length);
            }
        }, 300);
    },

    handleOpenCollectionsList: function(e) {
        e.preventDefault();
        if (this.isMounted()) this.setState({step: "collection"});
    },

    handleOpenIcons: function(e) {
        e.preventDefault();
        if (this.isMounted()) this.setState({step: "icons"});
    },

    handleChangeCollection: function(collection) {
        _collectionIdChanged = (this.state.item.collectionId != collection._id);
        this.state.item.collectionId = collection._id;
        if (this.isMounted()) this.setState({item: this.state.item, step: "form"});
        this.focusMainInput();
    },

    handleTypeChange: function(e) {
        this.state.item.type = e.target.value;
        if (this.isMounted()) this.setState({item: this.state.item, step: "form"});
    },

    handleTitleChange: function(e) {
        this.state.item.title = e.target.value;
        if (this.isMounted()) this.setState({item: this.state.item});
    },

    handleTitleReset: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.title).value="";
        this.state.item.title = "";
        if (this.isMounted()) this.setState({item: this.state.item});
    },

    handleExcerptChange: function(e) {
        this.state.item.excerpt = e.target.value;
        if (this.isMounted()) this.setState({item: this.state.item});
    },

    handleLinkChange: function(e) {
        this.state.item.link = e.target.value;
        if (this.isMounted()) this.setState({item: this.state.item});
    },

    handleExcerptReset: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.excerpt).value="";
        this.state.item.excerpt = "";
        if (this.isMounted()) this.setState({item: this.state.item});
    },

    handleTagsChange: function(value) {
      this.state.item.tags = value.split(",");
      if (this.state.item.tags[0]=="")
        this.state.item.tags = [];
      if (this.isMounted()) this.setState({item: this.state.item});
    },

    goToForm: function(e) {
        if (e)e.preventDefault();
        if (this.isMounted()) this.setState({step: "form"});
        this.focusMainInput();
    },

    handleSave: function(e){
        e.preventDefault();

        var _this = this;

        if (this.isMounted()) this.setState({loading: true});
        BookmarkActions.updateBookmark({item: {
          _id: this.state.item._id,
          title: this.state.item.title,
          excerpt: this.state.item.excerpt,
          tags: this.state.item.tags,
          collectionId: this.state.item.collectionId,
          type: this.state.item.type,
          media: this.state.item.media,
          cover: this.state.item.coverId,
          coverId: this.state.item.coverId
        }, silent: this.props.silent}, function(result){
          if (result)
            _this.handleSaveSuccess((_collectionIdChanged ? _this.state.item.collectionId : undefined));
          else
            if (_this.isMounted()) _this.setState({loading: false});
        });
    },

    handleRemoveBookmark: function(e) {
        e.preventDefault();
        var _this = this;

        BookmarkActions.removeBookmark({item: this.state.item, silent: this.props.silent}, function(result){
          if (result){
            _this.handleClose();
          }
        });
    },

    handleSaveSuccess: function(cId) {
        ParentsActions.reset();
        this.handleClose();

        if ((typeof cId != 'undefined')&&(!this.props.silent)) {
          window.location.hash="#/collection/"+cId;
          //this.props.router.transitionTo('collection', {cId: cId});
        }
    },

    setMedia: function(media,index) {
        if (media) this.state.item.media = media;
        this.state.item.coverId = index;
        this.state.item.cover = this.state.item.media[this.state.item.coverId].link;
        if (this.isMounted()) this.setState({step: "form", item: this.state.item});
    },

    handleClose: function(e) {
        if (e) e.preventDefault();
        if (typeof this.props.onClose == "function")
            this.props.onClose();
        else
            Pop.close();
    },

    componentDidUpdate: function() {
        if (typeof this.props.onUpdate == "function")
            this.props.onUpdate();
    },

    render: function() {
        var _this = this;

        //Change collection
        if (this.state.step == "collection"){
            return (
                React.createElement("div", {className: "pop-content"}, 
                React.createElement("div", {className: "pop-sticky-header"}, 
                    React.createElement("div", {className: "sticky-header"}, 
                        React.createElement("header", null, 
                            React.createElement("div", {className: "actions"}, 
                                React.createElement("a", {href: "", className: "but default onlyicons", onClick: this.goToForm}, React.createElement(Icon, {name: "back", size: "mac"}))
                            ), 
                            React.createElement("div", {className: "max title center"}, 
                                t.s("selectCollection")
                            ), 
                            React.createElement("div", {className: "actions"})
                        )
                    ), 

                    React.createElement(CollectionsList, {
                        activeCollection: this.state.item.collectionId, 
                        onSelectCollection: this.handleChangeCollection, 
                        onCancel: this.goToForm})
                )
                )
            );
        }

        //Change icons
        if (this.state.step == "icons"){
            return React.createElement(BookmarkIcon, {
                                bookmark: this.state.item, 
                                goToForm: this.goToForm, 
                                onUpdate: this.props.onUpdate, 
                                setMedia: this.setMedia});
        }

        //Edit bookmark
        var collection = CollectionsStore.getCollection(this.state.item.collectionId);
        if (collection==null) {
            CollectionsStore.onLoadId(this.state.item.collectionId);
            collection = {title: ""};
        }

        var cover = consts.defaultCollectionIcon();
        try{cover = network.fixURL(collection.cover[0]);}catch(e){}

        var hideUnnecessary = ((this.state.item||{}).collectionId == -2);

        var coverDots = null;
        try{coverDots = this.state.item.media.map(function(c,index){
            if (index<7)
            return React.createElement("span", {className: _this.state.item.coverId == index ? "active" : null});
        }); if (coverDots.length<=1) coverDots = null;}catch(e){}

        var loading = ((Object.keys(this.state.item).length==0)||(this.state.loading));

        var text = {
            save: t.s("save"),
            cancel: t.s("cancel")
        }

        return (
        React.createElement("div", null, 
            React.createElement("div", {className: (this.props.isSubContent ? "pop-sub-content":"pop-content")+" "+(loading ? "invisible" : null)}, 
                React.createElement("form", {onSubmit: this.handleSave}, 
                    React.createElement("header", null, 
                        React.createElement("div", {className: "max title", style: {marginRight:0}}, 
                            React.createElement(Textarea, {required: true, value: this.state.item.title, onChange: this.handleTitleChange, ref: "title", placeholder: t.s("enterTitle"), rows: "1"}), 
                            React.createElement(Textarea, {className: "small" + (hideUnnecessary?" hidden":""), value: this.state.item.excerpt, onChange: this.handleExcerptChange, ref: "excerpt", placeholder: t.s("enterDescription"), rows: "1"})
                        ), 

                        React.createElement("div", {className: "cover", onClick: this.handleOpenIcons}, 
                            React.createElement(Cover, {src: this.state.item.cover, link: this.state.item.link, domain: this.state.item.domain, className: "cover-img"}), 
                            React.createElement("div", {className: "dots"}, coverDots)
                        )
                    ), 

                    React.createElement("div", {className: "entries"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "title"}, t.s("collection")), 
                            React.createElement("div", {className: "content"}, 
                                React.createElement("a", {href: "", className: "block-link", onClick: this.handleOpenCollectionsList}, React.createElement("img", {className: "small-icon", src: cover, alt: ""}), collection.title)
                            )
                        ), 

                        React.createElement("div", {className: "row " + (hideUnnecessary?" hidden":"")}, 
                            React.createElement("div", {className: "title"}, t.s("tags")), 
                            React.createElement("div", {className: "content max"}, 
                                React.createElement(Selectize, {
                                    name: "tags", 
                                    value: this.state.item.tags, 
                                    options: this.state.tags, 
                                    multi: true, 
                                    placeholder: t.s("addTags")+"...", 
                                    onChange: this.handleTagsChange, 
                                    onFocus: this.handleSelectFocus, 
                                    onBlur: this.handleSelectBlur, 
                                    filterOptions: this.handleSelectFilter}
                                )
                            )
                        ), 

                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "title"}, "URL"), 
                            React.createElement("div", {className: "content"}, 
                                React.createElement(Textarea, {className: "small", value: this.state.item.link, readOnly: "true", ref: "link", placeholder: t.s("enterLink"), rows: "1"})
                            )
                        )
                    ), 

                    React.createElement("footer", null, 
                        React.createElement("input", {type: "submit", className: "but accent pull-right", value: text.save}), 
                        React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, text.cancel), 
                        
                        React.createElement("a", {href: "", className: "but ", onClick: this.handleRemoveBookmark}, t.s("remove")), 
                        React.createElement("label", {className: "but select onlyicons " + (hideUnnecessary?" hidden":""), title: t.s(this.state.item.type), style: {marginRight:0}}, 
                            React.createElement(Icon, {name: this.state.item.type, size: this.state.item.type == "link" ? "mac" : null}), 
                            React.createElement(Icon, {name: "arrow-down", size: "small"}), 

                            React.createElement("select", {value: this.state.item.type, onChange: this.handleTypeChange}, 
                                React.createElement("option", {value: "link"}, t.s("link")), 
                                React.createElement("option", {value: "article"}, t.s("article")), 
                                React.createElement("option", {value: "image"}, t.s("image")), 
                                React.createElement("option", {value: "video"}, t.s("video"))
                            )
                        )
                    )
                )
            ), 

            React.createElement("div", {className: "pop-loader "+(loading ? null : "hidden")})
        ));
    }
});

},{"../../../actions/Bookmarks":2,"../../../actions/Parents":7,"../../../actions/Tags":12,"../../../stores/Bookmarks":113,"../../../stores/Collections":115,"../../../stores/Tags":123,"../Forms/CollectionsList":36,"../Helpers/Cover.js":40,"../Helpers/Favicon.js":42,"../Helpers/SelectMixin":50,"./Bookmark/Icon.js":64,"react-select":"react-select","react-textarea-autosize":"react-textarea-autosize"}],64:[function(require,module,exports){
/** @jsx React.DOM */
var CoverSelector = require("../../Helpers/CoverSelector");

var V = require('validator');
var MiniSearch = require("../../Search/Mini");
var Iconfinder = require("../../../../modules/Iconfinder");

module.exports = React.createClass({
    displayName: "Bookmark/Icon",

    getInitialState: function() {
        return {
            bookmark: this.props.bookmark,
            search: "",
            icons: [],
            loading: false,
            haveMore: true
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            bookmark: nextProps.bookmark
        });
    },

    handleChangeIcon: function(index, withMedia) {
      var update = {_id: this.state.bookmark._id, cover: index, coverId: index, coverEnabled: true};
      if (withMedia){
        update.media = withMedia;
      }else{
        //если иконка выбрана из поиска
        if (this.state.search!=""){
          update.media = this.state.bookmark.media || [];
          update.media.push({link: this.state.icons[index], type: "image"});
          update.cover = update.media.length - 1;
          update.coverId = update.cover;
        }
        //если выбранная иконка из домена то ее нужно добавить в набор и выбрать
        else if ((this.state.bookmark.collectionId == -2) && (typeof this.state.bookmark.media[index] == "undefined")){
          update.media = this.state.bookmark.media || [];
          update.media.push({link: network.favIcon((this.state.bookmark.domain)), type: "image"});
          update.cover = update.media.length - 1;
          update.coverId = update.cover;
        }
      }

      this.props.setMedia(update.media, update.coverId);
      //BookmarkActions.updateBookmark({item: update});
    },

    handleScreenshot: function(e) {
        var _this = this;
        e.preventDefault();

        var addScreenshot = function(mediaItem) {
          var item = JSON.parse(JSON.stringify(_this.state.bookmark)),
            coverIndex = -1;

          item.media = item.media || [];

          for(var i in item.media)
            if (item.media[i].screenshot){
              coverIndex = i;
              break;
            }

          if (coverIndex == -1){
            item.media.push(mediaItem);
            item.coverId = item.media.length - 1;
          }
          else{
            item.media[coverIndex] = mediaItem;
            item.coverId = coverIndex;
          }

          item.coverEnabled = true;
          _this.setState({bookmark: item});
          _this.handleChangeIcon(item.coverId, item.media);
        }

        var serverScreen = function() {
          addScreenshot({link: consts.screenshotService+encodeURIComponent(_this.state.bookmark.link), type: "image", screenshot: true});
        }

        if (typeof BrowserBridge != "undefined"){
          BrowserBridge.currentURL(function(url) {
            if (_this.state.bookmark.link == url)
              BrowserBridge.capturePage(function(dataURI){
                if (dataURI)
                  addScreenshot({link: dataURI, type: "image", screenshot: true, dataURI: true});
                else
                  serverScreen();
              });
            else{
              serverScreen();
            }
          });
        }
        else
          serverScreen();
    },

    handleSearch: function(s) {
      this.setState({search:s, loading: true});

      var _this = this;
      Iconfinder.search(s, 0, function(icons) {
        _this.setState({icons: icons, loading: false, haveMore: true});
      });
    },

    handleNextSearchPage: function(e) {
      e.preventDefault();
      var _this = this;
      this.setState({haveMore:false});
      Iconfinder.search(this.state.search, 1, function(icons) {
        _this.setState({icons: _this.state.icons.concat(icons), loading: false});
      });
    },

    handleURL: function(e) {
      e.preventDefault();
      var URL = prompt(t.s("enterLink"));
      if (V.isURL(URL)){
        this.state.bookmark.media = this.state.bookmark.media || [];
        this.state.bookmark.media.push({link: URL, type: "image"});
        this.setState({bookmark: this.state.bookmark});

        var _this = this;
        setTimeout(function(){
          _this.handleChangeIcon(_this.state.bookmark.media.length-1, _this.state.bookmark.media);
        },200);
      }else{
        Toasts.show({text: t.s("serverincorrect url"), status:"error"});
      }
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
        var _this = this, wrapClassName = "", content = null, loadMore = null, icons = [];

        if (this.state.search==""){
          icons = (this.state.bookmark.media||[]).map(function(item, index){
              return network.fixURL(item.link);
          });

          if (this.state.bookmark.collectionId == -2)
            icons.push(network.favIcon((this.state.bookmark.domain)));
        }else{
          icons = (this.state.icons||[]).map(function(item, index){
              return network.fixURL(item);
          });

          if (this.state.haveMore)
          loadMore = React.createElement("div", {className: "btn btn-card show-more-button show-more-button-visible"}, t.s("more"), React.createElement("a", {href: "", className: "permalink", onClick: this.handleNextSearchPage}));
        }

        ///BUTTONS
        var actionButtons = [
          (React.createElement("div", {className: "action-item action-item-gray"}, 
            React.createElement("a", {href: "", onClick: this.handleURL}, 
              React.createElement(Icon, {name: "add"}), 
              React.createElement("span", null, "URL")
            )
          ))
        ];

        var haveScreenshot = false;
        try{
          haveScreenshot = (_.findIndex(this.state.bookmark.media||[], {screenshot: true})!=-1);
        }catch(e) {}
        if (!haveScreenshot)
          actionButtons.unshift(
            React.createElement("div", {className: "action-item"}, 
              React.createElement("a", {href: "", onClick: this.handleScreenshot}, 
                React.createElement(Icon, {name: "web"}), 
                React.createElement("span", null, t.s("clickToMakeScreenshot"))
              )
            )
          );


        ///CONTENT
        if (this.state.loading){
          content = React.createElement("div", {className: "centered-content"}, React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)));
          loadMore = null;
        }
        else{
          var selected = (this.state.search=="" ? this.state.bookmark.coverId : -1);
          if (typeof (this.state.bookmark.media||[])[this.state.bookmark.coverId] == undefined )
            selected = -1;

          content = React.createElement(CoverSelector, {items: icons, selected: selected, onSelect: this.handleChangeIcon}, actionButtons);
        }

        return (
          React.createElement("div", {className: "pop-content"}, 
            React.createElement("div", {className: "pop-sticky-header"}, 
                React.createElement("div", {className: "sticky-header"}, 
                    React.createElement("header", null, 
                        React.createElement("div", {className: "actions"}, 
                            React.createElement("a", {href: "", className: "but default onlyicons", onClick: this.props.goToForm}, React.createElement(Icon, {name: "back", size: "mac"}))
                        ), 
                        React.createElement("div", {className: "max title center"}, 
                            React.createElement(MiniSearch, {onChange: this.handleSearch})
                        ), 
                        React.createElement("div", {className: "actions"})
                    )
                ), 

                content, loadMore
            )
          )
        );
    }
});

},{"../../../../modules/Iconfinder":101,"../../Helpers/CoverSelector":41,"../../Search/Mini":81,"validator":"validator"}],65:[function(require,module,exports){
/** @jsx React.DOM */
var BookmarksActions = require('../../../actions/Bookmarks');
var CollectionsActions = require('../../../actions/Collections');
var CollectionsStore = require('../../../stores/Collections');
var CollectionsList = require("../Forms/CollectionsList");
var ParentsActions = require('../../../actions/Parents');
var Upgrade = require("../Bookmarks/Upgrade");

var CollectionIcon = require("./Collection/Icon"),
    CollectionSharing = require("./Collection/Sharing");

var Textarea = require('react-textarea-autosize');

var _defaultItem = {};
var setDefaults = function() {
    _defaultItem = {
        _id: 0,
        title: t.s("collectionNew"),
        view: "list",
        group: 0,
        empty: true,
        blank: true
    };
}

if (document)
    if (window.languageLoaded)
        setDefaults();
    else
        window.addEventListener("langLoaded", setDefaults);
else
    setDefaults();

module.exports = React.createClass({
    displayName: "Pop/Collection",

    updateCover: false,

    getInitialState: function() {
        var item;
        var disableNested = false;
        _defaultItem.group = this.props.group || 0;

        if (this.props.id || this.props.forceEdit) {
            var item = {
                _id: parseInt(this.props.id || 0),
                empty: true
            };

            collection = CollectionsStore.getCollection(this.props.id);
            if (collection == null)
                CollectionsStore.onLoadId(this.props.id);
            else {
                item = JSON.parse(JSON.stringify(collection));
            }
        }

        var loading = (/*!(item||{})._id ||*/ (item||{}).empty);
        if (!item)
            loading = false;

        item = item || JSON.parse(JSON.stringify(_defaultItem));
        if (item.blank){
            if ((this.props.parentId||0)>0){
                item.title = t.s("nestedCollections").split(" ")[0] + " " + t.s('collection').toLowerCase();

                if (!UserStore.isPro())
                    disableNested = true;
            }
        }

        return {
            step: (this.props.step ? this.props.step : "form"),
            loading: loading,
            item: item,
            collaboratorsText: "",
            disableNested: disableNested
        };
    },

    onCollectionsChange: function() {
        var temp = null;

        if ((this.state.item.empty)&&(this.state.item._id)){
            collection = CollectionsStore.getCollection(this.state.item._id);
            if (collection != null)
              temp = JSON.parse(JSON.stringify(collection));
        }

        if (temp!=null)
          this.setState({
              item: temp,
              loading: false
          });

        this.setState({step: this.state.step});
    },

    componentDidMount: function() {
        var _this = this;

        this.focusMainInput();

        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);

        if ((this.props.parentId||0)>0){
            this.handleChangeCollection( {_id: this.props.parentId} );
        }

        if (this.state.item._id)
            Api.get("collection/"+this.state.item._id+"/collaborators", function(json){
                if (json.items){
                    var members = 0, viewers = 0;
                    for(var i in json.items)
                        if (json.items[i].role=="member") members++;
                        else if ((json.items[i].role=="owner")&&(_this.state.item.public)) members++;
                        else if (json.items[i].role=="viewer") viewers++;

                    var collaboratorsText = "";
                    if ((members)||(viewers))
                        collaboratorsText = t.s("und") + " " + parseInt(members+viewers)+" "+t.s("members").toLowerCase();

                    if (viewers)
                        collaboratorsText += " (" + viewers+" "+t.s("role_viewer").toLowerCase() + ")";

                    if (collaboratorsText)
                        _this.setState({collaboratorsText: collaboratorsText});
                }
            });
    },

    componentWillUnmount: function() {
        this.unsubscribeCollections();
    },

    focusMainInput: function() {
        var _this = this;
        setTimeout(function() {
            var input = React.findDOMNode(_this.refs.title);
            if (input){
                input.focus();
                if (_this.state.item._id==0)
                    input.setSelectionRange(0, input.value.length);
                else
                    input.setSelectionRange(input.value.length, input.value.length);
            }
        }, 0);
    },

    handleTitleChange: function(value) {
        this.state.item.title = value;
        this.setState({item: this.state.item});
    },

    handleExcerptChange: function(e) {
        this.state.item.excerpt = e.target.value;
        this.setState({item: this.state.item});
    },

    handleOpenCollectionsList: function(e) {
        e.preventDefault();
        this.setState({step: "parent"});
    },

    handleOpenIcons: function(e) {
        e.preventDefault();
        if ((this.state.item.author && this.state.item._id>=0)||(this.state.item.blank))
            this.setState({step: "icons"});
    },

    handleOpenSharing: function(e) {
        e.preventDefault();
        this.setState({step: "sharing"});
    },

    handleChangeCollection: function(collection) {
        if (UserStore.isPro()){
          this.state.item.parentId = collection._id;
          delete this.state.item.group;
        }

        this.setState({item: this.state.item, step: "form"});
        this.focusMainInput();
    },

    handleChangeGroup: function(group, index) {
        this.state.item.group = index;
        delete this.state.item.parentId;

        this.setState({item: this.state.item, step: "form"});
        this.focusMainInput();
    },

    goToForm: function(e) {
        e.preventDefault();
        this.setState({step: "form"});
        this.focusMainInput();
    },

    handleCollectionSave: function(cId) {
        ParentsActions.reset();
        if ((this.state.item._id==0)||(cId == CollectionsStore.getCurrentId()))
            window.location.hash="#/collection/"+cId+"?d="+new Date().getTime();
        //this.props.router.transitionTo('collection', {cId: this.state.cId}, {d: new Date().getTime() });
        Pop.close();
    },

    handleSave: function(e) {
        e.preventDefault();

        var _this = this;

        if (this.state.item._id==0)
            CollectionsActions.insertCollection({
                item: this.state.item
            }, function(cId){
                if (cId>0)
                    _this.handleCollectionSave(cId);
                else
                    _this.setState({loading:false});
            });
        else {
            var toUpdate = {
                _id: this.state.item._id,
                title: this.state.item.title,
                excerpt: this.state.item.excerpt,
                parentId: this.state.item.parentId,
                group: this.state.item.group,
                view: this.state.item.view
            };

            if (this.updateCover){
                toUpdate.cover = this.state.item.cover;
                toUpdate.cover_path = this.state.item.cover_path;
            }

            CollectionsActions.updateCollection({
                item: toUpdate
            }, function (cId) {
                if (cId > 0) {
                    _this.handleCollectionSave(cId);
                }else
                    _this.setState({loading:false});
            });
        }

        this.setState({loading: true});
    },

    handleRemoveCollection: function(e) {
        e.preventDefault();
        var _this = this, lastId = this.state.item._id;

        CollectionsActions.removeCollection({
            item: this.state.item
        }, function(result){
            if (result){
                if (CollectionsStore.getCurrentId() == lastId){
                    window.location.hash="#/?reset=true&d="+new Date().getTime();
                    //this.props.router.transitionTo('app', {}, {reset: "true"});
                }

                Pop.close();
            }
        });
    },

    setCover: function(cover, cover_path) {
        this.updateCover = true;
        this.state.item.cover = [cover];
        this.state.item.cover_path = cover_path;
        this.setState({item: this.state.item, step: "form"});
    },

    handleChangeView: function(e) {
        e.preventDefault();

        this.state.item.view = e.target.getAttribute("data-view");
        this.setState({item: this.state.item});

        if (CollectionsStore.getCurrentId() == this.state.item._id)
        //if (this.state.collection.view != this.state.item.view) {
            BookmarksActions.clearSelect();

            CollectionsActions.updateCollection({
                item: {_id: this.state.item._id, view: this.state.item.view},
                silent: true
            });
        //}
    },

    handleClose: function(e) {
        e.preventDefault();
        Pop.close();
    },

    handleRSS: function(e) {
        var link = consts.host + "/collection/" + this.state.item._id + "/feed";
        if (e.target.value=="private"){
            link = consts.host + "/feed/" + this.state.item.uniqKey;
        }
        window.open(link);
    },

    handleSubFolder: function(e) {
        e.preventDefault();
        Pop.close();
        Pop.show("collection", {
            parentId: this.state.item._id,
            pin: this.props.pin,
            force: this.props.force
        })
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
        if (this.state.disableNested)
            return (
                React.createElement("div", {className: (this.props.isSubContent ? "pop-sub-content":"pop-content")}, 
                    React.createElement(Upgrade, {view: "list", force: "true", title: t.s("createSubFolder"), excerpt: t.s("onlyInPro") + ". " + t.s("footerProAd") + " " +t.s("footerProAdD")}), 

                    React.createElement("footer", null, 
                        React.createElement("a", {href: consts.proPage, target: "_blank", className: "but accent pull-right"}, t.s("goToPRO")), 
                        React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, t.s("cancel")), 

                        removeCollection
                    )
                )
            );

        var loading = this.state.loading;

        if (!loading){
            //Change collection
            if (this.state.step == "parent"){
                return (
                    React.createElement("div", {className: "pop-content"}, 
                    React.createElement("div", {className: "pop-sticky-header"}, 
                        React.createElement("div", {className: "sticky-header"}, 
                            React.createElement("header", null, 
                                React.createElement("div", {className: "actions"}, 
                                    React.createElement("a", {href: "", className: "but default onlyicons", onClick: this.goToForm}, React.createElement(Icon, {name: "back", size: "mac"}))
                                ), 
                                React.createElement("div", {className: "max title center"}, 
                                    t.s("parent")
                                ), 
                                React.createElement("div", {className: "actions"})
                            )
                        ), 

                        React.createElement(CollectionsList, {
                            skipCollection: this.state.item._id, 
                            activeCollection: this.state.item.parentId, 
                            activeGroup: this.state.item.group, 
                            onSelectCollection: this.handleChangeCollection, 
                            onSelectGroup: this.handleChangeGroup, 
                            onCancel: this.goToForm})
                    )
                    )
                );
            }

            //Change icons
            if (this.state.step == "icons"){
                return React.createElement(CollectionIcon, {
                                    collection: this.state.item, 
                                    goToForm: this.goToForm, 
                                    onUpdate: this.props.onUpdate, 
                                    setCover: this.setCover});
            }

            //Sharing
            if (this.state.step == "sharing"){
                return React.createElement(CollectionSharing, {
                                    collection: this.state.item, 
                                    goToForm: this.goToForm, 
                                    onUpdate: this.props.onUpdate});
            }
        }
        

        var parent = null, parentLabel = "", cover = null;

        if (typeof this.state.item.parentId == 'number') {
            parent = CollectionsStore.getCollection(this.state.item.parentId);
            parentLabel = t.s("collection");
            if (parent == null) {
                CollectionsStore.onLoadId(this.state.item.parentId);
            }else{
                cover = "https://raindrop.io/other/popup/img/icon-folder.png";
                try{cover = network.fixURL(parent.cover[0]);}catch(e){}
                cover = React.createElement("img", {src: cover, alt: "", className: "small-icon"});
            }
        }else if (typeof this.state.item.group == 'number') {
            try{
              parent = {
                  isGroup: true,
                  title: UserStore.getUser().groups[this.state.item.group].title
              };
            }catch(e){}
            parentLabel = t.s("group");
            cover = React.createElement(Icon, {name: "group", size: "mac", className: "content-icon"});
        }

        if (parent==null){
            parent = {
                title: ""
            }
        }

        var collectionCover = consts.defaultCollectionIcon();
        try{collectionCover = network.fixURL(this.state.item.cover[0]);}catch(e){}

        var removeCollection = null;
        if (this.state.item._id>0)
            removeCollection = React.createElement("a", {href: "", className: "but ", onClick: this.handleRemoveCollection}, t.s("remove"));

        var viewDesc = "";
        switch(this.state.item.view){
            case "grid":
                viewDesc = t.s("visualBookmarks");
            break;

            case "masonry":
                viewDesc = t.s("visualBookmarks") + " (Moodboard)";
            break;

            case "simple":
                viewDesc = t.s("icon") + ", " + t.s("title").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase();
            break;

            default:
                viewDesc = t.s("cover") + ", " + t.s("title").toLowerCase() + ", " + t.s("description").toLowerCase() + " " + t.s("und") + " " + t.s("tags").toLowerCase();
            break;
        }

        return (
        React.createElement("div", null, 
            React.createElement("div", {className: (this.props.isSubContent ? "pop-sub-content":"pop-content")+" "+(loading ? "invisible" : null)}, 
                React.createElement("form", {onSubmit: this.handleSave}, 
                    React.createElement("header", null, 
                        React.createElement("div", {className: "max title", style: {marginRight:0}}, 
                            React.createElement("input", {type: "text", className: "important", required: true, autoFocus: true, valueLink: {value: this.state.item.title, requestChange: this.handleTitleChange}, ref: "title"}), 
                            
                            React.createElement("div", {className: "sublinks" + (this.state.item._id <= 0 ? " hidden" : "")}, 
                                React.createElement("a", {href: consts.host+"/collection/"+this.state.item._id, target: "_blank", className: "but " + (this.state.item.public ? "" : "hidden")}, React.createElement(Icon, {name: "link", size: "mac"}), " ", t.s("link")), 

                                React.createElement("label", {className: "but select"}, 
                                    React.createElement(Icon, {name: "rss", size: "mac"}), " RSS", 

                                    React.createElement("select", {value: "-1", onChange: this.handleRSS}, 
                                        this.state.item.public ? React.createElement("option", {value: "public"}, t.s("publicRSSfeed")) : null, 
                                        React.createElement("option", {value: "private"}, t.s("privateRSSfeed")), 
                                        React.createElement("option", {value: "-1", disabled: true}, t.s('feedWarning'))
                                    )
                                )
                            )
                        ), 

                        React.createElement("div", {className: "cover", onClick: this.handleOpenIcons}, 
                            React.createElement("img", {src: collectionCover, alt: "", className: "cover-img cover-small"})
                        )
                    ), 

                    React.createElement("div", {className: "entries"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "title"}, parentLabel), 
                            React.createElement("div", {className: "content"}, 
                                React.createElement("a", {href: "", className: "block-link", onClick: this.handleOpenCollectionsList}, cover, parent.title)
                            )
                        ), 

                        React.createElement("div", {className: "row" + (this.state.item._id <= 0 ? " hidden" : "")}, 
                            React.createElement("div", {className: "title wrap-text"}, t.s("sharing")), 
                            React.createElement("div", {className: "content"}, 
                                React.createElement("a", {href: "", className: "block-link", onClick: this.handleOpenSharing}, React.createElement(Icon, {name: this.state.item.public ? "link" : "lock", size: "mac", className: "content-icon"}), t.s((this.state.item.public ? "accessViaLink" : "privateD")), " ", this.state.collaboratorsText), 
                                React.createElement("br", null)
                            )
                        ), 

                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "title ", style: {paddingTop:"10px"}}, t.s("view")), 
                            React.createElement("div", {className: "content max"}, 
                                React.createElement("div", {className: "stag"}, 
                                    React.createElement("a", {href: "", className: this.state.item.view == "list" ? "active" : null, "data-view": "list", onClick: this.handleChangeView}, React.createElement(Icon, {name: "list", size: "mac"})), 
                                    React.createElement("a", {href: "", className: this.state.item.view == "grid" ? "active" : null, "data-view": "grid", onClick: this.handleChangeView}, React.createElement(Icon, {name: "grid", size: "mac"})), 
                                    React.createElement("a", {href: "", className: this.state.item.view == "simple" ? "active" : null, "data-view": "simple", onClick: this.handleChangeView}, React.createElement(Icon, {name: "simple", size: "mac"})), 
                                    React.createElement("a", {href: "", className: this.state.item.view == "masonry" ? "active" : null, "data-view": "masonry", onClick: this.handleChangeView}, React.createElement(Icon, {name: "masonry", size: "mac"}))
                                ), 

                                React.createElement("div", {className: "subinfo", style: {marginTop:"8px"}}, viewDesc)
                            )
                        )
                    ), 

                    React.createElement("div", {className: "nice-action" + (!this.state.item.author || this.state.item._id <= 0 ? " hidden" : "")}, 
                        React.createElement("a", {href: "", className: "block-link", onClick: this.handleSubFolder}, React.createElement(Icon, {name: "folder-add", size: "mac", className: "content-icon"}), t.s("createSubFolder"))
                    ), 

                    React.createElement("footer", null, 
                        React.createElement("input", {type: "submit", className: "but accent pull-right "+((!this.state.item.author || this.state.item._id<0) && !this.state.item.blank  ? "hidden" : ""), value: this.state.item._id > 0 ? t.s("save") : t.s("createNewCollection")}), 
                        React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, t.s("cancel")), 

                        removeCollection
                    )
                )
            ), 

            React.createElement("div", {className: "pop-loader "+(loading ? null : "hidden")})
        ));
    }
});

},{"../../../actions/Bookmarks":2,"../../../actions/Collections":4,"../../../actions/Parents":7,"../../../stores/Collections":115,"../Bookmarks/Upgrade":23,"../Forms/CollectionsList":36,"./Collection/Icon":66,"./Collection/Sharing":67,"react-textarea-autosize":"react-textarea-autosize"}],66:[function(require,module,exports){
/** @jsx React.DOM */
var CoverSelector = require("../../Helpers/CoverSelector");

module.exports = React.createClass({
    displayName: "Collection/Icon",

    scrolled: false,

    getInitialState: function() {
        return {
            icons: [],
            selected: -1,
            theme: 0,
            path: "",
            collection: this.props.collection,
            step: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            collection: nextProps.collection
        });
    },

    componentDidMount: function() {
        var _this = this;

        var temp = null, path = "";
        try{temp = JSON.parse(Api.getItem("coverTemplates")); path = Api.getItem("coverTemplatesPath");} catch(e) {}
        if ((temp) && (this.state.icons.length == 0)) {
            this.state.icons = temp;
            var f = _this.findSelected();
            this.setState({icons: this.state.icons, path: path, theme: f.theme, selected: f.selected});
        }

        Api.get("coverTemplates", function(json){
            var items = [];
            items.push({
                name: "defaults",
                items: json.items
            });

            for(var i in json.pro)
                items.push({
                    name: i,
                    items: json.pro[i]
                });

            _this.state.icons = items;
            var f = _this.findSelected();

            Api.setItem("coverTemplates", JSON.stringify(items));
            Api.setItem("coverTemplatesPath", json.path);
            _this.setState({icons: items, path: json.path, theme: f.theme, selected: f.selected});
        });
    },

    findSelected: function() {
        var selected = -1, theme = 0, _this = this;
        this.state.icons.forEach(function(t,ti){
            t.items.forEach(function(icn,ii){
                if (icn==(_this.state.collection.cover_path||-1)){
                    selected = ii;
                    theme = ti;
                }
            });
        });

        return {
            selected: selected,
            theme: theme
        }
    },

    handleChangeIcon: function(index) {
        var cover_path = this.state.icons[this.state.theme].items[index];

        /*CollectionsActions.updateCollection({
            item: {
                _id: this.state.collection._id,
                cover: [ this.state.path+cover_path+".png" ],
                cover_path: cover_path
            }
        }, function (cId) {});*/
        this.props.setCover(this.state.path+cover_path+".png", cover_path);

        this.setState({collection: this.state.collection, selected: index});
    },

    handleChangeTheme: function(theme) {
        var f = this.findSelected();
        var selected = -1;
        if (f.theme == theme)
            selected = f.selected;

        this.setState({theme: theme, selected: selected, step: false});
    },

    scrollToActive: function() {
        if (this.scrolled) return;

        var activeElem = document.getElementById("coveritem_"+this.state.selected);

        if (activeElem){
            activeElem.scrollIntoView(false);
            this.scrolled=true;
        }
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
        this.scrollToActive();
    },

    handleThemes: function(e) {
        e.preventDefault();
        this.scrolled = false;
        this.setState({step: !this.state.step});
    },

    render: function() {
        var content = null, wrapClassName="", _this = this;

        var toolbar = React.createElement("div", {className: "mini-tab"}, React.createElement("a", {className: "item"}, React.createElement("img", {src: "about:blank", style: {width:"32px",height:"32px"}, alt: ""})))

        if (this.state.step){
            var icons = this.state.icons.map(function(item, index){
                return network.fixURL(_this.state.path+item.items[parseInt(item.items.length/2)]+".png");
            });

            content = React.createElement(CoverSelector, {items: icons, selected: this.state.theme, onSelect: this.handleChangeTheme, imageSize: "64px 64px"});
        }
        else
        if (this.state.path!=""){
            var icons = this.state.icons[this.state.theme].items.map(function(item, index){
                return network.fixURL(_this.state.path+item+".png");
            });

            content = React.createElement(CoverSelector, {items: icons, selected: this.state.selected, onSelect: this.handleChangeIcon, imageSize: "64px 64px"});

            //themes
            var themes = this.state.icons.map(function(item,index){
                return (
                    React.createElement("a", {href: "", className: "item"+(_this.state.theme==index?" active":""), "data-index": index, onClick: _this.handleChangeTheme}, 
                        React.createElement("img", {src: network.fixURL(_this.state.path+item.items[parseInt(item.items.length/2)]+".png"), style: {width:"32px",height:"32px"}, alt: ""})
                    ));
            });
        }else{
            content = React.createElement("div", {className: "centered-content"}, React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)));
        }

        return (
            React.createElement("div", {className: "pop-content"}, 
                React.createElement("div", {className: "pop-sticky-header"}, 
                    React.createElement("div", {className: "sticky-header"}, 
                        React.createElement("header", null, 
                            React.createElement("div", {className: "actions"}, 
                                React.createElement("a", {href: "", className: "but default onlyicons", onClick: this.props.goToForm}, React.createElement(Icon, {name: "back", size: "mac"}))
                            ), 
                            React.createElement("div", {className: "max title center"}, 
                                React.createElement("a", {href: "", className: "but "+(this.state.step ? "active" : ""), onClick: this.handleThemes}, t.s("selectAIconSet"), " ", React.createElement(Icon, {name: "arrow-down", size: "small"}))
                            ), 
                            React.createElement("div", {className: "actions"})
                        )
                    ), 

                    content
                )
            )
        );
    }
});

},{"../../Helpers/CoverSelector":41}],67:[function(require,module,exports){
var CollectionsActions = require('../../../../actions/Collections');
var Avatar = require("../../Helpers/Avatar");

var _roles = [
    {
        key: "owner",
        value: t.s("role_owner")
    },
    {
        key: "member",
        value: t.s("role_member")
    },
    {
        key: "viewer",
        value: t.s("role_viewer")
    }
];

module.exports = React.createClass({
    displayName: "Collection/Sharing",

    mixins: [strings.inputSelectAllMixin],

    getInitialState: function() {
        return {
            collection: this.props.collection,
            collaborators: [],
            invite: {
                emails: "",
                role: "member",
                loading: false
            }
        }
    },

    componentDidMount: function() {
        this.loadCollaborators();
    },

    componentWillReceiveProps: function(nextProps) {
        this.state.collection = nextProps.collection;
        this.loadCollaborators();

        this.setState({
            collection: nextProps.collection
        });
    },

    loadCollaborators: function(force) {
        var _this = this, link = "collection/"+this.state.collection._id+"/collaborators";

        //frome cache
        if (this.state.collaborators.length==0){
            var temp = null;
            try{temp = JSON.parse(Api.getItem(link));} catch(e) {}
            if (temp)
                this.setState({collaborators: temp||[]});
        }

        if ((this.state.collaborators.length==0)||(typeof force != 'undefined'))
            Api.get(link, function(json){
                _this.setState({collaborators: json.items||[]});
                Api.setItem(link, JSON.stringify(json.items||[]));
            });
    },

    handleChangePublic: function(e) {
        e.preventDefault();
        this.state.collection.public = !this.state.collection.public;

        CollectionsActions.updateCollection({
            item: {
                _id: this.state.collection._id,
                public: this.state.collection.public
            },
            silent: true
        }, function (cId) {});

        this.setState({collection: this.state.collection});
    },

    handleChangeRole: function(e) {
        var role = e.target.value,
            userId = parseInt(e.target.getAttribute("data-userid"));

        var _this = this;
        Api.put("collection/"+this.state.collection._id+"/role", {accesslevel: role, userId: userId}, function(json){
            if (json.result){
                _this.loadCollaborators(true);
                /*var index = _.findIndex(_this.state.collaborators, { userId: parseInt(params.userId) });
                if (index!=-1)
                    _this.state.collaborators[index].role = role;
                    _this.setState({collaborators: _this.state.collaborators});*/
            }
        });
    },

    handleRemoveRole: function(e) {
        e.preventDefault();
        this.handleChangeRole("", {userId: e.target.getAttribute("data-userid")});
    },

    handleUnshareCollection: function(e) {
        e.preventDefault();

        var _this = this;
        Api.put("collection/"+this.state.collection._id+"/unshare", {}, function(json){
            //if (json.result){
                Toasts.show({text: t.s("unshareSuccess"), title: _this.state.collection.title});
                _this.loadCollaborators(true);
            //}
        });
    },

    handleEmailsChange: function(value) {
        this.state.invite.emails = value;
        this.setState({invite: this.state.invite});
    },

    handleChangeInviteRole: function(e) {
        this.state.invite.role = e.target.value;
        this.setState({invite: this.state.invite});
    },

    handleSendInvites: function(e) {
        e.preventDefault();
        var _this = this;

        this.state.invite.loading = true;
        this.setState({invite: this.state.invite});

        Api.get("collection/"+this.state.collection._id+"/invite?emails="+this.state.invite.emails+"&accesslevel="+this.state.invite.role, function(json){
            if (json.result){
                _this.state.invite.emails = "";

                Toasts.show({title: t.s("invitesSendTo"), text: json.emails.join(", ") });
            }else{
                Toasts.show({text: t.s("error"), status: "error"});
            }

            _this.state.invite.loading = false;
            _this.setState({invite: _this.state.invite});
        });
    },

    renderMember: function(item,first) {
        var actions = t.s("role_"+item.role);
        if (item.role!="owner" && this.state.collection.author)
            actions = (
                React.createElement("label", {className: "but select default onlyicons"}, 
                    React.createElement(Icon, {name: "settings", size: "mac"}), 
                    React.createElement(Icon, {name: "arrow-down", size: "small"}), 

                    React.createElement("select", {value: item.role, "data-userid": item._id, onChange: this.handleChangeRole}, 
                        React.createElement("optgroup", {label: t.s("withAccessLevel")}, 
                            item.role=="owner" ? React.createElement("option", {value: "owner"}, t.s("role_owner")) : null, 
                            React.createElement("option", {value: "member"}, t.s("role_member")), 
                            React.createElement("option", {value: "viewer"}, t.s("role_viewer"))
                        ), 

                        React.createElement("optgroup", {label: "⌘"}, 
                            React.createElement("option", {value: ""}, t.s("remove"))
                        )
                    )
                )
            );

        return (
            React.createElement("div", {className: "item "+(first?"first":"")}, 
                React.createElement("div", {className: "icon"}, 
                    React.createElement(Avatar, {src: item.email_MD5, size: "64"})
                ), 

                React.createElement("div", {className: "title"}, 
                    item.fullName, 
                    React.createElement("input", {type: "text", value: item.email, readonly: true, onFocus: this.handleSelectAll, onMouseUp: this.handleSelectAll})
                ), 

                React.createElement("div", {className: "actions"}, 
                    actions
                )
            )
        );
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
        var _this = this, collaborators = [], members = [], viewers = [];

        members = this.state.collaborators.filter(function(item){
            return ((item.role == "owner")||(item.role == "member"));
        });

        viewers = this.state.collaborators.filter(function(item){
            return (item.role == "viewer");
        });

        //Members
        if (members.length>0){
            collaborators.push(React.createElement("div", {className: "separator"}, t.s("role_members")));
            members.forEach(function(item,index) {collaborators.push(_this.renderMember(item, index==0));});
        }

        //Viewers
        if (viewers.length>0){
            collaborators.push(React.createElement("div", {className: "separator"}, t.s("role_viewer")));
            viewers.forEach(function(item,index) {collaborators.push(_this.renderMember(item, index==0));});
        }

        //Unshare button
        var unshare = null;
        if (this.state.collection.user["$id"] == UserStore.getUser()._id)
            unshare = React.createElement("a", {href: "", className: "but", onClick: this.handleUnshareCollection}, t.s("unshareCollection"));

        //Invite
        var invite = null;
        if (this.state.invite.emails.trim()!="") {
            unshare = null;

            if (!this.state.invite.loading)
                invite = React.createElement("a", {href: "", className: "but accent pull-right", onClick: this.handleSendInvites}, t.s("sendInvites"));
            else
                invite = React.createElement("div", {className: "pull-right"}, t.s("loading"));
        }

    	return (
    		React.createElement("div", {className: "pop-content"}, 
                React.createElement("div", {className: "pop-sticky-header"}, 
                    React.createElement("div", {className: "sticky-header"}, 
                        React.createElement("header", null, 
                            React.createElement("div", {className: "actions"}, 
                                React.createElement("a", {href: "", className: "but default onlyicons", onClick: this.props.goToForm}, React.createElement(Icon, {name: "back", size: "mac"}))
                            ), 
                            React.createElement("div", {className: "max title center"}, 
                                t.s("sharing")
                            ), 
                            React.createElement("div", {className: "actions"})
                        )
                    ), 

                    React.createElement("div", {className: "list"}, 
                        React.createElement("div", {className: "item first"}, 
                            React.createElement("div", {className: "icon"}, 
                                React.createElement("div", {className: "icon-link"}, React.createElement(Icon, {name: "link", size: "mac"}))
                            ), 

                            React.createElement("div", {className: "title"}, 
                                t.s("accessViaLink"), 
                                React.createElement("input", {type: "text", className: this.state.collection.public ? "" : "hidden", readOnly: true, autoFocus: true, value: network.fixURL("/collection/"+this.state.collection._id||""), onFocus: this.handleSelectAll, onMouseUp: this.handleSelectAll})
                            ), 

                            React.createElement("div", {className: "actions"}, 
                                React.createElement("div", {onClick: this.handleChangePublic, className: "extra-checkbox"+(this.state.collection.public?" active":"")})
                            )
                        ), 

                        collaborators, 


                        React.createElement("div", {className: "separator"}, t.s("inviteMorePeople")), 

                        React.createElement("div", {className: "item first"}, 
                            React.createElement("div", {className: "icon"}, 
                                React.createElement(Icon, {name: "add-box-clean", size: "mac", className: "icn-blue"})
                            ), 

                            React.createElement("div", {className: "title"}, 
                                React.createElement("textarea", {placeholder: t.s("enterEmails"), disabled: this.state.invite.loading, valueLink: {value: this.state.invite.emails, requestChange: this.handleEmailsChange}})
                            )
                        ), 

                        React.createElement("div", {className: "item " + (!invite ? "hidden" : null)}, 
                            React.createElement("div", {className: "icon"}, 
                                React.createElement(Icon, {name: "lock", size: "mac", className: "icn-blue"})
                            ), 

                            React.createElement("div", {className: "title"}, 
                                " "
                            ), 

                            React.createElement("div", {className: "actions"}, 
                                React.createElement("label", {className: "but select default"}, 
                                    t.s("role_"+this.state.invite.role), 
                                    React.createElement(Icon, {name: "arrow-down", size: "small"}), 

                                    React.createElement("select", {value: this.state.invite.role, onChange: this.handleChangeInviteRole}, 
                                        React.createElement("optgroup", {label: t.s("withAccessLevel")}, 
                                            React.createElement("option", {value: "member"}, t.s("role_member")), 
                                            React.createElement("option", {value: "viewer"}, t.s("role_viewer"))
                                        )
                                    )
                                )
                            )
                        ), 

                        React.createElement("footer", {className: !invite && !unshare ? "hidden" : null}, 
                            invite, 
                            unshare
                        )
                    )
                )
            )
    	);
    }
});

},{"../../../../actions/Collections":4,"../../Helpers/Avatar":37}],68:[function(require,module,exports){
var URL = require("./URL"),
	Collection = require("./Collection"),
    File = require("./File");

module.exports = React.createClass({
    displayName: "Pop/Fab",

    getInitialState: function() {
    	var tab = parseInt(this.props.tab || Api.getItem("fab-modal-tab") || 1);
    	if (this.props.onlyURL){
    		tab = 1;
    	}

    	return {
    		tab: tab,
    		hideTabs: (this.props.onlyURL ? true : false)
    	}
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    handleChangeTab: function(e) {
        e.preventDefault();
        var tab = parseInt(e.target.getAttribute("data-tab"));
        this.setState({tab: tab});

        Api.setItem("fab-modal-tab", tab);
    },

    render: function() {
    	var Component = URL;
    	switch(this.state.tab) {
    		case 2: Component = Collection; break;
            case 3: Component = File; break;
    	}

    	var tabs = null;
    	if (!this.state.hideTabs)
    		tabs = (
    			React.createElement("div", {className: "simple-tab"}, 
    				React.createElement("a", {href: "", "data-tab": "1", className: "item "+(this.state.tab==1?"active":""), onClick: this.handleChangeTab}, "URL"), 
    				React.createElement("a", {href: "", "data-tab": "2", className: "item "+(this.state.tab==2?"active":""), onClick: this.handleChangeTab}, t.s("nestedCollections")), 
                    React.createElement("a", {href: "", "data-tab": "3", className: "item "+(this.state.tab==3?"active":""), onClick: this.handleChangeTab}, "File")
                )
    		);

    	return (React.createElement("div", null, 
    		React.createElement("div", {className: "pop-content"}, 
    			tabs, 
    			React.createElement(Component, React.__spread({},  this.props, {isSubContent: true}))
    		)
    	));
    }
});

},{"./Collection":65,"./File":69,"./URL":73}],69:[function(require,module,exports){
var FileLimit = require("../Helpers/FileLimit");

module.exports = React.createClass({
    displayName: "Pop/File",

    handleFile: function(e) {
        var clean = dropfiles.validateFiles(React.findDOMNode(this.refs.file).files);
        window.dropFiles({files: clean});

        if (clean.length>0)
            Pop.close();
    },

    handleClose: function(e) {
        if (e) if (typeof e.preventDefault != "undefined") e.preventDefault();
        Pop.close();
    },

    componentDidMount: function() {
        window.addEventListener("fileDropped", this.handleClose, true);
    },

    componentWillUnmount: function() {
        window.removeEventListener("fileDropped", this.handleClose, true);
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
    	return (
            React.createElement("div", {className: (this.props.isSubContent ? "pop-sub-content":"pop-content")}, 
        		React.createElement("form", {style: {position:"relative"}}, 
                    React.createElement("header", null, 
                        React.createElement("div", {className: "max title"}, 
                            React.createElement("div", null, t.s("select")+" "+t.s("dropFilesHere").toLowerCase()), 
                            React.createElement("div", {style: {marginTop: "2px", opacity: .7, fontSize: "13px"}}, dropfiles.getHumanAcceptString())
                        )
                    ), 

                    React.createElement("div", {className: "entries"}, 
                        React.createElement("div", {className: "row "}, 
                            React.createElement("div", {className: "title"}, "Used"), 
                            React.createElement("div", {className: "content max"}, 
                                React.createElement(FileLimit, {style: {marginTop: "-4px"}})
                            )
                        )
                    ), 

        			React.createElement("footer", null, 
                        React.createElement("label", {className: "file-block but accent pull-right"}, 
                            t.s("select"), 
                            React.createElement("input", {type: "file", multiple: "multiple", accept: dropfiles.getAcceptString(), placeholder: "", ref: "file", onChange: this.handleFile})
                        ), 
                        React.createElement("a", {href: "", className: "but default pull-right", onClick: this.handleClose}, t.s("cancel"))
                    )
        		)
            )
    	);
    }
});

},{"../Helpers/FileLimit":43}],70:[function(require,module,exports){
/** @jsx React.DOM */
var UserActions = require('../../../actions/User');

module.exports = React.createClass({
    displayName: "Pop/Group",

    getInitialState: function() {
        return {
            step: "form",
            id: this.props.id,
            item: {
                title: t.s("newString")+" "+t.s("group").toLowerCase()
            }
        };
    },

    componentWillMount: function() {
        if (this.state.id!=-1){
            this.state.item.title = UserStore.getGroup(this.state.id).title;
        }
    },

    componentDidMount: function() {
        this.focusMainInput();
    },

    focusMainInput: function() {
        var _this = this;
        setTimeout(function() {
            var input = React.findDOMNode(_this.refs.title);
            if (input){
                input.focus();
                if (_this.state.id==-1)
                    input.setSelectionRange(0, input.value.length);
                else
                    input.setSelectionRange(input.value.length, input.value.length);
            }
        }, 0);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({id: nextProps.id});
    },

    handleTitleChange: function(value) {
        this.state.item.title = value;
        this.setState({item: this.state.item});
    },

    handleSave: function(e){
        e.preventDefault();

        if (this.state.id==-1){
            UserActions.insertGroup({item: this.state.item}, function(result) {
              if (result)
                window.location.reload();
            });
        }else{
            UserActions.updateGroup({item: this.state.item, id: this.state.id});
        }

        Pop.close();
    },

    handleRemoveGroup: function(e) {
        e.preventDefault();

        UserActions.removeGroup({id: this.state.id});
        Pop.close()
    },

    handleClose: function(e) {
        e.preventDefault();
        Pop.close();
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
        var removeGroup = null;
        if (this.state.id!=-1)
            removeGroup = React.createElement("a", {href: "", className: "but", onClick: this.handleRemoveGroup}, t.s("remove"));

        return (
            React.createElement("div", {className: "pop-content"}, 
                React.createElement("form", {onSubmit: this.handleSave}, 
                    React.createElement("header", null, 
                        React.createElement("div", {className: "max title"}, 
                            React.createElement("input", {type: "text", className: "important", required: true, autoFocus: true, valueLink: {value: this.state.item.title, requestChange: this.handleTitleChange}, ref: "title"})
                        )
                    ), 

                    React.createElement("footer", null, 
                        React.createElement("input", {type: "submit", className: "but accent pull-right", value: this.state.id > 0 ? t.s("save") : t.s("create")}), 
                        React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, t.s("cancel")), 

                        removeGroup
                    )
                )
            )
        );
    }
});

},{"../../../actions/User":14}],71:[function(require,module,exports){
var PopStore = require('../../../stores/Pop');
var gap = 10;
var updateTimeout = null,
    attached = false;
var OverflowScroll = require("../Helpers/OverflowScroll");

if ((window.environment||[]).indexOf("clipper")!=-1)
    gap = 0;

module.exports = React.createClass({
    displayName: "Pop/Pop",
	getInitialState: function() {
		return {
			params: PopStore.getParams()
		}
	},

	componentDidMount: function() {
		this.unsubscribePop = PopStore.listen(this.onPopChange);
		window.addEventListener("resize", this.afterComponentsUpdate);
        window.addEventListener("scroll", this.afterComponentsUpdate);
        window.addEventListener("wheel", this.afterComponentsUpdate);
	},

	componentWillUnmount: function() {
        this.unsubscribePop();
        window.removeEventListener("resize", this.afterComponentsUpdate);
        window.removeEventListener("scroll", this.afterComponentsUpdate);
        window.removeEventListener("wheel", this.afterComponentsUpdate);
    },

    onPopChange: function(params) {
    	var _this = this;

    	if (params == false){
    		//document.body.classList.add("pop-mode-will-close");
    		//setTimeout(function(){
    			_this.setState({params: params});
    		//	document.body.classList.remove("pop-mode-will-close");
    		//},200);
    	}else
    		this.setState({params: params});
    },

    afterComponentsUpdate: function() {
        this.updatePosition();
    	//clearTimeout(updateTimeout);
    	//updateTimeout = setTimeout(this.updatePosition, 0);
    },

    updatePosition: function() {
    	var body = React.findDOMNode(this.refs.body);
    	if (!body) return;


    	var positions = [],
            points = {},
    		havePlace = ((body.offsetWidth < window.innerWidth)&&(body.offsetHeight < window.innerHeight)),
    		pinVisible = false,
    		dir = "";

    	var pin = document.getElementById(this.state.params.pin);

    	//Possible positions
    	if (pin){
    		var rect = pin.getBoundingClientRect();
    		pinVisible = (((window.innerHeight + window.pageYOffset) > (rect.top+window.scrollY)) && ((window.pageYOffset - window.innerHeight) < (rect.top + window.scrollY + pin.offsetHeight) ));
    	
    		if ((body.offsetHeight < rect.top)&&(havePlace)&&(pinVisible)){
                points.top = rect.top;
	    		positions.push("top");
            }

	    	if ((body.offsetWidth < rect.left)&&(havePlace)&&(pinVisible)){
                points.left = rect.left;
	    		positions.push("left");
            }

	    	if (((rect.left + pin.offsetWidth + body.offsetWidth) < window.innerWidth)&&(havePlace)&&(pinVisible)){
                points.right = window.innerWidth - (rect.left + pin.offsetWidth);
	    		positions.push("right");
            }

	    	if (((rect.top + pin.offsetHeight + body.offsetHeight) < window.innerHeight)&&(havePlace)&&(pinVisible)){
                points.bottom = window.innerHeight - (rect.top + pin.offsetHeight);
	    		positions.push("bottom");
            }
    	}

    	if ((havePlace)/*&&(pinVisible)*/) {
    		positions.push("center");
            points.center = 0;
        }

        var max = -1;

        if (this.state.params.force == "vertical") {
            if (points.bottom)
                points.bottom+=10000;
            else if (points.top)
                points.top+=10000;
        }

        for(var i in points)
            if (points[i]>max){
                max = points[i];
                dir = i;
            }

        /*if (dir==""){
            Pop.close();
            return;
        }*/

    	//Make magic
    	//body.removeAttribute("style");
    	body.setAttribute("data-dir", dir);

    	switch(dir) {
    		case "top":
    			body.style.bottom = parseInt(window.innerHeight - rect.top - gap)+"px";
                body.style.top = "";
    		break;

    		case "bottom":
    			body.style.top = parseInt(rect.top + pin.offsetHeight - gap)+"px";
                body.style.bottom = "";
    		break;

    		case "left":
    			body.style.right = parseInt(window.innerWidth - rect.left + gap)+"px";
                body.style.left = "";
    		break;

    		case "right":
    			body.style.left = parseInt(rect.left + pin.offsetWidth - gap)+"px";
                body.style.right = "";
    		break;

    		case "center":
    			body.style.left = parseInt((window.innerWidth / 2) - (body.offsetWidth/2))+"px";
    			body.style.top = parseInt((window.innerHeight / 2) - (body.offsetHeight/2)) + "px";
                body.style.right = "";
                body.style.bottom = "";
    		break;

    		default:
    			body.style.left = 0;
    			body.style.top = 0;
                body.style.right = "";
                body.style.bottom = "";
    		break;
    	}

    	var arrow = React.findDOMNode(this.refs.arrow);
    	//arrow.removeAttribute("style");

    	switch(dir) {
    		case "left":
    		case "right":
    			var tempTop = parseInt(rect.top + (pin.offsetHeight/2) - (body.offsetHeight/2));
    			if ((tempTop+body.offsetHeight) > window.innerHeight)
    				tempTop = window.innerHeight - body.offsetHeight - gap;
    			if (tempTop<0) tempTop = gap;
    			body.style.top = tempTop + "px";

    			arrow.style.top = parseInt( rect.top - tempTop + (pin.offsetHeight/2) + 5 )+"px";
                arrow.style.left = "";
    		break;

    		case "top":
    		case "bottom":
    			var tempLeft = parseInt(rect.left + (pin.offsetWidth/2) - (body.offsetWidth/2));
    			if ((tempLeft+body.offsetWidth) > window.innerWidth)
    				tempLeft = window.innerWidth - body.offsetWidth - gap;
    			if (tempLeft<0)
    				tempLeft = gap;
    			body.style.left = tempLeft + "px";

    			arrow.style.left = parseInt(rect.left - tempLeft + (pin.offsetWidth/2))+"px";
                arrow.style.top = "";
    		break;
    	}
    },

    componentDidUpdate: function() {
    	this.afterComponentsUpdate();
    	//body.offsetWidth;
    },

    canCloseSmoothly: function() {
        return true/*((this.state.params.name!="URL")&&(this.state.params.name!="fab"))*/;
    },

    handleBeyondClick: function(e) {
        var body = React.findDOMNode(this.refs.body);
        if (!body) return;

        var rect = body.getBoundingClientRect();

        var mouseOver = ((e.clientX > rect.left) && (e.clientX < (rect.left+body.offsetWidth)) && (e.clientY > rect.top) && (e.clientY < (rect.top+body.offsetHeight)));

		//if (e.target.id=="pop-body-black")
        if (!mouseOver)
            if (this.canCloseSmoothly())
			 Pop.close();
	},

    handleGlobalKeyPress: function(e) {
        if (e.keyCode==27)
            //if (this.canCloseSmoothly())
                Pop.close();
    },

	render: function() {
		if (!this.state.params){
            //if ((window.environment||[]).indexOf("clipper")!=-1)
                document.body.classList.remove("pop-mode");
            document.body.removeEventListener("mousedown", this.handleBeyondClick);
            document.removeEventListener("keyup", this.handleGlobalKeyPress);

            attached = false;
			return null;
		}

        var bodyBlack = null;
        if (((window.environment||[]).indexOf("clipper")!=-1)||(!this.canCloseSmoothly())) {
            document.body.classList.add("pop-mode");
            bodyBlack = React.createElement("div", {id: "pop-body-black", onMouseDown: this.handleBeyondClick});
        }

        if (!attached){
            attached = true;
            document.body.addEventListener("mousedown", this.handleBeyondClick);
            document.addEventListener("keyup", this.handleGlobalKeyPress);
        }

		var Component = null;
		switch(this.state.params.name){
			case "bookmark": Component = require("./Bookmark"); break;
            case "collection": Component = require("./Collection"); break;
            case "group": Component = require("./Group"); break;
            case "URL": Component = require("./URL"); break;
            case "fab": Component = require("./Fab"); break;
            case "saveas": Component = require("./SaveAs"); break;
		}

		return (
			React.createElement("div", {key: "pop"}, 
				bodyBlack, 
				React.createElement("div", {id: "pop-body", "data-name": this.state.params.name, ref: "body"}, 
					React.createElement("div", {id: "pop-arrow", ref: "arrow"}), 
					React.createElement(OverflowScroll, null, 
						Component ? React.createElement(Component, React.__spread({},  this.state.params, {onUpdate: this.afterComponentsUpdate})) : null
					)
				)
			)
		);
	}
});

},{"../../../stores/Pop":119,"../Helpers/OverflowScroll":46,"./Bookmark":63,"./Collection":65,"./Fab":68,"./Group":70,"./SaveAs":72,"./URL":73}],72:[function(require,module,exports){
var BookmarksActions = require('../../../actions/Bookmarks');
var CollectionsStore = require('../../../stores/Collections');
var ParentsStore = require('../../../stores/Parents');
var checking = false;
var canEdit = true;

module.exports = React.createClass({
    displayName: "Pop/SaveAs",

    getInitialState: function() {
        return {
            id: 0,
            step: "loading"
        }
    },

    onUserChange: function() {
        this.checkURL();
    },

    onCollectionsChange: function() {
        if (this.isMounted())this.setState({
            id: this.state.id
        });
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        this.checkURL();
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
        this.unsubscribeCollections();
    },

    checkURL: function() {
        if (checking) return;
        if (!UserStore.isLogged()) return;
        if (this.state.step == "edit") return;

        checking = true;

        var _this = this;
        var _query = this.props.query;
        if (_query.url){
            BookmarksActions.loadBookmark({url: _query.url, nohtml: true}, function(bookmark) {
                if (bookmark){
                    checking = false;
                    _this.setState({step: "edit", id: bookmark._id, item: bookmark, already: true})
                }
                else
                    BookmarksActions.parseURL({item: {url: _query.url}}, function(item){
                        checking = false;

                        if (item){
                            item.collectionId = parseInt(Api.getItem("last_collection")||0)||-1;

                            BookmarksActions.insertBookmark({item: item, silent: true}, function(result){
                                if (result){
                                    _this.setState({step: "edit", id: result._id, item: item});
                                }else{
                                    Api.removeItem("last_collection");
                                    _this.setState({step: "unsupported"});
                                }
                            });
                        }else{
                            _this.setState({step: "unsupported"});
                            Toasts.show({text: t.s('supportOnlyUrls'), step:"error"});
                        }
                    });
            });
        }
    },

    handleEdit: function(e) {
        if (!canEdit) return;
        if (e) e.preventDefault();
        Pop.show("bookmark", {id: this.state.id, silent: true, onClose: this.props.onClose});
    },

    handleClose: function(e) {
        if (e) e.preventDefault();
        if (typeof this.props.onClose == "function")
            this.props.onClose();
        else
            Pop.close();
    },

    closeOver: function() {
        canEdit = false;
    },

    closeLeave: function() {
        canEdit = true;
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
        var content = React.createElement("div", {className: "content"});
        
        switch(this.state.step){
            case "unsupported":
                content = (
                    React.createElement("div", {className: "content", onClick: this.handleClose}, 
                        React.createElement("div", {className: "cover"}, 
                            React.createElement(Icon, {name: "minus-box-clean", size: "mac"})
                        ), 

                        React.createElement("div", {className: "title"}, 
                            React.createElement("strong", null, t.s("error")), 
                            React.createElement("div", {className: "subinfo"}, t.s("serverundefined"))
                        ), 

                        React.createElement("a", {href: "", className: "close"}, 
                            React.createElement(Icon, {name: "clear", size: "mac"})
                        )
                    )
                );
            break;

            case "edit":
                var collection = CollectionsStore.getCollection(this.state.item.collectionId);
                if (collection==null) {
                    CollectionsStore.onLoadId(this.state.item.collectionId);
                    collection = {title: ""};
                }

                var cover = consts.defaultCollectionIcon();
                try{cover = network.fixURL(collection.cover[0]);}catch(e){}

                var savedText = t.s(this.state.item.type+"Saved")+" "+t.s("to");
                if (this.state.already)
                    savedText = t.s("alreadyInCollection");

                content = (
                    React.createElement("div", {className: "content", onClick: this.handleEdit}, 
                        React.createElement("div", {className: "cover"}, 
                            React.createElement("img", {className: "small-icon", src: cover, alt: ""})
                        ), 

                        React.createElement("div", {className: "title"}, 
                            React.createElement("strong", null, savedText, " ", React.createElement("b", null, collection.title)), 
                            React.createElement("div", {className: "subinfo"}, t.s("alreadyInCollectionD"))
                        ), 

                        React.createElement("a", {href: "", className: "close", onClick: this.handleClose, onMouseOver: this.closeOver, onMouseLeave: this.closeLeave}, 
                            React.createElement(Icon, {name: "done-circle", size: "mac"})
                        )
                    )
                );
            break;
        }

        var className = "";
        if (this.state.step == "loading")
            className = "mini";
        else if (this.state.step == "edit")
            className = "done";

        return (
            React.createElement("div", {className: "pop-saver "+className}, 
                React.createElement(Icon, {name: "preloader-circle", className: "colorful-preloader", size: "big"}), 
                content
            )
        );
    }
});

},{"../../../actions/Bookmarks":2,"../../../stores/Collections":115,"../../../stores/Parents":118}],73:[function(require,module,exports){
var BookmarksActions = require('../../../actions/Bookmarks');
var ParentsStore = require('../../../stores/Parents');

module.exports = React.createClass({
    displayName: "Pop/URL",

    getInitialState: function() {
        var cid = parseInt(this.props.parentId || -1);

        return {
            loading: false,
            item: {
                url: "",
                collectionId: cid
            }
        };
    },

    componentDidMount: function() {
        this.focusMainInput();
    },

    focusMainInput: function() {
        var _this = this;
        setTimeout(function() {
            var a = React.findDOMNode(_this.refs.url);
            if (a) a.focus();
        }, 0);
    },

    handleURLChange: function(value) {
        this.state.item.url = value;
        this.setState({item: this.state.item});
    },

    handleSave: function(e) {
        e.preventDefault();

        var _this = this;
        this.setState({loading: true});

        BookmarksActions.parseURL({item: this.state.item}, function(item){
            if (item){
                item.collectionId = _this.state.item.collectionId;
                var dontAdd = (parseInt(item.collectionId) != parseInt(_this.props.parentId));

                BookmarksActions.insertBookmark({item: item, dontAdd: dontAdd, possibleWithoutAuth: (item.collectionId==-2), toEndOfList: (item.collectionId==-2) }, function(result){
                    if (result){
                        if (item.collectionId != -2){
				          ParentsStore.reset();
				          window.location.hash="#/collection/"+item.collectionId;
				          //this.props.router.transitionTo('collection', {cId: cId});
				        }
				        else{
				          window.location.hash="#/";
				          //this.props.router.transitionTo('app');
				          BookmarksActions.saveAllSort();
				        }

				        Pop.close();
                    }
                    _this.setState({loading: false});
                });
            }else{
                _this.setState({loading: false});
                Toasts.show({text: t.s('supportOnlyUrls'), status:"error"});
            }
        });
    },

    handleClose: function(e) {
        e.preventDefault();
        Pop.close();
    },

    componentDidUpdate: function() {
        this.props.onUpdate();
    },

    render: function() {
    	return (React.createElement("div", null, 
    		React.createElement("div", {className: (this.props.isSubContent ? "pop-sub-content":"pop-content")+" "+(this.state.loading ? "invisible" : null)}, 
	            React.createElement("form", {onSubmit: this.handleSave}, 
	                React.createElement("header", null, 
	                    React.createElement("div", {className: "max title"}, 
	                        React.createElement("input", {type: "text", className: "important", required: true, autoFocus: true, valueLink: {value: this.state.item.url, requestChange: this.handleURLChange}, ref: "url", placeholder: t.s("enterLink") + " (URL)"})
	                    )
	                ), 

	                React.createElement("div", {className: "entries"}, 
                        React.createElement("div", {className: "row "}, 
                            React.createElement("div", {className: "title"}, t.s("more")), 
                            React.createElement("div", {className: "content max"}, 
                                React.createElement("a", {href: consts.getImportLink(), target: "_blank", className: "block-link"}, React.createElement(Icon, {name: "import", size: "mac", className: "content-icon icn-blue"}), t.s("importBookmarks")), 
                                React.createElement("br", null), 
                                React.createElement("a", {href: network.settingsURL()+"/install", target: "_blank", className: "block-link"}, React.createElement(Icon, {name: "install", size: "mac", className: "content-icon icn-green"}), t.s("browserExtension"), ", ", t.s("mobileApp").toLowerCase())
                            )
                        )
                    ), 

	                React.createElement("footer", null, 
	                    React.createElement("input", {type: "submit", className: "but accent pull-right", value: t.s("add")}), 
	                    React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, t.s("cancel"))
	                )
	            )
	        ), 
	        React.createElement("div", {className: "pop-loader "+(this.state.loading ? null : "hidden")}, 
	        	React.createElement("div", {className: "pop-content"}, React.createElement("a", {href: "", onClick: this.handleClose, className: "but default pull-right"}, t.s("cancel")))
	        )
        ));
    }
});

},{"../../../actions/Bookmarks":2,"../../../stores/Parents":118}],74:[function(require,module,exports){
var PopoverMixin = require("./Mixin");


module.exports = React.createClass({
	displayName: "Popovers/Bookmark",

	mixins: [PopoverMixin],

	handleClick: function(e) {
		e.preventDefault();
	},

	handleCopyToClipboard: function(e) {
		e.preventDefault();
		strings.copyTextToClipboard(this.props.link);
		this.props.onClose();
	},

	handleEdit: function(e) {
		e.preventDefault();
		this.props.handleEdit(e);
		this.props.onClose();
	},

	handleRemove: function(e) {
		e.preventDefault();
		this.props.handleRemove(e);
		this.props.onClose();
	},

	render: function() {
		if (this.props.show)
    		return this._makeWrap(
    			React.createElement("div", {className: "picker-list"}, 
    				/*<div className="section" style={{margin:0}}>{this.props.link}</div>*/

	  				React.createElement("div", {className: "item"}, 
	  					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "open-link", size: "mac"})), 
						React.createElement("div", {className: "title"}, 
							t.s("openInBrowser")
						), 
						React.createElement("a", {href: this.props.link, target: "_blank", className: "permalink", onClick: this.props.onClose})
			        ), 

			        React.createElement("div", {className: "item"}, 
			        	React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "link", size: "mac"})), 
						React.createElement("div", {className: "title"}, 
							t.s("copyLinkToClipboard")
						), 
						React.createElement("a", {href: "", className: "permalink", onClick: this.handleCopyToClipboard})
			        ), 

			        React.createElement("div", {className: "separator"}), 

			        React.createElement("div", {className: "item"}, 
			        	React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "edit", size: "mac"})), 
						React.createElement("div", {className: "title"}, 
							t.s("edit")
						), 
						React.createElement("a", {href: "", className: "permalink", onClick: this.handleEdit})
			        ), 

			        React.createElement("div", {className: "item"}, 
			        	React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "trash", size: "mac"})), 
						React.createElement("div", {className: "title"}, 
							t.s("remove")
						), 
						React.createElement("a", {href: "", className: "permalink", onClick: this.handleRemove})
			        )
	  			)
    		);
    	else
    		return null;
	}
});

},{"./Mixin":78}],75:[function(require,module,exports){
var PopoverMixin = require("./Mixin");
var CollectionsStore = require('../../../stores/Collections');

var _sorting = [];

var setDefaults = function() {
  _sorting = [
      {
          key: "sort",
          value: t.s("custom")
      },
      {
          key: "lastUpdate",
          value: t.s("byDate")
      },
      {
          key: "title",
          value: t.s("byName")
      }
  ];
}

if (document)
    if (window.languageLoaded)
        setDefaults();
    else
        window.addEventListener("langLoaded", setDefaults);
else
    setDefaults();

module.exports = React.createClass({
  displayName: "Popovers/Collection",

  mixins: [PopoverMixin],

  handleSortChange: function(e) {
    if (e) if (e.preventDefault) e.preventDefault();
    this.props.handleSortChange(e.target.getAttribute("data-sort"));
    this.props.onClose();
  },

  handleEdit: function(e) {
    if (e) if (e.preventDefault) e.preventDefault();
    this.props.handleEdit();
    this.props.onClose();
  },

  handleShare: function(e) {
    if (e) if (e.preventDefault) e.preventDefault();
    this.props.handleEdit(undefined, "sharing");
    this.props.onClose();
  },

  handleViewModalShow: function(e) {
    if (e) if (e.preventDefault) e.preventDefault();
    this.props.handleViewModalShow();
    this.props.onClose();
  },

  handleAddFolder: function(e) {
    if (e) if (e.preventDefault) e.preventDefault();
    this.props.handleAddFolder();
    this.props.onClose();
  },

  render: function() {
    if (this.props.show){
      var _this = this;
      var sort = _sorting.map(function(item){
        return (
          React.createElement("div", {className: "item"}, 
              React.createElement("div", {className: "icon"}, (_this.props.sortSelected == item.key ? React.createElement(Icon, {name: "done"}):null)), 
              React.createElement("div", {className: "title", style: {textTransform: "capitalize"}}, 
                  item.value
              ), 
              React.createElement("a", {href: "", className: "permalink", "data-sort": item.key, onClick: _this.handleSortChange})
          )
        );
      });
      if ((this.props.collection._id == 0)||
          (this.props.collection._id == -99))
        sort.splice(0,1);

      var onlyBasic = this.props.onlyBasic;

      return this._makeWrap(
        React.createElement("div", {className: "picker-list"}, 
          /*<div className="section" style={{margin:0}}>{this.props.collection.title}</div>*/

          React.createElement("div", {className:  ((window.environment||[]).indexOf("mobile")!=-1) ? "hidden" : "item"}, 
              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "open-link", size: "mac"})), 
              React.createElement("div", {className: "title"}, 
                  t.s("openInBrowser")
              ), 
              React.createElement("a", {href: network.fixURL("/app#/collection/"+this.props.collection._id), target: "_blank", onClick: this.props.onClose, className: "permalink"})
          ), 

          React.createElement("div", {className: this.props.collection.author && !onlyBasic ? "item" : "hidden"}, 
              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "folder-add", size: "mac"})), 
              React.createElement("div", {className: "title"}, 
                  t.s("createSubFolder")
              ), 
              React.createElement("a", {href: "", className: "permalink", onClick: this.handleAddFolder})
          ), 

          React.createElement("div", {className: this.props.collection.author ? "item" : "hidden"}, 
              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "edit", size: "mac"})), 
              React.createElement("div", {className: "title"}, 
                  t.s("collectionEdit")
              ), 
              React.createElement("a", {href: "", className: "permalink", onClick: this.handleEdit})
          ), 

          React.createElement("div", {className: this.props.collection.author ? "item" : "hidden"}, 
              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "share", size: "mac"})), 
              React.createElement("div", {className: "title"}, 
                  t.s("sharing")
              ), 
              React.createElement("a", {href: "", className: "permalink", onClick: this.handleShare})
          ), 

          React.createElement("div", {className: !onlyBasic ? "item" : "hidden"}, 
              React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: this.props.collection.view})), 
              React.createElement("div", {className: "title"}, 
                  t.s("view")
              ), 
              React.createElement("a", {href: "", className: "permalink", onClick: this.handleViewModalShow})
          ), 
          
          React.createElement("span", {className: !onlyBasic ? "" : "hidden"}, 
          React.createElement("div", {className: "separator"}), 
          React.createElement("div", {className: "section"}, t.s("collectionsSorting")), 
          sort
          )
        )
      );
    }
    else
      return null;
  }
});

},{"../../../stores/Collections":115,"./Mixin":78}],76:[function(require,module,exports){
var PopoverMixin = require("./Mixin");
var CollectionsStore = require('../../../stores/Collections');

var _sorting = [];

var setDefaults = function() {
  _sorting = [
      {
          key: "sort",
          value: t.s("custom")
      },
      {
          key: "lastUpdate",
          value: t.s("byDate")
      },
      {
          key: "title",
          value: t.s("byName")
      }
  ];
}

if (document)
    if (window.languageLoaded)
        setDefaults();
    else
        window.addEventListener("langLoaded", setDefaults);
else
    setDefaults();

module.exports = React.createClass({
  displayName: "Popovers/Collection",

  mixins: [PopoverMixin],

  handleSortChange: function(e) {
    e.preventDefault();
    this.props.handleSortChange(e.target.getAttribute("data-sort"));
    this.props.onClose();
  },

  handleEdit: function(e) {
    e.preventDefault();
    this.props.handleEdit();
    this.props.onClose();
  },

  handleShare: function(e) {
    e.preventDefault();
    this.props.handleEdit(undefined,"sharing");
    this.props.onClose();
  },

  handleViewModalShow: function(e) {
    e.preventDefault();
    this.props.handleViewModalShow();
    this.props.onClose();
  },

  handleAddFolder: function(e) {
    e.preventDefault();
    this.props.handleAddFolder();
    this.props.onClose();
  },

  render: function() {
    if (this.props.show){
      var _this = this;
      var sort = _sorting.map(function(item){
        return (
          React.createElement("div", {className: "item"}, 
              React.createElement("div", {className: "icon"}, (_this.props.sortSelected == item.key ? React.createElement(Icon, {name: "done"}):null)), 
              React.createElement("div", {className: "title", style: {textTransform: "capitalize"}}, 
                  item.value
              ), 
              React.createElement("a", {href: "", className: "permalink", "data-sort": item.key, onClick: _this.handleSortChange})
          )
        );
      });
      if ((this.props.collection._id == 0)||
          (this.props.collection._id == -99))
        sort.splice(0,1);

      var onlyBasic = this.props.onlyBasic;

      var fastLinks = [];
      if (this.props.collection.author){
        fastLinks.push(
          React.createElement("a", {href: "", onClick: this.handleEdit, className: "item"}, 
              React.createElement("span", {className: "icon blue"}, React.createElement(Icon, {name: "edit"})), 
              React.createElement("span", {className: "title"}, t.s("collectionEdit"))
          )
        );

        fastLinks.push(
          React.createElement("a", {href: "", onClick: this.handleShare, className: "item"}, 
              React.createElement("span", {className: "icon tomato"}, React.createElement(Icon, {name: "share"})), 
              React.createElement("span", {className: "title"}, t.s("sharing"))
          )
        );
      }

      if ((window.environment||[]).indexOf("mobile")==-1){
        fastLinks.push(
          React.createElement("a", {href: network.fixURL("/app#/collection/"+this.props.collection._id), target: "_blank", onClick: this.props.onClose, className: "item"}, 
              React.createElement("span", {className: "icon asphalt"}, React.createElement(Icon, {name: "open-link"})), 
              React.createElement("span", {className: "title"}, t.s("openInBrowser"))
          )
        );
      }

      if (this.props.collection.author && !onlyBasic){
        fastLinks.push(
          React.createElement("a", {href: "", onClick: this.handleAddFolder, className: "item"}, 
              React.createElement("span", {className: "icon green"}, React.createElement(Icon, {name: "folder-add"})), 
              React.createElement("span", {className: "title"}, t.s("createSubFolder"))
          )
        );
      }

    	return this._makeWrap(
      React.createElement("div", null, 
        React.createElement("div", {className: "fast-links"}, 
          fastLinks
        ), 

        React.createElement("div", {className: "picker-list"}, 
          React.createElement("div", {className: "section"}, t.s("view"))
        ), 

        React.createElement("div", {className: "picker-list"}, 
          React.createElement("span", {className: !onlyBasic ? "" : "hidden"}, 
          React.createElement("div", {className: "separator"}), 
          React.createElement("div", {className: "section"}, t.s("collectionsSorting")), 
          sort
          )
        )
      )
      );
    }
    else
      return null;
  }
});

},{"../../../stores/Collections":115,"./Mixin":78}],77:[function(require,module,exports){
var PopoverMixin = require("./Mixin");

module.exports = React.createClass({
  displayName: "Popovers/Font",

  mixins: [PopoverMixin],

  handleFontColor: function(e) {
    e.preventDefault();
    this.props.handleFontColor(e.target.getAttribute("data-color"));
  },

  handleFontFamily: function(e) {
    e.preventDefault();
    this.props.handleFontFamily(e.target.getAttribute("data-family"));
  },

  render: function() {
    if (this.props.show)
    	return this._makeWrap(
        React.createElement("div", null, 
          React.createElement("div", {className: "font-edit popover-font-size"}, 
            React.createElement("a", {href: "", className: "action-icon", onClick: this.props.handleDicrementFont}, React.createElement(Icon, {name: "minus-box-clean", size: "mac"})), 
            React.createElement("div", null, t.s("fontSize")), 
            React.createElement("a", {href: "", className: "action-icon", onClick: this.props.handleIncrementFont}, React.createElement(Icon, {name: "add-box-clean", size: "mac"}))
          ), 

          React.createElement("div", {className: "font-edit"}, 
            React.createElement("a", {href: "", className: "item orange "+(this.props.fontColor == "" ? "active" : ""), "data-color": "", onClick: this.handleFontColor}, React.createElement(Icon, {name: "sun", size: "big"})), 
            React.createElement("a", {href: "", className: "item red "+(this.props.fontColor == "sunset" ? "active" : ""), "data-color": "sunset", onClick: this.handleFontColor}, React.createElement(Icon, {name: "sunset", size: "big"})), 
            React.createElement("a", {href: "", className: "item "+(this.props.fontColor == "night" ? "active" : ""), "data-color": "night", onClick: this.handleFontColor}, React.createElement(Icon, {name: "moon", size: "big"}))
          ), 

          React.createElement("div", {className: "font-edit"}, 
            React.createElement("a", {href: "", className: "family "+(this.props.fontFamily == "" ? "active" : ""), "data-family": "", onClick: this.handleFontFamily}, "Aa"), 
            React.createElement("a", {href: "", className: "family georgia "+(this.props.fontFamily == "georgia" ? "active" : ""), "data-family": "georgia", onClick: this.handleFontFamily}, "Aa"), 
            React.createElement("a", {href: "", className: "family helvetica "+(this.props.fontFamily == "helvetica" ? "active" : ""), "data-family": "helvetica", onClick: this.handleFontFamily}, "Aa"), 
            React.createElement("a", {href: "", className: "family verdana "+(this.props.fontFamily == "verdana" ? "active" : ""), "data-family": "verdana", onClick: this.handleFontFamily}, "Aa")
          )
        )
      );
    else
      return null;
  }
});

},{"./Mixin":78}],78:[function(require,module,exports){
var RenderInBody = require("../Helpers/RenderInBody");

module.exports = {
	handleBeyondClick: function(e) {
		if (e.target.className=="popover")
			this.props.onClose();
	},

	handleContext: function(e){
		e.preventDefault();
		this.props.onClose();
	},

	handleWeel: function(e) {
		e.preventDefault();
		return;
	},

	_makeWrap: function(html) {
	    var div = document.getElementById(this.props.attachId);
	    var rect = {};
	    if (div == null) div = {}; else rect = div.getBoundingClientRect();

	    var fixPosition = this.props.position;

	    if (this.props.mousePos){
	      var pos = {
	        left: window.mousePos.x, top: window.mousePos.y
	      }
	    }
	    else{
	  		var pos = {
	  			left: rect.left||0, top: rect.top||0
	  		};
	  		pos.top += div.offsetHeight;
	    }

	    //fix position
	    if (pos.left<200) {
	    	fixPosition = "left";
	    }
	    else if ((pos.left+200 > window.innerWidth)&&(fixPosition=="left")) {
	    	fixPosition = "";
	    	//pos.left = pos.left - 300;
	    }

	    if (pos.top+300 > window.innerHeight)
	    	pos.top = pos.top - 150;

		return (
			React.createElement(RenderInBody, {name: "popover", category: (this.props.attachId||"")}, React.createElement("div", {className: "popover", id: "popover-for-"+(this.props.attachId||""), onClick: this.handleBeyondClick, onContextMenu: this.handleContext, onWheel: this.handleWeel}, 
				React.createElement("div", {className: "popover-wrap", style: {top: pos.top+"px", left: pos.left+"px", width: div.offsetWidth}}, 
					React.createElement("div", {className: "popover-body popover-pos-"+fixPosition}, 
						html
					)
				)
			))
		);

	    return null;
	}
};

},{"../Helpers/RenderInBody":47}],79:[function(require,module,exports){
var PopoverMixin = require("./Mixin");
var UserActions = require('../../../actions/User');

module.exports = React.createClass({
  displayName: "Popovers/Collection",

  mixins: [PopoverMixin],

  handleLogOut: function(e) {
    e.preventDefault();
    var _this = this;

    UserActions.logOut(function(){
      location.hash="#/";
      location.reload();
    });
  },

  handleClick: function(e) {
  	if ((window.environment||[]).indexOf("clipper")!=-1)
  	{
  		e.preventDefault();
  		e.stopPropagation();
  		BrowserBridge.openURL(e.target.href);
  	}
  	
  	this.props.onClose();
  },

  render: function() {
  	var sURL = network.settingsURL();
  	var _target = "_self";
  	if ((window.environment||[]).indexOf("clipper")!=-1){
  		_target = "_blank";
  	}

  	var pro=null;
  	if ((window.environment||[]).indexOf("mac")==-1)
  	pro = (
  		React.createElement("div", {className: "item " + (UserStore.isLogged() ? "" : "hidden")}, 	
  			React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "pro", size: "mac"})), 
			React.createElement("div", {className: "title"}, 
				React.createElement("strong", null, t.s("upgradeAccount"))
			), 
			React.createElement("a", {href: sURL + "/pro", target: _target, className: "permalink", onClick: this.handleClick})
        )
  	);

  	if (this.props.show)
	  	return this._makeWrap(
	  		React.createElement("div", {className: "picker-list"}, 
	  			React.createElement("div", {className: "section", style: {margin:0}}, UserStore.getUser().email||UserStore.getUser().fullName||t.s("settings")), 

	  			pro, 

	  			React.createElement("div", {className: "item " + (UserStore.isLogged() ? "" : "hidden")}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "settings", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("settings") + " " + t.s("und") + " " + t.s("profile").toLowerCase()
					), 
					React.createElement("a", {href: sURL, target: _target, className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "item " + (((window.environment||[]).indexOf("clipper")==-1) && ((window.environment||[]).indexOf("mac")==-1) ? "" : "hidden")}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "web", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("background")
					), 
					React.createElement("a", {href: "#/interface", className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "separator"}), 

		        React.createElement("div", {className: "item " + (UserStore.isLogged() ? "" : "hidden")}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "import", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("importBookmarks")
					), 
					React.createElement("a", {href: sURL+"/import", target: _target, className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "item " + (UserStore.isLogged() ? "" : "hidden")}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "export", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("exportBookmarks")
					), 
					React.createElement("a", {href: sURL+"/export", target: _target, className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "separator"}), 

		        React.createElement("div", {className: "item"}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "install", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("install"), 
						React.createElement("div", {style: {fontSize: "13px", opacity: ".7"}}, 
							t.s("browserExtension"), React.createElement("br", null), 
							t.s("und"), " ", t.s("mobileApp").toLowerCase()
						)
					), 
					React.createElement("a", {href: sURL+"/install", target: _target, className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "item"}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "help", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("help")
					), 
					React.createElement("a", {href: sURL+"/help", target: _target, className: "permalink", onClick: this.handleClick})
		        ), 

		        React.createElement("div", {className: "item " + (UserStore.isLogged() ? "actions" : "hidden")}, 
					React.createElement("div", {className: "icon"}, React.createElement(Icon, {name: "exit", size: "mac"})), 
					React.createElement("div", {className: "title"}, 
						t.s("logOut")
					), 
					React.createElement("a", {href: "", className: "permalink", onClick: this.handleLogOut})
		        )
	  		)
	  	);
  	else
  		return null;
  }
});

},{"../../../actions/User":14,"./Mixin":78}],80:[function(require,module,exports){
/** @jsx React.DOM */
var Cover = require("../Helpers/Cover"),
    Favicon = require("../Helpers/Favicon");

module.exports = React.createClass({
  displayName: "Search/Item",

    getInitialState: function() {
        return {item: this.props.item, active: this.props.active, index: this.props.index};
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState({item:nextProps.item, active:nextProps.active, index:nextProps.index});
    },

    handleClick: function(e) {
        var result = this.props.onClick(this.props.item.gist, (this.props.item.gist == "word" ? this.props.item.title : this.props.item._id));
        if (!result)
            e.preventDefault();
    },

    render: function() {
        function createMarkup(html) { return {__html: html}; };

        var favicon = (this.state.item.domain?React.createElement(Favicon, {domain: this.state.item.domain||"", className: "icon"}):null);
        var cover = React.createElement(Cover, {src: this.state.item.image, className: "image", width: "100"});

        if (this.state.item.icon){
            if (this.state.item.icon.indexOf("http")==0)
                cover = React.createElement("div", {className: "small-icon", style: {backgroundImage: "url('"+this.state.item.icon+"')"}});
            else
                cover = React.createElement(Icon, {name: this.state.item.icon})
        }

        var excerpt = null;
        if (this.state.item.excerpt)
          excerpt = React.createElement("div", {className: "excerpt", dangerouslySetInnerHTML: createMarkup(this.state.item.excerpt||"")});

        var className = "item searchResultItem";
        if (this.state.active)
          className += " active";
        if (this.state.item.className)
          className += " "+this.state.item.className;

        return (
            React.createElement("figure", {className: className, id: "searchResultItem_"+this.state.index}, 
                React.createElement("div", {className: "cover"}, 
                    cover, 
                    favicon
                ), 
                React.createElement("figcaption", {className: "about"}, 
                    React.createElement("div", {className: "title", dangerouslySetInnerHTML: createMarkup(this.state.item.title)}), 
                    excerpt
                ), 

                React.createElement("a", {href: this.state.item.link||null, 
                    className: "permalink searchResultItemLink", id: "searchResultItemLink_"+this.state.index, 
                    onClick: this.state.item.link ? null : this.handleClick, 
                    "data-noclick": !this.state.item.link, 
                    onMouseDown: this.state.item.link ? null : this.handleClick})
            )
        );
    }
});

},{"../Helpers/Cover":40,"../Helpers/Favicon":42}],81:[function(require,module,exports){
module.exports = React.createClass({
	displayName: "Search/Mini",
	getInitialState: function() {
		return {
			query: ""
		};
	},

	componentDidMount:function() {
		React.findDOMNode(this.refs.input).addEventListener("keyup", this.handleKey);
	},

	componentWillUnmount:function() {
		React.findDOMNode(this.refs.input).removeEventListener("keyup", this.handleKey);
	},

	handleKey: function(e) {
		if (e.keyCode == 27)
			this.handleReset(e);
	},

	handleChange: function(e) {
		if (this.isMounted()) this.setState({query: e.target.value || ""});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		this.props.onChange(this.state.query);
	},

	handleReset: function(e) {
		e.preventDefault();
		e.stopPropagation();
		React.findDOMNode(this.refs.input).value = "";
		if (this.isMounted()) this.setState({query: ""});
		this.props.onChange("");
	},

	render: function() {
		return (
			React.createElement("form", {className: "mini-search", onSubmit: this.handleSubmit}, 
				React.createElement("label", null, 
					React.createElement(Icon, {name: "search", size: "mac"}), 
					React.createElement("input", {type: "text", placeholder: t.s("defaultCollection-0") + (this.props.placeholder? " (" + this.props.placeholder + ")..." : ""), ref: "input", onChange: this.handleChange}), 
					React.createElement("a", {href: "", className: "action-icon "+(this.state.query=="" ? "hidden" : ""), onClick: this.handleReset}, React.createElement(Icon, {name: "clear", size: "mac"}))
				)
			)
		);
	}
});

},{}],82:[function(require,module,exports){
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
	displayName: "Search/Query",
	getInitialState: function() {
		return {
			focus: false
		}
	},

	changeQuery: function(e) {
		this.props.changeQuery(this.props.index, e.target.value);
	},

	handleClick: function(e) {
		e.preventDefault();
	},

	handleFocus: function() {
		if (this.isMounted()) this.setState({focus: true});
	},

	handleBlur: function() {
		if (this.isMounted()) this.setState({focus: false});
	},

	handleRemove: function(e) {
		if (e) e.preventDefault();
		this.props.changeQuery(this.props.index, null);
	},

	handleKey: function(e) {
		switch(e.keyCode){
			case 46: //delete
			case 8: //backspace
				this.handleRemove(e);
			break;

			case 37: //left
				this.props.focusOnQuery(this.props.index-1);
			break;

			case 39: //right
				this.props.focusOnQuery(this.props.index+1);
			break;

			case 38: //up
			case 40: //down
				React.findDOMNode(this.refs.select).focus();
			break;
		}
	},

	render: function() {
		var className = "", showSelect = true;
		var tagTitle = t.s("tags").substr(0, (t.s("tags")).length -1);

		var keyString = _.capitalize(t.s("all")), valString = "";

		try{valString = String(this.props.item.val);} catch(e) {}

		var canBeDomain = (valString.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/)));
		var canBeType = (valString.match(new RegExp(/(image|video|link|article|note|document)/i)));

		switch(this.props.item.key){
			case "type":
				keyString = t.s("type");
				valString = t.s(this.props.item.val);
			break;

			case "domain":
				keyString = t.s("sites");
			break;

			case "tag":
				keyString = tagTitle;
			break;

			case "collection":
				keyString = t.s("collection");
				valString = t.s("inCollection");
				valString = valString.charAt(0).toUpperCase() + valString.slice(1);
				/*try{
					valString = CollectionsStore.getCollection(CollectionsStore.getCurrentId()).title;
				}catch(e){}*/
				showSelect = false;
			break;
		}

		if (this.state.focus)
			className+=" query-focus";

		var select = null;
		if (showSelect)
			select = [
				React.createElement(Icon, {name: "arrow-down", size: "small"}),
				(
					React.createElement("select", {ref: "select", tabIndex: "-1", value: this.props.item.key, onChange: this.changeQuery}, 
                        canBeType ? React.createElement("option", {value: "type"}, t.s("type")) : null, 
                        React.createElement("option", {value: "tag"}, tagTitle), 
                        canBeDomain ? React.createElement("option", {value: "domain"}, t.s("sites")) : null, 
                        React.createElement("option", {value: "word"}, _.capitalize(t.s("all")))
                    )
				)
			];

		return (
			React.createElement("figure", {className: className}, 
                showSelect ? React.createElement("label", {className: "type"}, 
                    keyString, select
                ) : null, 
                React.createElement("a", {href: "", id: "focus-zone-"+this.props.index, onClick: this.handleClick, onDoubleClick: this.handleRemove, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKey, className: "text"}, 
                    valString
                )
            )
		);
	}
});

},{"../../../stores/Collections":115}],83:[function(require,module,exports){
var ScrollFixMixin = require('../Helpers/ScrollFixMixin.js');
var Item = require("./Item.js");

var StatsStore = require('../../../stores/Stats'),
    StatsActions = require('../../../actions/Stats'),
    TagsActions = require('../../../actions/Tags'),
    TagsStore = require('../../../stores/Tags'),
    SitesActions = require('../../../actions/Sites'),
    SitesStore = require('../../../stores/Sites'),
    CollectionsStore = require('../../../stores/Collections');

var _timeout = 0, resultsCount = 0;

var _highlight = function (word, text) {
    try{
        word = word.trim();
    }catch(e) {if (e) word = "";}
    try{
        text = text.trim();
    }catch(e) {if (e) text = "";}

    var maxLength = 50, clean = S(text).escapeHTML().s;

    /*if (text.length > maxLength){
        var firstQ = text.indexOf(word), lastQ = text.lastIndexOf(word);
        console.log(firstQ,lastQ);
        if ((firstQ>0)&&(lastQ!=-1)){
            clean = "..." + text.substr(firstQ, lastQ+word.length) + "...";
        }
    }*/

    try {
        clean = clean.replace(new RegExp(word, 'gi'), function (matched) {
            return '<strong>' + matched + '</strong>';
        });
    }catch(e) {if (e) clean = text;}
    return clean;
}

module.exports = React.createClass({
    displayName: "Search/Results",
	mixins: [ScrollFixMixin],

	_makeTag: function(item) {
	  return {
	      _id: item._id,
	      title: item._id,
	      excerpt: item.count/* + " " + t.s("bookmarks")*/,
	      sort: item.count,
	      icon: "tag",
	      //link: "#/collection/0/" + encodeURIComponent("#" + item._id),
	      gist: "tag",
	      className: "small"
	  };
	},

	_makeSite: function(item) {
	  return {
	      _id: item._id,
	      title: item._id,
	      excerpt: item.count/* + " " + t.s("bookmarks")*/,
	      sort: item.count,
	      icon: network.favIcon(item._id),
	      //link: "#/collection/0/" + encodeURIComponent("#" + item._id),
	      gist: "domain",
	      className: "small"
	  };
	},

	_makeType: function(type) {
		return {_id: type, title: t.s(type), icon: type, gist: "type", className: "small"};
	},

    _makeCollection: function(val,c) {
        var count = t.s("noBookmarks");
        if (c.count)
        count = (c.count||"") + " " + t.s("bookmarks");

        return {
            _id: c._id,
            titleStr: c.title,
            title: _highlight(val, c.title),
            excerpt: count,
            image: (c.cover || [])[0] || "",
            sort: 4,
            link: "#/collection/" + c._id,
            gist: "collection"
        };
    },

	getDefaults: function(val) {
		val = (val || "").trim().toLowerCase();

		var _this = this;
        var findIndex = function(id) {
            var index = -1;
            try{
                index = _.findIndex(_this.state.items, {id: id});
            }catch(e){}

            return index;
        }

		var items = [
			{title: t.s("tags"), className: "list", childrens: []},
            {title: t.s("type"), className: "list", childrens: []},
            {title: t.s("collections"), id: "collections", childrens: val!="" ? (this.state.items[findIndex("collections")]||[]).childrens||[] : []},
			{title: t.s("elements"), id: "elements", childrens: val!="" ? (this.state.items[findIndex("elements")]||[]).childrens||[] : []},
			{title: t.s("sites"), childrens: []}
		];

		//Type
		(consts.contentTypes||[]).forEach(function (item) {
			var addCurrent = true;
			if (val!="")
				if ((item.indexOf(val)==-1)&&((t.s(item).toLowerCase()).indexOf(val)==-1))
					addCurrent = false;

			if (addCurrent)
				items[1].childrens.push(_this._makeType(item));
		});

		//Tags
		(this.state.tags||[]).forEach(function (item) {
			if (item._id.indexOf(val)!=-1)
            	items[0].childrens.push(_this._makeTag(item));
        });


        //Sites
        if (val!="")
		(this.state.sites||[]).forEach(function (item) {
			if (item._id.indexOf(val)!=-1)
            	items[4].childrens.push(_this._makeSite(item));
        });

		return items;
	},

	getInitialState: function() {
		return {
			index: -1,
			val: this.props.val||"",
			stat: StatsStore.getStat()||[],
			items: [],
			tags: TagsStore.getTags()||[],
			sites: SitesStore.getSites()||[]
		}
	},

	componentDidMount: function() {
        this.unsubscribeTags = TagsStore.listen(this.onTagsChange);
        this.unsubscribeStats = StatsStore.listen(this.onStatsChange);
        this.unsubscribeSites = SitesStore.listen(this.onSitesChange);

        if (this.state.tags.length==0)
			TagsActions.load();

		if (this.state.stat.length==0)
			StatsActions.load();

		if (this.state.sites.length==0)
			SitesActions.load();

        this.handleAutoComplete();
    },

    componentWillUnmount: function() {
        this.unsubscribeTags();
        this.unsubscribeStats();
        this.unsubscribeSites();
    },

    onStatsChange: function(stat) {
        if (this.isMounted()) this.setState({stat: stat});
        this.handleAutoComplete();
    },

    onTagsChange: function(tags) {
        if (this.isMounted()) this.setState({tags: tags});
        this.handleAutoComplete();
    },

    onSitesChange: function(sites) {
        if (this.isMounted()) this.setState({sites: sites});
        this.handleAutoComplete();
    },

	handleResultsMouseOver: function() {
        _timeout = 300;
    },

    handleResultsMouseLeave: function() {
        _timeout = 0;
    },

    componentWillReceiveProps: function(nextProps) {
    	nextProps.val = (nextProps.val||"").trim();

    	if (nextProps.val != this.state.val){
    		this.handleAutoComplete(nextProps.val);
    		if (this.isMounted()) this.setState({val: nextProps.val});
    	}
    },

    handleAutoComplete: function(val) {
    	if (typeof val == "undefined")
    		val = this.state.val;

    	if (val == ""){
    		if (this.isMounted()) this.setState({items: this.getDefaults(), index: -1});
    	}else{
    		items = this.getDefaults(val);

    		items.unshift({
    			childrens: [
    				{_id: "text", title: val, className: "small", icon: "search", gist: "word"}
    			]
    		});

            this.findCollections(val);
    		this.findBookmarks(val);

    		if (this.isMounted()) this.setState({items: items, index: 0});
    	}

        var elem = document.getElementById('searchResults');
        elem.scrollTop = 0;
    },

    findCollections: function(val) {
        var items = [], _this = this;
        var collections = _.filter(CollectionsStore.getCollections(), function (c) {
            return ((c.title || "").toLowerCase().indexOf(val.toLowerCase()) >= 0);
        });

        Api.get("childrens", function(json){
            if (val != _this.state.val)
                return;

            (json.items||[]).forEach(function(c) {
               if ((c.title || "").toLowerCase().indexOf(val.toLowerCase()) >= 0)
                    collections.push(c); 
            });

            items = (collections||[]).map(function(c){
                return _this._makeCollection(val,c);
            });
            items = _.orderBy(items, ['sort', 'titleStr'], ['asc', 'desc']);

            var index = _.findIndex(_this.state.items, {id: "collections"});
            _this.state.items[index].childrens = items;
            if (_this.isMounted()) _this.setState({items: _this.state.items});
        });
    },

    findBookmarks: function(val) {
    	var _this = this;
    	var q = JSON.parse(JSON.stringify(this.props.queries));
    	q.push({key: "word", val: val});

        var cId = 0;
        if (q.length>0)
            if (q[0].key==="collection")
                cId = q[0].val;

    	Api.get('raindrops/'+cId+'?search='+JSON.stringify(q), function (json) {
    		var items = (json.items || []).map(function (item) {
                var tags = (item.tags || []).map(function (t) {
                    return "#" + t;
                });
                tags = (tags || []).join(", ");

                return {
                    _id: item._id,
                    titleStr: item.title,
                    title: _highlight(val, item.title),
                    excerpt: _highlight(val, item.excerpt + " " + tags),
                    domain: item.domain,
                    image: item.cover || "",
                    sort: (item.title.toLowerCase().indexOf(val.toLowerCase()) >= 0 ? 2 : 0) + ((item.excerpt || "").toLowerCase().indexOf(val.toLowerCase()) >= 0 ? 1 : 0),
                    link: item.link,
                    gist: "bookmark"
                };
            });

            items = _.orderBy(items, ['sort', 'titleStr'], ['asc', 'desc']);

            var index = _.findIndex(_this.state.items, {id: "elements"});
            _this.state.items[index].childrens = items;
            if (_this.isMounted()) _this.setState({items: _this.state.items});
    	});
    },

    scrollTo: function(dir) {
    	var newIndex = null;

    	if (dir == "top")
	    	if (this.state.index>0)
	            newIndex = this.state.index - 1;

	    if (dir == "bottom")
	    	if (resultsCount-1>this.state.index)
                newIndex = this.state.index + 1;

        if (newIndex!=null) {
            var div = document.getElementById('searchResults'),
                item = document.getElementsByClassName("searchResultItem")[newIndex] /*document.getElementById('searchResultItem_'+newIndex)*/;
            var offset = item.offsetTop;

            if (((offset-div.scrollTop+item.clientHeight) > div.clientHeight)&&(dir=="bottom"))
                div.scrollTop = div.scrollTop + item.clientHeight;
            else if ((offset<div.scrollTop)&&(dir=='top'))
                div.scrollTop = offset;

            if (this.isMounted()) this.setState({index: newIndex});
        }
    },

    clickActive: function() {
    	var item = document.getElementsByClassName("searchResultItemLink")[this.state.index]/*document.getElementById('searchResultItemLink_'+this.state.index)*/;

    	if (item)
    		item.click();
    },

	render: function() {
		var items = [], iterator = 0, _this = this;

		this.state.items.forEach(function(group,index) {
			if ((group.childrens||[]).length>0){
				if (group.title)
    				items.push(
    					React.createElement("div", {className: "section", key: "group"+index}, 
    						group.title, " ", React.createElement("span", {className: "count"}, group.id ? group.childrens.length : null)
    					)
    				);

                var childrens = [];
				group.childrens.forEach(function(item,index) {
					childrens.push(
						React.createElement(Item, {item: item, 
							  active: (iterator+index)==_this.state.index, 
							  index: iterator+index, 
							  key: "search_item_" +(item.gist||"")+item._id, 
							  onClick: _this.props.addQuery})
					);
				});
                iterator += childrens.length;

                if (childrens.length>0)
                    items.push(
                        React.createElement("div", {className: "childrens_"+(group.className||""), key: "childrens"+index}, 
                            childrens
                        )
                    );
			}
		});

		resultsCount = iterator;

		return (
			React.createElement("div", {className: "search-results", id: "searchResults", ref: "div", onWheel: this.handleScroll, onMouseEnter: this.handleResultsMouseOver, onMouseLeave: this.handleResultsMouseLeave}, 
				items
			)
		);
	}
});

},{"../../../actions/Sites":10,"../../../actions/Stats":11,"../../../actions/Tags":12,"../../../stores/Collections":115,"../../../stores/Sites":121,"../../../stores/Stats":122,"../../../stores/Tags":123,"../Helpers/ScrollFixMixin.js":48,"./Item.js":80}],84:[function(require,module,exports){
var QueryItem = require("./Query");
var Results = require("./Results");
var CollectionsStore = require('../../../stores/Collections');

module.exports = React.createClass({
    displayName: "Search/Search",
    cleanQueries: function(queries) {
        queries = (queries || []);

        if ((CollectionsStore.getCurrentId()!=0)&&(CollectionsStore.getCurrentId()!=-2)) {
            var q = {key: "collection", val: CollectionsStore.getCurrentId()};

            if ((queries[0]||{}).key==="collection")
                queries[0] = q;
            else
                queries.unshift(q);
        }

        return queries;
    },

    getInitialState: function() {
        return {
            val: "",
            focus: false,
            reseted: true,
            queries: this.cleanQueries(this.props.queries)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isMounted()) this.setState({queries: this.cleanQueries(nextProps.queries), val: nextProps.val||""});
    },

    changeQuery: function(index,key) {
        if (this.state.queries[index]){
            //update
            if (key != null){
                this.state.queries[index].key = key;
                this.focusOnQuery(index);
            }
            //remove
            else{
                React.findDOMNode(this.refs.searchInput).focus();
                this.state.queries.splice(index,1);
            }

            if (this.isMounted()) this.setState({queries: this.state.queries});
            this.changeLocation();
        }
    },

    focusOnQuery: function(index) {
        index = parseInt(index);
        console.log(index)
        //if (index<=0)
        //    return;
        
        var elem = document.getElementById("focus-zone-"+index);
        if (elem)
            elem.focus();
        else
            document.getElementById("searchInput").focus();
    },

    handleFocus: function() {
        _timeout = 0;
        if (this.isMounted()) this.setState({reseted: true, focus: true});
    },

    handleBlur: function() {
        var _this = this;
        setTimeout(function() {
            if (_this.isMounted()) _this.setState({reseted: true, focus: false});
        }, _timeout);
    },

    handleKey: function(e) {
        var si = React.findDOMNode(this.refs.searchInput);
        switch(e.keyCode){
            case 8: //backspace
                if ((si.selectionStart==0)&&(si.selectionEnd==0)) {
                    e.preventDefault();
                    this.focusOnQuery(this.state.queries.length - 1);
                }
            break;

            case 37: //left
                if ((si.selectionStart==0)&&(si.selectionEnd==0)) {
                    e.preventDefault();
                    this.focusOnQuery(this.state.queries.length - 1);
                }
            break;

            case 38: //top
                e.preventDefault();
                this.refs.results.scrollTo("top");
            break;

            case 40:
                e.preventDefault();
                this.refs.results.scrollTo("bottom");
            break;

            case 27: //esc
                if ((this.state.queries.length == 0)&&(this.state.val==""))
                    this.handleFormReset();
                else
                    si.blur();
            break;
        }
    },

    handleType: function(e) {
        var typed = (e.target.value || "")/*.trim()*/;

        if (this.isMounted()) this.setState({val: typed});
    },

    addQuery: function(key,val) {
        var canAdd = true;
        key = key || "word";
        this.state.queries.forEach(function(item) {
            if ((item.key == key)&&(item.val == val)) canAdd = false;
        });

        if (canAdd){
            this.state.queries.push({key: key, val: val});
            if (this.isMounted()) this.setState({queries: this.state.queries, val: "", reseted: true});
            this.refs.results.setState({index:-1});

            this.changeLocation();
        }

        return canAdd;
    },

    changeLocation: function() {
        var cId = 0;
        if (this.state.queries.length>0)
            if (this.state.queries[0].key==="collection")
                cId = this.state.queries[0].val;

        window.location = "#/collection/"+cId+"/"+encodeURIComponent(JSON.stringify(this.state.queries));
    },

    handleSubmit: function(e) {
        e.preventDefault();
        this.refs.results.clickActive();
    },

    handleFormReset: function(e) {
        if (e)
            e.preventDefault();
        
        var elem = document.getElementById('searchForm');
        if (elem) elem.reset();
        //document.getElementById('searchInput').blur();
        if (this.isMounted()) this.setState({
            val: "",
            reseted: true,
            //focus: false
        });

        if (typeof this.props.onSearchReset != 'undefined')
            this.props.onSearchReset();
    },

    handleNotReseted: function() {
        if (this.state.focus)
        if (this.isMounted()) this.setState({reseted: !this.state.reseted});
    },

    render: function() {
        var className = "search-form", _this = this;
        if ((this.state.val=="")&&(this.state.reseted)) className += " search-empty";
        if ((this.state.focus)/*&&(this.state.value!="")*/) className += " search-show-results";

        var queries = this.state.queries.map(function(item,index){
            return React.createElement(QueryItem, {
                        key: "query_"+index, 
                        index: index, 
                        item: item, 
                        changeQuery: _this.changeQuery, 
                        focusOnQuery: _this.focusOnQuery});
        });

        //
        return (React.createElement("div", {className: className}, 
            React.createElement("form", {onSubmit: this.handleSubmit, id: "searchForm"}, 
                React.createElement("div", {className: "queries"}, 
                    React.createElement(Icon, {name: "search", size: "mac"}), 

                    queries, 

                    React.createElement("input", {ref: "searchInput", 
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
                           placeholder: t.s('defaultCollection-0'), 
                           autoFocus: this.props.autoFocus||false}), 

                    queries.length>0 || this.state.focus || this.props.autoFocus ? React.createElement("a", {href: "", className: "action-icon", onMouseDown: this.handleFormReset, onClick: this.handleFormReset, "data-noclick": "true"}, React.createElement(Icon, {name: "clear", size: "mac"})) : null
                ), 

                React.createElement(Results, {ref: "results", val: this.state.val, queries: this.state.queries, addQuery: this.addQuery})
            )
        ));
    }
});

},{"../../../stores/Collections":115,"./Query":82,"./Results":83}],85:[function(require,module,exports){
/** @jsx React.DOM */
var SidebarActions = require('../../actions/Sidebar'),
    SidebarStore = require('../../stores/Sidebar');

var CollectionsActions = require('../../actions/Collections');
var CollectionsStore = require('../../stores/Collections');

var BookmarksActions = require('../../actions/Bookmarks');

var UserActions = require('../../actions/User');

var StatsStore = require('../../stores/Stats'),
    StatsActions = require('../../actions/Stats');

var OverflowScroll = require("../components/Helpers/OverflowScroll");

var PopoverSettings = require("../components/Popovers/Settings");

var Group = require("./Sidebar/Group"),
    Collection = require("./Sidebar/Collection");

module.exports = React.createClass({
  displayName: "Sidebar",

  contextTypes: {
        router: React.PropTypes.func
    },

  getInitialState: function() {
    return {
        collections: CollectionsStore.getCollections(),
        user: UserStore.getUser(),
        open: SidebarStore.getState(),
        stat: StatsStore.getStat(),

        settingsPopover: false
    }
  },

  onUserChange: function(user) {
    if (this.isMounted()) this.setState({
        user: user
    });
  },

  onCollectionsChange: function(collections) {
    if (this.isMounted())
    this.setState({
        collections: collections
    });
  },

  onSidebarChange: function(open) {
    if (this.isMounted()) this.setState({open: open});
  },

  onStatsChange: function(stat) {
    if (this.isMounted()) this.setState({stat: stat});
  },

  componentDidMount: function() {
    this.unsubscribeUser = UserStore.listen(this.onUserChange);
    this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
    this.unsubscribeSidebar = SidebarStore.listen(this.onSidebarChange);
    this.unsubscribeStats = StatsStore.listen(this.onStatsChange);

    StatsActions.load();

    window.addEventListener('macMainMenu', this.handleSettingsPopoverShow, true);

    window.addEventListener('macAdd', this.defaultMacFab, true);
  },

  componentWillUnmount: function() {
    this.unsubscribeUser();
    this.unsubscribeCollections();
    this.unsubscribeSidebar();
    this.unsubscribeStats();
    window.removeEventListener('macMainMenu', this.handleSettingsPopoverShow, true);

    window.removeEventListener('macAdd', this.defaultMacFab, true);
  },

  defaultMacFab: function(e) {
    if (!(window.macAdd||false))
      if (UserStore.isLogged())
        Pop.show("fab");
  },

  handleSidebarOpen: function(e) {
    e.preventDefault();
    SidebarActions.change(!this.state.open);
  },


  handleGroupToggle: function(id) {
    UserActions.toggleGroup({id:id});
  },

  handleMoveGroup: function(fromId, toId) {
    UserStore.onSwapGroups({fromId: fromId, toId: toId});
  },

  handleDropCollectionToGroup: function(collectionId, groupId, dragParent) {
    if (dragParent!="childrens")
      UserStore.onUpdateCollection({_id: collectionId, group: groupId, toTop: true});
  },

  handleMoveCollection: function(fromId, toId) {
    UserStore.onSwapCollections({fromId: fromId, toId: toId});
  },

  handleDropBookmark: function(bookmarkId, collectionId) {
    BookmarksActions.updateBookmark({
      item: {
        _id: bookmarkId,
        collectionId: collectionId
      },
      showingCollectionId: parseInt(CollectionsStore.getCurrentId()),
      successMessage: t.s("moveSuccess")
    });
  },

  handleGroupNewCollectionModalOpen: function(e){
    if (typeof e == "number")
      group = e;
    else{
      e.preventDefault();
      var group = parseInt(e.target.getAttribute("data-group"));
    }

    Pop.show("collection", {
      group: group,
      pin: "side-group-"+group
    });
  },

  handleSignIn: function(e) {
    e.preventDefault();

    UserActions.signIn(function() {
      location.hash="#/";
      location.reload();
    });
  },

  handleSignUp: function(e) {
    e.preventDefault();

    UserActions.signUp(function() {
      location.hash="#/";
      location.reload();
    });
  },

  handleSettingsPopoverShow: function(e) {
    e.preventDefault();
    if (this.isMounted()) this.setState({settingsPopover: !this.state.settingsPopover});
  },

  handleSettingsPopoverClose: function() {
    if (this.isMounted()) this.setState({settingsPopover:false});
  },

  handleNewGroup: function(e) {
    e.preventDefault();

    Pop.show("group", {
      id: -1,
      pin: "sidebar-new-group"
    });
  },

  renderLink: function(attr) {
    return (
      React.createElement("figure", {id: attr.id||null, className: "card collection " + (window.location.href.indexOf(attr.href||{})!=-1 ? "active" : "")}, 
        React.createElement("div", {className: "icon"}, 
          React.createElement(Icon, {name: attr.icon})
        ), 
        React.createElement("figcaption", {className: "about"}, attr.title), 
        React.createElement("a", {href: attr.href||"", onClick: attr.onClick, className: "permalink"})
      )
    );
  },

  render: function() {
      var avatar = null, _this = this;
      //if (this.state.user._id)
        //avatar = <img key="avatar" className="icn icn-circle" src={"https://www.gravatar.com/avatar/"+this.state.user.email_MD5+"?d=mm&s=48"} />;
      //else
        avatar = React.createElement(Icon, {key: "avatar", name: "settings", size: ((window.environment||[]).indexOf("mac")!=-1) ? "mac" : ""});

      var sidebar = null;
      if ((this.state.open)||((window.environment||[]).indexOf("clipper")!=-1)) {
        if (UserStore.isLogged()){
          var groups = (this.state.user.groups||[]).map(function(group) {
            var items = [];
            if (!group.hidden){
              (group.collections||[]).forEach(function(c){
                var collection = CollectionsStore.getCollection(c);
                if (collection!=null)
                  items.push (React.createElement(Collection, React.__spread({},  collection, 
                                          {key: "collection_"+collection._id, 
                                          onMove: _this.handleMoveCollection, 
                                          onDropBookmark: _this.handleDropBookmark})));
              });

              if (items.length==0)
                items.push(
                  React.createElement("figure", {className: "card collection", 
                          key: "empty_"+group.id}, 
                    React.createElement("div", {className: "icon"}, 
                      React.createElement(Icon, {name: "folder-add"})
                    ), 
                    React.createElement("figcaption", {className: "about"}, t.s("createFirstCollection"), "..."), 

                    React.createElement("a", {href: "", "data-group": group.id, onClick: _this.handleGroupNewCollectionModalOpen, id: "newCollectionGroup"+group.id, className: "permalink"})
                  )
                );
            }

            return (
              React.createElement("section", {key: "sec_"+group.id, className: (group.hidden ? "section-hidden" : "")}, 
                React.createElement(Group, React.__spread({},  group, {key: "group_"+group.id, 
                      onToggle: _this.handleGroupToggle, 
                      onMove: _this.handleMoveGroup, 
                      onDrop: _this.handleDropCollectionToGroup})), 
                items
              )
            );
          });
          
          //Defaults
          groups.unshift(
            React.createElement("section", {key: "sec_defaults_first"}, 
              React.createElement(Collection, React.__spread({},  CollectionsStore.getCollection(0), {key: "d0"})), 
              
              React.createElement(Collection, React.__spread({},  CollectionsStore.getCollection(-1), {onDropBookmark: _this.handleDropBookmark, key: "d-1"}))
            )
          );

          //New group
          groups.push(
            React.createElement("section", {key: "sec_add_group"}, 
              React.createElement("figure", {className: "card group", id: "sidebar-new-group"}, 
                React.createElement("figcaption", {className: "about"}, t.s("createGroup")), 
                React.createElement("a", {href: "", className: "permalink group-permalink", onClick: this.handleNewGroup})
              )
            )
          );

          //Global
          groups.push(
            React.createElement("section", {key: "sec_defaults_last"}, 
              

              /*this.renderLink({icon: "settings", title: t.s("settings") + " " + t.s("und") + " " + t.s("profile").toLowerCase(), id: "settings-popover-link", onClick: this.handleSettingsPopoverShow})*/
              this.renderLink({icon: "auto", title: t.s("tools"), href: "#/tools"}), 
              React.createElement(Collection, React.__spread({},  CollectionsStore.getCollection(-2), {onDropBookmark: _this.handleDropBookmark, key: "d-2"})), 
              React.createElement(Collection, React.__spread({},  CollectionsStore.getCollection(-99), {onDropBookmark: _this.handleDropBookmark, key: "d-99"}))
            )
          );

          sidebar = (
            React.createElement("div", {className: "collections-list"}, 
              groups
            )
          );
        }
        else{
          sidebar = (
            React.createElement("div", {className: "collections-list"}, 
              React.createElement("section", null, 
                this.renderLink({icon: "person", title: t.s("signIn"), onClick: this.handleSignIn}), 
                this.renderLink({icon: "person-add", title: t.s("signUp"), onClick: this.handleSignUp})
              ), 

              React.createElement("section", null, 
                this.renderLink({icon: "help", title: t.s("help"), href: network.settingsURL()+'/help'}), 
                this.renderLink({icon: "install", title: t.s("install"), href: network.settingsURL()+'/install'})
              )
            )
          );
        }
      }

      var menu = null;
      if (/*(UserStore.isLogged())&&*/((window.environment||[]).indexOf("mac")==-1))
        menu = React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSidebarOpen}, React.createElement(Icon, {name: "menu"}));

      //<Icon name="logo" style={{width: "96px", height: "12px"}} />
      //<img src={(window.pathPrefix||"") + "../common/images/logo-text.svg"} className={this.state.open ? "" : "hidden"} alt="" />
      var header = (
        React.createElement("header", null, 
          menu, 
          React.createElement("div", {className: "header-center"}, 
            React.createElement("div", {id: "settings-popover-link", className: this.state.open ? "header-user-block" : "hidden", onClick: this.handleSettingsPopoverShow}, 
              React.createElement("img", {key: "avatar", className: "icn icn-circle pull-right", src: "https://www.gravatar.com/avatar/"+this.state.user.email_MD5+"?d=mm&s=48"}), 
              this.state.user.fullName||t.s("settings"), " ", React.createElement(Icon, {name: "arrow-down", size: "small"})/*
              <div className="subinfo">{this.state.user.email}</div>*/
            )
          )
        )
      );
      /*if ((window.environment||[]).indexOf("mac")!=-1)
        header = null;*/

      var popoverattachId = "settings-popover-link";
      if ((window.environment||[]).indexOf("mac")!=-1)
        popoverattachId = "mac-settings-placeholder";

      return (
        React.createElement(OverflowScroll, null, 
          header, 
          React.createElement("div", {id: "mac-settings-placeholder"}), 

          sidebar, 

          React.createElement(PopoverSettings, {onClose: this.handleSettingsPopoverClose, 
            show: this.state.settingsPopover, 
            attachId: popoverattachId, 
            position: "" }
            )
        )
      );
      //position={this.state.newModal.position}
  }
});

},{"../../actions/Bookmarks":2,"../../actions/Collections":4,"../../actions/Sidebar":9,"../../actions/Stats":11,"../../actions/User":14,"../../stores/Collections":115,"../../stores/Sidebar":120,"../../stores/Stats":122,"../components/Helpers/OverflowScroll":46,"../components/Popovers/Settings":79,"./Sidebar/Collection":86,"./Sidebar/Group":87}],86:[function(require,module,exports){
/** @jsx React.DOM */
var CollectionsStore = require('../../../stores/Collections');
var ParentsStore = require('../../../stores/Parents');
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;
var ItemDragDropMixin = require('../Collections/ItemDragDropMixin');
//var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Popover = require("../Popovers/Collection");

module.exports = React.createClass({
  displayName: "Sidebar/Collection",

  mixins: [DragDropMixin, ItemDragDropMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      showPopover: false,
      mousePos: false
    }
  },

  handleMore: function(e) {
    if(typeof e == "object") e.preventDefault();
    if (this.isMounted()) this.setState({showPopover:true, mousePos: !e.target.classList.contains("icon-more")});
  },

  handleEdit: function(e,step) {
    if(typeof e == "object") e.preventDefault();

    Pop.show("collection", {
      id: this.props._id,
      pin: "side-collection-"+this.props._id,
      step: step
    });
  },

  handleSharing: function(e) {
    if(typeof e == "object") e.preventDefault();
    Pop.show("collection", {
      id: this.props._id,
      pin: "side-collection-"+this.props._id,
      step: "sharing"
    });
  },

  handleSubFolder: function(e) {
    if(typeof e == "object") e.preventDefault();
    Pop.show("collection", {
      parentId: this.props._id,
      pin: "side-collection-"+this.props._id
    });
  },

  handlePopoverClose: function() {
    if (this.isMounted()) this.setState({showPopover:false});
  },

  handleRemove: function(e) {
    if(typeof e == "object") e.preventDefault();
    CollectionsStore.onRemoveCollection({item: this.props});
  },

  render: function() {
    var cover = "";//consts.defaultCollectionIcon();
    try{cover = network.fixURL(this.props.cover[0]);}catch(e){}

    var link = null;
    if (this.props._id != -2)
      link = '#/collection/' + this.props._id;
    else{
      if (((window.environment||[]).indexOf("mac")!=-1)||((window.environment||[]).indexOf("clipper")!=-1))
        link = '#/collection/-2';
      else if ((window.environment||[]).indexOf("web")!=-1)
        link = '#/dashboard';
      else
        link = '#/';
    }

    var active = CollectionsStore.getCurrentId()==this.props._id;
    var className = "card collection" + (active ? " active" : "");
    var style = null;
    if ((active)&&(this.props.color)&&(this.props._id>0))
      style = {color: /*"inset 3px 0px 0px "+*/this.props.color};

    if (this.getDragState('collection').isDragging)
      className += " no-opacity";

    if (this.getDropState('bookmark').isHovering)
      className += " drag-hover";

    var statusShared = null, statusPublic = null;
    if (this.props.collaborators && this.props.author)
        statusShared = React.createElement(Icon, {name: "shared", size: "small"});
    else if (this.props.collaborators && !this.props.author)
        statusShared = React.createElement(Icon, {name: "public", size: "small"});
    //if (this.props.public)
    //    statusPublic = <Icon name="link" size="small" />;

    var actions = null;
    if (this.props.author) {
      actions = (React.createElement("div", {className: "more"}, 
          React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSharing, title: t.s("sharing")}, React.createElement(Icon, {name: "share", size: "mac"})), 
          React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSubFolder, title: t.s("createSubFolder")}, React.createElement(Icon, {name: "folder-add", size: "mac"})), 
          React.createElement("a", {href: "", className: "action-icon", onClick: this.handleEdit, id: "side-collection-more-"+this.props._id, title: t.s("collectionEdit")}, React.createElement(Icon, {name: "settings", size: "mac"}))
          /*<a href="" id={"more-"+this.props._id} className="action-icon icon-more" onClick={this.handleMore}><Icon name="more" size="mac" /></a>*/
      ));
    }else if (this.props._id>0){
      actions = (React.createElement("div", {className: "more"}, 
          React.createElement("a", {href: "", className: "action-icon", onClick: this.handleSharing, title: t.s("sharing")}, React.createElement(Icon, {name: "share", size: "mac"}))
      ));
    }

    if (this.props._id == -99)
      actions = (React.createElement("div", {className: "more"}, 
          React.createElement("a", {href: "", className: "action-icon", onClick: this.handleRemove}, React.createElement(Icon, {name: "trash", size: "mac"}))
      ));

    var collectionIcon = null;
    if ((!cover)||(this.props._id<=0))
      collectionIcon = React.createElement(Icon, {name: network.defaultIcons(this.props._id)});
    else
      collectionIcon = React.createElement("img", {src: cover, alt: ""});

    return (
      React.createElement("figure", React.__spread({},  this.dragSourceFor('collection'), 
              this.dropTargetFor('collection', 'bookmark'), 
              {onContextMenu: this.handleMore, 
              className: className, 
              style: style, 
              ref: "collection", 
              id: "side-collection-"+this.props._id}), 
        React.createElement("div", {className: "icon"}, 
          collectionIcon
        ), 
        React.createElement("figcaption", {className: "about"}, this.props.title), 

        React.createElement("div", {className: "info"}, 
          statusShared, 
          statusPublic
        ), 
        React.createElement("div", {className: "count"}, 
          this.props.count||null
        ), 

        actions, 
        React.createElement("a", {href: link, className: "permalink"}), 
        React.createElement(Popover, React.__spread({position: this.state.mousePos ? "left" : "", onClose: this.handlePopoverClose, show: this.state.showPopover, attachId: "more-"+this.props._id},  {collection:this.props}, {onlyBasic: true, handleEdit: this.handleEdit, handleRemove: this.handleRemove, mousePos: this.state.mousePos}))
      )
    );
  }
});

},{"../../../modules/ReactDND":102,"../../../stores/Collections":115,"../../../stores/Parents":118,"../Collections/ItemDragDropMixin":32,"../Popovers/Collection":75}],87:[function(require,module,exports){
/** @jsx React.DOM */
var DragDropMixin = require('../../../modules/ReactDND').DragDropMixin;
var GroupTabDragDropMixin = require('../Collections/GroupTabDragDropMixin');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({
  displayName: "Sidebar/Group",

  mixins: [DragDropMixin, GroupTabDragDropMixin, PureRenderMixin],

  onToggleGroup: function(e) {
    e.preventDefault();
    this.props.onToggle(this.props.id);
  },

  handleMore: function(e) {
    e.preventDefault();
    Pop.show("group", {
      id: this.props.id,
      pin: "side-group-"+this.props.id
    });
  },

  handleAdd: function(e) {
    e.preventDefault();

    Pop.show("collection", {
      group: this.props.id,
      pin: "side-group-"+this.props.id
    });
  },

  render: function() {
    return (
      React.createElement("figure", React.__spread({className: "card group "+(this.props.hidden ? "closed" : "open"), 
              onContextMenu: this.handleMore}, 
              this.dropTargetFor('collection', 'group'), 
              this.dragSourceFor('group'), 
              {"data-id": this.props.id, 
              ref: "group", 
              id: "side-group-"+this.props.id}), 
        React.createElement("figcaption", {className: "about"}, this.props.title), 
        React.createElement("div", {className: "status" + (this.props.hidden ? "" : " invisible")}, React.createElement(Icon, {name: "arrow-down", size: "small"})), 

        React.createElement("div", {className: "more"}, 
            React.createElement("a", {href: "", className: "action-icon icon-more", onClick: this.handleMore, title: t.s("edit")}, React.createElement(Icon, {name: "edit", size: "mac"})), 
            React.createElement("a", {href: "", className: "action-icon", onClick: this.handleAdd, title: t.s("createNewCollection")}, React.createElement(Icon, {name: "folder-add", size: "mac"}))
        ), 

        React.createElement("a", {href: "", className: "permalink group-permalink", onClick: this.onToggleGroup})
      )
    );
  }
});

},{"../../../modules/ReactDND":102,"../Collections/GroupTabDragDropMixin":30,"react/addons":"react/addons"}],88:[function(require,module,exports){
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

},{"../../stores/Toast":124}],89:[function(require,module,exports){
var SidebarActions = require('../../actions/Sidebar');

module.exports = React.createClass({
	displayName: "UnifiedTitleBar",
	handleSidebar: function(e) {
		if (e) e.preventDefault();
        SidebarActions.change(true);
	},

	render: function() {
		var _this = this;
		var path = this.props.path.map(function(item,index){
				if (index == _this.props.path.length-1)
					return React.createElement("li", {className: "item active"}, item.title);
				else{
					return [React.createElement("li", {className: "item"}, React.createElement("a", {href: item.href}, item.title)), React.createElement("li", {className: "item separator"}, React.createElement(Icon, {name: "chevron-right", size: "small"}))];
				}
			});

		if ((window.environment||[]).indexOf("clipper")!=-1){
			return (
				React.createElement("div", {className: "clipper-toolbar"}, 
	                React.createElement("header", null, 
	                    React.createElement("section", {className: "menu"}, 
	                        React.createElement("a", {href: "#/", className: "action-icon"}, React.createElement(Icon, {name: "back"}))
	                    ), 
	                    
	                    React.createElement("section", {className: "navigation"}, 
	                    	path.length>1 ? React.createElement("ul", {className: "path"}, path.splice(0,1)) : null, 
	                    	React.createElement("h1", null, this.props.path[this.props.path.length-1].title)
	                    )
	                )
	            )
			);
		}
		else if ((window.environment||[]).indexOf("mac")!=-1)
			return React.createElement("div", null);
		else {
			return (
				React.createElement("div", {className: "collection-toolbar unified-titlebar"}, 
					React.createElement("div", {className: "breadcrumbs-wrap"}, 
		                React.createElement("ul", {className: "breadcrumbs"}, 
		                    React.createElement("li", {className: "item"}, React.createElement("a", {href: "#/", className: "action-icon"}, React.createElement(Icon, {name: "home"}))), 
		                    React.createElement("li", {className: "item separator"}, React.createElement(Icon, {name: "chevron-right", size: "small"}))
		                ), 
		                React.createElement("ul", {className: "breadcrumbs"}, 
		                    path
		                )
		            )
				)
			);
		}
	}
});

},{"../../actions/Sidebar":9}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"500px\" height=\"250px\" viewBox=\"0 0 500 250\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n    <!-- Generator: Sketch 3.3.1 (12002) - http://www.bohemiancoding.com/sketch -->\n    <title>bookmarks</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-2\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"bookmarks\" sketch:type=\"MSArtboardGroup\">\n            <circle id=\"Oval-1\" stroke=\"#DCDCDC\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" cx=\"250\" cy=\"151\" r=\"87\"></circle>\n            <circle id=\"Oval-4\" stroke=\"#DCDCDC\" sketch:type=\"MSShapeGroup\" cx=\"250\" cy=\"151\" r=\"237\"></circle>\n            <circle id=\"Oval-7\" stroke=\"#DCDCDC\" sketch:type=\"MSShapeGroup\" cx=\"250\" cy=\"151\" r=\"157\"></circle>\n            <path d=\"M252.645968,135.706433 L280,136 L280,130.998101 C280,129.886706 279.103546,129 277.997715,129 L247,129 L252.269167,135.534166 C251.686895,135.237645 251.160069,134.824097 250.833302,134.366623 L243.166698,123.633377 C242.523564,122.732989 241.10853,122 240.008845,122 L221.991155,122 C220.889674,122 220,122.894047 220,123.99691 L220,173.00309 C220,174.102324 220.893777,175 221.996307,175 L278.003693,175 C279.10527,175 280,174.10406 280,172.998861 L280,136 L253.991244,136 C253.570798,136 253.101239,135.891461 252.645968,135.706433 Z\" id=\"Oval-4\" stroke=\"#848484\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" sketch:type=\"MSShapeGroup\"></path>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(413.000000, 196.000000)\">\n                <circle id=\"Oval-1\" fill=\"#1DD3AB\" sketch:type=\"MSShapeGroup\" cx=\"22\" cy=\"22\" r=\"22\"></circle>\n                <path d=\"M10.3125,10.3125 L12.4377185,33.7925926 L21.9667342,36.4375 L31.5622815,33.7925926 L33.6875,10.3125 L10.3125,10.3125 L10.3125,10.3125 Z M29.0718346,17.9702351 L17.8831956,17.9702351 L18.1316774,20.9260301 L28.823416,20.9260301 L27.9925924,29.8080324 L22.0328231,31.4246723 L22.0328231,31.4413426 L21.9667342,31.4413426 L15.9568131,29.8080324 L15.5915847,25.2688137 L18.4969058,25.2688137 L18.7125645,27.555 L21.9667342,28.4204839 L25.2368411,27.555 L25.6025122,23.8324363 L15.4424576,23.8324363 L14.662355,15.1131554 L29.3377083,15.1131554 L29.0718346,17.9702351 L29.0718346,17.9702351 Z\" id=\"Shape\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(260.000000, 192.000000)\">\n                <path d=\"M32,64 C49.673112,64 64,49.673112 64,32 C64,14.326888 49.673112,0 32,0 C14.326888,0 0,14.326888 0,32 C0,49.673112 14.326888,64 32,64 Z\" id=\"Oval-6\" fill=\"#FF3B30\" sketch:type=\"MSShapeGroup\"></path>\n                <path d=\"M17.4011461,42.3443502 C14.9770774,42.3443502 13,44.2876284 13,46.6721751 C13,49.0567218 14.9770774,51 17.4011461,51 L20.5988539,51 C21.9140401,51 23.0830946,50.4229567 23.8911175,49.523448 C23.8997135,49.514962 23.9169054,49.514962 23.9255014,49.5064761 C23.9770774,49.4555605 24.0114613,49.3791871 24.0544413,49.3282715 C24.1661891,49.1924967 24.269341,49.0567218 24.3553009,48.903975 C25.1719198,47.6989728 25.5587393,46.1121036 25.5587393,44.8986155 L25.5587393,28.1558732 L25.5587393,28.0116123 L25.5587393,27.8758374 C25.6275072,26.6708352 26.52149,25.6949531 27.7163324,25.4234033 C27.8624642,25.3894596 28.1805158,25.3215721 28.1805158,25.3215721 L41.0659026,22.9115677 C41.1260745,22.9030817 41.1776504,22.8945958 41.2378223,22.8861099 C41.3065903,22.8776239 41.3667622,22.8776239 41.4441261,22.8776239 C42.4842407,22.8776239 43.2578797,23.6837874 43.2578797,24.6766414 L43.2578797,35.827155 C43.2578797,37.9910674 43.5071633,38.534167 39.7765043,38.534167 L38.0487106,38.534167 C35.6160458,38.534167 33.6475645,40.4774453 33.6475645,42.861992 C33.6475645,45.2465386 35.6160458,47.1898169 38.0487106,47.1898169 L41.2464183,47.1898169 C42.8108883,47.1898169 44.1776504,46.3921393 44.9598854,45.1871371 C44.9598854,45.1786512 44.9684814,45.1871371 44.9770774,45.1871371 C45.7507163,44.1518535 46,42.5904422 46,40.4944172 L46,14.7990174 C46,13.8061635 45.1489971,13 44.1088825,13 C44.0487106,13 43.9885387,13.0084859 43.9369628,13.0084859 L43.6704871,13.0509156 L24.974212,16.5471192 C23.7879656,16.8610987 22.713467,17.9812416 22.6275072,19.2117017 L22.6275072,19.2286735 L22.6275072,19.2456454 L22.6275072,40.4689594 C22.6275072,41.6485038 22.7994269,42.3528361 18.5272206,42.3528361 L17.4011461,42.3528361 L17.4011461,42.3443502 Z\" id=\"Shape\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(175.000000, 192.000000)\">\n                <ellipse id=\"Oval-5\" fill=\"#8F9BAC\" sketch:type=\"MSShapeGroup\" cx=\"32\" cy=\"32\" rx=\"32\" ry=\"32\"></ellipse>\n                <path d=\"M40,34 L24,34 L24,34 L24,36 L40,36 L40,34 L40,34 Z M46,34 L51,34 L51,36 L46,36 L46,34 L46,34 Z M18,34 L13,34 L13,36 L18,36 L18,34 L18,34 Z M39,21 L39,16.999615 C39,15.8874333 38.1019465,15 36.9941413,15 L27.0058587,15 C25.8970601,15 25,15.8952581 25,16.999615 L25,21 L15.0028592,21 C13.9018508,21 13,21.8987122 13,23.0073299 L13,45.9926701 C13,47.1016617 13.8967106,48 15.0028592,48 L48.9971408,48 C50.0981492,48 51,47.1012878 51,45.9926701 L51,23.0073299 C51,21.8983383 50.1032894,21 48.9971408,21 L39,21 L39,21 Z M37,21 L37,17 L27,17 L27,21 L37,21 Z M20,31 L22,31 L22,40 L20,40 L20,31 Z M42,31 L44,31 L44,40 L42,40 L42,31 Z\" id=\"Rectangle-176\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(300.000000, 118.000000)\">\n                <ellipse id=\"Oval-4\" fill=\"#2196F3\" sketch:type=\"MSShapeGroup\" cx=\"32\" cy=\"32\" rx=\"32\" ry=\"32\"></ellipse>\n                <path d=\"M12,34.1732174 L12,28.5945557 C12,28.0834182 12.4084444,27.6654639 12.9088889,27.6654639 L22.5004444,27.6654639 L18.3244444,35.1032227 L12.9088889,35.1032227 C12.4084444,35.1032227 12,34.686182 12,34.1732174 L12,34.1732174 Z M18.8324444,45.5959303 L15.7715556,47.7272686 C15.3595556,48.0154972 15.0684444,47.8327849 15.1253333,47.3248449 L15.5337778,43.6783652 C15.5906667,43.1704252 15.9915556,42.9630468 16.4248889,43.21656 L18.7937778,44.607457 C19.2266667,44.8627974 19.2444444,45.3099856 18.8324444,45.5959303 L18.8324444,45.5959303 Z M19.5675556,43.5404175 L17.1986667,42.1495205 C16.7653333,41.8946369 16.6128889,41.3245747 16.8648889,40.8819543 L27.8342222,21.3381388 C28.0831111,20.894148 28.644,20.7383858 29.0768889,20.9960101 L31.4457778,22.3837096 C31.8791111,22.6413339 32.0284444,23.2118529 31.7795556,23.6544733 L20.8102222,43.1987456 C20.5617778,43.6422796 20.0004444,43.7943875 19.5675556,43.5404175 L19.5675556,43.5404175 Z M27.916,35.1032227 L32.092,27.6654639 L34.4964444,27.6654639 L37.8875556,35.1032227 L27.916,35.1032227 L27.916,35.1032227 Z M41.5168889,37.3231765 C40.5684444,36.8362484 35.8453333,25.6853199 34.6355556,22.7760842 C33.424,19.8668484 29.7662222,12.1230466 30.9497778,11.5200962 C31.7915556,11.0879817 34.8133333,17.186003 37.0786667,20.8470996 C39.3404444,24.5081963 44.0706667,33.9480245 44.6528889,35.0232861 C45.232,36.1008316 44.0955556,36.9997758 43.4635556,37.2683628 C42.8311111,37.5374066 42.4648889,37.8055368 41.5168889,37.3231765 L41.5168889,37.3231765 Z M44.6204444,42.4477982 L43.1933333,40.1410561 C42.8982222,39.6614365 43.0515556,39.068992 43.5302222,38.8159356 L44.8906667,38.1006171 C45.3702222,37.8498446 45.9706667,38.0531119 46.2257778,38.554657 L47.3515556,40.7704998 C47.6075556,41.2715882 47.4333333,41.9147353 46.9715556,42.1979392 L45.9991111,42.7931244 C45.5368889,43.0795258 44.916,42.9233069 44.6204444,42.4477982 L44.6204444,42.4477982 Z M49.8728889,48.4983143 C49.5746667,47.5212606 47.2982222,47.4563977 46.2791111,45.9846506 C45.2564444,44.517928 46.1017778,43.7624129 46.4564444,43.4134325 C50.5902222,41.0308648 49.8728889,48.4983143 49.8728889,48.4983143 L49.8728889,48.4983143 Z M52,34.1732174 C52,34.686182 51.5915556,35.1032227 51.0911111,35.1032227 L46.2897778,35.1032227 C46.2368889,34.8163645 46.1511111,34.5295062 46.0057778,34.2604625 C45.8808889,34.0316154 45.5648889,33.4145048 45.1248889,32.5539301 C44.4893333,31.3119436 43.5768889,29.5359805 42.5995556,27.6654639 L51.0902222,27.6654639 C51.5906667,27.6654639 51.9991111,28.0834182 51.9991111,28.5945557 L52,34.1732174 L52,34.1732174 Z\" id=\"Shape\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(51.000000, 40.000000)\">\n                <circle id=\"Oval-1\" fill=\"#795548\" sketch:type=\"MSShapeGroup\" cx=\"22\" cy=\"22\" r=\"22\"></circle>\n                <path d=\"M21.4495678,35.75 L21.4495678,22.5504324 L17.0353019,22.5504324 C16.8871731,26.3159998 15.2259067,29.6927963 12.6426509,32.0896735 C14.9727592,34.2516675 18.053009,35.6163873 21.4495678,35.75 L21.4495678,35.75 L21.4495678,35.75 Z M11.1128701,30.4171444 C9.4161037,28.225673 8.36634248,25.5079644 8.25,22.5504324 L15.9334939,22.5504324 C15.7854601,26.0108595 14.2483299,29.1114895 11.8655575,31.3088677 C11.8804422,31.3250641 11.3647441,30.7424542 11.1128701,30.4171444 L11.1128701,30.4171444 L11.1128701,30.4171444 Z M32.1344425,31.3088677 C34.2704964,28.9845945 35.6173119,25.9234864 35.75,22.5504324 L35.75,22.5504324 L28.0665061,22.5504324 C28.2145399,26.0108595 29.7516702,29.1114895 32.1344425,31.3088677 L32.1344425,31.3088677 L32.1344425,31.3088677 Z M31.3573491,32.0896735 C29.0272408,34.2516675 25.946991,35.6163873 22.5504324,35.75 L22.5504324,35.75 L22.5504324,22.5504324 L26.9646981,22.5504324 C27.1128269,26.3159998 28.7740933,29.6927963 31.3573491,32.0896735 L31.3573491,32.0896735 L31.3573491,32.0896735 Z M32.1344425,12.6911323 C34.2704965,15.0154055 35.6173119,18.0765136 35.75,21.4495678 L35.75,21.4495678 L28.0665061,21.4495678 C28.2145399,17.9891405 29.7516702,14.8885105 32.1344425,12.6911323 L32.1344425,12.6911323 L32.1344425,12.6911323 Z M31.3573494,11.9103267 C29.0272411,9.74833265 25.9469911,8.38361276 22.5504324,8.25 L22.5504324,21.4495678 L26.9646981,21.4495678 C27.1128269,17.6840002 28.7740933,14.3072037 31.3573491,11.9103265 L31.3573494,11.9103267 L31.3573494,11.9103267 Z M11.8655578,12.691132 C9.72950364,15.0154053 8.38268816,18.0765135 8.25,21.4495678 L8.25,21.4495678 L15.9334939,21.4495678 C15.7854601,17.9891405 14.2483299,14.8885105 11.8655575,12.6911323 L11.8655578,12.691132 L11.8655578,12.691132 Z M12.6426509,11.9103265 C14.9727592,9.74833255 18.053009,8.38361276 21.4495678,8.25 L21.4495678,8.25 L21.4495678,21.4495678 L17.0353019,21.4495678 C16.8871731,17.6840002 15.2259067,14.3072037 12.6426509,11.9103265 L12.6426509,11.9103265 L12.6426509,11.9103265 Z\" id=\"basketball\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(135.000000, 118.000000)\">\n                <ellipse id=\"Oval-7\" fill=\"#5AC8FA\" sketch:type=\"MSShapeGroup\" cx=\"32\" cy=\"32\" rx=\"32\" ry=\"32\"></ellipse>\n                <path d=\"M50.3112727,15.6677619 C48.7270902,14.1258358 44.7614971,15.4917703 42.8629437,17.3396817 L35.640633,24.3773445 C34.9358669,23.741375 17.3886312,17.6516668 16.7598895,18.2616376 L14.470941,20.4875309 C13.8380899,21.1015015 13.8380899,22.0974537 14.470941,22.7114243 L27.2964498,32.5029551 L22.2418597,37.4247192 C21.8576286,37.8007012 21.3747714,38.3786735 20.865203,39.0606408 L20.6617866,38.8646502 C20.3412516,38.5526652 15.7345885,37.9866923 15.4119988,38.2986774 L14.2449227,39.4306231 C13.9243877,39.7446081 13.9243877,40.2505838 14.2449227,40.5625689 L14.8202419,41.1205421 L17.9043638,44.1183985 C17.2920598,45.6023273 17.0680962,46.8902656 17.6577984,47.466238 C18.2495553,48.0422104 19.5748442,47.822221 21.1014948,47.2222497 L24.140413,50.1781081 L24.7465529,50.76408 C25.0670879,51.0780649 25.5910393,51.0780649 25.9115743,50.76408 L27.0786504,49.6321342 C27.3991854,49.3201492 26.817702,44.8443637 26.4951123,44.5323786 L26.2958053,44.3383879 C26.9964619,43.8444116 27.5841094,43.376434 27.9662857,43.0044518 L33.0208759,38.0806878 L43.0848525,50.5240915 C43.7177037,51.1380621 44.7430047,51.1380621 45.3738011,50.5240915 L47.6627496,48.3001981 C48.2956007,47.6842276 42.0184573,30.6090459 41.3712232,29.9470776 L48.5873698,22.9174145 C50.4900326,21.0715029 51.8934005,17.2076881 50.3112727,15.6677619 L50.3112727,15.6677619 Z\" id=\"Shape\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(260.000000, 44.000000)\">\n                <ellipse id=\"Oval-3\" fill=\"#FF9500\" sketch:type=\"MSShapeGroup\" cx=\"32\" cy=\"32\" rx=\"32\" ry=\"32\"></ellipse>\n                <path d=\"M22,31 L22,21 C22,15.4771525 26.4759382,11 32,11 L32,11 C37.5228475,11 42,15.4759382 42,21 L42,31\" id=\"Rectangle-154\" stroke=\"#FFFFFF\" stroke-width=\"2\" sketch:type=\"MSShapeGroup\"></path>\n                <path d=\"M15.7794028,23.9853745 C15.9012353,22.8888824 16.8892617,22 18.0017433,22 L45.9982567,22 C47.103789,22 48.0998154,22.8983383 48.2205972,23.9853745 L50.7794028,47.0146255 C50.9012353,48.1111176 50.0981492,49 48.9971408,49 L15.0028592,49 C13.8967106,49 13.0998154,48.1016617 13.2205972,47.0146255 L15.7794028,23.9853745 Z\" id=\"Rectangle-153\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                <path d=\"M23,23 L23,28.5990195\" id=\"Line\" stroke=\"#FF9500\" stroke-width=\"2\" stroke-linecap=\"square\" sketch:type=\"MSShapeGroup\"></path>\n                <path d=\"M41,23 L41,28.5990195\" id=\"Line-Copy\" stroke=\"#FF9500\" stroke-width=\"2\" stroke-linecap=\"square\" sketch:type=\"MSShapeGroup\"></path>\n                <path d=\"M23,34 C24.6568542,34 26,32.6568542 26,31 C26,29.3431458 24.6568542,28 23,28 C21.3431458,28 20,29.3431458 20,31 C20,32.6568542 21.3431458,34 23,34 Z M41,34 C42.6568542,34 44,32.6568542 44,31 C44,29.3431458 42.6568542,28 41,28 C39.3431458,28 38,29.3431458 38,31 C38,32.6568542 39.3431458,34 41,34 Z\" id=\"Oval-14\" fill=\"#FF9500\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n            <g id=\"item\" sketch:type=\"MSLayerGroup\" transform=\"translate(175.000000, 44.000000)\">\n                <ellipse id=\"Oval-2\" fill=\"#FF3B30\" sketch:type=\"MSShapeGroup\" cx=\"32\" cy=\"32\" rx=\"32\" ry=\"32\"></ellipse>\n                <path d=\"M14,16.0023996 C14,14.8965048 14.8898926,14 15.9997073,14 L48.0002927,14 C49.1047006,14 50,14.8962786 50,16.0023996 L50,48.9976004 C50,50.1034952 49.1101074,51 48.0002927,51 L15.9997073,51 C14.8952994,51 14,50.1037214 14,48.9976004 L14,16.0023996 Z M16,16 L19,16 L19,19 L16,19 L16,16 Z M16,21 L19,21 L19,24 L16,24 L16,21 Z M16,26 L19,26 L19,29 L16,29 L16,26 Z M16,31 L19,31 L19,34 L16,34 L16,31 Z M16,36 L19,36 L19,39 L16,39 L16,36 Z M16,41 L19,41 L19,44 L16,44 L16,41 Z M16,46 L19,46 L19,49 L16,49 L16,46 Z M45,16 L48,16 L48,19 L45,19 L45,16 Z M45,21 L48,21 L48,24 L45,24 L45,21 Z M45,26 L48,26 L48,29 L45,29 L45,26 Z M45,31 L48,31 L48,34 L45,34 L45,31 Z M45,36 L48,36 L48,39 L45,39 L45,36 Z M45,41 L48,41 L48,44 L45,44 L45,41 Z M45,46 L48,46 L48,49 L45,49 L45,46 Z M21,16 L43,16 L43,31 L21,31 L21,16 Z M21,33 L43,33 L43,49 L21,49 L21,33 Z\" id=\"Rectangle-154\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n            </g>\n        </g>\n    </g>\n</svg>";

},{}],92:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	contextTypes: {
	    router: React.PropTypes.func
	},
	componentDidMount: function() {
		this.context.router.transitionTo('/');
	},

	render: function() {
		return null;
	}
});

},{}],93:[function(require,module,exports){
/** @jsx React.DOM */
var BookmarksView = require('../components/Bookmarks/List.js'),
    BookmarksViewMasonry = require('../components/Bookmarks/Masonry.js'),
    ChildrensView = require('../components/Collections/Childrens.js'),
    Search = require('../components/Search/Search.js'),
    InfiniteScroll = require('react-infinite-scroll')(React),
    Fab = require('../components/Fab.js'),
    BatchEdit = require('../components/Bookmarks/BatchEdit.js'),
    Tips = require('../components/Helpers/Tips.js'),
    ScrollFixMixin = require('../components/Helpers/ScrollFixMixin.js');

if ((window.environment||[]).indexOf("mac")!=-1)
  var Toolbar = require('../components/Collections/DesktopToolbar.js');
else if ((window.environment||[]).indexOf("clipper")!=-1)
  var Toolbar = require('../components/Collections/ClipperToolbar.js');
else
  var Toolbar = require('../components/Collections/Toolbar.js');

var ViewerModal = require('../components/Modals/Viewer');

var BookmarksActions = require('../../actions/Bookmarks');
var BookmarksStore = require('../../stores/Bookmarks');

var CollectionsActions = require('../../actions/Collections');
var CollectionsStore = require('../../stores/Collections');

var ChildrensActions = require('../../actions/Childrens');
var ChildrensStore = require('../../stores/Childrens');

var ParentsActions = require('../../actions/Parents');
var ParentsStore = require('../../stores/Parents');

var colorThief = require('../../modules/colorThief.js');

var _bookmarksParams = {}, _hasMore = false, _params = {};

module.exports = React.createClass({
    displayName: "routes/Collection",

    mixins: [ScrollFixMixin],

    getInitialState: function() {
        return {
            bookmarks: BookmarksStore.getBookmarks(),
            childrens: [],
            collection: {},
            parents: [],

            viewerModal: {
                show: false,
                id: 0
            }
        }
    },

    onUserChange: function(user) {
      if (this.isMounted())
      this.setState({
          user: user
      });
    },

    onBookmarksChange: function(bookmarks) {
        if (this.isMounted())
        this.setState({
            bookmarks: bookmarks
        });

        this._hasMore = true;
    },

    onCollectionsChange: function(collections) {
        if (this.isMounted()){
          var collection = CollectionsStore.getCollection(CollectionsStore.getCurrentId());
          if (collection!=null) {
              this.handleActionBarBackground(collection.color||null);
              if (this.isMounted())
              this.setState({collection: collection});
          }
        }
    },

    onChildrensChange: function(childrens) {
        if (this.isMounted())
        this.setState({
            childrens: childrens
        });
    },

    onParentsChange: function(parents) {
        if (this.isMounted())
        this.setState({
            parents: parents
        });
    },

    //When route params changes
    componentWillReceiveProps: function(nextProps) {
        if (!this._checkViewer()){
          this._hasMore = false;
          if (this.isMounted()){
            this.setState({
                bookmarks: [],
                childrens: [],
                collection: {}
            });
            this.loadAll();
          }
        }
    },

    _checkViewer: function() {
      var _query = this.context.router.getCurrentQuery(),
          _temp = {
            id: parseInt(_query.viewer||0),
            show: parseInt(_query.viewer||0)>0
          };

      if ((_temp.id != this.state.viewerModal.id)||(_temp.show != this.state.viewerModal.show)) {
        if (this.isMounted())
          this.setState({viewerModal: _temp});

        return true;
      }
      else
        return false;
    },

    loadAll: function() {
        CollectionsStore.onLoad();

        var _params = {};
        try{_params = this.context.router.getCurrentParams();}catch(e){}

        if (_bookmarksParams.cId!=_params.cId){
          _bookmarksParams.sort = ( ((_params.cId==0)||(_params.cId==-99)) ? "lastUpdate" : "sort");
        }
        _bookmarksParams.cId = _params.cId;
        _bookmarksParams.page = 0;
        _bookmarksParams.search = false;
        _bookmarksParams.perpage = 40;

        _bookmarksParams.search = {};
        try{_bookmarksParams.search = decodeURIComponent(_params.search||"{}")} catch(e){}

        if (_params.cId != -2)
          _bookmarksParams.speed = "async";

        ChildrensStore.onLoad(_bookmarksParams);
        CollectionsStore.onSetCurrent(_params.cId);
        BookmarksStore.onLoad(_bookmarksParams);
        ParentsStore.onLoad({cId: _params.cId});
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
        this.unsubscribeBookmarks = BookmarksStore.listen(this.onBookmarksChange);
        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        this.unsubscribeChildrens = ChildrensStore.listen(this.onChildrensChange);
        this.unsubscribeParents = ParentsStore.listen(this.onParentsChange);

        this.loadAll();
        this._checkViewer();

        window.macAdd = true;
        //window.addEventListener('macAdd', this.handleFabClick, true);

        window.dropFiles = BookmarksStore.handleDropFiles;
    },

    componentWillUnmount: function() {
        BookmarksStore.reset();
        this.unsubscribeUser();
        this.unsubscribeBookmarks();
        this.unsubscribeCollections();
        this.unsubscribeChildrens();
        this.unsubscribeParents();

        //window.removeEventListener('macAdd', this.handleFabClick, true);
        window.macAdd = false;

        delete window.dropFiles;
    },

    handleActionBarBackground: function(c) {
        try{
          var divs = document.getElementsByClassName("currentCollectionBackground");
          if (divs.length>0)
            for(var i in divs){
              if (!divs[i].classList.contains('icn'))
                divs[i].style.backgroundColor = c;
              
              divs[i].style.fill = c;
            }
        }catch(e){}
    },

    handleCollectionColor: function() {
      if (typeof this.state.collection._id == 'undefined')
        return false;

      if ((!this.state.collection.color)||(this.state.collection.color == null)) {
        var coverURL = null, c = null;
        try{coverURL = this.state.collection.cover[0];}catch(e){}

        if (coverURL!=null) {
            c = Api.getItem("palette_" + coverURL) || null;

            if (c == null) {
                c = colorThief.getDarkPalette(React.findDOMNode(this.refs.collectionIcon));

                if (c!="0,0,0") {
                    Api.setItem("palette_" + coverURL, c);
                }
                else
                    c = null;
            }
        }

        if (c!=null)
            c = "rgb("+c+")";

        CollectionsActions.updateColorCollection({_id: this.state.collection._id, color: c});
      }else
        c = this.state.collection.color;

      this.handleActionBarBackground(c);
    },

    handleCollectionColorError: function() {
      this.handleActionBarBackground(null);
    },

    handleChangeView: function(view){
        if (this.state.collection.view != view) {
            BookmarksActions.clearSelect();

            CollectionsActions.updateCollection({
                item: {_id: this.state.collection._id, view: view},
                silent: true
            });
            if (this.isMounted())
            this.componentWillReceiveProps();
        }
    },

    handleSortChange: function(val){
        _bookmarksParams.sort = val;
        if (this.isMounted())
        this.componentWillReceiveProps();
    },

    handleNextPage: function(e) {
        try{e.preventDefault();}catch(e){}
        if ((!BookmarksStore.getIsLoading())&&(!BookmarksStore.getIsNoMore())&&(this._hasMore)&&(this.isMounted())) {
            _bookmarksParams.page++;
            BookmarksActions.load(_bookmarksParams);
        }
    },

    handleSearchReset: function(e) {
        var needUpdate = false;

        if (typeof _bookmarksParams.search != 'undefined')
            if (_bookmarksParams.search!=false)
                needUpdate = true;

        if(needUpdate) {
            window.location.hash="#/collection/"+_bookmarksParams.cId;
            //this.context.router.transitionTo('collection', {cId: _bookmarksParams.cId});
        }
    },

    contextTypes: {
        router: React.PropTypes.func
    },

    handleMoveCollection: function(fromId, toId) {
      ChildrensStore.onSwapCollections({fromId: fromId, toId: toId});
    },

    handleMoveCollectionEnd: function() {
      ChildrensActions.saveAllSort();
    },

    handleMoveBookmark: function(fromId, toId) {
      BookmarksStore.onSwapBookmarks({fromId: fromId, toId: toId, preservList: true});
    },

    handleMoveBookmarkEnd: function() {
      BookmarksActions.syncMove();
    },

    handleDropBookmark: function(bookmarkId, collectionId) {
      BookmarksActions.updateBookmark({
        item: {
          _id: bookmarkId,
          collectionId: collectionId,
        },
        successMessage: t.s("moveSuccess")
      });
    },

    handleSelectBookmark: function(params) {
      BookmarksActions.setSelected(params);
    },

    handleSelectBookmarksCancel: function() {
      BookmarksActions.clearSelect();
    },

    handleSelectAllBookmarks: function() {
      BookmarksActions.selectAll();
    },

    handleViewerModalClose: function() {
        this.context.router.transitionTo(this.context.router.getCurrentPathname());
    },

    mainContentScroll: function(e) {
      var _this = this;
      this.handleScroll(e, function(stop) {
        if ((window.environment||[]).indexOf("clipper")!=-1)
          _this.handleNextPage();
      });
    },

    render: function() {
        var bview = null, cover = null;

        if (typeof this.state.collection._id != "undefined") {
            if (this.state.bookmarks.length>0) {
                if (this.state.collection.view == 'masonry')
                    bview = React.createElement(BookmarksViewMasonry, {view: this.state.collection.view, 
                                                  sort: _bookmarksParams.sort, 
                                                  items: this.state.bookmarks, 
                                                  canEdit: this.state.collection.author || this.state.collection._id<=0, 
                                                  selectMode: BookmarksStore.getSelectedCount()>0, 
                                                  showPath: this.state.collection._id==0, 
                                                  onMove: this.handleMoveBookmark, 
                                                  onMoveEnd: this.handleMoveBookmarkEnd, 
                                                  onSelect: this.handleSelectBookmark});
                else
                    bview = React.createElement(BookmarksView, {view: this.state.collection.view, 
                                           sort: _bookmarksParams.sort, 
                                           items: this.state.bookmarks, 
                                           canEdit: this.state.collection.author || this.state.collection._id<=0, 
                                           selectMode: BookmarksStore.getSelectedCount()>0, 
                                           showPath: this.state.collection._id==0, 
                                           onMove: this.handleMoveBookmark, 
                                           onMoveEnd: this.handleMoveBookmarkEnd, 
                                           onSelect: this.handleSelectBookmark});
            }
        }

        try{cover = network.fixURL(this.state.collection.cover[0]);}catch(e){}

        var batchEdit = null;
        if (BookmarksStore.getSelectedCount()>0){
          batchEdit = React.createElement(BatchEdit, {count: BookmarksStore.getSelectedCount(), 
                                  bookmarksCount: this.state.collection.count, 
                                  onCancel: this.handleSelectBookmarksCancel, 
                                  onSelectAll: this.handleSelectAllBookmarks});

          document.documentElement.classList.add("side-actions-open");
        }else{
          document.documentElement.classList.remove("side-actions-open");
        }

        var fab = null;
        if ((this.state.collection._id != -99)&&((window.environment||[]).indexOf("mac")==-1)&&((window.environment||[]).indexOf("clipper")==-1))
          fab = React.createElement(Fab, null);

        var search = null, searchQueries = [];
        try{searchQueries = JSON.parse(decodeURIComponent(this.context.router.getCurrentParams().search||""))} catch(e){}

        //desktop mode
        if ((window.environment||[]).indexOf("mac")!=-1){

        }else if ((window.environment||[]).indexOf("clipper")!=-1){

        }else {
          search = React.createElement(Search, {queries: searchQueries, onSearchReset: this.handleSearchReset});
        }

        var actionBarCollectionIcon = null;
        if ( (this.state.collection.color||null) == null )
          actionBarCollectionIcon = React.createElement("img", {src: cover, alt: "", ref: "collectionIcon", className: "hidden", onLoad: this.handleCollectionColor, onError: this.handleCollectionColorError});

        var toolbar = (React.createElement(Toolbar, {
                  collection: this.state.collection, 
                  parents: this.state.parents, 
                  sortSelected: _bookmarksParams.sort, 
                  handleChangeView: this.handleChangeView, 
                  handleSortChange: this.handleSortChange, 
                  onDropBookmark: this.handleDropBookmark, 
                  queries: searchQueries, 
                  onSearchReset: this.handleSearchReset}
                ));

        if ((!UserStore.isLogged())/*&&(!UserStore.isLoading())*/) {
          search = null;
          //toolbar = null;
        }

        var itemsLoading = false;
        if (_bookmarksParams.page==0){
          if (BookmarksStore.getIsLoading()) itemsLoading = true;
          if (ChildrensStore.getIsLoading()) itemsLoading = true;
        }
        //console.log(BookmarksStore.getIsLoading(),ChildrensStore.getIsLoading())

        return (
            React.createElement("div", {className: "max-width main-content-wrap"}, 
                actionBarCollectionIcon, 

                search, 
                toolbar, 

                React.createElement("div", {className: "main-content "+(itemsLoading ? "loading" : ""), onWheel: this.mainContentScroll, ref: "div"}, 
                  React.createElement(Tips, {scope: "bookmarks"}), 

                  React.createElement(ChildrensView, {items: this.state.childrens, 
                                  onCollectionMove: this.handleMoveCollection, 
                                  onCollectionMoveEnd: this.handleMoveCollectionEnd, 
                                  onDropBookmark: this.handleDropBookmark}), 
                  React.createElement(InfiniteScroll, {
                      pageStart: 0, 
                      loadMore: this.handleNextPage, 
                      hasMore: true, 
                      loader: React.createElement("span", null)}, 
                      bview, 
                      React.createElement("div", {className: "show-more-button " + ( ((!BookmarksStore.getIsLoading()) && (!BookmarksStore.getIsNoMore()) && (UserStore.isLogged())) ? "show-more-button-visible" : "") }, t.s("more"), React.createElement("a", {href: "", className: "permalink", onClick: this.handleNextPage}))
                  ), 

                  batchEdit, 
                  React.createElement("span", {className: "loading-placeholder"})
                ), 

                React.createElement(DocumentTitle, {title: this.state.collection.title||""}), 

                fab, 

                React.createElement(Modal, {position: "viewer", forceUpdated: true, isOpened: this.state.viewerModal.show, onClose: this.handleViewerModalClose, closeOnOutsideClick: false, closeOnEsc: true, params: this.state.viewerModal}, 
                    React.createElement(ViewerModal, {router: this.context.router, loadMore: this.handleNextPage})
                )
            ));
    }
});

},{"../../actions/Bookmarks":2,"../../actions/Childrens":3,"../../actions/Collections":4,"../../actions/Parents":7,"../../modules/colorThief.js":104,"../../stores/Bookmarks":113,"../../stores/Childrens":114,"../../stores/Collections":115,"../../stores/Parents":118,"../components/Bookmarks/BatchEdit.js":16,"../components/Bookmarks/List.js":19,"../components/Bookmarks/Masonry.js":20,"../components/Collections/Childrens.js":26,"../components/Collections/ClipperToolbar.js":27,"../components/Collections/DesktopToolbar.js":28,"../components/Collections/Toolbar.js":34,"../components/Fab.js":35,"../components/Helpers/ScrollFixMixin.js":48,"../components/Helpers/Tips.js":51,"../components/Modals/Viewer":62,"../components/Search/Search.js":84,"react-infinite-scroll":"react-infinite-scroll"}],94:[function(require,module,exports){
/** @jsx React.DOM */
var Favorite = require('../components/Bookmarks/Favorite.js'),
    Search = require('../components/Search/Search.js'),
    Collection = require('../components/Collections/Item.js'),
    GroupTab = require('../components/Collections/GroupTab.js'),
    Fab = require('../components/Fab.js'),
    Tips = require('../components/Helpers/Tips.js');

var BookmarksActions = require('../../actions/Bookmarks');
var BookmarksStore = require('../../stores/Bookmarks');

var CollectionsActions = require('../../actions/Collections');
var CollectionsStore = require('../../stores/Collections');

var UserActions = require('../../actions/User');

var SidebarActions = require('../../actions/Sidebar'),
    SidebarStore = require('../../stores/Sidebar');

var Onboard = require("../components/Helpers/Onboard.js");

var dashboard = React.createClass({
    displayName: "routes/Dashboard",

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        BookmarksStore.onLoad({
          cId: -2,
          page: 0,
          sort: "sort",
          speed: "sync"
        }, function(){
          //BookmarksStore.onInitFavorites();
        });

        return {
            favorites: BookmarksStore.getBookmarks(),
            collections: CollectionsStore.getCollections(),
            user: UserStore.getUser(),
            sidebarOpen: SidebarStore.getState(),

            group: {
              active: parseInt(Api.getItem("dashboard-active-group") || -1),
              direction: "right"
            }
        }
    },

    onBookmarksChange: function(bookmarks) {
        if (this.isMounted())
        this.setState({
          favorites: bookmarks
        });
    },

    onCollectionsChange: function(collections) {
        if (this.isMounted())
        this.setState({
            collections: collections
        });
    },

    onUserChange: function(user) {
        if (this.isMounted()){
          this.setState({
              user: user
          });
        }
    },

    onToggleGroup: function(id) {
        UserActions.toggleGroup({id:id});
        return false;
    },

    onSidebarChange: function(open) {
      if (this.isMounted())
        this.setState({sidebarOpen: open});
    },

    componentWillMount: function() {
        CollectionsStore.onLoad();
    },

    componentDidMount: function() {
        this.unsubscribeBookmarks = BookmarksStore.listen(this.onBookmarksChange);
        this.unsubscribeCollections = CollectionsStore.listen(this.onCollectionsChange);
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
        this.unsubscribeSidebar = SidebarStore.listen(this.onSidebarChange);

        CollectionsActions.setCurrent(-2);

        window.dropFiles = BookmarksStore.handleDropFiles; 
    },

    componentWillUnmount: function() {
        //CollectionsStore.reset();
        BookmarksStore.reset();
        this.unsubscribeBookmarks();
        this.unsubscribeCollections();
        this.unsubscribeUser();
        this.unsubscribeSidebar();

        delete window.dropFiles;
    },

    handleFavAddClick: function(e){
        if (e)
          e.preventDefault();
        
        Pop.show("URL", {
          pin: "fabAppButton",
          parentId: CollectionsStore.getCurrentId()
        })
    },

    handleMoveFavorite: function(fromId, toId) {
      BookmarksStore.onSwapBookmarks({fromId: fromId, toId: toId});
    },

    handleSaveSortFavorites: function() {
      BookmarksActions.saveAllSort();
    },

    handleMoveCollection: function(fromId, toId) {
      UserStore.onSwapCollections({fromId: fromId, toId: toId});
    },

    handleMoveCollectionEnd: function() {

    },

    handleMoveGroup: function(fromId, toId) {
      UserStore.onSwapGroups({fromId: fromId, toId: toId});
    },

    handleTabChange: function(e) {
      var group = _.clone(this.state.group);

      if (typeof e.target != "undefined"){
        if (e.target.getAttribute("data-id"))
          group.active = parseInt(e.target.getAttribute("data-id"));
        else
          return false;
      }
      else
        group.active = e.id;

      group.direction = "right";

      //direction
      var lastIndex = _.findIndex(this.state.user.groups, {id: this.state.group.active});
      var currentIndex = _.findIndex(this.state.user.groups, {id: group.active});
      if (currentIndex < lastIndex)
        group.direction = "left";

      if (this.isMounted())
      this.setState({group: group});

      Api.setItem("dashboard-active-group", group.active);
    },

    handleSignInGoogle: function(e) {
      e.preventDefault();

      UserActions.signIn(function() {
        location.hash="#/";
        location.reload();
      }, {google: true});
    },

    render: function() {
        var _this = this;

        var items = [];

        if ((!this.state.sidebarOpen)&&(UserStore.isLogged())) {
          var groups = [], groups_content = null;
          if (this.state.group.active>=0){
            var activeGroupIndex = _.findIndex(this.state.user.groups, {id: this.state.group.active});
            if (activeGroupIndex==-1)
              this.state.group.active = -1;
          }

          if (UserStore.isLogged()){
            if ((this.state.user.groups||[]).length>0){
              this.state.user.groups.forEach(function(item, index){
                //if ((item.collections||[]).length>0)
                  groups.push(
                    React.createElement(GroupTab, {id: item.id, 
                              key: "grouptab_item_"+item.id, 
                              active: _this.state.group.active == item.id, 
                              onClick: _this.handleTabChange, 
                              onMove: _this.handleMoveGroup}, 
                      item.title
                    ));
              });
            }
          }else{
            /*groups.push(
              <div className={"item"+(this.state.group.active==-2?" active":"")} data-id="-2" key={-2} onClick={_this.handleTabChange}><div className="title">{t.s("bookmarks")}</div></div>
            );*/
          }

          groups_content = (
            React.createElement("div", {className: "groups-tab", "data-direction": this.state.group.direction}, 
              React.createElement("div", {className: "item"+(this.state.group.active==-1?" active":""), "data-id": "-1", onClick: _this.handleTabChange}, React.createElement("div", {className: "title no-padding"}, React.createElement(Icon, {name: "best"}))), 
              groups
            )
          );
        }else{
          this.state.group.active = -1;
        }

        /*if (groups_content == null)
          tab = -1;*/

        switch(this.state.group.active){
          case -1:
            if (UserStore.isLogged()){
              items = (this.state.favorites||[]).map(function(item){
                  return (React.createElement(Favorite, {item: item, key: "fav_"+item._id, onMove: _this.handleMoveFavorite, onEndDrag: _this.handleSaveSortFavorites}));
              });

              if (items.length==0){
                items.push(
                  React.createElement("figure", {className: "card favorite-item favorite-white favorite-add", id: "fav_add", key: "fav_add"}, 
                    React.createElement("div", {className: "favicon favicon-svg"}, 
                      React.createElement(Icon, {name: "bookmark-outline", size: "big"})
                    ), 
                    React.createElement("figcaption", {className: "about"}, 
                      React.createElement("div", {className: "title"}, t.s("add"))
                    ), 
                    React.createElement("a", {href: "", onClick: _this.handleFavAddClick, className: "permalink"})
                  )
                );
              }

              //items.push(<Collection item={CollectionsStore.getCollection(0)} key={"d0"} />);
              //items.push(<Collection item={CollectionsStore.getCollection(-1)} key={"d-1"} />);
            }else if (!UserStore.isLoading()) {
              items = [
                React.createElement("div", {className: "max-width", key: "fav_onboard"}, React.createElement(Onboard, {className: "anim-material-from-center", scenario: "bookmarks", params: {actions: true}}))
              ];
            }
          break;

          default:
            if (typeof this.state.user.groups[activeGroupIndex] != "undefined")
            (this.state.user.groups[activeGroupIndex].collections||[]).forEach(function(c){
                var collection = CollectionsStore.getCollection(c);
                if (collection!=null)
                  items.push (React.createElement(Collection, {item: collection, 
                                          key: "collection_item_"+collection._id, 
                                          onMove: _this.handleMoveCollection, 
                                          onEndDrag: _this.props.handleMoveCollectionEnd}));
            });

            items.push(React.createElement(Tips, {key: "fav_tips", scope: "collections", params: {collectionsCount: items.length}}));
          break;
        }

        var search = React.createElement(Search, {q: ""});
        var fab = React.createElement(Fab, null);

        if ((!UserStore.isLogged()) && (!UserStore.isLoading())){
          fab = null;
          search = null;
        }

        return (
            React.createElement("div", {className: "max-width"}, 
                search, 
                React.createElement("div", {className: "dashboard-wrap"}, 
                  React.createElement("div", {className: "dashboard"}, items)
                ), 

                React.createElement(DocumentTitle, {title: strings.defaultTitle()}), 

                fab, 

                groups_content
            ));
    }
});

module.exports = dashboard;

},{"../../actions/Bookmarks":2,"../../actions/Collections":4,"../../actions/Sidebar":9,"../../actions/User":14,"../../stores/Bookmarks":113,"../../stores/Collections":115,"../../stores/Sidebar":120,"../components/Bookmarks/Favorite.js":17,"../components/Collections/GroupTab.js":29,"../components/Collections/Item.js":31,"../components/Fab.js":35,"../components/Helpers/Onboard.js":45,"../components/Helpers/Tips.js":51,"../components/Search/Search.js":84}],95:[function(require,module,exports){
/** @jsx React.DOM */
var UserActions = require('../../actions/User');
var CollectionsStore = require('../../stores/Collections');

var CoverSelector = require("../components/Helpers/CoverSelector"),
    OverflowScroll = require("../components/Helpers/OverflowScroll");

module.exports = React.createClass({
    displayName: "routes/Interface",

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        var bgs = consts.backgroundImages.map(function(item){
            return item.src;
        });

        return {
            backgroundImages: bgs,
            backgroundImageSelected: consts.getBackgroundSelected(),

            user: UserStore.getUser()
        };
    },

    handleClose: function(e) {
        if (e)
            e.preventDefault();

        try{
          window.history.back();
        }catch(e) {
          if (e)
            window.location.hash = "#/";
        }
    },

    handleChangeBackground: function(index) {
        Api.setItem("background-image",this.state.backgroundImages[index]);
        consts.setBackground();
    },

    onUserChange: function(user) {
        this.setState({
            user: user
        });
    },

    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
    },

    componentWillUnmount: function() {
        this.unsubscribeUser();
    },

    render: function() {
        return (
            React.createElement("div", {className: "max-width"}, React.createElement("div", {className: "centered-content", style: {height:"100vh"}}, 
            React.createElement("div", {className: "modal-dialog"}, 
                React.createElement("header", null, 
                    React.createElement("div", {className: "actionBar"}, 
                        React.createElement("div", {className: "actions"}, 
                            React.createElement("a", {href: "", className: "action-icon", onClick: this.handleClose}, React.createElement(Icon, {name: "back"}))
                        ), 
                        React.createElement("h3", null, t.s("interfaceStyle"))
                    )

                    
                ), 

                React.createElement("article", null, 
                    React.createElement("div", {style: {margin:"0 -16px"}}, 
                        React.createElement(CoverSelector, {items: this.state.backgroundImages, thumbs: true, selected: this.state.backgroundImageSelected, onSelect: this.handleChangeBackground})
                    )
                )
            )
            ), 

            React.createElement(DocumentTitle, {title: t.s("interfaceStyle")})
            )
        );
    }
});

},{"../../actions/User":14,"../../stores/Collections":115,"../components/Helpers/CoverSelector":41,"../components/Helpers/OverflowScroll":46}],96:[function(require,module,exports){
var RouteHandler = Router.RouteHandler;

var CollectionsStore = require('../../stores/Collections');

module.exports = React.createClass({displayName: "exports",
	contextTypes: {
        router: React.PropTypes.func
    },

	componentDidMount: function() {
		CollectionsStore.onSetCurrent(null);
	},

	render: function() {
		var path = [{title: t.s("tools"), href: "#/tools"}];

		return (
			React.createElement("div", {className: "max-width main-content-wrap"}, 
				React.createElement(RouteHandler, {path: path})
			)
		);
	}
});

},{"../../stores/Collections":115}],97:[function(require,module,exports){
var TitleBar = require("../../components/UnifiedTitleBar");

module.exports = React.createClass({displayName: "exports",
	renderItem: function(item) {
		return (
			React.createElement("figure", {className: "card collection-item"}, 
				React.createElement("div", {className: "favicon"}, 
					item.icon
				), 

				React.createElement("figcaption", {className: "about"}, 
					React.createElement("div", {className: "title"}, item.title)
				), 

				React.createElement("a", {href: item.href, className: "permalink"})
			)
		);
	},
	
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(DocumentTitle, {title: t.s("tools")}), 
				React.createElement(TitleBar, {path: this.props.path}), 
				React.createElement("div", {className: "bookmarks view-grid childrens"}, 
					this.renderItem({title: t.s("tags"), href: "#/tools/tags", icon: React.createElement("img", {className: "icon", src: network.fixURL("/other/welcome3/images/tag.svg")})})
				)
			)
		);
	}
});

},{"../../components/UnifiedTitleBar":89}],98:[function(require,module,exports){
var TitleBar = require("../../components/UnifiedTitleBar");

var TagsStore = require('../../../stores/Tags');
var TagEditModal = require('../../components/Modals/TagEdit');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			tags: TagsStore.getTags(),
			sort: "count",

			tagModal: {
	            index: 0,
	            show: false
	        }
		}
	},

	componentDidMount: function() {
        this.unsubscribeTags = TagsStore.listen(this.onTagsChange);
        TagsStore.onLoad();
    },

    componentWillUnmount: function() {
        this.unsubscribeTags();
    },

    onTagsChange: function(tags) {
    	this.setState({tags: tags});
    },

    handleSortTitle: function(e) {
    	e.preventDefault();
    	this.setState({sort: "title"});
    },

    handleSortCount: function(e) {
    	e.preventDefault();
    	this.setState({sort: "count"});
    },

    handleTagEditModalClose: function() {
		if (this.isMounted()){
			var temp = JSON.parse(JSON.stringify(this.state.tagModal));
			temp.show = false;
			this.setState({tagModal: temp});
		}
	},

	handleTagEditModalOpen: function(e) {
		e.preventDefault();
		if (this.isMounted()){
			var temp = JSON.parse(JSON.stringify(this.state.tagModal));
			temp.index = _.findIndex(this.state.tags, {_id: e.target.getAttribute("data-title")});
			temp.show = true;

			this.setState({tagModal: temp});
		}
	},

	handleRemove: function(e) {
		e.preventDefault();
		TagsStore.onRemove({_id: e.target.getAttribute("data-title")});	
	},

	render: function() {
		var _this = this;
		var tags = _.sortBy(this.state.tags, [this.state.sort]).map(function(item) {
			return (
				React.createElement("figure", {className: "card list-item"}, 
					React.createElement("div", {className: "favicon"}, 
						React.createElement(Icon, {name: "tag"})
					), 

					React.createElement("figcaption", {className: "about"}, 
						React.createElement("div", {className: "title"}, item._id)
					), 

					React.createElement("figcaption", {className: "type subinfo"}, 
						item.count
					), 

					React.createElement("div", {className: "more"}, 
			            React.createElement("a", {href: "#/collection/0/%23"+item._id, className: "action-icon icon-more"}, React.createElement(Icon, {name: "open-link"})), 
			            React.createElement("a", {href: "", className: "action-icon", "data-title": item._id, onClick: _this.handleTagEditModalOpen}, React.createElement(Icon, {name: "pencil"})), 
			            React.createElement("a", {href: "", className: "action-icon", "data-title": item._id, onClick: _this.handleRemove}, React.createElement(Icon, {name: "trash"}))
			        ), 

					React.createElement("a", {href: "", onClick: _this.handleTagEditModalOpen, "data-title": item._id, className: "permalink"})
				)
			);
		});
		if (this.state.sort=="count")
			tags.reverse();

		var content = null;
		if (tags.length>0)
			content = (
				React.createElement("div", {className: "bookmarks view-simple small-table"}, 
					React.createElement("figure", {className: "card list-item table-head"}, 
						React.createElement("div", {className: "favicon"}), 

						React.createElement("figcaption", {className: "about "+(this.state.sort=="title" ? "active" : "")}, 
							React.createElement("a", {href: "", onClick: this.handleSortTitle}, t.s("name")), 
							React.createElement(Icon, {name: "arrow-top", size: "small", className: "sorting-icon"})
						), 

						React.createElement("figcaption", {className: (this.state.sort == "count" ? "active" : null)}, 
							React.createElement("a", {href: "", onClick: this.handleSortCount}, _.capitalize(t.s("byBookmarksCount"))), 
							React.createElement(Icon, {name: "arrow-bottom", size: "small", className: "sorting-icon"})
						)
					), 

					tags
				)
			);
		else
			content = (
				React.createElement("div", {className: "tips"}, 
					React.createElement("div", {className: "tip tip-color-light"}, 
						React.createElement("div", {className: "content"}, 
							React.createElement("div", {className: "text"}, 
								React.createElement("h3", null, t.s("noTags"))
							)
						)
					)
				)
			);

		return (React.createElement("div", null, 
			React.createElement(DocumentTitle, {title: t.s("tools") + " / " + t.s("tags")}), 
			React.createElement(TitleBar, {path: this.props.path.concat([{title: t.s("tags")}])}), 

			content, 

			React.createElement(Modal, {isOpened: this.state.tagModal.show, onClose: this.handleTagEditModalClose, closeOnOutsideClick: true, params: this.state.tagModal}, 
				React.createElement(TagEditModal, null)
			)
		));
	}
});

},{"../../../stores/Tags":123,"../../components/Modals/TagEdit":61,"../../components/UnifiedTitleBar":89}],99:[function(require,module,exports){
/** @jsx React.DOM */
module.exports = React.createClass({
    displayName: "routes/WaitAuth",

    contextTypes: {
        router: React.PropTypes.func
    },

    _checker: null,

    componentDidMount: function() {
        var _query = this.context.router.getCurrentQuery();
        var _this = this;

        if (Api.getItem("logged")!=null){
            Api.removeItem("logged");
            window.location.hash = "#/";
            return;
        }

    	this._checker = setInterval(function() {
            Api.removeItem("logged");
    		Api.get("user", function(json) {
    			if (json.result){
                    Api.setItem("logged", "true");
                    _this.handleRefresh();
                }
    		});
    	}, 2000);
    },

    handleRefresh: function(e) {
        if (typeof e != "undefined")
            e.preventDefault();

        //this.context.router.transitionTo('waitauth');
        window.location.reload();
    },

    componentWillUnmount: function() {
    	clearInterval(this._checker);
    },

    render: function() {
    	return (
    		React.createElement("div", {className: "absoluteLoading"}, 
    			React.createElement("div", {className: "loader-inner line-scale"}, React.createElement("div", null), React.createElement("div", null), React.createElement("div", null), React.createElement("div", null)), 
    			React.createElement("br", null), 
    			React.createElement("a", {href: "", onClick: this.handleRefresh, className: "action-icon active"}, t.s("refresh"))
    		)
    	);
    }
});

},{}],100:[function(require,module,exports){
module.exports = React.createClass({
    displayName: "routes/WebHome",

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount: function() {
        window.location.hash="#/collection/0";
    	//this.context.router.transitionTo('collection', {cId: 0});
    },

    render: function() {
    	return React.createElement("div", null);
    }
});

},{}],101:[function(require,module,exports){
module.exports = {
	search: function(q, page, callback) {
		Api.get("https://api.iconfinder.com/v2/icons/search?query="+encodeURIComponent(""+q)+"&minimum_size=128&count=100&offset="+(100*page), function(json) {
			if (json.icons){
				var icons = [];
				json.icons.forEach(function(item) {
					//var isPixel = _.findIndex(item.styles, {identifier: "pixel"});
					if ((!item.is_premium)/*&&(isPixel==-1)*/)
						icons.push(item["raster_sizes"][item["raster_sizes"].length-1].formats[0].preview_url);
				});
				callback(icons);
			}else
				callback([]);
		});
	}
}

},{}],102:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.ReactDND=e():t.ReactDND=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(32),i=r.HTML5,o=n(39);t.exports={DragDropMixin:o(i),ImagePreloaderMixin:n(34),DragLayerMixin:n(33),HorizontalDragAnchors:n(19),VerticalDragAnchors:n(20),NativeDragItemTypes:n(8),DropEffects:n(7)}},function(t){function e(t){return"number"==typeof t&&t>-1&&t%1==0&&n>=t}var n=Math.pow(2,53)-1;t.exports=e},function(t){function e(t){var e=typeof t;return"function"==e||t&&"object"==e||!1}t.exports=e},function(t,e,n){function r(t){return null==t?!1:f.call(t)==s?l.test(u.call(t)):o(t)&&a.test(t)||!1}var i=n(73),o=n(4),s="[object Function]",a=/^\[object .+?Constructor\]$/,c=Object.prototype,u=Function.prototype.toString,f=c.toString,l=RegExp("^"+i(f).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t){function e(t){return t&&"object"==typeof t||!1}t.exports=e},function(t,e,n){var r=n(1),i=n(3),o=n(4),s="[object Array]",a=Object.prototype,c=a.toString,u=i(u=Array.isArray)&&u,f=u||function(t){return o(t)&&r(t.length)&&c.call(t)==s||!1};t.exports=f},function(t,e,n){"use strict";var r=n(17),i=r({DRAG_START:null,DRAG_END:null,DRAG:null,DROP:null});t.exports=i},function(t){"use strict";var e={COPY:"copy",MOVE:"move",LINK:"link"};t.exports=e},function(t){"use strict";var e={FILE:"__NATIVE_FILE__",URL:"__NATIVE_URL__"};t.exports=e},function(t,e,n){"use strict";var r=n(48).Dispatcher,i=n(15),o=i(new r,{handleAction:function(t){this.dispatch({action:t})}});t.exports=o},function(t,e,n){"use strict";var r=n(9),i=n(6),o=n(22),s=null,a=null,c=null,u=o({getInitialOffsetFromContainer:function(){return s},getInitialOffsetFromClient:function(){return a},getCurrentOffsetFromClient:function(){return c}});u.dispatchToken=r.register(function(t){var e=t.action;switch(e.type){case i.DRAG_START:s=e.offsetFromContainer,a=e.offsetFromClient,c=e.offsetFromClient,u.emitChange();break;case i.DRAG:c=e.offsetFromClient,u.emitChange();break;case i.DRAG_END:s=null,a=null,c=null,u.emitChange()}}),t.exports=u},function(t,e,n){"use strict";var r=n(9),i=n(6),o=n(10),s=n(22),a=null,c=null,u=null,f=null,l=s({isDragging:function(){return!!a},getEffectsAllowed:function(){return u},getDropEffect:function(){return f},getDraggedItem:function(){return a},getDraggedItemType:function(){return c}});l.dispatchToken=r.register(function(t){r.waitFor([o.dispatchToken]);var e=t.action;switch(e.type){case i.DRAG_START:f=null,a=e.item,c=e.itemType,u=e.effectsAllowed,l.emitChange();break;case i.DROP:f=e.dropEffect,l.emitChange();break;case i.DRAG_END:a=null,c=null,u=null,f=null,l.emitChange()}}),t.exports=l},function(t){"use strict";function e(){return!!window.safari}t.exports=e},function(t){function e(t,e){return t=+t,e=null==e?n:e,t>-1&&t%1==0&&e>t}var n=Math.pow(2,53)-1;t.exports=e},function(t,e,n){function r(t){var e=o(t)?t.length:void 0;return i(e)&&c.call(t)==s||!1}var i=n(1),o=n(4),s="[object Arguments]",a=Object.prototype,c=a.toString;t.exports=r},function(t){function e(t){if(null==t)throw new TypeError("Object.assign target cannot be null or undefined");for(var e=Object(t),n=Object.prototype.hasOwnProperty,r=1;r<arguments.length;r++){var i=arguments[r];if(null!=i){var o=Object(i);for(var s in o)n.call(o,s)&&(e[s]=o[s])}}return e}t.exports=e},function(t){"use strict";var e=function(t,e,n,r,i,o,s,a){if(!t){var c;if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,i,o,s,a],f=0;c=new Error("Invariant Violation: "+e.replace(/%s/g,function(){return u[f++]}))}throw c.framesToPop=1,c}};t.exports=e},function(t,e,n){"use strict";var r=n(16),i=function(t){var e,n={};r(t instanceof Object&&!Array.isArray(t));for(e in t)t.hasOwnProperty(e)&&(n[e]=e);return n};t.exports=i},function(t,e,n){"use strict";var r=n(9),i=n(6),o={startDragging:function(t,e,n,o,s){r.handleAction({type:i.DRAG_START,itemType:t,item:e,effectsAllowed:n,offsetFromClient:o,offsetFromContainer:s})},drag:function(t){r.handleAction({type:i.DRAG,offsetFromClient:t})},recordDrop:function(t){r.handleAction({type:i.DROP,dropEffect:t})},endDragging:function(){r.handleAction({type:i.DRAG_END})}};t.exports=o},function(t,e,n){"use strict";var r=n(17),i=r({LEFT:null,CENTER:null,RIGHT:null});t.exports=i},function(t,e,n){"use strict";var r=n(17),i=r({TOP:null,CENTER:null,BOTTOM:null});t.exports=i},function(t,e,n){"use strict";var r=function(t,e,n){e&&Object.defineProperties(t,e),n&&Object.defineProperties(t.prototype,n)},i=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},o=n(51),s=n(52),a=function(){function t(){i(this,t),this._entered=[]}return r(t,null,{enter:{value:function(t){return this._entered=o(this._entered.filter(function(e){return document.body.contains(e)&&(!e.contains||e.contains(t))}),[t]),1===this._entered.length},writable:!0,configurable:!0},leave:{value:function(t){return this._entered=s(this._entered.filter(function(t){return document.body.contains(t)}),t),0===this._entered.length},writable:!0,configurable:!0},reset:{value:function(){this._entered=[]},writable:!0,configurable:!0}}),t}();t.exports=a},function(t,e,n){"use strict";function r(t){var e=o({emitChange:function(){this.emit(s)},addChangeListener:function(t){this.on(s,t)},removeChangeListener:function(t){this.removeListener(s,t)}},t,i.prototype);return e.setMaxListeners(0),e}var i=n(77).EventEmitter,o=n(15),s="change";t.exports=r},function(t){"use strict";function e(t){if(!t.dataTransfer)return!1;var e=Array.prototype.slice.call(t.dataTransfer.types);return-1!==e.indexOf("Files")}t.exports=e},function(t,e,n){"use strict";function r(t){switch(t){case i.FILE:case i.URL:return!0;default:return!1}}var i=n(8);t.exports=r},function(t){"use strict";function e(t){var e=Array.prototype.slice.call(t.dataTransfer.types);return-1!==e.indexOf("Url")||-1!==e.indexOf("text/uri-list")}t.exports=e},function(t,e,n){function r(t,e,n){if(e!==e)return i(t,n);for(var r=n-1,o=t.length;++r<o;)if(t[r]===e)return r;return-1}var i=n(66);t.exports=r},function(t,e,n){function r(t,e){var n=t.data,r="string"==typeof e||i(e)?n.set.has(e):n.hash[e];return r?0:-1}var i=n(2);t.exports=r},function(t,e,n){(function(e){var r=n(53),i=n(74),o=n(3),s=o(s=e.Set)&&s,a=o(a=Object.create)&&a,c=a&&s?function(t){return new r(t)}:i(null);t.exports=c}).call(e,function(){return this}())},function(t,e,n){(function(e){var r=n(3),i=/\bthis\b/,o=Object.prototype,s=(s=e.window)&&s.document,a=o.propertyIsEnumerable,c={};!function(){c.funcDecomp=!r(e.WinRTError)&&i.test(function(){return this}),c.funcNames="string"==typeof Function.name;try{c.dom=11===s.createDocumentFragment().nodeType}catch(t){c.dom=!1}try{c.nonEnumArgs=!a.call(arguments,1)}catch(t){c.nonEnumArgs=!0}}(0,0),t.exports=c}).call(e,function(){return this}())},function(t){function e(){}t.exports=e},function(t,e,n){"use strict";function r(t){if(t.nodeType!==O&&(t=t.parentElement),!t)return null;var e=t.getBoundingClientRect();return{top:e.top,left:e.left,width:e.width,height:e.height}}function i(t){return{x:t.clientX,y:t.clientY}}function o(){if(!v){var t=r(p);v=!I(d,t)}return v}function s(){if(h&&!document.body.contains(p)){var t=y.getDraggedItemType();h.handleDragEnd(t,null)}}function a(){var t=y.getDraggedItemType();return E(t)}function c(t){y.isDragging()||(T(t)?D.startDragging(x.URL,null):t.preventDefault())}function u(t){t.preventDefault();var e=C.enter(t.target);e&&!y.isDragging()&&(w(t)?D.startDragging(x.FILE,null):T(t)&&D.startDragging(x.URL,null))}function f(t){a()&&t.preventDefault();var e=i(t);D.drag(e),m&&(t.dataTransfer.dropEffect=m,m=null),p&&A()&&o()&&t.preventDefault()}function l(t){a()&&t.preventDefault();var e=C.leave(t.target);e&&a()&&D.endDragging()}function g(t){a()&&t.preventDefault(),C.reset(),a()&&D.endDragging(),s()}var p,h,d,v,m,D=n(18),y=n(11),x=n(8),_=n(21),w=n(23),T=n(25),E=n(24),b=n(38),I=n(76),A=n(46),O=1,C=new _,L={setup:function(){"undefined"!=typeof window&&(window.addEventListener("dragstart",c),window.addEventListener("dragenter",u,!0),window.addEventListener("dragleave",l,!0),window.addEventListener("dragover",f),window.addEventListener("drop",g))},teardown:function(){"undefined"!=typeof window&&(window.removeEventListener("dragstart",c),window.removeEventListener("dragenter",u,!0),window.removeEventListener("dragleave",l,!0),window.removeEventListener("dragover",f),window.removeEventListener("drop",g))},beginDrag:function(t,e,n,i,o,a,c){var u=e.nativeEvent,f=u.dataTransfer,l=u.target;b(f,n,i,o,a,c),h=t,p=l,d=r(l),v=!1,window.addEventListener("mousemove",s,!0)},endDrag:function(){p=null,h=null,d=null,v=!1,window.removeEventListener("mousemove",s,!0)},dragOver:function(t,e,n){m||(m=n)},getDragSourceProps:function(t,e){return{draggable:!0,onDragStart:t.handleDragStart.bind(t,e),onDragEnd:t.handleDragEnd.bind(t,e)}},getDropTargetProps:function(t,e){return{onDragEnter:t.handleDragEnter.bind(t,e),onDragOver:t.handleDragOver.bind(t,e),onDragLeave:t.handleDragLeave.bind(t,e),onDrop:t.handleDrop.bind(t,e)}},getOffsetFromClient:function(t,e){return i(e)}};t.exports=L},function(t,e,n){"use strict";t.exports={HTML5:n(31)}},function(t,e,n){"use strict";var r=n(11),i=n(10),o={getInitialState:function(){return this.getStateForDragLayerMixin()},getDragLayerState:function(){var t=this.state,e=t.isDragging,n=t.draggedItemType,r=t.draggedItem,i=t.initialOffset,o=t.currentOffset,s=t.currentOffsetFromClient,a=t.initialOffsetFromClient,c=t.initialOffsetFromContainer;return{isDragging:e,draggedItemType:n,draggedItem:r,initialOffset:i,currentOffset:o,currentOffsetFromClient:s,initialOffsetFromClient:a,initialOffsetFromContainer:c}},getStateForDragLayerMixin:function(){var t=i.getInitialOffsetFromClient(),e=i.getCurrentOffsetFromClient(),n=i.getInitialOffsetFromContainer(),o=!1,s=null,a=null,c=null,u=null;return t&&e&&(o=!0,s=r.getDraggedItemType(),a=r.getDraggedItem(),c={x:t.x-n.x,y:t.y-n.y},u={x:e.x-n.x,y:e.y-n.y}),{isDragging:o,draggedItemType:s,draggedItem:a,initialOffset:c,currentOffset:u,currentOffsetFromClient:e,initialOffsetFromClient:t,initialOffsetFromContainer:n}},handleStoreChangeInDragLayerMixin:function(){this.isMounted()&&this.setState(this.getStateForDragLayerMixin())},componentDidMount:function(){i.addChangeListener(this.handleStoreChangeInDragLayerMixin),r.addChangeListener(this.handleStoreChangeInDragLayerMixin)},componentWillUnmount:function(){i.removeChangeListener(this.handleStoreChangeInDragLayerMixin),r.removeChangeListener(this.handleStoreChangeInDragLayerMixin)}};t.exports=o},function(t,e,n){"use strict";var r=n(44),i="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",o={componentDidMount:function(){this._cachedImages={},this._readyImages={},this.preloadImages()},componentDidUpdate:function(){this.preloadImages()},componentWillUnmount:function(){for(var t in this._cachedImages)this._cachedImages[t].src=i;this._cachedImages={}},hasPreloadedImage:function(t){return!!this._readyImages[t]},getPreloadedImage:function(t){return this.hasPreloadedImage(t)?this._cachedImages[t]:void 0},preloadImages:function(){var t=this.getImageUrlsToPreload();t.forEach(this.preloadImage)},preloadImage:function(t){var e=this;if(t&&!this._cachedImages[t]){var n=new Image;n.onload=function(){e.isMounted()&&(e._readyImages[t]=!0)},n.onerror=function(){e.isMounted()&&delete e._cachedImages[t]},n.src=t,this._cachedImages[t]=n}},getDragImageScale:r};t.exports=o},function(t,e,n){"use strict";var r=n(16),i=n(30),o={canDrag:function(){return!0},beginDrag:function(){r(!1,"Drag source must contain a method called beginDrag. See https://github.com/gaearon/react-dnd#drag-source-api")},endDrag:i};t.exports=o},function(t,e,n){"use strict";var r=n(30),i={canDrop:function(){return!0},getDropEffect:function(t,e){return e[0]},enter:r,over:r,leave:r,acceptDrop:r};t.exports=i},function(t,e,n){"use strict";var r=n(10),i={getCurrentOffsetDelta:function(){var t=r.getInitialOffsetFromClient(),e=r.getCurrentOffsetFromClient();return{x:e.x-t.x,y:e.y-t.y}},getInitialOffsetFromClient:function(){return r.getInitialOffsetFromClient()},getCurrentOffsetFromClient:function(){return r.getCurrentOffsetFromClient()},getInitialOffsetFromContainer:function(){return r.getInitialOffsetFromContainer()}};t.exports=i},function(t,e,n){"use strict";function r(t,e,n,r,a,c){try{t.setData("application/json",{})}catch(u){}if(i(n)&&t.setDragImage){var f=o(e,n,r,a);t.setDragImage(n,f.x,f.y)}t.effectAllowed=s(c)}var i=n(47),o=n(43),s=n(42);t.exports=r},function(t,e,n){"use strict";function r(t,e){v(e&&("string"==typeof e||"symbol"==typeof e),"Expected item type to be a non-empty string or a symbol. See %s",t.constructor.displayName)}function i(t,e){var n=t.constructor.displayName;v(t._dragSources[e],'There is no drag source for "%s" registered in %s. Have you forgotten to register it? See configureDragDrop in %s',e,n,n)}function o(t,e){var n=t.constructor.displayName;v(t._dropTargets[e],'There is no drop target for "%s" registered in %s. Have you forgotten to register it? See configureDragDrop in %s',e,n,n)}function s(t){function e(e){0===s&&t.setup(e),s++}function n(e){s--,0===s&&t.teardown(e)}var s=0;return{getInitialState:function(){var t={ownDraggedItemType:null,currentDropEffect:null};return m(t,this.getStateForDragDropMixin())},getActiveDropTargetType:function(){var t=this.state,e=t.draggedItemType,n=t.draggedItem,r=t.ownDraggedItemType,i=this._dropTargets[e];if(!i)return null;if(e===r)return null;var o=i.canDrop;return o(this,n)?e:null},isAnyDropTargetActive:function(t){return t.indexOf(this.getActiveDropTargetType())>-1},getStateForDragDropMixin:function(){return{draggedItem:c.getDraggedItem(),draggedItemType:c.getDraggedItemType()}},getDragState:function(t){return r(this,t),i(this,t),{isDragging:this.state.ownDraggedItemType===t}},getDropState:function(t){r(this,t),o(this,t);var e=this.getActiveDropTargetType()===t,n=!!this.state.currentDropEffect;return{isDragging:e,isHovering:e&&n}},componentWillMount:function(){this._monitor=new f,this._dragSources={},this._dropTargets={},v(this.constructor.configureDragDrop,"%s must implement static configureDragDrop(register, context) to use DragDropMixin",this.constructor.displayName),this.constructor.configureDragDrop(this.registerDragDropItemTypeHandlers,u)},componentDidMount:function(){e(this),c.addChangeListener(this.handleStoreChangeInDragDropMixin)},componentWillUnmount:function(){n(this),c.removeChangeListener(this.handleStoreChangeInDragDropMixin)},registerDragDropItemTypeHandlers:function(t,e){r(this,t);var n=e.dragSource,i=e.dropTarget;n&&(v(!this._dragSources[t],"Drag source for %s specified twice. See configureDragDrop in %s",t,this.constructor.displayName),this._dragSources[t]=D(n,g)),i&&(v(!this._dropTargets[t],"Drop target for %s specified twice. See configureDragDrop in %s",t,this.constructor.displayName),this._dropTargets[t]=D(i,p))},handleStoreChangeInDragDropMixin:function(){this.isMounted()&&this.setState(this.getStateForDragDropMixin())},dragSourceFor:function(e){return r(this,e),i(this,e),t.getDragSourceProps(this,e)},handleDragStart:function(e,n){var r=this,i=this._dragSources[e],o=i.canDrag,s=i.beginDrag;if(!c.isDragging()&&o(this)){var u,f=s(this),g=f.item,p=f.dragPreview,h=f.dragAnchors,d=f.effectsAllowed,m=this.getDOMNode(),D=m.getBoundingClientRect(),_=t.getOffsetFromClient(this,n);u={x:_.x-D.left,y:_.y-D.top},p||(p=m),d||(d=[l.MOVE]),v(y(d)&&d.length>0,"Expected effectsAllowed to be non-empty array"),v(x(g),'Expected return value of beginDrag to contain "item" object'),t.beginDrag(this,n,m,p,h,u,d),a.startDragging(e,g,d,_,u),setTimeout(function(){r.isMounted()&&c.getDraggedItem()===g&&r.setState({ownDraggedItemType:e})})}},handleDragEnd:function(e){t.endDrag(this);var n=this._dragSources[e].endDrag,r=c.getDropEffect();a.endDragging(),this.isMounted()&&this.setState({ownDraggedItemType:null}),n(this,r)},dropTargetFor:function(){for(var e=this,n=arguments.length,i=Array(n),s=0;n>s;s++)i[s]=arguments[s];return i.forEach(function(t){r(e,t),o(e,t)}),t.getDropTargetProps(this,i)},handleDragEnter:function(t,e){if(this.isAnyDropTargetActive(t)&&this._monitor.enter(e.target)){e.preventDefault();var n=this._dropTargets[this.state.draggedItemType],r=n.enter,i=n.getDropEffect,o=c.getEffectsAllowed(),s=c.getDraggedItemType();d(s)&&(o=[l.COPY]);var a=i(this,o);a&&v(o.indexOf(a)>-1,"Effect %s supplied by drop target is not one of the effects allowed by drag source: %s",a,o.join(", ")),this.setState({currentDropEffect:a}),r(this,this.state.draggedItem)}},handleDragOver:function(e,n){if(this.isAnyDropTargetActive(e)){n.preventDefault();var r=this._dropTargets[this.state.draggedItemType].over;r(this,this.state.draggedItem),t.dragOver(this,n,this.state.currentDropEffect||"move")}},handleDragLeave:function(t,e){if(this.isAnyDropTargetActive(t)&&this._monitor.leave(e.target)){this.setState({currentDropEffect:null});var n=this._dropTargets[this.state.draggedItemType].leave;n(this,this.state.draggedItem)}},handleDrop:function(t,e){if(this.isAnyDropTargetActive(t)){e.preventDefault();var n=this.state.draggedItem,r=this._dropTargets[this.state.draggedItemType].acceptDrop,i=this.state.currentDropEffect,o=!!c.getDropEffect();n||(n=h(e)),this._monitor.reset(),o||a.recordDrop(i),this.setState({currentDropEffect:null}),r(this,n,o,c.getDropEffect())}}}}var a=n(18),c=n(11),u=n(37),f=n(21),l=n(7),g=n(35),p=n(36),h=n(41),d=n(24),v=n(16),m=n(15),D=n(70),y=n(5),x=n(2);t.exports=s},function(t){"use strict";function e(t,e){return-1!==t.indexOf(e,t.length-e.length)}t.exports=e},function(t,e,n){"use strict";function r(t){return i(t)?{files:Array.prototype.slice.call(t.dataTransfer.files)}:o(t)?{urls:(t.dataTransfer.getData("Url")||t.dataTransfer.getData("text/uri-list")||"").split("\n")}:void 0}var i=n(23),o=n(25);t.exports=r},function(t,e,n){"use strict";function r(t){var e=t.indexOf(i.COPY)>-1,n=t.indexOf(i.MOVE)>-1,r=t.indexOf(i.LINK)>-1;return e&&n&&r?"all":e&&n?"copyMove":r&&n?"linkMove":e&&r?"copyLink":e?"copy":n?"move":r?"link":"none"}var i=n(7);t.exports=r},function(t,e,n){"use strict";function r(t,e,n,r){n=n||{};var a=t.offsetWidth,c=t.offsetHeight,u=e instanceof Image,f=u?e.width:a,l=u?e.height:c,g=n.horizontal||i.CENTER,p=n.vertical||o.CENTER,h=r.x,d=r.y;switch(s()&&(l/=window.devicePixelRatio,f/=window.devicePixelRatio),g){case i.LEFT:break;case i.CENTER:h*=f/a;break;case i.RIGHT:h=f-f*(1-h/a)}switch(p){case o.TOP:break;case o.CENTER:d*=l/c;break;case o.BOTTOM:d=l-l*(1-d/c)}return s()&&(d+=(window.devicePixelRatio-1)*l),{x:h,y:d}}var i=n(19),o=n(20),s=n(12);t.exports=r},function(t,e,n){"use strict";function r(){return i()||o()?window.devicePixelRatio:1}var i=n(45),o=n(12);t.exports=r},function(t){"use strict";function e(){return/firefox/i.test(navigator.userAgent)}t.exports=e},function(t){"use strict";function e(){return"WebkitAppearance"in document.documentElement.style}t.exports=e},function(t,e,n){"use strict";function r(t){return t?i()&&t instanceof Image&&o(t.src,".gif")?!1:!0:!1}var i=n(12),o=n(40);t.exports=r},function(t,e,n){t.exports.Dispatcher=n(49)},function(t,e,n){"use strict";function r(){this.$Dispatcher_callbacks={},this.$Dispatcher_isPending={},this.$Dispatcher_isHandled={},this.$Dispatcher_isDispatching=!1,this.$Dispatcher_pendingPayload=null}var i=n(50),o=1,s="ID_";r.prototype.register=function(t){var e=s+o++;return this.$Dispatcher_callbacks[e]=t,e},r.prototype.unregister=function(t){i(this.$Dispatcher_callbacks[t],"Dispatcher.unregister(...): `%s` does not map to a registered callback.",t),delete this.$Dispatcher_callbacks[t]},r.prototype.waitFor=function(t){i(this.$Dispatcher_isDispatching,"Dispatcher.waitFor(...): Must be invoked while dispatching.");for(var e=0;e<t.length;e++){var n=t[e];this.$Dispatcher_isPending[n]?i(this.$Dispatcher_isHandled[n],"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",n):(i(this.$Dispatcher_callbacks[n],"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",n),this.$Dispatcher_invokeCallback(n))}},r.prototype.dispatch=function(t){i(!this.$Dispatcher_isDispatching,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."),this.$Dispatcher_startDispatching(t);try{for(var e in this.$Dispatcher_callbacks)this.$Dispatcher_isPending[e]||this.$Dispatcher_invokeCallback(e)}finally{this.$Dispatcher_stopDispatching()}},r.prototype.isDispatching=function(){return this.$Dispatcher_isDispatching},r.prototype.$Dispatcher_invokeCallback=function(t){this.$Dispatcher_isPending[t]=!0,this.$Dispatcher_callbacks[t](this.$Dispatcher_pendingPayload),this.$Dispatcher_isHandled[t]=!0},r.prototype.$Dispatcher_startDispatching=function(t){for(var e in this.$Dispatcher_callbacks)this.$Dispatcher_isPending[e]=!1,this.$Dispatcher_isHandled[e]=!1;this.$Dispatcher_pendingPayload=t,this.$Dispatcher_isDispatching=!0},r.prototype.$Dispatcher_stopDispatching=function(){this.$Dispatcher_pendingPayload=null,this.$Dispatcher_isDispatching=!1},t.exports=r},function(t){"use strict";var e=function(t,e,n,r,i,o,s,a){if(!t){var c;if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,i,o,s,a],f=0;c=new Error("Invariant Violation: "+e.replace(/%s/g,function(){return u[f++]}))}throw c.framesToPop=1,c}};t.exports=e},function(t,e,n){function r(){return o(i(arguments,!1,!0,0))}var i=n(59),o=n(62);t.exports=r},function(t,e,n){function r(t){return i(t,o(arguments,1))}var i=n(58),o=n(60);t.exports=r},function(t,e,n){(function(e){function r(t){var e=t?t.length:0;for(this.data={hash:a(null),set:new s};e--;)this.push(t[e])}var i=n(64),o=n(3),s=o(s=e.Set)&&s,a=o(a=Object.create)&&a;r.prototype.push=i,t.exports=r}).call(e,function(){return this}())},function(t){function e(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}t.exports=e},function(t){function e(t,e){return"undefined"==typeof t?e:t}t.exports=e},function(t,e,n){function r(t,e,n){var r=o(e);if(!n)return i(e,t,r);for(var s=-1,a=r.length;++s<a;){var c=r[s],u=t[c],f=n(u,e[c],c,t,e);(f===f?f===u:u!==u)&&("undefined"!=typeof u||c in t)||(t[c]=f)}return t}var i=n(57),o=n(71);t.exports=r},function(t){function e(t,e,n){n||(n=e,e={});for(var r=-1,i=n.length;++r<i;){var o=n[r];e[o]=t[o]}return e}t.exports=e},function(t,e,n){function r(t,e){var n=t?t.length:0,r=[];if(!n)return r;var a=-1,c=i,u=!0,f=u&&e.length>=200?s(e):null,l=e.length;f&&(c=o,u=!1,e=f);t:for(;++a<n;){var g=t[a];if(u&&g===g){for(var p=l;p--;)if(e[p]===g)continue t;r.push(g)}else c(e,g,0)<0&&r.push(g)}return r}var i=n(26),o=n(27),s=n(28);t.exports=r},function(t,e,n){function r(t,e,n,c){for(var u=c-1,f=t.length,l=-1,g=[];++u<f;){var p=t[u];if(a(p)&&s(p.length)&&(o(p)||i(p))){e&&(p=r(p,e,n,0));var h=-1,d=p.length;for(g.length+=d;++h<d;)g[++l]=p[h]}else n||(g[++l]=p)}return g}var i=n(14),o=n(5),s=n(1),a=n(4);t.exports=r},function(t){function e(t,e,n){var r=-1,i=t.length;e=null==e?0:+e||0,0>e&&(e=-e>i?0:i+e),n="undefined"==typeof n||n>i?i:+n||0,0>n&&(n+=i),i=e>n?0:n-e>>>0,e>>>=0;for(var o=Array(i);++r<i;)o[r]=t[r+e];return o}t.exports=e},function(t){function e(t){return"string"==typeof t?t:null==t?"":t+""}t.exports=e},function(t,e,n){function r(t,e){var n=-1,r=i,a=t.length,c=!0,u=c&&a>=200,f=u?s():null,l=[];f?(r=o,c=!1):(u=!1,f=e?[]:l);t:for(;++n<a;){var g=t[n],p=e?e(g,n,t):g;if(c&&g===g){for(var h=f.length;h--;)if(f[h]===p)continue t;e&&f.push(p),l.push(g)}else r(f,p,0)<0&&((e||u)&&f.push(p),l.push(g))}return l}var i=n(26),o=n(27),s=n(28);t.exports=r},function(t,e,n){function r(t,e,n){if("function"!=typeof t)return i;if("undefined"==typeof e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 3:return function(n,r,i){return t.call(e,n,r,i)};case 4:return function(n,r,i,o){return t.call(e,n,r,i,o)};case 5:return function(n,r,i,o,s){return t.call(e,n,r,i,o,s)}}return function(){return t.apply(e,arguments)}}var i=n(75);t.exports=r},function(t,e,n){function r(t){var e=this.data;"string"==typeof t||i(t)?e.set.add(t):e.hash[t]=!0}var i=n(2);t.exports=r},function(t,e,n){function r(t){return function(){var e=arguments,n=e.length,r=e[0];if(2>n||null==r)return r;var s=e[n-2],a=e[n-1],c=e[3];n>3&&"function"==typeof s?(s=i(s,a,5),n-=2):(s=n>2&&"function"==typeof a?a:null,n-=s?1:0),c&&o(e[1],e[2],c)&&(s=3==n?null:s,n=2);for(var u=0;++u<n;){var f=e[u];f&&t(r,f,s)}return r}}var i=n(63),o=n(67);t.exports=r},function(t){function e(t,e,n){for(var r=t.length,i=e+(n?0:-1);n?i--:++i<r;){var o=t[i];if(o!==o)return i}return-1}t.exports=e},function(t,e,n){function r(t,e,n){if(!s(n))return!1;var r=typeof e;if("number"==r)var a=n.length,c=o(a)&&i(e,a);else c="string"==r&&e in n;if(c){var u=n[e];return t===t?t===u:u!==u}return!1}var i=n(13),o=n(1),s=n(2);t.exports=r},function(t,e,n){function r(t){for(var e=c(t),n=e.length,r=n&&t.length,f=r&&a(r)&&(o(t)||u.nonEnumArgs&&i(t)),g=-1,p=[];++g<n;){var h=e[g];(f&&s(h,r)||l.call(t,h))&&p.push(h)}return p}var i=n(14),o=n(5),s=n(13),a=n(1),c=n(72),u=n(29),f=Object.prototype,l=f.hasOwnProperty;t.exports=r},function(t,e,n){var r=n(56),i=n(65),o=i(r);t.exports=o},function(t,e,n){function r(t){if(null==t)return t;var e=i(arguments);return e.push(s),o.apply(void 0,e)}var i=n(54),o=n(69),s=n(55);t.exports=r},function(t,e,n){var r=n(1),i=n(3),o=n(2),s=n(68),a=i(a=Object.keys)&&a,c=a?function(t){if(t)var e=t.constructor,n=t.length;return"function"==typeof e&&e.prototype===t||"function"!=typeof t&&n&&r(n)?s(t):o(t)?a(t):[]}:s;t.exports=c},function(t,e,n){function r(t){if(null==t)return[];c(t)||(t=Object(t));var e=t.length;e=e&&a(e)&&(o(t)||u.nonEnumArgs&&i(t))&&e||0;for(var n=t.constructor,r=-1,f="function"==typeof n&&n.prototype===t,g=Array(e),p=e>0;++r<e;)g[r]=r+"";for(var h in t)p&&s(h,e)||"constructor"==h&&(f||!l.call(t,h))||g.push(h);return g}var i=n(14),o=n(5),s=n(13),a=n(1),c=n(2),u=n(29),f=Object.prototype,l=f.hasOwnProperty;t.exports=r},function(t,e,n){function r(t){return t=i(t),t&&s.test(t)?t.replace(o,"\\$&"):t}var i=n(61),o=/[.*+?^${}()|[\]\/\\]/g,s=RegExp(o.source);t.exports=r},function(t){function e(t){return function(){return t}}t.exports=e},function(t){function e(t){return t}t.exports=e},function(t){"use strict";function e(t,e){if(t===e)return!0;var n;for(n in t)if(t.hasOwnProperty(n)&&(!e.hasOwnProperty(n)||t[n]!==e[n]))return!1;for(n in e)if(e.hasOwnProperty(n)&&!t.hasOwnProperty(n))return!1;return!0}t.exports=e},function(t){function e(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(t){return"function"==typeof t}function r(t){return"number"==typeof t}function i(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=e,e.EventEmitter=e,e.prototype._events=void 0,e.prototype._maxListeners=void 0,e.defaultMaxListeners=10,e.prototype.setMaxListeners=function(t){if(!r(t)||0>t||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},e.prototype.emit=function(t){var e,r,s,a,c,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;throw TypeError('Uncaught, unspecified "error" event.')}if(r=this._events[t],o(r))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,a=new Array(s-1),c=1;s>c;c++)a[c-1]=arguments[c];r.apply(this,a)}else if(i(r)){for(s=arguments.length,a=new Array(s-1),c=1;s>c;c++)a[c-1]=arguments[c];for(u=r.slice(),s=u.length,c=0;s>c;c++)u[c].apply(this,a)}return!0},e.prototype.addListener=function(t,r){var s;if(!n(r))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,n(r.listener)?r.listener:r),this._events[t]?i(this._events[t])?this._events[t].push(r):this._events[t]=[this._events[t],r]:this._events[t]=r,i(this._events[t])&&!this._events[t].warned){var s;s=o(this._maxListeners)?e.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[t].length>s&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())}return this},e.prototype.on=e.prototype.addListener,e.prototype.once=function(t,e){function r(){this.removeListener(t,r),i||(i=!0,e.apply(this,arguments))}if(!n(e))throw TypeError("listener must be a function");var i=!1;return r.listener=e,this.on(t,r),this},e.prototype.removeListener=function(t,e){var r,o,s,a;if(!n(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(r=this._events[t],s=r.length,o=-1,r===e||n(r.listener)&&r.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(i(r)){for(a=s;a-->0;)if(r[a]===e||r[a].listener&&r[a].listener===e){o=a;break}if(0>o)return this;1===r.length?(r.length=0,delete this._events[t]):r.splice(o,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},e.prototype.removeAllListeners=function(t){var e,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[t],n(r))this.removeListener(t,r);else for(;r.length;)this.removeListener(t,r[r.length-1]);return delete this._events[t],this},e.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?n(this._events[t])?[this._events[t]]:this._events[t].slice():[]},e.listenerCount=function(t,e){var r;return r=t._events&&t._events[e]?n(t._events[e])?1:t._events[e].length:0}}])});

},{}],103:[function(require,module,exports){
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
    defaultHeaders: {},

    makeFinalURL: function(url) {
        if (url.indexOf('http')==0)
            return url;
        else
            return consts.apiPrefix + url;
    },

    errorHappen: function(url) {
        if (typeof Toasts != "undefined")
            Toasts.show({title: t.s("server"), text: url, status: "error"});
    },

    getText: function(url, callback) {
        var _this = this;
        request
            .get(url)
            .set('Content-Encoding', 'gzip')
            .set(this.defaultHeaders)
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url); callback({}); return;}
                callback((res||{}).text||null);
            });
    },

    "get": function(url,callback,conf) {
        var _this = this;
        conf = conf || {};

        request
            .get(this.makeFinalURL(url))
            .timeout(this.timeout)
            .set('Accept', 'application/json;charset=UTF-8')
            .set('Content-Encoding', 'gzip')
            .set(this.defaultHeaders)
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url);callback({});return;}
                if (conf.text)
                    callback(res.text||"");
                else
                    callback(res.body||{});
            });
    },

    post: function(url,data,callback) {
        var _this = this;
        request
            .post(this.makeFinalURL(url))
            .timeout(this.timeout)
            .send(data)
            .set('Accept', 'application/json;charset=UTF-8')
            //.set('Content-Encoding', 'gzip')
            .set(this.defaultHeaders)
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url);callback({});return;}
                callback(res.body||{});
            });
    },

    put: function(url,data,callback) {
        var _this = this;
        request
            .put(this.makeFinalURL(url))
            .timeout(this.timeout)
            .send(data)
            .set('Accept', 'application/json;charset=UTF-8')
            //.set('Content-Encoding', 'gzip')
            .set(this.defaultHeaders)
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url);callback({});return;}
                callback(res.body||{});
            });
    },

    del: function(url,callback) {
        var _this = this;
        request
            .del(this.makeFinalURL(url))
            .timeout(this.timeout)
            .set('Accept', 'application/json;charset=UTF-8')
            //.set('Content-Encoding', 'gzip')
            .set(this.defaultHeaders)
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url);callback({});return;}
                callback(res.body||{});
            });
    },

    upload: function(url, file, onProgress, callback) {
        var _this = this;
        request
            .post(this.makeFinalURL(url))
            .set(this.defaultHeaders)
            .attach(file.name, file.file, file.file.name)
            .on('progress', function(e) {
                var progress = parseInt(e.percent||0);
                //if ((progress % 20 === 0)||(progress===100))
                    onProgress(progress);
            })
            .end(function(err, res){
                if ((!res)||(err)) {_this.errorHappen(url);callback({});return;}
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

},{"superagent":"superagent"}],104:[function(require,module,exports){
/* MODIFIED */

/*!
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * License
 * -------
 * Creative Commons Attribution 2.5 License:
 * http://creativecommons.org/licenses/by/2.5/
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 */


/*
 CanvasImage Class
 Class that wraps the html image element and canvas.
 It also simplifies some of the canvas context manipulation
 with a set of helper functions.
 */
var CanvasImage = function (image) {
    this.canvas  = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.width  = this.canvas.width  = image.width;
    this.height = this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0, this.width, this.height);
};

CanvasImage.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function (imageData) {
    this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function () {
    return this.width * this.height;
};

CanvasImage.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function () {
    this.canvas.parentNode.removeChild(this.canvas);
};


var ColorThief = function () {};

/*
 * getColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar
 * colors and return the base color from the largest cluster.
 *
 * Quality is an optional argument. It needs to be an integer. 0 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster a color will be returned but the greater the likelihood that it will not be the visually
 * most dominant color.
 *
 * */
ColorThief.prototype.getColor = function(sourceImage, quality) {
    var palette       = this.getPalette(sourceImage, 5, quality);
    var dominantColor = palette[0];
    return dominantColor;
};


/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns array[ {r: num, g: num, b: num}, {r: num, g: num, b: num}, ...]
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar colors.
 *
 * colorCount determines the size of the palette; the number of colors returned. If not set, it
 * defaults to 10.
 *
 * BUGGY: Function does not always return the requested amount of colors. It can be +/- 2.
 *
 * quality is an optional argument. It needs to be an integer. 0 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster the palette generation but the greater the likelihood that colors will be missed.
 *
 *
 */
ColorThief.prototype.getPalette = function(sourceImage, colorCount, quality) {

    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    }
    if (typeof quality === 'undefined') {
        quality = 10;
    }

    // Create custom CanvasImage object
    var image      = new CanvasImage(sourceImage);
    var imageData  = image.getImageData();
    var pixels     = imageData.data;
    var pixelCount = image.getPixelCount();

    // Store the RGB values in an array format suitable for quantize function
    var pixelArray = [];
    for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        // If pixel is mostly opaque and not white
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }

    // Send array to quantize function which clusters values
    // using median cut algorithm
    var cmap    = MMCQ.quantize(pixelArray, colorCount);
    var palette = [];
    try {
        palette = cmap.palette();
    }catch(e) {}

    // Clean up
    image.removeCanvas();

    return palette;
};




/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

// fill out a couple protovis dependencies
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if (!pv) {
    var pv = {
        map: function(array, f) {
            var o = {};
            return f ? array.map(function(d, i) { o.index = i; return f.call(o, d); }) : array.slice();
        },
        naturalOrder: function(a, b) {
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        },
        sum: function(array, f) {
            var o = {};
            return array.reduce(f ? function(p, d, i) { o.index = i; return p + f.call(o, d); } : function(p, d) { return p + d; }, 0);
        },
        max: function(array, f) {
            return Math.max.apply(null, f ? pv.map(array, f) : array);
        }
    };
}



/**
 * Basic Javascript port of the MMCQ (modified median cut quantization)
 * algorithm from the Leptonica library (http://www.leptonica.com/).
 * Returns a color map you can use to map original pixels to the reduced
 * palette. Still a work in progress.
 *
 * @author Nick Rabinowitz
 * @example

 // array of pixels as [R,G,B] arrays
 var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
 // etc
 ];
 var maxColors = 4;

 var cmap = MMCQ.quantize(myPixels, maxColors);
 var newPalette = cmap.palette();
 var newPixels = myPixels.map(function(p) {
    return cmap.map(p);
});

 */
var MMCQ = (function() {
    // private constants
    var sigbits = 5,
        rshift = 8 - sigbits,
        maxIterations = 1000,
        fractByPopulations = 0.75;

    // get reduced-space color index for a pixel
    function getColorIndex(r, g, b) {
        return (r << (2 * sigbits)) + (g << sigbits) + b;
    }

    // Simple priority queue
    function PQueue(comparator) {
        var contents = [],
            sorted = false;

        function sort() {
            contents.sort(comparator);
            sorted = true;
        }

        return {
            push: function(o) {
                contents.push(o);
                sorted = false;
            },
            peek: function(index) {
                if (!sorted) sort();
                if (index===undefined) index = contents.length - 1;
                return contents[index];
            },
            pop: function() {
                if (!sorted) sort();
                return contents.pop();
            },
            size: function() {
                return contents.length;
            },
            map: function(f) {
                return contents.map(f);
            },
            debug: function() {
                if (!sorted) sort();
                return contents;
            }
        };
    }

    // 3d color space box
    function VBox(r1, r2, g1, g2, b1, b2, histo) {
        var vbox = this;
        vbox.r1 = r1;
        vbox.r2 = r2;
        vbox.g1 = g1;
        vbox.g2 = g2;
        vbox.b1 = b1;
        vbox.b2 = b2;
        vbox.histo = histo;
    }
    VBox.prototype = {
        volume: function(force) {
            var vbox = this;
            if (!vbox._volume || force) {
                vbox._volume = ((vbox.r2 - vbox.r1 + 1) * (vbox.g2 - vbox.g1 + 1) * (vbox.b2 - vbox.b1 + 1));
            }
            return vbox._volume;
        },
        count: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._count_set || force) {
                var npix = 0,
                    i, j, k;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                            index = getColorIndex(i,j,k);
                            npix += (histo[index] || 0);
                        }
                    }
                }
                vbox._count = npix;
                vbox._count_set = true;
            }
            return vbox._count;
        },
        copy: function() {
            var vbox = this;
            return new VBox(vbox.r1, vbox.r2, vbox.g1, vbox.g2, vbox.b1, vbox.b2, vbox.histo);
        },
        avg: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._avg || force) {
                var ntot = 0,
                    mult = 1 << (8 - sigbits),
                    rsum = 0,
                    gsum = 0,
                    bsum = 0,
                    hval,
                    i, j, k, histoindex;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                            histoindex = getColorIndex(i,j,k);
                            hval = histo[histoindex] || 0;
                            ntot += hval;
                            rsum += (hval * (i + 0.5) * mult);
                            gsum += (hval * (j + 0.5) * mult);
                            bsum += (hval * (k + 0.5) * mult);
                        }
                    }
                }
                if (ntot) {
                    vbox._avg = [~~(rsum/ntot), ~~(gsum/ntot), ~~(bsum/ntot)];
                } else {
//                    console.log('empty box');
                    vbox._avg = [
                        ~~(mult * (vbox.r1 + vbox.r2 + 1) / 2),
                        ~~(mult * (vbox.g1 + vbox.g2 + 1) / 2),
                        ~~(mult * (vbox.b1 + vbox.b2 + 1) / 2)
                    ];
                }
            }
            return vbox._avg;
        },
        contains: function(pixel) {
            var vbox = this,
                rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            return (rval >= vbox.r1 && rval <= vbox.r2 &&
            gval >= vbox.g1 && gval <= vbox.g2 &&
            bval >= vbox.b1 && bval <= vbox.b2);
        }
    };

    // Color map
    function CMap() {
        this.vboxes = new PQueue(function(a,b) {
            return pv.naturalOrder(
                a.vbox.count()*a.vbox.volume(),
                b.vbox.count()*b.vbox.volume()
            );
        });
    }
    CMap.prototype = {
        push: function(vbox) {
            this.vboxes.push({
                vbox: vbox,
                color: vbox.avg()
            });
        },
        palette: function() {
            return this.vboxes.map(function(vb) { return vb.color; });
        },
        size: function() {
            return this.vboxes.size();
        },
        map: function(color) {
            var vboxes = this.vboxes;
            for (var i=0; i<vboxes.size(); i++) {
                if (vboxes.peek(i).vbox.contains(color)) {
                    return vboxes.peek(i).color;
                }
            }
            return this.nearest(color);
        },
        nearest: function(color) {
            var vboxes = this.vboxes,
                d1, d2, pColor;
            for (var i=0; i<vboxes.size(); i++) {
                d2 = Math.sqrt(
                    Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
                    Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
                    Math.pow(color[2] - vboxes.peek(i).color[2], 2)
                );
                if (d2 < d1 || d1 === undefined) {
                    d1 = d2;
                    pColor = vboxes.peek(i).color;
                }
            }
            return pColor;
        },
        forcebw: function() {
            // XXX: won't  work yet
            var vboxes = this.vboxes;
            vboxes.sort(function(a,b) { return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color));});

            // force darkest color to black if everything < 5
            var lowest = vboxes[0].color;
            if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
                vboxes[0].color = [0,0,0];

            // force lightest color to white if everything > 251
            var idx = vboxes.length-1,
                highest = vboxes[idx].color;
            if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
                vboxes[idx].color = [255,255,255];
        }
    };

    // histo (1-d array, giving the number of pixels in
    // each quantized region of color space), or null on error
    function getHisto(pixels) {
        var histosize = 1 << (3 * sigbits),
            histo = new Array(histosize),
            index, rval, gval, bval;
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            index = getColorIndex(rval, gval, bval);
            histo[index] = (histo[index] || 0) + 1;
        });
        return histo;
    }

    function vboxFromPixels(pixels, histo) {
        var rmin=1000000, rmax=0,
            gmin=1000000, gmax=0,
            bmin=1000000, bmax=0,
            rval, gval, bval;
        // find min/max
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            if (rval < rmin) rmin = rval;
            else if (rval > rmax) rmax = rval;
            if (gval < gmin) gmin = gval;
            else if (gval > gmax) gmax = gval;
            if (bval < bmin) bmin = bval;
            else if (bval > bmax)  bmax = bval;
        });
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
    }

    function medianCutApply(histo, vbox) {
        if (!vbox.count()) return;

        var rw = vbox.r2 - vbox.r1 + 1,
            gw = vbox.g2 - vbox.g1 + 1,
            bw = vbox.b2 - vbox.b1 + 1,
            maxw = pv.max([rw, gw, bw]);
        // only one pixel, no split
        if (vbox.count() == 1) {
            return [vbox.copy()];
        }
        /* Find the partial sum arrays along the selected axis. */
        var total = 0,
            partialsum = [],
            lookaheadsum = [],
            i, j, k, sum, index;
        if (maxw == rw) {
            for (i = vbox.r1; i <= vbox.r2; i++) {
                sum = 0;
                for (j = vbox.g1; j <= vbox.g2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(i,j,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else if (maxw == gw) {
            for (i = vbox.g1; i <= vbox.g2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(j,i,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else {  /* maxw == bw */
            for (i = vbox.b1; i <= vbox.b2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.g1; k <= vbox.g2; k++) {
                        index = getColorIndex(j,k,i);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        partialsum.forEach(function(d,i) {
            lookaheadsum[i] = total-d;
        });
        function doCut(color) {
            var dim1 = color + '1',
                dim2 = color + '2',
                left, right, vbox1, vbox2, d2, count2=0;
            for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
                if (partialsum[i] > total / 2) {
                    vbox1 = vbox.copy();
                    vbox2 = vbox.copy();
                    left = i - vbox[dim1];
                    right = vbox[dim2] - i;
                    if (left <= right)
                        d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
                    else d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
                    // avoid 0-count boxes
                    while (!partialsum[d2]) d2++;
                    count2 = lookaheadsum[d2];
                    while (!count2 && partialsum[d2-1]) count2 = lookaheadsum[--d2];
                    // set dimensions
                    vbox1[dim2] = d2;
                    vbox2[dim1] = vbox1[dim2] + 1;
//                    console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
                    return [vbox1, vbox2];
                }
            }

        }
        // determine the cut planes
        return maxw == rw ? doCut('r') :
            maxw == gw ? doCut('g') :
                doCut('b');
    }

    function quantize(pixels, maxcolors) {
        // short-circuit
        if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
//            console.log('wrong number of maxcolors');
            return false;
        }

        // XXX: check color content and convert to grayscale if insufficient

        var histo = getHisto(pixels),
            histosize = 1 << (3 * sigbits);

        // check that we aren't below maxcolors already
        var nColors = 0;
        histo.forEach(function() { nColors++; });
        if (nColors <= maxcolors) {
            // XXX: generate the new colors from the histo and return
        }

        // get the beginning vbox from the colors
        var vbox = vboxFromPixels(pixels, histo),
            pq = new PQueue(function(a,b) { return pv.naturalOrder(a.count(), b.count()); });
        pq.push(vbox);

        // inner function to do the iteration
        function iter(lh, target) {
            var ncolors = 1,
                niters = 0,
                vbox;
            while (niters < maxIterations) {
                vbox = lh.pop();
                if (!vbox.count())  { /* just put it back */
                    lh.push(vbox);
                    niters++;
                    continue;
                }
                // do the cut
                var vboxes = medianCutApply(histo, vbox),
                    vbox1 = vboxes[0],
                    vbox2 = vboxes[1];

                if (!vbox1) {
//                    console.log("vbox1 not defined; shouldn't happen!");
                    return;
                }
                lh.push(vbox1);
                if (vbox2) {  /* vbox2 can be null */
                    lh.push(vbox2);
                    ncolors++;
                }
                if (ncolors >= target) return;
                if (niters++ > maxIterations) {
//                    console.log("infinite loop; perhaps too few pixels!");
                    return;
                }
            }
        }

        // first set of colors, sorted by population
        iter(pq, fractByPopulations * maxcolors);

        // Re-sort by the product of pixel occupancy times the size in color space.
        var pq2 = new PQueue(function(a,b) {
            return pv.naturalOrder(a.count()*a.volume(), b.count()*b.volume());
        });
        while (pq.size()) {
            pq2.push(pq.pop());
        }

        // next set - generate the median cuts using the (npix * vol) sorting.
        iter(pq2, maxcolors - pq2.size());

        // calculate the actual colors
        var cmap = new CMap();
        while (pq2.size()) {
            cmap.push(pq2.pop());
        }

        return cmap;
    }

    return {
        quantize: quantize
    };
})();

ColorThief.prototype.contrast = function(rgb) {
    var c = "white", p = 255;
    try{
        p = (0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]);
        if (p>128)
            c = "black";
    }catch(e){}
    return [c,p];
}

ColorThief.prototype.shadeRGBColor = function(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return [(Math.round((t-R)*p)+R), (Math.round((t-G)*p)+G), (Math.round((t-B)*p)+B)];
}

ColorThief.prototype.getDarkPalette = function(elem, fromRGB) {
    var c = [0,0,0];
    _this = this;

    try {
        if (typeof fromRGB != "undefined")
          c = elem;
        else
          c = _this.getColor(elem, 1);

        if (typeof c != "object")
            c = [0, 0, 0];
        if (c.length != 3)
            c = [0, 0, 0];

        var cp = _this.contrast(c);
        if (cp[0] == 'black') {
            c = _this.shadeRGBColor('rgb(' + c[0] + "," + c[1] + "," + c[2] + ')', (((100 / 256) * (cp[1] - 100)) / 100) * -1);
        }
    }catch(e){}

    return c[0] + "," + c[1] + "," + c[2];
}

module.exports = ColorThief.prototype;

},{}],105:[function(require,module,exports){
module.exports = {
    colorFromString: function(str) {
        try{
            str = str.trim();
        }catch(e){if(e)str="";}
        if (str!="") {
            var b, bigint, colour, g, hash, i, r, value;
            hash = 0;
            i = 0;
            while (i < str.length) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                i++;
            }
            colour = "";
            i = 0;
            while (i < 3) {
                value = (hash >> (i * 8)) & 0xff;
                colour += ("00" + value.toString(16)).substr(-2);
                i++;
            }
            bigint = parseInt(colour, 16);
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;

            return [r, g, b];
        }else
            return [0,0,0];
    }
}

},{}],106:[function(require,module,exports){
module.exports = {
	maxFileSize: 10485760, //10mb
	fileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"/*, "application/pdf"*/],

	getAcceptString: function() {
		return this.fileTypes.join(",");
	},

	getHumanAcceptString: function() {
		return t.s("images") + " (PNG, JPEG, GIF), " + t.s("links") + ". Soon: PDF, Mark Down";
	},

	containsFiles: function(event) {
		if (typeof window.dropFiles != "function")
			return false;

	    if (event.dataTransfer.types) {
	        for (var i = 0; i < event.dataTransfer.types.length; i++) {
	            if (event.dataTransfer.types[i] == "Files") {
	                return true;
	            }
	        }
	    }
	    
	    return false;

	},

	makeInfoDiv: function() {
		if (!document.getElementById("drop-zone-info")){
			var div = document.createElement('div');
			div.id="drop-zone-info";
			document.body.appendChild(div);
			React.render((
				React.createElement("div", null, 
					React.createElement("img", {id: "drop-zone-image", src: (window.pathPrefix||"") + "../common/images/filetypes.svg", alt: ""}), 
					React.createElement("strong", null, "Drag & Drop"), React.createElement("span", null, this.getHumanAcceptString())
				)
			), div);
		}
	},

	removeInfoDiv: function() {
		var div=document.getElementById("drop-zone-info");
		if (div){
			document.body.removeChild(div);
		}
	},

	validateFiles: function(files) {
		var cleanFiles = [];
		for(var i in files){
			var f = files[i];
			if ((this.fileTypes.indexOf(f.type)!=-1)&&(f.size<=this.maxFileSize))
				cleanFiles.push({
					type: "image",
					file: f
				});
		}

		return cleanFiles;
	},

	bind: function() {
		var _this = this;
		var droppable = document.body;
		var e = new Event('fileDropped');

		droppable.addEventListener("dragover", function(e) {
			if (_this.containsFiles(e)){
				e.dataTransfer.dropEffect = "copy";
				
				if (e.preventDefault) e.preventDefault();

				this.classList.add("dropfile-over");

				_this.makeInfoDiv();
			}
		});

		droppable.addEventListener("dragenter", function(e) {
			if (_this.containsFiles(e)){
				e.dataTransfer.dropEffect = "copy";
				this.classList.add("dropfile-over");

				_this.makeInfoDiv();
			}
		});

		droppable.addEventListener("dragleave", function(e) {
			this.classList.remove("dropfile-over");

			_this.removeInfoDiv();
		});

		droppable.addEventListener("drop", function(e) {
			if (_this.containsFiles(e)){
				e.preventDefault();
				if (e.stopPropagation) e.stopPropagation();

				this.classList.remove("dropfile-over");

				window.dropFiles({files: _this.validateFiles(e.dataTransfer.files)});
				try{window.dispatchEvent(e);}catch(e){}
			}

			_this.removeInfoDiv();
		});
	}
}

},{}],107:[function(require,module,exports){
module.exports = {
    defaultIcons: function(s) {
      switch(parseInt(s)){
        case 0: return "infinite"; break;
        case -1: return "inbox"; break;
        case -2: return "best"; break;
        case -99: return "trash"; break;
        default: return "default-folder"; break;
      }
    },
    
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
        return "https://logo.clearbit.com/"+(s||"")+"?size=24";
        //return "https://favicon.yandex.net/favicon/"+(s||"")+"?color=255,255,255,0";
        //return "https://raindrop.io/favicon/"+(s||"");
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

},{}],108:[function(require,module,exports){
module.exports = {
    getCurrentBrowser: function() {
      var browser = [];

      if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()))
        browser.push("chrome");

      if (/constructor/i.test(window.HTMLElement))
        browser.push("safari");

      if ('MozAppearance' in document.documentElement.style)
        browser.push('firefox');

      if (!!window.opera || /opera|opr/i.test(navigator.userAgent))
        browser.push('opera');

      if ('WebkitAppearance' in document.documentElement.style)
        browser.push("webkit");

      //OS
      if (navigator.appVersion.indexOf("Win")!=-1) browser.push("Windows");
      if (navigator.appVersion.indexOf("Mac")!=-1) browser.push("MacOS");
      if (navigator.appVersion.indexOf("X11")!=-1) browser.push("UNIX");
      if (navigator.appVersion.indexOf("Linux")!=-1) browser.push("Linux");

      return browser;
    },

    swapArray: function (a, x,y) {
      var a = _.clone(a);
      var b = _.clone(a[x]);
      a[x] = _.clone(a[y]);
      a[y] = _.clone(b);
      return a;
    },

    parseSearch: function(val) {
        var key = "word";
        var typeRegexp = /type\-(image|video|link|article)/i;

        if (val.match(new RegExp(/(^|\s)#([^ ]*)/i))) {
            key = "tag";
            val = val.replace(/,/g, '').replace(/#/g, '');
        }
        else if (val.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/))){
            key = "domain";
            val = val.toLowerCase();
        }
        else if (val.match(new RegExp(typeRegexp))){
            key = "type";
            val = val.match(typeRegexp)[1];
        }

        return {key: key, val: val};
    },

    inputSelectAllMixin: {
        handleSelectAll: function(e) {
            e.target.focus();
            e.target.select();
        }
    },


    getErrorFromJSON: function(json) {
      if (typeof json.error != "undefined") {
        return t.s("server"+json.error);
      }

      if (typeof json.auth != "undefined") {
        if (!json.auth)
          return t.s("startToSave");
      }

      return t.s("server");
    },

    defaultTitle: function() {
      if ((window.environment||[]).indexOf("desktop")!=-1)
        return "Raindrop.io";
      else{
        var s = t.s("pro_speed_dial");
        if (s.indexOf("(")!=-1){
          s = s.substr(0, s.indexOf("(")-1);
        }

        s = S(s).replaceAll('"', '').s;
        
        if (s.indexOf("-")!=-1){
          s = s.substr(0, s.indexOf("-")-1);
        }

        return s;
      }
    },

    beautifulDomain: function(s) {
      var clean = "";
      try{clean = network.cleanDomain(s);}catch(e){}
      try{clean = clean.match(/(.*)\./i)[1];}catch(e){}
      try{clean = clean.replace(/-/g, " ").replace(/_/g, " ");}catch(e){}
      try{clean = clean.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});}catch(e){}

      return clean||s;
    },

    copyTextToClipboard: function(text) {
      if (typeof MacGap != "undefined"){
        MacGap.Clipboard.copy(text);
        return;
      }

      var textArea = document.createElement("textarea");

      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a flash,
      // so some of these are just precautions. However in IE the element
      // is visible whilst the popup box asking the user for permission for
      // the web page to copy to the clipboard.
      //

      // Place in top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;

      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent';


      textArea.value = text;

      document.body.appendChild(textArea);

      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(textArea);
    },

    humanFileSize: function(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = si
            ? ['Kb','Mb','Gb','Tb','Pb','Eb','Zb','Yb']
            : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    },

    parseBrowserQuery: function() {
      var q = {};
      try{
        var temp = window.location.search.substr(1, window.location.search.length).split("&");
        temp.forEach(function(item){
          var a = item.split("=");
          q[a[0]]=decodeURIComponent(a[1]);
        });
      }catch(e){}

      return q;
    }
}

},{}],109:[function(require,module,exports){
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
      var url = (window.pathPrefix||"")+"../common/js/"+this.currentLang+".js";

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

},{"moment/locale/de.js":"moment/locale/de.js","moment/locale/es.js":"moment/locale/es.js","moment/locale/fi.js":"moment/locale/fi.js","moment/locale/fr.js":"moment/locale/fr.js","moment/locale/id.js":"moment/locale/id.js","moment/locale/ko.js":"moment/locale/ko.js","moment/locale/nl.js":"moment/locale/nl.js","moment/locale/pl.js":"moment/locale/pl.js","moment/locale/pt.js":"moment/locale/pt.js","moment/locale/ru.js":"moment/locale/ru.js","moment/locale/tr.js":"moment/locale/tr.js","moment/locale/uk.js":"moment/locale/uk.js","moment/locale/zh-cn.js":"moment/locale/zh-cn.js","moment/locale/zh-tw.js":"moment/locale/zh-tw.js"}],110:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"96px\" height=\"12px\" viewBox=\"0 0 96 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n    <!-- Generator: Sketch 3.3.1 (12002) - http://www.bohemiancoding.com/sketch -->\n    <title>logo-text</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Home\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-73.000000, -34.000000)\" fill=\"#000000\">\n            <g id=\"sidebar\" sketch:type=\"MSLayerGroup\" transform=\"translate(-9.000000, 1.000000)\">\n                <g id=\"logo-text\" transform=\"translate(82.000000, 33.000000)\" sketch:type=\"MSShapeGroup\">\n                    <path d=\"M92.5,7 C94.4329966,7 96,5.43299662 96,3.5 C96,1.56700338 94.4329966,0 92.5,0 C90.5670034,0 89,1.56700338 89,3.5 C89,5.43299662 90.5670034,7 92.5,7 Z M92.5,6 C93.8807119,6 95,4.88071187 95,3.5 C95,2.11928813 93.8807119,1 92.5,1 C91.1192881,1 90,2.11928813 90,3.5 C90,4.88071187 91.1192881,6 92.5,6 Z M86,0 L87,0 L87,7 L86,7 L86,0 Z M83,7 C83.5522847,7 84,6.55228475 84,6 C84,5.44771525 83.5522847,5 83,5 C82.4477153,5 82,5.44771525 82,6 C82,6.55228475 82.4477153,7 83,7 Z\" id=\"io\" opacity=\"0.5\"></path>\n                    <path d=\"M8.392,11 L5.784,6.808 C7.064,6.6 8.312,5.576 8.312,3.672 C8.312,1.704 6.936,0.328 4.824,0.328 L0.136,0.328 L0.136,11 L2.008,11 L2.008,7.016 L3.864,7.016 L6.232,11 L8.392,11 Z M4.568,5.368 L2.008,5.368 L2.008,1.976 L4.568,1.976 C5.624,1.976 6.392,2.648 6.392,3.672 C6.392,4.696 5.624,5.368 4.568,5.368 L4.568,5.368 Z M19.784,11 L15.592,0.328 L13.256,0.328 L9.064,11 L11.192,11 L11.976,8.952 L16.872,8.952 L17.656,11 L19.784,11 Z M16.344,7.304 L12.504,7.304 L14.424,2.216 L16.344,7.304 Z M22.824,11 L22.824,0.328 L20.952,0.328 L20.952,11 L22.824,11 Z M34.344,11 L34.344,0.328 L32.472,0.328 L32.472,7.736 L27.016,0.328 L25.096,0.328 L25.096,11 L26.968,11 L26.968,3.384 L32.536,11 L34.344,11 Z M40.584,11 C43.912,11 46.168,8.808 46.168,5.672 C46.168,2.536 43.912,0.328 40.584,0.328 L36.616,0.328 L36.616,11 L40.584,11 Z M40.584,9.352 L38.488,9.352 L38.488,1.976 L40.584,1.976 C42.968,1.976 44.248,3.608 44.248,5.672 C44.248,7.688 42.904,9.352 40.584,9.352 L40.584,9.352 Z M56.232,11 L53.624,6.808 C54.904,6.6 56.152,5.576 56.152,3.672 C56.152,1.704 54.776,0.328 52.664,0.328 L47.976,0.328 L47.976,11 L49.848,11 L49.848,7.016 L51.704,7.016 L54.072,11 L56.232,11 Z M52.408,5.368 L49.848,5.368 L49.848,1.976 L52.408,1.976 C53.464,1.976 54.232,2.648 54.232,3.672 C54.232,4.696 53.464,5.368 52.408,5.368 L52.408,5.368 Z M63,11.192 C66.2,11.192 68.456,8.856 68.456,5.672 C68.456,2.488 66.2,0.152 63,0.152 C59.8,0.152 57.544,2.488 57.544,5.672 C57.544,8.856 59.8,11.192 63,11.192 L63,11.192 Z M63,9.528 C60.84,9.528 59.464,7.864 59.464,5.672 C59.464,3.464 60.84,1.816 63,1.816 C65.144,1.816 66.536,3.464 66.536,5.672 C66.536,7.864 65.144,9.528 63,9.528 L63,9.528 Z M72.136,11 L72.136,7.016 L74.952,7.016 C77.176,7.016 78.44,5.48 78.44,3.672 C78.44,1.864 77.192,0.328 74.952,0.328 L70.264,0.328 L70.264,11 L72.136,11 Z M74.696,5.368 L72.136,5.368 L72.136,1.976 L74.696,1.976 C75.752,1.976 76.52,2.648 76.52,3.672 C76.52,4.696 75.752,5.368 74.696,5.368 L74.696,5.368 Z\" id=\"raindrop\"></path>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>";

},{}],111:[function(require,module,exports){
module.exports=module.exports = "{\n  \"manifest_version\": 2,\n  \"name\": \"Raindrop.io New Tab / Speed Dial\",\n  \"default_locale\": \"en\",\n  \"description\": \"Your beautiful start page with favorite sites and bookmarks.\",\n  \"homepage_url\": \"https://raindrop.io\",\n  \"short_name\": \"RaindropNewTab\",\n  \"version\": \"0.7.5\",\n  \"default_locale\": \"en\",\n\n  \"offline_enabled\": true,\n\n  \"commands\": {\n    \"_execute_page_action\": {\n      \"suggested_key\": {\n        \"windows\": \"Ctrl+E\",\n        \"mac\": \"Command+E\",\n        \"chromeos\": \"Ctrl+E\",\n        \"linux\": \"Ctrl+E\"\n      }\n    }\n  },\n\n  \"background\": {\n\t\t\"scripts\": [\"background.js\"],\n\t\t\"persistent\": true\n\t},\n\n  \"permissions\": [\n    \"tabs\",\n    \"storage\",\n    \"*://*/*\",\n    \"<all_urls>\",\n    \"notifications\"\n  ],\n\n  \"icons\" : {\n    \"16\": \"common/images/icon-16.png\",\n    \"48\" : \"common/images/icon-48.png\",\n    \"128\" : \"common/images/icon-128.png\"\n  },\n\n  \"chrome_url_overrides\" : {\n    \"newtab\": \"app/index.html#/\"\n  },\n\n  \"options_page\": \"settings/settings.html\",\n  \n  \"options_ui\": {\n    \"page\": \"settings/settings.html\",\n    \"chrome_style\": true\n  },\n\n  \"page_action\": {\n    \"default_icon\": {\n      \"19\": \"common/images/page-action-19.png\",\n      \"38\": \"common/images/page-action-38.png\"\n    },\n    \"default_title\": \"Save to Raindrop.io\",\n    \"default_popup\": \"miniclipper/index.html\"\n  },\n\n  \"content_security_policy\": \"script-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.intercom.io https://*.intercomcdn.com https://*.getsentry.com https://*.ravenjs.com https://*.uservoice.com; object-src 'self'\"\n}\n";

},{}],112:[function(require,module,exports){
var BookmarkActions = require('../actions/Bookmark');
var _item = {};

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(BookmarkActions.load, this.onLoad);
  },

  onLoad: function(id) {
    var _this = this;

    Api.get("raindrop/"+id, function(json) {
      _item = json.item || {};
      _this.trigger(_item);
    });
  },

  getItem: function(_id) {
    _item = {};
    _item._id = _id;
    _item.navigation = {};
    return _item;
  }
});

},{"../actions/Bookmark":1}],113:[function(require,module,exports){
var BookmarkActions = require('../actions/Bookmarks');
var CollectionsActions = require('../actions/Collections');
var CollectionsStore = require('../stores/Collections');
var LastBookmarkActions = require('../actions/LastBookmark');

var V = require('validator');

var _bookmarks = [], _loading = false, _loaded = false, _noMore = false, _canLoadFromCache = false, _url = "", _speed = "sync";
var _moveUpdateList = [], _selectedCount = 0;

var _blankBookmark = {
    excerpt: "",
    html: "",
    media: [],
    title: "",
    type: "link"
}

var _initFavorites = {
  "en_US": [
    {_id: 1, sort:4, title: "Raindrop.io", link: "https://raindrop.io", domain: "raindrop.io", collectionId: -2},
    {_id: 2, sort:3, title: "Facebook", link: "https://facebook.com", domain: "facebook.com", collectionId: -2},
    {_id: 3, sort:2, title: "Twitter", link: "https://twitter.com", domain: "twitter.com", collectionId: -2},
    {_id: 4, sort:1, title: "Wikipedia.org", link: "http://en.wikipedia.org", domain: "wikipedia.org", collectionId: -2},
  ],

  "ru_RU": [
    {_id: 1, sort:4, title: "Raindrop.io", link: "https://raindrop.io", domain: "raindrop.io", collectionId: -2},
    {_id: 2, sort:3, title: "Вконтакте", link: "https://vk.com", domain: "vk.com", collectionId: -2},
    {_id: 3, sort:2, title: "Яндекс", link: "https://yandex.ru", domain: "yandex.ru", collectionId: -2},
    {_id: 4, sort:1, title: "Wikipedia.org", link: "https://ru.wikipedia.org", domain: "wikipedia.org", collectionId: -2},
  ]
};

var BookmarksStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(BookmarkActions.load, this.onLoad);
        this.listenTo(BookmarkActions.reset, this.reset);
        this.listenTo(BookmarkActions.parseURL, this.onParseURL);
        this.listenTo(BookmarkActions.loadBookmark, this.onLoadBookmark);
        this.listenTo(BookmarkActions.insertBookmark, this.onInsertBookmark);
        this.listenTo(BookmarkActions.updateBookmark, this.onUpdateBookmark);
        this.listenTo(BookmarkActions.updateSelectedBookmarks, this.onUpdateSelectedBookmarks);
        this.listenTo(BookmarkActions.removeBookmark, this.onRemoveBookmark);
        this.listenTo(BookmarkActions.removeSelectedBookmarks, this.onRemoveSelectedBookmarks);
        this.listenTo(BookmarkActions.copySelectedBookmarks, this.onCopySelectedBookmarks);
        this.listenTo(BookmarkActions.swapBookmarks, this.onSwapBookmarks);
        this.listenTo(BookmarkActions.saveAllSort, this.onSaveAllSort);
        this.listenTo(BookmarkActions.syncMove, this.onSyncMove);

        this.listenTo(BookmarkActions.setSelected, this.onSetSelected);
        this.listenTo(BookmarkActions.selectAll, this.onSelectAll);
        this.listenTo(BookmarkActions.clearSelect, this.onClearSelect);

        this.listenTo(BookmarkActions.initFavorites, this.onInitFavorites);
    },

    onLoad: function(params, callback) {
        if (typeof params.speed != "undefined")
          _speed = params.speed;
        else
          _speed = "sync";

        if (!_loading)
          if (params.page == 0)
              this.reset();

        if ((!_loading)&&(!_noMore)) {
            _loading = true;

            var _this = this;
            _url = "raindrops/" + params.cId;

            //query params
            params.sort = params.sort || "lastUpdate";
            var q = _.map(params, function (val, index) {
                return index + "=" + val;
            });
            if (q.length > 0)
                _url += "?" + q.join("&");

            _canLoadFromCache=((params.sort!="title")&&(!params.page)/*&&(!params.search)*/);

            if (window.cacheDisabled||false)
              _canLoadFromCache = false;
            
            if (_canLoadFromCache){
                switch(_speed){
                  case "async":
                    try{ls.getItem(_url)
                      .then(function (val) {
                          if ((val) && (!_loaded)) {
                              _bookmarks = val;
                              _this.trigger(_bookmarks);
                          }
                      })
                      .catch(function(e){

                      });}catch(e){}
                  break;

                  case 'sync':
                    _bookmarks = [];
                    try{
                      _bookmarks = JSON.parse(Api.getItem(_url)) || [];
                    }catch(e){if (e) _bookmarks = [];}
                    if (_bookmarks.length>0)
                      _this.trigger(_bookmarks);
                  break;
                }
            }

            Api.get(_url, function (json) {
                if ((json.result||false)&&(parseInt(CollectionsStore.getCurrentId()) == json.collectionId)) {
                  //if ((json.items||[]).length>0) {
                      if (params.page == 0){
                        _bookmarks = (json.items||[]);

                        CollectionsActions.updateCountCollection({_id: params.cId, count: json.count || 0});
                      }
                      else
                        _bookmarks = _bookmarks.concat((json.items||[]));
                  //}

                  //if (_bookmarks.length>=(json.count||0))
                  _noMore = ((json.items||[]).length == 0);

                  _loading = false;
                }
                else{
                  _bookmarks = [];
                  _noMore = true;
                  _loading = false;
                }

                _loaded = true;

                _this.update();

                if (typeof callback != "undefined")
                  callback();
            });
        }else {
          if (typeof callback != "undefined")
            callback();
        }
    },

    onLoadBookmark: function(params, callback) {
      var _this = this;

      var getById = function(id, params) {
        var q = [];
        for(var i in params)
          q.push(i+"="+params[i]);

        Api.get("raindrop/"+id+"?"+q.join("&"), function(json) {
          if (json.result)
            callback(_this._prepareBookmark(json.item, json.item));
          else
            callback(false);
        });
      }

      if (typeof params.url != "undefined")
        Api.post("check/url", {url: params.url}, function(json) {
          if (json.result){
            if (params.onlyId)
              callback({_id: json.id});
            else
              getById(json.id, params);
          }
          else
            callback(false);
        });
      else
        getById(params._id, {});
    },

    onParseURL: function(params, callback) {
        var url = (params.item.url||""), _this = this;

        try{
            if (url.indexOf('://') < 3)
                url = "http://"+url;
        }catch(e){}

        if (V.isURL(url, {require_tld: false, require_valid_protocol: false})){
            Api.get("parse?url="+encodeURIComponent(url), function(json){
                try{
                    json = JSON.parse(json);
                }catch(e){}

                json = json || {result:false};

                json.item = _this._prepareBookmark(params.item, json.item);

                callback(json.item);
            }, {text:true});
        }else{
            callback(false);
        }
    },

    _prepareBookmark: function(params, item) {
      var empty = false;

      if (typeof item == "undefined")
        empty = true;
      else
        if (item == null)
          empty = true;

      if (empty)
        item = _.clone(_blankBookmark);

      item.link = params.url || item.link;
      item.url = params.url;
      item.cover = 0;
      item.coverId = params.coverId;
      item.coverEnabled = true;

      item.domain = item.domain || network.getDomain(params.url);
      if (item.title==""){
        item.title = S(item.domain).capitalize().s;
        try{
          item.title = item.title.split(".")[0];
        }catch(e){}
      }

      if (typeof params.collection != "undefined"){
        item.collectionId = params.collection["$id"];
      }

      if (typeof params.collectionId != "undefined"){
        item.collectionId = params.collectionId;
        item.collection = {"$id": params.collectionId};
      }

      return item;
    },

    onInsertBookmark: function(params, callback) {
        var _this = this;
        params.dontAdd = params.dontAdd || false;

        //sort to end if favorite
        if (params.toEndOfList)
          params.item.sort = 0;

        var insertToModels = function(item) {
          if (!params.dontAdd){
              item._id = item._id || new Date().getTime();

              //Default override bookmark item
              if (typeof params.placeholder == "object"){
                for(var i in params.placeholder)
                  item[i] = params.placeholder[i];
              }

              if (params.toEndOfList)
                _bookmarks.push(item);
              else
                _bookmarks.unshift(item);

              CollectionsActions.updateCountCollection({_id: params.item.collectionId, count: "+"});
              _this.update();
          }

          if (!params.silent)
            Toasts.show({text: t.s((params.item.type||"link") + 'Saved'), title: params.item.title});

          Api.setItem("last_collection", params.item.collectionId);
          LastBookmarkActions.insert(item);
        }

        if (UserStore.isLogged())
        Api.post("raindrop", params.item, function(json){
            if (json.result){
              insertToModels(json.item);
            }else{
              if (!params.silent)
                Toasts.show({text: strings.getErrorFromJSON(json), title: params.item.title, status:"error"});
            }

            callback(json.item||false);
        });
        else{
          if (params.possibleWithoutAuth){
            insertToModels(params.item);
            callback(params.item);
          }else
            callback(false);
        }
    },

    onUploadFile: function(params, callback) {
      var _this = this;

      Api.upload("raindrop/"+params.item._id+"/file", {name: "file", file: params.file}, function(progress){
        if (progress){
          var index = _.findIndex(_bookmarks, {_id: params.item._id});
          if (index!=-1){
            _bookmarks[index].progress = progress;
          }

          _this.update();
        }
      }, function(json){
        if (json.result){
          var index = _.findIndex(_bookmarks, {_id: params.item._id});
          if (index!=-1){
            _bookmarks[index] = json.item;
            _bookmarks[index].loading = false;
          }

          _this.update();
        }else{
          Toasts.show({text: t.s("fileUploadUnable"), title: params.item.title, status: "error"});
          _this.onRemoveBookmark({
            item: params.item,
            silent: true
          });
        }

        callback(json);
      });
    },

    onUpdateBookmark: function(p, callback) {
      var params = _.clone(p);
      var _this = this;

      if (typeof params.updateModel == "undefined")
          params.updateModel = true;

      if (typeof params.successMessage == "undefined")
          params.successMessage = t.s("saveSuccess");

      if (typeof params.append == "object")
        if (params.append.length>0){
          var index = _.findIndex(_bookmarks, {_id: params.item._id});
          if (index!=-1){
            for(var i in params.append){
              switch(typeof _bookmarks[index][params.append[i]]){
                case "object":
                  params.item[params.append[i]] = _bookmarks[index][params.append[i]].concat(params.item[params.append[i]]);
                  params.item[params.append[i]] = _.uniq(params.item[params.append[i]]);
                break;

                case "string":
                  params.item[params.append[i]] = _bookmarks[index][params.append[i]] + params.item[params.append[i]];
                break;
              }
            }
          }
        }

      Api.put("raindrop/"+params.item._id, params.item, function(json){
        if (json.result) {
          Api.setItem("last_collection", json.item.collection["$id"]);
          
            if (params.updateModel){
              var index = _.findIndex(_bookmarks, {_id: params.item._id});
              if (index!=-1) {
                var action = "update";

                if (json.item.collection["$id"]!=_bookmarks[index].collection["$id"])
                  action = "remove";

                if (params.showingCollectionId === 0)
                  action = "update";

                switch(action){
                  case "update":
                    _bookmarks[index] = json.item;
                  break;

                  case "remove":
                    CollectionsActions.updateCountCollection({_id: _bookmarks[index].collection["$id"], count: "-"});
                    CollectionsActions.updateCountCollection({_id: json.item.collection["$id"], count: "+"});
                    _bookmarks.splice(index, 1);
                  break;
                }

                _this.update();
              }
            }

            if (!params.silent)
                Toasts.show({text: params.successMessage, title: json.item.title});
        }else{
            if (!params.silent)
                Toasts.show({text: strings.getErrorFromJSON(json), status: "error"});
        }

        if (typeof callback == 'function')
            callback((json.item || [])._id || false);
      });
    },

    onUpdateSelectedBookmarks: function(params, callback) {
      var selectedIds = [], _this = this;
      for(var i in _bookmarks)
        if (_bookmarks[i].selected || false)
          selectedIds.push(_bookmarks[i]._id);

      var step = 0,
          count = _selectedCount,
          check = function(result) {
            if (result){
              step++;
              if (step<=count-1)
                now();
              else{
                _this.onClearSelect();
                callback(true);
              }
            }else{
              _this.onClearSelect();
              callback(false);
            }
          },

          now = function(){
            var temp = JSON.parse(JSON.stringify(params));
            temp.item._id = parseInt(selectedIds[step]);
            BookmarkActions.updateBookmark(temp, check);
          }

      now();
    },

    onCopySelectedBookmarks: function(params, callback) {
      var selectedIds = [], _this = this;
      for(var i in _bookmarks)
        if (_bookmarks[i].selected || false)
          selectedIds.push(_bookmarks[i]._id);

      var step = 0,
          count = _selectedCount,
          check = function(result) {
            if (result){
              step++;
              if (step<=count-1)
                now();
              else{
                _this.onClearSelect();
                callback(true);
              }
            }else{
              _this.onClearSelect();
              callback(false);
            }
          },

          now = function(){
            Api.get("raindrop/"+selectedIds[step], function(json) {
              if (json.result){
                var link = json.item.link;
                json.item = _this._prepareBookmark(json.item, json.item);
                json.item.link = json.item.url = link;
                json.item.collectionId = params.collectionId;
                delete json.item._id;
                delete json.item.sort;
                delete json.item.collection;
                delete json.item.lastUpdate;
                BookmarkActions.insertBookmark({item: json.item, dontAdd: true, silent: true}, check);
              }else{
                _this.onClearSelect();
                callback(false);
              }
            });
            
            /*var temp = JSON.parse(JSON.stringify(params));
            temp.item._id = parseInt(selectedIds[step]);
            BookmarkActions.updateBookmark(temp, check);*/
          }

      now();
    },

    onRemoveBookmark: function(params, callback) {
        var _this = this;
        var perm = "";

        var removeFromModels = function() {
          if (typeof params.item.collection != "undefined")
          if (params.item.collection["$id"]==-99)
              perm = "Permament";

          if (!UserStore.isLogged())
              perm = "Permament";

          var index = _.findIndex(_bookmarks, {_id: params.item._id});
          try{
            CollectionsActions.updateCountCollection({_id: params.item.collection["$id"], count: "-"});
          }catch(e) {}
          if (index!=-1) {
              _bookmarks.splice(index, 1);
              _this.update();
          }

          if (!params.silent)
            Toasts.show({text: t.s((params.item.type||"link") + 'Removed' + perm), title: params.item.title});

          LastBookmarkActions.remove(params.item);
        }

        if (UserStore.isLogged())
        Api.del("raindrop/"+params.item._id, function(json) {
            if (json.result) {
              removeFromModels();
            }else{
                if (!params.silent)
                  Toasts.show({text: strings.getErrorFromJSON(json), title: params.item.title, status:"error"});
            }

            if (typeof callback == "function")
                callback(json.result||false, perm);
        });
        else{
          removeFromModels();

          if (typeof callback == "function")
              callback(true, perm);
        }
    },

    onRemoveSelectedBookmarks: function(params, callback) {
      var selectedItems = [], _this = this;
      for(var i in _bookmarks)
        if (_bookmarks[i].selected || false)
          selectedItems.push(_bookmarks[i]);

      var step = 0,
          count = _selectedCount,
          check = function(result, perm) {
            if (result){
              step++;
              if (step<=count-1)
                now();
              else{
                _this.onClearSelect();
                callback(true, perm);
              }
            }else{
              _this.onClearSelect();
              callback(false);
            }
          },

          now = function(){
            var temp = params;
            temp.item = selectedItems[step];
            BookmarkActions.removeBookmark(temp, check);
          }

      now();
    },

    onSwapBookmarks: function(params) {
      if (params.fromId==params.toId)
        return false;

      var fromIndex = _.findIndex(_bookmarks, {_id: parseInt(params.fromId)});
      var toIndex = _.findIndex(_bookmarks, {_id: parseInt(params.toId)});

      if ((fromIndex!=-1)&&(toIndex!=-1)){
        var fromSort = _.clone(_bookmarks[fromIndex].sort);
        var toSort = _.clone(_bookmarks[toIndex].sort);

        var tempFrom = _.clone(_bookmarks[fromIndex]);
        _bookmarks[fromIndex] = _bookmarks[toIndex];
        _bookmarks[toIndex] = tempFrom;

        _bookmarks[fromIndex].sort = fromSort;
        _bookmarks[toIndex].sort = toSort;

        this.update();

        if (params.preservList){
          _moveUpdateList[params.fromId]=true;
          _moveUpdateList[params.toId]=true;
        }
      }else{
        return false;
      }
    },

    onSaveAllSort: function() {
      for(var i in _bookmarks){
        _bookmarks[i].sort = _bookmarks.length - i;

        if (UserStore.isLogged())
        this.onUpdateBookmark({
            item: {
                _id: _bookmarks[i]._id,
                sort: _bookmarks[i].sort
            },
            silent: true,
            updateModel: false
        });
      }
    },

    onSyncMove: function() {
      for(var i in _moveUpdateList){
        var index = _.findIndex(_bookmarks, {_id: parseInt(i)});
        if (index!=-1)
        this.onUpdateBookmark({
            item: {
                _id: _bookmarks[index]._id,
                sort: _bookmarks[index].sort
            },
            silent: true,
            updateModel: false
        });
      }
      _moveUpdateList = [];
    },

    onSetSelected: function(params) {
      var index = _.findIndex(_bookmarks, {_id: params.id});
      if (index!=-1) {
          _bookmarks[index].selected = params.selected;

          if (params.shift){
            var nearIndexs = [], closestIndex = 0;
            _bookmarks.forEach(function(item,i){
              if ((item.selected || false)&&(i!=index))
                nearIndexs.push(i);
            });

            if (nearIndexs.length>0)
            closestIndex = nearIndexs.reduce(function (prev, curr) {
              return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
            });

            if (closestIndex < index){
              for(var i=closestIndex; i < index; i++){
                _bookmarks[i].selected = true;
              }
            }else{
              for(var i=index; i < closestIndex; i++)
                _bookmarks[i].selected = true;
            }
          }

          _selectedCount = 0;
          _bookmarks.forEach(function(item){
            if (item.selected || false)
              _selectedCount++;
          });

          this.trigger(_bookmarks);
      }
      else
          return null;
    },

    onSelectAll: function() {
      for(var i in _bookmarks)
        _bookmarks[i].selected = true;

      _selectedCount = _bookmarks.length;
      this.trigger(_bookmarks);
    },

    onClearSelect: function() {
      _selectedCount = 0;
      for(var i in _bookmarks)
        _bookmarks[i].selected = false;

      this.trigger(_bookmarks);
    },

    getBookmarks: function() {
        return _bookmarks;
    },

    getBookmark: function(id) {
        var index = _.findIndex(_bookmarks, {_id: id});
        if (index!=-1) {
            try{
              _bookmarks[index].collectionId = _bookmarks[index].collection["$id"];
            }catch(e){}
            _bookmarks[index].coverEnabled = true;
            return JSON.parse(JSON.stringify(_bookmarks[index]));
        }
        else
            return null;
    },

    getIsLoading: function() {
        return _loading;
    },

    getIsNoMore: function() {
        return _noMore;
    },

    getCount: function() {
        return _bookmarks.length;
    },

    getSelectedCount: function() {
      return _selectedCount;
    },

    update: function(updateCache) {
        if (typeof updateCache == "undefined")
          updateCache = true;

        this.trigger(_bookmarks);
        if ((_canLoadFromCache)&&(updateCache)) {
          switch(_speed){
            case "async":
              try{ls.setItem(_url, _bookmarks).then(function(){}).catch(function(e){})}catch(e){};
            break;

            case "sync":
              Api.setItem(_url, JSON.stringify(_bookmarks));
            break;
          }
        }
    },

    onInitFavorites: function() {
      var _this = this, fromChrome = false, needDefaults = true;

      try{
        if (UserStore.getUser().config["web_init_favorites"])
          needDefaults = false;
      }catch(e) {}

      if (typeof chrome != "undefined")
        if (typeof chrome.topSites != "undefined"){
          fromChrome = true;
        }

      var setDefaults = function() {
        var lang = t.getLang();
        if (typeof _initFavorites[lang] == "undefined")
          lang = "en_US";
        _bookmarks = _initFavorites[lang];
      }

      var saveDefaults = function() {
        _bookmarks.forEach(function(item) {
          item.url = item.link;
          Api.post("raindrop", item, function(json){});
        });
        UserStore.saveConfig({notify: true, name: "web_init_favorites", updateModel: false});
      }

      if ((_bookmarks.length==0)&&(needDefaults)) {
        if (fromChrome){
          chrome.topSites.get(function(items){
            for(var i in items){
              if (i<=5){
                _bookmarks.push({
                  _id: parseInt(i)+1,
                  title: items[i].title,
                  link: items[i].url,
                  domain: network.getDomain(items[i].url),
                  collectionId: -2,
                  sort: items.length - i
                });
              }else
                break;
            }

            if (_bookmarks.length==0)
              setDefaults();
            _this.update();
            saveDefaults();
          });
        }else{
          setDefaults();
          _this.update();
          saveDefaults();
        }
      }
    },

    handleDropFiles: function(e) {
      var cId = CollectionsStore.getCurrentId("file");

      var current = Promise.resolve();
      var queue = e.files.map(function(f) {
        
        current = current.then(function(){
          return new Promise(function(res,rej){
            if (cId != CollectionsStore.getCurrentId()){
              window.location.hash="#/collection/"+cId;
              setTimeout(function(){
                res(true);
              },200);
            }else
              res(true);
          })
        })
        //get dataURI preview
        .then(function(){
          return new Promise(function(res,rej){
            if (f.file.size<1048576){//1mb
              var reader  = new FileReader();
              reader.onloadend = function () {
                res(reader.result);
              }
              reader.onerror = function () {
                res(null);
              }

              reader.readAsDataURL(f.file);
            }else
              res(null);
          })
        })
        //save placeholder bookmark
        .then(function(dataURI) {
          return new Promise(function(res,rej){
            BookmarksStore.onInsertBookmark({
              silent: true,
              item: {
                title: f.file.name.split('.')[0],
                collectionId: cId,
                url: "https://raindrop.io/ping",
                type: f.type
              },
              placeholder: {
                //cover: "https://raindrop.io/img/other/parsing.png",
                loading: true
              }
            }, function(item) {
              //set placeholder image
              setTimeout(function(){
                var coverElement = null;
                try{coverElement = (document.getElementById("bookmark-loading-progress-"+item._id).parentElement).getElementsByClassName('cover-img')[0]}catch(e){};
                if (coverElement) {
                  try{
                    if (dataURI){
                      coverElement.src = dataURI||""; coverElement.removeAttribute("srcset");
                    }
                  }catch(e){}
                }
              },1);

              res({item: item, file: f.file});
            });
          });
        })
        return current;
      });
      
      if (queue.length>0){
        Toasts.show({text: t.s("importingInfo2"), title: t.s("uploadProgress")});

        Promise.all(queue)
          .then(function(result) {
            result.reverse();
            
            var c = Promise.resolve();
            var uploadQueue = result.map(function(r){
              var item = r.item; 
              c = c.then(function(){
                return new Promise(function(res,rej){
                  if (!item)
                    res(null);
                  else
                    BookmarksStore.onUploadFile({
                      item: item,
                      file: r.file
                    }, function(item) {
                      res(item);
                    })
                });
              });
              return c;
            });

            return Promise.all(uploadQueue);
          })
          .then(function(items) {
            var doneCount = 0;
            for(var i in items)
              if (items[i].result) doneCount++;

            //check all
            if (doneCount)
              Toasts.show({text: t.s("saveSuccess"), title: doneCount+" files"});
            //else
            //  Toasts.show({text: t.s("fileUploadError"), status: "error"});
          });
      }else{
        Toasts.show({text: t.s("fileUploadError"), status: "error"});
      }
    },

    _bookmarkNavigation: function(id) {
      var index = _.findIndex(_bookmarks, {_id: id});
      if (index!=-1){
        var next = 0, prev = 0;
        if (typeof _bookmarks[index+1] != "undefined")
          next = _bookmarks[index+1]._id;
        if (typeof _bookmarks[index-1] != "undefined")
          prev = _bookmarks[index-1]._id;
        return {next: next, prev: prev};
      }else
        return {next: 0, prev: 0};
    },

    reset: function(withUpdate) {
        _bookmarks = [];
        _loading = false;
        _loaded = false;
        _noMore = false;
        _selectedCount = 0;

        if (withUpdate) this.update();
    }
});

module.exports = BookmarksStore;

},{"../actions/Bookmarks":2,"../actions/Collections":4,"../actions/LastBookmark":5,"../stores/Collections":115,"validator":"validator"}],114:[function(require,module,exports){
var ChildrensActions = require('../actions/Childrens');
var CollectionsActions = require('../actions/Collections');
var CollectionsStore = require('../stores/Collections');

var _childrens = [], _loading = false, _speed = "sync";

var ChildrensStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(ChildrensActions.load, this.onLoad);
        this.listenTo(ChildrensActions.swapCollections, this.onSwapCollections);
        this.listenTo(ChildrensActions.saveAllSort, this.onSaveAllSort);
        this.listenTo(CollectionsActions.updateCollection, this.onUpdateCollection);
        this.listenTo(ChildrensActions.removeCollection, this.onRemoveCollection);
    },

    onLoad: function(params) {
        if (typeof params.speed != "undefined")
          _speed = params.speed;
        else
          _speed = "sync";

        var _this = this,
            url = "collections?parent="+params.cId;

        _loading = true;

        if (params.cId>0) {
            _childrens = [];

            //from cache
            switch(_speed){
                case "async":
                    try{ls.getItem(url)
                        .then(function (val) {
                            if ((val) && (_childrens.length == 0)) {
                                _childrens = val;
                                _this.trigger(_childrens);
                            }
                        })
                        .catch(function(e){
                            
                        });}catch(e){}
                break;

                case "sync":
                    try{
                      _childrens = JSON.parse(Api.getItem(url)) || [];
                    }catch(e){if (e) _childrens = [];}
                    if (_childrens.length>0)
                      _this.trigger(_childrens);
                break;
            }

            Api.get(url, function (json) {
                _loading = false;

                if (parseInt(CollectionsStore.getCurrentId()) != parseInt(params.cId))
                    return false;

                if (json.result) {
                    _childrens = json.items;
                }else{
                    _childrens = [];
                }

                switch(_speed){
                    case "async":
                        try{ls.setItem(url, _childrens).then(function(){}).catch(function(e){})}catch(e){};
                    break;

                    case "sync":
                        Api.setItem(url, JSON.stringify(_childrens));
                    break;
                }
                
                _this.trigger(_childrens);
            });
        }else{
            _loading = false;
        }
    },

    onSwapCollections: function(params) {
      if (params.fromId==params.toId)
        return false;

      var fromIndex = _.findIndex(_childrens, {_id: parseInt(params.fromId)});
      var toIndex = _.findIndex(_childrens, {_id: parseInt(params.toId)});

      if ((fromIndex!=-1)&&(toIndex!=-1)){
        var fromSort = _.clone(_childrens[fromIndex].sort);
        var toSort = _.clone(_childrens[toIndex].sort);

        //_childrens = strings.swapArray(_childrens, fromIndex, toIndex);
        var tempFrom = _.clone(_childrens[fromIndex]);
        _childrens[fromIndex] = _childrens[toIndex];
        _childrens[toIndex] = tempFrom;
        this.trigger(_childrens);
      }else{
        return false;
      }
    },

    onSaveAllSort: function() {
      for(var i in _childrens){
        _childrens[i].sort = i;

        if (UserStore.isLogged())
        CollectionsActions.updateCollection({
            item: {
                _id: _childrens[i]._id,
                sort: _childrens[i].sort
            },
            silent: true,
            updateModel: false
        });
      }
    },

    getChildrens: function() {
        return _childrens;
    },

    onUpdateCollection: function(params) {
        var index = _.findIndex(_childrens, { _id: params.item._id });
        if (index!=-1){
            for(var i in params.item)
                _childrens[index][i] = params.item[i];
        }
    },

    onRemoveCollection: function(params) {
        var index = _.findIndex(_childrens, { _id: params.item._id });
        if (index!=-1){
          _childrens.splice(index,1);
        }
    },

    getIsLoading: function() {
      return _loading;
    },

    getCount: function() {
      return _childrens.length;
    },

    reset: function() {
        _childrens=[];
    }
});

module.exports = ChildrensStore;

},{"../actions/Childrens":3,"../actions/Collections":4,"../stores/Collections":115}],115:[function(require,module,exports){
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

},{"../actions/Bookmarks":2,"../actions/Childrens":3,"../actions/Collections":4,"../actions/User":14,"../stores/Stats":122}],116:[function(require,module,exports){
var LastBookmarkActions = require('../actions/LastBookmark');

var _action = {
    name: "",
    bookmark: {}
};

var LastBookmarkStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(LastBookmarkActions.insert, this.onInsert);
        this.listenTo(LastBookmarkActions.remove, this.onRemove);
    },

    onInsert: function(item) {
        this.trigger({
            name: "insert",
            bookmark: item
        });
    },

    onRemove: function(item) {
        this.trigger({
            name: "remove",
            bookmark: item
        });
    }
});

module.exports = LastBookmarkStore;

},{"../actions/LastBookmark":5}],117:[function(require,module,exports){
var ModalFrameActions = require('../actions/ModalFrame');

var ModalFrameStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(ModalFrameActions.show, this.onShow);
    },

    onShow: function(params) {
    	params.show = true;
        this.trigger(params);
    }
});

module.exports = ModalFrameStore;

},{"../actions/ModalFrame":6}],118:[function(require,module,exports){
var ParentsActions = require('../actions/Parents');
var CollectionsStore = require('../stores/Collections');

var _parents = [], _cache = [];

var ParentsStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(ParentsActions.load, this.onLoad);
        this.listenTo(ParentsActions.reset, this.reset);
    },

    onLoad: function(params) {
        var _this = this;

        if (_cache.length==0)
            Api.get("childrens", function(json){
                if (json.result)
                    _cache = json.items;
                _this.findParents(params.cId);
            });
        else
            _this.findParents(params.cId);
    },

    getParents: function() {
        return _parents;
    },

    findParents: function(cId) {
        var ids = [cId], _parents = [];

        var findParents = function (id) {
            _cache.forEach(function (item) {
                if (id == item._id) {
                    if (item._id != cId)
                        _parents.push(item);
                    ids.push(item.parent.$id);
                    findParents(item.parent.$id);
                }
            });
        }
        findParents(ids[0]);

        var root = CollectionsStore.getCollection(ids[ids.length - 1]);
        if (root != null)
            if (root._id != cId)
                _parents.push(root);

        _parents.reverse();

        this.trigger(_parents);
    },

    reset: function() {
        _parents=[]; _cache = [];
    }
});

module.exports = ParentsStore;

},{"../actions/Parents":7,"../stores/Collections":115}],119:[function(require,module,exports){
var PopActions = require('../actions/Pop');
var _params = false;

module.exports = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(PopActions.show, this.onShow);
        this.listenTo(PopActions.close, this.onClose);
    },

    onShow: function(name,params) {
      _params = params;
      _params.name = name;
      this.trigger(_params);
    },

    onClose: function() {
      _params = false;
      this.trigger(_params);
    },

    getParams: function() {
      return _params;
    }
});

},{"../actions/Pop":8}],120:[function(require,module,exports){
var SidebarActions = require('../actions/Sidebar');
var _open = false;
try{_open=window.sidebar.open}catch(e){}

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(SidebarActions.change, this.onChange);
  },

  onChange: function(open) {
    _open=open;
    window.sidebar.change(_open);
    this.trigger(_open);
  },

  getState: function() {
    return _open;
  }
});

},{"../actions/Sidebar":9}],121:[function(require,module,exports){
var SitesActions = require('../actions/Sites');

var _sites = [], _loading = false;

var SitesStore = Reflux.createStore({
    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(SitesActions.load, this.onLoad);
    },

    onLoad: function() {
    	var _this = this;

    	if (_loading)
    		return;

    	_loading = true;
    	Api.get("sites", function(json) {
    		if (json.result){
	    		_sites = json.items;
	    		_this.trigger(_sites);
	    	}

            _loading = false;
    	});
    },

    getSites: function() {
    	return _sites;
    }
});

module.exports = SitesStore;

},{"../actions/Sites":10}],122:[function(require,module,exports){
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

},{"../actions/Collections":4,"../actions/Stats":11}],123:[function(require,module,exports){
var TagsActions = require('../actions/Tags');

var _tags = [];

var TagsStore = Reflux.createStore({
    url: "tags",

    init: function() {
        // Here we listen to actions and register callbacks
        this.listenTo(TagsActions.load, this.onLoad);
    },

    onLoad: function() {
        var _this = this;

        if (_tags.length==0) {
            try{ls.getItem(_this.url)
                .then(function (val) {
                    if ((val) && (_tags.length == 0)) {
                        _tags = val;
                        _this.trigger(_tags);
                    }
                })
                .catch(function(e){
                            
                });}catch(e){}

            Api.get(_this.url, function (json) {
                if (json.result) {
                    _tags = json.items;
                    try{ls.setItem(_this.url, _tags).then(function(){}).catch(function(e){})}catch(e){};
                    _this.trigger(_tags);
                }
            });
        }else{
          _this.trigger(_tags);
        }
    },

    onUpdate: function(params) {
        var _this = this;

        Api.put("tag", {tag: params._id, replace: params.replace}, function(json){
            if (json.result){
                _tags[_.findIndex(_tags,{_id: params._id})]._id = params.replace;
                try{ls.setItem(_this.url, _tags).then(function(){}).catch(function(e){})}catch(e){};
                _this.trigger(_tags);

                Toasts.show({text: t.s("saveSuccess"), title: params._id});
            }
        });
    },

    onRemove: function(params) {
        var _this = this;

        Api.del("tag?tag="+encodeURIComponent(params._id), function(json){
            if (json.result){
                _tags.splice(_.findIndex(_tags,{_id: params._id}), 1);
                try{ls.setItem(_this.url, _tags).then(function(){}).catch(function(e){})}catch(e){};
                _this.trigger(_tags);

                Toasts.show({text: t.s("removeSuccess"), title: params._id});
            }
        });
    },

    getTags: function() {
        return _tags;
    },

    reset: function() {
        _tags=[];
    }
});

module.exports = TagsStore;

},{"../actions/Tags":12}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
var UserActions = require('../actions/User');
var ModalFrameActions = require('../actions/ModalFrame');
var CollectionsStore = require('./Collections');

var _user = {}, _logged = false, _loading = false, _trusted = false;

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

    isTrusted: function() {
      return _trusted;
    },

    onLoad: function(callback,exactlyAfterCacheLoaded) {
        var canLoad = true;
        if (_loading)
          canLoad = false;
        if (_logged)
          if (_trusted)
            canLoad = false;

        if (!canLoad) {
          if (typeof callback == "function")
              callback(false);
          this.trigger(_user);
          return;
        }

        var _this = this;
        _loading = true;
        this._resetFromCache(exactlyAfterCacheLoaded);

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
              try{
                ls.setItem('user', _user).then(function(){}).catch(function(e){})
                ls.setItem('user_id', _user._id || 0).then(function(){}).catch(function(e){})
              }catch(e){};

              _loading = false;
              _trusted = true;

              _this.trigger(_user);
              _this._checkGroupsStability();
              _this.updateIntercom();
            }

            if ((typeof json.result == "boolean") || (typeof json.auth == "boolean")){
              try{ls.getItem("user_id")
                .then(function(_userId) {
                  var currentJSONuserId = null;
                  try{currentJSONuserId = parseInt(json.user._id);}catch(e){}

                  if ((json.result||false)&&(parseInt(_userId) == currentJSONuserId)){
                    afterCheck();
                  }
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
              _loading = false;
              _trusted = true;
              _this.trigger(_user);
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
          }catch(e){if(e)callback();}
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
        try{
          ls.setItem('user', _user).then(function(){}).catch(function(e){})
        }catch(e){};
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

    _checkCache: function(cache,callback) {
        if (_logged){
          if (typeof callback == "function")
            callback(_logged);
          return;
        }
        if ((typeof cache == 'object')&&(cache!=null)){
            _user = cache||{};
            if (_user._id){
              _logged = true;
              this.cleanGroups();
            }
        }
        
        if (typeof callback == "function")
          callback(_logged);
    },

    _resetFromCache: function(callback) {
        if (window.cacheDisabled||false){
          if (typeof callback == "function")
            return callback(_logged);
          return;
        }

        if (_logged){
          if (typeof callback == "function")
            return callback(_logged);
          return;
        }

        _logged = false;

        var cache = Api.getItem('user');
        try{
            cache = JSON.parse(cache);
        }catch(e){if (e) cache = null;}

        var _this = this;
        if (cache==null)
          try{ls.getItem("user")
            .then(function(cache) {
              _this._checkCache(cache,callback);
            })
            .catch(function(e){if(e) if (typeof callback == "function") return callback(_logged)});}catch(e){if(e) if (typeof callback == "function") return callback(_logged)}
        else
          this._checkCache(cache,callback);
    },

    _setProData: function(isPro, proExpire){
      _user.pro = isPro;
      _user.proExpire = proExpire;
    }
});

module.exports = UserStore;

},{"../actions/ModalFrame":6,"../actions/User":14,"./Collections":115}]},{},[15]);
