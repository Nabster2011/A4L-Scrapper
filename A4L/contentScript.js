chrome.runtime.sendMessage({action: "showPageAction"})

var Environments = {
    Development: "https://localhost:44381",
    Test: "https://test-neptune.aspire4life.com.au",
    Train: "https://train-neptune.aspire4life.com.au",
    Production: "https://neptune.aspire4life.com.au"
};

chrome.storage.local.get(['a4lCurrentEnv'], function (result) {
    if(result.a4lCurrentEnv === undefined)
    {
        result.a4lCurrentEnv = "Test";
    }

    updatePageWhenEnvironmentChanges(result.a4lCurrentEnv);
});

/**************************************************************************************/
/** function to update the server script and the current environment URL in the page                                                     
/**************************************************************************************/
function updatePageWhenEnvironmentChanges(environment) {
    const scriptId = "ExtractorScript";

    // Inject script from the server into the page
    let currentEnvironmentUrl = Environments[environment];

    let script = document.getElementById(scriptId);

    if(script) { script.remove(); }

    script = document.createElement( 'script' );
    script.id = scriptId;
    script.src = currentEnvironmentUrl + "/js/extractor.js";

    document.getElementsByTagName("body")[0].appendChild(script);

    // Inject current environment URL into the page to be accessible by injected script
    let input = $("#CurrentEnvironmentUrl");

    if(!input.length) {
        input = $('<input type="hidden" id="CurrentEnvironmentUrl">');
        $("body").append(input);
    }

    input.val(currentEnvironmentUrl);
    input.prop("name", environment);
}

/**************************************************************************************/
/** Set an handler for the event environmentChanged                                                     
/**************************************************************************************/
Act.on("environmentChanged", function () {
    chrome.storage.local.get(['a4lCurrentEnv'], function (result) {
        updatePageWhenEnvironmentChanges(result.a4lCurrentEnv);
    });
});