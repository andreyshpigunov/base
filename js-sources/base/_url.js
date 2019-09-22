//
//	_url.js | Vanilla JS
//	Работа с URL
//
//	Copyright © 2018 Andrey Shpigunov. All right reserved.
//


var Base = (function (_base) {
	
	
	function reload()
	// Обновление страницы
	{
		location.reload()
	}
	
	
	function reloadWithHash(hash)
	// Обновление страницы с новым хешем
	{
		redirectTo(location.href.replace(location.hash, '#' + hash));
		reload()
	}
	
	
	function redirectTo(url)
	//	Переход по указанной ссылке
	{
		window.location = url;
		return false
	}
	
	
	function changeURL(url, title)
	// Изменение title и url страницы без перезагрузки
	//	Можно добавить и просто хеш в конце: Base.url.changeURL('#ok')
	{
		if (typeof (history.pushState) != 'undefined') {
			history.pushState(null, title, url)
		}
		else
		{
			location.href = url
		}
	}
	
	
	_base.url = {
		
		reload: reload,
		reloadWithHash: reloadWithHash,
		redirectTo: redirectTo,
		changeURL: changeURL
		
	}
	
	return _base;
	
}(Base || {}));
