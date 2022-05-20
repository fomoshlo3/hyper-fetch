/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SidebarsConfig, Sidebars, SidebarProcessorParams } from './types';
import type { PluginOptions } from '@docusaurus/plugin-content-docs';
export declare const DefaultSidebars: SidebarsConfig;
export declare const DisabledSidebars: SidebarsConfig;
export declare function resolveSidebarPathOption(siteDir: string, sidebarPathOption: PluginOptions['sidebarPath']): PluginOptions['sidebarPath'];
export declare function loadSidebarsFileUnsafe(sidebarFilePath: string | false | undefined): Promise<SidebarsConfig>;
export declare function loadSidebars(sidebarFilePath: string | false | undefined, options: SidebarProcessorParams): Promise<Sidebars>;
