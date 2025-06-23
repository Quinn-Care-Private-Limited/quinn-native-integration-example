import {
  AppActions,
  IOpenOverlayAction,
  Overlay,
} from "@quinninc/rn-core/index";
import React, { useState } from "react";
import { Modal } from "react-native";

export const QuinnOverlayContext = React.createContext<{
  overlayData: IOpenOverlayAction | null;
  setOverlayData: React.Dispatch<
    React.SetStateAction<IOpenOverlayAction | null>
  >;
}>({
  overlayData: null,
  setOverlayData: (overlayData: any) => {},
});

function QuinnOverlayContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [overlayData, setOverlayData] = useState<IOpenOverlayAction | null>(
    null
  );

  AppActions.onOverlayOpen((data) => {
    console.log(data);
    setOverlayData(data);
  });

  AppActions.onOverlayClose(() => {
    setOverlayData(null);
  });

  return (
    <QuinnOverlayContext.Provider
      value={{
        overlayData: overlayData,
        setOverlayData: setOverlayData,
      }}
    >
      {children}
      <Modal animationType="slide" visible={!!overlayData} transparent>
        <Overlay
          data={overlayData}
          direction="horizontal"
          disableGradient
          videoResizeMode="contain"
        />
      </Modal>
    </QuinnOverlayContext.Provider>
  );
}

export default QuinnOverlayContextProvider;
