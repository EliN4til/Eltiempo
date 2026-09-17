# El Tiempo

Aplicación móvil multiplataforma desarrollada con **React Native**, **Expo** y **TypeScript** que muestra el tiempo actual de cualquier ciudad usando la API de [OpenWeatherMap](https://openweathermap.org/api).

## Tecnologías

- React Native + Expo (Expo Router)
- TypeScript
- API REST de OpenWeatherMap

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Consigue una API key gratuita en [OpenWeatherMap](https://home.openweathermap.org/api_keys).

3. Copia el archivo de ejemplo y añade tu clave:

   ```bash
   cp .env.example .env
   ```

   ```
   EXPO_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
   ```

   El archivo `.env` está en `.gitignore` y no se sube al repositorio.

4. Arranca la app:

   ```bash
   npx expo start
   ```
