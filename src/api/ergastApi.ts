import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Race } from "../types/Race";
import {
  RaceDetailsAPIResponse,
  RacesAPIResponse,
  SeasonsAPIResponse,
} from "./APIResponse";
import { RaceDetails } from "../types/RaceDetails";

export const ergastApi = createApi({
  reducerPath: "ergastApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://ergast.com/api/f1/" }),
  endpoints: (builder) => ({
    getSeasons: builder.query<
      { seasons: Season[]; total: number; offset: number; limit: number },
      { pageNo: number; limit: number }
    >({
      query: ({ pageNo, limit }) =>
        `seasons.json?limit=${limit}&offset=${(pageNo - 1) * limit}`,
      transformResponse: (response: SeasonsAPIResponse) => ({
        seasons: response.MRData.SeasonTable?.Seasons,
        total: Number(response.MRData.total),
        offset: Number(response.MRData.offset),
        limit: Number(response.MRData.limit),
      }),
    }),
    getRaces: builder.query<
      { races: Race[]; total: number; offset: number; limit: number },
      { season: string; limit: number; pageNo: number }
    >({
      query: ({ season, limit, pageNo }) =>
        `${season}/races.json?limit=${limit}&offset=${(pageNo - 1) * limit}`,
      transformResponse: (response: RacesAPIResponse) => ({
        races: response.MRData.RaceTable.Races,
        total: Number(response.MRData.total),
        offset: Number(response.MRData.offset),
        limit: Number(response.MRData.limit),
      }),
    }),
    getRaceDetails: builder.query<
      RaceDetails,
      { season: string; round: string }
    >({
      query: ({ season, round }) => `${season}/${round}/results.json`,
      transformResponse: (response: RaceDetailsAPIResponse) =>
        response.MRData.RaceTable.Races[0],
    }),
  }),
});

export const { useGetSeasonsQuery, useGetRacesQuery, useGetRaceDetailsQuery } =
  ergastApi;
