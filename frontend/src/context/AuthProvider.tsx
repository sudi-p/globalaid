import { ReactNode, createContext, useState } from "react";

export type AuthProps = {
    accessToken: string;
    user: {
        email: string;
    };
}

type AuthContextType = {
    auth: AuthProps,
    setAuth: (authData: AuthProps) => void
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState({ accessToken: "", user: { email: "" } });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
// console.log(AuthContext)
// const useAuthContext = useContext(AuthContext)

export default AuthContext;