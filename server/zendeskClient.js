require("dotenv").config();
const axios = require("axios");

const zendeskClient = axios.create({
  baseURL: `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/users/`,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.ZENDESK_EMAIL}/token:${process.env.ZENDESK_API_TOKEN}`
    ).toString("base64")}`,
    "Content-Type": "application/json",
  },
});

module.exports = zendeskClient;
