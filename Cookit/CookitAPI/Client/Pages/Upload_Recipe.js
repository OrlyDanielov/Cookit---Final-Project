﻿//*******************************************************************************************
// globals variables
//*******************************************************************************************
//הקטגוריות
var ARRY_DISH_TYPE = new Array();
var ARRY_DISH_CATEGORY = new Array();
var ARRY_FOOD_TYPE = new Array();
var ARRY_KITCHEN_TYPE = new Array();
var ARRY_DIFFICULTY_LEVEL = new Array();
var ARRY_INGRIDIANTS = new Array();
var ARRY_MESURMENTS = new Array();
//בדיקת תקינות
var RECIPE_VALIDATION = {
    recp_name: false ,
    recp_dish_type: false,
    recp_dish_category: false,
    recp_food_type: false,
    recp_kitchen_type: false,
    recp_level: false,
    recp_total_time: false,
    recp_work_time: false,
    recp_steps: false
};
var INGRIDIANTS_VALIDATION =//{
    [{
    ing_name: false,
    ing_amount: false,
    ing_mesurment: false
//};
}];
//מונה מספר מצרכים
var COUNT_INGRIDIANTS = 1;
var NAME_INGRIDIANTS = 1;

//*******************************************************************************************
// page load
//*******************************************************************************************

// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
   //סוגי המנות ממסד הנתונים
    GetDishType();
    // קטגוריות מנות מהמסד נתונים
    GetDishCategory();
    //עדכון סוג אוכל
    GetFoodType();
    //עדכון סגנון מטבח
    GetKitchenType();
    //עדכון דרגת קושי
    GetDifficultyLevel();
    // עדכון שם מצרך
    GetIngridiants();
    //עדכון אופן מדידה של מצרך
    GetMesurments();
});
//*******************************************************************************************
// INIT DATA INTO DROP DOWN LIST
//*******************************************************************************************
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function EnterData2DDList(arry, ddList) {      
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
// GET DISH TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי המנות
function GetDishType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishType
    GlobalAjax("/api/DishType", "GET", "", SuccessDishType, FailDishType);
}

function SuccessDishType(arry_dish_type) {
    ARRY_DISH_TYPE = arry_dish_type;//JSON.parse(arry_dish_type);
    sessionStorage.setItem("Dish_Type", JSON.stringify(arry_dish_type));
    EnterData2DDList(arry_dish_type, "select_dish_type");
}

function FailDishType() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}
//*******************************************************************************************
//  GET DISH CATEGORY
//*******************************************************************************************
// פונקציה מביאה את כל מאפייני המנות
function GetDishCategory() {
        // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishCategoty
    GlobalAjax("/api/DishCategoty", "GET", "", SuccessDishCategory, FailDishCategory);
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בהצלחה בשרת
function SuccessDishCategory(arry_dish_category) {
    ARRY_DISH_CATEGORY = arry_dish_category;
    sessionStorage.setItem("Dish_category", JSON.stringify(arry_dish_category));
    EnterData2DDList(arry_dish_category, "select_dish_category"); 
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בכישלון בשרת
function FailDishCategory() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}
//*******************************************************************************************
//GET FOOD TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי האוכל
function GetFoodType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני foodType
    GlobalAjax("/api/FoodType", "GET", "", SuccessFoodType, FailFoodType);
}

function SuccessFoodType(arry_food_type) {
    ARRY_FOOD_TYPE = arry_food_type;
    sessionStorage.setItem("Food_Type", JSON.stringify(arry_food_type));
    EnterData2DDList(arry_food_type, "select_food_type");
}

function FailFoodType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}
//*******************************************************************************************
// GET KITCHEN TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי המטבחים
function GetKitchenType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני kitchenType
    GlobalAjax("/api/KitchenType", "GET", "", SuccessKitchenType, FailKitchenType);
}

