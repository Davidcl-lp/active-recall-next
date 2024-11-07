export function extractQuestions(text) {
    
    const questions = text.split(/\d+\.\s+/).filter(question => question.trim().length > 0);

    return questions;
}