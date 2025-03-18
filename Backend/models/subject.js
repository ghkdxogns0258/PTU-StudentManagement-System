const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: { model: Student, key: 'userId' }
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subjectType: {
    type: DataTypes.ENUM('major_required', 'major_elective', 'general_education', 'p_credit'),
    allowNull: false
  },
  credit: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Subject;