function SuccessKitchenType(arry_kitchen_type) {
    ARRY_KITCHEN_TYPE = arry_kitchen_type;
    sessionStorage.setItem("Kitchen_Type", JSON.stringify(arry_kitchen_type));
    EnterData2DDList(arry_kitchen_type,"select_kitchen_type");
}

function FailKitchenType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}
//*******************************************************************************************
// GET DIFFICULTY LEVEL
//*******************************************************************************************
// פונקציה מביאה את כל דרגות הקושי של מתכון
function GetDifficultyLevel() {
    GlobalAjax("/api/DifficultyLevel/GetAll", "GET", "", SuccessDifficultyLevel,FailDifficultyLevel);
}

function SuccessDifficultyLevel(arry_difficulty_level) {
    ARRY_DIFFICULTY_LEVEL = arry_difficulty_level;
    sessionStorage.setItem("Difficulty_Level", JSON.stringify(arry_difficulty_level));
    EnterData2DDList(arry_difficulty_level,"select_difficulty_level");
}

function FailDifficultyLevel() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}
//*******************************************************************************************
// GET INGRIDIANTS
//*******************************************************************************************
// פונקציה מביאה את כל המצרכים של מתכון
function GetIngridiants() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Ingridiants
    GlobalAjax("/api/Ingridiants", "GET", "", SuccessIngridiants, FailIngridiants);
}

function SuccessIngridiants(arry_ingridiants) {
    ARRY_INGRIDIANTS = arry_ingridiants;
    sessionStorage.setItem("Ingridiants", JSON.stringify(arry_ingridiants));
    EnterData2DDList(arry_ingridiants,"select_ingridiant_name_1");
}

function FailIngridiants() {
    console.log("שגיאה במשיכת נתוני מצרכים מהשרת.");
    alert('שגיאה במשיכת נתוני מצרכים מהשרת.');
}
//*******************************************************************************************
//  GET MESURMENTS
//*******************************************************************************************

// פונקציה מביאה את כל אופני המדידה של מתכון
function GetMesurments() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Mesurments
    GlobalAjax("/api/Mesurments", "GET", "", SuccessMesurments, FailMesurments);
}

function SuccessMesurments(arry_Mesurments) {
    ARRY_MESURMENTS = arry_Mesurments;
    sessionStorage.setItem("Mesurments", JSON.stringify(arry_Mesurments));
    EnterData2DDList(arry_Mesurments,"select_mesurment_1");
}

