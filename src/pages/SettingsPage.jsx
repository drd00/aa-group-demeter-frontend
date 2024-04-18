import React from 'react';

const SettingsPage = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-medium mb-2">Recommendation settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <p>Calorie compensation</p>
              <Toggle />
            </div>
            <div className="flex items-center justify-between">
              <p>Display calories</p>
              <Toggle />
            </div>
            <div className="flex items-center justify-between">
              <p>Protein-goal based</p>
              <Toggle />
            </div>
            <div className="flex items-center justify-between">
              <p>Display protein</p>
              <Toggle />
            </div>
            {/* Add more settings rows here as needed */}
            <div className="flex items-center justify-between">
              <p>Display carbohydrates</p>
              <Toggle />
            </div>
            {/* ... */}
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 mt-4">
          <h2 className="text-lg font-medium mb-2">UI settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add more UI settings rows here as needed */}
          </div>
        </div>
      </div>
    );
  };
  
  const Toggle = () => {
    return (
      <label className="flex items-center cursor-pointer">
        <span className="mr-2">Enabled</span>
        <input type="checkbox" className="rounded-full bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
        <span className="ml-2">Disabled</span>
      </label>
    );
  };

export default SettingsPage;