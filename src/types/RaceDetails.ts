import { Circuit } from "./Circuit";
import { Constructor } from "./Constructor";
import { Driver } from "./Driver";

export interface RaceDetails {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  Results: RaceResult[];
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: {
    millis: string;
    time: string;
  };
}
