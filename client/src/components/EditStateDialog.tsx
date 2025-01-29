import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography, TextField, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { State } from '../types/State';
import { stateEditValidationSchema } from '../types/StateValidation';
import { useRecoilState } from 'recoil';
import { editingStateAtom } from '../store/stateAtoms';
import { useCreateRegionWithRecoil, useRegionsWithRecoil } from '../hooks/useRegions';

interface EditStateDialogProps {
  open: boolean;
  state: State | null;
  onClose: () => void;
  onSave: (updatedState: State) => void;
}

const EditStateDialog: React.FC<EditStateDialogProps> = ({ open, state, onClose, onSave }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingStateName, setEditingStateName] = useRecoilState(editingStateAtom || 'editing');
  const [newRegion, setNewRegion] = useState<string>('');
  const { regions } = useRegionsWithRecoil();
  const createRegionMutation = useCreateRegionWithRecoil();

  const formik = useFormik({
    initialValues: {
      flag: state?.flag || '',
      population: state?.population || 0,
      region: state?.region || '',
    },
    validationSchema: stateEditValidationSchema(regions),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave({
        _id: state?._id,
        name: state!.name,
        ...values,
      });
      onClose();
      setEditingStateName(null);
    },
  });

  const handleCancel = () => {
    if (formik.dirty) {
      setShowConfirmation(true);
    } else {
      onClose();
      setEditingStateName(null);
    }
  };

  const confirmCancel = () => {
    setShowConfirmation(false);
    onClose();
    setEditingStateName(null);
  };

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

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        Edit Details for: <strong>{state?.name}</strong>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <img
              src={formik.values.flag}
              alt="flag"
              style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <TextField
              label="Flag URL"
              name="flag"
              value={formik.values.flag}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="dense"
              error={formik.touched.flag && Boolean(formik.errors.flag)}
              helperText={formik.touched.flag && formik.errors.flag}
            />
          </Box>
          <TextField
            label="Population"
            name="population"
            type="number"
            value={formik.values.population}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
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
          <Typography color="error" marginTop={2}>
            * The country name cannot be changed. To rename, delete and create a new entry.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </DialogActions>
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
    </Dialog>
  );
};

export default EditStateDialog;
