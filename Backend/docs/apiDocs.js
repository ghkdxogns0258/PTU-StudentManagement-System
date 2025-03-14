const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// ✅ Swagger 옵션 설정
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Counseling API",
            version: "1.0.0",
            description: "교수-학생 상담 시스템 API 문서",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: [path.join(__dirname, "./apiDocs.js")], // ✅ API 문서화 대상 파일 지정
};

// ✅ Swagger 문서 생성
const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
/**
 * @openapi
 * /auth/kakao:
 *   post:
 *     summary: 카카오 인가코드로 로그인하고 JWT 토큰 발급
 *     description: 프론트엔드에서 전달한 카카오 인가코드(code)를 사용하여 카카오 서버에서 액세스 토큰을 요청하고, 사용자 정보를 받아 JWT 토큰을 발급합니다. 신규 유저인 경우 프론트엔드에서 회원가입 절차를 진행할 수 있도록 isNewUser 값을 반환합니다.
 *     tags:
 *       - 로그인 / 인증
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: 카카오에서 발급받은 인가 코드
 *                 example: QWERTYUIOP1234567890
 *     responses:
 *       200:
 *         description: JWT 발급 및 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: 로그인 후 발급된 JWT 토큰
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 isNewUser:
 *                   type: boolean
 *                   description: 신규 유저 여부 (회원가입 추가 정보 필요 여부)
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       description: 사용자 시스템 고유 ID
 *                       example: 123
 *                     role:
 *                       type: string
 *                       description: 사용자 역할
 *                       example: student
 *       400:
 *         description: 잘못된 요청(인가 코드 오류 또는 카카오 서버 응답 실패)
 *       500:
 *         description: 서버 내부 오류
 */
/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: 로그인한 사용자 정보 및 역할 반환
 *     description: JWT 토큰을 검증하여 로그인한 사용자의 정보를 반환합니다.
 *     tags:
 *       - 로그인 / 인증
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: 사용자 시스템 고유 ID
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: 사용자 이름
 *                   example: 황태훈
 *                 role:
 *                   type: string
 *                   description: 사용자 역할 (student / professor)
 *                   example: student
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 */

/**
 * @openapi
 * /universities:
 *   get:
 *     summary: 대학 목록 조회
 *     tags:
 *       - User Settings
 *     responses:
 *       200:
 *         description: 성공적으로 대학 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 서울대학교
 */

/**
 * @openapi
 * /universities/{id}/professors:
 *   get:
 *     summary: 선택한 대학의 교수 목록 조회
 *     tags:
 *       - User Settings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 대학의 고유 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공적으로 교수 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: P-0001
 *                   name:
 *                     type: string
 *                     example: 김교수
 *                   position:
 *                     type: string
 *                     example: 조교수
 */

/**
 * @openapi
 * /users/settings:
 *   put:
 *     summary: 유저 추가 정보 저장 및 수정 (역할 기반 폼)
 *     tags:
 *       - User Settings
 *     description: 사용자 역할에 따라 폼이 달라지며, 저장 및 수정 시 역할에 맞는 정보를 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/ProfessorSettings'
 *               - $ref: '#/components/schemas/StudentSettings'
 *     responses:
 *       200:
 *         description: 사용자 세팅이 성공적으로 저장되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User settings updated successfully
 *       400:
 *         description: 잘못된 요청입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed
 *                 details:
 *                   type: object
 *                   example:
 *                     studentId: 학번은 필수입니다.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ProfessorSettings:
 *       type: object
 *       required:
 *         - role
 *         - universityId
 *         - name
 *         - professorId
 *         - position
 *       properties:
 *         role:
 *           type: string
 *           enum: [professor]
 *           example: professor
 *         universityId:
 *           type: integer
 *           description: 소속 대학의 ID
 *           example: 1
 *         name:
 *           type: string
 *           description: 교수 이름
 *           example: 홍길동
 *         professorId:
 *           type: string
 *           description: 교수 번호
 *           example: P-0001
 *         position:
 *           type: string
 *           description: 교수 직급
 *           example: 조교수
 *         
 *     StudentSettings:
 *       type: object
 *       required:
 *         - role
 *         - universityId
 *         - name
 *         - advisorProfessorId
 *         - studentId
 *       properties:
 *         role:
 *           type: string
 *           enum: [student]
 *           example: student
 *         universityId:
 *           type: integer
 *           description: 소속 대학의 ID
 *           example: 1
 *         name:
 *           type: string
 *           description: 학생 이름
 *           example: 김학생
 *         advisorProfessorId:
 *           type: string
 *           description: 지도 교수 ID
 *           example: P-0001
 *         studentId:
 *           type: string
 *           description: 학번
 *           example: 20230001
 */
