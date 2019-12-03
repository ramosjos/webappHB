function searchGames() {
    var teamname_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/games/search/' + encodeURI(teamname_search_string)
}
