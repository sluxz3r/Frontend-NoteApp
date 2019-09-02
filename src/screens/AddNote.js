import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { View, Text, Container, Header, Title, Textarea, Content, Picker, Form } from 'native-base';
import { postNote } from '../redux/actions/note'
import { connect } from 'react-redux';

class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: [],
            title: '',
            notes: '',
            cat: '',
        }
    }

    render() {
        const postnotes = () => {
            const { title, notes, cat } = this.state
            if (title !== '' && notes !== '' && cat !== '') {
                this.state.note.push({
                    title: title,
                    notes: notes,
                    cat: cat,
                });
                console.log(this.state.note);
                add()
                this.setState((prevState) => ({
                    modal: !prevState.modal
                }));
                console.log(this.state.note);
                Alert.alert(
                    'Berhasil',
                    'Add Note Sucess',
                    [
                        { text: 'Ok', onPress: () => this.props.navigation.goBack() }
                    ]
                )
            } else {
                alert('Isi data yang kosong')
            }
        };
        let add = async () => {
            await this.props.dispatch(postNote(this.state.note[0]))
        };
        const { goBack } = this.props.navigation
        return (
            <Container>
                <Header style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Image style={styles.imgLeft} source={{ uri: 'https://static.thenounproject.com/png/1903677-200.png' }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Title style={{ color: 'black' }}>ADD NOTE</Title>
                    </View>
                    <View>
                        <TouchableOpacity onPress={postnotes}>
                            <Image style={styles.imgLeft} source={{ uri: 'https://cdn4.iconfinder.com/data/icons/symbols-1-1/32/22_arrow_recycle_refresh_check_mark_increase_decrease-512.png' }} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content padder>
                    <Form>
                        <Textarea
                            rowSpan={5}
                            style={styles.inputTitle}
                            placeholder="Add title"
                            onChangeText={val => this.setState({ 'title': val })} />
                        <Textarea
                            rowSpan={5}
                            style={styles.inputDescription}
                            placeholder="Your Notes"
                            onChangeText={val => this.setState({ 'notes': val })}
                        />
                        <Text style={{ color: 'black', left: 10 }}>CATEGORY</Text>
                        <Textarea
                            rowSpan={5}
                            style={styles.inputDescription}
                            placeholder="Id Category"
                            onChangeText={val => this.setState({ 'cat': val })}
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        note: state.note,
    };
};
export default connect(mapStateToProps)(AddNote);
const styles = StyleSheet.create({
    inputTitle: {
        top: 50,
        fontSize: 24,
        marginLeft: 5,
    },
    inputDescription: {
        fontSize: 24
    },
    header: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        alignSelf: 'center'
    },
    imgLeft: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
});