// hooks/useAuth.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check persisted login on startup
    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedStatus = await AsyncStorage.getItem('isAuthenticated');
            if (storedStatus === 'true') {
                setIsAuthenticated(true);
            }
        };
        checkLoginStatus();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        if (username === 'simongarcia' && password === 'Test@123') {
            setIsAuthenticated(true);
            await AsyncStorage.setItem('isAuthenticated', 'true');
            return true;
        }
        return false;
    };

    const logout = async (): Promise<void> => {
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
