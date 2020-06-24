console.log('Starting contentScript');

chrome.runtime.sendMessage({ myBookMark: true }, (response) => {
    console.log(response);
});

console.log('Ending contentScript');
