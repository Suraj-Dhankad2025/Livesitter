import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverlaySettings = () => {
    const [settings, setSettings] = useState([]);
    const [newSetting, setNewSetting] = useState({ name: '', value: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('/overlay_settings');
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewSetting({
            ...newSetting,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateSetting = async () => {
        try {
            await axios.post('/overlay_settings', newSetting);
            setNewSetting({ name: '', value: '' });
            fetchSettings();
        } catch (error) {
            console.error('Error creating setting:', error);
        }
    };

    const handleDeleteSetting = async (id) => {
        try {
            await axios.delete(`/overlay_settings/${id}`);
            fetchSettings();
        } catch (error) {
            console.error('Error deleting setting:', error);
        }
    };

    return (
        <div>
            <h2>Overlay Settings</h2>
            <ul>
                {settings.map(setting => (
                    <li key={setting._id}>
                        {setting.name} - {setting.value}
                        <button onClick={() => handleDeleteSetting(setting._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add New Setting</h3>
            <input type="text" name="name" placeholder="Name" value={newSetting.name} onChange={handleInputChange} />
            <input type="text" name="value" placeholder="Value" value={newSetting.value} onChange={handleInputChange} />
            <button onClick={handleCreateSetting}>Add Setting</button>
        </div>
    );
};

export default OverlaySettings;
