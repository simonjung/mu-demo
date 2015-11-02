import React from 'react';
import ListItem from '../components/ListItem.jsx';

module.exports = ListItem(React.createClass({
  /**
   * Render a song label
   * @return {Component} a reference
   */
  render: function() {
    let isSelected = '';
    if (this.props.index === this.props.selectedIndex) {
      isSelected = 'selected';
    }
    return (
      <li
        className={isSelected}
        onClick={this.props.onItemSelect.bind(null, this.props.item)}
        onMouseOver={this.props.onItemMouseOver.bind(null, this.props.index)}
      >
        {this.getLabel()}
      </li>
    );
  },

  /**
   * Get a label
   * @return {string} the label
   */
  getLabel: function() {
    return this.props.item.title + '-' + this.props.item.artist.name;
  }
}));