var topics = ["Sailor Moon", "Naruto", "Legend of Zelda", "Pokemon", "Kingdom Hearts", "Final Fantasy", "Avatar the Last Airbender", "A Silent Voice", "Playstation", "Nintendo", "Cloud Strife", "Sherlock Holmes", "Star Wars", "Spirited Away", "Yoshi", "Persona 5", "Bob's Burgers", "Game of Thrones"];

$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        $("#nerd-button").append("<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
});

function buttonClicked() {
    var userInput = $('#nerd-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#nerd-input').val();

    if (userInput) {
        $("#nerd-button").append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q= " + gifName + " &api_key=dc6zaTOxFJmzC&limit=12",
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('.display').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('.display').append(image);
    }

    $(".movImage").on("click", function() {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    $("add-gif").on('click', function(event){
        event.preventDefault();
        var newNerd = $('#nerdInput').val().trim();
        topics.push(newNerd);
        createButtons();
        return false;
    });

    renderButtons();
}
