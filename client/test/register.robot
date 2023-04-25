*** Settings ***
Library    SeleniumLibrary
Resource    ./commonKeywords.robot
Test Teardown    Close All Browsers

*** Variables ***
${VALID_USERNAME}                         ValidUsername123
${INVALID_LONG_USERNAME}                  ThisUsernameIsLongerThan40CharactersAndInvalid123
${INVALID_USERNAME_WITH_SPECIAL_CHARS}    InvalidUsername@!
${DUPLICATE_USERNAME}                     DuplicateUsername123
${VALID_EMAIL}                            valid.email@example.com
${INVALID_EMAIL}                          invalid_email@example
${DUPLICATE_EMAIL}                        duplicate.email@example.com
${VALID_PASSWORD}                         ValidPassword1@
${INVALID_SHORT_PASSWORD}                 Short1!
${INVALID_LONG_PASSWORD}                  ThisPasswordIsLongerThan40CharactersAndInvalid1234567890!
${INVALID_NO_UPPERCASE_PASSWORD}          invalidpassword1@
${INVALID_NO_DIGIT_OR_SPECIAL_PASSWORD}   InvalidPassword
${VALID_CONFIRMED_PASSWORD}               ValidPassword1@
${INVALID_CONFIRMED_PASSWORD}             InvalidPassword1@
${EMPTY_FIRST_NAME}                       ${EMPTY}
${INVALID_SHORT_FIRST_NAME}               A
${INVALID_LONG_FIRST_NAME}                ThisFirstNameIsLongerThan40CharactersAndInvalid
${INVALID_NON_ALPHABETIC_FIRST_NAME}      FirstName1
${VALID_FIRST_NAME}                       John
${EMPTY_LAST_NAME}                        ${EMPTY}
${INVALID_SHORT_LAST_NAME}                L
${INVALID_LONG_LAST_NAME}                 ThisLastNameIsLongerThan40CharactersAndInvalid
${INVALID_NON_ALPHABETIC_LAST_NAME}       LastName1
${VALID_LAST_NAME}                        Doe
${EMPTY_BIRTHDATE}                        ${EMPTY}
${INVALID_FUTURE_BIRTHDATE}               2050-01-01
${VALID_BIRTHDATE}                        2000-01-01
${EMPTY_GENDER}                           ${EMPTY}
${VALID_GENDER_MALE}                      Male
${VALID_GENDER_FEMALE}                    Female
${VALID_GENDER_NON_BINARY}                Non-binary
${EMPTY_PHONE_NUMBER}                     ${EMPTY}
${INVALID_SHORT_PHONE_NUMBER}             01234567
${INVALID_LONG_PHONE_NUMBER}              01234567890
${INVALID_NON_NUMERIC_PHONE_NUMBER}       01a23b4567
${DUPLICATE_PHONE_NUMBER}                 0123456789
${VALID_PHONE_NUMBER}                     0987654321
${INVALID_GPAX_NON_FLOAT}                 3.4a
${INVALID_NEGATIVE_GPAX}                  -1.00
${INVALID_HIGH_GPAX}                      4.01
${VALID_GPAX}                             3.50
${LONG_SCHOOL_UNIVERSITY}                 ThisIsALongSchoolOrUniversityNameWithMoreThan100CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_SCHOOL_UNIVERSITY}                Example University
${INVALID_TARGET_NATION_WITH_SPECIAL}     United@Kingdom
${LONG_TARGET_NATION}                     ThisIsALongTargetNationNameWithMoreThan100CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_TARGET_NATION}                    United States
${INVALID_FIELD_OF_INTEREST_WITH_SPECIAL}  Field@of#Interest
${LONG_FIELD_OF_INTEREST}                  ThisIsALongFieldOfInterestNameWithMoreThan100CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_FIELD_OF_INTEREST}                 Computer Science
${INVALID_ORG_NAME}                        O
${LONG_ORG_NAME}                           ThisIsALongOrganizationNameWithMoreThan250CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_ORG_NAME}                          Example Organization
${INVALID_WEBSITE}                         w
${LONG_WEBSITE}                            ThisIsALongWebsiteAddressWithMoreThan250CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_WEBSITE}                           https://example-organization.com
${INVALID_ADDRESS}                         A
${LONG_ADDRESS}                            ThisIsALongAddressWithMoreThan250CharactersWhichIsNotValidAccordingToTheTestCaseDocument
${VALID_ADDRESS}                           123 Example Street, City, Country


*** Test Cases ***
# register system
# robot register.robot

Verify student information simple
    Set Selenium Speed     0.15 seconds     # SLOW SPEED
    Open registration page

    Input and verify username    input_username=StudentTest01%$*&
    Input and verify Email  input_email=StudentTest01$%*$%*$
    Input and verify Password    input_password=aaa
    Input and verify Confirm Password    input_confirm_password=aba
    Click register as student
    Verify username display error message    error=Username is invalid
    Verify email display error message    error=Email is invalid
    Verify password display error message    error=Password must be at least 8 characters
    Verify confirm password display error message    error=Password do not match!



####
    # Input and verify firstname    input_firstname=WigglePaw
    # Input and verify lastname    inputd_lastname=Scholar
    # # Input and verify birthdate    input_birthdate=02/01/2002     # FAIL
    # Input and verify gender    input_gender=Non-binary
    # Input and verify phoneNumber    input_phoneNumber=0819538124
    # Input and verify gpax    input_gpax=3.49
    # Input and verify degree    input_degree=High School
    # Input and verify school    input_school=SuperSchool
    # Input and verify program    input_program=Sci-Math
    # Input and verify targetNation    input_targetNation=Thailand
    # Input and verify fieldOfInterest    input_fieldOfInterest=Math
    # Input and verify typeOfScholarship    input_typeOfScholarship=Full Scholarship