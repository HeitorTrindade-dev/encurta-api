import pool from "../config/db.js";
import { parseIntToBase62 } from "../utils/parseToBase62.js";

export class LinkRepository {
  async createLink(url) {
    const query = `INSERT INTO links (url) VALUES ($1) RETURNING *;`;
    const values = [url];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async insertCodeOnLink(id) {
    const code = parseIntToBase62(id);
    const query = `UPDATE links SET code = $1 WHERE id = $2 RETURNING *;`;
    const values = [code, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
  async getLinkByCode(code){
    const query = `SELECT * FROM links WHERE code = $1;`;
    const values = [code];
    const result = await pool.query(query,values);
    return result.rows[0];
  }
  async getAllLinks(){
    const query = `SELECT * FROM links`;
    const result = await pool.query(query);
    return result.rows;
  }
  async addOneToClicks(code){
    const query = `UPDATE links SET clicks = clicks + 1 WHERE code = $1;`;
    const values = [code];
    const result = await pool.query(query,values);
  }
}