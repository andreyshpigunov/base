var Base = (function () {
  'use strict';

  //
  //	_init.js | Vanilla JS
  //	Функции, которые запускаются первыми при загрузке
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  var init = function () {
    var html = document.documentElement; // Статус загрузки страницы в теге html
    // ====================================

    var checkLoading = setInterval(function () {
      if (document.readyState === 'complete') {
        clearInterval(checkLoading);
        html.classList.remove('loading');
        html.classList.add('loaded');
      } else {
        html.classList.add('loading');
      }
    }, 100); // Убираем подчеркивание ссылок с картинками
    // =========================================

    var links = document.querySelectorAll('a:not(.border) > img, a:not(.no-border) > img');

    if (links.length) {
      links.forEach(function (e, index) {
        e.parentElement.classList.add('no-border');
      });
    } // Дублирование hover для одинаковых ссылок
    // ========================================


    var doublehovers = document.querySelectorAll('.sync-hover, .double-hover');

    if (doublehovers.length) {
      doublehovers.forEach(function (e, index) {
        try {
          e.addEventListener('mouseover', function (event) {
            items = document.querySelectorAll('[href="' + e.getAttribute('href') + '"]');

            if (items.length) {
              items.forEach(function (i, index) {
                i.classList.add('hover');
              });
            }
          });
          e.addEventListener('mouseout', function (event) {
            items = document.querySelectorAll('[href="' + e.getAttribute('href') + '"]');

            if (items.length) {
              items.forEach(function (i, index) {
                i.classList.remove('hover');
              });
            }
          });
        } catch (err) {
          console.error(err);
        }
      });
    }

    return null;
  }();

  //
  //	_adaptive.js | Vanilla JS
  //	Адаптивность
  //
  //	Copyright © 2020 Andrey Shpigunov. All right reserved.
  //
  // if(adaptive.small){ ... } - 720 и меньше и т. д.
  var breakpoints = {
    xsmall: 420,
    small: 720,
    medium: 1080,
    large: 1440
  };
  function xsmall() {
    return window.innerWidth <= breakpoints.xsmall;
  }
  function small() {
    return window.innerWidth <= breakpoints.small;
  }
  function medium() {
    return window.innerWidth <= breakpoints.medium;
  }
  function large() {
    return window.innerWidth <= breakpoints.large;
  }
  function xlarge() {
    return window.innerWidth > breakpoints.xlarge;
  }

  var adaptive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    breakpoints: breakpoints,
    xsmall: xsmall,
    small: small,
    medium: medium,
    large: large,
    xlarge: xlarge
  });

  //
  //  _device.js | Vanilla JS
  //  Определение браузера, ОС и устройства
  //
  //  Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  //  Доступно из js, все переменные (при соответствии возвращают true):
  //  Base.device.[ie|firefox|safari|webkit|chrome|opera|windows|macos|linux|ios|mobile|desktop|ipad|ipod|iphone|android|js]
  var device = function () {
    var htmlElement_ = document.documentElement,
        userAgent_ = window.navigator.userAgent.toLowerCase(),
        platform_ = window.navigator.platform.toLowerCase(),
        classes = []; // Сохраняем уже установленные классы тега <html>
    // ----------------------------------------------

    var classAttr = htmlElement_.className;
    if (classAttr !== '') classes = classAttr.split(/\s+/); // Определяем классы для указания браузера
    // ---------------------------------------

    var versionMatch;

    if ((/msie/.test(userAgent_) || /trident/.test(userAgent_)) && !/opera/.test(userAgent_)) {
      classes.push('ie');
      versionMatch = userAgent_.match(/msie ([0-9.]+)/);

      if (versionMatch) {
        var version = parseInt(versionMatch[1], 10);
        classes.push('ie' + version);
        if (version === 7 || version === 8) classes.push('ie7-8');
      }
    } else if (/mozilla/.test(userAgent_) && !/(compatible|webkit)/.test(userAgent_)) {
      classes.push('firefox');
    } else if (/safari/.test(userAgent_) && !/chrome/.test(userAgent_)) {
      classes.push('safari', 'webkit');
      versionMatch = userAgent_.match(/version\/([0-9.]+)/);
      if (versionMatch) classes.push('safari' + parseInt(versionMatch[1], 10));
    } else if (/chrome/.test(userAgent_)) {
      classes.push('chrome', 'webkit');
    } else if (/opera/.test(userAgent_)) {
      classes.push('opera');
    } // Определяем классы для указания ОС
    // ---------------------------------


    if (/win/.test(platform_)) {
      classes.push('windows');
    } else if (/mac/.test(platform_)) {
      classes.push('macos');
    } else if (/linux/.test(platform_)) {
      classes.push('linux');
    } else if (/iphone|ipad|ipod/.test(userAgent_)) {
      classes.push('ios');
    } // Определяем классы для указания типа устройства
    // ----------------------------------------------


    if (/mobile/.test(userAgent_)) {
      classes.push('mobile');
    } else {
      classes.push('desktop');
    } // Определяем классы для указания типа мобильного устройства
    // ---------------------------------------------------------


    if (/ipad/.test(userAgent_)) {
      classes.push('ipad');
    } else if (/ipod/.test(userAgent_)) {
      classes.push('ipod');
    } else if (/iphone/.test(userAgent_)) {
      classes.push('iphone');
    } else if (/android/.test(userAgent_)) {
      classes.push('android');
    } // Добавляем класс поддержки js и убираем no-js (возможно поставленный другими способами)
    // --------------------------------------------------------------------------------------


    classes.push('js');

    for (var i = 0, len = classes.length; i < len; i++) {
      if (classes[i] === 'no-js') {
        classes.splice(i, 1);
        break;
      }
    } // Устанавливаем классы
    // --------------------


    htmlElement_.className = classes.join(' '); // Создаем объект со значениями классов, для использования в js
    // ------------------------------------------------------------

    var classesHash = {};

    for (var _i = 0, _len = classes.length; _i < _len; _i++) {
      classesHash[classes[_i]] = true;
    }

    classesHash.width = window.innerWidth;
    classesHash.height = window.innerHeight;
    return classesHash;
  }();

  //
  //	_blocks.js | Vanilla JS
  // Функции блоков
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // Блоки с автоматической шириной
  // Нужно добавить к группе с блоками класс 'blocks-flex' (или 'inline-blocks-flex' для инлайновых блоков)
  var blocks = function () {
    var blocks = document.querySelectorAll('.blocks.blocks-flex, .inline-blocks.inline-blocks-flex');

    if (blocks.length) {
      blocks.forEach(function (e, index) {
        if (e.children.length) {
          var item = {};
          item.blocks = e;
          item.width = item.blocks.firstElementChild.offsetWidth || 200;
          item.rows = e.getAttribute('data-rows') || 9999;

          _resize(item);

          window.addEventListener('resize', function (event) {
            _resize(item);
          });
          e.removeAttribute('data-rows');
        }
      });
    }

    function _resize(item) {
      var count = Math.floor(item.blocks.clientWidth / item.width);
      var max = count * item.rows;
      var children = item.blocks.children;

      if (children.length) {
        Object.keys(children).forEach(function (i) {
          if (i < max) {
            children[i].style.width = 100 / count + '%';
            children[i].classList.remove('hidden');
          } else {
            children[i].classList.add('hidden');
          }
        });
      }
    }

    return null;
  }();

  //
  //	_animate.js | Vanilla JS
  //	Анимации в зависимости от положения элемента
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  var animate = function () {
    var animations = document.querySelectorAll('[data-animate]');

    if (animations.length) {
      var animationsHash = {};
      animations.forEach(function (e, index) {
        try {
          var json = JSON.parse(e.dataset.animate);

          if (json.hasOwnProperty('Start')) {
            var item = {};

            if (json.hasOwnProperty('TriggerID') && document.getElementById(json.TriggerID)) {
              item.Trigger = document.getElementById(json.TriggerID);
            } else {
              item.Trigger = e;
            }

            item.Element = e;
            item.Start = json.Start;
            item.End = json.End;
            item.Class = json.Class;
            item.ClassRemove = json.ClassRemove;
            item.FunctionName = json.FunctionName;
            animationsHash[index] = item;
          } else {
            Object.keys(json).forEach(function (i) {
              var item = {};

              if (json[i].hasOwnProperty('TriggerID') && document.getElementById(json[i].TriggerID)) {
                item.Trigger = document.getElementById(json[i].TriggerID);
              } else {
                item.Trigger = e;
              }

              item.Element = e;
              item.Start = json[i].Start;
              item.End = json[i].End;
              item.Class = json[i].Class;
              item.ClassRemove = json[i].ClassRemove;
              item.FunctionName = json[i].FunctionName;
              animationsHash[index + i] = item;
            });
          }

          e.removeAttribute('data-animate');
        } catch (err) {
          console.log(err);
        }
      });

      if (Object.keys(animationsHash).length) {
        _scroll(animationsHash);

        document.addEventListener('scroll', function () {
          _scroll(animationsHash);
        });

        if (document.querySelector('.animate-scrollarea')) {
          document.querySelector('.animate-scrollarea').addEventListener('scroll', function () {
            _scroll(animationsHash);
          });
        }
      }
    }

    function _scroll(animationsHash) {
      Object.keys(animationsHash).forEach(function (i) {
        var item = animationsHash[i];
        var offset = item.Trigger.getBoundingClientRect(),
            start,
            end;
        if (item.Start.match(/px/)) start = item.Start.replace('px', '');
        if (item.Start.match(/vh/)) start = _vh2px(item.Start.replace('vh', ''));
        if (item.Start.match(/%/)) start = _vh2px(item.Start.replace('%', ''));
        if (item.End.match(/px/)) end = item.End.replace('px', '');
        if (item.End.match(/vh/)) end = _vh2px(item.End.replace('vh', ''));
        if (item.End.match(/%/)) end = _vh2px(item.End.replace('%', ''));
        item.Duration = start - end;

        if (offset.top <= start && offset.top >= end) {
          if (item.Class != null) {
            item.Element.classList.add(item.Class);
          }

          if (typeof window[item.FunctionName] === "function") {
            item.Progress = (start - offset.top) / item.Duration;
            item.Progress = item.Progress.toFixed(4);
            window[item.FunctionName](item);
          }
        } else {
          if (item.Class != null && item.ClassRemove == true && item.Element.classList.contains(item.Class)) {
            item.Element.classList.remove(item.Class);
          }

          if (typeof window[item.FunctionName] === "function") {
            if (offset.top > start && item.Progress > 0) {
              item.Progress = 0;
              window[item.FunctionName](item);
            }

            if (offset.top < end && item.Progress < 1) {
              item.Progress = 1;
              window[item.FunctionName](item);
            }
          }
        }
      });
    }

    function _vh2px(value) {
      var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
      var result = y * value / 100;
      return result;
    }

    return null;
  }();

  //
  //	_appear.js | Vanilla JS
  //	Появление элемента во viewport
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // Устанавливает класс appeared для элементов, которые появились хоть раз во viewport.
  // И класс visible для элементов, которые находятся во viewport.
  var appear = function () {
    var _classIsAppeared = 'is-appeared',
        _classAppeared = 'appeared',
        _classVisible = 'visible',
        items = document.querySelectorAll('.' + _classIsAppeared);

    if (items.length) {
      var itemsHash = {};
      items.forEach(function (e, index) {
        try {
          var item = {};
          item.Element = e;
          item.ClassAppeared = _classAppeared;
          item.ClassVisible = _classVisible;
          itemsHash[index] = item;

          if (item.Element.classList.contains(_classIsAppeared)) {
            item.Element.classList.remove(_classIsAppeared);
          }
        } catch (err) {
          console.log(err);
        }
      });

      if (Object.keys(itemsHash).length) {
        _scroll(itemsHash);

        document.addEventListener('scroll', function () {
          _scroll(itemsHash);
        });
      }
    }

    function _scroll(itemsHash) {
      Object.keys(itemsHash).forEach(function (i) {
        var item = itemsHash[i];
        var elementOffset = item.Element.getBoundingClientRect();

        if (elementOffset.top < window.innerHeight && elementOffset.bottom > 0) {
          if (item.ClassAppeared != null) {
            item.Element.classList.add(item.ClassAppeared);
          }

          if (item.ClassVisible != null) {
            item.Element.classList.add(item.ClassVisible);
          }
        } else {
          if (item.ClassVisible != null && item.Element.classList.contains(item.ClassVisible)) {
            item.Element.classList.remove(item.ClassVisible);
          }
        }
      });
    }

    return null;
  }();

  //

  var modal = function () {
    // Инициализируем окна
    var modalContents = document.querySelectorAll('.modal-content');
    var modalLevel = 0;
    var scrollPosition = 0;
    var cp;

    if (modalContents.length) {
      modalContents.forEach(function (e, index) {
        var html;
        var here = document.querySelector('.modal-here');
        var placeholder = document.querySelector('body');
        if (here) placeholder = here;
        html = '<div id="' + e.getAttribute('id') + '" class="modal ' + e.getAttribute('class').replace('modal-content', '') + '">' + '<div class="modal-overlay"></div>' + '<div class="modal-outer">' + '<div class="modal-inner">' + '<div class="modal-window">' + '<a class="modal-close"></a>' + e.innerHTML + '</div>' + '</div>' + '</div>' + '</div>';
        placeholder.insertAdjacentHTML('beforeend', html);
        e.remove();
      });
    }

    var modalLinks = document.querySelectorAll('[data-modal]');

    if (modalLinks.length) {
      modalLinks.forEach(function (e, index) {
        e.addEventListener('click', function (event) {
          event.preventDefault();
          show(e.dataset.modal);
        });
      });
    }

    document.addEventListener('click', function (event) {
      var modalActive = document.querySelector('.modal.active');

      if (modalActive && event.target.matches('.modal.active, .modal.active *') && (event.target.classList.contains('modal-close') || event.target.classList.contains('modal-custom-close') || !event.target.matches('.modal-window, .modal-window *'))) {
        event.preventDefault();
        hide(event.target.closest('.modal').getAttribute('id'));
      }
    });
    document.addEventListener('keydown', function (event) {
      var modalsActive = document.querySelectorAll('.modal.active');
      var modalActive = modalsActive[modalsActive.length - 1];

      if (modalActive && event.keyCode == 27) {
        /* Esc */
        event.preventDefault();
        hide(modalActive.getAttribute('id'));
      }
    });
    var eventReady = new CustomEvent('modal:ready');
    var eventOpen = new CustomEvent('modal:open');
    var eventClose = new CustomEvent('modal:close'); // Показываем нужное окно

    function show(id) {
      var html = document.documentElement;
      var modal = document.getElementById(id);

      if ( //		!html.classList.contains('modal-active') && 
      modal) {
        var activeModals = document.querySelectorAll('.modal.active');
        var timeout = 0; //		if (activeModals.length) {
        //			activeModals.forEach(function (e, index) {
        //				hide(e.getAttribute('id'));
        //			});
        //			timeout = 400;
        //		}

        setTimeout(function () {
          _closerPosition(id);

          window.addEventListener('resize', cp = function cp(event) {
            _closerPosition(id);
          });
          html.classList.add('modal-active');
          html.classList.add(id + '-active');
          modal.dispatchEvent(eventReady);
          modalLevel++;
          modal.classList.add('top', 'active', 'level-' + modalLevel);
          setTimeout(function () {
            modal.dispatchEvent(eventOpen);
          }, 400);

          if (device.iphone || device.ipad || device.android) {
            scrollPosition = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = '-' + scrollPosition + 'px';
          }
        }, timeout);
      }
    } // Скрываем нужное окно


    function hide(id) {
      var modal = document.getElementById(id);
      window.removeEventListener('resize', cp);
      modal.classList.remove('active');
      setTimeout(function () {
        document.documentElement.classList.remove(id + '-active');
        modal.classList.remove('top', 'level-' + modalLevel);
        modalLevel--;
        if (modalLevel == 0) document.documentElement.classList.remove('modal-active');
        modal.dispatchEvent(eventClose);
      }, 400);

      if (device.iphone || device.ipad || device.android) {
        document.body.style.position = null;
        document.body.style.top = null;
        window.scrollTo(0, scrollPosition);
      }
    } // Перемещаем крестик в зависимости от размера окна, чтобы фиксировать его на маленьком экране
    // Простое применение fixed в блок с transform не срабатывает (особенность transform)


    function _closerPosition(id) {
      var modal = document.getElementById(id);
      var closer;

      if (small() && modal.querySelector('.modal-window').scrollHeight >= window.innerHeight) {
        closer = document.querySelector('#' + id + ' .modal-window .modal-close');
        if (closer) modal.appendChild(closer);
      } else {
        closer = document.querySelector('#' + id + ' > .modal-close');
        if (closer) document.querySelector('#' + id + ' .modal-window').appendChild(closer);
      }
    }

    return {
      show: show,
      hide: hide
    };
  }();

  //
  //	_lazyload.js | Vanilla JS
  //	Загрузка изображений при их появлении в viewport
  //  Полноценно работает только в современных браузерах.
  //  Если IntersectionObserver не поддерживается, срабатывает фоллбэк.
  //	
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  var lazyload = function () {
    if (!('IntersectionObserver' in window)) {
      var images = document.querySelectorAll('.lazyload');
      images.forEach(function (img) {
        var srcset = img.dataset.srcset;
        var src = img.dataset.src;

        if (srcset) {
          img.srcset = srcset;
        }

        if (src) {
          img.src = src;
        }

        if (srcset || src) {
          img.className += ' loaded';
        }

        img.className += ' loaded';
      });
    } else {
      var _images = document.querySelectorAll('.lazyload');

      var options = {
        root: null,
        rootMargin: '25% 0px',
        threshold: 0.1
      };

      var fetchImage = function fetchImage(src, srcset) {
        return new Promise(function (resolve, reject) {
          var image = new Image();

          if (srcset) {
            image.srcset = srcset;
          }

          if (src) {
            image.src = src;
          }

          image.onload = resolve;
          image.onerror = reject;
        });
      };

      var loadImage = function loadImage(img) {
        var srcset = img.dataset.srcset;
        var src = img.dataset.src;
        fetchImage(src, srcset).then(function () {
          if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
          }

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }

          if (srcset || src) {
            img.className += ' loaded';
          }
        });
      };

      var handleIntersection = function handleIntersection(entries, observer) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      };

      var observer = new IntersectionObserver(handleIntersection, options);

      _images.forEach(function (img) {
        observer.observe(img);
      });
    }

    return null;
  }();

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
  var loadmore = function () {
    var blocks = document.querySelectorAll('[data-loadmore]');
    var _offset = 0;

    if (blocks.length) {
      var blocksHash = {};
      blocks.forEach(function (e, index) {
        try {
          if (_isValidJSON(e.dataset.loadmore)) {
            var json = JSON.parse(e.dataset.loadmore);

            if (json.hasOwnProperty('FunctionName')) {
              var _item = {};
              _item.Block = e;
              _item.Offset = json.Offset || _offset;
              _item.FunctionName = json.FunctionName;
            } else {
              console.log('FunctionName required in JSON ' + json);
            }
          } else {
            console.log('Invalid JSON in data-loadmore');
          }

          if (item) {
            blocksHash[index] = item;
            e.removeAttribute('data-loadmore');
          }
        } catch (err) {
          console.error(err);
        }
      });

      if (Object.keys(blocksHash).length) {
        _scrollObserve(blocksHash);

        document.addEventListener('scroll', function () {
          _scrollObserve(blocksHash);
        });
      }
    }

    function _scrollObserve(blocksHash) {
      Object.keys(blocksHash).forEach(function (i) {
        var item = blocksHash[i];
        var functionName = item.FunctionName;
        var scrollPosition = parseInt(window.scrollY + document.documentElement.clientHeight);
        var scrollTarget = parseInt(item.Block.offsetTop + item.Block.clientHeight - item.Offset);

        if (scrollPosition >= scrollTarget) {
          if (watch) {
            if (typeof window[item.FunctionName] === "function") {
              window[item.FunctionName](page);
              page++;
            }

            watch = false;
          }
        } else {
          watch = true;
        }
      });
    }

    function _isValidJSON(str) {
      try {
        JSON.parse(str);
      } catch (err) {
        return false;
      }
    }

    return null;
  }();

  //
  //	_scrollto.js | Vanilla JS
  //	Прокрутка страницы
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // Base.scrollTo()
  // Прокручивает страницу до элемента с указанным ID.
  // Автоматически применяется к элементам с data-scroll.
  // При необходимости можно вызывать вручную.
  // Пример:
  // <div id="top">...</div>
  // <a data-scrollto="top">Наверх</a>
  // или с настройками
  // <a data-scrollto='{"Target": "top", "Speed": "1000", "Offset": "100", "ClassActive": "active"}'>Наверх</a>
  var scroll = function () {
    // Направление скролла
    // -------------------
    var html = document.documentElement;
    var lastScrollPosition = 0,
        newScrollPosition,
        maxScrollPosition;

    window.onscroll = function () {
      newScrollPosition = window.scrollY;
      maxScrollPosition = document.body.scrollHeight - document.documentElement.clientHeight;

      if (newScrollPosition < lastScrollPosition) {
        if (newScrollPosition < maxScrollPosition) {
          html.classList.remove('scroll-down');
          html.classList.add('scroll-up');
        }
      } else {
        if (newScrollPosition > 0) {
          html.classList.remove('scroll-up');
          html.classList.add('scroll-down');
        }
      }

      lastScrollPosition = newScrollPosition;
    }; // Прокрутка страницы
    // ------------------


    var links = document.querySelectorAll('[data-scrollto]'),
        _speed = 500,
        _offset = 0,
        _classActive = 'active';

    if (links.length) {
      var linksHash = {};
      links.forEach(function (e, index) {
        try {
          if (_isValidJSON(e.dataset.scrollto)) {
            var json = JSON.parse(e.dataset.scrollto);

            if (json.hasOwnProperty('Target') && document.getElementById(json.Target)) {
              var item = {};
              item.Link = e;
              item.Target = document.getElementById(json.Target);
              item.Speed = json.Speed || _speed;
              item.Offset = json.Offset || _offset;
              item.ClassActive = json.ClassActive || _classActive; //					item.Callback = json.Callback ? json.Callback : function () { return false };
            } else {
              console.log('Target required in JSON ' + json + ' or element not exist.');
            }
          } else {
            if (document.getElementById(e.dataset.scrollto)) {
              var item = {};
              item.Link = e;
              item.Target = document.getElementById(e.dataset.scrollto);
              item.Speed = _speed;
              item.Offset = _offset;
              item.ClassActive = _classActive;
            } else {
              console.log('Target \'' + e.dataset.scrollto + '\' not exist.');
            }
          }

          if (item) {
            linksHash[index] = item;
            e.removeAttribute('data-scrollto');
            e.addEventListener('click', function (event) {
              event.preventDefault();
              scrollTo(item.Target, item.Offset, item.Speed);
            });
          }
        } catch (err) {
          console.error(err);
        }
      });

      if (Object.keys(linksHash).length) {
        _scrollObserve(linksHash);

        document.addEventListener('scroll', function () {
          _scrollObserve(linksHash);
        });
      }
    }

    function scrollTo(target, offset, speed) {
      var speed = speed || _speed,
          offset = offset || _offset,
          startingY = window.pageYOffset,
          elementY = window.pageYOffset + target.getBoundingClientRect().top,
          targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY,
          diff = targetY - startingY;

      var easeInOutCubic = function easeInOutCubic(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      var start;
      if (!diff) return;
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start; // Процент выполнения (0..1)

        var percent = speed > 0 ? Math.min(time / speed, 1) : 1;
        percent = easeInOutCubic(percent);
        window.scrollTo(0, startingY + (diff - offset) * percent);

        if (time < speed) {
          window.requestAnimationFrame(step);
        }
      });
    }

    function _scrollObserve(linksHash) {
      Object.keys(linksHash).forEach(function (i) {
        var item = linksHash[i],
            targetOffset = item.Target.getBoundingClientRect(),
            speed = item.Speed,
            offset = item.Offset;

        if (targetOffset.top <= offset + 5 && targetOffset.bottom > offset + 5) {
          if (item.ClassActive != null) {
            item.Link.classList.add(item.ClassActive);
          }
        } else {
          if (item.ClassActive != null && item.Link.classList.contains(item.ClassActive)) {
            item.Link.classList.remove(item.ClassActive);
          }
        }
      });
    }

    function _isValidJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (err) {
        return false;
      }
    }

    return {
      scrollTo: scrollTo
    };
  }();

  //
  //	_url.js | Vanilla JS
  //	Работа с URL
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // Обновление страницы
  function reload() {
    location.reload();
  } // Обновление страницы с новым хешем

  function reloadWithHash(hash) {
    redirectTo(location.href.replace(location.hash, '#' + hash));
    reload();
  } // Переход по указанной ссылке

  function redirectTo(url) {
    window.location = url;
    return false;
  } // Изменение title и url страницы без перезагрузки
  // Можно добавить и просто хеш в конце: Base.url.updateURL('#ok')

  function updateURL(url, title) {
    if (typeof history.pushState != 'undefined') {
      history.pushState(null, title, url);
    } else {
      location.href = url;
    }
  }
  function changeURL(title, url) {
    updateURL(url, title);
  }

  var url = /*#__PURE__*/Object.freeze({
    __proto__: null,
    reload: reload,
    reloadWithHash: reloadWithHash,
    redirectTo: redirectTo,
    updateURL: updateURL,
    changeURL: changeURL
  });

  //
  //	_utils.js | Vanilla JS
  //	Утилиты
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // Произвольное число
  function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  } // Выводит цену в формате 9 999 999,99

  function price(price) {
    var p = parseFloat(price);
    return p.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',');
  } // Форматирование чисел

  function numberFormat(a) {
    a += '', x = a.split('.'), x1 = x[0], x2 = x.length > 1 ? '.' + x[1] : '';

    for (var b = /(\d+)(\d{3})/; b.test(x1);) {
      x1 = x1.replace(b, '$1 $2');
    }

    return x1 + x2;
  } // Склонение числительных

  function numberDecline(a, b, c, d) {
    var e = '';

    if (a > 10 && 1 == parseInt(a % 100 / 10)) {
      e = b;
    } else {
      switch (a % 10) {
        case 1:
          e = b;
          break;

        case 2:
        case 3:
        case 4:
          e = c;
          break;

        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
          e = d;
      }
    }

    return e;
  } // Смена класса активности элемента с классом подготовки
  // Необходимо, когда перед активностью элемент надо инициализировать, например добавить display: block.
  // При выключении класс подготовки выключается с задержкой, чтобы эффект успел закончиться.

  function toggleActive(elementSelector, readyClass, activeClass, inactiveClass) {
    var element = document.querySelector(elementSelector);

    if (element) {
      var readyClass = typeof readyClass !== 'undefined' ? readyClass : 'ready',
          activeClass = typeof activeClass !== 'undefined' ? activeClass : 'active',
          inactiveClass = typeof inactiveClass !== 'undefined' ? inactiveClass : 'inactive';

      if (element.classList.contains(activeClass)) {
        element.classList.remove(activeClass);
        element.classList.add(inactiveClass);
        setTimeout(function () {
          element.classList.remove(readyClass);
        }, 200);
      } else {
        element.classList.add(readyClass);
        setTimeout(function () {
          element.classList.remove(inactiveClass);
          element.classList.add(activeClass);
        }, 50);
      }
    }
  }
  var loaded = []; // Загружаем скрипт и добавляем его в конец body
  // Передаем callback, запускаемый после загрузки скрипта
  // Base.utils.loadScript('/path/to/file.js', function () { Callback function... })

  function loadScript(path, callback) {
    if (loaded.indexOf(path) == -1) {
      var script = document.createElement('script');

      script.onload = function () {
        callback();
      };

      script.src = path;
      document.body.appendChild(script);
      loaded.push(path);
    } else {
      callback();
    }
  } // Проверяем, соответствует ли email правильному формату

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    random: random,
    price: price,
    numberFormat: numberFormat,
    numberDecline: numberDecline,
    toggleActive: toggleActive,
    loadScript: loadScript,
    isEmail: isEmail
  });

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**!
   * ajax - v3.0.4
   * Ajax module in Vanilla JS
   * https://github.com/fdaciuk/ajax

   * Thu Oct 25 2018 15:30:50 GMT-0300 (-03)
   * MIT (c) Fernando Daciuk
  */
  function ajax(options) {
    var methods = ['get', 'post', 'put', 'delete'];
    options = options || {};
    options.baseUrl = options.baseUrl || '';

    if (options.method && options.url) {
      return xhrConnection(options.method, options.baseUrl + options.url, maybeData(options.data), options);
    }

    return methods.reduce(function (acc, method) {
      acc[method] = function (url, data) {
        return xhrConnection(method, options.baseUrl + url, maybeData(data), options);
      };

      return acc;
    }, {});
  }

  function maybeData(data) {
    return data || null;
  }

  function xhrConnection(type, url, data, options) {
    var returnMethods = ['then', 'catch', 'always'];
    var promiseMethods = returnMethods.reduce(function (promise, method) {
      promise[method] = function (callback) {
        promise[method] = callback;
        return promise;
      };

      return promise;
    }, {});
    var xhr = new XMLHttpRequest();
    var featuredUrl = getUrlWithData(url, data, type);
    xhr.open(type, featuredUrl, true);
    xhr.withCredentials = options.hasOwnProperty('withCredentials');
    setHeaders(xhr, options.headers, data);
    xhr.addEventListener('readystatechange', ready(promiseMethods, xhr), false);
    xhr.send(isObject(data) ? JSON.stringify(data) : data);

    promiseMethods.abort = function () {
      return xhr.abort();
    };

    return promiseMethods;
  }

  function getUrlWithData(url, data, type) {
    if (type.toLowerCase() !== 'get' || !data) {
      return url;
    }

    var dataAsQueryString = objectToQueryString(data);
    var queryStringSeparator = url.indexOf('?') > -1 ? '&' : '?';
    return url + queryStringSeparator + dataAsQueryString;
  }

  function setHeaders(xhr, headers, data) {
    headers = headers || {};

    if (!hasContentType(headers)) {
      headers['Content-Type'] = isObject(data) ? 'application/json' : 'application/x-www-form-urlencoded';
    }

    Object.keys(headers).forEach(function (name) {
      headers[name] && xhr.setRequestHeader(name, headers[name]);
    });
  }

  function hasContentType(headers) {
    return Object.keys(headers).some(function (name) {
      return name.toLowerCase() === 'content-type';
    });
  }

  function ready(promiseMethods, xhr) {
    return function handleReady() {
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', handleReady, false);
        promiseMethods.always.apply(promiseMethods, parseResponse(xhr));

        if (xhr.status >= 200 && xhr.status < 300) {
          promiseMethods.then.apply(promiseMethods, parseResponse(xhr));
        } else {
          promiseMethods["catch"].apply(promiseMethods, parseResponse(xhr));
        }
      }
    };
  }

  function parseResponse(xhr) {
    var result;

    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      result = xhr.responseText;
    }

    return [result, xhr];
  }

  function objectToQueryString(data) {
    return isObject(data) ? getQueryString(data) : data;
  }

  function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  }

  function getQueryString(obj, prefix) {
    return Object.keys(obj).map(function (key) {
      if (obj.hasOwnProperty(key) && undefined !== obj[key]) {
        var val = obj[key];
        key = prefix ? prefix + '[' + key + ']' : key;
        return val !== null && _typeof(val) === 'object' ? getQueryString(val, key) : encode(key) + '=' + encode(val);
      }
    }).filter(Boolean).join('&');
  }

  function encode(value) {
    return encodeURIComponent(value);
  }

  //
  //	_polyfills.js
  //	Полифиллы для старых версий IE
  //
  //	Copyright © 2019 Andrey Shpigunov. All right reserved.
  //
  // CustomEvent для IE 9-11
  var polyfills = function () {
    try {
      new CustomEvent("IE has CustomEvent, but doesn't support constructor");
    } catch (e) {
      window.CustomEvent = function (event, params) {
        var evt,
            params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      CustomEvent.prototype = Object.create(window.Event.prototype);
    }
  }();

  //

  var Base = function () {
    return {
      version: '1.0.0',
      adaptive: adaptive,
      device: device,
      modal: modal,
      scrollTo: scroll.scrollTo,
      url: url,
      utils: utils,
      ajax: ajax
    };
  }();

  return Base;

}());
