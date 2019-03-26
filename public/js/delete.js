$(document).ready(function(){
    $('.delete-user').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/users/edit/'+id,
            success: function(response){
                alert('Deleting Article');
                window.location.href='/';
            },
            error: function(err){
                console.log(err)
            }
        })
    })
})