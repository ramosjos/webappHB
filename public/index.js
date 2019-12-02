var game_button = document.getElementById("edit-game");
var result_button = document.getElementById("edit-result");
var standing_button = document.getElementById("edit-standing");
var user_button = document.getElementById("edit-user");
var message_button = document.getElementById("edit-message");

var game_modal = document.getElementById("game-modal");
var result_modal = document.getElementById("result-modal");
var standing_modal = document.getElementById("standing-modal");
var user_modal = document.getElementById("user-modal");
var message_modal = document.getElementById("message-modal");

var modalBackdrop = document.getElementById("modal-backdrop");
var modalCancel = document.getElementsByClassName("modal-cancel-button")[0];
var modalClose = document.getElementsByClassName("modal-close-button")[0];

// GAME MODAL //
function showGameModal(event) {
	game_modal.style.display = "block";
	modalBackdrop.style.display = "block";
}

function closeGameModal(event) {
	game_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// Result MODAL //
function showResultModal(event) {
	result_modal.style.display = "block";
	modalBackdrop.style.display = "block";
}

function closeResultModal(event) {
	result_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// STANDING MODAL //
function showStandingModal(event) {
	standing_modal.style.display = "block";
	modalBackdrop.style.display = "block";
}

function closeStandingModal(event) {
	standing_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// USER MODAL //
function showUserModal(event) {
	user_modal.style.display = "block";
	modalBackdrop.style.display = "block";
}

function closeUserModal(event) {
	user_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

// MESSAGE MODAL //
function showMessageModal(event) {
	message_modal.style.display = "block";
	modalBackdrop.style.display = "block";
}

function closeMessageModal(event) {
	message_modal.style.display = "none";
	modalBackdrop.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == game_modal) {
		game_modal.style.display = "none";
		modalBackdrop.style.display = "none";
	}
	if (event.target == result_modal) {
		result_modal.style.display = "none";
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
	if (event.target == message_modal) {
		message_modal.style.display = "none";
		modalBackdrop.style.display = "none";
	}

}

if(game_button){
	game_button.addEventListener('click', showGameModal);
	modalCancel.addEventListener('click', closeGameModal);
	modalClose.addEventListener('click', closeGameModal);
}

if(result_button){
	result_button.addEventListener('click', showResultModal);
	modalCancel.addEventListener('click', closeResultModal);
	modalClose.addEventListener('click', closeResultModal);
}

if(standing_button){
	standing_button.addEventListener('click', showStandingModal);
	modalCancel.addEventListener('click', closeStandingModal);
	modalClose.addEventListener('click', closeStandingModal);
}

if(user_button){
	user_button.addEventListener('click', showUserModal);
	modalCancel.addEventListener('click', closeUserModal);
	modalClose.addEventListener('click', closeUserModal);
}

if(message_button){
	message_button.addEventListener('click', showMessageModal);
	modalCancel.addEventListener('click', closeMessageModal);
	modalClose.addEventListener('click', closeMessageModal);
}
