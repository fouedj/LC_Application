import {statsEvent, eventSource, EventDataBI} from '../../api/trackingBI';

export const sendPageMesFavorisBI = (
  eventData: EventDataBI,
  accessToken: string,
) => {
  console.log('[sendPageMesFavoris]');
  (async () => {
    await statsEvent.collect({
      eventData: {
        event_type: 'PAGE_FAVORIS', //A changer avec les specs
        ...eventData,
        event_source: eventSource,
        time: new Date().getTime(),
      },
      token: accessToken,
    });
  })();
};
