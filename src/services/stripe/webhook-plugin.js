import {config} from "../../config.js";
import {stripe} from "./index.js";
import { TicketRepository } from "../../domain/tickets.js";

export const stripeWebhookPlugin = async (fastify) => {
    fastify.post('/api/webhooks/stripe', async (request, reply) => {
        try {
            const sig = request.headers['stripe-signature'];
            const event = stripe.webhooks.constructEvent(request.rawBody, sig, config.resources.stripeWebhook);
            const session = event.data.object;

            let result;

            if (event.type === 'checkout.session.async_payment_succeeded' || 
                event.type === 'checkout.session.completed') {
                const ticketsRepository = new TicketRepository();
                await ticketsRepository.issueCustomUserTicket(session.metadata.userId, {...session.metadata});

            } else if (event.type === 'checkout.session.async_payment_failed' ||
                      event.type === 'checkout.session.expired') {
                // TODO: Handle payment failed
                console.log('Payment failed');
            } else {
                result = { received: true };
            }

            return reply.send(result || { received: true });
        } catch (err) {
            console.error('Webhook error:', err.message);
            return reply.status(400).send({
                error: `Webhook Error: ${err.message}`
            });
        }
    });
};