function FailMesurments() {
    console.log("שגיאה במשיכת נתוני אופן המדידה מהשרת.");
    alert('שגיאה במשיכת נתוני אופן המדידה מהשרת.');
}
//*******************************************************************************************
// ADD INGRIDIANT
//*******************************************************************************************
function AddIngridiant()
//מוסיף עוד שורה במתכון עבור מצרך נוסף
{
    COUNT_INGRIDIANTS = COUNT_INGRIDIANTS + 1;
    NAME_INGRIDIANTS = NAME_INGRIDIANTS + 1;

    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + NAME_INGRIDIANTS;
    new_ingridiant.className = "form-row";
    //כפתור הסרה
    var btn_div = document.createElement("div");
    btn_div.className = "col";

    var btn_remove = document.createElement("input");
    btn_remove.type = "submit";
    btn_remove.id = "btn_remove_ingridiant_" + NAME_INGRIDIANTS;
    btn_remove.value = "הסר מצרך";
    btn_remove.className = "btn btn-group";
    btn_remove.setAttribute("onClick", "RemoveIngridiant(this.id)");


    btn_div.appendChild(btn_remove);
    new_ingridiant.appendChild(btn_div);
    //שם מצרך
    var name_div = document.createElement("div");
    name_div.className = "col";

    var name_lbl = document.createElement("label");
    name_lbl.for = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_lbl.className = "col-sm-4 col-form-label";
    name_lbl.innerHTML = "שם מצרך";

    var name_select = document.createElement("select");
    name_select.id = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_select.className = "form-control";

    var name_opt = document.createElement("option");
    name_opt.value = "";
    name_opt.selected = true;
    name_opt.disabled = true;
    name_opt.innerHTML = "שם מצרך";

    var name_feedback = document.createElement("div");
    name_feedback.id = "feedback_ingridiant_name_" + NAME_INGRIDIANTS;
    name_feedback.className = "not_valid_feedback";

    name_select.appendChild(name_opt);

    name_div.appendChild(name_lbl);
    name_div.appendChild(name_select);
    name_div.appendChild(name_feedback);
    new_ingridiant.appendChild(name_div);
    //כמות מצרך
    var count_div = document.createElement("div");
    count_div.className = "col";

    var count_lbl = document.createElement("label");
    count_lbl.for = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_lbl.className = "col-sm-4 col-form-label";
    count_lbl.innerHTML = "שם מצרך";

    var count_input = document.createElement("input");
    count_input.type = "number";
    count_input.id = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_input.className = "form-control text2rigth";
    count_input.min = "0";

    var count_feedback = document.createElement("div");
    count_feedback.id = "feedback_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_feedback.className = "not_valid_feedback";
    
    count_div.appendChild(count_lbl);
    count_div.appendChild(count_input);
    count_div.appendChild(count_feedback);
    new_ingridiant.appendChild(count_div);
    //אופן מדידה
    var mesurment_div = document.createElement("div");
    mesurment_div.className = "col";

    var mesurment_lbl = document.createElement("label");
    mesurment_lbl.for = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_lbl.className = "col-sm-4 col-form-label";
    mesurment_lbl.innerHTML = "שם מצרך";

    var mesurment_select = document.createElement("select");
    mesurment_select.id = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_select.className = "form-control";

    var mesurment_opt = document.createElement("option");
    mesurment_opt.value = "";
    mesurment_opt.selected = true;
    mesurment_opt.disabled = true;
    mesurment_opt.innerHTML ="אופן מדידה";

    mesurment_select.appendChild(mesurment_opt);

    var mesurment_feedback = document.createElement("div");
    mesurment_feedback.id = "feedback_mesurment_" + NAME_INGRIDIANTS;
    mesurment_feedback.className = "not_valid_feedback";

    mesurment_div.appendChild(mesurment_lbl);
    mesurment_div.appendChild(mesurment_select);
    mesurment_div.appendChild(mesurment_feedback);
    new_ingridiant.appendChild(mesurment_div);

    var hr = document.createElement("hr");
    hr.class = "mb - 4";
    new_ingridiant.appendChild(hr);
    document.getElementById("recipe_ingridiants").insertBefore(new_ingridiant, document.getElementById("btn_add_ingridiant"));
    console.log("ingridiant " + COUNT_INGRIDIANTS);
    //מוסיף מידע לרשימות החדשות שיצרנו למצרך
    EnterData2DDList(ARRY_INGRIDIANTS, "select_ingridiant_name_" + NAME_INGRIDIANTS);
    EnterData2DDList(ARRY_MESURMENTS, "select_mesurment_" + NAME_INGRIDIANTS);
    //מוסיף אוביקט נוסף של ולידציה של מצרך לרשימה
    INGRIDIANTS_VALIDATION.push({
        ing_name: false,
        ing_amount: false,
        ing_mesurment: false
    });
}
//*******************************************************************************************
// REMOVE INGRIDIANT
//*******************************************************************************************
function RemoveIngridiant(btn_remove_ing)
//מסיר את המצרך הנבחר
{
    var child = (document.getElementById(btn_remove_ing).parentNode).parentNode;//.id;
    if (COUNT_INGRIDIANTS == 1) // חייב להיות לפחות מצרך אחד במתכון
    {
        alert("חייב להיות לפחות מצרך אחד במתכון!.");
    }
    else {
        COUNT_INGRIDIANTS = COUNT_INGRIDIANTS-1;
        // search the index of the removig item
        var all_ingridiants = document.getElementById("recipe_ingridiants");
        console.log(all_ingridiants.children);
        var index = Array.from(all_ingridiants.children).indexOf(child);
        INGRIDIANTS_VALIDATION.splice(index-1, 1);
        all_ingridiants.removeChild(child);
        console.log("ingridiant " + COUNT_INGRIDIANTS);
    }
}

