import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Thumbnail,
    Button,Body, Title, Text,
} from 'native-base';
import { FlatList } from "react-native";
import { ListItem } from 'react-native-elements';
import Axios from 'axios';

function showProductStore({ navigation, route }) {

    const { storeId, name } = route.params

    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let formData = new FormData();
        formData.append("option", "showStoreProduct");
        formData.append("storeId", storeId);

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-type": "multipart/form-data" } },
        })
            .then((response) => {
                setListProducts(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error login", error);
            });

    };

    return (
        <Container>
            <Header style={{ backgroundColor: '#9FE0C1' }}>
                <Left>
                    <Button transparent >
                        <Icon style={{ color: '#000000' }} name='arrow-back' onPress={() => navigation.navigate('Store')} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, color: '#000000' }}>Almacén: {name}</Title>
                </Body>
            </Header>

            <FlatList
                data={listProducts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <Thumbnail circular source={require('../assets/papeleria.png')} style={{ width: "20%", height: 70 }} />
                        <ListItem.Content >
                            <ListItem.Title>
                                <Icon active name="barcode" />
                                <Text>  CÓDIGO: {item.id}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="cube" />
                                <Text>  {item.nameSP}</Text>
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Icon active name="briefcase" />
                                <Text>  {item.trademarkSP}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="document" />
                                <Text>  {item.descriptionSP}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="cart" />
                                <Text>  EXISTENCIAS: {item.stockSP} PIEZAS</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle/>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </Container>
    );
}
export default showProductStore;