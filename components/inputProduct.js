import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Body,
  Icon,
  Text,
  Input,
  Label,
  Item,
  Form,
  H2,
} from "native-base";
import { View, Image, FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import Axios from "axios";

function inputProduct({ navigation }) {
  const [productId, setproductId] = useState("");
  const [stock, setstock] = useState("");
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {getProduct()}, [])

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

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "addInput");
    formData.append("productId", productId);
    formData.append("stock", stock);

    if (productId && stock) {
      if (
        productId.charCodeAt(0) >= 48 &&
        productId.charCodeAt(0) <= 57 &&
        stock.charCodeAt(0) >= 48 &&
        stock.charCodeAt(0) <= 57
      ) {
        await Axios({
          method: "post",
          url: 'http://10.0.0.14/AppMovil/Connection.php',
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        })
          .then((response) => {
            alert("Entrada registrada correctamente");
            navigation.navigate("Home");
          })

          .catch((error) => {
            console.log("Error de conexión: ", error);
            alert("No se pudo registrar la entrada");
          });
      } else {
        alert("Valor no válido: Ingresa un valor numérico");
      }
    } else {
      alert("Datos incompletos: Ingresa los datos de forma correcta");
    }
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#9FE0C1" }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Input')}>
            <Icon style={{ color: "#000000" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignContent: "center", padding: 100 }}>
          <Title style={{ fontSize: 20, color: "#000000" }}>Entradas</Title>
        </Body>
      </Header>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Image
          source={require("../assets/entrada.jpg")}
          style={{ height: 120, width: 120, resizeMode: "cover" }}
        />
      </View>
      <H2 style={{ alignSelf: "center", margin: 20, fontWeight: "bold" }}>
        Entrada de mercancía
        </H2>
      <FlatList
        data={listProduct}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content >
              <ListItem.Title>
                <Icon active name="qr-scanner" />
                <Text >  NÚMERO DE PRODUCTO: {item.id}</Text>
              </ListItem.Title>
              <ListItem.Title>
                <Icon active name="cube" />
                <Text>  PRODUCTO:  {item.nameP} </Text>
              </ListItem.Title>
              <ListItem.Title>
                <Icon active name="cart" />
                <Text>  EXISTENCIAS:  {item.stockP}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
      <View>
        <Form>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Número del producto:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={productId}
              onChangeText={setproductId}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 16, fontWeight: "bold" }}>
              Cantidad de entrada:
            </Label>
            <Input
              style={{ fontStyle: "italic" }}
              value={stock}
              onChangeText={setstock}
            />
          </Item>
        </Form>
        <Button style={{ backgroundColor: "#9FE0C1", margin: 30, alignSelf: 'center' }} onPress={handleSubmit}>
          <Icon style={{ color: "#000000" }} name="save" />
          <Text style={{ color: "#000000", backgroundColor: "#9FE0C1" }}>
            Registrar
            </Text>
        </Button>
      </View>
    </Container>
  );
}
export default inputProduct;
