export class StripeProduct {
    constructor(stripe) {
        this.stripe = stripe;
    }

    async getProductWithPriceByMetadataId(id) {
        const product = await this.stripe.products.list({
            metadata: {
                id
            }
        }).data[0];

        if (!product) return null;

        const price = await this.stripe.prices.list({
            product: product.id,
        });

        return { product, price: price.data[0] };
    }

    async createProduct(product, metadata) {
        const newProduct = await this.stripe.products.create({
            ...product,
            metadata
        });

        // const price = await this.stripe.prices.create({
        //     product: newProduct.id,
        //     'uah'
        //     unit_amount: 1,
        // });

        return newProduct;
    }
        
}