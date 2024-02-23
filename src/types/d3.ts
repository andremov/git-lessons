import type { HierarchyNode, Link } from "./graph";

export type SimulationNode = d3.SimulationNodeDatum & HierarchyNode;

export type SimulationLink = d3.SimulationLinkDatum<SimulationNode> &
  Link & {
    boundingBox?: DOMRect;
  };
