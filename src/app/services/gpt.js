export function gpt(gptData) {
    const formData = new FormData();
    
    // Iterar sobre las claves del objeto gptData y añadirlas a formData
    for (const key in gptData) {
        if (gptData.hasOwnProperty(key)) {
            formData.append(key, gptData[key]);
        }
    }
    return fetch('http://localhost:5000/gptAPI', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(gptResponse => {
        return gptResponse.gptResponse; 
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}
