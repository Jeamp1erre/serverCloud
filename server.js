    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware para manejar peticiones JSON
    app.use(bodyParser.json());

    // Ruta principal
    app.get('/', (req, res) => {
        res.send('Servidor en Render funcionando');
    });

    // Ruta para obtener el estado del sistema
    app.get('/api/status', (req, res) => {
        // Aquí puedes agregar la lógica para obtener el estado actual del sistema
        // Puedes mantener variables en el servidor para controlar el estado
        const status = {
            systemActivated: true,
            alarmActive: false
        };
        res.json(status);
    });

    // Ruta para controlar las luces
    app.get('/api/light/:lightId/:state', (req, res) => {
        const lightId = req.params.lightId;
        const state = req.params.state;

        // Aquí puedes agregar la lógica para encender o apagar las luces
        console.log(`Control de luz ${lightId} a estado: ${state}`);

        // Enviar respuesta
        res.send(`Luz ${lightId} cambiada a estado: ${state}`);
    });

    // Ruta para recibir eventos de logs desde el ESP32
    app.post('/api/logs', (req, res) => {
        const { event } = req.body;
        console.log(`Nuevo evento: ${event}`);

        // Aquí puedes guardar el evento en una base de datos o en un archivo
        res.status(200).send('Evento recibido');
    });

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });