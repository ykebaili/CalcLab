
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.ComponentModel;

using Aspectize.Core;

[assembly:AspectizeDALAssemblyAttribute]

namespace CalcLab
{
	public static partial class SchemaNames
	{
		public static partial class Entities
		{
			public const string ExpressionAnalysable = "ExpressionAnalysable";
		}
	}

	[SchemaNamespace]
	public class DomainProvider : INamespace
	{
		public string Name { get { return GetType().Namespace; } }
		public static string DomainName { get { return new DomainProvider().Name; } }
	}


	[DataDefinition]
	public class ExpressionAnalysable : Entity, IDataWrapper
	{
		public static partial class Fields
		{
			public const string Id = "Id";
			public const string Formule = "Formule";
			public const string Resultat = "Resultat";
		}

		void IDataWrapper.InitData(DataRow data, string namePrefix)
		{
			base.InitData(data, null);
		}

		[Data(IsPrimaryKey=true)]
		public Guid Id
		{
			get { return getValue<Guid>("Id"); }
			set { setValue<Guid>("Id", value); }
		}

		[Data]
		public string Formule
		{
			get { return getValue<string>("Formule"); }
			set { setValue<string>("Formule", value); }
		}

		[Data]
		public string Resultat
		{
			get { return getValue<string>("Resultat"); }
			set { setValue<string>("Resultat", value); }
		}

	}

}


  
