const sequelize = require('../config/db'); // ✅ DB 인스턴스 가져오기

// ✅ 모든 모델 불러오기
const User = require('./user');
const University = require('./university');
const Student = require('./student');
const Professor = require('./professor');
const CareerInfo = require('./careerInfo');
const AdvisorStudent = require('./advisorStudent');
const Grade = require('./grade');
const Subject = require('./subject');
const CompletedCredit = require('./completedCredit');

// ✅ 모든 모델을 `db` 객체로 통합
const db = {
  sequelize,
  User,
  University,
  Student,
  Professor,
  CareerInfo,
  AdvisorStudent,
  Grade,
  Subject,
  CompletedCredit,
};

// ✅ 관계 설정 (Associations)
User.hasOne(Student, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Professor, { foreignKey: 'userId', onDelete: 'CASCADE' });

University.hasMany(Student, { foreignKey: 'universityId', onDelete: 'SET NULL' });
University.hasMany(Professor, { foreignKey: 'universityId', onDelete: 'SET NULL' });

Student.hasOne(CareerInfo, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Student.hasOne(CompletedCredit, { foreignKey: 'studentId', onDelete: 'CASCADE' });

Professor.belongsToMany(Student, { through: AdvisorStudent, foreignKey: 'professorId' });
Student.belongsToMany(Professor, { through: AdvisorStudent, foreignKey: 'studentId' });

Student.hasMany(Grade, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Student.hasMany(Subject, { foreignKey: 'studentId', onDelete: 'CASCADE' });

// ✅ 모델과 관계를 동기화하는 `associate` 실행
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

// ✅ `db` 객체 내보내기
module.exports = db;
