(function(){
	"use strict";
	var app = {

		url: "http://192.168.1.40:1337/",
		json: "menu.json",
		getPath: null,

		init:function(){
			this.getDataMenu();
			var self = this;
			self.listeners();
		},

		listeners: function() {
			$("#menu").on('click', 'button', this.clickBtn);
		},

		getDataMenu: function() {
			$.ajax(this.url + this.json)
			.done(this.menuDone)
			.fail(this.fail);
		},

		menuDone: function(response) {
			for (var i = 0; i < response.menu.length; i++) {
				var path = response.menu[i].path;
				var title = response.menu[i].title;
				$('#menu').append('<li>' + '<button data-path="'+path+'">' + title + '</button>' + '</li>');
			}
		},

		clickBtn: function() {
			this.getPath = $(this).data("path");
			$.ajax(app.url + this.getPath)
			.done(app.clickBtnDone)
			.fail(app.failClick);
		},

		clickBtnDone: function(response) {
			var converter = new showdown.Converter(),
			text = response,
			html = converter.makeHtml(text);
			$('#app').html(html);
		},

		fail: function() {
			console.log('erreur');
		},

		failClick: function() {
			console.log('erreur click');
		}
	};

	$(document).ready(function(){
		app.init();
	});
})();