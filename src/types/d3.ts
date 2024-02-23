import type { HierarchyGraphNode } from "./graph";

export type SimulationNode = d3.SimulationNodeDatum & {
  data: HierarchyGraphNode;
  x: number;
  y: number;
};

export type SimulationLink = d3.SimulationLinkDatum<SimulationNode> & {
  source: SimulationNode;
  target: SimulationNode;
};
