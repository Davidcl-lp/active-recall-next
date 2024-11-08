export const gptResponseApi = async (gptData) => {
    try {
        const response = await fetch("http://localhost:5000/gptApiResponse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: gptData }),
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);
        return data.gptResponse
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}