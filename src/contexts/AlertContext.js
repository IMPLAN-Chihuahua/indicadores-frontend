import { createContext, useContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const success = (message, timeout = 5000) => {
        setAlertSeverity('success');
        setAlertMessage(message);
    };

    const error = (message, timeout = 5000) => {
        setAlertSeverity('error');
        setAlertMessage(message);
        
    };

    const clear = () => {
        setAlertMessage('');
        setAlertSeverity('');
    }

    return (
        <AlertContext.Provider
            value={{
                success,
                error,
                clear,
                severity: alertSeverity,
                message: alertMessage,
            }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);