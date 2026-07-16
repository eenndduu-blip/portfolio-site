import type { Metadata } from "next";
import { ExperienceV2 } from "@/components/v2/ExperienceV2";

export const metadata: Metadata = {
  title: "Endale Bekele — An Experience in Memory & Place",
  description:
    "Immersive portfolio experience — architecture, watercolor, and photography by Endale Bekele.",
};

export default function V2Page() {
  return <ExperienceV2 />;
}
