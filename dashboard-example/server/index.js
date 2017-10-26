import expressNunjucks from 'express-nunjucks';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import Path from 'path';
import http from 'http';
import middleware from './middleware';
import baseRoutes from './routes/baseRoutes';
import io from 'socket.io';
import container from './container';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(compression());
app.use('/', baseRoutes);

app.set('views', Path.join(__dirname, '..', 'client', 'templates'));
app.use(express.static(Path.join(__dirname, '..', 'client', 'public'), { maxage: '31d' }));

expressNunjucks(app, {
    watch: process.env.NODE_ENV === 'development' ? true : false,
    noCache: process.env.NODE_ENV === 'development' ? true : false
});

const server = http.createServer(app);
const ioServer = io(server);

ioServer.on('connection', function(client) {
    client.on('send-html', function(data) {
        ioServer.emit('display-html', data)
    });

    const indexController = container.get('indexController');
    indexController.handle(ioServer);

});

server.listen(PORT, () => {
	console.log(`Server listen on port ${PORT}`);
});
