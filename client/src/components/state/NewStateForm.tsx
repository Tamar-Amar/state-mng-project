import React, { useState } from 'react';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useAddState, useRestoreState } from '../../hooks/useStates';
import { stateCreateValidationSchema } from '../../types/StateValidation';
import { AddStateResponse, State } from '../../types/State';
import { useNavigate } from 'react-router-dom';
import { useCreateRegionWithRecoil, useRegionsWithRecoil } from '../../hooks/useRegions';
import axios from 'axios';

const NewStateForm: React.FC = () => {
  const navigate = useNavigate();
  const addMutation = useAddState();
  const { regions } = useRegionsWithRecoil();
  const [newRegion, setNewRegion] = useState<string>('');
  const createRegionMutation = useCreateRegionWithRecoil();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [existingState, setExistingState] = useState<State | null>(null);
const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

const restoreMutation = useRestoreState();

const handleRestore = async () => {
  if (existingState) {
    restoreMutation.mutate(existingState._id!, {
      onSuccess: () => {
        alert('State restored successfully!');
        setExistingState(null);
        setRestoreDialogOpen(false);
        navigate('/');
      },
      onError: () => {
        alert('Failed to restore state.');
      },
    });
  }
};

  const confirmCancel = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  const formik = useFormik<State>({
    initialValues: {
      name: '',
      flag: '',
      population: 0,
      region: '',
      isActive: true,
    },
    validationSchema: stateCreateValidationSchema(),
    onSubmit: (values) => {
      addMutation.mutate(values, {
        onSuccess: (data) => {
          if (data.message?.includes('Would you like to restore')) {
            setExistingState(data.state!);
            setRestoreDialogOpen(true);
          } else {
            alert('State added successfully!');
            navigate('/states-list');
          }
        },
        onError: () => {
          alert('Failed to add state.');
        },
      });
    },
  });

  const handleAddRegion = () => {
    if (newRegion) {
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
    }
  };

  const handleCancel = () => {
    if (formik.dirty) {
      setShowConfirmation(true);
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New State
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
            Add State
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

      <Dialog open={restoreDialogOpen} onClose={() => setRestoreDialogOpen(false)}>
        <DialogTitle>State Already Exists</DialogTitle>
        <DialogContent>
          <Typography>
            The state "{existingState?.name}" already exists but is marked as deleted.
            Would you like to restore it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestoreDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRestore} color="secondary">
            Restore State
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default NewStateForm;
