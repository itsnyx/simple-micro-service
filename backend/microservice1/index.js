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

const fetchDollarPrice = async () => {
  const url = "https://api.priceto.day/v1/latest/irr/usd";
  const res = await fetchData(url);
  return res;
};
const server = http.createServer(async (req, res) => {
  console.log(
    `Request received at ${new Date().toISOString()}: ${req.method} ${req.url}`
  );
  // const result = await fetchDollarPrice();
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "1$ is equal to 705600 IRR With High of 705700 and Low of 699400 at 2024-12-02T11:54:49.000Z"
  );
  // if (result.success) {
  // } else {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("Sorry, I couldn't get the latest price.");
  // }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Microservice 1 running on http://localhost:${PORT}`);
});
