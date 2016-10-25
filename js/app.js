(function(){
	"use strict";
	var app = {
		init:function(){
			//this.listeners();
			this.getData();
		},

		listeners: function() {
			//$('#btn').on('click', this.getData.bind(this));
		},

		getData: function() {
			$.ajax("http://192.168.1.40:1337/alice.md")
			.done(this.ajaxDone)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);

			$.ajax("http://192.168.1.40:1337/menu.json")
			.done(this.jsonDone)
			.fail(this.jsonFail)
			.always(this.jsonAlways);
		},

		ajaxDone: function(response) {

			var converter = new showdown.Converter(),
			text = response,
			html = converter.makeHtml(text);

			$('#md').html(html);
		},

		ajaxFail: function() {
			console.log('erreur');
		},

		ajaxAlways: function() {
			console.log('complete');
		},

		jsonDone: function(response) {
			console.log(response.menu);

			for (var i = 0; i < response.menu.length; i++) {
				var generalMenu = response.menu[i];
			if (generalMenu.title === "Alice in wonderland") {
				$('#menu').append('<li>' + '<a href="http://192.168.1.40:1337/alice.md">' + "Alice in wonderland" + '</a>' + '</li>');
			}
			if (generalMenu.title === "Markdown Example")
				$('#menu').append('<li>' + '<a href="http://192.168.1.40:1337/example.md">' + "Markdown Example" + '</a>' + '</li>');
			}
		},

		jsonFail: function() {
			console.log('erreur');
		},

		jsonAlways: function() {
			console.log('complete');
		},
	};


	$(document).ready(function(){
		app.init();
	});
})();