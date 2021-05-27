import type { Plugin } from "vite";

import visualizer from "rollup-plugin-visualizer";

import { isReportMode } from "../utils";

export default function (): Plugin | [] {
  if (isReportMode()) {
    return visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }

  return [];
}
