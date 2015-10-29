import React from 'react';
import SearchBarListItem from './SearchBarListItem';

const SearchBarList = React.createClass({
  /**
   * Property validations
   * @type {Object}
   */
  propTypes: {
    list: React.PropTypes.array.isRequired,
    onHandleSelected: React.PropTypes.func
  },

  /**
   * Render a suggestion list from an array of data
   */
  render: function() {
    const list = this.props.list.map((item, i) => {
      return (
        <SearchBarListItem
          key={i}
          onHandleSelected={this.handleSelect}
          item={item}
        />
      );
    });

    return (
      <ul className="search-suggestions">
        {list}
      </ul>
    );
  },

  /**
   * Triggers when a child element is selected
   * @param  {Object} item is a single search result
   */
  handleSelect: function(item) {
    this.props.onHandleSelected(item);
  }
});

module.exports = SearchBarList;
