
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import linkRouter from './src/routes/linkRouter.js';

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // <- PASTA ONDE ESTÁ O index.html
app.use('/', linkRouter);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));