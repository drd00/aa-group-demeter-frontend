import { atom } from 'recoil';

export const userState = atom({
    key: 'user',
    default: '',
});

export const profileDataState = atom({
    key: 'profileData',
    default: {
        'First Name': '',
        'Last Name': '',
        'Age': '',
        'Weight': '',
        'Height': '',
        'Goal Weight': '',
        'Primary goal': '',
        'Activity Level': '',
    },
});