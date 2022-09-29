// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Category {
  id: string;
  name: string;
}

export interface Position {
  lat: number;
  lon: number;
}

export interface Country {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface Subregion {
  id: string;
  name: string;
}

export interface Location {
  category: Category;
  id: string;
  name: string;
  position: Position;
  elevation: number;
  timeZone: string;
  urlPath: string;
  country: Country;
  region: Region;
  subregion: Subregion;
  isInOcean: boolean;
}

export interface RootObject {
  location: Location;
  id: number;
  temperature: number;
  time: Date;
  source: number;
  sourceDisplayName: string;
}

function fetchWaterTemperature() {
  const url = "https://www.yr.no/api/v0/regions/NO-03/watertemperatures";

  return fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      return data;
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: RootObject[] = await fetchWaterTemperature();

    let sorengaTemperature = result.find(
      (x) => x.location.name === "Sørenga"
    )?.temperature;

    res.status(200).json(sorengaTemperature);
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
}
