import React, { Component, useState } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Icon,
  Text,
  Input,
  Label,
  Item,
  Form,
  Card,
  H2,
} from "native-base";
import { View, Image } from "react-native";
import Axios from "axios";

function addProduct({ navigation }) {

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [providerId, setproviderId] = useState("");
  const [storeId, setstoreId] = useState("");

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "addProduct");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("providerId", providerId);
    formData.append("storeId", storeId);

    if (name && description && providerId && storeId) {
      await Axios({
        method: "post",
        url: 'http://10.0.0.14/AppMovil/Connection.php',
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          alert("Producto agregado correctamente");
          navigation.navigate("Home");
        })

        .catch((error) => {
          console.log("Error de conexión: ", error);
          alert("Producto agregado correctamente");
        });
    } else {
      alert("Datos incompletos: Ingresa los datos de forma correcta");
    }
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#9FE0C1" }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Products")}>
            <Icon style={{ color: "#000000" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontSize: 20, color: "#000000" }}>
            Agregar Producto
          </Title>
        </Body>
      </Header>
      <Content>
        <View style={{ alignItems: "center", margin: 20 }}>
          <Image
            source={require("../assets/agregar.jpg")}
            style={{ height: 120, width: 120, resizeMode: "cover" }}
          />
        </View>
        <H2 style={{ alignSelf: "center", margin: 15, fontWeight: "bold" }}>
          Nuevo Producto
        </H2>
        <Form>
          <Text style={{ margin: 5, fontWeight: "normal" }}>
            Para dar de alta un nuevo producto, ingresa los siguientes datos:
          </Text>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Nombre del producto:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={name}
              onChangeText={setname}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Descripción del producto:
            </Label>
            <Input
              style={{ height: 60, fontStyle: "italic" }}
              multiline={true}
              value={description}
              onChangeText={setdescription}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Cantidad del stock:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={stock}
              onChangeText={setstock}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Número de proveedor::
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={providerId}
              onChangeText={setproviderId}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Número de almacén:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={storeId}
              onChangeText={setstoreId}
            />
          </Item>
        </Form>
          <Button style={{ backgroundColor: "#9FE0C1", margin: 15, alignSelf:'center' }} onPress={handleSubmit}>
            <Icon style={{ color: "#000000" }} name="add-circle" />
            <Text style={{ color: "#000000", backgroundColor: "#9FE0C1" }}>
              Agregar
            </Text>
          </Button>
        </Content>
    </Container>
  );
}
export default addProduct;
