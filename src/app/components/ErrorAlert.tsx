import React, { useEffect, useState } from 'react';
import styles from '../styles/Erroralert.module.css';

export function ErrorAlert({message, duration, onClose}){
    const [visible, setVisible] = useState(true)

    useEffect(
        () => {
           const timer = setTimeout(
                () => {
                    setVisible(false);
                    onClose();
                }, duration)
            return () => clearTimeout(timer)
        }, [duration, onClose])
    if (!visible) return null
    return(
        <div className={styles.alert}>
            {message}
        </div>
    )
}