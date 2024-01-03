// index.js

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Registration was successful
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        // Registration failed :(
        console.error("Service Worker registration failed:", error);
      });
  });
}
