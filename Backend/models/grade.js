const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');

const Grade = sequelize.define('Grade', {
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'userId' }
  },
  averageScore: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Grade;
