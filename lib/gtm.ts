// lib/gtm.ts
interface DataLayerEvent {
    event: string;
    [key: string]: string | number | boolean | undefined;
  }
  
  declare global {
    interface Window {
      dataLayer?: DataLayerEvent[];
    }
  }
  
  export const gtmEvent = (
    eventName: string,
    eventParams: Record<string, string | number | boolean | undefined> = {}
  ) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  };
  