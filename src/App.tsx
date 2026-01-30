import { Button, Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Vite + React + Material UI</h1>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
        Outlined Button 
      </Button>
    </Box>
  );
}

export default App;