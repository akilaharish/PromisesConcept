/// <reference path="app.d.ts" />

class Logger {
    private _serialNo: number = 1;
    public Log = (message: string) => {
        $("#divLog").html($("#divLog").html() + "<br/><br/>" + this._serialNo++ + ". " + message);
    }
}