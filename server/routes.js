/**
 * Simple Routing for Song API
 * TODO: Should considering moving routes into modules
 */
'use strict';

const SERVICE_URL = 'http://api.lyricsnmusic.com/songs';
const API_KEY = '2fb1fa4a47e29df18e9236c18a39ec';
const request = require('superagent');
const router = require('koa-router')();

// Get a list of songs
router.get('/songs', function *() {
  const params = this.query;
  this.body = yield searchForSong(params);
});

/**
 * Request a list of songs from Music'n'Lyrics API
 * TODO: Should be moved into it's own module when app gets larger
 * @param  {Object} opts query options
 * @return {Promise}  A Promise that resolves a list of songs.
 */
function searchForSong(opts) {
  return new Promise((resolve, reject) => {
    request(SERVICE_URL)
      .query({ api_key: API_KEY })
      .query(opts)
      .end((err, res) => {
        if (err) return reject(res.error);
        resolve(res.body);
      });
  });
}

module.exports = router.routes();