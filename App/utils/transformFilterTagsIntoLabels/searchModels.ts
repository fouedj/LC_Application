import {
  exhaustiveFinancingTypes,
  goodDealLabel,
  labelByCategory,
  labelByCustomerFamily,
  labelByEnergy,
  labelByEquipmentLevel,
  labelByExternalColor,
  labelByFinancingType,
  labelByGearbox,
  labelByInternalColor,
  labelByRegion,
  labelBySortOption,
  shortLabelByVertical,
} from './labels';
import {familiesByVertical} from './serviceSearchModels';

export type Vertical =
  | 'car'
  | 'carTruck'
  | 'truck'
  | 'moto'
  | 'scooter'
  | 'quad';
export type CategoriesKeys = keyof typeof labelByCategory;
export type CustomerFamilyCodes = keyof typeof labelByCustomerFamily;
export type Energies = keyof typeof labelByEnergy;
export type ExternalColor = keyof typeof labelByExternalColor;
export type Gearbox = keyof typeof labelByGearbox;
export type DealLabel = keyof typeof goodDealLabel;
export type EquipmentLevel = keyof typeof labelByEquipmentLevel;
export type InternalColor = keyof typeof labelByInternalColor;
export type Region = keyof typeof labelByRegion;
export type SortOption = keyof typeof labelBySortOption;
export type FiltersKeys = keyof Filters;
export type FinancingLabel = keyof typeof labelByFinancingType;
export type Critair = '0' | '1' | '2' | '3' | '4' | '5';
export const autonomyMinValues = [50, 100, 200, 300, 400, 500] as const;
export type autonomyMinType = (typeof autonomyMinValues)[number];
export const batteryCapacityMinValues = [20, 40, 60, 80, 100] as const;
export type batteryCapacityMinType = (typeof batteryCapacityMinValues)[number];
export const batteryConsumptionMaxValues = [10, 15, 20, 30] as const;
export type batteryConsumptionMaxType =
  (typeof batteryConsumptionMaxValues)[number];

export type Filters = FilterBase & {vertical: Vertical};

export type PartialFilters = FilterBase & {vertical?: Vertical};

type FilterBase = {
  age?: number;
  autonomyMin?: autonomyMinType;
  autoviza?: boolean;
  batteryCapacityMin?: batteryCapacityMinType;
  batteryConsumptionMax?: batteryConsumptionMaxType;
  categories?: Array<CategoriesKeys>;
  co2Max?: number;
  co2Min?: number;
  consumptionMax?: string;
  conversionBonusEligibility?: boolean;
  critAirMax?: Critair;
  cubicMax?: number;
  cubicMin?: number;
  customerType?: 'PART' | 'PRO' | 'COLLABORATEUR';
  customerFamilyCodes?: Array<CustomerFamilyCodes>;
  curef?: string;
  delivery?: 'true' | 'false';
  distance?: number;
  dptCp?: Array<string>;
  doors?: Array<string>;
  energies?: Array<Energies>;
  externalColors?: Array<ExternalColor>;
  firstHand?: boolean;
  fourWheelDrive?: boolean;
  gearbox?: Gearbox;
  goodDealBadges?: Array<DealLabel>;
  equipmentLevel?: string | string[];
  internalColors?: Array<InternalColor>;
  lengthMax?: number;
  widthMax?: number;
  heightMax?: number;
  makesModelsCommercialNames?: Array<Array<string>>;
  mileageMax?: number;
  mileageMin?: number;
  medias?: string;
  ownersMax?: number;
  reclaimVAT?: boolean;
  regions?: Array<Region>;
  sortBy?: SortOption;
  options?: Array<string>;
  page?: number;
  powerDINMax?: number;
  powerDINMin?: number;
  priceDropLimitDate?: boolean;
  priceMax?: number;
  priceMin?: number;
  ratedHorsePowerMax?: number;
  ratedHorsePowerMin?: number;
  reference?: string;
  references?: Array<string>;
  seats?: Array<string>;
  trunkVolumeMin?: number;
  versions?: Array<string>;
  yearMax?: number;
  yearMin?: number;
  allWarranty?: boolean;
  networkWarranty?: boolean;
  networkWarranties?: Array<string>;
  completeCategories?: boolean;
  initialPrice?: string;
  allFamilies?: boolean;
  teasingPriceMax?: number;
  teasingPriceMin?: number;
  financingType?: Array<keyof typeof exhaustiveFinancingTypes>;
  showroomStock?: 'network' | 'pro';
  ancre?: string;
  zipCode?: number;
  zipCodeDistance?: number;
};

// type pour un objet comportant au maximum un champ du type Filters
type AtMostOneOf<T> = keyof T extends infer K
  ? K extends unknown
    ? {[I in keyof T]+?: I extends K ? T[I] : never}
    : never
  : never;
export type Filter = AtMostOneOf<Filters>;

const verticalLabels = Object.values(shortLabelByVertical).map(value =>
  value.toUpperCase(),
);
const familiesLabels = Object.values(familiesByVertical).map(value =>
  value.toUpperCase(),
);
export interface ApiQueryParams
  extends Omit<
    Filters,
    'vertical' | 'regions' | 'makesModelsCommercialNames' | 'sortBy'
  > {
  families?: (typeof familiesLabels)[number];
  order?: string;
  visitPlaces?: Array<string>;
  zipCode?: string;
  zipCodeDistance?: string;
  regions?: string;
  makesModelsCommercialNames?: string;
  picturesCountMin?: number | string;
  version?: string;
  vertical?: (typeof verticalLabels)[number];
  sort?: SortOption;
  customerReferences?: Array<string>;
}

export interface EventsParams
  extends Omit<
    ApiQueryParams,
    | 'vertical'
    | 'regions'
    | 'makesModelsCommercialNames'
    | 'picturesCountMin'
    | 'version'
  > {
  vertical?: (typeof verticalLabels)[number];
  makes?: Array<string>;
  makesModels?: Array<string>;
  makesModelsCommercialNames?: Array<string>;
  regions?: Array<string>;
  picturesCountMin?: boolean;
  version?: Array<string>;
  financingMonthlyCostMax?: number; // BI mapping
  financingMonthlyCostMin?: number; // BI mapping
}

export type sessionStorageFilters =
  | 'homeFilters'
  | 'electricLandingFilters'
  | 'financingLandingFilters';
