import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Footer, Item, Input,
    FooterTab, Button, Text, Body, Title, Thumbnail,
} from 'native-base';
import { FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import Axios from 'axios'

function Products({ navigation }) {

    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        let formData = new FormData();
        formData.append("option", "showProduct");

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-type": "multipart/form-data" } },
        })
            .then((response) => {
                setListProduct(response.data)
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
                    <Button transparent onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: '#000000' }} name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, paddingLeft: 10, color: '#000000' }}>Mis Productos</Title>
                </Body>
            </Header>
            <FlatList
                data={listProduct}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider
                        button
                        onPress={() => navigation.navigate('editProduct',
                            {
                                productId: item.id,
                                name: item.nameP,
                                description: item.descriptionP,
                                stock: item.stockP,
                                storeId: item.idstoreP
                            })}>
                        <Thumbnail circular source={require('../assets/papeleria.png')} style={{ width: "20%", height: 70 }} />
                        <ListItem.Content >
                            <ListItem.Title>
                                <Icon active name="barcode" />
                                <Text>  CÓDIGO: {item.id}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="cube" />
                                <Text>  {item.nameP}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="briefcase" />
                                <Text>  {item.trademarkP}</Text>
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Icon active name="document" />
                                <Text>  {item.descriptionP}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="pin" />
                                <Text>  {item.location}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="cart" />
                                <Text>  EXISTENCIAS: {item.stockP} PIEZAS</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle />
                            <Button success full small transparent>
                                <Icon active name="create" />
                                <Text> Editar Producto </Text>
                            </Button>
                        </ListItem.Content>
                    </ListItem>
                )}
            />

            <Footer>
                <FooterTab style={{ backgroundColor: '#9FE0C1' }}>
                    <Button vertical onPress={() => navigation.navigate('addProduct')}>
                        <Icon name="create" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Insertar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default Products;