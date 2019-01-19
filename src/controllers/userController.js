const db = require('../../models');

module.exports = {
    async index(req, res){
        try {
            const users = await db.User.findAll({limit: 10, order: [['id', 'DESC']]});
            return res.json(users); 
        } catch (error) {
            return res.json({error: error});
        }
    },
    async store(req, res){
        try {
            const user = await db.User.create(req.body);
            return res.json(user);
        } catch (error) {
            return res.json({error: error});
        }
    },
    async show(req, res){
        try {
            const user = await db.User.findAll({where: {id: req.params.id}});
            return res.json(user);
        } catch (error) {
            return res.json({error: error});
        }
    },
    async update(req, res){
        try{
            const user = await db.User.update(req.body, { where: {id: req.params.id}});
            return res.json({user: user, status: "Updated"});
        }catch(err){
            return res.json({error: error});
        }
    
    },
    async delete(req, res){
        try {
            const user = await db.User.destroy({where:{id: req.params.id}});
            return res.json({user: user, status: "Deleted"});   
        } catch (error) {
            return res.json({error: error});
        }
    }
};