import { useState } from 'react';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import DatePicker from '@mui/lab/DatePicker';
import {Box,List,ListItem,ListItemText,Typography,useTheme, Modal, Button, TextField} from "@mui/material";
import  Header  from '../Header';
import { tokens } from '../../theme';
import "./calendar.scss"
import format from 'date-fns/format';


const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

 
  const handleEventChange = (changed) => {
    if (
      window.confirm(
        `¿Desea mover este evento?'${changed.event.title}'`
      )
    ) {
      
    }
  };
  const handleDateClick = (selected) => {
    setSelectedEvent(null);
    setTitle('');
    setDescription('');
    setSelectedDate(selected.date);
    setShowModal(true);
  };

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    setTitle(selected.event.title || '');
    setDescription(selected.event.extendedProps.description || '');
    setSelectedDate(selected.event.start);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    const eventData = {
      id: selectedEvent ? selectedEvent.id : null,
      title: title,
      start: selectedDate,
      description: description
    };

    if (selectedEvent) {
      selectedEvent.setProps(eventData);
    } else {
      setCurrentEvents([...currentEvents, eventData]);
    }
    
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    selectedEvent.remove();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setTitle('');
    setDescription('');
    setSelectedDate(new Date());
  };

  

  return (
    <Box className="container">
      <Header title="Calendario" subtitle="Cronograma Institucional"/>
      <Box className="container2">
        <Box className="container3" backgroundColor={colors.primary[400]} p="15px">
          <Typography variant='h5'>Eventos</Typography>
          <List>
            {currentEvents.map((event)=>(
              <ListItem className='listaItem' key={event.id} sx={{backgroundColor: colors.greenAccent[500]}}>
                <ListItemText primary={event.title} secondary={
                  <Typography>
                    {format(event.start, 'yyyy-MM-dd',{
                      year:"numeric",
                      month:"short",
                      day:"numeric",
                    })}
                  </Typography>
                }/>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="container4">
        
          <FullCalendar className="calendario" plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            locale={"es"}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventChange={handleEventChange}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2024-02-13",
              },
            ]}
          />
          
        </Box>
      </Box>
      <Modal className='modal' open={showModal} onClose={handleCloseModal}>
        <Box className="modalbox">
          <Typography variant="h6" component="h2">
            {selectedEvent ? 'Editar Evento' : 'Crear Evento'}
          </Typography>
          <TextField className='modal2'
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField className='text1'
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            
          />
          <DatePicker className="text2"
            label="Fecha"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button className="button1" onClick={handleSaveEvent}>{selectedEvent ? 'Guardar' : 'Crear'}</Button>
          {selectedEvent && (
            <Button className="button1" onClick={handleDeleteEvent} color="error">Borrar</Button>
          )}
          
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
