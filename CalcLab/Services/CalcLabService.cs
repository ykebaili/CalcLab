using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using System.Security.Permissions;
using sc2i.common;
using sc2i.expression;
using System.Collections;

namespace CalcLab.Services
{
    public interface ICalcLabService
    {
        DataSet Evaluer(string strExpression, string id);
    }

    [Service(Name = "CalcLabService")]
    public class CalcLabService : ICalcLabService //, IInitializable, ISingleton
    {
        public DataSet Evaluer(string strFormule, string id)
        {
            CResultAErreur result = CResultAErreur.True;

            IEntityManager em = EntityManager.FromDataSet(DataSetHelper.Create());
            ExpressionAnalysable exp;

            if (id != null && id != "")
                exp = em.GetInstance<ExpressionAnalysable>(id);
            else
                exp = em.CreateInstance<ExpressionAnalysable>();
            exp.Formule = strFormule;
            exp.Resultat = "";

            if (strFormule == "")
                return em.Data;

            C2iExpression formule;
            string strResultat = "";
            Hashtable tableLastFormuleDuType = new Hashtable();
            int nLastIndex = 0;

            // Analyser l'expression
            //Type tp = m_objet.GetType();
            CContexteAnalyse2iExpression ctx = new CContexteAnalyse2iExpression(new CFournisseurGeneriqueProprietesDynamiques(), null);
            CAnalyseurSyntaxiqueExpression analyseur = new CAnalyseurSyntaxiqueExpression(ctx);

            try
            {
                result = analyseur.AnalyseChaine(strFormule);
                if (result)
                    formule = (C2iExpression)result.Data;
                else
                {
                    result.EmpileErreur("Erreur dans la formule");
                    exp.Resultat = result.MessageErreur;
                    em.Data.AcceptChanges();
                    return em.Data;
                }

                // Evaluer l'expression
                if (formule != null)
                {
                    CContexteEvaluationExpression contexte = new CContexteEvaluationExpression(null);
                    result = formule.Eval(contexte);
                    if (!result)
                    {
                        exp.Resultat = result.MessageErreur;
                        em.Data.AcceptChanges();
                        return em.Data;
                    }
                    if (result.Data == null)
                        strResultat += "null";
                    else
                        strResultat += result.Data.ToString();

                    exp.Resultat = strResultat;
                    em.Data.AcceptChanges();
                    return em.Data;
                }
            }
            catch (Exception e)
            {
                result.EmpileErreur(new CErreurException(e));
            }

            return em.Data;
        }
    }

}
