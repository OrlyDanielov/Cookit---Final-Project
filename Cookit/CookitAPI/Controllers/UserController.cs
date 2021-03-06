﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
//using CookitDB;
using CookitAPI.DTO;
using CookitAPI.DB_Code;
using CookitAPI;

namespace Cookit.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {        
        #region Login
        [Route("{email}/{pass}")]
        [HttpGet]
        public HttpResponseMessage Login(string email,string pass)
        {
            try
            {
                 //TBL_User user = CookitDB.DB_Code.CookitQueries.LogIn(email, pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.
                TBL_User user = CookitQueries.LogIn(email, pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (user == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this user does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    UserDTO result = new UserDTO();
                    result.id = user.Id_User;
                    result.user_type = user.Id_Type;
                    result.first_name = user.FirstName;
                    result.last_name = user.LastName;
                    result.email = user.Email;
                    result.gender = user.Gender;
                    result.pasword = user.UserPass;
                    result.status = user.UserStatus;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion        

        #region Check Mail Available
        //check if mail exsist. if exsist - return false, else return true.
        [Route("{email}/CheckMailAvailable")]
        [HttpGet]
        public HttpResponseMessage CheckMailAvailable(string email)
        {
            try
            {

                bool flag = CookitQueries.CheckMailAvailable(email);
                return Request.CreateResponse(HttpStatusCode.OK, flag);
            }

            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region GetUserFullNameByID
        [Route("GetUserFullNameByID/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetUserFullNameByID(int user_id)
        {
            try
            {
                 string user_full_name = CookitQueries.GetUserFullNameByID(user_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (user_full_name == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this user full name does not exist.");
                else               
                    return Request.CreateResponse(HttpStatusCode.OK, user_full_name);                
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region send mail with the password 2 user for reset password
        [Route("{email}/SendMail")]
        [HttpGet]
        public HttpResponseMessage SendMail(string email)//, int num)//Get_SendMail
        {
            try
            {
                  bool isSent = CookitQueries.SendMail(email);
                if (isSent)
                    return Request.CreateResponse(HttpStatusCode.OK, "");
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "the mail can't sent now.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Get User Id By Email
        //GetUserIdByEmail
        [Route("{email}/GetUserIdByEmail")]
        [HttpGet] 
        public HttpResponseMessage GetUserIdByEmail(string email)
        {
            try
            {
                int user_id = CookitQueries.GetUserByEmail(email);
                if (user_id > 0) // אם מצא את המשתמש
                     return Request.CreateResponse(HttpStatusCode.OK, user_id);
                else
                   return Request.CreateResponse(HttpStatusCode.NotFound, "this user does not exist./n "+user_id);
                
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Add New User
        [Route("AddNewUser")]
        [HttpPost]
        public HttpResponseMessage AddNewUser([FromBody]UserDTO newUser)
        {
            try
            {
                  TBL_User u = new TBL_User()
                {
                   Id_Type = newUser.user_type,
                   FirstName = newUser.first_name,
                   LastName = newUser.last_name,
                   Email = newUser.email,
                   Gender = newUser.gender,
                   UserPass = newUser.pasword,
                   UserStatus = newUser.status,
                };
                var user_id = CookitQueries.AddNewUser(u);
                if (user_id != -1)
                    return Request.CreateResponse(HttpStatusCode.OK, user_id);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the user.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Update User Info
        [Route("UpdateUserInfo")]
        [HttpPut]
        public HttpResponseMessage UpdateUserInfo([FromBody]UserDTO user)
        {
            try
            {
                TBL_User u  = new TBL_User()
                {
                    Id_User = user.id,
                    Id_Type = user.user_type,
                    FirstName = user.first_name,
                    LastName = user.last_name,
                    Email = user.email,
                    Gender = user.gender,
                    UserPass = user.pasword,
                    UserStatus = user.status
                };
                var is_saved = CookitQueries.UpdateUserInfo(u);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the user information updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update user information.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
    }
}