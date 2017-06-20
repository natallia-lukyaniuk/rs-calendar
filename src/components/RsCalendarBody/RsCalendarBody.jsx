import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RsCalendarWeek from '../RsCalendarWeek/RsCalendarWeek';
import RsCalendarMonth from '../RsCalendarMonth/RsCalendarMonth';
import './RsCalendarBody.less';

class RsCalendarBody extends React.Component {
  render() {
    switch (this.props.type) {
      case 'week':
      default:
        return (
          <div className="rs-calendar-body">
            <RsCalendarWeek />
          </div>
        );
      case 'month':
        return (
          <div className="rs-calendar-body">
            <RsCalendarMonth />
          </div>
        );
    }
  }
}

RsCalendarBody.propTypes = {
  type: PropTypes.string.isRequired,
};

export default connect(
  (state, ownProps) => ({
    type: state.type,
    ownProps,
  }),
  dispatch => ({}),
)(RsCalendarBody);
