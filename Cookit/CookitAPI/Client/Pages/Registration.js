﻿//משתנים גלובליים
//רשימת הערים ממסד הנתונים
var arry_city = new Array();
//דגל האם כבר הבנו את הערים
var isCity = false;
//האם למשתמש יש פרופיל
var isHasProfile = false;
//האם נתוני ההרשמה תקינים
var password_valitadion = false;
var form_validation = false;
// רשימת סוגי המשתמשים
var arry_userType = new Array();
//***************************************************************************//
// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    // הבאת סוגי המשתמשים
    GetUserType();
});
//***************************************************************************//
function GetUserType() // הפונקציה מביאה את סוגי המשתמשים מהמסד נתונים
{
    GlobalAjax("/api/UserType", "GET", "", SuccessUserType, FailUserType);
}

function SuccessUserType(arry_userType) {
    sessionStorage.setItem("arry_userType", arry_userType);//JSON.stringify(arry_userType));
    initUserType(arry_userType);
}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.');
}
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initUserType(data) {
    var str;
    for (i in data) {
        if (data[i].user_type !== "מנהל")
            $("#select_user_type").append(AddOption_UserType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_UserType(item) {
    return '<option value="' + item.id + '">' + item.user_type + '</option>';
}
//***************************************************************************//
function GetCities() {
    if (isCity === false)     //כדי שיקרא רק פעם אחת
    {
        isCity = true;
        // קריאה לפונקצית ajax של Get מהשרת עבור נתוני cities
        GlobalAjax("/api/City", "GET", "", SuccessCity, FailCity);
    }
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("arry_city", JSON.stringify(arry_city));
    initCities(arry_city);
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initCities(data) {
    var str;
    for (i in data) {
        $("#select_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

//***************************************************************************//
// פונקציה שבודקת האם הלקוח הוא מסוג שדורש פרופיל
// אם כן - מציגה בטופס את החלק אותו צריך למלא
function IsProfile() {
    //var user_type = $("input[name='user_type']:checked").val();
    var user_type = $('#select_user_type').find(":selected").text();
    if(user_type === "אנין טעם" || user_type === "עסקי") 
    {
        isHasProfile = true;
        //הבאת הערים ממסד הנתונים
        GetCities();
        //הצגת פרטי הפרופיל
        document.getElementById("div_Profile_details").style.display = "block";
        //$("#div_Profile_details").style.display = "block";
        // location.reload(); // טעינת הדף מחדש
        document.getElementById("div_Profile_details").reload;
    }
    else {
        isHasProfile = false;
        document.getElementById("div_Profile_details").style.display  = "none";
        document.getElementById("div_Profile_details").reload; // טעינת הדף מחדש
    }
}
//***************************************************************************//
function IsFormValid() // הפונקציה בודקת הנתוני הטופס תקינים 
{
    // פרטים איישים
    let personalData = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        gender: $("input[name='gender']:checked").val(),
        pasword: $("#password").val(),
        pass2: $("#password_authentication").val(),
        user_type: $('#select_user_type').find(":selected").val()
    };
    let i = 0;
    let flag = false;
    while (i < personalData.length && form_validation === true) {
        if (personalData[i].val() === "") {
            form_validation = false;
            alert('אנא מלא את הפרטים האיישים.');
        }
        else
            i++;
    }
    if (i === personalData.length)
        flag = true;
    if (flag === true) {
        if (personalData.pasword !== personalData.pass2) {
            form_validation = false;
            alert('אנא וודא שהסיסמה זהה לאימות הסיסמה');
        }
    if (personalData.user_type !== "יצירתי") //אם יש גם פרופיל
    {
        //פרטי פרופיל
        let profilelData = {
            name: $("#profile_name").val(),
            deskription: $("#profile_description").val(),
            city: $("#select_city").find(":selected").val(),
            type: $('#select_user_type').find(":selected").val()
        };
        let i = 0;
        while (i < profilelData.length && form_validation === true) {
            if (profilelData[i].val() === null) {
                form_validation = false;
                alert('אנא מלא את פרטי הפרופיל .');
            }
            else
                i++;
        }
        form_validation = true;
    }
    else
        form_validation = true;
    }
    }

//***************************************************************************//
//פונקצית הרשמה
function Regitration() {
    //בדיקת תאימות סיסמאות
    //CheckPassword();
    IsFormValid();
    if (password_valitadion === true) {
        //הוספת משתמש חדש
        AddNewUser();
        //הוספת פרופיל חדש
        if (isHasProfile === true)
            AddNewProfile();
    }
    else
        alert("אנא וודא שהסיסמה זהה לאימות סיסמה.");
 }
//***************************************************************************//
/*function CheckPassword() // פונקציה בודקת שהסיסמה זהה לאימות סיסמה
{
    let pass1 = $("#password").val();
    let pass2 = $("#password_authentication").val();
    if (pass1 === pass2)
        password_valitadion = true;
    else {
        password_valitadion = false;
        //alert("אנא וודא שהסיסמה זהה לאימות סיסמה.");
  }    
}
*/


//***************************************************************************//

function AddNewUser()// הפונקציה שולחת את פרטי המשתמש לשרת
{
    IsFormValid();
    if (form_validation === true) {
        //משתמש חדש
        var new_user = {
            user_type: $('#select_user_type').find(":selected").val(),//$("input[name='user_type']:checked").val(),
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            gender: $("input[name='gender']:checked").val(),
            pasword: $("#password").val(),
            status: true,
            number_of_draw_recipe: 0
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/User", "POST", JSON.stringify(new_user), SuccessUser, FailUser);
    }
}

function SuccessUser() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log("המשתמש נוסף לשרת בהצלחה.");
}

function FailUser()// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בהוספת המשתמש לשרת.");
    alert('שגיאה בהוספת המשתמש לשרת.');
}
//***************************************************************************//
function AddNewProfile()// הפונקציה שולחת את פרטי משתמש לשרת
{
    var user_type = $('#select_user_type').find(":selected").text();
    if (user_type === "אנין טעם" || user_type === "עסקי") 
    var profile_type = ("input[name='user_type']:checked").val(); // סוג פרופיל
    let _type;
    if (profile_type === 'משתמש עסקי')
        _type = 'B';
    else 
        _type = 'F';    
    //פרופיל חדש
    var new_profile = {
        id: 1,
        user_id: 1,
        type: _type,
        name: $("#profile_name").val(),
        deskription: $("#profile_description").val(),
        city: $("#select_city").options[$("#select_city").selectedIndex].value,
        status: true
    };
    //שליחת הנתונים לשרת
    GlobalAjax("/api/Profile", "POST", JSON.stringify(new_profile), SuccessProfile, FailProfile);
}

function SuccessProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של פרופיל
{
    console.log("הפרופיל נוסף לשרת בהצלחה.");
}

function FailProfile()// פונקציה המתבצעת אחרי כישלון הוספה  של פרופיל
{
    console.log("שגיאה בהוספת הפרופיל לשרת.");
    alert('שגיאה בהוספת הפרופיל לשרת.');
}