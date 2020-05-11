//
//	_loadmore.js | Vanilla JS
//	Появление элемента снизу
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// При появлении конца блока внизу страницы, позволяет выполнить функцию, загружающую данные.
// <div data-loadmore='{"FunctionName": "loadMore", "Offset": "100"}'>...</div>
// В функцию при каждом ее запуске передается инкрементный параметр page:
// loadMore(page) {...}


const loadmore = function () {

  let blocks = document.querySelectorAll('[data-loadmore]');
  let _offset = 0;
  
  if (blocks.length) {
    let page = 1;
    let watch = true;
    let blocksHash = {};
    
    blocks.forEach(function(e, index) {
      try {
        if (_isValidJSON(e.dataset.loadmore)) {
          let json = JSON.parse(e.dataset.loadmore);
          
          if (json.hasOwnProperty('FunctionName')) {
            let item = {};
            item.Block = e;
            item.Offset = json.Offset || _offset;
            item.FunctionName = json.FunctionName;
          } else {
            console.log('FunctionName required in JSON ' + json)
          }
        } else {
          console.log('Invalid JSON in data-loadmore')
        }
        
        if (item) {
          blocksHash[index] = item;
          e.removeAttribute('data-loadmore');
        }
      } catch (err) {
        console.error(err)
      }
    });
    
    if (Object.keys(blocksHash).length) {
      _scrollObserve(blocksHash);
      document.addEventListener('scroll', function() {
        _scrollObserve(blocksHash);
      })
    }
  }
  
  function _scrollObserve(blocksHash) {
    Object.keys(blocksHash).forEach(function(i) {
      let item = blocksHash[i];
      let functionName = item.FunctionName;
      let scrollPosition = parseInt(window.scrollY + document.documentElement.clientHeight);
      let scrollTarget = parseInt(item.Block.offsetTop + item.Block.clientHeight - item.Offset);
      
      if (scrollPosition >= scrollTarget) {
        if (watch) {
          if (typeof window[item.FunctionName] === "function") {
            window[item.FunctionName](page);
            page++;
          }
          watch = false
        }
      } else {
        watch = true
      }
    })
  }
  
  function _isValidJSON(str) {
    try {
      JSON.parse(str)
    } catch (err) {
      return false
    }
  }
  
  return null;

}();


export default loadmore;

