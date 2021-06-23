import React, { useState } from 'react';
import {
    Container, Header, Icon, Left, Item, H2, Content,
    Input, Button, Form, Body, Title, Label, Text,
} from 'native-base';
import { View, Image } from "react-native";
import Axios from 'axios'

function editStore({ navigation, route }) {

    const {idwarehouse, namestore, descripstore, ubistore} = route.params;
    const [name, setName] =  useState(namestore);
    const [description, setDescrip] =  useState(descripstore);
    const [location, setLocation] =  useState(ubistore);

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append("option", "updateStore");
        formData.append("storeId", idwarehouse)
        formData.append("name", name);
        formData.append("description", description);
        formData.append("location", location);
    
        await Axios({
          method: "post",
          url: 'http://10.0.0.14/AppMovil/Connection.php',
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        })
          .then((response) => {
            console.log("Respuesta de conexión: ", response);
            if(response.data.login == true){
                alert("Datos guardados correctamente")
                navigation.navigate('Home')
              }
          })
          .catch((error) => {
            console.log("Error de conexión: ", error);
            alert("No se pudieron guardar los cambios")
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
                    <Title style={{ fontSize: 20, color: '#000000' }}>Edición de Almacén</Title>
                </Body>
            </Header>
            <Content>
            <View style={{ alignItems: 'center' ,margin:20}}>
                <Image source={require('../assets/inventario.png')} style={{ height: 120, width: 120, resizeMode: 'cover' }} />
            </View>
            <H2 style={{ alignSelf: 'center', margin: 20, fontWeight: 'bold' }}>Almacén: {namestore}</H2>
            <Form>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Nombre del almacén:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {name} onChangeText = {setName} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Descripción:</Label>
                    <Input multiline={true} style={{ fontStyle:'italic'}} value = {description} onChangeText = {setDescrip} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Ubicación:</Label>
                    <Input multiline={true} style={{ fontStyle:'italic'}} value = {location} onChangeText = {setLocation} />
                </Item>
            </Form>
            <Button vertical style={{ backgroundColor: '#9FE0C1', alignSelf:'center', margin:40 }} onPress={handleSubmit}>
                        <Icon name="save" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Actualizar</Text>
                    </Button>
            </Content>
        </Container>
    );
}
export default editStore;