//*******************************************************************************************
// CHECK INGRIDIANTS INPUTS
//*******************************************************************************************

function CheckIngridiantsInputs()
//בודק את הרשומות של המצרכים
{
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_feedback = {
        ing_name: document.getElementById("feedback_ingridiant_name_1"),
        ing_amount: document.getElementById("feedback_ingridiant_amount_1"),
        ing_mesurment: document.getElementById("feedback_mesurment_1")
    };
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1").find(":selected").val(),
        ing_amount: $("#txt_ingridiant_amount_1").val(),
        ing_mesurment: $("#select_mesurment_1").find(":selected").val()
    };
    var names, temp, z,num;//x, y,
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ingridiants_inputs);
            temp = (ingridiants_data[h]).children[1].id;
            //x = names[h - 1];
            z = temp.split("_");
            num = z[z.length - 1];
            //y = INGRIDIANTS_VALIDATION[i - 1];
            //ingridiant name
            if (h == 1) {
                ingridiants_inputs.ing_name = $("#" + temp).find(":selected").val();
                ingridiants_feedback.ing_name = document.getElementById("feedback_ingridiant_name_" + num);
                if (ingridiants_inputs.ing_name == "") {
                    INGRIDIANTS_VALIDATION[i-1].ing_name = false;
                    ingridiants_feedback.ing_name.innerHTML = "אנא בחר שם מצרך!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_name = true;
                    ingridiants_feedback.ing_name.innerHTML = "";
                }
            }
            //Ingridiant amount
            if (h == 2) {
                ingridiants_inputs.ing_amount = $("#" + temp).val();
                ingridiants_feedback.ing_amount = document.getElementById("feedback_ingridiant_amount_" + num);
                if (ingridiants_inputs.ing_amount == "") {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = false;
                    ingridiants_feedback.ing_amount.innerHTML = "אנא הכנס כמות מצרך!";
                }
               else if (ingridiants_inputs.ing_amount == 0) {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = false;
                    ingridiants_feedback.ing_amount.innerHTML = "אנא הכנס כמות מצרך גדולה מ0!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = true;
                    ingridiants_feedback.ing_amount.innerHTML = "";
                }
            }
            //ingridiant mesurment
            if (h == 3) {
                ingridiants_inputs.ing_mesurment = $("#" + temp).find(":selected").val();
                ingridiants_feedback.ing_mesurment = document.getElementById("feedback_mesurment_" + num);
                if (ingridiants_inputs.ing_mesurment == "") {
                    INGRIDIANTS_VALIDATION[i - 1].ing_mesurment = false;
                    ingridiants_feedback.ing_mesurment.innerHTML = "אנא בחר אופן מדידה!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_mesurment = true;
                    ingridiants_feedback.ing_mesurment.innerHTML = "";
                }
            }
        }
    }
}

