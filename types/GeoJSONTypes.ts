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
  Flag: string | null;
  'Vessel Name': string | null;
  'Destination Port': string | null;
  'Reported Eta': number | null;
  'Reported Destination': string | null;
  'Calculated Eta': number | null;
  'Current Port': string | null;
  Imo: number | null;
  'Vessel Type - Generic': string | null;
  'Time Of Latest Position': string | null;
  'Origin Port': string | null;
  'Max Speed': number | null;
  'Average Speed': number | null;
  Draught: number | null;
  'Draught Max': number | null;
  'Draught Min': number | null;
  'Load Condition': number | null;
  'Vessel Type - Detailed': string | null;
  'Capacity - Gt': number | null;
  'Capacity - Teu': number | null;
  'Capacity - Liquid Gas': number | null;
  'Capacity - Passengers': number | null;
  'Launch Date': number | null;
  'Length Between Perpendiculars': number | null;
  'Length Registered': number | null;
  Depth: number | null;
  'Breadth Moulded': number | null;
  'Capacity - Liquid Oil': number | null;
  'Wind Temp': number | null;
  'Wind Angle': number | null;
  'Wind Speed': number | null;
  'Distance Travelled': number | null;
  'Vessel Timezone': number | null;
  'Previous To Origin Port': string | null;
  'Previous To Origin Port Unlocode': string | null;
  'Previous To Origin Port Country': string | null;
  'Previous To Origin Port Atd': string | null;
  'Origin Port Atd': string | null;
  'Origin Port Country': string | null;
  'Origin Port Unlocode': string | null;
  'Destination Port Unlocode': string | null;
  'Destination Port Country': string | null;
  'Rate Of Turn': number | null;
  Heading: number | null;
  'Distance To Go': number | null;
  'Commercial Market': string | null;
  'Commercial Size Class': number | null;
  'Last Underway Timestamp': string | null;
  'First Ais Position Date': string | null;
  'Idle Time While Underway': number | null;
  'Voyage State': string | null;
  'product': string | null;
  'price': number | string;
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
