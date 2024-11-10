import { RaceDetails } from "./RaceDetails";
export type Race = Omit<RaceDetails, "Results">;
