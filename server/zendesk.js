import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import process from "process";

import axios from "axios";
import { Buffer } from "buffer";

const zendeskUserApi = axios.create({
  baseURL: `https://${process.env.ZENDESK_SUBDOMAIN}.${process.env.ZENDESK_DOMAIN}.com/api/v2/users`,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.ZENDESK_EMAIL}/${process.env.ZENDESK_API_TOKEN}`
    ).toString("base64")}`,
    "Content-Type": "application/json",
  },
});

export const createZendeskUser = async (
  externalId,
  email,
  given_name,
  family_name
) => {
  const user = {
    user: {
      name: `${given_name} ${family_name}`, // Full name
      email: email,
      external_id: externalId,
      identities: [
        {
          type: "email",
          value: email, // Primary email as identity
        },
      ],
      organization: {
        name: "General", // Example organization name
      },
      role: "end-user", // User role
    },
  };
  try {
    const response = await zendeskUserApi.post("/users.json", user);
    console.log(response.data, "ZENDESK USER CREATED");
  } catch (error) {
    console.log(error + "ERROR");
  }
};
