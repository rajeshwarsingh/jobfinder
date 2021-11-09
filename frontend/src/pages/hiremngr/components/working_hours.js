import React, { Fragment } from 'react'
import TimePicker from 'react-bootstrap-time-picker'

const initialValue = {
  mon: { start: 0, end: 82800 },
  tue: { start: 0, end: 82800 },
  wed: { start: 0, end: 82800 },
  thu: { start: 0, end: 82800 },
  fri: { start: 0, end: 82800 },
  sat: { start: 0, end: 82800 },
  sun: { start: 0, end: 82800 }
}

export class WorkingHours extends React.Component {
  constructor () {
    super()

    this.handleTimeChange = this.handleTimeChange.bind(this)

    this.state = {
      NoOfweeks: 1,
      all: { start: 0, end: 82800 },
      allWeek: true,
      chkMon: false,
      chkTue: false,
      chkWed: false,
      chkThu: false,
      chkFri: false,
      chkSat: false,
      chkSun: false,
      weeklyHours: initialValue
    }

    this.onAllweekChange = this.onAllweekChange.bind(this)
    this.onWeekdayChange = this.onWeekdayChange.bind(this)
    this.handleNoOfweeks = this.handleNoOfweeks.bind(this)
  }

  handleNoOfweeks (e) {
    this.setState({ NoOfweeks: e.target.value })
    this.props.setNoOfWeek(e.target.value)
  }

