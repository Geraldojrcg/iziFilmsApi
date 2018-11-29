const db = require('../../models');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const films = await db.Film.findAll({ limit: 5, order: [['id', 'DESC']]});
        return res.json(films); 
    },
    async store(req, res){
        var path = null;
        if(req.file != undefined){
            var path = "uploads/"+req.file.filename;  
        }
        const film =  db.Film.create({
            title: req.body.title,
            description: req.body.description,
            cape_url: path,
            date_release: req.body.date_release
        });
        return res.json(film);
    },
    async show(req, res){
        const film = await db.Film.findById(req.params.id);
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
        const film = await  db.Film.update(update, {where: {id: req.params.id}});
        return res.json({updated: film});
    },
    async delete(req, res){
        const film = await db.Film.destroy({where:{id: req.params.id}});
        return res.json({Deleted: film});
    }
};