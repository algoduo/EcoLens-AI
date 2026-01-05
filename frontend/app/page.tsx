"use client"
import { WasteAnalysis } from "../src/components/waste-analysis";
import { Certificate } from "../src/components/certificate";
import { Leaderboard } from "../src/components/leaderboard";
// Correct path to reach into the src components folder
import { WasteTracker } from "../src/components/waste-tracker";

export default function DashboardPage() {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WasteAnalysis />
        <Certificate />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2"><WasteTracker /></div>
        <Leaderboard />
      </div>
    </div>
  );
}