import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      fullWidth={true}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
