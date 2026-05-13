import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

interface RevealAPI {
  step: number;          // current revealed step (0 = only base)
  total: number;         // total registered build steps
  registerTotal: (n: number) => void;
  next: () => boolean;   // true if a build was advanced (consumed key)
  prev: () => boolean;   // true if a build was reversed
  reset: () => void;
}

const RevealContext = createContext<RevealAPI | null>(null);

// Module-level controller so non-React code (keyboard handler) can call into the active provider.
let controllerRef: { next: () => boolean; prev: () => boolean; reset: () => void } = {
  next: () => false,
  prev: () => false,
  reset: () => {},
};

export const tryRevealNext = () => controllerRef.next();
export const tryRevealPrev = () => controllerRef.prev();
export const resetReveals = () => controllerRef.reset();

interface ProviderProps {
  slideId: string;
  children: ReactNode;
}

export const RevealProvider = ({ slideId, children }: ProviderProps) => {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const stepRef = useRef(0);
  const totalRef = useRef(0);

  useEffect(() => { stepRef.current = step; }, [step]);
  useEffect(() => { totalRef.current = total; }, [total]);

  // Reset on slide change
  useEffect(() => {
    setStep(0);
    setTotal(0);
    stepRef.current = 0;
    totalRef.current = 0;
  }, [slideId]);

  const registerTotal = useCallback((n: number) => {
    setTotal((prev) => (n > prev ? n : prev));
  }, []);

  const next = useCallback(() => {
    if (stepRef.current < totalRef.current) {
      stepRef.current += 1;
      setStep(stepRef.current);
      return true;
    }
    return false;
  }, []);

  const prev = useCallback(() => {
    if (stepRef.current > 0) {
      stepRef.current -= 1;
      setStep(stepRef.current);
      return true;
    }
    return false;
  }, []);

  const reset = useCallback(() => {
    stepRef.current = 0;
    setStep(0);
  }, []);

  // Wire module controller to this provider while mounted
  useEffect(() => {
    controllerRef = { next, prev, reset };
    return () => {
      controllerRef = { next: () => false, prev: () => false, reset: () => {} };
    };
  }, [next, prev, reset]);

  const value = useMemo(
    () => ({ step, total, registerTotal, next, prev, reset }),
    [step, total, registerTotal, next, prev, reset]
  );

  return <RevealContext.Provider value={value}>{children}</RevealContext.Provider>;
};

export const useReveal = () => {
  const ctx = useContext(RevealContext);
  if (!ctx) {
    // Safe fallback when used outside provider (e.g. participant view)
    return { step: 99, total: 0, registerTotal: () => {}, next: () => false, prev: () => false, reset: () => {} } as RevealAPI;
  }
  return ctx;
};

/** Slides call this once to declare how many build steps they have. */
export const useRegisterReveals = (n: number) => {
  const { registerTotal } = useReveal();
  useEffect(() => {
    registerTotal(n);
  }, [n, registerTotal]);
};

interface RevealProps {
  step: number;            // 1-indexed build step at which this should appear
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/** Wrap content that should appear on a given build step. Hidden (invisible but space-preserving) until revealed. */
export const Reveal = ({ step, children, className = "", as: Tag = "div" }: RevealProps) => {
  const { step: current } = useReveal();
  const visible = current >= step;
  return (
    <Tag
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"} ${className}`}
      aria-hidden={!visible}
    >
      {children}
    </Tag>
  );
};