  convertHMS (value) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
  }

  onAllweekChange (e) {
    if (this.state.allWeek === false) {
      this.setState({ weeklyHours: initialValue })
      this.props.setWorkingHoursDetails(initialValue)
    } else {
      this.setState({ weeklyHours: {} })
      this.props.setWorkingHoursDetails({})
    }

    this.setState({ allWeek: (this.state.allWeek !== true) })
  }

  onWeekdayChange (e, value, day) {
    const weeklyHours = this.state.weeklyHours

    if (!this.state[value]) {
      weeklyHours[day] = { start: 0, end: 82800 }
    } else {
      delete weeklyHours[day]
    }

    this.setState({ [value]: (this.state[value] !== true), weeklyHours })
    this.props.setWorkingHoursDetails(weeklyHours)
  }

  handleTimeChange (time, val) {
    const weeklyHours = this.state.weeklyHours

    if (val === 'sAllweek' || val === 'eAllweek') {
      Object.keys(weeklyHours).forEach((day, index) => {
        const m = (val === 'sAllweek' ? (weeklyHours[day].start = time) : val === 'eAllweek' ? (weeklyHours[day].end = time) : '')
      })

      const all = this.state.all
      const m = (val === 'sAllweek' ? (all.start = time) : val === 'eAllweek' ? (all.end = time) : '')

      this.setState({ weeklyHours, all })
      this.props.setWorkingHoursDetails(weeklyHours)
      return
    }

    const day = ((val || '').substr(1, val.length - 1)).toLowerCase()

    if (val === 'sMon' || val === 'eMon') {
      const m = (val === 'sMon' ? (weeklyHours[day].start = time) : val === 'eMon' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sTue' || val === 'eMon') {
      const m = (val === 'sTue' ? (weeklyHours[day].start = time) : val === 'eMon' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sWed' || val === 'eWed') {
      const m = (val === 'sWed' ? (weeklyHours[day].start = time) : val === 'eWed' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sThu' || val === 'eThu') {
      const m = (val === 'sThu' ? (weeklyHours[day].start = time) : val === 'eThu' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sFri' || val === 'eFri') {
      const m = (val === 'sFri' ? (weeklyHours[day].start = time) : val === 'eFri' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sSat' || val === 'eSat') {
      const m = (val === 'sSat' ? (weeklyHours[day].start = time) : val === 'eSat' ? (weeklyHours[day].end = time) : '')
    }

    if (val === 'sSun' || val === 'eSun') {
      const m = (val === 'sSun' ? (weeklyHours[day].start = time) : val === 'eSun' ? (weeklyHours[day].end = time) : '')
    }

    this.setState({ weeklyHours })
    this.props.setWorkingHoursDetails(weeklyHours)
  }

  render () {
    return (
      <div className='col-xl-12 col-md-12' style={{ margin: 20, padding: 20 }}>
        <span><b>Please select your working hours</b></span>
        <div className='row'>
          <div className='col-xl-2 col-md-4'>
            <div className='col-xl-5 col-md-4' />
            <div className='section-headline margin-top-25 margin-bottom-12'>
              <h5>all week</h5>
            </div>
            <div className='checkbox'>
              <input type='checkbox' id='allweek' onClick={this.onAllweekChange} checked={this.state.allWeek} />
              <label for='allweek'><span className='checkbox-icon' /></label>

            </div>
            <br />
            {this.state.allWeek && <div>start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sAllweek') }} value={this.state.all.start} />
              end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eAllweek') }} value={this.state.all.end} />
                                   </div>}
          </div>
          <div className='col-xl-1 col-md-4'>
            <div className='col-xl-5 col-md-4' />
            <div className='section-headline margin-top-25 margin-bottom-12'>
              <h5>Number of weeks</h5>
            </div>
            <div className=''>
              <input value={this.state.NoOfweeks} onChange={this.handleNoOfweeks} className='with-border' type='number' placeholder='eg. 1' />

            </div>
            <br />
          </div>
          {this.state.allWeek === false && <div className='col-xl-9 col-md-4'>
            <div className='row'>
              <div className='col-xl-2 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Mon</h5>
                </div>

                <div className='checkbox'>
                  <input type='checkbox' id='mon' onClick={(e) => this.onWeekdayChange(e, 'chkMon', 'mon')} checked={this.state.chkMon} />
                  <label for='mon'><span className='checkbox-icon' /> </label>
                </div>

                <br />
                {this.state.chkMon && <div>
                  start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sMon') }} value={this.state.weeklyHours.mon.start} />
                  end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eMon') }} value={this.state.weeklyHours.mon.end} />
                </div>}
              </div>

              <div className='col-xl-2 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Tue</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='tue' onClick={(e) => this.onWeekdayChange(e, 'chkTue', 'tue')} checked={this.state.chkTue} />
                  <label for='tue'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkTue && <div>start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sTue') }} value={this.state.weeklyHours.tue.start} />
                  end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eTue') }} value={this.state.weeklyHours.tue.end} />
                                      </div>}
              </div>

              <div className='col-xl-2 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Wed</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='wed' onClick={(e) => this.onWeekdayChange(e, 'chkWed', 'wed')} checked={this.state.chkWed} />
                  <label for='wed'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkWed && <div>start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sWed') }} value={this.state.weeklyHours.wed.start} />
                  end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eWed') }} value={this.state.weeklyHours.wed.end} />
                                      </div>}
              </div>

              <div className='col-xl-2 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Thu</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='thu' onClick={(e) => this.onWeekdayChange(e, 'chkThu', 'thu')} checked={this.state.chkThu} />
                  <label for='thu'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkThu && <div>start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sThu') }} value={this.state.weeklyHours.thu.start} />
                  end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eThu') }} value={this.state.weeklyHours.thu.end} />
                                      </div>}
              </div>

              <div className='col-xl-2 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Fri</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='fri' onClick={(e) => this.onWeekdayChange(e, 'chkFri', 'fri')} checked={this.state.chkFri} />
                  <label for='fri'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkFri && <div> start Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sFri') }} value={this.state.weeklyHours.fri.start} />
                  end Time <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eFri') }} value={this.state.weeklyHours.fri.end} />
                                      </div>}
              </div>

              <div className='col-xl-1 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Sat</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='sat' onClick={(e) => this.onWeekdayChange(e, 'chkSat', 'sat')} checked={this.state.chkSat} />
                  <label for='sat'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkSat && <div>Start <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sSat') }} value={this.state.weeklyHours.sat.start} />
                  End <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eSat') }} value={this.state.weeklyHours.sat.end} />
                                      </div>}
              </div>

              <div className='col-xl-1 col-md-4'>
                <div className='section-headline margin-top-25 margin-bottom-12'>
                  <h5>Sun</h5>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' id='sun' onClick={(e) => this.onWeekdayChange(e, 'chkSun', 'sun')} checked={this.state.chkSun} />
                  <label for='sun'><span className='checkbox-icon' /> </label>
                </div>
                <br />
                {this.state.chkSun && <div>start <TimePicker onChange={(time) => { this.handleTimeChange(time, 'sSun') }} value={this.state.weeklyHours.sun.start} />
                  end <TimePicker onChange={(time) => { this.handleTimeChange(time, 'eSun') }} value={this.state.weeklyHours.sun.end} />
                </div>}
              </div>
            </div>
                                           </div>}
        </div>

      </div>
    )
  }
}
