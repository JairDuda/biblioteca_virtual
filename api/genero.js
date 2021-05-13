const helperValidator = require("../helpers/validador.js")

module.exports = (app, model) => {
    app.get( "/generos", (req, res) =>
        model.Genero.findAll().then( (result) =>
            res.json(result) )
    );
    app.get( "/generos/:page", (req, res) => {
        var limit = 5; // numero de informacoes por pagina
        var page = req.params.page;
        var offset = limit * (page - 1);
        model.Genero.findAndCountAll({
        attributes: ['id', 'nome'],
        limit: limit,
        offset: offset,
        sort: { id: 1 }
    }).then((result) => {
        let pages = Math.ceil(result.count / limit)
        console.log(`Total: ${result.count} - Limite: $
        {limit}, Paginas totais em generos ${pages} `)
        res.json(result)
    }).catch(function (error) {
        res.status(500).send('Internal Server Error: '+
        error);
        });
    });
    app.get( "/genero/:id", (req, res) =>{

        const id = req.params.id
        model.Genero.findByPK(id).then( (result) => {
            res.json(result)
    }).catch((err) => {
        res.json(err)
    })
        
});
    
    app.post("/genero", (req, res) => {
        const { nome } = req.body
        //se validar
        if(helperValidator.validarQuantidadeCaracteres(nome, 3))
        {
        return model.Genero.create({nome: nome}).then( (result) => res.json(result) )
        }
        //error 422 - Unprocessable Entity
        return res.status(422).json({
        error: true,
        error: 'A quantidade de caracteres não deve ser menor que 3'
        })
    });
    
    app.put( "/genero/:id", (req, res) =>
        model.Genero.update({
            nome: req.body.nome,
        },
        {
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
);
app.delete( "/genero/:id", (req, res) =>
    model.Genero.destroy({
        where: {
        id: req.params.id
        }
    }).then( (result) => res.json(result) )
);
}