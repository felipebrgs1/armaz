import { db } from "./db";

async function main() {



    const users = await db.query.users.findMany();
    console.log("Database connection established:", users);
}

main();
