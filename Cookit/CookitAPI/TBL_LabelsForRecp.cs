//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CookitAPI
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_LabelsForRecp
    {
        public int Id { get; set; }
        public int Id_Recp { get; set; }
        public int Id_FoodLabel { get; set; }
    
        public virtual TBL_FoodLabel TBL_FoodLabel { get; set; }
        public virtual TBL_Recipe TBL_Recipe { get; set; }
    }
}
