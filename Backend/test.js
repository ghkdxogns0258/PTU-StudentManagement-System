console.log("✅ Node.js 실행 테스트");

const request = require('supertest');
const server = require('./server');

describe('API 엔드포인트 테스트', () => {
    // ✅ 학생 정보 조회 테스트
    it('GET /api/students/:id - 학생 정보를 정상적으로 조회해야 함', async () => {
        const response = await request(server).get('/api/students/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('student_id');
        expect(response.body).toHaveProperty('name');
    });

    // ✅ 학점 조회 테스트
    it('GET /api/grades/:student_number - 학점 정보를 정상적으로 조회해야 함', async () => {
        const response = await request(server).get('/api/grades/20231234');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // ✅ 이수 학점 조회 테스트
    it('GET /api/completed_credits/:student_number - 이수 학점 정보를 정상적으로 조회해야 함', async () => {
        const response = await request(server).get('/api/completed_credits/20231234');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // ✅ 테스트 종료 후 서버 닫기
    afterAll((done) => {
        server.close(done);
    });
});
