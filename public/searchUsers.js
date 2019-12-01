function searchUsers() {
    var username_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/users/search/' + encodeURI(username_search_string)
}
