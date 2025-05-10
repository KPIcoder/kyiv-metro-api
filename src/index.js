import {config} from "./config.js";
import Fastify from "fastify";
import cors from '@fastify/cors'
import {stationsHttp} from "./controllers/stationsHttp.js";
import {ticketsHttp} from "./controllers/ticketsHttp.js";
import {transitHttp} from "./controllers/transitHttp.js";


const fastify = Fastify({
    logger: {
        level: config.logger.level,
        transport: config.isDevelopment ? {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        } : undefined,
    }
});

await fastify.register(await import('@fastify/postgres'), {
    connectionString: config.db.connectionString,
})

await fastify.register(cors, {
    origin: config.cors,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await fastify.register(stationsHttp)
await fastify.register(ticketsHttp)
await fastify.register(transitHttp)

await fastify.listen({port: 3002})

