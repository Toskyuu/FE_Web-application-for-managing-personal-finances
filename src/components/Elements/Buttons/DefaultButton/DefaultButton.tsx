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
                                                     }) => {
    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={onClick}
                className={`flex items-center justify-center ${minwidth} ${fontSize} ${padding} ${radius} ${bgColor} ${color}  shadow-lg transition-transform transform`}
            >
                {text}
            </button>
        </div>
    );
};

export default DefaultButton;
