import React from 'react';

interface PageLoaderProps {}

const PageLoader: React.FC<PageLoaderProps> = () => (
  <div className="position-absolute top-0 left-0 bottom-0 end-0 bg-secondary bg-gradient opacity-50 w-100 d-flex align-items-center justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default PageLoader;
