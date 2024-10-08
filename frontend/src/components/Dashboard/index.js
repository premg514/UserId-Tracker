import React, { useState } from 'react';
import axios from 'axios';
import APIChainingVisualization from '../APIChainingVisualization'; // Adjust the path as needed
import './index.css'; // Your existing CSS

const Dashboard = () => {
  const [postData, setPostData] = useState({ userId: '', name: '' });
  const [getData, setGetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(null);
  const [successState, setSuccessState] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handlePostRequest = async () => {
    // Reset previous states
    setSuccessState(null);
    setErrorState(null);
    setLoadingState('post'); // Set loading state for POST
    setLoading(true);
    setError(null);
  
    // Log the postData to verify the data being sent
    console.log('POST data being sent:', postData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/post', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('POST response:', response.data);
      setSuccessState('post'); // Set success state for POST
      setPostData({ userId: '', name: '' }); // Clear input after successful submission
    } catch (error) {
      // Log the entire error object for more insight
      console.error('Error in POST request:', error.response ? error.response.data : error.message);
      
      // Show a more specific error message if available
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Failed to submit data.');
      }
  
      setErrorState('post'); // Set error state for POST
    } finally {
      setLoading(false);
      // Clear loading state after a short delay
      setTimeout(() => setLoadingState(null), 1000);
    }
  };
  
  
  
  
  const handleGetRequest = async () => {
    // Reset previous states
    setSuccessState(null);
    setErrorState(null);
    setLoadingState('get'); // Set loading state for GET
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/get');
      setGetData(response.data);
      setResult(JSON.stringify(response.data));
      setSuccessState('get'); // Set success state for GET
    } catch (error) {
      console.error('Error in GET request:', error);
      setErrorState('get'); // Set error state for GET
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
      // Clear loading state after a short delay
      setTimeout(() => setLoadingState(null), 1000);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
  
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
  
      <div className="post-section">
  <h3>Submit Data</h3>
  <input 
    type="text" 
    name="userId" 
    placeholder="Enter UserId" 
    value={postData.userId} 
    onChange={handleInputChange} 
  />
  <input 
    type="text" 
    name="name" 
    placeholder="Enter Name" 
    value={postData.name} 
    onChange={handleInputChange} 
  />
  <button onClick={handlePostRequest} disabled={loading}>Submit POST Request</button>
</div>

  
      <div className="get-section">
        <h3>Fetch Data</h3>
        <button onClick={handleGetRequest} disabled={loading}>Fetch Data</button>
        
        {getData && (
          <div>
            <h4>Fetched Data:</h4>
            <ul>
              {getData.map((item, index) => (
                <li key={index}>
                  <strong>UserId:</strong> {item.userId} | <strong>Name:</strong> {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  
      {/* Add the APIChainingVisualization component here */}
      <APIChainingVisualization 
        loading={loadingState} 
        success={successState} 
        error={errorState} 
      />
    </div>
  );
  
  
};

export default Dashboard;