//*******************************************************************************************
// CHECK RECIPE INPUTS
//*******************************************************************************************
function CheckRecipeInputs()
//בודק את הרשומות של המתכון
{
    var recipe_inputs = {
        recp_name: $("#txt_name_recipe").val(),
        recp_dish_type: $("#select_dish_type").find(":selected").val(),
        recp_dish_category: $("#select_dish_category").find(":selected").val(),
        recp_food_type: $("#select_food_type").find(":selected").val(),
        recp_kitchen_type: $("#select_kitchen_type").find(":selected").val(),
        recp_level: $("#select_difficulty_level").find(":selected").val(),
        recp_total_time: $("#txt_total_time").val(),
        recp_work_time: $("#txt_work_time").val(),
        recp_steps: $("#txt_preparation_steps").val()
};
    var recipe_feedback = {
        recp_name: document.getElementById("feedback_name_recipe"),
        recp_dish_type: document.getElementById("feedback_dish_type"),
        recp_dish_category: document.getElementById("feedback_dish_category"),
        recp_food_type: document.getElementById("feedback_food_type"),
        recp_kitchen_type: document.getElementById("feedback_kitchen_type"),
        recp_level: document.getElementById("feedback_difficulty_level"),
        recp_total_time: document.getElementById("feedback_total_time"),
        recp_work_time: document.getElementById("feedback_work_time"),
        recp_steps: document.getElementById("feedback_preparation_steps")
};
// recp_name
if (recipe_inputs.recp_name == "") {
    RECIPE_VALIDATION.recp_name = false;
    recipe_feedback.recp_name.innerHTML = "אנא הכנס שם מתכון!";
}
else if (!(recipe_inputs.recp_name.length >= 2 && recipe_inputs.recp_name.length <= 60)) {
    RECIPE_VALIDATION.recp_name = false;
    recipe_feedback.recp_name.innerHTML = "אנא הכנס שם מתכון באורך 2 עד 60 תווים!";
}
else {
    RECIPE_VALIDATION.recp_name = true;
    recipe_feedback.recp_name.innerHTML = "";
    }
    // recp_dish_type
    if (recipe_inputs.recp_dish_type == "") {
        RECIPE_VALIDATION.recp_dish_type = false;
        recipe_feedback.recp_dish_type.innerHTML = "אנא בחר סוג מנה!";
    }
    else {
        RECIPE_VALIDATION.recp_dish_type = true;
        recipe_feedback.recp_dish_type.innerHTML = "";
    }
    // recp_dish_category
    if (recipe_inputs.recp_dish_category == "") {
        RECIPE_VALIDATION.recp_dish_category = false;
        recipe_feedback.recp_dish_category.innerHTML = "אנא בחר מאפיין מנה!";
    }
    else {
        RECIPE_VALIDATION.recp_dish_category = true;
        recipe_feedback.recp_dish_category.innerHTML = "";
    }
    // recp_food_type
    if (recipe_inputs.recp_food_type == "") {
        RECIPE_VALIDATION.recp_food_type = false;
        recipe_feedback.recp_food_type.innerHTML = "אנא בחר סוג אוכל!";
    }
    else {
        RECIPE_VALIDATION.recp_food_type = true;
        recipe_feedback.recp_food_type.innerHTML = "";
    }
    // recp_kitchen_type
    if (recipe_inputs.recp_kitchen_type == "") {
        RECIPE_VALIDATION.recp_kitchen_type = false;
        recipe_feedback.recp_kitchen_type.innerHTML = "אנא בחר סגנון מטבח!";
    }
    else {
        RECIPE_VALIDATION.recp_kitchen_type = true;
        recipe_feedback.recp_kitchen_type.innerHTML = "";
    }
    // recp_level
    if (recipe_inputs.recp_level == "") {
        RECIPE_VALIDATION.recp_level = false;
        recipe_feedback.recp_level.innerHTML = "אנא בחר דרגת קושי!";
    }
    else {
        RECIPE_VALIDATION.recp_level = true;
        recipe_feedback.recp_level.innerHTML = "";
    }
    // recp_work_time
    if (recipe_inputs.recp_work_time == "") {
        RECIPE_VALIDATION.recp_work_time = false;
        recipe_feedback.recp_work_time.innerHTML = "אנא הכנס זמן עבודה!";
    }
    else if (recipe_inputs.recp_work_time == "00:00") {
        RECIPE_VALIDATION.recp_work_time = false;
        recipe_feedback.recp_work_time.innerHTML = "אנא הכנס זמן עבודה שונה מ 00:00!";
    }
    else {
        RECIPE_VALIDATION.recp_work_time = true;
        recipe_feedback.recp_work_time.innerHTML = "";
    }
    // recp_total_time
    if (recipe_inputs.recp_total_time == "") {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל!";
    }
    else if (recipe_inputs.recp_total_time == "00:00")
    {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל שונה מ 00:00!";
    }
    else if (!(recipe_inputs.recp_total_time >= recipe_inputs.recp_work_time))
    {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל לפחות בגודל זמן העבודה";
    }
    else {
        RECIPE_VALIDATION.recp_total_time = true;
        recipe_feedback.recp_total_time.innerHTML = "";
    }   
    // recp_steps
    if (recipe_inputs.recp_steps == "") {
        RECIPE_VALIDATION.recp_steps = false;
        recipe_feedback.recp_steps.innerHTML = "אנא הכנס אופן הכנה!";
    }
    else if (!(recipe_inputs.recp_steps.length >= 50 )) {
        RECIPE_VALIDATION.recp_steps = false;
        recipe_feedback.recp_steps.innerHTML = "אנא הכנס שם מתכון באורך 50 תווים לפחות!";
    }
    else {
        RECIPE_VALIDATION.recp_steps = true;
        recipe_feedback.recp_steps.innerHTML = "";
    }

}
//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************

