import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".map": "application/json" };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const candidate = path.resolve(root, `.${pathname}`);
  const safeCandidate = candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile() ? candidate : path.join(root, "index.html");
  response.writeHead(200, { "Content-Type": contentTypes[path.extname(safeCandidate)] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(safeCandidate).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`StockFlow preview running at http://127.0.0.1:${port}`);
});
