import {TicketRepository} from "../domain/tickets.js";
import {errorSchema} from "../schemas/common.js";
import {ticketSchema} from "../schemas/ticket-schema.js";
import {stripeProduct, stripeSession} from "../services/stripe/index.js";

export async function ticketsHttp(fastify) {
    const ticketRepository = new TicketRepository(fastify.pg);

    fastify.get('/api/tickets', {
        schema: {
            description: 'Get all app tickets',
            tags: ['tickets'],
            response: {
                200: {
                    type: 'array',
                    items: ticketSchema
                },
                500: errorSchema
            }
        },
        handler: ticketRepository.getSaleTickets.bind(ticketRepository)
    });

    fastify.get('/api/tickets/:userId', {
        schema: {
            description: 'Get user tickets',
            tags: ['tickets'],
            response: {
                200: {
                    type: 'array',
                    items: ticketSchema
                },
                404: errorSchema,
                500: errorSchema,
            }
        },
        handler: (req) => ticketRepository.getUserTickets(req.params.userId)
    });

    fastify.post('/api/tickets', {
        schema: {
            description: 'Add ticket',
            tags: ['tickets'],
            body: {
                type: 'object',
                required: ['userId', 'ticketId'],
                properties: {
                    userId: { type: 'string' },
                    ticketId: { type: 'number' },
                }
            },
            response: {
                201: ticketSchema,
                400: errorSchema,
                500: errorSchema,
            }
        },
        handler: (req) => ticketRepository.issueUserTicket(req.body.ticketId, req.body.userId)
    })

    fastify.post('/api/tickets/custom', {
        schema: {
            description: 'Add custom ticket',
            tags: ['tickets'],
            body: {
                type: 'object',
                required: ['userId'],
                properties: {
                    userId: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    validZonesRange: { type: 'string' },
                    usagesLimit: { type: 'number' },
                    validForDays: { type: 'number' },
                    cost: { type: 'number' },
                }
            },
            response: {
                201: ticketSchema,
                400: errorSchema,
                500: errorSchema,
            }
        },
        handler: async (req, reply) => {
            const { name, description, cost, userId } = req.body
            const product = await stripeProduct.createProduct({ name, description, default_price_data: { currency: 'uah', unit_amount: cost * 100 } }, { userId });
            const session = await stripeSession.createSession({price: product.default_price, mode: 'payment', metadata: {...req.body}});
            return reply.status(200).send({id: session.id, url: session.url});
        }
    })
}