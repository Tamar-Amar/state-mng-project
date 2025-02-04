import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useStates, useDeleteState } from '../../hooks/useStates';
import { Button, Snackbar, Alert } from '@mui/material';
import { State } from '../../types/State';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editingStateAtom } from '../../store/stateAtoms';
import { userAtom } from '../../store/userAtom';
import { useNavigate } from 'react-router-dom';
import '../../styles/_statesTable.scss';

const StatesTable: React.FC = () => {
  const { data: states, isLoading, isError } = useStates();
  const [quickFilterText, setQuickFilterText] = useState('');
  const deleteMutation = useDeleteState();
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleSnackbarClose = () => setSnackbarMessage(null);

  const handleDelete = (id: string) => {
    if (user?.permissions.canDelete) {
      if (window.confirm('Are you sure you want to delete this state?')) {
        deleteMutation.mutate(id, {
          onSuccess: () => alert('State deleted successfully!'),
          onError: () => alert('State deletion failed.'),
        });
      }
    } else {
      setSnackbarMessage('You don’t have permission to delete this state. Please contact the system administrator.');
    }
  };

  const handleEdit = (state: State) => {
    if (user?.permissions.canUpdate) {
      setEditingStateName(state.name);
      navigate(`/state-form/${state._id}`);
    } else {
      setSnackbarMessage('You don’t have permission to edit this state. Please contact the system administrator.');
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Flag',
        field: 'flag',
        cellRenderer: (params: any) => (
          <img
            src={params.value}
            alt="flag"
            style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ),
        width: 120,
      },
      { headerName: 'Country Name', field: 'name', sortable: true, filter: true },
      { headerName: 'Region', field: 'region', sortable: true, filter: true },
      { headerName: 'Population', field: 'population', sortable: true, filter: true },
      {
        headerName: 'Actions',
        cellRendererFramework: (params: any) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              style={{
                width: '25%',
                height: '26px',
                borderRadius: '4px',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: '500',
                backgroundColor: user?.permissions.canUpdate ? 'primary.main' : '#e0e0e0',
                color: user?.permissions.canUpdate ? 'black' : '#757575',
                cursor: user?.permissions.canUpdate ? 'pointer' : 'not-allowed',
              }}
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.data)}
            >
              Edit
            </Button>
            <Button
              style={{
                width: '25%',
                height: '26px',
                borderRadius: '4px',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: '500',
                backgroundColor: user?.permissions.canDelete ? 'error.main' : '#e0e0e0',
                color: user?.permissions.canDelete ? 'black' : 'red',
                cursor: user?.permissions.canDelete ? 'pointer' : 'not-allowed',
              }}
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.data._id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [user]
  );

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
        />
      </div>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" onClose={handleSnackbarClose} sx={{ fontSize: '1rem', mt:'70%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StatesTable;
