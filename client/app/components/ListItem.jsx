import React from 'react';

/**
 * ListItem Wrapper
 * @param  {Component} ItemView a React Component
 * @return {Component}          a React Component
 */
module.exports = function ListItem(ItemView) {
  return React.createClass({
    /**
     * Property Validation
     * @type {Object}
     */
    propTypes: {
      item: React.PropTypes.any.isRequired,
      selectedIndex: React.PropTypes.number
    },

    /**
     * Default properties
     * @return {Object} properties
     */
    getDefaultProp: function() {
      return {
        onItemSelect: function() {}
      };
    },

    /**
     * Render a ListItem
     * @return {Component} a reference
     */
    render: function() {
      return (
        <ItemView
          {...this.props}
        />
      );
    }
  });
};
