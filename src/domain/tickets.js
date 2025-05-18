export class TicketRepository {
    constructor(db) {
        this.db = db
    }

    async getSaleTickets() {
        const query = await this.db.query(
            `
              select * from app_tickets
            `
        )
        return query.rows.map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
            price: t.price,
            daysLeft: t.valid_days,
            zones: t.valid_zones_range,
            usagesLeft: t.usages_limit,
        }))
    }

    async getUserTickets(userId) {
        const q = await this.db.query(
            `
             select * from tickets
             where user_id = $1
            `,
            [userId],
        )

        return q.rows.map(this.#ticketMapper)
    }

    async issueUserTicket(ticketId, userId) {
        const q1 = await this.db.query(
            `
                select * from app_tickets
                where id = $1
            `,
            [ticketId],
        )

        const { name, description, valid_days, usages_limit, valid_zones_range } = q1.rows[0]

        const q2 = await this.db.query(
            `
              insert into tickets(user_id, name, description, created_at, expired_at, valid_zones_range, usages_left)
              values($1, $2, $3, now(), now() + interval '${valid_days} day', $4, $5)
              returning *
            `,
            [userId, name, description, valid_zones_range, usages_limit]
        )

        return this.#ticketMapper(q2.rows[0])
    }

    async issueCustomUserTicket(userId, ticket) {
        const { name, description, validZonesRange, usagesLimit, validForDays } = ticket;

        const q = await this.db.query(
            `
              insert into tickets(user_id, name, description, created_at, expired_at, valid_zones_range, usages_left)
              values($1, $2, $3, now(), now() + interval '${validForDays} day', $4, $5)
              returning *
            `,
            [userId, name, description, validZonesRange, usagesLimit]
        )

        return this.#ticketMapper(q.rows[0])

    }

     #ticketMapper = (t) => ({
         id: t.id,
         name: t.name,
         description: t.description,
         daysLeft: this.#dateDiffInDays(new Date(t.expired_at), new Date()),
         zones: t.valid_zones_range,
         usagesLeft: t.usages_left,
    })

    #dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }
}