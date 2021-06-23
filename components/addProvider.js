import React, { useState } from "react";
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

function addProvider({ navigation }) {

  const [trademark, setTrademark] = useState("");
  const [agentName, setagentName] = useState("");
  const [agentLastName, setagentLastName] = useState("");
  const [cellphone, setcellphone] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "addProvider");
    formData.append("trademark", trademark);
    formData.append("agentName", agentName);
    formData.append("agentLastName", agentLastName);
    formData.append("cellphone", cellphone);
    formData.append("email", email);

    if (trademark && agentName && agentLastName && cellphone && email) {
      await Axios({
        method: "post",
        url: 'http://10.0.0.14/AppMovil/Connection.php',
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          alert("Proveedor agregado correctamente");
          navigation.navigate("Home");
        })

        .catch((error) => {
          console.log("Error de conexión: ", error);
          alert("No se pudo añadir al proveedor");
        });
    } else {
      alert("Datos incompletos: Ingresa los datos de forma correcta");
    }
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#9FE0C1" }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Provider")}>
            <Icon style={{ color: "#000000" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontSize: 20, color: "#000000" }}>
            Agregar Proveedor
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
        <H2 style={{ alignSelf: "center", margin: 20, fontWeight: "bold" }}>
          Añadir proveedor
        </H2>
        <Form>
          <Text style={{ margin: 15, fontWeight: "normal" }}>
            Ingresa los siguientes datos:
          </Text>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Nombre del proveedor:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={trademark}
              onChangeText={setTrademark}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Nombre(s) del representante:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={agentName}
              onChangeText={setagentName}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Apellido(s) del representante:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={agentLastName}
              onChangeText={setagentLastName}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Número de telefono:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              placeholder="XXX-XXX-XX-XX"
              value={cellphone}
              onChangeText={setcellphone}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Correo electrónico:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setemail}
            />
          </Item>
        </Form>
          <Button style={{ backgroundColor: "#9FE0C1", margin: 15, alignSelf:'center'}} onPress={handleSubmit}>
            <Icon style={{ color: "#000000" }} name="add-circle" />
            <Text style={{ color: "#000000", backgroundColor: "#9FE0C1" }}>
              Agregar
            </Text>
          </Button>
        </Content>
    </Container>
  );
}
export default addProvider;
