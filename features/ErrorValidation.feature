Feature: Error Validation

    @Validation
    Scenario Outline: Login to application with wrong details
        Given login to application with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username     | password    |
            | rahulshetty  | learning    |
            | hello        | working     |