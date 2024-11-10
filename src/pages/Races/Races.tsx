import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { useParams } from "react-router";
import { useGetRacesQuery } from "../../api/ergastApi";
import { ListView } from "../../components/UI/ListView/ListView";
import { Race } from "../../types/Race";
import { Page } from "../../components/UI/Page/Page";
import { ErrorComponnet } from "../../components/UI/ErrorComponent/ErrorComponent";
import { heart, heartOutline } from "ionicons/icons";
import "./Races.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addFavoriteRace, removeFavoriteRace } from "../../slice/racesSlice";
import { useEffect, useState } from "react";
export const Races = () => {
  const { year } = useParams<{ year: "string" }>();
  const limit = 5;
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, isError, refetch } = useGetRacesQuery({
    pageNo,
    limit,
    season: year,
  });
  useEffect(() => {
    refetch();
  }, [pageNo]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  useEffect(() => {
    setTotalItemsCount(data?.total ?? 0);
  }, [data?.total]);
  const { push } = useIonRouter();
  const favoriteRaces = useAppSelector((s) => s.races.favoriteRaces);
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    const unfavRaces =
      data?.races?.filter(
        (r1) => !favoriteRaces?.find((r2) => r2?.raceName === r1?.raceName)
      ) ?? [];
    setRaces([...favoriteRaces, ...unfavRaces]);
  }, [data?.races]);

  const dispatch = useAppDispatch();
  return (
    <Page title={data ? `Races - ${year}` : "Races"} isLoading={isLoading}>
      {isError ? (
        <ErrorComponnet error={"Couldn't load Races! Please try again"} />
      ) : (
        <ListView<Race>
          onClick={(item) => {
            push(`/race/${year}/${item.round}`);
          }}
          items={races}
          itemBuilder={(race: Race) => (
            <IonCardHeader>
              <IonCardTitle className="race">
                {race.raceName}

                <IonIcon
                  size="large"
                  icon={
                    favoriteRaces.find((r) => r.raceName === race.raceName)
                      ? heart
                      : heartOutline
                  }
                  onClick={() => {
                    favoriteRaces.find((r) => r.raceName === race.raceName)
                      ? dispatch(removeFavoriteRace(race))
                      : dispatch(addFavoriteRace(race));
                  }}
                  style={{
                    color: "red",
                    paddingInline: "20px",
                    cursor: "pointer",
                  }}
                />
              </IonCardTitle>
              <IonCardSubtitle>
                <div>
                  <div>{`${race?.Circuit?.circuitName}`}</div>
                  {!isNaN(new Date(race?.date).getTime()) && (
                    <div>{`${new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(race?.date))}`}</div>
                  )}
                  {race?.Circuit?.url && (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(race.Circuit.url, "_blank");
                      }}
                    >
                      More details about circuit.
                    </div>
                  )}
                </div>
              </IonCardSubtitle>
            </IonCardHeader>
          )}
          onPageChanged={(pageNo) => {
            setPageNo(pageNo);
          }}
          pagesTotalCount={Math.ceil(totalItemsCount / limit)}
          currentPage={pageNo}
        />
      )}
    </Page>
  );
};
