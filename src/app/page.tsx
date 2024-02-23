import { GraphView } from "~/components/d3/graph-view";
import type { HierarchyGraph, IncompleteHierarchyGraph } from "~/types/graph";
import { buildHierarchyGraph } from "~/utils/functions";

// const lookup_table: Record<string, string> = {
//   A: "G",
//   B: "L",
//   C: "O",
//   D: "R",
//   E: "I",
//   F: "A",
//   G: "S",
//   H: "N",
//   I: "D",
//   J: "E",
//   K: "U",
//   L: "Z",
//   " ": "_",
// };

// const color_table: Record<string, string> = {
//   A: "text-green-600",
//   B: "text-green-600",
//   C: "text-green-600",
//   D: "text-green-600",
//   E: "text-green-600",
//   F: "text-green-600",
//   G: "text-green-600",
//   H: "text-green-600",
//   I: "text-green-600",
//   J: "text-green-600",
//   K: "text-green-600",
//   L: "text-green-600",
//   " ": "text-black/10",
// };

const inputGraph: IncompleteHierarchyGraph = {
  nodes: [
    {
      id: "C1",
    },
    {
      id: "C2",
      parent: "C1",
    },
    {
      id: "C3",
      parent: "C1",
    },
    {
      id: "C4",
      parent: "C2",
    },
    {
      id: "C5",
      parent: "C4",
    },
  ],
};

export default function HomePage() {
  const basicGraph: HierarchyGraph = buildHierarchyGraph(inputGraph);
  // const source = "ABCDEF F BCG ADFHIJG AKJDDJDCG IJ BF BKL";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <GraphView data={basicGraph} description={"Basic graph"} />
      {/* <div className="flex gap-1 text-5xl">
        {source.split("").map((letter, index) => (
          <div className={"w-7 text-center " + color_table[letter]} key={index}>
            {lookup_table[letter] ?? "?"}
          </div>
        ))}
      </div> */}
    </main>
  );
}
