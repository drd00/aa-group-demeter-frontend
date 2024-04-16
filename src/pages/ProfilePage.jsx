import React, { useState } from 'react';
import ProfileField from '../components/ProfileField';
import { useRecoilState } from 'recoil';
import { userState as userAtom } from '../shared_state/Atoms';
import { profileDataState as profileAtom } from '../shared_state/Atoms';
import useAuthenticatedRequest from '../hooks/useAuthenticatedRequest';

const ProfilePage = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    const [profileDataState, setProfileDataState] = useRecoilState(profileAtom);
    const [_isHovered, setIsHovered] = useState(false);
    const { makeRequest } = useAuthenticatedRequest();

    const handleUpdate = async (label, newValue) => {
        const fieldMap = {
            'First Name': 'firstName',
            'Last Name': 'lastName',
            'Age': 'age',
            'Weight': 'weight',
            'Goal Weight': 'goalWeight',
            'Height': 'height',
            'Activity Level': 'activityLevel',
        };

        const field = fieldMap[label];
        let response = await makeRequest('http://localhost:8000/profile', 'PUT', { [field]: newValue });

        setProfileDataState(prev => ({ ...prev, [field]: newValue }));
    };

    return (
        <div>
            {
                userState && (
                <>
                    <div className="max-w-4xl mx-auto p-4">
                        <h2 className='text-lg font-semibold mb-4'>Hello, {profileDataState.firstName}.</h2>
                        <div className='grid grid-cols-1 gap-1'>
                            <ProfileField label='First Name' value={profileDataState['firstName']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Last Name' value={profileDataState['lastName']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Age' value={profileDataState['age']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Weight' value={profileDataState['weight']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Goal Weight' value={profileDataState['goalWeight']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Height' value={profileDataState['height']} onModify={setIsHovered} onUpdate={handleUpdate} />
                            <ProfileField label='Activity Level' value={profileDataState['activityLevel']} onModify={setIsHovered} onUpdate={handleUpdate} />
                        </div>
                    </div>
                </>
                )
            }
            {
                !userState && (<>
                        You are not signed in.
                    </>
                )
            }
        </div>
    );
};

export default ProfilePage;