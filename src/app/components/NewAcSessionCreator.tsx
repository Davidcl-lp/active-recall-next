import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Newacsessioncreator.module.css'; // Usando CSS Modules
import fileImg from '../assets/fileImg.png';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { ErrorAlert } from './ErrorAlert';
import { gpt } from '../services/gpt';
import { LoadingComplete } from './LoadingComplete';

export function NewAcSessionCreator({ loadingFunction, handleGpt, closeNewSession }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pagesProcessStart: '',
    pagesProcessFinish: '',
    questionsPerPage: '',
    sessionDuration: '',
    file: null,
    difficulty: 'easy',
  });

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setFormData((prev) => ({
      ...prev,
      difficulty: difficulty,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        file: acceptedFiles[0],
      }));
    },
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const pdfPages = async () => {
    if (formData.file && formData.file.type === 'application/pdf') {
      try {
        const fileArrayBuffer = await formData.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileArrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        return pageCount;
      } catch (error) {
        console.error('Error al procesar el archivo PDF:', error);
      }
    }
  };

  const handleFormErrors = async () => {
    let error = false;
    let fieldEmpty = false;
    for (let field in formData) {
      if (formData.hasOwnProperty(field)) {
        if (formData[field] === null || formData[field] === undefined || formData[field] === '') {
          fieldEmpty = true;
          error = true;
        }
      }
    }
    if (fieldEmpty === true) {
      fieldEmpty = false;
      setError('Fill in all fields and upload a file');
      setShowAlert(true);
    } else {
      if (formData.file != null) {
        const pages = await pdfPages();
        if (formData.pagesProcessStart > pages || formData.pagesProcessStart < 0 || formData.pagesProcessFinish > pages || formData.pagesProcessFinish < 0 || formData.pagesProcessFinish < formData.pagesProcessStart) {
          setError('Error in processed pages');
          setShowAlert(true);
          error = true;
        }
      }
      if (formData.questionsPerPage < 1 || formData.questionsPerPage > 3) {
        setError('Error in questions per page');
        setShowAlert(true);
        error = true;
      }
      if (formData.sessionDuration < 10 || formData.sessionDuration > 180) {
        setError('Error in session duration');
        setShowAlert(true);
        error = true;
      }
    }
    return error;
  };

  const handleSend = async () => {
    let error = await handleFormErrors();
    if (error === false) {
      setLoading(true);
      const gptResponse = await gpt('fghjfjhf'); // Cambiar con la llamada real
      setLoading(false);
      handleGpt(gptResponse);
    }
  };

  return (
    <div className={styles.NewAcSessionCreator}> {/* Usando clase de CSS Module */}
      <div className={styles.newAcMenu}>
        <h2 className={`${styles.newAcMenuItem} ${styles.title}`}>Create a new session</h2>
        <form onSubmit={handleSend} className={`${styles.newAcMenuItem} ${styles.form}`}>
          <div className={`${styles.formItem} ${styles.newAcMenuFormOption}`}>
            <div className={styles.formOption}>
              <label className={styles.formLabel}>
                Which PDF pages to process:
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="number"
                  name="pagesProcessStart"
                  className={`${styles.pagesProcessStart}`}
                  onChange={handleChange}
                />
                <p className={styles.to}>to</p>
                <input
                  type="number"
                  name="pagesProcessFinish"
                  className={`${styles.pagesProcessFinish}`}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formOption}>
              <label htmlFor="formOptionQPP" className={styles.formLabel}>
                Number of questions per PDF page (1-3):
              </label>
              <input
                type="number"
                name="questionsPerPage"
                className={`${styles.formOptionQPP}`}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.questionDifficulty} ${styles.formOption}`}>
              <label className={styles.newAcMenuFormLabel}>Question difficulty:</label>
              <div className={styles.inputContainer}>
                <div className={styles.highlightbarContainer}>
                  <button
                    type="button"
                    className={`${styles.difficultyOption} ${selectedDifficulty === 'easy' ? styles.selected : ''}`}
                    onClick={() => handleDifficultyClick('easy')}
                    data-difficulty="easy"
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    className={`${styles.difficultyOption} ${selectedDifficulty === 'medium' ? styles.selected : ''}`}
                    onClick={() => handleDifficultyClick('medium')}
                    data-difficulty="medium"
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`${styles.difficultyOption} ${selectedDifficulty === 'difficult' ? styles.selected : ''}`}
                    onClick={() => handleDifficultyClick('difficult')}
                    data-difficulty="difficult"
                  >
                    Difficult
                  </button>
                  <div
                    className={styles.highlightBar}
                    style={{
                      width: selectedDifficulty === 'easy' ? '25%' : selectedDifficulty === 'medium' ? '60%' : selectedDifficulty === 'difficult' ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={styles.formOption}>
              <label htmlFor="formOptionSDM" className={styles.formLabel}>
                Session duration in minutes (10-180):
              </label>
              <input
                type="number"
                name="sessionDuration"
                className={`${styles.formOptionSDM}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles.formItem} ${styles.formFile}`}>
            <div
              className={`${styles.formFileContImg} ${styles.formFileContImg}`}
              {...getRootProps()}
              style={{
                background: isDragActive ? 'rgb(71, 104, 126)' : 'none',
                border: isDragActive ? 'none' : '#05348F dashed 2px',
              }}
            >
              <Image src="/assets/fileImg.png" alt="Image" width={120} height={120} className={`${styles.formFileImg}`} />
              <div className={`${styles.dragLabel}`}>...or drag here</div>
            </div>
            <div className={`${styles.fileContainer}`}>
              {formData.file === null ? <p>No file selected</p> : <p>File selected: {formData.file.name}</p>}
            </div>
            <div className={`${styles.formFileContInput}`}>
              <label htmlFor="formFileInput" className={`${styles.formFileLabel}`}>
                Upload file
              </label>
              <input
                type="file"
                name="file"
                className={`${styles.formFileInput}`}
                accept=".pdf, .doc, .docx"
                onChange={handleChange}
                {...getInputProps()}
              />
            </div>
          </div>
        </form>
        <div className={`${styles.newAcMenuItem} ${styles.formButtonsContainer}`}>
          <button className={`${styles.formButtons} ${styles.buttonCancel}`} type="button" onClick={closeNewSession}>
            Cancel
          </button>
          <button className={`${styles.formButtons} ${styles.buttonCreate}`} type="button" onClick={handleSend}>
            Create
          </button>
        </div>
      </div>
  
      {showAlert && (
        <ErrorAlert message={error} duration={3000} onClose={() => setShowAlert(false)} />
      )}
      {loading && <LoadingComplete />}
    </div>
  );
  
}