function CheckFormValidation() {
    CheckRecipeInputs();
    CheckIngridiantsInputs();
    if (Change_style_by_validation())
        AddNewRecipe();
    else
        alert("אנא תקן את המקומות המסומנים");
}

//*******************************************************************************************
// CHANGE STYLE BY VALIDATION
//*******************************************************************************************

function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var flag = true;
    //פרטי מתכון
    var recipe_inputs =
    {
        recp_name: $("#txt_name_recipe"),
        recp_dish_type: $("#select_dish_type"),
        recp_dish_category: $("#select_dish_category"),
        recp_food_type: $("#select_food_type"),
        recp_kitchen_type: $("#select_kitchen_type"),
        recp_level: $("#select_difficulty_level"),
        recp_total_time: $("#txt_total_time"),
        recp_work_time: $("#txt_work_time"),
        recp_steps: $("#txt_preparation_steps")
    };
    for (var i in RECIPE_VALIDATION) {
        if (RECIPE_VALIDATION[i] == false) {
            flag = false;
            recipe_inputs[i].addClass(" not_valid");
        }
        else {
            if (recipe_inputs[i].hasClass("not_valid"))
                recipe_inputs[i].removeClass("not_valid");
        }
    }
    //מצרכים
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1"),
        ing_amount: $("#txt_ingridiant_amount_1"),
        ing_mesurment: $("#select_mesurment_1")
    };
    var names, temp,x,y;
    for (var i = 1; i < all_ingridiants.length - 1; i++) {     
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ingridiants_inputs);
            temp = (ingridiants_data[h]).children[1].id;
            x = names[h - 1];
            ingridiants_inputs.x = $("#" + temp);
            y = INGRIDIANTS_VALIDATION[i - 1];
            if (y[x] == false) {
                flag = false;
                ingridiants_inputs.x.addClass(" not_valid");
            }
            else {
                if (ingridiants_inputs.x.hasClass("not_valid"))
                    ingridiants_inputs.x.removeClass("not_valid");
            }
            }
    }
    return flag;
}
   
//*******************************************************************************************
// ADD NEW RECIPE
//*******************************************************************************************
function AddNewRecipe()
//הוספת מתכון חדש
{
    var new_recipe = {
        user_id: (JSON.parse(sessionStorage.getItem("Login_User"))).id,
        recp_name: $("#txt_name_recipe").val(),
        recp_dish_type: $("#select_dish_type").find(":selected").val(),
        recp_dish_category: $("#select_dish_category").find(":selected").val(),
        recp_food_type: $("#select_food_type").find(":selected").val(),
        recp_kitchen_type: $("#select_kitchen_type").find(":selected").val(),
        recp_level: $("#select_difficulty_level").find(":selected").val(),
        recp_total_time: $("#txt_total_time").val(),
        recp_work_time: $("#txt_work_time").val(),
        recp_steps: $("#txt_preparation_steps").val()
    };
    GlobalAjax("/api//AddNewUser", "POST", new_user, SuccessUser, FailUser);

}