import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import process from "process";
import { Buffer } from "buffer";

import axios from "axios";

const zendeskClient = axios.create({
  baseURL: `https://${process.env.ZENDESK_SUBDOMAIN}.${process.env.ZENDESK_DOMAIN}.com/api/v2/users?role=end-user`,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.ZENDESK_EMAIL}/token:${process.env.ZENDESK_API_TOKEN}`
    ).toString("base64")}`,
    "Content-Type": "application/json",
  },
});

export default zendeskClient;
