import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { setNestedObjectValues, useFormik } from 'formik';
import { stateCreateValidationSchema, stateEditValidationSchema } from '../types/StateValidation';
import { useAddState, useUpdateState } from '../hooks/useStates';
import { useCreateRegionWithRecoil, useRegionsWithRecoil } from '../hooks/useRegions';
import { useQueryClient } from 'react-query';
import { State } from '../types/State';
import { editingStateAtom } from '../store/stateAtoms';
import { useRecoilState } from 'recoil';

const StateForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { regions } = useRegionsWithRecoil();
  const queryClient = useQueryClient();
  const addMutation = useAddState();
  const updateMutation = useUpdateState();
  const [newRegion, setNewRegion] = useState<string>('');
  const createRegionMutation = useCreateRegionWithRecoil();
  const stateToEdit = id ? queryClient.getQueryData<State[]>('states')?.find((state) => state._id === id) : null;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom); 
  const isEditMode = !!id;
  
  const confirmCancel = () => {
    setShowConfirmation(false);
    if (isEditMode) {
        setEditingStateName(null);
    }
    navigate('/');
  };

  const handleCancel = () => {
    if (formik.dirty) {
      setShowConfirmation(true);
    } else {
        if (isEditMode) {
            setEditingStateName(null);
        }
      navigate('/');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: stateToEdit?.name || '',
      flag: stateToEdit?.flag || '',
      population: stateToEdit?.population || 0,
      region: stateToEdit?.region || '',
      isActive: stateToEdit?.isActive || true,
    },
    validationSchema: isEditMode
      ? stateEditValidationSchema()
      : stateCreateValidationSchema(),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isEditMode) {
        updateMutation.mutate(
          { ...values, _id: id},
          {
            onSuccess: () => {
              alert('State updated successfully!');
              navigate('/');
            },
            onError: () => {
              alert('Failed to update state.');
            },
          }
        );
      } else {
        addMutation.mutate(values, {
          onSuccess: () => {
            alert('State added successfully!');
            navigate('/');
          },
          onError: () => {
            alert('Failed to add state.');
          },
        });
      }
    },
  });

  const handleAddRegion = () => {
    if (newRegion && /^[a-zA-Z\s]+$/.test(newRegion)) {
      createRegionMutation.mutate(newRegion, {
        onSuccess: () => {
          alert(`Region "${newRegion}" added successfully!`);
          formik.setFieldValue('region', newRegion);
          setNewRegion('');
        },
        onError: () => {
          alert('Failed to add region.');
        },
      });
    } else {
      alert('Invalid region name. Please use only letters and spaces.');
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? `Edit State: ${stateToEdit?.name || ''}` : 'Add New State'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="State Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          disabled={isEditMode} // שם המדינה לא ניתן לעריכה
        />
        <TextField
          fullWidth
          label="Flag URL"
          name="flag"
          value={formik.values.flag}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          error={formik.touched.flag && Boolean(formik.errors.flag)}
          helperText={formik.touched.flag && formik.errors.flag}
        />
        <TextField
          fullWidth
          label="Population"
          name="population"
          type="number"
          value={formik.values.population}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          error={formik.touched.population && Boolean(formik.errors.population)}
          helperText={formik.touched.population && formik.errors.population}
        />
<Autocomplete
            options={regions}
            freeSolo
            value={formik.values.region || ''}
            onChange={(event, value) => {
              formik.setFieldValue('region', value);
              setNewRegion(value || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Region"
                name="region"
                margin="dense"
                error={formik.touched.region && Boolean(formik.errors.region)}
                helperText={formik.touched.region && formik.errors.region}
              />
            )}
            onInputChange={(event, value) => {
              formik.setFieldValue('region', value);
              setNewRegion(value);
            }}
          />
          {newRegion && !regions.includes(newRegion) && (
            <Box mt={2}>
              <Typography color="error">Region not found. Add it?</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddRegion}
                style={{ marginTop: '8px' }}
              >
                Add "{newRegion}" as a new region
              </Button>
            </Box>
          )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={!formik.dirty || !formik.isValid}>
            {isEditMode ? 'Update State' : 'Add State'}
          </Button>
        </Box>
      </form>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to discard them and exit?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="primary">
            Stay
          </Button>
          <Button onClick={confirmCancel} color="secondary">
            Discard and Exit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StateForm;
