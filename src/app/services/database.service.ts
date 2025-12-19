import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  private readonly dbName = 'auth';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDatabase() {
    console.log('🟢 initDatabase');

    await this.sqlite.checkConnectionsConsistency();

    const isConn = await this.sqlite.isConnection(this.dbName, false);
    if (isConn.result) {
      await this.sqlite.closeConnection(this.dbName, false);
    }

    this.db = await this.sqlite.createConnection(
      this.dbName,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
    console.log('🟢 DB abierta');

    await this.createTables();
    console.log('🟢 tablas creadas');
  }

  private async createTables() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    await this.db.execute(query);
  }
}

