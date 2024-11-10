import { IonCardHeader, IonCardTitle, useIonRouter } from "@ionic/react";
import { useGetSeasonsQuery } from "../../api/ergastApi";
import { ListView } from "../../components/UI/ListView/ListView";
import { Page } from "../../components/UI/Page/Page";
import { ErrorComponnet } from "../../components/UI/ErrorComponent/ErrorComponent";
import { useEffect, useState } from "react";

export const Home = () => {
  const limit = 5;
  const [pageNo, setPageNo] = useState(1);
  const { data, error, isLoading, refetch, isFetching } = useGetSeasonsQuery({
    pageNo,
    limit,
  });
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  useEffect(() => {
    setTotalItemsCount(data?.total ?? 0);
  }, [data?.total]);
  const { push } = useIonRouter();
  useEffect(() => {
    if (!data) refetch();
  }, [pageNo]);
  return (
    <Page title="Formula One" isLoading={isLoading || isFetching}>
      {error ? (
        <ErrorComponnet error={"Couldn't load Please try again"} />
      ) : (
        <ListView<Season>
          items={data?.seasons ?? []}
          itemBuilder={(season: Season) => (
            <IonCardHeader>
              <IonCardTitle>{season.season}</IonCardTitle>
              <span
                style={{
                  cursor: "pointer",
                  width: "fit-content",
                  color: "gray",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(season.url, "_blank");
                }}
              >
                More Details
              </span>
            </IonCardHeader>
          )}
          onClick={(season) => {
            push("/races/" + season.season);
          }}
          onPageChanged={(pageNo) => {
            setPageNo(pageNo);
          }}
          pagesTotalCount={Math.ceil(totalItemsCount / limit)}
          currentPage={pageNo}
        ></ListView>
      )}
    </Page>
  );
};
