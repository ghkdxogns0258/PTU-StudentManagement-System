const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');

const CompletedCredit = sequelize.define('CompletedCredit', {
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'userId' }
  },
  totalCredits: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  majorRequired: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  majorElective: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  generalEducation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pCredit: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = CompletedCredit;