/**
 * @openapi
 * /client-data/basic:
 *   get:
 *     summary: 기본 정보 조회
 *     tags:
 *       - Client Page
 *     responses:
 *       200:
 *         description: 기본 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grade:
 *                   type: string
 *                   example: 3학년
 *                 major:
 *                   type: string
 *                   example: 컴퓨터공학과
 *                 phoneNumber:
 *                   type: string
 *                   example: 010-1234-5678
 */

/**
 * @openapi
 * /client-data/basic:
 *   put:
 *     summary: 기본 정보 수정
 *     tags:
 *       - Client Page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: string
 *                 example: 3학년
 *               major:
 *                 type: string
 *                 example: 컴퓨터공학과
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *     responses:
 *       200:
 *         description: 기본 정보가 성공적으로 수정되었습니다.
 */

/**
 * @openapi
 * /client-data/grades:
 *   get:
 *     summary: 특정 학기의 과목별 성적 조회
 *     tags:
 *       - Client Page
 *     parameters:
 *       - in: query
 *         name: semester
 *         required: true
 *         description: "조회할 학기명 (예: 1학년 1학기)"
 *         schema:
 *           type: string
 *         example: 1학년 1학기
 *     responses:
 *       200:
 *         description: 특정 학기의 성적 데이터를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   area:
 *                     type: string
 *                     example: 전공필수
 *                   subjectName:
 *                     type: string
 *                     example: 자료구조
 *                   grade:
 *                     type: string
 *                     example: A+
 */

/**
 * @openapi
 * /client-data/grades:
 *   put:
 *     summary: 특정 학기의 과목별 성적 수정
 *     tags:
 *       - Client Page
 *     parameters:
 *       - in: query
 *         name: semester
 *         required: true
 *         description: "수정할 학기명 (예: 1학년 1학기)"
 *         schema:
 *           type: string
 *         example: 1학년 1학기
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 area:
 *                   type: string
 *                   example: 전공필수
 *                 subjectName:
 *                   type: string
 *                   example: 자료구조
 *                 grade:
 *                   type: string
 *                   example: A+
 *     responses:
 *       200:
 *         description: 성적이 성공적으로 수정되었습니다.
 */

/**
 * @openapi
 * /client-data/career:
 *   get:
 *     summary: 진로 정보 조회
 *     tags:
 *       - Client Page
 *     responses:
 *       200:
 *         description: 진로 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 desiredJob:
 *                   type: string
 *                   example: 백엔드 개발자
 *                 certifications:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["정보처리기사", "AWS Certified Solutions Architect"]
 *                 internships:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["네이버 인턴십", "카카오 인턴십"]
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["캡스톤 디자인 프로젝트", "AI 챗봇 개발"]
 */

/**
 * @openapi
 * /client-data/career:
 *   put:
 *     summary: 진로 정보 수정
 *     tags:
 *       - Client Page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desiredJob:
 *                 type: string
 *                 example: 백엔드 개발자
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["정보처리기사"]
 *               internships:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["카카오 인턴십"]
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AI 챗봇 개발"]
 *     responses:
 *       200:
 *         description: 진로 정보가 성공적으로 수정되었습니다.
 */

/**
 * @openapi
 * /client-data/counseling:
 *   get:
 *     summary: 교수 상담 기록 조회
 *     tags:
 *       - Client Page
 *     responses:
 *       200:
 *         description: 상담 기록 데이터를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2024-03-01
 *                   title:
 *                     type: string
 *                     example: 학업 상담
 *                   memo:
 *                     type: string
 *                     example: 전공 수업 수강 계획 상담 진행
 */

