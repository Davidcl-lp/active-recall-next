import React, { useState } from 'react';
import styles from '../styles/Dashboardcurrentsession.module.css';

export function DashBoardMenuCurrentSession({ questions, handleResponse }) {
  // Crear un estado para almacenar las respuestas
  const [answers, setAnswers] = useState(questions.map(() => '')); // Inicializa un array de respuestas vacío

  // Maneja el cambio de texto en los textareas
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers]; // Copia del array de respuestas
    updatedAnswers[index] = value; // Actualiza la respuesta en el índice correspondiente
    setAnswers(updatedAnswers); // Actualiza el estado con las nuevas respuestas
  };

  // Maneja el envío de las respuestas
  const handleResponseGpt = () => {
    handleResponse(answers); // Envía las respuestas al padre
  };

  return (
    <div className={styles.DashBoardMenuCurrentSession}> 
      <ul className={styles.questionsList}>
        {
          questions.map((question, index) => (
            <ol key={index} className={styles.questionItem}>
              <p className={styles.question}>{question}</p>
              <textarea 
                value={answers[index]} // Asocia el valor del textarea con el estado
                onChange={(e) => handleAnswerChange(index, e.target.value)} // Maneja el cambio del texto
                className={styles.answerInput} 
                placeholder="Your answer" 
              />
            </ol>
          ))
        }
      </ul>
      <button className={styles.sendButton} onClick={handleResponseGpt}>Send</button> 
    </div>
  );
}
