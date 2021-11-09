import React from 'react'
import './main.css'
import {Modal,Button} from 'react-bootstrap';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'
import $ from 'jquery';

export default class DemoApp extends React.Component {
  constructor(){
    super()
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      setShow:false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleAppointment = this.handleAppointment.bind(this)
  }
  

  handleClose(){
    this.setState({setShow:false});
  } 
  handleShow(){
    // alert('asfd')
    this.setState({setShow:true})
  }

  handleAppointment(){
    alert('check success')
  }

  render(){
    return (
      <div className="MainDiv">
        <div className="jumbotron text-center">
            <h3>Add to Calendar and Pay</h3>
        </div>
       
        <div className="container">
        <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              // initialView='dayGridMonth'
              // slotDuration= '00:60:00'
              // minTime= "08:00"
              // maxTime= "22:00"
              defaultView="timeGridDay"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // minTime= "00:08:00"
              // maxTime= "22:00"
              selectConstraint="businessHours"
              businessHours={{ // Mon - Fri, 9-5
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '09:00',
                endTime: '19:00',
              }
              }
              // defaultView= "timeGridDay"
              weekends={this.state.weekendsVisible}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
          </div>

          {/* modal popup------------------------------- */}
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                
                  <div className="modal-header">
                    <h4 className="modal-title align-center">Date is Below</h4>
                    <h1> body here</h1>
                      <button onClick={this.handleAppointment}>check</button>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  <div className="modal-body text-center">
                      
                  </div>
                
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        {/* --------end----------------------- */}
      </div>
    );
  }
  



  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>

          <h2>Set Slot</h2>
          <ul>
            <li><input type='checkbox' /></li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        {/* <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let tdate = new Date()
    var startDate = moment(selectInfo.startStr.toLocaleString()).format("YYYY-MM-DDm:ss");
    var todaysDate = moment(tdate.toLocaleString()).format("YYYY-MM-DDm:ss");
    // console.log('startTimetartDate',todaysDate>startDate,todaysDate,startDate); //shows the start time chosen
    if(todaysDate>startDate){
      alert('Can not select old date');
      return
    }
    // alert(selectInfo.startStr)
      // dateClick={function(arg) {
                $("#myModal").modal("show");
                $(".modal-body").html("");
                $(".modal-body").html("<h3>"+"</h3>");
              // }}
    // this.handleShow();
    return
    
    // console.log('endTimendDate'); //shows the end time chosen


    // let today = moment().format("YYYY-MM-DD")
    // console.log('today****',today)
    // // let title = prompt('Please enter a new title for your event')
    // let check = moment.format(selectInfo.startStr,"YYYY-MM-DD")
    // // var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
    // console.log('selectInfo:',today,check,selectInfo.startStr,selectInfo)
    return

    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  handleEventClick = (clickInfo) => {
    if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}
