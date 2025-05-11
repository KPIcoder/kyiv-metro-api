import {TicketRepository} from "../domain/tickets.js";
import {errorSchema} from "../schemas/common.js";
import {ticketSchema} from "../schemas/ticket-schema.js";
import {StripeService} from "../services/stripe.js";

export async function ticketsHttp(fastify) {
    const ticketRepository = new TicketRepository(fastify.pg);
    const stripeService = new StripeService();

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
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        checkoutUrl: { type: 'string' },
                        sessionId: { type: 'string' }
                    }
                },
                400: errorSchema,
                500: errorSchema,
            }
        },
        handler: async (req, reply) => {
            const { userId, name, description, validZonesRange, usagesLimit, validForDays, price } = req.body;

            try {
                // Create Stripe product for custom ticket
                const product = await stripeService.createProduct(name, description);
                const priceObj = await stripeService.createPrice(product.id, price);

                // Create checkout session
                const session = await stripeService.createCheckoutSession(
                    'http://yourdomain.com/success', // Replace with your success URL
                    'http://yourdomain.com/cancel',  // Replace with your cancel URL
                    priceObj.id,
                    { userId, customTicket: 'true' }
                );

                // Issue custom ticket with pending payment status
                await ticketRepository.issueCustomUserTicket(userId, req.body, session.id);

                reply.code(201).send({
                    checkoutUrl: session.url,
                    sessionId: session.id
                });
            } catch (error) {
                throw new Error(`Payment processing failed: ${error.message}`);
            }
        }
    })

    // Add webhook endpoint for Stripe payment confirmation
    fastify.post('/api/webhook/stripe', {
        schema: {
            description: 'Stripe webhook endpoint',
            tags: ['tickets'],
            response: {
                200: { type: 'object', properties: { received: { type: 'boolean' } } },
                400: errorSchema
            }
        },
        handler: async (req, reply) => {
            const sig = req.headers['stripe-signature'];
            let event;

            try {
                // You'll need to configure webhook secret in config.js
                event = await stripeService.verifyWebhook(
                    sig,
                    req.rawBody, // You'll need raw body, might need middleware to capture this
                    process.env.STRIPE_WEBHOOK_SECRET || 'your_webhook_secret'
                );
            } catch (err) {
                reply.code(400).send({ error: 'Webhook Error: Invalid signature' });
                return;
            }

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;
                await ticketRepository.confirmTicketPayment(session.id);
            }

            reply.send({ received: true });
        }
    })
}