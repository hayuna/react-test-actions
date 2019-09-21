import React, { ComponentType, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const lazyLoad = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) => {
  const LazyComponent = (props: any) => {
    const Component = lazy(factory);

    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  return LazyComponent;
};

export default lazyLoad;
