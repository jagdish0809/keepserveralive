const express = require("express");
const app = express();
const axios = require("axios");

const makeGetRequest = async () => {
  try {
    const response = await axios.get("https://mbuy-server.onrender.com/");
    console.log("API1 Status: ", response.status , "at", response.headers.date);
    const response2 = await axios.get("https://cruffin.onrender.com");
    console.log("API2 Status: ", response2.status, "at", response.headers.date);
    console.log("")
  } catch (error) {
    console.error("Error making GET request:", error);
  }
};

setInterval(makeGetRequest, 60000);

app.listen(5000, ()=>{
    console.log(`server is running on port 5000`)
})