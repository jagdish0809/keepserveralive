// const express = require("express");
// const app = express();
// const axios = require("axios");

// const makeGetRequest = async () => {
//   try {
//     const response = await axios.get("https://mbuy-server.onrender.com/");
//     console.log("API1 Status: ", response.status , "at", response.headers.date);
//     const response2 = await axios.get("https://cruffin.onrender.com");
//     console.log("API2 Status: ", response2.status, "at", response.headers.date);
//     console.log("")
//   } catch (error) {
//     console.error("Error making GET request:", error);
//   }
// };

// setInterval(makeGetRequest, 60000);

// app.listen(5000, ()=>{
//     console.log(`server is running on port 5000`)
// })



const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route to make the GET request
app.get("/make-request", async (req, res) => {
  try {
    // Make the GET request to your target URL
    const mbuyResponse = await axios.get("https://mbuy-server.onrender.com/");
    const cruffinResponse = await axios.get("https://cruffin.onrender.com/");

    res.json({
      message: "GET requests successful",
      mbuyData: mbuyResponse.data,
      cruffinData: cruffinResponse.data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error making GET request", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a cron job to make the request every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    // Make the GET requests
    const mbuyResponse = await axios.get("http://localhost:3000/make-request");
    console.log("GET request to mbuy made:", mbuyResponse.data);

    const cruffinResponse = await axios.get(
      "http://localhost:3000/make-request"
    );
    console.log("GET request to cruffin made:", cruffinResponse.data);
  } catch (error) {
    console.error("Error making GET request:", error.message);
  }
});

