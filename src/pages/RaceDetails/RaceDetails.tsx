import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonItemDivider,
} from "@ionic/react";
import { useParams } from "react-router";
import { useGetRaceDetailsQuery } from "../../api/ergastApi";
import { ListView } from "../../components/UI/ListView/ListView";
import { RaceResult } from "../../types/RaceDetails";
import { Page } from "../../components/UI/Page/Page";
import { ErrorComponnet } from "../../components/UI/ErrorComponent/ErrorComponent";
import PerformanceComponent from "./PerformanceComponent/PerformanceComponent";

export const RaceDetails = () => {
  const { year, round } = useParams<{ year: "string"; round: string }>();
  const { data, isLoading, error } = useGetRaceDetailsQuery({
    season: year,
    round,
  });
  return (
    <Page title={data?.raceName ?? "Race Details"} isLoading={isLoading}>
      {error ? (
        <ErrorComponnet error="Couldn't load details! Please try again!" />
      ) : (
        <>
          <IonItem>Drivers</IonItem>
          <ListView<RaceResult>
            listViewTypeSelector="card"
            disableViewTypeSelector={true}
            items={data?.Results ?? []}
            itemBuilder={(result) => (
              <IonCardHeader>
                <IonCardTitle>
                  {result.Driver?.givenName} {result.Driver?.familyName}
                </IonCardTitle>
                <IonCardSubtitle>
                  {result.Driver?.nationality} , {result.Driver?.dateOfBirth}{" "}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  Team:{result.Constructor?.name}
                </IonCardSubtitle>

                <IonCardSubtitle>Position:{result.position}</IonCardSubtitle>
              </IonCardHeader>
            )}
          />
          <IonItemDivider />
          {data?.Results && (
            <PerformanceComponent
              data={data?.Results?.map((result) => ({
                driver: `${result.Driver?.givenName} ${result.Driver?.familyName}`,
                time: result.Time ? Number(result.Time?.millis) : undefined,
                timeDifference: getTimeDifference(result),
              }))}
            />
          )}
        </>
      )}
    </Page>
  );

  function getTimeDifference(result: RaceResult): number | undefined {
    if (!result.Time || !result.Time.time) return undefined;

    if (result.Time.time.startsWith("+")) return Number(result.Time?.time);

    return 0;
  }
};