/**
 * @openapi
 * /counseling-request:
 *   post:
 *     summary: 상담 요청 등록
 *     tags:
 *       - Client Page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 졸업 요건 상담 요청
 *               memo:
 *                 type: string
 *                 example: 졸업 논문에 대해 상담하고 싶습니다.
 *     responses:
 *       200:
 *         description: 상담 요청이 성공적으로 등록되었습니다.
 */
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /dashboard/widgets-config:
 *   get:
 *     summary: 교수 대시보드 위젯 배치 조회
 *     description: 교수별 저장된 위젯 배치 정보를 조회합니다. 크기는 클라이언트에서 고정 처리합니다.
 *     tags:
 *       - Dashboard (Professor)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 위젯 배치 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 widgets:
 *                   type: array
 *                   description: 교수별 위젯 배치 정보 목록입니다.
 *                   items:
 *                     type: object
 *                     properties:
 *                       widgetId:
 *                         type: string
 *                         example: profileCard
 *                       position:
 *                         type: object
 *                         description: 위젯의 배치 좌표입니다.
 *                         properties:
 *                           x:
 *                             type: number
 *                             example: 0
 *                           y:
 *                             type: number
 *                             example: 0
 *                       order:
 *                         type: integer
 *                         description: 위젯의 렌더링 순서입니다.
 *                         example: 1
 */
/**
 * @openapi
 * /dashboard/widgets-config:
 *   put:
 *     summary: 교수 대시보드 위젯 배치 저장
 *     description: 교수별 위젯의 위치와 순서를 저장합니다. 위젯 크기는 클라이언트에서 고정 처리합니다.
 *     tags:
 *       - Dashboard (Professor)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               widgets:
 *                 type: array
 *                 description: 저장할 위젯 리스트입니다.
 *                 items:
 *                   type: object
 *                   properties:
 *                     widgetId:
 *                       type: string
 *                       example: profileCard
 *                     position:
 *                       type: object
 *                       description: 위젯의 배치 좌표입니다.
 *                       properties:
 *                         x:
 *                           type: number
 *                           example: 0
 *                         y:
 *                           type: number
 *                           example: 0
 *                     order:
 *                       type: integer
 *                       description: 위젯 렌더링 순서입니다.
 *                       example: 1
 *     responses:
 *       200:
 *         description: 위젯 배치 저장 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 위젯 배치가 성공적으로 저장되었습니다.
 */

/**
 * @openapi
 * /dashboard/widgets-data:
 *   get:
 *     summary: 현재 학생의 전체 위젯 데이터 조회
 *     description: 현재 교수의 관리 학생 중 한 명의 정보를 바탕으로 전체 위젯 데이터를 반환합니다.
 *     tags:
 *       - Dashboard (Professor)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 학생 기반 전체 위젯 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentInfo:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                       example: 2021145086
 *                     name:
 *                       type: string
 *                       example: 황태훈
 *                     grade:
 *                       type: string
 *                       example: 3학년
 *                     studentNumber:
 *                       type: string
 *                       example: 2021145086
 *                     major:
 *                       type: string
 *                       example: 컴퓨터공학과
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       projectName:
 *                         type: string
 *                         example: React 기반 웹 프론트엔드 개발
 *                       description:
 *                         type: string
 *                         example: 웹 플랫폼 프론트엔드 개발
 *                       techStack:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [React, TypeScript]
 *                       duration:
 *                         type: string
 *                         example: 2023-01 ~ 2023-06
 *                 desiredJobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       jobTitle:
 *                         type: string
 *                         example: 백엔드 개발자
 *                       stackPreference:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [Node.js, Spring]
 *                 gradesTrend:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       semesterName:
 *                         type: string
 *                         example: 1학년 1학기
 *                       gpa:
 *                         type: number
 *                         example: 4.0
 *                       changeRate:
 *                         type: string
 *                         example: +0.2
 *                 semesterGrades:
 *                   type: object
 *                   properties:
 *                     semester:
 *                       type: string
 *                       example: 3학년 1학기
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subjectName:
 *                             type: string
 *                             example: 자료구조
 *                           grade:
 *                             type: string
 *                             example: A
 *                           score:
 *                             type: number
 *                             example: 4.0
 *                 graduationStatus:
 *                   type: object
 *                   properties:
 *                     totalCompletionRate:
 *                       type: integer
 *                       example: 100
 *                     requirements:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: 전공필수
 *                           completionRate:
 *                             type: integer
 *                             example: 50
 *                           earnedCredits:
 *                             type: integer
 *                             example: 30
 *                           requiredCredits:
 *                             type: integer
 *                             example: 60
 */
