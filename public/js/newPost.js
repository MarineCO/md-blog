(function(){
	"use strict";
	var app = {

		init:function(){
			this.listeners();
		},

		listeners: function() {
			$('#valider').on('click', this.sendCreatePost);
		},

		sendCreatePost: function() {
			console.log('hey');
			$.post(
				'http://192.168.1.114:3002/newPost', 
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