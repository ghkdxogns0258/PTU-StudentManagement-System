const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const University = require('./university');

const Professor = sequelize.define('Professor', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: 'id' }
  },
  professorNumber: {
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
  position: {
    type: DataTypes.STRING,
    allowNull: true
  },
  office: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Professor;
