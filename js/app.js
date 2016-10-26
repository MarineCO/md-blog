(function(){
	"use strict";
	var app = {
		init:function(){
			this.getDataMenu();
		},

		listeners: function() {
			$(".new0").on('click', this.getDataExample.bind(this));
			$(".new1").on('click', this.getDataAlice.bind(this));
		},

		getDataMenu: function() {
			$.ajax("http://192.168.1.40:1337/menu.json")
			.done(this.menuDone)
			.fail(this.menuFail)
			.always(this.menuAlways);
		},

		getDataAlice: function() {
			$.ajax("http://192.168.1.40:1337/alice.md")
			.done(this.aliceDone)
			.fail(this.aliceFail)
			.always(this.aliceAlways);
		},

		getDataExample: function() {
			$.ajax("http://192.168.1.40:1337/example.md")
			.done(this.exampleDone)
			.fail(this.exampleFail)
			.always(this.exampleAlways);
		},

		menuDone: function(response) {
			console.log(response.menu);

			for (var i = 0; i < response.menu.length; i++) {
				
				var obj = response.menu[i].title;

				$('#menu').append('<li>' + '<button>' + obj + '</button>' + '</li>');
				$('#menu li button').addClass(function(index) {
					return "new" + index;
				});
				app.listeners();
			}
		},

		menuFail: function() {
			console.log('erreur menu');
		},

		menuAlways: function() {
			console.log('complete menu');
		},
		
		aliceDone: function(response) {
			var converter = new showdown.Converter(),
			text = response,
			html = converter.makeHtml(text);

			$('#md').html(html);
		},

		aliceFail: function() {
			console.log('erreur alice');
		},

		aliceAlways: function() {
			console.log('complete alice');
		},

		exampleDone: function(response) {
			var converter = new showdown.Converter(),
			text = response,
			html = converter.makeHtml(text);

			$('#md').html(html);
		},

		exampleFail: function() {
			console.log('erreur example');
		},

		exampleAlways: function() {
			console.log('complete example');
		},

	};


	$(document).ready(function(){
		app.init();
	});
})();

//pr refactorisation avoir une seule requête ajax / 1 adresse http qui change en fonction de la requête demandée