﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI;
using CookitAPI.DB_Code;
//using CookitDB;
using Cookit.DTO;

namespace Cookit.Controllers
{
    public class MesurmentsController : ApiController
    {
        //מחזיר את כל האופייני מדידה מבסיס הנתונים      
        [Route("api/Mesurments")]
        public HttpResponseMessage Get()
        {
            // קורא לפונקציה שמחזירה את כל אופני המדידה מהDB
            var dishType = CookitQueries.Get_all_Mesurments();
            if (dishType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no Mesurments in DB.");
            else
            {
                //המרה של רשימת אופני המדידה למבנה נתונים מסוג DTO
                List<MesurmentsDTO> result = new List<MesurmentsDTO>();
                foreach (TBL_Mesurments item in dishType)
                {
                    result.Add(new MesurmentsDTO
                    {
                        id = item.Id_Mesurment,
                        mesurment = item.Name_Mesurment.ToString()
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }

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