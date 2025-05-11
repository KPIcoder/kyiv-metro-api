import Stripe from 'stripe';
import { config } from '../config.js';

export class StripeService {
    constructor() {
        this.stripe = new Stripe(config.resources.stripeSK);
    }

    async createProduct(name, description) {
        try {
            const product = await this.stripe.products.create({
                name,
                description,
            });
            return product;
        } catch (error) {
            throw new Error(`Failed to create Stripe product: ${error.message}`);
        }
    }

    async createPrice(productId, amount, currency = 'usd') {
        try {
            const price = await this.stripe.prices.create({
                product: productId,
                unit_amount: amount * 100, // Stripe expects amount in cents
                currency,
            });
            return price;
        } catch (error) {
            throw new Error(`Failed to create Stripe price: ${error.message}`);
        }
    }

    async createCheckoutSession(successUrl, cancelUrl, priceId, metadata = {}) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: successUrl,
                cancel_url: cancelUrl,
                metadata,
            });
            return session;
        } catch (error) {
            throw new Error(`Failed to create checkout session: ${error.message}`);
        }
    }

    async verifyWebhook(signature, payload, endpointSecret) {
        try {
            return this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        } catch (error) {
            throw new Error(`Webhook verification failed: ${error.message}`);
        }
    }
}