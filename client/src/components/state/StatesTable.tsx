import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useStates, useDeleteState } from '../../hooks/useStates';
import { useAddCity, useCities, useDeleteCity } from '../../hooks/useCities';
import { Button, Snackbar, Alert } from '@mui/material';
import { State } from '../../types/State';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editingStateAtom } from '../../store/stateAtoms';
import { userAtom } from '../../store/userAtom';
import { useNavigate } from 'react-router-dom';
import CityDrawer from '../cities/CityDrawer';
import '../../styles/_statesTable.scss';
import LocationCityIcon from '@mui/icons-material/LocationCity'; 

const StatesTable: React.FC = () => {
  const { data: states, isLoading, isError } = useStates();
  const [quickFilterText, setQuickFilterText] = useState("");
  const { data: allCities = [] } = useCities(); 
  const deleteStateMutation = useDeleteState();
  const deleteCityMutation = useDeleteCity();
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null); 
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const addCityMutation = useAddCity();


  const handleSnackbarClose = () => setSnackbarMessage(null);

  const handleDeleteState = (id: string) => {
    if (user?.permissions?.canDelete) {
      if (window.confirm('Are you sure you want to delete this state?')) {
        deleteStateMutation.mutate(id, {
          onSuccess: () => alert('State deleted successfully!'),
          onError: () => alert('State deletion failed.'),
        });
      }
    } else {
      setSnackbarMessage('You don’t have permission to delete this state. Please contact the system administrator.');
    }
  };

  const handleDeleteCity = (cityId: string) => {
    console.log('Delete city,ת: ' , cityId);
    if (!selectedState) return;
    if (user?.permissions?.canDelete) {
      if (window.confirm('Are you sure you want to delete this city?')) {
        deleteCityMutation.mutate(cityId, {
          onSuccess: () => {
            setSelectedState((prevState) =>
              prevState
                ? { ...prevState, cities: (prevState.cities?? []).filter((city) => city._id !== cityId) }
                : null
            );
          },
        });
      }
    } else {
      setSnackbarMessage('You don’t have permission to delete this city.');
    }
  };

  const handleEditState = (state: State) => {
    console.log("state: " , state);
    if (user?.permissions?.canUpdate) {
      setEditingStateName(state.name);
      navigate(`/state-form/${state._id}`);
    } else {
      setSnackbarMessage('You don’t have permission to edit this state. Please contact the system administrator.');
    }
  };

  const handleViewCities = (state: State) => {
    setSelectedState(state);
    setDrawerOpen(true);
  };

  const handleAddCity = (cityName: string) => {
    if (!selectedState || !cityName.trim()) return;
  
    addCityMutation.mutate(
      { cityName, stateId: selectedState._id || " " },
      {
        onSuccess: (newCity) => {
          setSelectedState((prevState) =>
            prevState
              ? { ...prevState, cities: [...(prevState.cities?? []), newCity] }
              : null
          );
        },
      }
    );
  };

  const columnDefs = useMemo(() => [
    {
      headerName: 'Flag',
      field: 'flag',
      flex: 1, 
      minWidth: 100, 
      cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
      cellRenderer: (params: any) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '2px' }}
        />
      ),
    },
    { headerName: 'Country Name', field: 'name', flex: 2, minWidth: 150 },
    { headerName: 'Region', field: 'region', flex: 1, minWidth: 100 },
    { headerName: 'Population', field: 'population', flex: 1, minWidth: 100 },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 3,
      minWidth: 340,
      cellRendererFramework: (params: any) => (
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
          <Button variant="outlined" color="primary" onClick={() => handleEditState(params.data)}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => handleDeleteState(params.data._id)}>Delete</Button>
          <Button
            sx={{
              height: '40px',
              borderRadius: '6px', 
              fontSize: '12px', 
              backgroundColor: '#FFBC21', 
              color: 'white', 
              '&:hover': {
                backgroundColor: '#1565C0', 
              },
            }}
            variant="contained"
            startIcon={<LocationCityIcon />} 
            onClick={() => handleViewCities(params.data)}
          >
            View Cities
          </Button>
        </div>
      ),
    },
  ], [user]);
  

  return (
    <div className="states-table-container">
      <input
        type="text"
        placeholder="Quick search"
        onChange={(e) => setQuickFilterText(e.target.value)}
      />
      <div className="ag-theme-alpine rtl">
        <AgGridReact
          rowData={states}
          columnDefs={columnDefs}
          modules={[ClientSideRowModelModule]}
          pagination={true}
          quickFilterText={quickFilterText}
          paginationPageSize={40}
          rowHeight={70}
          defaultColDef={{
            cellStyle: { display: 'flex', alignItems: 'center' }, 
          }}
        />
      </div>

      <CityDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cities={selectedState?.cities || []}
        onDelete={handleDeleteCity}
        onAdd={handleAddCity}
      />

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" onClose={handleSnackbarClose} sx={{ fontSize: '1rem', mt: '70%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StatesTable;
