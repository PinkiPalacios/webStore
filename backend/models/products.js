
var mongoose= require ("mongoose")

var productsSchema = new mongoose.Schema ({
	nombre: String,
	precio: Number,
	descripcion:String,
	imgUrl: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
})





var products= mongoose.model("productos", productsSchema);
module.exports= products;