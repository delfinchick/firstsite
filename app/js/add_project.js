var myModule = (function(){

//Инициализирует наш модуль
	var init = function(){
		_setUpListeners();
		//то, что должно произойти сразу
		};

//Прослушивает события
	var _setUpListeners=function(){
		$('#add-new-item').on('click', _showModal);//открыть модальное окно
		$('#add-new-project').on('submit',_addProject);//добавление проекта
		};

//Работает с модальным окном
	var _showModal=function(e){
		console.log('Вызов модального окна');
		e.preventDefault();//сброс начальных настроек для ссылки на попап

		var divPopup = $('#new-project-popup'),
			form = divPopup.find('.form');

		divPopup.bPopup({
			speed: 650,
			transition:'slideDown',
			onClose: function(){
				form.find('.server-mes').text('').hide();
			}
		});
	};

//Добавляет проект
	var _addProject = function(e)//в скобках функции передается событие
	{
		console.log('Добавление проекта');
		e.preventDefault();

		//объявляем переменные
		var form = $(this),//представление формы как jquery объекта
			url='add_project.php',//адрес, по которому будет происходить запрос
			myServerGiveMeAnAnswer = _ajaxForm(form,url);

		//запрос на сервер
		myServerGiveMeAnAnswer.done(function(ans)//в скобках укзаны данные, полученные их выходного массива, сформированного в php файле
		 {
			console.log(ans);

			var successBox=form.find('.success-mes'),
				errorBox=form.find('.error-mes');

			if(ans.status ==='OK'){
				console.log(ans.text);
				errorBox.hide();
				successBox.text(ans.text).show();
			}else{
				console.log(ans.text);
				successBox.hide();
				errorBox.text(ans.text).show();
			}
		})
	};

//Универсальная функция
//Для ее работы используются
//@form - форма
//@url - адрест php файла, к которому мы обращаемся
//1. проверить форму
//2. собрать данные из формы
//3. вернуть ответ с сервера
	var _ajaxForm = function(form,url){	

		//if(!valid) return false;

		data = form.serialize();//сбор данных из формы
		
		var result = $.ajax({
			url: url,//адрес, по которому будет происходить запрос
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans){
			console.log('Проблемы в PHP');
			form.find('.error-mes').text('На сервере произошла ошибка').show();
		});

	return result;//Возвращает результат общения с сервером(массив из php файла в данном случае)

	};
//Возвращаем объект(публичные методы)
	return {
		init:init,
	};
})();
myModule.init();