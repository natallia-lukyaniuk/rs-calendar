import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './RsCalendarMonth.less';
import { momentConst } from '../../momentConst';

class RsCalendarMonth extends React.Component {
  render() {
    return (
      <div className="rs-calendar-month">
        <div className="calendar">
          <div className="calendar-top bumpForScrollBar">
            <div className="calendarMonthDaysHeaders calendarDayHeaders">
              {
                this.props.weekDays.map(day =>
                  (
                    <strong key={day} className="calendarDayHeader ">
                      {day}
                    </strong>
                  ),
                )
              }
            </div>
          </div>
          <div className="forceCalendarMonthView">
            {
              this.props.weeksDates.map(weekDates =>
                (
                  <div
                    key={weekDates[0]}
                    className="calendarWeek forceCalendarMonthWeek"
                    style={{ height: '40%', minHeight: '100px' }}
                  >
                    <div className="calendarWeekBackground">
                      {
                        weekDates.map(date =>
                          (
                            <div key={date} className="calendarWeekDay">
                              <div className="dayHeader">
                                {date.format(momentConst.monthDay)}
                              </div>
                            </div>
                          ),
                        )
                      }
                    </div>
                    <ul className="calendarWeekList">
                      {
                        (this.props.groupedEvents[weekDates[0].format(momentConst.dayKey)] || []).map((event, ind) => {
                          const { isEndAfterRange, isStartBeforeRange, isInRange } = event;
                          const classes = classNames('calendarEvent', 'allDayEvent', { isEndAfterRange, isStartBeforeRange, isInRange });
                          const height = 28;
                          const colWidth = '((100%-80) / 7)';
                          return (
                            <Link key={event.id} to={`/events/${event.id}`}>
                              <li
                                key={event.id}
                                className={classes}
                                style={{ top: (height * ind) + 'px', left: `calc(${colWidth} * ${event.left})`, width: `calc(${colWidth} * ${event.width})` }}
                              >
                                <div className="eventBox  " >
                                  <div className="eventDefinitionList allDayEvent">
                                    <div className="eventData eventDescription">
                                      {event.start.format(momentConst.allDayEventTime)}
                                      {event.type} : {event.title}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          );
                        })
                      }
                    </ul>
                  </div>
                ),
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

RsCalendarMonth.propTypes = {
  weekDays: PropTypes.arrayOf(PropTypes.string).isRequired,
  weeksDates: PropTypes.arrayOf(PropTypes.array).isRequired,
  groupedEvents: PropTypes.object.isRequired,
};

export default connect(
  (state, ownProps) => ({
    events: state.events,
    startDay: state.startDay,
    weekDays: state.namesDaysOfWeek,
    weeksDates: state.weeksDates,
    groupedEvents: state.groupedEvents,
    ownProps,
  }),
  dispatch => ({
    onGetGroupedEvents: (startDay, events) => {
      dispatch({ type: 'GET_GROUPEDEVENTS', startDay, events });
    },
  }),
)(RsCalendarMonth);
