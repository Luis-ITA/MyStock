import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Footer, Accordion,
    FooterTab, Button, Text, Body, Title, Thumbnail,
} from 'native-base';
import { FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements';
import Axios from 'axios';

function Store({navigation}) {

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

    const dataArray = [
        { title: "ACTUALIZAR ALMACEN", content: "MANTEN PRESIONADO UN ALMACEN PARA PODER EDITARLO" },
      ];

    return (
        <Container>
            <Header style={{ backgroundColor: '#9FE0C1' }}>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: '#000000' }} name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, paddingLeft: 10, color: '#000000' }}>Mis Almacenes</Title>
                </Body>
            </Header>

            <View style={{backgroundColor:'#DEFFF2'}}>
                <Accordion dataArray={dataArray}/>
            </View>

            <FlatList
                data={listStore}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider
                    button
                    onPress={() => navigation.navigate('showProductStore', 
                    {
                        storeId:item.id,
                        name:item.nameS
                    })}

                    onLongPress={() => navigation.navigate('editStore', 
                    {
                        idwarehouse:item.id,
                        namestore:item.nameS,
                        descripstore:item.descriptionS,
                        ubistore:item.locationS
                    })}>
                        <Thumbnail circular small source={require('../assets/almacen.png')} style={{ width: "20%", height: 70 }} />
                        <ListItem.Content >
                            <ListItem.Title>
                                <Icon active name="qr-scanner" />
                                <Text>  ID DEL ALMACEN: {item.id}</Text>
                            </ListItem.Title>
                            <ListItem.Title>
                                <Icon active name="home" />
                                <Text>  {item.nameS}</Text>
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Icon active name="information-circle" />
                                <Text>  {item.descriptionS}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                <Icon active name="pin" />
                                <Text>  {item.locationS}</Text>
                            </ListItem.Subtitle>
                            <ListItem.Subtitle />
                            <Button success small full transparent>
                                <Icon name='search' />
                                <Text>Ver productos</Text>
                            </Button>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
            <Footer>
                <FooterTab >
                    <Button vertical onPress={() => navigation.navigate('addStore')} style={{ backgroundColor: '#9FE0C1' }}>
                        <Icon name="create" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Insertar</Text>
                    </Button>
                    <Button vertical onPress={() => navigation.navigate('deleteStore')} style={{ backgroundColor: '#FF6961'}}>
                        <Icon name="trash" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Eliminar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default Store;