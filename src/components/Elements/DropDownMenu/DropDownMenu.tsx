import React, { useState, useRef, useEffect } from "react";

interface MenuOption {
    label: string;
    onClick: () => void;
    className?: string;
}

interface DropDownMenuProps {
    options: MenuOption[];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (onClick: () => void) => {
        setIsOpen(false);
        onClick();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="p-2 hover:text-secondary"
            >
                •••
            </button>

            <div
                className={`absolute right-2/3 bottom-2/3 mt-2 w-40 bg-surface-light dark:bg-surface-dark shadow-2xl rounded-xl z-30 transition-all transform duration-300 overflow-hidden ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
            >
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option.onClick)}
                        className={`block w-full text-left px-4 py-2  text-sm bg-surface-light dark:bg-surface-dark hover:brightness-75 dark:hover:brightness-125  transition-all transform duration-300 ${
                            option.className || ""
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropDownMenu;
