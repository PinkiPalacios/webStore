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
var idComentario
// $("body").on("click", )
const detalle= function(info){
	$(".lista").hide()
	$(".detalle").html()
	console.log(info)
	console.log(info.product.comments[0].texto)
   var comentarios=""
   for (var i = info.product.comments.length - 1; i >= 0; i--) {
   	comentarios= comentarios+`<div class="detalleComentario">
   		<p>${info.product.comments[i].texto}</p>
   		<p>${info.product.comments[i].fecha}</p>
   		<button id="eliminarComentario" data-comments-id="${info.product.comments[i]._id}">Eliminar Comentario</button>
   		<button id="editarComentario">EditarComentario</button>
   	</div>`
   }

   $(".detalle").append(`<div class= "individual"><img src="${info.product.imgUrl}">
       <h3>${info.product.nombre}</h3>
       <p>${info.product.descripcion}</p>
       <h3>${info.product.precio}</h3>
       <button id="delete">Eliminar</button>
       <button id="actualizar">Update</button>
       <h3>Comentarios</h3>
       ${comentarios}
       <textarea id= "text" rows= "10" cols= "50"></textarea><br>
       <button id="comentario">Comentar</button>
       </div>`)
}

$('body').on('click', '.productos', function(){
    var id= $(this).data('product-id')
    idGlobal= id
    $.get("http://172.50.1.92:4000/products/"+id).success(detalle)
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
			
		}
	})
})
$("body").on("click", "#eliminarComentario", function(){
	idComentario= $(this).data('comments-id')
	console.log(idComentario);
	console.log('this',this);
	$.ajax({
		url: "http://172.50.1.92:4000/products/"+idGlobal+"/comment/"+idComentario,
		type:"delete",
		success: function(response){
			console.log("hola")
			$.get("http://172.50.1.92:4000/products/"+idGlobal).success(detalle)
			
		}
	})
})
$("body").on("click", "#comentario", function(){
	var texto= {
		texto: $("#text").val()
	}
		
	$.ajax({
		url: "http://172.50.1.92:4000/products/"+idGlobal+"/comment",
		method: "post",
		contentType:"application/json",
		data: JSON.stringify(texto),
		success: function(response){
			
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
