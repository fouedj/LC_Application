import uniqWith from 'lodash/uniqWith';
import {formatCm3, formatEur, formatKm, formatM} from './helpersFormatters';
import {
  autovizaLabel,
  conversionBonusEligibilityLabel,
  distanceByCode,
  energyLabels,
  firstHandLabel,
  fourWheelDriveLabel,
  goodDealLabel,
  labelAllWarranty,
  labelByCategory,
  labelByCustomerFamily,
  labelByEnergy,
  labelByEquipmentLevel,
  labelByFinancingType,
  labelByGearbox,
  labelByMedia,
  labelByOptionEquipement,
  labelByRegion,
  longLabelByVertical,
  networkWarrantyLabel,
  priceDropLabel,
  vatLabel,
} from './labels';
import {EquipmentLevel, Filter, Filters} from './searchModels';
import isEqual from 'lodash/isEqual';
import {
  groupByCategory,
  groupByEnergy,
  verticalByFamily,
} from './serviceSearchModels';

export const generateAllFilterTagLabels = (queryToSave: Filters) => {
  return Object.fromEntries(
    Object.entries(queryToSave)
      .map(currentFilter => {
        let label = generateFilterTagLabel({
          [currentFilter[0]]: currentFilter[1],
          additionalFilter:
            currentFilter[0] === 'zipCode'
              ? queryToSave?.zipCodeDistance
              : null,
        });

        if (typeof currentFilter[0] === 'string' && !Array.isArray(label)) {
          label = [label];
        }
        if (label && label != '' && label.length > 0) {
          return [currentFilter[0], label];
        }
      })
      .filter(elt => elt) as Iterable<
      readonly [PropertyKey, string | string[]]
    >,
  );
};

// if (Array.isArray(filter.energies)) {

// } else if (typeof filter.energies === 'string') {
//   const energyList: string[] = filter.energies.split(',');
// }

