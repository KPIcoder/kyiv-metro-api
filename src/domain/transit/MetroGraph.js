export class Graph {
    adjacency = new Map();
    stationCoords = new Map();

    constructor(db) {
        this.db = db;
    }

    async loadFromDb() {
        const stations = await this.db.query('SELECT id, line_id, name, lat, lng FROM stations');
        const connections = await this.db.query('SELECT from_station_id AS from, to_station_id AS to, weight FROM station_connections');

        for (const s of stations.rows) {
            this.stationCoords.set(s.id, {id: s.id, position: {lat: s.lat, lng: s.lng}, name: s.name, lineId: s.line_id});
            this.adjacency.set(s.id, []);
        }

        for (const c of connections.rows) {
            this.adjacency.get(c.from)?.push({to: c.to, weight: c.weight});
        }
    }

    neighbors(id) {
        return this.adjacency.get(id) || [];
    }

    getStationListByTheirIds(ids) {
        const stations = []
        ids.forEach((id) => {
            stations.push(this.stationCoords.get(id));
        })
        return stations
    }

    getNodes() {
        return Array.from(this.adjacency.keys());
    }
}
