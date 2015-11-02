import React from 'react';
import List from '../components/List.jsx';
import SongListItem from './SongListItem.jsx';
import {debounce} from '../utils/utils.js';
import Endpoint from '../utils/endpoint.js';
import AutoSuggest from '../components/AutoSuggest.jsx';

// Compose an AutoSuggest Component
const AutoSuggestions = AutoSuggest(SongListItem);

module.exports = React.createClass({
  /**
   * Default properties
   * @return {Object} 
   */
  getDefaultProps: function() {
    return {
      placeholder: 'What\'s the name of the song?',
      buttonText: 'Search again?'
    };
  },

  /**
   * Initial State
   * @return {Object} state
   */
  getInitialState: function() {
    return {
      songs: [],
      query: '',
      selectedItem: {}
    };
  },

  /**
   * When component mounts create a new API endpoint and
   * subscribe to change events on the /songs API
   */
  componentDidMount: function() {
    this.songAPI = Endpoint('/songs');
    this.songAPI.subscribe('change', this.onFetchSongs);

    // control the time between each server request
    this.getSongs = debounce(this.getSongs, 200);
  },

  /**
   * When component unmounts unsubscribe all events,
   * removing all reference to this component
   */
  componentWillUnmount: function() {
    this.songAPI.remove();
  },

  /**
   * Render the component
   * @return {Component} a reference
   */
  render: function() {
    return (
      <div>
        <div className="search-container container full-width">
          <div className="contained">
            <AutoSuggestions
              placeholder={this.props.placeholder}
              onQueryChange={this.onQueryChange}
              onItemSelect={this.onSongSelected}
              isDisabled={Object.keys(this.state.selectedItem).length}
              itemList={this.state.songs}
              query={this.state.query}
            />
            {!Object.keys(this.state.selectedItem).length ? '' :
              <button
                onClick={this.resetState}
                className="search-button"
              >
                {this.props.buttonText}
              </button>
            }
          </div>
        </div>
        {!Object.keys(this.state.selectedItem).length ? '' :
          <p className="container snippet">
            {this.state.selectedItem.snippet}
          </p>
        }
      </div>
    );
  },

  /**
   * Get songs from server
   */
  getSongs: function() {
    this.songAPI.publish('fetch', this.getQuery());
  },

  /**
   * Reset the state
   */
  resetState: function() {
    this.setState({
      songs: [],
      selectedItem: {},
      query: ''
    });
  },

  /**
   * Build query parameters
   * @return {Object} query parameters
   */
  getQuery: function() {
    return {
      track: this.state.query
    };
  },

  /**
   * When the user changes the query
   * @param  {Event} e a change event
   */
  onQueryChange: function(query) {
    this.setState({
      query: query
    });
    this.getSongs();
  },

  /**
   * When a song is selected
   * @param  {Object} song a song
   */
  onSongSelected: function(song) {
    this.setState({
      selectedItem: song,
      songs: [],
      query: song.title + '-' + song.artist.name
    });
  },

  /**
   * When songs are recieved from server
   * @param  {Array} songs a list of songs
   */
  onFetchSongs: function(songs) {
    this.setState({
      songs: songs
    });
  }
});
