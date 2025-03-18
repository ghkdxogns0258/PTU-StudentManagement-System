import React from 'react';
import TextField from '@mui/material/TextField';
import { ProfessorSettings } from '../../api/types/userSettings';

interface ProfessorFormProps {
  formData: ProfessorSettings;  
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ formData, onChange }) => {
  return (
    <>
      {/* ✅ 교수 번호 입력 */}
      <TextField
        name="professorId"
        label="교수 번호"
        variant="outlined"
        fullWidth
        required
        value={formData.professorId}
        onChange={onChange}
      />

      {/* ✅ 직급 입력 */}
      <TextField
        name="position"
        label="직급"
        variant="outlined"
        fullWidth
        required
        value={formData.position}
        onChange={onChange}
      />
    </>
  );
};

export default ProfessorForm;
