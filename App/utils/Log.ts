import {ENABLE_LOG} from '../../App/config/constants';
//custom Log to do make our logging clear
class Log {
  public error(
    theme: string,
    error: any,
    customMessage: string = 'INCONNU',
    disable: boolean = false,
  ) {
    ENABLE_LOG &&
      !disable &&
      console.log(`************* ERREUR : ${theme} ******************`);
    ENABLE_LOG && !disable && console.log(theme + ' ', error);

    ENABLE_LOG &&
      !disable &&
      console.log('Message personnalisé :', customMessage);
  }

  public info(
    theme: string,
    info: any,
    // customMessage: string = '',
    disable: boolean = false,
  ) {
    ENABLE_LOG &&
      !disable &&
      console.log(`*********** INFO : ${theme} *******************`);
    ENABLE_LOG &&
      !disable &&
      info &&
      console.log(theme + ' ', JSON.stringify(info, null, 3));
    //  ENABLE_LOG && console.log('Message personnalisé :', customMessage);
  }
}

export default new Log();
