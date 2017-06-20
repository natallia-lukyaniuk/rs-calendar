import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import SvgWithXlink from '../SvgWithXlink';

import { momentConst } from '../../momentConst';

class RsCalendarHeader extends React.Component {
  changeView() {
    let startDay = {};
    switch (this.selectType.value) {
      case 'week':
      default:
        startDay = moment().startOf('isoWeek');
        this.props.onChangeView(this.selectType.value, startDay, this.props.events);
        break;
      case 'month':
        startDay = moment().startOf('month');
        this.props.onChangeView(this.selectType.value, startDay, this.props.events);
        break;
    }
  }
  prevClick() {
    let startDay = {};
    switch (this.selectType.value) {
      case 'week':
      default:
        startDay = moment(this.props.startDay).add(-7, 'day');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
      case 'month':
        startDay = moment(this.props.startDay).startOf('month').add(-1, 'day').startOf('month');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
    }
  }
  nextClick() {
    let startDay = {};
    switch (this.selectType.value) {
      case 'week':
      default:
        startDay = moment(this.props.startDay).add(7, 'day');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
      case 'month':
        startDay = moment(this.props.startDay).endOf('month').add(1, 'day');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
    }
  }
  todayClick() {
    let startDay = {};
    switch (this.selectType.value) {
      case 'week':
      default:
        startDay = moment().startOf('isoWeek');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
      case 'month':
        startDay = moment().startOf('month');
        this.props.onChangeStartDay(startDay, this.props.events);
        break;
    }
  }
  render() {
    return (
      <div className="calendarHeader">
        <div className="slds-page-header" role="banner">
          <div className="slds-grid">
            <div className="slds-col slds-has-flexi-truncate">
              <div className="slds-media slds-no-space slds-grow">
                <div className="slds-media__figure">
                  <span className="slds-icon_container">
                    <span>
                      <SvgWithXlink symbol="event" classes={['slds-icon', 'slds-icon-text-default', 'slds-icon']} />
                    </span>
                  </span>
                </div>
                <div className="slds-media__body">
                  <p className="slds-text-title--caps slds-line-height--reset">
                    Calendar
                  </p>
                  <h1 className="slds-page-header__title slds-m-right--small slds-align-middle slds-truncate">
                    {this.props.headerTitle}
                  </h1>
                </div>
              </div>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-top calendar-controls">
              <div className="slds-button-group" role="group" data-aura-rendered-by="509:0">
                <button
                  onClick={this.prevClick.bind(this)}
                  className="slds-button prev-button slds-button--icon-border"
                  type="button"
                >
                  <span>
                    <SvgWithXlink symbol="chevronleft" classes={['slds-button__icon']} />
                  </span>
                  <span className="slds-assistive-text">
                    Previous Week
                  </span>
                </button>
                <button
                  onClick={this.nextClick.bind(this)}
                  className="slds-button next-button slds-button--icon-border"
                  type="button"
                >
                  <span>
                    <SvgWithXlink symbol="chevronright" classes={['slds-button__icon']} />
                  </span>
                  <span className="slds-assistive-text">
                    Next Week
                  </span>
                </button>
              </div>
              <button
                onClick={this.todayClick.bind(this)}
                className="slds-button slds-button--neutral today-button"
                type="button"
              >
                Today
              </button>
              <div className="spacer slds-m-left--large" />
              <select
                value={this.props.type}
                className="slds-select"
                onChange={this.changeView.bind(this)}
                ref={(input) => { this.selectType = input; }}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RsCalendarHeader.propTypes = {
  type: PropTypes.oneOf(['week', 'month']).isRequired,
  startDay: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  (state, ownProps) => ({
    type: state.type,
    startDay: state.startDay,
    headerTitle: state.type === 'week' ?
      `${moment(state.startDay).format(momentConst.weekHeader)} - ${moment(state.startDay).add(6, 'days').format(momentConst.weekHeader)}` :
      `${moment(state.startDay).format(momentConst.monthHeader)}`,
    events: state.events,
    ownProps,
  }),
  dispatch => ({
    onChangeView: (nextType, nextStartDay, events) => {
      dispatch({ type: 'CHANGE_TYPE', nextType });
      dispatch({ type: 'CHANGE_STARTDAY', nextStartDay, events });
    },
    onChangeStartDay: (nextStartDay, events) => {
      dispatch({ type: 'CHANGE_STARTDAY', nextStartDay, events });
    },
  }),
)(RsCalendarHeader);
