import React, { useEffect } from 'react';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const icon = type === 'success'
        ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
        : <FontAwesomeIcon icon={faCircleXmark} className="text-error" />;

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            layout
            className=" p-4 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark rounded-xl shadow-xl w-auto min-w-[250px] max-w-[350px] mx-auto contain-paint"
        >
            <div className="flex items-center space-x-3">
                <div className="text-3xl">{icon}</div>
                <p className="text-md">{message}</p>
            </div>

            <motion.div
                className={`absolute bottom-0 left-0 h-1 w-full ${type === "success" ? "bg-success" : "bg-error"}`}
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 3 }}
            />
        </motion.div>
    );
}

export default Toast;
