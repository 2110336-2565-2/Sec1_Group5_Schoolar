*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers
Resource    ./environment.robot
Resource    ./commonKeywords.robot

*** Test Cases ***
# account management system
# robot account_management.robot
Verify edit student information simple
    Set Selenium Speed     0.15 seconds     #SLOW SPEED
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window

    Login as student
    Open edit profile
    Input and verify firstname    selected_firstname=WigglePaw
    Input and verify lastname    selected_lastname=Scholar
    # Input and verify birthdate    selected_birthdate=15/03/2002     # FAIL
    Input and verify gender    selected_gender=Non-binary
    Input and verify phoneNumber    selected_phoneNumber=0819538124
    Input and verify gpax    selected_gpax=3.49
    Input and verify degree    selected_degree=High School
    Input and verify school    selected_school=SuperSchool
    Input and verify program    selected_program=Sci-Math
    Input and verify targetNation    selected_targetNation=Thailand
    Input and verify fieldOfInterest    selected_fieldOfInterest=Math
    Input and verify typeOfScholarship    selected_typeOfScholarship=Full Scholarship