*** Keywords ***
Login as student
    Wait Until Element Contains    xpath=//h3[contains(@class, 'MuiTypography-h3') and contains(text(), 'Login')]    Login
    Input text    name:usernameEmail   Student01
    Input text    name:password    Student01
    Click Button  id:button_login

Open edit profile
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiIconButton-root') and @aria-label='Account settings']
    Click Element    xpath=//button[contains(@class, 'MuiIconButton-root') and @aria-label='Account settings']
    Wait Until Element Is Visible    xpath=//a[@tabindex='0' and @href='/profile/edit']
    Click Element    xpath=//a[@tabindex='0' and @href='/profile/edit']
    Wait Until Element Is Visible    xpath=//h3[contains(@class, 'MuiTypography-h3') and text()='Update Information']

Input and verify firstname
    [Arguments]    ${selected_firstname}
    Clear Element Text    name:firstName
    Input text    name:firstName    ${selected_firstname}
    ${firstname}    Get Value    name:firstName
    Should Be Equal    ${firstname}     ${selected_firstname}

Input and verify lastname
    [Arguments]    ${selected_lastname}
    Clear Element Text    name:lastName
    Input text    name:lastName    ${selected_lastname}
    ${lastname}    Get Value    name:lastName
    Should Be Equal    ${lastname}      ${selected_lastname}

Input and verify birthdate
    [Arguments]    ${selected_birthdate}  
    Clear Element Text    name:birthdate
    Input text    name:birthdate    ${selected_birthdate}  
    ${birthdate}    Get Value    name:birthdate
    Should Be Equal    ${birthdate}     ${selected_birthdate}  

Input and verify gender       
    [Arguments]    ${selected_gender}
    Click Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${selected_gender}"]
    ${gender}    Get Text    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Should Be Equal    ${gender}    ${selected_gender}




