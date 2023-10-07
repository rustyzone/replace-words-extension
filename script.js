console.log('***************content script******************')
chrome.storage.sync.get({
  keywordsArray: []
}, function(items) {
  replacePageWords(items.keywordsArray);
});
function replacePageWords(keywordsArray){
  //...
  for (var i = 0; i < keywordsArray.length; i++) {
    replaceWord(keywordsArray[i]);
  }
}
const replaceWord = (obj) => {
  console.log('replace checks for obj', obj);
  const elementsToReplace = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td');

  elementsToReplace.forEach(element => {
    const lowerCaseText = element.innerText.toLowerCase();
    const lowerCaseKeyword = obj.keyword.toLowerCase();

    if (lowerCaseText.includes(lowerCaseKeyword)) {
      switch (obj.type) {
        case '0':
          // Remove
          element.innerHTML = element.innerHTML.replace(new RegExp(obj.keyword, 'gi'), '');
          break;
        case '1':
          // Replace
          element.innerHTML = element.innerHTML.replace(new RegExp(obj.keyword, 'gi'), obj.replace);
          break;
        case '2':
          // Blur
          element.style.color = 'transparent';
          element.style.textShadow = '0 0 8px rgba(0,0,0,0.5)';
          break;
        default:
          break;
      }
    }
  });
};

