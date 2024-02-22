import { GraphView } from "~/components/d3/graph-view";
import type { DirectedGraph } from "~/types/graph";

export default function HomePage() {
  const basicGraph: DirectedGraph = {
    startsAt1: false,
    renderWeights: true,
    description: "Sample graph",
    sources: [0],
    targets: [1],
    capacities: [],
    adjacency: [],
    nodes: [
      {
        incoming: [],
        outgoing: [1],
        id: 0,
        isSelected: false,
        shouldRender: true,
      },
      {
        incoming: [0],
        outgoing: [],
        id: 1,
        isSelected: false,
        shouldRender: true,
      },
    ],
    links: [
      {
        isSelected: false,
        shouldRender: true,
        source: 0,
        target: 1,
        weight: 1,
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <GraphView data={basicGraph} />
    </main>
  );
}
