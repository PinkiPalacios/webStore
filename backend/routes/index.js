const express = require('express');
const router = express.Router();
const products= require("../models/products")
/* GET home page. */
router.get('/products', (req, res, next) => {
  //res.render('index', { title: 'Express' });

 	products.find({}, function(err, products ){
 		if (err){
 			console.log("Error mostrando lista de productos")
 		}else {
	 		console.log (products)

			res.json({products:products})
		}

	})



  
});

router.get('/products/:id', (req, res, next) => {
	products.findById(req.params.id, function (err, product){
		if (err){
			console.log(err)
		}else{

			res.json({product:product})

		}
	})

})

router.post('/products', (req, res, next) => {
console.log(req.body)
	products.create({

	nombre: req.body.nombre,
	precio: req.body.precio,
	descripcion: req.body.descripcion,
	imgUrl: req.body.imgUrl,

	}, function (producto){console.log ("producto creado", producto)} )


});


router.put('/products/:id', (req, res, next) => {
	console.log(req.body)
	products.findByIdAndUpdate(req.params.id ,{

	nombre: req.body.nombre,
	precio: req.body.precio,
	descripcion: req.body.descripcion,
	imgUrl: req.body.imgUrl,

	}, function (producto){console.log ("producto modificado", producto)} )


});

router.delete('/products/:id', (req, res, next) => {

	products.findByIdAndRemove(req.params.id, (err, data)=> {

		if (err){console.log(err)
				res.send(err)
		}
		else{
			console.log("Producto eliminado", data)
			res.send(data)
		}
	})


});


	

	// products.create({

	// nombre: "a",
	// precio:"210",
	// descripcion: "c",
	// imgUrl:"",

	// }, function (producto){console.log ("producto creado", producto)} )






// Devolver todos los productos get("/products")
// Devolver un producto get("/products/:id")
// Agregar un nuevo producto post("/products"), devuelve el nuevo producto.
// Updatear un producto put("products/:id"), tiene que devolver el producto updateado.
// Borrar un producto delete("/products/:id"), tiene que devolver la lista de productos sin el producto eliminado.





module.exports = router;
