import React, {createContext, useState, ReactNode} from "react";
import {Toast} from "@/components";
import {v4 as uuidv4} from "uuid";
import {AnimatePresence, motion} from "framer-motion";

interface ToastContextType {
    showToast: (message: string, type: "success" | "error") => void;
}

interface ToastItem {
    id: string;
    message: string;
    type: "success" | "error";
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const showToast = (message: string, type: "success" | "error") => {
        const id = uuidv4();
        setToasts((prev) => [...prev, {id, message, type}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <div className="fixed top-8 right-4 z-50 flex flex-col space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div key={toast.id} layout>
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
