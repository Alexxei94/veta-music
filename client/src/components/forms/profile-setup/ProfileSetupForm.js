import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Stack, TextField, Alert, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { PATH_PAGE } from '../../../routes/paths';
//
import accountTypes from './accountTypes';

// ----------------------------------------------------------------------

export default function ProfileSetupForm() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ProfileSetupSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    cityName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    artistName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Artist name required'),
    profileType: Yup.string().min(2).required('Profile type required')
  });

  const formik = useFormik({
    initialValues: {
      accountType: accountTypes[0].key,
      fullName: '',
      profileType: '',
      phoneNumber: '',
      cityName: '',
      artistName: '',
      referance: ''
    },
    validationSchema: ProfileSetupSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      window.localStorage.setItem('userProfile', JSON.stringify(values));
      navigate(PATH_PAGE.pricing);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            select
            fullWidth
            name="accountType"
            label="Account Type"
            placeholder="Select account type"
            {...getFieldProps('accountType')}
            SelectProps={{ native: true }}
            error={Boolean(touched.accountType && errors.accountType)}
            helperText={touched.accountType && errors.accountType}
          >
            {accountTypes.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </TextField>

          {accountTypes.map((accountType) => {
            if (accountType.key === getFieldProps('accountType').value && accountType.profileTypes?.length) {
              return (
                <div>
                  I am an
                  <RadioGroup
                    {...getFieldProps('category')}
                    name="profileType"
                    row
                    key={getFieldProps('accountType').value}
                  >
                    {accountType.profileTypes.map((item) => (
                      <FormControlLabel key={item.key} value={item.key} control={<Radio />} label={item.label} />
                    ))}
                  </RadioGroup>
                </div>
              );
            }
            return null;
          })}

          <TextField
            fullWidth
            label="Full Name"
            {...getFieldProps('fullName')}
            error={Boolean(touched.fullName && errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />

          <TextField
            fullWidth
            label="Phone"
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />

          <TextField
            fullWidth
            label="City"
            {...getFieldProps('cityName')}
            error={Boolean(touched.cityName && errors.cityName)}
            helperText={touched.cityName && errors.cityName}
          />

          <TextField
            fullWidth
            label="Artist Name"
            {...getFieldProps('artistName')}
            error={Boolean(touched.artistName && errors.artistName)}
            helperText={touched.artistName && errors.artistName}
          />

          <TextField
            fullWidth
            label="How Did You Hear About Us?"
            {...getFieldProps('referance')}
            error={Boolean(touched.referance && errors.referance)}
            helperText={touched.referance && errors.referance}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Select a Plan
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
