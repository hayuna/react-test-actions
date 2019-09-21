import React, { Component, ErrorInfo } from 'react';

import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { RefreshOutlined } from '@material-ui/icons';

interface IError {
  readonly error?: Error;
  readonly errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component {
  public state: IError = {
    error: undefined,
    errorInfo: undefined,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public shouldComponentUpdate(_nextProps: {}, nextState: IError) {
    if (this.state.errorInfo && !nextState.errorInfo) {
      return false;
    }
    return true;
  }

  public handleRetry = () => {
    this.setState({
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render() {
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      const errorDetails =
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : (
          undefined
        );

      return (
        <Card>
          <CardContent>
            <Typography variant='h4' component='h2'>
              Oops!!! Something went wrong.
            </Typography>
            {errorDetails}
          </CardContent>
          <CardActions>
            <Button variant='outlined' color='primary' onClick={this.handleRetry}>
              <RefreshOutlined />
              Retry
            </Button>
          </CardActions>
        </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
