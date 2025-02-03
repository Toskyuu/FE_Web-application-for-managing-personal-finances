import React, { JSX } from "react";

interface DefaultButtonProps {
    text: string | JSX.Element;
    onClick?: () => void;
    color?: string;
    bgColor?: string;
    fontSize?: string;
    padding?: string;
    radius?: string;
    minwidth?: string;
    ariaLabel?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
                                                         text,
                                                         onClick,
                                                         color,
                                                         bgColor,
                                                         fontSize,
                                                         padding,
                                                         radius,
                                                         minwidth,
                                                         ariaLabel,
                                                     }) => {
    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={onClick}
                aria-label={ariaLabel}
                className={`flex items-center justify-center ${minwidth} ${fontSize} ${padding} ${radius} ${bgColor} ${color}  shadow-lg hover:brightness-125 transition-all duration-300 `}
            >
                {text}
            </button>
        </div>
    );
};

export default DefaultButton;
