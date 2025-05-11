export const config = {

    isDevelopment: process.env.NODE_ENV === 'development',

    logger: {
        level: 'info'
    },

    cors: '*',

    db: {
        connectionString: process.env.PG_URL,
    },

    resources: {
        stripeSK: process.env.STRIPE_SECRET_KEY || 'sk_test_51RNKztQd9EVIrFaZREg4PvFurPDEoEByFDOkvNKtiZIhQSFIgDhdpVliKgizKLSE0Kx5Cd9QsXtx3v5Dt8eZYgrF00REtyjcJo',
        stripePK: process.env.STRIPE_PUBLIC_KEY || 'pk_test_51RNKztQd9EVIrFaZ44BQVjRyG5C5EpZIHevfS6E4pV4UzFc2CKEPGNfCcVNFrkwUZRKEWxqpyojSjABamw7uQRIm00b4tTkVRX',
        stripeWebhook: process.env.STRIPE_WEBHOOK_KEY || 'whsec_eb11772a04236e00d86645ef8a042c94f9eceb88691f5d010905a482ab35b381',
    },

    frontendUrl: 'http://localhost:3000',
}