*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers
Resource    ./environment.robot
Resource    ./commonKeywords.robot

*** Test Cases ***
Verify account management system
    [Tags]    All Input
    Set Selenium Speed     0.15 seconds
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window

    Login as student
    Open edit profile
    Input and verify firstname    selected_firstname=WigglePaw
    Input and verify lastname    selected_lastname=Scholar
    # Input and verify birthdate    selected_birthdate=15/03/2002
    Input and verify gender    selected_gender=Non-binary