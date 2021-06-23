import React from 'react';
import {Image, View} from 'react-native';
import { Container, Header, Icon, Left, Right,Thumbnail, 
  Button, Content,List, ListItem, Text,Body, Title, Row} from 'native-base';

function Home ({navigation}) {
    return (
       <Container>
       <Header style={{backgroundColor:'#9FE0C1'}}>
          <Left>
            <Button transparent disabled>
              <Icon style={{color:'#000000'}} name='home'/>
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize:24, paddingLeft:20, color:'#000000'}}>My Stock</Title>
          </Body>
        </Header>
        <View style={{alignItems:'center'}}>
          <Image source={require('../assets/marca.png')} style = {{height: 150, width: 220, resizeMode:'cover'}}/>  
        </View>
        <Row style={{height:20}}></Row>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source={require('../assets/papeleria.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight:'bold'}}>Mis Productos</Text>
                <Text style={{fontStyle:'italic'}} note numberOfLines={3}>Visualize todos los productos de su inventario</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => navigation.navigate('Products')}>
                  <Text>Ver más</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source={require('../assets/almacen.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight:'bold'}}>Mis Almacenes</Text>
                <Text style={{fontStyle:'italic'}}note numberOfLines={2}>Tenga registro de sus almacenes</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => navigation.navigate('Store')}>
                  <Text>Ver más</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source={require('../assets/provedor.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight:'bold'}}>Mis Proveedores</Text>
                <Text style={{fontStyle:'italic'}}note numberOfLines={3}>Obtenga toda la información de sus proveedores</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => navigation.navigate('Provider')}>
                  <Text>Ver más</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source={require('../assets/entrada.jpg')} />
              </Left>
              <Body>
                <Text style={{fontWeight:'bold'}}>Entrada de mercancía</Text>
                <Text style={{fontStyle:'italic'}}note numberOfLines={2}>Registre las entradas de sus producto</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => navigation.navigate('Input')}>
                  <Text>Ver más</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square large source={require('../assets/salida.jpg')} />
              </Left>
              <Body>
                <Text style={{fontWeight:'bold'}}>Salida de mercancía</Text>
                <Text style={{fontStyle:'italic'}}note numberOfLines={2}>Registre las salidas de sus productos</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => navigation.navigate('Output')}>
                  <Text>Ver más</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          </Content>
      </Container>
    );
}
export default Home