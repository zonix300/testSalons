import fs from "fs/promises";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

async function main() {
  try {
    const ids_raw = await fs.readFile("salon_ids.json", "utf-8");

    const ids_data = JSON.parse(ids_raw);
    const allPlaces = Object.values(ids_data).flat();

    const unique = [...new Map(allPlaces.map(place => [place.id, place])).values()];

    console.log(`Total: ${allPlaces.length}, Unique: ${unique.length}`);

    for (const place of unique) {
      await proceed(place.id);
    }
  } finally {
    await pool.end();
  }
}

async function call(place_id) {
  const response = await fetch(`https://places.googleapis.com/v1/places/${place_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,addressComponents,nationalPhoneNumber,websiteUri,rating,userRatingCount"
    },
  });

  if (!response.ok) {
    throw new Error(`Place API error: ${response.status} for ${place_id}`)
  }

  return response.json();
}

async function persist(data) {
  const name = data.displayName?.text ?? "Beauty Salon";
  const district = data.addressComponents
    ?.find(c => c.types?.includes("sublocality") || c.types?.includes("neighborhood"))
    ?.longText ?? null;
  const phone = data.nationalPhoneNumber ?? null;
  const website = data.websiteUri ?? null;
  const rating = data.rating ?? null;
  const userRatingCount = data.userRatingCount ?? null;

  await pool.query(
    "INSERT INTO salons (place_id, name, address, district, phone_number, website, rating, reviews_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [data.id, name, data.formattedAddress, district, phone, website, rating, userRatingCount]
  );
}

async function proceed(place_id) {
  try {
    const data = await call(place_id);
    await persist(data);
    console.log(`Inserted ${place_id}`);
  } catch (err) {
    console.error(`Skipping ${place_id}:`, err.message);
    throw err;
  }
}

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "salons",
  user: "postgres",
  password: DB_PASSWORD,
});

main();
