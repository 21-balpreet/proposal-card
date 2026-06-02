/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeType = 'pink' | 'lavender' | 'peach' | 'mint' | 'galaxy' | 'dark';

export interface ProposalConfig {
  from: string;
  to: string;
  theme: ThemeType;
  customMessage?: string;
  musicUrl?: string;
}

export type IllustrationState =
  | 'waiting'
  | 'confused'
  | 'sad'
  | 'heartbroken'
  | 'crying'
  | 'celebrating';

export interface DatePlan {
  date: string;
  activity: string;
  food: string;
  extraNote: string;
}
