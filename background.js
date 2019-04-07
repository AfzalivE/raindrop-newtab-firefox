//Messages listeners
/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
});
*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //if ( /(http(s?))\:\/\//gi.test(tab.url||"") )
    chrome.pageAction.show(tab.id);
  //else
  //  chrome.pageAction.hide(tab.id);
});

chrome.runtime.onInstalled.addListener(function(details){
    switch(details.reason){
        case 'install':
            chrome.tabs.create({url:'https://raindrop.io/other/newtab/welcome/index.html?platform=newtab'});
            break;
    }
});

//Sentry
(function() {
    // Create a new script node
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function() {
        // Cleanup onload handler
        script.onload = null;

        // do stuff with the loaded script!
        Raven.config('https://37d1786e89b7423d9309613f33bb56c3@app.getsentry.com/16738', {
			release: "background.js"
		}).install();
    }

    // Set the `src` to begin transport
    script.src = "https://cdn.ravenjs.com/1.1.19/jquery,native/raven.min.js";

    // Add the script to the DOM
    (document.getElementsByTagName( "head" )[ 0 ]).appendChild( script );
})();