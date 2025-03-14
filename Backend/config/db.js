require('dotenv').config(); // ✅ 환경 변수 로드

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // 데이터베이스 이름
  process.env.DB_USER,      // 사용자명
  process.env.DB_PASSWORD,  // 비밀번호
  {
    host: process.env.DB_HOST,    // MySQL 호스트
    dialect: process.env.DB_DIALECT || 'mysql', // 데이터베이스 종류
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ MySQL 데이터베이스에 성공적으로 연결되었습니다!'))
  .catch(err => console.error('❌ 데이터베이스 연결 실패:', err.message));

module.exports = sequelize;
