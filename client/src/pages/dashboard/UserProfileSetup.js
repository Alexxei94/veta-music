import { Navigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@material-ui/core';
// hooks
import { useSelector } from '../../redux/store';
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { ProfileSetupForm } from '../../components/forms/profile-setup';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();
  const isProfileExist = useSelector((state) => state.profile.isProfileExist);

  if (isProfileExist) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Free forever. No credit card needed.</Typography>
            </Box>
            <Tooltip title={(method === 'firebase' && 'Firebase') || (method === 'cognito' && 'Cognito') || 'JWT'}>
              <Box
                component="img"
                src={`/static/auth/${
                  (method === 'firebase' && 'ic_firebase') || (method === 'cognito' && 'ic_cognito') || 'ic_jwt'
                }.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Box>

          {method === 'firebase' && <AuthFirebaseSocials />}

          <ProfileSetupForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
