export interface Geography {
  name: string;
  handle: string;
}

export interface Frequency {
  name: string;
  handle: string;
}

export interface Measurement {
  dropdown: boolean;
  baseNames?: Array<string>;
  options?: Array<{name: string, baseNames: Array<string>}>
}

export interface Smoothing {
  name: string;
  value: string;
  yoy?: boolean;
  lag?: number;
}