import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { View, Text, Container, Header, Title, Textarea, Content, Picker, Form,  } from 'native-base';
import { connect } from 'react-redux';
import { getNoteById } from '../redux/actions/noteid';
import { editNote } from '../redux/actions/note';

class EditNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteid: [],
            tmp: [],
            title: '',
            notes: '',
            cat: '',
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getNoteById(this.props.navigation.state.params.id));
        this.setState({
            noteid: this.props.noteid
        });
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.props.dispatch(getNoteById(this.props.navigation.state.params.id));
                this.setState({
                    noteid: this.props.noteid
                });
            })
        ]
    }

    componentWillUnmount = () => {
        this.setState({
            id: null
        })
    }

    changeHandle = (e) => {
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        this.state.note.idList[name] = val
        this.setState({ noteid: this.state.noteid })

    }

    render() {
        const postnotes = () => {
            const { title, notes, cat } = this.state
            if (title !== '' && notes !== '' && cat !== '') {
                this.state.tmp.push({
                    title: title,
                    notes: notes,
                    cat: cat,
                });
                add()
                this.setState((prevState) => ({
                    modal: !prevState.modal
                }));
                Alert.alert(
                    'Berhasil',
                    'Edit Note Sucess',
                    [
                        { text: 'Ok', onPress: () => this.props.navigation.goBack() }
                    ]
                )
            } else {
                alert('Isi data yang kosong')
            }
        };
        let add = async () => {
            await this.props.dispatch(editNote((this.state.tmp[0]), this.props.navigation.state.params.id))
        };

        const note = this.state.noteid.idList
        console.log(note);

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
                        <Title style={{ color: 'black' }}>EDIT NOTE</Title>
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
                            onChangeText={val => this.setState({ 'title': val })}>
                            {note ? note.title : ''}
                        </Textarea>
                        <Textarea
                            rowSpan={5}
                            style={styles.inputDescription}
                            placeholder="Your Notes"
                            onChangeText={val => this.setState({ 'notes': val })}
                        >
                            {note ? note.notes : ''}
                        </Textarea>
                        <Text style={{ color: 'black', left: 10 }}>CATEGORY</Text>
                        <Textarea
                            rowSpan={5}
                            style={styles.inputDescription}
                            placeholder="Id Category"
                            onChangeText={val => this.setState({ 'cat': val })}
                        >
                            {note ? note.cat : ''}
                        </Textarea>
                    </Form>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        noteid: state.noteid,
        note: state.note,
    };
};

export default connect(mapStateToProps)(EditNote);
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