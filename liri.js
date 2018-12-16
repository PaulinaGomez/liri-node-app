require("dotenv").config();
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys");
var userCommand = process.argv[2];
var divider = "\n---------------------------------------------------------------\n";



if (userCommand === "concert-this") {
    var artist = process.argv[3];
    console.log("I'am searching for "+ artist + "next's gig's");
    function bandsInTownThis() {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios
            .get(URL)
            .then(function (response) {
                var jsonData = response.data;
                var showData1 = [
                    "Name of the venue: " + jsonData[0].venue.name,
                    "Venue location: " + jsonData[0].venue.city,
                    "Date of the Event: " + jsonData[0].datetime,
                    divider
                ].join("\n\n");
                console.log(showData1);

            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    bandsInTownThis();
};

if (userCommand === "spotify-this-song") {
    var songName = process.argv.slice(3).join(" ");
    if (!songName) {
        songName = "The Sign";
    };
    function spotifyThis() {
        spotify = new Spotify(keys.spotify);
          spotify.search({ type: 'track', query: songName }, 
        function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            data.tracks.items.forEach((song) => {
              console.log("Artist(s):" + song.artists[0].name);
              console.log("Song: " + song.name);
              console.log("Preview link:" + song.preview_url);
              console.log("Album: " + song.album.name + "\n");
           })
            //console.log (data.tracks.items);
          });
    };
    spotifyThis();
};

if (userCommand === "movie-this") {
    var movieTitle = process.argv.slice(3).join(" ");
    if (!movieTitle) {
        movieTitle = "Mr. Nobody";
    }
    function movieThis() {
        var URL = "https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
        axios
            .get(URL)
            .then(function (response) {
                var jsonData = response.data;
                var showData3 = [
                    "Title: " + jsonData.Title,
                    "Year: " + jsonData.Year,
                    "IMDB Rating: " + jsonData.Ratings[0].Value,
                    "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                    "Country: " + jsonData.Country,
                    "Language: " + jsonData.Language,
                    "Plot: " + jsonData.Plot,
                    "Actors: " + jsonData.Actors,
                    divider
                ].join("\n\n");
                console.log(showData3);

            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    movieThis();
};

if (userCommand === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        console.log(data);
        var newData = data.split(",");
        spotifySongTxt = newData[1];
        console.log(newData);

        spotify = new Spotify(keys.spotify);
          spotify.search({ type: 'track', query: spotifySongTxt }, 
          function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          data.tracks.items.forEach((song) => {
            console.log("Artist(s):" + song.artists[0].name);
            console.log("Song: " + song.name);
            console.log("Preview link:" + song.preview_url);
            console.log("Album: " + song.album.name + "\n");
         })
          //console.log (data.tracks.items);
        });
    });
}