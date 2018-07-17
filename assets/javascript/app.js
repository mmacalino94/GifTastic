var topics = ["Sailor Moon", "Naruto", "Legend of Zelda", "Pokemon", "Kingdom Hearts", "Final Fantasy", "Avatar the Last Airbender", "A Silent Voice", "Playstation", "Nintendo", "Cloud Strife", "Sherlock Holmes", "Star Wars", "Spirited Away", "Yoshi", "Persona 5", "Bobs Burgers", "Game of Thrones"];

var currentGif;
var animateGif;
var stillGif;
var pauseGif;

function renderButtons(){
	$('#nerd-button').empty();
	for(var i = 0; i < topics.length; i++){
		var nerdBtn = $('<button>').text(topics[i]).addClass('nerdBtn').attr({'data-name': topics[i]});
		$('#nerd-button').append(nerdBtn);
	}

	$('.nerdBtn').on('click', function(){
		$('.display').empty();

        var thisShow = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + thisShow + "&limit=12&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animateGif= value.images.original.url;
				pauseGif = value.images.original_still.url;
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				
				stillGif= $('<img>').attr('data-animate', animateGif).attr('data-pause', pauseGif).attr('src', pauseGif).addClass('playOnHover');
				
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animate'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('pause'));
 });

$('#addGif').on('click', function(){
	var newGif = $('#nerdInput').val().trim();
	topics.push(newGif);
	createButtons();
	return false;
});

renderButtons();
