import React, { useState, useEffect } from 'react';

const WorkflowLoader = ({ onWorkflowDataLoaded }) => {
  const [loadingOption, setLoadingOption] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rawJson, setRawJson] = useState('');

  // Fetch apiToken from localStorage or prompt the user
  useEffect(() => {
    const token = localStorage.getItem('apiToken');
    if (token) {
      setApiToken(token);
    } else {
      alert('API token is required to fetch data.');
    }
  }, []);

// Fetch companies when companyName changes
useEffect(() => {
  const fetchCompanies = async () => {
    if (companyName.trim() === '') {
      setCompanySuggestions([]);
      return;
    }

    const query = `
        {
          companies(first: 20, name: "${companyName}") {
            edges {
              node {
                name
              }
            }
          }
        }
      `;

    try {
      const response = await fetch('https://api.record360.com/v2', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const companies = data.data.companies.edges.map((edge) => edge.node.name);
      setCompanySuggestions(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  if (apiToken) {
    fetchCompanies();
  }
}, [companyName, apiToken]);

// Fetch locations when companyName is selected
useEffect(() => {
  const fetchLocations = async () => {
    if (!companyName) {
      setLocations([]);
      return;
    }

    const query = `
        {
          companies(first: 5, name: "${companyName}") {
            edges {
              node {
                name
                locations {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;

    try {
      const response = await fetch('https://api.record360.com/v2', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const locationsData =
        data.data.companies.edges[0]?.node.locations.edges.map((edge) => edge.node) || [];
      setLocations(locationsData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  if (apiToken) {
    fetchLocations();
  }
}, [companyName, apiToken]);

// Load workflow data using the selected company and location
const loadWorkflowData = async () => {
  if (!companyName || !locationId) {
    alert('Please select a company and a location.');
    return;
  }

  setIsLoading(true);

  try {
    const query = `
        {
          location(id: "${locationId}") {
            workflows(last: 1) {
              edges {
                node {
                  id
                  body
                }
              }
            }
          }
        }
      `;

    const response = await fetch('https://api.record360.com/v2', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const workflows = data.data.location.workflows.edges;

    if (workflows.length > 0) {
      const workflowBody = workflows[0].node.body;

      // Pass the workflowData back to App.js
      onWorkflowDataLoaded(workflowBody);
    } else {
      alert('No workflows found for this location.');
    }
  } catch (error) {
    console.error('Error loading workflow data:', error);
    alert('An error occurred while loading the workflow data.');
  } finally {
    setIsLoading(false);
  }
};

// Handle the user inputting raw JSON and process it
const handleRawJsonSubmit = () => {
  try {
    const parsedJson = JSON.parse(rawJson);
    // Pass the parsed workflowData back to App.js
    onWorkflowDataLoaded(parsedJson);
  } catch (error) {
    alert('Invalid JSON format. Please check your input.');
  }
};

// Reset the loading option (back button functionality)
const handleBack = () => {
  setLoadingOption('');
  setCompanyName('');
  setLocationId('');
  setRawJson('');
};

return (
  <div className="workflow-loader-container">
    {/* Option Selection */}
    {!loadingOption && (
      <div className="loading-options">
        <h2 className="main-h2">Load Workflow</h2>
        <button onClick={() => setLoadingOption('companyLocation')}>
          Load from Company and Location
        </button>
        <button onClick={() => setLoadingOption('rawJson')}>
          Load from Raw JSON
        </button>
      </div>
    )}

    {/* Company and Location Input */}
    {loadingOption === 'companyLocation' && (
      <div>
        <div className="load-workflow-div">
          {/* Back Button */}
          <button onClick={handleBack} className="back-button-main">
            ←
          </button>
          <h2>Load Workflow</h2>
        </div>

        {/* Company Input */}
        <input
          type="text"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          list="company-list"
        />
        <datalist id="company-list">
          {companySuggestions.map((company) => (
            <option key={company} value={company} />
          ))}
        </datalist>

        {/* Location Dropdown */}
        <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        {/* Load Workflow Button */}
        <button onClick={loadWorkflowData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Workflow'}
        </button>
        {isLoading && <div className="loading">Loading workflow...</div>}
      </div>
    )}

    {/* Raw JSON Input */}
    {loadingOption === 'rawJson' && (
      <div>
        <div className="load-workflow-div">
          {/* Back Button */}
          <button onClick={handleBack} className="back-button-main">
            ←
          </button>
          <h2>Load Workflow</h2>
        </div>

        <textarea
          rows={10}
          cols={50}
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          placeholder="Paste your raw JSON here"
        />
        <button onClick={handleRawJsonSubmit}>
          Process and Load JSON
        </button>
      </div>
    )}
  </div>
);
};

export default WorkflowLoader;
