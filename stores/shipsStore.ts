import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;


// Create a map where the key is the "Origin Port" and the value is an array of vessels from that port
const portVesselMap: { [originPort: string]: ShipFeature[] } = {};

typedGeojsonData.features.forEach(feature => {
    const originPort = feature.properties['Origin Port'];
    if (originPort !== null) {
        if (!portVesselMap[originPort]) {
            portVesselMap[originPort] = [];
        }
        portVesselMap[originPort].push(feature);
    }
});

// Select one vessel from each port
const selectedVessels: ShipFeature[] = [];

for (const originPort in portVesselMap) {
    const vessels = portVesselMap[originPort];
    const randomVessel = vessels[Math.floor(Math.random() * vessels.length)];

    if ((randomVessel.properties['Vessel Type - Detailed'] != 'Oil/Chemical Tanker') &&
        (randomVessel.properties['Vessel Type - Detailed'] != 'Bulk Carrier')) {
        randomVessel.properties['P(Fertiliser | Origin, Destination=Australia)'] = 0;
    }

    selectedVessels.push(randomVessel);
}

// ship-to-quantity dictionary
const shipQuantityMap: { [shipId: string]: number } = {};

// precalculate the quantity on each vessel
selectedVessels.forEach((ship: ShipFeature) => {
    const draught = ship.properties.Draught;
    const minDraught = ship.properties['Draught Min'];
    const maxDraught = ship.properties['Draught Max'];
    const actualCapacity = ship.properties['Capacity - Gt'];

    if (draught === null || minDraught === null || maxDraught === null || actualCapacity === null) {
        return;
    }

    const result = (draught - minDraught) / (maxDraught - minDraught) * actualCapacity;

    shipQuantityMap[ship.id] = result;
});





typedGeojsonData.features = selectedVessels.slice(0, 400);

export interface shipFilters {
    product: string | null;
    origin: string | null;
    dest: string | null;
    destPort: string | null;
    vesselType: string | null;
}

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: shipFilters, changed_signal: boolean } => ({
        ships: typedGeojsonData,
        filters: {
            product: null,
            origin: null,
            dest: null,
            destPort: null,
            vesselType: null
        },
        changed_signal: false,
    }),
    getters: {
        filteredShips(state): ShipFeature[] {
            // Filter the ships based on the filters
            let filteredShips = state.ships.features;

            if (state.filters.product) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['product'] === state.filters.product);
            }

            if (state.filters.origin) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Origin Port Country'] === state.filters.origin);
            }

            if (state.filters.dest) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Destination Port Country'] === state.filters.dest);
            }

            if (state.filters.destPort) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Destination Port'] === state.filters.dest);
            }

            if (state.filters.vesselType) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Vessel Type - Detailed'] === state.filters.vesselType);
            }

            return filteredShips;
        },
    },
    actions: {
        setFilters(key: keyof shipFilters, value: string | null) {
            // Check for a valid key to avoid runtime errors
            if (key in this.filters) {
                this.filters[key] = value;
                this.changed_signal = !this.changed_signal;
            } else {
                console.error(`Invalid key: ${key}`);
            }
        },
        cumSumQty(date: Date): number {
            let cumSum = 0;
            this.filteredShips.forEach((ship: ShipFeature) => {
                if (ship.properties['Calculated Eta'] === null) {
                    return;
                }

                const shipDate = new Date(ship.properties['Calculated Eta']);
                if (shipDate <= date) {
                    cumSum += shipQuantityMap[ship.id];
                }
            });
            return cumSum;
        }
    }
});