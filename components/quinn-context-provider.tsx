import {
  AppActions,
  IOpenOverlayAction,
  Overlay,
} from "@quinninc/rn-core/index";
import React, { useState } from "react";
import { Modal, View } from "react-native";
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
          visible={overlayData ? true : false}
          onRequestClose={() => setOverlayData(null)}
          statusBarTranslucent
          style={{
            height: "100%",
          }}
        >
          <View>
            <Overlay
              data={overlayData}
              direction="vertical"
              disableGradient
              videoResizeMode="contain"
            />
          </View>
        </Modal>
      ) : null}
    </QuinnOverlayContext.Provider>
  );
}
export default QuinnOverlayContextProvider;
