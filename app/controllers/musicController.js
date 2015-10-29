myApp.controller("musicController", function($scope,$firebaseAuth,$firebaseArray,$firebaseObject,$location,Spotify) {  

  var ref = new Firebase("https://musicwebgl.firebaseIO.com");
  // create an instance of the authentication service
  var auth = $firebaseAuth(ref);
  $scope.authObj = $firebaseAuth(ref);
  var obj = $firebaseObject(ref);

  var authData = $scope.authObj.$getAuth();

  console.log("Logged in as:", authData.uid);
  console.log(authData.facebook.displayName);

  $scope.fName = authData.facebook.displayName;

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
    'play track :song': function (song) {
      $scope.recongized('Play track ' + song);
      $scope.playSong(song);
    },
    'play :song by :artist': function (song, artist) {
      $scope.recongized('Play song ' + song + ' by ' + artist);
      $scope.playSong(song, artist);
      console.log(song)
    },
    'play song :song': function (song) {
      $scope.recongized('Play song ' + song);
      $scope.playSong(song);
      console.log(song)

    },
    'play :song': function (song) {
      $scope.recongized('Play ' + song);
      $scope.playSong(song);
      console.log(song)
    },
    ':nomatch': function (message) {
      $scope.recongized(message);
      $scope.communicateAction('Sorry, I don\'t understand this action');
  }
  };
  annyang.debug();
  annyang.init($scope.commands);
  annyang.start();



  Spotify.search('Drake', 'artist').then(function (data,$scope) {
    var audioObject = null;
    audioObject = new Audio(data.items);
    console.log(data)
  });

  Spotify.getTrack("0eGsygTp906u18L0Oimnem").then(function (data) {
  console.log(data);
  var audioObject = null;
  audioObject = new Audio(data.preview_url);
  audioObject.play();
  // console.log(data.preview_url)
});

  // var listid = $stateParams.listid;
  // var userid = $stateParams.userid;

  // $scope.listname = $stateParams.listname;
 

  // $scope.audio = new Audio();
 
  // $scope.tracks = [];
 
  // Spotify.getPlaylist(userid, listid).then(function (data) {
  //   $scope.tracks = data.tracks.items;
  // });
 
  // $scope.playTrack = function(trackInfo) {
  //   $scope.audio.src = trackInfo.track.preview_url;
  //   $scope.audio.play();
  // };
 

});