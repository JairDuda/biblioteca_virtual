'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define('Genero', {
    nome: DataTypes.STRING
  }, {
    tableName: 'generos',
  });
  Genero.associate = function(models) {
    Genero.hasMany(models.Livro, {
      foreignKey: 'genero_id', // campo que define a chave estrangeira (foreign key)
      as: 'livros', // nome da tabela ao qual se relaciona no banco de dados
    });
  };
  return Genero;
};