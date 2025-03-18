require('dotenv').config({ path: './config/.env' }); // ✅ 환경 변수 로드

const { sequelize } = require('./models'); // ✅ db.js에서 sequelize 인스턴스 가져오기

console.log('🚀 [sync.js] Sequelize 연결 시도 중...');

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ [sync.js] DB 연결 성공!');
    console.log('🔄 [sync.js] 테이블 동기화 진행 중...');

    return sequelize.sync({ alter: true }); // ✅ 테이블 변경 반영
  })
  .then(() => {
    console.log('✅ [sync.js] 모든 테이블이 성공적으로 동기화되었습니다!');
    process.exit(); // ✅ 실행 종료
  })
  .catch((err) => {
    console.error('❌ [sync.js] 데이터베이스 연결 또는 동기화 실패:', err.message);
    process.exit(1);
  });
