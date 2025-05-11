## Stripe & tickets task

### installation

```bash
npm i
```

Run project

```bash
npm run start
```

# Important

The purpose of this task is to integrate Stripe into an existing project. The project uses PostgreSQL database. 
However, you can simply mock the exising functionality that relies on the db usage. Alternatively, you can
create a db with the `tickets` table that has the following structure

```sql
create table tickets (
    id serial primary key,
    user_id text not null,
    name text not null,
    description text not null,
    created_at date default now, 
    expired_at date, 
    valid_zones_range text, 
    usages_left int
)
```
I am intentionally leaving Stripe secrets available to you, since testing Stripe integration is the primary task.

Update: 
Now when you test the POST `/api/tickets/custom`
it returns a url of the stripe checkout page and once the payment is successful the system issues the ticket.