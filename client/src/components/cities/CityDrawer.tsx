import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { City } from '../../types/City';
import { State } from '../../types';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/userAtom';

interface CityDrawerProps {
  open: boolean;
  onClose: () => void;
  cities: City[];
  onDelete: (cityId: string) => void;
  onAdd: (cityName: string) => void;
  selectedState: State | null;
}

const CityDrawer: React.FC<CityDrawerProps> = ({ open, onClose, cities, onDelete, onAdd, selectedState }) => {
  const [newCityName, setNewCityName] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const user = useRecoilValue(userAtom); 

  const handleAddCity = () => {
    if (!user?.permissions?.canAdd) {
      setSnackbarMessage("You don’t have permission to add a city.");
      return;
    }
    if (newCityName.trim()) {
      onAdd(newCityName);
      setNewCityName(""); 
    }
  };

  const handleDeleteCity = (cityId: string) => {
    if (!user?.permissions?.canDelete) {
      setSnackbarMessage("You don’t have permission to delete a city.");
      return;
    }
    onDelete(cityId);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2, mt: 10 }}>
        {selectedState && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <img src={selectedState.flag} alt={`${selectedState.name} flag`} style={{ width: 150, height: 100, borderRadius: 2 }} />
          </Box>
        )}

        <Typography variant="h6" gutterBottom>
          Cities in {selectedState?.name}
        </Typography>

        <List>
          {cities.length > 0 ? (
            cities.map((city) => (
              <ListItem key={city._id} secondaryAction={
                <IconButton 
                  edge="end" 
                  color="error" 
                  onClick={() => handleDeleteCity(city._id || '')} 
                  disabled={!user?.permissions?.canDelete} 
                >
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={city.cityName} />
              </ListItem>
            ))
          ) : (
            <Typography color="textSecondary">No cities available.</Typography>
          )}
        </List>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="City Name"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            disabled={!user?.permissions?.canAdd}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddCity} 
            disabled={!user?.permissions?.canAdd}
          >
            <AddIcon />
          </Button>
        </Box>

        <Button variant="outlined" fullWidth onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>

        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={3000}
          onClose={() => setSnackbarMessage(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="warning" onClose={() => setSnackbarMessage(null)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Drawer>
  );
};

export default CityDrawer;
