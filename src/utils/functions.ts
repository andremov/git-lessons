import type { SimulationLink, SimulationNode } from "~/types/d3";
import type {
  HierarchyGraph,
  HierarchyGraphNode,
  IncompleteHierarchyGraph,
  IncompleteHierarchyNode,
  // Link,
} from "~/types/graph";

const decodableLinkSeparator = ":";

// export function parseLinkToLinkId(link: Link) {
//   const asSimulationLink = link as SimulationLink;
//   const source = asSimulationLink.source as SimulationNode;
//   const target = asSimulationLink.target as SimulationNode;
//   if (source.id >= 0 && target.id >= 0) {
//     return [source.id, target.id, link.weight].join(decodableLinkSeparator);
//   }

//   return [link.source, link.target, link.weight].join(decodableLinkSeparator);
// }

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
        x: 0,
        y: 0,
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
    x: 0,
    y: 0,
    children: children ?? [],
  };
}
