module.exports = (app, model) => {
    app.get( "/livros", (req, res) =>
    model.Livro.findAll().then( (result) =>
    res.json(result) )
    );

    app.get( "/livros/:page", (req, res) => {
        var limit = 50; // number of records per page
        var page = req.params.page;
        var offset = limit * (page - 1);
        model.Livro.findAndCountAll({
        attributes: ['id', 'nome', 'autor', 'genero', 'taxa_de_aluguel', 'edicao'],
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
    app.get("/livro/:id", (req, res) => {
        const id = req.params.id
        model.Livro.findByPk(id).then( (result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    })
    app.post("/livro", (req, res) =>
        model.Livro.create({
        genero_id: req.body.genero_id,
        nome: req.body.nome,
        autor: req.body.autor,
        genero: req.body.genero,
        taxa_de_aluguel: req.body.taxa_de_aluguel,
        edicao: req.body.edicao
        }).then( (result) => res.json(result) )
    );
    app.put( "/livro/:id", (req, res) =>
        model.Livro.update({
            nome: req.body.nome,
            autor: req.body.autor,
            genero: req.body.genero,
            taxa_de_aluguel: req.body.taxa_de_aluguel,
            edicao: req.body.edicao
        
        },
    {
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
    );
    app.delete( "/livro/:id", (req, res) =>
        model.Livro.destroy({
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
    );
}