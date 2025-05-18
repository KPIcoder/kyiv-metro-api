export const ticketSchema = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        name: {type: 'string'},
        description: {type: 'string'},
        daysLeft: {type: 'number'},
        zones: {type: 'string'},
        usagesLeft: {type: 'number'},
        price: {type: 'number'},
    }
}