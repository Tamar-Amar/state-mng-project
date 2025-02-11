import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import { stateCreateValidationSchema, stateEditValidationSchema } from '../../types/validations/StateValidation';
import { useAddState, useUpdateState } from '../../hooks/useStates';
import { useCreateRegion, useRegions } from '../../hooks/useRegions';
import { useQueryClient } from '@tanstack/react-query';
import { State } from '../../types/State';
import { editingStateAtom } from '../../store/stateAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../store/userAtom';

const StateForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data: regions = [], isLoading, error } = useRegions();
  const queryClient = useQueryClient();
  const addMutation = useAddState();
  const updateMutation = useUpdateState();
  const [newRegion, setNewRegion] = useState<string>('');
  const createRegionMutation = useCreateRegion();
  const stateToEdit = id ? queryClient.getQueryData<State[]>(['states'])?.find((state) => state._id === id) : null;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom); 
  const isEditMode = !!id;
  const user = useRecoilValue(userAtom);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const hasPermission = id 
      ? user?.permissions?.canUpdate 
      : user?.permissions?.canAdd;

    if (!hasPermission) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [id, user, navigate]);

  const hasPermission = id 
    ? user?.permissions?.canUpdate 
    : user?.permissions?.canAdd;

  if (!hasPermission) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          You don’t have permission to {id ? 'edit' : 'add'} a state.
        </Typography>
        <Typography variant="body1">
          Redirecting you back to the home page...
        </Typography>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 2 }}>
          Go to Home Now
        </Button>
      </Box>
    );
  }

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
      cities: stateToEdit?.cities || [],
      isActive: stateToEdit?.isActive || true,
    },
    validationSchema: isEditMode
      ? stateEditValidationSchema()
      : stateCreateValidationSchema(),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isEditMode) {
        updateMutation.mutate(
          { ...values, _id: id },
          {
            onSuccess: () => {
              console.log("Success mutation triggered");
              setSnackbar({ open: true, message: 'State updated successfully!', severity: 'success' });
              setTimeout(() => {
                navigate('/');
              }, 3000);
              setEditingStateName(null)
            },
            onError: (error: any) => {
              const errorMessage = error?.response?.data?.message || 'Failed to update state.';
              console.log("Error mutation triggered:", errorMessage);
              setSnackbar({ open: true, message: errorMessage, severity: 'error' });
              setEditingStateName(null)
            },
          }
        );
      } else {
        addMutation.mutate(values, {
          onSuccess: () => {
            console.log("Success mutation triggered");
            setSnackbar({ open: true, message: 'State added successfully!', severity: 'success' });
            setTimeout(() => {
              navigate('/');
            }, 3000);
          },
          onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to add state.';
              console.log("Error mutation triggered:", errorMessage);
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
          },
        });
      }
    },
  });

  const handleAddRegion = () => {
    if (newRegion && /^[a-zA-Z\s]+$/.test(newRegion)) {
      createRegionMutation.mutate(newRegion, {
        onSuccess: () => {
          setSnackbar({ open: true, message: `Region "${newRegion}" added successfully!`, severity: 'success' });
          formik.setFieldValue('region', newRegion);
          setNewRegion('');
        },
        onError: () => {
          setSnackbar({ open: true, message: 'Failed to add region.', severity: 'error' });
        },
      });
    } else {
      setSnackbar({ open: true, message: 'Invalid region name. Please use only letters and spaces.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? `Edit State: ${stateToEdit?.name || ''}` : 'Add New State'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* שדות הטופס */}
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
          disabled={isEditMode}
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
            <Button variant="outlined" color="primary" onClick={handleAddRegion} style={{ marginTop: '8px' }}>
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

      {/* הוספת Snackbar להצגת הודעות */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StateForm;
