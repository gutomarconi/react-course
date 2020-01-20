import React from 'react';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSumamary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>:
                    {props.ingredients[igKey]}
                </li>
            )
        });
    return (
        <Auxiliar>
            <h3>your order</h3>
            <p>Your ingredients are:</p>
            <ul>
                {ingredientSumamary}
            </ul>
            <p>Total Price: <strong> {props.totalPrice.toFixed(2)}</strong></p>
            <p>Checkout now?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>

        </Auxiliar>
    )
};

export default orderSummary;
