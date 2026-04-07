const pool = require("../config/db")


class linkRepository{

    async createLink(url) {
        const query = `
            INSERT INTO links (url)
            VALUES ($1)
            RETURNING *;
        `;

        const values = [url, code];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    
}