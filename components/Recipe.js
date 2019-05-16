import React from 'react';
import { View } from 'react-native';
import { Body, Button, Card, Container, Header, Icon, Content, Left, List, ListItem, Right, Text, Separator } from 'native-base'


class Recipe extends React.Component {
    constructor(props) {
        super(props);
        //console.log("trying to print console")
        //console.log(this.props)
    }

    onComponentDidMount() {
        console.log(this.props.recipe)

    }

    onOpenSpecificRecipe = () => {
        this.props.onClick(this.props.recipe.id);
        // this.props.navigation.navigate('SpecificRecipe', {
        //     id: this.props.recipe.id})
    };

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    render() {
        return (


            <Content>
                <ListItem button onPress={this.onOpenSpecificRecipe} title="Recipe">
                    <Left>
                        <Icon
                            type="MaterialCommunityIcons"
                            name='bowl'
                        //heart
                        />
                        <Text>{this.Capitalize(this.props.recipe.title)}{"\n"}
                        </Text>

                    </Left>
                </ListItem>
            </Content>
        );
    }
}
export default Recipe;