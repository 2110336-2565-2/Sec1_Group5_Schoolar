*** Settings ***
Library    SeleniumLibrary
Resource    ./commonKeywords.robot
Test Teardown    Close All Browsers

*** Variables ***
# -------------------------------- RESPONSE MESSAGE ---------------------------------------------------
${EMPTY_USERNAME_ERROR}                   Username is required
${LONG_USERNAME_ERROR}                    Username must be at most 40 characters
${INVALID_USERNAME_ERROR}                 Username is invalid
${DUPLICATE_USERNAME_ERROR}               Username has been taken
${EMPTY_EMAIL_ERROR}                      Email is required
${INVALID_EMAIL_ERROR}                    Email is invalid
${DUPLICATE_EMAIL_ERROR}                  Email has been taken
${EMPTY_PASSWORD_ERROR}                   Password is required
${SHORT_PASSWORD_ERROR}                   Password must be at least 8 characters
${LONG_PASSWORD_ERROR}                    Password must be at most 40 characters
${NO_UPPERCASE_PASSWORD_ERROR}            Password must have at least one uppercase letter
${NO_DIGIT_OR_SPECIAL_PASSWORD_ERROR}     Password must have at least one digit number or special character
${CONFIRM_PASSWORD_MISMATCH_ERROR}        Password do not match!
${EMPTY_PHONE_NUMBER_ERROR}               Phone Number is required
${SHORT_PHONE_NUMBER_ERROR}               Phone Number must be at least 9 digits
${LONG_PHONE_NUMBER_ERROR}                Phone Number must be at most 10 digits
${INVALID_PHONE_NUMBER_ERROR}             Phone Number is invalid
${DUPLICATE_PHONE_NUMBER_ERROR}           Phone Number has been taken
${ORG_NAME_REQUIRED_ERROR}                Organization Name is required
${SHORT_ORG_NAME_ERROR}                   Organization Name must be at least 2 characters
${LONG_ORG_NAME_ERROR}                    Organization Name must be at most 250 characters
${WEBSITE_REQUIRED_ERROR}                 Website is required
${SHORT_WEBSITE_ERROR}                    Website must be at least 2 characters
${LONG_WEBSITE_ERROR}                     Website must be at most 250 characters
${ADDRESS_REQUIRED_ERROR}                 Address is required
${SHORT_ADDRESS_ERROR}                    Address must be at least 2 characters
${LONG_ADDRESS_ERROR}                     Address must be at most 255 characters

*** Test Cases ***
# register provider system

# TC1-16
#     Set Selenium Speed                       0.15 seconds     
#     Open registration page
#     Input and verify username                Provider123
#     Input and verify Email                   Provider123@hotmail.com
#     Input and verify Password                Provider123
#     Input and verify Confirm Password        Provider123
#     Click register as provider                      
#     Input and verify organizationName        Provider
#     Input and verify website                 https://www.mycourseville.com/
#     Input and verify phoneNumber             0123456798
#     Input and verify address                 254 Phayathai Road, Pathumwan, Bangkok 10330 Thailand
#     Click submit

TC1-17
    # Set Selenium Speed                       0.15 seconds     
    Open registration page
    Input and verify username                Provider123
    Input and verify Email                   Provider123@hotmail.com
    Input and verify Password                Provider123
    Input and verify Confirm Password        Provider123
    Click register as provider                      
    Input and verify organizationName        ${EMPTY}
    Input and verify website                 ${EMPTY}
    Input and verify phoneNumber             ${EMPTY}
    Input and verify address                 ${EMPTY}
    Click submit
    Verify organizationName display error message        ${ORG_NAME_REQUIRED_ERROR}
    Verify website display error message                 ${WEBSITE_REQUIRED_ERROR}
    Verify phoneNumber display error message             ${EMPTY_PHONE_NUMBER_ERROR}
    Verify address display error message                 ${ADDRESS_REQUIRED_ERROR}

TC1-18
    # Set Selenium Speed                       0.15 seconds     
    Open registration page
    Input and verify username                Provider123
    Input and verify Email                   Provider123@hotmail.com
    Input and verify Password                Provider123
    Input and verify Confirm Password        Provider123
    Click register as provider                      
    Input and verify organizationName        p
    Input and verify website                 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Input and verify phoneNumber             01234567
    Input and verify address                 p
    Click submit
    Verify organizationName display error message        ${SHORT_ORG_NAME_ERROR}
    Verify website display error message                 ${LONG_WEBSITE_ERROR}
    Verify phoneNumber display error message             ${SHORT_PHONE_NUMBER_ERROR}
    Verify address display error message                 ${SHORT_ADDRESS_ERROR}

TC1-19
    # Set Selenium Speed                       0.15 seconds     
    Open registration page
    Input and verify username                Provider123
    Input and verify Email                   Provider123@hotmail.com
    Input and verify Password                Provider123
    Input and verify Confirm Password        Provider123
    Click register as provider                      
    Input and verify organizationName        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Input and verify website                 ${EMPTY}
    Input and verify phoneNumber             012345678999
    Input and verify address                 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssppppp
    Click submit
    Verify organizationName display error message        ${LONG_ORG_NAME_ERROR}
    Verify website display error message                 ${WEBSITE_REQUIRED_ERROR}
    Verify phoneNumber display error message             ${LONG_PHONE_NUMBER_ERROR}
    Verify address display error message                 ${LONG_ADDRESS_ERROR}

TC1-20
    # Set Selenium Speed                       0.15 seconds     
    Open registration page
    Input and verify username                Provider123
    Input and verify Email                   Provider123@hotmail.com
    Input and verify Password                Provider123
    Input and verify Confirm Password        Provider123
    Click register as provider                      
    Input and verify organizationName        p
    Input and verify website                 a
    Input and verify phoneNumber             01234567y
    Input and verify address                 p
    Click submit
    Verify organizationName display error message        ${SHORT_ORG_NAME_ERROR}
    Verify website display error message                 ${SHORT_WEBSITE_ERROR}
    Verify phoneNumber display error message             ${INVALID_PHONE_NUMBER_ERROR}
    Verify address display error message                 ${SHORT_ADDRESS_ERROR}

TC1-21
    # Set Selenium Speed                       0.15 seconds     
    Open registration page
    Input and verify username                Provider123
    Input and verify Email                   Provider123@hotmail.com
    Input and verify Password                Provider123
    Input and verify Confirm Password        Provider123
    Click register as provider                      
    Input and verify organizationName        p
    Input and verify website                 a
    Input and verify phoneNumber             0123452323   #phone number of Student01 in DB
    Input and verify address                 p
    Click submit
    Verify organizationName display error message        ${SHORT_ORG_NAME_ERROR}
    Verify website display error message                 ${SHORT_WEBSITE_ERROR}
    Verify phoneNumber display error message             ${DUPLICATE_PHONE_NUMBER_ERROR}
    Verify address display error message                 ${SHORT_ADDRESS_ERROR}
