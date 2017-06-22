const express = require('express');
const router = express.Router();
const products= require("../models/products")
const comments= require("../models/comments")
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

	products.findById(req.params.id).populate('comments').exec( function (err, product){
		if (err){
			console.log(err)
		}else{

			res.json({product:product})

		}
	})//.populate('comments')

})

router.post('/products', (req, res, next) => {
console.log(req.body)
	products.create({

		nombre: req.body.nombre,
		precio: req.body.precio,
		descripcion: req.body.descripcion,
		imgUrl: req.body.imgUrl,

	}, function (err, producto){console.log ("producto creado", producto)} )


});


router.put('/products/:id', (req, res, next) => {
	console.log(req.body)
	products.findByIdAndUpdate(req.params.id ,{

		nombre: req.body.nombre,
		precio: req.body.precio,
		descripcion: req.body.descripcion,
		imgUrl: req.body.imgUrl,

	}, function (producto){
		console.log ("producto modificado", producto)
		res.send(producto)
	} )


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


router.post('/products/:id/comment', function(req,res,next){

	products.findOne({_id: req.params.id}, function(err, product ){

		console.log("BODYYY", req.body)
			comments.create({
			texto: req.body.texto,
			fecha: new Date(),

		}, function (err, data){

			product.comments.unshift(data)
			console.log(data)
			product.save();
			res.send(data)
		})




	})

	

})

router.put('/products/:id/comment/:idComment', function(req,res,next){

	comments.findByIdAndUpdate(req.params.idComment ,{

		texto: req.body.texto,
		fecha: new Date(),

	}, function (comentario){
		console.log ("Comentario Modificado", comentario)
		res.send(comentario)
	} )
	
})

router.delete('/products/:id/comment/:idComment', function(req,res,next){

	comments.findByIdAndRemove(req.params.idComment, (err,data)=>{
		if ("error",err){
			console.log(err)
			res.send(err)
		}else{
			console.log("eliminado",data)
			res.send(data)
		}
	})
})

	







module.exports = router;
