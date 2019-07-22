import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };


import { useReducer, Dispatch } from 'react';

type Action<T> =
  | { type: 'SET'; payload: T }
  | { type: 'RESET' }
  | { type: 'MERGE'; payload: Partial<T> };

function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case 'SET':   return action.payload;
    case 'RESET': return state;
    case 'MERGE': return { ...state, ...action.payload };
    default:      return state;
  }
}

export function useStateReducer<T>(initial: T): [T, Dispatch<Action<T>>] {
  return useReducer(reducer<T>, initial);
}
