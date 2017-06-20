import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { momentConst } from '../../momentConst';

import './RsCalendarWeek.less';

class RsCalendarWeek extends React.Component {
  render() {
    return (
      <div className="rs-calendar-week">
        <div className="calendar">
          <div className="calendar-top bumpForScrollBar">
            <div className="calendarUserTimezoneOffset">
              <strong className="calendarUserTimezoneOffsetText">
                <time>GMT {this.props.startDay.format(momentConst.timezone)}</time>
              </strong>
            </div>
            <div className="calendarDayHeaders">
              {
                this.props.weekDays.map(day => (
                  <strong key={day} className="calendarDayHeader ">
                    {day.format(momentConst.monthWithDay)}
                  </strong>
                ))
              }
            </div>
            <div className="calendarTrough" style={{ height: '100px' }}>
              <ul className="calendarTroughContainer week">
                {
                  this.props.eventsAllDayForWeek.map((event, ind) => {
                    const { isEndAfterRange, isStartBeforeRange, isInRange } = event;
                    const classes = classNames('calendarEvent', 'allDayEvent', { isEndAfterRange, isStartBeforeRange, isInRange });
                    const liHeight = 28;
                    const colWidth = '((100%-80) / 7)';
                    return (
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <li
                          className={classes}
                          style={{ top: (liHeight * ind) + 'px', left: `calc(${colWidth} * ${event.left})`, width: `calc(${colWidth} * ${event.width})` }}
                        >
                          <div className="eventBox">
                            <div className="eventDefinitionList allDayEvent">
                              {event.start.format(momentConst.allDayEventTime)}
                              {event.type} : {event.title}
                            </div>
                          </div>
                        </li>
                      </Link>
                    );
                  })
                }
              </ul>
            </div>
          </div>
          <div className="calendarRow">
            <div className="calendarKey">
              {
                this.props.dayHours.map(hour => (
                  <strong key={hour}>
                    <span>
                      {hour}
                    </span>
                  </strong>
                ))
              }
            </div>
            {
              this.props.weekDays.map(day =>
                (
                  <div key={day} className="calendarDay" style={{ flexBasis: '14.285714285714286%', WebkitFlexBasis: '14.285714285714286%' }}>
                    <div className="eventList">
                      <ul className="eventListContainer">
                        {
                          (this.props.groupedEvents[day.format(momentConst.dayKey)] || []).map(event =>
                            (
                              <Link key={event.id} to={`/events/${event.id}`}>
                                <li
                                  className="calendarEvent"
                                  style={{ top: `${event.startBorder}px`, left: '0%', height: event.endBorder, minHeight: '2.08333%', width: '100%' }}
                                >
                                  <div className="eventBox">
                                    <div className="eventDefinitionList allDayEvent">
                                      <span className="eventData eventTime">
                                        {event.start.format(momentConst.eventTime)}
                                      </span>
                                      <div className="eventData eventDescription">
                                        {event.type} : {event.title}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </Link>
                            ),
                          )
                        }
                      </ul>
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
    );
  }
}

RsCalendarWeek.propTypes = {
  startDay: PropTypes.object.isRequired,
  dayHours: PropTypes.arrayOf(PropTypes.string).isRequired,
  weekDays: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupedEvents: PropTypes.object.isRequired,
  eventsAllDayForWeek: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  (state, ownProps) => ({
    startDay: state.startDay,
    dayHours: state.dayHours,
    weekDays: state.weekDays,
    events: state.events,
    groupedEvents: state.groupedEventsForWeek,
    eventsAllDayForWeek: state.eventsAllDayForWeek,
    ownProps,
  }),
  dispatch => ({}),
)(RsCalendarWeek);
