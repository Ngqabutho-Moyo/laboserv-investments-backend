'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payroll.init({
    firstName: DataTypes.STRING,
    surname: DataTypes.STRING,
    worksNumber: DataTypes.STRING,
    grade: DataTypes.STRING,
    department: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    dateJoined: DataTypes.STRING,
    daysTaken: DataTypes.STRING,
    leaveBalance: DataTypes.FLOAT,
    loan: DataTypes.FLOAT,
    NSSANumber: DataTypes.STRING,
    medicalAidNumber: DataTypes.STRING,
    bank: DataTypes.STRING,
    branch: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    basePay: DataTypes.INTEGER,
    transportAllowance: DataTypes.INTEGER,
    housingAllowance: DataTypes.INTEGER,
    commission: DataTypes.INTEGER,
    grossPay: DataTypes.INTEGER,
    payeUSD: DataTypes.FLOAT,
    aidsLevyUSD: DataTypes.FLOAT,
    nssaLevyUSD: DataTypes.FLOAT,
    totalDeductionsUSD: DataTypes.FLOAT,
    netPayUSD: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Payroll',
  });
  return Payroll;
};