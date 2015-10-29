import React from 'react';

const Snippet = React.createClass({
  /**
   * Property validations
   * @type {Object}
   */
  propTypes: {
    contentBody: React.PropTypes.string.isRequired
  },

  /**
   * Renders a simple snippet of text
   */
  render: function () {
    return <div className="snippet">{this.props.contentBody}</div>;
  }
});

module.exports = Snippet;