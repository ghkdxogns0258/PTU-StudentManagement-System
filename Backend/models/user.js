const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ Sequelize 인스턴스 가져오기

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uniqueId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  oauthId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userType: {
    type: DataTypes.ENUM('student', 'professor'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true // ✅ createdAt, updatedAt 자동 추가
});

// ✅ User 모델 내보내기
module.exports = User;
