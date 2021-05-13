'use strict';
module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define('Livro', {
    genero_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    autor: DataTypes.STRING,
    genero: DataTypes.STRING,
    taxa_de_aluguel: DataTypes.DECIMAL,
    edicao: DataTypes.INTEGER
  }, {
    tableName: 'livros',
  });
  Livro.associate = function(models) {
    Livro.belongsTo(models.Genero, {
      foreignKey: 'id', // campo que define a chave estrangeira (foreign key)
      as: 'generos', // nome da tabela ao qual se relaciona no banco de dados
      });
    Livro.hasMany(models.Emprestimo, {
      foreignKey: 'livro_id', // campo que define a chave estrangeira (foreign key)
      as: 'emprestimos', // nome da tabela ao qual se relaciona no banco de dados
      });
  };
  return Livro;
};