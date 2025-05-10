import {Graph} from "./MetroGraph.js";
import {Dijkstra} from "./Dijkstra.js";

export class Transit {
    constructor(db) {
        this.db = db;
        this.graph = new Graph(this.db);
        this.pathFinder = new Dijkstra(this.graph);
    }

    async findPath(from, to) {
        await this.graph.loadFromDb()
        const stationIds = await this.pathFinder.findPath(from, to)
        return this.graph.getStationListByTheirIds(stationIds)
    }
}