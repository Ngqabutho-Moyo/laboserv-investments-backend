'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    ssrNumber: DataTypes.STRING,
    worksNumber: DataTypes.STRING,
    ssnNumber: DataTypes.STRING,
    nationalID: DataTypes.STRING,
    period: DataTypes.INTEGER,
    birthDate: DataTypes.DATEONLY,
    surname: DataTypes.STRING,
    firstName: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    pobsInsurableEarnings: DataTypes.INTEGER,
    pobsContribution: DataTypes.FLOAT,
    basicAPWCS: DataTypes.FLOAT,
    actualInsurableEarnings: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};