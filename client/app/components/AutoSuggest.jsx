import React from 'react';
import List from './List.jsx';

// Key Codes
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const KEY_ESC = 27;

/**
 * Make Auto Suggest Component
 * @param  {Component} ListView a React Component
 * @return {Component}          a React Component
 */
module.exports = function AutoSuggest(ListView) {
  // Make a List Component
  const ListComponent = List(ListView);

  return React.createClass({
    /**
     * Property validation
     * @type {Object}
     */
    propTypes: {
      onItemSelect: React.PropTypes.func.isRequired
    },

    /**
     * Get Initial State
     * @return {Object.selectedIndex} index of itemList
     */
    getInitialState: function() {
      return {
        selectedIndex: -1
      };
    },

    /**
     * Render AutoSuggest Component
     */
    render: function() {
      return (
        <div>
          <input
            className="search-bar"
            onChange={this.onInputChange}
            value={this.props.query}
            placeholder={this.props.placeholder}
            disabled={this.props.isDisabled}
            onKeyDown={this.onInputKeyDown}
          />
          {!this.props.itemList.length ? '' :
            <ListComponent
              className="search-suggestions"
              itemList={this.props.itemList}
              onItemSelect={this.props.onItemSelect}
              selectedIndex={this.state.selectedIndex}
              onItemMouseOver={this.onItemMouseOver}
            />
          }
        </div>
      );
    },

    /**
     * Reset selectedIndex
     */
    resetIndex: function() {
      // always reset suggestions
      this.setState({
        selectedIndex: -1
      });
    },

    /**
     * When user mouse over list item
     * @param  {number} index index in itemList
     */
    onItemMouseOver: function(index) {
      this.setState({
        selectedIndex: index
      });
    },

    /**
     * When user inputs new value
     * @param  {Event} e a key event
     */
    onInputChange: function(e) {
      this.props.onQueryChange(e.target.value);
    },

    /**
     * When user presses down on key
     * @param  {Event} e a keydown event
     */
    onInputKeyDown: function(e) {
      const selectedIndex = this.state.selectedIndex;

      switch(e.which) {
        case KEY_UP:
          e.preventDefault();
          if (selectedIndex > 0) {
            this.setState({
              selectedIndex: selectedIndex - 1
            });
          }
          break;
        case KEY_DOWN:
          e.preventDefault();
          if (selectedIndex < this.props.itemList.length) {
            this.setState({
              selectedIndex: selectedIndex + 1
            });
          }
          break;
        case KEY_ENTER:
          e.preventDefault();
          this.props.onItemSelect(this.props.itemList[selectedIndex]);
          this.resetIndex();
          break;
        case KEY_ESC:
          this.props.onQueryChange('');
          this.resetIndex();
          break;
      }
    }
  });
}