"use client"
import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { DashBoardMenu } from '../components/DashBoardMenu';
import { DashBoardNewAcSession } from '../components/DashBoardNewAcSession';
import { NewAcSessionCreator } from '../components/NewAcSessionCreator';
import { extractQuestions } from '../controllers/extractQuestions';
import { DashBoardMenuCurrentSession } from '../components/DashBoardCurrentSession';
import { gptResponseApi } from '../services/gptResponseApi'
export default function DashBoard() {
    const [visibleDashBoardNewAcSession, setVisibleDashBoardNewAcSession] = useState(true);
    const [visibleNewAcSessionCreator, setVisibleNewAcSessionCreator] = useState(false);
    const [visibleDashBoardCurrentSession, setVisibleDashBoardCurrentSession] = useState(false);
    const [questionsGlobal, setQuestionsGlobal] = useState([]);
    const [combined, setCombined] = useState(''); // Variable para almacenar el texto combinado

    function openNewSession() {
        setVisibleNewAcSessionCreator(true);
    }

    function closeNewSession() {
        setVisibleNewAcSessionCreator(false);
    }

    const handleGptNewSession = (gptResponse) => {
        const questions = extractQuestions(gptResponse);
        setQuestionsGlobal(questions);
        console.log(questions);
        setVisibleDashBoardNewAcSession(false);
        setVisibleDashBoardCurrentSession(true);
        setVisibleNewAcSessionCreator(false);
    }

    const handleGpt = async (gptResponse) => {
        let combinedText = '';

        questionsGlobal.forEach((question, index) => {
            combinedText += `Pregunta ${index + 1}: ${question}\nRespuesta: ${gptResponse[index]}\n\n`;
        });

        console.log("Texto combinado:\n", combinedText);
        setCombined(combinedText);
        const gptCorrection = await gptResponseApi(combinedText);
        console.log("Correcion de chatgpt", gptCorrection);
    }

    return (
        <div className={styles.DashBoard}>
            <DashBoardMenu />
            {visibleDashBoardNewAcSession && <DashBoardNewAcSession openNewSession={openNewSession} />}
            {visibleNewAcSessionCreator && <NewAcSessionCreator handleGpt={handleGptNewSession} closeNewSession={closeNewSession} />}
            {visibleDashBoardCurrentSession && <DashBoardMenuCurrentSession questions={questionsGlobal} handleResponse={handleGpt} />}
        </div>
    );
}
