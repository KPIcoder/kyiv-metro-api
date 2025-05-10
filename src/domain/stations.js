export class StationRepository {

    constructor(db) {
        this.db = db;
    }

    async getStations() {
        const q = await this.db.query(
            `
                select *
                from stations;
            `
        )
        return q.rows.map(this.mapStation)
    }

    async addStation(station) {
        const {lineId, name, lat, lng} = station;

        await this.db.query(
            `
                insert into stations(line_id, name, lat, lng, source, status)
                values ($1, $2, $3, $4, $5, $6)
            `,
            [lineId, name, lat, lng, 'CUSTOM', 'PROPOSED'],
        )

        return {
            ...station,
            position: { lat, lng }
        }
    }

    async deleteStation(id) {
        await this.db.query(
            `
              delete from stations where id = $1
            `,
            [id]
        )
        return {
            deleted: true,
        }
    }

    mapStation(station) {
        return {
            id: station.id,
            name: station.name,
            position: {
                lat: station.lat,
                lng: station.lng,
            },
            lineId: station.line_id,
        }
    }
}
