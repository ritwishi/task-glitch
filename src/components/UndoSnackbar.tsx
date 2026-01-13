import { Snackbar, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onUndo: () => void;
}

export default function UndoSnackbar({ open, onClose, onUndo }: Props) {
  const handleClose = (event: Event | React.SyntheticEvent, reason?: string) => {
    
    onClose();
    
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message="Task deleted"
      action={
        <Button 
          color="inherit" 
          size="small" 
          onClick={() => {
            onUndo();  
            onClose(); 
          }}
        >
          Undo
        </Button>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
}


