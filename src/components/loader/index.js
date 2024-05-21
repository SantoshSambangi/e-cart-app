import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

const LoadingSpinner = (props) => {
    const { customLoaderContainerStyles, customLoaderStyles } = props;
    return (
        <div
            className={classNames(
                styles.loaderContainerStyles,
                customLoaderContainerStyles
            )}>
            <div
                className={classNames(
                    styles.loaderStyles,
                    customLoaderStyles
                )}></div>
        </div>
    );
};

export default LoadingSpinner;
