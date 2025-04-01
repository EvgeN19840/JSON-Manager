import { ReactNode } from "react";

export type PageKey = 'home' | 'charts'

export interface Page {
  key: PageKey;
  route: string;
  type: 'public' | 'private',
  name: string,
  icon: ReactNode
}

