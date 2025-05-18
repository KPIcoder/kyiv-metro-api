import {StationRepository} from "../domain/stations.js";
import {errorSchema} from "../schemas/common.js";
import {stationSchema} from "../schemas/station-schema.js";

export function stationsHttp(fastify) {

    const stationRepository = new StationRepository(fastify.pg);

    fastify.get('/api/stations', {
        schema: {
            description: 'Get all stations',
            tags: ['stations'],
            response: {
                200: {
                    type: 'array',
                    items: stationSchema
                },
                500: errorSchema
            }
        },
        handler: stationRepository.getStations.bind(stationRepository),
    })

    fastify.get('/api/zones', {
        schema: {
            description: 'Get all zones',
            tags: ['zones'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            range: { type: 'number' },
                            coords: { type: 'array', items: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } } } }
                        }
                    }
                },
                500: errorSchema
            }
        },
        handler: stationRepository.getZones.bind(stationRepository),
    })
}