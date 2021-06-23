import React, { useEffect, useState } from 'react';
import {
    Container, Header, Icon, Left, Item, H2, Content,
    Input, Button, Form, Body, Title, Label, Text,
    Footer, FooterTab
} from 'native-base';
import { View, Image } from "react-native";
import Axios from 'axios'

function editProduct({ navigation, route }) {

    const {productId, name, description, stock, storeId } = route.params;
    const [name2, setName] =  useState(name);
    const [description2, setDescrip] =  useState(description);
    const [stock2, setStock] =  useState(stock);
    const [idstore2, setIdStore] =  useState(storeId);

    const handleDelete = async () => {
        let formData = new FormData();
        formData.append("option", "deleteProduct");
        formData.append("productId", productId);

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
            alert("No se pudo eliminar el producto")
          });
      };

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append("option", "updateProduct");
        formData.append("productId", productId)
        formData.append("name", name2);
        formData.append("description", description2);
        formData.append("stock", stock2);
        formData.append("storeId", idstore2);
    
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
                        <Icon style={{ color: '#000000' }} name='arrow-back' onPress={() => navigation.navigate('Products')} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontSize: 20, color: '#000000' }}>Edición de producto</Title>
                </Body>
            </Header>
            <Content>
            <View style={{ alignItems: 'center' ,margin:20}}>
                <Image source={require('../assets/inventario.png')} style={{ height: 120, width: 120, resizeMode: 'cover' }} />
            </View>
            <H2 style={{ alignSelf: 'center', margin: 20, fontWeight: 'bold' }}>Producto: {name}</H2>
            <Form>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Nombre del producto:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {name2} onChangeText = {setName} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Descripción:</Label>
                    <Input multiline = {true} style={{ fontStyle:'italic'}} value = {description2} onChangeText = {setDescrip} />
                </Item>
                <Item stackedLabel style = {{backgroundColor:'#EFEFEF'}}>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Existencia en inventario:</Label>
                    <Input disabled style={{ fontStyle:'italic'}} value = {stock2} onChangeText = {setStock} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ fontSize: 16, fontWeight: 'bold' }}>Número de almacén:</Label>
                    <Input style={{ fontStyle:'italic'}} value = {idstore2} onChangeText = {setIdStore} />
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
export default editProduct;