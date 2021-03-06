// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
pokemonPlannerApp.controller('HomeCtrl', function ($scope,Pokemon, $firebaseObject) {

	//logga ut användaren 
	 document.getElementById("logOutBtn").addEventListener('click', e => {
	        firebase.auth().signOut().then(function(){
	            // Personen har loggat ut gör nåt
	        });
	    });

	//variabel att kolla om användaren är inloggad
	$scope.online = false;

	firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	      	$scope.online = true;
	    } else {
			$scope.online = false;
	    }
	 });	

	//hämta email från användaren som är online
	$scope.currUser = function() {
		var curruser = firebase.auth().currentUser;
		if (curruser != null) {
			return curruser.email;
		}
		else {
			return null;
		}
	}
	

	// TODO in Lab 5: Implement the methods to get the Movie menu
	var refPlayer = firebase.database().ref().child("settings/");
	var player1 = $firebaseObject(refPlayer.child("1"));
	var player2 = $firebaseObject(refPlayer.child("2"));

	if(Pokemon.getPlayer()==1){
		player1.occupied = false;
		player1.$save();
	}

	else if(Pokemon.getPlayer()==2){
		player2.occupied = false;
		player2.$save();
	}


    $scope.playReset = function() {
        var audio = new Audio('../audio/sound-reset.m4a');
        audio.play();
    };

    $scope.playTheme = function() {
        var audio = new Audio('../audio/theme.mp3');
        audio.play();
    };

	$scope.checkPlayer = function(player){
		if(player=="1"){
			return player1.occupied;
		}
		if(player=="2"){
			return player2.occupied;
		}
	}

	$scope.resetPlayers = function() {
		player1.occupied = false;
		player2.occupied = false;
		player1.$save();
		player2.$save();
	}


	$scope.setPlayer = function(player) {
		console.log("Running setPlayer!");
		Pokemon.setPlayer(player);
		
		if(player=="1"){
			player1.occupied = true;
			player1.$save();
		}
		else if(player=="2"){
			player2.occupied = true;
			player2.$save();
		}
	}
});