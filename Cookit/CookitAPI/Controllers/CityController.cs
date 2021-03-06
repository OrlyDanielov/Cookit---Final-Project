﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
//using CookitDB;
using CookitAPI;
using CookitAPI.DB_Code;


namespace CookitAPI.Controllers
{
    [RoutePrefix("api/City")]
    public class CityController : ApiController
    {

        #region GetAllCities
        //מחזיר את כל הערים מבסיס הנתונים
        [Route("GetAllCities")]
        [HttpGet]
        public HttpResponseMessage GetAllCities()
        {
            // קורא לפונקציה שמחזירה את של הערים מהDB
            var cities = CookitQueries.Get_all_cities();
            if (cities == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no cities in DB.");
            else
            {
                //המרה של רשימת הערים למבנה נתונים מסוג DTO
                List<CityDTO> result = new List<CityDTO>();
                foreach (TBL_City item in cities)
                {

                    result.Add(new CityDTO
                    {
                        id_city = item.Id_City,
                        city_name = item.CityName.ToString(),
                        id_region = item.Id_Region
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

    
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}