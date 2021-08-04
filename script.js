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
function replaceWord(obj){
  console.log('replace checks for obj', obj);
  var allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td');
  for (var i = 0; i < allElements.length; i++) {
    if(allElements[i].innerText.toLowerCase().includes(obj.keyword.toLowerCase())){
      if(obj.type == '0'){
        //remove
        allElements[i].innerHTML = allElements[i].innerHTML.replace(obj.keyword, '');
      }else if(obj.type == '1'){
        //replace
        allElements[i].innerHTML = allElements[i].innerHTML.replace(obj.keyword, obj.replace);
      }else if(obj.type == '2'){
        //blur
        allElements[i].style.color='transparent';
        allElements[i].style.textShadow='0 0 8px rgba(0,0,0,0.5)';
      }
    }
  }
}
