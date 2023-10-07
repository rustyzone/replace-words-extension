// Saves options to chrome.storage
const buildSaveArray = () => {
  const elements = document.querySelectorAll('.keyword-row')
  const saveArray = [];
  // only include if row if not hidden
  elements.forEach(function (element) {
    if(element.style.display === 'none'){
      return;
    }
    const obj = {
      keyword: element.querySelector('.keyword input').value,
      type: element.querySelector('.type select').value,
      replace: element.querySelector('.replace input').value
    };
    saveArray.push(obj);
  });
  saveOptions(saveArray);
};

const saveOptions = (saveArray) => {
  chrome.storage.sync.set({
    keywordsArray: saveArray
  }, function() {
    // Handle the completion of saving options if needed
      var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    keywordsArray: []
  }, function(items) {

    buildOptDisplay(items.keywordsArray);
  });
}

function buildOptDisplay(items){
  if(items.length == 0){
    document.querySelector('.add-keyword').click();
  }
  for (var i = 0; i < items.length; i++) {
    //items[i] ...
    if(typeof items[i] === "object"){
      createRowWithOptions(items[i], i)
    }
  }
}

function createRowWithOptions(obj, int = 0){
  console.log('build row', obj);
  var keywordRow = document.querySelector('.keyword-row').innerHTML;

  //remove first item
  if(typeof document.querySelector('.keyword-row').dataset.id === 'undefined'){
    document.querySelector('.keyword-row').remove();
  }

  var newRow = document.createElement('div');
  newRow.className = 'keyword-row';
  var timestamp = (Date.now()+int)
  newRow.dataset.id = timestamp
  newRow.innerHTML = keywordRow;
  document.querySelector('.keywords-holder').appendChild(newRow);

  var newEle = document.querySelector('.keywords-holder .keyword-row[data-id="'+timestamp+'"]')
  newEle.querySelector('.keyword input').value = obj.keyword;
  newEle.querySelector('.type select').value = obj.type;
  if(obj.type == '1'){
    newEle.querySelector('.replace').style.display='block';
    newEle.querySelector('.replace input').value = obj.replace;
  }else{
    newEle.querySelector('.replace').style.display='none';
  }
  newEle.querySelector('.type select').addEventListener('change', function(e){
    //.....
    console.log(e);
    var element = e.target;
    var parent = element.parentNode.parentNode;
    if(element.value == '1'){
      parent.querySelector('.replace').style.display='block';
    }else{
      parent.querySelector('.replace').style.display='none';
    }
  });
  newEle.querySelector('.remove').addEventListener('click', function(e){
    // if only one element just hide it
    if(document.querySelectorAll('.keyword-row').length == 1){
      document.querySelector('.keyword-row').style.display = 'none';
      return;
    }
    newEle.remove();
  });


}



//add listener to add keyword button
document.querySelector('.add-keyword').addEventListener('click', function(){
  var obj = {};
  obj.keyword = 'example';
  obj.type = '1';
  obj.replace = 'string';
  createRowWithOptions(obj)
});


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', buildSaveArray);
