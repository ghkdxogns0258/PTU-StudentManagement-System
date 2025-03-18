import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { columns } from '../../internals/data/gridData';
import { fetchManagedStudents } from '../../api/students';
import { ManagedStudent } from '../../api/types/students';

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState<ManagedStudent[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
  });
  const [search, setSearch] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { students } = await fetchManagedStudents(1, 1000, search);
      setRows(students);
    } catch (error) {
      console.error('데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleRowClick = (params: any) => {
    const studentId = params.row.studentId;
    navigate(`/students/${studentId}`); 
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label="학생 이름 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          variant="outlined"
          size="small"
          sx={{ mr: 1 }}
        />
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.studentId}
        loading={loading}
        pagination
        paginationModel={paginationModel} 
        onPaginationModelChange={(model) => setPaginationModel(model)}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
        onRowClick={handleRowClick}
        autoHeight
      />
    </Box>
  );
}
