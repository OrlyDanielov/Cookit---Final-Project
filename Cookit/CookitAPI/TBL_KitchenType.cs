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
    
    public partial class TBL_KitchenType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TBL_KitchenType()
        {
            this.TBL_Recipe = new HashSet<TBL_Recipe>();
        }
    
        public int Id_Kitchen { get; set; }
        public string Kitchen_Name { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Recipe> TBL_Recipe { get; set; }
    }
}