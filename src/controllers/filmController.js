const db = require('../../models');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        try {
            const films = await db.Film.findAll({ limit: 5, order: [['id', 'DESC']]});
            return res.json(films);
        } catch (error) {
            return res.json({error: error});
        }
    },
    async store(req, res){
        var path = null;
        if(req.file != undefined){
            var path = "uploads/"+req.file.filename;  
        }
        try {
            const film =  db.Film.create({
                title: req.body.title,
                description: req.body.description,
                cape_url: path,
                date_release: req.body.date_release
            });
            return res.json(film);
        } catch (error) {
            return res.json({error: error});
        }
    },
    async show(req, res){
        try {
            const film = await db.Film.findAll({where: {id: req.params.id}});
            return res.json(film);
        } catch (error) {
            return res.json({error: error});
        }
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
        try {
            const film = await db.Film.update(update, {where: {id: req.params.id}});
            return res.json({updated: film});
        } catch (error) {
            return res.json({error: error});
        }
    },
    async delete(req, res){
        try {
            const film = await db.Film.destroy({where:{id: req.params.id}});
            return res.json({deleted: film});   
        } catch (error) {
            return res.json({error: error});
        }
    }
};