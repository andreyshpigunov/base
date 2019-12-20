//
//	_modal.js | Vanilla JS
//	Модальное окно
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// Использование:
// <a data-modal="my-modal">Модальное окно</a>
//
//	<div id="my-modal" class="modal-content [custom-classes]">
//		<div class="text">
//			<p>Hello modal!</p>
//			<p><a class="button modal-close">Close</a></p>
//		</div>
//	</div>
//
//	<script>
//		var modal = document.getElementById('modal-test');
//		modal.addEventListener('modal:ready', function (event) { ... });
//		modal.addEventListener('modal:open', function (event) { ... });
//		modal.addEventListener('modal:close', function (event) { ... });
//	</script>


var Base = (function (_base) {

//	Инициализируем окна
	var
	modalContents = document.querySelectorAll('.modal-content'),
	modalLevel = 0,
	scrollPosition = 0;

	if(modalContents.length)
	{
		modalContents.forEach(function (e, index) {
			
			var
			html,
			here = document.querySelector('.modal-here'),
			placeholder = document.querySelector('body');
			
			if(here) placeholder = here;
			
			html =
			'<div id="' + e.getAttribute('id') + '" class="modal ' + e.getAttribute('class').replace('modal-content', '') + '">' +
				'<div class="modal-overlay"></div>' +
				'<div class="modal-outer">' +
					'<div class="modal-inner">' +
						'<div class="modal-window">' +
							'<a class="modal-close">×</a>' +
							 e.innerHTML +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			placeholder.insertAdjacentHTML('beforeend', html);
			e.remove();
		})
	}

	
	var modalLinks = document.querySelectorAll('[data-modal]');

	if(modalLinks.length)
	{
		modalLinks.forEach(function (e, index) {
			
			e.addEventListener('click', function (event) {
				event.preventDefault();
				show(e.dataset.modal);
			})
		})
	}
	
	document.addEventListener('click', function (event) {
		
		var modalActive = document.querySelector('.modal.active');
		if(
			modalActive &&
			event.target.matches('.modal.active, .modal.active *') &&
			(
				event.target.classList.contains('modal-close') ||
				event.target.classList.contains('modal-custom-close') ||
				!event.target.matches('.modal-window, .modal-window *')
			)
		){
			event.preventDefault();
			hide(event.target.closest('.modal').getAttribute('id'));
		}
	});
	
	document.addEventListener('keydown', function (event) {
		
		var modalActive = document.querySelector('.modal.active');
		if(modalActive && event.keyCode == 27)
		{
			event.preventDefault();
			hide(event.target.closest('.modal').getAttribute('id'));
		}
	});
	
	
	var
	eventReady = new CustomEvent('modal:ready'),
	eventOpen = new CustomEvent('modal:open'),
	eventClose = new CustomEvent('modal:close');
	
	
	function show(id)
	// Показываем нужное окно
	{
		var
		html = document.documentElement,
		modal = document.getElementById(id);
		
		if(
//			!html.classList.contains('modal-active') && 
			modal
		){
			
			var
			activeModals = document.querySelectorAll('.modal.active'),
			timeout = 0;
			
//			if(activeModals.length)
//			{
//				activeModals.forEach(function (e, index) {
//					hide(e.getAttribute('id'));
//				});
//				timeout = 400;
//			}

			setTimeout(function () {
			
				_closerPosition(id);
				window.addEventListener('resize', cp = function (event) { _closerPosition(id) });
				
				html.classList.add('modal-active');
				html.classList.add(id + '-active');
			
				modal.dispatchEvent(eventReady);
				modalLevel++;
				modal.classList.add('top', 'active', 'level-' + modalLevel);
				setTimeout(function () {
					modal.dispatchEvent(eventOpen);
				}, 400);
				
				if(
					Base.device.iphone ||
					Base.device.ipad
				){
					scrollPosition = window.scrollY;
					document.body.style.position = 'fixed';
					document.body.style.top = '-' + scrollPosition + 'px';
				}
			
			}, timeout)
		}
	}
	
	
	function hide(id)
	// Скрываем нужное окно
	{
		var modal = document.getElementById(id);
		
		window.removeEventListener('resize', cp);
		
		modal.classList.remove('active');
		setTimeout(function () {
			document.documentElement.classList.remove('modal-active');
			document.documentElement.classList.remove(id + '-active');
			modal.classList.remove('top', 'level-' + modalLevel);
			modalLevel--;
			modal.dispatchEvent(eventClose);
		}, 400);
		
		if(
			Base.device.iphone ||
			Base.device.ipad
		){
			document.body.style.position = null;
			document.body.style.top = null;
			window.scrollTo(0, scrollPosition);
		}
	}
	
	function _closerPosition(id)
	// Перемещаем крестик в зависимости от размера окна, чтобы фиксировать его на маленьком экране
	// Простое применение fixed в блок с transform не срабатывает (особенность transform)
	{
		var modal = document.getElementById(id);
					
		if(
			Base.adaptive.small() &&
			modal.querySelector('.modal-window').scrollHeight >= window.innerHeight
		){
			var closer = document.querySelector('#' + id + ' .modal-window .modal-close');
			if(closer) modal.appendChild(closer);
		}
		else
		{
			var closer = document.querySelector('#' + id + ' > .modal-close');
			if(closer) document.querySelector('#' + id + ' .modal-window').appendChild(closer);
		}
	}
	
	_base.modal = {
		show: show,
		hide: hide
	}
	
	return _base;
	
}(Base || {}));
