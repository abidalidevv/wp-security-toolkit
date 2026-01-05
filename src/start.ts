import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));


function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(k => delete result[k]);
  return result as Omit<T, K>;
}


type KeyOf<T> = keyof T;
type ValueOf<T> = T[keyof T];
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];


const createStore = <T extends object>(initialState: T) => {
  let state = { ...initialState };
  const subscribers = new Set<(state: T) => void>();
  return {
    getState: () => state,
    setState: (partial: Partial<T>) => {
      state = { ...state, ...partial };
      subscribers.forEach(fn => fn(state));
    },
    subscribe: (fn: (state: T) => void) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
  };
};


type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};


const createStore = <T extends object>(initialState: T) => {
  let state = { ...initialState };
  const subscribers = new Set<(state: T) => void>();
  return {
    getState: () => state,
    setState: (partial: Partial<T>) => {
      state = { ...state, ...partial };
      subscribers.forEach(fn => fn(state));
    },
    subscribe: (fn: (state: T) => void) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
  };
};
