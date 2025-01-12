'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ssrNumber: {
        type: Sequelize.STRING
      },
      worksNumber: {
        type: Sequelize.STRING
      },
      ssnNumber: {
        type: Sequelize.STRING
      },
      nationalID: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.INTEGER
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      surname: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      pobsInsurableEarnings: {
        type: Sequelize.INTEGER
      },
      pobsContribution: {
        type: Sequelize.FLOAT
      },
      basicAPWCS: {
        type: Sequelize.FLOAT
      },
      actualInsurableEarnings: {
        type: Sequelize.INTEGER
      },
      department: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      medicalAidNumber: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};