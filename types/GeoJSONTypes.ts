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

export type { PortProperties, Geometry, PortFeature, PortFeatureCollection };
