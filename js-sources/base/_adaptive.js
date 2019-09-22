//
//	_animate.js | Vanilla JS
//	Анимации в зависимости от положения элемента
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// if(Base.adaptive.small){ ... } - 720 и меньше и т. д.


var Base = (function (_base) {

	var breakpoints = {
		xsmall: 420,
		small: 720,
		medium: 1080,
		large: 1440
	}

	function xsmall()
	{
		return window.innerWidth <= breakpoints.xsmall
	}

	function small()
	{
		return window.innerWidth <= breakpoints.small
	}

	function medium()
	{
		return window.innerWidth <= breakpoints.medium
	}

	function large()
	{
		return window.innerWidth <= breakpoints.large
	}

	function xlarge()
	{
		return window.innerWidth > breakpoints.xlarge
	}
	
	_base.adaptive = {
		
		breakpoints: breakpoints,
		xsmall: xsmall,
		small: small,
		medium: medium,
		large: large,
		xlarge: xlarge
		
	}
	
	return _base;
	
}(Base || {}));
