'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: DataTypes.STRING
  }, {
    tableName: 'clientes',
  });
  Cliente.associate = function(models) {
    Cliente.hasMany(models.Emprestimo, {
      foreignKey: 'cliente_id', // campo que define a chave estrangeira (foreign key)
      as: 'emprestimos', // nome da tabela ao qual se relaciona no banco de dados
      });
  };
  return Cliente;
};