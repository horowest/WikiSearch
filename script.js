$(document).ready(function () {
	//enter key event handler
	$("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#btn1").click();
    }
	});
	//search handler
	$('#btn1').on('click', function() {
		//setting the canvas
		document.getElementById('for-data').innerHTML= "";
		$('#for-data').append("<div class='flex-center' style='height: 480px;'><h1 class='r'>Searching..</h1></div>");
		//url
		var searchTerm = document.getElementById('search').value;
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
		//fethching data
		$.ajax( {
			type:"GET",
			url:url,
			async:false,
			dataType:"json",
			success: function(data) {
	  				var n = data[1].length;
	  				$('.flex-center').addClass('animated fadeOut');
	  				document.getElementById('for-data').innerHTML= "";
	  				$('#for-data').append("<div class='data' id='data'><h5 class='hsmall'>Showing results for \" "+searchTerm+" \" (Found " +n+" items)</h5></div>"); 
	  				//loop to display data
	  				for(i = 0; i < n; i++) {
	  					//getting variables ready
		  				var TITLE = data[1][i];
						var LINK = data[3][i];
						var DATA = data[2][i];
						var el = "<div class='info-card'><div class='title'><a href="+LINK+" target='_blank'><h4>"+TITLE+"</h4><h5 id='link'>";
		    			el = el + LINK+ " <i class='fa fa-external-li'></i></h5></a></div>";
		    			el = el + "<div class='desc'><h5 class='h5desc'>"+DATA+"</h5></div></div>";
		        		//setting display data
		        		$('#for-data').append(el);
		        	}
			},
			error: function(errorMessage) {
				//error handler
				$('#for-data').html("<div class='flex-center' style='height: 480px;'><h1 class='r'>Something went wrong! :(</h1></div>");
			}
		});
	});
});