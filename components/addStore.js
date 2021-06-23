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

function addStore({ navigation }) {

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "addStore");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);

    if (name && description && location) {
      await Axios({
        method: "post",
        url: 'http://10.0.0.14/AppMovil/Connection.php',
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          alert("Almacén agregado correctamente");
          navigation.navigate("Home");
        })

        .catch((error) => {
          console.log("Error de conexión: ", error);
          alert("No se pudo agregar el almacén");
        });
    } else {
      alert("Datos incompletos: Ingresa los datos de forma correcta");
    }
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#9FE0C1" }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Store")}>
            <Icon style={{ color: "#000000" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontSize: 20, color: "#000000" }}>
            Agregar Almacén
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
          Nuevo Almacén
        </H2>
        <Form>
          <Text style={{ margin: 15, fontWeight: "normal" }}>
            Ingresa los siguientes datos para dar de alta un nuevo almacén:
          </Text>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Nombre del almacén:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={name}
              onChangeText={setname}
            />
          </Item>
          <Item stackedLabel last>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Descripción del almacén:
            </Label>
            <Input
              style={{ height: 150, fontStyle: "italic" }}
              multiline={true}
              value={description}
              onChangeText={setdescription}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Ubicación del almacén:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={location}
              onChangeText={setlocation}
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
export default addStore;
