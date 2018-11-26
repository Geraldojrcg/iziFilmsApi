const mongoose = require('mongoose');

const Film = mongoose.model('Film');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const films = await Film.paginate({}, {page, limit: 5});
        return res.json(films); 
    },
    async store(req, res){
        var path = null;
        if(req.file != undefined){
            var path = "uploads/"+req.file.filename;  
        }
        const film = new Film({
            title: req.body.title,
            description: req.body.description,
            image_url: path,
            date_release: req.body.date_release
        });
        film.save();
        return res.json(film);
    },
    async show(req, res){
        const film = await Film.findById(req.params.id);
        return res.json(film);
    },
    async update(req, res){
        var path = null;
        if(req.file != undefined){
            var path = "uploads/"+req.file.filename;  
        }
        var update = {
            title: req.body.title,
            description: req.body.description,
            image_url: path,
            date_release: req.body.date_release
        }
        const film = await Film.findByIdAndUpdate(req.params.id, update, {new: true});
        return res.json(film);
    },
    async delete(req, res){
        await Film.findByIdAndRemove(req.params.id);
        return res.send("Deleted");
    }
};