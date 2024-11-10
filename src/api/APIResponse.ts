import { Race } from "../types/Race";
import { RaceDetails } from "../types/RaceDetails";

interface MRData<T extends "races" | "details" | "seasons"> {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  SeasonTable: { Seasons: Season[] };
  RaceTable: T extends "details"
    ? {
        Races: RaceDetails[];
        season: string;
        round: string;
      }
    : {
        Races: RaceDetails[];
        season: string;
      };
}

type SeasonsMRData = Omit<MRData<"seasons">, "RaceTable">;
type RacesMRData = Omit<MRData<"races">, "SeasonTable">;
type RaceDetailsMRData = Omit<MRData<"details">, "SeasonTable">;

interface APIResponse<
  T extends RacesMRData | SeasonsMRData | RaceDetailsMRData,
> {
  MRData: T;
}
// Example of the specific response types based on the table you need

export type RacesAPIResponse = APIResponse<RacesMRData>;
export type RaceDetailsAPIResponse = APIResponse<RaceDetailsMRData>;
export type SeasonsAPIResponse = APIResponse<SeasonsMRData>;
