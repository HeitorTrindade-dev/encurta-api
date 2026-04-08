# 🔗 encurta-API | URL Shortener

A REST API for shortening URLs with automatic redirection, click tracking, and a management panel. Built with Node.js, Express, and PostgreSQL.

---

## 🚀 Tech Stack

- **Node.js** with ES Modules
- **Express 5**
- **PostgreSQL** via `pg`
- **dotenv** for environment variables
- **nodemon** for development

---

## 📁 Project Structure

```
├── server.js
├── package.json
├── popularBanco.sh
├── public/
│   └── index.html
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── linkController.js
    ├── models/
    │   └── linkModel.js
    ├── repositories/
    │   └── linkRepository.js
    ├── routes/
    │   └── linkRouter.js
    ├── services/
    │   └── linkService.js
    └── utils/
        ├── parseToBase62.js
        └── dbTemplate.txt
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) installed and running

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/HeitorTrindade-dev/encurta-api.git
cd encurta-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

### 4. Create the database

Connect to PostgreSQL and run:

```sql
CREATE DATABASE encurtaapi;
```

Then connect to the database and run the schema:

```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE,
    url TEXT NOT NULL,
    clicks INT DEFAULT 0,
    isOnline BOOLEAN DEFAULT TRUE
);
```

> The schema template is also available at `src/utils/dbTemplate.txt`.

### 5. Start the server

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

### `POST /`
Creates a new shortened link.

**Request body:**
```json
{ "url": "https://github.com" }
```

**Response `201`:**
```json
{
  "id": 1,
  "code": "1",
  "url": "https://github.com",
  "clicks": 0,
  "isonline": true
}
```

---

### `GET /:code`
Redirects to the original URL and increments the click counter.

**Example:** `GET http://localhost:3000/1` → `302` redirects to `https://github.com`

---

### `GET /links`
Returns all registered links.

**Response `200`:**
```json
[
  {
    "id": 1,
    "code": "1",
    "url": "https://github.com",
    "clicks": 42,
    "isonline": true
  },
  ...
]
```

---

### `GET /links/:code`
Returns the data for a specific link without redirecting.

**Example:** `GET http://localhost:3000/links/1`

**Response `200`:**
```json
{
  "id": 1,
  "code": "1",
  "url": "https://github.com",
  "clicks": 42,
  "isonline": true
}
```

**Response `404`:**
```json
{ "message": "There are no link with this code" }
```

---

## 🌐 Web Interface

Accessing `http://localhost:3000` serves a simple frontend from `public/index.html`.

> ⚠️ **Note:** the frontend is a minimal vibe-coded interface built purely to make API testing easier during development. It is not production-ready and is not the focus of this project.

---

## 🌱 Seeding the Database

The project includes a shell script to quickly populate the database with test data:

```bash
chmod +x popularBanco.sh
./popularBanco.sh
```

The script will ask how many links to create (max 5000) and display a real-time progress bar. **The server must be running before executing the script.**

---

## 🔧 How the Shortening Works

Each inserted link receives a sequential `id` from PostgreSQL. That `id` is then converted to **Base62** (characters `0-9`, `a-z`, `A-Z`), generating a short and unique code — the same mechanism used by services like bit.ly.

```
id: 1      → code: "1"
id: 62     → code: "10"
id: 3844   → code: "100"
```

---

## 📝 Environment Variables

| Variable      | Description               |
|---------------|---------------------------|
| `DB_USER`     | PostgreSQL username        |
| `DB_PASSWORD` | PostgreSQL password        |

> The host is hardcoded as `localhost` and the database as `encurtaapi`. Change these in `src/config/db.js` if needed.

## Screenshots

![Página inicial](/print.png)
