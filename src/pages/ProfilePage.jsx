import { useRecoilState } from 'recoil';
import { userState as userAtom } from '../shared_state/Atoms';

const ProfilePage = () => {
    const [userState, _setUserState] = useRecoilState(userAtom);
    // improve the styling and add more content to this page whenever possible
    return (
        <div>
            {
                userState && (<>
                        <h1>Your Profile</h1>
                        <p>
                            Under construction...
                        </p>
                        Your email address is {userState}.
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