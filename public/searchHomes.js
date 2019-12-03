function searchHomes() {
    var teamname_search_string  = document.getElementById('navbar-search-input').value
    window.location = '/home/search/' + encodeURI(teamname_search_string)
}
