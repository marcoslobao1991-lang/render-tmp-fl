// Entrada própria da VSL Friends LATAM (Manuela), public mínimo (public-latam).
// Studio: npx remotion studio src/friends-latam/index.tsx --public-dir=public-latam --port 3060
import React from "react";
import { Composition, registerRoot } from "remotion";
import { FriendsLatam, FL_DUR, FL_FPS, FL_DEFAULTS } from "./FriendsLatam";

const Root: React.FC = () => (
  <Composition id="FriendsLatam" component={FriendsLatam} durationInFrames={FL_DUR} fps={FL_FPS} width={1080} height={1920} defaultProps={FL_DEFAULTS} />
);
registerRoot(Root);
