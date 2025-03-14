const app = require('./app'); // ✅ app.js에서 Express 불러오기
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 API Docs available at http://localhost:${PORT}/api-docs`);
});

// ✅ Jest 테스트 실행 후 서버 종료 가능하도록 `server` 내보내기
module.exports = server;
