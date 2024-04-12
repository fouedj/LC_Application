import {trackBI, EventDataBI} from '../../api/trackingBI';

export const trackClickAjoutFavori = (
  isAlreadyFavorite: boolean,
  eventData: EventDataBI,
  accessToken: string | undefined = undefined,
  visitor_id: string,
  tcVars: {string: any},
  ownerCorrelationId: string,
) => {
  if (isAlreadyFavorite) {
    trackBI(
      'FAVORITE_CLICKED',
      eventData,
      accessToken,
      visitor_id,
      tcVars.search_id,
      ownerCorrelationId,
    );
  }
};

export const trackClickShared = (
  eventData: EventDataBI,
  accessToken: string | undefined,
  visitor_id: string,
  tcVars: {string: any},
  ownerCorrelationId,
) => {
  //TagCommanderModule.sendClickShared(eventData.classified_ref);
  trackBI(
    'SHARED_CLICKED',
    eventData,
    accessToken,
    visitor_id,
    tcVars.search_id,
    ownerCorrelationId,
  );
};
