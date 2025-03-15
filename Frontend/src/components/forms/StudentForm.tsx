import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Professor, StudentSettings } from '../../api/types/userSettings';

interface StudentFormProps {
  formData: StudentSettings;  
  professors: Professor[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdvisorChange: (event: any, newValue: Professor | null) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ formData, professors, onChange, onAdvisorChange }) => {
  return (
    <>
      {/* ✅ 지도 교수 선택 */}
      <Autocomplete
        options={professors}
        getOptionLabel={(option) => option.name} // ✅ 교수의 이름을 표시
        value={professors.find((prof) => prof.id === formData.advisorProfessorId) || null}
        onChange={(event, newValue) => onAdvisorChange(event, newValue)}
        renderInput={(params) => (
          <TextField {...params} label="지도 교수" variant="outlined" fullWidth required />
        )}
      />

      {/* ✅ 학번 입력 */}
      <TextField
        name="studentId"
        label="학번"
        variant="outlined"
        fullWidth
        required
        value={formData.studentId}
        onChange={onChange}
      />
    </>
  );
};

export default StudentForm;