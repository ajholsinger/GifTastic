var topics = ["Step Brothers", "Happy Gilmore", "Talladega Nights", "The Hangover", "Superbad", "Moana", "Dumb and Dumber", "Wedding Crashers", "Zoolander", "Knocked Up"];
var t = this;
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
	$(".gifs").empty()
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
			img.attr("data-state", "still")
			img.attr("data-animate", movingGif);
			img.attr("data-still", stillGif);
			img.attr("src", stillGif);
			img.addClass("gif");
			img.click(toggleGif);
			console.log(img);
			$(".gifs").append(img);
			if (i === 9) { 
				break;
			} else {
				continue;
			}
			
			$(".gifs").empty()
			//FOR LOOP CLOSING
//for loop closing
		};
    });
	function toggleGif() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
				console.log(state);
		
			if (state === "still") {
				$(this).attr("data-state", "animate");
				$(this).attr("src", $(this).attr("data-animate"));
				console.log("Who's a goose");
      } else if (state === "animate") {
				$(this).attr("data-state", "still");
				$(this).attr("src", $(this).attr("data-still"));
      }
	}
});
};
