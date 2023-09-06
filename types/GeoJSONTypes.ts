// types/GeoJSONTypes.ts

interface PortProperties {
    Country: string;
    Latitude: number;
    Longitude: number;
    "MOP Regional Price (usd/t)": number | "unknown";
    Manufacturer: string;
    "Port ": string;
    "Price Region": string;
    "Primary Export": string;
    "UAN Regional Price (usd/t)": number | "unknown";
    "Urea Regional Price (usd/t)": number | "unknown";
}

interface ShipProperties {
    Flag: string;
    "Vessel Name": string;
    "Destination Port": string;
    "Reported Eta": string; // or Date if you intend to parse it
    "Reported Destination": string;
    "Calculated Eta": string; // or Date if you intend to parse it
    "Current Port": string | null;
    Imo: string;
    "Vessel Type - Generic": string;
    "Time Of Latest Position": string; // or Date if you intend to parse it
    Latitude: number;
    Longitude: number;
    "Origin Port": string;
    Draught: number;
    "Draught Max": number;
    "Draught Min": number;
    "Vessel Type - Detailed": string;
    "Capacity - Gt": number;
    "Capacity - Dwt": number;
    "Launch Date": string; // or Date if you intend to parse it
    "Previous To Origin Port": string;
    "Origin Port Atd": string; // or Date if you intend to parse it
    "Origin Port Country": string;
    "Destination Port Country": string;
    "Distance To Go": number;
    "Commercial Market": string;
    Product: string;
    Company: string;
  }
  

interface Geometry {
    type: "Point";
    coordinates: [number, number]; // Longitude, Latitude
}

interface PortFeature {
    id: string;
    type: "Feature";
    properties: PortProperties;
    geometry: Geometry;
}

interface PortFeatureCollection {
    type: "FeatureCollection";
    features: PortFeature[];
}

interface ShipFeature {
    id: string;
    type: "Feature";
    properties: ShipProperties;
    geometry: Geometry;
  }
  
  interface ShipFeatureCollection {
    type: "FeatureCollection";
    features: ShipFeature[];
  }

export type { PortProperties, Geometry, PortFeature, PortFeatureCollection, ShipFeatureCollection, ShipFeature, ShipProperties };
