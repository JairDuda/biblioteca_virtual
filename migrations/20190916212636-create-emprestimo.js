'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emprestimos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      livro_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'livros', // nome da tabela ao qual se relaciona
          key: 'id', // chave de referência na tabela que se relaciona
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes', // nome da tabela ao qual se relaciona
          key: 'id', // chave de referência na tabela que se relaciona
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('emprestimos');
  }
};