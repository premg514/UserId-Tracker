import React from 'react';
import './index.css';  // Custom CSS for styling

const APIChainingVisualization = ({ loading, success, error }) => {
  return (
    <div className="api-visualization">
      <h3>API Chain Visualization</h3>

      {/* Flowchart Representation */}
      <div className="flowchart">
        {/* POST API Request Node */}
        <div className={`flow-item ${loading === 'post' ? 'loading' : success === 'post' ? 'success' : error === 'post' ? 'error' : ''}`}>
          POST Request
        </div>
        <div className="arrow">↓</div>

        {/* Server Node */}
        <div className={`flow-item ${loading === 'server' ? 'loading' : success === 'server' ? 'success' : error === 'server' ? 'error' : ''}`}>
          Server
        </div>
        <div className="arrow">↓</div>

        {/* GET API Request Node */}
        <div className={`flow-item ${loading === 'get' ? 'loading' : success === 'get' ? 'success' : error === 'get' ? 'error' : ''}`}>
          GET Request
        </div>
      </div>

      {/* Error Handling */}
      {error && <div className="error-message">Error in {error} API request!</div>}
    </div>
  );
};

export default APIChainingVisualization;
