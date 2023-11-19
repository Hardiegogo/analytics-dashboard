import type { NextApiRequest, NextApiResponse } from "next";
import Papa from "papaparse";
import path from "path";
import fs from "fs";

type ResponseData = {
  data: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const dataPath = path.join(process.cwd(), "/data/data.csv");
    const fileContents = fs.readFileSync(dataPath, "utf8");
    const parsedData = Papa.parse(fileContents, {
      header: true,
    });
    console.log(typeof parsedData);
    res.status(200).json({ data: parsedData.data });
  } catch (error) {}
}
