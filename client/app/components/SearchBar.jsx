import React from 'react';

const SearchBar = React.createClass({
  /**
   * Property validation for SearchBar
   * @type {Object}
   */
  propTypes: {
    onHandleChange: React.PropTypes.func.isRequired,
    query: React.PropTypes.string
  },

  /**
   * Render a SearchBar
   */
  render: function() {
    return (
      <input 
        className="search-bar"
        type="text"
        ref="userInput"
        value={this.props.query}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  },

  /**
   * Triggers when user inputs text
   * @param  {Event} e is a change event
   */
  handleChange: function(e) {
    this.props.onHandleChange(this.refs.userInput.value);
  }
});

module.exports = SearchBar;