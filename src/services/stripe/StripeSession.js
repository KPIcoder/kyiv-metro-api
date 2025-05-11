import {config} from "../../config.js";

export class StripeSession {
    constructor(stripe) {
        this.stripe = stripe;
    }

    async createSession(opts = {}) {
        return await this.stripe.checkout.sessions.create({
            line_items: [{
                price: opts.price,
                quantity: 1
            }],
            mode: opts.mode,
            success_url: `${config.frontendUrl}/success`,
            cancel_url: `${config.frontendUrl}/cancel`,
            metadata: opts.metadata,
        });
    }
}