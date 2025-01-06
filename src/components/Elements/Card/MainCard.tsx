import React, {ReactNode} from "react";

interface MainCardProps {
    fontSize: string;
    padding: string;
    height: string;
    width: string;
    children: ReactNode;
}

const MainCard: React.FC<MainCardProps> = ({
                                                         children,
                                                         fontSize,
                                                         padding,
                                                         height,
                                                         width
                                                     }) => {
    return (
        <div
            className={`${fontSize} ${padding} ${height} ${width} bg-surface-light dark:bg-surface-dark content-center text-center dark:text-text-dark text-text-light rounded-2xl shadow-2xl`}>
            {children}
        </div>
    )
        ;
};

export default MainCard;
