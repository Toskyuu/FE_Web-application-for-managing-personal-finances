import React, {useEffect} from 'react';
import {LoginForm} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <LoginForm/>
        </div>
    );
};
export default LoginPage;