const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');

const CareerInfo = sequelize.define('CareerInfo', {
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Student, key: 'userId' }
  },
  desiredField: {
    type: DataTypes.STRING,
    allowNull: false
  },
  certifications: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  externalExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  projectExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = CareerInfo;
