import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SettingsForm = ({ settings }) => {
    // Destructure settings object to extract individual settings
    const { uid, calorie_compensation, protein_goal, display_calories, display_protein, display_fat, display_carbs } = settings;

    // Initialize state variables with settings values
    const [calorieCompensation, setCalorieCompensation] = useState(calorie_compensation);
    const [proteinGoal, setProteinGoal] = useState(protein_goal);
    const [displayCalories, setDisplayCalories] = useState(display_calories);
    const [displayProtein, setDisplayProtein] = useState(display_protein);
    const [displayFat, setDisplayFat] = useState(display_fat);
    const [displayCarbs, setDisplayCarbs] = useState(display_carbs);

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Submit form data to backend API
            const response = await fetch(`/api/settings/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    calorie_compensation: calorieCompensation,
                    protein_goal: proteinGoal,
                    display_calories: displayCalories,
                    display_protein: displayProtein,
                    display_fat: displayFat,
                    display_carbs: displayCarbs
                })
            });
            if (response.ok) {
                // Handle successful response (e.g., show success message)
            } else {
                // Handle error response (e.g., show error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Settings</h2>
            {/* Input fields for settings */}
            <label>
                Calorie Compensation:
                <input type="checkbox" checked={calorieCompensation} onChange={(e) => setCalorieCompensation(e.target.checked)} />
            </label>
            <label>
                Protein Goal:
                <input type="number" value={proteinGoal} onChange={(e) => setProteinGoal(e.target.value)} />
            </label>
            {/* Add more input fields for other settings */}
            <button type="submit">Save</button>
        </form>
    );
};

// Prop type validation
SettingsForm.propTypes = {
    settings: PropTypes.shape({
        uid: PropTypes.number.isRequired,
        calorie_compensation: PropTypes.number.isRequired,
        protein_goal: PropTypes.number.isRequired,
        display_calories: PropTypes.bool.isRequired,
        display_protein: PropTypes.bool.isRequired,
        display_fat: PropTypes.bool.isRequired,
        display_carbs: PropTypes.bool.isRequired
    }).isRequired
};

export default SettingsForm;
