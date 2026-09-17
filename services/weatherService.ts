// La clave se lee de la variable de entorno EXPO_PUBLIC_OPENWEATHER_API_KEY (archivo .env, no se sube a Git)
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

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
    if (!API_KEY) {
        return { error: "Falta la API key de OpenWeatherMap (EXPO_PUBLIC_OPENWEATHER_API_KEY)" };
    }

    try {
        // Pedimos el clima a la API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;

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