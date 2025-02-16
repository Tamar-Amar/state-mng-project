import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { City } from '../../types/City';

interface CityDrawerProps {
  open: boolean;
  onClose: () => void;
  cities: City[];
  onDelete: (cityId: string) => void;
  onAdd: () => void;
}



const CityDrawer: React.FC<CityDrawerProps> = ({ open, onClose, cities, onDelete, onAdd }) => {
  console.log("cities by state", cities);
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 , mt:10}}>
        <Typography variant="h6" gutterBottom>
          Cities in State
        </Typography>

        <List>
          {cities.length > 0 ? (
            cities.map((city) => (
              <ListItem key={city._id} secondaryAction={
                <IconButton edge="end" color="error" onClick={() => onDelete(city._id || '')}>
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          onClick={onAdd}
        >
          Add City
        </Button>

        <Button variant="outlined" fullWidth onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Drawer>
  );
};

export default CityDrawer;
