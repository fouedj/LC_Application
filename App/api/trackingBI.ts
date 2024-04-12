import {StatsEvent} from '@groupelacentrale/glc-contact-libs-stats-event';
import {Environment} from '../config/constants';
import {Platform, PlatformAndroidStatic, PlatformIOSStatic} from 'react-native';
import DeviceInfo, {isTablet} from 'react-native-device-info';
import generateUserAgent from '../utils/generateUserAgent';

let host = 'https://dev.lacentrale.fr';
if (Environment.environment == 'stage') {
  host = 'https://test.lacentrale.fr';
} else if (Environment.environment == 'production') {
  host = 'https://lacentrale.fr';
}

export interface EventDataBI {
  event_page: string;
  event_page_zone: string;
  classified_ref: string;
  owner_correlation_id?: string;
  classifiedId?: string;
  eventCorrelationId?: string;
  classifiedOwnerCorrelationId?: string;
  completionQuality?: string;
  visitor_id?: string;
}

//geoloc_consent	geoloc_country	geoloc_department	geoloc_type	geoloc_zipcode
//search id
//log_type
//user_agent	user_agent_browser	user_agent_device	user_agent_engine	user_agent_os	user_correlation_id	user_source_ip
//visitor_id

const eventSource = 'classified:lcpab:mobile:lc';

const statsEvent = new StatsEvent({host, eventSource});

export function trackBI(
  eventType: string,
  eventData: EventDataBI,
  accessToken: string | undefined = undefined,
  visitor_id: string,
  search_id: string,
  owner_correlation_id
) {
  return statsEvent
    .collect({
      eventData: {
        event_type: eventType,
        ...eventData,
        log_index: 'lc',
        event_source: eventSource,
        time: new Date().getTime(),
        visitor_id: visitor_id,
        user_agent: generateUserAgent(),
        search_id: search_id,
        owner_correlation_id: owner_correlation_id,
      },
      token: accessToken,
    })
    .catch((error: any) => {
      //TODO : Sentry log
      console.log(error);
    });
}
