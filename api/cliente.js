const helperValidator = require("../helpers/validador.js")

module.exports = (app, model) => {
    app.get( "/clientes", (req, res) =>
    model.Cliente.findAll().then( (result) =>
    res.json(result) )
    );

    app.get( "/clientes/:page", (req, res) => {
        var limit = 50; // number of records per page
        var page = req.params.page;
        var offset = limit * (page - 1);
        model.Cliente.findAndCountAll({
        attributes: ['id', 'nome'],
        limit: limit,
        offset: offset,
        sort: { id: 1 }
        }).then((result) => {
            let pages = Math.ceil(result.count / limit)
            console.log(`Total: ${result.count} - Limite: $
            {limit}, Paginas totais em categorias ${pages} `)
            res.json(result)
            //res.status(200).header({'access-token':req.headers['access-token'], 'total': result.count,'page':page, 'pages': pages, 'perpage': limit}).json({'data':result.rows});
            }).catch(function (error) {
                res.status(500).send('Internal Server Error: '+ error);
            });
        }   
    );
    app.get("/cliente/:id", (req, res) => {
        const id = req.params.id
        model.Cliente.findByPk(id).then( (result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    })
    app.post("/cliente", (req, res) => {
        const { nome } = req.body
        //se validar
        if(helperValidator.validarQuantidadeCaracteres(nome, 2))
        {
        return model.Cliente.create({nome: nome}).then( (result) => res.json(result) )
        }
        //error 422 - Unprocessable Entity
        return res.status(422).json({
        error: true,
        error: 'A quantidade de caracteres não deve ser menor que 2'
        })
    });
    app.put( "/cliente/:id", (req, res) =>
        model.Cliente.update({
            nome: req.body.nome,
            
        
        },
    {
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
    );
    app.delete( "/cliente/:id", (req, res) =>
        model.Cliente.destroy({
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
    );
}