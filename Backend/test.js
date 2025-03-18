const request = require('supertest');
const { server, closeServer } = require('./server');
const { sequelize, Student } = require('./models');

describe('📌 API 엔드포인트 테스트 (외부 데이터 활용)', () => {
    let studentId;

    beforeAll(async () => {
        console.log("✅ 외부 DB 데이터로 테스트 진행");

        // ✅ DB에서 학생 데이터 확인
        const student = await Student.findOne({ where: { studentNumber: "20231234" } });

        if (!student) {
            console.error("❌ 테스트할 학생 데이터가 존재하지 않습니다. DB를 확인하세요.");
            return;
        }

        studentId = student.userId;
        console.log("📌 DB에서 가져온 학생 ID:", studentId);
    });

    // ✅ 학생 정보 조회 테스트
    it('GET /api/students/:id - 학생 정보를 정상적으로 조회해야 함', async () => {
        if (!studentId) {
            console.error("❌ 테스트 중단: 학생 ID가 없음");
            return;
        }

        const response = await request(server).get(`/api/students/${studentId}`);
        console.log("📌 학생 정보 응답:", response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('studentNumber');
        expect(response.body).toHaveProperty('contact');
        expect(response.body).toHaveProperty('department');
        expect(response.body).toHaveProperty('grade');        
    });

    // ✅ 학점 조회 테스트
    it('GET /api/grades/:student_number - 학점 정보를 정상적으로 조회해야 함', async () => {
        const response = await request(server).get('/api/grades/20231234');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('averageScore');
    });

    // ✅ 이수 학점 조회 테스트
    it('GET /api/completed_credits/:student_number - 이수 학점 정보를 정상적으로 조회해야 함', async () => {
        const response = await request(server).get('/api/completed_credits/20231234');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalCredits');
    });

    afterAll(async () => {
        await sequelize.close();
        await closeServer();
    });
});

