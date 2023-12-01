import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://bkczsvdy:b03XMEomK35lwwkaVeRe953t7yzm6Qx4@snuffleupagus.db.elephantsql.com/bkczsvdy");
    await client.connect();
    return client;
}