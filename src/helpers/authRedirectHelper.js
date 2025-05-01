let logoutCallback = null;

export const setLogoutCallback = async (cb) => {
    logoutCallback = cb;
};

export const triggerCheckToken = async () => {
    if (logoutCallback) {
        await logoutCallback();
    }
};
