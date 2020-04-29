//
//	_url.js | Vanilla JS
//	Работа с URL
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


Base.url = (function () {
	
	
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
	
	
	function updateURL(url, title)
	// Изменение title и url страницы без перезагрузки
	//	Можно добавить и просто хеш в конце: Base.url.updateURL('#ok')
	{
		if (typeof (history.pushState) != 'undefined') {
			history.pushState(null, title, url)
		}
		else
		{
			location.href = url
		}
	}
	
	
	function changeURL(title, url)
	{
		updateURL(url, title)
	}
	
	
	return {
		reload: reload,
		reloadWithHash: reloadWithHash,
		redirectTo: redirectTo,
		// новое имя функции
		updateURL: updateURL,
		// сохраняем совместимость
		changeURL: changeURL
		
	}
	
	return _base;
	
}());
