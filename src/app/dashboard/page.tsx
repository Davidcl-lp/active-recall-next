"use client"
import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { DashBoardMenu } from '../components/DashBoardMenu';
import { DashBoardNewAcSession } from '../components/DashBoardNewAcSession';
import { NewAcSessionCreator } from '../components/NewAcSessionCreator';
import { extractQuestions } from '../controllers/extractQuestions';
import { DashBoardMenuCurrentSession } from '../components/DashBoardCurrentSession';

export default function DashBoard() {
    const [visibleDashBoardNewAcSession, setVisibleDashBoardNewAcSession] = useState(true);
    const [visibleNewAcSessionCreator, setVisibleNewAcSessionCreator] = useState(false);
    const [visibleDashBoardCurrentSession, setVisibleDashBoardCurrentSession] = useState(false);
    const [questionsGlobal, setQuestionsGlobal] = useState([]);
    const [questionsAndResponses, setQuestionsAndResponses] = useState([]); // Nuevo estado para preguntas y respuestas combinadas

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

    const handleGpt = (gptResponse) => {
        const combinedQuestionsAndResponses = questionsGlobal.map((question, index) => {
            return {
                question: question,
                response: gptResponse[index]
            };
        });

        console.log("Todo a corregir es: ", combinedQuestionsAndResponses);
        // Guardamos las preguntas y respuestas en el estado
        setQuestionsAndResponses(combinedQuestionsAndResponses);

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
