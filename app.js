const path = require('path');
const http = require('http');
const express = require('express');
const compression = require('compression');
const SerialPort = require('serialport');

const app = express();
const port = 9000;

app.use(compression());
app.use(express.json());

const arduinoSymbols = {
    'lamp1': ['q', 'Q'],
    'lamp2': ['w', 'W'],
    'lamp3': ['e', 'E'],
    'lamp4': ['r', 'R'],
    'lamp5': ['t', 'T'],
    'lamp6': ['y', 'Y'],
};

(async () => {
    try {
        const arduinoSerialPort = new SerialPort('COM9', { baudRate: 9600 });

        arduinoSerialPort.on('open', (err) => {
            if (err) {
                console.error(`Ошибка при открытии последовательного порта: ${err.message}`);
            } else {
                console.log(`Последовательный порт ${arduinoSerialPort.path} открыт.`);
            }
        });

        app.use(express.static(path.join(__dirname, './public')));

        app.post('/lamp/', async (req, res) => {
            try {
                const { id, state } = req.body;
                console.log(`id: ${id}, состояние: ${state}`);
                const char = arduinoSymbols[id][state ? 1 : 0];
                console.log(`Отправлен символ: ${char}`);
                arduinoSerialPort.write(char);
                res.json('ok');
            } catch (error) {
                console.log(`Произошла ошибка: `, error.toString());
            }
        });

        const httpServer = http.createServer(app);
        httpServer.listen(port);

        console.log(`Сервер работает по адресу http://localhost:${port}/`);

    } catch (error) {
        console.log(error);
    }
})();
