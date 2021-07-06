import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Switch, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { PricingPlanCard } from '../components/_external-pages/pricing';
// hooks
import useAuth from '../hooks/useAuth';
//
import { useDispatch } from '../redux/store';
import { createNewProfile } from '../redux/slices/profile';
import { PLANS } from './plans';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const [plansToShow, setPlansToShow] = useState(PLANS.artistPLans);

  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(window.localStorage.getItem('userProfile'));

  useEffect(() => {
    if (userData) {
      if (userData.accountType === 'label-distributor') setPlansToShow(PLANS.labelPlans);
    }
  }, []);

  function onSelectPlan(subscription) {
    const profileData = {
      email: user.email,
      fullName: userData?.fullName,
      accountType: userData?.accountType,
      profileType: userData?.profileType,
      phoneNumber: userData?.phoneNumber,
      cityName: userData?.cityName,
      artistName: userData?.artistName,
      pricingPlan: subscription,
      referance: userData?.referance
    };
    dispatch(createNewProfile(profileData)).then(navigate(PATH_DASHBOARD.root));
  }

  return (
    <RootStyle title="Pricing | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>
            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Box>
          <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
            * Plus applicable taxes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {plansToShow.map((card, index) => (
            <Grid item xs={12} md={6} key={card.subscription}>
              <PricingPlanCard card={card} index={index} onSelectPlan={onSelectPlan} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
