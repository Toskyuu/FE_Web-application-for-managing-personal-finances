import React from "react";
import { useModal } from "@/hooks/useModal";

const ModalWindow: React.FC = () => {
    const { isOpen, content, closeModal } = useModal();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-background-dark bg-opacity-90 z-30"
                onClick={closeModal}
            ></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="relative bg-surface-light text-text-light dark:bg-surface-dark dark:text-text-dark rounded-lg shadow-lg w-full max-w-lg p-6 mx-4">
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        ✖
                    </button>
                    <div className="text-center">
                        <div className="mb-4">{content}</div>
                        <button
                            onClick={closeModal}
                            className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
                        >
                            Zamknij
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;
