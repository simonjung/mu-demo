import React from 'react';

/**
 * List Component
 * @param  {Component} ListItem a React Component
 * @return {Component}          a React Component
 */
module.exports = function List(ListItem) {
  return React.createClass({
    /**
     * Property validation
     * @type {Object}
     */
    propTypes: {
      itemList: React.PropTypes.array.isRequired
    },

    /**
     * Renders an unordered list <ul>
     */
    render: function() {
      return (
        <ul {...this.props}>
          {this.getList()}
        </ul>
      );
    },

    /**
     * Get a list of components
     * @return {Array} of ListItem components
     */
    getList: function() {
      return this.props.itemList.map(function(item, i) {
        return (
          <ListItem key={i} index={i} item={item} {...this.props}/>
        );
      }.bind(this));
    }
  });
};
