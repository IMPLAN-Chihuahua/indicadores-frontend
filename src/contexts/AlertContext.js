import { createContext, useContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const success = (message) => {
        setAlertSeverity('success');
        setAlertMessage(message);
    };

    const error = (message) => {
        setAlertSeverity('error');
        setAlertMessage(message);
    };

    const warning = (message) => {
        setAlertSeverity('warning');
        setAlertMessage(message);
    }

    const clear = () => {
        setAlertMessage('');
        setAlertSeverity('');
    }

    return (
        <AlertContext.Provider
            value={{
                success,
                error,
                warning,
                clear,
                severity: alertSeverity,
                message: alertMessage,
            }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);