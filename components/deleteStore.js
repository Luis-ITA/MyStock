import React, { useState, useEffect } from 'react';
import {
    Container, Header, Icon, Left, Thumbnail, Card,
    Button, Body, Title, Text, Form, Item, Input
} from 'native-base';
import { FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements';
import Axios from 'axios';

function deleteStore({ navigation }) {

    const [listStore, setListStore] = useState([]);
    useEffect(() => {
        getStore()
    }, [])

    const getStore = async () => {
        let formData = new FormData();
        formData.append("option", "showStore");

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-type": "multipart/form-data" } },
        })
            .then((response) => {
                setListStore(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error login", error);
            });

    };

    const [storeId, setStoreId] = useState('');

    const handleDelete = async () => {
        let formData = new FormData();
        formData.append("option", "deleteStore");
        formData.append("storeId", storeId);

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then((response) => {
                console.log("Respuesta de conexión: ", response);
                if (response.status == 200) {
                    alert("Datos eliminados correctamente")
                    navigation.navigate('Home')
                }
            })
            .catch((error) => {
                console.log("Error de conexión: ", error);
                alert("No se pudo eliminar el almacén")
            });
    };

    return (
        <Container>
            <Header style={{ backgroundColor: '#9FE0C1' }}>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: '#000000' }} name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, paddingLeft: 10, color: '#000000' }}>Eliminar Almacén</Title>
                </Body>
            </Header>
            <View style={{ margin: 10 }}>
                <Text style={{ margin: 10 }}> OBSERVA LOS NÚMEROS DE ALMACEN AQUI:</Text>
                </View>
                <FlatList
                    data={listStore}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ListItem bottomDivider>
                            <Thumbnail circular small source={require('../assets/almacen.png')} style={{ width: "20%", height: 70 }} />
                            <ListItem.Content >
                                <ListItem.Title>
                                    <Icon active name="qr-scanner" />
                                    <Text>  ID DEL ALMACEN: {item.id}</Text>
                                </ListItem.Title>
                                <ListItem.Title>
                                    <Icon active name="home" />
                                    <Text>  NOMBRE: {item.nameS}</Text>
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )}
                />

            <View style={{ backgroundColor: '#FFFFFF', margin: 5 }}>
                <Text style={{ margin: 10, alignSelf: 'center' }}>FORMULARIO</Text>
                <Text note style={{ fontStyle: 'italic' }}>Al borrar el almacén, seguiras conservando tus productos.</Text>
                <Text note style={{ fontStyle: 'italic' }}>Modifica el almacén de cada producto en "Mis productos".</Text>
                <Form>
                    <Item regular style={{ margin: 10, borderColor: 'black', borderWidth: 1 }}>
                        <Icon style={{ color: 'red' }} active name='trash' />
                        <Input
                            style={{ fontStyle: 'italic', }}
                            value={storeId}
                            onChangeText={setStoreId}
                            placeholder='Número de almacén a eliminar' />
                    </Item>
                </Form>

                <Button horizontal style={{ backgroundColor: '#FF6961', alignSelf: 'center' }} onPress={handleDelete}>
                    <Icon name="trash" style={{ color: '#000000' }} />
                    <Text style={{ color: '#000000' }}>Eliminar</Text>
                </Button>
                <Card
                    transparent
                    style={{
                        height: 10,
                        width: null,
                    }}
                />
            </View>
        </Container>
    );
}
export default deleteStore;