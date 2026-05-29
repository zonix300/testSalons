import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

async function main() {

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.name"
      },
      body: JSON.stringify({
        "textQuery": "beauty salon Praga Warsaw"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    await fs.appendFile(
      "salons.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    console.log("Success!");
  } catch (error) {
    console.error("An error occurred during execution:", error.message);
  }
}

main();
