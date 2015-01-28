$(document).ready(function(){
    var client;

    //Click en el botón Login
    $("#inputLogin").click(function(){
        var user = $("#username").val();
        var pass = $("#password").val();

        client = new $.RestClient('http://104.236.247.200:4000/api/', {
            username: user,
            password: pass
        });
        client.add('user');
        client.add('folder');
        client.user.add('login');


        client.user.create({email:user,pass:pass},'login').done(function(data) {

            console.log(data.id);
            console.log(data);
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('name', data.name);
            $(location).attr('href','index.html');
        }).fail(function() {
            alert( "Usuario o contraseña incorrecto" );
        })
    });

});