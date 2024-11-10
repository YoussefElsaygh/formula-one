import {
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { ReactNode } from "react";
import { chevronForward, gridOutline, reorderFour } from "ionicons/icons";

import "./ListView.css";
import { setListViewType } from "../../../slice/appSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Pagination } from "../Pagination/Pagination";
export const ListView = <T,>({
  items,
  itemBuilder,
  onClick,
  onPageChanged,
  pagesTotalCount = 0,
  currentPage = 1,
  disableViewTypeSelector = false,
  listViewTypeSelector,
}: {
  items: T[];
  itemBuilder: (item: T) => ReactNode;
  onClick?: (item: T) => void;
  onPageChanged?: (page: number) => void;
  pagesTotalCount?: number;
  currentPage?: number;
  disableViewTypeSelector?: boolean;
  listViewTypeSelector?: "list" | "card" | undefined;
}) => {
  const dispatch = useAppDispatch();
  const listViewType =
    listViewTypeSelector ?? useAppSelector((s) => s.app.listViewType);

  return (
    <>
      {!disableViewTypeSelector && (
        <IonItem>
          <IonIcon
            icon={reorderFour}
            onClick={() => {
              dispatch(setListViewType("list"));
            }}
            className={`${listViewType === "list" ? "active" : "inactive"}`}
          />
          <span style={{ paddingInline: "5px" }}>|</span>
          <IonIcon
            icon={gridOutline}
            onClick={() => {
              dispatch(setListViewType("card"));
            }}
            className={`${listViewType === "card" ? "active" : "inactive"}`}
          />
        </IonItem>
      )}
      <IonList className={listViewType}>
        {items?.map((item) => (
          <>
            {
              <IonItem>
                {listViewType === "card" ? (
                  <IonCard style={{ width: "100%" }}>
                    <IonCardContent>
                      <span className="next">
                        {itemBuilder(item)}
                        {onClick && (
                          <IonIcon
                            icon={chevronForward}
                            onClick={() => onClick(item)}
                            size="large"
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </span>
                    </IonCardContent>
                  </IonCard>
                ) : (
                  <span className="next">
                    {itemBuilder(item)}
                    {onClick && (
                      <IonIcon
                        icon={chevronForward}
                        onClick={() => onClick(item)}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </span>
                )}
              </IonItem>
            }
          </>
        ))}
      </IonList>
      {onPageChanged && pagesTotalCount && (
        <Pagination
          onPageChanged={onPageChanged}
          pagesCount={pagesTotalCount}
          currentPage={currentPage}
        />
      )}
    </>
  );
};
