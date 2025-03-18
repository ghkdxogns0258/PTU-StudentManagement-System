const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const University = require('./university');

const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: 'id' }
  },
  studentNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  universityId: {
    type: DataTypes.INTEGER,
    references: { model: University, key: 'id' }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Student;
