using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using System.Security.Permissions;
using sc2i.common;
using System.Reflection;
using sc2i.expression;

namespace CalcLab.Services
{
    public interface IInitialisationService
    {
        void InitApp();
    }

    [Service(Name = "InitialisationService")]
    public class InitialisationService : IInitialisationService  //, IInitializable, ISingleton
    {
        public void InitApp()
        {
            //AssemblyName expression = new AssemblyName("sc2i.expression");
            //AppDomain.CurrentDomain.Load(@"C:\www\Applications\CalcLab\sc2i.expression"); 

            //CAutoexecuteurClasses.RunAutoexecsWithExclude(AutoExecAttribute.BackGroundService);

            C2iExpression.RegisterAllInAssembly();

        }
    }

}
