"use client";

import clsx from "clsx";
import * as d3 from "d3";
import { useMemo } from "react";
import { useRender, useDimensions } from "~/hooks";
import { parseGraphToId, parseLinkToLinkId } from "~/utils/functions";
import type { SimulationLink, SimulationNode } from "~/types/d3";
import type { HierarchyGraph, HierarchyGraphNode } from "~/types/graph";

type DirectedGraphWithWeightsProps = {
  data: HierarchyGraph;
  description: string;
};

function getPathForLink(link: SimulationLink): string {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-return */

  const callback = d3
    .linkVertical()
    .x((d) => d.x)
    .y((d) => d.y)
    // @ts-expect-error This exists, I promise.
    .source(() => link.source)
    // @ts-expect-error This exists, I promise.
    .target(() => link.target);

  // @ts-expect-error This exists, I promise.
  return callback();

  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-return */
}

export function GraphView({
  data,
  description,
}: DirectedGraphWithWeightsProps) {
  const strokeWidth = 2;
  const radius = 15;
  const dx = 100;
  const dy = 100;

  const colors = {
    source: { fill: "!fill-sky-500", stroke: "!stroke-sky-500" },
    target: { fill: "!fill-green-500", stroke: "!stroke-green-500" },
    default: { fill: "fill-slate-800", stroke: "stroke-slate-800" },
    disabled: { fill: "fill-slate-700", stroke: "stroke-slate-700" },
    highlight: {
      node: { fill: "fill-amber-600" },
      edge: { fill: "fill-amber-800", stroke: "stroke-amber-800" },
    },
  };

  const graphId = parseGraphToId(data);

  const [wrapperRef, dimensions] = useDimensions({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const root = useMemo(() => {
    const root = d3.hierarchy(data);

    // Sort the tree
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));

    // Create a tree layout
    const tree = d3.tree<SimulationNode>().nodeSize([dx, dy]);

    // Apply the layout
    tree(root);

    return root;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphId]);

  // const [width, height, viewBox] = useMemo(() => {
  //   const height = dimensions.height;

  //   let y0 = Infinity;
  //   let y1 = -y0;

  //   root.each((d: unknown) => {
  //     const parsedNode = d as { y: number };
  //     if (!parsedNode.y) return;

  //     if (parsedNode.y > y1) {
  //       y1 = parsedNode.y;
  //     }
  //     if (parsedNode.y < y0) {
  //       y0 = parsedNode.y;
  //     }
  //   });

  //   // Compute the adjusted height of the tree.
  //   const width = y1 - y0 + dy * 2;

  //   return [
  //     width,
  //     height,
  //     `${[-dx / 3, y0 - 2 * dy, width, height].toString()}`,
  //   ];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [graphId]);

  const links = useMemo(() => {
    return root.links() as unknown[] as SimulationLink[];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphId]);

  const nodes = useMemo(() => {
    return root.descendants() as unknown[] as SimulationNode[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphId]);

  const color = [
    colors.source.fill,
    colors.default.fill,
    colors.target.fill,
    colors.disabled.fill,
  ];

  const { svgRef, zoomRef } = useRender({
    render(svgElem) {
      const link = svgElem
        .selectAll<SVGLineElement, SimulationLink>(".link")
        .data(links);

      // const link = svgElem
      // .append("g")
      // .attr("fill", "none")
      // .attr("stroke", "#555")
      // .attr("stroke-opacity", 0.4)
      // .attr("stroke-width", 1.5)
      // .selectAll()
      // .data(root.links())
      // .join("path")
      // .attr(
      //   "d",
      //   d3
      //     // @ts-expect-error asd
      //     .linkVertical()
      //     // @ts-expect-error asd
      //     .x((d) => d.x)
      //     // @ts-expect-error asd
      //     .y((d) => d.y),
      // );

      const node = svgElem
        .select("#nodes")
        .selectAll<SVGCircleElement, SimulationNode>("text")
        .data(nodes);

      // const node = svgElem
      //   .append("g")
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-width", 3)
      //   .selectAll()
      //   .data(root.descendants())
      //   .join("g")
      //   .attr("transform", (d) => `translate(${d.x},${d.y})`);

      // node
      //   .append("text")
      //   .attr("dy", "0.31em")
      //   .attr("x", (d) => (d.children ? -6 : 6))
      //   .attr("text-anchor", "middle")
      //   .text((d) => d.data.name)
      //   .clone(true)
      //   .lower()
      //   .attr("stroke", "white");

      // node
      //   .append("circle")
      //   .attr("fill", (d) =>
      //     d.children ? colors.target.fill : colors.default.fill,
      //   )
      //   .attr("r", 10);
    },
    onZoom: (svg, g) => {
      // fixes zooming on Mozilla Firefox.
      if (navigator.userAgent.indexOf("Firefox") !== -1)
        g.style("transform-origin", "50% 50% 0");

      const onZoom = ({
        transform,
      }: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        // g.attr("transform", transform.toString());
      };

      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
          [0, 0],
          [dimensions.width, dimensions.height],
        ])
        .scaleExtent([1, 1])
        .on("zoom", onZoom);

      svg.call(zoomHandler);
    },
    renderDependencies: [graphId],
    zoomDependencies: [dimensions.height, dimensions.width],
  });

  return (
    <div ref={wrapperRef} className="h-screen w-screen select-none">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <text
          x="16"
          y="95%"
          className="fill-slate-500 stroke-1 text-xs"
          pointerEvents="none"
        >
          {description}
        </text>
        <text
          x="16"
          y="97.5%"
          className="fill-slate-500 stroke-1 text-xs"
          pointerEvents="none"
        >
          {`${dimensions.width}px x ${dimensions.height}px`}
        </text>
        <g
          ref={zoomRef}
          transform={`translate(${dimensions.width / 2},${100}) scale(1.4)`}
        >
          <g id="links">
            {links.map((link) => {
              const linkId = parseLinkToLinkId(link);
              return (
                <g
                  key={linkId}
                  className={clsx({
                    "pointer-events-none opacity-10": false, //!link.shouldRender,
                  })}
                >
                  <defs>
                    <marker
                      id={`link-arrow-[${linkId}]`}
                      markerWidth="5"
                      markerHeight="5"
                      refX="7"
                      refY="5"
                      orient="auto"
                      markerUnits="strokeWidth"
                      viewBox="0 0 10 10"
                    >
                      <path
                        d="M0,0L0,10L10,5"
                        className={clsx(
                          colors.default.fill,
                          "transition-[fill] duration-300",
                          // `link-source-${link.source}-marker link-target-${link.target}-marker`,
                          {
                            "hide-render-link-marker": true, //!link.shouldRender,
                          },
                        )}
                      />
                    </marker>
                  </defs>
                  <path
                    className={clsx(
                      colors.source.stroke,
                      "fill-none",
                      "link transition-[stroke] duration-300",
                      // `link-source-${link.source} link-target-${link.target}`,
                      {
                        "hide-render-link": true, //!link.shouldRender,
                      },
                    )}
                    strokeWidth={3}
                    markerEnd={`url(#link-arrow-[${linkId}])`}
                    strokeLinecap="round"
                    d={getPathForLink(link)}
                  />
                </g>
              );
            })}
          </g>
          <g id="nodes" strokeWidth={strokeWidth}>
            {nodes.map((node, index) => (
              <g
                key={node.data.name}
                className={clsx({
                  "pointer-events-none opacity-10": !node.data.shouldRender,
                  "stroke-white": node.data.shouldRender,
                })}
              >
                <circle
                  key={node.data.name}
                  r={radius}
                  className={clsx(
                    "cursor-pointer",
                    color[node.data.shouldRender ? 1 : 3],
                  )}
                  cx={node.x}
                  cy={node.y}
                />
                <text
                  textAnchor="middle"
                  className="fill-slate-50 stroke-none text-sm"
                  pointerEvents="none"
                  x={node.x}
                  y={node.y + 5}
                >
                  {node.data.name}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
