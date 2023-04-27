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

*** Test Cases ***
# register student system

# --------------------------------- FIRST PAGE ------------------------------------------------
# TC1-1
#     Set Selenium Speed                       0.15 seconds     # SLOW SPEED
#     Open registration page
#     Input and verify username                Student123
#     Input and verify Email                   student123@hotmail.com
#     Input and verify Password                Student123
#     Input and verify Confirm Password        Student123
#     Click register as student
#     Input and verify firstname               Student
#     Input and verify lastname                Student
#     Input and verify birthdate               21/04/2023
#     Input and verify gender                  Male
#     Input and verify phoneNumber             0123456789
#     Click next                                
#     Input and verify gpax                    1.23
#     Input and verify school                  ${EMPTY}
#     Input and verify targetNation            Thailand
#     Input and verify fieldOfInterest         Engineering
#     Click submit

TC1-2
    Set Selenium Speed                       0.15 seconds
    Open registration page
    Input and verify username                ${EMPTY}
    Input and verify Email                   ${EMPTY}
    Input and verify Password                ${EMPTY}
    Input and verify Confirm Password        Student123
    Click register as student
    Verify username display error message              ${EMPTY_USERNAME_ERROR}
    Verify email display error message                 ${EMPTY_EMAIL_ERROR}
    Verify password display error message              ${EMPTY_PASSWORD_ERROR}
    Verify confirm password display error message      ${CONFIRM_PASSWORD_MISMATCH_ERROR}

TC1-3
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123Student123Student123Student123Student123
    Input and verify Email                   Student123
    Input and verify Password                Stu123
    Input and verify Confirm Password        Stu123
    Click register as student
    Verify username display error message              ${LONG_USERNAME_ERROR}
    Verify email display error message                 ${INVALID_EMAIL_ERROR}
    Verify password display error message              ${SHORT_PASSWORD_ERROR}

TC1-4
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123&
    Input and verify Email                   Student01@Student01.com   # email of Student01 in DB
    Input and verify Password                Student123Student123Student123Student123Student123
    Input and verify Confirm Password        Student123Student123Student123Student123Student123
    Click register as student
    Verify username display error message              ${INVALID_USERNAME_ERROR}
    Verify email display error message                 ${DUPLICATE_EMAIL_ERROR}
    Verify password display error message              ${LONG_PASSWORD_ERROR}

TC1-5
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student@hotmail.com
    Input and verify Password                admin1234
    Input and verify Confirm Password        admin1234
    Click register as student
    Verify password display error message              ${NO_UPPERCASE_PASSWORD_ERROR}

TC1-6
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student01 
    Input and verify Email                   student@hotmail.com
    Input and verify Password                Adminadmin
    Input and verify Confirm Password        Adminadmin
    Click register as student
    Verify username display error message              ${DUPLICATE_USERNAME_ERROR}
    Verify password display error message              ${NO_DIGIT_OR_SPECIAL_PASSWORD_ERROR}

# --------------------------------- SECOND PAGE ------------------------------------------------
TC1-7
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               ${EMPTY}
    Input and verify lastname                ${EMPTY}
    Input and verify birthdate               ${EMPTY}
    Input and verify gender                  ${EMPTY}
    Input and verify phoneNumber             ${EMPTY}
    Click next
    Verify firstName display error message       ${EMPTY_FIRST_NAME_ERROR}
    Verify lastName display error message        ${EMPTY_LAST_NAME_ERROR}
    Verify birdthdate display error message      ${EMPTY_BIRTHDATE_ERROR}
    Verify gender display error message          ${EMPTY_GENDER_ERROR}
    Verify phoneNumber display error message     ${EMPTY_PHONE_NUMBER_ERROR}

TC1-8
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               S
    Input and verify lastname                S
    Input and verify birthdate               21/04/2300
    Input and verify gender                  Male
    Input and verify phoneNumber             01234567
    Click next
    Verify firstName display error message       ${SHORT_FIRST_NAME_ERROR}
    Verify lastName display error message        ${SHORT_LAST_NAME_ERROR}
    Verify birdthdate display error message      ${INVALID_BIRTHDATE_ERROR}
    Verify phoneNumber display error message     ${SHORT_PHONE_NUMBER_ERROR}

TC1-9
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               sssssssssssssssssssssssssssssssssssssssss
    Input and verify lastname                sssssssssssssssssssssssssssssssssssssssss
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             0123452323   #phone number of Student01 in DB
    Click next
    Verify firstName display error message       ${LONG_FIRST_NAME_ERROR}
    Verify lastName display error message        ${LONG_LAST_NAME_ERROR}
    Verify phoneNumber display error message     ${DUPLICATE_PHONE_NUMBER_ERROR}

TC1-10
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student123
    Input and verify lastname                Student123
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             382492AA11
    Click next
    Verify firstName display error message       ${INVALID_FIRST_NAME_ERROR}
    Verify lastName display error message        ${INVALID_LAST_NAME_ERROR}
    Verify phoneNumber display error message     ${INVALID_PHONE_NUMBER_ERROR}

TC1-11
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student123
    Input and verify lastname                Student123
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             01234567890
    Click next
    Verify firstName display error message       ${INVALID_FIRST_NAME_ERROR}
    Verify lastName display error message        ${INVALID_LAST_NAME_ERROR}
    Verify phoneNumber display error message     ${LONG_PHONE_NUMBER_ERROR}

# --------------------------------- THIRD PAGE ------------------------------------------------
TC1-12
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student
    Input and verify lastname                Student
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             0123456789
    Click next
    Input and verify gpax                    S
    Input and verify school                  ${EMPTY}
    Input and verify targetNation            Thailand$
    Input and verify fieldOfInterest         Engineering$
    Verify gpax display error message               ${INVALID_GPAX_FORMAT_ERROR}
    Verify targetNation display error message       ${INVALID_TARGET_NATION_ERROR}
    Verify fieldOfInterest display error message    ${INVALID_FIELD_OF_INTEREST_ERROR}

TC1-13
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student
    Input and verify lastname                Student
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             0123456789
    Click next
    Input and verify gpax                    4.23
    Input and verify school                  ${EMPTY}
    Input and verify targetNation            sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Input and verify fieldOfInterest         Engineering
    Verify gpax display error message               ${MAX_GPAX_ERROR}
    Verify targetNation display error message       ${LONG_TARGET_NATION_ERROR}

TC1-14
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student
    Input and verify lastname                Student
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             0123456789
    Click next
    Input and verify gpax                    1.23
    Input and verify school                  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Input and verify targetNation            Thailand
    Input and verify fieldOfInterest         sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Verify school display error message             ${LONG_SCHOOL_UNIVERSITY_ERROR}
    Verify fieldOfInterest display error message    ${LONG_FIELD_OF_INTEREST_ERROR}

TC1-15
    Set Selenium Speed                       0.15 seconds 
    Open registration page
    Input and verify username                Student123
    Input and verify Email                   student123@hotmail.com
    Input and verify Password                Student123
    Input and verify Confirm Password        Student123
    Click register as student
    Input and verify firstname               Student
    Input and verify lastname                Student
    Input and verify birthdate               21/04/2002
    Input and verify gender                  Male
    Input and verify phoneNumber             0123456789
    Click next
    Input and verify gpax                    -1.23
    Input and verify school                  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Input and verify targetNation            Thailand
    Input and verify fieldOfInterest         sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    Verify gpax display error message               ${NEGATIVE_GPAX_ERROR}
    Verify school display error message             ${LONG_SCHOOL_UNIVERSITY_ERROR}
    Verify fieldOfInterest display error message    ${LONG_FIELD_OF_INTEREST_ERROR}
