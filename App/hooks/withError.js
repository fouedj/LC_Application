import {ErrorState} from '../recoil';
import React from 'react';
const withError = Component => {
  const ForwardedComponent = React.forwardRef((props, ref) => {
    const errors = ErrorState.useGet();
    const {error, screen} = errors;
    // Pass the ref down to the wrapped component as a prop
    return (
      <Component
        forwardedRef={ref}
        error={
          errors.error && (props.url === errors.url || props.screen === screen)
        }
        {...props}
      />
    );
  });

  return ForwardedComponent;
};
export default withError;
export const webViewErrors = [
  'net::ERR_INTERNET_DISCONNECTED',
  'net::ERR_NAME_NOT_RESOLVED',
];
