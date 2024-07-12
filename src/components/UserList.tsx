import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import CustomButton from './CustomButton';

export interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Robert Brown' },
];

const UserList: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
  };

  return isAuthenticated ? (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Autocomplete
        id="searchfield"
        options={users}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Search users" variant="filled" />
        )}
        sx={{ width: 300, bgcolor: 'background.paper' }}
      />
      <CustomButton onClick={handleLogout}>Logout</CustomButton>
    </Box>
  ) : null;
};

export default UserList;
