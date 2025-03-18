require('dotenv').config({path: './config/.env'});
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const apiDocs = require('./docs/apiDocs');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 미들웨어 설정
app.use(cors());
app.use(express.json());

// ✅ API 문서 라우트 추가
app.use('/api-docs', apiDocs);

// ✅ 기본 라우트 추가
app.get("/", (req, res) => {
  res.send("Welcome to the Counseling System API");
});

// ✅ Jest 테스트를 위한 `app` 내보내기
module.exports = app;
