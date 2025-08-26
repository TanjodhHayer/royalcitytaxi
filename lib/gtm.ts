// lib/gtm.ts
export const gtmEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  };
  