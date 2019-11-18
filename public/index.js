var input_1 = document.getElementById("input-1");
var input_2 = document.getElementById("input-2");
var input_3 = document.getElementById("input-3");
var input_4 = document.getElementById("input-4");
var input_5 = document.getElementById("input-5");
var input_6 = document.getElementById("input-6");
var input_7 = document.getElementById("input-6");
var input_8 = document.getElementById("input-6");

var insert_game_button = document.getElementById("insert-game");
var insert_standing_button = document.getElementById("insert-standing");
var insert_user_button = document.getElementById("insert-user");

var game_modal = document.getElementById("insert-game-modal"); 
var standing_modal = document.getElementById("insert-standing-modal"); 
var user_modal = document.getElementById("insert-user-modal"); 

var modalBackdrop = document.getElementById("modal-backdrop");
var modalCancel = document.getElementsByClassName("modal-cancel-button")[0];
var modalClose = document.getElementsByClassName("modal-close-button")[0];
var modalAccept = document.getElementsByClassName("modal-accept-button")[0];

// GAME MODAL //
function showGameModal(event) {
	game_modal.style.display = "block";
	modalBackdrop.style.display = "block";
	input_1.value = "";
	input_2.value = "";
	input_3.value = "";
	input_4.value = "";
	input_5.value = "";
	input_6.value = "";
	input_7.value = "";
	input_8.value = "";
}

function closeGameModal(event) {
	game_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// STANDING MODAL //
function showStandingModal(event) {
	standing_modal.style.display = "block";
	modalBackdrop.style.display = "block";
	input_1.value = "";
	input_2.value = "";
	input_3.value = "";
	input_4.value = "";
	input_5.value = "";
	input_6.value = "";
}

function closeStandingModal(event) {
	standing_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// USER MODAL //
function showUserModal(event) {
	user_modal.style.display = "block";
	modalBackdrop.style.display = "block";
	input_1.value = "";
	input_2.value = "";
}

function closeUserModal(event) {
	user_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == game_modal) {
		game_modal.style.display = "none";
		modalBackdrop.style.display = "none";
	}
	if (event.target == standing_modal) {
		standing_modal.style.display = "none";
		modalBackdrop.style.display = "none";
	}
	if (event.target == user_modal) {
		user_modal.style.display = "none";
		modalBackdrop.style.display = "none";
	}
}

if(insert_game_button){
	insert_game_button.addEventListener('click', showGameModal);
	modalCancel.addEventListener('click', closeGameModal);
	modalClose.addEventListener('click', closeGameModal);
}

if(insert_standing_button){
	insert_standing_button.addEventListener('click', showStandingModal);
	modalCancel.addEventListener('click', closeStandingModal);
	modalClose.addEventListener('click', closeStandingModal);
}

if(insert_user_button){
	insert_user_button.addEventListener('click', showUserModal);
	modalCancel.addEventListener('click', closeUserModal);
	modalClose.addEventListener('click', closeUserModal);
}

