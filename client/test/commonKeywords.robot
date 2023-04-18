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

Scroll To Element
    [Arguments]  ${locator}
    ${x}=        Get Horizontal Position  ${locator}
    ${y}=        Get Vertical Position    ${locator}
    Execute Javascript  window.scrollTo(${x}, ${y}-300)

Input and verify firstname
    [Arguments]    ${selected_firstname}
    Input text    name:firstName    ${selected_firstname}
    ${firstname}    Get Value    name:firstName
    Should Be Equal    ${firstname}     ${selected_firstname}

Input and verify lastname
    [Arguments]    ${selected_lastname}
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
    Scroll To Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Click Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${selected_gender}"]
    ${gender}    Get Text    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Should Be Equal    ${gender}    ${selected_gender}

Input and verify phoneNumber
    [Arguments]    ${selected_phoneNumber}
    Input text    name:phoneNumber    ${selected_phoneNumber}
    ${phoneNumber}    Get Value    name:phoneNumber
    Should Be Equal    ${phoneNumber}      ${selected_phoneNumber}

Input and verify gpax
    [Arguments]    ${selected_gpax}
    Input text    name:gpax    ${selected_gpax}
    ${gpax}    Get Value    name:gpax
    Should Be Equal    ${gpax}      ${selected_gpax}

Input and verify degree       
    [Arguments]    ${selected_degree}
    Scroll To Element    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Click Element    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${selected_degree}"]
    ${degree}    Get Text    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Should Be Equal    ${degree}    ${selected_degree}

Input and verify school
    [Arguments]    ${selected_school}
    Input text    name:school    ${selected_school}
    ${school}    Get Value    name:school
    Should Be Equal    ${school}      ${selected_school}

Input and verify program       
    [Arguments]    ${selected_program}
    Click Element    xpath=//input[@name='program']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${selected_program}"]
    ${program}    Get Text    xpath=//input[@name='program']/preceding-sibling::div[@role='button']
    Should Be Equal    ${program}    ${selected_program}

Input and verify targetNation
    [Arguments]    ${selected_targetNation}
    Scroll To Element    name:targetNation
    Input text    name:targetNation    ${selected_targetNation}
    ${targetNation}    Get Value    name:targetNation
    Should Be Equal    ${targetNation}      ${selected_targetNation}

Input and verify fieldOfInterest
    [Arguments]    ${selected_fieldOfInterest}
    Input text    name:fieldOfInterest    ${selected_fieldOfInterest}
    ${fieldOfInterest}    Get Value    name:fieldOfInterest
    Should Be Equal    ${fieldOfInterest}      ${selected_fieldOfInterest}

Input and verify typeOfScholarship       
    [Arguments]    ${selected_typeOfScholarship}
    Click Element    xpath=//input[@name='typeOfScholarship']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${selected_typeOfScholarship}"]
    ${typeOfScholarship}    Get Text    xpath=//input[@name='typeOfScholarship']/preceding-sibling::div[@role='button']
    Should Be Equal    ${typeOfScholarship}    ${selected_typeOfScholarship}

