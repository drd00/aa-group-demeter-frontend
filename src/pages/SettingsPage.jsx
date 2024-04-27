import React, { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm';
import { settingsState as settingsAtom } from '../shared_state/Atoms';
import { useRecoilState } from 'recoil';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';

const SettingsPage = () => {
    const [settingsState, setSettingsState] = useRecoilState(settingsAtom);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(null);
    const [error, setError] = useState(null);
    const { makeRequest } = useAuthenticatedRequest();

    // useEffect(() => {
    //     const fetchSettings = async () => {
    //         try {
    //             const response = await makeRequest('http://localhost:8000/settings');
    //             if (response.ok) {
    //                 const settingsData = response.data;
    //                 setSettings(settingsData);
    //             } else {
    //                 setError('Failed to fetch default settings');
    //             }
    //         } catch (error) {
    //             setError('Error fetching default settings');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSettings();
    // }, []);

    // const handleUpdate = async () => {

    // }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-bold mb-6">Settings</h1>
            <SettingsForm settings={settingsState} />
        </div>
    );
};

export default SettingsPage;
