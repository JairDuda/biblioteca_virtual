'use strict';
module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define('Emprestimo', {
    livro_id: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER
  }, {
    tableName: 'emprestimos',
  });
  Emprestimo.associate = function(models) {
    Emprestimo.belongsTo(models.Cliente, {
      foreignKey: 'cliente_id', // campo que define a chave estrangeira (foreign key)
      as: 'clientes', // nome da tabela ao qual se relaciona no banco de dados
      });
    Emprestimo.belongsTo(models.Livro, {
      foreignKey: 'livro_id', // campo que define a chave estrangeira (foreign key)
      as: 'livros', // nome da tabela ao qual se relaciona no banco de dados
      });
  };
  return Emprestimo;
};