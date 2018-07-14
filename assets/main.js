var topics = ["Sailor Moon", "Naruto", "Legend of Zelda", "Pokemon", "Kingdom Hearts", "Final Fantasy", "Violet Evergarden", "A Silent Voice", "Playstation", "Nintendo", "Cloud Strife", "Sherlock Holmes", "Star Wars", "Clannad After Story", "Yoshi", "Persona 5", "Bob's Burgers", "Game of Thrones"];

var pauseGif;
var animateGif;
var stillGif;
var currentGif;


// Adding click event listen listener to all buttons
$("button").on("click", function() {
// Grabbing and storing the data-animal property value from the button
var nerd = $(this).attr("data-nerd");

// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    nerd + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})
    // After data comes back from the request
    .then(function(response) {
    console.log(queryURL);

    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var nerdDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var nerdImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        nerdImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        nerdDiv.append(p);
        nerdDiv.append(nerdImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(nerdDiv);
    }
    });
});

