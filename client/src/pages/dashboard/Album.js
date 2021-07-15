import * as React from 'react';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Container, DialogTitle, useMediaQuery, Stack, Box, TextField, MenuItem } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../components/_dashboard/calendar';



// ----------------------------------------------------------------------

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};



export default function Album() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? 'listWeek' : 'dayGridMonth');
  const selectedEvent = useSelector(selectedEventSelector);
  const { events, isOpenModal, selectedRange } = useSelector((state) => state.calendar);
  const currencies = [
    {
      value: 'USD',
      label: '123',
    },
    {
      value: 'EUR',
      label: '123',
    },
  ];

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);
  const [currency, setCurrency] = React.useState('USD');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <Page title="Album | Minimal-UI">
      <Container maxWidth="xl">
        <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' }, width: { md: '50%' }, overflowY:'scroll' }}>
            <Box sx={{ borderRadius: 1,p: 2, width:'100%' }}>
                <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium'}}>
                    Album
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '18px' }}>
                     Put your Album information 
                </Box>
                <Box component="form" sx={{ width:'100%', alignItems: 'center' }} noValidate autoComplete="off" >
                    <label>Title of an album,single or EP</label>
                    <TextField id="outlined-basic1"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }} />
                    <label>Primary Artist or Band Name</label>
                    <TextField id="outlined-basic2"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }}/>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Additional artist"
                        value={currency}
                        onChange={handleChange}
                        helperText="Please select additional artist"
                        sx= {{width: "100%"}}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                </Box>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" sx={{ align:'center' }}>ADD ANOTHER ARTIST</Button>
                </Stack>
                <Box component="form" sx={{ width:'100%', alignItems: 'center' }} noValidate autoComplete="off" >
                    <label>Main Genere</label>
                    <TextField id="outlined-basic3"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }} />
                    <label>Secondary Genere</label>
                    <TextField id="outlined-basic4"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }}/>
                    <label>Language</label>
                    <TextField id="outlined-basic5"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }}/>
                    <label>Record Label</label>
                    <TextField id="outlined-basic6"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }} />
                    <label>Copyright Holder & Year of Release</label>
                    <TextField id="outlined-basic7"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }}/>
                    <label>UPC code</label>
                    <TextField id="outlined-basic8"  variant="outlined" size="small" sx= {{ width: '100%',marginBottom:3 }}/>
                </Box>
            </Box>
            
        </Card>
      </Container>
    </Page>
  );
}
