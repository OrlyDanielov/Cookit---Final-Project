﻿//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************//רשימת הערים ממסד הנתונים
var ARRY_CITY = null;
var ARRY_USER_TYPE = null;
var ARRY_REGION = null;

var isHasProfile = false;

var USER_VALIDATION = {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    password_authentication:false,
    user_type:false
};
var PROFILE_VALIDATION = {
    name: false,
    description: false,
    city: false,
    region: false,
    img: false
};
var PROFILE_ID;
//תז משתמש
//var user_id;
//*******************************************************************************************
// UPLOAD PAGE
//*******************************************************************************************
// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    // הבאת סוגי המשתמשים
    GetUserType();
});

//*******************************************************************************************
// INIT DATA INTO DROP DOWN LIST
//*******************************************************************************************
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function EnterData2DDList(arry, ddList) {
    document.getElementById(ddList).innerHTML = "";
    for (i in arry) {
        $("#" + ddList).append(AddOption(arry[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption(item) {
    var values = Object.values(item);//Object.keys(item);
    var x = values[0];
    var y = values[1];
    return '<option value="' + x + '">' + y + '</option>';
}
//*******************************************************************************************
// GET USER TYPE
//*******************************************************************************************
function GetUserType()
// הפונקציה מביאה את סוגי המשתמשים מהמסד נתונים
{
    //if (JSON.parse(sessionStorage.getItem('ARRY_USER_TYPE')) == null)
    // כדי לקורא רק פעם אחת
    //{
        GlobalAjax("/api/UserType/GetAll", "GET", "", SuccessUserType, FailUserType);
//    }
//    else
//        SuccessUserType(JSON.parse(sessionStorage.getItem('ARRY_USER_TYPE')));
}

function SuccessUserType(arry_userType) {
    console.log(ARRY_USER_TYPE);
    ARRY_USER_TYPE = arry_userType;  
    sessionStorage.setItem("ARRY_USER_TYPE", JSON.stringify(arry_userType));
    EnterData2DDList(ARRY_USER_TYPE, "user_type");

    GetCities();
}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.');
}
//*******************************************************************************************
// GET CITY
//*******************************************************************************************
function GetCities()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    //if (JSON.parse(sessionStorage.getItem('ARRY_CITY')) == null)
    // כדי לקורא רק פעם אחת
    //{
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    //}
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("ARRY_CITY", JSON.stringify(arry_city));
    ARRY_CITY = arry_city;
    EnterData2DDList(ARRY_CITY, "profile_city");

    GetRegions();
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}
//*******************************************************************************************
// GET REGION
//*******************************************************************************************
function GetRegions()
{
    //if (JSON.parse(sessionStorage.getItem('ARRY_REGION')) == null) {
        GlobalAjax("/api/Region/GetAllRegion", "GET", "", SuccessGetRegion, FailGetRegion);
    //}
}

function SuccessGetRegion(arry_region) {
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(arry_region));
    ARRY_REGION = arry_region;
    EnterData2DDList(ARRY_REGION, "profile_region");
}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}
//*******************************************************************************************
// IS HAS PROFILE
//*******************************************************************************************
// פונקציה שבודקת האם הלקוח הוא מסוג שדורש פרופיל
// אם כן - מציגה בטופס את החלק אותו צריך למלא
function IsProfile() {
    var user_type = $('#user_type').find(":selected").text();
    if(user_type === "אנין טעם") 
    {
        isHasProfile = true;
        GetCities();
        GetRegions();
        //הצגת פרטי הפרופיל       
        document.getElementById("Profile_details").style.display = "block";
    }
    else {
        isHasProfile = false;
        document.getElementById("Profile_details").style.display = "none";
    }
    document.getElementById("Profile_details").reload; // טעינת הדף מחדש

}

//*******************************************************************************************
// ShowCityByRegion
//*******************************************************************************************
function ShowCityByRegion()
// מציג את הערים השייכות למחוז שנבחר
{
    var region = $('#profile_region').find(":selected").val();
    if (region == "")
        $("#profile_city").prop('disabled', true);
    else {
        var cities2region = new Array();
        for (var i = 0; i < ARRY_CITY.length; i++) {
            if (ARRY_CITY[i].id_region == region)
                cities2region.push(ARRY_CITY[i]);
        }
        var city = document.getElementById("profile_city").length = 0;//.remove;
        $("#profile_city").prop('disabled', false);
        EnterData2DDList(cities2region, "profile_city");
    }
}

//*******************************************************************************************
// CHECK IS EMAIL FREE
//*******************************************************************************************
function Check_EmailFree() {
    var new_email = $("#email").val();
    GlobalAjax("/api/User/" + new_email + "/CheckMailAvailable", "GET", "", IsEmailFree, Fail_CheckMailFree);//Success_CheckMailFree, Fail_CheckMailFree);   
}
function IsEmailFree(data) {
    if (data)//אם חופשי
    {
        USER_VALIDATION.email = true;
        console.log("the email " + $("#email").val() + " is free");
        USER_VALIDATION.email = true;
        if ($("#email").hasClass("not_valid"))
            $("#email").removeClass("not_valid");
        //בצע הוספה של משתמש חדש
        AddNewUser();
    }
    else {
        USER_VALIDATION.email = false;
        $("#email").addClass(" not_valid");
        console.log("the email " + $("#email").val() + " is not free");
        alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    }
}
function Fail_CheckMailFree(data) {
    user_validation.email = false;
    console.log("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
    Console.log(data);
    alert("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
} 

//*******************************************************************************************
// CHANGE STYLE BY VALIDATION
//*******************************************************************************************
function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var flag = true;
    var user_inputs = {
        first_name: $("#first_name"),
        last_name: $("#last_name"),
        email: $("#email"),
        password: $("#password"),
        password_authentication: $("#password_authentication"),
        user_type: $("#user_type")
    };

    for (var i in USER_VALIDATION) {
        if (USER_VALIDATION[i] == false) {
            user_inputs[i].addClass(" not_valid");
            flag = false;
        }
        else {
            if (user_inputs[i].hasClass("not_valid"))
                user_inputs[i].removeClass("not_valid");
        }
    }
    if (isHasProfile) {
        var profile_inputs = {
            name: $("#profile_name"),
            description: $("#profile_description"),
            city: $("#profile_city"),
            region: $("#profile_region"),
            img: $("#profile_upload_image")
        };
        for (var i in PROFILE_VALIDATION) {
            if (PROFILE_VALIDATION[i] == false) {
                profile_inputs[i].addClass(" not_valid");
                flag = false;
            }
            else {
                if (profile_inputs[i].hasClass("not_valid"))
                    profile_inputs[i].removeClass("not_valid");
            }
        }
    }
    return flag;
}
//*******************************************************************************************
// CHECK USER INPUTS
//*******************************************************************************************
function CheckUserInputs()
//בודק את הרשומות של המשתמש
{
    var user_inputs = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        password_authentication: $("#password_authentication").val(),
        user_type: ($('#user_type').find(":selected").val())
    };
    var user_feedback = {
        first_name: document.getElementById("feedback_first_name"),
        last_name: document.getElementById("feedback_last_name"),
        email: document.getElementById("feedback_email"),
        password: document.getElementById("feedback_password"),
        password_authentication: document.getElementById("feedback_password_authentication"),
        user_type: document.getElementById("feedback_user_type")
    };

    // first_name
    if (user_inputs.first_name == "") {
        USER_VALIDATION.first_name = false;
        user_feedback.first_name.innerHTML = "אנא הכנס שם פרטי!";
    }
    else if (!(user_inputs.first_name.length >= 2 && user_inputs.first_name.length <= 20)) {
        USER_VALIDATION.first_name = false;
        user_feedback.first_name.innerHTML = "אנא הכנס שם פרטי באורך 2 עד 20 תווים!";
    }
    else {
        USER_VALIDATION.first_name = true;
        user_feedback.first_name.innerHTML = "";
    }
    // last_name
    if (user_inputs.last_name == "") {
        USER_VALIDATION.last_name = false;
        user_feedback.last_name.innerHTML = "אנא הכנס שם משפחה!";
    }
    else if (!(user_inputs.last_name.length >= 2 && user_inputs.last_name.length <= 30)) {
        USER_VALIDATION.last_name = false;
        user_feedback.last_name.innerHTML = "אנא הכנס שם משפחה באורך 2 עד 30 תווים!";
    }
    else {
        USER_VALIDATION.last_name = true;
        user_feedback.last_name.innerHTML = "";
    }
    // email
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (user_inputs.email == "") {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אימייל!";
    }
    else if (!(user_inputs.email.length <= 50)) {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אמייל באורך עד 50 תווים!";
    }
    else if (re.test(String(user_inputs.email).toLowerCase()) == false) {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אימייל תקין!.";
    }
    else {
        USER_VALIDATION.email = true;
        user_feedback.email.innerHTML = "";
    }
    // password
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    if (user_inputs.password == "") {
        USER_VALIDATION.password = false;
        user_feedback.password.innerHTML = "אנא הכנס סיסמה!";
    }
    else if (!(user_inputs.password.match(passw))) {
        USER_VALIDATION.password = false;
        user_feedback.password.innerHTML = "אנא הכנס סיסמה באורך 6 עד 12 תווים הכוללת לפחות ספרה אחת, אות קטנה באנגלית ואות גדולה באנגלית!.";
    }  
    else {
        USER_VALIDATION.password = true;
        user_feedback.password.innerHTML = "";
    }
    // password_authentication
    if (user_inputs.password_authentication == "") {
        USER_VALIDATION.password_authentication = false;
        user_feedback.password_authentication.innerHTML = "אנא הכנס אימות סיסמה!";
    }
    else if (!(user_inputs.password_authentication.match(passw))) {
        USER_VALIDATION.password_authentication = false;
        user_feedback.password_authentication.innerHTML = "אנא הכנס סיסמה באורך 6 עד 12 תווים הכוללת לפחות ספרה אחת, אות קטנה באנגלית ואות גדולה באנגלית!.";
    }
    else if (user_inputs.password != user_inputs.password_authentication){
        USER_VALIDATION.password_authentication = false;
        user_feedback.password_authentication.innerHTML = "אנא הכנס אימות סיסמה זהה לסיסמה!";
    }
    else {
        USER_VALIDATION.password_authentication = true;
        user_feedback.password_authentication.innerHTML = "";
    }
    // user_type
    if (user_inputs.user_type == "") {
        USER_VALIDATION.user_type = false;
        user_feedback.user_type.innerHTML = "אנא בחר סוג משתמש!";
    }
    else {
        USER_VALIDATION.user_type = true;
        user_feedback.user_type.innerHTML = "";
    }
}

//*******************************************************************************************
// CHECK PROFILE INPUTS
//*******************************************************************************************
function CheckProfileInputs() {
    var profile_inputs = {
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        city: $('#profile_city').find(":selected").val(),
        region: $('#profile_region').find(":selected").val(),
        img: $('#profile_upload_image').val()
    };
    var profile_feedback = {
        name: document.getElementById("feedback_profile_name"),
        description: document.getElementById("feedback_profile_description"),
        city: document.getElementById("feedback_profile_city"),
        region: document.getElementById("feedback_profile_region"),
        img: document.getElementById("feedback_profile_image")
    };
    // name
    if (profile_inputs.name == "") {
        PROFILE_VALIDATION.name = false;
        profile_feedback.name.innerHTML = "אנא הכנס שם פרופיל!";
    }
    else if (!(profile_inputs.name.length >= 2 && profile_inputs.name.length <= 30)) {
        PROFILE_VALIDATION.name = false;
        profile_feedback.name.innerHTML = "אנא הכנס שם פרופיל באורך 2 עד 30 תווים!";
    }
    else {
        PROFILE_VALIDATION.name = true;
        profile_feedback.name.innerHTML = "";
    }
    // description
    if (profile_inputs.description == "") {
        PROFILE_VALIDATION.description = false;
        profile_feedback.description.innerHTML = "אנא הכנס תיאור פרופיל!";
    }
    else if (!(profile_inputs.description.length >= 2 && profile_inputs.description.length <= 250)) {
        PROFILE_VALIDATION.description = false;
        profile_feedback.description.innerHTML = "אנא הכנס שם פרופיל באורך 2 עד 250 תווים!";
    }
    else {
        PROFILE_VALIDATION.description = true;
        profile_feedback.description.innerHTML = "";
    }
    // city
    if (profile_inputs.city == "") {
        PROFILE_VALIDATION.city = false;
        profile_feedback.city.innerHTML = "אנא בחר עיר!";
    }
    else {
        PROFILE_VALIDATION.city = true;
        profile_feedback.city.innerHTML = "";
    }
    // region
    if (profile_inputs.region == "") {
        PROFILE_VALIDATION.region = false;
        profile_feedback.region.innerHTML = "אנא בחר מחוז!";
    }
    else {
        PROFILE_VALIDATION.region = true;
        profile_feedback.region.innerHTML = "";
    }
    //img
    var img_end = profile_inputs.img.split(".")[1];
    if (profile_inputs.img == "") {
        PROFILE_VALIDATION.img = false;
        profile_feedback.img.innerHTML = "אנא בחר תמונת פרופיל!";
    }
    else if (!(img_end == 'tiff' || img_end == 'pjp' || img_end == 'pjpeg' || img_end == 'jfif' || img_end == 'tif' || img_end == 'gif' || img_end == 'svg' || img_end == 'bmp' || img_end == 'png' || img_end == 'jpeg' || img_end == 'svgz' || img_end == 'jpg' || img_end == 'webp' || img_end == 'ico' || img_end == 'xbm' || img_end == 'dib'))
    {
        PROFILE_VALIDATION.img = false;
        profile_feedback.img.innerHTML = "אנא בחר קובץ מסוג תמונה!";
    }
        else {
        PROFILE_VALIDATION.img = true;
        profile_feedback.img.innerHTML = "";
        //הצגת התמונה
        document.getElementById("profile_image").setAttribute("src", profile_inputs.img);
    }
}
//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************
    function IsFormValid() // הפונקציה בודקת הנתוני הטופס תקינים
    {
        CheckUserInputs();
        if (isHasProfile)
            CheckProfileInputs();
        if (Change_style_by_validation()) {
            Check_EmailFree();
        }
        else
            alert("אנא תקן את המקומות המסומנים!.");       
    }
    
//*******************************************************************************************
// ADD NEW USER
//*******************************************************************************************
    function AddNewUser()// הפונקציה שולחת את פרטי המשתמש לשרת
    {    //משתמש חדש
        var new_user = {
            user_type: parseInt($('#user_type').find(":selected").val()),
            first_name: ($("#first_name").val()).toString(),
            last_name: ($("#last_name").val()).toString(),
            email: ($("#email").val()).toString(),
            gender: ($("input[name='gender']:checked").val()).toString(),
            pasword: ($("#password").val()).toString(),
            status: true
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/User/AddNewUser", "POST", new_user, SuccessUser, FailUser);
    }

    function SuccessUser(user_id) // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
    {
        console.log("המשתמש נוסף לשרת בהצלחה.");
        if (isHasProfile)
            AddNewProfile(user_id);
        //GetUserIdByEmail();
        else {
            alert('ההרשמה בוצעה בהצלחה.');
            window.location.replace("Login.html"); //מעבר לדף הבית המחובר
        }
    }

    function FailUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
    {
        console.log("שגיאה בהוספת המשתמש לשרת.");
        console.log(data.T);
        alert('שגיאה בהוספת המשתמש לשרת.');
    }

//***************************************************************************//

    function AddNewProfile(user_id)// הפונקציה שולחת את פרטי משתמש לשרת
    {
        var profile_type = $('#select_user_type').find(":selected").text(); // סוג פרופיל
        let _type;
        if (profile_type === 'עסקי')
            _type = 'B';
        else
            _type = 'F';       
//פרופיל חדש
        var new_profile = {
            user_id: user_id,
            type: _type,
            name: $("#profile_name").val(),
            description: $("#profile_description").val(),
            id_city: $('#profile_city').find(":selected").val(),
            id_region: $('#profile_region').find(":selected").val(),
            status: true,
            img_name: 0,
            img_path: 0
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile, SuccessProfile, FailProfile);
    }

    function SuccessProfile(data) // פונקציה המתבצעת אחרי הוספה מוצלחת של פרופיל
    {
        PROFILE_ID = data.id;
        console.log("הפרופיל נוסף לשרת בהצלחה.");
        //הוספת תמונת הפרופיל
        AddProfileImage();
    }

    function FailProfile()// פונקציה המתבצעת אחרי כישלון הוספה  של פרופיל
    {
        console.log("שגיאה בהוספת הפרופיל לשרת.");
        alert('שגיאה בהוספת הפרופיל לשרת.');
}

//*******************************************************************************************
//add profile Image
//*******************************************************************************************
function AddProfileImage() {
    var profile_image_name = $("#profile_upload_image").val();
    var arry = profile_image_name.split('\\');
    var image_name = arry[arry.length - 1];
    var path = "~/Images/Profiles/";
    var image_path = path + image_name;
    var img = $("#profile_upload_image")[0].files[0];

    var fd = new FormData();
    fd.append("id", PROFILE_ID);
    fd.append("file", img);
    $.ajax({
        url: '/api/Profile/AddProfileImage',
        type: 'PUT',
        data: fd,
        contentType: false,
        processData: false,
        success: function () {
            console.log("תמונת פרופיל נוספה בהצלחה!.");
            alert('ההרשמה בוצעה בהצלחה.');
            window.location.replace("Login.html"); //מעבר לדף הבית המחובר
        },
        error: function () {
            console.log("שגיאה בהוספת תמונת פרופיל!.");
            alert("שגיאה בהוספת תמונת פרופיל!. יתר פרטי ההרשמה נקלטו במערכת בהצלחה!.");
        }        
    });
}
//*******************************************************************************************
// ShowPopup
//*******************************************************************************************
function ShowPopup(_id) {
    var words = _id.split('_');
    var name = words[2];
    if (words.length > 3)
        name = name.concat("_" + words[3]);
    name = name.concat("_popup");
    var popup = document.getElementById(name);
    popup.classList.toggle("show_popup");
}
//*******************************************************************************************
//ShowPassword
//*******************************************************************************************
function ShowPassword(_btn_id) {
    var arry = _btn_id.split("_");
    var _id = arry[1];
    if (arry.length > 2)
        _id+= '_' + arry[2];
    var _element = document.getElementById(_id).setAttribute('type', 'input');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'HidePassword(this.id)');
}
//*******************************************************************************************
//HidePassword
//*******************************************************************************************
function HidePassword(_btn_id) {
    var arry = _btn_id.split("_");
    var _id = arry[1];
    if (arry.length > 2)
        _id += '_' + arry[2];
    var _element = document.getElementById(_id).setAttribute('type', 'password');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'ShowPassword(this.id)');
}
//*******************************************************************************************
//Show img Profile
//*******************************************************************************************
function ShowImgProfile(_input) {
    var img = $("#profile_upload_image").val();
    var img_end = img.split(".")[1];
    var reader = new FileReader();
    if (img_end == 'tiff' || img_end == 'pjp' || img_end == 'pjpeg' || img_end == 'jfif' || img_end == 'tif' || img_end == 'gif' || img_end == 'svg' || img_end == 'bmp' || img_end == 'png' || img_end == 'jpeg' || img_end == 'svgz' || img_end == 'jpg' || img_end == 'webp' || img_end == 'ico' || img_end == 'xbm' || img_end == 'dib') {
        //document.getElementById(profile_image).setAttribute('src', img);
        reader.onload = function (e) {
            $('#profile_image')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(_input.files[0]);
    }
}