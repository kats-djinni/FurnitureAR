import {
    StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    outer: {
    flex: 1
    },

    arView: {
        flex: 1
    },

    buttons: {
        height: 80,
        width: 80,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#f0f8ff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#00000000"
    },

    navBar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 77
    },
    
    itemBar: {
        flex: 1,
        alignSelf: "flex-end",
        position: "absolute",
        top: 100,
        // paddingTop: 85,
        paddingBottom: 85,
        padding: 20
    },

    itemButton: {
        resizeMode: "cover",
    },

    savingIcon: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "flex-end"
    },

    savingMessage : {
        textAlign: 'center',
        fontFamily: "Arial",
        fontWeight: 'bold',
        fontSize: 20,
        color: "#fff"
    },
    
    searchingIcon: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center"
    },

    backgroundImage: {
        position: 'absolute',
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
    }
});

export default styles