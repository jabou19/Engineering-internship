import React, { createContext, useState } from 'react';

// using context API, we can create a global loader.
// create pass data  to pass data
export const LoaderContext = createContext();

//the provider allows consuming the components to subscribe to context changes
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

