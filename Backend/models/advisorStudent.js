const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');
const Professor = require('./professor');

const AdvisorStudent = sequelize.define('AdvisorStudent', {
  professorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Professor, key: 'userId' }
  },
  professorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'userId' }
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = AdvisorStudent;
