import { IconType } from "react-icons";
import React from "react";
import * as AppIcons from "@/types/app-icons";

export type TAppIcons = keyof typeof AppIcons;

export interface ReactIconLoaderProps extends React.HTMLAttributes<SVGAElement> {
  icon?: TAppIcons;
  importName?: TAppIcons;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ReactIcon: React.FC<ReactIconLoaderProps> = ({ icon, ...props }) => {
  type IconTypeKey = keyof typeof AppIcons;
  type AppIconType = Record<IconTypeKey, IconType>;
  const Icon = (AppIcons as AppIconType)[icon || "FaRobot"];

  return Icon ? <Icon {...props} /> : null;
};

export default ReactIcon;
