import {
  AppActions,
  IOpenOverlayAction,
  Overlay
} from "@quinninc/rn-core/index";
import React, { useState } from "react";
import { Dimensions, Modal, StatusBar } from "react-native";
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
    setOverlayData(data);
  });

  AppActions.onOverlayClose(() => {
    console.log("overlay closed");
    setOverlayData(null);
  });

  const {height} = Dimensions.get("window");
  return (
    <QuinnOverlayContext.Provider
      value={{
        overlayData: overlayData,
        setOverlayData: setOverlayData,
      }}
    >
      {children}
      {overlayData ? (
        <Modal
          animationType="slide"
          statusBarTranslucent
          
          visible={overlayData ? true : false}
          onRequestClose={() => setOverlayData(null)}
          navigationBarTranslucent
        >
            <Overlay
              data={overlayData}
              direction="vertical"
              disableGradient
              videoResizeMode="contain"
              height={height + (StatusBar.currentHeight ? StatusBar.currentHeight : 0)}
            />
        </Modal>
      ) : null}
    </QuinnOverlayContext.Provider>
  );
}
export default QuinnOverlayContextProvider;
