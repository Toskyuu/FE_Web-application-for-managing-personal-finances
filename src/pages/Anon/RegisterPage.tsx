import RegisterForm from "@/components/Elements/Forms/RegisterForm.tsx";
import React, {useEffect} from 'react';
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

const RegisterPage: React.FC = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (

        <div>
            <RegisterForm/>
        </div>
    );
};
export default RegisterPage;