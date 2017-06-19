
var mongoose= require ("mongoose")

var commentsSchema = new mongoose.Schema ({
	texto: String,
	fecha: Date,
	
})



comments

var comments= mongoose.model("comments", commentsSchema);
module.exports= comments;