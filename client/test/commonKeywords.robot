*** Setting ***
Library    SeleniumLibrary
Resource    ./environment.robot

*** Variables ***
${USERNAME_FIELD}             name=username
${EMAIL_FIELD}                name=email
${PASSWORD_FIELD}             name=password
${CONFIRM_PASSWORD_FIELD}     name=cfpassword

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
${EMPTY_FIRST_NAME_ERROR}                 First Name is required
${SHORT_FIRST_NAME_ERROR}                 First Name must be at least 2 characters
${LONG_FIRST_NAME_ERROR}                  First Name must be at most 40 characters
${INVALID_FIRST_NAME_ERROR}               First Name is invalid
${EMPTY_LAST_NAME_ERROR}                  Last Name is required
${SHORT_LAST_NAME_ERROR}                  Last Name must be at least 2 characters
${LONG_LAST_NAME_ERROR}                   Last Name must be at most 40 characters
${INVALID_LAST_NAME_ERROR}                Last Name is invalid
${EMPTY_BIRTHDATE_ERROR}                  Birth date is required
${INVALID_BIRTHDATE_ERROR}                Birthdate is invalid
${EMPTY_GENDER_ERROR}                     Gender is required
${EMPTY_PHONE_NUMBER_ERROR}               Phone Number is required
${SHORT_PHONE_NUMBER_ERROR}               Phone Number must be at least 9 digits
${LONG_PHONE_NUMBER_ERROR}                Phone Number must be at most 10 digits
${INVALID_PHONE_NUMBER_ERROR}             Phone Number is invalid
${DUPLICATE_PHONE_NUMBER_ERROR}           Phone Number has been taken
${INVALID_GPAX_FORMAT_ERROR}              GPAX must be float number with 2 digits
${NEGATIVE_GPAX_ERROR}                    GPAX must be positive
${MAX_GPAX_ERROR}                         GPAX must be at most 4
${LONG_SCHOOL_UNIVERSITY_ERROR}           School/University must be at most 100 characters
${INVALID_TARGET_NATION_ERROR}            Target Nation is invalid
${LONG_TARGET_NATION_ERROR}               Target Nation must be at most 100 characters
${INVALID_FIELD_OF_INTEREST_ERROR}        Field of Interest is invalid
${LONG_FIELD_OF_INTEREST_ERROR}           Field of Interest must be at most 100 characters
${ORG_NAME_REQUIRED_ERROR}                Organization Name is required
${SHORT_ORG_NAME_ERROR}                   Organization Name must be at least 2 characters
${LONG_ORG_NAME_ERROR}                    Organization Name must be at most 250 characters
${WEBSITE_REQUIRED_ERROR}                 Website is required
${SHORT_WEBSITE_ERROR}                    Website must be at least 2 characters
${LONG_WEBSITE_ERROR}                     Website must be at most 250 characters
${ADDRESS_REQUIRED_ERROR}                 Address is required
${SHORT_ADDRESS_ERROR}                    Address must be at least 2 characters
${LONG_ADDRESS_ERROR}                     Address must be at most 250 characters

*** Keywords ***
Open registration page
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Wait Until Page Contains Element    ${USERNAME_FIELD}
    # Sleep    2

Click register as student
    Wait Until Element Is Visible    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Student')]
    Click Button    xpath=//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Register as Student')]


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
    Input Text    ${USERNAME_FIELD}    ${input_username}
    ${username}    Get Value    ${USERNAME_FIELD}
    Should Be Equal    ${username}     ${input_username}
    Verify String Data Type    ${username}

Input and verify Email
    [Arguments]     ${input_email}
    Input Text    ${EMAIL_FIELD}    ${input_email}
    ${email}    Get Value    ${EMAIL_FIELD}
    Should Be Equal    ${email}     ${input_email}
    Verify String Data Type    ${email}

Input and verify Password
    [Arguments]     ${input_password}
    Input Text    ${PASSWORD_FIELD}    ${input_password}
    ${password}    Get Value    ${PASSWORD_FIELD}
    Should Be Equal    ${password}     ${input_password}
    Verify String Data Type    ${password}

Input and verify Confirm Password
    [Arguments]     ${input_confirm_password}
    Input Text    ${CONFIRM_PASSWORD_FIELD}    ${input_confirm_password}
    ${confirm_password}    Get Value    ${CONFIRM_PASSWORD_FIELD}
    Should Be Equal    ${confirm_password}     ${input_confirm_password}
    Verify String Data Type    ${confirm_password}

Input and verify firstname
    [Arguments]    ${input_firstname}
    Input text    name:firstName    ${input_firstname}
    ${firstname}    Get Value    name:firstName
    Should Be Equal    ${firstname}     ${input_firstname}
    Verify String Data Type    ${firstname}

Input and verify lastname
    [Arguments]    ${input_lastname}
    Input text    name:lastName    ${input_lastname}
    ${lastname}    Get Value    name:lastName
    Should Be Equal    ${lastname}      ${input_lastname}
    Verify String Data Type    ${lastname}

Input and verify birthdate
    [Arguments]    ${input_birthdate}  
    Clear Element Text    name:birthdate
    Input text    name:birthdate    ${input_birthdate}  
    ${birthdate}    Get Value    name:birthdate
    Should Be Equal    ${birthdate}     ${input_birthdate}  

Input and verify gender
    [Arguments]    ${input_gender}
    # Scroll To Element    xpath=//input[@name='gender']/preceding-sibling::div[@role='button']
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
    Wait Until Element Contains    //*[@id=':rt:-helper-text']//*[@class='form-error-message']    ${error}

Verify lastname display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_49']//*[@class='form-error-message']    ${error}

Verify birdthdate display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify gender display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_3']//*[@class='form-error-message']    ${error}

Verify mobile display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify gpax display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify degree display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify school display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify program display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify target nation display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify field of interest display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify type of scholarship display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify organization name display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify website display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}

Verify address display error message
    [Arguments]    ${error}
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${error}