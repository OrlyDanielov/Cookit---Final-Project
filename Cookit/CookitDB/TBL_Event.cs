//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CookitDB
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_Event
    {
        public int Id_Event { get; set; }
        public int Id_Prof { get; set; }
        public string Name_Event { get; set; }
        public System.DateTime Event_Date { get; set; }
        public string Place_Event { get; set; }
        public string Description_Event { get; set; }
        public Nullable<bool> StatusCancelation { get; set; }
    
        public virtual TBL_Profile TBL_Profile { get; set; }
    }
}