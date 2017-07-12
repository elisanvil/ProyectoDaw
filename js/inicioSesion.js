var nombreUsuario="arelys Vintimilla";
var apellidoUsuario;
var edadUsuario;

$( document ).ready( function(){

	// Al dar click en el boton de submit
	$("#btnSubmit").on("click", function(e){

		e.preventDefault();

		var correo = $("#inputEmail").val();
		var contrasena = $("#inputPassword").val();
		console.log(correo);
		console.log(contrasena);
		
		comprobacionUsuario(correo, contrasena);
	});
	

	$("h4#nombreCompleto").text(nombreUsuario);
	

});


function comprobacionUsuario(correo, contrasena){

	var ruta = "./data/usuarios.json";

    $.ajax(
    	{
    		method: "GET",
    		url: ruta,
    		data: {},
    		mimeType: "application/json; charset=utf-8"
    	}
    ).done(function(arreglo){
    	var encontrado = false;
    	var check = false;

    	$.each(arreglo, function (i) {
    		var name = arreglo[i].user;
    		var password= arreglo[i].pass;
    		nombreUsuario=correo;
				
    		// Si no lo encuentra, encontrado seguira como false
			if(name==correo){
				// El usuario existe. Verificamos la clave
				encontrado = true;
				
				if ( password==contrasena ) {
					check = true;
					
				}
				
			}
			
		}); // End each()

    	// Verificamos si es necesario redireccionar o no
		if ( encontrado == true && check == true ) {
			// Todo Ok
			//<arreglo></arreglo>[i].logeo=true;
			window.location.replace("./perfil.html");
		}
		else if ( encontrado == true && check == false ) {
			// Usuario existe pero clave es incorrecta
			$("#inputPassword").val("");
			alert("Clave incorrecta")
		}
		else {
			// No existe el usuario
			$("#inputPassword").val("");
			alert("Usuario no encontrado")
		}


	}); // End done()
}