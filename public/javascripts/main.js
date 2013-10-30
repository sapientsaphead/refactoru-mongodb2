$(function(){

	$(document).on('submit', '#application-form', function(e){
		e.preventDefault();
		var formdata = $('#application-form').serialize();

		$.post('/applicant', formdata, function(data){
			$('#success-message').removeClass('hidden');
			$('.form-control').val('');
		});

		$.get('/applicants', function(data){
			console.log("what's here?", data);
		});
		
	});

	$(document).on('click', '.delete', function(){
		var id = $(this).closest('li').data('id');
		var li = $(this).closest('li');
		// need to post to server so it can remove from database
		$.post('/delete', {'id': id}, function(data){
			// delete the li from dom
			li.remove();
		});
		$.get('/delete', function(message){
			alert('message' + message);
		});
	});
});