$(document).ready(function(){
    var client;

    //Click en el botón Login
    $("#inputLogin").click(function(){
        var user = $("#username").val();
        var pass = $("#password").val();

        client = new $.RestClient('http://localhost:4000/api/', {
            username: user,
            password: pass
        });
        client.add('user');
        client.add('folder');
        client.user.add('login');


        client.user.create({email:user,pass:pass},'login').done(function(data) {
            console.log(data.id);
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('name', data.name);
            $(location).attr('href','index.html');
        }).fail(function() {
            alert( "Usuario o contraseña incorrecto" );
        })
    });

    $("#createUser").click(function(){
        var newName = $("#newName").val(),
            newMail = $("#newMail").val(),
            newPass = $("#newPass").val(),
            repeatPass = $("#repeatPass").val();

        client = new $.RestClient('http://localhost:4000/api/',{
            newName: newName,
            newMail: newMail,
            newPass: newPass
        });
    });
});
