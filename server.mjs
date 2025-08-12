import http from "http";

const products = [
  { category: "Drinks", name: "Orange Juice", price: 14.99 },
  { category: "Fruits", name: "Apples", price: 4.99 },
  { category: "Vegitables", name: "Tomatos", price: 6.99 },
  { category: "Drinks", name: "Coffee", price: 10.99 },
  { category: "Vegitables", name: "Sweet Paper", price: 7.49 },
  { category: "Fruits", name: "Grapes", price: 13.99 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "GET" && req.url === "/fruits") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
