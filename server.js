const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

app.post("/analyze", async(req,res) => {
    const {text, task} = req.body;

    let url = "";
    let payload = {inputs:text};

    if (task === "sentiment") {
        url = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
  } else if (task === "classification") {
    url = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
    payload = {
      inputs: text,
      parameters: {
        candidate_labels: ["Billing", "Tech Support", "Account", "Urgent", "Feedback"],
      },
    };
  }

  try {
    const response = await axios.post(url, payload, {
        headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
        },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "API request failed."});
  }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
