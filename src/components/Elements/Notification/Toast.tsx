import React, {useEffect} from 'react';
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({message, type, onClose}) => {
    const icon =
        type === 'success' ? (
            <FontAwesomeIcon icon={faCircleCheck} className="text-success"/>) : (
            <FontAwesomeIcon icon={faCircleXmark} className="text-error"/>);

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className="z-50 fixed top-8 left-1/2 transform -translate-x-1/2 p-4 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark rounded-xl shadow-xl w-auto min-w-[30%] max-w-[50%] mx-auto overflow-hidden"
        >
            <div className="flex items-center space-x-3">
                <div className="text-3xl ">{icon}</div>

                <div className="flex-1 text-center">
                    <p className="text-xl">{message}</p>
                </div>
            </div>

            <motion.div
                className={`absolute bottom-0 left-0 h-1 w-full ${
                    type === "success" ? "bg-success" : "bg-error"
                }`}
                initial={{width: "100%"}}
                animate={{width: 0}}
                transition={{duration: 3}}
            />
        </div>
    );
}


export default Toast;
