import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    imagenFondo: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    seccionSuperior: {
        alignItems: 'center',
    },
    relojContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 40,
    },
    fechaTexto: {
        fontSize: 12,
        color: '#333',
        marginBottom: 5,
    },
    horaTexto: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },

    tarjetaCiudad: {
        backgroundColor: 'rgba(230, 230, 230, 0.9)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#333',
        alignSelf: 'center',
        marginBottom: 20,
        minWidth: 200,
        alignItems: 'center',
    },
    ciudadTexto: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },

    tarjetaInfo: {
        backgroundColor: 'rgba(230, 230, 230, 0.9)',
        borderRadius: 25,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        width: '100%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    mensajeClima: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    contenedorTemperatura: {
        backgroundColor: 'rgba(230, 230, 230, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 10,
    },
    temperaturaTexto: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    contenedorCondicion: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    condicionTexto: {
        fontSize: 14,
        color: '#333',
        marginRight: 5,
    },

    seccionInferior: {
        width: '100%',
        alignItems: 'center',
    },
    inputBusqueda: {
        backgroundColor: 'rgba(230, 230, 230, 0.95)',
        width: '100%',
        padding: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    botonBuscar: {
        backgroundColor: '#66FFFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center', // centrar horizontalmente
        justifyContent: 'center', // centrar verticalmente
    },
    textoBoton: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
