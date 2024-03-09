import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({

    // containers
    container: {
        flex: 1,
        // backgroundColor: "#130",
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer : {
        flexDirection: 'row',
        // backgroundColor: "#950",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 50,
        width: 400,
        // marginBottom: 130,
    },
    bodyContainer: {
        flexDirection: 'column',
        // backgroundColor: "#700",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 50,
        width: 400,
        marginBottom: 0,
    },
    iconTray: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
        width: 300,
        marginBottom: 130,
    },
    iconTrayMicPressed: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
        width: 300,
        marginBottom: 130,
    },
    swapIconHolder: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    // container styles end


    textbox : {
        height: 200,
        width: 350,
        borderColor: '#ddd',
        borderWidth: 4,
        marginBottom: 16,
        borderRadius: 10,
    },
    langText : {
        fontSize: 20
    },
    tinyLogo : {
        width: 50,
        height: 50,
    },

    

})

export default homeScreenStyles;