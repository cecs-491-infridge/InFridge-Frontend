import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Body, Button, Col, Container, Grid, Header, Item, Input, Icon, Left, Right, Row, Text, Title, Content } from 'native-base';


export default class ProfileScreen extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Content>
            <Title>User Name</Title>
          </Content>
          <Right />
        </Header>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />

        <Grid>
          <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
            <Text style={{textAlignVertical: "center",textAlign: "center",}} >
              20 Contributions
            </Text>
          </Col>
          <Col style={{ backgroundColor: '#00CE9F', height: 200 }}>
            <Text style={{textAlignVertical: "center",textAlign: "center",}}>
              Love cooking Chinese food and baking!
            </Text>
          </Col>
          <Row style={{ backgroundColor: '#3498db', height: 200 }}>
          </Row>
          <Row style={{ backgroundColor: '#3498db', height: 200 }}>
          </Row>
        </Grid>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3498db",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});