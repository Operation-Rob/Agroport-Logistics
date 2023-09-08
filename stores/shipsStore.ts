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
const shipQuantityMap: { [shipname: string]: number } = {};

// precalculate the quantity on each vessel
selectedVessels.forEach((ship: ShipFeature) => {
    const draught = ship.properties.Draught;
    const minDraught = ship.properties['Draught Min'];
    const maxDraught = ship.properties['Draught Max'];
    const actualCapacity = ship.properties['Capacity - Gt'];

    if (ship.properties['Vessel Name'] == null) {
        return;
    }

    if (draught === null || minDraught === null || maxDraught === null || actualCapacity === null) {
        return;
    }

    const result = (draught - minDraught) / (maxDraught - minDraught) * actualCapacity;

    shipQuantityMap[ship.properties['Vessel Name']] = result;
});

typedGeojsonData.features = selectedVessels.slice(0, 100);


const specificA: ShipFeature = {
    "type": "Feature",
    "properties": {
        "Flag": "Portugal",
        "Vessel Name": "NORDRHONE",
        "Destination Port": "BRISBANE",
        "Reported Eta": "2023-09-23 12:00:00",
        "Reported Destination": "BRISBANE",
        "Calculated Eta": "2023-09-24 09:00:00",
        "Current Port": null,
        "Imo": 9596040,
        "Vessel Type - Generic": "Cargo",
        "Time Of Latest Position": "2023-09-07 07:18:07",
        "Origin Port": "AL JUBAIL",
        "Max Speed": 21.4,
        "Average Speed": 9.5,
        "Draught": 10.5,
        "Draught Max": 11.0,
        "Draught Min": 4.5,
        "Load Condition": "Laden",
        "Vessel Type - Detailed": "Bulk Carrier",
        "Capacity - Gt": 23975.0,
        "Capacity - Teu": null,
        "Capacity - Liquid Gas": null,
        "Capacity - Passengers": null,
        "Launch Date": "2014-09-24",
        "Length Between Perpendiculars": 187.0,
        "Length Registered": 187.0,
        "Depth": 15.0,
        "Breadth Moulded": 28.3,
        "Capacity - Liquid Oil": null,
        "Wind Temp": 28.0,
        "Wind Angle": 102.0,
        "Wind Speed": 5.0,
        "Distance Travelled": 2994,
        "Vessel Timezone": 5.5,
        "Previous To Origin Port": "SHARJAH",
        "Previous To Origin Port Unlocode": "AESHJ",
        "Previous To Origin Port Country": "AE",
        "Previous To Origin Port Atd": "2023-08-14 15:58:00",
        "Origin Port Atd": "2023-08-26 05:54:00",
        "Origin Port Country": "SA",
        "Origin Port Unlocode": "SAJUB",
        "Destination Port Unlocode": "AUBNE",
        "Destination Port Country": "AU",
        "Rate Of Turn": 0.0,
        "Heading": 85.0,
        "Distance To Go": 4536,
        "Commercial Market": "DRY BULK",
        "Commercial Size Class": "HANDYSIZE",
        "Last Underway Timestamp": "2023-09-07 07:18:00",
        "First Ais Position Date": null,
        "Idle Time While Underway": 0.5,
        "Voyage State": "Slow Steaming",
        "product": "Urea",
        "price": 336,
        "P(Fertiliser | Origin, Destination=Australia)": 0.739418944505654
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            93.33585,
            6.075933
        ]
    }
}

// Loop through to find ships arriving at fremantle
let fremantleShips: ShipFeature[] = [];
typedGeojsonData.features.forEach((ship: ShipFeature) => {
    if (ship.properties['Destination Port'] === 'FREMANTLE') {
        fremantleShips.push(ship);

        if (fremantleShips.length > 10) {
            return;
        }
        console.log(ship.properties['Vessel Name']);
    }
});

// Add the ships to the geojson
fremantleShips.forEach((ship: ShipFeature) => {
    typedGeojsonData.features.push(ship);
});



typedGeojsonData.features.push(specificA);



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
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Destination Port'] === state.filters.destPort);
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