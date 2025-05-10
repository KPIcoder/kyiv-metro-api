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
    }
}