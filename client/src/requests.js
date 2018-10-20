import $ from 'jquery';

const Requests = {
	create: function(term, cb) {
		console.log(`${term} was searched`);
		// TODO
		const postRequest = $.ajax({
		  method: 'POST',
		  url: '/repos',
		  data: {data: term}
		});

		postRequest.done(function(msg) {
		  cb(msg);
		});
		 
		postRequest.fail(function(jqXHR, textStatus, string) {
		  // console.log('jqXHR: ', jqXHR);
		  console.log(`Request failed: ${textStatus}, ${string}`);
		  cb('no msg');
		});
	},

	read: function(cb) {
		$.ajax({
		  method: 'GET',
		  url: '/repos', 
		  dataType: 'json',
		  success: function(data) {
		    cb(data);
		  },
		  error: function(jqXHR, textStatus, string) {
		    console.log('jqXHR: ', jqXHR);
		    alert( `Request failed: ${textStatus}, ${string}`);
		  }
		});
	}
}

export default Requests;