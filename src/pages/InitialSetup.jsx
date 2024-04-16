import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { userState as userAtom } from '../shared_state/Atoms';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { profileDataState as profileAtom } from '../shared_state/Atoms';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';

const InitialSetup = ({ onSignOut }) => {
    const setProfile = useSetRecoilState(profileAtom);
    const userState = useRecoilValue(userAtom);
    const { makeRequest } = useAuthenticatedRequest();
    const nav = useNavigate();

    const navHome = () => {
        nav('/');
    };

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestData = {
            ...formData,
            uid: userState.uid
        };

        try {
            const response = await makeRequest('http://localhost:8000/profile', 'POST', JSON.stringify(requestData));

            if (response !== null) {
                setProfile(response.data);
                navHome();
            } else {
                setProfile(null);
            }
        } catch (error) {
            setProfile(null);
        }
        
    };
    
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
                <div className='text-lg font-semibold text-center text-gray-900 mb-6'>
                    Let&apos;s get started. Tell us some things about yourself.
                </div>
                <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
                    <div className='mb-6'>
                        <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-900'>
                            First Name:
                        </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='lastName' className='block mb-2 text-sm font-medium text-gray-900'>
                            Last Name:
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='age' className='block mb-2 text-sm font-medium text-gray-900'>
                            Age:
                        </label>
                        <input
                            type='text'
                            id='age'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='height' className='block mb-2 text-sm font-medium text-gray-900'>
                            Height:
                        </label>
                        <input
                            type='text'
                            id='height'
                            name='height'
                            value={formData.height}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='age' className='block mb-2 text-sm font-medium text-gray-900'>
                            Weight:
                        </label>
                        <input
                            type='text'
                            id='weight'
                            name='weight'
                            value={formData.weight}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='goalWeight' className='block mb-2 text-sm font-medium text-gray-900'>
                            Goal Weight:
                        </label>
                        <input
                            type='text'
                            id='goalWeight'
                            name='goalWeight'
                            value={formData.goalWeight}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='activityLevel' className='block mb-2 text-sm font-medium text-gray-900'>
                            Activity Level:
                        </label>
                        <input
                            type='text'
                            id='activityLevel'
                            name='activityLevel'
                            value={formData.activityLevel}
                            onChange={handleChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                        />
                    </div>
                    <button type="submit" className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                        Submit
                    </button>
                    <button type="button" onClick={onSignOut} className='text-blue-500 hover:text-blue-700 text-sm text-center w-full mt-4'>Sign out</button>
                </form>
            </div>
        </div>
    );
};

InitialSetup.propTypes = {
    onSignOut: PropTypes.func.isRequired,
};

export default InitialSetup;