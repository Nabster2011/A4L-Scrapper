var Act = (function () {
    
    return {

        // callback is a function with parameters message, sender and sendResponse
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