/**
 * @openapi
 * /students/managed:
 *   get:
 *     summary: 교수 지도학생 리스트 조회
 *     description: 현재 교수 계정이 관리 중인 전체 지도학생 목록을 반환합니다.  
 *                  학생 이름 검색과 페이지네이션을 지원합니다.
 *     tags:
 *       - 지도학생 관리 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: "조회할 페이지 번호 (기본값: 1)"
 *         example: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: "페이지당 항목 수 (기본값: 20)"
 *         example: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: "학생 이름 검색어 (학생명 기준)"
 *         example: 황태훈
 *     responses:
 *       200:
 *         description: 교수의 지도학생 리스트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   example: 50
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 students:
 *                   type: array
 *                   description: 학생 리스트 데이터
 *                   items:
 *                     type: object
 *                     properties:
 *                       studentId:
 *                         type: string
 *                         example: 2021145086
 *                       name:
 *                         type: string
 *                         example: 황태훈
 *                       riskLevel:
 *                         type: string
 *                         enum: [안전, 위험]
 *                         example: 안전
 *                       age:
 *                         type: integer
 *                         example: 24
 *                       grade:
 *                         type: integer
 *                         example: 3
 *                       gpa:
 *                         type: number
 *                         format: float
 *                         example: 3.8
 */
/**
 * @openapi
 * /students/{id}/profile:
 *   get:
 *     summary: 지도학생 기본 프로필 조회
 *     description: 교수 전용, 특정 지도학생의 기본 정보를 조회합니다.
 *     tags:
 *       - 지도학생 상세 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 학생 고유 ID
 *         schema:
 *           type: string
 *         example: 2021145086
 *     responses:
 *       200:
 *         description: 학생 기본 프로필 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grade:
 *                   type: string
 *                   example: 3학년
 *                 major:
 *                   type: string
 *                   example: 컴퓨터공학과
 *                 phoneNumber:
 *                   type: string
 *                   example: 010-1234-5678
 */
/**
 * @openapi
 * /students/{id}/grades/details:
 *   get:
 *     summary: 지도학생 특정 학기 성적 상세 조회
 *     description: 선택한 학기의 과목별 성적 정보를 조회합니다.
 *     tags:
 *       - 지도학생 상세 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 학생 고유 ID
 *         schema:
 *           type: string
 *         example: 2021145086
 *       - in: query
 *         name: semester
 *         required: true
 *         description: 조회할 학기명
 *         schema:
 *           type: string
 *         example: 3학년 1학기
 *     responses:
 *       200:
 *         description: 특정 학기 과목별 성적 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   area:
 *                     type: string
 *                     example: 전공필수
 *                   subjectName:
 *                     type: string
 *                     example: 자료구조
 *                   grade:
 *                     type: string
 *                     example: A+
 */
/**
 * @openapi
 * /students/{id}/career/details:
 *   get:
 *     summary: 지도학생 진로 및 경력 상세 조회
 *     description: 희망 직무, 자격증, 인턴십, 프로젝트 경험 정보를 조회합니다.
 *     tags:
 *       - 지도학생 상세 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 학생 고유 ID
 *         schema:
 *           type: string
 *         example: 2021145086
 *     responses:
 *       200:
 *         description: 학생 진로 및 경력 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 desiredJob:
 *                   type: string
 *                   example: 백엔드 개발자
 *                 certifications:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [ "정보처리기사", "AWS Certified Solutions Architect" ]
 *                 internships:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [ "네이버 인턴십", "카카오 인턴십" ]
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [ "캡스톤 디자인 프로젝트", "AI 챗봇 개발" ]
 */
/**
 * @openapi
 * /students/{id}/counseling/history:
 *   get:
 *     summary: 지도학생 상담 기록 전체 조회
 *     description: 해당 학생의 모든 상담 기록을 조회합니다.
 *     tags:
 *       - 지도학생 상세 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 학생 고유 ID
 *         schema:
 *           type: string
 *         example: 2021145086
 *     responses:
 *       200:
 *         description: 학생 상담 기록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2024-03-01
 *                   title:
 *                     type: string
 *                     example: 학업 상담
 *                   memo:
 *                     type: string
 *                     example: 전공 수업 수강 계획 상담 진행
 */
/**
 * @openapi
 * /students/{id}/counseling:
 *   post:
 *     summary: 지도학생 상담 기록 추가 등록
 *     description: 새로운 상담 기록을 추가합니다.
 *     tags:
 *       - 지도학생 상세 (Professor)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 학생 고유 ID
 *         schema:
 *           type: string
 *         example: 2021145086
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 졸업 요건 상담 요청
 *               memo:
 *                 type: string
 *                 example: 졸업 논문에 대해 상담하고 싶습니다.
 *     responses:
 *       200:
 *         description: 상담 기록 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 상담 기록이 성공적으로 추가되었습니다.
 */