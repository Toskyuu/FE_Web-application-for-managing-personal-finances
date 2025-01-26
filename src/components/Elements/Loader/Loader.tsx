import React from "react";
import {HashLoader} from "react-spinners";

interface LoaderProps {
    size?: number;
    color?: string;
}

const Loader: React.FC<LoaderProps> = ({size = 30, color = "#702b73"}) => {
    return (
        <div className="flex justify-center items-center">
            <HashLoader size={size} color={color}/>
        </div>
    );
};

export default Loader;
