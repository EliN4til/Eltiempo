export const API_KEY = 'efd3a267a94abc67a36c05fb2e4356aa';

// Definimos la interfaz para la respuesta del clima
export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    cod: number;
    message?: string;
    error?: string;
}

// Función para obtener el clima de una ciudad
export const obtenerClima = async (ciudad: string): Promise<WeatherResponse | { error: string }> => {
    try {
        // Pedimos el clima a la API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Si hay algún error (ciudad no existe, etc.)
        if (datos.cod !== 200) {
            return { error: datos.message || "Error desconocido" };
        }

        return datos as WeatherResponse;
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        return { error: "Error de conexión" };
    }
};