import React from "react";

interface FloatingButtonLabelProps {
    label: string;
    color: string;
    bgColor: string;
}

const FloatingButtonLabel: React.FC<FloatingButtonLabelProps> = ({ label, color, bgColor }) => {
    return (
        <div
            className={`text-white text-lg py-1 px-3 rounded-full text-${color} bg-${bgColor} absolute right-full mr-2
                        whitespace-nowrap overflow-hidden text-ellipsis max-w-xs `}
        >
            {label}
        </div>
    );
};

export default FloatingButtonLabel;
