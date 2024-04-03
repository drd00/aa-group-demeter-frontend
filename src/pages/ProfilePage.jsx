import React, { useState } from 'react';
import ProfileField from '../components/ProfileField';
import { useRecoilState } from 'recoil';
import { userState as userAtom } from '../shared_state/Atoms';
import { profileDataState as profileAtom } from '../shared_state/Atoms';

const ProfilePage = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    const [profileDataState, setProfileDataState] = useRecoilState(profileAtom);
    const [_isHovered, setIsHovered] = useState(false);

    const handleUpdate = (field, newValue) => {
        // setProfileDataState(prev => ({ ...prev, [field]: newValue }));

        // Send API call.
        console.log(`Updating ${field} to ${newValue}`);

        // if successful, update the state
    };

    return (
        <div>
            {
                userState && (
                <>
                    <div className="max-w-4xl mx-auto p-4 flex-center">
                        <div className="mt-6">
                            <h2 className='text-lg font-semibold mb-4'>Hello, {userState}.</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <ProfileField label='First Name' value={profileDataState['First Name']} onModify={setIsHovered} onUpdate={handleUpdate} />
                                <ProfileField label='Last Name' value={profileDataState['Last Name']} onModify={setIsHovered} onUpdate={handleUpdate}/>
                                {/* <ProfileField label='Age' value={profileDataState['Age']} onModify={setIsHovered} onUpdate={handleUpdate}/>
                                <ProfileField label='Weight' value={profileDataState['Weight']} onModify={setIsHovered} onUpdate={handleUpdate}/>
                                <ProfileField label='Height' value={profileDataState['Height']} onModify={setIsHovered} onUpdate={handleUpdate}/>
                                <ProfileField label='Goal Weight' value={profileDataState['Goal Weight']} onModify={setIsHovered} onUpdate={handleUpdate}/>
                                <ProfileField label='Primary goal' value={profileDataState['Primary goal']} onModify={setIsHovered} onUpdate={handleUpdate}></ProfileField>
                                <ProfileField label='Activity Level' value={profileDataState['Activity Level']} onModify={setIsHovered} onUpdate={handleUpdate}/> */}
                                </div>
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