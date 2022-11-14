import React, { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}

interface P {
  children?: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: P, context: unknown) {
    super(props, context);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
