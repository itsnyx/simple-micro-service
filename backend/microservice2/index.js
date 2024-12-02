const http = require("http");
async function fetchData(url) {
  try {
    // Set headers to mimic a real Chrome browser request
    const headers = new Headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      Referer: url, // Set the referer to the current URL
      Origin: new URL(url).origin, // Set origin header based on the request URL
      Connection: "keep-alive",
      DNT: "1", // Do Not Track header
      "Cache-Control": "no-cache",
    });

    // Perform the fetch operation with custom headers
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
      redirect: "follow", // Follow redirects automatically
    });

    // Check if the response is okay
    if (!response.ok) {
      return null;
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
const fetchQuote = async () => {
  const url = "https://zenquotes.io/api/random";
  const res = await fetchData(url);
  console.log("quote : ", res);
  return res;
};

const server = http.createServer(async (req, res) => {
  console.log(
    `Request received at ${new Date().toISOString()}: ${req.method} ${req.url}`
  );
  // const result = await fetchQuote();

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "A life spent making mistakes is not only more honorable but more useful than a life spent doing nothing.-George Bernard Shaw"
  );
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Microservice 2 running on http://localhost:${PORT}`);
});
