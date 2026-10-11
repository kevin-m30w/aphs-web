import type { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";

interface UserContextValue {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        displayName: string,
    ) => Promise<{ requiresEmailConfirmation: boolean }>;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(
    undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setIsLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });
        if (error) throw error;
    };
    const register = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: {
                    display_name: displayName,
                },
            },
        });
        if (error) throw error;

        return { requiresEmailConfirmation: !data.session };
    };
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return (
        <UserContext value={{ user, isLoading, login, register, logout }}>
            {children}
        </UserContext>
    );
};
