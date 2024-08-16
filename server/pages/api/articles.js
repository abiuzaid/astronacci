import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'articles.json');
  const fileContent = fs.readFileSync(filePath);
  const articles = JSON.parse(fileContent);

  res.status(200).json(articles);
}
