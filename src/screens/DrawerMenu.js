import React, { Component } from 'react';
import { Image, View, Text, StatusBar, TouchableOpacity, StyleSheet, TextInput, Modal, ScrollView, FlatList } from 'react-native';
import AppHeader from '../components/Header'
import { Container, Fab, Input, Item } from 'native-base';
import { getNote, getNoteByCat } from '../redux/actions/note';
import { connect } from 'react-redux';
import moment from 'moment';

class Cat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: [],
            cats:[],
        }
    }

    componentDidMount = async () => {
        this.makeRequest()
    }

    makeRequest = async () => {
        await this.props.dispatch(getNoteByCat(this.props.navigation.state.params.id_cat));
        this.setState({
            cats: this.props.note.noteList
        })
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.props.dispatch(getNoteByCat(this.props.navigation.state.params.id_cat));
                this.setState({
                    cats: this.props.note.noteList
                })
            }),
        ]
    }

    render() {
        console.log(this.props.navigation.state.params.id_cat);
        
        return (
            <Container>
                <StatusBar backgroundColor='black' barStyle="light-content" />
                <View>
                    <AppHeader
                        leftHeader={() => this.props.navigation.openDrawer()}
                        title='NOTE APP'
                        screenLocation='HomeNote' />
                </View>
                <View style={styles.searchBar}>
                    <TextInput
                        style={{ marginLeft: 10, marginRight: 25 }}
                        placeholder="Search..." />
                </View>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <FlatList
                            data={this.state.cats && this.state.cats}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{
                                        height: 130,
                                        width: 130,
                                        marginHorizontal: 10,
                                        marginVertical: 10,
                                        borderRadius: 5,
                                        padding: 10,
                                        backgroundColor: item.cat_color
                                    }}
                                        onPress={() => { this.props.navigation.navigate('EditNote', { id: item.id }) }}>
                                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 12 }}>{moment(item.date).format('DD-MM-YYYY')}</Text>
                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>{item.title}</Text>
                                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{item.cat_name}</Text>
                                        <Text style={{ color: 'white', fontSize: 12 }}>{item.notes}</Text>
                                    </TouchableOpacity>
                                )
                            }

                            }
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.order} onPress={() => { this.props.navigation.navigate('Add') }}>
                    <Image style={styles.imgLeft} source={{ uri: 'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1567406213/img/add_hvvb3g.png' }} />
                </TouchableOpacity>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        note: state.note,
    };
};

export default connect(mapStateToProps)(Cat);
const styles = StyleSheet.create({
    searchBar: {
        zIndex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15,
        borderBottomColor: 'transparent',
        elevation: 6,
        marginVertical: 25,
        alignSelf: 'center',
        height: 45,
        width: 307,
        borderRadius: 20
    },
    FlatList: {
        height: 130,
        width: 130,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        padding: 10
    },
    order: {
        backgroundColor: '#fff',
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: 50,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 8
    },
    imgLeft: {
        width: 20,
        height: 20,
        borderRadius: 100
    },
})