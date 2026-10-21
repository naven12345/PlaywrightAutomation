Feature: Ecommerce validations

    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "selenium@hello.com" and "Rahul@123"
        When Add "ZARA COAT 4" to cart
        Then Verify 'ZARA COAT 3' is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the order history page

    @Validation
    Scenario Outline: Login to application with wrong details
        Given login to application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username    | password |
            | rahulshetty | learning |
            | hello       | working  |