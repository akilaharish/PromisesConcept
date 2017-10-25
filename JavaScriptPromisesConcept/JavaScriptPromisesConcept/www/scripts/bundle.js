/// <reference path="app.d.ts" /> 
$(document).ready(function () {
    var startExample = new PromisesExample();
    startExample.Start();
});
/// <reference path="app.d.ts" />
var Logger = (function () {
    function Logger() {
        var _this = this;
        this._serialNo = 1;
        this.Log = function (message) {
            $("#divLog").html($("#divLog").html() + "<br/><br/>" + _this._serialNo++ + ". " + message);
        };
    }
    return Logger;
}());
/// <reference path="app.d.ts" /> 
var PromisesExample = (function () {
    function PromisesExample() {
        var _this = this;
        this.Start = function () {
            _this._loggerInstance.Log("Main function Start started.");
            //Simple example where the defer is being resolved always. This is just to show how to use deferreds.
            _this.ShowSimpleExample();
            //This is an example which shows how to handle the rejected deferred. 
            //First the method is called where we are asking it to resolve the deffered.
            _this.ShowResolveAndReject(true);
            //Second we are asking the method to reject it. The same code above is pasted. But this time the error handler will be called.
            _this.ShowResolveAndReject(false);
            //This is a method that can return data from the calling function
            //First we are asking the method to resolve
            _this.ShowHowToReturnSimpleData(true);
            //Second we are asking it to reject
            _this.ShowHowToReturnSimpleData(false);
            //This is a method that can return complex object from the calling function
            //First we are asking the method to resolve
            _this.ShowHowToReturnComplexObject(true);
            //Second we are asking it to reject
            _this.ShowHowToReturnComplexObject(false);
            //This is a method that can return complex object or a string from the calling function
            //First we are asking the method to resolve
            _this.ShowHowToHandleDifferentReturnTypes(true);
            //Second we are asking it to reject
            _this.ShowHowToHandleDifferentReturnTypes(false);
            _this._loggerInstance.Log("Main function Start ended.");
        };
        this.DeferThatOnlyResolves = function () {
            var d = $.Deferred();
            setTimeout(function () {
                _this._loggerInstance.Log("Inside DeferThatOnlyResolves:: Timeout done. Resolving the deferred.");
                d.resolve();
            }, 1000);
            return d.promise();
        };
        this.ShowSimpleExample = function () {
            _this.DeferThatOnlyResolves().always(function () {
                _this._loggerInstance.Log("DeferThatOnlyResolves resolved the deffered and control came to Start.");
            });
        };
        this.DeferThatCanResolveOrReject = function (shouldResolve) {
            var d = $.Deferred();
            setTimeout(function () {
                if (shouldResolve) {
                    _this._loggerInstance.Log("Inside DeferThatCanResolveOrReject:: Timeout done. Resolving the deferred.");
                    d.resolve();
                }
                else {
                    _this._loggerInstance.Log("Inside DeferThatCanResolveOrReject:: Timeout done. Rejecting the deferred.");
                    d.reject();
                }
            }, 2000);
            return d.promise();
        };
        this.ShowResolveAndReject = function (shouldResolve) {
            _this.DeferThatCanResolveOrReject(shouldResolve).then(function () {
                _this._loggerInstance.Log("DeferThatCanResolveOrReject resolved the deffered and control came to Start.");
            }, function () {
                _this._loggerInstance.Log("DeferThatCanResolveOrReject rejected the deffered and control came to Start.");
            });
        };
        this.DeferThatReturnsDataToMainMethod = function (shouldResolve) {
            var d = $.Deferred();
            setTimeout(function () {
                _this._loggerInstance.Log("Inside DeferThatReturnsDataToMainMethod:: will return some string.");
                if (shouldResolve) {
                    d.resolve("Yeaaa I got resolved... Message from the beyond...");
                }
                else {
                    d.reject("OOPS! I got rejected... This is also a message form beyond");
                }
            }, 4000);
            return d.promise();
        };
        this.ShowHowToReturnSimpleData = function (shouldResolve) {
            _this.DeferThatReturnsDataToMainMethod(shouldResolve).then(function (message) {
                _this._loggerInstance.Log("DeferThatReturnsDataToMainMethod resolved with message - " + message);
            }, function (message) {
                _this._loggerInstance.Log("DeferThatReturnsDataToMainMethod rejected with message - " + message);
            });
        };
        this.DeferThanCanReturnComplexObject = function (shouldResolve) {
            var d = $.Deferred();
            setTimeout(function () {
                _this._loggerInstance.Log("Inside DeferThanCanReturnComplexObject:: will return object.");
                var returnObj = {
                    Property1: "",
                    Property2: 10,
                    IsSuccess: shouldResolve
                };
                if (shouldResolve) {
                    returnObj.Property1 = "Yeaaa I got resolved... Message from the beyond...";
                    d.resolve(returnObj);
                }
                else {
                    returnObj.Property1 = "OOPS! I got rejected... This is also a message form beyond";
                    d.reject(returnObj);
                }
            }, 4300);
            return d.promise();
        };
        this.ShowHowToReturnComplexObject = function (shouldResolve) {
            _this.DeferThanCanReturnComplexObject(shouldResolve).then(function (returnDTO) {
                _this._loggerInstance.Log("DeferThanCanReturnComplexObject resolved with message - " + JSON.stringify(returnDTO));
            }, function (returnDTO) {
                _this._loggerInstance.Log("DeferThanCanReturnComplexObject rejected with message - " + JSON.stringify(returnDTO));
            });
        };
        this.DeferThatCanReturnMultipleTypesOfData = function (shouldResolve) {
            var d = $.Deferred();
            setTimeout(function () {
                if (shouldResolve) {
                    _this._loggerInstance.Log("Inside DeferThatCanReturnMultipleTypesOfData:: will return object.");
                    var returnObj = {
                        Property1: "Yeaaa I got resolved... Message from the beyond...",
                        Property2: 12,
                        IsSuccess: shouldResolve
                    };
                    d.resolve(returnObj);
                }
                else {
                    _this._loggerInstance.Log("Inside DeferThatCanReturnMultipleTypesOfData:: will return string.");
                    d.reject("OOPS! I got rejected... This is also a message form beyond");
                }
            }, 4300);
            return d.promise();
        };
        this.ShowHowToHandleDifferentReturnTypes = function (shouldResolve) {
            _this.DeferThatCanReturnMultipleTypesOfData(shouldResolve).then(function (returnDTO) {
                _this._loggerInstance.Log("DeferThatCanReturnMultipleTypesOfData resolved with message - " + JSON.stringify(returnDTO));
            }, function (resultMessage) {
                _this._loggerInstance.Log("DeferThatCanReturnMultipleTypesOfData rejected with message - " + resultMessage);
            });
        };
        this._loggerInstance = new Logger();
    }
    return PromisesExample;
}());
//# sourceMappingURL=bundle.js.map