import React from 'react';
import SearchBar from './SearchBar.jsx';
import Button from './Button.jsx';
import SearchBarList from './SearchBarList.jsx';
import Snippet from './Snippet.jsx';
import request from 'superagent';
import {debounce} from '../utils/utils.js';

const SearchPage = React.createClass({
  /**
   * Get initial component state
   * @return {Object} the state
   */
  getInitialState: function() {
    return {
      query: '',
      songs: [],
      selectedSong: {},
      isSearchDisabled: false
    };
  },

  /**
   * Get default properties
   * @return {Object} the properties
   */
  getDefaultProps: function () {
    return {
      placeholder: 'What\'s the name of the song?',
      buttonText: 'Search again?'
    };
  },

  /**
   * Renders the full view
   * TODO: Figure out a better conditional render
   * ternary and IIFE both make the structure hard 
   * visually see
   */
  render: function() {
    const searchbar = (
      <SearchBarList
        onHandleSelected={this.handleItemSelected}
        list={this.state.songs}
      />
    );
    const snippet = (
      <Snippet
        contentBody={this.state.selectedSong.snippet || ''}
      />
    );
    const button = (
      <Button
        onHandleClick={this.handleSearchRestart}
        {...this.props}
      />
    );
    return (
      <div className="search-container container full-width">
        <div className="contained">
          <SearchBar
            onHandleChange={this.handleSearchQuery}
            query={this.state.query}
            disabled={this.state.isSearchDisabled}
            {...this.props}
          />
          {this.state.isSearchDisabled ? button : ''}
        </div>
        {this.state.songs.length ? searchbar : ''}
        <div className="container">
          {Object.keys(this.state.selectedSong).length ? snippet : ''}
        </div>
      </div>
    );
  },

  getSongs: debounce(function(query) {
    const self = this;
    request
      .get('/songs')
      .query({ q: query })
      .end(function(err, res) {
        if (err) return console.error(err);
        self.setState({
          'songs': res.body || []
        });
      });
  }, 200),

  /**
   * Triggers when query changes
   * @param  {string} query is the query
   */
  handleSearchQuery: function (query) {
    this.setState({query: query});
    this.getSongs(query);
  },

  /**
   * Triggers when search button clicked
   */
  handleSearchRestart: function() {
    this.setState({
      query: '',
      isSearchDisabled: false,
      songs: [],
      selectedSong: {}
    });
  },

  /**
   * Triggers when a search suggest list selected
   * @param  {Object} item is a single list object
   */
  handleItemSelected: function(item) {
    this.setState({
      selectedSong: item || {},
      songs: [],
      isSearchDisabled: true,
      query: item.title + '-' + item.artist.name
    });
  }
});

module.exports = SearchPage;
