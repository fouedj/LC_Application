import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BlackBell(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.436 17.547c-.42.36-.6.79-.56 1.291.07.81.7 1.38 1.52 1.38h4.002c.18 0 .32.05.38.29.38 1.431 1.661 2.462 3.102 2.492h.09c1.47 0 2.751-.91 3.211-2.291.03-.09.06-.19.09-.29l.06-.2H19.563c.21 0 .38-.02.52-.06.55-.16.901-.53 1.031-1.07.14-.581-.03-1.101-.52-1.531-1.49-1.321-2.241-3.022-2.221-5.063v-.4c.01-.84.03-1.72-.04-2.571-.2-2.521-1.971-4.712-4.422-5.453-.27-.08-.54-.14-.82-.2l-.4-.09-.1-.02v-.1-.55-1.31c.01-.41-.11-.65-.42-.801h-.291c-.32.13-.45.36-.44.73.01.39.01.78 0 1.16v.911h-.11c-.8.12-1.43.29-1.981.57-2.231 1.111-3.472 2.892-3.672 5.303-.06.73-.05 1.49-.04 2.21v.751c0 1.08-.24 2.091-.71 3.012-.38.72-.88 1.36-1.5 1.9h.01zm10.635 2.832c-.14.75-1.04 1.44-1.93 1.48h-.101c-.95 0-1.85-.63-2.08-1.47l-.04-.16h4.191l-.03.15h-.01zm-7.293-7.734v-.77c0-.71 0-1.44.04-2.161.14-2.301 1.97-4.322 4.262-4.702 2.83-.47 5.422 1.27 6.042 4.052.07.32.11.67.12 1.12v2.501c.02 2.261.88 4.162 2.541 5.673l.03.03s.09.08.12.12c.08.1.1.23.05.35-.04.11-.14.2-.27.22-.07.01-.13.01-.19.01H4.537 4.417c-.04 0-.08 0-.12-.02-.14-.06-.23-.14-.27-.22-.05-.11 0-.28.07-.36.07-.08.15-.15.23-.22.05-.04.09-.08.14-.13 1.52-1.5 2.29-3.342 2.3-5.483l.01-.01zM17.993 2.99c.05.06.11.121.16.181.04.05.09.09.13.14 1.52 1.67 2.4 3.632 2.611 5.853.02.16.02.33.03.49 0 .2.02.41.04.61.04.28.3.46.6.45.28-.02.49-.25.51-.54V9.764c-.07-1.95-.61-3.772-1.6-5.412-.47-.78-1.03-1.501-1.68-2.141a.593.593 0 00-.421-.18c-.14 0-.28.05-.39.16-.22.21-.23.56-.02.8h.03zM1.945 9.824v.32c0 .16.07.31.18.42.11.1.26.16.42.15.31-.02.531-.26.531-.6 0-1.04.16-2.04.46-2.991.48-1.53 1.31-2.892 2.451-4.062.14-.14.22-.31.21-.47 0-.14-.07-.28-.18-.39-.24-.23-.58-.21-.85.06-2.031 2.08-3.122 4.622-3.242 7.573l.02-.01z"
        fill="#1C1C1C"
      />
    </Svg>
  );
}

export default BlackBell;