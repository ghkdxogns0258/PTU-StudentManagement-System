const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const userController = require('../controllers/userController');
=======
const counselingController = require('../controllers/userController');
>>>>>>> c83233d (Revert "Refactor: 상담 요청 등록 기능 삭제 및 상담 일정 등록 API 이동")
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/:id', userController.getUserById);

<<<<<<< HEAD
module.exports = router;
=======
router.post('/request', userController.createRequest);
router.get('/request/:id', userController.getRequestById);
router.put('/request/:id', userController.updateRequestStatus);
router.get('/me', authMiddleware.verifyToken, userController.getUserProfile);
router.get('/', userController.getUniversities);
router.get('/client-data/counseling', authMiddleware.verifyToken, counselingController.getCounselingHistory);

module.exports = router;
>>>>>>> c83233d (Revert "Refactor: 상담 요청 등록 기능 삭제 및 상담 일정 등록 API 이동")
