﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookitDB.DB_Code
{
    public class CookitQueries
    {

        #region Get_DB
        public static bgroup36_prodEntities Get_DB() //bgroup36_prodConnection  Get_DB()//Cookit_DBConnection Get_DB()
        {
            //Cookit_DBConnection db = new Cookit_DBConnection();
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            var db = new bgroup36_prodEntities();
            return db;

        }
        #endregion

        //*********************************************************************
        //              GET
        //*********************************************************************

        //PROFILE
        #region GetProfileByUserId
        // מביאה את הפרופיל לפי תז של משתמש
        public static TBL_Profile GetProfileByUserId(int userId)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile prof = db.TBL_Profile.SingleOrDefault(x => x.Id_User == userId);
                if (prof == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return prof;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetProfileInformationByProfileId
        // מביאה את הפרופיל לפי תז של משתמש
        public static TBL_Profile GetProfileByProfileId(int profile_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile prof = db.TBL_Profile.SingleOrDefault(x => x.Id_Prof == profile_id);
                if (prof == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return prof;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Get ProfileID Of User 
        public static int GetProfileIDOfUserByID(int ID)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile user_prof = db.TBL_Profile.SingleOrDefault(a => a.Id_User == ID);
                return user_prof.Id_Prof;
            }
            catch
            {
                return -1;
            }
        }
        #endregion

        #region Get All Active Profiles
        //מביא את כל הפרופילים הפעילים
        public static List<TBL_Profile> GetAllActiveProfiles()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Profile.Where(x => x.ProfStatus == true).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get Profile Follow By User
        //מביא את כל הפרופילים הנעקבים ע"י המשתמש
        public static List<TBL_Followers> GetProfileFollowByUser(int id_user)
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Followers.Where(x => x.Id_User == id_user).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get Profiles Follows After User By Profile Id
        // מביא את כל העוקבים אחרי הפרופיל לפי התז שלו
        public static List<TBL_Followers> GetProfilesFollowsAfterUserByProfileId(int id_profile)
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Followers.Where(x => x.Id_Prof == id_profile).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Ge tProfile Follow By Profile Id
        //מביא את כל המשתמשים העוקבים אחרי פרופיל לפי התז פרופיל
        public static List<TBL_Followers> GetProfileFollowByProfileId(int profile_id)
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Followers.Where(x => x.Id_Prof == profile_id).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

    
        //RECIPE
        #region GetRecpByUserIdAndRecpName
        // מביאה את הפרופיל לפי תז של משתמש
        public static TBL_Recipe GetRecpByUserIdAndRecpName(int user_id, string recp_name)
        {
            try
            {
                var db = Get_DB();
                TBL_Recipe recp = db.TBL_Recipe.SingleOrDefault(x => x.Id_Recipe_User == user_id && x.Name_Recipe == recp_name);
                if (recp == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return recp;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetRecipesByUserId
        //מביא את כל המתכונים של משתמש לפי התז שלו
        public static List<TBL_Recipe> GetRecipesByUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_Recipe> list_recipes = db.TBL_Recipe.Where(x => x.Id_Recipe_User == user_id).ToList();
                if (list_recipes == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return list_recipes;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetAllRecipesExpectOfUserId
        //מביא את כל המתכונים חוץ משל המשתמש לפי התז שלו
        public static List<TBL_Recipe> GetAllRecipesExpectOfUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_Recipe> list_recipes = db.TBL_Recipe.Where(x => x.Id_Recipe_User != user_id).ToList();
                if (list_recipes == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return list_recipes;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetRecpByUserIdRecipe
        //מביא מתכון לפי תז מתכון
        public static TBL_Recipe GetRecpByUserIdRecipe(int recipe_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Recipe recp = db.TBL_Recipe.SingleOrDefault(x => x.Id_Recipe == recipe_id);
                if (recp == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return recp;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetAllRecipes
        //מביא את כל המתכונים
        public static List<TBL_Recipe> GetAllRecipes()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Recipe.OrderBy(x => x.Id_Recipe).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        //USER
        #region GetFU
        //מביא את כל המשתמשים שהם מסוגאנים טעם
        public static List<TBL_User> GetFU()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_User.Where(x => x.Id_Type == 2).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region GetUserFullNameByID
        //מביאה מצרכי מתכון לפי תז מתכון
        public static string GetUserFullNameByID(int user_id)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Id_User == user_id);
                if (user == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else
                    return user.FirstName + " " + user.LastName;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        //OTHERS

       /* #region GetAllLikes
        //מביא את כל הלייקים
        public static List<TBL_Likes> GetAllLikes()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Likes.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
    */
        #region Get All User Type
        // הפוקנציה מביאה מהמסד את כל סוגי המשתמשים
        public static List<TBL_UserType> Get_all_User_Type()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_UserType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All City
        // הפוקנציה מביאה מהמסד את כל הערים
        public static List<TBL_City> Get_all_cities()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_City.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region GetAllRegion
        // הפוקנציה מביאה מהמסד את כל הערים
        public static List<TBL_Region> GetAllRegion()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Region.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
         
        #region Get all dish type
        // הפוקנציה מביאה מהמסד את כל סוגי המנות
        public static List<TBL_DishType> Get_all_DishType()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_DishType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all DishCategory
        // הפוקנציה מביאה מהמסד את כל קטגוריות המנות
        public static List<TBL_DishCategory> Get_all_DishCategory()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_DishCategory.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all FoodType
        // הפוקנציה מביאה מהמסד את כל סוגי האוכל
        public static List<TBL_FoodType> Get_all_FoodType()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_FoodType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region  Get all KitchenType
        // הפוקנציה מביאה מהמסד את כל סוגי מטבחים
        public static List<TBL_KitchenType> Get_all_KitchenType()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_KitchenType.ToList();
            }
            catch (Exception e)
            {
                return null;

            }
        }
        #endregion

        #region Get all DifficultyLevel
        // הפוקנציה מביאה מהמסד את כל דרגות הקושי למתכון
        public static List<TBL_RecipeDifficultyLevel> Get_all_DifficultyLevel()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_RecipeDifficultyLevel.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all Ingridiants
        // הפוקנציה מביאה מהמסד את כל המצרכים למתכון
        public static List<TBL_Ingridiants> Get_all_Ingridiants()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Ingridiants.OrderBy(x=>x.Name_Ingridiants).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all Mesurments
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_Mesurments> Get_all_Mesurments()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Mesurments.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get User By Email
        public static int GetUserByEmail(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                if (user == null) // אם אין משתמש אם פרטים כאלה
                    return -1;
                else
                    return user.Id_User;
            }
            catch (Exception)
            {
                return -2;
            }
        }
        #endregion
                
        #region Get All Holidays
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_Holiday> Get_all_Holidays()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Holiday.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All fOOD Lable
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_FoodLabel> Get_all_FoodLable()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_FoodLabel.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
               
        #region GetIngridiantsByRecpId
        //מביאה מצרכי מתכון לפי תז מתכון
        public static List<TBL_IngridiantForRecp> GetIngridiantsByRecpId(int recp_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_IngridiantForRecp> recp = db.TBL_IngridiantForRecp.Where(x => x.Id_Recp == recp_id).ToList();//.GroupBy(y=> y.Id_Recp).ToList();
                if (recp == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return recp;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetHolidaysByRecpId
        //מביאה מצרכי מתכון לפי תז מתכון
        public static List<TBL_HolidaysForRecp> GetHolidaysByRecpId(int recp_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_HolidaysForRecp> holidays = db.TBL_HolidaysForRecp.Where(x => x.Id_Recp == recp_id).ToList();
                if (holidays == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return holidays;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetFoodLablesByRecpId
        //מביאה מצרכי מתכון לפי תז מתכון
        public static List<TBL_LabelsForRecp> GetFoodLablesByRecpId(int recp_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_LabelsForRecp> labels = db.TBL_LabelsForRecp.Where(x => x.Id_Recp == recp_id).ToList();
                if (labels == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else
                    return labels;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion
               
        #region GetLikeByUserIdAndRecipeId
        //מביאה מצרכי מתכון לפי תז מתכון
        public static TBL_Likes GetLikeByUserIdAndRecipeId(int user_id,int recipe_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Likes like = db.TBL_Likes.SingleOrDefault(x => x.Id_Recp == recipe_id && x.Id_User == user_id);
                if (like == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else
                    return like;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region GetCountLikeOfRecipe
        //מביא את מספר הלייקים של מתכון
        public static int GetCountLikeOfRecipe(int recipe_id)
        {
            try
            {
                var db = Get_DB();
                List<TBL_Likes> count_likes = db.TBL_Likes.Where(x => x.Id_Recp == recipe_id).ToList();
                if (count_likes != null)
                    return count_likes.Count();
                else
                    return 0;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion

        #region GetFavoriteByUserId
        //המתכונים המועדפים של משתמש
        public static List<TBL_FavoriteRecp> GetFavoriteByUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                return db.TBL_FavoriteRecp.Where(x => x.Id_User == user_id).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
        
        #region GetFavoriteByUserIdAndRecipeId
        public static TBL_FavoriteRecp GetFavoriteByUserIdAndRecipeId(int user_id, int recipe_id)
        {
            try
            {
                var db = Get_DB();
                TBL_FavoriteRecp favorite = db.TBL_FavoriteRecp.SingleOrDefault(x => x.Id_Recp == recipe_id && x.Id_User == user_id);
                if (favorite == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else
                    return favorite;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion
        
        #region Get Comments By Recipe Id
        //מביא את כל התגובות של מתכון
        public static List<TBL_Comments> GetCommentsByRecipeId(int recipe_id)
        {
            try
            {
                var db = Get_DB();
               return db.TBL_Comments.Where(x => x.Id_Recp == recipe_id).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
      
        #region GetLikeByUserId
        // הפוקנציה מביאה מהמסד את כל סוגי האוכל
        public static List<TBL_Likes> GetLikeByUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Likes.Where(x=>x.Id_User == user_id).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
        //*********************************************************************
        //              ADD
        //*********************************************************************
        #region Add New Recipe
        //פונקציה של הוספת מתכון חדש לטבלת המתכונים
        //public static bool AddNewRecipe(TBL_Recipe new_recipe)
        public static int AddNewRecipe(TBL_Recipe new_recipe)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_recipe).State = System.Data.Entity.EntityState.Added; // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                //להחזיר את התז של המתכון שהוסף
                return new_recipe.Id_Recipe;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion

        #region Add New User
        //פונקציה של הוספת משתמש חדש לטבלת המשתמשים
        public static int AddNewUser(TBL_User new_user)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_user).State = System.Data.Entity.EntityState.Added; // הוספת משתמש חדש
                db.SaveChanges();
                return new_user.Id_User; ;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion

        #region Add New Profile
        //פונקציה של הוספת פרופיל חדש לטבלת הפרופילים
        public static int AddNewProfile(TBL_Profile new_profile)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_profile).State = System.Data.Entity.EntityState.Added; // הוספת פרופיל חדש
                db.SaveChanges();
                return new_profile.Id_Prof;
                //return true;
            }
            catch (Exception)
            {
                //return false;
                return -1;
            }
        }
        #endregion

        #region AddNewLike
        //פונקציה של הוספת פרופיל חדש לטבלת הפרופילים
        public static bool AddNewLike(TBL_Likes new_like)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_like).State = System.Data.Entity.EntityState.Added; 
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region AddNewComment
        //הוספת תגובה חדשה למתכון
        public static int AddNewComment(TBL_Comments new_comment)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_comment).State = System.Data.Entity.EntityState.Added;
                db.SaveChanges();
                return new_comment.Id_Comment;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion

        #region AddNewFavorite
        //פונקציה של הוספת פרופיל חדש לטבלת הפרופילים
        public static bool AddNewFavorite(TBL_FavoriteRecp new_favorite)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_favorite).State = System.Data.Entity.EntityState.Added;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion
                       
        #region Add New Food Lables 2 Recipe
        //פונקציה של הוספת תוויות למתכון
        public static bool AddNewFoodLables2Recipe(List<TBL_LabelsForRecp> new_foodlbl2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_LabelsForRecp i in new_foodlbl2rcp)
                {
                    db.Entry(i).State = System.Data.Entity.EntityState.Added;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Add Holidays 2 Recipe
        //פונקציה של הוספת חגים למתכון
        public static bool AddHolidays2Recipe(List<TBL_HolidaysForRecp> new_hd2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_HolidaysForRecp i in new_hd2rcp)
                {
                    db.Entry(i).State = System.Data.Entity.EntityState.Added;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Add New Ingridiants 2 Recipe
        //פונקציה של הוספת מצרכים למתכון
        public static bool AddNewIngridiants2Recipe(List<TBL_IngridiantForRecp> new_ing2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_IngridiantForRecp i in new_ing2rcp)
                {
                    db.Entry(i).State = System.Data.Entity.EntityState.Added;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region AddNewFollow
        public static bool AddNewFollow(TBL_Followers new_follow)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_follow).State = System.Data.Entity.EntityState.Added;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion
        //*********************************************************************
        //              UPDATE
        //*********************************************************************
        #region Update User Info
        public static bool UpdateUserInfo(TBL_User newUser)
        {
            try
            {
                var db = Get_DB();
                TBL_User u = db.TBL_User.SingleOrDefault(x => x.Id_User == newUser.Id_User);
                if (u != null)
                {
                    u.FirstName = newUser.FirstName;
                    u.LastName = newUser.LastName;
                    u.Gender = newUser.Gender;
                    u.Email = newUser.Email;
                    u.Id_Type = newUser.Id_Type;
                    u.UserPass = newUser.UserPass;
                    u.UserStatus = newUser.UserStatus;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Update Profile Info
        public static bool UpdateProfileInfo(TBL_Profile newProfile)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile p = db.TBL_Profile.SingleOrDefault(x => x.Id_Prof == newProfile.Id_Prof);
                if (p != null)
                {
                    p.Name_Prof = newProfile.Name_Prof;
                    p.ProfDescription = newProfile.ProfDescription;
                    p.Id_City = newProfile.Id_City;
                    p.Id_Region = newProfile.Id_Region;
                    p.ProfStatus = newProfile.ProfStatus;
                    p.Image_Name = newProfile.Image_Name;
                    p.Image_Path = newProfile.Image_Path;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region Update Profile Image
        public static bool UpdateProfileImage(int profile_id,string img_name, string img_path)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile p = db.TBL_Profile.SingleOrDefault(x => x.Id_Prof == profile_id);
                if (p != null)
                {
                    p.Image_Name = img_name;
                    p.Image_Path = img_path;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Update Recipe Image
        public static bool UpdateRecipeImage(int recipe_id, string img_name, string img_path)
        {
            try
            {
                var db = Get_DB();
                TBL_Recipe r = db.TBL_Recipe.SingleOrDefault(x => x.Id_Recipe == recipe_id);
                if (r != null)
                {
                    r.Image_Name = img_name;
                    r.Image_Path= img_path;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Update Recipe
        public static bool UpdateRecipe(TBL_Recipe new_recipe)
        {
            try
            {
                var db = Get_DB();
                TBL_Recipe r = db.TBL_Recipe.SingleOrDefault(x => x.Id_Recipe == new_recipe.Id_Recipe);
                if (r != null)
                {
                    r.Name_Recipe = new_recipe.Name_Recipe;
                    r.Id_Recipe_DishCategory = new_recipe.Id_Recipe_DishCategory;
                    r.Id_Recipe_DishType = new_recipe.Id_Recipe_DishType;
                    r.Id_Recipe_FoodType = new_recipe.Id_Recipe_FoodType;
                    r.Id_Recipe_KitchenType = new_recipe.Id_Recipe_KitchenType;
                    r.Id_Recipe_Level = new_recipe.Id_Recipe_Level;
                    r.PreparationSteps = new_recipe.PreparationSteps;
                    r.RecipeTotalTime = new_recipe.RecipeTotalTime;
                    r.RecipeWorkTime = new_recipe.RecipeWorkTime;
                    r.Image_Name = new_recipe.Image_Name;
                    r.Image_Path = new_recipe.Image_Path;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region update Ing2Recp
        //פונקציה של הוספת מצרכים למתכון
        public static bool updateIng2Recp(List<TBL_IngridiantForRecp> update_ing2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_IngridiantForRecp i in update_ing2rcp)
                {
                    TBL_IngridiantForRecp ing = db.TBL_IngridiantForRecp.SingleOrDefault(x => x.Id == i.Id);
                    if (ing != null)
                    {
                        ing.Id_Mesurment = i.Id_Mesurment;
                        ing.Amount = i.Amount;
                    }
                    else
                        return false;
                }            
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion
       
        //*********************************************************************
        //              DELETE
        //*********************************************************************

        #region Delete ingridiantsForRecipe By Id
        //פונקציה של הוספת מצרכים למתכון
        public static bool DeleteById(List<TBL_IngridiantForRecp> delete_ing2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_IngridiantForRecp i in delete_ing2rcp)
                {
                    TBL_IngridiantForRecp ing = db.TBL_IngridiantForRecp.SingleOrDefault(x => x.Id == i.Id);
                    if (ing != null)
                    {
                        db.TBL_IngridiantForRecp.Remove(ing);
                            }
                    else
                        return false;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        # region DeleteFoodLabelsForRecipeById
        //פונקציה של הוספת מצרכים למתכון
        public static bool DeleteFoodLabelsForRecipeById(List<TBL_LabelsForRecp> delete_lbl2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_LabelsForRecp i in delete_lbl2rcp)
                {
                    TBL_LabelsForRecp lbl = db.TBL_LabelsForRecp.SingleOrDefault(x => x.Id == i.Id);
                    if (lbl != null)
                    {
                        db.TBL_LabelsForRecp.Remove(lbl);
                    }
                    else
                        return false;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region DeleteHolidaysForRecipeById
        //פונקציה של הוספת מצרכים למתכון
        public static bool DeleteHolidaysForRecipeById(List<TBL_HolidaysForRecp> delete_Holidays2rcp)
        {
            try
            {
                var db = Get_DB();
                //לעבור על כל הרשימה
                foreach (TBL_HolidaysForRecp i in delete_Holidays2rcp)
                {
                    TBL_HolidaysForRecp holiday = db.TBL_HolidaysForRecp.SingleOrDefault(x => x.Id == i.Id);
                    if (holiday != null)
                    {
                        db.TBL_HolidaysForRecp.Remove(holiday);
                    }
                    else
                        return false;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region RemoveCommentById
        //הסרת תגובה לפי תז
        public static bool RemoveCommentById(int comment_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Comments comments = db.TBL_Comments.SingleOrDefault(x => x.Id_Comment == comment_id);
                if (comments != null)
                    db.TBL_Comments.Remove(comments);
                else
                    return false;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region RemoveFollow
        //הסרת תגובה לפי תז
        public static bool RemoveFollow(TBL_Followers follow2remove)
        {
            try
            {
                var db = Get_DB();
                TBL_Followers f = db.TBL_Followers.SingleOrDefault(x => x.Id_Prof == follow2remove.Id_Prof && x.Id_User == follow2remove.Id_User);
                if (f != null)
                    db.TBL_Followers.Remove(f);
                else
                    return false;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region DeleteLike
        //הסרת לייד=ק למתכון לפי משתמש 
        public static bool DeleteLike(TBL_Likes _like)
        {
            try
            {
                var db = Get_DB();
                TBL_Likes like2delete = db.TBL_Likes.SingleOrDefault(x => x.Id_Recp == _like.Id_Recp && x.Id_User == _like.Id_User);
                if (like2delete != null)
                    db.TBL_Likes.Remove(like2delete);
                else
                    return false;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region DeleteFavorite
        //הסרת מתכון מהמועדפים לפי משתמש 
        public static bool DeleteFavorite(TBL_FavoriteRecp _favorite)
        {
            try
            {
                var db = Get_DB();
                TBL_FavoriteRecp favorite2delete = db.TBL_FavoriteRecp.SingleOrDefault(x => x.Id_Recp == _favorite.Id_Recp && x.Id_User == _favorite.Id_User);
                if (favorite2delete != null)
                    db.TBL_FavoriteRecp.Remove(favorite2delete);
                else
                    return false;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion
        //*********************************************************************
        //              OTHER
        //*********************************************************************

        #region Check Mail Available
        //check if mail exsist. if exsist - return false, else return true.
        public static bool CheckMailAvailable(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                if (user == null)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion
        
        #region LogIN
        // בודקת את האימייל והסיסמא של המשתשמש בכניסה
        public static TBL_User LogIn(string email, string pass)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email && x.UserPass == pass);//x => x.Email = user_details.Email && x.UserPass == user_details.Pass)
                if (user == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Check Profile Exsist By User Id
        // בודקת את האימייל והסיסמא של המשתשמש בכניסה
        public static TBL_Profile CheckProfileExsistByUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile profile = db.TBL_Profile.SingleOrDefault(x => x.Id_User == user_id);
                if (profile == null)
                    return null;
                else
                    return profile;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Send Mail
        public static bool SendMail(string user_mail)
        {
            try
            {
                var db = Get_DB();
                //string user_password 
                TBL_User user  = db.TBL_User.SingleOrDefault(x => x.Email == user_mail);//.UserPass.ToString();
                if (user == null)
                    return false;
                else
                {
                    var user_password = user.UserPass;
                    //SendMail to user with password
                    bool isSent = Mail.SendMail(user_mail, "Reset Password - Cookit", "Your password is: " + user_password + ".");
                    if (isSent)
                        return true;
                    else
                        return false;
                }
            }
            catch(Exception)
            {
                return false;
            }
        }
        #endregion

    }
}
