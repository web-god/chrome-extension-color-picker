// let color="teal";
let msg="i am your service worker"

chrome.runtime.onInstalled.addListener(()=>{
    // chrome.storage.sync.set({color});
    chrome.storage.sync.set({msg});
})