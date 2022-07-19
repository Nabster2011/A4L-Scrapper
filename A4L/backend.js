/***************************************************************************/
/** EventPage that runs in background                                      */
/***************************************************************************/

var Act = (function () {

    return {
        on: function(action, callback){
            chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
                if(message.action === action)
                {
                    callback(message, sender, sendResponse)
                }
            });
        }
    };
})();

Act.on("showPageAction", function(message, sender, sendResponse){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        try {
            chrome.pageAction.show(tabs[0].id);
          }
          catch(err) {
            console.log(err.message)
          }
        
    });
});
