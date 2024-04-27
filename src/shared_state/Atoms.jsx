import { atom, selector } from 'recoil';

export const userState = atom({
    key: 'user',
    default: null,
});

export const profileDataState = atom({
    key: 'profileData',
    default: null,
});

export const settingsState = atom({
    key: 'settings',
    default: null,
});

export const loadingState = atom({
    key: 'loadingState',
    default: true,
});

export const isLoadingSelector = selector({
    key: 'isLoadingSelector',
    get: ({ get }) => {
        const loadings = get(loadingState);
        return loadings.includes(true);
    }
});

