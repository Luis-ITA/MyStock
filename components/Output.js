import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Footer,
    FooterTab, Button, Text, Body, Title, Thumbnail,
} from 'native-base';
import { FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import Axios from 'axios'

function Output({ navigation }) {

    const [listOutput, setListOutput] = useState([]);
    useEffect(() => {
        getOutputs()
    }, [])

    const getOutputs = async () => {
        let formData = new FormData();
        formData.append("option", "showOutput");

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-type": "multipart/form-data" } },
        })
            .then((response) => {
                setListOutput(response.data)
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
                    <Title style={{ fontSize: 20, paddingLeft: 10, color: '#000000' }}>Salidas de mercancía</Title>
                </Body>
            </Header>

            <FlatList
                data={listOutput}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <Thumbnail circular source={require('../assets/productoSale.png')} style={{ width: "20%", height: 70 }} />
                        <ListItem.Content >
                            <ListItem.Title>
                                <Icon active name="qr-scanner" />
                                <Text>  NÚMERO DE ENTRADA: {item.id}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="cube" />
                                <Text>  {item.product}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="briefcase" />
                                <Text>  {item.trademark}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="cart" />
                                <Text>  { item.stock}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="time" />
                                <Text>  { item.datetime}</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
            />


            <Footer>
                <FooterTab style={{ backgroundColor: '#9FE0C1' }}>
                    <Button vertical onPress={() => navigation.navigate('outputProduct')}>
                        <Icon name="create" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Insertar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default Output;