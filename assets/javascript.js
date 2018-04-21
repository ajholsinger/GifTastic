var topics = ["Step+Brothers", "Happy+Gilmore", "Talladega+Nights", "The+Hangover", "Superbad", "Moana", "Dumb+and+Dumber", "Wedding+Crashers", "Zoolander", "Knocked+Up"];
var t = this;

var queryURL = "https://api.giphy.com/v1/;gifs/search?q=" + "&api_key=Qx4ETygEaJrjofWZDueP40hBswnofyGz";
var gifs = $(".gifs");

function renderButtons() {
	//This creates buttons based off of items in array
			var movieName = $("#movies-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("movie");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#movies-view").append(a);
        }
      }

renderButtons()

$('#add-movie').on("click", function(event) {
	event.preventDefault();
	var addMovie = $("#movie-input").val().trim();
	topics.push(addMovie);
	renderButtons();
	displayGifs();
})
displayGifs();
//This is where the GIFS get displayed on the screen
function displayGifs() {
$(".movie").on('click', function(event) {
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=Qx4ETygEaJrjofWZDueP40hBswnofyGz";
	console.log(movie);
	console.log(queryURL);
	
	$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
			var results = response.data;
		
		for (var i = 0; i < results.length; i++) {
			var stillGif = results[i].images.original_still.url;
			var movingGif = results[i].images.original.url;
			var rating = results[i].rating;
			var h2 = $("<h2>");
			h2.addClass("rating");
			h2.text("Rating: " + rating);
			$(".gifs").append(h2);
			var img = $("<img>");
			img.attr("state", "still")
			img.attr("animate", movingGif);
			img.attr("still", stillGif);
			img.attr("src", stillGif);
			img.addClass("gif");
			console.log(img);
			$(".gifs").append(img);
			if (i === 9) { 
				break;
			} else {
				continue;
			}
			
			$(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("state");
				var dataAnimate = $(this).attr("src", movingGif);
				var dataStill = $(this).attr("src", stillGif);
				console.log(state);
			if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
      }
    });

		};
    });
});
};