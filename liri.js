require("dotenv").config();
let Twitter = require("twitter");
let Spotify = require("node-spotify-api");
let request = require("request");
let fs = require("fs");
let keys = require("./keys.js");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
let userInput = process.argv;

//============== User Input Logic =======================

if (userInput[2] === "spotify-this-song"){
    spotifySong();
    } else if (userInput[2] === "my-tweets") {
        myTweets();
    } else if (userInput[2] === "movie-this"){
        movied();
    } else if (userInput[2] === "do-what-it-says"){
        itSays();
    } else {
        console.log("Sorry Charlie. Try again.");
};

//============== Twitter Function =======================

function myTweets(){
var params = {screen_name: 'YunkerGrant'};
console.log("\n========= Tweets of '"+ params.screen_name +"' ======");
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   for(i=0; i <  tweets.length; i++){
    console.log("Tweet #"+[i+1]+":  "+tweets[i].text);
  }    console.log("\n");
};
});
};

//============== Spotify Function =======================

function spotifySong(){
    var songTitle =""; 
    if (userInput[3] === undefined){
        songTitle = "The Sign Ace of Base"
        } else {
            songTitle = userInput[3];
        }; 
    spotify.search({type:'track', query:songTitle, limit:1},
function (err,data){
 
    if(err){
        console.log("Oops.  Something unexpected happened" + err);
        return false;
    }
    console.log("\n====== Spotify: '" + songTitle + "' ==========");
    console.log("Artist(s): "+ data.tracks.items[0].album.artists[0].name);
    console.log("Song: "+data.tracks.items[0].name);
    console.log("Preview URL: "+data.tracks.items[0].preview_url);
    console.log("Album: "+data.tracks.items[0].album.name);
    console.log("\n" );
    })
    }

//============== OMDB Function ==================== 

function movied() {
    var movieTitle =""; 
    if (userInput[3] === undefined){
        movieTitle = "mr+nobody"
        } else {
            movieTitle = userInput[3];
        }; 
	var queryUrl = "http://www.omdbapi.com/?apikey=f94f8000&t=" + movieTitle

	request(queryUrl, function(err, response, body) {
		if (err) {
			return console.log(err);
		} else {
		    console.log("\n========== Movie Info ========");
            console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Values);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);	
            console.log("=================================\n");
		}

	})
}

//============== File System Function =======================

function itSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			var dataArr = data.split(",");
			userInput[3] = dataArr[1];
			spotifySong();
        }
    }
    )};