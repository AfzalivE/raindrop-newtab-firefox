window.raindropMiniClipper = {
  parseCurrentPage: function() {
    RainDropPanzer.run(function(item) {
      chrome.runtime.sendMessage({action: "doneParse", item: item||{}});
    });
  }
};
