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
			$.ajax("http://192.168.1.21:1337/alice.md")
			.done(this.ajaxDone)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxDone: function(response) {
			console.log(response);
		},

		ajaxFail: function() {
			console.log('erreur');
		},

		ajaxAlways: function() {
			console.log('complete');
		},
	};


	$(document).ready(function(){
		app.init();
	});
})();