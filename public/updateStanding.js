function updateStanding(id){
    $.ajax({
        url: '/standings/' + id,
        type: 'PUT',
        data: $('#editstanding').serialize(),
        success: function(result){
            window.location.replace("./standings");
        }
    })
};
