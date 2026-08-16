import type { Metadata } from "next";
import Timer from "@/components/Timer";

export const metadata: Metadata = {
  title: "Timer Calculator",
};

export default function TimerPage() {
  return <Timer />;
}
