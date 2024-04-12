import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Pour 2 colonnes
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: colors.lc_blue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.33,
    shadowRadius: 6,
    elevation: 6,
  },
  cardText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    color: colors.blackPro,
    marginBottom: 16,
  },
  image: {
    marginBottom: 8,
    marginTop: 16,
  },
  flexView: {
    flex: 1,
  },
});
