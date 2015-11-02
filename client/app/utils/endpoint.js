import PubSub from './pubsub.js';
import request from 'superagent';

/**
 * Make an API endpoint
 * @param  {string} endpoint a URI
 * @param  {Object} events   a event dispatcher
 * @return {Object}          a wrapped API service
 */
function makeAPI(endpoint, events) {
  return {
    fetch: function(params) {
      request
        .get(endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) return console.error(err);
          events.publish('change', res.body || []);
        });
    }
  };
}

/**
 * A simple API endpoint
 * @param  {string} endpoint a URI
 * @return {Object}          an API service
 */
module.exports = function(endpoint) {
  const events = PubSub();
  const api = makeAPI(endpoint, events);

  // subscribe to all API events
  events.subscribe('fetch', api.fetch);

  return Object.assign(events, api);
};