import React from 'react';

const LinearGradient = ({ children, ...props }) => {
    return <div data-testid="linear-gradient" {...props}>{children}</div>;
};

export default LinearGradient; 