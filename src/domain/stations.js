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
            position: {lat, lng}
        }
    }

    async deleteStation(id) {
        await this.db.query(
            `
                delete
                from stations
                where id = $1
            `,
            [id]
        )
        return {
            deleted: true,
        }
    }

    async getZones() {
        const q = await this.db.query(
            `
                select *
                from zones;
            `
        )
        return q.rows.map(this.mapZone)
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

    mapZone(zone) {
        const coords = [];
        const coordsList = zone.coords.split(' ');
        for (let i = 0; i < coordsList.length - 1; i = i + 2) {
            coords.push({
                lat: coordsList[i],
                lng: coordsList[i + 1],
            })
        }

        return {
            id: zone.id,
            name: zone.name,
            range: zone.zone_range,
            coords
        }
    }

}
