function searchResults() {
    var teamname_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/results/search/' + encodeURI(teamname_search_string)
}
