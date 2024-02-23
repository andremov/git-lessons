// export type HierarchyNode = {
//   id: number;
//   shouldRender: boolean;
//   isSelected: boolean;
//   outgoing: number[];
//   incoming: number[];
// };

// export type Link = {
//   source: number;
//   target: number;
//   isSelected: boolean;
//   shouldRender: boolean;
// };

// export type HierarchyGraph = {
//   description: string;
//   nodes: HierarchyNode[];
//   links: Link[];
// };
export type HierarchyGraphNode = {
  name: string;
  shouldRender: boolean;
  isSelected: boolean;
  x: number;
  y: number;
  children: HierarchyGraphNode[];
};

export type HierarchyGraph = HierarchyGraphNode;

export type IncompleteHierarchyNode = {
  id: string;
  parent?: string;
};

export type IncompleteHierarchyGraph = {
  nodes: IncompleteHierarchyNode[];
};
