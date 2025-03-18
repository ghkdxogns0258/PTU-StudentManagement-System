const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const University = sequelize.define('University', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = University;
