import React, { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm';

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/default-settings');
                if (response.ok) {
                    const settingsData = await response.json();
                    setSettings(settingsData);
                } else {
                    setError('Failed to fetch default settings');
                }
            } catch (error) {
                setError('Error fetching default settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-bold mb-6">Settings</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : settings ? (
                <SettingsForm settings={settings} />
            ) : (
                <p>No settings found.</p>
            )}
        </div>
    );
};

export default SettingsPage;
