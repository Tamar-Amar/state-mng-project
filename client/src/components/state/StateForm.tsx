//states-mng-project\client\src\components\state\StateForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Avatar, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { stateCreateValidationSchema, stateEditValidationSchema } from '../../types/validations/StateValidation';
import { useAddState, useUpdateState } from '../../hooks/useStates';
import { useCreateRegion, useRegions } from '../../hooks/useRegions';
import { useQueryClient } from '@tanstack/react-query';
import { State } from '../../types/State';
import { editingStateAtom } from '../../store/stateAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../store/userAtom';
import { BUTTON, DIALOG, ERROR, STATE_FORM_TEXT } from '../../constants/componentsTxt';
import FlagIcon from '@mui/icons-material/Flag';
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';


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
            {ERROR.permission}
          </Typography>
          <Typography variant="body1">
            {STATE_FORM_TEXT.redirecting}
          </Typography>
          <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 2 }}>
            {STATE_FORM_TEXT.goHomeNow}
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
              setSnackbar({ open: true, message: 'State updated successfully!', severity: 'success' });
              setTimeout(() => {
                navigate('/');
              }, 3000);
              setEditingStateName(null)
            },
            onError: (error: any) => {
              const errorMessage = error?.response?.data?.message || 'Failed to update state.';
              setSnackbar({ open: true, message: errorMessage, severity: 'error' });
              setEditingStateName(null)
            },
          }
        );
      } else {
        addMutation.mutate(values, {
          onSuccess: () => {
            setSnackbar({ open: true, message: 'State added successfully!', severity: 'success' });
            setTimeout(() => {
              navigate('/');
            }, 3000);
          },
          onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to add state.';
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
          },
        });
      }
    },
  });



  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: 'auto', mt: 15 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode 
          ? `${STATE_FORM_TEXT.editStateTitlePrefix}${stateToEdit?.name || ''}` 
          : STATE_FORM_TEXT.addStateTitle}
      </Typography>

      {stateToEdit?.flag && (
        <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
          <Avatar src={stateToEdit.flag} variant="rounded" sx={{ width: 120, height: 80 }} />
        </Box>)}

      <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        label={STATE_FORM_TEXT.stateNameLabel}
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="normal"
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        disabled={isEditMode}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FlagIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label={STATE_FORM_TEXT.flagUrlLabel}
        name="flag"
        value={formik.values.flag}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="normal"
        error={formik.touched.flag && Boolean(formik.errors.flag)}
        helperText={formik.touched.flag && formik.errors.flag}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ImageIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label={STATE_FORM_TEXT.populationLabel}
        name="population"
        type="number"
        value={formik.values.population}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="normal"
        error={formik.touched.population && Boolean(formik.errors.population)}
        helperText={formik.touched.population && formik.errors.population}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PeopleIcon />
            </InputAdornment>
          ),
        }}

      />

      <Autocomplete
        options={regions}
        value={formik.values.region as string}
        onChange={(event, value) => {
          formik.setFieldValue('region', value);
          setNewRegion(value as string);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={STATE_FORM_TEXT.regionLabel}
            name="region"
            margin="dense"
            error={formik.touched.region && Boolean(formik.errors.region)}
            helperText={formik.touched.region && formik.errors.region}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          />
        )}

      />


      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="outlined" color="error" onClick={handleCancel}>
          {BUTTON.cancel}
        </Button>
        <Button variant="contained" color="primary" type="submit" disabled={!formik.dirty || !formik.isValid}>
          {isEditMode ? BUTTON.submitUpdate : BUTTON.submitAdd}
        </Button>
      </Box>
      </form>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>{DIALOG.unsavedChangesTitle}</DialogTitle>
        <DialogContent>
          <Typography>
            {DIALOG.unsavedChangesMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="primary">
            {DIALOG.dialogStay}
          </Button>
          <Button onClick={confirmCancel} color="secondary">
            {DIALOG.dialogDiscard}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StateForm;
