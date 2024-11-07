"use client"
import React from 'react'
import styles from '../styles/Dashboardnewacsession.module.css'
import Image from 'next/image'
export function DashBoardNewAcSession({ openNewSession }) {
  return (
    <div className={styles.DashBoardNewAcSession}> {/* Usando la clase de CSS Module */}
      <div className={styles.title}> {/* Usando la clase de CSS Module */}
        <Image src="/assets/logo.png" alt='Logo' height={200} width={170} className={styles.logo} /> {/* Usando la clase de CSS Module */}
        <button onClick={openNewSession} className={styles.button}> {/* Usando la clase de CSS Module */}
          New Active Recall Session
        </button>
      </div>
    </div>
  )
}
