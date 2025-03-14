const { sequelize, DataTypes } = require('../config/db'); // db.js에서 연결 가져오기

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // createdAt, updatedAt 자동 추가
});

module.exports = User;
