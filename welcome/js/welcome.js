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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports=module.exports = "{\n\t\"links\": {\n\t\t\"apps\": \"https://raindrop.io/settings#/settings/install\",\n\t\t\"extension\": {\n\t\t\t\"chrome\": \"https://chrome.google.com/webstore/detail/ldgfbffkinooeloadekpmfoklnobpien\",\n\t\t\t\"firefox\": \"https://addons.mozilla.org/firefox/addon/raindropio/\",\n\t\t\t\"safari\": \"https://raindrop.io/releases/safari.safariextz\",\n\t\t\t\"opera\": \"https://addons.opera.com/extensions/details/raindropio-smart-bookmarks\"\n\t\t},\n\t\t\"newtab\": {\n\t\t\t\"chrome\": \"https://chrome.google.com/webstore/detail/raindropio-new-tab-speed/knifgjkgmgdinjeecneiphoniamhgbof\",\n\t\t\t\"firefox\": \"https://raindrop.io/releases/newtab.xpi\"\n\t\t},\n\t\t\"ios\": \"https://itunes.apple.com/us/app/raindrop.io-keep-your-favorites/id1021913807\",\n\t\t\"android\": \"https://play.google.com/store/apps/details?id=io.raindrop.raindropio\",\n\t\t\"osx\": \"https://itunes.apple.com/app/raindrop.io-keep-your-favorites/id957810159\",\n\n\t\t\"settings\": \"https://raindrop.io/settings#/settings\"\n\t}\n}";

},{}],10:[function(require,module,exports){
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

},{"superagent":"superagent"}],11:[function(require,module,exports){
module.exports = {
    "en_US": {
        "server": "Unknown error, please try again!",
        "serverundefined": "Unknown error, please try again!",
        "server0": "Enter old password",
        "server1": "Email address is not valid!",
        "server2": "Enter your name!",
        "server3": "Old password is not valid!",
        "server4": "Password is not valid!",
        "server5": "This email is already used!",
        "server6": "Enter title!",
        "server7": "Wrong email and/or password combination!",
        "serverincorrect url": "Incorrect URL",
        "collection": "Collection",
        "collectionNew": "New collection",
        "collectionDeleteConfirm": "Are you sure you want to delete this collection? All bookmarks within the collection will also be removed!",
        "saveChanges": "Save",
        "saveError": "Saving error!",
        "saveSuccess": "Saved successfully!",
        "saved": "Saved",
        "addSuccess": "Added!",
        "moveSuccess": "Bookmarks moved!",
        "removeSuccess": "Item removed!",
        "coverUpload": "Upload cover",
        "fileUploadUnable": "File cannot be uploaded!",
        "fileUploadError": "Upload error.  try again!",
        "linkNotRecognized": "Link not recognized",
        "permalink": "Permalink:",
        "profile": "Profile",
        "signIn": "Log in",
        "myCollections": "My Collections",
        "save": "Save",
        "remove": "Remove",
        "elements": "bookmark",
        "about": "About Us",
        "blog": "Blog",
        "tools": "Tools",
        "signInSocial": "Log in with",
        "signUpSocial": "Sign up with",
        "signUp": "Sign up",
        "register": "Sign up",
        "recoverPassword": "Reset password",
        "password": "Password",
        "edit": "Edit",
        "editMin": "Edit",
        "collectionEmpty": "Collection is empty",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Recommend",
        "installExtension": "Install extension",
        "extensionDescription": "The most simple, easiest and fastest way to collect  information from the web.",
        "enterLink": "Enter link",
        "enterLinkDescription": "Insert a link to any web page, article, photo or video. Whatever you ike!",
        "backToCollection": "Back to collection",
        "viewOn": "View on",
        "articled": "article",
        "imaged": "photo",
        "videod": "content",
        "linkd": "link",
        "article": "Article",
        "image": "Photo",
        "video": "Content",
        "link": "Link",
        "articles": "Articles",
        "images": "Photos",
        "videos": "Content",
        "links": "Links",
        "articleSaved": "Article saved",
        "imageSaved": "Photo saved",
        "videoSaved": "Content saved",
        "linkSaved": "Link saved",
        "articleRemoved": "Article moved to trash",
        "imageRemoved": "Photo moved to trash",
        "videoRemoved": "Content move to trash",
        "linkRemoved": "Link moved to trash",
        "articleRemovedPermament": "Article removed",
        "imageRemovedPermament": "Photo removed",
        "videoRemovedPermament": "Content removed",
        "linkRemovedPermament": "Link removed",
        "bookmarksRemoved": "Bookmarks moved to trash",
        "bookmarksRemovedPermament": "Bookmarks removed",
        "other": "other",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "on",
        "basicData": "Account settings",
        "yourName": "Your name",
        "changePassword": "Change password",
        "newPassword": "New password",
        "currentPassword": "Current password",
        "findBookmarkLong": "Find bookmark...",
        "nothingFound": "Nothing found",
        "add": "Add",
        "cancel": "Cancel",
        "covers": "Covers",
        "upload": "Upload",
        "imagesOnly": "Images only (max size: 5MB)",
        "uploadProgress": "Uploading...",
        "fontFamily": "Font family",
        "fontSize": "Font size",
        "interfaceStyle": "Interface style",
        "additional": "Additional",
        "fixedWidth": "Fixed width",
        "logOut": "Logout",
        "titleAndDescription": "Title & description",
        "title": "Title",
        "description": "Description",
        "enterTitle": "Enter title",
        "enterDescription": "Enter description",
        "enable": "Enabled",
        "type": "Type",
        "publicCollection": "Public collection",
        "shareCollection": "Share collection",
        "sendEmail": "Send email",
        "copyLink": "Copy a link",
        "language": "Language",
        "iHaveAccount": "I already have an account",
        "createFirstCollection": "Create first collection",
        "checkYourEmail": "Check your inbox!",
        "und": "&",
        "from": "from",
        "passwordChangeSuccess": "Password successfully changed!",
        "smartSearch": "Smart search",
        "subscribe": "Follow",
        "youSubscribed": "Following",
        "subscriptions": "Following",
        "subscriptionsCollection": "Follow collections",
        "tags": "Tags",
        "addTag": "Add a tag",
        "noDescription": "No description",
        "basic": "Basic",
        "background": "Background",
        "removeBackground": "Remove background",
        "or": "or",
        "noCollections": "No collections",
        "noSubscriptions": "No subscriptions",
        "welcome": "Start collecting with",
        "publicCollections": "Public collections",
        "collectionsCount": "collections",
        "noPublicCollections": "No public collections",
        "noPublicCollectionsD": "This user has not created or does not have any public collections.",
        "all": "All",
        "mobileApp": "Mobile App",
        "exportBookmarks": "Export bookmarks",
        "cover": "Cover",
        "saveToCollection": "Save to collection",
        "selectCollection": "Select Collection",
        "myAccount": "My account",
        "enterTitleAndCollection": "Enter title and collection",
        "selectPreferedType": "Select preferred type",
        "back": "Back",
        "bySort": "Sorted",
        "byName": "by name",
        "byDate": "by date",
        "findOrCreateCollection": "Find or create new collection",
        "createCollection": "New collection",
        "createCollectionFirst": "Create first collection...",
        "createCollectionOrDrag": "Create or drag collection here...",
        "createGroup": "Create group",
        "startToSave": "Please log in to start!",
        "checkAgain": "Check again!",
        "clickToMakeScreenshot": "Click to take a screenshot",
        "elements1": "bookmark",
        "elements2": "bookmarks",
        "elements5": "bookmarks",
        "defaultCollection-0": "Search",
        "defaultCollection--1": "Inbox",
        "defaultCollection--99": "Trash",
        "byTitle": "Alphabetical",
        "saveBookmark": "Save here",
        "saveBookmarkInInbox": "Save to inbox",
        "sites": "Sites",
        "in": "in",
        "settings": "Settings",
        "removeCollectionSuccess": "Collection removed",
        "changeIcon": "Change icon",
        "group": "Group",
        "untitled": "Untitled",
        "removeGroupError": "You can not delete a populated group!",
        "select": "Select",
        "create": "Create",
        "privacy": "Privacy",
        "private": "Private",
        "privateD": "Only you can view",
        "public": "Public",
        "publicD": "Anyone can view",
        "moveDown": "Move down",
        "moveUp": "Move up",
        "moveSelectedBookmarks": "Move selected bookmarks",
        "selectAll": "Select all",
        "supportOnlyUrls": "You can only save links with http or https protocols!",
        "unableToRecognizeSpecifiedLink": "Specified link is not recognized!",
        "addTags": "Add tags",
        "noBookmarks": "No bookmarks",
        "noBookmarksD": "Drag and drop link from page OR click 'Save page'.",
        "alreadyInCollection": "Already in collection",
        "alreadyInCollectionD": "Click to edit description, tags and cover of bookmark",
        "alreadyInCollectionDD": "Edit description, tags and cover",
        "inSocial": "Share link via",
        "copyURL": "Copy URL",
        "read": "Read",
        "smartBookmarks": "Smart Bookmarks",
        "signUpEmail": "Sign up using Email",
        "loginOrRegisterSocial": "Log in or sign up using social networks",
        "help": "Help",
        "name": "Name",
        "haveIdeas": "Support & Feedback",
        "followUsOn": "Follow us for news and updates:",
        "writeUs": "Contact Us",
        "forDevelopers": "For Developers",
        "importBookmarks": "Import bookmarks",
        "howToUse": "How to use?",
        "extension": "Extension",
        "animation": "UI animation",
        "closeOnPageClick": "Close on page click",
        "closeOnPageClickD": "Drag & Drop will not be available",
        "helpContext": "Context menu",
        "helpContextD": "Right mouse click on bookmarks or collections for more actions",
        "helpHotKey": "Hotkey",
        "helpHotKeyD": "You can change key on extensions page",
        "helpVisible": "Expand the visible part of the Website",
        "helpVisibleD": "Move the cursor to the left edge and click on the appearing bar",
        "helpBatch": "Multiselect",
        "helpBatchD": "Select bookmarks for batch actions",
        "moreTips": "Show more tips",
        "view": "View",
        "openLinksInNewTab": "Open links in new tab",
        "allBookmarks": "All bookmarks",
        "parent": "Parent group/collection",
        "footerProAd": "Upgrade to PRO",
        "footerProAdD": "for extra features",
        "onlyInPro": "Only with PRO account",
        "nestedCollections": "Nested collections",
        "dropboxBackup": "Dropbox backup",
        "goToPRO": "Upgrade to PRO",
        "commonSettings": "Common settings",
        "already": "already",
        "addBookmark": "Add bookmark",
        "addBookmarkD": "Paste link to any webpage, article, picture or video",
        "advice": "Advice",
        "addAdvice": "Other ways to add bookmark",
        "browserExtension": "Browser extension",
        "androidApp": "Android app",
        "androidAppD": "Save important content from the web & your favorite apps!",
        "importBookmarksD": "Transfer bookmarks from Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious or other services to Raindrop.io.",
        "showInDock": "Show in Dock",
        "showInTray": "Show in menu bar",
        "alwaysOnTop": "Window always on top",
        "blurHide": "Hide window after losing focus",
        "desktopNeedRestart": "Restart app to apply settings",
        "refresh": "Refresh",
        "editProfile": "Edit profile",
        "profilePage": "My collections page",
        "upgradeAccount": "PRO account",
        "screenshotError": "Web page can't be captured!",
        "lastWeek": "The last 7 days",
        "copyLinkToClipboard": "Copy link to clipboard",
        "openInBrowser": "Open in browser",
        "openInBrowserWithShift": "To open link in browser, hold the Ctrl or Shift key",
        "selectAIconSet": "Icon set",
        "sharing": "Sharing",
        "members": "Members",
        "enterEmails": "Enter email or emails separated by commas...",
        "role_member": "Can edit",
        "role_members": "Can edit",
        "role_viewer": "Can view",
        "role_owner": "Owner",
        "privateCollectionURL": "No public URL. Collection is private",
        "inviteMorePeople": "Invite more people",
        "sendInvites": "Send invites",
        "unshareCollection": "Unshare collection",
        "withAccessLevel": "With access level",
        "invitesSendTo": "Invites sent to",
        "unshareSuccess": "Collection unshared",
        "accessViaLink": "Access via link",
        "desktopIntegration": "Integration with Mac OS X app",
        "error": "Error",
        "tryAgain": "Try again",
        "moveError": "Unable to move!",
        "dev": "Developers",
        "article1": "article",
        "article2": "articles",
        "article5": "articles",
        "image1": "photo",
        "image2": "photos",
        "image5": "photos",
        "video1": "content",
        "video2": "contents",
        "video5": "contents",
        "link1": "link",
        "link2": "links",
        "link5": "links",
        "createNewCollection": "Create collection",
        "toRefreshedRaindrop": "to Raindrop.io",
        "comfortableReading": "Comfortable reading",
        "press": "Press",
        "subscriptionsD": "Create and follow interesting public collections.",
        "smartSearchD": "By any criteria, quickly and easily.",
        "tagsD": "Another way to organize your collection.",
        "comfortableReadingD": "Concentrate on reading your favorite articles in a convenient way.",
        "dragNdropD": "Drag and drop your bookmarks between collections.",
        "exportBookmarksD": "To be able to transfer your collection.",
        "followUs": "Follow us",
        "enterSearchCriteria": "Enter search criteria separated by commas",
        "enterSearchCriteriaD": "In any order, we ourselves determine what you'll enter:",
        "explore": "Explore",
        "exploreCollections": "Explore collections",
        "staffPicks": "Editors' Choice",
        "step": "Step",
        "uploadBookmarksFile": "Upload bookmarks file",
        "dropFilesHere": "Or drop file here",
        "importInfo1": "HTML file (max size: 3MB).",
        "importInfo2": "This file can be generated by your browser or service in the \"Export bookmarks\" section.",
        "importInfo3": "Supports Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool or Netscape bookmarks file format.",
        "loading": "Loading",
        "noBookmarksToImport": "No bookmarks!",
        "foldersWithBookmarks": "Folders",
        "removeIt": "Remove",
        "startImport": "Start import",
        "selectOtherFile": "Select another file?",
        "importing": "Importing",
        "of": "of",
        "bookmarks": "bookmarks",
        "importingInfo1": "Please wait. It may take some time, because every bookmark must be recognized.",
        "importingInfo2": "Do not close this page!",
        "importEnd": "Import completed!",
        "importSuccess": "Successfully imported",
        "importSuccessInfo": "We recommend customizing the appearance and icons of your collections. You can also make them public, share them on social networks or send links to your friends.",
        "importingProcess": "Importing bookmarks may take some time, depending on their number! Please be patient. As soon as they are processed, we will notify you at the specified email!",
        "importingAlready": "Unfortunately we have not finished processing your bookmarks uploaded earlier! Please wait, we will notify you at the specified email.",
        "specifyYourEmail": "Please specify an email in your profile!",
        "staffPicksD": "Interesting collection with beautiful design",
        "templates": "Templates",
        "collectionEdit": "Edit collection",
        "raindropEdit": "Edit bookmark",
        "icon": "Icon",
        "selectOtherIcon": "Change icon...",
        "optional": "Optional",
        "permamentLink": "Permament link",
        "backgroundUploadD": "You can upload a thematic background to stylize your collection. It will appear",
        "onYourCollectionPage": "on the collection page",
        "removeCollectionForever": "Delete collection",
        "theseAreTheBest": "These are the best...",
        "findCollection": "Find collection...",
        "findSubscription": "Find subscription...",
        "more": "More",
        "less": "Less",
        "byPopularity": "by popularity",
        "collectionsSorting": "Collection sorting",
        "sortBy": "Sort by",
        "custom": "Custom",
        "byBookmarksCount": "By number of bookmarks",
        "fastFilter": "Fast filter...",
        "fastView": "Fast view bookmarks",
        "publicPage": "Your public page",
        "welcomeSlide1D": "Save important links, articles, photos, videos, presentations",
        "welcomeSlide1DD": "& organize them into thematic collections.",
        "welcomeSlide1DDD": "Your bookmarks are available from your computer and smartphone.",
        "welcomeSlide2": "Install our extension",
        "welcomeSlide2D": "Easiest, simplest and quickest way",
        "welcomeSlide2DD": "to save important stuff from the Web.",
        "next": "Next",
        "startCollecting": "Finish!",
        "extensionFor": "Extension for",
        "welcomeMobileSlide2": "Always with you",
        "sourceCode": "Source code",
        "sourceCodeD": "Source code of our browser extensions on",
        "sourceCodeDD": "Github repo.",
        "apiD": "Soon.",
        "importFrom": "Import from",
        "openCollection": "Open collection",
        "articlesProccessing": "Full text of articles will be uploaded later.",
        "favoriteSites": "Favorite sites",
        "showAll": "Show all",
        "showAllBookmarks": "Show all bookmarks",
        "youHave": "You have",
        "fillCollectionInput": "Select collection please!",
        "browserBookmarklet": "Browser Bookmarklet",
        "browserBookmarkletD": "None for your browser? Try the browser bookmarklet.",
        "browserBookmarkletDD": "Drag this link to your bookmarks bar",
        "browserBookmarkletDDD": "Save to collection",
        "hi": "Hi",
        "noTags": "No tags",
        "interest_video": "Video",
        "interest_hobbies": "Hobbies",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiration",
        "interest_food_drink": "Food & drinks",
        "interest_animals": "Animals",
        "interest_health_fitness": "Health & fitness",
        "interest_illustrations": "Illustrations",
        "interest_developers": "For Developers",
        "interest_art": "Art",
        "interest_history": "History",
        "interest_pictures": "Pictures",
        "interest_film_music_books": "Films, music & books",
        "interest_cars_motorcycles": "Cars & motorcycles",
        "interest_fashion": "Fashion",
        "interest_science": "Science",
        "interest_news": "News",
        "interest_education": "Education",
        "interest_psychology": "Psychology",
        "interest_travel": "Travel",
        "interest_nature": "Nature",
        "interest_work": "Work",
        "interest_sites": "Sites",
        "interest_diy": "DIY",
        "interest_sport": "Sport",
        "interest_technology": "Technology",
        "interest_products": "Products",
        "interest_sweet_home": "Home",
        "interest_photography": "Photography",
        "interest_humor": "Humor",
        "interest_erotic": "Erotic",
        "interest_other": "Other",
        "interest_food_drink_recipes": "Recipes",
        "interest_film_music_books_films": "Films",
        "interest_film_music_books_music": "Music",
        "interest_film_music_books_books": "Books",
        "interest_psychology_relations": "Relationships",
        "interest_psychology_self_development": "Self improvement",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Games",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Applications",
        "interest_developers_web": "Web development",
        "interest_developers_mobile": "Mobile development",
        "to": "to",
        "inCollection": "in collection",
        "dragCollections": "Change collection order by drag'n'drop.",
        "feedAllCollections": "All collections RSS feed",
        "orAlternativeFeed": "All bookmarks",
        "feedWarning": "Warning! Do not share the unique URL of your RSS subscriptions with others, as they will be able to view your bookmarks!",
        "publicRSSfeed": "Public RSS feed",
        "showPrivateRSSfeed": "Show private RSS feed",
        "privateRSSfeed": "Private RSS feed",
        "mailNotifications": "Email notifications",
        "disableWeeklyDigest": "Disable weekly digest of your bookmarks",
        "trashEmpty": "Trash empty",
        "forOtherBrowsers": "For other browsers",
        "saveLink": "Save page",
        "instruction": "Instructions",
        "install": "Install",
        "importDescription": "Transfer bookmarks from Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious or other services to Raindrop.io.",
        "createSubFolder": "Create nested collection",
        "pro_nesting": "Nested collections",
        "pro_nestingD": "Create any number of nested collections.",
        "pro_dropbox": "Dropbox backup",
        "pro_dropboxD": "Backup the bookmarks and content in your Dropbox account.",
        "pro_support": "Priority support",
        "pro_supportD": "By email or skype.",
        "pro_nextFeatures": "Vote for next features",
        "pro_nextFeaturesD": "Support development of upcoming features!",
        "month": "month",
        "year": "year",
        "oneMonth": "One month",
        "threeMonth": "3 month",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Upgrade to PRO",
        "renewPro": "Renew PRO subscription",
        "renewPromonth": "Renew PRO subscription for a month",
        "renewProyear": "Renew PRO subscription for one year",
        "proTitle": "Use Raindrop.io for free",
        "proTitleD": "or upgrade for",
        "proTitleDD": "extra features.",
        "pro_noAds": "Ads free",
        "pro_noAdsD": "",
        "pro_speed_dial": "New Tab",
        "pro_apple": "iphone/iPad app",
        "pro_desktop": "Desktop app (with sync)",
        "pro_smart_collections": "Smart collections (auto save)",
        "yesIwant": "Yes, I want!",
        "votes": "vote",
        "votes1": "vote",
        "votes2": "votes",
        "votes5": "votes",
        "whatAddNext": "What should we add next?",
        "newString": "New",
        "newBookmark": "New bookmark",
        "thankYou": "Thank you!",
        "nowYouHave": "Now you have a",
        "account": "account",
        "goHome": "Go home",
        "until": "until",
        "goToPayment": "Go to payment",
        "subscriptionPeriod": "Period",
        "paymentMethod": "Payment methods",
        "pricing": "Pricing",
        "visualBookmarks": "Visual bookmarks",
        "readItLater": "Read later",
        "pro_notes": "Notes",
        "sslConnection": "SSL-secured connection",
        "browserPlugin": "Browser extension",
        "features": "Features",
        "free": "Free",
        "removeAccount": "Remove account",
        "removeAccountD": "Close account and remove all collections, bookmarks and data?",
        "areYouSure": "Are you sure?",
        "compareFreePro": "Compare the Free and PRO account",
        "shareLinkVia": "Share link via",
        "changeAvatarInfo": "You can change the avatar associated with your Email on Gravatar.com. (Gravatar is a service which links your email address and avatar to spare you from re-uploading your avatar on every website you visit)",
        "changeAvatar": "Change avatar",
        "browserExtensionD": "Access your collections with one click in any browser tab",
        "macApp": "Mac OS X App",
        "macAppD": "Organize content and read articles from your Mac",
        "macAppV": "Mac OS X (10.8.0 or newer)",
        "androidAppV": "Android phone or tablet (4.0 or newer)",
        "appleEditorsChoise": "Apple / Editors Choice",
        "operaEditorsChoise": "Recommended by Opera",
        "downloadTitle": "Keep your bookmarks handy",
        "sharedCollections": "Shared collections",
        "serverCollaboratorsIncorrectToken": "It is impossible to become a member of the collection. Invalid URL. Ask the author of the collection to invite you again.",
        "serverCollaboratorsAlready": "You are already a collection member!",
        "joinCollaboratorsSuccess": "Success! Now you are a collection member.",
        "memberD": "Now you can add and edit bookmarks, create nested collections and invite new members.",
        "viewerD": "You can only view bookmarks in this collection.",
        "savePage": "Save page to Raindrop.io",
        "saveToInbox": "Save to Inbox (Raindrop.io)",
        "saveImage": "Save image to Raindrop.io",
        "myBookmarks": "My bookmarks",
        "appName": "Raindrop.io - Smart Bookmarks",
        "appDesc": "A beautiful way to remember the most important things.",
        "firstRun": "To start using Raindrop.io you just need to refresh the page and click again.",
        "refreshPage": "Refresh the current page",
        "support": "Support",
        "afterUpdateTitle": "The extension has been updated",
        "afterUpdate": "We have several new features, improvements and bug fixes. Want to see what is new in this version?",
        "seeChangeLog": "Read more..."
    },
    "ru_RU": {
        "server": "Неизвестная ошибка. Попробуйте еще раз!",
        "serverundefined": "Неизвестная ошибка. Попробуйте еще раз!",
        "server0": "Укажите старый пароль!",
        "server1": "E-mail введен не верно!",
        "server2": "Укажите пожалуйста ваше имя",
        "server3": "Ваш старый пароль указан не верно!",
        "server4": "Пароль указан не верно!",
        "server5": "Данный e-mail уже используется!",
        "server6": "Название/заголовок не указано!",
        "server7": "Неправильный email или пароль!",
        "serverincorrect url": "Неверный URL",
        "collection": "Коллекция",
        "collectionNew": "Новая коллекция",
        "collectionDeleteConfirm": "Действительно удалить коллекцию?\nВсе закладки внутри коллекции будут также удалены!",
        "saveChanges": "Сохранить изменения",
        "saveError": "Произошла ошибка при сохранении!",
        "saveSuccess": "Сохранено !",
        "saved": "сохранена",
        "addSuccess": "Добавлено!",
        "moveSuccess": "Закладки успешно перемещены!",
        "removeSuccess": "Удалено!",
        "coverUpload": "Загрузка обложки",
        "fileUploadUnable": "Данный файл невозможно загрузить!",
        "fileUploadError": "Произошла ошибка при загрузке файла. Попробуйте другой файл!",
        "linkNotRecognized": "Ссылка не распознана",
        "permalink": "Ссылка на коллекцию:",
        "profile": "Профиль",
        "signIn": "Войти",
        "myCollections": "Мои коллекции",
        "save": "Сохранить",
        "remove": "Удалить",
        "elements": "закладки",
        "about": "О проекте",
        "blog": "Блог",
        "tools": "Инструменты",
        "signInSocial": "Войти с помощью",
        "signUpSocial": "Зарегистрироваться с помощью",
        "signUp": "Регистрация",
        "register": "Зарегистрироваться",
        "recoverPassword": "Восстановить пароль",
        "password": "Пароль",
        "edit": "Редактировать",
        "editMin": "Ред",
        "collectionEmpty": "Коллекция пуста",
        "fillItTwoWays": "Заполнить ее можно двумя способами",
        "recommend": "Рекомендуем",
        "installExtension": "Установить расширение",
        "extensionDescription": "Самый простой, удобный и супер быстрый\nспособ сохранить важное из интернета.",
        "enterLink": "Указать ссылку",
        "enterLinkDescription": "Укажите ссылку на любую\nстраницу, статью, фото или видео.",
        "backToCollection": "В коллекцию",
        "viewOn": "Смотреть на",
        "articled": "статью",
        "imaged": "фото",
        "videod": "контент",
        "linkd": "ссылку",
        "article": "Статья",
        "image": "Фото",
        "video": "Контент",
        "link": "Ссылка",
        "articles": "Статьи",
        "images": "Фото",
        "videos": "Контент",
        "links": "Ссылки",
        "articleSaved": "Статья сохранена",
        "imageSaved": "Фото сохранено",
        "videoSaved": "Контент сохранён",
        "linkSaved": "Ссылка сохранена",
        "articleRemoved": "Статья перенесена в корзину",
        "imageRemoved": "Фото перенесено в корзину",
        "videoRemoved": "Контент перенесен в корзину",
        "linkRemoved": "Ссылка перенесена в корзину",
        "articleRemovedPermament": "Статья удалена",
        "imageRemovedPermament": "Фото удалено",
        "videoRemovedPermament": "Контент удален",
        "linkRemovedPermament": "Ссылка удалена",
        "bookmarksRemoved": "Закладки перенесены в корзину",
        "bookmarksRemovedPermament": "Закладки удалены",
        "other": "другое",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "на",
        "basicData": "Основные данные",
        "yourName": "Ваше имя",
        "changePassword": "Сменить пароль",
        "newPassword": "Новый пароль",
        "currentPassword": "Текущий пароль",
        "findBookmarkLong": "Найти закладку...",
        "nothingFound": "Ничего не найдено",
        "add": "Добавить",
        "cancel": "Отмена",
        "covers": "Обложки",
        "upload": "Загрузить",
        "imagesOnly": "Картинка не более 5 мб.",
        "uploadProgress": "Идет загрузка...",
        "fontFamily": "Семейство шрифта",
        "fontSize": "Размер шрифта",
        "interfaceStyle": "Стиль интерфейса",
        "additional": "Дополнительно",
        "fixedWidth": "Фиксированная ширина",
        "logOut": "Сменить аккаунт",
        "titleAndDescription": "Заголовок и описание",
        "title": "Заголовок",
        "description": "Описание",
        "enterTitle": "Укажите заголовок",
        "enterDescription": "Укажите описание",
        "enable": "Вкл.",
        "type": "Тип",
        "publicCollection": "Публичная коллекция",
        "shareCollection": "Поделиться коллекцией",
        "sendEmail": "Отправить по почте",
        "copyLink": "Скопировать ссылку",
        "language": "Язык",
        "iHaveAccount": "У меня уже есть аккаунт",
        "createFirstCollection": "Создать первую коллекцию",
        "checkYourEmail": "Проверьте ваш почтовый ящик!",
        "und": "и",
        "from": "от",
        "passwordChangeSuccess": "Пароль успешно изменен!",
        "smartSearch": "Умный поиск",
        "subscribe": "Подписаться",
        "youSubscribed": "Вы подписаны!",
        "subscriptions": "Подписки",
        "subscriptionsCollection": "Подписки",
        "tags": "Теги",
        "addTag": "Добавить тег",
        "noDescription": "Нет описания",
        "basic": "Основное",
        "background": "Фон",
        "removeBackground": "Удалить фон",
        "or": "или",
        "noCollections": "Нет коллекций",
        "noSubscriptions": "Нет подписок",
        "welcome": "Начните коллекционировать с",
        "publicCollections": "Публичные коллекции",
        "collectionsCount": "коллекций",
        "noPublicCollections": "Нет публичных коллекций",
        "noPublicCollectionsD": "Пользователь еще не создал либо не имеет публичных коллекции.",
        "all": "Все",
        "mobileApp": "Мобильное приложение",
        "exportBookmarks": "Экспорт закладок",
        "cover": "Обложка",
        "saveToCollection": "Сохранить в коллекцию",
        "selectCollection": "Выберите коллекцию",
        "myAccount": "Мой аккаунт",
        "enterTitleAndCollection": "Укажите заголовок и коллекцию",
        "selectPreferedType": "Выберите подходящий тип страницы",
        "back": "Назад",
        "bySort": "Отсортировано",
        "byName": "по имени",
        "byDate": "По дате",
        "findOrCreateCollection": "Найти или создать коллекцию",
        "createCollection": "Создать коллекцию",
        "createCollectionFirst": "Создать первую коллекцию...",
        "createCollectionOrDrag": "Создайте или переместите коллекцию...",
        "createGroup": "Создать группу",
        "startToSave": "Пожалуйста, войдите, чтобы начать сохранять закладки",
        "checkAgain": "Проверить еще раз!",
        "clickToMakeScreenshot": "Нажмите, чтобы создать скриншот",
        "elements1": "закладка",
        "elements2": "закладки",
        "elements5": "закладок",
        "defaultCollection-0": "Поиск",
        "defaultCollection--1": "Входящие",
        "defaultCollection--99": "Корзина",
        "byTitle": "По алфавиту",
        "saveBookmark": "Сохранить страницу",
        "saveBookmarkInInbox": "Сохранить во входящие",
        "sites": "Сайты",
        "in": "в",
        "settings": "Настройки",
        "removeCollectionSuccess": "Коллекция удалена",
        "changeIcon": "Сменить иконку",
        "group": "Группа",
        "untitled": "Безымянная",
        "removeGroupError": "Нельзя удалить не пустую группу!",
        "select": "Выбрать",
        "create": "Создать",
        "privacy": "Настройки приватности",
        "private": "Приватная",
        "privateD": "Доступна только вам",
        "public": "Публичная",
        "publicD": "Могут видеть все",
        "moveDown": "Переместить вниз",
        "moveUp": "Переместить вверх",
        "moveSelectedBookmarks": "Переместить выбранные закладки",
        "selectAll": "Выбрать все",
        "supportOnlyUrls": "Поддерживаются URL только с http и https протоколом!",
        "unableToRecognizeSpecifiedLink": "Невозможно определить указанную страницу",
        "addTags": "Добавить теги",
        "noBookmarks": "Нет закладок",
        "noBookmarksD": "Переместите ссылку или картинку со страницы, либо нажмите 'Сохранить страницу'.",
        "alreadyInCollection": "Уже в коллекцию",
        "alreadyInCollectionD": "Нажмите, чтобы отредактировать описание, теги и обложку закладки",
        "alreadyInCollectionDD": "Изменить описание, теги и обложку",
        "inSocial": "Поделиться ссылкой через",
        "copyURL": "Скопировать ссылку",
        "read": "Читать",
        "smartBookmarks": "Ваши умные закладки",
        "signUpEmail": "Зарегистрироваться",
        "loginOrRegisterSocial": "Или через социальную сеть",
        "help": "Помощь",
        "name": "Имя",
        "haveIdeas": "Нашли баг или есть идея?",
        "followUsOn": "Следите за новостями и обновлениями в",
        "writeUs": "Пишите нам",
        "forDevelopers": "Разработчикам",
        "importBookmarks": "Импорт закладок",
        "howToUse": "Как пользоваться?",
        "extension": "Расширение",
        "animation": "Анимация интерфейса",
        "closeOnPageClick": "Закрывать по клику на страницу",
        "closeOnPageClickD": "Перетаскивание элементов со страницы будет не доступно",
        "helpContext": "Контекстное меню",
        "helpContextD": "Дополнительные функции доступны по нажатию правой клавиши мыши по закладкам и коллекциям",
        "helpHotKey": "Горячая клавиша",
        "helpHotKeyD": "Поменяйте в настройках расширений",
        "helpVisible": "Расширить видимую часть страницы",
        "helpVisibleD": "Подведите курсор к левому краю и нажмите на появившуюся панель",
        "helpBatch": "Множественный выбор",
        "helpBatchD": "Перемещайте или удаляйте множество закладок одновременно",
        "moreTips": "Еще советы",
        "view": "Вид",
        "openLinksInNewTab": "Открывать ссылки в новой вкладке",
        "allBookmarks": "Все закладки",
        "parent": "Родительская группа/коллекция",
        "footerProAd": "Переходите на PRO аккаунт",
        "footerProAdD": "и получите больше возможностей",
        "onlyInPro": "Только в PRO версии",
        "nestedCollections": "Вложенные коллекции",
        "dropboxBackup": "Копия в Dropbox",
        "goToPRO": "Перейти на PRO",
        "commonSettings": "Основные настройки",
        "already": "уже находится",
        "addBookmark": "Добавить закладку",
        "addBookmarkD": "Укажите URL на страницу, статью, фото или видео",
        "advice": "Совет",
        "addAdvice": "Другие способы добавить закладку",
        "browserExtension": "Расширение для браузера",
        "androidApp": "Android приложение",
        "androidAppD": "Сохраняйте важную для вас информацию из интернета и любимых приложений в один тап!",
        "importBookmarksD": "Перенесите закладки из Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious и других сервисов на Raindrop.io.",
        "showInDock": "Показывать в Dock",
        "showInTray": "Показывать в строке меню",
        "alwaysOnTop": "Всегда поверх всех окон",
        "blurHide": "Скрывать окно при потери фокуса",
        "desktopNeedRestart": "Перезапустите приложение, чтобы изменения вступили в силу",
        "refresh": "Обновить",
        "editProfile": "Редактировать профиль",
        "profilePage": "Моя страница",
        "upgradeAccount": "Улучшенный аккаунт",
        "screenshotError": "Невозможно сделать снимок сайта!",
        "lastWeek": "Прошлые 7 дней",
        "copyLinkToClipboard": "Скопировать адрес ссылки",
        "openInBrowser": "Открыть в браузере",
        "openInBrowserWithShift": "Чтобы открыть ссылку в браузере зажмите Ctrl или Shift",
        "selectAIconSet": "Выберите набор иконок",
        "sharing": "Совместный доступ",
        "members": "Участники",
        "enterEmails": "Укажите один или несколько email-ов через запятую...",
        "role_member": "Может редактировать",
        "role_members": "Могут редактировать",
        "role_viewer": "Только просматривать",
        "role_owner": "Владелец",
        "privateCollectionURL": "Нет публичного URL. Коллекция приватная.",
        "inviteMorePeople": "Пригласить больше людей",
        "sendInvites": "Отправить приглашения",
        "unshareCollection": "Убрать всех участников",
        "withAccessLevel": "Уровень доступа",
        "invitesSendTo": "Приглашения отправлены на",
        "unshareSuccess": "Все участники удалены",
        "accessViaLink": "Доступ по ссылке",
        "desktopIntegration": "Интеграция с приложением для Mac OS X",
        "error": "Произошла ошибка",
        "tryAgain": "Попробовать еще",
        "moveError": "Невозможно переместить!",
        "dev": "Разработчикам",
        "article1": "статья",
        "article2": "статьи",
        "article5": "статей",
        "image1": "фото",
        "image2": "фото",
        "image5": "фотографий",
        "video1": "контент",
        "video2": "контента",
        "video5": "контента",
        "link1": "ссылка",
        "link2": "ссылки",
        "link5": "ссылок",
        "createNewCollection": "Создать коллекцию",
        "toRefreshedRaindrop": "на Raindrop.io",
        "comfortableReading": "Комфортное чтение",
        "press": "СМИ",
        "subscriptionsD": "Создавайте и подписывайтесь на интересные публичные коллекции.",
        "smartSearchD": "По любым критериям, быстро и просто.",
        "tagsD": "Еще один способ организации вашей коллекции.",
        "comfortableReadingD": "Сконцентрируйтесь на чтение ваших любимых статей в удобном виде.",
        "dragNdropD": "Перемещайте ваши закладки между коллекциями.",
        "exportBookmarksD": "Чтобы иметь возможность перенести вашу коллекцию.",
        "followUs": "Следите за новостями в социальных сетях:",
        "enterSearchCriteria": "Введите через запятую критерии поиска",
        "enterSearchCriteriaD": "В любом порядке, мы сами определим, что вы имеете введу:",
        "explore": "Подборка",
        "exploreCollections": "Подборка интересных коллекций",
        "staffPicks": "Выбор редакции",
        "step": "Шаг",
        "uploadBookmarksFile": "Загрузите файл с закладками",
        "dropFilesHere": "Или перетащите файл сюда",
        "importInfo1": "HTML файл размером не более 3 мб.",
        "importInfo2": "Получить данный файл вы можете из вашего браузера или из сервиса которым вы в данный момент пользуетесь в разделе \"Экспортировать закладки\"/\"Export bookmarks\".",
        "importInfo3": "Поддерживается Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool или файл формата экспорта закладок Netscape.",
        "loading": "Идет загрузка",
        "noBookmarksToImport": "Нет закладок для импортирования!",
        "foldersWithBookmarks": "Папки для импортирования",
        "removeIt": "Убрать",
        "startImport": "Начать импортирование",
        "selectOtherFile": "Выбрать другой файл?",
        "importing": "Идет импортирование",
        "of": "из",
        "bookmarks": "закладок",
        "importingInfo1": "Подождите это может занять некоторое время, так как каждая из закладок будет разпознана и сохранена вместе с связанным с ней контентом.",
        "importingInfo2": "Не закрывайте данную вкладку, иначе импортирование будет остановлено!",
        "importEnd": "Импорт завершен!",
        "importSuccess": "Успешно импортировано",
        "importSuccessInfo": "Рекомендуем настроить внешний вид и иконки ваших коллекций, а также сделать публичными и рассказать о них в социальных сетях или передать ссылку друзьям.",
        "importingProcess": "Импорт закладок может занять определенное время, в зависимости от их количества! Пожалуйста наберитесь терпения, как только они будут обработаны мы оповестим вас на указанный E-mail!",
        "importingAlready": "К сожалению закладки загруженные ранее еще не обработаны! Подождите пожалуйста, мы обязательно оповестим вас по указанному E-mail.",
        "specifyYourEmail": "Пожалуйста укажите E-mail в вашем профиле!",
        "staffPicksD": "Интересные коллекции с красивым дизайном",
        "templates": "Шаблоны",
        "collectionEdit": "Редактирование коллекции",
        "raindropEdit": "Редактирование закладки",
        "icon": "Иконка",
        "selectOtherIcon": "Выбрать другую иконку...",
        "optional": "Не обязательно",
        "permamentLink": "Постоянная ссылка",
        "backgroundUploadD": "Вы можете загрузить тематический фон и придать стиль коллекции. Он будет отображаться",
        "onYourCollectionPage": "на странице вашей коллекции",
        "removeCollectionForever": "Удалить коллекцию навсегда",
        "theseAreTheBest": "Это лучшее...",
        "findCollection": "Найти коллекцию...",
        "findSubscription": "Найти подписку...",
        "more": "Еще",
        "less": "Меньше",
        "byPopularity": "By популярности",
        "collectionsSorting": "Сортировка коллекции",
        "sortBy": "Cортировать по",
        "custom": "Пользовательская",
        "byBookmarksCount": "По количеству закладок",
        "fastFilter": "Найти в открытых...",
        "fastView": "Быстрый просмотр закладок",
        "publicPage": "Ваша публичная страница",
        "welcomeSlide1D": "Сохраняйте важные ссылки, статьи, фото, видео, презентации",
        "welcomeSlide1DD": "и организовывайте их в тематические коллекции.",
        "welcomeSlide1DDD": "Ваши закладки будут доступны с компьютера и смартфона.",
        "welcomeSlide2": "Установите наше расширение",
        "welcomeSlide2D": "Самый простой, удобный и супер быстрый способ",
        "welcomeSlide2DD": "сохранить важное из интернета.",
        "next": "Далее",
        "startCollecting": "Начать коллекционировать!",
        "extensionFor": "Расширение для",
        "welcomeMobileSlide2": "Всегда с собой",
        "sourceCode": "Исходный код",
        "sourceCodeD": "Исходный код всех расширений для браузера находится в нашем",
        "sourceCodeDD": "репозитории на Github.",
        "apiD": "Документация по API находится в разработке.",
        "importFrom": "Импортировать из",
        "openCollection": "Открыть коллекцию",
        "articlesProccessing": "Полный текст статей будет загружен позже.",
        "favoriteSites": "Любимые сайты",
        "showAll": "Показать все",
        "showAllBookmarks": "Показать все закладки",
        "youHave": "У вас есть",
        "fillCollectionInput": "Вы не указали коллекцию!",
        "browserBookmarklet": "Букмарклет",
        "browserBookmarkletD": "Нет вашего браузера? Попробуйте букмарклет.",
        "browserBookmarkletDD": "Переместите эту ссылку на панель закладок",
        "browserBookmarkletDDD": "Сохранить в коллекцию",
        "hi": "Привет",
        "noTags": "Нет тегов",
        "interest_video": "Видео",
        "interest_hobbies": "Хобби",
        "interest_design": "Дизайн",
        "interest_design_inspiration": "Вдохновение",
        "interest_food_drink": "Еда",
        "interest_animals": "Животные",
        "interest_health_fitness": "Здоровье и фитнес",
        "interest_illustrations": "Иллюстрации и плакаты",
        "interest_developers": "Разработчикам",
        "interest_art": "Искусство",
        "interest_history": "История",
        "interest_pictures": "Картинки",
        "interest_film_music_books": "Кино, музыка, книги",
        "interest_cars_motorcycles": "Машины и мотоциклы",
        "interest_fashion": "Мода и красота",
        "interest_science": "Наука",
        "interest_news": "Новости",
        "interest_education": "Обучение",
        "interest_psychology": "Психология",
        "interest_travel": "Путешествия",
        "interest_nature": "Природа",
        "interest_work": "Работа",
        "interest_sites": "Сайты",
        "interest_diy": "Сделай сам",
        "interest_sport": "Спорт",
        "interest_technology": "Технологии",
        "interest_products": "Товары",
        "interest_sweet_home": "Уютный дом",
        "interest_photography": "Фотография",
        "interest_humor": "Юмор",
        "interest_erotic": "Эротика",
        "interest_other": "Другое",
        "interest_food_drink_recipes": "Рецепты",
        "interest_film_music_books_films": "Фильмы",
        "interest_film_music_books_music": "Музыка",
        "interest_film_music_books_books": "Книги",
        "interest_psychology_relations": "Отношения",
        "interest_psychology_self_development": "Саморазвитие",
        "interest_technology_gadgets": "Гаджеты",
        "interest_technology_games": "Игры",
        "interest_technology_geeks": "Гики",
        "interest_technology_applications": "Приложения",
        "interest_developers_web": "Веб разработка",
        "interest_developers_mobile": "Мобильная разработка",
        "to": "в",
        "inCollection": "в коллекции",
        "dragCollections": "Меняйте порядок коллекций простым перетаскиванием.",
        "feedAllCollections": "RSS разбитый по коллекциям",
        "orAlternativeFeed": "Все закладки",
        "feedWarning": "Внимание! Не передавайте уникальный URL ваших RSS подписок третьим лицам, так как они смогут просмотреть ваши закладки!",
        "publicRSSfeed": "Публичный RSS канал",
        "showPrivateRSSfeed": "Показать приватный RSS канал",
        "privateRSSfeed": "Приватный RSS канал",
        "mailNotifications": "E-mail оповещения",
        "disableWeeklyDigest": "Отключить персональную рассылку ваших закладок",
        "trashEmpty": "Корзина пуста",
        "forOtherBrowsers": "Для других браузеров",
        "saveLink": "Сохранить страницу",
        "instruction": "Инструкция",
        "install": "Установить",
        "importDescription": "Перенесите закладки из Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious и других сервисов на Raindrop.io.",
        "createSubFolder": "Создать вложенную коллекция",
        "pro_nesting": "Вложенные коллекции",
        "pro_nestingD": "Бесконечные возможности для организации ваших закладок.",
        "pro_dropbox": "Копия в Dropbox",
        "pro_dropboxD": "Резервная копия закладок в вашем Dropbox.",
        "pro_support": "Приоритетная поддержка",
        "pro_supportD": "Мы поможем решить любую проблему в кратчайшие сроки.",
        "pro_nextFeatures": "Голосуй за новые функции",
        "pro_nextFeaturesD": "Пользователи PRO аккаунтов сами решают какие функции будут реализованы первыми!",
        "month": "месяц",
        "year": "год",
        "oneMonth": "Один месяц",
        "threeMonth": "3 месяца",
        "yearDiscount": "скидка, всего $19 в год!",
        "upgradeToPro": "Перейти на Pro",
        "renewPro": "Продлить подписку",
        "renewPromonth": "Продлить подписку еще на месяц",
        "renewProyear": "Продлить подписку еще на год",
        "proTitle": "Пользуйтесь Raindrop.io бесплатно",
        "proTitleD": "или перейдите на",
        "proTitleDD": "Pro аккаунт.",
        "pro_noAds": "Никакой рекламы",
        "pro_noAdsD": "",
        "pro_speed_dial": "Новая вкладка",
        "pro_apple": "Клиент для iPhone/iPad",
        "pro_desktop": "Desktop приложение (с синхронизацией)",
        "pro_smart_collections": "Умные коллекции (атодобавление по критериям)",
        "yesIwant": "Да хочу!",
        "votes": "голос",
        "votes1": "голос",
        "votes2": "голоса",
        "votes5": "голосов",
        "whatAddNext": "Что бы вы хотели добавить?",
        "newString": "Новая",
        "newBookmark": "Новая закладка",
        "thankYou": "Спасибо!",
        "nowYouHave": "Теперь у вас",
        "account": "аккаунт",
        "goHome": "Вернуться на главную",
        "until": "до",
        "goToPayment": "Перейти к оплате",
        "subscriptionPeriod": "Срок",
        "paymentMethod": "Способ оплаты",
        "pricing": "Цены",
        "visualBookmarks": "Визуальные закладки",
        "readItLater": "Отложенное чтение статей",
        "pro_notes": "Заметки",
        "sslConnection": "Защищённое SSL-соединение",
        "browserPlugin": "Плагин для браузера",
        "features": "Возможности",
        "free": "Бесплатно",
        "removeAccount": "Удалить аккаунт",
        "removeAccountD": "Закрыть аккаунт и удалить все коллекции, закладки и сведения, которые с ними связаны?",
        "areYouSure": "Вы уверены?",
        "compareFreePro": "Сравнить бесплатный и PRO аккаунт",
        "shareLinkVia": "Поделиться ссылкой через",
        "changeAvatarInfo": "Вы можете сменить аватар привязанный к вашему Email на сайте Gravatar.com. (Граватар — это картинка, которая следует за вами от сайта к сайту, появляясь при отправке комментария или записи в блог)",
        "changeAvatar": "Сменить аватар",
        "browserExtensionD": "Доступ к коллекциям в один клик с любой вкладки браузера",
        "macApp": "Приложение для Mac OS X",
        "macAppD": "Организовывайте материалы и читайте статьи на вашем Mac",
        "macAppV": "Mac OS X (выше 10.8.0)",
        "androidAppV": "Android смартфон или планшет (выше 4.0)",
        "appleEditorsChoise": "Выбор редакции Apple",
        "operaEditorsChoise": "Рекомендует Opera",
        "downloadTitle": "Ваши закладки всегда под рукой",
        "sharedCollections": "Общие коллекции",
        "serverCollaboratorsIncorrectToken": "Невозможно стать участником коллекции. Некорректный URL. Попросите автора коллекции пригласить вас еще раз.",
        "serverCollaboratorsAlready": "Вы уже являетесь участником коллекции!",
        "joinCollaboratorsSuccess": "Поздравляем! Теперь вы стали участником коллекции.",
        "memberD": "Вы можете добавлять и редактировать закладки, создавать вложенные коллекции и приглашать новых участников.",
        "viewerD": "Вы можете только просматривать закладки в этой коллекции.",
        "savePage": "Сохранить страницу в коллекцию",
        "saveToInbox": "Быстро сохранить во входящие (Raindrop.io)",
        "saveImage": "Сохранить изображение в коллекцию",
        "myBookmarks": "Мои закладки",
        "appName": "Raindrop.io - Умные закладки",
        "appDesc": "Красивый способ запомнить самое важное.",
        "firstRun": "Для начала использования Raindrop.io вам необходимо просто обновить текущую страницу и кликнуть еще раз.",
        "refreshPage": "Обновить текущую страницу",
        "support": "Поддержка",
        "afterUpdateTitle": "Расширение обновилось",
        "afterUpdate": "Мы подготовили несколько новых функций, улучшений и исправлений. Хотите посмотреть, что нового появилось в этой версии?",
        "seeChangeLog": "Посмотреть список изменений..."
    },
    "es_ES": {
        "server": "Error desconocido. ¡Vuelve a intentarlo!",
        "serverundefined": "Error desconocido. ¡Vuelve a intentarlo!",
        "server0": "Ingrese su contraseña anterior!",
        "server1": "Correo electrónico inválido!",
        "server2": "Ingrese su nombre!",
        "server3": "Contraseña anterior inválida!",
        "server4": "Contraseña inválida!",
        "server5": "Este correo electronico ya está registrado!",
        "server6": "Ingrese el título!",
        "server7": "Combinación de correo electrónico y/o contraseña incorrecta!",
        "serverincorrect url": "URL incorrecta",
        "collection": "Colección",
        "collectionNew": "Nueva colección",
        "collectionDeleteConfirm": "¿Está seguro que desea eliminar esta colección? También se eliminarán todos los marcadores dentro de la colección!",
        "saveChanges": "Guardar cambios",
        "saveError": "Error al guardar!",
        "saveSuccess": "Guardado correctamente!",
        "saved": "Guardado",
        "addSuccess": "Agregado exitosamente!",
        "moveSuccess": "Marcadores se han movido con éxito!",
        "removeSuccess": "Quitado con éxito!",
        "coverUpload": "Portada cargada",
        "fileUploadUnable": "No se puede cargar este archivo!",
        "fileUploadError": "Error al cargar archivo. Pruebe otro archivo!",
        "linkNotRecognized": "Enlace no reconocido",
        "permalink": "Permalink:",
        "profile": "Perfil",
        "signIn": "Inicia sesión",
        "myCollections": "Mis colecciones",
        "save": "Guardar",
        "remove": "Quitar",
        "elements": "Marcador",
        "about": "Quienes somos",
        "blog": "Blog",
        "tools": "Herramientas",
        "signInSocial": "Inicie sesión con",
        "signUpSocial": "Regístrate con",
        "signUp": "Registrarse",
        "register": "Únete",
        "recoverPassword": "Restablecer contraseña",
        "password": "Contraseña",
        "edit": "Editar",
        "editMin": "Editar",
        "collectionEmpty": "Colección vacía",
        "fillItTwoWays": "Dos formas de completar la colección",
        "recommend": "Recomendar",
        "installExtension": "Instalar extensión",
        "extensionDescription": "La forma más simple, fácil y super rápída de mantener lo importante de la web.",
        "enterLink": "Ingrese enlace",
        "enterLinkDescription": "Introduzca un enlace a cualquier página web, artículo, foto o video. Cualquier cosa que quieras.",
        "backToCollection": "Volver a colección",
        "viewOn": "Ver en",
        "articled": "artículo",
        "imaged": "Foto",
        "videod": "contenido",
        "linkd": "enlace",
        "article": "Artículo",
        "image": "Foto",
        "video": "Contenido",
        "link": "Enlace",
        "articles": "Artículos",
        "images": "Fotos",
        "videos": "Contenido",
        "links": "Enlaces",
        "articleSaved": "Artículo guardado",
        "imageSaved": "Foto guardada",
        "videoSaved": "Contenido guardado",
        "linkSaved": "Enlace guardado",
        "articleRemoved": "Artículo movido a la papelera",
        "imageRemoved": "Foto movida a la papelera",
        "videoRemoved": "Contenido movido a la papelera",
        "linkRemoved": "Enlace movido a la papelera",
        "articleRemovedPermament": "Artículo eliminado",
        "imageRemovedPermament": "Foto eliminada",
        "videoRemovedPermament": "Contenido eliminado",
        "linkRemovedPermament": "Enlace eliminado",
        "bookmarksRemoved": "Marcadores movidos a la papelera",
        "bookmarksRemovedPermament": "Marcadores eliminados",
        "other": "otros",
        "vkontakte": "ВКОНТАКТЕ",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "en",
        "basicData": "Configuración de la cuenta",
        "yourName": "Tu nombre",
        "changePassword": "Cambiar contraseña",
        "newPassword": "Nueva contraseña",
        "currentPassword": "Contraseña actual",
        "findBookmarkLong": "Encontrar el marcador...",
        "nothingFound": "Nada encontrado",
        "add": "Añadir",
        "cancel": "Cancelar",
        "covers": "Portadas",
        "upload": "Subir",
        "imagesOnly": "Sólo imágenes.   Tamaño máximo: 5mb.",
        "uploadProgress": "Cargando...",
        "fontFamily": "Familia de fuentes",
        "fontSize": "Tamaño de la fuente",
        "interfaceStyle": "Estilo de interfaz",
        "additional": "Adicional",
        "fixedWidth": "Ancho fijo",
        "logOut": "Salir",
        "titleAndDescription": "Título & Descripción",
        "title": "Título",
        "description": "Descripción",
        "enterTitle": "Ingrese el título",
        "enterDescription": "Ingrese Descripción",
        "enable": "Habilitado",
        "type": "Tipo",
        "publicCollection": "Colección pública",
        "shareCollection": "Compartir colección",
        "sendEmail": "Enviar correo electrónico",
        "copyLink": "Copiar un enlace",
        "language": "Idioma",
        "iHaveAccount": "Ya tengo cuenta",
        "createFirstCollection": "Crear la primera colección",
        "checkYourEmail": "Revise su bandeja de entrada!",
        "und": "&",
        "from": "De",
        "passwordChangeSuccess": "Contraseña cambiada correctamente!",
        "smartSearch": "Búsqueda inteligente",
        "subscribe": "Seguir",
        "youSubscribed": "Siguiendo",
        "subscriptions": "Siguiendo",
        "subscriptionsCollection": "Seguir colecciones",
        "tags": "Etiquetas",
        "addTag": "Añadir una etiqueta",
        "noDescription": "No hay Descripción",
        "basic": "Básico",
        "background": "Fondo",
        "removeBackground": "Eliminar fondo",
        "or": "o",
        "noCollections": "No hay colecciones",
        "noSubscriptions": "No hay suscripciones",
        "welcome": "Empezar a recolectar con",
        "publicCollections": "Colecciones públicas",
        "collectionsCount": "colecciones",
        "noPublicCollections": "No hay colecciones públicas",
        "noPublicCollectionsD": "Este usuario no ha creado o no tiene ninguna colección pública.",
        "all": "Todo",
        "mobileApp": "Aplicación móvil",
        "exportBookmarks": "Exportar marcadores",
        "cover": "Portada",
        "saveToCollection": "Salvar a colección",
        "selectCollection": "Seleccione Colección",
        "myAccount": "Mi cuenta",
        "enterTitleAndCollection": "Introduzca el título y colección",
        "selectPreferedType": "Seleccione el tipo preferido",
        "back": "Atrás",
        "bySort": "Catalogado",
        "byName": "por nombre",
        "byDate": "Por fecha",
        "findOrCreateCollection": "Encontrar o crear nueva colección",
        "createCollection": "Nueva colección",
        "createCollectionFirst": "Crear la primera colección...",
        "createCollectionOrDrag": "Crear o arrastrar colección aqui...",
        "createGroup": "Crear grupo",
        "startToSave": "Inicia sesión para empezar!",
        "checkAgain": "Revisa otra vez!",
        "clickToMakeScreenshot": "Haga clic para hacer la captura de pantalla",
        "elements1": "Marcador",
        "elements2": "marcadores",
        "elements5": "marcadores",
        "defaultCollection-0": "Búsqueda",
        "defaultCollection--1": "Bandeja de entrada",
        "defaultCollection--99": "Papelera",
        "byTitle": "Por orden alfabético",
        "saveBookmark": "Guardar aquí",
        "saveBookmarkInInbox": "Guardar en la bandeja de entrada",
        "sites": "Sitios",
        "in": "en",
        "settings": "Configuración",
        "removeCollectionSuccess": "Colección eliminada",
        "changeIcon": "Cambiar icono",
        "group": "Grupo",
        "untitled": "Sin título",
        "removeGroupError": "No puedes eliminar un grupo no vacío!",
        "select": "Seleccione",
        "create": "Crear",
        "privacy": "Privacidad",
        "private": "Privado",
        "privateD": "Sólo puede ver",
        "public": "Público",
        "publicD": "Cualquiera puede ver",
        "moveDown": "Mover hacia abajo",
        "moveUp": "Mueva hacia arriba",
        "moveSelectedBookmarks": "Mover marcadores seleccionados",
        "selectAll": "Seleccionar todo",
        "supportOnlyUrls": "Puede guardar enlaces sólo con protocolo http y https.",
        "unableToRecognizeSpecifiedLink": "No se puede reconocer el enlace especificado!",
        "addTags": "Agregar etiquetas",
        "noBookmarks": "No hay marcadores",
        "noBookmarksD": "Arrastre y suelte enlace o imagen de la página. O haga clic en 'Guardar página'.",
        "alreadyInCollection": "Ya en la colección",
        "alreadyInCollectionD": "Haga clic para editar descripción, etiquetas y la portada del marcador",
        "alreadyInCollectionDD": "Editar descripción, etiquetas y cubierta",
        "inSocial": "Compartir enlace vía",
        "copyURL": "Copiar la URL",
        "read": "Leer",
        "smartBookmarks": "Marcadores inteligentes",
        "signUpEmail": "Registro mediante correo electrónico",
        "loginOrRegisterSocial": "Inicie sesión o regístrese utilizando redes sociales",
        "help": "Ayuda",
        "name": "Nombre",
        "haveIdeas": "¿Fallo o tienes una idea?",
        "followUsOn": "Síguenos para noticias y actualizaciones:",
        "writeUs": "Contacte con nosotros",
        "forDevelopers": "Para desarrolladores",
        "importBookmarks": "Importar marcadores",
        "howToUse": "¿Cómo usar?",
        "extension": "Extensión",
        "animation": "Animación de la interfaz de usuario",
        "closeOnPageClick": "Haga clic en cerrar página",
        "closeOnPageClickD": "Arrastre y suelte no estará disponible",
        "helpContext": "Menú contextual",
        "helpContextD": "Clic derecho de ratón en favoritos o colecciones para más acciones",
        "helpHotKey": "Teclas de acceso rápido",
        "helpHotKeyD": "Usted puede cambiar la clave en la página de extensiones",
        "helpVisible": "Ampliar la parte visible de la página",
        "helpVisibleD": "Mueva el cursor a la izquierda y haga clic en el panel aparece",
        "helpBatch": "Selección Múltiple",
        "helpBatchD": "Seleccione marcadores para acciones por lotes",
        "moreTips": "Ver más consejos",
        "view": "Vista",
        "openLinksInNewTab": "Abrir vínculos en una nueva pestaña",
        "allBookmarks": "Todos los marcadores",
        "parent": "Principal grupo/coleccíon",
        "footerProAd": "Actualizar a PRO",
        "footerProAdD": "para características adicionales",
        "onlyInPro": "Solamente en cuenta PRO",
        "nestedCollections": "Colecciones anidadas",
        "dropboxBackup": "Copia de seguridad de Dropbox",
        "goToPRO": "Actualizar a PRO",
        "commonSettings": "Configuración básica",
        "already": "Listo",
        "addBookmark": "Agregar un marcador",
        "addBookmarkD": "Pegar el enlace a cualquier página web, artículo, foto o video",
        "advice": "Asesoramiento",
        "addAdvice": "Otras maneras de añadir marcador",
        "browserExtension": "Extensión de navegador",
        "androidApp": "App para Android",
        "androidAppD": "Guardar importantes contenidos de la web & aplicaciones favoritas!",
        "importBookmarksD": "Transferencia de marcadores de Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, legibilidad, Kippt, Delicious u otros servicios a Raindrop.io.",
        "showInDock": "Mostrar en el dock",
        "showInTray": "Muestran en la barra de menús",
        "alwaysOnTop": "Ventana siempre al frente",
        "blurHide": "Ocultar ventana en inactividad",
        "desktopNeedRestart": "Reiniciar para aplicar la configuración de la aplicación",
        "refresh": "Actualizar",
        "editProfile": "Editar perfil",
        "profilePage": "Mi página de colecciones",
        "upgradeAccount": "Cuenta PRO",
        "screenshotError": "Página Web no puede ser capturada!",
        "lastWeek": "Los últimos 7 días",
        "copyLinkToClipboard": "Copiar el enlace al portapapeles",
        "openInBrowser": "Abrir en navegador",
        "openInBrowserWithShift": "Para abrir el enlace en el navegador, sostenga las teclas Ctrl o Mayús",
        "selectAIconSet": "Seleccione un conjunto de iconos",
        "sharing": "Compartir",
        "members": "Miembros",
        "enterEmails": "Introduzca el correo electrónico o emails separados por comas...",
        "role_member": "Puede editar",
        "role_members": "Puede editar",
        "role_viewer": "Puede ver",
        "role_owner": "Propietario",
        "privateCollectionURL": "No hay URL pública. La colección es privada",
        "inviteMorePeople": "Invitar a más gente",
        "sendInvites": "Enviar invitaciones",
        "unshareCollection": "No compartir colección",
        "withAccessLevel": "Con nivel de acceso",
        "invitesSendTo": "Invita a enviar a",
        "unshareSuccess": "Colección no compartida",
        "accessViaLink": "Acceso a través de enlace",
        "desktopIntegration": "Integración con Mac OS X app",
        "error": "Error",
        "tryAgain": "Vuelve a intentarlo",
        "moveError": "No se ha podido mover!",
        "dev": "Desarrolladores",
        "article1": "artículo",
        "article2": "artículos",
        "article5": "artículos",
        "image1": "Foto",
        "image2": "fotos",
        "image5": "fotos",
        "video1": "contenido",
        "video2": "contenido",
        "video5": "contenido",
        "link1": "enlace",
        "link2": "enlaces",
        "link5": "enlaces",
        "createNewCollection": "Crear colección",
        "toRefreshedRaindrop": "a Raindrop.io",
        "comfortableReading": "Lectura cómoda",
        "press": "Prensa",
        "subscriptionsD": "Crear y seguir interesantes colecciones públicas.",
        "smartSearchD": "Por cualquier criterio, rápida y fácilmente.",
        "tagsD": "Otra forma de organizar tu colección.",
        "comfortableReadingD": "Concéntrate en tus artículos favoritos de lectura de una manera conveniente.",
        "dragNdropD": "Arrastre y suelte sus marcadores entre colecciones.",
        "exportBookmarksD": "Para ser capaz de transferir tu colección.",
        "followUs": "Síganos",
        "enterSearchCriteria": "Introducir criterios de búsqueda separados por comas",
        "enterSearchCriteriaD": "En cualquier orden, nosotros mismos determinamos qué entrará:",
        "explore": "Explorar",
        "exploreCollections": "Explorar las colecciones",
        "staffPicks": "Elección del editor",
        "step": "Paso",
        "uploadBookmarksFile": "Cargar archivo de marcadores",
        "dropFilesHere": "O soltar archivo aquí",
        "importInfo1": "Archivo HTML, máximo 3 mb de tamaño.",
        "importInfo2": "Toma este archivo,  puedes desde tu navegador o servicio en la sección \"Exportar favoritos\".",
        "importInfo3": "Admite formato de archivo de marcadores de Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool o Netscape.",
        "loading": "Cargando",
        "noBookmarksToImport": "No hay marcadores!",
        "foldersWithBookmarks": "Carpetas",
        "removeIt": "Quitar",
        "startImport": "Iniciar importación",
        "selectOtherFile": "¿Seleccionar otro archivo?",
        "importing": "Importación",
        "of": "de",
        "bookmarks": "marcadores",
        "importingInfo1": "La espera puede tomar algún tiempo, porque cada marcador será reconocido.",
        "importingInfo2": "No cierre esta pestaña!",
        "importEnd": "Importación completada!",
        "importSuccess": "Importado con éxito",
        "importSuccessInfo": "Recomendamos personalizar la apariencia y los iconos de sus colecciones y también para hacerlas públicas y compartirlas en las redes sociales o enviar enlace a tus amigos.",
        "importingProcess": "Importar marcadores pueden tardar algún tiempo, dependiendo de su cuenta. Por favor sea paciente en cuanto son procesados, se le notificará en el correo electrónico especificado!",
        "importingAlready": "Desafortunadamente no hemos terminado de procesar sus marcadores subidos con anterioridad. Por favor espere más, nosotros le notificaremos al correo electrónico especificado.",
        "specifyYourEmail": "Por favor especifique el correo electrónico en tu perfil!",
        "staffPicksD": "Interesante colección con hermoso diseño",
        "templates": "Plantillas",
        "collectionEdit": "Editar colección",
        "raindropEdit": "Editar marcadores",
        "icon": "Icono",
        "selectOtherIcon": "Cambiar icono...",
        "optional": "Opcional",
        "permamentLink": "Enlace permanente",
        "backgroundUploadD": "Puedes subir un fondo temático para estilizar tu colección. Aparecerá",
        "onYourCollectionPage": "en la página de colección",
        "removeCollectionForever": "Eliminar colección",
        "theseAreTheBest": "Estas son las mejores...",
        "findCollection": "Encontrar la colección...",
        "findSubscription": "Encontrar suscripción...",
        "more": "Más",
        "less": "Menos",
        "byPopularity": "Por Popularidad",
        "collectionsSorting": "Catálogo de colecciones",
        "sortBy": "Ordenar por",
        "custom": "Personalizar",
        "byBookmarksCount": "Por cuenta de marcadores",
        "fastFilter": "Filtración rápida...",
        "fastView": "Marcadores de vista rápida",
        "publicPage": "Su página pública",
        "welcomeSlide1D": "Guardar enlaces importantes, artículos, fotos, videos, presentaciones",
        "welcomeSlide1DD": "y organizarlas en colecciones temáticas.",
        "welcomeSlide1DDD": "Los favoritos están disponibles desde su PC y smartphone.",
        "welcomeSlide2": "Instalar la extensión",
        "welcomeSlide2D": "Manera más sencilla, rápida y sencilla",
        "welcomeSlide2DD": "para guardar cosas importantes de la Web.",
        "next": "Siguiente",
        "startCollecting": "Finalizado!",
        "extensionFor": "Extensión para",
        "welcomeMobileSlide2": "Siempre contigo",
        "sourceCode": "Código fuente",
        "sourceCodeD": "Código fuente de las extensiones de nuestro navegador en",
        "sourceCodeDD": "Repositorio de github.",
        "apiD": "Pronto.",
        "importFrom": "Importar desde",
        "openCollection": "Colección Open",
        "articlesProccessing": "Texto completo de los artículos se subirán más tarde.",
        "favoriteSites": "Sitios favoritos",
        "showAll": "Mostrar todo",
        "showAllBookmarks": "Mostrar todos los marcadores",
        "youHave": "Tienes",
        "fillCollectionInput": "Por favor, selecciona tu colección.",
        "browserBookmarklet": "Navegador Bookmarklet",
        "browserBookmarkletD": "Ninguno de su navegador. Prueba el navegador bookmarklet.",
        "browserBookmarkletDD": "Arrastra este enlace a tu barra de favoritos",
        "browserBookmarkletDDD": "Guardar a colección",
        "hi": "Hola",
        "noTags": "No hay etiquetas",
        "interest_video": "Video",
        "interest_hobbies": "Pasatiempos",
        "interest_design": "Diseño",
        "interest_design_inspiration": "Inspiración",
        "interest_food_drink": "Comidas & bebidas",
        "interest_animals": "Animales",
        "interest_health_fitness": "Salud & fitness",
        "interest_illustrations": "Ilustraciones",
        "interest_developers": "Para desarrolladores",
        "interest_art": "Arte",
        "interest_history": "Historia",
        "interest_pictures": "Fotos",
        "interest_film_music_books": "Películas, música & libros",
        "interest_cars_motorcycles": "Coches & motos",
        "interest_fashion": "Moda",
        "interest_science": "Ciencia",
        "interest_news": "Noticias",
        "interest_education": "Educación",
        "interest_psychology": "Psicología",
        "interest_travel": "Viajes",
        "interest_nature": "Naturaleza",
        "interest_work": "Trabajo",
        "interest_sites": "Sitios",
        "interest_diy": "Hágalo usted mismo",
        "interest_sport": "Deporte",
        "interest_technology": "Tecnología",
        "interest_products": "Productos",
        "interest_sweet_home": "Dulce hogar",
        "interest_photography": "Fotografía",
        "interest_humor": "Humor",
        "interest_erotic": "Erótico",
        "interest_other": "Otros",
        "interest_food_drink_recipes": "Recetas",
        "interest_film_music_books_films": "Películas",
        "interest_film_music_books_music": "Música",
        "interest_film_music_books_books": "Libros",
        "interest_psychology_relations": "Relaciones",
        "interest_psychology_self_development": "Autoayuda",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Juegos",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Aplicaciones",
        "interest_developers_web": "Desarrollo Web",
        "interest_developers_mobile": "Desarrollo móvil",
        "to": "Para",
        "inCollection": "Dentro de la colección",
        "dragCollections": "Arrastra y suelta para cambiar el orden de las colecciones.",
        "feedAllCollections": "Todas las colecciones RSS feed",
        "orAlternativeFeed": "Todos los marcadores",
        "feedWarning": "¡ ADVERTENCIA! No compartas una única URL de tus suscripciones RSS a otra persona, así les habilitarás para ver tus marcadores!",
        "publicRSSfeed": "Pública RSS feed",
        "showPrivateRSSfeed": "Muestra los RSS feed privados",
        "privateRSSfeed": "RSS feed privado",
        "mailNotifications": "Notificaciones por correo electrónico",
        "disableWeeklyDigest": "Desactivar la recopilación semanal de sus marcadores",
        "trashEmpty": "Papelera vacía",
        "forOtherBrowsers": "Para otros navegadores",
        "saveLink": "Guarde la página",
        "instruction": "Instrucciones",
        "install": "Instalar",
        "importDescription": "Transferencia de marcadores de Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, legibilidad, Kippt, Delicious u otros servicios a Raindrop.io.",
        "createSubFolder": "Crear colección anidado",
        "pro_nesting": "Colecciones anidadas",
        "pro_nestingD": "Crear cualquier número de colecciones anidadas.",
        "pro_dropbox": "Copia de seguridad de Dropbox",
        "pro_dropboxD": "Copia de seguridad de los marcadores y el contenido en su cuenta de Dropbox.",
        "pro_support": "Soporte prioritario",
        "pro_supportD": "Por correo electrónico o skype.",
        "pro_nextFeatures": "Votación para las siguientes características",
        "pro_nextFeaturesD": "Apoyar el desarrollo de características próximas!",
        "month": "mes",
        "year": "año",
        "oneMonth": "Un mes",
        "threeMonth": "3 meses",
        "yearDiscount": "Sólo $19 al año!",
        "upgradeToPro": "Actualizar a Pro",
        "renewPro": "Renovar suscripción PRO",
        "renewPromonth": "Renovar suscripción PRO por un mes",
        "renewProyear": "Renovar suscripción PRO por un año",
        "proTitle": "Utilice Raindrop.io gratis",
        "proTitleD": "o actualiza para",
        "proTitleDD": "características adicionales.",
        "pro_noAds": "Sin publicidad",
        "pro_noAdsD": "",
        "pro_speed_dial": "Página nueva pestaña",
        "pro_apple": "app para iPhone/iPad",
        "pro_desktop": "Aplicación de escritorio (con sincronización)",
        "pro_smart_collections": "Colecciones inteligentes (auto guardar)",
        "yesIwant": "Sí, quiero!",
        "votes": "vote",
        "votes1": "vote",
        "votes2": "votos",
        "votes5": "votos",
        "whatAddNext": "¿Qué deberíamos añadir a continuación?",
        "newString": "Nuevo",
        "newBookmark": "Nuevo marcador",
        "thankYou": "¡Gracias!",
        "nowYouHave": "Ahora tienes un",
        "account": "cuenta",
        "goHome": "Inicio",
        "until": "hasta",
        "goToPayment": "Ir a pago",
        "subscriptionPeriod": "Período",
        "paymentMethod": "Métodos de pago",
        "pricing": "Fijación de precios",
        "visualBookmarks": "Marcadores visuales",
        "readItLater": "Leer más tarde",
        "pro_notes": "Notas",
        "sslConnection": "Conexión segura SSL",
        "browserPlugin": "Extensión de navegador",
        "features": "Características",
        "free": "Gratis",
        "removeAccount": "Eliminar cuenta",
        "removeAccountD": "¿Cerrar cuenta y eliminar todas las colecciones, favoritos y datos?",
        "areYouSure": "¿Estás seguro?",
        "compareFreePro": "Comparar la cuenta Free y PRO",
        "shareLinkVia": "Compartir enlace vía",
        "changeAvatarInfo": "Usted puede cambiar el avatar asociado a tu correo electrónico en Gravatar.com. (Tu Gravatar es una imagen que te sigue desde un sitio a otro que aparecen al lado de su nombre cuando haces cosas como comentario o post en un blog)",
        "changeAvatar": "Cambiar Avatar",
        "browserExtensionD": "Acceso a colecciones de un solo clic desde cualquier pestaña del navegador",
        "macApp": "Aplicación de Mac OS X",
        "macAppD": "Organice el contenido y leer artículos de tu Mac",
        "macAppV": "Mac OS X (10.8.0 o más reciente)",
        "androidAppV": "Teléfono Android o tableta (4.0 o posterior)",
        "appleEditorsChoise": "Apple / elección del Editor",
        "operaEditorsChoise": "Recomendado por Opera",
        "downloadTitle": "Tenga a mano sus marcadores",
        "sharedCollections": "Colecciones compartidas",
        "serverCollaboratorsIncorrectToken": "Es imposible para convertirse en un miembro de la colección. URL no válida. Pregunta al autor de la colección que te invite una vez más.",
        "serverCollaboratorsAlready": "Tu ya eres miembro de colección!",
        "joinCollaboratorsSuccess": "¡Un éxito! Ahora eres miembro de esta colección.",
        "memberD": "Ahora usted puede añadir y editar marcadores, crear colecciones anidadas e invitar a nuevos miembros.",
        "viewerD": "Sólo puede ver marcadores en esta colección.",
        "savePage": "Guardar página en Raindrop.io",
        "saveToInbox": "Guardar en la bandeja de entrada (Raindrop.io)",
        "saveImage": "Guardar imagen en Raindrop.io",
        "myBookmarks": "Mis colecciones",
        "appName": "Raindrop.Io - marcadores inteligentes",
        "appDesc": "Una hermosa manera de recordar lo más importante.",
        "firstRun": "Para comenzar a utilizar Raindrop.io sólo tienes que actualizar la página actual y haga clic en nuevo.",
        "refreshPage": "Actualizar la página actual",
        "support": "Soporte",
        "afterUpdateTitle": "Se ha actualizado la extensión",
        "afterUpdate": "Tenemos varias nuevas características, mejoras y correcciones. ¿Quieres ver lo que es nuevo en esta versión?",
        "seeChangeLog": "Leer más..."
    },
    "nl_NL": {
        "server": "Onbekende fout. Probeer opnieuw!",
        "serverundefined": "Onbekende fout. Probeer opnieuw!",
        "server0": "Voer het oude wachtwoord in!",
        "server1": "E-mail is niet geldig!",
        "server2": "Geef uw naam in!",
        "server3": "Oud paswoord is niet correct!",
        "server4": "Paswoord is niet correct!",
        "server5": "Dit e-mailadres is al geregistreerd!",
        "server6": "Voer titel in!",
        "server7": "Verkeerde e-mail en/of paswoord combinatie!",
        "serverincorrect url": "Incorrecte URL",
        "collection": "Verzameling",
        "collectionNew": "Nieuwe verzameling",
        "collectionDeleteConfirm": "Weet u zeker dat u deze verzameling wil verwijderen? Alle bladwijzers in de verzameling zullen ook verwijderd worden!",
        "saveChanges": "Wijzigingen opslaan",
        "saveError": "Error tijdens opslaan!",
        "saveSuccess": "Succesvol bewaard!",
        "saved": "opgeslagen",
        "addSuccess": "Succesvol toegevoegd!",
        "moveSuccess": "Bladwijzers succesvol verplaatst!",
        "removeSuccess": "Met succes verwijderd!",
        "coverUpload": "Omslagfoto uploaden",
        "fileUploadUnable": "Dit bestand kan niet worden geüpload!",
        "fileUploadError": "Bestand upload fout. Probeer een ander bestand!",
        "linkNotRecognized": "Koppeling wordt niet herkend",
        "permalink": "Permalink:",
        "profile": "Profiel",
        "signIn": "Aanmelden",
        "myCollections": "Mijn verzamelingen",
        "save": "Opslaan",
        "remove": "Verwijderen",
        "elements": "bladwijzer",
        "about": "Over ons",
        "blog": "Blog",
        "tools": "Hulpprogramma's",
        "signInSocial": "Log in met",
        "signUpSocial": "Registereren met",
        "signUp": "Registreren",
        "register": "Registreren",
        "recoverPassword": "Reset wachtwoord",
        "password": "Wachtwoord",
        "edit": "Bewerken",
        "editMin": "Bewerken",
        "collectionEmpty": "Verzameling is leeg",
        "fillItTwoWays": "De twee manieren om een verzameling te vullen",
        "recommend": "Aanbevelen",
        "installExtension": "Installeer extensie",
        "extensionDescription": "De eenvoudigste, gemakkelijke en supersnelle manier om belangrijke zaken bij te  houden op het web.",
        "enterLink": "Voer link in",
        "enterLinkDescription": "Voer een link in naar een webpagina, artikel, foto of video. Wat je ook maar wilt.",
        "backToCollection": "Terug naar verzameling",
        "viewOn": "Weergeven op",
        "articled": "artikel",
        "imaged": "foto",
        "videod": "inhoud",
        "linkd": "link",
        "article": "Artikel",
        "image": "Foto",
        "video": "Inhoud",
        "link": "Link",
        "articles": "Artikelen",
        "images": "Foto's",
        "videos": "Inhoud",
        "links": "Links",
        "articleSaved": "Artikel opgeslagen",
        "imageSaved": "Foto opgeslagen",
        "videoSaved": "Inhoud opgeslagen",
        "linkSaved": "Link opgeslagen",
        "articleRemoved": "Artikel verplaatst naar de Prullenbak",
        "imageRemoved": "Foto verplaatst naar de prullenbak",
        "videoRemoved": "Inhoud verplaatst naar de prullenbak",
        "linkRemoved": "Link naar prullenbak verplaatst",
        "articleRemovedPermament": "Artikel verwijderd",
        "imageRemovedPermament": "Foto verwijderd",
        "videoRemovedPermament": "Inhoud verwijderd",
        "linkRemovedPermament": "Link verwijderd",
        "bookmarksRemoved": "Bladwijzers verplaatst naar de prullenbak",
        "bookmarksRemovedPermament": "Bladwijzers verwijderd",
        "other": "andere",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "op",
        "basicData": "Accountinstellingen",
        "yourName": "Uw naam",
        "changePassword": "Wachtwoord wijzigen",
        "newPassword": "Nieuw wachtwoord",
        "currentPassword": "Huidige wachtwoord",
        "findBookmarkLong": "Bladwijzer vinden...",
        "nothingFound": "Niets gevonden",
        "add": "Toevoegen",
        "cancel": "Annuleren",
        "covers": "Omslagfoto's",
        "upload": "Upload",
        "imagesOnly": "Enkel afbeeldingen.   Max grootte: 5mb.",
        "uploadProgress": "Uploaden...",
        "fontFamily": "Lettertypefamilie",
        "fontSize": "Tekengrootte",
        "interfaceStyle": "Interface stijl",
        "additional": "Extra",
        "fixedWidth": "Vaste breedte",
        "logOut": "Uitloggen",
        "titleAndDescription": "Titel & beschrijving",
        "title": "Titel",
        "description": "Beschrijving",
        "enterTitle": "Voer titel in",
        "enterDescription": "Voer omschrijving in",
        "enable": "Ingeschakeld",
        "type": "Type",
        "publicCollection": "Publieke verzameling",
        "shareCollection": "Verzameling delen",
        "sendEmail": "Stuur e-mail",
        "copyLink": "Kopieer een link",
        "language": "Taal",
        "iHaveAccount": "Ik heb al een account",
        "createFirstCollection": "Maak een eerste verzameling",
        "checkYourEmail": "Bekijk je inbox!",
        "und": "&",
        "from": "van",
        "passwordChangeSuccess": "Wachtwoord succesvol gewijzigd!",
        "smartSearch": "Slim zoeken",
        "subscribe": "Volgen",
        "youSubscribed": "Volgend",
        "subscriptions": "Volgend",
        "subscriptionsCollection": "Volg verzamelingen",
        "tags": "Tags",
        "addTag": "Voeg een tag toe",
        "noDescription": "Geen beschrijving",
        "basic": "Basis",
        "background": "Achtergrond",
        "removeBackground": "Achtergrond verwijderen",
        "or": "of",
        "noCollections": "Geen verzamelingen",
        "noSubscriptions": "Geen abonnementen",
        "welcome": "Start verzameling met",
        "publicCollections": "Openbare verzamelingen",
        "collectionsCount": "verzamelingen",
        "noPublicCollections": "Geen openbare verzamelingen",
        "noPublicCollectionsD": "Deze gebruiker heeft geen openbare verzameling aangemaakt of beschikte over geen enkele.",
        "all": "Alle",
        "mobileApp": "Mobiele App",
        "exportBookmarks": "Bladwijzers exporteren",
        "cover": "Omslagfoto",
        "saveToCollection": "Opslaan naar verzameling",
        "selectCollection": "Selecteer verzameling",
        "myAccount": "Mijn account",
        "enterTitleAndCollection": "Voer titel en verzameling in",
        "selectPreferedType": "Selecteer voorkeur type",
        "back": "Terug",
        "bySort": "Gesorteerd",
        "byName": "op naam",
        "byDate": "Op datum",
        "findOrCreateCollection": "Zoek of maak nieuwe verzameling",
        "createCollection": "Nieuwe verzameling",
        "createCollectionFirst": "Maak een eerste verzameling...",
        "createCollectionOrDrag": "Maak of sleep verzameling hier...",
        "createGroup": "Groep maken",
        "startToSave": "Log in om te beginnen aub!",
        "checkAgain": "Opnieuw controleren!",
        "clickToMakeScreenshot": "Klik om screenshot te maken",
        "elements1": "bladwijzer",
        "elements2": "bladwijzers",
        "elements5": "bladwijzers",
        "defaultCollection-0": "Zoeken",
        "defaultCollection--1": "Postvak in",
        "defaultCollection--99": "Prullenbak",
        "byTitle": "Alfabetische",
        "saveBookmark": "Bewaar hier",
        "saveBookmarkInInbox": "Opslaan in Postvak in",
        "sites": "Sites",
        "in": "in",
        "settings": "Instellingen",
        "removeCollectionSuccess": "Verzameling verwijderd",
        "changeIcon": "Pictogram wijzigen",
        "group": "Groep",
        "untitled": "Naamloos",
        "removeGroupError": "U kunt geen niet-lege groep verwijderen!",
        "select": "Selecteer",
        "create": "Maken",
        "privacy": "Privacy",
        "private": "Privé",
        "privateD": "Alleen u kunt weergeven",
        "public": "Publiek",
        "publicD": "Iedereen kan bekijken",
        "moveDown": "Omlaag",
        "moveUp": "Omhoog",
        "moveSelectedBookmarks": "Verplaats geselecteerde bladwijzers",
        "selectAll": "Selecteer alle",
        "supportOnlyUrls": "U kunt alleen koppelingen opslaan met http en https protocol!",
        "unableToRecognizeSpecifiedLink": "Kan de opgegeven koppeling niet herkennen!",
        "addTags": "Tags toevoegen",
        "noBookmarks": "Geen bladwijzers",
        "noBookmarksD": "Sleep een link of afbeelding van de pagina en zet neer. Of klik op 'pagina opslaan'.",
        "alreadyInCollection": "Al in de verzameling",
        "alreadyInCollectionD": "Klik om de beschrijving, tags en omslagfoto van de bladwijzer te bewerken",
        "alreadyInCollectionDD": "Bewerk beschrijving, tags en omslagfoto",
        "inSocial": "Link delen via",
        "copyURL": "URL kopiëren",
        "read": "Lezen",
        "smartBookmarks": "Slimme bladwijzers",
        "signUpEmail": "Registreren via E-mail",
        "loginOrRegisterSocial": "Login of registreer je met behulp van sociale netwerk",
        "help": "Help",
        "name": "Naam",
        "haveIdeas": "Bug of heb je een idee?",
        "followUsOn": "Volg ons voor nieuws en updates:",
        "writeUs": "Contacteer ons",
        "forDevelopers": "Voor ontwikkelaars",
        "importBookmarks": "Bladwijzers importeren",
        "howToUse": "Hoe te gebruiken?",
        "extension": "Extensie",
        "animation": "UI animatie",
        "closeOnPageClick": "Sluit bij paginaklik",
        "closeOnPageClickD": "Drag'n'drop zal niet beschikbaar zijn",
        "helpContext": "Contextmenu",
        "helpContextD": "Rechtermuisknop Klik op bladwijzers of verzamelingen voor meer acties",
        "helpHotKey": "Hotkey",
        "helpHotKeyD": "U kunt de sleutel op extensies pagina wijzigen",
        "helpVisible": "Vergroot het zichtbare gedeelte van de pagina",
        "helpVisibleD": "Verplaats de cursor naar de linkerkant en klik op het deelvenster",
        "helpBatch": "MultiSelect",
        "helpBatchD": "Selecteer bladwijzers voor batch acties",
        "moreTips": "Meer tips weergeven",
        "view": "Bekijk",
        "openLinksInNewTab": "Koppelingen in nieuw tabblad openen",
        "allBookmarks": "Alle bladwijzers",
        "parent": "Bovenliggende groep/verzameling",
        "footerProAd": "Upgrade naar PRO",
        "footerProAdD": "voor extra functies",
        "onlyInPro": "Alleen in Pro-account",
        "nestedCollections": "Geneste verzamelingen",
        "dropboxBackup": "Dropbox back-up",
        "goToPRO": "Upgrade naar PRO",
        "commonSettings": "Algemene instellingen",
        "already": "al",
        "addBookmark": "Bladwijzer toevoegen",
        "addBookmarkD": "Link naar elke webpagina, artikel, foto of video plakken",
        "advice": "Advies",
        "addAdvice": "Andere manieren om de bladwijzer toe te voegen",
        "browserExtension": "Browser extensie",
        "androidApp": "Android app",
        "androidAppD": "Belangrijke inhoud opslaan van web & favoriete apps!",
        "importBookmarksD": "Bladwijzers uit Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, leesbaarheid, Kippt, Delicious of andere diensten overbrengen naar Raindrop.io.",
        "showInDock": "In Dock weergeven",
        "showInTray": "In de menubalk weergeven",
        "alwaysOnTop": "Venster altijd op voorgrond",
        "blurHide": "Verberg venster wanneer het focus verliest",
        "desktopNeedRestart": "App herstarten om instellingen toe te passen",
        "refresh": "Vernieuwen",
        "editProfile": "Profiel bewerken",
        "profilePage": "Mijn verzamelingenpagina",
        "upgradeAccount": "PRO account",
        "screenshotError": "Webpagina kan niet geslagen worden!",
        "lastWeek": "De voorbije 7 dagen",
        "copyLinkToClipboard": "Koppeling kopiëren naar klembord",
        "openInBrowser": "Open in Browser",
        "openInBrowserWithShift": "Om de koppeling in de browser te openen, houdt u Ctrl of Shift ingedrukt",
        "selectAIconSet": "Selecteer een pictogramserie",
        "sharing": "Delen",
        "members": "Leden",
        "enterEmails": "Voer één of meerdere e-mailadressen gescheiden door komma in...",
        "role_member": "Kan bewerken",
        "role_members": "Kan bewerken",
        "role_viewer": "Kan bekijken",
        "role_owner": "Eigenaar",
        "privateCollectionURL": "Geen openbare URL. Verzameling is privé",
        "inviteMorePeople": "Meer mensen uitnodigen",
        "sendInvites": "Verstuur uitnodigingen",
        "unshareCollection": "Delen van verzameling ongedaan maken",
        "withAccessLevel": "Met toegangsniveau",
        "invitesSendTo": "Uitnodigingen verstuurd naar",
        "unshareSuccess": "Verzameling niet gedeeld",
        "accessViaLink": "Toegang via link",
        "desktopIntegration": "Integratie met Mac OS X app",
        "error": "Fout",
        "tryAgain": "Probeer opnieuw",
        "moveError": "Kan niet verplaatsen!",
        "dev": "Ontwikkelaars",
        "article1": "artikel",
        "article2": "artikelen",
        "article5": "artikelen",
        "image1": "foto",
        "image2": "foto's",
        "image5": "foto's",
        "video1": "inhoud",
        "video2": "inhoud",
        "video5": "inhoud",
        "link1": "link",
        "link2": "links",
        "link5": "links",
        "createNewCollection": "Verzameling maken",
        "toRefreshedRaindrop": "naar Raindrop.io",
        "comfortableReading": "Comfortabel lezen",
        "press": "Pers",
        "subscriptionsD": "Maak en volg interessante publieke verzamelingen.",
        "smartSearchD": "Op elk criteria, snel en gemakkelijk.",
        "tagsD": "Een andere manier om uw verzameling te ordenen.",
        "comfortableReadingD": "Concentreer je op het lezen van uw favoriete artikelen in een handige manier.",
        "dragNdropD": "Drag 'n drop je bladwijzers tussen verzamelingen.",
        "exportBookmarksD": "Om uw verzameling te kunnen overdragen.",
        "followUs": "Volg ons",
        "enterSearchCriteria": "Voer zoekcriteria in gescheiden door komma's",
        "enterSearchCriteriaD": "In om het even welke volgorde. We bepalen wat u zult invoeren:",
        "explore": "Verkennen",
        "exploreCollections": "Verken verzamelingen",
        "staffPicks": "Keuze van de redactie",
        "step": "Stap",
        "uploadBookmarksFile": "Bladwijzerbestand uploaden",
        "dropFilesHere": "Of drop bestand hier",
        "importInfo1": "HTML-bestand, maximale grootte van 3 mb.",
        "importInfo2": "Haal dit bestand vanuit uw browser of service in de \"Bladwijzers exporteren\" sectie.",
        "importInfo3": "Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool of Netscape bookmarks-bestandsindeling wordt ondersteund.",
        "loading": "Laden",
        "noBookmarksToImport": "Geen bladwijzers!",
        "foldersWithBookmarks": "Mappen",
        "removeIt": "Verwijderen",
        "startImport": "Importeren starten",
        "selectOtherFile": "Selecteer ander bestand?",
        "importing": "Importeren",
        "of": "van",
        "bookmarks": "bladwijzers",
        "importingInfo1": "Even geduld. Het kan enige tijd duren omdat elke bladwijzer wordt herkend.",
        "importingInfo2": "Sluit dit tabblad niet!",
        "importEnd": "Importeren voltooid!",
        "importSuccess": "Succesvol geïmporteerd",
        "importSuccessInfo": "Wij raden het aanpassen van het uiterlijk en de pictogrammen van uw verzamelingen aan, alsook om ze openbaar te maken en te delen op sociale netwerken of om de koppeling naar uw vrienden verzenden.",
        "importingProcess": "Bladwijzers importeren kan even duren afhankelijk van de grootte! Even geduld aub. Van zodra ze verwerkt zijn, brengen we u op de hoogte met een e-mail!",
        "importingAlready": "We zijn helaas nog niet klaar met het verwerken van de bladwijzers die u eerder uploadde. Gelieve even te wachten, wij brengen u op de hoogte op het opgegeven e-mailbericht.",
        "specifyYourEmail": "Geef uw e-mail aub in op uw profiel!",
        "staffPicksD": "Interessante verzameling met prachtig ontwerp",
        "templates": "Sjablonen",
        "collectionEdit": "Verzameling bewerken",
        "raindropEdit": "Bladwijzer bewerken",
        "icon": "Pictogram",
        "selectOtherIcon": "Verander pictogram...",
        "optional": "Optioneel",
        "permamentLink": "Permanente link",
        "backgroundUploadD": "U kunt een thema achtergrond voor uw verzameling uploaden. Het zal verschijnen",
        "onYourCollectionPage": "op de verzameling pagina",
        "removeCollectionForever": "Verzameling verwijderen",
        "theseAreTheBest": "Dit zijn de beste...",
        "findCollection": "Verzameling zoeken...",
        "findSubscription": "Abonnement zoeken...",
        "more": "Meer",
        "less": "Minder",
        "byPopularity": "Op populariteit",
        "collectionsSorting": "Verzamelingen sorteren",
        "sortBy": "Sorteren op",
        "custom": "Aangepast",
        "byBookmarksCount": "Op bladwijzer aantal",
        "fastFilter": "Snel filteren...",
        "fastView": "Snelle weergave bladwijzers",
        "publicPage": "Uw openbare pagina",
        "welcomeSlide1D": "Bewaar belangrijke links, artikelen, foto's, video's en presentaties",
        "welcomeSlide1DD": "& organiseer ze in thema verzamelingen.",
        "welcomeSlide1DDD": "Uw bladwijzers zijn beschikbaar vanop een computer of smartphone.",
        "welcomeSlide2": "Installeer onze extensie",
        "welcomeSlide2D": "Gemakkelijkste, simpelste en snelste manier",
        "welcomeSlide2DD": "om belangrijke zaken te bewaren van het web.",
        "next": "Volgende",
        "startCollecting": "Einde!",
        "extensionFor": "Extensie voor",
        "welcomeMobileSlide2": "Altijd met u",
        "sourceCode": "Broncode",
        "sourceCodeD": "Broncode van onze browser-extensies op",
        "sourceCodeDD": "Github repo.",
        "apiD": "Binnenkort.",
        "importFrom": "Importeren uit",
        "openCollection": "Open verzameling",
        "articlesProccessing": "Volledige tekst van artikelen zal later worden geüpload.",
        "favoriteSites": "Favoriete sites",
        "showAll": "Toon alle",
        "showAllBookmarks": "Toon alle bladwijzers",
        "youHave": "U hebt",
        "fillCollectionInput": "Selecteer verzameling aub!",
        "browserBookmarklet": "Browser bookmarklet",
        "browserBookmarkletD": "Geen van uw browser? Probeer de browser bookmarklet.",
        "browserBookmarkletDD": "Sleep deze link naar uw bladwijzerbalk",
        "browserBookmarkletDDD": "Opslaan naar verzameling",
        "hi": "Hallo",
        "noTags": "Geen tags",
        "interest_video": "Video",
        "interest_hobbies": "Hobby 's",
        "interest_design": "Ontwerp",
        "interest_design_inspiration": "Inspiratie",
        "interest_food_drink": "Voedsel & dranken",
        "interest_animals": "Dieren",
        "interest_health_fitness": "Gezondheid & fitness",
        "interest_illustrations": "Illustraties",
        "interest_developers": "Voor ontwikkelaars",
        "interest_art": "Kunst",
        "interest_history": "Geschiedenis",
        "interest_pictures": "Foto 's",
        "interest_film_music_books": "Films, muziek & boeken",
        "interest_cars_motorcycles": "Auto's & motorfietsen",
        "interest_fashion": "Mode",
        "interest_science": "Wetenschap",
        "interest_news": "Nieuws",
        "interest_education": "Onderwijs",
        "interest_psychology": "Psychologie",
        "interest_travel": "Reizen",
        "interest_nature": "Natuur",
        "interest_work": "Werk",
        "interest_sites": "Sites",
        "interest_diy": "Doe-het-zelf",
        "interest_sport": "Sport",
        "interest_technology": "Technologie",
        "interest_products": "Producten",
        "interest_sweet_home": "Sweet home",
        "interest_photography": "Fotografie",
        "interest_humor": "Humor",
        "interest_erotic": "Erotisch",
        "interest_other": "Andere",
        "interest_food_drink_recipes": "Recepten",
        "interest_film_music_books_films": "Films",
        "interest_film_music_books_music": "Muziek",
        "interest_film_music_books_books": "Boeken",
        "interest_psychology_relations": "Relaties",
        "interest_psychology_self_development": "Zelfontplooiing",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Spellen",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Toepassingen",
        "interest_developers_web": "Webontwikkeling",
        "interest_developers_mobile": "Mobiele ontwikkeling",
        "to": "Aan",
        "inCollection": "in verzameling",
        "dragCollections": "Wijzig volgorde van verzamelingen met drag'n'drop.",
        "feedAllCollections": "RSS feed van alle verzamelingen",
        "orAlternativeFeed": "Alle bladwijzers",
        "feedWarning": "Opgelet! Deel de unieke URL van uw RSS-abonnementen niet met andere personen, want dan kan men uw bladwijzers bekijken!",
        "publicRSSfeed": "Publieke RSS-feed",
        "showPrivateRSSfeed": "Toon private RSS feed",
        "privateRSSfeed": "Private RSS feed",
        "mailNotifications": "E-mailmeldingen",
        "disableWeeklyDigest": "Schakel wekelijkse selectie van uw bladwijzers uit",
        "trashEmpty": "Leeg prullenmand",
        "forOtherBrowsers": "Voor andere browsers",
        "saveLink": "Pagina opslaan",
        "instruction": "Instructie",
        "install": "Installeren",
        "importDescription": "Bladwijzers uit Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, leesbaarheid, Kippt, Delicious of andere diensten overbrengen naar Raindrop.io.",
        "createSubFolder": "Geneste verzameling maken",
        "pro_nesting": "Geneste verzamelingen",
        "pro_nestingD": "Maak zoveel geneste verzamelingen als u wil.",
        "pro_dropbox": "Dropbox backup",
        "pro_dropboxD": "Backup uw bladwijzers en inhoud naar uw Dropbox account.",
        "pro_support": "Voorkeursondersteuning",
        "pro_supportD": "Via e-mail of via skype.",
        "pro_nextFeatures": "Stem voor de volgende functies",
        "pro_nextFeaturesD": "Steun de ontwikkeling van toekomstige features!",
        "month": "maand",
        "year": "jaar",
        "oneMonth": "Één maand",
        "threeMonth": "3 maand",
        "yearDiscount": "korting, maar $19 per jaar!",
        "upgradeToPro": "Upgrade naar Pro",
        "renewPro": "PRO-abonnement verlengen",
        "renewPromonth": "PRO abonnement voor maand vernieuwen",
        "renewProyear": "PRO abonnement voor jaar verlengen",
        "proTitle": "Gratis gebruik maken van Raindrop.io",
        "proTitleD": "of upgrade voor",
        "proTitleDD": "extra functies.",
        "pro_noAds": "Vrij van advertenties",
        "pro_noAdsD": "",
        "pro_speed_dial": "Nieuwe tabbladpagina",
        "pro_apple": "iPhone/iPad app",
        "pro_desktop": "Desktop-app (met sync)",
        "pro_smart_collections": "Slimme verzamelingen (automatisch opslaan)",
        "yesIwant": "Ja, ik wil!",
        "votes": "stemmen",
        "votes1": "stemmen",
        "votes2": "stemmen",
        "votes5": "stemmen",
        "whatAddNext": "Wat  moeten we als volgende toevoegen?",
        "newString": "Nieuw",
        "newBookmark": "Nieuwe bladwijzer",
        "thankYou": "Bedankt!",
        "nowYouHave": "Nu heb je een",
        "account": "account",
        "goHome": "Ga naar home",
        "until": "tot",
        "goToPayment": "Ga naar betaling",
        "subscriptionPeriod": "Periode",
        "paymentMethod": "Betalingsmethoden",
        "pricing": "Prijzen",
        "visualBookmarks": "Visuele bookmarks",
        "readItLater": "Later lezen",
        "pro_notes": "Notities",
        "sslConnection": "SSL-beveiligde verbinding",
        "browserPlugin": "Browser extensie",
        "features": "Functies",
        "free": "Gratis",
        "removeAccount": "Account verwijderen",
        "removeAccountD": "Account sluiten en alle verzamelingen, bladwijzers en gegevens verwijderen?",
        "areYouSure": "Weet je het zeker?",
        "compareFreePro": "Vergelijk het gratis en PRO account",
        "shareLinkVia": "Link delen via",
        "changeAvatarInfo": "U kan uw avatar gekoppeld aan uw e-mail op Gravatar.com wijzigen. (Uw Gravatar is een afbeelding die u volgt van site tot site en naast uw naam verschijnt wanneer u commentaar geeft of post op een blog)",
        "changeAvatar": "Avatar wijzigen",
        "browserExtensionD": "Toegang tot collecties met één klik vanaf een browser tabblad",
        "macApp": "Mac OS X App",
        "macAppD": "Orden inhoud en lees artikelen vanaf uw Mac",
        "macAppV": "Mac OS X (10.8.0 of nieuwer)",
        "androidAppV": "Android telefoon of tablet (4.0 of nieuwer)",
        "appleEditorsChoise": "Apple / Editor's Choice",
        "operaEditorsChoise": "Aanbevolen door Opera",
        "downloadTitle": "Houd uw bladwijzers bij op een handige manier",
        "sharedCollections": "Gedeelde verzamelingen",
        "serverCollaboratorsIncorrectToken": "Het is onmogelijk om lid van de verzameling te worden. Ongeldige URL. Vraag de eigenaar van de verzameling om u nogmaals uit te nodigen.",
        "serverCollaboratorsAlready": "U bent al lid van de verzameling!",
        "joinCollaboratorsSuccess": "Gelukt! U bent nu een lid van de verzameling.",
        "memberD": "U kan nu bladwijzers toevoegen en bewerken, geneste verzamelingen aanmaken en nieuwe leden uitnodigen.",
        "viewerD": "U kan enkel bladwijzers bekijken in deze verzameling.",
        "savePage": "Sla pagina op naar Raindrop.io",
        "saveToInbox": "Opslaan in postvak in (Raindrop.io)",
        "saveImage": "Afbeelding opslaan naar Raindrop.io",
        "myBookmarks": "Mijn bladwijzers",
        "appName": "Raindrop.io - Slimme bladwijzers",
        "appDesc": "Een prachtige manier om de meest belangrijke zaken te onthouden.",
        "firstRun": "Om te starten met Raindrop.io moet u de huidige pagina vernieuwen en opnieuw klikken.",
        "refreshPage": "Huidige pagina vernieuwen",
        "support": "Ondersteuning",
        "afterUpdateTitle": "De extensie is bijgewerkt",
        "afterUpdate": "We hebben verschillende nieuwe functies, verbeteringen en bug fixes. Wil je zien wat er nieuw is in deze versie?",
        "seeChangeLog": "Lees meer..."
    },
    "pt_BR": {
        "server": "Erro desconhecido. Por favor, tente novamente!",
        "serverundefined": "Erro desconhecido. Por favor, tente novamente!",
        "server0": "Digite sua senha antiga!",
        "server1": "O endereço de email que você inseriu não é válido!",
        "server2": "Digite seu nome!",
        "server3": "Sua senha antiga não é válida!",
        "server4": "Essa senha não é válida!",
        "server5": "Esse email já está registrado!",
        "server6": "Digite o título!",
        "server7": "Email e/ou senha incorreto!",
        "serverincorrect url": "URL incorreta",
        "collection": "Coleção",
        "collectionNew": "Nova coleção",
        "collectionDeleteConfirm": "Tem certeza de que deseja excluir esta coleção?\nTodos os bookmarks dentro da coleção também serão removidos!",
        "saveChanges": "Salvar mudanças",
        "saveError": "Salvar erro!",
        "saveSuccess": "Salvo com sucesso!",
        "saved": "salvo",
        "addSuccess": "Adicionado com sucesso!",
        "moveSuccess": "Bookmark movido com sucesso!",
        "removeSuccess": "Removido com sucesso!",
        "coverUpload": "Subir capa",
        "fileUploadUnable": "Esse arquivo não pode ser adicionado!",
        "fileUploadError": "Erro ao subir arquivo. Tente outro arquivo!",
        "linkNotRecognized": "O link não foi reconhecido",
        "permalink": "Permalink:",
        "profile": "Perfil",
        "signIn": "Entre",
        "myCollections": "Minhas coleções",
        "save": "Salvar",
        "remove": "Remover",
        "elements": "bookmark",
        "about": "Sobre nós",
        "blog": "Blog",
        "tools": "Ferramentas",
        "signInSocial": "Faça o login com",
        "signUpSocial": "Cadastre-se com",
        "signUp": "Cadastrar",
        "register": "Cadastrar",
        "recoverPassword": "Esqueci minha senha",
        "password": "Senha",
        "edit": "Editar",
        "editMin": "Editar",
        "collectionEmpty": "A coleção está vazia",
        "fillItTwoWays": "As duas maneiras para preencher a coleção",
        "recommend": "Recomendar",
        "installExtension": "Instalar extensão",
        "extensionDescription": "A maneira mais simples, fácil e super rápida para manter \n importante da web.",
        "enterLink": "Digite o link",
        "enterLinkDescription": "Insira um link para qualquer página da web,\n artigo, foto ou vídeo. O que você quiser.",
        "backToCollection": "Voltar para coleção",
        "viewOn": "Ver em",
        "articled": "artigo",
        "imaged": "foto",
        "videod": "conteúdo",
        "linkd": "link",
        "article": "Artigo",
        "image": "Foto",
        "video": "Conteúdo",
        "link": "Link",
        "articles": "Artigos",
        "images": "Fotos",
        "videos": "Conteúdo",
        "links": "Links",
        "articleSaved": "Artigo Salvo",
        "imageSaved": "Foto salva",
        "videoSaved": "Conteúdo salvo",
        "linkSaved": "Link salvo",
        "articleRemoved": "Artigo enviado para a lixeira",
        "imageRemoved": "Foto enviada para a lixeira",
        "videoRemoved": "Conteúdo enviado para a lixeira",
        "linkRemoved": "Link enviado para a lixeira",
        "articleRemovedPermament": "Artigo removido",
        "imageRemovedPermament": "Foto removido",
        "videoRemovedPermament": "Conteúdo removido",
        "linkRemovedPermament": "Link removido",
        "bookmarksRemoved": "Favoritos enviados para a lixeira",
        "bookmarksRemovedPermament": "Favoritos removidos",
        "other": "outro",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "na",
        "basicData": "Configuraçōes da conta",
        "yourName": "Seu nome",
        "changePassword": "Mudar senha",
        "newPassword": "Nova senha",
        "currentPassword": "Senha atual",
        "findBookmarkLong": "Procurar favorito...",
        "nothingFound": "Nada foi encontrado",
        "add": "Adicionar",
        "cancel": "Cancelar",
        "covers": "Capas",
        "upload": "Fazer upload",
        "imagesOnly": "Apenas images.\n Tamanho máximo: 5mb.",
        "uploadProgress": "Fazendo uploading...",
        "fontFamily": "Tipo de letra",
        "fontSize": "Tamanho da letra",
        "interfaceStyle": "Estilo da interface",
        "additional": "Adicionais",
        "fixedWidth": "Largura fixa",
        "logOut": "Sair",
        "titleAndDescription": "Título & descrição",
        "title": "Título",
        "description": "Descrição",
        "enterTitle": "Digite o título",
        "enterDescription": "Digite a descrição",
        "enable": "Habilitado",
        "type": "Tipo",
        "publicCollection": "Coleção pública",
        "shareCollection": "Compartilhe coleção",
        "sendEmail": "Enviar e-mail",
        "copyLink": "Copiar um link",
        "language": "Língua",
        "iHaveAccount": "Já tenho conta",
        "createFirstCollection": "Criar a primeira coleção",
        "checkYourEmail": "Verifique sua caixa de entrada!",
        "und": "&",
        "from": "De",
        "passwordChangeSuccess": "Senha alterada com sucesso!",
        "smartSearch": "Pesquisa inteligente",
        "subscribe": "Siga",
        "youSubscribed": "Seguindo",
        "subscriptions": "Seguindo",
        "subscriptionsCollection": "Siga coleções",
        "tags": "Tags",
        "addTag": "Adicionar uma tag",
        "noDescription": "Sem descrição",
        "basic": "Básico",
        "background": "Plano de fundo",
        "removeBackground": "Remover fundo",
        "or": "ou",
        "noCollections": "Sem coleções",
        "noSubscriptions": "Sem assinaturas",
        "welcome": "Comece sua coleção com",
        "publicCollections": "Coleções públicas",
        "collectionsCount": "coleções",
        "noPublicCollections": "Não há coleções públicas",
        "noPublicCollectionsD": "Este usuário não criou ou não tem qualquer coleção pública.",
        "all": "Todos",
        "mobileApp": "Aplicativo para o celular",
        "exportBookmarks": "Exportar favoritos",
        "cover": "Capa",
        "saveToCollection": "Salvar na coleção",
        "selectCollection": "Selecione a coleção",
        "myAccount": "Minha conta",
        "enterTitleAndCollection": "Digite título e coleçāo",
        "selectPreferedType": "Selecione o tipo preferido",
        "back": "Voltar",
        "bySort": "Classificado",
        "byName": "por nome",
        "byDate": "Data",
        "findOrCreateCollection": "Procurar ou criar nova coleçāo",
        "createCollection": "Nova coleçāo",
        "createCollectionFirst": "Criar primeira coleção...",
        "createCollectionOrDrag": "Crie ou arraste a coleção aqui...",
        "createGroup": "Criar grupo",
        "startToSave": "Efetue o login para começar!",
        "checkAgain": "Verifique novamente!",
        "clickToMakeScreenshot": "Click para tirar uma screenshot",
        "elements1": "bookmark",
        "elements2": "bookmarks",
        "elements5": "bookmarks",
        "defaultCollection-0": "Procurar",
        "defaultCollection--1": "Caixa de entrada",
        "defaultCollection--99": "Lixeira",
        "byTitle": "Ordem alfabética",
        "saveBookmark": "Salvar aqui",
        "saveBookmarkInInbox": "Salvar na caixa de entrada",
        "sites": "Sites",
        "in": "em",
        "settings": "Configurações",
        "removeCollectionSuccess": "Coleção removida",
        "changeIcon": "Alterar ícone",
        "group": "Grupo",
        "untitled": "Sem título",
        "removeGroupError": "Não é possível excluir grupo vazio!",
        "select": "Selecione",
        "create": "Criar",
        "privacy": "Privacidade",
        "private": "Privado",
        "privateD": "Só você pode ver",
        "public": "Público",
        "publicD": "Qualquer um pode ver",
        "moveDown": "Mover para baixo",
        "moveUp": "Mover para cima",
        "moveSelectedBookmarks": "Mover favoritos selecionados",
        "selectAll": "Selecionar tudo",
        "supportOnlyUrls": "Você só pode salvar links com protocolo http ou https!",
        "unableToRecognizeSpecifiedLink": "Incapaz de reconhecer o link especificado!",
        "addTags": "Adicionar tags",
        "noBookmarks": "Sem favoritos",
        "noBookmarksD": "Arraste e solte o link ou imagem da página. Ou clique em 'Salvar página'.",
        "alreadyInCollection": "Já na coleção",
        "alreadyInCollectionD": "Clique para editar a descrição, tags e capa do bookmark",
        "alreadyInCollectionDD": "Editar descrição, tags e capa",
        "inSocial": "Compartilhar link via",
        "copyURL": "Copiar URL",
        "read": "Ler",
        "smartBookmarks": "Favoritos Inteligentes",
        "signUpEmail": "Registre-se usando email",
        "loginOrRegisterSocial": "Login ou registre-se usando rede social",
        "help": "Ajuda",
        "name": "Nome",
        "haveIdeas": "Erro ou tem alguma idéia?",
        "followUsOn": "Siga-nos para notícias e atualizações:",
        "writeUs": "Contate-nos",
        "forDevelopers": "Para desenvolvedores",
        "importBookmarks": "Importar favoritos",
        "howToUse": "Como usar?",
        "extension": "Extensão",
        "animation": "Animação de interface do usuário",
        "closeOnPageClick": "Clique na página para fechar",
        "closeOnPageClickD": "Arrastar e soltar não estará disponível",
        "helpContext": "Menu de contexto",
        "helpContextD": "Clique com o botão direito do mouse em favoritos ou coleções para mais ações",
        "helpHotKey": "Tecla de atalho",
        "helpHotKeyD": "Você pode alterar o atalho na página de extensões",
        "helpVisible": "Expanda a parte visível da página",
        "helpVisibleD": "Mova o cursor para a esquerda e clique no painel para aparecer",
        "helpBatch": "Seleção múltipla",
        "helpBatchD": "Selecione os favoritos para açōes em lote",
        "moreTips": "Mostrar mais dicas",
        "view": "Ver",
        "openLinksInNewTab": "Abrir links em nova aba",
        "allBookmarks": "Todos os favoritos",
        "parent": "Grupo/coleção pai",
        "footerProAd": "Atualize para o PRO",
        "footerProAdD": "para recursos extras",
        "onlyInPro": "Somente para contas PRO",
        "nestedCollections": "Coleçōes agrupadas",
        "dropboxBackup": "Backup Dropbox",
        "goToPRO": "Atualize para o PRO",
        "commonSettings": "Configurações comuns",
        "already": "Já",
        "addBookmark": "Adicionar favorito",
        "addBookmarkD": "Colar link para qualquer página da Web, artigo, imagem ou vídeo",
        "advice": "Dicas",
        "addAdvice": "Outras maneiras de adicionar favorito",
        "browserExtension": "Extensão para navegador",
        "androidApp": "Android app",
        "androidAppD": "Salve conteúdo importante da web & apps favoritos!",
        "importBookmarksD": "Transfira favoritos do Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious ou outros serviços para Raindrop.io.",
        "showInDock": "Mostrar no Dock",
        "showInTray": "Mostrar na barra do menu",
        "alwaysOnTop": "Janela sempre no topo",
        "blurHide": "Ocultar a janela quando perder o foco",
        "desktopNeedRestart": "Reinicie o aplicativo para aplicar as configurações",
        "refresh": "Atualizar",
        "editProfile": "Editar perfil",
        "profilePage": "Minha página de coleções",
        "upgradeAccount": "Conta PRO",
        "screenshotError": "Página da Web não pode ser capturada!",
        "lastWeek": "Últimos 7 dias",
        "copyLinkToClipboard": "Copie o link para área de transferência",
        "openInBrowser": "Abrir no navegador",
        "openInBrowserWithShift": "Para abrir o link no navegador, segure a tecla Shift ou Ctrl",
        "selectAIconSet": "Selecione um conjunto de ícones",
        "sharing": "Compartilhando",
        "members": "Membros",
        "enterEmails": "Digite o e-mail ou e-mails separados por vírgula...",
        "role_member": "Pode editar",
        "role_members": "Pode editar",
        "role_viewer": "Pode visualizar",
        "role_owner": "Proprietário",
        "privateCollectionURL": "Nenhuma URL pública. Coleção é privada",
        "inviteMorePeople": "Convidar mais pessoas",
        "sendInvites": "Enviar convites",
        "unshareCollection": "Descompartilhar coleção",
        "withAccessLevel": "Com nível de acesso",
        "invitesSendTo": "Convites enviados para",
        "unshareSuccess": "Coleção descompartilhada",
        "accessViaLink": "Acesso através de link",
        "desktopIntegration": "Integração com o aplicativo para Mac OS X",
        "error": "Erro",
        "tryAgain": "Tente novamente",
        "moveError": "Incapaz de se mover!",
        "dev": "Desenvolvedores",
        "article1": "artigo",
        "article2": "artigos",
        "article5": "artigos",
        "image1": "foto",
        "image2": "fotos",
        "image5": "fotos",
        "video1": "conteúdo",
        "video2": "conteúdos",
        "video5": "conteúdos",
        "link1": "link",
        "link2": "links",
        "link5": "links",
        "createNewCollection": "Criar coleção",
        "toRefreshedRaindrop": "para Raindrop.io",
        "comfortableReading": "Leitura confortável",
        "press": "Imprensa",
        "subscriptionsD": "Crie e siga coleçōes públicas interessantes.",
        "smartSearchD": "Por qualquer critério, rapidamente e facilmente.",
        "tagsD": "Outra maneira de organizar sua coleção.",
        "comfortableReadingD": "Concentre-se na leitura de seus artigos favoritos de forma conveniente.",
        "dragNdropD": "Arraste e solte seus favoritos entre as coleçōes.",
        "exportBookmarksD": "Para ser capaz de transferir a sua coleção.",
        "followUs": "Siga-nos",
        "enterSearchCriteria": "Insira os critérios de pesquisa, separados por vírgulas",
        "enterSearchCriteriaD": "Em qualquer ordem, nós vamos determinar o que você vai digitar:",
        "explore": "Explore",
        "exploreCollections": "Explore coleções",
        "staffPicks": "Escolha dos editores",
        "step": "Passo",
        "uploadBookmarksFile": "Upload arquivo de favoritos",
        "dropFilesHere": "Ou solte o arquivo aqui",
        "importInfo1": "Arquivo HTML, máximo 3 mb de tamanho.",
        "importInfo2": "Você pode pegar esse arquivo a partir do seu navegador ou na área de serviço 'Exportar favoritos'.",
        "importInfo3": "Suporte para arquivo de favoritos de Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool ou Netscape.",
        "loading": "Carregando",
        "noBookmarksToImport": "Sem favoritos!",
        "foldersWithBookmarks": "Pastas",
        "removeIt": "Remover",
        "startImport": "Iniciar importação",
        "selectOtherFile": "Selecione outro arquivo?",
        "importing": "Importando",
        "of": "de",
        "bookmarks": "favoritos",
        "importingInfo1": "Isso pode demorar algum tempo, pois todos os favoritos estão sendo reconhecidos.",
        "importingInfo2": "Não feche esta aba!",
        "importEnd": "Importação concluída!",
        "importSuccess": "Importado com êxito",
        "importSuccessInfo": "É recomendável personalizar a aparência e os ícones de suas coleções e também tornar público e compartilhá-los em redes sociais ou enviar o link para seus amigos.",
        "importingProcess": "Importação de favoritos pode demorar algum tempo, dependendo da quantidade! Por favor, seja paciente que assim que o processo for finalizado nós te avisaremos no email especificado!",
        "importingAlready": "Ainda não foi possível finalizar o upload dos seus favoritos! Por favor, aguarde mais um pouco, nós entraremos em contato pelo seu email.",
        "specifyYourEmail": "Por favor, especifique um email em seu perfil!",
        "staffPicksD": "Coleçōes interessantes com belo design",
        "templates": "Modelos",
        "collectionEdit": "Editar coleção",
        "raindropEdit": "Editar favorito",
        "icon": "Ícone",
        "selectOtherIcon": "Alterar ícone...",
        "optional": "Opcional",
        "permamentLink": "Permament link",
        "backgroundUploadD": "Você pode carregar fundos temáticos para personalizar sua coleção. Ele aparecerá",
        "onYourCollectionPage": "na página da coleção",
        "removeCollectionForever": "Excluir coleção",
        "theseAreTheBest": "Estes são os melhores...",
        "findCollection": "Procurar coleção...",
        "findSubscription": "Procurar assinatura...",
        "more": "Mais",
        "less": "Menos",
        "byPopularity": "Por popularidade",
        "collectionsSorting": "Classificação das coleções",
        "sortBy": "Ordenar por",
        "custom": "Personalizado",
        "byBookmarksCount": "Pela contagem de favoritos",
        "fastFilter": "Filtragem rápida...",
        "fastView": "Modo de exibição rápida de bookmarks",
        "publicPage": "Sua página pública",
        "welcomeSlide1D": "Salvar links importantes, artigos, fotos, vídeos, apresentações",
        "welcomeSlide1DD": "& organize-os em coleções temáticas.",
        "welcomeSlide1DDD": "Seus bookmarks estão disponíveis a partir de seu computador e smartphone.",
        "welcomeSlide2": "Instale nossa extensão",
        "welcomeSlide2D": "A maneira mais fácil, simples e rápida",
        "welcomeSlide2DD": "para salvar coisas importantes da Web.",
        "next": "Próxima",
        "startCollecting": "Terminar!",
        "extensionFor": "Extensão para",
        "welcomeMobileSlide2": "Sempre com você",
        "sourceCode": "Código-fonte",
        "sourceCodeD": "Código-fonte das nossas extensões de navegador na",
        "sourceCodeDD": "GitHub repo.",
        "apiD": "Em breve.",
        "importFrom": "Importar de",
        "openCollection": "Coleção aberta",
        "articlesProccessing": "O texto integral dos artigos será enviado posteriormente.",
        "favoriteSites": "Sites favoritos",
        "showAll": "Mostrar todos",
        "showAllBookmarks": "Mostrar todos os favoritos",
        "youHave": "Você tem",
        "fillCollectionInput": "Selecione uma coleção, por favor!",
        "browserBookmarklet": "Bookmarklet para seu browser",
        "browserBookmarkletD": "Não encontrou seu navegador? Tente o navegador bookmarklet.",
        "browserBookmarkletDD": "Arraste este link para sua barra de favoritos",
        "browserBookmarkletDDD": "Salvar na coleção",
        "hi": "Olá",
        "noTags": "Sem tags",
        "interest_video": "Vídeo",
        "interest_hobbies": "Hobbies",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiração",
        "interest_food_drink": "Comida & bebidas",
        "interest_animals": "Animais",
        "interest_health_fitness": "Saúde & fitness",
        "interest_illustrations": "Ilustrações",
        "interest_developers": "Para desenvolvedores",
        "interest_art": "Arte",
        "interest_history": "História",
        "interest_pictures": "Fotos",
        "interest_film_music_books": "Filmes, música, & livros",
        "interest_cars_motorcycles": "Carros & motos",
        "interest_fashion": "Moda",
        "interest_science": "Ciência",
        "interest_news": "Notícias",
        "interest_education": "Educação",
        "interest_psychology": "Psicologia",
        "interest_travel": "Viagens",
        "interest_nature": "Natureza",
        "interest_work": "Trabalho",
        "interest_sites": "Sites",
        "interest_diy": "Faça você mesmo",
        "interest_sport": "Esporte",
        "interest_technology": "Tecnologia",
        "interest_products": "Produtos",
        "interest_sweet_home": "Doce lar",
        "interest_photography": "Fotografia",
        "interest_humor": "Humor",
        "interest_erotic": "Erótico",
        "interest_other": "Outros",
        "interest_food_drink_recipes": "Receitas",
        "interest_film_music_books_films": "Filmes",
        "interest_film_music_books_music": "Música",
        "interest_film_music_books_books": "Livros",
        "interest_psychology_relations": "Relacionamentos",
        "interest_psychology_self_development": "Autodesenvolvimento",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Jogos",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Aplicações",
        "interest_developers_web": "Desenvolvimento Web",
        "interest_developers_mobile": "Desenvolvimento móvel",
        "to": "Para",
        "inCollection": "na coleção",
        "dragCollections": "Alterar a ordem das coleções arrastando e soltando.",
        "feedAllCollections": "Todas as coleções RSS feed",
        "orAlternativeFeed": "Todos os favoritos",
        "feedWarning": "Aviso! Não compartilhe uma URL exclusiva de suas assinaturas de RSS para outra pessoa, pois eles serão capazes de ver os seus favoritos!",
        "publicRSSfeed": "RSS feed público",
        "showPrivateRSSfeed": "Mostrar RSS feed privado",
        "privateRSSfeed": "RSS feed privado",
        "mailNotifications": "Notificações por email",
        "disableWeeklyDigest": "Desativar resumo semanal dos seus favoritos",
        "trashEmpty": "Esvaziar lixeira",
        "forOtherBrowsers": "Para outros navegadores",
        "saveLink": "Salvar página",
        "instruction": "Instrução",
        "install": "Instalar",
        "importDescription": "Transfira favoritos do Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious ou outros serviços para Raindrop.io.",
        "createSubFolder": "Crie coleçōes agrupadas",
        "pro_nesting": "Coleçōes agrupadas",
        "pro_nestingD": "Crie quantas coleçōes agrupadas quiser.",
        "pro_dropbox": "Backup Dropbox",
        "pro_dropboxD": "Faça o backup dos seus favoritos e conteúdos para sua conta no Dropbox.",
        "pro_support": "Suporte prioritário",
        "pro_supportD": "Por e-mail ou skype.",
        "pro_nextFeatures": "Vote nos próximos recursos",
        "pro_nextFeaturesD": "Apoio para o desenvolvimento das próximas características!",
        "month": "mês",
        "year": "ano",
        "oneMonth": "Um mês",
        "threeMonth": "3 meses",
        "yearDiscount": "Desconto, apenas $19 dólares por ano!",
        "upgradeToPro": "Atualizar para PRO",
        "renewPro": "Renovar assinatura PRO",
        "renewPromonth": "Renovar assinatura PRO por mês",
        "renewProyear": "Renovar assinatura PRO por ano",
        "proTitle": "Use o Raindrop.io de graça",
        "proTitleD": "ou atualize para",
        "proTitleDD": "recursos extras.",
        "pro_noAds": "Livre de anúncios",
        "pro_noAdsD": "",
        "pro_speed_dial": "Nova página em mosaico",
        "pro_apple": "App para iPhone/iPad",
        "pro_desktop": "App para desktop (com sincronização)",
        "pro_smart_collections": "Coleções inteligentes (Salvas automaticamente)",
        "yesIwant": "Sim, eu quero!",
        "votes": "vote",
        "votes1": "vote",
        "votes2": "votos",
        "votes5": "votos",
        "whatAddNext": "O que devemos adicionar em seguida?",
        "newString": "Novo",
        "newBookmark": "Novo favorito",
        "thankYou": "Obrigado!",
        "nowYouHave": "Agora você tem uma",
        "account": "conta",
        "goHome": "Ir para casa",
        "until": "até",
        "goToPayment": "Ir para pagamento",
        "subscriptionPeriod": "Período",
        "paymentMethod": "Métodos de pagamento",
        "pricing": "Preços",
        "visualBookmarks": "Visualização incrível dos seus favoritos",
        "readItLater": "Ler mais tarde",
        "pro_notes": "Notas",
        "sslConnection": "Conexão protegida por SSL",
        "browserPlugin": "Extensão do navegador",
        "features": "Funcionalidades",
        "free": "Grátis",
        "removeAccount": "Remover conta",
        "removeAccountD": "Fechar conta e remover todas as coleções, favoritos e dados?",
        "areYouSure": "Tem certeza?",
        "compareFreePro": "Compare a conta Grátis e PRO",
        "shareLinkVia": "Compartilhar link via",
        "changeAvatarInfo": "Você pode alterar o avatar associado com seu Email em Gravatar.com. (Seu Gravatar é uma imagem que segue você de site para site aparecendo ao lado de seu nome quando você faz coisas como comentar ou post em um blog)",
        "changeAvatar": "Mudar avatar",
        "browserExtensionD": "Acesso a coleçōes a apenas 1 click de qualquer página do seu browser",
        "macApp": "Aplicativo para Mac OS X",
        "macAppD": "Organize o conteúdo e leia artigos de seu Mac",
        "macAppV": "Mac OS X (10.8.0 ou mais recente)",
        "androidAppV": "Celular ou tablet Android (4.0 ou mais recente)",
        "appleEditorsChoise": "Apple / Escolha do Editor",
        "operaEditorsChoise": "Recomendado pelo Opera",
        "downloadTitle": "Mantenha seus favoritos acessíveis",
        "sharedCollections": "Coleções compartilhadas",
        "serverCollaboratorsIncorrectToken": "Não é possível se tornar um membro da coleção. URL inválido. Pergunte ao autor da coleção de convidá-lo mais uma vez.",
        "serverCollaboratorsAlready": "Você já é membro da coleção!",
        "joinCollaboratorsSuccess": "Sucesso! Agora você é um membro da coleção.",
        "memberD": "Agora você pode adicionar e editar favoritos, criar coleções agrupadas e convidar novos membros.",
        "viewerD": "Você só pode visualiza favoritos nesta coleção.",
        "savePage": "Salvar página no Raindrop.io",
        "saveToInbox": "Salvar na caixa de entrada (Raindrop.io)",
        "saveImage": "Salvar imagem no Raindrop.io",
        "myBookmarks": "Meus favoritos",
        "appName": "Raindrop.Io - Favoritos Inteligentes",
        "appDesc": "Uma bela maneira de lembrar o mais importante.",
        "firstRun": "Para começar a usar o Raindrop.io você só precisa atualizar a página atual e clicar novamente.",
        "refreshPage": "Atualizar a página atual",
        "support": "Suporte",
        "afterUpdateTitle": "A extensão foi atualizada",
        "afterUpdate": "Temos vários recursos novos, melhorias e correções de bugs. Quer ver o que há de novo nesta versão?",
        "seeChangeLog": "Leia mais..."
    },
    "pl_PL": {
        "server": "Nieznany błąd. Spróbuj ponownie!",
        "serverundefined": "Nieznany błąd. Spróbuj ponownie!",
        "server0": "Wprowadź stare hasło!",
        "server1": "E-mail nie jest poprawny!",
        "server2": "Wprowadź swoje imię!",
        "server3": "Stare hasło nie jest poprawne!",
        "server4": "Hasło nie jest poprawne!",
        "server5": "Ten adres e-mail jest już zarejestrowany!",
        "server6": "Wprowadź tytuł!",
        "server7": "Nieprawidłowy E-mail i/lub hasło!",
        "serverincorrect url": "URL niepoprawny",
        "collection": "Kolekcje",
        "collectionNew": "Nowa kolekcja",
        "collectionDeleteConfirm": "Czy na pewno chcesz usunąć tę kolekcję?\nWszystkie zakładki w kolekcji również zostaną usunięte!",
        "saveChanges": "Zapisz zmiany",
        "saveError": "Błąd zapisu!",
        "saveSuccess": "Zapisano poprawnie!",
        "saved": "zapisano",
        "addSuccess": "Dodano poprawnie!",
        "moveSuccess": "Zakładki przeniesione!",
        "removeSuccess": "Usunięto!",
        "coverUpload": "Załaduj okładkę",
        "fileUploadUnable": "Ten plik nie może być przesłany!",
        "fileUploadError": "Błąd przesyłania. Spróbuj innego pliku!",
        "linkNotRecognized": "Link nie został rozpoznany",
        "permalink": "Adres bezpośredni:",
        "profile": "Profil",
        "signIn": "Zaloguj się",
        "myCollections": "Moje kolekcje",
        "save": "Zapisz",
        "remove": "Usuń",
        "elements": "zakładka",
        "about": "O nas",
        "blog": "Blog",
        "tools": "Narzędzia",
        "signInSocial": "Zaloguj poprzez",
        "signUpSocial": "Zarejestruj poprzez",
        "signUp": "Zarejestruj się",
        "register": "Zarejestruj się",
        "recoverPassword": "Zresetuj hasło",
        "password": "Hasło",
        "edit": "Edytuj",
        "editMin": "Edytuj",
        "collectionEmpty": "Kolekcja jest pusta",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Poleć",
        "installExtension": "Zainstaluj rozszerzenie",
        "extensionDescription": "Prosta i super szybka droga, aby zapisywać ważne rzeczy z sieci.",
        "enterLink": "Wprowadź link",
        "enterLinkDescription": "Wprowadź link do dowolnej strony, artykułu, obrazka czy filmiku.",
        "backToCollection": "Wróć do kolekcji",
        "viewOn": "Zobacz na",
        "articled": "artykuł",
        "imaged": "obrazek",
        "videod": "zawartość",
        "linkd": "link",
        "article": "Artykuł",
        "image": "Zdjęcie",
        "video": "Zawartość",
        "link": "Link",
        "articles": "Artykuły",
        "images": "Zdjęcia",
        "videos": "Zawartość",
        "links": "Linki",
        "articleSaved": "Zapisano artykuł",
        "imageSaved": "Zapisano zdjęcie",
        "videoSaved": "Zapisano zawartość",
        "linkSaved": "Zapisano link",
        "articleRemoved": "Artykuł przeniesiono do kosza",
        "imageRemoved": "Zdjęcie przeniesiono do kosza",
        "videoRemoved": "Zawartość przeniesiono do kosza",
        "linkRemoved": "Link przeniesiono do kosza",
        "articleRemovedPermament": "Artykuł został usunięty",
        "imageRemovedPermament": "Zdjęcie zostało usunięte",
        "videoRemovedPermament": "Zawartość została usunięta",
        "linkRemovedPermament": "Link został usunięty",
        "bookmarksRemoved": "Zakładki zostały przeniesione do kosza",
        "bookmarksRemovedPermament": "Zakładki zostały usunięte",
        "other": "inne",
        "vkontakte": "ВКОНТАКТЕ",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "Włączone",
        "basicData": "Ustawienia konta",
        "yourName": "Twoje imię",
        "changePassword": "Zmień hasło",
        "newPassword": "Nowe hasło",
        "currentPassword": "Obecne hasło",
        "findBookmarkLong": "Znajdź zakładkę...",
        "nothingFound": "Nic nie znaleziono",
        "add": "Dodaj",
        "cancel": "Anuluj",
        "covers": "Okladki",
        "upload": "Prześlij",
        "imagesOnly": "Tylko obrazy.\nMaksymalny rozmiar: 5mb.",
        "uploadProgress": "Przesyłanie...",
        "fontFamily": "Rodzina kroju pisma",
        "fontSize": "Rozmiar kroju pisma",
        "interfaceStyle": "Styl interfejsu",
        "additional": "Dodatkowe",
        "fixedWidth": "Stała szerokość strony",
        "logOut": "Wyloguj",
        "titleAndDescription": "Tytuł i opis",
        "title": "Tytuł",
        "description": "Opis",
        "enterTitle": "Wprowadź tytuł",
        "enterDescription": "Wprowadź opis",
        "enable": "Włączone",
        "type": "Typ",
        "publicCollection": "Publiczna kolekcja",
        "shareCollection": "Udostępnij kolekcję",
        "sendEmail": "Wyślij email",
        "copyLink": "Kopiuj link",
        "language": "Język",
        "iHaveAccount": "Mam już konto",
        "createFirstCollection": "Utwórz pierwszą kolekcję",
        "checkYourEmail": "Sprawdź swoją skrzynkę odbiorczą!",
        "und": "i",
        "from": "od",
        "passwordChangeSuccess": "Zmiana hasła powiodła się!",
        "smartSearch": "Inteligentne wyszukiwanie",
        "subscribe": "Obserwuj",
        "youSubscribed": "Obserwowane",
        "subscriptions": "Obserwowane",
        "subscriptionsCollection": "Obserwuj kolekcje",
        "tags": "Tagi",
        "addTag": "Dodaj znacznik",
        "noDescription": "Brak opisu",
        "basic": "Podstawowe",
        "background": "Tło",
        "removeBackground": "Usuń tło",
        "or": "lub",
        "noCollections": "Brak kolekcji",
        "noSubscriptions": "Brak subskrypcji",
        "welcome": "Rozpocznij kolekcjonowanie od",
        "publicCollections": "Publiczne kolekcje",
        "collectionsCount": "kolekcje",
        "noPublicCollections": "Brak kolekcji publicznych",
        "noPublicCollectionsD": "Ten użytkownik nie stworzył lub nie ma żadnych publicznych kolekcji.",
        "all": "Wszystkio",
        "mobileApp": "Aplikacja mobilna",
        "exportBookmarks": "Eksportuj zakładki",
        "cover": "Okładka",
        "saveToCollection": "Zapisz w kolekcji",
        "selectCollection": "Wybierz kolekcję",
        "myAccount": "Moje konto",
        "enterTitleAndCollection": "Wprowadź tytuł oraz kolekcję",
        "selectPreferedType": "Wybierz preferowany typ",
        "back": "Wstecz",
        "bySort": "Posortowane",
        "byName": "według nazwy",
        "byDate": "według daty",
        "findOrCreateCollection": "Znajdź lub utwórz nową kolekcję",
        "createCollection": "Nowa kolekcja",
        "createCollectionFirst": "Utwórz pierwszą kolekcję...",
        "createCollectionOrDrag": "Utwórz lub przeciągnij kolekcję tutaj...",
        "createGroup": "Utwórz grupę",
        "startToSave": "Zaloguj się aby rozpocząć!",
        "checkAgain": "Sprawdź ponownie!",
        "clickToMakeScreenshot": "Kliknij, aby zrobić zrzut ekranu",
        "elements1": "zakładka",
        "elements2": "zakładki",
        "elements5": "zakładki",
        "defaultCollection-0": "Szukaj",
        "defaultCollection--1": "Skrzynka odbiorcza",
        "defaultCollection--99": "Kosz",
        "byTitle": "Alfabetyczne",
        "saveBookmark": "Zapisz tutaj",
        "saveBookmarkInInbox": "Zapisz w skrzynce odbiorczej",
        "sites": "Stron",
        "in": "w",
        "settings": "Ustawienia",
        "removeCollectionSuccess": "Usunięto kolekcję",
        "changeIcon": "Zmień ikonę",
        "group": "Grupa",
        "untitled": "Bez tytułu",
        "removeGroupError": "Nie można usunąć zapełnionej grupy!",
        "select": "Wybierz",
        "create": "Utwórz",
        "privacy": "Prywatność",
        "private": "Prywatne",
        "privateD": "Widoczne tylko dla Ciebie",
        "public": "Publiczne",
        "publicD": "Każdy może przeglądać",
        "moveDown": "Przenieś niżej",
        "moveUp": "Przenieś wyżej",
        "moveSelectedBookmarks": "Przenieś wybrane zakładki",
        "selectAll": "Wybierz wszystkie",
        "supportOnlyUrls": "Linki można zapisać jedynie z protokołem http lub https!",
        "unableToRecognizeSpecifiedLink": "Link nie został rozpoznany!",
        "addTags": "Dodaj tagi",
        "noBookmarks": "Brak zakładek",
        "noBookmarksD": "Przeciągnij i upuść link lub obraz ze strony. Lub kliknij przycisk 'Zapisz stronę\".",
        "alreadyInCollection": "Już w kolekcji",
        "alreadyInCollectionD": "Kliknij, aby edytować opis, tagi i okładkę zakładki",
        "alreadyInCollectionDD": "Edytuj opis, tagi i okładkę",
        "inSocial": "Udostępnij link za pomocą",
        "copyURL": "Kopiuj adres URL",
        "read": "Czytaj",
        "smartBookmarks": "Inteligentne zakładki",
        "signUpEmail": "Zarejestruj się za pomocą poczty E-mail",
        "loginOrRegisterSocial": "Zaloguj lub zarejestruj się przy użyciu sieci społecznościowych",
        "help": "Pomoc",
        "name": "Nazwa",
        "haveIdeas": "Znalazłeś błąd lub masz jakiś pomysł?",
        "followUsOn": "Aby być na bieżąco obserwuj nas na:",
        "writeUs": "Skontaktuj się z nami",
        "forDevelopers": "Dla programistów",
        "importBookmarks": "Importuj zakładki",
        "howToUse": "Jak korzystać?",
        "extension": "Rozszerzenie",
        "animation": "Animacja interfejsu użytkownika",
        "closeOnPageClick": "Zamknij kliknięciem myszki",
        "closeOnPageClickD": "Przeciągnij i upuść nie będzie dostępne",
        "helpContext": "Menu kontekstowe",
        "helpContextD": "Kliknij prawym przyciskiem myszy na zakładkę lub kolekcję aby zobaczyć więcej",
        "helpHotKey": "Skrót klawiaturowy",
        "helpHotKeyD": "Możesz zmienić klawisz na stronie rozszerzeń",
        "helpVisible": "Rozwiń widoczną część strony",
        "helpVisibleD": "Przesuń kursor w lewo i kliknij aby wyświetlić panel",
        "helpBatch": "Zaznaczanie wielu elementów",
        "helpBatchD": "Wybierz zakładki do masowego działania",
        "moreTips": "Pokaż więcej podpowiedzi",
        "view": "Widok",
        "openLinksInNewTab": "Otwieraj linki w nowej karcie",
        "allBookmarks": "Wszystkie zakładki",
        "parent": "Nadrzędna grupa/kolekcja",
        "footerProAd": "Uaktualnij do wersji PRO",
        "footerProAdD": "Dla dodatkowych funkcji",
        "onlyInPro": "Tylko dla użytkowników z kontem PRO",
        "nestedCollections": "Zagnieżdżone kolekcje",
        "dropboxBackup": "Kopia zapasowa Dropbox",
        "goToPRO": "Uaktualnij do wersji PRO",
        "commonSettings": "Wspólne ustawienia",
        "already": "już",
        "addBookmark": "Dodaj zakładkę",
        "addBookmarkD": "Wklej link do strony internetowej, artykułu, obrazu lub filmu",
        "advice": "Porada",
        "addAdvice": "Inne sposoby dodawania zakładek",
        "browserExtension": "Rozszerzenie przeglądarki",
        "androidApp": "Aplikacja Android",
        "androidAppD": "Zapisuj ważne treści z sieci web oraz ulubione aplikacje!",
        "importBookmarksD": "Przenieś zakładki z Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious lub z innych aplikacji do Raindrop.io.",
        "showInDock": "Pokaż w docku",
        "showInTray": "Pokaż w menu",
        "alwaysOnTop": "Okno zawsze na wierzchu",
        "blurHide": "Ukryj okno gdy traci ostrość",
        "desktopNeedRestart": "Uruchom ponownie, aby zastosować ustawienia",
        "refresh": "Odśwież",
        "editProfile": "Edytuj profil",
        "profilePage": "Strona moich kolekcji",
        "upgradeAccount": "Konto PRO",
        "screenshotError": "Strona nie może być przechwycona!",
        "lastWeek": "Ostatnie 7 dni",
        "copyLinkToClipboard": "Kopiuj link do schowka",
        "openInBrowser": "Otwórz w przeglądarce",
        "openInBrowserWithShift": "Aby otworzyć link w przeglądarce, przytrzymaj klawisz Shift lub Ctrl",
        "selectAIconSet": "Wybierz zestaw ikon",
        "sharing": "Udostępnione",
        "members": "Członkowie",
        "enterEmails": "Wpisz e-mail lub e-maile oddzielone przecinkami...",
        "role_member": "Można edytować",
        "role_members": "Można edytować",
        "role_viewer": "Można wyświetlić",
        "role_owner": "Właściciel",
        "privateCollectionURL": "Nie publicznego adresu URL. Kolekcja jest prywatna",
        "inviteMorePeople": "Zaprosić więcej osób",
        "sendInvites": "Wyślij zaproszenia",
        "unshareCollection": "Cofnij udostępnianie kolekcji",
        "withAccessLevel": "Z dostępem",
        "invitesSendTo": "Wyślij zaproszenia do",
        "unshareSuccess": "Kolekcja nieudostępniona",
        "accessViaLink": "Dostęp poprzez link",
        "desktopIntegration": "Integracja z aplikacją Mac OS X",
        "error": "Błąd",
        "tryAgain": "Spróbuj ponownie",
        "moveError": "Nie można przenieść!",
        "dev": "Deweloperzy",
        "article1": "artykuł",
        "article2": "artykuły",
        "article5": "artykuły",
        "image1": "zdjęcie",
        "image2": "zdjęcia",
        "image5": "zdjęcia",
        "video1": "zawartość",
        "video2": "zawartość",
        "video5": "zawartość",
        "link1": "link",
        "link2": "linki",
        "link5": "linki",
        "createNewCollection": "Utwórz kolekcję",
        "toRefreshedRaindrop": "do Raindrop.io",
        "comfortableReading": "Wygodne czytanie",
        "press": "Naciśnij",
        "subscriptionsD": "Twórz oraz obserwuj interesujące kolekcje publiczne.",
        "smartSearchD": "Przy zastosowaniu dowolnych kryteriów, szybko i łatwo.",
        "tagsD": "Inny sposób organizacji Twojej kolekcji.",
        "comfortableReadingD": "Skoncentruj się na czytaniu Twoich ulubionych artykułów w wygodny sposób.",
        "dragNdropD": "Przeciągnij i upuść zakładkę pomiędzy kolekcjami.",
        "exportBookmarksD": "Aby móc przenieść Twoją kolekcję.",
        "followUs": "Obserwuj nas",
        "enterSearchCriteria": "Wprowadź kryteria wyszukiwanie oddzielone przecinkami",
        "enterSearchCriteriaD": "W dowolnej kolejności, sami decydujemy, co musisz wpisać:",
        "explore": "Odkrywaj",
        "exploreCollections": "Przeglądaj kolekcje",
        "staffPicks": "Wybór redakcji",
        "step": "Krok",
        "uploadBookmarksFile": "Prześlij plik zakładek",
        "dropFilesHere": "Lub upuść plik tutaj",
        "importInfo1": "Plik HTML, maksymalny rozmiar 3 mb.",
        "importInfo2": "Możesz pobrać ten plik z przeglądarki lub funkcji \"Eksportuj zakładki\".",
        "importInfo3": "Obsługa Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool lub formatu zakładek Netscape.",
        "loading": "Wczytywanie",
        "noBookmarksToImport": "Brak zakładek!",
        "foldersWithBookmarks": "Foldery",
        "removeIt": "Usuń",
        "startImport": "Rozpocznij importowanie",
        "selectOtherFile": "Wybierz inny plik?",
        "importing": "Importowanie",
        "of": "z",
        "bookmarks": "zakładki",
        "importingInfo1": "Zaczekaj, to może chwilę potrwać ponieważ każda zakładka musi zostać rozpoznana.",
        "importingInfo2": "Nie zamykaj tej karty!",
        "importEnd": "Zakończono importowanie!",
        "importSuccess": "Zaimportowano",
        "importSuccessInfo": "Zalecamy zmianę ustawień wyglądu oraz ikon Twoich kolekcji, publikowaniu ich, dzieleniu się na mediach społecznościowych lub przesyłaniu do znajomych.",
        "importingProcess": "Importowanie zakładek może chwilę potrwać, w zależności od ich liczby! Prosimy o cierpliwość, jak tylko zostaną przetworzone poinformujemy Cię poprzez E-mail!",
        "importingAlready": "Niestety nie ukończyliśmy jeszcze przetwarzania zakładek przesłanych wcześniej! Proszę jeszcze chwilę zaczekać, jak tylko zostaną przetworzone poinformujemy Cię poprzez E-mail.",
        "specifyYourEmail": "Proszę podać adres E-mail w swoim profilu!",
        "staffPicksD": "Ciekawa kolekcja z piękną grafiką",
        "templates": "Szablony",
        "collectionEdit": "Edytuj kolekcję",
        "raindropEdit": "Edytuj zakładkę",
        "icon": "Ikona",
        "selectOtherIcon": "Zmień ikonę...",
        "optional": "Opcjonalne",
        "permamentLink": "Link bezpośredni",
        "backgroundUploadD": "Możesz ustawić tematyczne tło aby wyróżnić kolekcję. Pojawi się ono",
        "onYourCollectionPage": "na stronie kolekcji",
        "removeCollectionForever": "Usuń kolekcję",
        "theseAreTheBest": "Te są najlepsze...",
        "findCollection": "Znajdź kolekcje...",
        "findSubscription": "Znajdź subskrypcję...",
        "more": "Więcej",
        "less": "Mniej",
        "byPopularity": "Po popularności",
        "collectionsSorting": "Sortowanie kolekcji",
        "sortBy": "Sortuj według",
        "custom": "Niestandardowe",
        "byBookmarksCount": "Sortuj po liczbie zakładek",
        "fastFilter": "Szybki filtr...",
        "fastView": "Szybki podgląd",
        "publicPage": "Strona publiczna",
        "welcomeSlide1D": "Zapisuj ważne linki, artykuły, obrazki, filmy czy prezentacje",
        "welcomeSlide1DD": "i organizuje je w kolekcje.",
        "welcomeSlide1DDD": "Twoje zakładki są dostępne z komputera i smartphona.",
        "welcomeSlide2": "Zainstaluj rozszerzenie",
        "welcomeSlide2D": "Najprostszy i najszybszy sposób",
        "welcomeSlide2DD": "aby zapisywać ważne rzeczy z internetu.",
        "next": "Dalej",
        "startCollecting": "Koniec!",
        "extensionFor": "Rozszerzenie dla",
        "welcomeMobileSlide2": "Zawsze z Tobą",
        "sourceCode": "Kod źródłowy",
        "sourceCodeD": "Kod źródłowy naszego rozszerzenia do przeglądarki na",
        "sourceCodeDD": "repozytorium GitHub.",
        "apiD": "Wkrótce.",
        "importFrom": "Importuj z",
        "openCollection": "Otwórz kolekcję",
        "articlesProccessing": "Pełny tekst artykułów zostanie przesłany później.",
        "favoriteSites": "Ulubione witryny",
        "showAll": "Pokaż wszystkie",
        "showAllBookmarks": "Pokaż wszystkie zakładki",
        "youHave": "Masz",
        "fillCollectionInput": "Proszę wybrać kolekcję!",
        "browserBookmarklet": "Skryptozakładka przeglądarki",
        "browserBookmarkletD": "Nie ma tu Twojej przeglądarki? Wypróbuj skryptozakładkę.",
        "browserBookmarkletDD": "Przesuń ten link na pasek Twoich zakładek",
        "browserBookmarkletDDD": "Zapisz w kolekcji",
        "hi": "Cześć",
        "noTags": "Brak tagów",
        "interest_video": "Video",
        "interest_hobbies": "Hobby",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiracje",
        "interest_food_drink": "Kulinaria",
        "interest_animals": "Zwierzęta",
        "interest_health_fitness": "Zdrowie i uroda",
        "interest_illustrations": "Ilustracje",
        "interest_developers": "Dla programistów",
        "interest_art": "Sztuka",
        "interest_history": "Historia",
        "interest_pictures": "Obrazki",
        "interest_film_music_books": "Filmy, muzyka i książki",
        "interest_cars_motorcycles": "Motoryzacja",
        "interest_fashion": "Moda",
        "interest_science": "Nauka",
        "interest_news": "Wiadomości",
        "interest_education": "Edukacja",
        "interest_psychology": "Psychologia",
        "interest_travel": "Podróże",
        "interest_nature": "Natura",
        "interest_work": "Praca",
        "interest_sites": "Stron",
        "interest_diy": "DIY",
        "interest_sport": "Sport",
        "interest_technology": "Technologia",
        "interest_products": "Produkty",
        "interest_sweet_home": "Dom",
        "interest_photography": "Fotografia",
        "interest_humor": "Rozrywka",
        "interest_erotic": "Erotyka",
        "interest_other": "Inne",
        "interest_food_drink_recipes": "Przepisy kulinarne",
        "interest_film_music_books_films": "Filmy",
        "interest_film_music_books_music": "Muzyka",
        "interest_film_music_books_books": "Książki",
        "interest_psychology_relations": "Relacje",
        "interest_psychology_self_development": "Samorozwój",
        "interest_technology_gadgets": "Gadżety",
        "interest_technology_games": "Gry",
        "interest_technology_geeks": "Geek",
        "interest_technology_applications": "Aplikacje",
        "interest_developers_web": "Web development",
        "interest_developers_mobile": "Mobile development",
        "to": "do",
        "inCollection": "w kolekcji",
        "dragCollections": "Zmień kolejność w kolekcji poprzez przeciąganie.",
        "feedAllCollections": "Kanał RSS wszystkich kolekcji",
        "orAlternativeFeed": "Wszystkie zakładki",
        "feedWarning": "Ostrzeżenie! Nie dziel się unikatowym adresem URL swojej subskrypcji RSS z innymi osobami, gdyż będą oni mogli zobaczyć Twoje zakładki!",
        "publicRSSfeed": "Publiczny kanał RSS",
        "showPrivateRSSfeed": "Pokaż prywatny kanał RSS",
        "privateRSSfeed": "Prywatny kanał RSS",
        "mailNotifications": "Powiadomienia e-mail",
        "disableWeeklyDigest": "Wyłącz tygodniowy przegląd zakładek",
        "trashEmpty": "Kosz pusty",
        "forOtherBrowsers": "Dla innych przeglądarek",
        "saveLink": "Zapisz stronę",
        "instruction": "Instrukcja",
        "install": "Zainstaluj",
        "importDescription": "Przenieś zakładki z Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious lub z innych aplikacji do Raindrop.io.",
        "createSubFolder": "Stwórz zagnieżdżoną kolekcję",
        "pro_nesting": "Zagnieżdżone kolekcje",
        "pro_nestingD": "Stwórz dowolną liczbę zagnieżdżonych kolekcji.",
        "pro_dropbox": "Kopia zapasowa Dropbox",
        "pro_dropboxD": "Zapisuj kopię zapasową swoich zakładek na koncie Dropbox.",
        "pro_support": "Specjalne wsparcie",
        "pro_supportD": "Przez email lub skype.",
        "pro_nextFeatures": "Głosuj na nowe funkcjonalności",
        "pro_nextFeaturesD": "Wspieraj rozwój nowych rozwiązań!",
        "month": "miesiąc",
        "year": "rok",
        "oneMonth": "Jeden miesiąc",
        "threeMonth": "3 miesiące",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Przejdź na wersję Pro",
        "renewPro": "Odnów subskrypcję PRO",
        "renewPromonth": "Odnów subskrypcję PRO na miesiąc",
        "renewProyear": "Odnów subskrypcję PRO na rok",
        "proTitle": "Używaj Raindrop.io za darmo",
        "proTitleD": "lub odblokuj",
        "proTitleDD": "dodatkowe funkcje.",
        "pro_noAds": "Brak reklam",
        "pro_noAdsD": "",
        "pro_speed_dial": "Nowa strona kart",
        "pro_apple": "Aplikacja iPhone/iPad",
        "pro_desktop": "Aplikacja desktopowa (z synchronizacją)",
        "pro_smart_collections": "Inteligentne kolekcje (auto zapis)",
        "yesIwant": "Tak, chcę to!",
        "votes": "głos",
        "votes1": "głos",
        "votes2": "głosy",
        "votes5": "głosy",
        "whatAddNext": "Co następnego powinniśmy dodać?",
        "newString": "Nowy",
        "newBookmark": "Nowa zakładka",
        "thankYou": "Dziękujemy!",
        "nowYouHave": "Teraz masz",
        "account": "konto",
        "goHome": "Przejdź na główną",
        "until": "aż do",
        "goToPayment": "Przejdź do płatności",
        "subscriptionPeriod": "Okres",
        "paymentMethod": "Metody płatności",
        "pricing": "Cennik",
        "visualBookmarks": "Zakładki wizualne",
        "readItLater": "Przeczytaj później",
        "pro_notes": "Notatki",
        "sslConnection": "Bezpieczne połączenia SSL",
        "browserPlugin": "Rozszerzenie przeglądarki",
        "features": "Funkcje",
        "free": "Darmowe",
        "removeAccount": "Usuwanie konta",
        "removeAccountD": "Zamknąć konto i usunąć wszystkie kolekcje, zakładki i dane?",
        "areYouSure": "Jesteś pewien?",
        "compareFreePro": "Porównaj konto darmowe i PRO",
        "shareLinkVia": "Udostępnij link za pomocą",
        "changeAvatarInfo": "Możesz zmienić awatar połączony z Twoim adresem E-mail na Gravatar.com. (Twój Gravatar jest obrazkiem, który podąża obok Twojego imienia po różnych witrynach kiedy coś komentujesz lub piszesz na blogu)",
        "changeAvatar": "Zmień avatar",
        "browserExtensionD": "Dostęp do kolekcji przez jedno kliknięcie na zakładkę przeglądarki",
        "macApp": "Aplikacja na Mac OS X",
        "macAppD": "Organizuj zawartość i czytaj artykuły z Twojego komputera Mac",
        "macAppV": "Mac OS X (10.8.0 lub nowszy)",
        "androidAppV": "Android telefon lub tablet (4.0 lub nowszy)",
        "appleEditorsChoise": "Apple / wybór redakcji",
        "operaEditorsChoise": "Zalecane przez Opera",
        "downloadTitle": "Trzymaj swoje zakładki zawsze pod ręką",
        "sharedCollections": "Udostępniane kolekcje",
        "serverCollaboratorsIncorrectToken": "Nie można zostać członkiem tej kolekcji. Nieprawidłowy adres URL. Poproś autora kolekcji o ponowne zaproszenie.",
        "serverCollaboratorsAlready": "Już jesteś członkiem tej kolekcji!",
        "joinCollaboratorsSuccess": "Sukces! Zostałeś członkiem kolekcji.",
        "memberD": "Teraz możesz dodawać i edytować zakładki, tworzyć zagnieżdżone kolekcje oraz zapraszać nowych członków.",
        "viewerD": "Możesz wyświetlać zakładki tylko w tej kolekcji.",
        "savePage": "Zapisz stronę do Raindrop.io",
        "saveToInbox": "Zapisz do skrzynki odbiorczej (Raindrop.io)",
        "saveImage": "Zapisz obraz do Raindrop.io",
        "myBookmarks": "Moje zakładki",
        "appName": "Raindrop.io - Inteligentne Zakładki",
        "appDesc": "Zapamiętywanie ważnych rzeczy w atrakcyjny sposób.",
        "firstRun": "Aby zacząć używać Raindrop.io musisz tylko odświeżyć aktualną stronę i kliknąć ponownie.",
        "refreshPage": "Odśwież bieżącą stronę",
        "support": "Wsparcie",
        "afterUpdateTitle": "Rozszerzenie zostało zaktualizowane",
        "afterUpdate": "Wprowadziliśmy kilka nowych funkcji, ulepszeń oraz poprawek błędów. Chciałbyś zobaczyć, co jest nowego w tej wersji?",
        "seeChangeLog": "Czytaj więcej..."
    },
    "tr_TR": {
        "server": "Tanımlanamayan hata. Tekrar deneyin!",
        "serverundefined": "Tanımlanamayan hata. Tekrar deneyin!",
        "server0": "Eski şifreni gir!",
        "server1": "E-mail geçerli değil!",
        "server2": "İsmini gir!",
        "server3": "Eski parola yanlış!",
        "server4": "Şifre yanlış!",
        "server5": "E-posta zaten kullanımda!",
        "server6": "Başlık girin!",
        "server7": "Yanlış E-posta ve/veya şifre kombinasyonu!",
        "serverincorrect url": "Hatalı URL",
        "collection": "Koleksiyon",
        "collectionNew": "Yeni Koleksiyon",
        "collectionDeleteConfirm": "Bu koleksiyonu silmek istediğine emin misin? Koleksiyonun içindeki tüm yer imleri de silinecek!",
        "saveChanges": "Değişiklikleri kaydet",
        "saveError": "Kaydetme hatası!",
        "saveSuccess": "Başarıyla kaydedildi!",
        "saved": "kaydedildi",
        "addSuccess": "Başarıyla eklendi!",
        "moveSuccess": "Yer imleri başarıyla taşındı!",
        "removeSuccess": "Başarıyla kaldırıldı!",
        "coverUpload": "Kapak fotoğrafı yükle",
        "fileUploadUnable": "Bu dosya yüklenemez!",
        "fileUploadError": "Dosya yükleme hatası. Başka bir dosya dene!",
        "linkNotRecognized": "Bağlantı tanımlanamadı",
        "permalink": "Kalıcı bağlantı:",
        "profile": "Profil",
        "signIn": "Giriş",
        "myCollections": "Koleksiyonlarım",
        "save": "Kaydet",
        "remove": "Sil",
        "elements": "yer imi",
        "about": "Hakkımızda",
        "blog": "Blog",
        "tools": "Araçlar",
        "signInSocial": "Giriş yap:",
        "signUpSocial": "Kaydol:",
        "signUp": "Kayıt ol",
        "register": "Kayıt ol",
        "recoverPassword": "Şifre sıfırlama",
        "password": "Şifre",
        "edit": "Düzenle",
        "editMin": "Düzenle",
        "collectionEmpty": "Koleksiyon boş",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Öner",
        "installExtension": "Eklentiyi yükle",
        "extensionDescription": "Web üzerinde en hızlı ve verimli şekilde bilgi derleme şekli.",
        "enterLink": "Bağlantı gir",
        "enterLinkDescription": "Herhangi bir web sayfası, makale, fotoğraf yada video bağlantısı gir. Artık ne istiyorsan.",
        "backToCollection": "Koleksiyona dön",
        "viewOn": "Görüntüle",
        "articled": "makale",
        "imaged": "fotoğraf",
        "videod": "içerik",
        "linkd": "bağlantı",
        "article": "Makale",
        "image": "Fotoğraf",
        "video": "İçerik",
        "link": "Bağlantı",
        "articles": "Makaleler",
        "images": "Fotoğraflar",
        "videos": "İçerik",
        "links": "Bağlantılar",
        "articleSaved": "Makale kaydedildi",
        "imageSaved": "Fotoğraf kaydedildi",
        "videoSaved": "İçerik kaydedildi",
        "linkSaved": "Bağlantı kaydedildi",
        "articleRemoved": "Makale çöp kutusuna taşındı",
        "imageRemoved": "Fotoğraf çöp kutusuna taşındı",
        "videoRemoved": "İçerik çöp kutusuna taşındı",
        "linkRemoved": "Bağlantı çöp kutusuna taşındı",
        "articleRemovedPermament": "Makale kaldırıldı",
        "imageRemovedPermament": "Fotoğraf kaldırıldı",
        "videoRemovedPermament": "İçerik kaldırıldı",
        "linkRemovedPermament": "Bağlantı kaldırıldı",
        "bookmarksRemoved": "Yer imleri çöp kutusuna taşındı",
        "bookmarksRemovedPermament": "Yer imleri kaldırıldı",
        "other": "diğer",
        "vkontakte": "Vkontakte",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "da",
        "basicData": "Hesap ayarları",
        "yourName": "Adın",
        "changePassword": "Şifre değiştir",
        "newPassword": "Yeni şifre",
        "currentPassword": "Mevcut şifre",
        "findBookmarkLong": "Yer imi ara...",
        "nothingFound": "Birşey bulunamadı",
        "add": "Ekle",
        "cancel": "İptal",
        "covers": "Kapaklar",
        "upload": "Yükle",
        "imagesOnly": "Sadece resim. En fazla 5mb boyutunda.",
        "uploadProgress": "Yükleniyor...",
        "fontFamily": "Yazı tipi",
        "fontSize": "Yazı boyutu",
        "interfaceStyle": "Arayüz stili",
        "additional": "Ek",
        "fixedWidth": "Sabit genişlik",
        "logOut": "Çıkış",
        "titleAndDescription": "Başlık & açıklama",
        "title": "Başlık",
        "description": "Açıklama",
        "enterTitle": "Başlık gir",
        "enterDescription": "Açıklama gir",
        "enable": "Etkin",
        "type": "Tür",
        "publicCollection": "Genel koleksiyon",
        "shareCollection": "Koleksiyonu paylaş",
        "sendEmail": "E-posta gönder",
        "copyLink": "Bağlantı kopyala",
        "language": "Dil",
        "iHaveAccount": "Zaten bir hesabım var",
        "createFirstCollection": "İlk koleksiyonunu kur",
        "checkYourEmail": "Gelen kutunu kontrol et!",
        "und": "&",
        "from": "Kaynak:",
        "passwordChangeSuccess": "Şifre başarıyla değiştirildi!",
        "smartSearch": "Akıllı arama",
        "subscribe": "Takip et",
        "youSubscribed": "Takip ediliyor",
        "subscriptions": "Takip ediliyor",
        "subscriptionsCollection": "Koleksiyonları takip et",
        "tags": "Etiketler",
        "addTag": "Bir etiket ekle",
        "noDescription": "Açıklama yok",
        "basic": "Temel",
        "background": "Arka plan",
        "removeBackground": "Arka planı kaldır",
        "or": "ya da",
        "noCollections": "Koleksiyon yok",
        "noSubscriptions": "Abonelik yok",
        "welcome": "Şununla koleksiyon yap:",
        "publicCollections": "Genel koleksiyonlar",
        "collectionsCount": "koleksiyonlar",
        "noPublicCollections": "Genel koleksiyon yok",
        "noPublicCollectionsD": "Bu kullanıcı koleksiyonunu gizli tutuyor veya henüz bir koleksiyon oluşturmadı.",
        "all": "Tümü",
        "mobileApp": "Mobil Uygulama",
        "exportBookmarks": "Yer imlerini dışa aktar",
        "cover": "Kapak",
        "saveToCollection": "Koleksiyona kaydet",
        "selectCollection": "Koleksiyon seç",
        "myAccount": "Hesabım",
        "enterTitleAndCollection": "Başlık ve koleksiyon girin",
        "selectPreferedType": "Tercih şeklini seçin",
        "back": "Geri",
        "bySort": "Sıralı",
        "byName": "Ada göre",
        "byDate": "Tarihe göre",
        "findOrCreateCollection": "Koleksiyonu bul veya yeni oluştur",
        "createCollection": "Yeni koleksiyon",
        "createCollectionFirst": "İlk koleksiyonunu oluştur...",
        "createCollectionOrDrag": "Oluştur yada koleksiyonu sürükle...",
        "createGroup": "Grup oluştur",
        "startToSave": "Başlamak için lütfen giriş yapın!",
        "checkAgain": "Tekrar kontrol et!",
        "clickToMakeScreenshot": "Ekran görüntüsü için tıkla",
        "elements1": "yer imi",
        "elements2": "yer imleri",
        "elements5": "yer imleri",
        "defaultCollection-0": "Ara",
        "defaultCollection--1": "Gelen kutusu",
        "defaultCollection--99": "Çöp kutusu",
        "byTitle": "Alfabetik",
        "saveBookmark": "Buraya kaydet",
        "saveBookmarkInInbox": "Gelen kutusu'na kaydet",
        "sites": "Siteler",
        "in": "içinde",
        "settings": "Ayarlar",
        "removeCollectionSuccess": "Koleksiyon kaldırıldı",
        "changeIcon": "Simge değiştir",
        "group": "Grup",
        "untitled": "Başlıksız",
        "removeGroupError": "Boş olmayan grubu silemezsin!",
        "select": "Seç",
        "create": "Oluştur",
        "privacy": "Gizlilik",
        "private": "Özel",
        "privateD": "Sadece sen görebilirsin",
        "public": "Genel",
        "publicD": "Herkes görebilir",
        "moveDown": "Aşağı taşı",
        "moveUp": "Yukarı taşı",
        "moveSelectedBookmarks": "Seçili yer imlerini taşı",
        "selectAll": "Tümünü seç",
        "supportOnlyUrls": "Sadece http ve https protokollü bağlantıları kaydedebilirsin!",
        "unableToRecognizeSpecifiedLink": "Belirtilen bağlantı tanınamadı!",
        "addTags": "Etiket ekle",
        "noBookmarks": "Yer imi yok",
        "noBookmarksD": "Sayfadan resim veya bağlantıyı sürükle ve bırak. Ya da 'Sayfa kaydet' 'e tıkla.",
        "alreadyInCollection": "Zaten bir koleksyonda",
        "alreadyInCollectionD": "Açıklamayı, etiketleri ve yer imi kapağını düzenlemek için tıklayın",
        "alreadyInCollectionDD": "Açıklamayı, etiketleri ve kapağı düzenle",
        "inSocial": "Bağlantıyı paylaş:",
        "copyURL": "URL'yi kopyala",
        "read": "Oku",
        "smartBookmarks": "Akıllı Yer imleri",
        "signUpEmail": "E-posta ile Kaydol",
        "loginOrRegisterSocial": "Sosyal ağı kullanarak Giriş yap veya Kaydol",
        "help": "Yardım",
        "name": "Ad",
        "haveIdeas": "Fikir yada hata mı buldun?",
        "followUsOn": "Haberler ve güncellemeler için bizi takip edin:",
        "writeUs": "Bizimle iletişime geç",
        "forDevelopers": "Geliştiriciler içindir",
        "importBookmarks": "Yer imlerini içe aktar",
        "howToUse": "Nasıl kulanırım?",
        "extension": "Uzantı",
        "animation": "UI animasyonu",
        "closeOnPageClick": "Sayfa tıklamasında kapat",
        "closeOnPageClickD": "Sürükle ve bırak kullanılmaz olacak",
        "helpContext": "Durum menüsü",
        "helpContextD": "Daha fazla işlem için yer imlerine veya koleksiyona fare sağ tuşu ile tıklayın",
        "helpHotKey": "Kısayol",
        "helpHotKeyD": "Uzantılar sayfasından tuşları değiştirebilirsiniz",
        "helpVisible": "Sayfanın görülebilir kısmını genişlet",
        "helpVisibleD": "İmleci sola sürükleyin ve görünen panele tıklayın",
        "helpBatch": "Çoklu seçim",
        "helpBatchD": "Toplu işlemler için yer imlerini seçin",
        "moreTips": "Daha fazla ipucu",
        "view": "İncele",
        "openLinksInNewTab": "Yeni sekmede aç",
        "allBookmarks": "Tüm yer imleri",
        "parent": "Üst grup/koleksiyon",
        "footerProAd": "PRO sürümüne yükselt",
        "footerProAdD": "ekstra özellikler için",
        "onlyInPro": "PRO hesap gerekli",
        "nestedCollections": "İç içe yığınlar",
        "dropboxBackup": "Drobox yedekleme",
        "goToPRO": "PRO sürümüne yükselt",
        "commonSettings": "Genel ayarlar",
        "already": "mevcut",
        "addBookmark": "Yer imi ekle",
        "addBookmarkD": "Herhangi bir sayfa, yazı, resim veya video bağlantısını yapıştır",
        "advice": "Öneri",
        "addAdvice": "Yer işareti eklemenin diğer yolları",
        "browserExtension": "Tarayıcı uzantısı",
        "androidApp": "Android uygulaması",
        "androidAppD": "İnternet & favori uygulamalardan önemli içerikleri kaydet!",
        "importBookmarksD": "Raindrop.io için Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious veya diğer servislerden yer imlerini aktar.",
        "showInDock": "Havuzda görüntüle",
        "showInTray": "Menü çubuğunda göster",
        "alwaysOnTop": "Pencere her zaman üstte",
        "blurHide": "Odaklanma kaybolursa pencereyi gizle",
        "desktopNeedRestart": "Ayarların uygulanması için uygulamayı açıp kapatın",
        "refresh": "Yenile",
        "editProfile": "Profili düzenle",
        "profilePage": "Koleksiyon sayfam",
        "upgradeAccount": "PRO hesap",
        "screenshotError": "Web sayfası yakalanamaz!",
        "lastWeek": "Son 7 gün",
        "copyLinkToClipboard": "Panoya kopyala",
        "openInBrowser": "Tarayıcıda aç",
        "openInBrowserWithShift": "Bağlantıyı tarayıcıda açmak için Ctrl veya Shift tuşunu basılı tutun",
        "selectAIconSet": "Simge seti seçin",
        "sharing": "Paylaşım",
        "members": "Üyeler",
        "enterEmails": "E-posta adresi girin veya virgülle e-posta adreslerini ayırın...",
        "role_member": "Düzenlenebilir",
        "role_members": "Düzenlenebilir",
        "role_viewer": "Görüntülenebilir",
        "role_owner": "Sahip",
        "privateCollectionURL": "Açık URL yok.Koleksiyon gizli",
        "inviteMorePeople": "Daha fazla kişi davet et",
        "sendInvites": "Davet Gönder",
        "unshareCollection": "Paylaşılmayan koleksiyon",
        "withAccessLevel": "Erişim düzeyi ile",
        "invitesSendTo": "Davet gönder",
        "unshareSuccess": "Koleksiyon paylaşılmadı",
        "accessViaLink": "Bağlantı ile erişin",
        "desktopIntegration": "Mac OS X uygulaması ile bütünleşme",
        "error": "Hata",
        "tryAgain": "Tekrar dene",
        "moveError": "Taşınamaz!",
        "dev": "Geliştiriciler",
        "article1": "makale",
        "article2": "Makaleler",
        "article5": "Makaleler",
        "image1": "fotoğraf",
        "image2": "Fotoğraflar",
        "image5": "Fotoğraflar",
        "video1": "içerik",
        "video2": "içindekiler",
        "video5": "içindekiler",
        "link1": "bağlantı",
        "link2": "Bağlantılar",
        "link5": "Bağlantılar",
        "createNewCollection": "Koleksiyon oluştur",
        "toRefreshedRaindrop": "Raindrop.io'ya",
        "comfortableReading": "Rahat okuma",
        "press": "Basın",
        "subscriptionsD": "İlginç açık koleksiyonlar oluşturun veya takip edin",
        "smartSearchD": "Tüm ölçütlere göre hızlı ve kolayca.",
        "tagsD": "Koleksiyonunuzu düzenlemek için başka bir yol.",
        "comfortableReadingD": "Kolay yolla favori yazılarınızı okumaya odaklanın.",
        "dragNdropD": "Yer imlerinizi koleksiyonlar arasında sürükleyip bırakın.",
        "exportBookmarksD": "Koleksiyonunuzu aktarabilmek için.",
        "followUs": "Takip edin",
        "enterSearchCriteria": "Arama ölçütlerini virgüllerle ayırarak girin",
        "enterSearchCriteriaD": "Herhangi bir sırayla, ne gireceğinizi belirleyelim:",
        "explore": "Keşfet",
        "exploreCollections": "Koleksiyonları keşfedin",
        "staffPicks": "Editörün Seçimi",
        "step": "Adım",
        "uploadBookmarksFile": "Yer imi dosyalarını yükleyin",
        "dropFilesHere": "Ya da dosyayı buraya bırakın",
        "importInfo1": "HTML dosyası en fazla 3 mb olabilir.",
        "importInfo2": "Bu dosyayı tarayıcından veya hizmetteki \"Yer imlerini dışarı aktar\" bölümünden yakalayabilirsin.",
        "importInfo3": "Desteklenen Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool veya Netscape yer imi dosya tipleri.",
        "loading": "Yükleniyor",
        "noBookmarksToImport": "Yer imi yok!",
        "foldersWithBookmarks": "Dosyalar",
        "removeIt": "Sil",
        "startImport": "Veri almayı başlat",
        "selectOtherFile": "Başka bir dosya seçilsin mi?",
        "importing": "İçe aktarılıyor",
        "of": "Kapalı",
        "bookmarks": "yer imleri",
        "importingInfo1": "Bazen beklenebilir, çünkü her yer imi ayırt edilebilir.",
        "importingInfo2": "Bu sekme kapatmayın!",
        "importEnd": "Alma işlemi tamamlandı!",
        "importSuccess": "Başarıyla alındı",
        "importSuccessInfo": "Koleksiyonunuzun ikonlarını ve görünümünü özelleştirmenizi hatta onları sosyal ağlarda veya arkadaşlarınızla paylaşmanızı da öneririz.",
        "importingProcess": "Yer imlerini almak sayılarına bağlı olarak uzun sürebilir! Lütfen işlem yapılana kadar sabırlı olun, sizi özel bir e-posta ile bilgilendireceğiz!",
        "importingAlready": "Ne yazık ki yer imlerinizi daha erken aktarmayı bitiremedik. Lütfen biraz daha bekleyin, sizi özel bir e-mail ile bilgilendireceğiz.",
        "specifyYourEmail": "Lütfen e-postanızı profilinizde belirtin!",
        "staffPicksD": "Güzel bir tasarımla ilginç bir koleksiyon",
        "templates": "Şablonlar",
        "collectionEdit": "Koleksiyonu düzenle",
        "raindropEdit": "Yer imini düzenle",
        "icon": "Simge",
        "selectOtherIcon": "Simgeyi değiştir...",
        "optional": "İsteğe bağlı",
        "permamentLink": "Kalıcı bağlantı",
        "backgroundUploadD": "Koleksiyonunuzu özelleştirmek için konulu bir arka plan yükleyebilirsiniz. Görünecektir",
        "onYourCollectionPage": "koleksiyon sayfasında",
        "removeCollectionForever": "Koleksiyonu sil",
        "theseAreTheBest": "En iyileri...",
        "findCollection": "Koleksiyon ara...",
        "findSubscription": "Abone ara...",
        "more": "Daha fazla",
        "less": "Daha az",
        "byPopularity": "Popülariteye göre",
        "collectionsSorting": "Koleksiyon sıralama",
        "sortBy": "Sıralama ölçütü",
        "custom": "Özel",
        "byBookmarksCount": "Yer işaretleri sayısına göre",
        "fastFilter": "Hızlı filtreleme...",
        "fastView": "Yer imlerini hızlı görme",
        "publicPage": "Açık sayfanız",
        "welcomeSlide1D": "Önemli bağlantılar, makaleler, fotoğraflar, videolar, sunumları kaydedin",
        "welcomeSlide1DD": "& onları konulu koleksiyonlar içinde düzenleyin.",
        "welcomeSlide1DDD": "Yer imleriniz bilgisayarınızdan ve telefonunuzdan kullanılabilir.",
        "welcomeSlide2": "Uzantımızı indirin",
        "welcomeSlide2D": "Kolay, basit ve hızlı yolu",
        "welcomeSlide2DD": "Web'deki önemli şeyleri kaydetmek için.",
        "next": "İleri",
        "startCollecting": "Bitti!",
        "extensionFor": "Eklenti: ",
        "welcomeMobileSlide2": "Daima sizinle",
        "sourceCode": "Kaynak kodu",
        "sourceCodeD": "Tarayıcı uzantımızın kaynak kodları",
        "sourceCodeDD": "Github deposunda.",
        "apiD": "Yakında.",
        "importFrom": "İçe aktar: ",
        "openCollection": "Koleksiyon aç",
        "articlesProccessing": "Tam metin makaleleri daha sonra yüklenecektir.",
        "favoriteSites": "Favori siteler",
        "showAll": "Tümünü göster",
        "showAllBookmarks": "Tüm yer imlerini göster",
        "youHave": "Sahipsiniz",
        "fillCollectionInput": "Lütfen koleksiyonu seçiniz!",
        "browserBookmarklet": "Tarayıcı yer işareti",
        "browserBookmarkletD": "Tarayıcınızda bir şey yok mu? Tarayıcı yer imini deneyin.",
        "browserBookmarkletDD": "Bu bağlantıyı yer imi çubuğuna sürükleyin",
        "browserBookmarkletDDD": "Koleksiyona kaydet",
        "hi": "Merhaba",
        "noTags": "Etiketsiz",
        "interest_video": "Video",
        "interest_hobbies": "Hobiler",
        "interest_design": "Tasarım",
        "interest_design_inspiration": "İlham",
        "interest_food_drink": "Yemek & içecek",
        "interest_animals": "Hayvanlar",
        "interest_health_fitness": "Sağlık & formda kalma",
        "interest_illustrations": "İllüstrasyonlar",
        "interest_developers": "Geliştiriciler İçin",
        "interest_art": "Sanat",
        "interest_history": "Tarih",
        "interest_pictures": "Resimler",
        "interest_film_music_books": "Filmler, müzikler & kitaplar",
        "interest_cars_motorcycles": "Arabalar & motosikletler",
        "interest_fashion": "Moda",
        "interest_science": "Bilim",
        "interest_news": "Haberler",
        "interest_education": "Eğitim",
        "interest_psychology": "Psikoloji",
        "interest_travel": "Seyehat",
        "interest_nature": "Doğa",
        "interest_work": "İş",
        "interest_sites": "Siteler",
        "interest_diy": "Kendin yap",
        "interest_sport": "Spor",
        "interest_technology": "Teknoloji",
        "interest_products": "Ürünler",
        "interest_sweet_home": "Güzel evim",
        "interest_photography": "Fotoğrafçılık",
        "interest_humor": "Mizah",
        "interest_erotic": "Erotik",
        "interest_other": "Diğer",
        "interest_food_drink_recipes": "Yemek tarifleri",
        "interest_film_music_books_films": "Filmler",
        "interest_film_music_books_music": "Müzik",
        "interest_film_music_books_books": "Kitaplar",
        "interest_psychology_relations": "İlişkiler",
        "interest_psychology_self_development": "Kişisel gelişim",
        "interest_technology_gadgets": "Gadgetlar",
        "interest_technology_games": "Oyunlar",
        "interest_technology_geeks": "İnek tipler",
        "interest_technology_applications": "Uygulamalar",
        "interest_developers_web": "Web geliştirme",
        "interest_developers_mobile": "Mobil geliştirme",
        "to": "hedef",
        "inCollection": "Koleksiyonda",
        "dragCollections": "'Sürükle ve bırak' la koleksiyonları değiştir.",
        "feedAllCollections": "Tüm koleksiyonlar RSS beslemesi",
        "orAlternativeFeed": "Tüm yer imleri",
        "feedWarning": "Uyarı! RSS imzalarınızın benzersiz URL'lerini diğer kişilerle paylaşmayın, kişiler sizin imlerinizi görüntüleyebilirler!",
        "publicRSSfeed": "Herkese açık RSS beslemesi",
        "showPrivateRSSfeed": "Özel RSS beslemesini görüntüle",
        "privateRSSfeed": "Özel RSS beslemesi",
        "mailNotifications": "E-posta bildirimleri",
        "disableWeeklyDigest": "Yer imleri haftalık yayınını devre dışı bırak",
        "trashEmpty": "Çöp kutusu boş",
        "forOtherBrowsers": "Diğer tarayıcılar için",
        "saveLink": "Sayfayı kaydet",
        "instruction": "Talimat",
        "install": "Kur",
        "importDescription": "Raindrop.io için Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious veya diğer servislerden yer imlerini aktar.",
        "createSubFolder": "İç-içe koleksiyon oluştur",
        "pro_nesting": "İç içe yığınlar",
        "pro_nestingD": "Çok sayıda iç içe koleksiyonlar oluşturun.",
        "pro_dropbox": "Drobox yedekleme",
        "pro_dropboxD": "Yer imlerini ve içeriği Dropbox hesabına yedekle.",
        "pro_support": "Öncelikli destek",
        "pro_supportD": "E-Posta veya Skype tarafından.",
        "pro_nextFeatures": "Gelecek özellikler için oyla",
        "pro_nextFeaturesD": "Yaklaşan özelliklerin geliştirilmesine destek!",
        "month": "ay",
        "year": "yıl",
        "oneMonth": "1 ay",
        "threeMonth": "3 ay",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Pro'ya yükselt",
        "renewPro": "PRO aboneliğini yenile",
        "renewPromonth": "PRO aboneliği bir ay için yenile",
        "renewProyear": "PRO aboneliği bir yıl için yenile",
        "proTitle": "Raindrop.io 'yu bedava kullan",
        "proTitleD": "veya güncellemek için",
        "proTitleDD": "ekstra özellikler.",
        "pro_noAds": "Ücretsiz reklamlar",
        "pro_noAdsD": "",
        "pro_speed_dial": "Yeni Sekme",
        "pro_apple": "iPhone/iPad uygulaması",
        "pro_desktop": "Masaüstü uygulaması (senkronizasyon ile)",
        "pro_smart_collections": "Akıllı koleksiyonlar (oto kayıt)",
        "yesIwant": "Evet, İstiyorum!",
        "votes": "Oy ver",
        "votes1": "Oy ver",
        "votes2": "oylar",
        "votes5": "oylar",
        "whatAddNext": "Bir dahakine ne eklemeliyiz?",
        "newString": "Yeni",
        "newBookmark": "Yeni yer imi",
        "thankYou": "Teşekkürler!",
        "nowYouHave": "Şimdi bir",
        "account": "hesap",
        "goHome": "Ana sayfaya git",
        "until": "kadar",
        "goToPayment": "Ödeme yap",
        "subscriptionPeriod": "Periyot",
        "paymentMethod": "Ödeme seçenekleri",
        "pricing": "Ücretlendirme",
        "visualBookmarks": "Görsel yer imleri",
        "readItLater": "Daha sonra oku",
        "pro_notes": "Notlar",
        "sslConnection": "SSL güvenli bağlantı",
        "browserPlugin": "Tarayıcı uzantısı",
        "features": "Özellikler",
        "free": "Ücretsiz",
        "removeAccount": "Hesabı sil",
        "removeAccountD": "Hesap kapatılsın ve bütün koleksiyonlar, imler ve veri silinsin mi ?",
        "areYouSure": "Emin misiniz?",
        "compareFreePro": "Ücretsiz ve PRO hesap karşılaştırması",
        "shareLinkVia": "Bağlantıyı paylaş:",
        "changeAvatarInfo": "Avatarınızı ilişkili e-posta adresiniz ile Gravatar.com üzerinden değiştirebilirsiniz. (Gravatar siteden siteye aynı blog üzerinde  yorum veya gönderi paylaştığınızda isminizin yanında gözüken bir resimdir)",
        "changeAvatar": "Avatar değiştir",
        "browserExtensionD": "Herhangi bir tarayıcı sekmesinden bir tıkla koleksiyonlara eriş",
        "macApp": "Mac OS X Uygulaması",
        "macAppD": "Mac'inizden içeriği düzenleyin ve makaleleri okuyun",
        "macAppV": "Mac OS X (10.8.0 veya daha üstü)",
        "androidAppV": "Android telefon veya tablet (4.0 veya daha üstü)",
        "appleEditorsChoise": "Apple / Editör'ün Seçimi",
        "operaEditorsChoise": "Opera tarafından destekleniyor",
        "downloadTitle": "Yer imlerinizi pratik bir şekilde bulundurun",
        "sharedCollections": "Paylaşılan koleksiyonlar",
        "serverCollaboratorsIncorrectToken": "Koleksiyonun üyesi olabilmek imkansız. Geçersiz URL. Koleksiyonun yaratıcısına davet edilir edilmez bildirin.",
        "serverCollaboratorsAlready": "Hali hazırda koleksiyon üyesisiniz!",
        "joinCollaboratorsSuccess": "Başarılı! Artık bir koleksiyon üyesisin.",
        "memberD": "Artık yeni yer imleri ekleyebilir ve düzenleyebilir, iç içe koleksiyonlar yaratabilir ve yeni üyeler davet edebilirsiniz.",
        "viewerD": "Bu koleksiyonda yalnızca yer imlerini görüntüleyebilirsin.",
        "savePage": "Sayfayı Raindrop.io'ya kaydet",
        "saveToInbox": "Gelen kutusuna kaydet (Raindrop.io)",
        "saveImage": "Görüntüyü Raindrop.io'ya kaydet",
        "myBookmarks": "Yer imlerim",
        "appName": "Raindrop.io - Akıllı Yer İmleri",
        "appDesc": "En önemliyi hatırlamak için en güzel yol.",
        "firstRun": "Raindrop.io'yu kullanmaya başlamak için mevcut sayfayı yenilemen ve tekrar tıklaman yeterli.",
        "refreshPage": "Mevcut sayfayı yenile",
        "support": "Destek",
        "afterUpdateTitle": "Eklenti güncellendi",
        "afterUpdate": "Birkaç yeni özelliğe sahibiz, geliştirmeler ve hata düzeltmeleri. Yeni versiyonda görmek istedikleriniz neler ?",
        "seeChangeLog": "Devamını oku..."
    },
    "fr_FR": {
        "server": "Erreur inconnue. Réessayez !",
        "serverundefined": "Erreur inconnue. Réessayez!",
        "server0": "Entrez l'ancien mot de passe !",
        "server1": "L'adresse email n'est pas valide !",
        "server2": "Entrez votre nom !",
        "server3": "L'ancien mot de passe n'est pas valide !",
        "server4": "Le mot de passe n'est pas valide !",
        "server5": "Cet email est déjà enregistré !",
        "server6": "Entrez un titre !",
        "server7": "Mauvaise combinaison d'adresse email et/ou de mot de passe !",
        "serverincorrect url": "URL incorrecte",
        "collection": "Collection",
        "collectionNew": "Nouvelle Collection",
        "collectionDeleteConfirm": "Êtes-vous sûr(e) de vouloir supprimer cette collection ?\nTous les favoris de la collection seront supprimés !",
        "saveChanges": "Enregistrer les modifications",
        "saveError": "Erreur lors de la sauvegarde !",
        "saveSuccess": "Parfaitement enregistré !",
        "saved": "sauvegardé",
        "addSuccess": "Parfaitement ajouté !",
        "moveSuccess": "Favoris déplacés !",
        "removeSuccess": "Supprimé !",
        "coverUpload": "Télécharger la couverture",
        "fileUploadUnable": "Ce fichier ne peut pas être importé !",
        "fileUploadError": "Erreur de téléchargement. Essayez un autre fichier !",
        "linkNotRecognized": "Lien non reconnu",
        "permalink": "Lien permanent :",
        "profile": "Profil",
        "signIn": "Se connecter",
        "myCollections": "Mes collections",
        "save": "Sauvegarder",
        "remove": "Supprimer",
        "elements": "favori",
        "about": "Qui sommes-nous",
        "blog": "Blog",
        "tools": "Outils",
        "signInSocial": "Se connecter avec",
        "signUpSocial": "S'inscrire avec",
        "signUp": "S'inscrire",
        "register": "S'inscrire",
        "recoverPassword": "Réinitialiser le mot de passe",
        "password": "Mot de passe",
        "edit": "Éditer",
        "editMin": "Éditer",
        "collectionEmpty": "La collection est vide",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Recommander",
        "installExtension": "Installer l'extension",
        "extensionDescription": "Le moyen le plus simple, facile et rapide pour garder\n l'essentiel du Web.",
        "enterLink": "Entrer le lien",
        "enterLinkDescription": "Entrez un lien vers n'importe quels page,\n article, photo ou vidéo. Tout ce que vous voulez.",
        "backToCollection": "Retour aux collections",
        "viewOn": "Voir sur",
        "articled": "article",
        "imaged": "photo",
        "videod": "contenu",
        "linkd": "lien",
        "article": "Article",
        "image": "Photo",
        "video": "Contenu",
        "link": "Lien",
        "articles": "Articles",
        "images": "Photos",
        "videos": "Contenu",
        "links": "Liens",
        "articleSaved": "Article sauvegardé",
        "imageSaved": "Photo sauvegardé",
        "videoSaved": "Contenu enregistré",
        "linkSaved": "Lien sauvegardé",
        "articleRemoved": "Article déplacé dans la corbeille",
        "imageRemoved": "Photo déplacée dans la corbeille",
        "videoRemoved": "Contenu déplacé dans la corbeille",
        "linkRemoved": "Lien déplacé dans la corbeille",
        "articleRemovedPermament": "Article supprimé",
        "imageRemovedPermament": "Photo supprimée",
        "videoRemovedPermament": "Contenu supprimé",
        "linkRemovedPermament": "Lien supprimé",
        "bookmarksRemoved": "Favoris déplacés dans la corbeille",
        "bookmarksRemovedPermament": "Favoris supprimés",
        "other": "Autres",
        "vkontakte": "Vkontakte",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "sur",
        "basicData": "Paramètres du compte",
        "yourName": "Votre nom",
        "changePassword": "Changer le mot de passe",
        "newPassword": "Nouveau mot de passe",
        "currentPassword": "Mot de passe actuel",
        "findBookmarkLong": "Chercher un favoris...",
        "nothingFound": "Aucun résultat trouvé",
        "add": "Ajouter",
        "cancel": "Annuler",
        "covers": "Illustrations",
        "upload": "Importer",
        "imagesOnly": "Images seulement.   Taille max: 5Mo.",
        "uploadProgress": "Importation...",
        "fontFamily": "Police de caractères",
        "fontSize": "Taille du texte",
        "interfaceStyle": "Style d'interface",
        "additional": "Supplémentaires",
        "fixedWidth": "Largeur fixe",
        "logOut": "Se déconnecter",
        "titleAndDescription": "Titre et description",
        "title": "Titre",
        "description": "Description",
        "enterTitle": "Entrez un titre",
        "enterDescription": "Entrez une description",
        "enable": "Activé",
        "type": "Type",
        "publicCollection": "Collection publique",
        "shareCollection": "Partager une collection",
        "sendEmail": "Envoyer par email",
        "copyLink": "Copier un lien",
        "language": "Langue",
        "iHaveAccount": "J'ai déjà un compte",
        "createFirstCollection": "Créer la première collection",
        "checkYourEmail": "Vérifiez votre boîte de réception !",
        "und": "&",
        "from": "De",
        "passwordChangeSuccess": "Mot de passe modifié !",
        "smartSearch": "Recherche intelligente",
        "subscribe": "Suivre",
        "youSubscribed": "Abonné",
        "subscriptions": "Abonné",
        "subscriptionsCollection": "Suivre les collections",
        "tags": "Tags",
        "addTag": "Ajouter un tag",
        "noDescription": "Aucune description",
        "basic": "Défaut",
        "background": "Arrière-plan",
        "removeBackground": "Supprimer l'arrière-plan",
        "or": "ou",
        "noCollections": "Aucune collection",
        "noSubscriptions": "Aucun abonnement",
        "welcome": "Commencer à collecter avec",
        "publicCollections": "Collections publiques",
        "collectionsCount": "Collections",
        "noPublicCollections": "Aucune collection publique",
        "noPublicCollectionsD": "Cet utilisateur n'a pas créé ou n'a aucune collection publique.",
        "all": "Tous",
        "mobileApp": "Application mobile",
        "exportBookmarks": "Exporter les favoris",
        "cover": "Illustration",
        "saveToCollection": "Enregistrer dans la collection",
        "selectCollection": "Choisir une Collection",
        "myAccount": "Mon compte",
        "enterTitleAndCollection": "Entrez un titre et une collection",
        "selectPreferedType": "Sélectionnez le type par défaut",
        "back": "Retour",
        "bySort": "Tri",
        "byName": "par nom",
        "byDate": "Par date",
        "findOrCreateCollection": "Chercher ou Créer une nouvelle collection",
        "createCollection": "Nouvelle collection",
        "createCollectionFirst": "Créer la première collection...",
        "createCollectionOrDrag": "Créez ou faites glisser la collection ici...",
        "createGroup": "Créer un groupe",
        "startToSave": "Connectez-vous pour commencer !",
        "checkAgain": "Vérifiez à nouveau !",
        "clickToMakeScreenshot": "Cliquez pour prendre une capture d'écran",
        "elements1": "favori",
        "elements2": "Signets",
        "elements5": "Signets",
        "defaultCollection-0": "Rechercher",
        "defaultCollection--1": "Boîte de réception",
        "defaultCollection--99": "Corbeille",
        "byTitle": "Alphabétique",
        "saveBookmark": "Enregistrer ici",
        "saveBookmarkInInbox": "Enregistrer dans la boîte de réception",
        "sites": "Sites",
        "in": "dans",
        "settings": "Paramètres",
        "removeCollectionSuccess": "Collection supprimée",
        "changeIcon": "Changer d'icône",
        "group": "Groupe",
        "untitled": "Sans titre",
        "removeGroupError": "Vous ne pouvez pas supprimer un groupe non vide !",
        "select": "Choisir",
        "create": "Créer",
        "privacy": "Confidentialité",
        "private": "Privé",
        "privateD": "Visible uniquement par vous",
        "public": "Public",
        "publicD": "Visible par tout le monde",
        "moveDown": "Déplacer vers le bas",
        "moveUp": "Déplacer vers le haut",
        "moveSelectedBookmarks": "Déplacer les favoris sélectionnés",
        "selectAll": "Tout sélectionner",
        "supportOnlyUrls": "Vous ne pouvez enregistrer que les liens avec les protocoles http et https !",
        "unableToRecognizeSpecifiedLink": "Impossible de reconnaître le lien spécifié !",
        "addTags": "Ajouter des tags",
        "noBookmarks": "Aucun favoris",
        "noBookmarksD": "Glissez et déposez le lien ou l'image de la page. Ou cliquez sur \"enregistrer la page'.",
        "alreadyInCollection": "Déjà ajouté dans une collection",
        "alreadyInCollectionD": "Cliquer pour modifier la description, les tags et la couverture de votre favoris",
        "alreadyInCollectionDD": "Modifier description, tags et couverture",
        "inSocial": "Partager le lien via",
        "copyURL": "Copier l'URL",
        "read": "Lire",
        "smartBookmarks": "Favoris intelligents",
        "signUpEmail": "S'inscrire par Email",
        "loginOrRegisterSocial": "Connexion ou Inscription via les réseaux sociaux",
        "help": "Aide",
        "name": "Nom",
        "haveIdeas": "Un bug ou avez des idées ?",
        "followUsOn": "Suivez-nous pour les nouveautés et mises à jour :",
        "writeUs": "Contactez-nous",
        "forDevelopers": "Pour les développeurs",
        "importBookmarks": "Importer des favoris",
        "howToUse": "Comment l'utiliser ?",
        "extension": "Extension",
        "animation": "Animation UI",
        "closeOnPageClick": "Fermer après avoir cliqué sur la page",
        "closeOnPageClickD": "L'option de glisser-déposer ne sera pas disponible",
        "helpContext": "Menu contextuel",
        "helpContextD": "Clic droit sur les favoris ou les collections pour plus d'options",
        "helpHotKey": "Touche de raccourci",
        "helpHotKeyD": "Vous pouvez modifier la clé sur la page des extensions",
        "helpVisible": "Développez la partie visible de la page",
        "helpVisibleD": "Déplacez le curseur vers la gauche et cliquez sur la fenêtre qui apparaît",
        "helpBatch": "Sélection multiple",
        "helpBatchD": "Sélectionnez les favoris pour des actions groupées",
        "moreTips": "Afficher plus de conseils",
        "view": "Vue",
        "openLinksInNewTab": "Ouvrir les liens dans un nouvel onglet",
        "allBookmarks": "Tous les favoris",
        "parent": "Groupe/collection parent",
        "footerProAd": "Passer à la version PRO",
        "footerProAdD": "pour des fonctionnalités supplémentaires",
        "onlyInPro": "Seulement en compte PRO",
        "nestedCollections": "Sous-Collections",
        "dropboxBackup": "Sauvegarde sur Dropbox",
        "goToPRO": "Passer à la version PRO",
        "commonSettings": "Paramètres généraux",
        "already": "Déjà",
        "addBookmark": "Ajouter un favoris",
        "addBookmarkD": "Collez le lien vers une page Web, l'article, la photo ou la vidéo",
        "advice": "Conseils",
        "addAdvice": "Autres façons d'ajouter un signet",
        "browserExtension": "Extension de navigateur",
        "androidApp": "Application Android",
        "androidAppD": "Enregistrer le contenu en ligne important et vos applis favorites!",
        "importBookmarksD": "Transferez vos signets de Google Chrome, Firefox, Safari, Opera, poche, Instapaper, Readability, Kippt, Delicious ou d'autres services vers Raindrop.io.",
        "showInDock": "Montrer dans le Dock",
        "showInTray": "Afficher dans la barre de menu",
        "alwaysOnTop": "Fenêtre toujours au dessus",
        "blurHide": "Masquer la fenêtre lors de la perte du focus",
        "desktopNeedRestart": "Redémarrer l'application pour appliquer les paramètres",
        "refresh": "Actualiser",
        "editProfile": "Modifier le profil",
        "profilePage": "Ma page de collections",
        "upgradeAccount": "Compte PRO",
        "screenshotError": "Cette page web ne peut pas être prise en image !",
        "lastWeek": "Les 7 derniers jours",
        "copyLinkToClipboard": "Copier le lien dans le presse-papiers",
        "openInBrowser": "Ouvrir dans le navigateur",
        "openInBrowserWithShift": "Pour ouvrir le lien dans le navigateur, maintenez la touche Ctrl ou Maj",
        "selectAIconSet": "Sélectionnez un style d'icônes",
        "sharing": "Partager",
        "members": "Membres",
        "enterEmails": "Entrer un email ou des emails séparés par des virgules...",
        "role_member": "Peut modifier",
        "role_members": "Peut modifier",
        "role_viewer": "Peut consulter",
        "role_owner": "Propriétaire",
        "privateCollectionURL": "Aucune adresse publique. La collection est privée.",
        "inviteMorePeople": "Inviter plus de personnes",
        "sendInvites": "Envoyer des invitations",
        "unshareCollection": "Annuler le partage de la collection",
        "withAccessLevel": "Avec le niveau d'accès",
        "invitesSendTo": "Envoyer des invitations à",
        "unshareSuccess": "Collection non partagé",
        "accessViaLink": "Accès via le lien",
        "desktopIntegration": "Intégration avec l'application Mac OS X",
        "error": "Erreur",
        "tryAgain": "Réessayez",
        "moveError": "Impossible de déplacer !",
        "dev": "Développeurs",
        "article1": "article",
        "article2": "Articles",
        "article5": "Articles",
        "image1": "photo",
        "image2": "photos",
        "image5": "photos",
        "video1": "contenu",
        "video2": "contenu",
        "video5": "contenu",
        "link1": "lien",
        "link2": "Liens",
        "link5": "Liens",
        "createNewCollection": "Créer une collection",
        "toRefreshedRaindrop": "sur Raindrop.io",
        "comfortableReading": "Lecture confortable",
        "press": "Presse",
        "subscriptionsD": "Créer et suivre des collections publiques intéressantes.",
        "smartSearchD": "Quel que soit le critère, rapidement et facilement.",
        "tagsD": "Une autre façon d'organiser votre collection.",
        "comfortableReadingD": "Vous pouvez lire vos articles préférés d'une manière très pratique.",
        "dragNdropD": "Glissez et déposez vos signets entre les collections.",
        "exportBookmarksD": "Pour pouvoir transférer votre collection.",
        "followUs": "Suivez-nous",
        "enterSearchCriteria": "Entrez les critères de recherche séparés par des virgules",
        "enterSearchCriteriaD": "Dans n'importe quel ordre, nous determinons nous-même ce que vous allez entrer :",
        "explore": "Explorer",
        "exploreCollections": "Explorer les collections",
        "staffPicks": "Choix des éditeurs",
        "step": "Étape",
        "uploadBookmarksFile": "Importer un fichier de favoris",
        "dropFilesHere": "Ou déposez le fichier ici",
        "importInfo1": "Fichier HTML, taille maximale 3 Mo.",
        "importInfo2": "Prenez de fichier depuis votre navigateur ou depuis la section \"Exporter favoris\".",
        "importInfo3": "Prend en charge le format de fichier de signets Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool ou Netscape.",
        "loading": "Chargement",
        "noBookmarksToImport": "Aucun favoris  !",
        "foldersWithBookmarks": "Dossiers",
        "removeIt": "Supprimer",
        "startImport": "Commencer l'importation",
        "selectOtherFile": "Sélectionner un autre fichier ?",
        "importing": "Importation",
        "of": "de",
        "bookmarks": "Signets",
        "importingInfo1": "Attendez, cela peut prendre un moment, car chaque signet est analysé.",
        "importingInfo2": "Ne fermez pas cet onglet !",
        "importEnd": "Importation terminée !",
        "importSuccess": "Importation réussite",
        "importSuccessInfo": "Nous vous recommandons de personnaliser l'apparence et les icônes de vos collections et aussi de publier et partager sur les réseaux sociaux ou envoyez le lien à vos amis.",
        "importingProcess": "Importer les signets peut prendre du temps, en fonction de leur nombre ! Nous vous prions d'être patient. Dés que l'opération sera achevée, nous vous préviendrons par e-mail !",
        "importingAlready": "Malheureusement, nous avons pas fini de traiter vos signets ! Veuillez patienter, nous vous informerons à l'adresse email spécifiée.",
        "specifyYourEmail": "Spécifiez s'il vous plait l'adressse email de votre profil !",
        "staffPicksD": "Des collections intéressantes avec un merveilleux design",
        "templates": "Modèles",
        "collectionEdit": "Modifier la collection",
        "raindropEdit": "Modifier le favoris",
        "icon": "Icône",
        "selectOtherIcon": "Changer l'icône...",
        "optional": "En option",
        "permamentLink": "Lien permanent",
        "backgroundUploadD": "Vous pouvez choisir un thème pour illustrer votre collection. Il apparaîtra",
        "onYourCollectionPage": "sur la page de la collection",
        "removeCollectionForever": "Supprimer la collection",
        "theseAreTheBest": "Ce sont les meilleurs...",
        "findCollection": "Chercher une collection...",
        "findSubscription": "Trouver un abonnement...",
        "more": "Plus",
        "less": "Moins",
        "byPopularity": "Par popularité",
        "collectionsSorting": "Classement par collection",
        "sortBy": "Trier par",
        "custom": "Personnaliser",
        "byBookmarksCount": "Par le nombre de favoris",
        "fastFilter": "Tri rapide...",
        "fastView": "Aperçu des favoris",
        "publicPage": "Votre page publique",
        "welcomeSlide1D": "Sauvegarder les liens, articles, photos, vidéos et présentations importantes",
        "welcomeSlide1DD": "& organisez-les par collections thématiques.",
        "welcomeSlide1DDD": "Vos favoris sont disponibles sur votre ordinateur et votre smartphone.",
        "welcomeSlide2": "Installez notre extension",
        "welcomeSlide2D": "La manière la plus simple, facile et rapide",
        "welcomeSlide2DD": "pour garder des informations importantes depuis internet.",
        "next": "Suivant",
        "startCollecting": "Fini !",
        "extensionFor": "Extension pour",
        "welcomeMobileSlide2": "Toujours avec vous",
        "sourceCode": "Code source",
        "sourceCodeD": "Code source de nos extensions de navigateur sur",
        "sourceCodeDD": "Repo github.",
        "apiD": "Bientôt.",
        "importFrom": "Importer à partir de",
        "openCollection": "Ouvrir la collection",
        "articlesProccessing": "La totalité des articles sera téléchargée plus tard.",
        "favoriteSites": "Sites favoris",
        "showAll": "Tout afficher",
        "showAllBookmarks": "Afficher tous les favoris",
        "youHave": "Vous avez",
        "fillCollectionInput": "Sélectionner une collection !",
        "browserBookmarklet": "Bookmarklet navigateur",
        "browserBookmarkletD": "Aucun de votre navigateur ? Essayez le bookmarklet.",
        "browserBookmarkletDD": "Glisser ce lien dans votre barre de favoris",
        "browserBookmarkletDDD": "Enregistrer dans la collection",
        "hi": "Salut",
        "noTags": "Aucun tag",
        "interest_video": "Vidéo",
        "interest_hobbies": "Loisirs",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiration",
        "interest_food_drink": "Cuisine",
        "interest_animals": "Animaux",
        "interest_health_fitness": "Santé & Fitness",
        "interest_illustrations": "Illustrations",
        "interest_developers": "Pour les développeurs",
        "interest_art": "Art",
        "interest_history": "Histoire",
        "interest_pictures": "Images",
        "interest_film_music_books": "Films, musique & livres",
        "interest_cars_motorcycles": "Voitures & motos",
        "interest_fashion": "Mode",
        "interest_science": "Science",
        "interest_news": "Actualités",
        "interest_education": "Éducation",
        "interest_psychology": "Psychologie",
        "interest_travel": "Voyage",
        "interest_nature": "Nature",
        "interest_work": "Travail",
        "interest_sites": "Sites",
        "interest_diy": "Travaux Manuels",
        "interest_sport": "Sport",
        "interest_technology": "Technologie",
        "interest_products": "Produits",
        "interest_sweet_home": "Accueil",
        "interest_photography": "Photographie",
        "interest_humor": "Humour",
        "interest_erotic": "Érotique",
        "interest_other": "Autres",
        "interest_food_drink_recipes": "Recettes",
        "interest_film_music_books_films": "Films",
        "interest_film_music_books_music": "Musique",
        "interest_film_music_books_books": "Livres",
        "interest_psychology_relations": "Relations",
        "interest_psychology_self_development": "Développement personnel",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Jeux",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Applications",
        "interest_developers_web": "Développement Web",
        "interest_developers_mobile": "Développement mobile",
        "to": "À",
        "inCollection": "Dans la collection",
        "dragCollections": "Modifier l'ordre des collections par glisser-déposer.",
        "feedAllCollections": "Toutes les collections des flux RSS",
        "orAlternativeFeed": "Tous les favoris",
        "feedWarning": "Attention ! Ne partagez pas le lien unique de votre RSS à d'autres personnes, sinon ils seront capables de voir vos favoris !",
        "publicRSSfeed": "Flux RSS public",
        "showPrivateRSSfeed": "Afficher des flux RSS privés",
        "privateRSSfeed": "Flux RSS privé",
        "mailNotifications": "Notifications par e-mail",
        "disableWeeklyDigest": "Désactiver les abonnements hebdomadaires de vos favoris",
        "trashEmpty": "Corbeille vide",
        "forOtherBrowsers": "Pour les autres navigateurs",
        "saveLink": "Enregistrer la page",
        "instruction": "Instruction",
        "install": "Installer",
        "importDescription": "Transferez vos signets de Google Chrome, Firefox, Safari, Opera, poche, Instapaper, Readability, Kippt, Delicious ou d'autres services vers Raindrop.io.",
        "createSubFolder": "Créer des collections imbriquées",
        "pro_nesting": "Sous-Collections",
        "pro_nestingD": "Créer autant de collections imbriquées.",
        "pro_dropbox": "Sauvegarde sur Dropbox",
        "pro_dropboxD": "Sauvegarder les favoris et contenu sur votre compte Dropbox.",
        "pro_support": "Support prioritaire",
        "pro_supportD": "Par e-mail ou par skype.",
        "pro_nextFeatures": "Votez pour les prochaines fonctionnalités",
        "pro_nextFeaturesD": "Supportez le développement des prochaines fonctionnalités !",
        "month": "mois",
        "year": "année",
        "oneMonth": "Un mois",
        "threeMonth": "3 mois",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Passez à la version Pro",
        "renewPro": "Renouveler mon abonnement PRO",
        "renewPromonth": "Renouveler mon abonnement PRO pour 1 mois",
        "renewProyear": "Renouveler mon abonnement PRO pour 1 an",
        "proTitle": "Utilisez Raindrop.io gratuitement",
        "proTitleD": "ou mettez à niveau pour",
        "proTitleDD": "fonctionnalités supplémentaires.",
        "pro_noAds": "Sans publicités",
        "pro_noAdsD": "",
        "pro_speed_dial": "Nouvel onglet",
        "pro_apple": "Application iPhone/iPad",
        "pro_desktop": "Application de bureau (avec synchronisation)",
        "pro_smart_collections": "Catégories intelligentes (sauvegarde automatique)",
        "yesIwant": "Oui, je veux !",
        "votes": "Vote",
        "votes1": "Vote",
        "votes2": "Votes",
        "votes5": "Votes",
        "whatAddNext": "Que faut-il ajouter ensuite ?",
        "newString": "Nouveau",
        "newBookmark": "Nouveau signet",
        "thankYou": "Merci !",
        "nowYouHave": "Maintenant vous avez un",
        "account": "compte",
        "goHome": "Retour à l'accueil",
        "until": "jusqu'à",
        "goToPayment": "Payer",
        "subscriptionPeriod": "Fin",
        "paymentMethod": "Modes de paiement",
        "pricing": "Tarifs",
        "visualBookmarks": "Signets visuels",
        "readItLater": "Lire plus tard",
        "pro_notes": "Notes",
        "sslConnection": "Connexion sécurisée par SSL",
        "browserPlugin": "Extension de navigateur",
        "features": "Fonctionnalités",
        "free": "Gratuit",
        "removeAccount": "Supprimer le compte",
        "removeAccountD": "Fermer votre compte et supprimer toutes les collections, favoris et données ?",
        "areYouSure": "Etes-vous sûr ?",
        "compareFreePro": "Comparer les versions Gratuite et PRO",
        "shareLinkVia": "Partager le lien via",
        "changeAvatarInfo": "Vous pouvez changer l'avatar associé à votre Emailsur Gravatar.com. (Votre Gravatar est une image qui vous suit d'un site à l'autre, apparaissant à côté de votre nom quand vous postez un commentaire ou un article sur un blog.)",
        "changeAvatar": "Changer l'avatar",
        "browserExtensionD": "Accédez à vos collections en 1 clic depuis n'importe quel onglet de votre navigateur",
        "macApp": "Application Mac OS X",
        "macAppD": "Organisez votre contenu et lisez vos articles depuis votre Mac",
        "macAppV": "Mac OS X (10.8.0 ou plus récent)",
        "androidAppV": "Téléphone Android ou tablette (4.0 ou plus récent)",
        "appleEditorsChoise": "Apple / Editor's Choice",
        "operaEditorsChoise": "Recommandé par Opera",
        "downloadTitle": "Conservez vos favoris à portée de main",
        "sharedCollections": "Collections partagées",
        "serverCollaboratorsIncorrectToken": "Vous ne pouvez pas devenir membre de cette collection. URL incorrecte. Demandez à l'auteur de la collection de vous inviter à nouveau.",
        "serverCollaboratorsAlready": "Vous êtes déjà membre de la collection !",
        "joinCollaboratorsSuccess": "Vous êtes désormais membre de la collection !",
        "memberD": "Maintenant, vous pouvez ajouter et modifier des favoris, créer des sous-collections et inviter de nouveaux membres.",
        "viewerD": "Seul vous pouvez voir les favoris de cette colllection.",
        "savePage": "Enregistrez la page sur Raindrop.io",
        "saveToInbox": "Enregistrer dans la boîte de réception (Raindrop.io)",
        "saveImage": "Enregistrer l'image sur Raindrop.io",
        "myBookmarks": "Mes bookmarks",
        "appName": "Raindrop.io - Favoris Intelligents",
        "appDesc": "Une belle manière de se rapeller de ce qui est important.",
        "firstRun": "Pour commencer à utiliser Raindrop.io, vous devez juste rafraîchir la page et cliquer de nouveau.",
        "refreshPage": "Actualiser la page en cours",
        "support": "Support",
        "afterUpdateTitle": "L'extension a été mise à jour",
        "afterUpdate": "Nous avons plusieurs nouvelles fonctionnalités, améliorations et corrections de bugs. Vous voulez voir ce qu'il y a dans cette version ?",
        "seeChangeLog": "Lire la suite..."
    },
    "id_ID": {
        "server": "Kesalahan tidak dikenal. Coba lagi!",
        "serverundefined": "Kesalahan tidak dikenal. Coba lagi!",
        "server0": "Maukkan kata sandi lama Anda!",
        "server1": "E-mail ini tidak valid!",
        "server2": "Masukkan nama Anda!",
        "server3": "Kata sandi lama ini tidak valid!",
        "server4": "Kata sandi ini tidak valid!",
        "server5": "E-mail ini telah terdaftar!",
        "server6": "Masukkan judul!",
        "server7": "Kombinasi E-mail dan/atau sandi salah!",
        "serverincorrect url": "URL salah",
        "collection": "Koleksi",
        "collectionNew": "Koleksi baru",
        "collectionDeleteConfirm": "Apakah Anda yakin ingin menghapus koleksi ini?\nSemua bookmark dalam koleksi juga akan dihapus!",
        "saveChanges": "Simpan perubahan",
        "saveError": "Simpan galat!",
        "saveSuccess": "Berhasil disimpan!",
        "saved": "disimpan",
        "addSuccess": "Berhasil ditambahkan!",
        "moveSuccess": "Bookmark berhasil dipindah!",
        "removeSuccess": "Berhasil dihapus!",
        "coverUpload": "Unggah cover",
        "fileUploadUnable": "Berkas ini tidak dapat diunggah!",
        "fileUploadError": "Terdapat kesalahan pada berkas. Cobalah berkas lain!",
        "linkNotRecognized": "Tautan tidak dikenal",
        "permalink": "Tautkan:",
        "profile": "Profil",
        "signIn": "Masuk",
        "myCollections": "Koleksi saya",
        "save": "Simpan",
        "remove": "Hapus",
        "elements": "bookmark",
        "about": "Tentang Kita",
        "blog": "Blog",
        "tools": "Perkakas",
        "signInSocial": "Masuk dengan",
        "signUpSocial": "Daftar dengan",
        "signUp": "Daftar",
        "register": "Daftar",
        "recoverPassword": "Atur ulang kata sandi",
        "password": "Kata sandi",
        "edit": "Sunting",
        "editMin": "Sunting",
        "collectionEmpty": "Koleksi kosong",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Merekomendasikan",
        "installExtension": "Pasang pengaya",
        "extensionDescription": "Cara yang paling sederhana, mudah dan super cepat untuk menyimpan hal penting dari web.",
        "enterLink": "Masukkan tautan",
        "enterLinkDescription": "Masukkan tautan dari setiap halaman web, artikel, foto atau video. Apapun yang Anda inginkan.",
        "backToCollection": "Kembali ke koleksi",
        "viewOn": "Lihat di",
        "articled": "Artikel",
        "imaged": "foto",
        "videod": "konten",
        "linkd": "Tautan",
        "article": "Artikel",
        "image": "Foto",
        "video": "Konten",
        "link": "Tautan",
        "articles": "Artikel",
        "images": "Foto",
        "videos": "Konten",
        "links": "Tautan",
        "articleSaved": "Artikel tersimpan",
        "imageSaved": "Foto tersimpan",
        "videoSaved": "Konten tersimpan",
        "linkSaved": "Tautan tersimpan",
        "articleRemoved": "Artikel yang dipindah ke tong sampah",
        "imageRemoved": "Foto yang dipindah ke tong sampah",
        "videoRemoved": "Konten yang dipindah ke tong sampah",
        "linkRemoved": "Tautan yang dipindah ke tong sampah",
        "articleRemovedPermament": "Artikel dihapus",
        "imageRemovedPermament": "Foto dihapus",
        "videoRemovedPermament": "Konten dihapus",
        "linkRemovedPermament": "Tautan dihapus",
        "bookmarksRemoved": "Bookmark yang dipindah ke tong sampah",
        "bookmarksRemovedPermament": "Bookmark dihapus",
        "other": "lainnya",
        "vkontakte": "Вконтакте",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "di",
        "basicData": "Pengaturan akun",
        "yourName": "Nama Anda",
        "changePassword": "Ubah kata sandi",
        "newPassword": "Kata sandi baru",
        "currentPassword": "kata sandi saat ini",
        "findBookmarkLong": "Cari bookmark...",
        "nothingFound": "Tidak ditemukan",
        "add": "Tambah",
        "cancel": "Batal",
        "covers": "Cover",
        "upload": "Unggah",
        "imagesOnly": "Hanya gambar. Ukuran maksimal: 5MB.",
        "uploadProgress": "Mengunggah...",
        "fontFamily": "Jenis huruf",
        "fontSize": "Ukuran huruf",
        "interfaceStyle": "Mode tampilan",
        "additional": "Tambahan",
        "fixedWidth": "Perbaikan lebar",
        "logOut": "Keluar",
        "titleAndDescription": "Judul & deskripsi",
        "title": "Judul",
        "description": "Deskripsi",
        "enterTitle": "Masukkan judul",
        "enterDescription": "Masukkan deskripsi",
        "enable": "Diaktifkan",
        "type": "Tipe",
        "publicCollection": "Koleksi publik",
        "shareCollection": "Bagikan koleksi",
        "sendEmail": "Kirim email",
        "copyLink": "Salin tautan",
        "language": "Bahasa",
        "iHaveAccount": "Saya sudah memiliki akun",
        "createFirstCollection": "Buat koleksi pertama",
        "checkYourEmail": "Cek kotak surat Anda!",
        "und": "&",
        "from": "dari",
        "passwordChangeSuccess": "Kata sandi berhasil diubah!",
        "smartSearch": "Smart search",
        "subscribe": "Ikuti",
        "youSubscribed": "mengikuti",
        "subscriptions": "mengikuti",
        "subscriptionsCollection": "Ikuti koleksi",
        "tags": "Tag",
        "addTag": "Menambahkan tag",
        "noDescription": "Tidak ada Deskripsi",
        "basic": "Dasar",
        "background": "Latar belakang",
        "removeBackground": "Hapus latar belakang",
        "or": "atau",
        "noCollections": "Tidak ada koleksi",
        "noSubscriptions": "Tidak ada langganan",
        "welcome": "Mulai mengumpulkan dengan",
        "publicCollections": "Koleksi publik",
        "collectionsCount": "Koleksi",
        "noPublicCollections": "Tidak ada koleksi Umum",
        "noPublicCollectionsD": "Pengguna ini belum dibuat atau tidak memiliki koleksi publik.",
        "all": "Semua",
        "mobileApp": "Aplikasi Mobile",
        "exportBookmarks": "Mengekspor bookmark",
        "cover": "Cover",
        "saveToCollection": "Menyimpan koleksi",
        "selectCollection": "Pilih koleksi",
        "myAccount": "Akun saya",
        "enterTitleAndCollection": "Masukkan judul dan koleksi",
        "selectPreferedType": "pilih tipe prefered",
        "back": "Kembali",
        "bySort": "Diurutkan",
        "byName": "menurut nama",
        "byDate": "Menurut tanggal",
        "findOrCreateCollection": "Temukan atau buat koleksi baru",
        "createCollection": "Koleksi baru",
        "createCollectionFirst": "Buat koleksi pertama...",
        "createCollectionOrDrag": "Buat atau seret koleksi di sini...",
        "createGroup": "Membuat grup",
        "startToSave": "Silakan login untuk memulai!",
        "checkAgain": "Periksa lagi!",
        "clickToMakeScreenshot": "Klik untuk membuat screenshot",
        "elements1": "bookmark",
        "elements2": "bookmark",
        "elements5": "bookmark",
        "defaultCollection-0": "Cari",
        "defaultCollection--1": "Kotak masuk",
        "defaultCollection--99": "Sampah",
        "byTitle": "Abjad",
        "saveBookmark": "Simpan di sini",
        "saveBookmarkInInbox": "Simpan dalam kotak masuk",
        "sites": "Situs",
        "in": "di",
        "settings": "Pengaturan",
        "removeCollectionSuccess": "Koleksi dihapus",
        "changeIcon": "Ubah ikon",
        "group": "Grup",
        "untitled": "Tanpa judul",
        "removeGroupError": "Anda tidak dapat menghapus grup yang terisi!",
        "select": "Pilih",
        "create": "Buat",
        "privacy": "Privasi",
        "private": "Pribadi",
        "privateD": "Hanya Anda yang dapat melihat",
        "public": "Publik",
        "publicD": "Siapa pun dapat melihat",
        "moveDown": "Pindahkan ke bawah",
        "moveUp": "Pindahkan ke atas",
        "moveSelectedBookmarks": "Pindahkan bookmark yang dipilih",
        "selectAll": "Pilih semua",
        "supportOnlyUrls": "Anda hanya dapat menyimpan tautan dengan protokol http dan https!",
        "unableToRecognizeSpecifiedLink": "Tidak dapat mengenali tautan tertentu!",
        "addTags": "Tambah label",
        "noBookmarks": "Tidak ada bookmark",
        "noBookmarksD": "Tarik dan lepas tautan atau gambar dari halaman. Atau klik 'Simpan halaman'.",
        "alreadyInCollection": "Sudah ada dalam koleksi",
        "alreadyInCollectionD": "Klik untuk menyunting deskripsi, label dan cover dari bookmark",
        "alreadyInCollectionDD": "Sunting deskripsi, label dan cover",
        "inSocial": "Bagikan tautan melalui",
        "copyURL": "Salin URL",
        "read": "Baca",
        "smartBookmarks": "Smart Bookmark",
        "signUpEmail": "Daftar menggunakan E-mail",
        "loginOrRegisterSocial": "Masuk atau daftar menggunakan jejaring sosial",
        "help": "Bantuan",
        "name": "Nama",
        "haveIdeas": "Menemukan hama atau punya ide ?",
        "followUsOn": "Ikuti kami untuk berita dan kabar terbaru:",
        "writeUs": "Hubungi Kami",
        "forDevelopers": "Untuk Pengembang",
        "importBookmarks": "Impor bookmark",
        "howToUse": "Bagaimana menggunakannya ?",
        "extension": "Pengaya",
        "animation": "Animasi UI",
        "closeOnPageClick": "Klik tutup pada halaman",
        "closeOnPageClickD": "Tarik dan lepas tidak tersedia ",
        "helpContext": "Menu konteks",
        "helpContextD": "Klik kanan pada bookmark atau koleksi untuk aksi tambahan",
        "helpHotKey": "Tombol pintas",
        "helpHotKeyD": "Anda dapat mengubah tombol pintas pada halaman pengaya",
        "helpVisible": "Memperluas bagian yang terlihat dari halaman",
        "helpVisibleD": "Gerakkan kursor ke kiri dan klik pada panel yang muncul",
        "helpBatch": "Multiselect",
        "helpBatchD": "Pilih bookmark untuk sekumpulan tindakan",
        "moreTips": "Tampilkan tips",
        "view": "Lihat",
        "openLinksInNewTab": "Buka link di tab baru",
        "allBookmarks": "Semua bookmark",
        "parent": "Induk grup/koleksi",
        "footerProAd": "Tingkatkan ke PRO",
        "footerProAdD": "untuk fitur tambahan",
        "onlyInPro": "Hanya di akun PRO",
        "nestedCollections": "Koleksi bersarang",
        "dropboxBackup": "Dropbox cadangan",
        "goToPRO": "Tingkatkan ke PRO",
        "commonSettings": "Pengaturan umum",
        "already": "sudah",
        "addBookmark": "Tambah bookmark",
        "addBookmarkD": "Sisipkan link ke setiap halaman web, artikel, gambar atau video",
        "advice": "Saran",
        "addAdvice": "Cara lain untuk menambahkan bookmark",
        "browserExtension": "Ekstensi browser",
        "androidApp": "Aplikasi Android",
        "androidAppD": "Menyimpan konten penting dari web & aplikasi favorit!",
        "importBookmarksD": "Transfer bookmark dari Google Chrome, Firefox, Safari, Opera, saku, Instapaper, keterbacaan, Kippt, Delicious atau layanan lain untuk Raindrop.io.",
        "showInDock": "Tampilkan di Dock",
        "showInTray": "Tampilkan di bilah menu",
        "alwaysOnTop": "Jendela selalu di atas",
        "blurHide": "Sembunyikan jendela ketika kehilangan fokus",
        "desktopNeedRestart": "Restart aplikasi untuk menerapkan pengaturan",
        "refresh": "Segarkan",
        "editProfile": "Ubah profil",
        "profilePage": "Halaman koleksi saya",
        "upgradeAccount": "akun PRO",
        "screenshotError": "Halaman web tidak dapat ditangkap!",
        "lastWeek": "7 hari terakhir",
        "copyLinkToClipboard": "Salin link ke clipboard",
        "openInBrowser": "Buka di Browser",
        "openInBrowserWithShift": "Untuk membuka link di browser, Tahan Ctrl atau tombol Shift",
        "selectAIconSet": "Pilih set ikon",
        "sharing": "Berbagi",
        "members": "Anggota",
        "enterEmails": "Masukkan email atau email yang dipisahkan oleh koma...",
        "role_member": "Dapat mengedit",
        "role_members": "Dapat mengedit",
        "role_viewer": "Dapat melihat",
        "role_owner": "Pemilik",
        "privateCollectionURL": "URL tidak umum. Koleksi Pribadi",
        "inviteMorePeople": "Mengundang lebih banyak orang",
        "sendInvites": "Kirim undangan",
        "unshareCollection": "Koleksi tidak dibagi",
        "withAccessLevel": "Dengan tingkat akses",
        "invitesSendTo": "Undangan kirim ke",
        "unshareSuccess": "Koleksi tidak dibagi",
        "accessViaLink": "Akses melalui link",
        "desktopIntegration": "Integrasi dengan Mac OS X app",
        "error": "Error",
        "tryAgain": "Coba lagi",
        "moveError": "Tidak dapat dipindahkan!",
        "dev": "Pengembang",
        "article1": "Artikel",
        "article2": "Artikel",
        "article5": "Artikel",
        "image1": "foto",
        "image2": "foto",
        "image5": "foto",
        "video1": "konten",
        "video2": "konten",
        "video5": "konten",
        "link1": "Tautan",
        "link2": "link",
        "link5": "link",
        "createNewCollection": "Membuat koleksi",
        "toRefreshedRaindrop": "untuk Raindrop.io",
        "comfortableReading": "nyaman membaca",
        "press": "Tekan",
        "subscriptionsD": "Membuat dan ikuti koleksi publik yang menarik.",
        "smartSearchD": "Dengan berbagai kriteria, dengan cepat dan mudah.",
        "tagsD": "Cara lain untuk mengatur Koleksimu.",
        "comfortableReadingD": "Berkonsentrasi pada membaca artikel favorit Anda dengan cara yang nyaman.",
        "dragNdropD": "Seret dan jatuhkan bookmark anda antara koleksi.",
        "exportBookmarksD": "Untuk dapat mentransfer koleksi Anda.",
        "followUs": "Ikuti kami",
        "enterSearchCriteria": "Masukkan kriteria pencarian dipisahkan dengan koma",
        "enterSearchCriteriaD": "Dalam urutan apapun, kita menentukan apa yang Anda akan memasukkan:",
        "explore": "Jelajahi",
        "exploreCollections": "Jelajahi koleksi",
        "staffPicks": "Pilihan editor",
        "step": "Langkah",
        "uploadBookmarksFile": "Meng-upload file bookmark",
        "dropFilesHere": "Atau jatuhkan file disini",
        "importInfo1": "File HTML, maksimum ukuran 3 mb.",
        "importInfo2": "Ambil file ini Anda dapat dari peramban atau layanan di bagian \"Ekspor bookmark\".",
        "importInfo3": "Mendukung format file bookmarks Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool atau Netscape.",
        "loading": "Memuat",
        "noBookmarksToImport": "Tidak ada bookmark!",
        "foldersWithBookmarks": "Folder",
        "removeIt": "Hapus",
        "startImport": "Mulai impor",
        "selectOtherFile": "Pilih file lain?",
        "importing": "Mengimpor",
        "of": "dari",
        "bookmarks": "bookmark",
        "importingInfo1": "Tunggu mungkin memakan waktu, karena setiap bookmark diakui.",
        "importingInfo2": "Jangan Tutup tab ini!",
        "importEnd": "Impor selesai!",
        "importSuccess": "Berhasil diimpor",
        "importSuccessInfo": "Sebaiknya Sesuaikan tampilan dan ikon dari koleksi Anda, dan juga untuk membuat publik dan berbagi pada jaringan sosial atau mengirim link ke teman Anda.",
        "importingProcess": "Impor bookmark mungkin memakan waktu, tergantung pada jumlahnya! Harap bersabar segera setelah mereka diproses, kami akan memberitahu Anda ke E-mail tertentu!",
        "importingAlready": "Sayangnya kami belum selesai memproses bookmark yang Anda upload sebelumnya! Harap tunggu lagi, kami akan memberitahu anda di E-mail tertentu.",
        "specifyYourEmail": "Silakan tentukan E-mail dalam profil Anda!",
        "staffPicksD": "Koleksi menarik dengan desain yang indah",
        "templates": "Template",
        "collectionEdit": "Mengedit koleksi",
        "raindropEdit": "Mengedit bookmark",
        "icon": "Ikon",
        "selectOtherIcon": "Ubah ikon...",
        "optional": "Opsional",
        "permamentLink": "link permanen",
        "backgroundUploadD": "Anda dapat meng-upload latar belakang tematik untuk menyesuaikan dengan mode koleksi Anda. latar belakang akan muncul",
        "onYourCollectionPage": "pada halaman koleksi",
        "removeCollectionForever": "Menghapus koleksi",
        "theseAreTheBest": "Ini adalah yang terbaik...",
        "findCollection": "Temukan koleksi...",
        "findSubscription": "Temukan langganan...",
        "more": "Lebih",
        "less": "Kurang",
        "byPopularity": "Menurut Popularitas",
        "collectionsSorting": "Koleksi penyortiran",
        "sortBy": "Urutkan menurut",
        "custom": "Custom",
        "byBookmarksCount": "menurut hitungan bookmark",
        "fastFilter": "Filtrasi Cepat...",
        "fastView": "Cepat melihat bookmark",
        "publicPage": "Halaman publik anda",
        "welcomeSlide1D": "Simpan link penting, artikel, foto, video, presentasi",
        "welcomeSlide1DD": "& mengaturnya dalam koleksi tematik.",
        "welcomeSlide1DDD": "Bookmark tersedia dari komputer Anda dan smartphone.",
        "welcomeSlide2": "Menginstal ekstensi kami",
        "welcomeSlide2D": "Cara termudah, sederhana dan tercepat",
        "welcomeSlide2DD": "untuk menyimpan hal-hal penting dari Web.",
        "next": "Berikutnya",
        "startCollecting": "Selesai!",
        "extensionFor": "Ekstensi untuk",
        "welcomeMobileSlide2": "Selalu dengan Anda",
        "sourceCode": "Kode sumber",
        "sourceCodeD": "Kode sumber ekstensi browser kami ada pada",
        "sourceCodeDD": "GitHub repo.",
        "apiD": "Segera.",
        "importFrom": "Impor dari",
        "openCollection": "Koleksi terbuka",
        "articlesProccessing": "Teks lengkap dari artikel akan di-upload nanti.",
        "favoriteSites": "Situs favorit",
        "showAll": "Tampilkan semua",
        "showAllBookmarks": "Tampilkan semua bookmark",
        "youHave": "Anda memiliki",
        "fillCollectionInput": "Silahkan pilih koleksi!",
        "browserBookmarklet": "Browser Bookmarklet",
        "browserBookmarkletD": "Tak satu pun dari browser Anda? Cobalah browser bookmarklet.",
        "browserBookmarkletDD": "Tarik link ini ke bilah bookmark",
        "browserBookmarkletDDD": "Menyimpan koleksi",
        "hi": "Hai",
        "noTags": "Tidak ada Tag",
        "interest_video": "Video",
        "interest_hobbies": "Hobi",
        "interest_design": "Desain",
        "interest_design_inspiration": "Inspirasi",
        "interest_food_drink": "Makanan & minuman",
        "interest_animals": "Hewan",
        "interest_health_fitness": "Kesehatan & kebugaran",
        "interest_illustrations": "Ilustrasi",
        "interest_developers": "Untuk Pengembang",
        "interest_art": "Seni",
        "interest_history": "Sejarah",
        "interest_pictures": "Gambar",
        "interest_film_music_books": "Film, musik & buku",
        "interest_cars_motorcycles": "Mobil & sepeda motor",
        "interest_fashion": "Tata Busana",
        "interest_science": "Ilmu pengetahuan",
        "interest_news": "Berita",
        "interest_education": "Pendidikan",
        "interest_psychology": "Psikologi",
        "interest_travel": "Perjalanan",
        "interest_nature": "Alam",
        "interest_work": "Pekerjaan",
        "interest_sites": "Situs",
        "interest_diy": "DIY",
        "interest_sport": "Olahraga",
        "interest_technology": "Teknologi",
        "interest_products": "Produk",
        "interest_sweet_home": "Rumah manis",
        "interest_photography": "Fotografi",
        "interest_humor": "Humor",
        "interest_erotic": "Erotis",
        "interest_other": "Lainnya",
        "interest_food_drink_recipes": "Resep",
        "interest_film_music_books_films": "Film",
        "interest_film_music_books_music": "Musik",
        "interest_film_music_books_books": "Buku",
        "interest_psychology_relations": "Hubungan",
        "interest_psychology_self_development": "Pengembangan diri",
        "interest_technology_gadgets": "Gadget",
        "interest_technology_games": "Permainan",
        "interest_technology_geeks": "Pecandu",
        "interest_technology_applications": "Aplikasi",
        "interest_developers_web": "Pengembangan web",
        "interest_developers_mobile": "Pengembangan mobile",
        "to": "untuk",
        "inCollection": "dalam koleksi",
        "dragCollections": "Mengubah urutan koleksi oleh drag'n'drop.",
        "feedAllCollections": "Semua koleksi RSS feed",
        "orAlternativeFeed": "Semua bookmark",
        "feedWarning": "Peringatan! Jangan berbagi URL yang unik RSS langganan untuk orang lain, karena mereka akan dapat melihat bookmark!",
        "publicRSSfeed": "Publik RSS feed",
        "showPrivateRSSfeed": "Tampilkan RSS feed pribadi",
        "privateRSSfeed": "RSS feed Pribadi",
        "mailNotifications": "pemberitahuan E-mail",
        "disableWeeklyDigest": "menonaktifkan digest mingguan bookmark anda",
        "trashEmpty": "Sampah kosong",
        "forOtherBrowsers": "Untuk browser lainnya",
        "saveLink": "Simpan halaman",
        "instruction": "Instruksi",
        "install": "Menginstal",
        "importDescription": "Transfer bookmark dari Google Chrome, Firefox, Safari, Opera, saku, Instapaper, keterbacaan, Kippt, Delicious atau layanan lain untuk Raindrop.io.",
        "createSubFolder": "Membuat koleksi bersarang",
        "pro_nesting": "Koleksi bersarang",
        "pro_nestingD": "membuat sejumlah koleksi bersarang.",
        "pro_dropbox": "Dropbox cadangan",
        "pro_dropboxD": "Membuat cadangan bookmark dan konten dalam akun Dropbox.",
        "pro_support": "Prioritas dukungan",
        "pro_supportD": "Melalui email atau skype.",
        "pro_nextFeatures": "Voting untuk fitur berikutnya",
        "pro_nextFeaturesD": "Dukung pengembangan fitur yang akan datang!",
        "month": "bulan",
        "year": "tahun",
        "oneMonth": "Satu bulan",
        "threeMonth": "3 bulan",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Tingkatkan ke Pro",
        "renewPro": "Memperpanjang langganan PRO",
        "renewPromonth": "Memperbaharui PRO untuk berlangganan bulanan",
        "renewProyear": "Memperbaharui PRO untuk berlangganan tahunan",
        "proTitle": "Menggunakan Raindrop.io gratis",
        "proTitleD": "atau meningkatkan untuk",
        "proTitleDD": "fitur tambahan.",
        "pro_noAds": "Gratis iklan",
        "pro_noAdsD": "",
        "pro_speed_dial": "Laman tab baru",
        "pro_apple": "Aplikasi iPhone/iPad",
        "pro_desktop": "Aplikasi desktop (dengan sync)",
        "pro_smart_collections": "Koleksi pintar (otomatis simpan)",
        "yesIwant": "Ya, aku ingin!",
        "votes": "vote",
        "votes1": "vote",
        "votes2": "Suara",
        "votes5": "Suara",
        "whatAddNext": "Apa yang harus berikutnya kita tambahkan?",
        "newString": "Baru",
        "newBookmark": "Bookmark baru",
        "thankYou": "Terima kasih!",
        "nowYouHave": "Sekarang Anda memiliki",
        "account": "akun",
        "goHome": "Pergi ke awal",
        "until": "sampai",
        "goToPayment": "Pergi ke pembayaran",
        "subscriptionPeriod": "Periode",
        "paymentMethod": "Metode pembayaran",
        "pricing": "Harga",
        "visualBookmarks": "Visual bookmark",
        "readItLater": "Baca nanti",
        "pro_notes": "Catatan",
        "sslConnection": "Sambungan keamanan SSL",
        "browserPlugin": "Ekstensi browser",
        "features": "Fitur",
        "free": "Gratis",
        "removeAccount": "Menghapus akun",
        "removeAccountD": "Tutup akun dan Hapus semua koleksi, bookmark dan data?",
        "areYouSure": "Kamu yakin?",
        "compareFreePro": "Membandingkan akun gratis dan PRO",
        "shareLinkVia": "Bagikan tautan melalui",
        "changeAvatarInfo": "Anda dapat mengubah avatar yang terkait dengan Email Anda di Gravatar.com. (Gravatar Anda adalah gambar yang mengikuti Anda dari situs ke situs muncul di samping nama Anda ketika Anda melakukan hal-hal seperti komentar atau posting di blog)",
        "changeAvatar": "Ubah Avatar",
        "browserExtensionD": "Akses ke koleksi dengan satu klik dari setiap tab browser",
        "macApp": "Mac OS X App",
        "macAppD": "Mengatur konten dan membaca artikel dari Mac Anda",
        "macAppV": "Mac OS X (10.8.0 atau yang lebih baru)",
        "androidAppV": "Android telepon atau tablet (4.0 atau yang lebih baru)",
        "appleEditorsChoise": "Apple / pilihan Editor",
        "operaEditorsChoise": "Direkomendasikan oleh Opera",
        "downloadTitle": "Menjaga bookmark berguna anda",
        "sharedCollections": "Berbagi koleksi",
        "serverCollaboratorsIncorrectToken": "Tidak mungkin untuk menjadi anggota koleksi. URL tidak valid. Tanyakan penulis koleksi untuk mengundang Anda sekali lagi.",
        "serverCollaboratorsAlready": "Anda sudah menjadi anggota koleksi!",
        "joinCollaboratorsSuccess": "Sukses! Sekarang Anda anggota koleksi.",
        "memberD": "Sekarang Anda dapat menambahkan dan mengedit bookmark, menciptakan koleksi bersarang dan mengundang anggota baru.",
        "viewerD": "Anda hanya dapat melihat bookmark dalam koleksi ini.",
        "savePage": "Menyimpan halaman ke Raindrop.io",
        "saveToInbox": "Simpan ke Inbox (Raindrop.io)",
        "saveImage": "Simpan gambar ke Raindrop.io",
        "myBookmarks": "bookmark saya",
        "appName": "Raindrop.io - Bookmark Cerdas",
        "appDesc": "Sebuah cara yang indah untuk mengingat yang paling penting.",
        "firstRun": "Untuk mulai menggunakan Raindrop.io Anda hanya perlu me-refresh halaman saat ini dan klik lagi.",
        "refreshPage": "Segarkan laman saat ini",
        "support": "Dukungan",
        "afterUpdateTitle": "Ekstensi telah diperbarui",
        "afterUpdate": "Kami memiliki beberapa fitur baru, perbaikan dan perbaikan bug. Ingin melihat apa yang baru dalam versi ini?",
        "seeChangeLog": "Baca lebih lanjut..."
    },
    "uk_UA": {
        "server": "Невідома помилка. Спробуй ще раз!",
        "serverundefined": "Невідома помилка. Спробуй ще раз!",
        "server0": "Введіть старий пароль!",
        "server1": "Невірна адреса електронної пошти!",
        "server2": "Введіть ваше ім'я!",
        "server3": "Старий пароль невірний!",
        "server4": "Пароль невірний!",
        "server5": "Ця електронна пошта вже зареєстрована!",
        "server6": "Введіть назву!",
        "server7": "Неправильна комбінація пошти та паролю!",
        "serverincorrect url": "Невірна адреса",
        "collection": "Колекція",
        "collectionNew": "Нова колекція",
        "collectionDeleteConfirm": "Ви дійсно бажаєте видалити цю колекцію? Це призведе до видалення всіх закладок що містяться у ній!",
        "saveChanges": "Зберегти зміни",
        "saveError": "Помилка при збереженні!",
        "saveSuccess": "Успішно збережено!",
        "saved": "збережено",
        "addSuccess": "Успішно додано!",
        "moveSuccess": "Закладки успішно переміщені!",
        "removeSuccess": "Успішно видалено!",
        "coverUpload": "Завантаження обкладинки",
        "fileUploadUnable": "Цей файл неможливо завантажити!",
        "fileUploadError": "Помилка при завантаженні. Спробуйте інший файл!",
        "linkNotRecognized": "Посилання не вдалося розпізнати",
        "permalink": "Постійне посилання:",
        "profile": "Профіль",
        "signIn": "Ввійти",
        "myCollections": "Мої колекції",
        "save": "Зберегти",
        "remove": "Видалити",
        "elements": "закладка",
        "about": "Про нас",
        "blog": "Блог",
        "tools": "Інструменти",
        "signInSocial": "Ввійти через",
        "signUpSocial": "Зареєструватися через",
        "signUp": "Зареєструватися",
        "register": "Зареєструватися",
        "recoverPassword": "Скинути пароль",
        "password": "Пароль",
        "edit": "Редагувати",
        "editMin": "Редагувати",
        "collectionEmpty": "Пуста колекція",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Рекомендувати",
        "installExtension": "Встановити розширення",
        "extensionDescription": "Найбільш простий, легкий і супер швидкий спосіб зберегти важливе з інтернету.",
        "enterLink": "Введіть посилання",
        "enterLinkDescription": "Введіть посилання на будь-яку веб-сторінку, статтю, фотографію або відео. Все, що забажаєте.",
        "backToCollection": "Назад до колекції",
        "viewOn": "Переглянути на",
        "articled": "стаття",
        "imaged": "фото",
        "videod": "зміст",
        "linkd": "посилання",
        "article": "Стаття",
        "image": "Фото",
        "video": "Зміст",
        "link": "Посилання",
        "articles": "Статті",
        "images": "Фотографії",
        "videos": "Зміст",
        "links": "Посилання",
        "articleSaved": "Статтю збережено",
        "imageSaved": "Фото збережено",
        "videoSaved": "Контент збережено",
        "linkSaved": "Посилання збережено",
        "articleRemoved": "Статтю переміщено до корзини",
        "imageRemoved": "Фото переміщено до корзини",
        "videoRemoved": "Контент переміщено до корзини",
        "linkRemoved": "Посилання переміщено до корзини",
        "articleRemovedPermament": "Статтю видалено",
        "imageRemovedPermament": "Фото видалено",
        "videoRemovedPermament": "Контент видалено",
        "linkRemovedPermament": "Посилання видалено",
        "bookmarksRemoved": "Закладки переміщено до корзини",
        "bookmarksRemovedPermament": "Закладки видалено",
        "other": "інше",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "на",
        "basicData": "Налаштування користувача",
        "yourName": "Ваше ім’я",
        "changePassword": "Зміна пароля",
        "newPassword": "Новий пароль",
        "currentPassword": "Поточний пароль",
        "findBookmarkLong": "Знайти закладку...",
        "nothingFound": "Нічого не знайдено",
        "add": "Додати",
        "cancel": "Скасувати",
        "covers": "Обкладинки",
        "upload": "Завантажити",
        "imagesOnly": "Лише зображення. Максимальний розмір: 5 МБ.",
        "uploadProgress": "Завантаження...",
        "fontFamily": "Шрифт",
        "fontSize": "Розмір шрифту",
        "interfaceStyle": "Стиль інтерфейсу",
        "additional": "Додатково",
        "fixedWidth": "Фіксована ширина",
        "logOut": "Вийти",
        "titleAndDescription": "Назва і опис",
        "title": "Назва",
        "description": "Опис",
        "enterTitle": "Введіть назву",
        "enterDescription": "Введіть опис",
        "enable": "Ввімкнено",
        "type": "Тип",
        "publicCollection": "Відкрита коллекція",
        "shareCollection": "Поділитися колекцією",
        "sendEmail": "Надіслати листа",
        "copyLink": "Скопіювати посилання",
        "language": "Мова",
        "iHaveAccount": "Я вже зареєстрований",
        "createFirstCollection": "Створити першу колекцію",
        "checkYourEmail": "Перевірте вашу поштову скриньку!",
        "und": "і",
        "from": "від",
        "passwordChangeSuccess": "Пароль успішно змінено!",
        "smartSearch": "Розумний пошук",
        "subscribe": "Підписатися",
        "youSubscribed": "Ви підписані",
        "subscriptions": "Ви підписані",
        "subscriptionsCollection": "Колекції підписок",
        "tags": "Теги",
        "addTag": "Додати тег",
        "noDescription": "Без опису",
        "basic": "Основне",
        "background": "Фон",
        "removeBackground": "Видалити фон",
        "or": "обо",
        "noCollections": "Колекції відсутні",
        "noSubscriptions": "Підписки відсутні",
        "welcome": "Розпочніть колекціонувати з",
        "publicCollections": "Публічні колекції",
        "collectionsCount": "колекцій",
        "noPublicCollections": "Публічні колекції відсутні",
        "noPublicCollectionsD": "Цей користувач не створив або не має жодної публічної колекції.",
        "all": "Усі",
        "mobileApp": "Мобільний додаток",
        "exportBookmarks": "Експортувати закладки",
        "cover": "Обкладинка",
        "saveToCollection": "Зберегти до колекції",
        "selectCollection": "Вибрати колекцію",
        "myAccount": "Мій аккаунт",
        "enterTitleAndCollection": "Введіть заголовок та колекцію",
        "selectPreferedType": "Оберіть бажаний тип",
        "back": "Назад",
        "bySort": "Сортувати",
        "byName": "за ім'ям",
        "byDate": "за датою",
        "findOrCreateCollection": "Знайти або створити нову колекцію",
        "createCollection": "Нова колекція",
        "createCollectionFirst": "Створити першу колекцію...",
        "createCollectionOrDrag": "Створити або перетягнути колекцію...",
        "createGroup": "Створити групу",
        "startToSave": "Будь ласка, увійдіть, щоб почати!",
        "checkAgain": "Перевірте ще раз!",
        "clickToMakeScreenshot": "Натисніть, щоб зробити скриншот",
        "elements1": "закладка",
        "elements2": "закладки",
        "elements5": "закладки",
        "defaultCollection-0": "Пошук",
        "defaultCollection--1": "Вхідні",
        "defaultCollection--99": "Сміття",
        "byTitle": "За алфавітом",
        "saveBookmark": "Зберегти сюди",
        "saveBookmarkInInbox": "Зберегти у вхідні",
        "sites": "Сайти",
        "in": "у",
        "settings": "Налаштування",
        "removeCollectionSuccess": "Колекцію видалено",
        "changeIcon": "Змінити іконку",
        "group": "Група",
        "untitled": "Без назви",
        "removeGroupError": "Ви не можете видалити групу, що непорожня!",
        "select": "Вибрати",
        "create": "Створити",
        "privacy": "Конфіденційність",
        "private": "Приватна",
        "privateD": "Доступна тільки вам",
        "public": "Публічна",
        "publicD": "Можуть бачити всі",
        "moveDown": "Перемістити донизу",
        "moveUp": "Перемістити вгору",
        "moveSelectedBookmarks": "Перемістити обрані закладки",
        "selectAll": "Вибрати всі",
        "supportOnlyUrls": "Підтримуються URL тільки з http та https протоколами!",
        "unableToRecognizeSpecifiedLink": "Неможливо розпізнати вказане посилання!",
        "addTags": "Додати тегі",
        "noBookmarks": "Немає закладок",
        "noBookmarksD": "Перетягніть посилання або зображення зі сторінки. Або натисніть кнопку \"Зберегти сторінку\".",
        "alreadyInCollection": "Вже в колекції",
        "alreadyInCollectionD": "Клікніть, щоб змінити опис, теги і обкладинку закладки",
        "alreadyInCollectionDD": "Редагувати опис, теги і обкладинку",
        "inSocial": "Поділитися посиланням через",
        "copyURL": "Скопіювати URL",
        "read": "Читати",
        "smartBookmarks": "Розумні закладки",
        "signUpEmail": "Зареєструватися за допомогою електронної пошти",
        "loginOrRegisterSocial": "Увійдіть або зареєструйтесь, використовуючи соціальну мережу",
        "help": "Допомога",
        "name": "Ім’я",
        "haveIdeas": "Знайшли помилку або є ідея?",
        "followUsOn": "Слідкуйте за нашими новинами та оновленнями:",
        "writeUs": "Зв'язатися з нами",
        "forDevelopers": "Для розробників",
        "importBookmarks": "Імпортувати закладки",
        "howToUse": "Як використовувати?",
        "extension": "Розширення",
        "animation": "Анімація інтерфейсу",
        "closeOnPageClick": "Натисніть кнопку Закрити на сторінці",
        "closeOnPageClickD": "Drag'n'drop, буде не доступний",
        "helpContext": "Контекстне меню",
        "helpContextD": "Натисніть правою кнопкою миші на закладки або колекції для додаткові дії",
        "helpHotKey": "Поєднання клавіш",
        "helpHotKeyD": "Комбінацію гарячих клавіш можна змінити на сторінці розширення",
        "helpVisible": "Розгорнути видиму частину сторінки",
        "helpVisibleD": "Перемістити курсор ліворуч і натисніть на панелі що з'являється",
        "helpBatch": "Вибір декількох елементів",
        "helpBatchD": "Виберіть закладки для пакетної обробки",
        "moreTips": "Показати додаткові поради",
        "view": "Обзор",
        "openLinksInNewTab": "Відкрити посилання в новій вкладці",
        "allBookmarks": "Усі закладки",
        "parent": "Батьківська група/колекція",
        "footerProAd": "Оновити до PRO",
        "footerProAdD": "для додаткових функцій",
        "onlyInPro": "Тільки у PRO-аккаунті",
        "nestedCollections": "Вкладені колекції",
        "dropboxBackup": "Резервне копіювання у Dropbox",
        "goToPRO": "Оновити до PRO",
        "commonSettings": "Загальні параметри",
        "already": "вже",
        "addBookmark": "Додати до закладок",
        "addBookmarkD": "Вставте посилання до будь-якої веб-сторінки, статті. зображення або відео",
        "advice": "Порада",
        "addAdvice": "Інші способи додати закладку",
        "browserExtension": "Розширення для браузера",
        "androidApp": "Додаток для Android",
        "androidAppD": "Зберігайте важливу інформацію з інтернету та ваші улюблені додатки!",
        "importBookmarksD": "Перенесіть закладки з Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious або інших сервісів до Raindrop.io.",
        "showInDock": "Відображати у Dock",
        "showInTray": "Відображати у строці меню меню",
        "alwaysOnTop": "Завжди над іншими вікнами",
        "blurHide": "Приховати вікно при втраті фокусу",
        "desktopNeedRestart": "Перезапустіть програму, щоб застосувати параметри",
        "refresh": "Оновити",
        "editProfile": "Редагувати профіль",
        "profilePage": "Сторінка моїх колекцій",
        "upgradeAccount": "PRO аккаунт",
        "screenshotError": "Неможливо зробити знімок сторінки!",
        "lastWeek": "За останні 7 днів",
        "copyLinkToClipboard": "Скопіювати адресу посилання",
        "openInBrowser": "Відкрити у браузері",
        "openInBrowserWithShift": "Щоб відкрити посилання в браузері, натисніть Ctrl або Shift",
        "selectAIconSet": "Виберіть набір іконок",
        "sharing": "Обмін",
        "members": "Члени",
        "enterEmails": "Введіть одну або декілька адрес електронної пошти, розділених комами...",
        "role_member": "Можна редагувати",
        "role_members": "Можна редагувати",
        "role_viewer": "Можна переглянути",
        "role_owner": "Власник",
        "privateCollectionURL": "Немає публічного URL. Це приватна колекція",
        "inviteMorePeople": "Запросити більше людей",
        "sendInvites": "Надіслати запрошення",
        "unshareCollection": "Скасувати спільний доступ колекцію",
        "withAccessLevel": "З рівнем доступу",
        "invitesSendTo": "Запрошення відправлені на:",
        "unshareSuccess": "Усі підписки на колекцію було скасовано",
        "accessViaLink": "Доступ за допомогою посилання",
        "desktopIntegration": "Інтеграція з додатком для Mac OS X",
        "error": "Помилка",
        "tryAgain": "Спробуйте ще раз",
        "moveError": "Не вдалося перемістити!",
        "dev": "Розробники",
        "article1": "стаття",
        "article2": "статті",
        "article5": "статті",
        "image1": "фото",
        "image2": "фотографії",
        "image5": "фотографії",
        "video1": "зміст",
        "video2": "зміст",
        "video5": "зміст",
        "link1": "посилання",
        "link2": "посилання",
        "link5": "посилання",
        "createNewCollection": "Створити колекцію",
        "toRefreshedRaindrop": "до Raindrop.io",
        "comfortableReading": "Комфортне читання",
        "press": "Натисніть",
        "subscriptionsD": "Створюйте та слідкуйте за публічними колекціями.",
        "smartSearchD": "За будь-якими критеріями, швидко та легко.",
        "tagsD": "Ще один спосіб організувати вашу колекцію.",
        "comfortableReadingD": "Зосередитися на читання своїх улюблених статей в зручному вигляді.",
        "dragNdropD": "Перетягуй свої закладки між колекціями.",
        "exportBookmarksD": "Щоб мати змогу передавати вашу колекцію.",
        "followUs": "Слідкуйте за нами в соціальних мережах",
        "enterSearchCriteria": "Введіть умови пошуку, розділених комами",
        "enterSearchCriteriaD": "У будь-якому порядку ми самі визначити, що ви введете:",
        "explore": "Дослідження",
        "exploreCollections": "Досліджуйте колекції",
        "staffPicks": "Вибір редакторів",
        "step": "Крок",
        "uploadBookmarksFile": "Завантажити файл закладок",
        "dropFilesHere": "Або перетягніть файл сюди",
        "importInfo1": "HTML-файл, максимальний розмір - 3 Мб.",
        "importInfo2": "Ви можете взяти цей файл,  з вашого браузера або з опції в розділі \"Експортувати закладки\".",
        "importInfo3": "Підтримується Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool або формат закладок Netscape.",
        "loading": "Завантаження",
        "noBookmarksToImport": "Немає закладок!",
        "foldersWithBookmarks": "Папки",
        "removeIt": "Видалити",
        "startImport": "Почати імпорт",
        "selectOtherFile": "Вибрати інший файл?",
        "importing": "Імпортування",
        "of": "з",
        "bookmarks": "закладки",
        "importingInfo1": "Зачекайте, це може зайняти деякий час, адже кожна вкладка має бути розпізнана.",
        "importingInfo2": "Не закривайте цю вкладку!",
        "importEnd": "Імпортування завершено!",
        "importSuccess": "Успішно імпортовано",
        "importSuccessInfo": "Рекомендуємо налаштувати зовнішній вигляд та іконки ваших колекцій, а також оприлюднити та обмінюватися ними в соціальних мережах або надсилати посилання друзям.",
        "importingProcess": "Імпорт закладок може зайняти деякий час, залежно від їх кількості! Будь ласка, будьте терплячі, як тільки вони будуть опрацьовані, ми повідомимо вам за вказаною електронною поштою!",
        "importingAlready": "На жаль, ми ще не обробили закладки, завантажені раніше! Будь ласка, зачекайте, ми повідомимо вас за вказаною електронною поштою.",
        "specifyYourEmail": "Будь ласка, вкажіть E-mail у вашому профілі !",
        "staffPicksD": "Цікаву колекція з гарним дизайном",
        "templates": "Шаблони",
        "collectionEdit": "Редагувати колекції",
        "raindropEdit": "Редагувати закладки",
        "icon": "Іконка",
        "selectOtherIcon": "Змінити іконку...",
        "optional": "Необов'язковий",
        "permamentLink": "Постійне посилання",
        "backgroundUploadD": "Ви можете завантажити тематичний фон для стилізування вашої колекції. Він з'явиться",
        "onYourCollectionPage": "на сторінці колекції",
        "removeCollectionForever": "Видалити колекцію",
        "theseAreTheBest": "Це краще...",
        "findCollection": "Знайти колекцію...",
        "findSubscription": "Знайти підписку...",
        "more": "Більше",
        "less": "Менше",
        "byPopularity": "За популярністю",
        "collectionsSorting": "Сортування колекції",
        "sortBy": "Сортувати за",
        "custom": "Необов'язковий",
        "byBookmarksCount": "За підрахунками закладок",
        "fastFilter": "Швидка фільтрація...",
        "fastView": "Швидкий перегляд закладок",
        "publicPage": "Ваші публічні сторінки",
        "welcomeSlide1D": "Зберегти важливі посилання, статті, фотографії, відео, презентацій",
        "welcomeSlide1DD": "і організовуйте їх в тематичні колекції.",
        "welcomeSlide1DDD": "Ваші закладки доступні з комп'ютера та смартфона.",
        "welcomeSlide2": "Встановіть наше розширення",
        "welcomeSlide2D": "Найпростіший, найзручніший і найшвидший спосіб",
        "welcomeSlide2DD": "щоб зберегти важливі речі з Інтернету.",
        "next": "Далі",
        "startCollecting": "Готово!",
        "extensionFor": "Розширення для",
        "welcomeMobileSlide2": "Завжди з вами",
        "sourceCode": "Вихідний код",
        "sourceCodeD": "Вихідний код нашого розширення браузера на",
        "sourceCodeDD": "репозиторій на Github.",
        "apiD": "Найближчим часом.",
        "importFrom": "Імпортувати з",
        "openCollection": "Відкрити колекцію",
        "articlesProccessing": "Повний текст статей буде завантажено пізніше.",
        "favoriteSites": "Улюблені сайти",
        "showAll": "Показати все",
        "showAllBookmarks": "Показати всі закладки",
        "youHave": "У вас є",
        "fillCollectionInput": "Будь ласка, виберіть колекцію!",
        "browserBookmarklet": "Браузерна закладка",
        "browserBookmarkletD": "Немає вашого браузера? Спробуйте букмарклет.",
        "browserBookmarkletDD": "Перетягніть це посилання на панель закладок",
        "browserBookmarkletDDD": "Зберегти до колекції",
        "hi": "Привіт",
        "noTags": "Немає тегів",
        "interest_video": "Відео",
        "interest_hobbies": "Хобі",
        "interest_design": "Дизайн",
        "interest_design_inspiration": "Натхнення",
        "interest_food_drink": "Їжа та напої",
        "interest_animals": "Тварини",
        "interest_health_fitness": "Здоров'я та фітнес",
        "interest_illustrations": "Ілюстрації",
        "interest_developers": "Для розробників",
        "interest_art": "Мистецтво",
        "interest_history": "Історія",
        "interest_pictures": "Фотографії",
        "interest_film_music_books": "Фільми, музика та книги",
        "interest_cars_motorcycles": "Автомобілі та мотоцикли",
        "interest_fashion": "Мода",
        "interest_science": "Наука",
        "interest_news": "Новини",
        "interest_education": "Освіта",
        "interest_psychology": "Психологія",
        "interest_travel": "Подорожі",
        "interest_nature": "Природа",
        "interest_work": "Робота",
        "interest_sites": "Сайти",
        "interest_diy": "ЗРОБИ САМ",
        "interest_sport": "Спорт",
        "interest_technology": "Технології",
        "interest_products": "Продукти",
        "interest_sweet_home": "Милий дім",
        "interest_photography": "Фотографія",
        "interest_humor": "Гумор",
        "interest_erotic": "Еротика",
        "interest_other": "Інші",
        "interest_food_drink_recipes": "Рецепти",
        "interest_film_music_books_films": "Фільми",
        "interest_film_music_books_music": "Музика",
        "interest_film_music_books_books": "Книги",
        "interest_psychology_relations": "Відносини",
        "interest_psychology_self_development": "Саморозвиток",
        "interest_technology_gadgets": "Гаджети",
        "interest_technology_games": "Ігри",
        "interest_technology_geeks": "Ґіки",
        "interest_technology_applications": "Додатки",
        "interest_developers_web": "Веб-розробка",
        "interest_developers_mobile": "Мобільна розробка",
        "to": "щоб",
        "inCollection": "у колекцію",
        "dragCollections": "Змінити порядок колекцій, drag'n'drop.",
        "feedAllCollections": "Усі колекції RSS",
        "orAlternativeFeed": "Усі закладки",
        "feedWarning": "Увага! Не повідомляйте ваш унікальнй URL RSS підписки сторонній особам, інакше вони будуть мати можливість переглядати ваші закладки!",
        "publicRSSfeed": "Публічний RSS канал",
        "showPrivateRSSfeed": "Показати приватний RSS-канал",
        "privateRSSfeed": "Приватний RSS канал",
        "mailNotifications": "Повідомлення по електронній пошті",
        "disableWeeklyDigest": "Вимкнути щотижневий дайджест ваши закладок",
        "trashEmpty": "Кошик порожній",
        "forOtherBrowsers": "Для інших браузерів",
        "saveLink": "Зберегти сторінку",
        "instruction": "Інструкція",
        "install": "Встановити",
        "importDescription": "Перенесіть закладки з Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious або інших сервісів до Raindrop.io.",
        "createSubFolder": "Створити вкладені колекції",
        "pro_nesting": "Вкладені колекції",
        "pro_nestingD": "Створити як будь-яку кількість вкладених колекцій.",
        "pro_dropbox": "Резервне копіювання у Dropbox",
        "pro_dropboxD": "Зробити бекап закладок та контенту у ваш аккаунт Dropbox.",
        "pro_support": "Пріоритетна підтримка",
        "pro_supportD": "По електронній пошті або skype.",
        "pro_nextFeatures": "Проголосуйте за наступні можливості",
        "pro_nextFeaturesD": "Користувачі PRO аккаунтів беруть участь у розробці, особисто обираючи функції, що з'являться найперше!",
        "month": "місяць",
        "year": "рік",
        "oneMonth": "Один місяць",
        "threeMonth": "3 місяці",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Перейти на Pro-версію",
        "renewPro": "Відновити PRO підписку",
        "renewPromonth": "Відновити PRO підписку на місяць",
        "renewProyear": "Відновити PRO підписку на рік",
        "proTitle": "Користуйтеся Raindrop.io безкоштовно",
        "proTitleD": "або оновлення для",
        "proTitleDD": "додаткові функції.",
        "pro_noAds": "Без реклами",
        "pro_noAdsD": "",
        "pro_speed_dial": "Нова вкладка",
        "pro_apple": "Додаток для iPhone/iPad",
        "pro_desktop": "Застосунок для робочого стола (зі синхронізацією)",
        "pro_smart_collections": "Смарт-набори (автозбереження)",
        "yesIwant": "Так, я хочу!",
        "votes": "голос",
        "votes1": "голос",
        "votes2": "голоси",
        "votes5": "голоси",
        "whatAddNext": "Які оновлення Ви б бажали додати?",
        "newString": "Нові",
        "newBookmark": "Нова закладка",
        "thankYou": "Дякую!",
        "nowYouHave": "Тепер у вас є",
        "account": "обліковий запис",
        "goHome": "Повернутися на головну",
        "until": "до",
        "goToPayment": "Перейти до оплати",
        "subscriptionPeriod": "Період",
        "paymentMethod": "Варіанти оплати",
        "pricing": "Ціни",
        "visualBookmarks": "Візуальні закладки",
        "readItLater": "Прочитати потім",
        "pro_notes": "Нотатки",
        "sslConnection": "Підключення SSL",
        "browserPlugin": "Розширення для браузера",
        "features": "Особливості",
        "free": "Безкоштовно",
        "removeAccount": "Видалення облікового запису",
        "removeAccountD": "Закрити обліковий запис і видалити всі колекцій, закладки та дані?",
        "areYouSure": "Ти впевнений?",
        "compareFreePro": "Порівняйте безкоштовний і PRO обліковий запис",
        "shareLinkVia": "Поділитися посиланням через",
        "changeAvatarInfo": "Налаштувати аватар, що буде прив'язано до вашої електронної пошти, можна на Gravatar.com .\n(Зображення Gravatar супроводжуватиме Вас від сайта до сайту, з'являючись біля Вашого ім'я під час публікації коментарів та постів  у блозі.",
        "changeAvatar": "Зміна Аватар",
        "browserExtensionD": "Доступ до колекції за один клік з будь-якої вклаки",
        "macApp": "Додаток для Mac OS X",
        "macAppD": "Упорядкуйте вміст та читатйте статті з вашого Mac",
        "macAppV": "Mac OS X (10.8.0 або новіша)",
        "androidAppV": "Телефон або планшет на Android (4.0 або новіший)",
        "appleEditorsChoise": "Apple / Вибір редакції",
        "operaEditorsChoise": "Opera рекомендує",
        "downloadTitle": "Тримайте ваші закладки під рукою",
        "sharedCollections": "Спільні колекцій",
        "serverCollaboratorsIncorrectToken": "Неможливо стати учасником колекції. Некоректна URL-адреса. Попросіть в автора колекції запросити вас ще раз.",
        "serverCollaboratorsAlready": "Ви вже є учасником колекції!",
        "joinCollaboratorsSuccess": "Успіх! Тепер ви колекції член.",
        "memberD": "Тепер можна додавати та редагувати закладки, створювати вкладені колекції і запрошувати нових членів.",
        "viewerD": "Закладки можна переглядати лише на цій збірці.",
        "savePage": "Зберегти сторінку до Raindrop.io",
        "saveToInbox": "Зберегти до папки \"Вхідні\" (Raindrop.io)",
        "saveImage": "Зберегти зображення в Raindrop.io",
        "myBookmarks": "Мої закладки",
        "appName": "Raindrop.io - розумні-закладки",
        "appDesc": "Гарний спосіб запам'ятати найважливіше.",
        "firstRun": "Для початку, використовуючи Raindrop.io потрібно просто оновити поточну сторінку та натисніть кнопку ще раз.",
        "refreshPage": "Оновити поточну сторінку",
        "support": "Підтримка",
        "afterUpdateTitle": "Розширення було оновлено",
        "afterUpdate": "У нас є кілька нових функцій, покращень і виправлень. Хочете переглянути, що нового в цій версії?",
        "seeChangeLog": "Читати далі..."
    },
    "fi_FI": {
        "server": "Tuntematon virhe. Yritä uudestaan!",
        "serverundefined": "Tuntematon virhe. Yritä uudestaan!",
        "server0": "Syötä vanha salasanasi!",
        "server1": "Sähköposti ei ole kelvollinen!",
        "server2": "Syötä nimesi!",
        "server3": "Vanha salasana ei ole kelvollinen!",
        "server4": "Salasana ei ole kelvollinen!",
        "server5": "Tämä sähköpostiosoite on jo käytössä!",
        "server6": "Syötä otsikko!",
        "server7": "Väärä sähköposti ja/tai salasana -yhdistelmä!",
        "serverincorrect url": "Virheellinen osoite",
        "collection": "Kokoelma",
        "collectionNew": "Uusi kokoelma",
        "collectionDeleteConfirm": "Haluatko varmasti poistaa tämän kokoelman?\nMyös kokoelmassa olevat kirjanmerkit poistuvat!",
        "saveChanges": "Tallenna muutokset",
        "saveError": "Tallennusvirhe!",
        "saveSuccess": "Onnistuneesti tallennetttu!",
        "saved": "tallennettu",
        "addSuccess": "Onnistuneesti lisätty!",
        "moveSuccess": "Kirjanmerkkien siirtäminen onnistui!",
        "removeSuccess": "Poistettu onnistuneesti!",
        "coverUpload": "Kannen lähettäminen",
        "fileUploadUnable": "Tätä tiedostoa ei voitu lähettää!",
        "fileUploadError": "Virhe tiedoston lähettämisessä. Yritä toista tiedostoa!",
        "linkNotRecognized": "Linkkiä ei tunnisteta",
        "permalink": "Permalinkki:",
        "profile": "Profiili",
        "signIn": "Kirjaudu sisään",
        "myCollections": "Omat kokoelmat",
        "save": "Tallenna",
        "remove": "Poista",
        "elements": "kirjanmerkki",
        "about": "Tietoja",
        "blog": "Blogi",
        "tools": "Työkalut",
        "signInSocial": "Kirjaudu sisään jollain näistä",
        "signUpSocial": "Rekisteröidy jollain näistä",
        "signUp": "Rekisteröidy",
        "register": "Rekisteröidy",
        "recoverPassword": "Vaihda salasana",
        "password": "Salasana",
        "edit": "Muokkaa",
        "editMin": "Muokkaa",
        "collectionEmpty": "Kokoelma on tyhjä",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Suosittele",
        "installExtension": "Asenna lisäosa",
        "extensionDescription": "Nopein ja tehokkain tapa koota kokoelma tärkeistä asioista verkossa.",
        "enterLink": "Syötä linkki",
        "enterLinkDescription": "Syötä linkki mille tahansa sivulle, artikkeliin, kuvaan tai videoon. Mihin ikinä haluatkaan.",
        "backToCollection": "Takaisin kokoelmaan",
        "viewOn": "Katso",
        "articled": "artikkeli",
        "imaged": "kuva",
        "videod": "sisältö",
        "linkd": "linkki",
        "article": "Artikkeli",
        "image": "Kuva",
        "video": "Sisältö",
        "link": "Linkki",
        "articles": "Artikkelit",
        "images": "Kuvat",
        "videos": "Sisältö",
        "links": "Linkit",
        "articleSaved": "Artikkeli tallennettu",
        "imageSaved": "Kuva tallennettu",
        "videoSaved": "Sisältö tallennettu",
        "linkSaved": "Linkki tallennettu",
        "articleRemoved": "Artikkeli siirretty roskakoriin",
        "imageRemoved": "Kuva siirretty roskakoriin",
        "videoRemoved": "Sisältö siirretty roskakoriin",
        "linkRemoved": "Linkki siirretty roskakoriin",
        "articleRemovedPermament": "Artikkeli poistettu",
        "imageRemovedPermament": "Kuva poistettu",
        "videoRemovedPermament": "Sisältö poistettu",
        "linkRemovedPermament": "Linkki poistettu",
        "bookmarksRemoved": "Kirjanmerkit siirretty roskakoriin",
        "bookmarksRemovedPermament": "Kirjanmerkit poistettu",
        "other": "muut",
        "vkontakte": "Vkontakte",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "on",
        "basicData": "Käyttäjän asetukset",
        "yourName": "Nimesi",
        "changePassword": "Vaihda salasana",
        "newPassword": "Uusi salasana",
        "currentPassword": "Nykyinen salasana",
        "findBookmarkLong": "Löydä kirjanmerkki...",
        "nothingFound": "Ei tuloksia",
        "add": "Lisää",
        "cancel": "Peruuta",
        "covers": "Kansi",
        "upload": "Lähetä",
        "imagesOnly": "Vain kuvat. Suurin mahdollinen koko: 5mb.",
        "uploadProgress": "Lähetetään...",
        "fontFamily": "Fonttiperhe",
        "fontSize": "Fontin koko",
        "interfaceStyle": "Käyttöliittymän tyyli",
        "additional": "Lisää",
        "fixedWidth": "Lukittu leveys",
        "logOut": "Kirjaudu ulos",
        "titleAndDescription": "Otsikko ja kuvaus",
        "title": "Otsikko",
        "description": "Kuvaus",
        "enterTitle": "Syötä otsikko",
        "enterDescription": "Kirjoita kuvaus",
        "enable": "Käytössä",
        "type": "Tyyppi",
        "publicCollection": "Julkinen kokoelma",
        "shareCollection": "Jaa kokoelma",
        "sendEmail": "Lähetä sähköposti",
        "copyLink": "Kopioi linkki",
        "language": "Kieli",
        "iHaveAccount": "Minulla on jo käyttäjä",
        "createFirstCollection": "Luo ensimmäinen kokoelmasi",
        "checkYourEmail": "Tarkista saapuneet-kansio!",
        "und": "&",
        "from": "lähettäjältä",
        "passwordChangeSuccess": "Salasana vaihdettu onnistuneesti!",
        "smartSearch": "Älykäs haku",
        "subscribe": "Seuraa",
        "youSubscribed": "Seuraat",
        "subscriptions": "Seuraat",
        "subscriptionsCollection": "Seuraa kokoelmia",
        "tags": "Tagit",
        "addTag": "Lisää tagi",
        "noDescription": "Ei kuvausta",
        "basic": "Perus",
        "background": "Tausta",
        "removeBackground": "Poista tausta",
        "or": "tai",
        "noCollections": "Ei kokoelmia",
        "noSubscriptions": "Ei tilauksia",
        "welcome": "Aloita kerääminen [raindrop.io]:n kanssa",
        "publicCollections": "Julkiset kokoelmat",
        "collectionsCount": "kokoelmat",
        "noPublicCollections": "Ei julkisia kokoelmia",
        "noPublicCollectionsD": "Tämä käyttäjä ei ole luonut tai omaa julkisia kokoelmia.",
        "all": "Kaikki",
        "mobileApp": "Mobiilisovellus",
        "exportBookmarks": "Vie kirjanmerkit",
        "cover": "Kansi",
        "saveToCollection": "Tallenna kokoelmaan",
        "selectCollection": "Valitse kokoelma",
        "myAccount": "Oma käyttäjä",
        "enterTitleAndCollection": "Syötä otsikko ja kokoelma",
        "selectPreferedType": "Valitse haluttu tyyppi",
        "back": "Takaisin",
        "bySort": "Lajiteltu",
        "byName": "nimen mukaan",
        "byDate": "Päivämäärän mukaan",
        "findOrCreateCollection": "Etsi tai luo uusi kokoelma",
        "createCollection": "Uusi kokoelma",
        "createCollectionFirst": "Luo ensimmäinen kokoelmasi...",
        "createCollectionOrDrag": "Luo tai vedä kokoelma tänne...",
        "createGroup": "Luo ryhmä",
        "startToSave": "Kirjaudu sisään aloittaaksesi!",
        "checkAgain": "Tarkista uudestaan!",
        "clickToMakeScreenshot": "Klikkaa ottaaksesi kuvankaappauksen",
        "elements1": "kirjanmerkki",
        "elements2": "kirjanmerkit",
        "elements5": "kirjanmerkit",
        "defaultCollection-0": "Etsi",
        "defaultCollection--1": "Saapuneet",
        "defaultCollection--99": "Roskakori",
        "byTitle": "Aakkosjärjestyksessä",
        "saveBookmark": "Tallenna tänne",
        "saveBookmarkInInbox": "Tallenna saapuneisiin",
        "sites": "Sivustot",
        "in": "in",
        "settings": "Asetukset",
        "removeCollectionSuccess": "Kokoelma poistettu",
        "changeIcon": "Vaihda kuvaketta",
        "group": "Ryhmä",
        "untitled": "Nimetön",
        "removeGroupError": "Et voi poistaa ryhmiä, jotka eivät ole tyhjiä!",
        "select": "Valitse",
        "create": "Luo",
        "privacy": "Yksityisyys",
        "private": "Yksityinen",
        "privateD": "Vain sinä voit nähdä",
        "public": "Julkinen",
        "publicD": "Kuka tahansa voi nähdä",
        "moveDown": "Siirrä ylöspäin",
        "moveUp": "Siirrä alaspäin",
        "moveSelectedBookmarks": "Siirrä valitut kirjanmerkit",
        "selectAll": "Valitse kaikki",
        "supportOnlyUrls": "Voit tallentaa ainoastaan http ja https -linkkejä!",
        "unableToRecognizeSpecifiedLink": "Annettua linkkiä ei tunnistettu!",
        "addTags": "Lisää tageja",
        "noBookmarks": "Ei kirjanmerkkejä",
        "noBookmarksD": "Vedä ja pudota linkki tai kuva sivulta. Tai klikkaa 'Tallenna sivu':a.",
        "alreadyInCollection": "On jo kokoelmassa",
        "alreadyInCollectionD": "Klikkaa muokataksesi kuvausta, tageja ja kirjanmerkin kantta",
        "alreadyInCollectionDD": "Muokkaa kuvausta, tageja ja kantta",
        "inSocial": "Jaa linkki",
        "copyURL": "Kopioi osoite",
        "read": "Lue",
        "smartBookmarks": "Älykkäät kirjanmerkit",
        "signUpEmail": "Rekisteröidy käyttäen sähköpostia",
        "loginOrRegisterSocial": "Kirjaudu tai rekisteröidy käyttäen sosiaalista verkostoa",
        "help": "Apua",
        "name": "Nimi",
        "haveIdeas": "Bugi vai omaatko idean?",
        "followUsOn": "Seuraa meitä uutisten ja päivitysten vuoksi:",
        "writeUs": "Ota yhteyttä",
        "forDevelopers": "Kehittäjille",
        "importBookmarks": "Tuo kirjanmerkkejä",
        "howToUse": "Kuinka käyttää?",
        "extension": "Laajennus",
        "animation": "Käyttöliittymäanimaatio",
        "closeOnPageClick": "Sulje sivua napsauttamalla",
        "closeOnPageClickD": "Vedä ja pudota ei tule olemaan saatavilla",
        "helpContext": "Kontekstivalikko",
        "helpContextD": "Klikkaa hiiren oikealla painikkeella kirjanmerkkejä tai kokoelmia saadaksesi lisää toimintoja",
        "helpHotKey": "Pikanäppäin",
        "helpHotKeyD": "Voit vaihtaa pikanäppäintä laajennusasetuksissa",
        "helpVisible": "Laajenna sivun näkyvä osa",
        "helpVisibleD": "Siirrä kursori vasemmalle ja valitse paneelli",
        "helpBatch": "Monivalinta",
        "helpBatchD": "Valitse kirjanmerkit joukkotoiminnoille",
        "moreTips": "Näytä lisää vinkkejä",
        "view": "Näytä",
        "openLinksInNewTab": "Avaa linkit uudessa välilehdessä",
        "allBookmarks": "Kaikki kirjanmerkit",
        "parent": "Pääryhmä/-kokoelma",
        "footerProAd": "Päivitä PRO-versioon",
        "footerProAdD": "lisäominaisuuksien takia",
        "onlyInPro": "Vain PRO-käyttäjällä",
        "nestedCollections": "Sisäkkäiset kokoelmat",
        "dropboxBackup": "Varmuuskopiointi Dropboxiin",
        "goToPRO": "Päivitä PRO-versioon",
        "commonSettings": "Yleiset asetukset",
        "already": "jo",
        "addBookmark": "Lisää kirjanmerkki",
        "addBookmarkD": "Liitä linkki mille tahansa verkkosivulle, artikkeliin, kuvaan tai videoon",
        "advice": "Vinkki",
        "addAdvice": "Muita tapoja lisätä kirjanmerkki",
        "browserExtension": "Selainlaajennus",
        "androidApp": "Android-sovellus",
        "androidAppD": "Tallenna tärkeää sisältöä verkosta & suosikkisovelluksistasi!",
        "importBookmarksD": "Siirrä kirjanmerkit Google Chromesta, Firfoxista, Safarista, Operasta, Pocketista, Instapaperista, Readabilitysta, Kippt:sta, Deliciousista tai muista palveluista Raindrop.io:oon.",
        "showInDock": "Näytä telakassa",
        "showInTray": "Näytä valikossa",
        "alwaysOnTop": "Ikkuna aina päällimmäisenä",
        "blurHide": "Piilota ikkuna fokuksen kadotessa",
        "desktopNeedRestart": "Käynnistä sovellus uudestaan käyttöönottaaksesi asetukset",
        "refresh": "Päivitä",
        "editProfile": "Muokkaa profiilia",
        "profilePage": "Kokoelmat-sivuni",
        "upgradeAccount": "PRO käyttäjä",
        "screenshotError": "Web-sivua ei voida kaapata!",
        "lastWeek": "Viimeisimmät 7 päivää",
        "copyLinkToClipboard": "Kopioi linkki leikepöydälle",
        "openInBrowser": "Avaa selaimessa",
        "openInBrowserWithShift": "Avataksesi linkin selaimessa, pidä Ctrl- tai Shift-näppäintä painettuna",
        "selectAIconSet": "Valitse kuvakesetti",
        "sharing": "Jakaminen",
        "members": "Jäsenet",
        "enterEmails": "Anna sähköposti tai sähköpostit pilkuilla eroteltuina...",
        "role_member": "Voi muokata",
        "role_members": "Voi muokata",
        "role_viewer": "Voi katsoa",
        "role_owner": "Omistaja",
        "privateCollectionURL": "Ei julkista osoitetta. Kokoelma on yksityinen",
        "inviteMorePeople": "Kutsu lisää ihmisiä",
        "sendInvites": "Lähetä kutsuja",
        "unshareCollection": "Lopeta kokoelman jakaminen",
        "withAccessLevel": "Käyttäjäoikeustason kanssa",
        "invitesSendTo": "Kutsut lähetetty:",
        "unshareSuccess": "Kokoelma jakamaton",
        "accessViaLink": "Pääsy linkin kautta",
        "desktopIntegration": "Integraatio Mac OS X -sovelluksen kanssa",
        "error": "VIrhe",
        "tryAgain": "Yritä uudestaan",
        "moveError": "Ei pysty liikuttamaan!",
        "dev": "Kehittäjät",
        "article1": "artikkeli",
        "article2": "artikkelit",
        "article5": "artikkelit",
        "image1": "kuva",
        "image2": "kuvat",
        "image5": "kuvat",
        "video1": "sisältö",
        "video2": "sisällöt",
        "video5": "sisällöt",
        "link1": "linkki",
        "link2": "linkit",
        "link5": "linkit",
        "createNewCollection": "Luo kokoelma",
        "toRefreshedRaindrop": "Raindrop.io:oon",
        "comfortableReading": "Mukava lukeminen",
        "press": "Lehdistö",
        "subscriptionsD": "Luo ja seuraa kiinnostavia julkisia kokoelmia.",
        "smartSearchD": "Millä tahansa hakuehdoilla, nopeasti ja helposti.",
        "tagsD": "Toisenlainen tapa järjestää kokoelmaasi.",
        "comfortableReadingD": "Keskity lempiartikkeleitesi mukavaan lukemiseen.",
        "dragNdropD": "Vedä ja pudota kirjanmerkkejäsi kokoelmien kesken.",
        "exportBookmarksD": "Olla kykeneväinen siirtämään kokoelmasi.",
        "followUs": "Seuraa meitä",
        "enterSearchCriteria": "Kirjoita hakuehdot pilkuilla eroteltuina",
        "enterSearchCriteriaD": "Missä tahansa järjestyksessä, me määrittelemme mitä kirjoitat:",
        "explore": "Tutustu",
        "exploreCollections": "Tutustu kokoelmiin",
        "staffPicks": "Toimittajien valinta",
        "step": "Askel",
        "uploadBookmarksFile": "Lähetä kirjamerkkitiedosto",
        "dropFilesHere": "Tai pudota tiedosto tähän",
        "importInfo1": "HTML-tiedosto, suurin sallittu koko 3 mb.",
        "importInfo2": "Tuo tämä tiedosto selaimestasi tai \"Vie kirjanmerkit\" -kohdasta.",
        "importInfo3": "Tukee Google Chromen, Mozilla Firefoxin, Safarin, Google Kirjanmerkkien, Delicious:n, Kippt:n, Zootoolin tai Netscapen kirjanmerkkien tiedostomuotoa.",
        "loading": "Lataa",
        "noBookmarksToImport": "Ei kirjanmerkkejä!",
        "foldersWithBookmarks": "Kansiot",
        "removeIt": "Poista",
        "startImport": "Aloita tuonti",
        "selectOtherFile": "Valitse toinen tiedosto?",
        "importing": "Tuonti",
        "of": "of",
        "bookmarks": "kirjanmerkit",
        "importingInfo1": "Odota, se voi kestää hetken, sillä jokainen kirjanmerkki tunnistetaan.",
        "importingInfo2": "Ala sulje tätä välilehteä!",
        "importEnd": "Tuonti saatu loppuun!",
        "importSuccess": "Tuotu onnistuneesti",
        "importSuccessInfo": "Suosittelemme muokkaamaan kokoelmiesi ulkoasua ja ikoneita ja myös tekemään niistä julkisia ja jakamaan ne sosiaalisissa verkostoissa tai lähettämään linkin ystävillesi.",
        "importingProcess": "Kirjanmerkkien tuonti voi kestää jonkin aikaa riippuen niiden määrästä! Ole kärsivällinen, heti kun ne on saatu käsiteltyä, ilmoitamme sinulle sähköpostitse!",
        "importingAlready": "Valitettavasti emme ole vielä valmiita aikaisemmin tuotujen kirjanmerkkiesi kanssa! Odota hetki, ilmoitamme sinulle sähköpostitse.",
        "specifyYourEmail": "Määritä sähköposti profiiliisi!",
        "staffPicksD": "Mielenkiintoinen kokoelma kauniilla ulkoasulla",
        "templates": "Mallit",
        "collectionEdit": "Muokkaa kokoelmaa",
        "raindropEdit": "Muokkaa kirjanmerkkiä",
        "icon": "Kuvake",
        "selectOtherIcon": "Vaihda kuvake...",
        "optional": "Valinnainen",
        "permamentLink": "Pysyvä linkki",
        "backgroundUploadD": "Voit lähettää temaattisen taustakuvan tyylitelläksesi kokoelmasi. Se tulee näkymään",
        "onYourCollectionPage": "kokoelmasivulla",
        "removeCollectionForever": "Poista kokoelma",
        "theseAreTheBest": "Nämä ovat parhaat...",
        "findCollection": "Löydä kokoelma...",
        "findSubscription": "Löydä tilaus...",
        "more": "Enemmän",
        "less": "Vähemmän",
        "byPopularity": "Suosion mukaan",
        "collectionsSorting": "Kokoelmien lajittelu",
        "sortBy": "Järjestä",
        "custom": "Mukautettu",
        "byBookmarksCount": "Kirjanmerkkien määrän mukaan",
        "fastFilter": "Nopea suodatus...",
        "fastView": "Nopea kirjanmerkkien katsominen",
        "publicPage": "Julkinen sivusi",
        "welcomeSlide1D": "Tallenna tärkeitä linkkejä, artikkeleita, kuvia, videoita, esityksiä",
        "welcomeSlide1DD": "& järjestä ne temaattisiin kokoelmiin.",
        "welcomeSlide1DDD": "Kirjanmerkkisi ovat saatavilla tietokoneellasi ja älypuhelimellasi.",
        "welcomeSlide2": "Asenna laajennuksemme",
        "welcomeSlide2D": "Helpoin, yksinkertaisin ja nopein tapa",
        "welcomeSlide2DD": "tallentaa tärkeitä asioita verkosta.",
        "next": "Seuraava",
        "startCollecting": "Valmis!",
        "extensionFor": "Laajennus",
        "welcomeMobileSlide2": "Aina mukanasi",
        "sourceCode": "Lähdekoodi",
        "sourceCodeD": "Lähdekoodi selainlaajennuksellemme:",
        "sourceCodeDD": "Github repo.",
        "apiD": "Pian.",
        "importFrom": "Tuo",
        "openCollection": "Avaa kokoelma",
        "articlesProccessing": "Artikkeleiden koko teksti tuodaan myöhemmin.",
        "favoriteSites": "Suosikkisivustot",
        "showAll": "Näytä kaikki",
        "showAllBookmarks": "Näytä kaikki kirjanmerkit",
        "youHave": "Sinulla on",
        "fillCollectionInput": "Valitse kokoelma!",
        "browserBookmarklet": "Kirjanmerkkisovellus",
        "browserBookmarkletD": "Ei saatavilla selaimellesi? Kokeile kirjanmerkkisovellusta.",
        "browserBookmarkletDD": "Vedä tämä linkki kirjanmerkkipalkkiisi",
        "browserBookmarkletDDD": "Tallenna kokoelmaan",
        "hi": "Hei",
        "noTags": "Ei tageja",
        "interest_video": "Video",
        "interest_hobbies": "Harrastukset",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiraatio",
        "interest_food_drink": "Ruoka & juomat",
        "interest_animals": "Eläimet",
        "interest_health_fitness": "Terveys & kunto",
        "interest_illustrations": "Piirrokset",
        "interest_developers": "Kehittäjille",
        "interest_art": "Taide",
        "interest_history": "Historia",
        "interest_pictures": "Kuvat",
        "interest_film_music_books": "Elokuvat, musiikki & kirjat",
        "interest_cars_motorcycles": "Autot & moottoripyörät",
        "interest_fashion": "Muoti",
        "interest_science": "Tiede",
        "interest_news": "Uutiset",
        "interest_education": "Koulutus",
        "interest_psychology": "Psykologia",
        "interest_travel": "Matkailu",
        "interest_nature": "Luonto",
        "interest_work": "Työ",
        "interest_sites": "Sivustot",
        "interest_diy": "DIY",
        "interest_sport": "Urheilu",
        "interest_technology": "Teknologia",
        "interest_products": "Tuotteet",
        "interest_sweet_home": "Mukava koti",
        "interest_photography": "Valokuvaus",
        "interest_humor": "Huumori",
        "interest_erotic": "Erotiikka",
        "interest_other": "Muut",
        "interest_food_drink_recipes": "Reseptit",
        "interest_film_music_books_films": "Elokuvat",
        "interest_film_music_books_music": "Musiikki",
        "interest_film_music_books_books": "Kirjat",
        "interest_psychology_relations": "Ihmissuhteet",
        "interest_psychology_self_development": "Itsensä kehittäminen",
        "interest_technology_gadgets": "Gadgetit",
        "interest_technology_games": "Pelit",
        "interest_technology_geeks": "Nörtteily",
        "interest_technology_applications": "Sovellukset",
        "interest_developers_web": "Web-kehitys",
        "interest_developers_mobile": "Mobiili-kehitys",
        "to": "to",
        "inCollection": "kokoelmassa",
        "dragCollections": "Vaihda kokoelmien järjestystä vetämällä ja pudottamalla.",
        "feedAllCollections": "Kaikkien kokoelmien RSS-syöte",
        "orAlternativeFeed": "Kaikki kirjanmerkit",
        "feedWarning": "Varoitus! Älä jaa uniikkeja RSS-tilausten osoitteita muille ihmisille, sillä he voivat nähdä kirjanmerkkisi!",
        "publicRSSfeed": "Julkinen RSS-syöte",
        "showPrivateRSSfeed": "Näytä yksityinen RSS-syöte",
        "privateRSSfeed": "Yksityinen RSS-syöte",
        "mailNotifications": "Sähköposti-ilmoitukset",
        "disableWeeklyDigest": "Ota viikottaiset valinnat kirjanmerkeistäsi pois käytöstä",
        "trashEmpty": "Roskakori tyhjä",
        "forOtherBrowsers": "Muille selaimille",
        "saveLink": "Tallenna sivu",
        "instruction": "Ohjeet",
        "install": "Asenna",
        "importDescription": "Siirrä kirjanmerkit Google Chromesta, Firfoxista, Safarista, Operasta, Pocketista, Instapaperista, Readabilitysta, Kippt:sta, Deliciousista tai muista palveluista Raindrop.io:oon.",
        "createSubFolder": "Luo sisäkkäinen kokoelma",
        "pro_nesting": "Sisäkkäiset kokoelmat",
        "pro_nestingD": "Luo useita sisäkkäisiä kokoelmia.",
        "pro_dropbox": "Varmuuskopiointi Dropboxiin",
        "pro_dropboxD": "Varmuuskopioi kirjanmerkit ja sisältö Dropbox-käyttäjällesi.",
        "pro_support": "Ensisijainen tuki",
        "pro_supportD": "Sähköpostitse tai Skypen kautta.",
        "pro_nextFeatures": "Äänestä seuraavia ominaisuuksia",
        "pro_nextFeaturesD": "Tue tulevien toimintojen kehitystä!",
        "month": "kuukausi",
        "year": "vuosi",
        "oneMonth": "Yksi kuukausi",
        "threeMonth": "3 kuukautta",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Päivitä PRO-versioon",
        "renewPro": "Uusi PRO-tilaus",
        "renewPromonth": "Uusi PRO-tilaus kuukaudeksi",
        "renewProyear": "Uusi PRO-tilaus vuodeksi",
        "proTitle": "Käytä Raindrop.io:ta ilmaiseksi",
        "proTitleD": "tai päivitä saadaksesi",
        "proTitleDD": "lisäominaisuuksia.",
        "pro_noAds": "Mainokseton",
        "pro_noAdsD": "",
        "pro_speed_dial": "Uusi välilehti-sivu",
        "pro_apple": "iPhone/iPad app",
        "pro_desktop": "Työpöytäsovellus (synkronoinnin kanssa)",
        "pro_smart_collections": "Älykkäät kokoelmat (automaattisen tallennuksen kanssa)",
        "yesIwant": "Kyllä, haluan!",
        "votes": "äänestä",
        "votes1": "äänestä",
        "votes2": "äänet",
        "votes5": "äänet",
        "whatAddNext": "Mitä lisäisimme seuraavaksi?",
        "newString": "Uusi",
        "newBookmark": "Uusi kirjanmerkki",
        "thankYou": "Kiitos!",
        "nowYouHave": "Nyt sinulla on",
        "account": "käyttäjä",
        "goHome": "Kotiin",
        "until": "kunnes",
        "goToPayment": "Siirry maksuun",
        "subscriptionPeriod": "Aikajakso",
        "paymentMethod": "Maksutavat",
        "pricing": "Hinnoittelu",
        "visualBookmarks": "Visuaaliset kirjanmerkit",
        "readItLater": "Lue myöhemmin",
        "pro_notes": "Muistiinpanot",
        "sslConnection": "SSL-suojattu yhteys",
        "browserPlugin": "Selainlaajennus",
        "features": "Ominaisuudet",
        "free": "Ilmainen",
        "removeAccount": "Poista tili",
        "removeAccountD": "Sulje tili ja poista kaikki kokoelmat, kirjanmerkit ja tiedot?",
        "areYouSure": "Oletko varma?",
        "compareFreePro": "Vertaile ilmaista ja PRO-tiliä",
        "shareLinkVia": "Jaa linkki",
        "changeAvatarInfo": "Voit muuttaa sähköpostiisi asetettua avataria osoitteessa Gravatar.com. (Gravatarisi on kuva, joka seuraa sinua sivustolta sivustolle ja näyttäytyy nimesi vieressä, kun pidät jostain tai kommentoit johonkin)",
        "changeAvatar": "Vaihda avataria",
        "browserExtensionD": "Pääse kokoelmiin yhdellä klikkauksella miltä tahansa välilehdeltä",
        "macApp": "Mac OS X -sovellus",
        "macAppD": "Järjestele sisältöä ja lue artikkeleita Macillasi",
        "macAppV": "Mac OS X (10.8.0 tai uudempi)",
        "androidAppV": "Android-puhelin tai tabletti (4.0 tai uudempi)",
        "appleEditorsChoise": "Apple / Toimituksen valinta",
        "operaEditorsChoise": "Operan suosittelema",
        "downloadTitle": "Pidä kirjanmerkkisi kätevinä",
        "sharedCollections": "Jaetut kokoelmat",
        "serverCollaboratorsIncorrectToken": "On mahdotonta tulla kokoelman jäseneksi. Virheellinen osoite. Pyydä kokoelman tekijää kutsumaan sinut vielä kertaalleen.",
        "serverCollaboratorsAlready": "Olet jo kokoelman jäsen!",
        "joinCollaboratorsSuccess": "Onnistui! Nyt olet kokoelman jäsen.",
        "memberD": "Nyt voit lisätä ja muokata kirjanmerkkejä, luoda sisäkkäisiä kokoelmia tai kutsua uusia jäseniä.",
        "viewerD": "Voit vain katsella kirjanmerkkejä tässä kokoelmassa.",
        "savePage": "Tallenna sivu Raindrop.io:oon",
        "saveToInbox": "Tallenna saapuneisiin (Raindrop.io)",
        "saveImage": "Tallenna kuva Raindrop.io:oon",
        "myBookmarks": "Omat kirjanmerkit",
        "appName": "Raindrop.io - Fiksut Kirjanmerkit",
        "appDesc": "Näyttävä tapa muistaa kaikista tärkeimmät.",
        "firstRun": "Aloittaaksei Raindrop.io:n käyttämisen, päivitä sivu ja yritä uudestaan.",
        "refreshPage": "Päivitä nykyinen sivu",
        "support": "Tuki",
        "afterUpdateTitle": "Laajennus on päivitetty",
        "afterUpdate": "Meillä on useita uusia ominaisuuksia, parannuksia ja korjauksia. Haluatko nähdä, mitä uutta tässä versiossa on?",
        "seeChangeLog": "Lue lisää..."
    },
    "de_DE": {
        "server": "Unbekannter Fehler. Versuch’s erneut!",
        "serverundefined": "Unbekannter Fehler. Versuch's erneut!",
        "server0": "Altes Passwort eingeben!",
        "server1": "E-Mail-Adresse ist nicht zulässig!",
        "server2": "Name eingeben!",
        "server3": "Altes Passwort ist nicht zulässig!",
        "server4": "Passwort ist nicht zulässig!",
        "server5": "Diese E-Mail-Adresse wird bereits benutzt!",
        "server6": "Titel eingeben!",
        "server7": "Falsche Kombination aus E-Mail und Passwort!",
        "serverincorrect url": "Unzulässige URL",
        "collection": "Sammlung",
        "collectionNew": "Neue Sammlung",
        "collectionDeleteConfirm": "Möchtest du diese Sammlung wirklich löschen?\nAlle Lesezeichen innerhalb der Sammlung werden ebenfalls gelöscht!",
        "saveChanges": "Änderungen speichern",
        "saveError": "Fehler beim Speichern!",
        "saveSuccess": "Erfolgreich gespeichert!",
        "saved": "gespeichert",
        "addSuccess": "Erfolgreich hinzugefügt!",
        "moveSuccess": "Lesezeichen erfolgreich verschoben!",
        "removeSuccess": "Erfolgreich entfernt!",
        "coverUpload": "Cover hochladen",
        "fileUploadUnable": "Diese Datei kann nicht hochgeladen werden!",
        "fileUploadError": "Datei-Upload-Fehler. Versuchen sie eine andere Datei!",
        "linkNotRecognized": "Link wird nicht erkannt",
        "permalink": "Permalink:",
        "profile": "Profil",
        "signIn": "Anmelden",
        "myCollections": "Meine Sammlungen",
        "save": "Speichern",
        "remove": "Entfernen",
        "elements": "Lesezeichen",
        "about": "Über uns",
        "blog": "Blog",
        "tools": "Werkzeuge",
        "signInSocial": "Anmelden mit",
        "signUpSocial": "Registrieren mit",
        "signUp": "Registrieren",
        "register": "Registrieren",
        "recoverPassword": "Passwort zurücksetzen",
        "password": "Passwort",
        "edit": "Bearbeiten",
        "editMin": "Bearbeiten",
        "collectionEmpty": "Sammlung ist leer",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Empfehlen",
        "installExtension": "Erweiterung installieren",
        "extensionDescription": "Der schnellste und einfachste Weg wichtige Informationen aus dem Web zu sammeln.",
        "enterLink": "Link eingeben",
        "enterLinkDescription": "Gib einen Link zu einer Website, einem Artikel, Foto oder Video ein. Was immer du möchtest!",
        "backToCollection": "Zurück zur Sammlung",
        "viewOn": "Ansehen auf",
        "articled": "Artikel",
        "imaged": "Foto",
        "videod": "Inhalt",
        "linkd": "Link",
        "article": "Artikel",
        "image": "Foto",
        "video": "Inhalt",
        "link": "Link",
        "articles": "Artikel",
        "images": "Fotos",
        "videos": "Inhalt",
        "links": "Links",
        "articleSaved": "Artikel gespeichert",
        "imageSaved": "Foto gespeichert",
        "videoSaved": "Inhalt gespeichert",
        "linkSaved": "Link gespeichert",
        "articleRemoved": "Artikel in den Papierkorb verschoben",
        "imageRemoved": "Foto in den Papierkorb verschoben",
        "videoRemoved": "Inhalt in den Papierkorb verschoben",
        "linkRemoved": "Link in den Papierkorb verschoben",
        "articleRemovedPermament": "Artikel entfernt",
        "imageRemovedPermament": "Foto entfernt",
        "videoRemovedPermament": "Inhalt entfernen",
        "linkRemovedPermament": "Link entfernt",
        "bookmarksRemoved": "Lesezeichen in den Papierkorb verschoben",
        "bookmarksRemovedPermament": "Lesezeichen entfernt",
        "other": "andere",
        "vkontakte": "Вконтакте",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "auf",
        "basicData": "Account Einstellungen",
        "yourName": "Dein Name",
        "changePassword": "Passwort ändern",
        "newPassword": "Neues Passwort",
        "currentPassword": "Aktuelles Passwort",
        "findBookmarkLong": "Finde Lesezeichen...",
        "nothingFound": "Nichts gefunden",
        "add": "Hinzufügen",
        "cancel": "Abbrechen",
        "covers": "Cover",
        "upload": "Hochladen",
        "imagesOnly": "Nur Bilder. Maximale Größe: 5mb.",
        "uploadProgress": "Hochladen...",
        "fontFamily": "Schriftfamilie",
        "fontSize": "Schriftgröße",
        "interfaceStyle": "Interface Stil",
        "additional": "Zusätzliche",
        "fixedWidth": "Feste Breite",
        "logOut": "Abmelden",
        "titleAndDescription": "Titel & Beschreibung",
        "title": "Titel",
        "description": "Beschreibung",
        "enterTitle": "Titel eingeben",
        "enterDescription": "Beschreibung eingeben",
        "enable": "Aktiviert",
        "type": "Typ",
        "publicCollection": "Öffentliche Sammlung",
        "shareCollection": "Sammlung teilen",
        "sendEmail": "E-Mail senden",
        "copyLink": "Link kopieren",
        "language": "Sprache",
        "iHaveAccount": "Ich habe bereits einen Account",
        "createFirstCollection": "Erste Sammlung erstellen",
        "checkYourEmail": "Überprüfe deine Inbox!",
        "und": "&",
        "from": "von",
        "passwordChangeSuccess": "Passwort erfolgreich geändert!",
        "smartSearch": "Intelligente Suche",
        "subscribe": "Folgen",
        "youSubscribed": "Folgend",
        "subscriptions": "Folgend",
        "subscriptionsCollection": "Sammlung folgen",
        "tags": "Tags",
        "addTag": "Tag hinzufügen",
        "noDescription": "Keine Beschreibung",
        "basic": "Grundlegende",
        "background": "Hintergrund",
        "removeBackground": "Hintergrund entfernen",
        "or": "oder",
        "noCollections": "Keine Sammlungen",
        "noSubscriptions": "Keine Abonnements",
        "welcome": "Starte das Sammeln mit",
        "publicCollections": "Öffentliche Sammlungen",
        "collectionsCount": "Sammlungen",
        "noPublicCollections": "Keine öffentlichen Sammlungen",
        "noPublicCollectionsD": "Dieser Benutzer hat noch keine öffentlichen Sammlungen erstellt oder hinzugefügt.",
        "all": "Alle",
        "mobileApp": "Mobile App",
        "exportBookmarks": "Lesezeichen exportieren",
        "cover": "Cover",
        "saveToCollection": "In Sammlung speichern",
        "selectCollection": "Sammlung auswählen",
        "myAccount": "Mein Account",
        "enterTitleAndCollection": "Titel und Sammlung eingeben",
        "selectPreferedType": "Bevorzugter Typ auswählen",
        "back": "Zurück",
        "bySort": "Sortiert",
        "byName": "Nach Name",
        "byDate": "Nach Datum",
        "findOrCreateCollection": "Finde oder erstelle neue Sammlungen",
        "createCollection": "Neue Sammlung",
        "createCollectionFirst": "Erste Sammlung erstellen...",
        "createCollectionOrDrag": "Erstelle oder ziehe Sammlung hier...",
        "createGroup": "Gruppe erstellen",
        "startToSave": "Zum starten, einloggen!",
        "checkAgain": "Überprüfe nochmal!",
        "clickToMakeScreenshot": "Klicken um Screenshot zu erstellen",
        "elements1": "Lesezeichen",
        "elements2": "Lesezeichen",
        "elements5": "Lesezeichen",
        "defaultCollection-0": "Suche",
        "defaultCollection--1": "Inbox",
        "defaultCollection--99": "Papierkorb",
        "byTitle": "Alphabetisch",
        "saveBookmark": "Hier speichern",
        "saveBookmarkInInbox": "In Inbox speichern",
        "sites": "Seiten",
        "in": "in",
        "settings": "Einstellungen",
        "removeCollectionSuccess": "Sammlung entfernt",
        "changeIcon": "Symbol ändern",
        "group": "Gruppe",
        "untitled": "Ohne Titel",
        "removeGroupError": "Du kannst gefüllte Gruppen nicht löschen!",
        "select": "Auswählen",
        "create": "Erstellen",
        "privacy": "Datenschutz",
        "private": "Privat",
        "privateD": "Nur Sichtbar für dich",
        "public": "Öffentlich",
        "publicD": "Sichtbar für jeden",
        "moveDown": "Nach unten",
        "moveUp": "Nach oben",
        "moveSelectedBookmarks": "Ausgewählte Lesezeichen verschieben",
        "selectAll": "Alle auswählen",
        "supportOnlyUrls": "Du kannst nur Links mit http und https Protokoll speichern!",
        "unableToRecognizeSpecifiedLink": "Kann den ausgewählten Link nicht erkennen!",
        "addTags": "Tags hinzufügen",
        "noBookmarks": "Keine Lesezeichen",
        "noBookmarksD": "Drag 'n' Drop den Link oder das Bild von der Seite. Oder klick 'Seite speichern'.",
        "alreadyInCollection": "Bereits in der Sammlung",
        "alreadyInCollectionD": "Hier klicken, um die Beschreibung, Tags und Cover von Lesezeichen zu bearbeiten",
        "alreadyInCollectionDD": "Beschreibung, Tags und Cover bearbeiten",
        "inSocial": "Teile Link via",
        "copyURL": "URL Kopieren",
        "read": "Lesen",
        "smartBookmarks": "Intelligente Lesezeichen",
        "signUpEmail": "Mit E-Mail registrieren",
        "loginOrRegisterSocial": "Mit einem Sozialen Netzwerk anmelden oder registrieren",
        "help": "Hilfe",
        "name": "Name",
        "haveIdeas": "Bug oder Idee?",
        "followUsOn": "Folge uns für News und Updates:",
        "writeUs": "Kontakt",
        "forDevelopers": "Für Entwickler",
        "importBookmarks": "Lesezeichen importieren",
        "howToUse": "Wie verwenden?",
        "extension": "Erweiterung",
        "animation": "UI Animation",
        "closeOnPageClick": "Bei Mausklick auf der Seite schließen",
        "closeOnPageClickD": "Drag ' n ' Drop wird nicht zur Verfügung stehen",
        "helpContext": "Kontextmenü",
        "helpContextD": "Rechtsklick auf Lesezeichen oder Sammlungen für weitere Aktionen",
        "helpHotKey": "Hotkey",
        "helpHotKeyD": "Du kannst den Hotkey auf der Erweiterungs-Seite ändern",
        "helpVisible": "Erweitere den sichtbaren Bereich der Seite",
        "helpVisibleD": "Bewege den Cursor nach links und klick auf die erscheinende Leiste",
        "helpBatch": "Mehrfachauswahl",
        "helpBatchD": "Wähle mehrere Lesezeichen für Stapel-Aktionen aus",
        "moreTips": "Weitere Tipps anzeigen",
        "view": "Ansicht",
        "openLinksInNewTab": "Links in neuem Tab öffnen",
        "allBookmarks": "Alle Lesezeichen",
        "parent": "Übergeordnete Gruppe/Sammlung",
        "footerProAd": "Upgrade auf PRO",
        "footerProAdD": "für zusätzliche Features",
        "onlyInPro": "Nur mit einem PRO Account",
        "nestedCollections": "Verschachtelte Sammlungen",
        "dropboxBackup": "Dropbox Backup",
        "goToPRO": "Upgrade auf PRO",
        "commonSettings": "Allgemeine Einstellungen",
        "already": "bereits",
        "addBookmark": "Lesezeichen hinzufügen",
        "addBookmarkD": "Link für Website, Artikel, Bild oder Video einfügen",
        "advice": "Ratschlag",
        "addAdvice": "Andere Möglichkeiten um Lesezeichen hinzuzufügen",
        "browserExtension": "Browser Erweiterungen",
        "androidApp": "Android App",
        "androidAppD": "Speichere wichtige Inhalte aus dem Internet & deinen Lieblings-Apps!",
        "importBookmarksD": "Nimm deine Lesezeichen aus Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Klippt, Delicious oder anderen Diensten mit zu Raindrop.io.",
        "showInDock": "Im Dock anzeigen",
        "showInTray": "In Menüleiste anzeigen",
        "alwaysOnTop": "Fenster immer im Vordergrund",
        "blurHide": "Fenster ausblenden, wenn Fokus verloren geht",
        "desktopNeedRestart": "App neustarten, um die Einstellungen zu übernehmen",
        "refresh": "Aktualisieren",
        "editProfile": "Profil bearbeiten",
        "profilePage": "Meine Sammlungen-Seite",
        "upgradeAccount": "PRO Account",
        "screenshotError": "Website kann nicht eingefangen werden!",
        "lastWeek": "Die letzten 7 Tage",
        "copyLinkToClipboard": "Link in Zwischenablage kopieren",
        "openInBrowser": "Im Browser öffnen",
        "openInBrowserWithShift": "Um den Link im Browser zu öffnen, halten Sie die STRG- oder UMSCHALT-Taste",
        "selectAIconSet": "Wählen Sie eine Icon Set",
        "sharing": "Teilen",
        "members": "Mitglieder",
        "enterEmails": "E-Mail oder E-Mail's mit Komma getrennt eingeben...",
        "role_member": "Kann bearbeiten",
        "role_members": "Kann bearbeiten",
        "role_viewer": "Kann ansehen",
        "role_owner": "Eigentümer",
        "privateCollectionURL": "Keine öffentliche URL. Sammlung ist privat",
        "inviteMorePeople": "Weitere Personen einladen",
        "sendInvites": "Einladungen senden",
        "unshareCollection": "Freigabe der Sammlung aufheben",
        "withAccessLevel": "Mit Zugriffsebene",
        "invitesSendTo": "Einladungen gesendet an",
        "unshareSuccess": "Sammlung ungeteilt",
        "accessViaLink": "Zugriff über Link",
        "desktopIntegration": "Integration mit Mac OS X App",
        "error": "Fehler",
        "tryAgain": "Erneut versuchen",
        "moveError": "Kann nicht verschoben werden!",
        "dev": "Entwickler",
        "article1": "Artikel",
        "article2": "Artikel",
        "article5": "Artikel",
        "image1": "Foto",
        "image2": "Fotos",
        "image5": "Fotos",
        "video1": "Inhalt",
        "video2": "Inhalt",
        "video5": "Inhalt",
        "link1": "Link",
        "link2": "Links",
        "link5": "Links",
        "createNewCollection": "Sammlung erstellen",
        "toRefreshedRaindrop": "zu Raindrop.io",
        "comfortableReading": "Bequemes lesen",
        "press": "Presse",
        "subscriptionsD": "Erstelle und folge interessante öffentliche Sammlungen.",
        "smartSearchD": "Nach beliebigen Kriterien, schnell und einfach.",
        "tagsD": "Ein weiterer Weg um deine Sammlung zu organisieren.",
        "comfortableReadingD": "Konzentriere dich auf deine Lieblingsartikel auf eine Bequeme Art und Weise.",
        "dragNdropD": "Drag 'n' Drop deine Lesezeichen zwischen Sammlungen.",
        "exportBookmarksD": "Um deine Sammlung übertragen zu können.",
        "followUs": "Folge uns",
        "enterSearchCriteria": "Suchkriterien mit Komma getrennt eingeben",
        "enterSearchCriteriaD": "In beliebiger Reihenfolge. Wir machen das dann:",
        "explore": "Erkunden",
        "exploreCollections": "Sammlungen erkunden",
        "staffPicks": "Editors' Choice",
        "step": "Schritt",
        "uploadBookmarksFile": "Lesezeichen-Datei hochladen",
        "dropFilesHere": "Oder Datei hier ablegen",
        "importInfo1": "HTML Datei, maximale Größe 3 mb.",
        "importInfo2": "Du kannst diese Datei aus dem \"Lesezeichen exportieren\" Bereich deines Browsers oder Dienstes holen.",
        "importInfo3": "Unterstützen Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool oder Netscape Lesezeichen-Dateiformat.",
        "loading": "Lade",
        "noBookmarksToImport": "Keine Lesezeichen!",
        "foldersWithBookmarks": "Ordner",
        "removeIt": "Entfernen",
        "startImport": "Import starten",
        "selectOtherFile": "Andere Datei auswählen?",
        "importing": "Importiere",
        "of": "von",
        "bookmarks": "Lesezeichen",
        "importingInfo1": "Hab etwas Geduld. Es kann ein wenig dauern da jedes Lesezeichen erkannt werden muss.",
        "importingInfo2": "Diesen Tab nicht schließen!",
        "importEnd": "Import abgeschlossen!",
        "importSuccess": "Erfolgreich importiert",
        "importSuccessInfo": "Du kannst das Aussehen und die Symbole deiner Sammlungen anpassen und sie bekannt machen. Teile sie auf Facebook und Co. oder sende sie deinen Freunden per E-Mail.",
        "importingProcess": "Das Importieren der Lesezeichen kann abhängig von der Anzahl ein wenig dauern! Hab etwas Geduld, wir benachrichtigen dich mithilfe der angegebenen E-Mail Adresse, sobald sie verarbeitet sind!",
        "importingAlready": "Wir haben die Lesezeichen die du hochgeladen hast leider noch nicht verarbeitet! Bitte hab noch etwas Geduld, wir informieren dich über die angegebene E-Mail Adresse.",
        "specifyYourEmail": "Bitte gib deine E-Mail Adresse in deinem Profil an!",
        "staffPicksD": "Interessante Sammlung mit schönem Design",
        "templates": "Vorlagen",
        "collectionEdit": "Sammlung bearbeiten",
        "raindropEdit": "Lesezeichen bearbeiten",
        "icon": "Icon",
        "selectOtherIcon": "Icon ändern...",
        "optional": "Optional",
        "permamentLink": "Permanenter Link",
        "backgroundUploadD": "Du kannst thematische Hintergründe hochladen um deine Sammlung anzupassen. Die Anpassung erscheint",
        "onYourCollectionPage": "in der Sammlung",
        "removeCollectionForever": "Sammlung löschen",
        "theseAreTheBest": "Das sind die besten...",
        "findCollection": "Finde Sammlung...",
        "findSubscription": "Finde Abos...",
        "more": "Mehr",
        "less": "Weniger",
        "byPopularity": "Nach Beliebtheit",
        "collectionsSorting": "Sammlungen sortieren",
        "sortBy": "Sortieren nach",
        "custom": "Benutzerdefiniert",
        "byBookmarksCount": "Nach Anzahl der Lesezeichen",
        "fastFilter": "Schnelles filtern...",
        "fastView": "Schnellansicht der Lesezeichen",
        "publicPage": "Deine öffentliche Seite",
        "welcomeSlide1D": "Speichere wichtige Links, Artikel, Fotos, Videos und Präsentationen",
        "welcomeSlide1DD": "& organisiere sie in thematische Sammlungen.",
        "welcomeSlide1DDD": "Deine Lesezeichen sind von deinem Computer oder Smartphone verfügbar.",
        "welcomeSlide2": "Installiere unsere Erweiterung",
        "welcomeSlide2D": "Einfachster, simpelster und schnellster Weg",
        "welcomeSlide2DD": "um das wichtigste aus dem Internet abzuspeichern.",
        "next": "Weiter",
        "startCollecting": "Fertig!",
        "extensionFor": "Erweiterung für",
        "welcomeMobileSlide2": "Immer bei dir",
        "sourceCode": "Quelltext",
        "sourceCodeD": "Quelltext unserer Browser Erweiterung im",
        "sourceCodeDD": "GitHub Repo.",
        "apiD": "Bald.",
        "importFrom": "Importieren aus",
        "openCollection": "Offene Sammlung",
        "articlesProccessing": "Vollständiger Text der Artikel wird später hochgeladen.",
        "favoriteSites": "Lieblingsseiten",
        "showAll": "Alle anzeigen",
        "showAllBookmarks": "Alle Lesezeichen anzeigen",
        "youHave": "Du hast",
        "fillCollectionInput": "Bitte Sammlung auswählen!",
        "browserBookmarklet": "Browser Bookmarklet",
        "browserBookmarkletD": "Dein Browser ist nicht dabei? Versuch das Browser Bookmarklet.",
        "browserBookmarkletDD": "Ziehe diesen Link in deine Lesezeichenleiste",
        "browserBookmarkletDDD": "In Sammlung speichern",
        "hi": "Hallo",
        "noTags": "Keine Tags",
        "interest_video": "Video",
        "interest_hobbies": "Hobbys",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiration",
        "interest_food_drink": "Essen & Trinken",
        "interest_animals": "Tiere",
        "interest_health_fitness": "Gesundheit & Fitness",
        "interest_illustrations": "Illustrationen",
        "interest_developers": "Für Entwickler",
        "interest_art": "Kunst",
        "interest_history": "Geschichte",
        "interest_pictures": "Bilder",
        "interest_film_music_books": "Filme, Musik & Bücher",
        "interest_cars_motorcycles": "Autos & Motorräder",
        "interest_fashion": "Mode",
        "interest_science": "Wissenschaft",
        "interest_news": "News",
        "interest_education": "Bildung",
        "interest_psychology": "Psychologie",
        "interest_travel": "Reisen",
        "interest_nature": "Natur",
        "interest_work": "Arbeit",
        "interest_sites": "Webseiten",
        "interest_diy": "DIY",
        "interest_sport": "Sport",
        "interest_technology": "Technologie",
        "interest_products": "Produkte",
        "interest_sweet_home": "Trautes Heim",
        "interest_photography": "Fotografie",
        "interest_humor": "Humor",
        "interest_erotic": "Erotik",
        "interest_other": "Anderes",
        "interest_food_drink_recipes": "Rezepte",
        "interest_film_music_books_films": "Filme",
        "interest_film_music_books_music": "Musik",
        "interest_film_music_books_books": "Bücher",
        "interest_psychology_relations": "Beziehungen",
        "interest_psychology_self_development": "Selbstentwicklung",
        "interest_technology_gadgets": "Gadgets",
        "interest_technology_games": "Spiele",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "Anwendungen",
        "interest_developers_web": "Web-Entwicklung",
        "interest_developers_mobile": "Mobil-Entwicklung",
        "to": "an",
        "inCollection": "in Sammlung",
        "dragCollections": "Ändere die Reihenfolge der Sammlungen mit Drag 'n' drop.",
        "feedAllCollections": "RSS Feed mit allen Sammlungen",
        "orAlternativeFeed": "Alle Lesezeichen",
        "feedWarning": "Warnung! Teile niemals diese einzigartige URL von deinen RSS Abos mit anderen Leuten, da sie ansonsten deine Lesezeichen sehen können!",
        "publicRSSfeed": "Öffentlicher RSS Feed",
        "showPrivateRSSfeed": "Zeige privaten RSS Feed",
        "privateRSSfeed": "Privater RSS Feed",
        "mailNotifications": "E-Mail Benachrichtigungen",
        "disableWeeklyDigest": "Deaktiviere die Wöchentliche Zusammenfassung deiner Lesezeichen",
        "trashEmpty": "Papierkorb ist leer",
        "forOtherBrowsers": "Für andere Browser",
        "saveLink": "Seite speichern",
        "instruction": "Anleitung",
        "install": "Installieren",
        "importDescription": "Nimm deine Lesezeichen aus Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Klippt, Delicious oder anderen Diensten mit zu Raindrop.io.",
        "createSubFolder": "Verschachtelte Sammlung erstellen",
        "pro_nesting": "Verschachtelte Sammlungen",
        "pro_nestingD": "Erstelle beliebig viele verschachtelte Sammlungen.",
        "pro_dropbox": "Dropbox Backup",
        "pro_dropboxD": "Sichere Lesezeichen und Inhalte in deinem Dropbox Account.",
        "pro_support": "Vorrangiger Support",
        "pro_supportD": "Per E-Mail oder Skype.",
        "pro_nextFeatures": "Vote für die nächsten Features",
        "pro_nextFeaturesD": "Unterstütze die Entwicklung von neuen Features!",
        "month": "Monat",
        "year": "Jahr",
        "oneMonth": "Einen Monat",
        "threeMonth": "3 Monate",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Upgrade zu Pro",
        "renewPro": "PRO Abo erneuern",
        "renewPromonth": "PRO Abo für einen Monat erneuern",
        "renewProyear": "PRO Abo für ein Jahr erneuern",
        "proTitle": "Benutze Raindrop.io kostenlos",
        "proTitleD": "oder upgrade für",
        "proTitleDD": "zusätzliche Features.",
        "pro_noAds": "Werbefrei",
        "pro_noAdsD": "",
        "pro_speed_dial": "Neuer Tab",
        "pro_apple": "iPhone/iPad App",
        "pro_desktop": "Desktop App (mit Sync)",
        "pro_smart_collections": "Intelligente Sammlungen (Automatisches Speichern)",
        "yesIwant": "Ja, ich will!",
        "votes": "Stimme",
        "votes1": "Stimme",
        "votes2": "Stimmen",
        "votes5": "Stimmen",
        "whatAddNext": "Was sollten wir als Nächstes hinzufügen?",
        "newString": "Neu",
        "newBookmark": "Neues Lesezeichen",
        "thankYou": "Vielen Dank!",
        "nowYouHave": "Jetzt hast du einen",
        "account": "Account",
        "goHome": "Zur Startseite",
        "until": "bis",
        "goToPayment": "Weiter zur Zahlung",
        "subscriptionPeriod": "Zeitraum",
        "paymentMethod": "Zahlungsmethoden",
        "pricing": "Preise",
        "visualBookmarks": "Visuelle Lesezeichen",
        "readItLater": "Später lesen",
        "pro_notes": "Notizen",
        "sslConnection": "SSL-gesicherte Verbindung",
        "browserPlugin": "Browser Erweiterungen",
        "features": "Features",
        "free": "Kostenlos",
        "removeAccount": "Account entfernen",
        "removeAccountD": "Account schließen und alle Sammlungen, Lesezeichen und Daten löschen?",
        "areYouSure": "Bist du sicher?",
        "compareFreePro": "Vergleiche den kostenlosen und PRO Account",
        "shareLinkVia": "Teile Link via",
        "changeAvatarInfo": "Du kannst den Avatar welcher mit deiner E-Mail verknüpft ist auf Gravatar.com ändern. (Dein Gravatar begleitet dich von Seite zu Seite und taucht neben deinem Namen auf, wenn du Sachen kommentierst oder bloggst.)",
        "changeAvatar": "Avatar ändern",
        "browserExtensionD": "Zugang zu deinen Sammlungen mit nur einem Klick aus jedem Browser Tab heraus",
        "macApp": "Mac OS X App",
        "macAppD": "Organisiere Inhalte und lese Artikel von deinem Mac",
        "macAppV": "Mac OS X (10.8.0 oder neuer)",
        "androidAppV": "Android Smartphone oder Tablet (4.0 oder neuer)",
        "appleEditorsChoise": "Apple / Editor's Choice",
        "operaEditorsChoise": "Empfohlen von Opera",
        "downloadTitle": "Halte deine Lesezeichen griffbereit",
        "sharedCollections": "Geteilte Sammlungen",
        "serverCollaboratorsIncorrectToken": "Es ist unmöglich ein Mitglied dieser Sammlung zu werden. Ungültige URL. Frag den Autor der Sammlung danach dich noch einmal einzuladen.",
        "serverCollaboratorsAlready": "Du bist bereits Mitglied dieser Sammlung!",
        "joinCollaboratorsSuccess": "Erfolgreich! Du bist jetzt Mitglied dieser Sammlung.",
        "memberD": "Jetzt kannst du Lesezeichen hinzufügen und bearbeiten, verschachtelte Sammlungen erstellen und neue Mitglieder einladen.",
        "viewerD": "Du kannst in dieser Sammlung nur Lesezeichen ansehen.",
        "savePage": "Seite in Raindrop.io speichern",
        "saveToInbox": "In der Inbox speichern (Raindrop.io)",
        "saveImage": "Bild in Raindrop.io speichern",
        "myBookmarks": "Meine Lesezeichen",
        "appName": "Raindrop.io - Intelligente Lesezeichen",
        "appDesc": "Eine wunderschöne Möglichkeit das wichtigste zu behalten.",
        "firstRun": "Um mit Raindrop.io zu starten musst du nur noch die aktuelle Seite neu laden und erneut klicken.",
        "refreshPage": "Aktuelle Seite neu laden",
        "support": "Support",
        "afterUpdateTitle": "Die Erweiterung wurde aktualisiert",
        "afterUpdate": "Wir haben einige neue Funktionen, Verbesserungen und Bugfixes. Willst du sehen, was in der Version neu ist?",
        "seeChangeLog": "Weiterlesen..."
    },
    "ko_KR": {
        "server": "알 수 없는 오류가 발생하였습니다. 다시 시도하세요!",
        "serverundefined": "알 수 없는 오류가 발생하였습니다. 다시 시도하십시오!",
        "server0": "이전 비밀번호를 입력하세요!",
        "server1": "이메일이 유효하지 않습니다!",
        "server2": "사용자 이름을 입력하세요!",
        "server3": "이전 비밀번호가 일치하지 않습니다!",
        "server4": "비밀번호가 일치하지 않습니다!",
        "server5": "이 이메일은 이미 등록되어 있습니다!",
        "server6": "제목을 입력하세요!",
        "server7": "잘못된 이메일 또는 비밀번호입니다!",
        "serverincorrect url": "잘못된 URL",
        "collection": "컬렉션",
        "collectionNew": "새 컬렉션",
        "collectionDeleteConfirm": "이 컬렉션을 정말로 삭제하시겠습니까? 컬렉션 내의 모든 북마크도 함께 삭제됩니다!",
        "saveChanges": "변경 내용을 저장",
        "saveError": "저장하기 오류!",
        "saveSuccess": "성공적으로 저장됨!",
        "saved": "저장됨",
        "addSuccess": "성공적으로 추가됨!",
        "moveSuccess": "북마크가 성공적으로 이동됨!",
        "removeSuccess": "성공적으로 삭제됨!",
        "coverUpload": "커버 이미지 업로드",
        "fileUploadUnable": "이 파일은 업로드할 수 없습니다!",
        "fileUploadError": "파일 업로드 중 오류가 발생했습니다. 다른 파일로 다시 시도하세요!",
        "linkNotRecognized": "링크가 인식되지 않았습니다.",
        "permalink": "고유링크:",
        "profile": "프로필",
        "signIn": "로그인",
        "myCollections": "내 컬렉션",
        "save": "저장",
        "remove": "삭제",
        "elements": "북마크",
        "about": "서비스 소개",
        "blog": "블로그",
        "tools": "도구",
        "signInSocial": "소셜 네트워크로 로그인",
        "signUpSocial": "소셜 네트워크로 가입하기",
        "signUp": "가입하기",
        "register": "가입하기",
        "recoverPassword": "비밀번호 재설정",
        "password": "비밀번호",
        "edit": "수정",
        "editMin": "수정",
        "collectionEmpty": "컬렉션이 비어 있습니다",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "추천",
        "installExtension": "확장 프로그램 설치",
        "extensionDescription": "웹의 중요한 정보를 보관하는 가장 손쉽고 빠른 방법",
        "enterLink": "링크 입력",
        "enterLinkDescription": "원하는 웹페이지, 기사, 사진 및 비디오의 링크를 입력하세요.",
        "backToCollection": "컬렉션으로 돌아가기",
        "viewOn": "사이트에서 보기:",
        "articled": "기사",
        "imaged": "사진",
        "videod": "콘텐츠",
        "linkd": "링크",
        "article": "기사",
        "image": "사진",
        "video": "콘텐츠",
        "link": "링크",
        "articles": "기사",
        "images": "사진",
        "videos": "콘텐츠",
        "links": "링크",
        "articleSaved": "기사가 저장됨",
        "imageSaved": "사진이 저장됨",
        "videoSaved": "콘텐츠가 저장됨",
        "linkSaved": "링크가 저장됨",
        "articleRemoved": "기사가 휴지통으로 이동됨",
        "imageRemoved": "사진이 휴지통으로 이동됨",
        "videoRemoved": "콘텐츠가 휴지통으로 이동됨",
        "linkRemoved": "링크가 휴지통으로 이동됨",
        "articleRemovedPermament": "기사가 삭제됨",
        "imageRemovedPermament": "사진이 삭제됨",
        "videoRemovedPermament": "콘텐츠가 삭제됨",
        "linkRemovedPermament": "링크가 삭제됨",
        "bookmarksRemoved": "북마크가 휴지통으로 이동됨",
        "bookmarksRemovedPermament": "북마크가 삭제됨",
        "other": "다른",
        "vkontakte": "VK",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "·",
        "basicData": "계정 설정",
        "yourName": "사용자 이름",
        "changePassword": "비밀번호 변경",
        "newPassword": "새 비밀번호",
        "currentPassword": "현재 비밀번호",
        "findBookmarkLong": "북마크 찾기...",
        "nothingFound": "일치하는 검색 결과가 없습니다",
        "add": "추가",
        "cancel": "취소",
        "covers": "커버 이미지",
        "upload": "업로드",
        "imagesOnly": "이미지만 가능. 최대 크기: 5mb.",
        "uploadProgress": "업로드 중...",
        "fontFamily": "글꼴 패밀리",
        "fontSize": "폰트 크기",
        "interfaceStyle": "인터페이스 스타일",
        "additional": "추가",
        "fixedWidth": "고정폭",
        "logOut": "로그아웃",
        "titleAndDescription": "제목 및 설명",
        "title": "제목",
        "description": "설명",
        "enterTitle": "제목 입력",
        "enterDescription": "설명 입력",
        "enable": "적용됨",
        "type": "종류",
        "publicCollection": "공개 컬렉션",
        "shareCollection": "컬렉션 공유",
        "sendEmail": "이메일 보내기",
        "copyLink": "링크 복사",
        "language": "언어",
        "iHaveAccount": "이미 계정을 가지고 있습니다",
        "createFirstCollection": "첫 컬렉션 만들기",
        "checkYourEmail": "보관함을 확인하세요!",
        "und": "및",
        "from": "소유자",
        "passwordChangeSuccess": "비밀번호가 성공적으로 변경되었습니다!",
        "smartSearch": "스마트 검색",
        "subscribe": "팔로우",
        "youSubscribed": "팔로잉",
        "subscriptions": "팔로잉",
        "subscriptionsCollection": "컬렉션 팔로우",
        "tags": "태그",
        "addTag": "태그 추가",
        "noDescription": "설명 없음",
        "basic": "기본",
        "background": "배경",
        "removeBackground": "배경 삭제",
        "or": "또는",
        "noCollections": "컬렉션 없음",
        "noSubscriptions": "구독 없음",
        "welcome": "수집 시작하기 with",
        "publicCollections": "공개 컬렉션",
        "collectionsCount": "개 컬렉션",
        "noPublicCollections": "공개 컬렉션 없음",
        "noPublicCollectionsD": "이 사용자는 공개 컬렉션을 만들지 않았습니다.",
        "all": "모두",
        "mobileApp": "모바일 앱",
        "exportBookmarks": "북마크 내보내기",
        "cover": "커버 이미지",
        "saveToCollection": "컬렉션에 저장",
        "selectCollection": "컬렉션 선택",
        "myAccount": "내 계정",
        "enterTitleAndCollection": "제목과 컬렉션 입력",
        "selectPreferedType": "선호하는 종류 선택",
        "back": "뒤로가기",
        "bySort": "정렬됨:",
        "byName": "이름",
        "byDate": "날짜",
        "findOrCreateCollection": "컬렉션 찾기 또는 새 컬렉션 만들기",
        "createCollection": "새 컬렉션",
        "createCollectionFirst": "첫 컬렉션 만들기...",
        "createCollectionOrDrag": "여기에 컬렉션을 만들거나 드래그하기...",
        "createGroup": "그룹 만들기",
        "startToSave": "시작하려면 로그인하세요!",
        "checkAgain": "다시 확인하세요!",
        "clickToMakeScreenshot": "스크린샷을 만들려면 클릭하세요",
        "elements1": "북마크",
        "elements2": "개 북마크",
        "elements5": "북마크",
        "defaultCollection-0": "검색",
        "defaultCollection--1": "보관함",
        "defaultCollection--99": "휴지통",
        "byTitle": "이름",
        "saveBookmark": "여기에 저장",
        "saveBookmarkInInbox": "보관함에 저장",
        "sites": "사이트",
        "in": "in",
        "settings": "설정",
        "removeCollectionSuccess": "컬렉션이 삭제됨",
        "changeIcon": "아이콘 변경",
        "group": "그룹",
        "untitled": "제목 없음",
        "removeGroupError": "비어 있지 않은 그룹은 삭제할 수 없습니다!",
        "select": "선택",
        "create": "만들기",
        "privacy": "공개 옵션",
        "private": "비공개",
        "privateD": "오직 본인만 볼 수 있습니다",
        "public": "공개",
        "publicD": "누구든지 볼 수 있습니다",
        "moveDown": "아래로 이동",
        "moveUp": "위로 이동",
        "moveSelectedBookmarks": "선택한 북마크 이동",
        "selectAll": "모두 선택",
        "supportOnlyUrls": "오직 http와 https 프로토콜을 포함한 링크만 저장할 수 있습니다!",
        "unableToRecognizeSpecifiedLink": "지정된 링크를 인식할 수 없습니다!",
        "addTags": "태그 추가",
        "noBookmarks": "북마크 없음",
        "noBookmarksD": "페이지에서 링크 또는 이미지를 끌어다 놓거나 '페이지 저장'을 클릭하세요.",
        "alreadyInCollection": "이미 컬렉션에 있음",
        "alreadyInCollectionD": "북마크의 설명, 태그 및 커버 이미지를 수정하려면 클릭하세요",
        "alreadyInCollectionDD": "설명, 태그 및 커버 이미지 수정",
        "inSocial": "다음을 통해 링크 공유",
        "copyURL": "URL 복사",
        "read": "읽기",
        "smartBookmarks": "스마트 북마크",
        "signUpEmail": "이메일을 사용하여 가입하기",
        "loginOrRegisterSocial": "소셜 네트워크를 사용하여 로그인 또는 가입하기",
        "help": "도움말",
        "name": "이름",
        "haveIdeas": "버그가 있거나 아이디어를 가지고 계시나요?",
        "followUsOn": "팔로우하여 최신 소식과 업데이트 정보를 받으세요.",
        "writeUs": "문의하기",
        "forDevelopers": "개발자용",
        "importBookmarks": "북마크 가져오기",
        "howToUse": "어떻게 사용하나요?",
        "extension": "확장 프로그램",
        "animation": "UI 애니메이션",
        "closeOnPageClick": "페이지를 클릭하여 닫기",
        "closeOnPageClickD": "드래그 앤 드롭을 사용할 수 없습니다",
        "helpContext": "바로가기 메뉴",
        "helpContextD": "더 많은 기능을 원하시면 마우스 오른쪽 버튼으로 북마크 또는 컬렉션을 클릭하세요",
        "helpHotKey": "단축키",
        "helpHotKeyD": "확장 프로그램 페이지에서 키를 변경할 수 있습니다",
        "helpVisible": "페이지의 표시 부분 확장하기",
        "helpVisibleD": "패널의 왼쪽 끝 부분을 클릭하세요",
        "helpBatch": "다중 선택",
        "helpBatchD": "북마크를 일괄로 처리할 수 있습니다",
        "moreTips": "팁 더 보기",
        "view": "보기",
        "openLinksInNewTab": "새 탭에서 링크 열기",
        "allBookmarks": "모든 북마크",
        "parent": "상위 그룹/컬렉션",
        "footerProAd": "PRO로 업그레이드하기",
        "footerProAdD": "for extra features",
        "onlyInPro": "PRO 계정 사용자 전용",
        "nestedCollections": "하위 컬렉션",
        "dropboxBackup": "Dropbox 백업",
        "goToPRO": "PRO로 업그레이드하기",
        "commonSettings": "일반 설정",
        "already": "이미",
        "addBookmark": "북마크 추가",
        "addBookmarkD": "웹페이지, 기사, 사진 또는 비디오의 링크를 붙여넣으세요",
        "advice": "팁",
        "addAdvice": "다른 방식으로 북마크 추가",
        "browserExtension": "브라우저 확장 프로그램",
        "androidApp": "Android 앱",
        "androidAppD": "웹 또는 앱에서 중요한 콘텐츠를 저장하세요!",
        "importBookmarksD": "Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious 또는 다른 서비스에서 Raindrop.io로 북마크를 전송하세요.",
        "showInDock": "Dock에서 보기",
        "showInTray": "메뉴 막대에서 보기",
        "alwaysOnTop": "항상 화면 위에 표시",
        "blurHide": "포커스를 잃을 때 윈도우 숨기기",
        "desktopNeedRestart": "설정을 적용하려면 응용 프로그램을 재실행하세요",
        "refresh": "새로고침",
        "editProfile": "프로필 수정",
        "profilePage": "내 컬렉션 페이지",
        "upgradeAccount": "PRO 계정",
        "screenshotError": "웹 페이지를 캡쳐할 수 없습니다!",
        "lastWeek": "최근 7일간",
        "copyLinkToClipboard": "링크를 클립보드에 복사",
        "openInBrowser": "브라우저에서 열기",
        "openInBrowserWithShift": "브라우저에서 링크를 열려면 Ctrl 또는 Shift 키를 누르세요",
        "selectAIconSet": "아이콘 세트를 선택",
        "sharing": "공유",
        "members": "멤버",
        "enterEmails": "이메일 입력 또는 쉼표로 구분하여 추가 이메일 입력...",
        "role_member": "수정 가능",
        "role_members": "편집 가능",
        "role_viewer": "보기 가능",
        "role_owner": "소유자",
        "privateCollectionURL": "공개 URL 없음. 이 컬렉션은 비공개임.",
        "inviteMorePeople": "더 많은 사람 초대하기",
        "sendInvites": "초대장 보내기",
        "unshareCollection": "컬렉션 공유 해제",
        "withAccessLevel": "액세스 수준",
        "invitesSendTo": "초대장 받는 사람:",
        "unshareSuccess": "컬렉션 공유 해제됨",
        "accessViaLink": "링크를 통해 액세스",
        "desktopIntegration": "Mac OS X 앱과 통합",
        "error": "오류",
        "tryAgain": "다시 시도하세요",
        "moveError": "이동할 수 없습니다!",
        "dev": "개발자",
        "article1": "기사",
        "article2": "기사",
        "article5": "기사",
        "image1": "사진",
        "image2": "사진",
        "image5": "사진",
        "video1": "콘텐츠",
        "video2": "콘텐츠",
        "video5": "콘텐츠",
        "link1": "링크",
        "link2": "링크",
        "link5": "링크",
        "createNewCollection": "컬렉션 만들기",
        "toRefreshedRaindrop": "Raindrop.io로",
        "comfortableReading": "편하게 읽기",
        "press": "보도 자료",
        "subscriptionsD": "흥미로운 공개 컬렉션을 만들고 팔로우하세요.",
        "smartSearchD": "어떤 기준으로도 신속하고 쉽게.",
        "tagsD": "컬렉션을 정리하는 또 다른 방법.",
        "comfortableReadingD": "편리한 방법으로 좋아하는 기사에 집중하세요.",
        "dragNdropD": "컬렉션 간 북마크를 끌어다 놓으세요.",
        "exportBookmarksD": "컬렉션을 전송할 수 있습니다.",
        "followUs": "팔로우하기",
        "enterSearchCriteria": "쉼표로 구분하여 검색 조건 입력",
        "enterSearchCriteriaD": "순서에 상관없이 입력하신 것을 인식합니다:",
        "explore": "찾아보기",
        "exploreCollections": "컬렉션 찾아보기",
        "staffPicks": "에디터 추천",
        "step": "단계",
        "uploadBookmarksFile": "북마크 파일 업로드",
        "dropFilesHere": "또는 여기에 파일 놓기",
        "importInfo1": "HTML 파일, 최대 크기 3mb.",
        "importInfo2": "브라우저 또는 \"북마크 내보내기\" 섹션을 통해 파일을 가져오세요.",
        "importInfo3": "Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool 및 Netscape의 북마크 파일 포맷을 지원합니다.",
        "loading": "로드 중",
        "noBookmarksToImport": "북마크 없음!",
        "foldersWithBookmarks": "폴더",
        "removeIt": "삭제",
        "startImport": "가져오기 시작",
        "selectOtherFile": "다른 파일 선택",
        "importing": "가져오는 중",
        "of": "of",
        "bookmarks": "북마크",
        "importingInfo1": "모든 북마크가 인식되기까지 다소 시간이 걸리므로 기다려 주십시오.",
        "importingInfo2": "이 탭을 닫지 마십시오!",
        "importEnd": "가져오기 완료!",
        "importSuccess": "성공적으로 가져옴",
        "importSuccessInfo": "컬렉션의 외관 및 아이콘을 꾸미고 컬렉션을 공개하며 소셜 네트워크를 통해 공유하거나 친구들에게 링크를 보내보세요.",
        "importingProcess": "북마크 가져오기는 개수에 따라 다소 시간이 걸릴 수 있습니다! 처리가 완료되면 지정된 이메일로 알려 드립니다!",
        "importingAlready": "이전에 업로드한 북마크의 처리가 아직 완료되지 않았습니다! 잠시만 기다려주시면 지정된 이메일로 알려 드립니다!",
        "specifyYourEmail": "프로필에 이메일을 입력하세요!",
        "staffPicksD": "아름다운 디자인의 흥미로운 컬렉션",
        "templates": "템플릿",
        "collectionEdit": "컬렉션 수정",
        "raindropEdit": "북마크 수정",
        "icon": "아이콘",
        "selectOtherIcon": "아이콘 변경...",
        "optional": "선택 사항",
        "permamentLink": "고유링크",
        "backgroundUploadD": "컬렉션의 스타일 변경을 위해 배경 이미지를 업로드할 수 있습니다.",
        "onYourCollectionPage": "여기를 클릭하여 해당 페이지를 엽니다.",
        "removeCollectionForever": "컬렉션 삭제",
        "theseAreTheBest": "최고예요...",
        "findCollection": "컬렉션 찾기...",
        "findSubscription": "구독 찾기...",
        "more": "더보기",
        "less": "접기",
        "byPopularity": "인기",
        "collectionsSorting": "컬렉션 분류",
        "sortBy": "정렬 기준",
        "custom": "사용자 지정",
        "byBookmarksCount": "북마크개수",
        "fastFilter": "빠른 필터...",
        "fastView": "빠른 북마크 보기",
        "publicPage": "공개 페이지",
        "welcomeSlide1D": "중요한 링크, 기사, 사진, 비디오 및 프레젠테이션을 저장하고",
        "welcomeSlide1DD": "주제별 컬렉션으로 정리하세요.",
        "welcomeSlide1DDD": "북마크는 컴퓨터 및 스마트폰에서 사용할 수 있습니다.",
        "welcomeSlide2": "확장 프로그램 설치",
        "welcomeSlide2D": "웹으로부터 중요한 자료를 저장하기 위한",
        "welcomeSlide2DD": "가장 손쉽고 빠른 방법.",
        "next": "다음",
        "startCollecting": "완료!",
        "extensionFor": "확장 프로그램 for",
        "welcomeMobileSlide2": "항상 당신과 함께 합니다",
        "sourceCode": "소스 코드",
        "sourceCodeD": "브라우저 확장 프로그램 소스 코드는",
        "sourceCodeDD": "Github 저장소에 있습니다.",
        "apiD": "곧 공개하겠습니다.",
        "importFrom": "다음에서 가져오기:",
        "openCollection": "컬렉션 열기",
        "articlesProccessing": "기사의 전체 텍스트는 나중에 업로드 됩니다.",
        "favoriteSites": "즐겨찾는 사이트",
        "showAll": "모두 보기",
        "showAllBookmarks": "모든 북마크 보기",
        "youHave": "You have",
        "fillCollectionInput": "컬렉션을 선택하세요!",
        "browserBookmarklet": "브라우저 북마클릿",
        "browserBookmarkletD": "브라우저 확장 프로그램 설치를 원치 않으시면 브라우저 북마클릿을 사용해보세요.",
        "browserBookmarkletDD": "이 링크를 북마크바로 드래그하세요",
        "browserBookmarkletDDD": "컬렉션에 저장",
        "hi": "안녕하세요",
        "noTags": "태그 없음",
        "interest_video": "비디오",
        "interest_hobbies": "취미",
        "interest_design": "디자인",
        "interest_design_inspiration": "영감",
        "interest_food_drink": "음식 및 음료",
        "interest_animals": "동물",
        "interest_health_fitness": "건강 및 피트니스",
        "interest_illustrations": "일러스트",
        "interest_developers": "개발자용",
        "interest_art": "예술",
        "interest_history": "역사",
        "interest_pictures": "사진",
        "interest_film_music_books": "영화, 음악 및 도서",
        "interest_cars_motorcycles": "자동차 및 오토바이",
        "interest_fashion": "패션",
        "interest_science": "과학",
        "interest_news": "뉴스",
        "interest_education": "교육",
        "interest_psychology": "심리학",
        "interest_travel": "여행",
        "interest_nature": "자연",
        "interest_work": "업무",
        "interest_sites": "사이트",
        "interest_diy": "DIY",
        "interest_sport": "스포츠",
        "interest_technology": "테크놀로지",
        "interest_products": "제품",
        "interest_sweet_home": "스위트 홈",
        "interest_photography": "포토그래피",
        "interest_humor": "유머",
        "interest_erotic": "에로틱",
        "interest_other": "기타",
        "interest_food_drink_recipes": "레시피",
        "interest_film_music_books_films": "영화",
        "interest_film_music_books_music": "음악",
        "interest_film_music_books_books": "도서",
        "interest_psychology_relations": "인간관계",
        "interest_psychology_self_development": "자기 계발",
        "interest_technology_gadgets": "가젯",
        "interest_technology_games": "게임",
        "interest_technology_geeks": "Geeks",
        "interest_technology_applications": "애플리케이션",
        "interest_developers_web": "웹 개발",
        "interest_developers_mobile": "모바일 개발",
        "to": "to",
        "inCollection": "in collection",
        "dragCollections": "드래그 앤 드롭으로 컬렉션의 순서를 변경하세요.",
        "feedAllCollections": "모든 컬렉션 RSS 피드",
        "orAlternativeFeed": "모든 북마크",
        "feedWarning": "주의! 원치 않는 북마크 열람을 당하지 않도록 RSS 구독용 고유 URL을 다른 사람에게 공유하지 마십시오!",
        "publicRSSfeed": "공개 RSS 피드",
        "showPrivateRSSfeed": "비공개 RSS 피드 표시",
        "privateRSSfeed": "비공개 RSS 피드",
        "mailNotifications": "이메일 알림",
        "disableWeeklyDigest": "주간 북마크 다이제스트 사용 안 함",
        "trashEmpty": "빈 휴지통",
        "forOtherBrowsers": "다른 브라우저용",
        "saveLink": "페이지 저장",
        "instruction": "가져오기",
        "install": "설치",
        "importDescription": "Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious 또는 다른 서비스에서 Raindrop.io로 북마크를 전송하세요.",
        "createSubFolder": "하위 컬렉션 만들기",
        "pro_nesting": "하위 컬렉션",
        "pro_nestingD": "원하시는 만큼 하위 컬렉션을 만드세요.",
        "pro_dropbox": "Dropbox 백업",
        "pro_dropboxD": "북마크와 콘텐츠를 Dropbox에 백업하세요.",
        "pro_support": "우선 지원",
        "pro_supportD": "이메일 또는 Skype로 지원해 드립니다.",
        "pro_nextFeatures": "차후 기능에 대한 투표 참여",
        "pro_nextFeaturesD": "새로운 기능 개발에 지원하세요!",
        "month": "월",
        "year": "1년",
        "oneMonth": "1개월",
        "threeMonth": "3개월",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "PRO로 업그레이드하기",
        "renewPro": "PRO 구독 갱신하기",
        "renewPromonth": "1개월 PRO 구독 갱신하기",
        "renewProyear": "1년 PRO 구독 갱신하기",
        "proTitle": "Raindrop.io를 무료로 사용하거나",
        "proTitleD": "추가 기능을 위해",
        "proTitleDD": "업그레이드하세요.",
        "pro_noAds": "광고 제거",
        "pro_noAdsD": "",
        "pro_speed_dial": "새 탭 페이지",
        "pro_apple": "iPhone/iPad 앱",
        "pro_desktop": "데스크톱 앱 (동기화 지원)",
        "pro_smart_collections": "스마트 컬렉션 (자동 저장)",
        "yesIwant": "예, 원합니다!",
        "votes": "표",
        "votes1": "표",
        "votes2": "표",
        "votes5": "표",
        "whatAddNext": "다음에 무엇을 추가하기를 원하시나요?",
        "newString": "새로 만들기",
        "newBookmark": "새 북마크",
        "thankYou": "감사합니다!",
        "nowYouHave": "Now you have a",
        "account": "계정",
        "goHome": "홈으로 이동",
        "until": "까지",
        "goToPayment": "결제 페이지로 이동",
        "subscriptionPeriod": "기간",
        "paymentMethod": "결제 수단",
        "pricing": "가격",
        "visualBookmarks": "비주얼 북마크",
        "readItLater": "나중에 읽기",
        "pro_notes": "노트",
        "sslConnection": "SSL 보안 연결",
        "browserPlugin": "브라우저 확장 프로그램",
        "features": "기능",
        "free": "무료",
        "removeAccount": "계정 삭제",
        "removeAccountD": "모든 컬렉션, 북마크 및 데이터를 삭제하고 계정을 폐쇄하시겠습니까?",
        "areYouSure": "확실하십니까?",
        "compareFreePro": "무료 및 PRO 계정 비교하기",
        "shareLinkVia": "다음을 통해 링크 공유",
        "changeAvatarInfo": "Gravatar.com에서 연결된 이메일의 아바타를 변경할 수 있습니다. (Gravatar는 블로그에 댓글이나 글을 게시할 때 이름 옆에 나타나며 여러 사이트에서 이용할 수 있는 이미지입니다)",
        "changeAvatar": "아바타 변경",
        "browserExtensionD": "브라우저 탭에서 한 번의 클릭으로 컬렉션을 확인하세요",
        "macApp": "Mac OS X 앱",
        "macAppD": "맥에서 콘텐츠를 정리하고 기사를 읽으세요",
        "macAppV": "Mac OS X (10.8.0 이상)",
        "androidAppV": "Android 폰 또는 태블릿 (4.0 이상)",
        "appleEditorsChoise": "Apple / 에디터 추천",
        "operaEditorsChoise": "Opera의 의해 추천됨",
        "downloadTitle": "북마크를 항상 가까운 곳에 두세요",
        "sharedCollections": "공유된 컬렉션",
        "serverCollaboratorsIncorrectToken": "컬렉션의 멤버가 될 수 없습니다. 유효하지 않은 URL. 초대받으려면 소유자에게 다시 한번 문의하세요.",
        "serverCollaboratorsAlready": "이미 컬렉션의 멤버입니다!",
        "joinCollaboratorsSuccess": "성공! 이제 컬렉션의 멤버입니다.",
        "memberD": "이제 북마크를 추가 및 수정, 하위 컬렉션 만들기와 새 멤버를 초대할 수 있습니다.",
        "viewerD": "오직 본인만 이 컬렉션 내의 북마크를 볼 수 있습니다.",
        "savePage": "페이지를 Raindrop.io에 저장",
        "saveToInbox": "보관함 (Raindrop.io)에 저장",
        "saveImage": "이미지를 Raindrop.io에 저장",
        "myBookmarks": "내 북마크",
        "appName": "Raindrop.io - 스마트 북마크",
        "appDesc": "중요한 것을 기억하는 가장 훌륭한 방법",
        "firstRun": "Raindrop.io를 사용하려면 현재 페이지를 새로고침하고 다시 클릭하세요.",
        "refreshPage": "현재 페이지 새로고침",
        "support": "지원",
        "afterUpdateTitle": "확장 프로그램이 업데이트되었습니다",
        "afterUpdate": "여러 새로운 기능 추가와 개선 및 버그를 수정했습니다. 이 버전의 새로워진 점을 보시겠습니까?",
        "seeChangeLog": "더 읽기..."
    },
    "zh_TW": {
        "server": "糟糕出錯了！請再試一次～",
        "serverundefined": "糟糕出錯了！請再試一次～",
        "server0": "請輸入舊密碼！",
        "server1": "無效的 email",
        "server2": "請輸入您的名字！",
        "server3": "無效的舊密碼！",
        "server4": "無效的密碼！",
        "server5": "此E-MAIL已被註冊！",
        "server6": "請輸入標題！",
        "server7": "錯誤的E-MAIL或密碼！",
        "serverincorrect url": "無法判讀的網址",
        "collection": "收集",
        "collectionNew": "新的收集",
        "collectionDeleteConfirm": "確定要刪除這個書籤收藏夾？這會將書籤收藏夾中的所有的書籤全部刪除！",
        "saveChanges": "儲存變更",
        "saveError": "儲存失敗",
        "saveSuccess": "儲存成功",
        "saved": "儲存",
        "addSuccess": "已成功新增！",
        "moveSuccess": "已成功移動書籤！",
        "removeSuccess": "刪除成功！",
        "coverUpload": "上傳封面",
        "fileUploadUnable": "此檔案無法上傳！",
        "fileUploadError": "檔案上傳錯誤，請嘗試另一個檔案！",
        "linkNotRecognized": "無法辨識連結",
        "permalink": "永久連結",
        "profile": "個人檔案",
        "signIn": "登入",
        "myCollections": "我的收集",
        "save": "儲存",
        "remove": "移除",
        "elements": "書籤",
        "about": "關於我們",
        "blog": "部落格",
        "tools": "工具",
        "signInSocial": "使用...登入",
        "signUpSocial": "使用...註冊",
        "signUp": "註冊",
        "register": "註冊",
        "recoverPassword": "重新設定密碼",
        "password": "密碼",
        "edit": "編輯",
        "editMin": "編輯",
        "collectionEmpty": "空的收集",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "推薦",
        "installExtension": "安裝擴充功能",
        "extensionDescription": "最簡單、輕鬆、快速地摘錄網路上好東西的方式",
        "enterLink": "輸入連結",
        "enterLinkDescription": "輸入任何網頁、文章、圖片、影片，以及其他你想要的連結",
        "backToCollection": "回到收集",
        "viewOn": "檢視於",
        "articled": "文章",
        "imaged": "圖片",
        "videod": "內容",
        "linkd": "連結",
        "article": "文章",
        "image": "圖片",
        "video": "內容",
        "link": "連結",
        "articles": "文章",
        "images": "圖片",
        "videos": "內容",
        "links": "連結",
        "articleSaved": "文章已儲存",
        "imageSaved": "圖片已儲存",
        "videoSaved": "內容已儲存",
        "linkSaved": "連結已儲存",
        "articleRemoved": "文章已移到回收筒",
        "imageRemoved": "圖片已移到回收筒",
        "videoRemoved": "內容已移到回收筒",
        "linkRemoved": "連結已移到回收筒",
        "articleRemovedPermament": "文章已刪除",
        "imageRemovedPermament": "圖片已刪除",
        "videoRemovedPermament": "內容已刪除",
        "linkRemovedPermament": "連結已刪除",
        "bookmarksRemoved": "書籤已移到回收筒",
        "bookmarksRemovedPermament": "書籤已刪除",
        "other": "其他",
        "vkontakte": "聯絡",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "在",
        "basicData": "帳號設定",
        "yourName": "您的名字",
        "changePassword": "更改密碼",
        "newPassword": "新的密碼",
        "currentPassword": "現在使用的密碼",
        "findBookmarkLong": "尋找書籤...",
        "nothingFound": "甚麼都找不到",
        "add": "新增",
        "cancel": "取消",
        "covers": "封面",
        "upload": "上傳",
        "imagesOnly": "僅限 5MB 大小以內的圖片",
        "uploadProgress": "上傳中...",
        "fontFamily": "字型",
        "fontSize": "字體大小",
        "interfaceStyle": "介面樣式",
        "additional": "更多設定",
        "fixedWidth": "固定寬度",
        "logOut": "登出",
        "titleAndDescription": "標題 & 描述",
        "title": "標題",
        "description": "描述",
        "enterTitle": "請輸入標題",
        "enterDescription": "輸入描述",
        "enable": "開啟",
        "type": "類型",
        "publicCollection": "公開的收集",
        "shareCollection": "分享收集",
        "sendEmail": "發送電子郵件",
        "copyLink": "複製連結",
        "language": "語言",
        "iHaveAccount": "我已經註冊了",
        "createFirstCollection": "建立第一個書籤收藏夾",
        "checkYourEmail": "請檢查您的收件匣 ！",
        "und": "&",
        "from": "從",
        "passwordChangeSuccess": "成功更改密碼 ！",
        "smartSearch": "智慧搜尋",
        "subscribe": "追蹤",
        "youSubscribed": "關注中",
        "subscriptions": "關注中",
        "subscriptionsCollection": "追蹤書籤收藏夾",
        "tags": "標籤",
        "addTag": "新增一個標籤",
        "noDescription": "沒有描述",
        "basic": "基本",
        "background": "背景",
        "removeBackground": "移除背景",
        "or": "或",
        "noCollections": "無收集",
        "noSubscriptions": "沒有訂閱",
        "welcome": "開始使用Raindrop.io",
        "publicCollections": "公開的收集",
        "collectionsCount": "收集冊",
        "noPublicCollections": "沒有公開的收集",
        "noPublicCollectionsD": "這名使用者沒有建立，或沒有公開的書籤資料夾",
        "all": "全部",
        "mobileApp": "行動應用程式",
        "exportBookmarks": "匯出書籤",
        "cover": "封面",
        "saveToCollection": "儲存到收集",
        "selectCollection": "選擇收集",
        "myAccount": "我的帳戶",
        "enterTitleAndCollection": "輸入標題與收集",
        "selectPreferedType": "選擇首選類型",
        "back": "返回",
        "bySort": "排序",
        "byName": "按名稱",
        "byDate": "按日期",
        "findOrCreateCollection": "尋找或創建新的收集",
        "createCollection": "建立書籤資料夾",
        "createCollectionFirst": "建立第一個書籤資料夾",
        "createCollectionOrDrag": "建立或拖曳書籤資料夾到這裡",
        "createGroup": "建立新群組",
        "startToSave": "請登入並開始使用",
        "checkAgain": "再次檢查 ！",
        "clickToMakeScreenshot": "按一下此處，讓螢幕截圖",
        "elements1": "書籤",
        "elements2": "書籤",
        "elements5": "書籤",
        "defaultCollection-0": "搜尋",
        "defaultCollection--1": "收件箱",
        "defaultCollection--99": "垃圾桶",
        "byTitle": "按字母順序排列",
        "saveBookmark": "儲存在這",
        "saveBookmarkInInbox": "儲存在收件箱",
        "sites": "網站",
        "in": "在",
        "settings": "設定",
        "removeCollectionSuccess": "移除書籤資料夾",
        "changeIcon": "更改圖示",
        "group": "群組",
        "untitled": "無題",
        "removeGroupError": "你不能刪除已存在資料的群組",
        "select": "選擇",
        "create": "建立",
        "privacy": "隱私",
        "private": "私人",
        "privateD": "只限自己可以查看",
        "public": "公開",
        "publicD": "所有人都可以查看",
        "moveDown": "下移",
        "moveUp": "上移",
        "moveSelectedBookmarks": "移動您選擇的書籤",
        "selectAll": "選擇全部",
        "supportOnlyUrls": "只能儲存使用 HTTP 或 HTTPs 協定的連結",
        "unableToRecognizeSpecifiedLink": "無法辨識指定的連結！",
        "addTags": "新增標籤",
        "noBookmarks": "沒有任何書籤",
        "noBookmarksD": "拖放頁面上的連結或圖片，或點擊「儲存頁面」",
        "alreadyInCollection": "已經儲存在書籤資料夾中",
        "alreadyInCollectionD": "按此進行編輯描述、標籤和書籤的封面",
        "alreadyInCollectionDD": "編輯描述、 標籤和封面",
        "inSocial": "分享連結通過",
        "copyURL": "複製 URL",
        "read": "已讀",
        "smartBookmarks": "智慧書簽",
        "signUpEmail": "使用E-MAIL註冊",
        "loginOrRegisterSocial": "登入或使用社交網路註冊",
        "help": "說明",
        "name": "名稱",
        "haveIdeas": "發現 Bug 或有其他想法嗎？",
        "followUsOn": "關注我們的新聞和更新：",
        "writeUs": "聯絡我們",
        "forDevelopers": "開發者",
        "importBookmarks": "匯入書籤",
        "howToUse": "如何使用？",
        "extension": "擴展工具",
        "animation": "UI 動畫",
        "closeOnPageClick": "按一下頁面關閉",
        "closeOnPageClickD": "不可使用拖放功能",
        "helpContext": "功能表",
        "helpContextD": "在書籤或書籤資料夾上按下滑鼠右鍵以執行更多動作",
        "helpHotKey": "快捷鍵",
        "helpHotKeyD": "你可以在擴充功能管理頁面上修改快捷鍵",
        "helpVisible": "展開網頁上的可見部份",
        "helpVisibleD": "向左移動滑鼠，按下面板顯示",
        "helpBatch": "多選",
        "helpBatchD": "選擇書籤以進行批次處理",
        "moreTips": "顯示更多的技巧",
        "view": "檢視",
        "openLinksInNewTab": "在新分頁中打開連結",
        "allBookmarks": "所有書籤",
        "parent": "上層群組/書籤資料夾",
        "footerProAd": "升級到專業版",
        "footerProAdD": "獲得額外的特色功能",
        "onlyInPro": "僅限專業版帳號",
        "nestedCollections": "樹狀書籤資料夾",
        "dropboxBackup": "Dropbox 備份",
        "goToPRO": "升級到專業版",
        "commonSettings": "常用設置",
        "already": "已經",
        "addBookmark": "新增書籤",
        "addBookmarkD": "粘貼連結到任何網頁、 文章、 圖片或視頻",
        "advice": "建議",
        "addAdvice": "其他新增書籤的方法",
        "browserExtension": "瀏覽器插件",
        "androidApp": "Android 應用",
        "androidAppD": "保存來自網路以及你喜愛的應用程式的重要內容！",
        "importBookmarksD": "將書籤從 Google Chrome、Firefox、Safari、Opera、Pocket、Instapaper、Readability、 Kippt、Delicious 或其他服務轉移到 Raindrop.io 上",
        "showInDock": "在 Dock 中顯示",
        "showInTray": "在功能列表中顯示",
        "alwaysOnTop": "總在最前面的視窗",
        "blurHide": "失去关注時隱藏視窗",
        "desktopNeedRestart": "重啟應用以应用設置",
        "refresh": "刷新",
        "editProfile": "編輯設定",
        "profilePage": "我收藏的網頁",
        "upgradeAccount": "專業帳户",
        "screenshotError": "無法截取網頁！",
        "lastWeek": "過去 7 天內",
        "copyLinkToClipboard": "將連結複製到剪貼板",
        "openInBrowser": "在瀏覽器中打開",
        "openInBrowserWithShift": "按 Ctrl 鍵或 Shift 鍵可以在瀏覽器中打開連結",
        "selectAIconSet": "選擇图标集",
        "sharing": "分享",
        "members": "成員",
        "enterEmails": "輸入郵址，或以逗號分隔多個郵址",
        "role_member": "可以編輯",
        "role_members": "可以編輯",
        "role_viewer": "可以查看",
        "role_owner": "主人",
        "privateCollectionURL": "网址不公開，因为這是私人的收集",
        "inviteMorePeople": "邀請更多的人",
        "sendInvites": "發送邀請",
        "unshareCollection": "取消共用收集",
        "withAccessLevel": "存取層級",
        "invitesSendTo": "發送邀请至",
        "unshareSuccess": "不共用的書籤收藏夾",
        "accessViaLink": "通過連結訪問",
        "desktopIntegration": "結合 Mac OS X 的應用程式",
        "error": "錯誤",
        "tryAgain": "再試一次",
        "moveError": "無法移動 ！",
        "dev": "開發人員",
        "article1": "文章",
        "article2": "文章",
        "article5": "文章",
        "image1": "圖片",
        "image2": "照片",
        "image5": "照片",
        "video1": "內容",
        "video2": "內容",
        "video5": "內容",
        "link1": "連結",
        "link2": "連結",
        "link5": "連結",
        "createNewCollection": "創建收集",
        "toRefreshedRaindrop": "對 Raindrop.io",
        "comfortableReading": "舒適的閱讀",
        "press": "新聞稿",
        "subscriptionsD": "建立並關注有興趣的公共書籤資料夾",
        "smartSearchD": "按任何標準，快速、 輕鬆地。",
        "tagsD": "另一種方式來組織您的書籤資料夾",
        "comfortableReadingD": "集中精力，以方便的方式，瀏覽你最喜歡的文章",
        "dragNdropD": "在書籤資料夾之間拖曳書籤",
        "exportBookmarksD": "為了能夠轉換您的書籤資料夾",
        "followUs": "追蹤我們",
        "enterSearchCriteria": "輸入以逗號分隔的搜尋條件",
        "enterSearchCriteriaD": "根據任意順序，我們會偵測您的輸入：",
        "explore": "瀏覽",
        "exploreCollections": "瀏覽書籤資料夾",
        "staffPicks": "編輯精選",
        "step": "步驟",
        "uploadBookmarksFile": "上傳書籤檔案",
        "dropFilesHere": "或將書籤檔案拖曳到此處",
        "importInfo1": "HTML 檔案，不大於 3 MB。",
        "importInfo2": "您可以從瀏覽器或服務的＂匯出書籤＂得到這個檔案。",
        "importInfo3": "支援 Google Chrome、Mozilla Firefox、Safari、Google 書籤、Delicious、Kippt、Zootool 或 Netscape 書籤檔案格式",
        "loading": "載入中",
        "noBookmarksToImport": "沒有任何書籤",
        "foldersWithBookmarks": "資料夾",
        "removeIt": "移除",
        "startImport": "開始匯入",
        "selectOtherFile": "選擇其他檔嗎？",
        "importing": "匯入中",
        "of": "的",
        "bookmarks": "書籤",
        "importingInfo1": "請稍候，系統需要花一些時間辨識每一個書籤",
        "importingInfo2": "請勿關閉本分頁 ！",
        "importEnd": "匯入完成 ！",
        "importSuccess": "已成功匯入",
        "importSuccessInfo": "我們建議您自訂書籤資料夾的外型與圖示，並將它設為公開，再把連結分享出去或寄給您的朋友",
        "importingProcess": "根據書籤數量而定，匯入的過程可能要花一些時間。請耐心等候，我們會盡快進行，並在完成之後以 email 通知您",
        "importingAlready": "很抱歉，我們還沒有處理完您上傳的書籤。請再耐心等候，完成之後我們會以 email 通知您",
        "specifyYourEmail": "請在您的個人資料中設定 email",
        "staffPicksD": "以美觀的設計呈現有興趣的資料夾",
        "templates": "範本",
        "collectionEdit": "編輯書籤資料夾",
        "raindropEdit": "編輯書籤",
        "icon": "圖示",
        "selectOtherIcon": "更改圖示......",
        "optional": "選項",
        "permamentLink": "永久連結",
        "backgroundUploadD": "你可以上傳背景圖片來個人化您的書籤資料夾風格。它將出現",
        "onYourCollectionPage": "在書籤資料夾的頁面上",
        "removeCollectionForever": "刪除書籤資料夾",
        "theseAreTheBest": "這些都是最好的...",
        "findCollection": "查找書籤資料夾......",
        "findSubscription": "尋找訂閱...",
        "more": "更多",
        "less": "較少",
        "byPopularity": "依普及程度",
        "collectionsSorting": "排序的集合",
        "sortBy": "按排序",
        "custom": "自訂",
        "byBookmarksCount": "由書簽計數",
        "fastFilter": "快速過濾......",
        "fastView": "快速查看書簽",
        "publicPage": "您的公共頁面",
        "welcomeSlide1D": "保存重要環節、 文章、 照片、 視頻、 演示文稿",
        "welcomeSlide1DD": "& 將它們組織成專題收藏。",
        "welcomeSlide1DDD": "你的書簽也可從您的電腦和智慧手機存取。",
        "welcomeSlide2": "安裝我們的擴展",
        "welcomeSlide2D": "最簡單、 最簡單、 最快捷的方式",
        "welcomeSlide2DD": "要從 Web 保存重要的東西。",
        "next": "下一個",
        "startCollecting": "完成了 ！",
        "extensionFor": "的副檔名",
        "welcomeMobileSlide2": "永遠和你在一起",
        "sourceCode": "原始程式碼",
        "sourceCodeD": "我們的瀏覽器擴充功能的原始碼放在",
        "sourceCodeDD": "GitHub 儲存庫",
        "apiD": "很快。",
        "importFrom": "從....匯入",
        "openCollection": "打開書籤資料夾",
        "articlesProccessing": "文章的全文將會稍後上載。",
        "favoriteSites": "最喜愛的網站",
        "showAll": "全部顯示",
        "showAllBookmarks": "顯示所有書籤",
        "youHave": "你有",
        "fillCollectionInput": "請選擇書籤資料夾 ！",
        "browserBookmarklet": "瀏覽器書籤工具",
        "browserBookmarkletD": "沒有您的瀏覽器嗎？請嘗試瀏覽器書籤工具",
        "browserBookmarkletDD": "把這個連結拖曳到您的書籤欄",
        "browserBookmarkletDDD": "儲存到收集",
        "hi": "你好",
        "noTags": "沒有標籤",
        "interest_video": "影片",
        "interest_hobbies": "興趣",
        "interest_design": "設計",
        "interest_design_inspiration": "靈感",
        "interest_food_drink": "飲食",
        "interest_animals": "動物",
        "interest_health_fitness": "健康與健身",
        "interest_illustrations": "插圖",
        "interest_developers": "開發者",
        "interest_art": "藝術",
        "interest_history": "歷史",
        "interest_pictures": "圖片",
        "interest_film_music_books": "電影、 音樂與書籍",
        "interest_cars_motorcycles": "汽機車",
        "interest_fashion": "時尚",
        "interest_science": "科學",
        "interest_news": "新聞",
        "interest_education": "教育",
        "interest_psychology": "心理學",
        "interest_travel": "旅行",
        "interest_nature": "自然",
        "interest_work": "工作",
        "interest_sites": "網站",
        "interest_diy": "自己動手",
        "interest_sport": "體育",
        "interest_technology": "科技",
        "interest_products": "產品",
        "interest_sweet_home": "甜蜜的家",
        "interest_photography": "攝影",
        "interest_humor": "幽默",
        "interest_erotic": "色情",
        "interest_other": "其它",
        "interest_food_drink_recipes": "食譜",
        "interest_film_music_books_films": "電影",
        "interest_film_music_books_music": "音樂",
        "interest_film_music_books_books": "書籍",
        "interest_psychology_relations": "人際關係",
        "interest_psychology_self_development": "自我發展",
        "interest_technology_gadgets": "潮物",
        "interest_technology_games": "遊戲",
        "interest_technology_geeks": "資訊職人",
        "interest_technology_applications": "應用程式",
        "interest_developers_web": "網站開發",
        "interest_developers_mobile": "行動應用開發",
        "to": "至",
        "inCollection": "收藏集中",
        "dragCollections": "用拖放的方式來調整書籤收藏夾的順序",
        "feedAllCollections": "所有書籤收藏夾的 RSS feed",
        "orAlternativeFeed": "所有書籤",
        "feedWarning": "警告 ！不要分享你的RSS訂閱的獨立URL，否則他人將能夠查看你的書籤。",
        "publicRSSfeed": "公開的 RSS feed",
        "showPrivateRSSfeed": "顯示私人 RSS 提要",
        "privateRSSfeed": "私人 RSS 提要",
        "mailNotifications": "電子郵件通知",
        "disableWeeklyDigest": "關閉書籤的每週摘要",
        "trashEmpty": "回收桶已清空",
        "forOtherBrowsers": "對於其他瀏覽器",
        "saveLink": "保存頁面",
        "instruction": "說明",
        "install": "安裝",
        "importDescription": "將書籤從 Google Chrome、Firefox、Safari、Opera、Pocket、Instapaper、Readability、 Kippt、Delicious 或其他服務轉移到 Raindrop.io 上",
        "createSubFolder": "創建嵌套的收藏集",
        "pro_nesting": "樹狀書籤資料夾",
        "pro_nestingD": "創建任意數量的嵌套集合。",
        "pro_dropbox": "Dropbox 備份",
        "pro_dropboxD": "備份的書簽至dropbox帳戶。",
        "pro_support": "優先支援",
        "pro_supportD": "通過電子郵件或 skype。",
        "pro_nextFeatures": "投選下一個功能",
        "pro_nextFeaturesD": "支援開發新功能！",
        "month": "月",
        "year": "年",
        "oneMonth": "一個月",
        "threeMonth": "3個月",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "升級到專業版",
        "renewPro": "續訂專業版",
        "renewPromonth": "按月續訂專業版",
        "renewProyear": "按年續訂專業版",
        "proTitle": "免費使用 Raindrop.io",
        "proTitleD": "或升級",
        "proTitleDD": "額外的功能。",
        "pro_noAds": "無廣告",
        "pro_noAdsD": "",
        "pro_speed_dial": "新分頁",
        "pro_apple": "iPhone/iPad 應用程式",
        "pro_desktop": "桌面應用程式 (支援同步)",
        "pro_smart_collections": "智慧書籤資料夾(自動儲存)",
        "yesIwant": "是啊，我想要 ！",
        "votes": "投票",
        "votes1": "投票",
        "votes2": "投票",
        "votes5": "投票",
        "whatAddNext": "我們接下來要新增什麼？",
        "newString": "新",
        "newBookmark": "新書籤",
        "thankYou": "感謝您！",
        "nowYouHave": "現在你有",
        "account": "帳戶",
        "goHome": "回首頁",
        "until": "直到",
        "goToPayment": "去付款",
        "subscriptionPeriod": "期間",
        "paymentMethod": "付款方法",
        "pricing": "定價",
        "visualBookmarks": "視覺化書籤",
        "readItLater": "稍後閱讀",
        "pro_notes": "備註",
        "sslConnection": "SSL 加密連線",
        "browserPlugin": "瀏覽器插件",
        "features": "功能",
        "free": "免費",
        "removeAccount": "刪除帳戶",
        "removeAccountD": "關閉帳戶並刪除所有書籤資料夾、 書籤和資料嗎？",
        "areYouSure": "是否確定？",
        "compareFreePro": "比較免費和 PRO 帳戶",
        "shareLinkVia": "分享連結通過",
        "changeAvatarInfo": "您可以更改與您在 Gravatar.com 上的電子郵件相關聯的頭像。（你在某個網誌留言或發文後，Gravatar頭像會出現在你的名稱的旁邊）",
        "changeAvatar": "更換頭像",
        "browserExtensionD": "在任何瀏覽器按一鍵就能存取書籤資料夾",
        "macApp": "Mac OS X 應用程式",
        "macAppD": "用你的 Mac 整理內容與閱讀文章",
        "macAppV": "Mac OS X (10.8.0 或更高版本)",
        "androidAppV": "Android 手機或平板電腦 (4.0 或更高版本)",
        "appleEditorsChoise": "Apple／編輯精選",
        "operaEditorsChoise": "由 Opera 推薦",
        "downloadTitle": "隨身攜帶您的書籤",
        "sharedCollections": "共用書籤資料夾",
        "serverCollaboratorsIncorrectToken": "無效的 URL。您不是這個書籤資料夾的成員，請再向該收藏夾的作者索取邀請",
        "serverCollaboratorsAlready": "你已是書籤資料夾的成員 ！",
        "joinCollaboratorsSuccess": "成功 ！你己是書籤資料夾的成員。",
        "memberD": "現在您可以新增與編輯書籤、建立樹狀結構的書籤資料夾、以及邀請新成員",
        "viewerD": "您只能查看此書籤資料夾中的書籤。",
        "savePage": "將網頁保存到 Raindrop.io",
        "saveToInbox": "將保存到收件匣 (Raindrop.io)",
        "saveImage": "將圖像保存到 Raindrop.io",
        "myBookmarks": "我的書籤",
        "appName": "Raindrop.io-智慧書簽",
        "appDesc": "一個美麗方式來記住最重要的。",
        "firstRun": "要開始使用 Raindrop.io，您只要先重新整理現在的頁面並點擊一下圖示",
        "refreshPage": "刷新當前頁",
        "support": "支援",
        "afterUpdateTitle": "已經更新擴充功能",
        "afterUpdate": "我們有幾個新功能、 改進和錯誤修正。想看看新版本嗎？",
        "seeChangeLog": "閱讀更多..."
    },
    "sv_SE": {
        "server": "Okänt fel. Pröva igen!",
        "serverundefined": "Okänt fel. Pröva igen!",
        "server0": "Ange ditt gamla lösenord!",
        "server1": "Ogiltig e-post!",
        "server2": "Ange ditt namn!",
        "server3": "Ditt gamla lösenord stämmer inte!",
        "server4": "Lösenordet är inte giltigt!",
        "server5": "Den här epostadressen är redan registrerad!",
        "server6": "Ange en titel!",
        "server7": "Ogiltig e-postadress eller lösenord!",
        "serverincorrect url": "Ogiltig URL",
        "collection": "Samling",
        "collectionNew": "Ny samling",
        "collectionDeleteConfirm": "Är du säker på att du vill radera denna samling? Bokmärkena i samlingen kommer också att raderas!",
        "saveChanges": "Spara ändringar",
        "saveError": "Det gick inte att spara!",
        "saveSuccess": "Sparat!",
        "saved": "sparad",
        "addSuccess": "Tillagt!",
        "moveSuccess": "Bokmärken har flyttats!",
        "removeSuccess": "Borttaget!",
        "coverUpload": "Ladda upp miniatyrbild",
        "fileUploadUnable": "Den här filen kan inte laddas upp!",
        "fileUploadError": "Filuppladdningen misslyckades. Försök med en annan fil!",
        "linkNotRecognized": "Länken går inte att hitta",
        "permalink": "Permanent länk:",
        "profile": "Profil",
        "signIn": "Logga in",
        "myCollections": "Mina samlingar",
        "save": "Spara",
        "remove": "Radera",
        "elements": "bokmärke",
        "about": "Om oss",
        "blog": "Blogg",
        "tools": "Verktyg",
        "signInSocial": "Logga in med",
        "signUpSocial": "Registrera dig med",
        "signUp": "Registrera dig",
        "register": "Registrera dig",
        "recoverPassword": "Återställ lösenord",
        "password": "Lösenord",
        "edit": "Redigera",
        "editMin": "Redigera",
        "collectionEmpty": "Samlingen är tom",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Rekommenderade",
        "installExtension": "Installera tillägg",
        "extensionDescription": "Det enkla och supersnabba sättet att spara det viktiga från webben.",
        "enterLink": "Ange länk",
        "enterLinkDescription": "Skriv en webbadress till en hemsida, artikel, foto eller video. Vad du vill.",
        "backToCollection": "Tillbaka till samling",
        "viewOn": "Titta på",
        "articled": "artikel",
        "imaged": "foto",
        "videod": "innehåll",
        "linkd": "länk",
        "article": "Artikel",
        "image": "Foto",
        "video": "Innehåll",
        "link": "Länk",
        "articles": "Artiklar",
        "images": "Bilder",
        "videos": "Innehåll",
        "links": "Länkar",
        "articleSaved": "Artikel sparad",
        "imageSaved": "Bild sparad",
        "videoSaved": "Innehållet sparat",
        "linkSaved": "Länk sparad",
        "articleRemoved": "Artikeln har flyttats  till papperskorgen",
        "imageRemoved": "Fotot har flyttats till papperskorgen",
        "videoRemoved": "Innehållet har flyttas till papperskorgen",
        "linkRemoved": "Länken har flyttats till papperskorgen",
        "articleRemovedPermament": "Artikeln har tagits bort",
        "imageRemovedPermament": "Fotot har tagits bort",
        "videoRemovedPermament": "Innehållet har tagits bort",
        "linkRemovedPermament": "Länken har tagits bort",
        "bookmarksRemoved": "Bokmärket har flyttats till papperskorgen",
        "bookmarksRemovedPermament": "Bokmärkena har tagits bort",
        "other": "annat",
        "vkontakte": "Vkontakte",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "på",
        "basicData": "Kontoinställningar",
        "yourName": "Ditt namn",
        "changePassword": "Ändra lösenord",
        "newPassword": "Nytt lösenord",
        "currentPassword": "Nuvarande lösenord",
        "findBookmarkLong": "Hitta bokmärke...",
        "nothingFound": "Hittade ingenting",
        "add": "Lägg till",
        "cancel": "Avbryt",
        "covers": "Miniatyrbilder",
        "upload": "Ladda upp",
        "imagesOnly": "Endast bilder.  Maximal filstorlek: 5 MB.",
        "uploadProgress": "Laddar upp...",
        "fontFamily": "Teckensnitt",
        "fontSize": "Teckenstorlek",
        "interfaceStyle": "Gränssnittsstil",
        "additional": "Ytterligare",
        "fixedWidth": "Fast bredd",
        "logOut": "Logga ut",
        "titleAndDescription": "Titel och beskrivning",
        "title": "Titel",
        "description": "Beskrivning",
        "enterTitle": "Ange en titel",
        "enterDescription": "Ange en beskrivning",
        "enable": "Aktiverad",
        "type": "Typ",
        "publicCollection": "Publik samling",
        "shareCollection": "Dela samlingen",
        "sendEmail": "Skicka e-mail",
        "copyLink": "Kopiera en länk",
        "language": "Språk",
        "iHaveAccount": "Jag har redan ett konto",
        "createFirstCollection": "Skapa din första samling",
        "checkYourEmail": "Ta en titt i din inkorg!",
        "und": "och",
        "from": "från",
        "passwordChangeSuccess": "Lösenordet har ändrats!",
        "smartSearch": "Smartsökning",
        "subscribe": "Följ",
        "youSubscribed": "Följer",
        "subscriptions": "Följer",
        "subscriptionsCollection": "Följer samlingar",
        "tags": "Taggar",
        "addTag": "Lägg till en tagg",
        "noDescription": "Beskrivning saknas",
        "basic": "Grundläggande",
        "background": "Bakgrund",
        "removeBackground": "Radera bakgrund",
        "or": "eller",
        "noCollections": "Inga samlingar",
        "noSubscriptions": "Inga följningar",
        "welcome": "Börja samla med",
        "publicCollections": "Publika samlingar",
        "collectionsCount": "kollektioner",
        "noPublicCollections": "Inga publika samlingar",
        "noPublicCollectionsD": "Denna användare har inte skapat några samlingar eller har inga publika samlingar.",
        "all": "Alla",
        "mobileApp": "Mobilapp",
        "exportBookmarks": "Exportera bokmärken",
        "cover": "Miniatyrbild",
        "saveToCollection": "Spara till samling",
        "selectCollection": "Välj samling",
        "myAccount": "Mitt konto",
        "enterTitleAndCollection": "Ange titel och samling",
        "selectPreferedType": "Välj förvald typ",
        "back": "Återvänd",
        "bySort": "Sorterade",
        "byName": "efter namn",
        "byDate": "efter datum",
        "findOrCreateCollection": "Hitta eller skapa en ny samling",
        "createCollection": "Ny samling",
        "createCollectionFirst": "Skapa din första samling...",
        "createCollectionOrDrag": "Skapa eller drag hit en samling...",
        "createGroup": "Skapa grupp",
        "startToSave": "Var god logga in för att börja!",
        "checkAgain": "Kontrollera igen!",
        "clickToMakeScreenshot": "Klicka för att fånga en skärmbild",
        "elements1": "bokmärke",
        "elements2": "bokmärken",
        "elements5": "bokmärken",
        "defaultCollection-0": "Sök",
        "defaultCollection--1": "Inkorg",
        "defaultCollection--99": "Papperskorgen",
        "byTitle": "Alfabetiskt",
        "saveBookmark": "Spara här",
        "saveBookmarkInInbox": "Spara i inkorgen",
        "sites": "Sidor",
        "in": "i",
        "settings": "Inställningar",
        "removeCollectionSuccess": "Samlingen har tagits bort",
        "changeIcon": "Ändra ikon",
        "group": "Grupp",
        "untitled": "Namnlös",
        "removeGroupError": "Du kan inte ta bort grupper som inte är tomma!",
        "select": "Välj",
        "create": "Skapa",
        "privacy": "Integritet",
        "private": "Privat",
        "privateD": "Bara du kan se",
        "public": "Publik",
        "publicD": "Vem som helst kan se",
        "moveDown": "Flytta ned",
        "moveUp": "Flytta upp",
        "moveSelectedBookmarks": "Flytta alla markerade bokmärken",
        "selectAll": "Välj alla",
        "supportOnlyUrls": "Du kan bara spara länkar med http- eller https-protokoll!",
        "unableToRecognizeSpecifiedLink": "Det går inte att känna igen länken!",
        "addTags": "Lägg till taggar",
        "noBookmarks": "Inga bokmärken",
        "noBookmarksD": "Dra och släpp länk eller bild från sidan. Alternativt klicka på 'Spara sidan\".",
        "alreadyInCollection": "Finns redan i samlingen",
        "alreadyInCollectionD": "Klicka för att ändra beskrivning, taggar och miniatyrbild",
        "alreadyInCollectionDD": "Redigera beskrivning, taggar och miniatyrbild",
        "inSocial": "Dela länken via",
        "copyURL": "Kopiera webbadressen",
        "read": "Läs",
        "smartBookmarks": "Smarta bokmärken",
        "signUpEmail": "Registrera dig med E-mailadress",
        "loginOrRegisterSocial": "Logga in eller registrera med konto från sociala nätverk",
        "help": "Hjälp",
        "name": "Namn",
        "haveIdeas": "Rapportera en bugg eller dela en idé?",
        "followUsOn": "Följ oss för nyheter och uppdateringar:",
        "writeUs": "Kontakta oss",
        "forDevelopers": "För utvecklare",
        "importBookmarks": "Importera bokmärken",
        "howToUse": "Hur använder man?",
        "extension": "Tillägg",
        "animation": "UI-animering",
        "closeOnPageClick": "Stäng vid klickning",
        "closeOnPageClickD": "Drag-n-drop  kommer inte vara tillgängligt",
        "helpContext": "Kontextuell meny",
        "helpContextD": "Högerklicka på bokmärken eller samlingar för fler åtgärder",
        "helpHotKey": "Snabbtangent",
        "helpHotKeyD": "Du kan byta snabbtangent på tilläggets sida",
        "helpVisible": "Expandera den synliga delen av sidan",
        "helpVisibleD": "Flytta markören till vänster och klicka på panelen som dyker upp",
        "helpBatch": "Markera flera",
        "helpBatchD": "Välj bokmärken för massåtgärder",
        "moreTips": "Visa fler tips",
        "view": "Visa",
        "openLinksInNewTab": "Öppna länkar i nya flikar",
        "allBookmarks": "Alla bokmärken",
        "parent": "Överordnad grupp/samling",
        "footerProAd": "Uppgradera till PRO",
        "footerProAdD": "för extrafunktioner",
        "onlyInPro": "Endast med PRO-konto",
        "nestedCollections": "Nästlade samlingar",
        "dropboxBackup": "Backup till Dropbox",
        "goToPRO": "Uppgradera till PRO",
        "commonSettings": "Vanliga inställninar",
        "already": "redan",
        "addBookmark": "Lägg till bokmärke",
        "addBookmarkD": "Klistra in webbadressen till någon hemsida, artikel eller video",
        "advice": "Tips",
        "addAdvice": "Andra sätt att lägga till bokmärken",
        "browserExtension": "Webbläsartillägg",
        "androidApp": "Androidapp",
        "androidAppD": "Spara viktigt innehåll från webben och dina favoritappar!",
        "importBookmarksD": "Överför bokmärken från Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious eller annan tjänst to Raindrop.io.",
        "showInDock": "Visa i Dock",
        "showInTray": "Visa i menyraden",
        "alwaysOnTop": "Lägg alltid fönstret överst",
        "blurHide": "Dölj fönster när det inte är i fokus",
        "desktopNeedRestart": "Starta appen för att tillämpa inställningar",
        "refresh": "Uppdatera",
        "editProfile": "Redigera profil",
        "profilePage": "Min samlingar sidan",
        "upgradeAccount": "PRO-konto",
        "screenshotError": "Webbsida kan inte fångas!",
        "lastWeek": "De senaste 7 dagarna",
        "copyLinkToClipboard": "Kopiera länk till urrklipp",
        "openInBrowser": "Öppna i webbläsare",
        "openInBrowserWithShift": "För att öppna länken i webbläsaren, tryck och håll ned Ctrl- eller SKIFT-tangenten",
        "selectAIconSet": "Välj ikoner",
        "sharing": "Delning",
        "members": "Medlemmar",
        "enterEmails": "Ange E-mailadress eller flera E-mailadresser avgränsade med komma...",
        "role_member": "Kan redigera",
        "role_members": "Kan redigera",
        "role_viewer": "Kan visa",
        "role_owner": "Ägare",
        "privateCollectionURL": "Ingen publik URL. Samlingen är privat",
        "inviteMorePeople": "Bjuda in fler personer",
        "sendInvites": "Skicka inbjudningar",
        "unshareCollection": "Sluta dela samlingen",
        "withAccessLevel": "Med åtkomstnivå",
        "invitesSendTo": "Inbjudningar skickade till",
        "unshareSuccess": "Samlingen är inte delad",
        "accessViaLink": "Åtkomst via länk",
        "desktopIntegration": "Integration med Mac OS X app",
        "error": "Fel",
        "tryAgain": "Försök igen",
        "moveError": "Går inte att flytta!",
        "dev": "Utvecklare",
        "article1": "artikel",
        "article2": "artiklar",
        "article5": "artiklar",
        "image1": "foto",
        "image2": "foton",
        "image5": "foton",
        "video1": "innehåll",
        "video2": "innehåll",
        "video5": "innehåll",
        "link1": "länk",
        "link2": "länkar",
        "link5": "länkar",
        "createNewCollection": "Skapa samling",
        "toRefreshedRaindrop": "till Raindrop.io",
        "comfortableReading": "Bekväm läsning",
        "press": "Tryck på",
        "subscriptionsD": "Skapa och följ intressanta publika samlingar.",
        "smartSearchD": "Efter valfria kriterier, snabbt och enkelt.",
        "tagsD": "Ett annat sätt att organisera din samling.",
        "comfortableReadingD": "Koncentrera dig på att läsa din favorit artiklar, på ett bekvämt sätt.",
        "dragNdropD": "Drag-n-drop:a bokmärken mellan dina samlingar.",
        "exportBookmarksD": "För att kunna överföra din samling.",
        "followUs": "Följ oss",
        "enterSearchCriteria": "Ange sökkriterier separerade med kommatecken",
        "enterSearchCriteriaD": "Ordning spelar ingen roll. Vi listar ut vad du vill:",
        "explore": "Utforska",
        "exploreCollections": "Utforska samlingar",
        "staffPicks": "Redaktionens val",
        "step": "Steg",
        "uploadBookmarksFile": "Ladda upp bokmärkesfil",
        "dropFilesHere": "eller drag och släpp filen här",
        "importInfo1": "HTML-fil, maximal storlek 3 MB.",
        "importInfo2": "Ta den här filen från din webbläsare eller från tjänster i \"exportera bokmärken\"-sektionen.",
        "importInfo3": "Stöder Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool och Netscape bokmärksfilformat.",
        "loading": "Laddar",
        "noBookmarksToImport": "Inga bokmärken!",
        "foldersWithBookmarks": "Mappar",
        "removeIt": "Radera",
        "startImport": "Börja importera",
        "selectOtherFile": "Välj annan fil?",
        "importing": "Importerar",
        "of": "av",
        "bookmarks": "bokmärken",
        "importingInfo1": "Vänta, det kan ta tid eftersom varje bokmärke behöver identifieras.",
        "importingInfo2": "Stäng inte den här fliken!",
        "importEnd": "Importeringen färdig!",
        "importSuccess": "Har importerats",
        "importSuccessInfo": "Vi rekommenderar att du anpassar samlingarnas utseende och ikoner, gör dem publika och delar dem över sociala nätverk eller skickar länkar till vänner.",
        "importingProcess": "Importera bokmärken kan ta lite tid beroende på antal! Ha tålamod, så snart de bearbetats meddelar vi dig på angiven e-mailadress!",
        "importingAlready": "Vi har tyvärr inte avslutat bearbetningen av bokmärkena du laddade upp tidigare! Var god vänta lite till. Vi kommer att meddela dig på angiven e-mailadress.",
        "specifyYourEmail": "Ange e-mailadress i din profil!",
        "staffPicksD": "Spännande samling med vacker design",
        "templates": "Mallar",
        "collectionEdit": "Ändra samling",
        "raindropEdit": "Ändra bokmärke",
        "icon": "Ikon",
        "selectOtherIcon": "Ändra ikon...",
        "optional": "Frivillig",
        "permamentLink": "Permament länk",
        "backgroundUploadD": "Du kan ladda upp tematisk bakgrund för din samling. Det kommer att synas",
        "onYourCollectionPage": "på samlingens sida",
        "removeCollectionForever": "Ta bort samling",
        "theseAreTheBest": "Det här är de bästa...",
        "findCollection": "Hitta samling...",
        "findSubscription": "Hitta prenumeration...",
        "more": "Mer",
        "less": "Mindre",
        "byPopularity": "Efter popularitet",
        "collectionsSorting": "Sortering av samlingar",
        "sortBy": "Sortera efter",
        "custom": "Anpassad",
        "byBookmarksCount": "Efter antal bokmärken",
        "fastFilter": "Snabbfiltrering...",
        "fastView": "Ta en snabbtitt på bokmärken",
        "publicPage": "Din publika sida",
        "welcomeSlide1D": "Spara viktiga länkar, artiklar, foton, videos och presentationer",
        "welcomeSlide1DD": "och organisera dem i tematiska samlingar.",
        "welcomeSlide1DDD": "Dina bokmärken finns tillgängliga från dator och smartphone.",
        "welcomeSlide2": "Installera vårt tillägg",
        "welcomeSlide2D": "Enklaste och snabbaste sättet",
        "welcomeSlide2DD": "att spara viktiga saker från webben.",
        "next": "Nästa",
        "startCollecting": "Färdig!",
        "extensionFor": "Tillägg för",
        "welcomeMobileSlide2": "Alltid med dig",
        "sourceCode": "Källkod",
        "sourceCodeD": "Källkod för våra webbläsartillägg på",
        "sourceCodeDD": "GitHub repo.",
        "apiD": "Snart.",
        "importFrom": "Importera från",
        "openCollection": "Öppen samling",
        "articlesProccessing": "Artiklar i fulltext kommer laddas upp senare.",
        "favoriteSites": "Favoritsidor",
        "showAll": "Visa alla",
        "showAllBookmarks": "Visa alla bokmärken",
        "youHave": "Du har",
        "fillCollectionInput": "Var god välj en samling!",
        "browserBookmarklet": "Bookmarklet för webbläsare",
        "browserBookmarkletD": "Stöds inga av dina webbläsare? Prova vår bookmarklet.",
        "browserBookmarkletDD": "Dra denna länk till webbläsarens bokmärkesfält",
        "browserBookmarkletDDD": "Spara till samling",
        "hi": "Hej",
        "noTags": "Inga taggar",
        "interest_video": "video",
        "interest_hobbies": "Hobbies",
        "interest_design": "Design",
        "interest_design_inspiration": "Inspiration",
        "interest_food_drink": "Mat & dryck",
        "interest_animals": "Djur",
        "interest_health_fitness": "Hälsa & fitness",
        "interest_illustrations": "Illustrationer",
        "interest_developers": "För utvecklare",
        "interest_art": "Konst",
        "interest_history": "Historia",
        "interest_pictures": "Bilder",
        "interest_film_music_books": "Filmer, musik & böcker",
        "interest_cars_motorcycles": "Bilar & motorcyklar",
        "interest_fashion": "Mode",
        "interest_science": "Vetenskap",
        "interest_news": "Nyheter",
        "interest_education": "Utbildning",
        "interest_psychology": "Psykologi",
        "interest_travel": "Resor",
        "interest_nature": "Natur",
        "interest_work": "Arbete",
        "interest_sites": "Sidor",
        "interest_diy": "Gör-det-själv",
        "interest_sport": "Sport",
        "interest_technology": "Teknologi",
        "interest_products": "Produkter",
        "interest_sweet_home": "Mysiga hem",
        "interest_photography": "Fotografering",
        "interest_humor": "Humor",
        "interest_erotic": "Erotik",
        "interest_other": "Andra intressen",
        "interest_food_drink_recipes": "Recept",
        "interest_film_music_books_films": "Filmer",
        "interest_film_music_books_music": "Musik",
        "interest_film_music_books_books": "Böcker",
        "interest_psychology_relations": "Relationer",
        "interest_psychology_self_development": "Självutveckling",
        "interest_technology_gadgets": "Prylar",
        "interest_technology_games": "Spel",
        "interest_technology_geeks": "Nördigt",
        "interest_technology_applications": "Program",
        "interest_developers_web": "Webbutveckling",
        "interest_developers_mobile": "Mobil utveckling",
        "to": "till",
        "inCollection": "i samling",
        "dragCollections": "Ändra samlingarnas ordning med  drag-n-drop.",
        "feedAllCollections": "Alla samlingars RSS-feed",
        "orAlternativeFeed": "Alla bokmärken",
        "feedWarning": "Varning! Dela inte en unik URL för RSS-prenumerationer till någon annan. De kommer att kunna visa alla dina bokmärken!",
        "publicRSSfeed": "Publik RSS-feed",
        "showPrivateRSSfeed": "Visa privat RSS-feed",
        "privateRSSfeed": "Privat RSS-feed",
        "mailNotifications": "E-mailnotifikation",
        "disableWeeklyDigest": "Inaktivera weekly digest av dina bokmärken",
        "trashEmpty": "Papperskorgen är tom",
        "forOtherBrowsers": "För andra webbläsare",
        "saveLink": "Spara sidan",
        "instruction": "Instruktion",
        "install": "Installera",
        "importDescription": "Överför bokmärken från Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious eller annan tjänst to Raindrop.io.",
        "createSubFolder": "Skapa nästlad samling",
        "pro_nesting": "Nästlade samlingar",
        "pro_nestingD": "Skapa valfritt antal nästlade samlingar.",
        "pro_dropbox": "Backup till Dropbox",
        "pro_dropboxD": "Säkerhetskopiera bokmärkena och innehållet till ditt Dropboxkonto.",
        "pro_support": "Prioriterad support",
        "pro_supportD": "över e-mail eller skype.",
        "pro_nextFeatures": "Rösta fram kommande funktioner",
        "pro_nextFeaturesD": "Stödj utvecklingen av kommande funktioner!",
        "month": "månad",
        "year": "år",
        "oneMonth": "En månad",
        "threeMonth": "3 månaders",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Uppgradera till Pro",
        "renewPro": "Förnya PRO-prenumeration",
        "renewPromonth": "Förnya PRO-prenumeration för en månad",
        "renewProyear": "Förnya PRO-prenumeration för ett år",
        "proTitle": "Använd Raindrop.io gratis",
        "proTitleD": "eller uppgradera för",
        "proTitleDD": "extra funktioner.",
        "pro_noAds": "Annonsfritt",
        "pro_noAdsD": "",
        "pro_speed_dial": "Nyfliksida",
        "pro_apple": "iPhone/iPad app",
        "pro_desktop": "Skrivbordetapp (med sync)",
        "pro_smart_collections": "Smarta samlingar (auto spara)",
        "yesIwant": "Ja, jag vill ha!",
        "votes": "omröstning",
        "votes1": "omröstning",
        "votes2": "röster",
        "votes5": "röster",
        "whatAddNext": "Vad ska vi lägga till härnäst?",
        "newString": "Ny",
        "newBookmark": "Nya bokmärken",
        "thankYou": "Tack!",
        "nowYouHave": "Nu har du ett",
        "account": "konto",
        "goHome": "Gå hem",
        "until": "tills",
        "goToPayment": "Gå till betalning",
        "subscriptionPeriod": "Period",
        "paymentMethod": "Betalningssätt",
        "pricing": "Priser",
        "visualBookmarks": "Visuella bokmärken",
        "readItLater": "Läs senare",
        "pro_notes": "Anteckningar",
        "sslConnection": "SSL-skyddad anslutning",
        "browserPlugin": "Webbläsartillägg",
        "features": "Funktioner",
        "free": "Gratis",
        "removeAccount": "Ta bort konto",
        "removeAccountD": "Stäng konto och ta bort alla samlingar, bokmärken och data?",
        "areYouSure": "Är du säker?",
        "compareFreePro": "Jämför Gratis och PRO-konto",
        "shareLinkVia": "Dela länken via",
        "changeAvatarInfo": "Du kan ändra avatar är associerad med din e-mail på Gravatar.com. (Din Gravatar är en bild som följer dig från plats till plats och visas bredvid ditt namn när du gör saker som kommentar eller inlägg på en blogg)",
        "changeAvatar": "Ändra avatar",
        "browserExtensionD": "Nå dina samlingar från alla flikar med ett klick",
        "macApp": "Mac OS X App",
        "macAppD": "Organisera innehåll och läs artiklar från din Mac",
        "macAppV": "Mac OS X (10.8.0 eller nyare)",
        "androidAppV": "Android-telefon eller surfplatta (4.0 eller nyare)",
        "appleEditorsChoise": "Apple / Editor's Choice",
        "operaEditorsChoise": "Rekommenderas av Opera",
        "downloadTitle": "Spara dina bokmärken nära till hands",
        "sharedCollections": "Delade samlingar",
        "serverCollaboratorsIncorrectToken": "Det är går att bli medlem i samlingen (Ogiltig URL). Be författaren av samlingen att bjuda in dig igen.",
        "serverCollaboratorsAlready": "Du redan medlem i samlingen!",
        "joinCollaboratorsSuccess": "Det lyckades! Nu du medlem i samlingen.",
        "memberD": "Nu kan du lägga till och redigera bokmärken, skapa nästlade  samlingar och bjuda in nya medlemmar.",
        "viewerD": "Du kan endast visa bokmärken i denna samling.",
        "savePage": "Spara sidan till Raindrop.io",
        "saveToInbox": "Spara i inkorgen (Raindrop.io)",
        "saveImage": "Spara fotot  till Raindrop.io",
        "myBookmarks": "Mina bokmärken",
        "appName": "Raindrop.io - smarta bokmärken",
        "appDesc": "Ett vackert sätt att minnas det viktigaste.",
        "firstRun": "För börja använda Raindrop.io behöver du uppdatera den aktuella sidan och klicka igen.",
        "refreshPage": "Uppdatera den aktuella sidan",
        "support": "Support",
        "afterUpdateTitle": "Tillägget har uppdaterats",
        "afterUpdate": "Vi har gjort flera nya funktioner, förbättringar och buggfixar. Vill du se vad som är nytt i denna version?",
        "seeChangeLog": "Läs mer..."
    },
    "hy_AM": {
        "server": "Տեղի ունեցավ սխալ։ Փորձեք ևս մեկ անգամ։",
        "serverundefined": "Տեղի ունեցավ սխալ։ Փորձեք ևս մեկ անգամ։",
        "server0": "Նշեք նախորդ գաղտնաբառը",
        "server1": "Էլ․ փոստի հասցեն ճիշտ չէ լրացված",
        "server2": "Նշեք ձեր անունը",
        "server3": "Նախկին գաղնաբառը ճիշտ չէ լրացված",
        "server4": "Գաղտնաբառը ճիշտ չէ լրացված",
        "server5": "Այս էլ․ փոստի հասցեն արդեն գրանցված է",
        "server6": "Լրացրե՛ք վերնագիրը",
        "server7": "Էլ․ փոստի և/կամ գաղտնաբառի սխալ համադրություն",
        "serverincorrect url": "Սխալ URL",
        "collection": "Հավաքածու",
        "collectionNew": "Նոր հավաքածու",
        "collectionDeleteConfirm": "Դուք հավոզվա՞ծ եք, որ ցանկանում եք ջնջել այս հավաքածուն։\nՀավաքածուի բոլոր էջանշանները նույնպես կջնջվեն։",
        "saveChanges": "Պահպանել փոփոխությունը",
        "saveError": "Պահպանման ընթացքում տեղի ունեցավ սխալ",
        "saveSuccess": "Պահպանվեց",
        "saved": "պահպանվեց",
        "addSuccess": "Պահպանվեց",
        "moveSuccess": "Էջանշանները հաջողությամբ տեղափոխվեցին",
        "removeSuccess": "Ջնջվեց",
        "coverUpload": "Տեղադրել պաստառ",
        "fileUploadUnable": "Այս ֆայլը հնարավոր չէ վերբեռնել",
        "fileUploadError": "Վերբեռնման ընթացքում տեղի ունեցավ սխալ։ Փորձեք վերբեռնել այլ ֆայլ։",
        "linkNotRecognized": "Հղումն անճանաչելի է",
        "permalink": "Հավաքածուի հասցեն՝",
        "profile": "Իմ էջը",
        "signIn": "Մուտք",
        "myCollections": "Իմ հավաքածուները",
        "save": "Պահպանել",
        "remove": "Ջնջել",
        "elements": "էջանշան",
        "about": "Նախագծի մասին",
        "blog": "Բլոգ",
        "tools": "Գործիքներ",
        "signInSocial": "Մուտք գործել",
        "signUpSocial": "Մուտք գործել",
        "signUp": "Գրանցվել",
        "register": "Գրանցվել",
        "recoverPassword": "Վերականգնել գաղտնաբառը",
        "password": "Գաղտնաբառ",
        "edit": "Խմբագրել",
        "editMin": "Խմբագրել",
        "collectionEmpty": "Հավաքածուն դատարկ է",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Խորհուրդ ենք տալիս",
        "installExtension": "Տեղադրել հավելվածը",
        "extensionDescription": "Վեբ տարածքից կարևորը պահպանելու\n ամենապարզ, դյուրին և արագ եղանակը։",
        "enterLink": "Նշել հղումը",
        "enterLinkDescription": "Ավելացրեք ցանկացած էջի, հոդվածի, պատկերի կամ տեսանյութի հղում։",
        "backToCollection": "Վերադառնալ դեպի հավաքածու",
        "viewOn": "Դիտել",
        "articled": "հոդված",
        "imaged": "նկար",
        "videod": "բովանդակություն",
        "linkd": "Հղում",
        "article": "Հոդված",
        "image": "Նկար",
        "video": "Բովանդակություն",
        "link": "Հղում",
        "articles": "Հոդվածներ",
        "images": "Նկարներ",
        "videos": "Բովանդակություն",
        "links": "Հղումներ",
        "articleSaved": "Հոդվածը պահպանվեց",
        "imageSaved": "Նկարը պահպանվեց",
        "videoSaved": "Բովանդակությունը պահպանվեց",
        "linkSaved": "Հղումը պահպանվեց",
        "articleRemoved": "Հոդվածը տեղափոխվեց աղբարկղ",
        "imageRemoved": "Նկարը տեղափոխվեց աղբարկղ",
        "videoRemoved": "Բովանդակությունը տեղափոխվել է աղբարկղ",
        "linkRemoved": "Հղումը տեղափոխվեց աղբարկղ",
        "articleRemovedPermament": "Հոդվածը ջնջվեց",
        "imageRemovedPermament": "Պատկերը ջնջվեց",
        "videoRemovedPermament": "Բովանդակությունը ջնջվեց",
        "linkRemovedPermament": "Հղումը ջնջվեց",
        "bookmarksRemoved": "Էջանշանները տեղափոխվեցին աղբարկղ",
        "bookmarksRemovedPermament": "Էջանշանները ջնջվեցին",
        "other": "այլ",
        "vkontakte": "Вконтакте",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": " ",
        "basicData": "Հաշվի կարգավորում",
        "yourName": "Ձեր անունը",
        "changePassword": "Փոխել գաղտնաբառը",
        "newPassword": "Նոր գաղտնաբառ",
        "currentPassword": "Ընթացիկ գաղտնաբառը",
        "findBookmarkLong": "Գտնել էջանշան...",
        "nothingFound": "Ոչինչ չգտնվեց",
        "add": "Ավելացնել",
        "cancel": "Չեղարկել",
        "covers": "Պաստառներ",
        "upload": "Ներբեռնել",
        "imagesOnly": "Միայն մինչև 5 մբ․ ծավալով նկարներ",
        "uploadProgress": "Ներբեռնվում է...",
        "fontFamily": "Տառատեսակների ընտանիքը",
        "fontSize": "Տառատեսակի չափսը",
        "interfaceStyle": "Արտաքին տեսքը",
        "additional": "Լրացուցիչ",
        "fixedWidth": "Ֆիքսված լայնություն",
        "logOut": "Դուրս գալ",
        "titleAndDescription": "Վերնագիրը և նկարագրությունը",
        "title": "Վերնագիր",
        "description": "Նկարագրություն",
        "enterTitle": "Լրացրեք վերնագիրը",
        "enterDescription": "Լրացրեք նկարագրությունը",
        "enable": "Միացված է",
        "type": "Տեսակ",
        "publicCollection": "Հանրային հավաքածու",
        "shareCollection": "Տարածել հավաքածուն",
        "sendEmail": "Ուղարկել էլ․ փոստով",
        "copyLink": "Պատճենել հղումը",
        "language": "Լեզու",
        "iHaveAccount": "Ես արդեն ունեմ հաշիվ",
        "createFirstCollection": "Ստեղծել առաջին հավաքածուն",
        "checkYourEmail": "Ստուգեք ձեր էլ․ փոստը",
        "und": "և",
        "from": "հեղինակ՝",
        "passwordChangeSuccess": "Գաղտնաբառը հաջողությամբ փոփոխվեց",
        "smartSearch": "Խելացի որոնում",
        "subscribe": "Հետևել",
        "youSubscribed": "Դուք հետևում եք",
        "subscriptions": "Դուք հետևում եք",
        "subscriptionsCollection": "Հետևել հավաքածուին",
        "tags": "Պիտակներ",
        "addTag": "Ավելացնել պիտակ",
        "noDescription": "Նկարագրություն չկա",
        "basic": "Հիմնական",
        "background": "Ֆոն",
        "removeBackground": "Ջնջել ֆոնը",
        "or": "կամ",
        "noCollections": "Հավաքածուներ չկան",
        "noSubscriptions": "Բաժանորդագրություններ չկան",
        "welcome": "Սկսեք հավաքել անհրաժեշտ տվյալներ՝ օգտագործելով",
        "publicCollections": "Հանրային հավաքածուներ",
        "collectionsCount": "հավաքածուներ",
        "noPublicCollections": "Հանրային հավաքածուներ չկան",
        "noPublicCollectionsD": "Այս օգտվողը չի ստեղծել հավաքածուներ կամ չունի որևէ հանրային հավաքածու։",
        "all": "Բոլորը",
        "mobileApp": "Բջջային հավելված",
        "exportBookmarks": "Էջանշանների արտահանում",
        "cover": "Պաստառ",
        "saveToCollection": "Ավելացնել հավաքածուի մեջ",
        "selectCollection": "Ընտրեք հավաքածուն",
        "myAccount": "Իմ հաշիվը",
        "enterTitleAndCollection": "Նշեք վարնագիրը և հավաքածուն",
        "selectPreferedType": "Ընտրեք նախընտրելի տեսակը",
        "back": "Ետ",
        "bySort": "Դասավորված է",
        "byName": "ըստ անվան",
        "byDate": "ըստ ամսաթվի",
        "findOrCreateCollection": "Գտնել կամ ստեղծել հավաքածու",
        "createCollection": "Ստեղծել հավաքածու",
        "createCollectionFirst": "Ստեղծել առաջին հավաքածուն...",
        "createCollectionOrDrag": "Տեղափոխեք այստեղ որևէ հավաքածու կամ ստեղծեք նորը...",
        "createGroup": "Ստեղծել խումբ",
        "startToSave": "Օգտվելու համար, խնդրում ենք մուտք գործել։",
        "checkAgain": "Ստուգել ևս մեկ անգամ",
        "clickToMakeScreenshot": "Սեղմեք, որպեսզի ստեղծվի էջի պատկերը",
        "elements1": "էջանշան",
        "elements2": "էջանշաններ",
        "elements5": "էջանշաններ",
        "defaultCollection-0": "Որոնում",
        "defaultCollection--1": "Մուտքայիններ",
        "defaultCollection--99": "Աղբարկղ",
        "byTitle": "այբբենական կարգով",
        "saveBookmark": "Պահպանել այստեղ",
        "saveBookmarkInInbox": "Պահպանել մուտքայիններում",
        "sites": "Կայքեր",
        "in": " ",
        "settings": "Կարգավորում",
        "removeCollectionSuccess": "Հավաքածուն ջնջված է",
        "changeIcon": "Փոփոխել պատկերը",
        "group": "Խումբ",
        "untitled": "Անվերնագիր",
        "removeGroupError": "Դուք կարող եք ջնջել միայն դատարկ խմբերը։",
        "select": "Ընտրել",
        "create": "Ստեղծել",
        "privacy": "Գաղտնիության կարգավորում",
        "private": "Անձնական",
        "privateD": "Կարող եք տեսնել միայն դուք",
        "public": "Հանրային",
        "publicD": "Բոլորը կարող են տեսնել",
        "moveDown": "Իջեցնել ներքև",
        "moveUp": "Բարձրացնել վերև",
        "moveSelectedBookmarks": "Տեղափոխել նշված էջանշանները",
        "selectAll": "Ընտրել բոլորը",
        "supportOnlyUrls": "Դուք կարող եք պահպանել միայն http և https հաղորդակարգ ունեցող հղումներ։",
        "unableToRecognizeSpecifiedLink": "Նշված էջի հասցեն ընդունելի չէ։",
        "addTags": "Ավելացնել պիտակներ",
        "noBookmarks": "էջանշաններ չկան",
        "noBookmarksD": "Մկնիկի օգնությամբ տեղափոխեք էջի հղումը կամ պատկերները, կամ սեղմեք «Պահպանել էջը» կոճակը։",
        "alreadyInCollection": "Արդեն առկա է հավաքածուի մեջ",
        "alreadyInCollectionD": "Սեղմեք, որպեսզի խմբագրեք էջանշանի նկարագրությունը, պիտակները և պաստառը",
        "alreadyInCollectionDD": "Խնբագրել նկարագրությունը, պիտակները և պաստառը",
        "inSocial": "Տարածել հղումը",
        "copyURL": "Պատճենել URL-ն",
        "read": "Կարդալ",
        "smartBookmarks": "Խելացի էջանշաններ",
        "signUpEmail": "Գրանցվել էլ․ փոստի միջոցով",
        "loginOrRegisterSocial": "Մուտք գործել սոցիալական ցանցերի օգնությամբ",
        "help": "Օգնություն",
        "name": "Անուն",
        "haveIdeas": "Սխա՞լ եք գտել, կամ ունեք մտահաղացում։",
        "followUsOn": "Հետևեք մեր նորություններին",
        "writeUs": "Գրեք մեզ",
        "forDevelopers": "Մշակողների համար",
        "importBookmarks": "Ներմուծել էջանշաններ",
        "howToUse": "Ինչպես օգտագործել",
        "extension": "Հավելված",
        "animation": "Արտաքին տեսքի անիմացիա",
        "closeOnPageClick": "Փակել էջի վրա սեղմելու դեպքում",
        "closeOnPageClickD": "Էջի բովանդակությունը հնարավոր չի լինի տեղափոխել և պահպանել մկնիկի օգնությամբ",
        "helpContext": "Կոնտեքստային մենյու",
        "helpContextD": "Լրացուցիչ կարգավորման համար սեղմեք մկնիկի աջ կոճակը էջանշանի կամ հավաքածուի վրա",
        "helpHotKey": "Արագ կոճակ",
        "helpHotKeyD": "Դուք կարող եք փոխել կոճակը հավելվածների էջում",
        "helpVisible": "Լայնացնել էջի տեսանելի հատվածը",
        "helpVisibleD": "Մոտեցրեք մկնիկի կուրսորը ձախ անկյունին և սեղմեք հայտնված վահանակին",
        "helpBatch": "Բազմակի ընտրություն",
        "helpBatchD": "Տեղափոխեք կամ ջնջեք միանգամից մի քանի էջանշան",
        "moreTips": "Ցուցադրել այլ խորհուրդներ",
        "view": "Տեսք",
        "openLinksInNewTab": "Բացել հղումները ներդիր պատուհանում",
        "allBookmarks": "Բոլոր էջանշանները",
        "parent": "Մայր խումբը/հավաքածուն",
        "footerProAd": "Դարձեք PRO օգտվող",
        "footerProAdD": "և ստացեք ավելի շատ հնարավորություններ",
        "onlyInPro": "Միայն PRO տարբերակում",
        "nestedCollections": "Ներդիր հավաքածուներ",
        "dropboxBackup": "Dropbox backup",
        "goToPRO": "Դարձեք PRO օգտվող",
        "commonSettings": "Հիմնական կարգավորումներ",
        "already": "արդեն գտնվում է",
        "addBookmark": "Ավելացնել էջանշան",
        "addBookmarkD": "Տեղադրեք ցանկացած էջի, հոդվածի, պատկերի կամ տեսանյութի հղում։",
        "advice": "Խորհուրդ",
        "addAdvice": "Էջանշաններ ավելացնելու այլ եղանակներ",
        "browserExtension": "Դիտարկչի համար նախատեսված հավելված",
        "androidApp": "Android հավելված",
        "androidAppD": "Մեկ սեղմումով պահպանեք ձեզ անհրաժեշտ տվյալները համացանցից և սիրելի հավելվածներից",
        "importBookmarksD": "Տեղափոխեք էջանշանները Raindrop.io Google Chrome, Firefox, Safari և Opera դիտարկիչներից, ինչպես նաև Pocket, Instapaper, Readability, Kippt, Delicious և այլ ծառայություններից։",
        "showInDock": "Ցուցադրել Dock-ում",
        "showInTray": "Ցուցադրել մենյուի տողում",
        "alwaysOnTop": "Միշտ բոլոր պատուհանների առջևում",
        "blurHide": "Թաքցնել պատուհանը ֆոկուսը կորցնելու դեպքում",
        "desktopNeedRestart": "Կարգավորումներն ընդունելու համար վերագործարկեք հավելվածը",
        "refresh": "Թարմացնել",
        "editProfile": "Խմբագրել ձեր էջը",
        "profilePage": "Իմ էջը",
        "upgradeAccount": "PRO հաշիվ",
        "screenshotError": "Էջի պատկերը հնարավոր չէ ստանալ",
        "lastWeek": "Անցած 7 օրը",
        "copyLinkToClipboard": "Պատճենել հղումը",
        "openInBrowser": "Բացել դիտարկչի միջոցով",
        "openInBrowserWithShift": "Հղումը դիտարկչի միջոցով բացելու համար սեղմեք Ctrl կամ Shift կոճակները",
        "selectAIconSet": "Ընտրեք պատկերների հավաքածուն",
        "sharing": "Համատեղ օգտագործում",
        "members": "Անդամներ",
        "enterEmails": "Նշեք էլ․ փոստի հասցեն կամ հասցեները՝ առանձնացնելով ստորակետով․․․",
        "role_member": "Կարող է խմբագրել",
        "role_members": "Կարող է խմբագրել",
        "role_viewer": "Կարող է տեսնել",
        "role_owner": "Հեղինակ",
        "privateCollectionURL": "Հանրային հղում չկա։ Հավաքածուն անձնական է։",
        "inviteMorePeople": "Հրավիրել ավելի շատ մարդկանց",
        "sendInvites": "Ուղարկել հրավերներ",
        "unshareCollection": "Թաքցնել մյուսներից",
        "withAccessLevel": "Հասանելիության մակարդակը",
        "invitesSendTo": "Հրավերներն ուղարկվել են հետևյալ հասցեներով՝",
        "unshareSuccess": "Բոլոր մասնակիցները հեռացվեցին",
        "accessViaLink": "Մուտք հղման միջոցով",
        "desktopIntegration": "Mac OS X-ի հավելվածի հետ ինտեգրացիա",
        "error": "Տեղի ունեցավ սխալ",
        "tryAgain": "Փորձել ևս մեկ անգամ",
        "moveError": "Անհնար է տեղափոխել",
        "dev": "Մշակողներին",
        "article1": "հոդված",
        "article2": "հոդվածներ",
        "article5": "հոդվածներ",
        "image1": "նկար",
        "image2": "պատկերներ",
        "image5": "պատկերներ",
        "video1": "բովանդակություն",
        "video2": "բովանդակության",
        "video5": "բովանդակության",
        "link1": "Հղում",
        "link2": "Հղումներ",
        "link5": "Հղումներ",
        "createNewCollection": "Ստեղծել հավաքածու",
        "toRefreshedRaindrop": "Raindrop.io-ում",
        "comfortableReading": "Հարմարավետ ընթերցում",
        "press": "ԶԼՄ",
        "subscriptionsD": "Ստեղծեք և բաժանորդագրվեք հետաքրքիր հանրային հավաքածուների",
        "smartSearchD": "Ցանկացած չափանիշներով, արագ և պարզ։",
        "tagsD": "Ձեր հավաքածուն կազմակերպելու ևս մեկ եղանակ։",
        "comfortableReadingD": "Հարմարավետ տեսքի շնորհիվ՝ կենտրոնացեք ձեր նախընտրած հադվածների ընթերցանության վրա։",
        "dragNdropD": "Տեղափոխեք ձեր էջանշանները հավաքածուից հավաքածու։",
        "exportBookmarksD": "Որպեսզի ստանաք ձեր հավաքածուն տեղափոխելու հնարավորություն։",
        "followUs": "Հետևեք մեզ",
        "enterSearchCriteria": "Նշեք որոնման չափանիշները՝ առանձնացնելով դրանք ստորակետերով",
        "enterSearchCriteriaD": "Ցանկացած հերթականությամբ․ մենք ինքնուրույն կորոշենք, թե ինչ դուք նկատի ունեք՝",
        "explore": "Ուսումնասիրել",
        "exploreCollections": "Ուսումնասիրել հետաքրքիր հավաքածուներ",
        "staffPicks": "Խմբագրակազմի ընտրությունը",
        "step": "Քայլ",
        "uploadBookmarksFile": "Վերբեռնեք էջանշանների ֆայլը",
        "dropFilesHere": "Կամ գցեք այն այստեղ",
        "importInfo1": "Առավելագույնը 3 մբ․ ծավալով HTML ֆայլ",
        "importInfo2": "Դուք կարող եք արտահանել նշված ֆայլը ձեր դիտարկչից կամ այն ծառայությունից, որից այժմ օգտվում եք՝ գտնելով \"Export bookmarks\" բաժինը։",
        "importInfo3": "Սպասարկվում են Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool կամ Netscape էջանշանների ֆայլեր։",
        "loading": "Բեռնում",
        "noBookmarksToImport": "Էջանշաններ չկան",
        "foldersWithBookmarks": "Թղթապանակներ",
        "removeIt": "Ջնջել",
        "startImport": "Սկսել ներմուծումը",
        "selectOtherFile": "Ընտրել ա՞յլ ֆայլ",
        "importing": "Ներմուծվում է",
        "of": " ",
        "bookmarks": "էջանշաններ",
        "importingInfo1": "Սպասեք, սա կարող է որոշակի ժամանակ պահանջել, քանզի յուրաքանչյուր էջանշան պիտի ճանաչվի և պահպանվի իրեն կից բովանդակության հետ միասին։",
        "importingInfo2": "Չփակե՛ք այս պատուհանը",
        "importEnd": "Ներմուծումն ավարտված է",
        "importSuccess": "Հաջողությամբ ներմուծվեց",
        "importSuccessInfo": "Խորհուրդ ենք տալիս կարգավորել ձեր հավաքածուների արտաքին տեսքն ու տարբերանշանները, ինչպես նաև դարձնել դրանք հանրային, պատմել դրանց մասին սոցիալական ցանցերում կամ փոխանցել հղումն ընկերներին։",
        "importingProcess": "Էջանշանների ներմուծումը՝ կախված դրանց քանակից, կարող է որոշակի ժամանակ զբաղեցնել։ Խնդրում ենք, եղեք համբերատար, երբ դրանք ամբողջությամբ կմշակվեն, դուք կծանուցվեք էլ․ փոստի միջոցով։",
        "importingAlready": "Ցավոք, նախկինում վերբեռնած էջանշաններն առայժմ մշակված չեն։ Սպասեք, խնդրում ենք, մենք անպայման կտեղեկացնենք ձեզ էլ․ փստի միջոցով։",
        "specifyYourEmail": "Խնդրում ենք, նշեք էլ․ փոստի հասցեն ձեր էջում",
        "staffPicksD": "Հետաքրքիր հավաքածուներ՝ գեղեցիկ ձևավորմամբ",
        "templates": "Շաբլոններ",
        "collectionEdit": "Խմբագրել հավաքածուն",
        "raindropEdit": "Խմբագրել էջանշանը",
        "icon": "Պատկեր",
        "selectOtherIcon": "Փոխել պատկերը",
        "optional": "Պարտադիր չէ",
        "permamentLink": "Մշտական հղում",
        "backgroundUploadD": "Դուք կարող եք հավաքածուի համար թեմատիկ ֆոն վերբեռնել և ձևավորել այն։ Այն կցուցադրվի",
        "onYourCollectionPage": "հավաքածուի էջում",
        "removeCollectionForever": "Ջնջել հավաքածուն",
        "theseAreTheBest": "Սրանք լավագույնն են...",
        "findCollection": "Գտնել հավաքածու...",
        "findSubscription": "Գտնել բաժանորդագրություն",
        "more": "Ավելի շատ",
        "less": "Ավելի քիչ",
        "byPopularity": "ըստ հանրահայտության",
        "collectionsSorting": "Հավաքածուների դասավորություն",
        "sortBy": "Դասավորել ըստ",
        "custom": "Անհատական",
        "byBookmarksCount": "Ըստ էջանշանների թվի",
        "fastFilter": "Արագ ֆիլտրավորում․․․",
        "fastView": "Էջանշանների արագ դիտում",
        "publicPage": "Ձեր հանրային էջը",
        "welcomeSlide1D": "Պահպանեք կարևոր հղումներ, հոդվածներ, նկարներ, տեսանյութեր, ցուցադրություններ",
        "welcomeSlide1DD": "և դասավորեք դրանք թեմատիկ հավաքածուներում։",
        "welcomeSlide1DDD": "Ձեր էջանշանները հասանելի կլինեն համակարգչից և սմարթֆոնից։",
        "welcomeSlide2": "Տեղադրեք մեր հավելվածը",
        "welcomeSlide2D": "Ամենադյուրին, հարմար և արագ եղանակը",
        "welcomeSlide2DD": "վեբ տարածքից կարևորագույնը պահպանելու համար։",
        "next": "Հաջորդը",
        "startCollecting": "Վե՜րջ",
        "extensionFor": "Հավելված",
        "welcomeMobileSlide2": "Միշտ քեզ հետ",
        "sourceCode": "Նախնական կոդ",
        "sourceCodeD": "Դիտարկիչների համար նախատեսված հավելվածների նախնական կոդը գտնվում է մեր",
        "sourceCodeDD": "Github repo-ում։",
        "apiD": "Շուտով։",
        "importFrom": "Ներմուծել",
        "openCollection": "Բացել հավաքածուն",
        "articlesProccessing": "Հոդվածների ամբողջական տեքստերը շուտով կներբեռնվեն։",
        "favoriteSites": "Սիրելի կայքեր",
        "showAll": "Ցուցադրել բոլորը",
        "showAllBookmarks": "Ցուցադրել բոլոր էջանշանները",
        "youHave": "Դուք ունեք",
        "fillCollectionInput": "Ընտրեք հավաքածուն",
        "browserBookmarklet": "Դիտարկչի բուքմարքլեթ",
        "browserBookmarkletD": "Չգտա՞ք ձեր դիտարկիչը։ Փորձե՛ք բուքմարքլեթը։",
        "browserBookmarkletDD": "Ձգեք և գցեք այս հղումը ձեր էջանիշների տողի վրա։",
        "browserBookmarkletDDD": "Ավելացնել հավաքածուի մեջ",
        "hi": "Բարև",
        "noTags": "Պիտակներ չկան",
        "interest_video": "Տեսանյութ",
        "interest_hobbies": "Հոբբիներ",
        "interest_design": "Ձևավորում",
        "interest_design_inspiration": "Ոգեշնչում",
        "interest_food_drink": "Սնունդ",
        "interest_animals": "Կենդանիներ",
        "interest_health_fitness": "Առողջություն և ֆիթնես",
        "interest_illustrations": "Նկարազարդումներ",
        "interest_developers": "Մշակողների համար",
        "interest_art": "Արվեստ",
        "interest_history": "Պատմություն",
        "interest_pictures": "Նկարներ",
        "interest_film_music_books": "Ֆիլմեր, երաժշտություն և գրքեր",
        "interest_cars_motorcycles": "Մեքենաներ և մոտոցիկլեր",
        "interest_fashion": "Նորաձևություն",
        "interest_science": "Գիտություն",
        "interest_news": "Նորություններ",
        "interest_education": "Կրթություն",
        "interest_psychology": "Հոգեբանություն",
        "interest_travel": "Ճամփորդություն",
        "interest_nature": "Բնություն",
        "interest_work": "Աշխատանք",
        "interest_sites": "Կայքեր",
        "interest_diy": "Ձեռքի աշխատանք",
        "interest_sport": "Սպորտ",
        "interest_technology": "Տեխնոլոգիա",
        "interest_products": "Ապրանքներ",
        "interest_sweet_home": "Հարազատ տուն",
        "interest_photography": "Լուսանկարչություն",
        "interest_humor": "Հումոր",
        "interest_erotic": "Էրոտիկա",
        "interest_other": "Այլ",
        "interest_food_drink_recipes": "Բաղադրատոմսեր",
        "interest_film_music_books_films": "Ֆիլմեր",
        "interest_film_music_books_music": "Երաժշտություն",
        "interest_film_music_books_books": "Գրքեր",
        "interest_psychology_relations": "Հարաբերություններ",
        "interest_psychology_self_development": "Ինքնազարգացում",
        "interest_technology_gadgets": "Գաջեթներ",
        "interest_technology_games": "Խաղեր",
        "interest_technology_geeks": "Գիկեր",
        "interest_technology_applications": "Հավելվածներ",
        "interest_developers_web": "Վեբ մշակում",
        "interest_developers_mobile": "Բջջային մշակում",
        "to": " ",
        "inCollection": "հավաքածուի մեջ",
        "dragCollections": "Փոփոխեք հավաքածուների դասավորությունը՝ տեղափոխելով դրանք մկնիկի օգնությամբ",
        "feedAllCollections": "Բոլոր հավաքածուների RSS հոսքը",
        "orAlternativeFeed": "Բոլոր էջանշանները",
        "feedWarning": "Ուշադրությո՛ւն։ Մի փոխանցեք ձեր RSS բաժանորդագրությունների URL-ն երրորդ անձանց՝ այդպիսով նրանք կարող են տեսնել ձեր էջանշանները։",
        "publicRSSfeed": "Հանրային RSS հոսք",
        "showPrivateRSSfeed": "Ցուցադրել անձնական RSS հոսքը",
        "privateRSSfeed": "Անձնական RSS հոսք",
        "mailNotifications": "Ծանուցումներ էլ․ փոստով",
        "disableWeeklyDigest": "Չուղարկել ձեր էջանշանների շաբաթական ամփոփումը",
        "trashEmpty": "Աղբարկղը դատարկ է",
        "forOtherBrowsers": "Այլ դիտարկիչների համար",
        "saveLink": "Պահպանել էջը",
        "instruction": "Օգտագործման կանոններ",
        "install": "Տեղադրել",
        "importDescription": "Տեղափոխեք էջանշանները Raindrop.io Google Chrome, Firefox, Safari և Opera դիտարկիչներից, ինչպես նաև Pocket, Instapaper, Readability, Kippt, Delicious և այլ ծառայություններից։",
        "createSubFolder": "Ստեղծել ներդիր հավաքածու",
        "pro_nesting": "Ներդիր հավաքածուներ",
        "pro_nestingD": "Անսահման հնարավորություններ ձեր էջանշանները կազմակերպելու համար։",
        "pro_dropbox": "Dropbox backup",
        "pro_dropboxD": "Ձեր էջանշանների և դրանց բովանդակության պահուստային տարբերակը Dropbox-ում։",
        "pro_support": "Արագ աջակցություն",
        "pro_supportD": "Էլ․ փոստի կամ Skype-ի միջոցով։",
        "pro_nextFeatures": "Քվեարկեք նոր հնարավորությունների օգտին",
        "pro_nextFeaturesD": "PRO հաշիվ ունեցողներն իրենք են որոշում, թե ինչ նոր հնարավորություններ է անհրաժեշտ ավելացնել։",
        "month": "ամիս",
        "year": "տարի",
        "oneMonth": "Մեկ ամիս",
        "threeMonth": "3 ամիս",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "Դառնալ PRO",
        "renewPro": "Երկարեցնել բաժանորդագրությունը",
        "renewPromonth": "Երկարեցնել բաժանորդագրությունը մեկ ամսով",
        "renewProyear": "Երկարեցնել բաժանորդագրությունը մեկ տարով",
        "proTitle": "Օգտվեք Raindrop.io-ից անվճար",
        "proTitleD": "կամ դարձեք",
        "proTitleDD": "հավելյալ հնարավորություններ։",
        "pro_noAds": "Առանց գովազդի",
        "pro_noAdsD": "",
        "pro_speed_dial": "Մեկնարկային էջ",
        "pro_apple": "iPhone/iPad հավելված",
        "pro_desktop": "Desktop հավելված (համաժամացմամբ)",
        "pro_smart_collections": "Խելացի հավաքածուներ (տրված չափանիշներով ավտոմատ դասավորել էջանշանները)",
        "yesIwant": "Այո, ուզում եմ։",
        "votes": "ձայն",
        "votes1": "ձայն",
        "votes2": "ձայն",
        "votes5": "ձայն",
        "whatAddNext": "Ի՞նչ ավելացնենք հետագայում",
        "newString": "Նոր",
        "newBookmark": "Նոր էջանշան",
        "thankYou": "Շնորհակալություն։",
        "nowYouHave": "Այժմ դուք ունեք",
        "account": "հաշիվ",
        "goHome": "Առաջին էջ",
        "until": "մինչև",
        "goToPayment": "Անցնել վճարման էջ",
        "subscriptionPeriod": "Ժամանակահատված",
        "paymentMethod": "Վճարման եղանակ",
        "pricing": "Գին",
        "visualBookmarks": "Վիզուալ էջանշաններ",
        "readItLater": "Կարդալ հետո",
        "pro_notes": "Նոթեր",
        "sslConnection": "Պաշտպանված SSL կապ",
        "browserPlugin": "Դիտարկչի համար նախատեսված հավելված",
        "features": "Հնարավորություններ",
        "free": "Անվճար",
        "removeAccount": "Ջնջել հաշիվը",
        "removeAccountD": "Փակե՞լ ձեր հաշիվը՝ ջնջելով բոլոր էջանշանները, հավաքածուներն ու տվյալները։",
        "areYouSure": "Համոզվա՞ծ եք։",
        "compareFreePro": "Համեմատել անվճար և PRO հաշիվները",
        "shareLinkVia": "Տարածել հղումը",
        "changeAvatarInfo": "Դուք կարող եք փոխել ձեր էլ․ փոստի հասցեին կցված ավատարը Gravatar.com կայքում։  (Gravatar-ը նկար է, որը ձեզ հետ տեղափոխվում է կայքից կայք և հայտնվում, երբ դուք մեկնաբանություններ եք անում կամ գրառումներ կատարում բլոգներում)",
        "changeAvatar": "Փոխել ավատարը",
        "browserExtensionD": "Բացեք ձեր հավաքածուները ցանկացած էջում մկնիկի մեկ սեղմումով",
        "macApp": "Mac OS X հավելված",
        "macAppD": "Կազմակերպեք հավաքված նյութերը և կարդացեք հոդվածներ ձեր Mac-ի միջոցով",
        "macAppV": "Mac OS X (10.8.0 կամ ավելի նոր)",
        "androidAppV": "Android սմարթֆոն կամ թաբ (4.0 կամ ավելի նոր)",
        "appleEditorsChoise": "Apple-ի խմբագրակազմի ընտրությունը",
        "operaEditorsChoise": "Խորհուրդ է տալիս Opera-ն",
        "downloadTitle": "Ձեր էջանշանները միշտ ձեռքի տակ են",
        "sharedCollections": "Հանրային հավաքածուներ",
        "serverCollaboratorsIncorrectToken": "Այս հավաքածուի անդամ դառնալն անհնար է։ Սխալ է նշված URL-ն։ Խնդրեք հավաքածուի հեղինակին ևս մեկ անգամ հրավիրել ձեզ։",
        "serverCollaboratorsAlready": "Դուք արդեն այս հավաքածուի անդամ եք։",
        "joinCollaboratorsSuccess": "Շնորհավորում ենք։ Դուք արդեն այս հավաքածուի անդամ եք։",
        "memberD": "Այժմ դուք կարող եք ավելացնել կամ խմբագրել էջանշաններ, ստեղծել ներդիր հավաքածուներ և հրավիրել նոր անդամների։",
        "viewerD": "Դուք կարող եք միայն դիտել այս հավաքածուի էջանշանները։",
        "savePage": "Պահպանել էջը Raindrop.io-ում",
        "saveToInbox": "Պահպանել Մուտքայիններում (Raindrop.io)",
        "saveImage": "Պահպանել նկարը Raindrop.io-ում",
        "myBookmarks": "Իմ էջանշանները",
        "appName": "Raindrop.io - Խելացի Էջանշաններ",
        "appDesc": "Ամենակարևորն հիշելու գեղեցիկ եղանակ։",
        "firstRun": "Թարմեցրեք ընթացիկ էջը և սեղմեք ևս մեկ անգամ, որպեսզի սկսեք օգտվել Raindrop.io-ից։",
        "refreshPage": "Թարմեցրեք ընթացիկ էջը",
        "support": "Օգնություն",
        "afterUpdateTitle": "Հավելվածը թարմեցվել է",
        "afterUpdate": "Մենք ավելացրել ենք նոր գործառույթներ, կատարելագործել ենք հները և ուղղել սխալներ։ Ցանկանու՞մ եք տեսնել, թե ինչ փոփոխություններ կան այս տարբերակում։",
        "seeChangeLog": "Տեսնել փոփոխությունների ցուցակը..."
    },
    "zh_CN": {
        "server": "未知错误，请重试！",
        "serverundefined": "未知错误，请重试！",
        "server0": "请输入旧密码！",
        "server1": "电子邮箱无效！",
        "server2": "请输入姓名！",
        "server3": "旧密码无效！",
        "server4": "密码无效！",
        "server5": "该电子邮箱已被注册！",
        "server6": "请输入标题！",
        "server7": "密码或电子邮箱错误！",
        "serverincorrect url": "错误的URL地址",
        "collection": "收藏",
        "collectionNew": "新收藏",
        "collectionDeleteConfirm": "你确定要删除该收藏吗？\n所有该收藏中的书签都会被删除！",
        "saveChanges": "保存更改",
        "saveError": "存储错误！",
        "saveSuccess": "保存成功！",
        "saved": "已保存",
        "addSuccess": "已成功添加！",
        "moveSuccess": "成功移动了书签！",
        "removeSuccess": "删除成功！",
        "coverUpload": "封面上传",
        "fileUploadUnable": "该文件无法上传！",
        "fileUploadError": "文件上传错误。请尝试其他文件！",
        "linkNotRecognized": "未识别的链接",
        "permalink": "固定链接：",
        "profile": "配置",
        "signIn": "登入",
        "myCollections": "我的收藏",
        "save": "保存",
        "remove": "删除",
        "elements": "书签",
        "about": "关于我们",
        "blog": "博客",
        "tools": "工具",
        "signInSocial": "使用……登入",
        "signUpSocial": "使用……注册",
        "signUp": "注册",
        "register": "注册",
        "recoverPassword": "重置密码",
        "password": "密码",
        "edit": "编辑",
        "editMin": "编辑",
        "collectionEmpty": "收藏为空",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "推荐",
        "installExtension": "安装插件",
        "extensionDescription": "最简单易行，飞速管理网络重要信息",
        "enterLink": "输入链接",
        "enterLinkDescription": "输入任何 web 、文章、图片或视频的链接",
        "backToCollection": "回到收藏",
        "viewOn": "以……查看",
        "articled": "文章",
        "imaged": "照片",
        "videod": "内容",
        "linkd": "链接",
        "article": "文章",
        "image": "照片",
        "video": "内容",
        "link": "链接",
        "articles": "文章",
        "images": "照片",
        "videos": "内容",
        "links": "链接",
        "articleSaved": "文章已保存",
        "imageSaved": "照片已保存",
        "videoSaved": "内容已保存",
        "linkSaved": "链接已保存",
        "articleRemoved": "已将文章移到回收站",
        "imageRemoved": "已将照片移到回收站",
        "videoRemoved": "已将内容移到回收站",
        "linkRemoved": "已将链接移到回收站",
        "articleRemovedPermament": "文章已删除",
        "imageRemovedPermament": "照片已删除",
        "videoRemovedPermament": "内容已删除",
        "linkRemovedPermament": "链接已删除",
        "bookmarksRemoved": "已将书签移到回收站",
        "bookmarksRemovedPermament": "书签已删除",
        "other": "其他",
        "vkontakte": "Вконтакте",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "以",
        "basicData": "帐户设置",
        "yourName": "您的姓名",
        "changePassword": "更改密码",
        "newPassword": "新密码",
        "currentPassword": "当前密码",
        "findBookmarkLong": "查找书签......",
        "nothingFound": "未找到任何内容",
        "add": "添加",
        "cancel": "取消",
        "covers": "封面",
        "upload": "上传",
        "imagesOnly": "只能上传图像。最大大小：5 MB。",
        "uploadProgress": "上传中...",
        "fontFamily": "字体系",
        "fontSize": "字体大小",
        "interfaceStyle": "界面样式",
        "additional": "附加",
        "fixedWidth": "固定的宽度",
        "logOut": "注销",
        "titleAndDescription": "标题 & 描述",
        "title": "标题",
        "description": "描述",
        "enterTitle": "请输入标题！",
        "enterDescription": "输入描述",
        "enable": "启用",
        "type": "类型",
        "publicCollection": "公开收藏",
        "shareCollection": "分享收藏",
        "sendEmail": "发送电子邮件",
        "copyLink": "复制链接",
        "language": "语言",
        "iHaveAccount": "已经有帐号了",
        "createFirstCollection": "创建第一个收藏",
        "checkYourEmail": "请检查您的收件箱 ！",
        "und": "&",
        "from": "从",
        "passwordChangeSuccess": "密码更改成功 ！",
        "smartSearch": "智能搜索",
        "subscribe": "关注",
        "youSubscribed": "正在关注",
        "subscriptions": "正在关注",
        "subscriptionsCollection": "关注收藏",
        "tags": "标签",
        "addTag": "添加标签",
        "noDescription": "没有描述",
        "basic": "基本",
        "background": "背景",
        "removeBackground": "删除背景",
        "or": "或",
        "noCollections": "没有收藏",
        "noSubscriptions": "没有订阅",
        "welcome": "以……开始收藏",
        "publicCollections": "公开收藏",
        "collectionsCount": "收藏",
        "noPublicCollections": "没有公开收藏",
        "noPublicCollectionsD": "该用户未创建，或者没有任何公开的收藏。",
        "all": "全部",
        "mobileApp": "移动应用",
        "exportBookmarks": "导出书签",
        "cover": "封面",
        "saveToCollection": "保存到收藏集",
        "selectCollection": "选择收藏集",
        "myAccount": "我的账户",
        "enterTitleAndCollection": "输入标题和收藏集名称",
        "selectPreferedType": "选择首选类型",
        "back": "返回",
        "bySort": "排序",
        "byName": "按名称",
        "byDate": "按日期",
        "findOrCreateCollection": "查找或创建新的收藏集",
        "createCollection": "新的收藏集",
        "createCollectionFirst": "创建第一个收藏集",
        "createCollectionOrDrag": "创建或在此处拖动集合...",
        "createGroup": "创建群组",
        "startToSave": "请登录后使用",
        "checkAgain": "再次检查一遍",
        "clickToMakeScreenshot": "单击此处进行截屏",
        "elements1": "书签",
        "elements2": "书签",
        "elements5": "书签",
        "defaultCollection-0": "搜索",
        "defaultCollection--1": "收件箱",
        "defaultCollection--99": "废纸篓",
        "byTitle": "按字母顺序排列",
        "saveBookmark": "保存到这里",
        "saveBookmarkInInbox": "保存至收件箱",
        "sites": "网站",
        "in": "在",
        "settings": "设置",
        "removeCollectionSuccess": "移除收藏集",
        "changeIcon": "更改图标",
        "group": "群组",
        "untitled": "无题",
        "removeGroupError": "你不能删除有内容的群组",
        "select": "选择",
        "create": "创建",
        "privacy": "隐私",
        "private": "私人",
        "privateD": "只有你可以查看",
        "public": "公开",
        "publicD": "任何人都允许查看",
        "moveDown": "向下移动",
        "moveUp": "向上移动",
        "moveSelectedBookmarks": "移动选定的书签",
        "selectAll": "选择所有",
        "supportOnlyUrls": "你可以保存 http 和 https 协议的链接",
        "unableToRecognizeSpecifiedLink": "无法识别的链接",
        "addTags": "添加标签",
        "noBookmarks": "没有书签",
        "noBookmarksD": "拖动页面上的链接或图像。或单击“保存页面”。",
        "alreadyInCollection": "已收集",
        "alreadyInCollectionD": "点击编辑描述，标签和书签的封面",
        "alreadyInCollectionDD": "编辑描述，标签和封面",
        "inSocial": "共享链接于",
        "copyURL": "复制 URL",
        "read": "阅读",
        "smartBookmarks": "智能书签",
        "signUpEmail": "使用电子邮箱注册",
        "loginOrRegisterSocial": "使用社交账号登录或注册",
        "help": "帮助",
        "name": "名称",
        "haveIdeas": "提交Bug或建议",
        "followUsOn": "订阅我们的新咨询和更新",
        "writeUs": "联系我们",
        "forDevelopers": "开发者支持",
        "importBookmarks": "导入书签",
        "howToUse": "如何使用？",
        "extension": "扩展",
        "animation": "UI动画",
        "closeOnPageClick": "点击关闭页面",
        "closeOnPageClickD": "拖放将不可用",
        "helpContext": "上下文菜单",
        "helpContextD": "右键点击书签或集合文件夹以获得更多功能",
        "helpHotKey": "快捷键",
        "helpHotKeyD": "你可以在扩展页面上修改按键",
        "helpVisible": "扩大页面的可视部分",
        "helpVisibleD": "移动光标至左边并点击出现的面板",
        "helpBatch": "多选",
        "helpBatchD": "选择多个书签进行批处理",
        "moreTips": "显示更多技巧",
        "view": "查看",
        "openLinksInNewTab": "在新标签页打开链接",
        "allBookmarks": "所有书签",
        "parent": "上一级组/集合",
        "footerProAd": "升级至专业版",
        "footerProAdD": "为了额外的功能",
        "onlyInPro": "仅供专业版账号",
        "nestedCollections": "包含的集合",
        "dropboxBackup": "Dropbox备份",
        "goToPRO": "升级至专业版",
        "commonSettings": "常用设置",
        "already": "已经",
        "addBookmark": "添加书签",
        "addBookmarkD": "粘贴链接至任意网页，文章，图片或视频",
        "advice": "建议",
        "addAdvice": "添加书签的其它方法",
        "browserExtension": "浏览器扩展",
        "androidApp": "安卓应用程序",
        "androidAppD": "从网页和应用中保存重要的内容",
        "importBookmarksD": "将谷歌Chrome浏览器，火狐浏览器，Safari浏览器，Opera浏览器，Pocket，Instapaper，Readability，Kippt，Delicious或其它服务的书签转移至Raindrop.io",
        "showInDock": "在Dock中显示",
        "showInTray": "在菜单栏中显示",
        "alwaysOnTop": "保持窗口在最前面",
        "blurHide": "当失去焦点时隐藏窗口",
        "desktopNeedRestart": "重启程序以应用设置",
        "refresh": "刷新",
        "editProfile": "编辑个人信息",
        "profilePage": "我收藏的网页",
        "upgradeAccount": "专业版账号",
        "screenshotError": "无法捕捉到网页",
        "lastWeek": "过去 7 天内",
        "copyLinkToClipboard": "将链接复制到剪贴板",
        "openInBrowser": "在浏览器中打开",
        "openInBrowserWithShift": "若要在浏览器中打开链接，按住 ctrl 键或 Shift 键",
        "selectAIconSet": "选择一个图标集",
        "sharing": "共享",
        "members": "成员",
        "enterEmails": "输入电子邮件或由逗号分隔的电子邮件...",
        "role_member": "可以编辑",
        "role_members": "可以编辑",
        "role_viewer": "可以查看",
        "role_owner": "所有者",
        "privateCollectionURL": "没有公开的URL，该收藏是私密的",
        "inviteMorePeople": "邀请更多的人",
        "sendInvites": "发送邀请",
        "unshareCollection": "取消共享收藏集",
        "withAccessLevel": "访问级别",
        "invitesSendTo": "请发送到",
        "unshareSuccess": "没有被共享的收藏集",
        "accessViaLink": "通过链接访问",
        "desktopIntegration": "结合 Mac OS X 的应用程序",
        "error": "错误",
        "tryAgain": "再试一次",
        "moveError": "无法移动 ！",
        "dev": "开发者们",
        "article1": "文章",
        "article2": "文章",
        "article5": "文章",
        "image1": "照片",
        "image2": "照片",
        "image5": "照片",
        "video1": "内容",
        "video2": "内容",
        "video5": "内容",
        "link1": "链接",
        "link2": "链接",
        "link5": "链接",
        "createNewCollection": "创建收藏集",
        "toRefreshedRaindrop": "到 Raindrop.io",
        "comfortableReading": "舒适的阅读",
        "press": "按",
        "subscriptionsD": "创建并关注有趣的公开收藏",
        "smartSearchD": "按任何标准，快速、 轻松地。",
        "tagsD": "另一种方式来组织您的收藏集。",
        "comfortableReadingD": "以最方便的方法集中精力阅读你喜欢的文章",
        "dragNdropD": "在收藏集之间拖动你的书签",
        "exportBookmarksD": "为了能够转移您的收藏集。",
        "followUs": "关注我们",
        "enterSearchCriteria": "输入搜索条件，以逗号进行分隔。",
        "enterSearchCriteriaD": "任意顺序，我们确定您将输入：",
        "explore": "探索",
        "exploreCollections": "探索收藏集",
        "staffPicks": "编辑选择",
        "step": "步骤",
        "uploadBookmarksFile": "上传书签文件",
        "dropFilesHere": "或者拖放文件至此处",
        "importInfo1": "HTML文件最大为3M",
        "importInfo2": "你可以从浏览器或服务的“导出书签”部分得到这个文件",
        "importInfo3": "支持谷歌Chrome浏览器，火狐浏览器，Safari浏览器，谷歌书签，Delicious，Kippt，Zootool或网景书签文件格式",
        "loading": "载入中",
        "noBookmarksToImport": "没有书签",
        "foldersWithBookmarks": "文件夹",
        "removeIt": "删除",
        "startImport": "开始导入",
        "selectOtherFile": "选择其它文件？",
        "importing": "导入中",
        "of": "的",
        "bookmarks": "书签",
        "importingInfo1": "因为要识别每个书签，等待可能需要一点时间。",
        "importingInfo2": "不要关闭此标签页",
        "importEnd": "导入完成",
        "importSuccess": "导入成功",
        "importSuccessInfo": "建议您使用自定义外观和图标的集合，并且在社交网络上公开和分享他们或发送链接给你的朋友。",
        "importingProcess": "需要一些时间来导入书签（具体时间取决于书签数量），请耐心等候！导入完成后我们会向您发送通知邮件。",
        "importingAlready": "非常不幸，您早先上传的书签我们还没有完成处理！请再多等一会，我将用明确的邮件通知您。",
        "specifyYourEmail": "请在个人资料中指定您的e-mail地址",
        "staffPicksD": "优美的设计，有趣的收藏",
        "templates": "示例",
        "collectionEdit": "编辑收藏夹",
        "raindropEdit": "编辑书签",
        "icon": "图标",
        "selectOtherIcon": "更改图标...",
        "optional": "可选的",
        "permamentLink": "永久链接",
        "backgroundUploadD": "自定义为每个收藏夹上传主题背景图片",
        "onYourCollectionPage": "在收藏夹页面上",
        "removeCollectionForever": "删除收藏夹",
        "theseAreTheBest": "这是是最好的…",
        "findCollection": "找到收藏夹…",
        "findSubscription": "找到订阅…",
        "more": "更多",
        "less": "更少",
        "byPopularity": "按受欢迎程度",
        "collectionsSorting": "收藏夹排序",
        "sortBy": "排序",
        "custom": "自定义",
        "byBookmarksCount": "按书签数量",
        "fastFilter": "快速过滤…",
        "fastView": "快速查看书签",
        "publicPage": "您的公开页面",
        "welcomeSlide1D": "保存重要的链接、 文章、 照片、 视频、 演示文稿",
        "welcomeSlide1DD": "& 将它们组织成收藏专题。",
        "welcomeSlide1DDD": "你的书签将同步到电脑及智能手机中",
        "welcomeSlide2": "安装扩展",
        "welcomeSlide2D": "最简单、最快捷的方式",
        "welcomeSlide2DD": "从网络保存一切重要的内容",
        "next": "下一个",
        "startCollecting": "完成",
        "extensionFor": "的扩展",
        "welcomeMobileSlide2": "永远和你在一起",
        "sourceCode": "源代码",
        "sourceCodeD": "我们浏览器扩展插件的源代码",
        "sourceCodeDD": "Github 回购。",
        "apiD": "很快。",
        "importFrom": "导入",
        "openCollection": "公开的收藏",
        "articlesProccessing": "文章的全文将会稍后上传。",
        "favoriteSites": "最喜爱的网站",
        "showAll": "全部显示",
        "showAllBookmarks": "显示所有标签",
        "youHave": "你有",
        "fillCollectionInput": "请选择所有集合",
        "browserBookmarklet": "浏览器书签",
        "browserBookmarkletD": "没有你的浏览器？试试浏览器书签。",
        "browserBookmarkletDD": "拖放此链接至你的书签栏",
        "browserBookmarkletDDD": "保存到收藏集",
        "hi": "你好",
        "noTags": "没有标签",
        "interest_video": "视频",
        "interest_hobbies": "爱好",
        "interest_design": "设计",
        "interest_design_inspiration": "灵感",
        "interest_food_drink": "饮食",
        "interest_animals": "动物",
        "interest_health_fitness": "健康",
        "interest_illustrations": "插图",
        "interest_developers": "开发者支持",
        "interest_art": "艺术",
        "interest_history": "历史",
        "interest_pictures": "图片",
        "interest_film_music_books": "电影，音乐和书籍",
        "interest_cars_motorcycles": "汽车和摩托车",
        "interest_fashion": "时尚",
        "interest_science": "科学",
        "interest_news": "新闻",
        "interest_education": "教育",
        "interest_psychology": "心理学",
        "interest_travel": "旅行",
        "interest_nature": "自然",
        "interest_work": "工作",
        "interest_sites": "网站",
        "interest_diy": "手工",
        "interest_sport": "体育",
        "interest_technology": "技术",
        "interest_products": "产品",
        "interest_sweet_home": "甜蜜的家",
        "interest_photography": "摄影",
        "interest_humor": "幽默",
        "interest_erotic": "色情",
        "interest_other": "其它",
        "interest_food_drink_recipes": "食谱",
        "interest_film_music_books_films": "电影",
        "interest_film_music_books_music": "音乐",
        "interest_film_music_books_books": "书籍",
        "interest_psychology_relations": "人际关系",
        "interest_psychology_self_development": "自我发展",
        "interest_technology_gadgets": "玩物",
        "interest_technology_games": "游戏",
        "interest_technology_geeks": "极客",
        "interest_technology_applications": "应用",
        "interest_developers_web": "网页开发",
        "interest_developers_mobile": "移动端开发",
        "to": "到",
        "inCollection": "收藏中",
        "dragCollections": "通过拖拽来更改收藏的顺序。",
        "feedAllCollections": "所有收藏的 RSS订阅源",
        "orAlternativeFeed": "所有书签",
        "feedWarning": "警告 ！不要分享你的RSS订阅的唯一URL给其他人，因为他们将能够查看您的书签！",
        "publicRSSfeed": "公开RSS订阅",
        "showPrivateRSSfeed": "显示私人 RSS 订阅源",
        "privateRSSfeed": "私人RSS订阅源",
        "mailNotifications": "电子邮件通知",
        "disableWeeklyDigest": "禁用书签的每周摘要功能",
        "trashEmpty": "清空",
        "forOtherBrowsers": "对于其他浏览器",
        "saveLink": "保存网页",
        "instruction": "指令",
        "install": "安装",
        "importDescription": "将谷歌Chrome浏览器，火狐浏览器，Safari浏览器，Opera浏览器，Pocket，Instapaper，Readability，Kippt，Delicious或其它服务的书签转移至Raindrop.io",
        "createSubFolder": "创建嵌套的集合",
        "pro_nesting": "包含的集合",
        "pro_nestingD": "创建任意数量的嵌套集合。",
        "pro_dropbox": "Dropbox备份",
        "pro_dropboxD": "备份书签和内容到你的Dropbox账户。",
        "pro_support": "优先支持",
        "pro_supportD": "通过电子邮件或 skype。",
        "pro_nextFeatures": "为下一步要开发的新功能投票",
        "pro_nextFeaturesD": "支持即将推出的功能 ！",
        "month": "月份",
        "year": "年",
        "oneMonth": "一个月",
        "threeMonth": "3 个月",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "升级至高级版",
        "renewPro": "续订PRO服务",
        "renewPromonth": "续订PRO1个月",
        "renewProyear": "续订PRO1年",
        "proTitle": "免费使用 Raindrop.io",
        "proTitleD": "或升级",
        "proTitleDD": "扩展功能",
        "pro_noAds": "免费的广告",
        "pro_noAdsD": "",
        "pro_speed_dial": "新的选项卡页",
        "pro_apple": "iPhone 或 iPad 的应用",
        "pro_desktop": "桌面应用程序 (同步功能)",
        "pro_smart_collections": "智能收藏集 （自动保存）",
        "yesIwant": "是啊，我想要 ！",
        "votes": "投票",
        "votes1": "投票",
        "votes2": "投票",
        "votes5": "投票",
        "whatAddNext": "我们下一步应该增加什么？",
        "newString": "新的",
        "newBookmark": "新书签",
        "thankYou": "谢谢！",
        "nowYouHave": "现在你有一个",
        "account": "帐户",
        "goHome": "返回主页",
        "until": "直到",
        "goToPayment": "去付款页面",
        "subscriptionPeriod": "周期",
        "paymentMethod": "支付方式",
        "pricing": "价格",
        "visualBookmarks": "可视书签",
        "readItLater": "稍后阅读",
        "pro_notes": "备注",
        "sslConnection": "SSL安全连接",
        "browserPlugin": "浏览器扩展",
        "features": "特点",
        "free": "免费",
        "removeAccount": "删除帐号",
        "removeAccountD": "关闭账号并移除所有收藏，书签和数据吗？",
        "areYouSure": "是否确定？",
        "compareFreePro": "比较免费和专业版账号",
        "shareLinkVia": "共享链接于",
        "changeAvatarInfo": "你可以在Gravatar.com上修改和你邮箱关联的头像。(你的头像就是你在各个网站评论或发表博客时在你名字旁边出现的图像)",
        "changeAvatar": "修改头像",
        "browserExtensionD": "从浏览器任意标签页一键即可进入收藏",
        "macApp": "Mac OS X应用程序",
        "macAppD": "在你的Mac上组织内容和阅读文章",
        "macAppV": "Mac OS X(10.8.0或更新)",
        "androidAppV": "安卓手机或平板(4.0或更新)",
        "appleEditorsChoise": "苹果/编辑选择",
        "operaEditorsChoise": "由Opera推荐",
        "downloadTitle": "使你的书签唾手可得",
        "sharedCollections": "分享的收藏",
        "serverCollaboratorsIncorrectToken": "不可能成为收藏一员。无效链接。询问收藏人，让他再邀请你一次。",
        "serverCollaboratorsAlready": "你已经是收藏集的成员",
        "joinCollaboratorsSuccess": "成功！现在你已经是收藏集成员。",
        "memberD": "现在你可以添加和编辑书签，创建收藏子集和邀请新成员",
        "viewerD": "你只能查看此收藏集合中的书签",
        "savePage": "保存页面至Raindrop.io",
        "saveToInbox": "保存至Inbox(Raindrop.io)",
        "saveImage": "保存图片至Raindrop.io",
        "myBookmarks": "我的书签",
        "appName": "Raindrop.io-智能书签",
        "appDesc": "一个美丽的方式来记住至关重要之事",
        "firstRun": "开始使用Raindrop.io你只需要刷新当前页面并再次点击",
        "refreshPage": "刷新当前页面",
        "support": "支持",
        "afterUpdateTitle": "扩展已更新",
        "afterUpdate": "我们有几个新功能，改进和错误修正。想在此版本中看看有什么新鲜的吗？",
        "seeChangeLog": "阅读更多……"
    },
    "kk_KZ": {
        "server": "Белгісіз қате. Қайталап көріңіз!",
        "serverundefined": "Белгісіз қате. Қайталап көріңіз!",
        "server0": "Ескі құпиясөзді жаз!",
        "server1": "Электрондық пошта дұрыс емес!",
        "server2": "Өз есіміңізді еңгізіңіз!",
        "server3": "Сіздің ескі құпиясөзіңіз дұрыс көрсетілмеді!",
        "server4": "Құпиясөз дұрыс емес!",
        "server5": "Бұл e-mail қолданыста!",
        "server6": "Тақырыпты жаз!",
        "server7": "Қате электрондық пошта және/немесе құпиясөз тіркесімі!",
        "serverincorrect url": " URL дұрыс емес",
        "collection": "Жинақ",
        "collectionNew": "Жаңа жинақ",
        "collectionDeleteConfirm": "Осы жинақты өшіруге сенімдісіз бе?\nЖинақпен қоса ішіндегі бүкіл бетбелгілер өшіріледі!",
        "saveChanges": "Өзгерістерді сақтау",
        "saveError": "Сақталған жоқ!",
        "saveSuccess": "Сақталды!",
        "saved": "сақталды",
        "addSuccess": "Сәтті түрде қосылды!",
        "moveSuccess": "Бетбелгілер сәтті түрде көшті!",
        "removeSuccess": "Жойылды!",
        "coverUpload": "Тыс көрінісін жүктеу",
        "fileUploadUnable": "Осы файылды жіберу мүмкін емес!",
        "fileUploadError": "Файлды жүктеуде қате болды. Басқа файлды көріңіз!",
        "linkNotRecognized": "Сілтеме анықталмады",
        "permalink": "Негізгі сілтеме:",
        "profile": "Сипаттама",
        "signIn": "Кіру",
        "myCollections": "Менің жинақтарым",
        "save": "Сақтау",
        "remove": "Жою",
        "elements": "бетбелгі",
        "about": "Біз жайлы",
        "blog": "Блог",
        "tools": "Құралдар",
        "signInSocial": "Басқа әдіспен кіру",
        "signUpSocial": "Басқа әдіспен тіркелу",
        "signUp": "Тіркелу",
        "register": "Тіркелу",
        "recoverPassword": "Құпиясөзді алып тастау",
        "password": "Құпиясөз",
        "edit": "Өзгерту",
        "editMin": "Өзгерту",
        "collectionEmpty": "Жинақтың іші бос",
        "fillItTwoWays": "The two ways to fill collection",
        "recommend": "Ұсынамыз",
        "installExtension": "Кеңейтілуді орнату",
        "extensionDescription": "Интернеттегі маңызды нәрселерді сақтаудың ең оңай,\nыңғайлы және өте тез тәсілі.",
        "enterLink": "Сілтемені енгізу",
        "enterLinkDescription": "Кез келген веб-параққа, мақалаға, фото немесе видеоға сілтеме көрсетіңіз.\nҚалауыңыз білсін.",
        "backToCollection": "Жинақтамғаға қайта келу",
        "viewOn": "Көріністе",
        "articled": "мақала",
        "imaged": "фото",
        "videod": "контент",
        "linkd": "сілтеме",
        "article": "Мақала",
        "image": "Фото",
        "video": "Контент",
        "link": "Сілтеме",
        "articles": "Мақалалар",
        "images": "Фотолар",
        "videos": "Контент",
        "links": "Сілтемелер",
        "articleSaved": "Мақала сақталды",
        "imageSaved": "Фото сақталды",
        "videoSaved": "Контент сақталды",
        "linkSaved": "Сілтеме сақталды",
        "articleRemoved": "Мақала қоқысқа жіберілді",
        "imageRemoved": "Фото жойылымға жіберілді",
        "videoRemoved": "Контент қоқысқа жіберілді",
        "linkRemoved": "Сілтеме қоқысқа жіберілді",
        "articleRemovedPermament": "Мақала жойылды",
        "imageRemovedPermament": "Фото жойылды",
        "videoRemovedPermament": "Контент жойылды",
        "linkRemovedPermament": "Сілтеме жойылды",
        "bookmarksRemoved": "Бетбелгілер қоқысқа жібірілді",
        "bookmarksRemovedPermament": "Бетбелгілер жойылды",
        "other": "басқа",
        "vkontakte": "Вконтакте",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "on": "сонда",
        "basicData": "Аккаунт орнатылымдары",
        "yourName": "Сіздің есіміңіз",
        "changePassword": "Құпиясөзді өзгерту",
        "newPassword": "Жаңа құпиясөз",
        "currentPassword": "Қазіргі құпиясөз",
        "findBookmarkLong": "Бетбелгіні табу...",
        "nothingFound": "Ештеме табылғанжоқ",
        "add": "Қосу",
        "cancel": "Болдырмау",
        "covers": "Қабтар",
        "upload": "Жіберу",
        "imagesOnly": "Тек қана суреттер.\n Үлкен көлемі: 5мб.",
        "uploadProgress": "Жіберіліп жатыр...",
        "fontFamily": "Әріптің жанұясы",
        "fontSize": "Әріптің көлемі",
        "interfaceStyle": "Интерфейтың стилі",
        "additional": "Қосымша",
        "fixedWidth": "Әріптің ені",
        "logOut": "Шығу",
        "titleAndDescription": "Тақырып және сипаттама",
        "title": "Тақырып",
        "description": "Сипаттама",
        "enterTitle": "Тақырыпты жаз",
        "enterDescription": "Сипаттаманы жаз",
        "enable": "Қосылды",
        "type": "Тип",
        "publicCollection": "Көпшіліқ жинақтары",
        "shareCollection": "Жинақтамамен бөлісу",
        "sendEmail": "Электрондық поштамен жіберу",
        "copyLink": "Сілтемені көшіру",
        "language": "Тіл",
        "iHaveAccount": "Менде аккаунт әрдайым бар",
        "createFirstCollection": "Бірінші жинақты жасау",
        "checkYourEmail": "Өз почтаңызды тексеріңіз!",
        "und": "және",
        "from": "Мынау",
        "passwordChangeSuccess": "Пароль сәтті өзгертілді!",
        "smartSearch": "Ақылды іздеу",
        "subscribe": "Өзгеріске жазылу",
        "youSubscribed": "Сіз өзгеріске жазылдыңыз",
        "subscriptions": "Сіз өзгеріске жазылдыңыз",
        "subscriptionsCollection": "Өзгерістер жинағы",
        "tags": "Тегтер",
        "addTag": "Тег қосу",
        "noDescription": "Сипаттамасы жоқ",
        "basic": "Негізгі",
        "background": "Фон",
        "removeBackground": "Фонды жою",
        "or": "әлде",
        "noCollections": "Жинақтар жоқ",
        "noSubscriptions": "Жазылымдар жоқ",
        "welcome": "Жинақтармен жүмыстарыңызды бастау үшін",
        "publicCollections": "Көпшіліқ жинақтары",
        "collectionsCount": "жинақтар",
        "noPublicCollections": "Көпшіліқ жинақтары жоқ",
        "noPublicCollectionsD": "Қолданушы көпшілік жинақ әлі жасамаған әлде ода ол жоқ.",
        "all": "Барлығы",
        "mobileApp": "Мобильді бағдарлама",
        "exportBookmarks": "Бетбелгліерді экспорттау",
        "cover": "Тыс",
        "saveToCollection": "Жинаққа сақтау",
        "selectCollection": "Жинақты таңдау",
        "myAccount": "Менің аккауынтым",
        "enterTitleAndCollection": "Тақырыппен жинақты көрсетіңіз",
        "selectPreferedType": "Парақтың жарамды типін таңдаңыз",
        "back": "Артқа",
        "bySort": "Сортталған",
        "byName": "аты бойынша",
        "byDate": "мерзімі бойынша",
        "findOrCreateCollection": "Іздеу немесе жинақ жасау",
        "createCollection": "Жаңа жинақ",
        "createCollectionFirst": "Бірінші жинақты жасау...",
        "createCollectionOrDrag": "Жинақты жасаңыз әлде осы жерге лақтырыңыз...",
        "createGroup": "Топ құру",
        "startToSave": "Өтініш, жинақтармен жұмыс бастау үшін еніңіз!",
        "checkAgain": "Қайтадан тексеріңіз!",
        "clickToMakeScreenshot": "Скриншот жасау үшін басыңыз",
        "elements1": "бетбелгі",
        "elements2": "бетбелгілер",
        "elements5": "бетбелгілер",
        "defaultCollection-0": "Іздеу",
        "defaultCollection--1": "Кіріс жәшігі",
        "defaultCollection--99": "Қоқыс",
        "byTitle": "Алфавит бойынша",
        "saveBookmark": "Осында сақту",
        "saveBookmarkInInbox": "Кіріс жәшігіне сақтау",
        "sites": "Сайттар",
        "in": "-та, -те, -да \"Читай коммент и свяжись vk . com / onayx\"",
        "settings": "Баптаулар",
        "removeCollectionSuccess": "Жинақ жойылды",
        "changeIcon": "Иконканы өзгерту",
        "group": "Топ",
        "untitled": "Аталмаған",
        "removeGroupError": "Бос емес топты жоюға болмайды!",
        "select": "Таңдау",
        "create": "Құру",
        "privacy": "Жекешелау баптамалары",
        "private": "Жекеше",
        "privateD": "Сізге ғана қолжетімді",
        "public": "Көпшіліктік",
        "publicD": "Әркім көре алады",
        "moveDown": "Астыға түсу",
        "moveUp": "Үстіге көтерілу",
        "moveSelectedBookmarks": "Таңдалған жинақтың орнын ауыстыру",
        "selectAll": "Барлығын таңдау",
        "supportOnlyUrls": "Сіз тек http және https протоколды URL-дарды ғана сақтай аласыз!",
        "unableToRecognizeSpecifiedLink": "Көрсетілген парақты анықтау мүнкім емес!",
        "addTags": "Тегтерді қосу",
        "noBookmarks": "Бетбелгілір жоқ",
        "noBookmarksD": "Сілтемені әлде суретті парақтан тартып әкеліңіз, әлде \"Парақты сақтау\"-ды басыңыз",
        "alreadyInCollection": "Жинақта бүл бар",
        "alreadyInCollectionD": "Тегтер және бетбелгілер тысының сипаттамаларын өзгерту үшін басыңыз",
        "alreadyInCollectionDD": "Тыс және тег, сипаттамасын өзгерту",
        "inSocial": "Сілтемні бөлісу тәсілдері",
        "copyURL": "Сілтемені көшіру",
        "read": "Оқу",
        "smartBookmarks": "Сіздің ақылды бетбелгілеріңіз",
        "signUpEmail": "E-mail арқылы тіркелу",
        "loginOrRegisterSocial": "Әлде социалды желі арқылы",
        "help": "Көмек",
        "name": "Есіміңіз",
        "haveIdeas": "Қате таптыңызба әлде идея барма?",
        "followUsOn": "Жаңалықтармен өзгерістерді бақылаңыз:",
        "writeUs": "Бізбен байланыс",
        "forDevelopers": "Бағдарламашларға",
        "importBookmarks": "Бетбелгілірді импорттау",
        "howToUse": "Қалай пайдалану?",
        "extension": "Кеңейтулер",
        "animation": "UI анимациясы",
        "closeOnPageClick": "Парақты басу арқылы жабу",
        "closeOnPageClickD": "Элементтерді парақтан тартып әкелу жұмыс істемейтін болады",
        "helpContext": "Мәнмәтінді мәзір",
        "helpContextD": "Қосымша функциялар, бетбелгілермен жинақтарды, тышқынның оң батырмасымен бассаңыз  пайда болады",
        "helpHotKey": "Ыстық батырма",
        "helpHotKeyD": "Кеңейтілудің парағындғы баптауларда өзгерту",
        "helpVisible": "Парақтың көрінген бөлігін кеңейту",
        "helpVisibleD": "Курсорды сол жақ шетіне тақатып, пайда болған панельге басыңыз",
        "helpBatch": "Көптеген таңдау",
        "helpBatchD": "Көптеген бетпелгілерді бір мезгілде алмастырыңыз әлде жойыңыз",
        "moreTips": "Тағыда кеңес",
        "view": "Көрініс",
        "openLinksInNewTab": "Сілтемелерді жақа парақта ашу",
        "allBookmarks": "Бүкіл бетбелгілер",
        "parent": "Негізгі топ/жинақ",
        "footerProAd": "PRO деңгейге қөшіңіз",
        "footerProAdD": "қосымша мұнкімдіктер үшін",
        "onlyInPro": "Тек PRO деңгейде",
        "nestedCollections": "Қосылған жинақтар",
        "dropboxBackup": "Көшірмесін Dropbox-қа",
        "goToPRO": "PRO деңгейге қөшіңіз",
        "commonSettings": "Негізгі баптаулар",
        "already": "әрдайым",
        "addBookmark": "Бетбелгіні қосу",
        "addBookmarkD": "Мақалаға, фотоға әлде видеоға, параққа сілтеме көрсетіңіз",
        "advice": "Кеңес",
        "addAdvice": "Бетбелгілерді қосудың басқа тәсілдері",
        "browserExtension": "Браузерге арналған кеңейту",
        "androidApp": "Android бағдарламасы",
        "androidAppD": "Желідегі маңызды конттенттерді және сүйікті бағдарламаларыңызды бір жиынтықта сақтаңыз!",
        "importBookmarksD": "Бетбелгілерді Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious және тағы басқа сервистерден Raindrop.io'ға көшір.",
        "showInDock": "Dock -та көрсету",
        "showInTray": "Мәзір жолында көрсету",
        "alwaysOnTop": "Ылғи барлық терезелерден жоғары",
        "blurHide": "Терезені, фокустан айырылған жағдайда, жасыру",
        "desktopNeedRestart": "Өзгерістер іске қосылу үшін, бағдарламаны қайта жүктеңіз",
        "refresh": "Жаңарту",
        "editProfile": "Сипаттаманы редактілеу",
        "profilePage": "Менің жинақтарымның беті",
        "upgradeAccount": "PRO аккаунт",
        "screenshotError": "Веб бет ұсталынбайды!",
        "lastWeek": "Соңғы 7 күндер",
        "copyLinkToClipboard": "Сілтемені жадыға көшіру",
        "openInBrowser": "Браузерде ашу",
        "openInBrowserWithShift": "Сілтемені браузерде ашу үшін Ctrl әлде Shift -ті басып үстаңыз",
        "selectAIconSet": "Иконкалар жиынын таңдаңыз",
        "sharing": "Бөлісу",
        "members": "Қатысушылар",
        "enterEmails": "Бір әлде бірнеше email -дарды үтір арқылы көрсетіңіз...",
        "role_member": "Редактілеуге болады",
        "role_members": "Редактілеуге болады",
        "role_viewer": "Көруге болады",
        "role_owner": "Иесі",
        "privateCollectionURL": "Көпшіліктік URL жоқ. Жиынтық жекешелі.",
        "inviteMorePeople": "Көбірек адам шақыру",
        "sendInvites": "Шақыру сілтемесін жіберу",
        "unshareCollection": "Жиынтыққа көпшіліктің қатысуын болдырмау",
        "withAccessLevel": "Қатысу деңгейі",
        "invitesSendTo": "Шақыру жіберілген түлға",
        "unshareSuccess": "Жиынтық қатысушыларсыз",
        "accessViaLink": "Рұқсат сілтеме арқылы",
        "desktopIntegration": "Интеграция, Mac OS X бағдарламасы арқылы",
        "error": "Қате",
        "tryAgain": "Қайталап көріңіз",
        "moveError": "Жылжыту мүнкім емес!",
        "dev": "Бағдарламашылар",
        "article1": "мақала",
        "article2": "мақалалар",
        "article5": "мақалалар",
        "image1": "фото",
        "image2": "фотолар",
        "image5": "фотолар",
        "video1": "контент",
        "video2": "контенттер",
        "video5": "контенттер",
        "link1": "сілтеме",
        "link2": "сілтемелер",
        "link5": "сілтемелер",
        "createNewCollection": "Жинақты жасау",
        "toRefreshedRaindrop": "Raindrop.io-ға",
        "comfortableReading": "Комфортты оқу",
        "press": "БАҚ",
        "subscriptionsD": "Көпшіліктің қызықты жинақтарына жазылыңыз және өзіңізде жасаңыз.",
        "smartSearchD": "Кез келген түрғыдан, тез және қарапайым.",
        "tagsD": "Сіздің жинақтарыңызды үйымдарсырудың тағы бір тәсілі.",
        "comfortableReadingD": "Өзіңіздің сүйікті мақалаларыңызды ыңғайлы етіп оқу мүнкімдігінің жолы.",
        "dragNdropD": "Бетбелгілеріңізді жинақтар арасында алмастырыңыз.",
        "exportBookmarksD": "Жинақтарыңызды басқа бағыттарға жіберу мүнкімдігі болу үшін.",
        "followUs": "Артымыздан ілес",
        "enterSearchCriteria": "Іздеу шарттарын үтір арқылы еңгізіңіз",
        "enterSearchCriteriaD": "Кез келген жағдайда, енгізгеніңіздің мағынасын, біз өзіміз анықтаймыз:",
        "explore": "Таңдаулар",
        "exploreCollections": "Таңдаулы жинақтар",
        "staffPicks": "Редакция таңдауы",
        "step": "Қадам",
        "uploadBookmarksFile": "Бетбелгілі файлын жүктеңіз",
        "dropFilesHere": "Немесе осы жерге лақтыр",
        "importInfo1": "HTML файл, шекті көлемі 3 мб.",
        "importInfo2": "Ағымды файлды сіз браузер әлде сервис ішіндегі \"Бетбелгіні экспорттау\"/\"Export bookmarks\" бөлімі арқылы ала аласыз.",
        "importInfo3": "Қолдауда Google Chrome, Mozilla Firefox, Safari, Google Bookmarks, Delicious, Kippt, Zootool әлде Netscape бетбелгі файл форматы.",
        "loading": "Жүктелуде",
        "noBookmarksToImport": "Бетбелгілер жоқ!",
        "foldersWithBookmarks": "Импорттау папкасы",
        "removeIt": "Жою",
        "startImport": "Импорттауды бастау",
        "selectOtherFile": "Басқа файлды таңдау керекпе?",
        "importing": "Импортталуда",
        "of": "-дан, -ден",
        "bookmarks": "бетбелгілер",
        "importingInfo1": "Тосыңыз, бұған бірәз уақыт керек, себебі әр бетбелгі өзімен байланысты контент бойынша анықталып сақталады.",
        "importingInfo2": "Мына бетті жаппаңыз, әйтпесе импорттау тоқтатылады!",
        "importEnd": "Импортталды!",
        "importSuccess": "Сәтті импортталынған",
        "importSuccessInfo": "Жинақтарыңыздың сырт көріністерімен иконкаларын дұрыстауды, көпшіліктікі қылуды, және олар жәйлі социалды жүйелерде жариялауды әлде сілтемесін достарыңызбен бөлісуіңізді ұынамыз.",
        "importingProcess": "Бетбелгілерді импорттау, олардың санына байланысты,  біраз уақытты қажет етуі мүнкім! Сабырлық сақтауыңызды өтінеміз, олардың өңделіп біткені жәйлі хабарды біз сізге көрсетілген E-mail-ға жібереміз!",
        "importingAlready": "Өкінішке орай алдыңғы жұктелген бетбелгілер әлі өңделіп бітпеді! Күтуіңізді өтінеміз, біз сізге міндетті түрде көрсетілген E-mail-ға хабарлаймыз.",
        "specifyYourEmail": "Өз сипаттамаңызға E-mail-ды көрсетіңіз!",
        "staffPicksD": "Әдемі дизайнымен қызықты жинақтар",
        "templates": "Үлгі",
        "collectionEdit": "Жинақты редактілеу",
        "raindropEdit": "Бетбелгіні редактілеу",
        "icon": "Иконка",
        "selectOtherIcon": "Басқа иконканы таңдау...",
        "optional": "Міндетті емес",
        "permamentLink": "Тұрақты сілтеме",
        "backgroundUploadD": "Сіз тақырыпқа сай фонды жүктеу арқылы жинақтарыңызға стиль бере аласыз. Оның көрініп түратын жері",
        "onYourCollectionPage": "сіздің жинақтарыңыздың парағында",
        "removeCollectionForever": "Жинақты жою",
        "theseAreTheBest": "Бұл жақсысы...",
        "findCollection": "Жинақты табу...",
        "findSubscription": "Жазылымды табу...",
        "more": "Көбірек",
        "less": "Азырақ",
        "byPopularity": "Танымалдылығы бойынша",
        "collectionsSorting": "Жинтықты іріктеу",
        "sortBy": "Іріктеу, келесі бойынша",
        "custom": "Қолданушының",
        "byBookmarksCount": "Бетбелгілер саны бойынша",
        "fastFilter": "Жылдам іріктеу...",
        "fastView": "Бетбелгілерді жылдым көру",
        "publicPage": "Сіздің көпшіліктік парағыңыз",
        "welcomeSlide1D": "Маңызды сілтемелерді, мақалаларды, фото, видео, көрсетілімдерді сақтаңыз",
        "welcomeSlide1DD": "және оларды тақырыпты үйлесімде жинақтаңыз.",
        "welcomeSlide1DDD": "Сіздің бетбелгіліріңіз, компьютер және смартфон арқылы, қол жетімді болады.",
        "welcomeSlide2": "Өз кеңейтуіңізді орнатыңыз",
        "welcomeSlide2D": "Ең қарапайым, ынғайлы және өте тез тәсіл,",
        "welcomeSlide2DD": "интернеттен маңыздыларды сақтау үшін.",
        "next": "Келесу",
        "startCollecting": "Жинақтауды бастау!",
        "extensionFor": "Кеңейтілу келесіге",
        "welcomeMobileSlide2": "Әрдайым өзіңізбен",
        "sourceCode": "Негізгі код",
        "sourceCodeD": "Браузерлердің барлық кеңейтулерінің негізгі коды біздің",
        "sourceCodeDD": "Github репозиториямызда орналасқан.",
        "apiD": "API құжаттамалары дайындалуда.",
        "importFrom": "Келесіден импорттау:",
        "openCollection": "Жинақты ашу",
        "articlesProccessing": "Мақалалардың толық мәтіні кейін жүктелетін.",
        "favoriteSites": "Сүйікті сайттар",
        "showAll": "Барлығын көрсету",
        "showAllBookmarks": "Барлық бетбелгілерді көрсету",
        "youHave": "Сіздегі бары",
        "fillCollectionInput": "Сіз жинақтаманы көрсетпедіңіз!",
        "browserBookmarklet": "Браузер Букмарклет",
        "browserBookmarkletD": "Сіздің браузеріңіз жоқпа? Bokmarklet-ті көріңіз.",
        "browserBookmarkletDD": "Мына сілтемені бетбелгіге тартып әкеліңіз",
        "browserBookmarkletDDD": "Жинаққа сақтау",
        "hi": "Сәлем",
        "noTags": "Тегтер жоқ",
        "interest_video": "Видео",
        "interest_hobbies": "Хобби",
        "interest_design": "Дизайн",
        "interest_design_inspiration": "Шабыт",
        "interest_food_drink": "Тағам және сусын",
        "interest_animals": "Жануарлар",
        "interest_health_fitness": "Денсаулық және фитнес",
        "interest_illustrations": "Суреттеме және тақырыпты сурет",
        "interest_developers": "Бағдарламашыларға",
        "interest_art": "Өнер",
        "interest_history": "Тарих",
        "interest_pictures": "Суреттер",
        "interest_film_music_books": "Кино, музыка және кітәп",
        "interest_cars_motorcycles": "Автокөліктер мен мотоциклдер",
        "interest_fashion": "Сән және сүлулық",
        "interest_science": "Ғылым",
        "interest_news": "Жаңалықтар",
        "interest_education": "Білім алу",
        "interest_psychology": "Психология",
        "interest_travel": "Саяхат",
        "interest_nature": "Табиғат",
        "interest_work": "Жұмыс",
        "interest_sites": "Сайттар",
        "interest_diy": "Қолдан жасау",
        "interest_sport": "Спорт",
        "interest_technology": "Техналогиялар",
        "interest_products": "Тауар",
        "interest_sweet_home": "Жайлы үй",
        "interest_photography": "Фотография",
        "interest_humor": "Әзіл",
        "interest_erotic": "Эротика",
        "interest_other": "Басқа",
        "interest_food_drink_recipes": "Рецептілер",
        "interest_film_music_books_films": "Фильмдер",
        "interest_film_music_books_music": "Әуен",
        "interest_film_music_books_books": "Кітәптар",
        "interest_psychology_relations": "Қарым-қатынас",
        "interest_psychology_self_development": "Өздігінен даму",
        "interest_technology_gadgets": "Гаджеттер",
        "interest_technology_games": "Ойындар",
        "interest_technology_geeks": "Гиктер",
        "interest_technology_applications": "Бағдарламалар",
        "interest_developers_web": "Веб бағдарламалау",
        "interest_developers_mobile": "Мобилді бағдарламалау",
        "to": "-ға, -ге",
        "inCollection": "жинақта",
        "dragCollections": "Қарапайым тарту арқылы жинақтарыңызды үлестіріңіз.",
        "feedAllCollections": "RSS жинақтар бойынша бөлінген",
        "orAlternativeFeed": "Бүкіл бетбелгілер",
        "feedWarning": "Назар аударыңыз! Өзіңіздің ерекше URL-деріңіздің RSS жазылымдарың бөтен түлғаларға бермеңіз, себебі олар сіздің бетбелгілеріңізді көре алады!",
        "publicRSSfeed": "Көпшілік RSS арнасы",
        "showPrivateRSSfeed": "Жекеше RSS арнаны көрсету",
        "privateRSSfeed": "Жекеше RSS арна",
        "mailNotifications": "E-mail хабарлама",
        "disableWeeklyDigest": "Бетбелгілеріңізге байланысты өзіңізге жіберілетін хабарламаларды өшіру",
        "trashEmpty": "Жойылым бос",
        "forOtherBrowsers": "Басқа браузерлерге",
        "saveLink": "Бетті сақтау",
        "instruction": "Тәртібі",
        "install": "Орнату",
        "importDescription": "Бетбелгілерді Google Chrome, Firefox, Safari, Opera, Pocket, Instapaper, Readability, Kippt, Delicious және тағы басқа сервистерден Raindrop.io'ға көшір.",
        "createSubFolder": "Біріктірілген жинақтарды жасау",
        "pro_nesting": "Қосылған жинақтар",
        "pro_nestingD": "Сіздің бетбелгілеріңізді ұиымдастырудың шексіз мүнкімдіктері. ",
        "pro_dropbox": "Көшірмесін Dropbox-қа",
        "pro_dropboxD": "Бетбелгілердің резервті көшірмелері сіздің Dropbox-та. ",
        "pro_support": "Маңызды қолдау",
        "pro_supportD": "E-mail әлде skype арқылы.",
        "pro_nextFeatures": "Жаңа мүнкімдіктерге дауыс бер",
        "pro_nextFeaturesD": "Жаңа функциялардың пайда болуына үлес тидіру мүнкімдігі!",
        "month": "ай",
        "year": "жыл",
        "oneMonth": "Бір ай",
        "threeMonth": "3 ай",
        "yearDiscount": "off, just $19 a year!",
        "upgradeToPro": "PRO деңгейге ауысу",
        "renewPro": "PRO деңгейді ұзарту",
        "renewPromonth": "PRO деңгейді бір айға ұзарту",
        "renewProyear": "PRO деңгейді бір жылға ұзарту",
        "proTitle": "Raindrop.io-ны тегін қолдан",
        "proTitleD": "әлде мынаған көшу",
        "proTitleDD": "PRO деңгей.",
        "pro_noAds": "Жарнамасыз",
        "pro_noAdsD": "",
        "pro_speed_dial": "Жаңа бетбелгі",
        "pro_apple": "iPhone/iPad-қа арналған бағдарлама",
        "pro_desktop": "Desktop бағдарламасы (синхрондау мүнкімдігімен)",
        "pro_smart_collections": "Ақылды жинақтар (автоматты түрде сақтау)",
        "yesIwant": "Иә, қалаймын!",
        "votes": "дауыс",
        "votes1": "дауыс",
        "votes2": "дауыстар",
        "votes5": "дауыстар",
        "whatAddNext": "Сіз қандай мүнкімдік қосылғанын қалайсыз?",
        "newString": "Жаңа",
        "newBookmark": "Жаңа бетбелгі",
        "thankYou": "Рахмет!",
        "nowYouHave": "Енді сізде",
        "account": "аккаут",
        "goHome": "Негізгі параққа бару",
        "until": "дейін",
        "goToPayment": "Төлемге көшу",
        "subscriptionPeriod": "Мерзім",
        "paymentMethod": "Төлем тәсілі",
        "pricing": "Бағалар",
        "visualBookmarks": "Визуалды бетбелгілер",
        "readItLater": "Кейінге оқуға қалтырылғандар",
        "pro_notes": "Белгілемелер",
        "sslConnection": "Қорғалған SSL-байланыс",
        "browserPlugin": "Браузерге арналған кеңейту",
        "features": "Мүнкімдіктер",
        "free": "Тегін",
        "removeAccount": "Аккаунтты жою",
        "removeAccountD": "Аккаутты жауып және барлық жинақтарды, бетбелгілерді және олармермен байланысты барлық мәліметтерді жою керекпе?",
        "areYouSure": "Сіз сенімдісізбе?",
        "compareFreePro": "Тегін мен PRO аккаунтты салыстыру",
        "shareLinkVia": "Сілтемні бөлісу тәсілдері",
        "changeAvatarInfo": "Сіз өзіңізге тіркелген E-mail-дың аватар көрінісін Gravatar.com сайтында өзгерте аласыз. (Граватар - бұл бейне сурет, сізбен бірге сайттардан сайттарға ілеседі, блогтарда жазбалар шығарғанда әлде коментариялар жіберген кездерде)",
        "changeAvatar": "Аватарды өзгерту",
        "browserExtensionD": "Жинақтарыңызға барузердің кез келген қосымша беттерінен бір басым арқылы қатынау",
        "macApp": "Mac OS X-ке арналған бағдарлама",
        "macAppD": "Контенттерді үйымдастырып және мақалаларды өзіңіздің Mac-та оқыңыз",
        "macAppV": "Mac OS X (10.8.0 әлде жаңалары)",
        "androidAppV": "Android смартфон немесе планшет (4.0-тен жоғары)",
        "appleEditorsChoise": "Apple редакциясының таңдауы",
        "operaEditorsChoise": "Opera ұсынысады",
        "downloadTitle": "Сіздің бетбелгілеріңіз әрдайым қол жетімді",
        "sharedCollections": "Көпшілік жинақтар",
        "serverCollaboratorsIncorrectToken": "Жинақтың мүшесі болу мүнкім емес. URL дұрыс емес. Жинақтың авторынан өзіңізді қайта шақыруын сұраңыз.",
        "serverCollaboratorsAlready": "Сіз жинақтың мүшесісіз!",
        "joinCollaboratorsSuccess": "Құтықтаймыз! Сіз енді жинақтың мүшесісіз.",
        "memberD": "Сіз бетбелгілерді қосып және редактілеуіңізге,  біріктірілген жинақтар жасап және жаңа қатысушыларды шақыруыңызға болады.",
        "viewerD": "Сіз бұл жинақтың бетбелгілерін тек көре аласыз.",
        "savePage": "Парақты Raindrop.io-ға сақтау",
        "saveToInbox": "Кіріс жинағында сақтау (Raindrop.io)",
        "saveImage": "Суретті Raindrop.io-ға сақтау",
        "myBookmarks": "Менің бетбелгілерім",
        "appName": "Raindrop.io - Ақылды бетбелгілер",
        "appDesc": "Ең маңыздыларды жаттап алудың әдемі тәсілі.",
        "firstRun": "Raindrop.io-ны қолдануды бастау үшін сізге жәй ғана ағымды парақты жаңартып батырманы қайта басу керек.",
        "refreshPage": "Ағымды бетті жаңарту",
        "support": "Қолдау",
        "afterUpdateTitle": "Кеңейтілу жаңартылды",
        "afterUpdate": "Біз бірнеше жаңа мүнкімдіктер,  жақсартулар және түзетулер дайындадық. Мына жаңа нұсқада қандай жаңартулар пайда блғанын көргіңіз келеме?",
        "seeChangeLog": "Көбірек оқу..."
    }
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"moment/locale/de.js":"moment/locale/de.js","moment/locale/es.js":"moment/locale/es.js","moment/locale/fi.js":"moment/locale/fi.js","moment/locale/fr.js":"moment/locale/fr.js","moment/locale/id.js":"moment/locale/id.js","moment/locale/ko.js":"moment/locale/ko.js","moment/locale/nl.js":"moment/locale/nl.js","moment/locale/pl.js":"moment/locale/pl.js","moment/locale/pt.js":"moment/locale/pt.js","moment/locale/ru.js":"moment/locale/ru.js","moment/locale/tr.js":"moment/locale/tr.js","moment/locale/uk.js":"moment/locale/uk.js","moment/locale/zh-cn.js":"moment/locale/zh-cn.js","moment/locale/zh-tw.js":"moment/locale/zh-tw.js"}],15:[function(require,module,exports){
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"38\" height=\"38\" viewBox=\"0 0 38 38\" stroke=\"rgba(0,0,0,.4)\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <g transform=\"translate(1 1)\" stroke-width=\"2\">\n            <circle stroke-opacity=\".5\" cx=\"18\" cy=\"18\" r=\"18\" style=\"\n    stroke: rgba(0,0,0,.15);\n\"/>\n            <path d=\"M36 18c0-9.94-8.06-18-18-18\" transform=\"rotate(24.1696 18 18)\">\n                <animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 18 18\" to=\"360 18 18\" dur=\"1s\" repeatCount=\"indefinite\"/>\n            </path>\n        </g>\n    </g>\n</svg>";

},{}],16:[function(require,module,exports){
module.exports=module.exports = "{\n  \"manifest_version\": 2,\n  \"name\": \"Raindrop.io New Tab / Speed Dial\",\n  \"description\": \"Your beautiful start page with favorite sites and bookmarks.\",\n  \"homepage_url\": \"https://raindrop.io\",\n  \"short_name\": \"RaindropNewTab\",\n  \"version\": \"0.7.4\",\n  \"default_locale\": \"en\",\n\n  \"offline_enabled\": true,\n\n  \"background\": {\n\t\t\"scripts\": [\"background.js\"],\n\t\t\"persistent\": true\n\t},\n\n  \"permissions\": [\n    \"tabs\",\n    \"storage\",\n    \"*://*/*\",\n    \"<all_urls>\",\n    \"notifications\"\n  ],\n\n  \"icons\" : {\n    \"16\": \"common/images/icon-16.png\",\n    \"48\" : \"common/images/icon-48.png\",\n    \"128\" : \"common/images/icon-128.png\"\n  },\n\n  \"chrome_url_overrides\" : {\n    \"newtab\": \"app/index.html#/\"\n  },\n\n  \"options_page\": \"settings/settings.html\",\n  \n  \"options_ui\": {\n    \"page\": \"settings/settings.html\",\n    \"chrome_style\": true\n  },\n\n  \"page_action\": {\n    \"default_icon\": {\n      \"19\": \"common/images/page-action-19.png\",\n      \"38\": \"common/images/page-action-38.png\"\n    },\n    \"default_title\": \"Save to Raindrop.io\",\n    \"default_popup\": \"miniclipper/index.html\"\n  },\n\n  \"content_security_policy\": \"script-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.intercom.io https://*.intercomcdn.com https://*.getsentry.com https://*.ravenjs.com https://*.uservoice.com; object-src 'self'\"\n}\n";

},{}],17:[function(require,module,exports){
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

},{"../actions/Bookmarks":1,"../actions/Childrens":2,"../actions/Collections":3,"../actions/User":6,"../stores/Stats":18}],18:[function(require,module,exports){
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

},{"../actions/Collections":3,"../actions/Stats":5}],19:[function(require,module,exports){
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

},{"../actions/ModalFrame":4,"../actions/User":6,"./Collections":17}],20:[function(require,module,exports){
var fb = require("../vector/fb.svg"),
	twitter = require("../vector/twitter.svg");

var tweetString = {
	"en_US": "Feature-rich, attractive and easy-to-use bookmarking app",
	"ru_RU": "Ваши закладки могут быть красивыми, удобными и функциональными."
}
var tweetLine = tweetString["en_US"];
try{
	if (tweetString[t.getLang()])
		tweetLine = tweetString[t.getLang()];
}catch(e){}

module.exports = React.createClass({displayName: "exports",
	handleSelectAll: function(e) {
        e.target.focus();
        e.target.select();
    },

	render: function() {

		var uniqLink = "https://raindrop.io/?ref="+UserStore.getUser()._id;

		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "Want free access to ", React.createElement("b", null, "PRO Features"), " for 12 months?"), 
				React.createElement("p", {style: {fontSize: "20px", margin: "36px 0px"}}, 
					"Raindrop.io is free, but you can ", React.createElement("a", {href: "https://raindrop.io/static/pro", target: "_blank"}, "get more nice PRO features"), ".", React.createElement("br", null), 
					"Get 5 of your friends to sign up with this unique URL:"
				), 	

				React.createElement("div", {className: "invite-link"}, 
					React.createElement("input", {type: "text", value: uniqLink, onFocus: this.handleSelectAll, onMouseUp: this.handleSelectAll}), 
					React.createElement("a", {href: "https://www.facebook.com/share.php?u="+encodeURIComponent(uniqLink), target: "_blank", className: "invite-btn fb"}, React.createElement("span", {dangerouslySetInnerHTML: {__html:fb}}), " Share"), 
					React.createElement("a", {href: "https://twitter.com/home?status="+encodeURIComponent(tweetLine+" "+uniqLink), target: "_blank", className: "invite-btn tweet"}, React.createElement("span", {dangerouslySetInnerHTML: {__html:twitter}}), " Tweet")
				)
			)
		);
	}
});

},{"../vector/fb.svg":31,"../vector/twitter.svg":36}],21:[function(require,module,exports){
var light = require("../vector/light.svg");
var Invite = require("../components/Invite.js");

var AfterClipper = React.createClass({displayName: "AfterClipper",
	interval: null,

	getInitialState: function() {
		return {
			showInvite: false
		}
	},

	checkUser: function() {
		if (UserStore.isLogged()){
			this.setState({showInvite: true});
			clearInterval(this.interval);
		}
	},

	componentDidMount: function() {
		this.interval = setInterval(this.checkUser, 4000);
	},

	componentWillUnmount: function() {
		clearInterval(this.interval);
	},

	render: function() {
		if (this.state.showInvite)
			return (
				React.createElement("div", {id: "content"}, 
					React.createElement("article", null, 
						React.createElement("header", null, 
							React.createElement(Invite, null)
						)
					)
				)
			);

		//Click the  toolbar icon to get started.
		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("article", null, 
					React.createElement("div", {className: "extension-pointer"}, 
						"Click the ", React.createElement("span", {className: "light-icon", dangerouslySetInnerHTML: {__html:light}}), " toolbar icon to get started."
					)
				)
			)
		);
	}
});

module.exports = AfterClipper;

},{"../components/Invite.js":20,"../vector/light.svg":32}],22:[function(require,module,exports){
var globalJson = JSON.parse(require('../../global.json'));
var strings = require('../../modules/strings.js');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		var l = globalJson.links.apps, currentBrowser = "none";
		var browser = strings.getCurrentBrowser();

		if (browser.indexOf("safari")!=-1)
			currentBrowser = "safari";
		else if (browser.indexOf("opera")!=-1)
			currentBrowser = "opera";
		else if ((browser.indexOf("chrome")!=-1)||(browser.indexOf("webkit")!=-1))
			currentBrowser = "chrome";
		else if (browser.indexOf("firefox")!=-1)
			currentBrowser = "firefox";

		l = globalJson.links.extension[currentBrowser];

		return {
			browser: currentBrowser,
			link: l,
			platform: strings.parseBrowserQuery()["platform"]||"web"
		}
	},

	componentDidMount: function() {
		React.findDOMNode(this.refs.vid).addEventListener("timeupdate", this.videoPlaying);
	},

	videoPlaying: function(e) {
		if (e.target.currentTime>=18)
			e.target.currentTime=0;
	},

	componentWillUnmount: function() {
		React.findDOMNode(this.refs.vid).removeEventListener("timeupdate", this.videoPlaying);
	},

	handleInstall: function(e) {
		var isChrome = false;
		try{
			if (typeof chrome.webstore.install == "function") isChrome = true;
		}catch(e){}

		if (isChrome){
			e.preventDefault();

			var _this = this;
			chrome.webstore.install(globalJson.links.extension.chrome, function(){

			}, function() {
				window.open(_this.state.link);
			});
		}
	},

	render: function() {
		var prefix = "";
		if (this.state.browser!="none"){
			prefix = "for "+_.capitalize(this.state.browser);
		}

		var tagLine = (React.createElement("h3", null, 
			React.createElement("a", {href: this.state.link, onClick: this.handleInstall, target: "_blank"}, "Install our browser extension ", prefix), " and keep your content handy. From any tab."
		));

		var other = (
			React.createElement("div", null, 
				React.createElement("br", null), React.createElement("br", null), 
				React.createElement("h3", {className: "subheader", style: {fontSize: "15px"}}, React.createElement("a", {href: globalJson.links.apps, target: "_blank"}, "Want install to another browser?"))
			)
		);

		if ((this.state.browser=="none")||(this.state.platform == "clipper"))
			other = null;

		if (this.state.platform == "clipper")
			tagLine = React.createElement("h3", null, "Click lightning toolbar icon to get started");

		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("article", null, 
					React.createElement("header", null, 
						React.createElement("h1", null, "Clip web content easily"), 
						tagLine, 

						React.createElement("br", null), React.createElement("br", null), 

						React.createElement("div", {id: "videoPlayer"}, 
							React.createElement("video", {ref: "vid", src: "https://raindrop.io/other/welcome3/raindrop.mp4", width: "546", height: "400", preload: true, autoPlay: true, loop: true})
						)
					), 

					other
				), 

				React.createElement("footer", {className: "subheader"}, 
					React.createElement("a", {href: "#/features", className: "button default"}, "Next ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}}))
				)
			)
		);
	}
});

},{"../../global.json":9,"../../modules/strings.js":13}],23:[function(require,module,exports){
var CollectionsActions = require('../../actions/Collections');

var _prefix = "interest_";

var interests = [
	{title: langLang(_prefix+"technology"), cover_path: "aa/w112"},
	{title: langLang(_prefix+"technology_applications"), cover_path: "aa/w25"},
	{title: langLang(_prefix+"cars_motorcycles"), cover_path: "car"},
	{title: langLang(_prefix+"fashion"), cover_path: "aa/k47"},
	{title: langLang(_prefix+"developers"), cover_path: "aa/k27"},
	{title: langLang(_prefix+"education"), cover_path: "aa/k36"},
	{title: langLang(_prefix+"film_music_books"), cover_path: "aa/k48"},
	{title: langLang(_prefix+"technology_games"), cover_path: "aa/w62"},
	{title: langLang(_prefix+"health_fitness"), cover_path: "aa/k80"},
	{title: langLang(_prefix+"design_inspiration"), cover_path: "aa/k31"},
	{title: langLang(_prefix+"food_drink_recipes"), cover_path: "aa/j185"},
	{title: langLang(_prefix+"sites"), cover_path: "aa/k87"},
	{title: langLang(_prefix+"sport"), cover_path: "aa/u16"},
	{title: langLang(_prefix+"pictures"), cover_path: "aa/k85"},
	{title: langLang(_prefix+"psychology_self_development"), cover_path: "aa/k41"},
	{title: langLang(_prefix+"science"), cover_path: "space/k21"},
	{title: langLang(_prefix+"travel"), cover_path: "aa/k78"}
];

interests = _.orderBy(interests, ['title'], ["desc"]);


module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			selected: [],
			loading: false
		}
	},

	componentDidMount: function() {
		var collectionsCount = 0;
		(UserStore.getUser().groups||[]).forEach(function(g) {
			collectionsCount += (g.collections||[]).length;
		});

		if ((collectionsCount>0)||(!UserStore.isLogged())) {
			this.goNext();
		}
	},

	check: function(e) {
		var index = parseInt(e.target.getAttribute("data-index"));
		if (this.state.selected.indexOf(index) != -1)
			this.state.selected.splice(this.state.selected.indexOf(index),1);
		else
			this.state.selected.push(index);
		this.state.selected = _.uniq(this.state.selected);
		this.setState({selected: this.state.selected});
	},

	goNext: function(e) {
		if(e)e.preventDefault();

		var redirect = function(){
			window.location.hash = "#/content";
		}

		if (this.state.selected.length>0){
			this.setState({loading: true});

			//create collections
			var current = Promise.resolve();
			var queue = this.state.selected.map(function(selected) {
				return new Promise(function(res,rej){
					var up = {
						item: interests[selected],
						silent: true
					};
					up.item.group=0;

					CollectionsActions.insertCollection(up, res);
		        })
			});

			//firstly check how many groups we have
			new Promise(function(res,rej){
					if ((UserStore.getUser().groups||[]).length==0){
						UserStore.onInsertGroup({
							item: {
								title: langLang("myCollections")
							},
							silent: true
						}, res);
					}else{
						res(true);
					}
				})
				.then(function(result){
					return Promise.all(queue);
				})
				.then(function(result){
					redirect();
				});
		}else
			redirect();
	},

	render: function() {
		var _this = this;

		if (this.state.loading)
			return (
				React.createElement("div", {id: "content"}, 
					React.createElement("article", null, 
						React.createElement("span", {dangerouslySetInnerHTML: {__html:icons.preloader}})
					)
				)
			);

		var items = interests.map(function(i,index) {
			return (
				React.createElement("div", {className: "item "+(_this.state.selected.indexOf(index) != -1 ? "active" : null), "data-index": index, onClick: _this.check}, 
					React.createElement("img", {src: network.fixURL("/img/templates/" + i.cover_path + ".png"), alt: ""}), 
					React.createElement("span", null, i.title)
				)
			);
		});

		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("article", null, 
					React.createElement("header", null, 
						React.createElement("h1", null, "Select your interests"), 
						React.createElement("h3", null, "We call it «collections»")
					), 

					React.createElement("div", {className: "cheker"}, 
						items
					), 

					React.createElement("br", null), React.createElement("br", null), 
					React.createElement("div", {style: {opacity:.5}}, 
						React.createElement("h3", {className: "subheader"}, "You can customize or make any other collections later")
					), React.createElement("br", null)
				), 

				React.createElement("footer", {className: "subheader"}, 
					React.createElement("a", {href: "", onClick: this.goNext, className: "button default"}, "Next ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}}))
				)
			)
		);
	}
});

},{"../../actions/Collections":3}],24:[function(require,module,exports){
var logo = require("../vector/logo-check.svg");

var canOver = false;

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			over: ""
		}
	},

	componentDidMount: function() {
		setTimeout(function(){
			canOver = true;
		},2000);

		UserStore.saveConfig({notify: true, name: "welcome_guide"});
	},

	handleOver: function(e) {
		if (canOver)
		this.setState({over: e.target.getAttribute("data-item")});
	},

	handleLeave: function(e) {
		this.setState({over: ""});
	},

	render: function() {
		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("div", {id: "screen-wrap"}, 
				React.createElement("div", {id: "screen"}, 
					React.createElement("div", {className: "animFromBottom"}, React.createElement("div", {className: "logo", dangerouslySetInnerHTML: {__html:logo}}), 

						React.createElement("h1", null, "Your new home for all interests is ready!"), 

						React.createElement("div", {className: "screen-img current-target-"+this.state.over}, 
							React.createElement("div", null)
						)
					)
				)
				), 

				React.createElement("article", {className: "subheader"}, 
					React.createElement("div", {className: "liner left"}, 
						"Here your collections"
					), 
					React.createElement("div", {className: "liner right"}
						
					), 

					React.createElement("h2", {style: {marginTop:"0px"}}, "Space for most important:"), 

					React.createElement("div", {className: "grid"}, 
						React.createElement("div", {className: "item", "data-item": "clip", onMouseOver: this.handleOver, onMouseLeave: this.handleLeave, title: "You can save any content from web, including pages, links, articles, images and video."}, 
							React.createElement("div", {className: "ic clip"}), 
							React.createElement("span", null, "Articles and pages from web")
						), 

						React.createElement("div", {className: "item", "data-item": "files", onMouseOver: this.handleOver, onMouseLeave: this.handleLeave, title: "Images. Soon PDF, Mark Down and other."}, 
							React.createElement("div", {className: "ic files"}), 
							React.createElement("span", null, "Files from desktop")
						), 

						React.createElement("div", {className: "item", "data-item": "embed", onMouseOver: this.handleOver, onMouseLeave: this.handleLeave, title: "Youtube, Vimeo, Flickr, IMDB, Slideshare and many other"}, 
							React.createElement("div", {className: "ic embed"}), 
							React.createElement("span", null, "Favorite movies, pictures or presentations")
						), 

						React.createElement("div", {className: "item", title: ""}, 
							React.createElement("div", {className: "ic notes"}), 
							React.createElement("span", null, "Notes"), 

							React.createElement("div", {className: "info"}, 
								"Soon"
							)
						)
					)

					/*<br/><br/>
					<h2>How can I use Raindrop.io?</h2>

					<div className="grid small">
						<div className="item">
							<div className="ic fifty brain"></div>
							<span>Knowladge base</span>
						</div>

						<div className="item">
							<div className="ic fifty moodboard"></div>
							<span>Moodboard</span>
						</div>

						<div className="item">
							<div className="ic fifty project"></div>
							<span>Project</span>
						</div>

						<div className="item">
							<div className="ic fifty plan"></div>
							<span>Plan</span>
						</div>

						<div className="item">
							<div className="ic fifty more"></div>
							<span>Your inspiration</span>
						</div>
					</div>*/
				), 

				React.createElement("footer", {className: "subheader"}, 
					React.createElement("a", {href: "#/clipper", className: "button default"}, "Next ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}}))
				)
			)
		);
	}
});

},{"../vector/logo-check.svg":33}],25:[function(require,module,exports){
var globalJson = JSON.parse(require('../../global.json'));
var strings = require('../../modules/strings.js');
var ios = require("../vector/badge-ios.svg"),
	android = require("../vector/badge-android.svg"),
	osx = require("../vector/badge-mac.svg");

var Invite = require("../components/Invite.js");

module.exports = React.createClass({displayName: "exports",
	contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
    	return {
    		platform: strings.parseBrowserQuery()["platform"]||"web"
    	}
    },

    renderFeatures: function() {
    	return (
    		React.createElement("div", {className: "grid", style: {maxWidth:"720px"}}, 
				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic search", style: {marginLeft:"-44px"}}), 
					React.createElement("span", {style: {marginTop:"10px"}}, "Smart search")
				), 

				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic sixsti shared"}), 
					React.createElement("span", null, "Share & collaborate")
				), 

				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic sixsti newtab"}), 
					React.createElement("span", null, React.createElement("a", {href: globalJson.links.apps, target: "_blank"}, "New Tab replacement"))
				), 

				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic sixsti screenshot"}), 
					React.createElement("span", null, "Page screenshots")
				), 

				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic sixsti rss"}), 
					React.createElement("span", null, React.createElement("a", {href: globalJson.links.settings+"/rss", target: "_blank"}, "RSS"))
				), 

				React.createElement("div", {className: "item", title: ""}, 
					React.createElement("div", {className: "ic sixsti import"}), 
					React.createElement("span", null, React.createElement("a", {href: globalJson.links.settings+"/import", target: "_blank"}, "Import/export bookmarks"))
				)
			)
    	);
    },

	render: function() {
		var link = "https://raindrop.io";
		switch(this.state.platform) {
			case "newtab":
				link = "../app/index.html";
			break;

			case "clipper":
				link = "#afterclipper";
			break;
		}

		var footerLink = React.createElement("a", {href: link, className: "button active"}, "Start using Raindrop.io");

		if (this.state.platform=="newtab")
			footerLink = (
				React.createElement("div", {className: "info-open-newtab"}, 
					React.createElement("div", {className: "ic newtab-browser"}), " Open new tab to get started"
				)
			);

		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("article", null, 
					React.createElement("header", null, 
						React.createElement(Invite, null), 

						React.createElement("div", {className: "subheader"}, 
							React.createElement("div", {className: "nice-line"}), 
							React.createElement("h4", null, "Also available for iPhone, iPad, Android and Mac OS X:"), 
							React.createElement("div", {className: "install-links"}, 
								React.createElement("a", {href: globalJson.links.ios, target: "_blank"}, React.createElement("span", {dangerouslySetInnerHTML: {__html:ios}})), 
								React.createElement("a", {href: globalJson.links.android, target: "_blank"}, React.createElement("span", {dangerouslySetInnerHTML: {__html:android}})), 
								React.createElement("a", {href: globalJson.links.osx, target: "_blank"}, React.createElement("span", {dangerouslySetInnerHTML: {__html:osx}}))
							)
						)
					)
				), 

				React.createElement("footer", {className: "subheader"}, 
					React.createElement("a", {href: "https://raindrop.io/settings#/settings/import", target: "_blank", className: "button default"}, "Import bookmarks"), 
					"   ", 
					footerLink
				)
			)
		);
	}
});

},{"../../global.json":9,"../../modules/strings.js":13,"../components/Invite.js":20,"../vector/badge-android.svg":28,"../vector/badge-ios.svg":29,"../vector/badge-mac.svg":30}],26:[function(require,module,exports){
var logo = require("../vector/logo.svg");

module.exports = React.createClass({displayName: "exports",
	render: function() {
		var origin = window.location.pathname + window.location.search;
		origin = encodeURIComponent(origin.substr(1,origin.length));

        return (
          React.createElement("div", {id: "content"}, 
            React.createElement("article", null, 
              React.createElement("div", {className: "logo", dangerouslySetInnerHTML: {__html:logo}}), 
              React.createElement("h1", null, langLang("welcome"), " Raindrop.io"), 

              React.createElement("br", null), React.createElement("br", null), 
              React.createElement("div", null, 
                React.createElement("a", {href: "/account?redirect="+origin, className: "button default", style: {display:"inline-block",marginRight:"10px"}}, langLang("signIn"), " ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}})), 
                React.createElement("a", {href: "/account/signup?redirect="+origin, className: "button active", style: {display:"inline-block",marginLeft:"10px"}}, langLang("signUp"), " ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}}))
              )
            )
          )
        );
	}
});

},{"../vector/logo.svg":34}],27:[function(require,module,exports){
var logo = require("../vector/logo.svg");
var strings = require('../../modules/strings.js');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
    	return {
    		platform: strings.parseBrowserQuery()["platform"]||"web"
    	}
    },

	componentDidMount: function() {
		if (!UserStore.isLogged()){
			window.location.hash = "#login";
		}
		else if ((this.state.platform == "clipper")&&(UserStore.getConfig("welcome_guide"))){
			window.location.hash = "#/afterclipper";
		}
	},

	render: function() {
		return (
			React.createElement("div", {id: "content"}, 
				React.createElement("article", null, 
					React.createElement("header", null, React.createElement("div", {className: "logo", dangerouslySetInnerHTML: {__html:logo}}), 

					React.createElement("h1", null, "Welcome to Raindrop.io")), 


					React.createElement("br", null), React.createElement("br", null), 
					React.createElement("div", {className: "subheader"}, 
						React.createElement("a", {href: "#/collections", className: "button active"}, "Learn more ", React.createElement("span", {className: "icon", dangerouslySetInnerHTML: {__html:icons.forward}}))
					)
				), 

				React.createElement("footer", {className: "subheader"}, 
					React.createElement("a", {href: "#/features", className: "button silver right"}, "Skip")
				)
			)
		);
	}
});

},{"../../modules/strings.js":13,"../vector/logo.svg":34}],28:[function(require,module,exports){
module.exports = "<svg width=\"187\" height=\"48\" viewBox=\"0 0 187 48\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"187\" height=\"48\" rx=\"3\"/><path d=\"M14.35 40.3c-.22-.32-.35-.76-.35-1.3V10c0-.53.12-.95.32-1.26l16.14 16.14-16.1 15.42zm3.1-.18l18.24-10-3.9-3.83-14.4 13.8zm18.4-20.42L17.38 8.96 31.9 23.5l3.97-3.8zm1.8 1.04l4.75 2.76c1.44.83 1.42 2.15-.03 2.94l-4.85 2.66-4.2-4.2 4.35-4.16z\" fill=\"#FFF\"/><path d=\"M143.16 35.65c-.76 0-1.46-.14-2.1-.43-.63-.28-1.16-.7-1.6-1.3h-.12c.1.7.13 1.34.13 1.95v4.85h-1.78V23.66h1.4l.2 1.6h.1c.4-.63 1-1.1 1.6-1.38.6-.3 1.3-.43 2.1-.43 1.5 0 2.7.53 3.6 1.6.8 1.07 1.2 2.56 1.2 4.5 0 1.92-.5 3.42-1.3 4.5-.9 1.06-2.1 1.6-3.6 1.6zm-.25-10.7c-1.2 0-2 .35-2.6 1-.5.68-.8 1.74-.8 3.2v.4c0 1.64.3 2.82.9 3.54.6.7 1.5 1 2.7 1 1 0 1.8-.4 2.4-1.3.6-.8.9-2 .9-3.4 0-1.5-.3-2.6-.8-3.4-.6-.8-1.4-1.2-2.4-1.2zm9.3 10.48h-1.8v-16.7h1.8v16.7zm10.3 0l-.3-1.67h-.1c-.5.73-1.1 1.23-1.7 1.5-.6.26-1.3.4-2.2.4-1.1 0-2-.3-2.7-.9-.6-.62-1-1.47-1-2.58 0-2.38 1.9-3.62 5.7-3.74l2-.06v-.73c0-.93-.2-1.6-.6-2.05-.4-.44-1-.66-1.9-.66-.9 0-2.1.3-3.3.9l-.5-1.36c.6-.32 1.2-.56 1.9-.74.7-.18 1.4-.27 2.1-.27 1.4 0 2.5.3 3.2.93.7.63 1 1.63 1 3v8.03h-1.3zm-4-1.25c1.1 0 2-.3 2.6-.92.7-.6 1-1.46 1-2.55v-1l-1.8.1c-1.4.1-2.4.3-3 .7-.6.4-.9 1-.9 1.8 0 .7.2 1.2.6 1.5.4.4 1 .5 1.7.5zm6.4-10.52h1.9l2.6 6.7c.6 1.55.9 2.65 1.1 3.33h.1c.1-.4.3-1 .6-1.9.3-.9 1.3-3.6 2.9-8.2h1.9L170.8 37c-.5 1.34-1.1 2.28-1.77 2.83-.7.56-1.5.84-2.47.84-.54 0-1.08-.07-1.6-.2v-1.4c.38.1.82.12 1.3.12 1.23 0 2.1-.7 2.63-2.1l.6-1.7-4.7-11.9zm-54.6 1.1c.6.47 1.8 1.45 1.8 3.32 0 1.82-1 2.68-2.1 3.5-.3.32-.7.66-.7 1.2 0 .54.4.84.7 1.06l.9.7c1.1.9 2.1 1.74 2.1 3.44 0 2.3-2.2 4.65-6.4 4.65-3.55 0-5.3-1.7-5.3-3.52 0-.8.47-2.1 1.9-3 1.55-.9 3.6-1 4.7-1.1-.32-.4-.72-.9-.72-1.6 0-.4.17-.6.3-.9-.27 0-.54.1-.8.1-2.6 0-4.07-1.9-4.07-3.9 0-1.1.5-2.4 1.55-3.3 1.4-1.1 3.05-1.3 4.4-1.3h5.05l-1.6.9h-1.5zm-1.8 10.94c-.2-.04-.3-.04-.5-.04s-1.5.05-2.6.4c-.5.2-2.1.78-2.1 2.53 0 1.7 1.7 3 4.3 3 2.4 0 3.6-1.2 3.6-2.7 0-1.3-.8-1.9-2.7-3.3zm.7-4.7c.6-.56.7-1.34.7-1.8 0-1.76-1-4.52-3.1-4.52-.6 0-1.3.32-1.7.82-.4.5-.5 1.18-.5 1.82 0 1.65 1 4.38 3.1 4.38.6 0 1.3-.3 1.7-.7zm-14.5 4.3c-3.9 0-6-3.05-6-5.8 0-3.23 2.7-5.98 6.4-5.98 3.6 0 5.9 2.83 5.9 5.8 0 2.9-2.3 5.97-6.3 5.97zm3.1-2c.6-.78.8-1.77.8-2.73 0-2.16-1-6.3-4.1-6.3-.8 0-1.6.33-2.2.85-.9.86-1.1 1.94-1.1 3 0 2.43 1.2 6.43 4.2 6.43 1 0 2-.46 2.5-1.25zm-16.4 2c-3.9 0-6-3.05-6-5.8 0-3.23 2.7-5.98 6.4-5.98 3.6 0 5.9 2.83 5.9 5.8 0 2.9-2.2 5.97-6.2 5.97zm3.1-2c.6-.78.8-1.77.8-2.73 0-2.16-1.1-6.3-4.1-6.3-.8 0-1.6.33-2.2.85-1 .86-1.2 1.94-1.2 3 0 2.43 1.2 6.43 4.2 6.43 1 0 2-.46 2.5-1.25zm-11 1.6l-3.5.82c-1.4.23-2.7.42-4 .42-6.9 0-9.5-5-9.5-8.94 0-4.8 3.7-9.24 10-9.24 1.3 0 2.6.2 3.7.52 1.8.52 2.7 1.16 3.2 1.52l-2 2-.86.2.6-1c-.83-.8-2.36-2.3-5.3-2.3-3.9 0-6.82 2.95-6.82 7.28 0 4.64 3.4 9 8.78 9 1.56 0 2.4-.3 3.1-.6V30.6l-3.8.2 2-1.07h5.2l-.63.6c-.14.17-.2.2-.22.4l-.02 1.2v3z\" fill=\"#F9F9F9\"/><path d=\"M117.95 34.2c-.8-.08-.98-.23-.98-1.2V18.88c.1-.87.36-1.02 1.13-1.46h-3.54l-1.85.9h1.9v15.24c0 .5-.1.58-.6 1.32h4.4l1-.54-1.2-.12zm10.05.22c-.26.15-.53.32-.8.44-.8.37-1.64.47-2.38.47-.78 0-2-.05-3.27-.96-1.74-1.22-2.5-3.33-2.5-5.17 0-3.8 3.1-5.67 5.62-5.67.9 0 1.8.22 2.53.7 1.23.8 1.55 1.85 1.72 2.4L123.15 29l-1.9.14c.62 3.12 2.73 4.93 5.07 4.93 1.25 0 2.16-.44 3-.85l-1.3 1.22zm-2.3-7.3c.47-.18.7-.33.7-.67 0-.98-1.1-2.1-2.42-2.1-.98 0-2.82.75-2.82 3.4 0 .42.05.86.08 1.3l4.46-1.94zm4.68-3.42v1.62h-.2V23.7h-.54v-.17h1.27v.17h-.5zm2.2 1.62v-1.64l-.5 1.64h-.16l-.5-1.64v1.64h-.2v-1.8h.32l.46 1.45.45-1.44h.3v1.8h-.17z\" fill=\"#F9F9F9\"/><path d=\"M61.34 13.15H60.1c0-.17-.1-.65-.34-1.44H58c-.25.8-.37 1.3-.37 1.5h-1.15c0-.1.3-.9.9-2.4.6-1.5.9-2.4.9-2.5h1.44c0 .2.27 1 .8 2.5.55 1.6.82 2.4.82 2.5zm-1.77-2.17c-.44-1.32-.66-2.03-.66-2.14 0 .1-.2.8-.7 2.14h1.4zm6.73 2.17h-.96c0-.1-.35-.66-1.05-1.66-.8-1.1-1.2-1.8-1.3-2.2h-.1c0 .5.1 1 .1 1.5v2.3h-1v-2.6c0-1 0-1.8-.1-2.4H63c0 .1.34.7.97 1.6.7 1 1.1 1.7 1.2 2h.02c-.1-.6-.1-1.1-.1-1.6 0-.7 0-1.4-.1-2.2h1c-.05.6-.1 1.4-.1 2.4 0 .9.05 1.8.1 2.6zm5.55-2.67c0 .72-.23 1.36-.7 1.9-.47.54-1.12.8-1.96.8-.4 0-.9 0-1.6-.03v-2.6c0-.95 0-1.74-.1-2.4h1.1l.4-.02c.9 0 1.6.23 2 .7.4.45.6 1 .6 1.65zm-1.05.16c0-.5-.14-.9-.43-1.24-.3-.33-.72-.5-1.3-.5-.12 0-.27 0-.46.03.1.5.1 1.05.1 1.6 0 .62 0 1.22.1 1.82.2.04.4.05.5.05.6 0 1-.17 1.2-.5.3-.35.4-.77.4-1.26zm6.18 2.5h-1.14c-.3-.9-.52-1.46-.68-1.67-.16-.2-.42-.32-.77-.32h-.5v2h-1v-2.6c0-.95 0-1.74-.1-2.4H74c.25-.02.48-.02.68-.02 1.2 0 1.77.4 1.77 1.2 0 .64-.4 1.1-1 1.34v.05c.2.08.5.28.6.6.2.34.45.95.8 1.83zm-1.44-3.52c0-.5-.33-.77-1-.77-.23 0-.44.02-.62.06.03.4.04 1 .04 1.6h.36c.8 0 1.22-.3 1.22-.8zm6.93.94c0 .78-.24 1.43-.72 1.95-.48.6-1.07.8-1.78.8-.68 0-1.24-.2-1.7-.7-.45-.4-.68-1-.68-1.8s.2-1.4.7-1.9c.5-.5 1.1-.7 1.8-.7.6 0 1.2.3 1.7.7.4.5.6 1.1.6 1.8zm-1.05.1c0-.53-.14-.96-.4-1.3-.3-.32-.63-.5-1.03-.5s-.7.18-1 .5c-.3.35-.4.77-.4 1.28 0 .53.1.97.4 1.3.3.34.6.5 1 .5s.7-.17.9-.5c.2-.34.4-.76.4-1.27zm3.22 2.5h-1.08c.03-.8.05-1.68.05-2.6v-2.4h1.1v2.4c0 .94 0 1.8.1 2.6zm5.56-2.68c0 .72-.23 1.36-.7 1.9-.46.54-1.1.8-1.95.8-.38 0-.9 0-1.57-.03.04-.77.05-1.65.05-2.6 0-.95 0-1.74-.05-2.4h1.18l.4-.02c.94 0 1.6.23 2.02.7.42.45.63 1 .63 1.65zm-1.04.16c0-.5-.15-.9-.43-1.24-.3-.33-.73-.5-1.3-.5-.12 0-.27 0-.47.03.03.5.04 1.05.04 1.6 0 .62 0 1.22.04 1.82.17.04.33.05.5.05.55 0 .96-.17 1.22-.5.26-.35.4-.77.4-1.26zm8.42 2.5h-1.23c0-.16-.1-.64-.35-1.43h-1.77c-.24.8-.36 1.3-.36 1.5h-1.15c0-.1.3-.9.9-2.4.6-1.5.9-2.4.9-2.5h1.44c0 .2.27 1 .8 2.5.55 1.6.82 2.4.82 2.5zM95.8 11c-.42-1.32-.64-2.03-.64-2.14h-.06c0 .1-.23.8-.7 2.14h1.4zm6.26-1.52c0 .6-.23 1.06-.68 1.36-.46.3-1 .43-1.67.43h-.2c0 .48 0 1.1.1 1.9h-1.1c.1-.74.1-1.6.1-2.6v-2.4h1.3c.3-.02.5-.02.7-.02.5 0 .9.1 1.3.33.37.22.5.55.5 1zm-1 .2c0-.53-.36-.8-1.08-.8-.18 0-.38 0-.58.05.03.5.04 1.05.04 1.66h.23c.93 0 1.4-.3 1.4-.9zm5.6-.2c0 .6-.23 1.06-.68 1.36-.46.3-1 .43-1.67.43h-.2c0 .48 0 1.1.1 1.9H103c.05-.74.06-1.6.06-2.6 0-.94 0-1.73-.05-2.4h1.3c.3-.02.5-.02.7-.02.5 0 .9.1 1.3.33.4.22.5.55.5 1zm-1 .2c0-.53-.35-.8-1.08-.8-.18 0-.37 0-.58.05.03.5.05 1.05.05 1.66h.22c.93 0 1.4-.3 1.4-.9zm8.52.9c0 .78-.24 1.43-.72 1.95-.48.54-1.08.8-1.78.8-.68 0-1.24-.24-1.7-.72-.45-.4-.68-1-.68-1.8s.24-1.4.72-1.9 1.08-.7 1.78-.7c.68 0 1.24.3 1.7.7.45.5.68 1.1.68 1.8zm-1.06.1c0-.53-.13-.96-.4-1.3-.28-.32-.62-.5-1.02-.5-.37 0-.7.18-.95.5-.26.35-.4.77-.4 1.28 0 .53.14.97.42 1.3.27.34.6.5 1 .5.38 0 .7-.17.96-.5.26-.34.4-.76.4-1.27zm6.26 2.5h-.95c0-.1-.35-.67-1.05-1.67-.74-1-1.16-1.8-1.26-2.2h-.06c.06.6.1 1.1.1 1.6 0 .7 0 1.4.05 2.3h-.9c.1-.8.1-1.6.1-2.6V8.2h1.2c0 .2.4.7 1 1.68.7 1 1.1 1.68 1.2 2.04h.1c0-.56-.1-1.07-.1-1.52V8.27h.95c-.02.64-.04 1.43-.04 2.4v2.6z\" fill=\"#F9F9FA\"/></svg>";

},{}],29:[function(require,module,exports){
module.exports = "<svg width=\"142\" height=\"48\" viewBox=\"0 0 142 48\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"141.792\" height=\"48\" rx=\"3\"/><path d=\"M31.0407 22.9012c-.031-3.4335 2.8114-5.104 2.9413-5.1816-1.6097-2.347-4.1046-2.6676-4.9813-2.693-2.0955-.2206-4.128 1.2537-5.1955 1.2537-1.0888 0-2.7325-1.2325-4.504-1.1963-2.28.0352-4.4126 1.355-5.5823 3.4047-2.414 4.1792-.614 10.3207 1.699 13.6988 1.157 1.6554 2.508 3.5016 4.278 3.4366 1.731-.07 2.377-1.103 4.467-1.103 2.07 0 2.677 1.104 4.481 1.061 1.858-.027 3.027-1.661 4.144-3.331 1.337-1.894 1.874-3.763 1.895-3.859-.043-.014-3.607-1.374-3.644-5.489M27.63 12.806c.931-1.1644 1.568-2.7485 1.3913-4.356-1.3478.0596-3.033.932-4.0036 2.071-.8586 1.0034-1.6256 2.648-1.4275 4.195 1.514.113 3.0683-.764 4.04-1.91m28.483 22.582h-2.419L52.37 31.223h-4.606l-1.2626 4.1642H44.146l4.565-14.177h2.8187l4.585 14.177zM51.97 29.476l-1.1986-3.701c-.127-.379-.3657-1.2698-.715-2.6718h-.0428c-.1408.603-.3656 1.4936-.6734 2.6718l-1.1782 3.701h3.808zm15.86.6742c0 1.7386-.472 3.113-1.417 4.1217-.8456.898-1.897 1.346-3.151 1.346-1.354 0-2.3276-.483-2.919-1.451v5.364h-2.271V28.524c0-1.092-.029-2.2116-.084-3.36h1.9972l.127 1.6214h.0428c.7574-1.222 1.907-1.832 3.4494-1.832 1.206 0 2.2124.476 3.018 1.4296.804.9556 1.208 2.2105 1.208 3.767zm-2.3137.083c0-.995-.224-1.815-.6734-2.4607-.492-.672-1.151-1.01-1.978-1.01-.561 0-1.07.188-1.525.5586-.456.372-.754.859-.894 1.463-.071.28-.106.509-.106.691v1.706c0 .742.228 1.369.684 1.883.456.512 1.048.768 1.777.768.855 0 1.521-.331 1.997-.988.477-.66.716-1.529.716-2.609zm14.0715-.083c0 1.7386-.472 3.113-1.417 4.1217-.8466.898-1.897 1.346-3.152 1.346-1.353 0-2.3266-.483-2.919-1.451v5.364h-2.271V28.524c0-1.092-.0287-2.2116-.084-3.36h1.9974l.1268 1.6214h.043c.756-1.222 1.9057-1.832 3.4493-1.832 1.205 0 2.2128.476 3.019 1.4296.8034.9556 1.2083 2.2105 1.2083 3.767zm-2.315.083c0-.995-.2245-1.815-.674-2.4607-.49-.672-1.1485-1.01-1.975-1.01-.5605 0-1.0697.188-1.5267.5586-.455.372-.753.859-.893 1.463-.069.28-.106.509-.106.691v1.706c0 .742.229 1.369.683 1.883.456.511 1.048.768 1.779.768.857 0 1.522-.331 1.998-.988.477-.66.716-1.529.716-2.609zm15.461 1.1785c0 1.206-.4205 2.187-1.26 2.9445-.9224.8265-2.2103 1.241-3.8616 1.241-1.5255 0-2.7485-.294-3.671-.883l.5252-1.893c.996.589 2.09.884 3.281.884.8566 0 1.5224-.194 1.9976-.5785.4775-.3866.717-.9012.717-1.5446 0-.576-.198-1.06-.59-1.453-.393-.391-1.0425-.757-1.9544-1.092-2.482-.926-3.7243-2.281-3.7243-4.061 0-1.163.439-2.115 1.3138-2.86.876-.743 2.037-1.115 3.482-1.115 1.29 0 2.365.225 3.219.674l-.57 1.851c-.803-.434-1.709-.652-2.724-.652-.801 0-1.43.197-1.879.59-.378.351-.571.778-.571 1.285 0 .56.219 1.024.654 1.387.377.337 1.066.702 2.061 1.094 1.221.493 2.117 1.066 2.692 1.724.579.659.866 1.48.866 2.46m7.529-4.542H97.76v4.963c0 1.263.441 1.892 1.325 1.892.4058 0 .7424-.034 1.0087-.105l.063 1.725c-.4475.167-1.0367.251-1.7653.251-.898 0-1.598-.274-2.105-.821-.505-.548-.7575-1.465-.7575-2.756v-5.153h-1.491V25.16h1.49v-1.872l2.23-.6734v2.545h2.503v1.7088m11.273 3.3226c0 1.5714-.449 2.8615-1.347 3.8703-.939 1.0376-2.187 1.5564-3.744 1.5564-1.502 0-2.696-.4975-3.587-1.4924-.891-.995-1.336-2.25-1.336-3.7638 0-1.584.461-2.8816 1.377-3.8905.918-1.0088 2.156-1.5148 3.712-1.5148 1.501 0 2.705.4996 3.618 1.4935.871.9663 1.305 2.2116 1.305 3.7414zm-2.355.0523c0-.9364-.203-1.7397-.608-2.412-.476-.8116-1.159-1.2164-2.041-1.2164-.909 0-1.609.404-2.083 1.216-.408.672-.61 1.489-.61 2.454 0 .937.201 1.742.609 2.411.491.813 1.176 1.219 2.064 1.219.867 0 1.548-.416 2.041-1.238.4164-.688.6262-1.497.6262-2.435zm9.74-3.082c-.225-.0415-.466-.0617-.716-.0617-.799 0-1.417.2993-1.851.9044-.378.5327-.567 1.206-.567 2.0188v5.3638h-2.271v-7.0033c0-1.1772-.023-2.252-.066-3.2183h1.978l.083 1.956h.063c.24-.6723.618-1.2146 1.135-1.6194.507-.3665 1.052-.5486 1.642-.5486.21 0 .399.016.568.0415l.002 2.167m10.157 2.63c0 .407-.0266.75-.083 1.03h-6.8127c.0242 1.01.3555 1.7836.9872 2.316.574.4753 1.3172.714 2.228.714 1.009 0 1.929-.16 2.757-.4837l.356 1.5767c-.9677.4208-2.1108.6317-3.4275.6317-1.585 0-2.83-.4666-3.735-1.3977-.902-.932-1.356-2.186-1.356-3.754 0-1.5405.42-2.8242 1.263-3.848.882-1.093 2.074-1.6395 3.574-1.6395 1.4734 0 2.589.5465 3.345 1.6395.601.866.9025 1.94.9025 3.215zm-2.1658-.589c.016-.6744-.133-1.254-.441-1.746-.393-.6328-.9984-.948-1.809-.948-.744 0-1.348.3077-1.808.9256-.378.492-.603 1.083-.672 1.767l4.73.002zm-76.038-13.067h-1.19l-.651-2.0465H46.77l-.621 2.0465h-1.158l2.2434-6.9682h1.385l2.255 6.9682zm-2.037-2.905l-.589-1.8197c-.061-.1864-.175-.62-.351-1.3124h-.021c-.072.2993-.176.734-.331 1.3124l-.578 1.8196h1.872zm7.647-2.119l-1.9028 5.024h-1.086l-1.841-5.024h1.1995l.859 2.657c.145.444.269.868.361 1.2708h.031c.083-.3612.207-.7852.361-1.271l.848-2.6568h1.17m4.051 5.024l-.083-.5785h-.031c-.341.4655-.837.6924-1.468.6924-.899 0-1.54-.6306-1.54-1.4786 0-1.24 1.075-1.8813 2.936-1.8813v-.0927c0-.6616-.3516-.993-1.044-.993-.496 0-.931.1248-1.312.373l-.227-.734c.465-.2898 1.044-.4347 1.727-.4347 1.312 0 1.975.693 1.975 2.079v1.851c0 .507.021.901.072 1.2l-1.005-.001zm-.155-2.5025c-1.241 0-1.861.3007-1.861 1.0134 0 .5273.321.785.765.785.569 0 1.0964-.4335 1.0964-1.0226v-.7755zm3.574-3.3492c-.371 0-.661-.2897-.661-.6722 0-.3824.299-.6615.683-.6615.382 0 .692.279.6814.662 0 .404-.289.672-.703.672zm-.537.8278h1.117v5.024h-1.117v-5.024zm3.1004-2.3053h1.116v7.3293h-1.117V8.8062zm5.861 7.3293l-.084-.5785h-.03c-.341.466-.8374.693-1.468.693-.899 0-1.5405-.63-1.5405-1.478 0-1.24 1.075-1.881 2.936-1.881v-.092c0-.662-.351-.993-1.044-.993-.496 0-.931.125-1.312.373l-.228-.735c.466-.29 1.044-.435 1.727-.435 1.3127 0 1.976.693 1.976 2.079v1.85c0 .507.0217.9.0707 1.2h-1zm-.1557-2.5024c-1.241 0-1.861.3006-1.861 1.0133 0 .5273.32.785.7643.785.569 0 1.096-.4335 1.096-1.0226v-.776zm5.6093 2.6164c-.7125 0-1.239-.3004-1.581-.8895h-.022l-.064.776h-.95c.03-.402.0408-.858.0408-1.354V8.806h1.1186v3.0403h.02c.331-.5582.868-.8373 1.602-.8373 1.21 0 2.058 1.0344 2.058 2.543 0 1.5595-.942 2.6972-2.2233 2.6972zm-.227-4.3634c-.6425 0-1.231.5582-1.231 1.3337v.879c0 .692.5288 1.261 1.2106 1.261.836 0 1.3345-.682 1.3345-1.768-.001-1.013-.519-1.707-1.315-1.707zm4.102-3.0798h1.1155v7.3293h-1.115V8.8062zm7.192 5.0858h-3.352c.0227.9512.651 1.4882 1.581 1.4882.4977 0 .9526-.083 1.355-.2376l.174.7755c-.4753.207-1.0335.31-1.6844.31-1.5725 0-2.5025-.9926-2.5025-2.532 0-1.5404.953-2.6984 2.378-2.6984 1.281 0 2.089.951 2.089 2.388.003.196-.006.371-.038.506zm-1.023-.796c0-.7754-.394-1.323-1.108-1.323-.641 0-1.146.5583-1.221 1.323h2.329zm7.7897 3.1534c-1.468 0-2.4195-1.0962-2.4195-2.5844 0-1.551.972-2.657 2.504-2.657 1.4455 0 2.419 1.044 2.419 2.575 0 1.5702-1.0035 2.6664-2.5034 2.6664zm.0424-4.4252c-.806 0-1.323.7542-1.323 1.809 0 1.0343.527 1.7885 1.313 1.7885.785 0 1.312-.807 1.312-1.81 0-1.023-.517-1.788-1.302-1.788zm8.463 4.3113h-1.114v-2.885c0-.8883-.342-1.3336-1.014-1.3336-.662 0-1.118.569-1.118 1.231v2.988H99.81v-3.588c0-.444-.0123-.92-.042-1.437h.982l.052.776h.032c.297-.537.909-.879 1.5917-.879 1.0524 0 1.745.807 1.745 2.119v3.01m7.305-4.186h-1.2285v2.439c0 .621.216.931.6496.931.196 0 .3637-.021.497-.052l.0307.848c-.217.083-.508.125-.867.125-.881 0-1.405-.486-1.405-1.758V11.95h-.732v-.8374h.732v-.9204l1.095-.3314v1.2508h1.229v.8386m5.9127 4.1868h-1.118v-2.864c0-.8992-.342-1.354-1.013-1.354-.5785 0-1.1154.393-1.1154 1.1888v3.029h-1.1175v-7.33h1.1175v3.018h.021c.3506-.5475.859-.817 1.5097-.817 1.064 0 1.715.8267 1.715 2.14v2.9884m5.705-2.2435h-3.3504c.021.951.65 1.488 1.581 1.488.499 0 .952-.083 1.353-.2375l.175.7755c-.474.207-1.033.31-1.685.31-1.571 0-2.501-.992-2.501-2.532s.952-2.698 2.377-2.698c1.282 0 2.089.9514 2.089 2.3885.0048.196-.006.3718-.037.506zm-1.0237-.796c0-.7755-.392-1.323-1.106-1.323-.6418 0-1.148.5582-1.221 1.323h2.3263z\" fill=\"#FFF\"/></svg>";

},{}],30:[function(require,module,exports){
module.exports = "<svg width=\"192\" height=\"48\" viewBox=\"0 0 192 48\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"191.79\" height=\"48\" rx=\"3\"/><path d=\"M67.35 36V21.993h-2.498l-4.368 10.542-4.347-10.542h-2.5V36h1.744V24.47L60.13 36h.714l4.768-11.53V36h1.743zm10.63 0v-6.972c0-2.457-1.784-3.423-3.926-3.423-1.66 0-2.96.546-4.053 1.68l.74 1.092c.91-.966 1.89-1.407 3.11-1.407 1.47 0 2.56.777 2.56 2.142v1.827c-.82-.95-1.97-1.39-3.36-1.39-1.72 0-3.55 1.07-3.55 3.34 0 2.2 1.83 3.36 3.55 3.36 1.37 0 2.52-.49 3.36-1.41V36h1.58zm-4.367-.882c-1.47 0-2.5-.924-2.5-2.205 0-1.302 1.03-2.226 2.5-2.226 1.113 0 2.184.42 2.793 1.26v1.91c-.61.84-1.68 1.26-2.793 1.26zm11.49 1.134c1.85 0 2.94-.756 3.718-1.764l-1.05-.966c-.67.903-1.53 1.323-2.58 1.323-2.16 0-3.5-1.68-3.5-3.927s1.35-3.906 3.51-3.906c1.05 0 1.91.4 2.59 1.323l1.05-.966c-.77-1.01-1.87-1.77-3.71-1.77-3.02 0-5.06 2.31-5.06 5.31 0 3.02 2.04 5.33 5.06 5.33zM107.5 36l-5.65-14.007h-2.162L94.058 36h1.995l1.24-3.108h6.97l1.24 3.108h1.995zm-3.76-4.662h-5.942l2.982-7.54 2.96 7.54zm10.022 4.914c2.667 0 4.515-2.058 4.515-5.334 0-3.297-1.848-5.313-4.515-5.313-1.428 0-2.688.735-3.423 1.764v-1.52h-1.58v14.01h1.57v-5.4c.82 1.13 2.03 1.78 3.42 1.78zm-.4-1.407c-1.238 0-2.477-.756-3.023-1.638V28.63c.54-.883 1.78-1.618 3.02-1.618 2.04 0 3.25 1.66 3.25 3.906 0 2.247-1.22 3.927-3.26 3.927zm11.912 1.407c2.667 0 4.515-2.058 4.515-5.334 0-3.297-1.85-5.313-4.52-5.313-1.43 0-2.69.735-3.43 1.764v-1.52h-1.58v14.01h1.57v-5.4c.81 1.13 2.03 1.78 3.42 1.78zm-.4-1.407c-1.238 0-2.477-.756-3.023-1.638V28.63c.55-.883 1.79-1.618 3.03-1.618 2.04 0 3.26 1.66 3.26 3.906 0 2.247-1.22 3.927-3.25 3.927zm16.43 1.407c3.78 0 5.167-2.08 5.167-4.116 0-5.23-8.29-3.423-8.29-6.573 0-1.323 1.2-2.226 2.88-2.226 1.54 0 3.01.525 4.06 1.68l1.05-1.28c-1.17-1.24-2.83-1.954-4.97-1.954-2.75 0-4.81 1.575-4.81 3.885 0 4.998 8.3 3.003 8.3 6.615 0 1.07-.8 2.415-3.29 2.415-1.97 0-3.48-.966-4.41-1.995l-1.03 1.323c1.16 1.302 2.94 2.226 5.38 2.226zm9.413 0c.924 0 1.49-.273 1.89-.65l-.462-1.177c-.21.23-.63.42-1.07.42-.694 0-1.03-.546-1.03-1.302v-6.3h2.058v-1.386h-2.057v-2.772h-1.575v2.772h-1.68v1.386h1.68v6.636c0 1.51.76 2.37 2.25 2.37zm7.543 0c3.087 0 5.02-2.394 5.02-5.334 0-2.94-1.933-5.313-5.02-5.313-3.087 0-5.02 2.373-5.02 5.313 0 2.94 1.933 5.334 5.02 5.334zm0-1.407c-2.163 0-3.38-1.848-3.38-3.927 0-2.058 1.217-3.906 3.38-3.906s3.36 1.848 3.36 3.906c0 2.08-1.197 3.927-3.36 3.927zM166.914 36v-7.182c.462-.82 1.785-1.617 2.75-1.617.253 0 .442.03.63.07v-1.62c-1.385 0-2.56.78-3.38 1.85v-1.64h-1.575V36h1.57zm9.433.252c1.66 0 3.024-.546 4.032-1.554l-.76-1.03c-.8.82-1.98 1.282-3.13 1.282-2.19 0-3.53-1.596-3.66-3.507h8.21v-.4c0-3.044-1.81-5.438-4.87-5.438-2.9 0-5 2.373-5 5.313 0 3.17 2.16 5.334 5.16 5.334zm3.15-5.964h-6.657c.084-1.554 1.155-3.38 3.318-3.38 2.31 0 3.318 1.868 3.34 3.38zM58.877 16.135h-1.19l-.65-2.046H54.77l-.62 2.04h-1.158l2.243-6.97h1.385l2.256 6.97zM56.84 13.23l-.59-1.82c-.062-.186-.176-.62-.352-1.312h-.02c-.074.3-.177.734-.333 1.313l-.578 1.82h1.872zm7.646-2.12l-1.903 5.025h-1.086l-1.84-5.024h1.2l.858 2.66c.145.45.268.87.36 1.27h.032c.083-.36.206-.78.36-1.27l.85-2.65h1.17m4.05 5.03l-.084-.58h-.03c-.342.47-.84.69-1.47.69-.898 0-1.54-.63-1.54-1.48 0-1.24 1.075-1.88 2.936-1.88v-.09c0-.66-.36-.99-1.05-.99-.5 0-.93.13-1.31.38l-.23-.73c.46-.29 1.04-.43 1.72-.43 1.31 0 1.97.7 1.97 2.08v1.85c0 .51.02.9.07 1.2h-1.01zm-.157-2.5c-1.24 0-1.86.3-1.86 1.02 0 .53.32.79.764.79.57 0 1.096-.43 1.096-1.02v-.77zm3.574-3.35c-.37 0-.66-.29-.66-.67 0-.38.298-.66.682-.66.382 0 .692.28.68.67 0 .41-.287.68-.702.68zm-.537.83h1.117v5.03h-1.117v-5.03zm3.1-2.3h1.117v7.33h-1.117V8.81zm5.863 7.33l-.085-.58h-.03c-.34.47-.838.7-1.468.7-.9 0-1.54-.63-1.54-1.48 0-1.24 1.074-1.88 2.935-1.88v-.1c0-.66-.35-.99-1.044-.99-.496 0-.93.13-1.312.38l-.228-.74c.465-.29 1.044-.44 1.727-.44 1.312 0 1.976.7 1.976 2.08v1.85c0 .51.03.9.07 1.2h-1zm-.157-2.5c-1.24 0-1.86.3-1.86 1.02 0 .53.32.79.764.79.57 0 1.096-.43 1.096-1.02v-.77zm5.61 2.62c-.713 0-1.24-.3-1.58-.89h-.022l-.06.78h-.95c.03-.4.04-.86.04-1.35v-6h1.12v3.04h.02c.33-.55.87-.83 1.6-.83 1.21 0 2.06 1.04 2.06 2.55 0 1.56-.94 2.7-2.22 2.7zm-.227-4.36c-.642 0-1.23.56-1.23 1.33v.88c0 .69.528 1.26 1.21 1.26.836 0 1.335-.68 1.335-1.76 0-1.01-.51-1.7-1.31-1.7zm4.104-3.08h1.114v7.33H89.71V8.81zm7.19 5.08h-3.35c.022.95.65 1.49 1.58 1.49.498 0 .952-.08 1.355-.24l.174.78c-.48.21-1.04.31-1.69.31-1.58 0-2.51-.99-2.51-2.53 0-1.54.95-2.7 2.38-2.7 1.28 0 2.09.95 2.09 2.39 0 .2-.01.37-.04.51zm-1.022-.79c0-.77-.394-1.32-1.108-1.32-.64 0-1.146.558-1.22 1.32h2.328zm7.79 3.15c-1.47 0-2.42-1.09-2.42-2.58 0-1.55.972-2.66 2.504-2.66 1.445 0 2.42 1.05 2.42 2.58 0 1.57-1.005 2.67-2.505 2.67zm.042-4.42c-.806 0-1.323.76-1.323 1.81 0 1.04.527 1.79 1.312 1.79.78 0 1.31-.8 1.31-1.81 0-1.02-.52-1.79-1.3-1.79zm8.463 4.31h-1.115v-2.89c0-.88-.34-1.33-1.014-1.33-.66 0-1.117.57-1.117 1.23v2.99h-1.115v-3.58c0-.446-.012-.92-.042-1.44h.982l.052.777h.032c.297-.54.91-.88 1.592-.88 1.052 0 1.745.807 1.745 2.12v3.01m7.305-4.187h-1.23v2.44c0 .62.218.93.65.93.197 0 .364-.02.498-.05l.03.843c-.217.08-.508.12-.867.12-.89 0-1.41-.485-1.41-1.76v-2.54h-.73v-.84h.73v-.92l1.09-.33v1.25h1.23v.84m5.91 4.188h-1.12V13.3c0-.9-.35-1.353-1.02-1.353-.58 0-1.12.39-1.12 1.19v3.024H121V8.81h1.117v3.02h.02c.353-.55.86-.82 1.51-.82 1.066 0 1.717.828 1.717 2.14v2.99m5.706-2.244h-3.35c.02.95.65 1.488 1.58 1.488.5 0 .953-.082 1.353-.236l.17.775c-.473.204-1.03.31-1.684.31-1.57 0-2.5-.996-2.5-2.535 0-1.54.95-2.7 2.38-2.7 1.28 0 2.09.953 2.09 2.39 0 .196-.01.372-.04.506zm-1.024-.796c0-.775-.39-1.323-1.104-1.323-.64 0-1.146.558-1.22 1.323h2.327zM25.89 8c-6.97.042-13.35 4.67-15.305 11.72l-.037.14c-2.28 8.478 2.71 17.206 11.17 19.553 8.51 2.363 17.33-2.623 19.69-11.135 2.36-8.513-2.628-17.33-11.14-19.693-1.46-.406-2.935-.593-4.38-.585zm.01.95c1.36-.007 2.74.17 4.12.552 8.01 2.222 12.7 10.513 10.48 18.52-2.22 8.008-10.518 12.698-18.524 10.475-7.956-2.207-12.646-10.415-10.51-18.39l.037-.13c1.84-6.63 7.84-10.987 14.4-11.026zm-.78 4.57c-.02 0-.03.004-.04.01-.588.293 1.23 4.05 1.826 5.463.604 1.41 2.948 6.82 3.42 7.058.47.24.652.11.97-.02.31-.13.875-.56.585-1.09 0-.01-.01-.02-.02-.04-.11-.2-.38-.73-.74-1.41l-.01-.03-.08-.15-.06-.12c-.02-.03-.03-.06-.05-.1-.03-.06-.06-.12-.1-.18 0-.02-.01-.04-.02-.06l-.11-.21-.04-.06c-.82-1.57-1.87-3.49-2.51-4.51-1.08-1.72-2.53-4.55-2.99-4.53zm-1.23 4.548c-.15.012-.28.092-.36.226l-1.8 3.14-1.99 3.456-1.66 2.888c-.12.214-.04.493.17.615l1.18.674c.213.124.49.05.614-.164l2.305-4.013 1.49-2.593 1.65-2.878c.12-.22.05-.5-.17-.62l-1.18-.68c-.08-.05-.17-.07-.25-.06zm-7.67 3.366c-.23 0-.41.183-.41.407v2.65c0 .23.18.41.41.41h2.58l1.99-3.45h-4.57zm9.05 0l-1.98 3.456h5.39c-.39-.773-.91-1.875-1.6-3.456h-1.8zm5.68 0c.47.875.9 1.698 1.21 2.28.21.403.38.723.436.828.064.113.11.23.138.348h2.19c.23 0 .41-.183.41-.408v-2.64c0-.225-.18-.408-.408-.408h-3.97zm1.235 4.942c-.067.004-.13.02-.19.053l-.674.34c-.23.12-.31.41-.16.64l.71 1.12c.15.23.46.3.69.16l.48-.29c.23-.14.32-.45.19-.69l-.56-1.08c-.09-.19-.28-.29-.47-.28zm-14.5 2.484c-.13.004-.23.106-.25.275l-.21 1.77c-.026.247.118.335.324.195l1.52-1.034c.2-.14.19-.357-.02-.48l-1.18-.675c-.07-.03-.14-.05-.2-.05zm16.093.19c-.2-.003-.44.066-.73.23-.177.168-.597.533-.09 1.245.507.713 1.636.746 1.786 1.22 0 0 .26-2.676-.968-2.696z\" fill=\"#FFF\"/></svg>";

},{}],31:[function(require,module,exports){
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"#FFF\" fill-rule=\"evenodd\" d=\"M24 22.5c0 .83-.67 1.5-1.5 1.5h-21C.67 24 0 23.33 0 22.5v-21C0 .67.67 0 1.5 0h21c.83 0 1.5.67 1.5 1.5v21zM16.5 24v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9h3.75z\"/></svg>";

},{}],32:[function(require,module,exports){
module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" data-icon=\"electric\" class=\"iconic iconic-electric iconic-size-sm\" viewBox=\"0 0 16 16\">\n  <g class=\"iconic-metadata\">\n    <title>Electric</title>\n  </g>\n  <g class=\"iconic-container\" data-width=\"10\" data-height=\"16\" transform=\"translate(3)\">\n    <path class=\"iconic-property-fill\" d=\"M6 0l-6 10h4v6l6-10h-4z\" />\n  </g>\n</svg>";

},{}],33:[function(require,module,exports){
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"98\" height=\"73\" viewBox=\"0 0 98 73\"><defs><linearGradient id=\"a\" x1=\"50%\" x2=\"50%\" y1=\"0%\" y2=\"100%\"><stop stop-color=\"#4649E1\" offset=\"0%\"/><stop stop-color=\"#5C8FF9\" offset=\"100%\"/></linearGradient></defs><path fill=\"url(#a)\" fill-rule=\"evenodd\" d=\"M580.083333 125.5v-6.083333C580.083333 102.644917 566.438417 89 549.666667 89c-14.9285 0-27.314167 10.8283333-29.869167 25.026833C509.04825 116.551417 501 126.163083 501 137.666667 501 151.0865 511.9135 162 525.333333 162h54.75c10.061834 0 18.25-8.188167 18.25-18.25s-8.188166-18.25-18.25-18.25zm-37.232742 11.743212l-8.534394-8.534394-2.906197 2.88573 11.440591 11.440591L567.41 118.475731 564.524269 115.59l-21.673678 21.653212z\" transform=\"translate(-501 -89)\"/></svg>";

},{}],34:[function(require,module,exports){
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"195\" height=\"146\" viewBox=\"0 0 195 146\"><defs><linearGradient id=\"a\" x1=\"50%\" x2=\"50%\" y1=\"0%\" y2=\"100%\"><stop stop-color=\"#4649E1\" offset=\"0%\"/><stop stop-color=\"#5C8FF9\" offset=\"100%\"/></linearGradient></defs><path fill=\"url(#a)\" fill-rule=\"evenodd\" d=\"M611.166667 301v-12.166667c0-33.5435-27.289834-60.833333-60.833334-60.833333-29.857 0-54.628333 21.656667-59.738333 50.053667-21.4985 5.049166-37.595 24.2725-37.595 47.279666C453 352.173 474.827 374 501.666667 374h109.5c20.123666 0 36.5-16.376333 36.5-36.5s-16.376334-36.5-36.5-36.5z\" transform=\"translate(-453 -228)\"/></svg>";

},{}],35:[function(require,module,exports){
module.exports = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.858505 5.609985L.8549955.140015c-.1969905-.19501-.515991-.19501-.71350075 0-.19648745.195005-.19648745.515015 0 .70996L5.783005 5.98999.14149475 11.13501c-.19648745.195007-.19648745.5100096 0 .7099607.19750975.1950073.51651025.1950073.71350075 0L6.858505 6.375c.104995-.10498.149995-.244995.14299-.38501.007005-.13501-.037995-.274965-.14299-.380005\" fill-rule=\"evenodd\"/></svg>";

},{}],36:[function(require,module,exports){
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"#FFF\" fill-rule=\"evenodd\" d=\"M24 4.3c-.9.4-1.84.66-2.83.78 1-.6 1.8-1.57 2.16-2.72-.95.56-2 .97-3.12 1.2C19.3 2.6 18.05 2 16.6 2c-2.7 0-4.9 2.2-4.9 4.92 0 .4.03.76.12 1.12-4.1-.2-7.72-2.16-10.15-5.14C1.25 3.63 1 4.47 1 5.38c0 1.7.87 3.2 2.2 4.1-.8-.03-1.57-.25-2.24-.62v.06c0 2.4 1.7 4.38 3.95 4.83-.4.1-.82.17-1.27.17-.32 0-.63-.03-.93-.1.62 1.97 2.43 3.4 4.6 3.43-1.7 1.32-3.82 2.1-6.12 2.1-.4 0-.8 0-1.18-.06 2.18 1.37 4.77 2.2 7.55 2.2 9.05 0 14-7.5 14-14v-.65c.95-.7 1.78-1.56 2.44-2.55z\"/></svg>";

},{}],37:[function(require,module,exports){
/** @jsx React.DOM */
aboutApp = JSON.parse(require('../newtab/manifest.json'));
Raven = require('raven-js');
Raven.config('https://37d1786e89b7423d9309613f33bb56c3@app.getsentry.com/16738', {release: aboutApp.version}).install();

{
  try{ga('send', 'event', 'welcome', 'open');}catch(e){}

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

/* User */
UserActions = require('../actions/User');
UserStore = require('../stores/User');

/* Routing */
Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;
Link = Router.Link;

var AppRoute = React.createClass({displayName: "AppRoute",
    getInitialState: function() {
      return {
        step: "loading"
      }
    },

    onUserChange: function(user) {
      if (!UserStore.isLoading())
        this.setState({step: UserStore.isLogged() ? "done" : "login"});
    },

    componentDidMount: function() {
      this.unsubscribeUser = UserStore.listen(this.onUserChange);
      UserStore.onLoad();
    },

    componentWillUnmount: function() {
      this.unsubscribeUser();
    },

    render: function () {
        switch(this.state.step){
          case "loading":
            return (
              React.createElement("div", {id: "content"}, 
                React.createElement("article", null, 
                  React.createElement("span", {dangerouslySetInnerHTML: {__html:icons.preloader}})
                )
              )
            );
          break;

          default:
            return (
                React.createElement(RouteHandler, null)
            );
          break;
        }
    }
});

var commonComponents = {
  loaded: false,
  load: function() {
    if (this.loaded) return false;
    
    this.loaded = true;
  }
}


/* Base elements */
icons = {
  forward: require("./vector/next.svg"),
  preloader: require("../newtab/images/preloader.svg")
}

var langStrings = require("../modules/languages.js");

langLang = function(k) {
  var str = langStrings["en_US"][k];
  try{str = langStrings[t.getLang()][k];} catch(e) {}
  return str;
}

var eContent = document.getElementById('welcome-content');

var StartRoute = require('./routes/Start'),
    CollectionsRoute = require('./routes/Collections'),
    ContentRoute = require('./routes/Content'),
    ClipperRoute = require('./routes/Clipper'),
    FeaturesRoute = require('./routes/Features'),
    LoginRoute = require('./routes/Login'),

    AfterClipperRoute = require('./routes/AfterClipper');

var routes = (
    React.createElement(Route, {name: "app", path: "/", handler: AppRoute}, 
        React.createElement(Route, {name: "collections", handler: CollectionsRoute}), 
        React.createElement(Route, {name: "content", handler: ContentRoute}), 
        React.createElement(Route, {name: "clipper", handler: ClipperRoute}), 
        React.createElement(Route, {name: "features", handler: FeaturesRoute}), 
        React.createElement(Route, {name: "afterclipper", handler: AfterClipperRoute}), 
        React.createElement(Route, {name: "login", handler: LoginRoute}), 
        React.createElement(DefaultRoute, {name: "start", handler: StartRoute}), 
        React.createElement(NotFoundRoute, {name: "notfound", handler: StartRoute})
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

},{"../actions/User":6,"../app/components/Helpers/Icon.js":7,"../app/config":8,"../modules/api.js":10,"../modules/languages.js":11,"../modules/network.js":12,"../modules/translate":14,"../newtab/images/preloader.svg":15,"../newtab/manifest.json":16,"../stores/User":19,"./routes/AfterClipper":21,"./routes/Clipper":22,"./routes/Collections":23,"./routes/Content":24,"./routes/Features":25,"./routes/Login":26,"./routes/Start":27,"./vector/next.svg":35,"localforage":"localforage","lodash":"lodash","moment":"moment","raven-js":"raven-js","react":"react","react-router":"react-router","reflux":"reflux","string":"string"}]},{},[37]);
