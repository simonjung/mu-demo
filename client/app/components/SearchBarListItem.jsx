import React from 'react';

const SearchBarListItem = React.createClass({
  /**
   * Propert validation
   * @type {Object}
   */
  propTypes: {
    item: React.PropTypes.object.isRequired,
    onHandleSelected: React.PropTypes.func
  },

  /**
   * Renders a single item in list
   */
  render: function() {
    return (
      <li onClick={this.handleSelect}>
        {this.getText()}
      </li>
    );
  },

  /**
   * Get a label for list item
   * @return {string} the label
   */
  getText: function() {
    return this.props.item.title + '-' + this.props.item.artist.name;
  },

  /**
   * Triggers when an item is clicked
   * @param  {Event} e is a click event
   */
  handleSelect: function(e) {
    this.props.onHandleSelected(this.props.item);
  }
});

module.exports = SearchBarListItem;
