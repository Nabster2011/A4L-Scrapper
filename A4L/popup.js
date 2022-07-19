$(function () {
    chrome.storage.local.get(['a4lCurrentEnv'], function(result) {

        if(result.a4lCurrentEnv === undefined)
        {
            chrome.storage.local.set({a4lCurrentEnv: "Test"});
        }

        $("input[value=" + result.a4lCurrentEnv + "]").prop('checked', true);
    });

    $("input[name=environment]").on("change", function(){

        let val = $(this).val();

        // Store evironment name in the storage
        chrome.storage.local.set({a4lCurrentEnv: val});

        // send message to content script to inform that environment has changed
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "environmentChanged"});
        })
    });
});