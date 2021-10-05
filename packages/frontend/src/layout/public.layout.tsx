import React from 'react';

const PublicLayout: React.FC = ({ children }) => {
  return (
    <div className="public-layout">
      {children}
    </div>
  );
};

export default PublicLayout;
