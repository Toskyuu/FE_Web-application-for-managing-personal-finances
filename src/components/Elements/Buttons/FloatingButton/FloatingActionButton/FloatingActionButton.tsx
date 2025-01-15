import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {FloatingButtonLabel} from "@/components";

interface FloatingActionButtonProps {
    icon: FontAwesomeIconProps["icon"];
    label: string;
    onClick: () => void;
    color: string;
    bgColor: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, label, onClick, color, bgColor }) => {
    return (
        <div className="relative flex items-center">
            <FloatingButtonLabel label={label} color={color} bgColor={bgColor} />
            <button
                onClick={onClick}
                className={`w-16 h-16 ${bgColor} text-text-dark rounded-full shadow-lg flex items-center justify-center transition-transform transform`}
            >
                <FontAwesomeIcon icon={icon} size="xl" />
            </button>
        </div>
    );
};

export default FloatingActionButton;
