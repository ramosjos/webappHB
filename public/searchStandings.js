function searchStandings() {
    var teamname_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/standings/search/' + encodeURI(teamname_search_string)
}
