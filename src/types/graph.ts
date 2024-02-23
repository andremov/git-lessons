export type DirectedNode = {
  id: number;
  shouldRender: boolean;
  isSelected: boolean;
  outgoing: number[];
  incoming: number[];
};

export type Link = {
  source: number;
  target: number;
  isSelected: boolean;
  shouldRender: boolean;
};

export type DirectedGraph = {
  startsAt1: boolean;
  renderWeights: boolean;
  description: string;
  sources: number[];
  targets: number[];
  capacities: number[][];
  adjacency: number[][];
  nodes: DirectedNode[];
  links: Link[];
};
