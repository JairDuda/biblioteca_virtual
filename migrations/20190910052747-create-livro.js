'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genero_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'generos', // nome da tabela ao qual se relaciona
          key: 'id', // chave de referência na tabela que se relaciona
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      nome: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      taxa_de_aluguel: {
        type: Sequelize.DECIMAL
      },
      edicao: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('livros');
  }
};