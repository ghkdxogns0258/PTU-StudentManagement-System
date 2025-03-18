require('dotenv').config({ path: './config/.env' });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4', // ✅ MySQL 인코딩 설정
    },
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ MySQL 데이터베이스 연결 성공!'))
  .catch(err => console.error('❌ 데이터베이스 연결 실패:', err.message));


module.exports = sequelize;
