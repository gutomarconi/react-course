import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.9,
    meat: 1.4
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios.get("https://react-myburger-17eb3.firebaseio.com/ingredient.json")
        .then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {this.setState({error: true})});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinuedHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer : {
                name: 'Gustavo',
                address: {
                    street: 'Lebanon',
                    postcode: 'SW18',
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'motoboy'
        };
        axios.post('/orders.json', order)
            .then(respose => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredient = (type) => {
        let count = this.state.ingredients[type];
        count += 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count;

        const priceAdd = INGREDIENTS_PRICE[type];
        let newTotalPrice = this.state.totalPrice;
        newTotalPrice += priceAdd;

        this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

        let test = encodeURIComponent(JSON.stringify({"=": "1555555555"}));
        console.log(test);
    };

    removeIngredient = (type) => {
        let count = this.state.ingredients[type];
        if (count !== 0) {
            count -= 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = count;

            const priceAdd = INGREDIENTS_PRICE[type];
            let newTotalPrice = this.state.totalPrice;
            newTotalPrice -= priceAdd;

            this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients})
            this.updatePurchaseState(updatedIngredients);
        }
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (
                <Auxiliar>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredient}
                        ingredientRemoved={this.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Auxiliar>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                totalPrice={this.state.totalPrice}/>;

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Auxiliar>
                <Modal showModal={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliar>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
