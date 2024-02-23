import type { SimulationLink } from "~/types/d3";
import type {
  HierarchyGraph,
  HierarchyGraphNode,
  IncompleteHierarchyGraph,
  IncompleteHierarchyNode,
} from "~/types/graph";

export function parseLinkToLinkId(link: SimulationLink) {
  return `${link.source.data.name}->${link.target.data.name}`;
}

export function parseGraphToId(graph: HierarchyGraph): string {
  const children = graph.children
    .map((node) => parseGraphToId(node))
    .reduce((prev, cur) => `${prev}+${cur}`, "");

  return `${graph.name}->[${children}]`;
}

export function buildHierarchyGraph(
  starterGraph: IncompleteHierarchyGraph,
  rootNode?: IncompleteHierarchyNode,
): HierarchyGraphNode {
  if (!rootNode) {
    const root = starterGraph.nodes.find((node) => !node.parent);

    if (!root) {
      return {
        name: "",
        isSelected: false,
        shouldRender: false,
        children: [],
      };
    }

    return buildHierarchyGraph(starterGraph, root);
  }

  const children = starterGraph.nodes
    .filter((node) => node.parent === rootNode.id)
    .map((childNode) => buildHierarchyGraph(starterGraph, childNode));

  const graph: HierarchyGraph = buildHierarchyGraphNode(rootNode, children);

  return graph;
}

function buildHierarchyGraphNode(
  inputNode: IncompleteHierarchyNode,
  children?: HierarchyGraphNode[],
): HierarchyGraphNode {
  return {
    name: inputNode.id,
    isSelected: false,
    shouldRender: true,
    children: children ?? [],
  };
}
