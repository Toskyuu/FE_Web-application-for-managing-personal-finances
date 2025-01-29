import React from "react";
import {useModal} from "@/hooks/useModal";

const ModalWindow: React.FC = () => {
    const {isOpen, content, closeModal} = useModal();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-background-dark bg-opacity-90 z-30"
                onClick={closeModal}
            ></div>

            <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
                <div
                    className="relative bg-surface-light text-text-light dark:bg-surface-dark dark:text-text-dark rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4 pointer-events-auto"
                >
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        ✖
                    </button>
                    <div className="text-left pt-4">
                        <div className="scrollbar-custom mb-4 px-4 max-h-[500px]">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;
