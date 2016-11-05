(function(){
	"use strict";
	var app = {
		url: "http://192.168.1.114:3002/",
		json: "menu.json",
		getPath: null,

		init:function(){
			this.getDataMenu();
			var self = this;
			self.listeners();
		},

		listeners: function() {
			$('#menu').on('click', 'a', this.clickBtn);
			$('#check').on('click', this.sendEditionPost);
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
				$('#menu').append('<a class="item active" data-path="'+
					path+'">' + title + '</a>');
			}
		},
		clickBtn: function() {
			this.getPath = $(this).data("path");			$.ajax(app.url + this.getPath)
			.done(app.clickBtnDone)
			.fail(app.failClick);

		},

		clickBtnDone: function(response) {
			var converter = new showdown.Converter();
			var html = converter.makeHtml(response);
			$('#textContent').append(response);
			app.getTitle();
		},

		getTitle: function() {
			$.ajax(this.url + this.json)
			.done(app.titleDone)
			.fail(app.failClick);
		},

		titleDone: function(response) {
			// réafficher le titre de l'article ici pr édition
			$('#textTitle').append(title);
		},

		fail: function() {
			console.log('erreur');
		},

		failClick: function() {
			console.log('erreur click');
		},

		sendEditionPost: function() {
			$.post(
				'http://192.168.1.114:3002/editPost', 
				{
					title: $('#textTitle').val(),
					content: $('#textContent').val()
				},
				function(response) {console.log(response);},
				'text'
				);
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();