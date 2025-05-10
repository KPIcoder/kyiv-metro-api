import {Transit} from "../domain/transit/index.js";

export async function transitHttp(fastify) {
    const transitRepository = new Transit(fastify.pg)

    fastify.get('/api/transit/:from/:to', {
        handler: (req) => transitRepository.findPath(Number(req.params.from), Number(req.params.to)),
    })

}