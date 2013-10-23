$(function(){

	$(document).on('submit', '#application-form', function(e){
		e.preventDefault();
		var formdata = $('#application-form').serialize();
		alert("formdata", formdata);

		$.post('/applicant', formdata, function(data){
			$('#success-message').removeClass('hidden');
			$('#application-form').val('');
		})

		$.get('/applicants', function(data){
			console.log(data)
		})
	})

});