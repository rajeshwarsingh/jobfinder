import React, { Fragment } from 'react'
import ls from 'local-storage'
import qs from 'qs'
// import { InlineWidget,PopupWidget } from 'react-calendly'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)

/* Agenda Rendering */
// Outside the class
function Event ({ event }) {
  return (
    <span>
      <strong>
        {event.title}
      </strong>
      {event.desc && (':  ' + event.desc)}
    </span>
  )
}

function EventAgenda ({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>   <p>{event.desc}</p>
    </span>
  )
}

// Calendar.momentLocalizer(moment);
// let allViews = Object.keys(Calendar.views).map(k => Calendar.views[k])

const myEventsList = [{
  title: 'Conference',
  start: new Date(2017, 3, 11),
  end: new Date(2017, 3, 13),
  desc: 'Big conference for important people'
},
{
  title: 'Meeting',
  start: new Date(2017, 3, 12, 10, 30, 0, 0),
  end: new Date(2017, 3, 12, 12, 30, 0, 0),
  desc: 'Pre-meeting meeting, to prepare for the meeting'
},
{
  title: 'Lunch',
  start: new Date(2017, 3, 12, 12, 0, 0, 0),
  end: new Date(2017, 3, 12, 13, 0, 0, 0),
  desc: 'Power lunch'
}]

export class Appointment extends React.Component {
  constructor () {
    super()
    this.state = {
    }
    this.slotSelected = this.slotSelected.bind(this)
  }

  componentDidMount () {
    // whatever stuff you need here
  }

  componentWillUnmount () {
    // whatever cleanup stuff you need here
  }

  onSlotChange (slotInfo) {
    console.log('slot info:', slotInfo)
    alert(slotInfo)
    // var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
    // var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
    // console.log('startTimetartDate'); //shows the start time chosen
    // console.log('endTimendDate'); //shows the end time chosen
  }

  /* When you click on an already booked slot */
  onEventClick (event) {
    console.log(event) // Shows the event details provided while booking
  }

  slotSelected (slotInfo) {
    console.log('slotInfo:', slotInfo)
    alert(slotInfo)
  }

  render () {
    const myEventsList = [
      {
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2020, 10, 26),
        end: new Date(2020, 10, 27)
      }]

    return (
      <div>
        <Calendar
          events={myEventsList}
          selectable
          onSelectEvent={event => this.onEventClick(event)}
          onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)}
					//   views={allViews}
          localizer={localizer}
          step={30}
          timeslots={2}
          defaultView='week'
          defaultDate={new Date()}
					// slotSelected={this.slotSelected}
          components={{
					  event: Event,
					  agenda: {
					    event: EventAgenda
					  }
          }}
        />
      </div>
    )
  }
}