export const generateFilterTagLabel = (
  filter: Filter,
  additionalFilter?: Filter,
) => {
  switch (Object.keys(filter)[0]) {
    case 'age':
      return filter.age === 1
        ? 'De moins de 24h'
        : `De moins de ${filter} jours`;
    case 'autonomyMin':
      return `${filter.autonomyMin} km min`;
    case 'autoviza':
      return autovizaLabel;
    case 'batteryCapacityMin':
      return `${filter.batteryCapacityMin} kw min`;
    case 'batteryConsumptionMax':
      return `${filter.batteryConsumptionMax} kw/100km max`;
    case 'categories':
      let categoryList = filter.categories;
      if (typeof categoryList === 'string') {
        categoryList = categoryList
          .split(',')
          .map((category: string) => groupByCategory[category]);
      }
      return (
        categoryList &&
        (categoryList.length > 1
          ? categoryList.map(value => labelByCategory[value])
          : typeof filter.categories === 'string'
          ? [labelByCategory[categoryList[0]]]
          : labelByCategory[categoryList[0]])
      );
    case 'co2Max':
      return `${filter.co2Max} g/km max`;
    case 'co2Min':
      return `${filter.co2Min} g/km min`;
    case 'consumptionMax':
      return `${filter.consumptionMax} L/100km max`;
    case 'conversionBonusEligibility':
      return conversionBonusEligibilityLabel;
    case 'critAirMax':
      return `Crit'air max ${filter.critAirMax}`;
    case 'cubicMax':
      return `à partir de ${formatCm3(filter.cubicMax!)}`;
    case 'cubicMin':
      return `à partir de ${formatCm3(filter.cubicMin!)}`;
    case 'customerFamilyCodes':
      let customerFamilyCodesList = filter.customerFamilyCodes;
      if (typeof filter.customerFamilyCodes === 'string') {
        customerFamilyCodesList = filter.customerFamilyCodes.split(',');
      }
      return (
        customerFamilyCodesList &&
        (customerFamilyCodesList.length > 1
          ? customerFamilyCodesList.map(value => labelByCustomerFamily[value])
          : typeof filter.customerFamilyCodes === 'string'
          ? [labelByCustomerFamily[customerFamilyCodesList[0]]]
          : labelByCustomerFamily[customerFamilyCodesList[0]])
      );
    case 'delivery':
      if (filter.delivery === 'false' || !filter.delivery) {
        return null;
      } else {
        return 'Livraison disponible';
      }
    case 'zipCode':
      return `${filter.zipCode} (rayon de ${
        filter && filter?.additionalFilter && filter?.additionalFilter
      })`;
    case 'visitPlaces':
      return `dpt ${filter.visitPlaces} `;

    case 'doors': {
      const makeLabel = (door: string) =>
        parseInt(door, 10) < 6 ? `${door} portes` : `${door} portes ou plus`;
      let doorsList = filter.doors;
      if (typeof filter.doors === 'string') {
        doorsList = filter.doors.split(',');
      }
      return (
        doorsList &&
        (doorsList.length > 1
          ? doorsList.map(value => makeLabel(value))
          : typeof filter.doors === 'string'
          ? [makeLabel(doorsList[0])]
          : makeLabel(doorsList[0]))
      );
    }
    case 'energies':
      let energyList = filter.energies;
      if (typeof energyList === 'string') {
        energyList = energyList
          .split(',')
          .map((energy: string) => groupByEnergy[energy]);
      }
      return (
        energyList &&
        (energyList.length > 1
          ? energyList.map(value => labelByEnergy[value])
          : typeof filter.energies === 'string'
          ? [labelByEnergy[energyList[0]]]
          : labelByEnergy[energyList[0]])
      );
    case 'externalColors':
      let externalColorsList = filter.externalColors;
      if (typeof filter.externalColors === 'string') {
        externalColorsList = filter.externalColors.split(',');
      }
      return (
        externalColorsList &&
        (externalColorsList.length > 1
          ? externalColorsList.map(
              externalColor => `Extérieur ${externalColor}`,
            )
          : typeof filter.externalColors === 'string'
          ? [`Extérieur ${externalColorsList[0]}`]
          : `Extérieur ${externalColorsList[0]}`)
      );
    case 'families':
      const familyList: string[] = filter.families.split(',');
      return familyList.length > 1
        ? familyList.map(
            family => longLabelByVertical[verticalByFamily[family]],
          )
        : longLabelByVertical[verticalByFamily[familyList[0]]];
    case 'firstHand':
      return firstHandLabel;
    case 'fourWheelDrive':
      return fourWheelDriveLabel;
    case 'gearbox':
      return labelByGearbox[filter.gearbox!];
    case 'goodDealBadges':
      let badgeList = filter.goodDealBadges;
      if (typeof filter.goodDealBadges === 'string') {
        badgeList = filter.goodDealBadges.split(',');
      }
      return (
        badgeList &&
        (badgeList.length > 1
          ? badgeList.map(goodDealBadge => goodDealLabel[goodDealBadge])
          : typeof filter.goodDealBadges === 'string'
          ? [goodDealLabel[badgeList[0]]]
          : goodDealLabel[badgeList[0]])
      );
    case 'equipmentLevel':
      let equipementLevelList = filter?.equipmentLevel;
      if (typeof filter.equipmentLevel === 'string') {
        equipementLevelList = filter.equipmentLevel.split(',');
      }
      return equipementLevelList && equipementLevelList?.length > 1
        ? equipementLevelList.map(
            val => labelByEquipmentLevel[val as unknown as EquipmentLevel],
          )
        : labelByEquipmentLevel[
            equipementLevelList[0] as unknown as EquipmentLevel
          ];
    case 'internalColors':
      let internalColorsList = filter.internalColors;

      if (typeof filter.internalColors === 'string') {
        internalColorsList = filter.internalColors.split(',');
      }

      return (
        internalColorsList &&
        (internalColorsList.length > 1
          ? internalColorsList.map(
              internalColor => `Interieur ${internalColor}`,
            )
          : typeof filter.internalColorsList === 'string'
          ? [`Interieur ${internalColorsList[0]}`]
          : `Interieur ${internalColorsList[0]}`)
      );

    case 'lengthMax':
      return `Longueur jusqu'à ${formatM(filter.lengthMax!)}`;
    case 'widthMax':
      return `Largeur jusqu'à ${formatM(filter.widthMax!)}`;
    case 'heightMax':
      return `Hauteur jusqu'à ${formatM(filter.heightMax!)}`;
    case 'makesModelsCommercialNames': {
      if (Array.isArray(filter.makesModelsCommercialNames)) {
        const soloMake = (filter.makesModelsCommercialNames || [])
          .filter(([, model, commercialName]) => !model && !commercialName)
          .map(makeModelCommercialName => makeModelCommercialName[0]);
        const makeModel = uniqWith(
          (filter.makesModelsCommercialNames || [])
            .filter(([, model]) => model)
            .map(([make, model]) => [make, model]),
          isEqual,
        ).map(makeModel => makeModel.join(' '));
        const modelGeneration = (filter.makesModelsCommercialNames || [])
          .filter(([, , commercialName]) => commercialName)
          .map(makeModelCommercialName => makeModelCommercialName[2]);
        return soloMake.concat(makeModel).concat(modelGeneration);
      } else if (typeof filter.makesModelsCommercialNames === 'string') {
        return filter.makesModelsCommercialNames
          .replaceAll(':', ' ')
          .split(';')
          .map(
            (makesMCN: string) =>
              makesMCN.charAt(0).toUpperCase() +
              makesMCN.slice(1).toLowerCase(),
          );
      }
    }
    case 'mileageMax':
      return `${formatKm(filter.mileageMax!)}km max`;
    case 'mileageMin':
      return `${formatKm(filter.mileageMin!)}km min`;
    case 'medias':
      return labelByMedia[filter.medias!];
    case 'ownersMax':
      return `Nb propriétaires ${filter.ownersMax} max`;
    case 'reclaimVAT':
      return vatLabel;
    case 'regions':
      let regionList = filter.regions;
      if (typeof filter.regions === 'string') {
        regionList = filter.regions.split(',');
      }
      return (
        regionList &&
        (regionList.length > 1
          ? regionList.map(region => labelByRegion[region])
          : typeof filter.regions === 'string'
          ? [labelByRegion[regionList[0]]]
          : labelByRegion[regionList[0]])
      );
    case 'options':
      let optionList = filter.options;
      if (typeof filter.options === 'string') {
        optionList = filter.options.split(',');
      }
      return (
        optionList &&
        (optionList.length > 1
          ? optionList.map(
              opt => labelByOptionEquipement[opt]?.toLocaleLowerCase() || opt,
            )
          : typeof filter.options === 'string'
          ? [
              labelByOptionEquipement[optionList[0]]?.toLocaleLowerCase() ||
                optionList[0],
            ]
          : labelByOptionEquipement[optionList[0]]?.toLocaleLowerCase() ||
            optionList[0])
      );
    case 'powerDINMax':
      return `${filter.powerDINMax} ch max`;
    case 'powerDINMin':
      return `${filter.powerDINMin} ch min`;
    case 'priceDropLimitDate':
      return priceDropLabel;
    case 'priceMax':
      return `à partir de ${formatEur(filter.priceMax!)}`;
    case 'priceMin':
      return `jusqu'à ${formatEur(filter.priceMin!)}`;
    case 'ratedHorsePowerMax':
      return `${filter.ratedHorsePowerMax} cv max`;
    case 'ratedHorsePowerMin':
      return `${filter.ratedHorsePowerMin} cv min`;
    case 'reference':
      return `Rèf.: ${filter.reference}`;
    case 'seats':
      let seatsList = filter.seats;
      if (typeof filter.seats === 'string') {
        seatsList = filter.seats.split(',');
      }
      return (
        seatsList &&
        (seatsList.length > 1
          ? seatsList.map(seat =>
              parseInt(seat, 10) === 1 ? '1 place' : `${seat} places`,
            )
          : parseInt(seatsList[0], 10) === 1
          ? typeof filter.seats === 'string'
            ? ['1 place']
            : '1 place'
          : typeof filter.seats === 'string'
          ? [`${seatsList[0]} places`]
          : `${seatsList[0]} places`)
      );
    case 'trunkVolumeMin':
      return `Coffre ${filter.trunkVolumeMin} L min`;
    case 'versions':
      let versionList = filter.versions;
      if (typeof filter.versions === 'string') {
        regionList = filter.versions.split(',');
      }
      return (
        versionList &&
        (versionList.length > 1
          ? versionList.map(version => version.toUpperCase())
          : typeof filter.versions === 'string'
          ? [versionList[0].toUpperCase()]
          : versionList[0].toUpperCase())
      );
    case 'yearMax':
      return `jusqu'à ${filter.yearMax}`;
    case 'yearMin':
      return `à partir de ${filter.yearMin}`;
    case 'allWarranty':
      return labelAllWarranty;
    case 'networkWarranty':
      return networkWarrantyLabel;
    case 'teasingPriceMax':
      return `Max ${formatEur(filter.teasingPriceMax!)} /mois`;
    case 'teasingPriceMin':
      return `Min ${formatEur(filter.teasingPriceMin!)} /mois`;
    case 'financingType':
      let financingTypeList = filter.financingType;
      if (typeof filter.financingType === 'string') {
        financingTypeList = filter.financingType.split(',');
      }
      return (
        financingTypeList &&
        (financingTypeList.length > 1
          ? financingTypeList.map(region => labelByFinancingType[region])
          : typeof filter.financingType === 'string'
          ? [labelByFinancingType[financingTypeList[0]]]
          : labelByFinancingType[financingTypeList[0]])
      );
  }
};
