// const productos = function(data){
// 	console.log(data)
// 	for (var i=0; i<data.products.length; i++){
// 		$(".container").append(`<div class= "productos" id="${data.products[i]._id}" ><img src="${data.products[i].imgUrl}">
// 			<h3>${data.products[i].nombre}</h3></div>`);
// 	}
// }
// $.get("http://172.50.1.92:4000/products").success(productos)

// $('body').on('click', '.productos', function(){
//     var id= $(this).data('product-id')
//     $.get("http://172.50.1.92:4000/products/"+id, function(info){
//                     $(".descripcion").append(`<div class= "individual"><img src="${info.product.imgUrl}">
//                         <h3>${info.product.nombre}</h3>
//                         <p>${info.product.descripcion}</p>
//                         <h3>${info.product.precio}</h3>
//                         </div>`)
//                 })
// })

// $.get("",function(){
// 	$.(".container").append(`<div class= "form">
// 		<form>
// 			<input type="text" name="nombre">
// 			<input type="text" name="descripcion">
// 			<input type="number" name="precio">
// 			<input type="text" name="imgUrl">
// 			<input type="submit" name="agregar">
// 		</form>
// 		</div>`)
// })

// const productos = function(data){
//     console.log(data)
//     for (var i=0; i<data.products.length; i++){
//         $(".todo").append(`<div class= "productos" id="p${data.products[i]._id}" ><img src="${data.products[i].imgUrl}">
//             <h3>${data.products[i].nombre}</h3></div>`);
        

//         listaProductos=[]
//          listaProductos.push(document.querySelector(`#${data.products[i]._id}`))
//          listaProductos[i].addEventListener("click", ()=>{
//             console.log("this", this)    
//         $.get("http://172.50.1.92:4000/products/"+this._id, function(info){
//                     $(".descripcion").append(`<div class= "individual"><img src="${info.product.imgUrl}">
//                         <h3>${info.product.nombre}</h3>
//                         <p>${info.product.descripcion}</p>
//                         <h3>${info.product.precio}</h3>
//                         </div>`)
//                 })        
//        })
//     }


       
// }

// const productos = function(data) {
// 	console.log(data);
// 	data.products.forEach(product => {

// 		const currentElement = document.createElement("div")
// 		 currentElement.classList.add("producto")
// 		 currentElement.id = `p${product._id}`
// 		currentElement.innerHTML = 
// 		`<img src="${product.imgUrl}">
// 		 <h3>${product.nombre}</h3>`
// 		 currentElement.addEventListener("click", () => {

// 		 })
// 	})
// }

// $.get("http://172.50.1.92:4000/products").success(productos)


const productos = function(data){
	$('.lista').html("<button id=crear>Crear Producto</button>")
    $(".nuevo").hide()
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
                        <form>
							<input type="text" name="nombre" placeholder="Nombre"><br>
							<input type="text" name="descripcion" placeholder="Descripción"><br>
							<input type="number" name="precio" placeholder="Precio"><br>
							<input type="text" name="imgUrl" placeholder="Imágen"><br>
							<button id="update">Update</button>
						</form>
                        </div>`)

                    console.log(id, info.product.nombre)
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

$("body").on("click", "#update", function(){

	var respuesta = {
	nombre:	$('form [name="nombre"]').val(),
	descripcion: $('form [name="descripcion"]').val(),
	precio:	$('form [name="precio"]').val(),
	imgUrl:	$('form [name="imgUrl"]').val(),
	}
	console.log("hola")
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
