import React from 'react';

const Button = React.createClass({
  /**
   * Property validation for Button
   * @type {Object}
   */
  propTypes: {
    buttonText: React.PropTypes.string.isRequired,
    onHandleClick: React.PropTypes.func.isRequired
  },

  /**
   * Renders a Button
   */
  render: function() {
    return (
      <button
        onClick={this.handleClick}
        className="search-button"
      >
        {this.props.buttonText}
      </button>
    );
  },

  /**
   * On button click
   * @param  {Event} e The click event
   */
  handleClick: function(e) {
    this.props.onHandleClick();
  }
});

module.exports = Button;