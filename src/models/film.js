const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FilmSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    image_url:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    date_release:{
        type: Date,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});
FilmSchema.plugin(mongoosePaginate);
mongoose.model("Film", FilmSchema);