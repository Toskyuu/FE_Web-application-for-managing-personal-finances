import React, { createContext, useState, ReactNode } from 'react';

interface ModalContextProps {
    isOpen: boolean;
    content: ReactNode | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => {
        setContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setContent(null);
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
