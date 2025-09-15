import * as React from "react";
import styles from "#/components/Wrapper.module.css"

export interface WrapperProps {
    children?: React.ReactNode | undefined;
}

export const Wrapper = ({children}: WrapperProps) => {
    return (
        <>
            <div className={`${styles.wrapper}`}>
                {children}
            </div>
        </>
    );
}