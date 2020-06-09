/// <reference path="C:\www\\Aspectize.core\AspectizeIntellisenseLibrary.js" />

function Main(args) {
	
	Aspectize.App.OnUserActivity = function (presence) {
		// presence = true if ExecuteCommand
		// presence = false if no ExecuteCommand after 5 minutes (Aspectize.App.InactiveMinutes = 5) 
    };
	
	Aspectize.App.OnNewVersion = function (version) {
    };
	
	Aspectize.App.OnEnd = function () {
	};
	
    Aspectize.App.Initialize(function () {
		Aspectize.ExecuteCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.MainView));
	});
}
