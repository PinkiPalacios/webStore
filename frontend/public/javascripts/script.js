const productos = function(data){
	$('.lista').html("<button id=crear>Crear Producto</button>")
    $(".nuevo").hide()
    $(".update").hide()
    for (var i=0; i<data.products.length; i++){
        $(".lista").append(`<div class= "productos" 
        	id=p${data.products[i]._id} data-product-id="${data.products[i]._id}" >
        	<img src="${data.products[i].imgUrl}">
            <h3>${data.products[i].nombre}</h3>
            </div>`)
    }
    $(".lista").show()

}
$.get("http://172.50.1.92:4000/products").success(productos)

var idGlobal

// $("body").on("click", )

$('body').on('click', '.productos', function(){
    var id= $(this).data('product-id')
    idGlobal= id

    $.get("http://172.50.1.92:4000/products/"+id, function(info){
                    console.log(info)
                    $(".lista").hide()
                    $(".container").append(`<div class= "individual"><img src="${info.product.imgUrl}">
                        <h3>${info.product.nombre}</h3>
                        <p>${info.product.descripcion}</p>
                        <h3>${info.product.precio}</h3>
                        <button id="delete">Eliminar</button>
                        <button id="actualizar">Update</button>
                        </div>`)
    })
})
$("body").on("click", "#actualizar", function(){
	$(".lista").hide();
	$(".individual").hide();
	$(".update").show();
})

$("body").on("click", "#update", function(){

	var respuesta = {
	nombre:	$("#nombre").val(),
	descripcion: $("#descripcion").val(),
	precio:	$("#precio").val(),
	imgUrl:	$("#imgUrl").val(),
	}
	$.ajax({
		method:"put",
		url:"http://172.50.1.92:4000/products/"+idGlobal,
		contentType: "application/json",
		data: JSON.stringify(respuesta),
		success: function (response){
			
			// if(response.error){VA A TENER QUE HABER UN MENSAJE, TIPO APPEND UN CARTEL ROJO}
			// ACA HAY QUE PONER SI HAY UN ERROR O LLEGÓ BIEN
		},
	})
})

$("body").on("click", "#delete", function(){
	$.ajax({
		url: "http://172.50.1.92:4000/products/"+idGlobal,
		type:"delete",
		success: function(response){
			console.log("hola")
			idGlobal=null
			$(".individual").hide()
			$.get("http://172.50.1.92:4000/products").success(productos)
			//$(".lista").show()
		}
	})
})



$("body").on("click","#crear", function(){
	$(".individual").hide()
	$(".lista").hide()
	$(".nuevo").show()
})

$("body").on("click", "#crearNuevo", function(){

	var res = {
	nombre:	$("#nombren").val(),
	descripcion: $("#descripcionn").val(),
	precio:	$("#precion").val(),
	imgUrl:	$("#imgUrln").val(),
	}
	console.log(res)
	console.log("hola")
	$.ajax({
		method:"post",
		url:"http://172.50.1.92:4000/products",
		contentType: "application/json",
		data: JSON.stringify(res),
		success: function (response){
			
			// if(response.error){VA A TENER QUE HABER UN MENSAJE, TIPO APPEND UN CARTEL ROJO}
			// ACA HAY QUE PONER SI HAY UN ERROR O LLEGÓ BIEN
		},
	})
})
