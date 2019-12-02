function searchMessages() {
    var username_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/messages/search/' + encodeURI(username_search_string)
}
