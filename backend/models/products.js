
var mongoose= require ("mongoose")

var productsSchema = new mongoose.Schema ({
	nombre: String,
	precio: Number,
	descripcion:String,
	imgUrl: String,
})





var products= mongoose.model("productos", productsSchema);
module.exports= products;