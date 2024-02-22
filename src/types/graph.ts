export type DirectedNode = {
  isSelected: boolean;
  shouldRender: boolean;
  id: number;
  set?: 1 | 2 | 3;
  outgoing: number[];
  incoming: number[];
};

export type BiDirectedNode = {
  id: number;
  connectedTo: number[];
  shouldRender: boolean;
  isSelected: boolean;
};

export type Link = {
  source: number;
  target: number;
  weight: number;
  isSelected: boolean;
  shouldRender: boolean;
};

export type PushRelabelMetadata = {
  maxFlow: number;
  flow: number[][];
  paths: number[][];
  capacities: number[][];
  adjacency: number[][];
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

export type BiDirectedGraph = {
  startsAt1: boolean;
  nodes: BiDirectedNode[];
  links: Link[];
  description: string;
};

export type DownloadableGraph = {
  nodeCount: number;
  maxFlow: number;
  targetCount: number;
  targets: number[];
  adjacency: number[][];
};
