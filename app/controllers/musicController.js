myApp.controller("musicController", function($scope,$firebaseAuth,$firebaseArray,$firebaseObject,$location,Spotify,$http) {

  var ref = new Firebase("https://musicwebgl.firebaseIO.com");
  // create an instance of the authentication service
  var auth = $firebaseAuth(ref);
  $scope.authObj = $firebaseAuth(ref);
  var obj = $firebaseObject(ref);

  $scope.authData = $scope.authObj.$getAuth();

//Facebook username

//Text Commands =====================================================
  $scope.said = "Say the word 'play song' then the name of your song or artist to start";

  $scope.helloWorld = function() {
    $scope.said = "Hello world!";
    $scope.song = "Search for this song called Hello World"
  }
  $scope.turnon = function() {
    $scope.said = "turn on";
  }
  $scope.whatsup = function() {
    $scope.said = "whats up bro";
  }

// Spotify Api=========================================
 var audio = new Audio();

  $scope.searchTracks = function(query) {
      console.log(query);
        $http.get('https://api.spotify.com/v1/search',{
            params: {
                q: query,
                type: 'track'
              }
            })
            .then( function (response) {
              console.log(response);
                if (response.data.tracks.items.length) {
                    var track = response.data.tracks.items[0];
                    audio.src = track.preview_url;
                    audio.play();
                    // $scope.communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
                    console.log(track.album.images[1].url)

                    $scope.album = track.album.images[1].url;

                    var albumCover = document.getElementById('album');
                    albumCover.innerHTML = '<div class="adjust"><img src="' + track.album.images[1].url + '"><p class="currentSong">Playing ' + track.name + ' by ' + track.artists[0].name + '</p></div>';
                    console.log(albumCover)
                }
        });
    }
    $scope.playSong = function (songName, artistName) {
        var query = songName;
        if (artistName) {
            query += ' artist:' + artistName;
        }
        $scope.searchTracks(query);
    }

    // $scope.communicateAction = function(text) {
    //     var rec = document.getElementById('conversation');
    //     rec.innerHTML = '<div class="action">' + text + '</div>';
    // }


    $scope.trySong = $scope.communicateAction;

    // $scope.recongized = function(text) {
    //     var rec = document.getElementById('recongized');
    //     rec.innerHTML = '<div class="recognized"><div>' + text + '</div></div>';
    // }

//Siri like Commands
  $scope.commands = {
//Spotifiy Api track recognitions=================
    'stop': function () {
        audio.pause();
    },
    'stop song': function () {
        audio.pause();
    },
    'stop track': function () {
        audio.pause();
    },
    'play': function () {
        audio.play();
    },
    'play track *song': function (song) {
      // $scope.recongized('Play track ' + song);
      $scope.playSong(song);
    },
    'play *song by *artist': function (song, artist) {
      // $scope.recongized('Play song ' + song + ' by ' + artist);
      $scope.playSong(song, artist);
      console.log(song)
    },
    'play song *song': function (song) {
      // $scope.recongized('Play song ' + song);
      $scope.playSong(song);
      console.log(song)
    },
    'play *:song': function (song) {
      // $scope.recongized('Play ' + song);
      $scope.playSong(song);
      console.log(song)
    },
    ':nomatch': function (message) {
      // $scope.recongized(message);
      $scope.communicateAction('Sorry, I don\'t understand this action');
  }
  };
  var recognition = new webkitSpeechRecognition();

  recognition.commands = {
//Spotifiy Api track recognitions=================
    'stop': function () {
        audio.pause();
    },
    'stop song': function () {
        audio.pause();
    },
    'stop track': function () {
        audio.pause();
    },
    'play': function () {
        audio.play();
    },
    'play track *song': function (song) {
      // $scope.recongized('Play track ' + song);
      $scope.playSong(song);
    },
    'play *song by *artist': function (song, artist) {
      // $scope.recongized('Play song ' + song + ' by ' + artist);
      $scope.playSong(song, artist);
      console.log(song)
    },
    'play song *song': function (song) {
      // $scope.recongized('Play song ' + song);
      $scope.playSong(song);
      console.log(song)
    },
    'play *:song': function (song) {
      // $scope.recongized('Play ' + song);
      $scope.playSong(song);
      console.log(song)
    },
    ':nomatch': function (message) {
      // $scope.recongized(message);
      $scope.communicateAction('Sorry, I don\'t understand this action');
  }
  };

  $scope.annyang = annyang;

  $scope.recognition = annyang;

  // Tell KITT the command to use to start listening
  SpeechKITT.setStartCommand(function() {
    $scope.recognition.init(recognition.commands);
      $scope.recognition.start();


  });

SpeechKITT.setInstructionsText("Say Play song and then the name of your song!");
  // Tell KITT the command to use to abort listening
  SpeechKITT.setAbortCommand(function() {recognition.abort()});

  // Register KITT's recognition start event with the browser's Speech Recognition
  recognition.addEventListener('start', SpeechKITT.onStart);

  // Register KITT's recognition end event with the browser's Speech Recognition
  recognition.addEventListener('end', SpeechKITT.onEnd);

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat-clouds.css');

  // Render KITT's interface
  SpeechKITT.vroom(); // SpeechKITT.render() does the same thing, but isn't as much fun!



  $scope.listen = function() {
      $scope.annyang.init($scope.commands);
      $scope.annyang.start();


      ($scope.annyang.addCallback = function(error) {
            $scope.communicateAction(error,'delayed');
      });

    }


  // Spotify.search('Drake', 'artist').then(function (data,$scope) {
  //   var audioObject = null;
  //   audioObject = new Audio(data.items);
  //   console.log(data)
  // });

//   Spotify.getTrack("0eGsygTp906u18L0Oimnem").then(function (data) {
//   console.log(data);
//   var audioObject = null;
//   audioObject = new Audio(data.preview_url);
//   audioObject.play();
//   // console.log(data.preview_url)
// });


});
