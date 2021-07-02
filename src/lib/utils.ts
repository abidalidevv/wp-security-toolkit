import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


function exhaustiveCheck(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}
