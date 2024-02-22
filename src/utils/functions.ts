import type { SimulationLink, SimulationNode } from "~/types/d3";
import type { Link } from "~/types/graph";
import { type DirectedGraph } from "~/types/graph";

const decodableLinkSeparator = ":";

export function parseLinkToLinkId(link: Link) {
  const asSimulationLink = link as SimulationLink;
  const source = asSimulationLink.source as SimulationNode;
  const target = asSimulationLink.target as SimulationNode;
  if (source.id >= 0 && target.id >= 0) {
    return [source.id, target.id, link.weight].join(decodableLinkSeparator);
  }

  return [link.source, link.target, link.weight].join(decodableLinkSeparator);
}

export function parseToPartialLinkId(source: number, target: number) {
  return [source, target].join(decodableLinkSeparator);
}

export function parseLinkIdToLink(linkId: string): Link {
  const [source, target, weight] = linkId
    .split(decodableLinkSeparator)
    .map((arg) => +arg);
  return { source, target, weight } as Link;
}

export function parseGraphToId(graph: DirectedGraph) {
  const linkIds = graph.links.map(parseLinkToLinkId);
  return linkIds.join("-");
}
