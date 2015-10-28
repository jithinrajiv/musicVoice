myApp.controller("musicController", function($scope) {  


//Text Commands =====================================================
  $scope.said = 'Say a song';

  $scope.helloWorld = function() {
    $scope.said = "Hello world!";
    $scope.song = "Search for this song called Hello World"
  }

  $scope.turnon = function() {
    $scope.said = "turn on";
  }
  $scope.play = function() {
    $scope.said = "play a freaking song";
  }
  $scope.whatsup = function() {
    $scope.said = "whats up bro";
  }

// Spotify Api=========================================
 var audio = new Audio();


  $scope.searchTracks = function(query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                if (response.tracks.items.length) {
                    var track = response.tracks.items[0];
                    audio.src = track.preview_url;
                    audio.play();
                    communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
                }
            }
        });
    }

    $scope.playSong = function (songName, artistName) {
        var query = songName;
        if (artistName) {
            query += ' artist:' + artistName;
        }
        searchTracks(query);
    }
    $scope.communicateAction = function(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="action">' + text + '</div>';
    }
    $scope.recongized = function(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
    }

//Siri like Commands 
  $scope.commands = {
    'hello (world)': function() {
      if (typeof console !== "undefined") console.log('hello world!')
      $scope.$apply($scope.helloWorld);
    },
    'play a song': function() {
      if (typeof console !== "undefined") console.log('play a song')
      $scope.$apply($scope.play);
    },
    'hey': function() {
      if (typeof console !== "undefined") console.log('whats up bro')
      $scope.$apply($scope.whatsup);
    },
    'turn on': function() {
      if (typeof console !== "undefined") console.log('Turn on')
      $scope.$apply($scope.turnon);
    },
//Spotifiy Api track recognitions=================
    'stop': function () {
        audio.pause();
    },
    'play track *song': function (song) {
    recognized('Play track ' + song);
    playSong(song);
    },
    'play *song by *artist': function (song, artist) {
    recognized('Play song ' + song + ' by ' + artist);
    playSong(song, artist);
    },
    'play song *song': function (song) {
    recognized('Play song ' + song);
    playSong(song);
    },
    'play *song': function (song) {
    recognized('Play ' + song);
    playSong(song);
    },
    ':nomatch': function (message) {
    recognized(message);
    communicateAction('Sorry, I don\'t understand this action');
  }
  };
  annyang.debug();
  annyang.init($scope.commands);
  annyang.start();

});