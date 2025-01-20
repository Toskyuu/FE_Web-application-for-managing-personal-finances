import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {confirmEmail} from "@/API/UserAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {useNavigate} from "react-router-dom";
import {MainCard} from "@/components";

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const {showToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const confirm = async () => {
            if (token) {
                try {
                    const response = await confirmEmail(token);
                    navigate('/');
                    showToast(response, 'success');
                } catch (error: any) {
                    showToast(error.message, 'error');
                }
            }
        };

        confirm();
    }, [token]);


    return (
        <div className="flex flex-col items-center">

            <MainCard
                fontSize="text-xl"
                padding="p-10"
                height="h-auto"
                width="w-full max-w-md"
            >
                <h1>Potwierdzanie emaila</h1>
                {token ? (
                    <p>Trwa potwierdzanie Twojego emaila...</p>
                ) : (
                    <p>Nie znaleziono tokenu w linku.</p>
                )}
            </MainCard>
        </div>
    );
};

export default ConfirmEmail;
