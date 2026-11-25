import React from "react";
import { Composition, registerRoot } from "remotion";
import { FriendsLatam, FL_DUR, FL_FPS, FL_DEFAULTS } from "./friends-latam/FriendsLatam";

const Root: React.FC = () =>
  React.createElement(Composition as any, { id: "FriendsLatam", component: FriendsLatam, durationInFrames: FL_DUR, fps: FL_FPS, width: 1080, height: 1920, defaultProps: FL_DEFAULTS });
registerRoot(Root);
