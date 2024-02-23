
export type HierarchyGraphNode = {
  name: string;
  shouldRender: boolean;
  isSelected: boolean;
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
