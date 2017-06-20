import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEvent } from './actions/event';
import './Event.less';
import SvgWithXlink from '../SvgWithXlink';

class Event extends React.Component {
  componentDidMount() {
    const { id } = this.props.ownProps.match.params;
    this.props.onGetEvent(id);
  }
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
        <div className="slds-page-header">
          <div className="slds-media">
            <div className="slds-media__figure">
              <span className="slds-icon_container" title="Description of icon when needed">
                <SvgWithXlink symbol="task" classes={['slds-icon', 'slds-icon-text-default', 'slds-icon']} />
              </span>
            </div>
            <div className="slds-media__body">
              <h1
                className="slds-page-header__title slds-truncate slds-align-middle"
                title="Rohde Corp - 80,000 Widgets"
              >
                {event.type} - {event.title} ({event.start})
              </h1>
              <p className="slds-text-body_small slds-line-height_reset">
                <Link to="/">❮ Back to Calendar</Link>
              </p>
            </div>
          </div>
        </div>
        <div>
          <section>
            <p className="title">Location:</p>
            <div>
              {event.location}
            </div>
            <p className="title">Lesson curriculum:</p>
            <div>
              {event.description}
            </div>
          </section>
          <section>
            <p className="title">Lectors:</p>
            <ul>
              {
                (this.props.trainers)
                  .map(trainer =>
                    (<li key={trainer.id}>
                      <img className="avatar" src={trainer.avatar} alt="..." />
                      <span>{trainer.name}</span>
                    </li>),
                  )
              }
            </ul>
          </section>
          <section>
            <p className="title">Resources:</p>
            <ul>
              {
                (this.props.event.resources || []).map(
                  resource => (
                    <li key={resource.description}>
                      <p>{resource.type}</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={resource.resource}
                      >
                        Link to resource
                      </a>
                      <p>{resource.description}</p>
                    </li>
                  ),
                )
              }
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  trainers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetEvent: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => ({
    ownProps,
    events: state.events,
    event: state.event,
    trainers: state.trainers,
  }),
  dispatch => ({
    onGetEvent: (id) => {
      dispatch(getEvent(id));
    },
  }),
)(Event);
