
export const isBiometricsAvailable = async (): Promise<boolean> => {
    if (!window.PublicKeyCredential) return false;
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
};

export const authenticateWithBiometrics = async (): Promise<boolean> => {
    // Simulation of WebAuthn flow
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Biometric Auth Successful (Simulated)");
            resolve(true);
        }, 1000);
    });
};
