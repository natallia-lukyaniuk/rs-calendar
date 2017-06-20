import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

function SvgWithXlink(props) {
  const classnames = classNames(props.classes);
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={classnames}
    >
      <use xlinkHref={`assets/icons/symbols.svg#${props.symbol}`} />
    </svg>
  );
}

SvgWithXlink.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
  symbol: PropTypes.string.isRequired,
};

export default SvgWithXlink;
