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
    console.log('initDatabase');

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
    console.log('DB abierta');

    await this.createTables();
    console.log('tablas creadas');
  }

  private async createTables() {
    const queries = [
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      `,
      `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT, 
        readDate TEXT,
        review TEXT,
        image TEXT
      );
      `,
      `
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        protagonist TEXT, 
        viewDate TEXT,
        review TEXT,
        image TEXT
      );
      ` 

    ];
    for (const query of queries) {
      await this.db.execute(query);
    }
  }


  async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?);
      `;

      await this.db.run(query, [username, email, password]);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario', error);
      return false;
    }
  }

  async saveBook(
    title: string,
    author: string,
    readDate:string,
    review: string, 
    image: string
  ): Promise<boolean> {
    try {
      const query = `
        INSERT INTO books (title, author, readDate, review, image)
        VALUES (?, ?, ?, ?, ?);
      `;

      await this.db.run(query, [title, author, readDate, review, image]);
      return true;
    } catch (error) {
      console.error('Error al guardar el libro', error);
      return false;
    }
  }

  async saveMovie(
    title: string,
    protagonist: string,
    viewDate:string,
    review: string, 
    image: string
  ): Promise<boolean> {
    try {
      const query = `
        INSERT INTO movies (title, protagonist, viewDate, review, image)
        VALUES (?, ?, ?, ?, ?);
      `;

      await this.db.run(query, [title, protagonist, viewDate, review, image]);
      return true;
    } catch (error) {
      console.error('Error al guardar la pelicula', error);
      return false;
    }
  }



  async getUserByEmail(email: string) {
    const query = `
      SELECT * FROM users WHERE email = ? LIMIT 1;
    `;

    const result = await this.db.query(query, [email]);
    return result.values?.[0] ?? null;
  }


}

