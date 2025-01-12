'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payslips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      worksNumber: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      idNumber: {
        type: Sequelize.STRING
      },
      dateJoined: {
        type: Sequelize.DATEONLY
      },
      daysTaken: {
        type: Sequelize.INTEGER
      },
      leaveBalance: {
        type: Sequelize.FLOAT
      },
      loan: {
        type: Sequelize.FLOAT
      },
      NSSANumber: {
        type: Sequelize.STRING
      },
      medicalAidNumber: {
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
      basePay: {
        type: Sequelize.INTEGER
      },
      transportAllowance: {
        type: Sequelize.INTEGER
      },
      housingAllowance: {
        type: Sequelize.INTEGER
      },
      commission: {
        type: Sequelize.INTEGER
      },
      grossPay: {
        type: Sequelize.INTEGER
      },
      payeUSD: {
        type: Sequelize.FLOAT
      },
      aidsLevyUSD: {
        type: Sequelize.FLOAT
      },
      nssaLevyUSD: {
        type: Sequelize.FLOAT
      },
      totalDeductionsUSD: {
        type: Sequelize.FLOAT
      },
      netPayUSD: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Payslips');
  }
};