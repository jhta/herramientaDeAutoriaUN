$(document).ready(function(){

    var client = new $.RestClient('http://localhost:4000/api/', {
        username: 'admin',
        password: 'secr3t'
    });
    client.add('user');
    client.user.add('login');

    //Click en el botón Login
    $("#inputLogin").click(function(){
        var user = $("#username").val();
        var pass = $("#password").val();

        client.user.create({email:user,pass:pass},'login').done(function(data) {
            console.log(data);
        }).fail(function() {
            alert( "error" );
        })
    });

});