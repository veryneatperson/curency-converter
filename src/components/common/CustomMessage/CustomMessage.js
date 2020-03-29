import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CustomMessage extends Component {
  state = {
    hidden: false,
  }

  handleDismiss = () => this.setState({ hidden: true })

  render() {
    const { type, header, content } = this.props;
    return (
      <Message
        error={type === 'error'}
        warning={type === 'warning'}
        onDismiss={this.handleDismiss}
        // eslint-disable-next-line react/destructuring-assignment
        hidden={this.state.hidden}
      >
        <Message.Header>{header}</Message.Header>
        <p>{content}</p>
      </Message>
    );
  }
}

CustomMessage.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CustomMessage;
