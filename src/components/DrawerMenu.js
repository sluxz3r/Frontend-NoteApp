import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, FlatList, Modal, Alert } from 'react-native';
import { Item, Form, Input } from 'native-base';
import { connect } from 'react-redux';
import { getCat, addCat } from '../redux/actions/cat';


class DrawerMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: [],
            tmp:[],
            cat_name:'',
            cat_image:'',
            cat_color:'',
            modalVisible: false
        }
    }

    setModal(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount = async () => {
        await this.props.dispatch(getCat());
        this.setState({
            cat: this.props.cat.catList
        });
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.props.dispatch(getCat());
                this.setState({
                    cat: this.props.cat.catList
                })
            })
        ]
    }
    render() {
        const gas = () => {
            const { cat_name, cat_image, cat_color } = this.state
            if (cat_name !== '' && cat_image !== '' && cat_color !== '') {
                this.state.tmp.push({
                    cat_name: cat_name,
                    cat_image: cat_image,
                    cat_color: cat_color,
                });
                console.log(this.state.tmp);
                add()
                this.setState((prevState) => ({
                    modal: !prevState.modal
                }));
                console.log(this.state.tmp);
                Alert.alert(
                    'Berhasil',
                    'Add Category Sucess',
                    [
                        { text: 'Ok', onPress: () => this.setModal(!this.state.modalVisible) }
                    ]
                )
            } else {
                alert('Isi data yang kosong')
            }
        };
        let add = async () => {
            await this.props.dispatch(addCat(this.state.tmp[0]))
        };

        return (
            <View style={styles.drawer}>
                <View style={styles.drawerHead}>
                    <Image style={styles.imgLeft} source={{ uri: 'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1566321024/img/blank-profile-picture-973460_960_720_wolhdp.png' }} />
                    <Text style={styles.drawerText}>Mama Muda</Text>
                </View>
                <TouchableOpacity
                    style={styles.drawerCat}
                    onPress={() => { this.props.navigation.goBack() }}>
                    <Text>
                        All Notes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerAdd}
                    onPress={() => { this.setModal(true) }}>
                    <View style={styles.items}>
                        <Image style={styles.images} source={{ uri: `https://res.cloudinary.com/dbhwvh1mf/image/upload/v1567406213/img/add_hvvb3g.png` }} />
                    </View>
                    <View style={styles.content}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>Add Category</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.drawerCat}>
                    <FlatList
                        data={this.state.cat && this.state.cat}
                        numColumns={1}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    height: 50,
                                    width: 160,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                    padding: 10,
                                    flexDirection: 'row',
                                    paddingHorizontal: 4,
                                    paddingVertical: 4,
                                    borderBottomWidth: 1,
                                }}
                                    onPress={() => { this.props.navigation.navigate('Cat', {id_cat:item.id_cat}) }}>
                                    <View style={styles.item}>
                                        <Image style={styles.image} source={{ uri: `${item && item.cat_image}` }} />
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>{item.cat_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        } />
                </View>
                <Modal transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}>
                    <TouchableOpacity onPress={() => { this.setModal(!this.state.modalVisible); }}
                        style={styles.back}>
                        <View style={styles.modalBar}>
                            <View style={styles.modal}>
                                <Form>
                                    <Item last>
                                        <Input placeholderTextColor='#aaa'
                                            placeholder='Category Name'
                                            onChangeText={val => this.setState({ 'cat_name': val })} />
                                    </Item>
                                    <Item last>
                                        <Input placeholderTextColor='#aaa'
                                            placeholder='Image Url'
                                            onChangeText={(text) => this.setState({ 'cat_image': text })} />
                                    </Item>
                                    <Item last>
                                        <Input placeholderTextColor='#aaa'
                                            placeholder=' Background Color'
                                            onChangeText={(text) => this.setState({ 'cat_color': text })} />
                                    </Item>
                                    <View style={styles.buttonBar}>
                                        <TouchableOpacity style={{ marginRight: 7 }} onPress={gas} >
                                            <Text style={styles.btnAdd}>
                                                Add
                                                </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setModal(!this.state.modalVisible); }}>
                                            <Text style={styles.btnCancel}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Form>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        cat: state.cat,
    };
};

export default connect(mapStateToProps)(DrawerMenu);
const styles = StyleSheet.create({
    back: {
        height: '100%',
        backgroundColor: '#aaaaaa70'
    },
    modalBar: {
        padding: 60,
        paddingTop: 220
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
        borderRadius: 7
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btnAdd: {
        marginTop: 15,
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'right'
    },
    btnCancel: {
        marginTop: 15,
        fontSize: 20,
        textAlign: 'right',
        color: '#aaa'
    },
    thumbnailBar: {
        alignItems: 'center',
        marginTop: 45
    },
    thumbnail: {
        borderRadius: 100,
        width: 100,
        height: 100
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 70
    },
    body: { borderBottomColor: 'transparent' },
    textMenu: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000'
    },


    order: {
        backgroundColor: '#fff',
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: 50,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 8
    },
    drawer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imgLeft: {
        width: 5,
        height: 5,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
    },
    items: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    images: {
        alignSelf: 'center',
        borderWidth: 2,
        width: 20,
        height: 20,
        borderRadius: 100
    },
    content: {
        flex: 2,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    drawerHead: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    imgLeft: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10
    },
    drawerText: {
        fontSize: 20
    },
    drawerCat: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    drawerAdd: {

        height: 50,
        width: 160,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderBottomWidth: 1,

    }
})