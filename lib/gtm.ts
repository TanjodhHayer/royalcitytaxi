// lib/gtm.ts
interface DataLayerEvent {
    event: string;
    [key: string]: any;
  }
  
  declare global {
    interface Window {
      dataLayer?: DataLayerEvent[];
    }
  }
  
  export const gtmEvent = (eventName: string, eventParams: Record<string, unknown> = {}) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  };
  