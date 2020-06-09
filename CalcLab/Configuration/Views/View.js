
var mainView = Aspectize.CreateView("MainView", aas.Controls.MainControl, "", true, aas.Data.MainData.ExpressionAnalysable);
mainView.ButtonEvaluer.click.BindCommand(aas.Services.Server.CalcLabService.Evaluer(mainView.TextExpression.value, mainView.ParentData.Id), "MainData", true, true);
mainView.ResultatExpression.BindData(mainView.ParentData.Resultat);

