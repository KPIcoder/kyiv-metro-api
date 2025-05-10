export const positionSchema = {
    type: 'object',
    properties: {
        lat: {type: 'number'},
        lng: {type: 'number'},
    }
}

export const stationSchema = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        lineId: {type: 'number'},
        name: {type: 'string'},
        position: positionSchema,
    }
}
