import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20,
        marginLeft: 20,
    },
    separator: {
        width: 7,
        height: 21,
        marginRight: 8,
        borderRadius: 1,
        backgroundColor: colors.lc_blue,
        flexShrink: 0,
    },
    headerText: {
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26,
        color: colors.blackPro,
    },
});