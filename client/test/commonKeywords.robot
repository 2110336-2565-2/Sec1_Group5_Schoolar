*** Setting ***
Library    SeleniumLibrary
Resource    ./environment.robot

*** Keywords ***
Open registration page
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Wait Until Page Contains Element    name:username
    # Sleep    2

Click register as student
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Student')]
    Click Button    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Student')]

Click register as provider
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Provider')]
    Click Button    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Provider')]

Click next
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Next')]
    Click Button    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Next')]

Click submit
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Submit')]
    Click Button    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Submit')]

# Register as student
#     Wait Until Element Contains    xpath=//h3[contains(@class, 'MuiTypography-h3') and contains(text(), 'Login')]    Login
#     Input text    name:usernameEmail   Student01
#     Input text    name:password    Student01
#     Click Button  id:button_login

Scroll To Element
    [Arguments]  ${locator}
    ${x}=        Get Horizontal Position  ${locator}
    ${y}=        Get Vertical Position    ${locator}
    Execute Javascript  window.scrollTo(${x}, ${y}-300)
    Sleep    0.15    # wait until scroll done

Verify String Data Type
    [Arguments]    ${data}
    ${data_type} =    Evaluate    type($data).__name__
    Should Be Equal    ${data_type}    str    msg="Expected data type 'str', but got '${data_type}'"

Verify integer Data Type
    [Arguments]    ${data}
    ${data_type} =    Evaluate    type($data).__name__
    Should Be Equal    ${data_type}    int    msg="Expected data type 'int', but got '${data_type}'"

Input and verify username
    [Arguments]     ${input_username}
    Input Text    name:username    ${input_username}
    ${username}    Get Value    name:username
    Should Be Equal    ${username}    ${input_username}
    # Verify String Data Type    ${username}

Input and verify Email
    [Arguments]     ${input_email}
    Input Text    name:email    ${input_email}
    ${email}    Get Value    name:email
    Should Be Equal    ${email}    ${input_email}
    # Verify String Data Type    ${email}

Input and verify Password
    [Arguments]     ${input_password}
    Input Text    name:password    ${input_password}
    ${password}    Get Value    name:password
    Should Be Equal    ${password}    ${input_password}
    # Verify String Data Type    ${password}

Input and verify Confirm Password
    [Arguments]     ${input_confirm_password}
    Input Text    name:cfpassword    ${input_confirm_password}
    ${confirm_password}    Get Value    name:cfpassword
    Should Be Equal    ${confirm_password}    ${input_confirm_password}
    # Verify String Data Type    ${confirm_password}

Input and verify firstname
    [Arguments]    ${input_firstname}
    Input text    name:firstName    ${input_firstname}
    ${firstname}    Get Value    name:firstName
    Should Be Equal    ${firstname}     ${input_firstname}
    # Verify String Data Type    ${firstname}

Input and verify lastname
    [Arguments]    ${input_lastname}
    Input text    name:lastName    ${input_lastname}
    ${lastname}    Get Value    name:lastName
    Should Be Equal    ${lastname}      ${input_lastname}
    # Verify String Data Type    ${lastname}

Input and verify birthdate
    [Arguments]    ${input_birthdate}  
    Clear Element Text    name:birthdate
    Input text    name:birthdate    ${input_birthdate}  
    ${birthdate}    Get Value    name:birthdate
    Should Be Equal    ${birthdate}     ${input_birthdate}  

Input and verify gender
    [Arguments]    ${input_gender}
    Scroll To Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Click Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${input_gender}"]
    ${gender}    Get Text    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
    Should Be Equal    ${gender}    ${input_gender}

Input and verify phoneNumber
    [Arguments]    ${input_phoneNumber}
    Input text    name:phoneNumber    ${input_phoneNumber}
    ${phoneNumber}    Get Value    name:phoneNumber
    Should Be Equal    ${phoneNumber}      ${input_phoneNumber}

Input and verify gpax
    [Arguments]    ${input_gpax}
    Input text    name:gpax    ${input_gpax}
    ${gpax}    Get Value    name:gpax
    Should Be Equal    ${gpax}      ${input_gpax}

Input and verify degree       
    [Arguments]    ${input_degree}
    Scroll To Element    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Click Element    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${input_degree}"]
    ${degree}    Get Text    xpath=//input[@name='degree']/preceding-sibling::div[@role='button']
    Should Be Equal    ${degree}    ${input_degree}

Input and verify school
    [Arguments]    ${input_school}
    Input text    name:school    ${input_school}
    ${school}    Get Value    name:school
    Should Be Equal    ${school}      ${input_school}

Input and verify program       
    [Arguments]    ${input_program}
    Click Element    xpath=//input[@name='program']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${input_program}"]
    ${program}    Get Text    xpath=//input[@name='program']/preceding-sibling::div[@role='button']
    Should Be Equal    ${program}    ${input_program}

Input and verify targetNation
    [Arguments]    ${input_targetNation}
    Scroll To Element    name:targetNation
    Input text    name:targetNation    ${input_targetNation}
    ${targetNation}    Get Value    name:targetNation
    Should Be Equal    ${targetNation}      ${input_targetNation}

Input and verify fieldOfInterest
    [Arguments]    ${input_fieldOfInterest}
    Input text    name:fieldOfInterest    ${input_fieldOfInterest}
    ${fieldOfInterest}    Get Value    name:fieldOfInterest
    Should Be Equal    ${fieldOfInterest}      ${input_fieldOfInterest}

Input and verify typeOfScholarship       
    [Arguments]    ${input_typeOfScholarship}
    Click Element    xpath=//input[@name='typeOfScholarship']/preceding-sibling::div[@role='button']
    Click Element    xpath=//li[@data-value="${input_typeOfScholarship}"]
    ${typeOfScholarship}    Get Text    xpath=//input[@name='typeOfScholarship']/preceding-sibling::div[@role='button']
    Should Be Equal    ${typeOfScholarship}    ${input_typeOfScholarship}

Input and verify organizationName
    [Arguments]    ${input_organizationName}
    Scroll To Element    name:organizationName
    Input text    name:organizationName    ${input_organizationName}
    ${organizationName}    Get Value    name:organizationName
    Should Be Equal    ${organizationName}      ${input_organizationName}

Input and verify website
    [Arguments]    ${input_website}
    Scroll To Element    name:website
    Input text    name:website    ${input_website}
    ${website}    Get Value    name:website
    Should Be Equal    ${website}      ${input_website}

Input and verify address
    [Arguments]    ${input_address}
    Scroll To Element    name:address
    Input text    name:address    ${input_address}
    ${address}    Get Value    name:address
    Should Be Equal    ${address}      ${input_address}

Verify username display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='username']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify email display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='email']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify password display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='password']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify confirm password display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='cfpassword']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify firstname display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='firstName']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify lastname display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='lastName']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify birdthdate display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='birthdate']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify gender display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='gender']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify phoneNumber display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='phoneNumber']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify gpax display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='gpax']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify degree display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='degree']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify school display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='school']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify program display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='program']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify targetNation display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='targetNation']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify fieldOfInterest display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='fieldOfInterest']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify typeOfScholarship display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='typeOfScholarship']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify organizationName display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='organizationName']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify website display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //input[@name='website']/following::p
    Should Be Equal    ${error}      ${error_message}

Verify address display error message
    [Arguments]    ${error}
    ${error_message}    Get Text    //textarea[@name='address']/following::p
    Should Be Equal    ${error}      ${error_message}