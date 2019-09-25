//
//	_utils.js | Vanilla JS
//	Утилиты
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


var Base = (function (_base) {
	
	
	function random(a,b)
	//	Произвольное число
	{
		return Math.floor(Math.random() * (b - a + 1)) + a
	}
	
	
	function price(price)
	//	Выводит цену в формате 9 999 999,99
	{
		var p = parseFloat(price);
		return p.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',')
	}
	
	
	function numberFormat(a)
	//	Форматирование чисел
	{
		a += '', x = a.split('.'), x1 = x[0], x2 = x.length > 1 ? '.' + x[1] : '';
		for (var b = /(\d+)(\d{3})/; b.test(x1);)
		x1 = x1.replace(b, '$1 $2');
		return x1 + x2
	}
	
	
	function numberDecline(a, b, c, d)
	//	Склонение числительных
	{
		var e = '';
		if (a > 10 && 1 == parseInt(a % 100 / 10))
			e = b;
		else
			switch(a % 10) {
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
					e = d
			}
		return e
	}
	
	
	function toggleActive(elementSelector, readyClass, activeClass, inactiveClass)
	//	Смена класса активности элемента с классом подготовки
	//	Необходимо, когда перед активностью элемент надо инициализировать, например добавить display: block.
	//	При выключении класс подготовки выключается с задержкой, чтобы эффект успел закончиться.
	{
		var element = document.querySelector(elementSelector);
		
		if(element)
		{
			var
			readyClass = (typeof readyClass !== 'undefined') ? readyClass : 'ready',
			activeClass = (typeof activeClass !== 'undefined') ? activeClass : 'active',
			inactiveClass = (typeof inactiveClass !== 'undefined') ? inactiveClass : 'inactive';
			
			if(element.classList.contains(activeClass))
			{
				element.classList.remove(activeClass);
				element.classList.add(inactiveClass);
				setTimeout(function (){ element.classList.remove(readyClass) }, 200)
			}
			else
			{
				element.classList.add(readyClass);
				setTimeout(function (){
					element.classList.remove(inactiveClass);
					element.classList.add(activeClass)
				}, 50)
			}
		}
	}
	
	
	var loaded = [];
	
	function loadScript(path, callback)
	//	Загружаем скрипт и добавляем его в конец body
	//	Передаем callback, запускаемый после загрузки скрипта
	//	Base.utils.loadScript('/path/to/file.js', function () { Callback function... })
	{
		
		if(loaded.indexOf(path) == -1)
		{
			var script = document.createElement('script');
			script.onload = function () { callback() };
			script.src = path;
			document.body.appendChild(script);
			loaded.push(path);
		}
		else
		{
			callback()
		}
		
	}
	
	
	function isEmail(email)
	//	Проверяем, соответствует ли email правильному формату
	{
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
	
	
	_base.utils = {
		
		random: random,
		price: price,
		numberFormat: numberFormat,
		numberDecline: numberDecline,
		toggleActive: toggleActive,
		loadScript: loadScript,
		isEmail: isEmail
		
	}
	
	return _base;
	
}(Base || {}));