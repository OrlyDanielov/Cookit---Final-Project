﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Cookit_DBConnection : DbContext
    {
        public Cookit_DBConnection()
            : base("name=Cookit_DBConnection")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<TBL_DishCategory> TBL_DishCategory { get; set; }
        public virtual DbSet<TBL_DishType> TBL_DishType { get; set; }
        public virtual DbSet<TBL_FavoriteRecp> TBL_FavoriteRecp { get; set; }
        public virtual DbSet<TBL_Followers> TBL_Followers { get; set; }
        public virtual DbSet<TBL_FoodLabel> TBL_FoodLabel { get; set; }
        public virtual DbSet<TBL_FoodType> TBL_FoodType { get; set; }
        public virtual DbSet<TBL_Holiday> TBL_Holiday { get; set; }
        public virtual DbSet<TBL_HolidaysForRecp> TBL_HolidaysForRecp { get; set; }
        public virtual DbSet<TBL_IngridiantForRecp> TBL_IngridiantForRecp { get; set; }
        public virtual DbSet<TBL_Ingridiants> TBL_Ingridiants { get; set; }
        public virtual DbSet<TBL_KitchenType> TBL_KitchenType { get; set; }
        public virtual DbSet<TBL_LabelsForRecp> TBL_LabelsForRecp { get; set; }
        public virtual DbSet<TBL_Likes> TBL_Likes { get; set; }
        public virtual DbSet<TBL_Mesurments> TBL_Mesurments { get; set; }
        public virtual DbSet<TBL_Recipe> TBL_Recipe { get; set; }
        public virtual DbSet<TBL_RecipeDifficultyLevel> TBL_RecipeDifficultyLevel { get; set; }
        public virtual DbSet<TBL_User> TBL_User { get; set; }
        public virtual DbSet<TBL_UserType> TBL_UserType { get; set; }
        public virtual DbSet<TBL_City> TBL_City { get; set; }
        public virtual DbSet<TBL_Region> TBL_Region { get; set; }
        public virtual DbSet<TBL_Profile> TBL_Profile { get; set; }
        public virtual DbSet<TBL_Comments> TBL_Comments { get; set; }
    }
}
