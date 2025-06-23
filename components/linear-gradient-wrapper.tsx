import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import React from "react";
import { ColorValue, ViewStyle } from "react-native";

interface LinearGradientProps {
  colors: ColorValue[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: ViewStyle;
  children?: React.ReactNode;
  [key: string]: any;
}

const LinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  start,
  end,
  locations,
  style,
  children,
  ...props
}) => {
  return (
    <ExpoLinearGradient
      colors={colors as any}
      start={start}
      end={end}
      locations={locations as any}
      style={style}
      {...props}
    >
      {children}
    </ExpoLinearGradient>
  );
};

export default LinearGradient;
