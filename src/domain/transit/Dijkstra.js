import {PathFinderContract} from './PathFinderContract.js';

export class Dijkstra extends PathFinderContract {
    constructor(graph) {
        super();
        this.graph = graph;
    }

    async findPath(start, end) {
        const dist = new Map();
        const prev = new Map();
        const visited = new Set();
        const queue = [[start, 0]];

        for (const node of this.graph.getNodes()) {
            dist.set(node, Infinity);
            prev.set(node, null);
        }

        dist.set(start, 0);

        while (queue.length) {
            queue.sort((a, b) => a[1] - b[1]);
            const [u] = queue.shift();
            if (u === end) break;

            if (visited.has(u)) continue;
            visited.add(u);

            for (const {to, weight} of this.graph.neighbors(u)) {
                const alt = (dist.get(u) ?? Infinity) + weight;
                if (alt < (dist.get(to) ?? Infinity)) {
                    dist.set(to, alt);
                    prev.set(to, u);
                    queue.push([to, alt]);
                }
            }
        }

        const path = [];
        let u = end;
        while (u !== null) {
            path.unshift(u);
            u = prev.get(u) ?? null;
        }

        return path;
    }
}
