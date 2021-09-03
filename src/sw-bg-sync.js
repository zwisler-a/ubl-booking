console.log("Registering background task handler...");

self.addEventListener("message", async (event) => {
  if (event.data && event.data.type === "POLL_TIMESLOT") {
    console.log("Requesting timeslot!", event.data);
  }
});
