import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Item, H2, Content,
    Input, Button, Form, Body, Title, Label, Text,
    Footer, FooterTab
} from 'native-base';
import { View, Image } from "react-native";
import Axios from 'axios'

function editProvider({ navigation, route }) {

    const {providerId, trademark,agentName, agentLastName, cellphone, email } = route.params;
    const [trademark2, setTrademark] =  useState(trademark);
    const [name, setName] =  useState(agentName);
    const [lastname, setLastName] =  useState(agentLastName);
    const [phone, setPhone] =  useState(cellphone);
    const [mail, setMail] =  useState(email);

    const handleDelete = async () => {
        let formData = new FormData();
        formData.append("option", "deleteProvider");
        formData.append("providerId", providerId);

        await Axios({
          method: "post",
          url: 'http://10.0.0.14/AppMovil/Connection.php',
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        })
          .then((response) => {
            console.log("Respuesta de conexión: ", response);
            if(response.status == 200){
                alert("Datos eliminados correctamente")
                navigation.navigate('Home')
            }
          })
          .catch((error) => {
            console.log("Error de conexión: ", error);
            alert("No se pudo eliminar el proveedor")
          });
      };

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append("option", "updateProvider");
        formData.append("providerId", providerId)
        formData.append("trademark", trademark2);
        formData.append("agentName", name);
        formData.append("agentLastName", lastname);
        formData.append("cellphone", phone);
        formData.append("email", mail);
    
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
                        <Icon style={{ color: '#000000' }} name='arrow-back' onPress={() => navigation.navigate('Provider')} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, color: '#000000' }}>Edición de proveedor</Title>
                </Body>
            </Header>
            <Content>
            <View style={{ alignItems: 'center' ,margin:20}}>
                <Image source={require('../assets/inventario.png')} style={{ height: 120, width: 120, resizeMode: 'cover' }} />
            </View>
            <H2 style={{ alignSelf: 'center', margin: 20, fontWeight: 'bold' }}>Proveedor: {trademark}</H2>
            <Form>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Nombre del proveedor:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {trademark2} onChangeText = {setTrademark}/>
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Nombre(s) del representante:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {name} onChangeText = {setName} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Apellido(s) del representante:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {lastname} onChangeText = {setLastName} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Número de telefono:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {phone} onChangeText = {setPhone} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Correo electrónico:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {mail} onChangeText = {setMail} />
                </Item>
            </Form>
            </Content>

            <Footer>
                <FooterTab >
                    <Button vertical style={{ backgroundColor: '#9FE0C1' }} onPress={handleSubmit}>
                        <Icon name="save" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Actualizar</Text>
                    </Button>
                    <Button vertical style={{ backgroundColor: '#FF6961'}} onPress={handleDelete} >
                        <Icon name="trash" style={{ color: '#000000' }} />
                        <Text style={{ color: '#000000' }}>Eliminar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default editProvider