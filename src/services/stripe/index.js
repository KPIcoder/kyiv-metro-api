import Stripe from 'stripe'
import {config} from "../../config.js";
import { StripeProduct } from './StripeProduct.js';
import { StripeSession } from './StripeSession.js';

export const stripe = new Stripe(config.resources.stripeSK);

export const stripeProduct = new StripeProduct(stripe);
export const stripeSession = new StripeSession(stripe);