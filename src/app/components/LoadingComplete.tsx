import React from 'react'
import styles from '../styles/Loadingcomplete.module.css' // Usando CSS Modules
import Image from 'next/image'
export function LoadingComplete() {
  return (
    <div className={styles.blur1}> {/* Usando la clase de CSS Module */}
      <div className={styles.loadingIndicator}> {/* Usando la clase de CSS Module */}
        <Image className={styles.logo} src="/assets/Logo.png" height={200} width={170}   alt="logo" /> {/* Usando la clase de CSS Module */}
        <p>Session loading...</p>
      </div>
    </div>
  )
}
