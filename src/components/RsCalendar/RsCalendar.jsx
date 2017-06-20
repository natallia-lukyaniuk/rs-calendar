import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEvents } from './actions/events';
import './RsCalendar.less';
import RsCalendarHeader from '../RsCalendarHeader/RsCalendarHeader';
import RsCalendarBody from '../RsCalendarBody/RsCalendarBody';

class RsCalendar extends Component {
  componentDidMount() {
    this.props.onGetEvents(this.props.startDay);
  }
  render() {
    return (
      <div className="rs-calendar">
        <RsCalendarHeader />
        <RsCalendarBody />
      </div>
    );
  }
}

RsCalendar.propTypes = {
  startDay: PropTypes.object.isRequired,
};

export default connect(
  (state, ownProps) => ({
    startDay: state.startDay,
  }),
  dispatch => ({
    onGetEvents: (startDay) => {
      dispatch(getEvents(startDay));
    },
  }),
)(RsCalendar);
