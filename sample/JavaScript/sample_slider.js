function html5_slider(node){

    var addEvent = document.addEventListener ?
      function(node,type,listener){
        node.addEventListener(type,listener,false);
      } :
      function(node,type,listener){
        node.attachEvent('on'+type, listener);
      }
    var removeEvent = document.removeEventListener ?
      function(node,type,listener){
        node.removeEventListener(type,listener,false);
      } :
      function(node,type,listener){
        node.detachEvent('on'+type, listener);
      }
    
    var dragging = false;
    var slider, button, input;
    var min = 0, max = 100;
    var value = 0;
    function set_value(){
      button.style.left = (value - button.clientWidth/2) +'px';
      input.value = min + value;
    }
    if (!node){
      node = document;
    }
    var inputs = node.getElementsByTagName('input');
    // getElementsByTagNameで取得した要素を走査中に置き換えると
    // 繰り上がりされるので、繰り上がりが起きても良いように、
    // 後ろから走査する
    var n = inputs.length;
    while (n){
      n--;
      var _input = inputs[n];
      var type = _input.getAttribute('type');
      if(type === 'range' && !('step' in _input)){
        init(_input);
      }
    }
    function init(_input){
      var parent = _input.parentNode;
      var _min = parseInt(_input.getAttribute('min'), 10)||0;
      var _max = parseInt(_input.getAttribute('max'), 10)||100;
      value = parseInt(_input.value, 10) - _min || 0;
    
      var outer = document.createElement('div');
      var inner = document.createElement('div');
      var _button = document.createElement('input');
      _button.type = 'button';
      outer.className = 'js-slider';
      outer.style.width = (_max - _min)+ 'px';
      parent.insertBefore(outer, _input);
      outer.appendChild(inner);
      outer.appendChild(_button);
      if(window.ActiveXObject){
        // IEはinputのtypeをhiddenに書き換えることができない
        // 少々強引だが、outerHTMLについて置換を行う
        parent.removeChild(_input);
        _input = document.createElement(
          _input.outerHTML.replace('type=range', 'type=hidden')
        );
        parent.insertBefore(_input, outer.nextSbling || null);
      } else {
        _input.type = 'hidden';
      }
      button = _button;
      input = _input;
      set_value();
      addEvent(outer,'click', function(evt){
        dragging = true;
        min = _min;
        max = _max;
        input = _input;
        button = _button;
        slider = outer;
        mousemove(evt);
      });
      addEvent(_button,'mousedown', function(evt){
        if(!evt){
          evt = window.event;
        }
        dragging = true;
        min = _min;
        max = _max;
        input = _input;
        button = _button;
        slider = outer;
        if (evt.preventDefault){
          evt.preventDefault();
        } else {
          evt.returnValue = false;
        }
        addEvent(document, 'mousemove', mousemove);
      });
    }
    addEvent(document, 'mouseup', function(evt){
      if(dragging){
        dragging = false;
        removeEvent(document, 'mousemove', mousemove);
        input = null;
        button = null;
        slider = null;
      }
    });
    function mousemove(evt){
      if(!evt){
        evt = window.event;
      }
      if(dragging){
        var left = evt.clientX;
        var rect = slider.getBoundingClientRect();
        var width = button.clientWidth / 2;
        // マウス座標とスライダーの位置関係で値を決める
        value = Math.round(left - rect.left - width);
        // スライダーからはみ出したとき
        if (value < 0) {
          value = 0;
        } else if (value > slider.clientWidth) {
          value = slider.clientWidth;
        }
        set_value();
        if (evt.preventDefault){
          evt.preventDefault();
        } else {
          evt.returnValue = false;
        }
      }
    }
    }





  /* ラベルをクリックしたら選択状態に移行してスライダーがトリガーするやつ */

	map.on('click', 'country-label', function() {

		console.log("触りましたね？");

		const elem = document.getElementById('Label-Size-Slider');
		const target = document.getElementById('value');
		
		const rangeValue = function (elem, target) {
			return function(evt){
				const tmp = document.getElementById('Label-Size-Slider').value;
				target.innerHTML = elem.value;
				map.setLayoutProperty('country-label','text-size',+ tmp);
			}
		}
		elem.addEventListener('input', rangeValue(elem, target));
	});

