/// <reference path="app.d.ts" /> 

class PromisesExample {
    private _loggerInstance: Logger;

    constructor() {
        this._loggerInstance = new Logger();
    }

    public Start = () => {
        this._loggerInstance.Log("Main function Start started.");

        //Simple example where the defer is being resolved always. This is just to show how to use deferreds.
        this.ShowSimpleExample();

        //This is an example which shows how to handle the rejected deferred. 
        //First the method is called where we are asking it to resolve the deffered.
        this.ShowResolveAndReject(true);

        //Second we are asking the method to reject it. The same code above is pasted. But this time the error handler will be called.
        this.ShowResolveAndReject(false);

        //This is a method that can return data from the calling function
        //First we are asking the method to resolve
        this.ShowHowToReturnSimpleData(true);

        //Second we are asking it to reject
        this.ShowHowToReturnSimpleData(false);

        //This is a method that can return complex object from the calling function
        //First we are asking the method to resolve
        this.ShowHowToReturnComplexObject(true);

        //Second we are asking it to reject
        this.ShowHowToReturnComplexObject(false);

        //This is a method that can return complex object or a string from the calling function
        //First we are asking the method to resolve
        this.ShowHowToHandleDifferentReturnTypes(true);

        //Second we are asking it to reject
        this.ShowHowToHandleDifferentReturnTypes(false);

        this._loggerInstance.Log("Main function Start ended.");
    }

    private DeferThatOnlyResolves = (): JQueryPromise<void> => {
        var d = $.Deferred<void>();

        setTimeout(() => {
            this._loggerInstance.Log("Inside DeferThatOnlyResolves:: Timeout done. Resolving the deferred.");
            d.resolve();
        }, 1000);

        return d.promise();
    }

    private ShowSimpleExample = (): void => {
        this.DeferThatOnlyResolves().always(
            () => { //Gets called always. Whether a defer gets resolved or rejected
                this._loggerInstance.Log("DeferThatOnlyResolves resolved the deffered and control came to Start.");
            });
    }

    private DeferThatCanResolveOrReject = (shouldResolve: boolean): JQueryPromise<void> => {
        var d = $.Deferred<void>();

        setTimeout(() => {
            if (shouldResolve) {
                this._loggerInstance.Log("Inside DeferThatCanResolveOrReject:: Timeout done. Resolving the deferred.");
                d.resolve();
            }
            else {
                this._loggerInstance.Log("Inside DeferThatCanResolveOrReject:: Timeout done. Rejecting the deferred.");
                d.reject();
            }
        }, 2000);

        return d.promise();
    }

    private ShowResolveAndReject = (shouldResolve: boolean): void => {
        this.DeferThatCanResolveOrReject(shouldResolve).then(
            () => {//This is the success handler. Called when the defer is resolved.
                this._loggerInstance.Log("DeferThatCanResolveOrReject resolved the deffered and control came to Start.");
            },
            () => {//This is the error handler. Called when the defer is rejected.
                this._loggerInstance.Log("DeferThatCanResolveOrReject rejected the deffered and control came to Start.");
            });
    }

    private DeferThatReturnsDataToMainMethod = (shouldResolve: boolean): JQueryPromise<string> => {
        var d = $.Deferred<string>();

        setTimeout(() => {
            this._loggerInstance.Log("Inside DeferThatReturnsDataToMainMethod:: will return some string.");
            if (shouldResolve) {
                d.resolve("Yeaaa I got resolved... Message from the beyond...");
            }
            else {
                d.reject("OOPS! I got rejected... This is also a message form beyond");
            }
        }, 4000);

        return d.promise();
    }

    private ShowHowToReturnSimpleData = (shouldResolve: boolean): void => {
        this.DeferThatReturnsDataToMainMethod(shouldResolve).then(
            (message: string) => {//This is the success handler. Called when the defer is resolved.
                this._loggerInstance.Log("DeferThatReturnsDataToMainMethod resolved with message - " + message);
            },
            (message: string) => {//This is the error handler. Called when the defer is rejected.
                this._loggerInstance.Log("DeferThatReturnsDataToMainMethod rejected with message - " + message);
            });
    }

    private DeferThanCanReturnComplexObject = (shouldResolve: boolean): JQueryPromise<SomeDTOLikeObject> => {
        var d = $.Deferred<SomeDTOLikeObject>();

        setTimeout(() => {
            this._loggerInstance.Log("Inside DeferThanCanReturnComplexObject:: will return object.");
            var returnObj: SomeDTOLikeObject = {
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
    }

    private ShowHowToReturnComplexObject = (shouldResolve: boolean): void => {
        this.DeferThanCanReturnComplexObject(shouldResolve).then(
            (returnDTO: SomeDTOLikeObject) => {//This is the success handler. Called when the defer is resolved.
                this._loggerInstance.Log("DeferThanCanReturnComplexObject resolved with message - " + JSON.stringify(returnDTO));
            },
            (returnDTO: SomeDTOLikeObject) => {//This is the error handler. Called when the defer is rejected.
                this._loggerInstance.Log("DeferThanCanReturnComplexObject rejected with message - " + JSON.stringify(returnDTO));
            });
    }

    private DeferThatCanReturnMultipleTypesOfData = (shouldResolve: boolean): JQueryPromise<SomeDTOLikeObject | string> => {
        var d = $.Deferred<SomeDTOLikeObject | string>();

        setTimeout(() => {

            if (shouldResolve) {
                this._loggerInstance.Log("Inside DeferThatCanReturnMultipleTypesOfData:: will return object.");
                var returnObj: SomeDTOLikeObject = {
                    Property1: "Yeaaa I got resolved... Message from the beyond...",
                    Property2: 12,
                    IsSuccess: shouldResolve
                };
                d.resolve(returnObj);
            }
            else {
                this._loggerInstance.Log("Inside DeferThatCanReturnMultipleTypesOfData:: will return string.");
                d.reject("OOPS! I got rejected... This is also a message form beyond");
            }
        }, 4300);

        return d.promise();
    }

    private ShowHowToHandleDifferentReturnTypes = (shouldResolve: boolean): void => {
        this.DeferThatCanReturnMultipleTypesOfData(shouldResolve).then(
            (returnDTO: SomeDTOLikeObject) => {//This is the success handler. Called when the defer is resolved.
                this._loggerInstance.Log("DeferThatCanReturnMultipleTypesOfData resolved with message - " + JSON.stringify(returnDTO));
            },
            (resultMessage: string) => {//This is the error handler. Called when the defer is rejected.
                this._loggerInstance.Log("DeferThatCanReturnMultipleTypesOfData rejected with message - " + resultMessage);
            });
    }
}