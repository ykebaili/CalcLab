
var app = newApplication();

app.Directories = "";
app.VersionInfo = "1";

//app.AddAuthorizationRole(aas.Roles.Anonymous, aas.Enum.AccessControl.ReadWrite);
app.OnApplicationStartCommand = 'InitialisationService.InitApp';

var ctxData = newContextData();

ctxData.Name = "MainData";
ctxData.NameSpaceList = "CalcLab";

