import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};


function exhaustiveCheck(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}


type EventMap = Record<string, unknown>;

class TypedEventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<Function>>();
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
  }
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    this.listeners.get(event)?.delete(listener);
  }
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event)?.forEach(l => l(data));
  }
}


function assertDefined<T>(val: T | null | undefined, msg = 'Value is undefined'): T {
  if (val == null) throw new Error(msg);
  return val;
}


type EventMap = Record<string, unknown>;

class TypedEventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<Function>>();
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
  }
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    this.listeners.get(event)?.delete(listener);
  }
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event)?.forEach(l => l(data));
  }
}
