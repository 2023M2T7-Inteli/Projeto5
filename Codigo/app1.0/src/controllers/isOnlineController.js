const dns = require('dns');

// Function to check if there is an internet connection
function hasInternetConnection() {
  return new Promise(resolve => {
    // Use the `dns.lookup` method to perform a DNS lookup on 'google.com'
    dns.lookup('google.com', err => {
      // If an error occurs and the error code is 'ENOTFOUND' (indicating DNS resolution failure)
      if (err && err.code === 'ENOTFOUND') {
        // Resolve the promise with `false` to indicate no internet connection
        resolve(false);
      } else {
        // Otherwise, resolve the promise with `true` to indicate internet connection
        resolve(true);
      }
    });
  });
};

// Example usage:
async function checkOnlineStatus(req, res) {
  // Call the `hasInternetConnection` function to check if there is an internet connection
  const isConnected = await hasInternetConnection();
  if (isConnected) {
    // If there is an internet connection, log "Connected!" to the console
    console.log("Connected!");
    // Send a 200 (OK) response with JSON indicating that the connection is successful
    res.status(200).json({ isConnected: true });
  } else {
    // If there is no internet connection, log "Disconnected!" to the console
    console.log("Disconnected!");
    // Send a 500 (Internal Server Error) response with JSON indicating that the connection is unsuccessful
    res.status(500).json({ isConnected: false });
    // Set up an interval to periodically check if the connection is restored
    setInterval(() => {
      // If the browser indicates that it is online (using `navigator.onLine`)
      if (navigator.onLine) {
        // Log "Reconnected" to the console
        console.log("Reconnected");
        // Reload the page to re-establish the connection
        location.reload();
      } else {
        // If still disconnected, log "Still Disconnected" to the console
        console.log("Still Disconnected");
      }
    }, 5000); // Repeat every 5 seconds (5000 milliseconds)
  }
};

module.exports = {
    checkOnlineStatus
};
