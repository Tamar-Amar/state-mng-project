import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useStates, useDeleteState} from '../../hooks/useStates';
import { Button } from '@mui/material';
import { State } from '../../types/State';
import { useRecoilState } from 'recoil';
import { editingStateAtom } from '../../store/stateAtoms';
import { useNavigate } from 'react-router-dom';


const StatesTable: React.FC = () => {
  const { data: states} = useStates();
  const [quickFilterText, setQuickFilterText] = useState('');
  const deleteMutation = useDeleteState();
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom); 
  const navigate = useNavigate();
  




  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('State deleted successfully!');
        },
        onError: () => {
          alert('State deletion failed.');
        },
      });
    }
  };

  const handleEdit = (state: State) => {
    setEditingStateName(state.name);
    navigate(`/state-form/${state._id}`); 
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
              marginTop : '4%',
              height: '26px',
              borderRadius: '4px',
              fontSize: '12px',
              textTransform: 'uppercase',
              fontWeight: '500',
            }
            }
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.data)}
            >
              edit
            </Button>
            <Button
              style={{
                width: '25%',
                marginTop : '4%',
                height: '26px',
                borderRadius: '4px',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: '500',
              }
              }
              color='error'
              variant="outlined"
              onClick={() => handleDelete(params.data._id)}
            >
              delete
            </Button>
          </div>
        ),
      }
    ],
    []
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      marginTop: '3%', 
      marginLeft:"10%", 
      marginRight:"10%" }}>
      <input
        type="text"
        placeholder="Quick search"
        onChange={(e) => setQuickFilterText(e.target.value)}
        style={{ 
          marginBottom: '25px', 
          padding: '8px', 
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <div className="ag-theme-alpine rtl" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={states}
          columnDefs={columnDefs}
          modules={[ClientSideRowModelModule]}
          pagination={true}
          quickFilterText={quickFilterText}
          paginationPageSize={40}
        />

      </div>
    </div>
  );
};

export default StatesTable;
