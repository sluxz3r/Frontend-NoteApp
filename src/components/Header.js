import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Header, Title, Thumbnail, } from 'native-base';

class AppHead extends Component {
    render() {
        const { leftHeader, rightHeader, title, screenLocation } = this.props;
        return (
            <>
                <Header style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={leftHeader}>
                            <Image style={styles.imgLeft} source={{ uri: 'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1566321024/img/blank-profile-picture-973460_960_720_wolhdp.png' }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Title style={{ color: 'black' }}>{title}</Title>
                    </View>
                    <View>
                        <TouchableOpacity onPress={rightHeader}>
                            <Image style={styles.imgRight} source={{ uri: 'https://icon-library.net/images/icon-sort/icon-sort-24.jpg' }} />
                        </TouchableOpacity>
                    </View>
                </Header>
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgLeft: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    imgRight: {
        width: 30,
        height: 30
    },
    modal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        padding: 15,
    }
});

export default AppHead;