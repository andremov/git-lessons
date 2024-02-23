"use client";

import clsx from "clsx";
import * as d3 from "d3";
import { useMemo } from "react";
import { useRender, useDimensions } from "~/hooks";
import { parseGraphToId, parseLinkToLinkId } from "~/utils/functions";
import type { SimulationLink, SimulationNode } from "~/types/d3";
import type { DirectedGraph } from "~/types/graph";

type DirectedGraphWithWeightsProps = {
  data: DirectedGraph;
};

export function GraphView({ data }: DirectedGraphWithWeightsProps) {
  const strokeWidth = 2;
  const radius = 15;

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
  const color = d3.scaleOrdinal(
    [1, 2, 3, 4],
    [
      colors.source.fill,
      colors.default.fill,
      colors.target.fill,
      colors.disabled.fill,
    ],
  );

  const nodes = useMemo(() => {
    let toRender = data.nodes.map((node) => ({
      ...node,
      shouldRender: true,
    })) as SimulationNode[];

    toRender = toRender.map((node) => ({
      ...node,
      shouldRender: true,
    }));

    return toRender;
  }, [data.nodes]);

  const links = useMemo(() => {
    let toRender = data.links.map((link) => ({
      ...link,
      shouldRender: true,
    })) as SimulationLink[];
    toRender = toRender.map((link) => ({
      ...link,
      shouldRender: true,
    }));

    return toRender;
  }, [data.links]);

  const [wrapperRef, dimensions] = useDimensions({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { svgRef, zoomRef } = useRender({
    render(svgElem, zoomElem) {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      /* eslint-disable @typescript-eslint/no-unsafe-return */
      const height = 1200;

      const data = {
        name: "flare",
        children: [
          {
            name: "analytics",
            children: [
              {
                name: "cluster",
                children: [
                  { name: "AgglomerativeCluster", size: 3938 },
                  { name: "CommunityStructure", size: 3812 },
                  { name: "HierarchicalCluster", size: 6714 },
                  { name: "MergeEdge", size: 743 },
                ],
              },
              {
                name: "graph",
                children: [
                  { name: "BetweennessCentrality", size: 3534 },
                  { name: "LinkDistance", size: 5731 },
                  { name: "MaxFlowMinCut", size: 7840 },
                  { name: "ShortestPaths", size: 5914 },
                  { name: "SpanningTree", size: 3416 },
                ],
              },
              {
                name: "optimization",
                children: [{ name: "AspectRatioBanker", size: 7074 }],
              },
            ],
          },
          {
            name: "animate",
            children: [
              { name: "Easing", size: 17010 },
              { name: "FunctionSequence", size: 5842 },
              {
                name: "interpolate",
                children: [
                  { name: "ArrayInterpolator", size: 1983 },
                  { name: "ColorInterpolator", size: 2047 },
                  { name: "DateInterpolator", size: 1375 },
                  { name: "Interpolator", size: 8746 },
                  { name: "MatrixInterpolator", size: 2202 },
                  { name: "NumberInterpolator", size: 1382 },
                  { name: "ObjectInterpolator", size: 1629 },
                  { name: "PointInterpolator", size: 1675 },
                  { name: "RectangleInterpolator", size: 2042 },
                ],
              },
              { name: "ISchedulable", size: 1041 },
              { name: "Parallel", size: 5176 },
              { name: "Pause", size: 449 },
              { name: "Scheduler", size: 5593 },
              { name: "Sequence", size: 5534 },
              { name: "Transition", size: 9201 },
              { name: "Transitioner", size: 19975 },
              { name: "TransitionEvent", size: 1116 },
              { name: "Tween", size: 6006 },
            ],
          },
          {
            name: "data",
            children: [
              {
                name: "converters",
                children: [
                  { name: "Converters", size: 721 },
                  { name: "DelimitedTextConverter", size: 4294 },
                  { name: "GraphMLConverter", size: 9800 },
                  { name: "IDataConverter", size: 1314 },
                  { name: "JSONConverter", size: 2220 },
                ],
              },
              { name: "DataField", size: 1759 },
              { name: "DataSchema", size: 2165 },
              { name: "DataSet", size: 586 },
              { name: "DataSource", size: 3331 },
              { name: "DataTable", size: 772 },
              { name: "DataUtil", size: 3322 },
            ],
          },
          {
            name: "display",
            children: [
              { name: "DirtySprite", size: 8833 },
              { name: "LineSprite", size: 1732 },
              { name: "RectSprite", size: 3623 },
              { name: "TextSprite", size: 10066 },
            ],
          },
          { name: "flex", children: [{ name: "FlareVis", size: 4116 }] },
          {
            name: "physics",
            children: [
              { name: "DragForce", size: 1082 },
              { name: "GravityForce", size: 1336 },
              { name: "IForce", size: 319 },
              { name: "NBodyForce", size: 10498 },
              { name: "Particle", size: 2822 },
              { name: "Simulation", size: 9983 },
              { name: "Spring", size: 2213 },
              { name: "SpringForce", size: 1681 },
            ],
          },
          {
            name: "query",
            children: [
              { name: "AggregateExpression", size: 1616 },
              { name: "And", size: 1027 },
              { name: "Arithmetic", size: 3891 },
              { name: "Average", size: 891 },
              { name: "BinaryExpression", size: 2893 },
              { name: "Comparison", size: 5103 },
              { name: "CompositeExpression", size: 3677 },
              { name: "Count", size: 781 },
              { name: "DateUtil", size: 4141 },
              { name: "Distinct", size: 933 },
              { name: "Expression", size: 5130 },
              { name: "ExpressionIterator", size: 3617 },
              { name: "Fn", size: 3240 },
              { name: "If", size: 2732 },
              { name: "IsA", size: 2039 },
              { name: "Literal", size: 1214 },
              { name: "Match", size: 3748 },
              { name: "Maximum", size: 843 },
              {
                name: "methods",
                children: [
                  { name: "add", size: 593 },
                  { name: "and", size: 330 },
                  { name: "average", size: 287 },
                  { name: "count", size: 277 },
                  { name: "distinct", size: 292 },
                  { name: "div", size: 595 },
                  { name: "eq", size: 594 },
                  { name: "fn", size: 460 },
                  { name: "gt", size: 603 },
                  { name: "gte", size: 625 },
                  { name: "iff", size: 748 },
                  { name: "isa", size: 461 },
                  { name: "lt", size: 597 },
                  { name: "lte", size: 619 },
                  { name: "max", size: 283 },
                  { name: "min", size: 283 },
                  { name: "mod", size: 591 },
                  { name: "mul", size: 603 },
                  { name: "neq", size: 599 },
                  { name: "not", size: 386 },
                  { name: "or", size: 323 },
                  { name: "orderby", size: 307 },
                  { name: "range", size: 772 },
                  { name: "select", size: 296 },
                  { name: "stddev", size: 363 },
                  { name: "sub", size: 600 },
                  { name: "sum", size: 280 },
                  { name: "update", size: 307 },
                  { name: "variance", size: 335 },
                  { name: "where", size: 299 },
                  { name: "xor", size: 354 },
                  { name: "_", size: 264 },
                ],
              },
              { name: "Minimum", size: 843 },
              { name: "Not", size: 1554 },
              { name: "Or", size: 970 },
              { name: "Query", size: 13896 },
              { name: "Range", size: 1594 },
              { name: "StringUtil", size: 4130 },
              { name: "Sum", size: 791 },
              { name: "Variable", size: 1124 },
              { name: "Variance", size: 1876 },
              { name: "Xor", size: 1101 },
            ],
          },
          {
            name: "scale",
            children: [
              { name: "IScaleMap", size: 2105 },
              { name: "LinearScale", size: 1316 },
              { name: "LogScale", size: 3151 },
              { name: "OrdinalScale", size: 3770 },
              { name: "QuantileScale", size: 2435 },
              { name: "QuantitativeScale", size: 4839 },
              { name: "RootScale", size: 1756 },
              { name: "Scale", size: 4268 },
              { name: "ScaleType", size: 1821 },
              { name: "TimeScale", size: 5833 },
            ],
          },
          {
            name: "util",
            children: [
              { name: "Arrays", size: 8258 },
              { name: "Colors", size: 10001 },
              { name: "Dates", size: 8217 },
              { name: "Displays", size: 12555 },
              { name: "Filter", size: 2324 },
              { name: "Geometry", size: 10993 },
              {
                name: "heap",
                children: [
                  { name: "FibonacciHeap", size: 9354 },
                  { name: "HeapNode", size: 1233 },
                ],
              },
              { name: "IEvaluable", size: 335 },
              { name: "IPredicate", size: 383 },
              { name: "IValueProxy", size: 874 },
              {
                name: "math",
                children: [
                  { name: "DenseMatrix", size: 3165 },
                  { name: "IMatrix", size: 2815 },
                  { name: "SparseMatrix", size: 3366 },
                ],
              },
              { name: "Maths", size: 17705 },
              { name: "Orientation", size: 1486 },
              {
                name: "palette",
                children: [
                  { name: "ColorPalette", size: 6367 },
                  { name: "Palette", size: 1229 },
                  { name: "ShapePalette", size: 2059 },
                  { name: "SizePalette", size: 2291 },
                ],
              },
              { name: "Property", size: 5559 },
              { name: "Shapes", size: 19118 },
              { name: "Sort", size: 6887 },
              { name: "Stats", size: 6557 },
              { name: "Strings", size: 22026 },
            ],
          },
          {
            name: "vis",
            children: [
              {
                name: "axis",
                children: [
                  { name: "Axes", size: 1302 },
                  { name: "Axis", size: 24593 },
                  { name: "AxisGridLine", size: 652 },
                  { name: "AxisLabel", size: 636 },
                  { name: "CartesianAxes", size: 6703 },
                ],
              },
              {
                name: "controls",
                children: [
                  { name: "AnchorControl", size: 2138 },
                  { name: "ClickControl", size: 3824 },
                  { name: "Control", size: 1353 },
                  { name: "ControlList", size: 4665 },
                  { name: "DragControl", size: 2649 },
                  { name: "ExpandControl", size: 2832 },
                  { name: "HoverControl", size: 4896 },
                  { name: "IControl", size: 763 },
                  { name: "PanZoomControl", size: 5222 },
                  { name: "SelectionControl", size: 7862 },
                  { name: "TooltipControl", size: 8435 },
                ],
              },
              {
                name: "data",
                children: [
                  { name: "Data", size: 20544 },
                  { name: "DataList", size: 19788 },
                  { name: "DataSprite", size: 10349 },
                  { name: "EdgeSprite", size: 3301 },
                  { name: "NodeSprite", size: 19382 },
                  {
                    name: "render",
                    children: [
                      { name: "ArrowType", size: 698 },
                      { name: "EdgeRenderer", size: 5569 },
                      { name: "IRenderer", size: 353 },
                      { name: "ShapeRenderer", size: 2247 },
                    ],
                  },
                  { name: "ScaleBinding", size: 11275 },
                  { name: "Tree", size: 7147 },
                  { name: "TreeBuilder", size: 9930 },
                ],
              },
              {
                name: "events",
                children: [
                  { name: "DataEvent", size: 2313 },
                  { name: "SelectionEvent", size: 1880 },
                  { name: "TooltipEvent", size: 1701 },
                  { name: "VisualizationEvent", size: 1117 },
                ],
              },
              {
                name: "legend",
                children: [
                  { name: "Legend", size: 20859 },
                  { name: "LegendItem", size: 4614 },
                  { name: "LegendRange", size: 10530 },
                ],
              },
              {
                name: "operator",
                children: [
                  {
                    name: "distortion",
                    children: [
                      { name: "BifocalDistortion", size: 4461 },
                      { name: "Distortion", size: 6314 },
                      { name: "FisheyeDistortion", size: 3444 },
                    ],
                  },
                  {
                    name: "encoder",
                    children: [
                      { name: "ColorEncoder", size: 3179 },
                      { name: "Encoder", size: 4060 },
                      { name: "PropertyEncoder", size: 4138 },
                      { name: "ShapeEncoder", size: 1690 },
                      { name: "SizeEncoder", size: 1830 },
                    ],
                  },
                  {
                    name: "filter",
                    children: [
                      { name: "FisheyeTreeFilter", size: 5219 },
                      { name: "GraphDistanceFilter", size: 3165 },
                      { name: "VisibilityFilter", size: 3509 },
                    ],
                  },
                  { name: "IOperator", size: 1286 },
                  {
                    name: "label",
                    children: [
                      { name: "Labeler", size: 9956 },
                      { name: "RadialLabeler", size: 3899 },
                      { name: "StackedAreaLabeler", size: 3202 },
                    ],
                  },
                  {
                    name: "layout",
                    children: [
                      { name: "AxisLayout", size: 6725 },
                      { name: "BundledEdgeRouter", size: 3727 },
                      { name: "CircleLayout", size: 9317 },
                      { name: "CirclePackingLayout", size: 12003 },
                      { name: "DendrogramLayout", size: 4853 },
                      { name: "ForceDirectedLayout", size: 8411 },
                      { name: "IcicleTreeLayout", size: 4864 },
                      { name: "IndentedTreeLayout", size: 3174 },
                      { name: "Layout", size: 7881 },
                      { name: "NodeLinkTreeLayout", size: 12870 },
                      { name: "PieLayout", size: 2728 },
                      { name: "RadialTreeLayout", size: 12348 },
                      { name: "RandomLayout", size: 870 },
                      { name: "StackedAreaLayout", size: 9121 },
                      { name: "TreeMapLayout", size: 9191 },
                    ],
                  },
                  { name: "Operator", size: 2490 },
                  { name: "OperatorList", size: 5248 },
                  { name: "OperatorSequence", size: 4190 },
                  { name: "OperatorSwitch", size: 2581 },
                  { name: "SortOperator", size: 2023 },
                ],
              },
              { name: "Visualization", size: 16540 },
            ],
          },
        ],
      };

      // Compute the tree height; this approach will allow the height of the
      // SVG to scale according to the breadth (width) of the tree layout.
      const root = d3.hierarchy(data);
      const dx = 10;
      const dy = height / (root.height + 1);

      // Create a tree layout.
      const tree = d3.tree().nodeSize([dx, dy]);

      // Sort the tree and apply the layout.
      root.sort((a, b) => d3.ascending(a.data.name, b.data.name));

      // @ts-expect-error asd
      tree(root);

      // Compute the extent of the tree. Note that x and y are swapped here
      // because in the tree layout, x is the breadth, but when displayed, the
      // tree extends right rather than down.
      let y0 = Infinity;
      let y1 = -y0;
      root.each((d) => {
        // @ts-expect-error asd
        if (d.y > y1) {
          // @ts-expect-error asd
          y1 = d.y;
        }
        // @ts-expect-error asd
        if (d.y < y0) {
          // @ts-expect-error asd
          y0 = d.y;
        }
      });

      // Compute the adjusted height of the tree.
      const width = y1 - y0 + dy * 2;

      zoomElem
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-dx / 3, y0 - dy, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      const link = zoomElem
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr(
          "d",
          d3
            // @ts-expect-error asd
            .linkVertical()
            // @ts-expect-error asd
            .x((d) => d.x)
            // @ts-expect-error asd
            .y((d) => d.y),
        );

      const node = zoomElem
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      node
        .append("circle")
        .attr("fill", (d) => (d.children ? "#555" : "#999"))
        .attr("r", 2.5);

      node
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d.children ? -6 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        .text((d) => d.data.name)
        .clone(true)
        .lower()
        .attr("stroke", "white");

      /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      /* eslint-enable @typescript-eslint/no-unsafe-return */

      // const inputGraph = {
      //   name: data.nodes[0]?.id,
      //   children: data.nodes[0]?.outgoing,
      // };

      // const baseGraph = {
      //   name: "root",
      //   children: [{ name: "child #1" }],
      // };

      /*
      const simulation = d3.hierarchy(inputGraph);
      // .forceSimulation(nodes)
      // .force("link", d3.forceLink(links).distance(150))
      // .force("collide", d3.forceCollide().radius(radius * 2))
      // .force("charge", d3.forceManyBody().strength(-(radius * 2 - 1)))
      // .force(
      //   "center",
      //   d3.forceCenter(dimensions.width / 2, dimensions.height / 2),
      // );

      const node = svg
        .selectAll<SVGCircleElement, SimulationNode>("circle")
        .data(nodes);
      // .on("mouseover", function onMouseOver(_event, node) {
      //   const scaled = radius * 1.2;
      //   const noInEdges = node.incoming.length === 0;
      //   const noOutEdges = node.outgoing.length === 0;

      //   const sourceEdgeClass = noInEdges
      //     ? colors.source.stroke
      //     : colors.target.stroke;

      //   const sourceMarkerClass = noInEdges
      //     ? colors.source.fill
      //     : colors.target.fill;

      //   const targetEdgeClass = noOutEdges
      //     ? colors.target.stroke
      //     : colors.source.stroke;

      //   const targetMarkerClass = noOutEdges
      //     ? colors.target.fill
      //     : colors.source.fill;

      //   d3.select(this)
      //     .classed(colors.source.fill, noInEdges)
      //     .classed(colors.target.fill, noOutEdges)
      //     .classed(colors.default.fill, !noInEdges && !noOutEdges)
      //     .classed(colors.highlight.node.fill, false)
      //     .transition()
      //     .duration(300)
      //     .attr("r", scaled);

      //   svg
      //     .selectAll(`.link-source-${node.id}`)
      //     .classed(sourceEdgeClass, true);

      //   svg
      //     .selectAll(`.link-source-${node.id}-marker`)
      //     .classed(sourceMarkerClass, true);

      //   svg
      //     .selectAll(`.link-target-${node.id}`)
      //     .classed(targetEdgeClass, true);

      //   svg
      //     .selectAll(`.link-target-${node.id}-marker`)
      //     .classed(targetMarkerClass, true);

      //   svg
      //     .selectAll(".hide-render-link")
      //     .classed(sourceEdgeClass, false)
      //     .classed(targetEdgeClass, false);

      //   svg
      //     .selectAll(".hide-render-link-marker")
      //     .classed(sourceMarkerClass, false)
      //     .classed(targetMarkerClass, false);
      // });
      // .on("mouseout", function onMouseOut(_event, node) {
      //   const noInEdges = node.incoming.length === 0;
      //   const noOutEdges = node.outgoing.length === 0;
      //   const sourceEdgeClass = noInEdges
      //     ? colors.source.stroke
      //     : colors.target.stroke;
      //   const sourceMarkerClass = noInEdges
      //     ? colors.source.fill
      //     : colors.target.fill;
      //   const targetEdgeClass = noOutEdges
      //     ? colors.target.stroke
      //     : colors.source.stroke;
      //   const targetMarkerClass = noOutEdges
      //     ? colors.target.fill
      //     : colors.source.fill;

      //   d3.select(this)
      //     .classed(colors.source.fill, noInEdges && !node.isSelected)
      //     .classed(colors.target.fill, noOutEdges && !node.isSelected)
      //     .classed(
      //       colors.default.fill,
      //       !noInEdges && !noInEdges && !node.isSelected,
      //     )
      //     .classed(colors.highlight.node.fill, node.isSelected)
      //     .transition()
      //     .duration(300)
      //     .attr("r", radius);
      //   svg
      //     .selectAll(`.link-source-${node.id}`)
      //     .classed(sourceEdgeClass, false);
      //   svg
      //     .selectAll(`.link-source-${node.id}-marker`)
      //     .classed(sourceMarkerClass, false);
      //   svg
      //     .selectAll(`.link-target-${node.id}`)
      //     .classed(targetEdgeClass, false);
      //   svg
      //     .selectAll(`.link-target-${node.id}-marker`)
      //     .classed(targetMarkerClass, false);
      // })
      // .on("click", function onClick(_event, node) {
      //   node.isSelected = !node.isSelected;
      //   const noInEdges = node.incoming.length === 0;
      //   const noOutEdges = node.outgoing.length === 0;

      //   d3.select(this)
      //     .classed(colors.source.fill, noInEdges && !node.isSelected)
      //     .classed(colors.target.fill, noOutEdges && !node.isSelected)
      //     .classed(
      //       colors.default.fill,
      //       !noInEdges && !noInEdges && !node.isSelected,
      //     )
      //     .classed(colors.highlight.node.fill, node.isSelected);
      //   svg
      //     .selectAll(`.link-source-${node.id}`)
      //     .classed(colors.default.stroke, !node.isSelected)
      //     .classed(colors.highlight.edge.stroke, node.isSelected);
      //   svg
      //     .selectAll(`.link-source-${node.id}-marker`)
      //     .classed(colors.default.fill, !node.isSelected)
      //     .classed(colors.highlight.edge.fill, node.isSelected);
      //   svg
      //     .selectAll(".hide-render-link")
      //     .classed(colors.highlight.edge.stroke, false);
      //   svg
      //     .selectAll(".hide-render-link-marker")
      //     .classed(colors.highlight.edge.fill, false);
      // });

      const nodeId = svg
        .select("#nodes")
        .selectAll<SVGCircleElement, SimulationNode>("text")
        .data(nodes);

      const link = svg
        .selectAll<SVGLineElement, SimulationLink>(".link")
        .data(links);

      const linkWeightBackground = svg
        .select("#links")
        .selectAll<SVGRectElement, SimulationNode>("rect")
        .data(links);

      const linkWeight = svg
        .select("#links")
        .selectAll<SVGTextElement, SimulationNode>("text")
        .data(links);

      // function onTick() {
      //   // The source property comes from the SimulationLinkDatum interface, and by default,
      //   // has a type of TypeOfNode | string | number, where TypeOfNode is SimulationNode, so we
      //   // need to make an `as assertion`. The x,y properties added by the SimulationNodeDatum
      //   // interface are of type number | undefined, so a non-null assertion operator is used

      //   const getX = (value: unknown) => (value as SimulationNode).x!;
      //   const getY = (value: unknown) => (value as SimulationNode).y!;
      //   const getMiddleX = (link: SimulationLink) =>
      //     (getX(link.source) + getX(link.target)) / 2;
      //   const getMiddleY = (link: SimulationLink) =>
      //     (getY(link.source) + getY(link.target)) / 2;
      //   const getLinkTextBB = (link: SimulationLink) => {
      //     const textId = parseLinkToLinkId(link) + "-text";
      //     const text = document.getElementById(textId);
      //     if (!text) return undefined;

      //     const textSvg = text as unknown as SVGGraphicsElement;
      //     return textSvg.getBBox();
      //   };

      //   node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      //   nodeId.attr("x", (d) => d.x!).attr("y", (d) => d.y! + 6);

      //   link.attr("d", (link) => {
      //     const diffX = getX(link.target) - getX(link.source);
      //     const diffY = getY(link.target) - getY(link.source);

      //     // Length of path from center of source node to center of target node
      //     const pathLength = Math.sqrt(diffX * diffX + diffY * diffY);
      //     const arrowOffset = 8;

      //     // x and y distances from center to outside edge of target node
      //     const nodeRadius = radius + arrowOffset + strokeWidth / 2;
      //     const offsetX = (diffX * nodeRadius) / pathLength;
      //     const offsetY = (diffY * nodeRadius) / pathLength;

      //     const startingPoint = `${getX(link.source) + offsetX},${getY(link.source) + offsetY}`;
      //     const endingPoint = `${getX(link.target) - offsetX},${getY(link.target) - offsetY}`;

      //     const toDraw = `M ${startingPoint} L${endingPoint}`;

      //     return toDraw;
      //   });

      //   linkWeight
      //     .attr("x", getMiddleX)
      //     .attr("y", (link) => getMiddleY(link) + 4);

      //   linkWeightBackground.each(function (link) {
      //     const boundingBox = getLinkTextBB(link);

      //     if (!boundingBox) return;

      //     d3.select(this)
      //       .attr("x", boundingBox.x - 4)
      //       .attr("y", boundingBox.y - 4)
      //       .attr("width", boundingBox.width + 8)
      //       .attr("height", boundingBox.height + 8);
      //   });
      // }

      // simulation.on("tick", onTick);

      // function onDragStart(
      //   event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>,
      // ) {
      //   if (!event.active) simulation.alphaTarget(0.3).restart();
      //   event.subject.fx = event.subject.x;
      //   event.subject.fy = event.subject.y;
      // }

      // function onDrag(
      //   event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>,
      // ) {
      //   event.subject.fx = event.x;
      //   event.subject.fy = event.y;
      // }

      // function onDragEnd(
      //   event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>,
      // ) {
      //   if (!event.active) simulation.alphaTarget(0);
      //   event.subject.fx = event.subject.x;
      //   event.subject.fy = event.subject.y;
      //   simulation.stop();
      // }

      // node.call(
      //   d3
      //     .drag<SVGCircleElement, SimulationNode>()
      //     .on("start", onDragStart)
      //     .on("drag", onDrag)
      //     .on("end", onDragEnd),
      // );
      */
    },
    onZoom: (svg, g) => {
      // fixes zooming on Mozilla Firefox.
      if (navigator.userAgent.indexOf("Firefox") !== -1)
        g.style("transform-origin", "50% 50% 0");

      const onZoom = ({
        transform,
      }: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", transform.toString());
      };

      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
          [0, 0],
          [dimensions.width, dimensions.height],
        ])
        .scaleExtent([0.5, 10])
        .on("zoom", onZoom);
      svg.call(zoomHandler);
    },
    renderDependencies: [graphId],
    zoomDependencies: [dimensions.height, dimensions.width],
  });

  const labelIncrement = Number(data.startsAt1);

  return (
    <div ref={wrapperRef} className="h-screen w-screen ">
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
          {data.description}
        </text>
        <text
          x="16"
          y="97.5%"
          className="fill-slate-500 stroke-1 text-xs"
          pointerEvents="none"
        >
          {`${dimensions.width}px x ${dimensions.height}px`}
        </text>
        <g ref={zoomRef}>
          {/* <g id="links">
            {links.map((link) => {
              const linkId = parseLinkToLinkId(link);
              return (
                <g
                  key={linkId}
                  className={clsx({
                    "pointer-events-none opacity-10": !link.shouldRender,
                  })}
                >
                  <defs>
                    <marker
                      id={`link-arrow-from-${link.source}-to-${link.target}`}
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
                          `link-source-${link.source}-marker link-target-${link.target}-marker`,
                          {
                            "hide-render-link-marker": !link.shouldRender,
                          },
                        )}
                      />
                    </marker>
                  </defs>
                  <path
                    className={clsx(
                      colors.default.stroke,
                      "link transition-[stroke] duration-300",
                      `link-source-${link.source} link-target-${link.target}`,
                      {
                        "hide-render-link": !link.shouldRender,
                      },
                    )}
                    strokeWidth={3}
                    markerEnd={`url(#link-arrow-from-${link.source}-to-${link.target})`}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>
          <g id="nodes" strokeWidth={strokeWidth}>
            {nodes.map((node, index) => (
              <g
                key={node.id}
                className={clsx({
                  "pointer-events-none opacity-10": !node.shouldRender,
                  "stroke-white": node.shouldRender,
                })}
              >
                <circle
                  key={node.id}
                  r={radius}
                  className={clsx(
                    "cursor-pointer",
                    color(node.shouldRender ? 2 : 4),
                  )}
                  cx={node.x}
                  cy={node.y}
                />
                <text
                  textAnchor="middle"
                  className="fill-slate-50 stroke-none"
                  pointerEvents="none"
                >
                  {node.id + labelIncrement}
                </text>
              </g>
            ))}
          </g> */}
        </g>
      </svg>
    </div>
  );
}
