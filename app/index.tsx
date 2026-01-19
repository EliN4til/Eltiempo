import React, { useState } from 'react';
import { ImageBackground, ImageSourcePropType, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { obtenerClima, WeatherResponse } from '../services/weatherService';
import { styles } from '../styles/weatherStyles';

// Importamos las imágenes de fondo
const backgrounds: { [key: string]: ImageSourcePropType } = {
    soleado: require('../assets/backgrounds/soleado.png'),
    lluvioso: require('../assets/backgrounds/lluvioso.png'),
    nevado: require('../assets/backgrounds/nevado.jpg'),
    nublado: require('../assets/backgrounds/nublado.jpg'),
    principal: require('../assets/backgrounds/soleado.png'),
};

export default function App() {
    const [ciudad, setCiudad] = useState<string>('');
    const [datosClima, setDatosClima] = useState<WeatherResponse | null>(null);
    const [fondoActual, setFondoActual] = useState<ImageSourcePropType>(backgrounds.principal);
    const [mensajeError, setMensajeError] = useState<string>('');

    // Estado para la hora y fecha
    const [fecha, setFecha] = useState<Date>(new Date());

    // Función para manejar la búsqueda del clima
    const manejarBusqueda = async () => {
        if (!ciudad.trim()) return;

        // Actualizamos la fecha al momento de buscar
        setFecha(new Date());

        // Reseteamos errores anteriores
        setMensajeError('');

        // Llamamos a nuestra función asíncrona (Promesa)
        try {
            const resultado = await obtenerClima(ciudad);

            if ('error' in resultado) {
                setMensajeError(resultado.error || 'Ciudad no encontrada o error en la red.');
                setDatosClima(null);
                return;
            }

            setDatosClima(resultado as WeatherResponse);

            // Obtenemos el ID del clima y la temperatura
            const weatherId = resultado.weather && resultado.weather.length > 0 ? resultado.weather[0].id : 800;
            const temperatura = resultado.main.temp;

            actualizarFondo(weatherId);
        } catch (error) {
            setMensajeError('Ocurrió un error inesperado.');
        }
    };

    // Función para cambiar el fondo según el clima
    const actualizarFondo = (id: number) => {
        if (id >= 200 && id < 600) {
            setFondoActual(backgrounds.lluvioso);
        } else if (id >= 600 && id < 700) {
            setFondoActual(backgrounds.nevado);
        } else if (id >= 700 && id <= 804 && id !== 800) {
            setFondoActual(backgrounds.nublado);
        } else if (id === 800) {
            setFondoActual(backgrounds.soleado);
        } else {
            setFondoActual(backgrounds.soleado);
        }
    };

    // Formateo de fecha y hora
    const formatearFecha = (date: Date) => {
        const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', opciones);
    };

    const formatearHora = (date: Date) => {
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    };

    // Función auxiliar para obtener un mensaje divertido según el clima
    const obtenerMensajeDivertido = (temp: number, id: number) => {
        // Si hay nieve
        if (id >= 600 && id < 700)
            return "Ni que chiquito pelete niño, está haciendo unos:";

        // Si hay lluvia
        if (id >= 200 && id < 600)
            return "¡Agüita! Se mandó a llover, muchacho, está haciendo unos:";

        // Si hace mucho calor
        if (temp > 30)
            return "¡Agüita niño con la calufa! muchacho, está haciendo unos:";

        // Si está nublado
        if ((id >= 700 && id < 800) || id > 800)
            return "¡Agüita! Se nubló todo niño, está haciendo unos:";

        // Si está despejado
        if (id === 800)
            return "¡Vaya día más bueno hace niño! Está haciendo unos:";

        return "El tiempo está revuelto muchacho, está haciendo unos:";
    };

    // Función simple para obtener el icono
    const obtenerIcono = (id: number) => {
        if (id >= 600 && id < 700) return ' ❄️';
        if (id >= 200 && id < 600) return ' 🌧️';
        if (id === 800) return ' ☀️';
        return ' ☁️';
    };

    return (
        <ImageBackground source={fondoActual} style={styles.imagenFondo}>
            <SafeAreaView style={styles.contenedor}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.contenedor}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

                        {/* Sección Superior: Reloj */}
                        <View style={styles.seccionSuperior}>
                            <View style={styles.relojContainer}>
                                <Text style={styles.fechaTexto}>
                                    {formatearFecha(fecha)}
                                </Text>
                                <Text style={styles.horaTexto}>
                                    {formatearHora(fecha)}
                                </Text>
                            </View>
                        </View>

                        {/* Sección Central: Resultados */}
                        {datosClima ? (
                            <View>
                                <View style={styles.tarjetaCiudad}>
                                    <Text style={styles.ciudadTexto}>{datosClima.name}</Text>
                                </View>

                                <View style={styles.tarjetaInfo}>
                                    <Text style={styles.mensajeClima}>
                                        {obtenerMensajeDivertido(datosClima.main.temp, datosClima.weather[0].id)}
                                    </Text>

                                    <View style={styles.contenedorTemperatura}>
                                        <Text style={styles.temperaturaTexto}>
                                            {Math.round(datosClima.main.temp)} °C
                                        </Text>
                                    </View>

                                    <View style={styles.contenedorCondicion}>
                                        <Text style={styles.condicionTexto}>
                                            {/* Descripción del clima */}
                                            {datosClima.weather[0].description}

                                            {/* Icono según clima */}
                                            {obtenerIcono(datosClima.weather[0].id)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.tarjetaInfo}>
                                <Text style={styles.mensajeClima}>
                                    {mensajeError ? mensajeError : "Bienvenido a la Aplicación de tiempo. Introduce una ciudad/pueblo abajo para ver la temperatura que hace en el lugar."}
                                </Text>
                            </View>
                        )}

                        {/* Sección Inferior: Búsqueda */}
                        <View style={styles.seccionInferior}>
                            <View style={{ width: '80%' }}>
                                <TextInput
                                    style={styles.inputBusqueda}
                                    placeholder="Introduce un lugar..."
                                    placeholderTextColor="#666"
                                    value={ciudad}
                                    onChangeText={setCiudad}
                                />

                                <TouchableOpacity style={styles.botonBuscar} onPress={manejarBusqueda}>
                                    <Text style={styles.textoBoton}>Buscar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}