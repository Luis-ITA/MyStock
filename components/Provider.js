import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Footer,
    FooterTab, Button, Text, Body, Title, Thumbnail,
} from 'native-base';
import { FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import Axios from 'axios'

function Provider({ navigation }) {

    const [listProvider, setListProvider] = useState([]);
    useEffect(() => {
        getProviders()
    }, [])

    const getProviders = async () => {
        let formData = new FormData();
        formData.append("option", "showProvider");

        await Axios({
            method: "post",
            url: 'http://10.0.0.14/AppMovil/Connection.php',
            data: formData,
            config: { headers: { "Content-type": "multipart/form-data" } },
        })
            .then((response) => {
                setListProvider(response.data)
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
                    <Title style={{ fontSize: 20, paddingLeft: 10, color: '#000000' }}>Mis Proveedores</Title>
                </Body>
            </Header>

            <FlatList
                data={listProvider}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider
                    button
                    onPress={() => navigation.navigate('editProvider' ,
                    {
                    providerId:item.id,
                    trademark:item.marca,
                    agentName:item.nombre,
                    agentLastName:item.apellido,
                    cellphone:item.numero,
                    email:item.correo
                    })}>
                        <Thumbnail circular source={require('../assets/provedor.png')} style={{ width: "20%", height: 70 }} />
                        <ListItem.Content >
                            <ListItem.Title>
                                <Icon active name="qr-scanner" />
                                <Text>  IDENTIFICADOR: {item.id}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="briefcase" />
                                <Text>  {item.marca}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="contact" />
                                <Text>  {`${item.nombre} ${item.apellido}`}</Text>
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Icon active name="call" />
                                <Text>  {item.numero}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="mail" />
                                <Text>  {item.correo}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle />
                            <Button success full small transparent>
                                <Icon active name="create" /> 
                                <Text> Editar </Text>
                            </Button>
                        </ListItem.Content>
                    </ListItem>
                )}
            />


            <Footer>
                <FooterTab style={{ backgroundColor: '#9FE0C1' }}>
                    <Button vertical onPress={() => navigation.navigate('addProvider')}>
                        <Icon name="create" style={{ color: '#000000' }}/>
                        <Text style={{ color: '#000000' }}>Insertar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default Provider