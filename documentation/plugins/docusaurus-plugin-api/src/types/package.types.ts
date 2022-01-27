import { PluginOptions as DocsPluginOptions } from "@docusaurus/plugin-content-docs/lib/types";

export type PluginOptions = {
  id: string;
  docs: DocsPluginOptions;
  packages: PackageOption[];
  texts?: TextsOptions;
};

export type PackageOption = {
  title: string;
  dir: string;
  entryPath: string;
  logo?: string;
  description?: string;
  tsconfigName?: string;
  tsconfigDir?: string;
  readmeName?: string;
  readmeDir?: string;
};

export type TextsOptions = {
  monorepoTitle?: string;
  monorepoDescription?: string;
  reference?: string;
  methods?: string;
  parameters?: string;
  typeDefinitions?: string;
  example?: string;
  additionalLinks?: string;
  import?: string;
  paramTableHeaders: [string, string, string, string];
};
