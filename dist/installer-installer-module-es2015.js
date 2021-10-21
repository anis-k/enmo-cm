(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["installer-installer-module"],{

/***/ "/XJU":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/customization/customization.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\"><i class=\"fas fa-tools\"></i> {{'lang.customization' | translate}}</h2>\n    <div class=\"alert-message alert-message-info\" role=\"alert\" style=\"margin-top: 30px;min-width: 100%;\">\n        {{'lang.stepCustomization_desc' | translate}}\n    </div>\n    <form [formGroup]=\"stepFormGroup\" style=\"display: contents;\">\n        <div class=\"col-md-6\">\n            <mat-form-field appearance=\"outline\">\n                <mat-label>{{'lang.instanceId' | translate}}</mat-label>\n                <input matInput formControlName=\"customId\">\n                <mat-error>\n                    <ng-container *ngIf=\"stepFormGroup.controls['customId'].errors?.customExist\">\n                        {{'lang.customAlreadyExist' | translate}}\n                    </ng-container>\n                    <ng-container *ngIf=\"stepFormGroup.controls['customId'].errors?.invalidCustomName\">\n                        {{'lang.invalidCustomName' | translate}}\n                    </ng-container>\n                    <ng-container *ngIf=\"stepFormGroup.controls['customId'].errors?.pattern\">\n                        {{'lang.onlySpecialCharAllowed' | translate:{value1: '\"_\", \"-\"'} }}\n                    </ng-container>\n                    <ng-container *ngIf=\"stepFormGroup.controls['customId'].errors?.minlength\">\n                        {{'lang.invalidLengthCustomName' | translate:{value1: '2'} }}\n                    </ng-container>\n                </mat-error>\n            </mat-form-field>\n            <mat-form-field appearance=\"outline\">\n                <mat-label>{{'lang.applicationName' | translate}}</mat-label>\n                <input matInput formControlName=\"appName\">\n            </mat-form-field>\n            <div>{{'lang.loginMsg' | translate}} : </div>\n            <textarea style=\"padding-top: 10px;\" name=\"loginMessage\" id=\"loginMessage\"\n                formControlName=\"loginMessage\"></textarea>\n            <br />\n            <br />\n            <div>{{'lang.homeMsg' | translate}} : </div>\n            <textarea style=\"padding-top: 10px;\" name=\"homeMessage\" id=\"homeMessage\"\n                formControlName=\"homeMessage\"></textarea>\n            <br />\n            <br />\n        </div>\n        <div class=\"col-md-6\">\n            <div>{{'lang.chooseLogo' | translate}} : </div>\n            <div>\n                <mat-card style=\"width: 350px;background-size: 100%;cursor: pointer;\" matRipple>\n                    <img [src]=\"logoURL()\" (click)=\"clickLogoButton(uploadLogo)\" style=\"width: 100%;\" />\n                    <input type=\"file\" name=\"files[]\" #uploadLogo (change)=\"uploadTrigger($event, 'logo')\"\n                        accept=\"image/svg+xml\" style=\"display: none;\">\n                </mat-card>\n            </div>\n            <br />\n            <div>{{'lang.chooseLoginBg' | translate}} : </div>\n            <div class=\"backgroundList\">\n                <mat-card (click)=\"selectBg('assets/bodylogin.jpg')\" style=\"opacity: 0.3;\" class=\"backgroundItem\"\n                    [class.disabled]=\"stepFormGroup.controls['bodyLoginBackground'].disabled\"\n                    [class.selected]=\"stepFormGroup.controls['bodyLoginBackground'].value === 'assets/bodylogin.jpg'\"\n                    style=\"background:url(assets/bodylogin.jpg);background-size: cover;\">\n                </mat-card>\n                <mat-card *ngFor=\"let background of backgroundList\"\n                    (click)=\"selectBg(background.url)\"\n                    style=\"opacity: 0.3;\" class=\"backgroundItem\"\n                    [class.selected]=\"background.url === stepFormGroup.controls['bodyLoginBackground'].value\"\n                    [class.disabled]=\"stepFormGroup.controls['bodyLoginBackground'].disabled\"\n                    [style.background]=\"'url('+background.url+')'\">\n                </mat-card>\n                <mat-card *ngIf=\"!stepFormGroup.controls['bodyLoginBackground'].disabled\"\n                    style=\"opacity: 0.3;display: flex;align-items: center;justify-content: center;\"\n                    class=\"backgroundItem\" (click)=\"uploadFile.click()\">\n                    <input type=\"file\" name=\"files[]\" #uploadFile (change)=\"uploadTrigger($event, 'bg')\"\n                        accept=\"image/jpeg\" style=\"display: none;\">\n                    <i class=\"fa fa-plus\" style=\"font-size: 30px;color: #666;\"></i>\n                </mat-card>\n            </div>\n        </div>\n    </form>\n</div>\n");

/***/ }),

/***/ "0Al4":
/*!*********************************************************************!*\
  !*** ./src/frontend/app/installer/database/database.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RhdGFiYXNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBRUksWUFBQTtBQURKO0FBRUk7RUFDSSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSxVQUFBO0FBQVIiLCJmaWxlIjoiZGF0YWJhc2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5zdGVwQ29udGVudCB7XG4gICAgLy8gbWF4LXdpZHRoOiA4NTBweDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgLnN0ZXBDb250ZW50VGl0bGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWFhcmNoLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxufVxuIl19 */");

/***/ }),

/***/ "3qZk":
/*!*******************************************************************!*\
  !*** ./src/frontend/app/installer/welcome/welcome.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n.stepContent .maarchLogoFull {\n  width: 300px;\n  height: 100px;\n}\n.stepContent .mat-divider {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.link {\n  text-decoration: underline;\n  color: var(--maarch-color-primary) !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3dlbGNvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFFSSxZQUFBO0FBREo7QUFHSTtFQUNJLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7QUFEUjtBQUlJO0VBQ0ksWUFBQTtFQUNBLGFBQUE7QUFGUjtBQUtJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQUhSO0FBT0E7RUFDSSwwQkFBQTtFQUNBLDZDQUFBO0FBSkoiLCJmaWxlIjoid2VsY29tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnN0ZXBDb250ZW50IHtcbiAgICAvL21heC13aWR0aDogODUwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuXG4gICAgLnN0ZXBDb250ZW50VGl0bGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWFhcmNoLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICAgIFxuICAgIC5tYWFyY2hMb2dvRnVsbHtcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIH1cbiAgICBcbiAgICAubWF0LWRpdmlkZXIge1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIH1cbn1cblxuLmxpbmsge1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIGNvbG9yOiB2YXIoLS1tYWFyY2gtY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "6S62":
/*!********************************************************!*\
  !*** ./src/frontend/app/installer/installer.module.ts ***!
  \********************************************************/
/*! exports provided: InstallerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallerModule", function() { return InstallerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_common_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app-common.module */ "vWc3");
/* harmony import */ var _service_translate_internationalization_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @service/translate/internationalization.module */ "cMWS");
/* harmony import */ var _installer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./installer.component */ "M6B2");
/* harmony import */ var _install_action_install_action_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./install-action/install-action.component */ "KNaP");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./welcome/welcome.component */ "AHpz");
/* harmony import */ var _prerequisite_prerequisite_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./prerequisite/prerequisite.component */ "YKdi");
/* harmony import */ var _database_database_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./database/database.component */ "6mgl");
/* harmony import */ var _docservers_docservers_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./docservers/docservers.component */ "7gxL");
/* harmony import */ var _customization_customization_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./customization/customization.component */ "CImi");
/* harmony import */ var _useradmin_useradmin_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useradmin/useradmin.component */ "OgGL");
/* harmony import */ var _installer_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./installer-routing.module */ "QCVa");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./installer.service */ "S2qH");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");















let InstallerModule = class InstallerModule {
    constructor(translate) {
        translate.setDefaultLang('fr');
    }
};
InstallerModule.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__["TranslateService"] }
];
InstallerModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _app_common_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _service_translate_internationalization_module__WEBPACK_IMPORTED_MODULE_3__["InternationalizationModule"],
            _installer_routing_module__WEBPACK_IMPORTED_MODULE_12__["InstallerRoutingModule"]
        ],
        declarations: [
            _install_action_install_action_component__WEBPACK_IMPORTED_MODULE_5__["InstallActionComponent"],
            _installer_component__WEBPACK_IMPORTED_MODULE_4__["InstallerComponent"],
            _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_6__["WelcomeComponent"],
            _prerequisite_prerequisite_component__WEBPACK_IMPORTED_MODULE_7__["PrerequisiteComponent"],
            _database_database_component__WEBPACK_IMPORTED_MODULE_8__["DatabaseComponent"],
            _docservers_docservers_component__WEBPACK_IMPORTED_MODULE_9__["DocserversComponent"],
            _customization_customization_component__WEBPACK_IMPORTED_MODULE_10__["CustomizationComponent"],
            _useradmin_useradmin_component__WEBPACK_IMPORTED_MODULE_11__["UseradminComponent"],
        ],
        entryComponents: [_install_action_install_action_component__WEBPACK_IMPORTED_MODULE_5__["InstallActionComponent"]],
        providers: [_installer_service__WEBPACK_IMPORTED_MODULE_13__["InstallerService"]]
    })
], InstallerModule);



/***/ }),

/***/ "6mgl":
/*!*******************************************************************!*\
  !*** ./src/frontend/app/installer/database/database.component.ts ***!
  \*******************************************************************/
/*! exports provided: DatabaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseComponent", function() { return DatabaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_database_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./database.component.html */ "iOzh");
/* harmony import */ var _database_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database.component.scss */ "0Al4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _service_functions_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @service/functions.service */ "rH+9");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../installer.service */ "S2qH");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "kU1M");












let DatabaseComponent = class DatabaseComponent {
    constructor(translate, http, _formBuilder, notify, functionsService, installerService) {
        this.translate = translate;
        this.http = http;
        this._formBuilder = _formBuilder;
        this.notify = notify;
        this.functionsService = functionsService;
        this.installerService = installerService;
        this.hide = true;
        this.connectionState = false;
        this.dbExist = false;
        this.dataFiles = [];
        this.nextStep = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        const valDbName = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[^\;\" \\]+$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required];
        const valLoginDb = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[^ ]+$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required];
        this.stepFormGroup = this._formBuilder.group({
            dbHostCtrl: ['localhost', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            dbLoginCtrl: ['', valLoginDb],
            dbPortCtrl: ['5432', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            dbPasswordCtrl: ['', valLoginDb],
            dbNameCtrl: ['', valDbName],
            dbSampleCtrl: ['data_fr', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            stateStep: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    }
    ngOnInit() {
        this.stepFormGroup.controls['dbHostCtrl'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
        this.stepFormGroup.controls['dbLoginCtrl'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
        this.stepFormGroup.controls['dbPortCtrl'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
        this.stepFormGroup.controls['dbPasswordCtrl'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
        this.stepFormGroup.controls['dbNameCtrl'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
        this.getDataFiles();
    }
    getDataFiles() {
        this.http.get('../rest/installer/sqlDataFiles').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])((data) => {
            this.dataFiles = data.dataFiles;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["catchError"])((err) => {
            this.notify.handleSoftErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
        })).subscribe();
    }
    isValidConnection() {
        return false;
    }
    initStep() {
        if (this.installerService.isStepAlreadyLaunched('database')) {
            this.stepFormGroup.disable();
        }
    }
    checkConnection() {
        const info = {
            server: this.stepFormGroup.controls['dbHostCtrl'].value,
            port: this.stepFormGroup.controls['dbPortCtrl'].value,
            user: this.stepFormGroup.controls['dbLoginCtrl'].value,
            password: this.stepFormGroup.controls['dbPasswordCtrl'].value,
            name: this.stepFormGroup.controls['dbNameCtrl'].value
        };
        this.http.get('../rest/installer/databaseConnection', { observe: 'response', params: info }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["tap"])((data) => {
            this.dbExist = data.status === 200;
            this.notify.success(this.translate.instant('lang.rightInformations'));
            this.stepFormGroup.controls['stateStep'].setValue('success');
            this.nextStep.emit();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["catchError"])((err) => {
            this.dbExist = false;
            if (err.error.errors === 'Given database has tables') {
                this.notify.error(this.translate.instant('lang.dbNotEmpty'));
            }
            else {
                this.notify.error(this.translate.instant('lang.badInformations'));
            }
            this.stepFormGroup.markAllAsTouched();
            this.stepFormGroup.controls['stateStep'].setValue('');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
        })).subscribe();
    }
    checkStep() {
        return this.stepFormGroup.valid;
    }
    isValidStep() {
        if (this.installerService.isStepAlreadyLaunched('database')) {
            return true;
        }
        else {
            return this.stepFormGroup === undefined ? false : this.stepFormGroup.valid;
        }
    }
    isEmptyConnInfo() {
        return this.stepFormGroup.controls['dbHostCtrl'].invalid ||
            this.stepFormGroup.controls['dbPortCtrl'].invalid ||
            this.stepFormGroup.controls['dbLoginCtrl'].invalid ||
            this.stepFormGroup.controls['dbPasswordCtrl'].invalid ||
            this.stepFormGroup.controls['dbNameCtrl'].invalid;
    }
    getFormGroup() {
        return this.installerService.isStepAlreadyLaunched('database') ? true : this.stepFormGroup;
    }
    getInfoToInstall() {
        return [{
                idStep: 'database',
                body: {
                    server: this.stepFormGroup.controls['dbHostCtrl'].value,
                    port: this.stepFormGroup.controls['dbPortCtrl'].value,
                    user: this.stepFormGroup.controls['dbLoginCtrl'].value,
                    password: this.stepFormGroup.controls['dbPasswordCtrl'].value,
                    name: this.stepFormGroup.controls['dbNameCtrl'].value,
                    data: this.stepFormGroup.controls['dbSampleCtrl'].value
                },
                route: {
                    method: 'POST',
                    url: '../rest/installer/database'
                },
                description: this.translate.instant('lang.stepDatabaseActionDesc'),
                installPriority: 2
            }];
    }
};
DatabaseComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] },
    { type: _service_functions_service__WEBPACK_IMPORTED_MODULE_9__["FunctionsService"] },
    { type: _installer_service__WEBPACK_IMPORTED_MODULE_10__["InstallerService"] }
];
DatabaseComponent.propDecorators = {
    nextStep: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
DatabaseComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-database',
        template: _raw_loader_database_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_database_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DatabaseComponent);



/***/ }),

/***/ "7gxL":
/*!***********************************************************************!*\
  !*** ./src/frontend/app/installer/docservers/docservers.component.ts ***!
  \***********************************************************************/
/*! exports provided: DocserversComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocserversComponent", function() { return DocserversComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_docservers_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./docservers.component.html */ "sqCo");
/* harmony import */ var _docservers_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./docservers.component.scss */ "WGJY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../installer.service */ "S2qH");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "kU1M");











let DocserversComponent = class DocserversComponent {
    constructor(translate, _formBuilder, notify, http, installerService) {
        this.translate = translate;
        this._formBuilder = _formBuilder;
        this.notify = notify;
        this.http = http;
        this.installerService = installerService;
        this.nextStep = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        const valPath = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[^\'\<\>\|\*\:\?]+$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required];
        this.stepFormGroup = this._formBuilder.group({
            docserversPath: ['/opt/maarch/docservers/', valPath],
            stateStep: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.stepFormGroup.controls['docserversPath'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])(() => this.stepFormGroup.controls['stateStep'].setValue(''))).subscribe();
    }
    ngOnInit() {
    }
    isValidStep() {
        if (this.installerService.isStepAlreadyLaunched('docserver')) {
            return true;
        }
        else {
            return this.stepFormGroup === undefined ? false : this.stepFormGroup.valid;
        }
    }
    initStep() {
        if (this.installerService.isStepAlreadyLaunched('docserver')) {
            this.stepFormGroup.disable();
        }
    }
    getFormGroup() {
        return this.installerService.isStepAlreadyLaunched('docserver') ? true : this.stepFormGroup;
    }
    checkAvailability() {
        const info = {
            path: this.stepFormGroup.controls['docserversPath'].value,
        };
        this.http.get('../rest/installer/docservers', { params: info }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((data) => {
            this.notify.success(this.translate.instant('lang.rightInformations'));
            this.stepFormGroup.controls['stateStep'].setValue('success');
            this.nextStep.emit();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["catchError"])((err) => {
            this.notify.error(this.translate.instant('lang.pathUnreacheable'));
            this.stepFormGroup.controls['stateStep'].setValue('');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(false);
        })).subscribe();
    }
    getInfoToInstall() {
        return [{
                idStep: 'docserver',
                body: {
                    path: this.stepFormGroup.controls['docserversPath'].value,
                },
                route: {
                    method: 'POST',
                    url: '../rest/installer/docservers'
                },
                description: this.translate.instant('lang.stepDocserversActionDesc'),
                installPriority: 3
            }];
    }
};
DocserversComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"] },
    { type: _installer_service__WEBPACK_IMPORTED_MODULE_9__["InstallerService"] }
];
DocserversComponent.propDecorators = {
    nextStep: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
DocserversComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-docservers',
        template: _raw_loader_docservers_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_docservers_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DocserversComponent);



/***/ }),

/***/ "AHpz":
/*!*****************************************************************!*\
  !*** ./src/frontend/app/installer/welcome/welcome.component.ts ***!
  \*****************************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_welcome_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./welcome.component.html */ "xFLC");
/* harmony import */ var _welcome_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./welcome.component.scss */ "3qZk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../environments/environment */ "MJ5r");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @service/auth.service */ "uqn4");












let WelcomeComponent = class WelcomeComponent {
    constructor(translate, http, notify, _formBuilder, authService) {
        this.translate = translate;
        this.http = http;
        this.notify = notify;
        this._formBuilder = _formBuilder;
        this.authService = authService;
        this.langs = [];
        this.appVersion = _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[0] + '.' + _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[1];
        this.steps = [
            {
                icon: 'fas fa-check-square',
                desc: 'lang.prerequisiteCheck'
            },
            {
                icon: 'fa fa-database',
                desc: 'lang.databaseCreation'
            },
            {
                icon: 'fa fa-database',
                desc: 'lang.dataSampleCreation'
            },
            {
                icon: 'fa fa-hdd',
                desc: 'lang.docserverCreation'
            },
            {
                icon: 'fas fa-tools',
                desc: 'lang.stepCustomizationActionDesc'
            },
            {
                icon: 'fa fa-user',
                desc: 'lang.adminUserCreation'
            },
        ];
        this.customs = [];
    }
    ngOnInit() {
        this.stepFormGroup = this._formBuilder.group({
            lang: ['fr', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]
        });
        this.getLang();
        if (!this.authService.noInstall) {
            this.getCustoms();
        }
    }
    getLang() {
        this.http.get('../rest/languages').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((data) => {
            this.langs = Object.keys(data.langs).filter(lang => lang !== 'nl');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["catchError"])((err) => {
            this.notify.handleSoftErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["of"])(false);
        })).subscribe();
    }
    changeLang(id) {
        this.translate.use(id);
    }
    getCustoms() {
        this.http.get('../rest/installer/customs').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((data) => {
            this.customs = data.customs;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["catchError"])((err) => {
            this.notify.handleSoftErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["of"])(false);
        })).subscribe();
    }
    initStep() {
        return false;
    }
    getInfoToInstall() {
        return [];
    }
};
WelcomeComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_11__["AuthService"] }
];
WelcomeComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-welcome',
        template: _raw_loader_welcome_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_welcome_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], WelcomeComponent);



/***/ }),

/***/ "CImi":
/*!*****************************************************************************!*\
  !*** ./src/frontend/app/installer/customization/customization.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CustomizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomizationComponent", function() { return CustomizationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_customization_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./customization.component.html */ "/XJU");
/* harmony import */ var _customization_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customization.component.scss */ "OZfG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../environments/environment */ "MJ5r");
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-pipes */ "aEDk");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../installer.service */ "S2qH");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "qCKp");














let CustomizationComponent = class CustomizationComponent {
    constructor(translate, _formBuilder, notify, sanitizer, scanPipe, http, installerService) {
        this.translate = translate;
        this._formBuilder = _formBuilder;
        this.notify = notify;
        this.sanitizer = sanitizer;
        this.scanPipe = scanPipe;
        this.http = http;
        this.installerService = installerService;
        this.readonlyState = false;
        this.backgroundList = [];
        const valIdentifier = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[a-z0-9_\-]*$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(3)];
        this.stepFormGroup = this._formBuilder.group({
            firstCtrl: ['success', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            customId: [null, valIdentifier],
            appName: [`Maarch Courrier ${_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[0] + '.' + _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[1]}`, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            loginMessage: [`<span style="color:#24b0ed"><strong>Découvrez votre application via</strong></span>&nbsp;<a title="le guide de visite" href="https://docs.maarch.org/gitbook/html/MaarchCourrier/${_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[0] + '.' + _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].VERSION.split('.')[1]}/guu/home.html" target="_blank"><span style="color:#f99830;"><strong>le guide de visite en ligne</strong></span></a>`],
            homeMessage: ['<p>D&eacute;couvrez <strong>Maarch Courrier 21.03</strong> avec <a title="notre guide de visite" href="https://docs.maarch.org/" target="_blank"><span style="color:#f99830;"><strong>notre guide de visite en ligne</strong></span></a>.</p>'],
            bodyLoginBackground: ['assets/bodylogin.jpg'],
            uploadedLogo: ['../rest/images?image=logo'],
        });
        this.backgroundList = Array.from({ length: 17 }).map((_, i) => ({
            filename: `${i + 1}.jpg`,
            url: `assets/${i + 1}.jpg`,
        }));
    }
    ngOnInit() {
        this.checkCustomExist();
        this.stepFormGroup.controls['customId'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])(() => {
            this.stepFormGroup.controls['firstCtrl'].setValue('');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((value) => value.length > 2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])(() => this.stepFormGroup.controls['customId'].errors === null || this.stepFormGroup.controls['customId'].errors.pattern === undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])(() => {
            this.checkCustomExist();
        })).subscribe();
    }
    initStep() {
        if (this.stepFormGroup.controls['customId'].value === null) {
            this.stepFormGroup.controls['customId'].setValue(this.appDatabase.getInfoToInstall()[0].body.name);
        }
        if (this.installerService.isStepAlreadyLaunched('createCustom') && this.installerService.isStepAlreadyLaunched('customization')) {
            this.stepFormGroup.disable();
            this.readonlyState = true;
            tinymce.remove();
            this.initMce(true);
        }
        else if (this.installerService.isStepAlreadyLaunched('createCustom')) {
            this.stepFormGroup.controls['customId'].disable();
            this.stepFormGroup.controls['appName'].disable();
            this.stepFormGroup.controls['firstCtrl'].disable();
        }
        else if (this.installerService.isStepAlreadyLaunched('customization')) {
            this.stepFormGroup.controls['loginMessage'].disable();
            this.stepFormGroup.controls['homeMessage'].disable();
            this.stepFormGroup.controls['bodyLoginBackground'].disable();
            this.stepFormGroup.controls['uploadedLogo'].disable();
            this.readonlyState = true;
            tinymce.remove();
            this.initMce(true);
        }
        else {
            this.readonlyState = false;
            this.initMce();
        }
    }
    checkCustomExist() {
        this.http.get('../rest/installer/custom', { observe: 'response', params: { 'customId': this.stepFormGroup.controls['customId'].value } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((response) => {
            if (this.stepFormGroup.controls['customId'].errors !== null) {
                const error = this.stepFormGroup.controls['customId'].errors;
                delete error.customExist;
            }
            else {
                this.stepFormGroup.controls['firstCtrl'].setValue('success');
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["catchError"])((err) => {
            const regex = /^Custom already exists/g;
            const regexInvalid = /^Unauthorized custom name/g;
            if (err.error.errors.match(regex) !== null) {
                this.stepFormGroup.controls['customId'].setErrors(Object.assign(Object.assign({}, this.stepFormGroup.controls['customId'].errors), { customExist: true }));
                this.stepFormGroup.controls['customId'].markAsTouched();
            }
            else if (err.error.errors.match(regexInvalid) !== null) {
                this.stepFormGroup.controls['customId'].setErrors(Object.assign(Object.assign({}, this.stepFormGroup.controls['customId'].errors), { invalidCustomName: true }));
                this.stepFormGroup.controls['customId'].markAsTouched();
            }
            else {
                this.notify.handleSoftErrors(err);
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["of"])(false);
        })).subscribe();
    }
    isValidStep() {
        if (this.installerService.isStepAlreadyLaunched('createCustom') && this.installerService.isStepAlreadyLaunched('customization')) {
            return true;
        }
        else {
            return this.stepFormGroup === undefined ? false : this.stepFormGroup.valid;
        }
    }
    getFormGroup() {
        return this.installerService.isStepAlreadyLaunched('createCustom') && this.installerService.isStepAlreadyLaunched('customization') ? true : this.stepFormGroup;
    }
    initMce(readonly = false) {
        tinymce.init({
            selector: 'textarea',
            base_url: '../node_modules/tinymce/',
            convert_urls: false,
            height: '150',
            suffix: '.min',
            language: this.translate.instant('lang.langISO').replace('-', '_'),
            language_url: `../node_modules/tinymce-i18n/langs/${this.translate.instant('lang.langISO').replace('-', '_')}.js`,
            menubar: false,
            statusbar: false,
            readonly: readonly,
            plugins: [
                'autolink'
            ],
            external_plugins: {
                'maarch_b64image': '../../src/frontend/plugins/tinymce/maarch_b64image/plugin.min.js'
            },
            toolbar_sticky: true,
            toolbar_drawer: 'floating',
            toolbar: !readonly ? 'undo redo | fontselect fontsizeselect | bold italic underline strikethrough forecolor | maarch_b64image | \
        alignleft aligncenter alignright alignjustify \
        bullist numlist outdent indent | removeformat' : ''
        });
    }
    getInfoToInstall() {
        return [
            {
                idStep: 'createCustom',
                body: {
                    lang: this.appWelcome.stepFormGroup.controls['lang'].value,
                    customId: this.stepFormGroup.controls['customId'].value,
                    applicationName: this.stepFormGroup.controls['appName'].value,
                },
                description: this.translate.instant('lang.stepInstanceActionDesc'),
                route: {
                    method: 'POST',
                    url: '../rest/installer/custom'
                },
                installPriority: 1
            },
            {
                idStep: 'customization',
                body: {
                    loginMessage: tinymce.get('loginMessage').getContent(),
                    homeMessage: tinymce.get('homeMessage').getContent(),
                    bodyLoginBackground: this.stepFormGroup.controls['bodyLoginBackground'].value,
                    logo: this.stepFormGroup.controls['uploadedLogo'].value,
                },
                description: this.translate.instant('lang.stepCustomizationActionDesc'),
                route: {
                    method: 'POST',
                    url: '../rest/installer/customization'
                },
                installPriority: 3
            }
        ];
    }
    uploadTrigger(fileInput, mode) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const res = this.canUploadFile(fileInput.target.files[0], mode);
            if (res === true) {
                const reader = new FileReader();
                reader.readAsDataURL(fileInput.target.files[0]);
                reader.onload = (value) => {
                    if (mode === 'logo') {
                        this.stepFormGroup.controls['uploadedLogo'].setValue(value.target.result);
                    }
                    else {
                        const img = new Image();
                        img.onload = (imgDim) => {
                            if (imgDim.target.width < 1920 || imgDim.target.height < 1080) {
                                this.notify.error(this.translate.instant('lang.badImageResolution', { value1: '1920x1080' }));
                            }
                            else {
                                this.backgroundList.push({
                                    filename: value.target.result,
                                    url: value.target.result,
                                });
                                this.stepFormGroup.controls['bodyLoginBackground'].setValue(value.target.result);
                            }
                        };
                        img.src = value.target.result;
                    }
                };
            }
            else {
                this.notify.error(res);
            }
        }
    }
    canUploadFile(file, mode) {
        const allowedExtension = mode !== 'logo' ? ['image/jpg', 'image/jpeg'] : ['image/svg+xml'];
        if (mode === 'logo') {
            if (file.size > 5000000) {
                return this.translate.instant('lang.maxFileSizeExceeded', { value1: '5mo' });
            }
            else if (allowedExtension.indexOf(file.type) === -1) {
                return this.translate.instant('lang.onlyExtensionsAllowed', { value1: allowedExtension.join(', ') });
            }
        }
        else {
            if (file.size > 10000000) {
                return this.translate.instant('lang.maxFileSizeExceeded', { value1: '10mo' });
            }
            else if (allowedExtension.indexOf(file.type) === -1) {
                return this.translate.instant('lang.onlyExtensionsAllowed', { value1: allowedExtension.join(', ') });
            }
        }
        return true;
    }
    logoURL() {
        return this.sanitizer.bypassSecurityTrustUrl(this.stepFormGroup.controls['uploadedLogo'].value);
    }
    selectBg(content) {
        if (!this.stepFormGroup.controls['bodyLoginBackground'].disabled) {
            this.stepFormGroup.controls['bodyLoginBackground'].setValue(content);
        }
    }
    clickLogoButton(uploadLogo) {
        if (!this.stepFormGroup.controls['uploadedLogo'].disabled) {
            uploadLogo.click();
        }
    }
};
CustomizationComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"] },
    { type: ngx_pipes__WEBPACK_IMPORTED_MODULE_9__["ScanPipe"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClient"] },
    { type: _installer_service__WEBPACK_IMPORTED_MODULE_12__["InstallerService"] }
];
CustomizationComponent.propDecorators = {
    appDatabase: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    appWelcome: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
CustomizationComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-customization',
        template: _raw_loader_customization_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [ngx_pipes__WEBPACK_IMPORTED_MODULE_9__["ScanPipe"]],
        styles: [_customization_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CustomizationComponent);



/***/ }),

/***/ "FS/S":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/useradmin/useradmin.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\"><i class=\"fas fa-user\"></i> {{'lang.userAdmin' | translate}}</h2>\n    <div class=\"alert-message alert-message-info\" role=\"alert\" style=\"margin-top: 30px;min-width: 100%;\">\n        {{'lang.stepUserAdmin_desc' | translate}}\n    </div>\n    <form [formGroup]=\"stepFormGroup\" style=\"width: 850px;margin: auto;\">\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.id' | translate}}</mat-label>\n            <input matInput formControlName=\"login\">\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.firstname' | translate}}</mat-label>\n            <input matInput formControlName=\"firstname\">\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.lastname' | translate}}</mat-label>\n            <input matInput formControlName=\"lastname\">\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.password' | translate}}</mat-label>\n            <input [type]=\"hide ? 'password' : 'text'\" matInput formControlName=\"password\">\n            <button mat-icon-button matSuffix color=\"primary\" (click)=\"hide = !hide\">\n                <mat-icon class=\"fa {{hide ? 'fa-eye-slash' : 'fa-eye'}}\"></mat-icon>\n            </button>\n            <mat-error>{{'lang.passwordNotMatch' | translate}}</mat-error>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.retypeNewPassword' | translate}}</mat-label>\n            <input [type]=\"hide ? 'password' : 'text'\" matInput formControlName=\"passwordConfirm\">\n            <button mat-icon-button matSuffix color=\"primary\" (click)=\"hide = !hide\">\n                <mat-icon class=\"fa {{hide ? 'fa-eye-slash' : 'fa-eye'}}\"></mat-icon>\n            </button>\n            <mat-error>{{'lang.passwordNotMatch' | translate}}</mat-error>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.email' | translate}}</mat-label>\n            <input matInput formControlName=\"email\">\n        </mat-form-field>\n    </form>\n</div>\n");

/***/ }),

/***/ "KNaP":
/*!*******************************************************************************!*\
  !*** ./src/frontend/app/installer/install-action/install-action.component.ts ***!
  \*******************************************************************************/
/*! exports provided: InstallActionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallActionComponent", function() { return InstallActionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_install_action_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./install-action.component.html */ "e0dC");
/* harmony import */ var _install_action_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./install-action.component.scss */ "v/rb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../installer.service */ "S2qH");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @service/auth.service */ "uqn4");












let InstallActionComponent = class InstallActionComponent {
    constructor(translate, data, dialogRef, http, installerService, notify, authService) {
        this.translate = translate;
        this.data = data;
        this.dialogRef = dialogRef;
        this.http = http;
        this.installerService = installerService;
        this.notify = notify;
        this.authService = authService;
        this.steps = [];
        this.customId = '';
        // Workaround for angular component issue #13870
        this.disableAnimation = true;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.initSteps();
        });
    }
    ngAfterViewInit() {
        setTimeout(() => this.disableAnimation = false);
    }
    launchInstall() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let res;
            for (let index = 0; index < this.data.length; index++) {
                this.steps[index].state = 'inProgress';
                res = yield this.doStep(index);
                if (!res) {
                    break;
                }
            }
        });
    }
    initSteps() {
        this.data.forEach((step, index) => {
            if (index === 0) {
                this.customId = step.body.customId;
            }
            else {
                step.body.customId = this.customId;
            }
            this.steps.push({
                idStep: step.idStep,
                label: step.description,
                state: '',
                msgErr: '',
            });
        });
    }
    doStep(index) {
        return new Promise((resolve, reject) => {
            if (this.installerService.isStepAlreadyLaunched(this.data[index].idStep)) {
                this.steps[index].state = 'OK';
                resolve(true);
            }
            else {
                this.http[this.data[index].route.method.toLowerCase()](this.data[index].route.url, this.data[index].body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((data) => {
                    this.steps[index].state = 'OK';
                    this.installerService.setStep(this.steps[index]);
                    resolve(true);
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["catchError"])((err) => {
                    this.steps[index].state = 'KO';
                    if (err.error.lang !== undefined) {
                        this.steps[index].msgErr = this.translate.instant('lang.' + err.error.lang);
                    }
                    else {
                        this.steps[index].msgErr = err.error.errors;
                    }
                    resolve(false);
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
                })).subscribe();
            }
        });
    }
    isInstallBegin() {
        return this.steps.filter(step => step.state === '').length !== this.steps.length;
    }
    isInstallComplete() {
        return this.steps.filter(step => step.state === '').length === 0;
    }
    isInstallError() {
        return this.steps.filter(step => step.state === 'KO').length > 0;
    }
    goToInstance() {
        this.http.request('DELETE', '../rest/installer/lock', { body: { customId: this.customId } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((res) => {
            this.authService.noInstall = false;
            window.location.href = res.url;
            this.dialogRef.close('ok');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["catchError"])((err) => {
            this.notify.handleSoftErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
        })).subscribe();
    }
};
InstallActionComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"] },
    { type: _installer_service__WEBPACK_IMPORTED_MODULE_8__["InstallerService"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"] },
    { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_11__["AuthService"] }
];
InstallActionComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-install-action',
        template: _raw_loader_install_action_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_install_action_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], InstallActionComponent);



/***/ }),

/***/ "M6B2":
/*!***********************************************************!*\
  !*** ./src/frontend/app/installer/installer.component.ts ***!
  \***********************************************************/
/*! exports provided: InstallerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallerComponent", function() { return InstallerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_installer_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./installer.component.html */ "ozdG");
/* harmony import */ var _installer_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./installer.component.scss */ "TE+0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _service_header_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @service/header.service */ "4zkx");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/stepper */ "B/XX");
/* harmony import */ var _service_app_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @service/app.service */ "A6w4");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _plugins_sorting_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../plugins/sorting.pipe */ "1YbM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _install_action_install_action_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./install-action/install-action.component */ "KNaP");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _service_functions_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @service/functions.service */ "rH+9");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @service/auth.service */ "uqn4");
/* harmony import */ var _service_privileges_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @service/privileges.service */ "eiH7");


















let InstallerComponent = class InstallerComponent {
    constructor(translate, router, headerService, notify, appService, sortPipe, dialog, functionService, privilegeService, authService) {
        this.translate = translate;
        this.router = router;
        this.headerService = headerService;
        this.notify = notify;
        this.appService = appService;
        this.sortPipe = sortPipe;
        this.dialog = dialog;
        this.functionService = functionService;
        this.privilegeService = privilegeService;
        this.authService = authService;
        this.loading = true;
    }
    ngOnInit() {
        this.headerService.hideSideBar = true;
        if (!this.authService.isAuth() && !this.authService.noInstall) {
            this.router.navigate(['/login']);
            this.notify.error(this.translate.instant('lang.mustConnectToInstall'));
        }
        else if (this.authService.getToken() !== null && !this.privilegeService.hasCurrentUserPrivilege('create_custom')) {
            this.router.navigate(['/login']);
            this.notify.error(this.translate.instant('lang.mustPrivilegeToInstall'));
        }
        else {
            this.loading = false;
        }
    }
    ngAfterViewInit() {
        $('.mat-horizontal-stepper-header-container').insertBefore('.bg-head-content');
        $('.mat-step-icon').css('background-color', 'white');
        $('.mat-step-icon').css('color', '#280d43');
        $('.mat-step-label').css('color', 'white');
        /* $('.mat-step-label').css('opacity', '0.5');
        $('.mat-step-label-active').css('opacity', '1');*/
        /* $('.mat-step-label-selected').css('font-size', '160%');
        $('.mat-step-label-selected').css('transition', 'all 0.2s');
        $('.mat-step-label').css('transition', 'all 0.2s');*/
    }
    isValidStep() {
        return false;
    }
    initStep(ev) {
        this.stepContent.toArray()[ev.selectedIndex].initStep();
    }
    nextStep() {
        this.stepper.next();
    }
    gotToLogin() {
        this.router.navigate(['/login']);
    }
    endInstall() {
        let installContent = [];
        this.stepContent.toArray().forEach((component) => {
            installContent = installContent.concat(component.getInfoToInstall());
        });
        installContent = this.sortPipe.transform(installContent, 'installPriority');
        const dialogRef = this.dialog.open(_install_action_install_action_component__WEBPACK_IMPORTED_MODULE_12__["InstallActionComponent"], {
            panelClass: 'maarch-modal',
            disableClose: true,
            width: '500px',
            data: installContent
        });
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_15__["filter"])((result) => !this.functionService.empty(result)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_15__["tap"])((result) => {
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_15__["catchError"])((err) => {
            this.notify.handleErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["of"])(false);
        })).subscribe();
    }
};
InstallerComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _service_header_service__WEBPACK_IMPORTED_MODULE_5__["HeaderService"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] },
    { type: _service_app_service__WEBPACK_IMPORTED_MODULE_8__["AppService"] },
    { type: _plugins_sorting_pipe__WEBPACK_IMPORTED_MODULE_10__["SortPipe"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialog"] },
    { type: _service_functions_service__WEBPACK_IMPORTED_MODULE_14__["FunctionsService"] },
    { type: _service_privileges_service__WEBPACK_IMPORTED_MODULE_17__["PrivilegeService"] },
    { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_16__["AuthService"] }
];
InstallerComponent.propDecorators = {
    stepContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChildren"], args: ['stepContent',] }],
    stepper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['stepper', { static: false },] }]
};
InstallerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_installer_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__["STEPPER_GLOBAL_OPTIONS"], useValue: { showError: true },
            },
            _plugins_sorting_pipe__WEBPACK_IMPORTED_MODULE_10__["SortPipe"]
        ],
        styles: [_installer_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], InstallerComponent);



/***/ }),

/***/ "OZfG":
/*!*******************************************************************************!*\
  !*** ./src/frontend/app/installer/customization/customization.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n.backgroundList {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 10px;\n}\n.selected {\n  transition: all 0.3s;\n  opacity: 1 !important;\n  border: solid 10px var(--maarch-color-secondary) !important;\n}\n.backgroundItem {\n  border: solid 0px var(--maarch-color-secondary);\n  opacity: 0.5;\n  transition: all 0.3s;\n  cursor: pointer;\n  height: 120px;\n  background-size: cover !important;\n}\n.disabled {\n  cursor: default !important;\n}\n.backgroundItem:not(.disabled):hover {\n  transition: all 0.3s;\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2N1c3RvbWl6YXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFFSSxZQUFBO0FBRko7QUFJSTtFQUNJLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7QUFGUjtBQU1BO0VBQ0ksYUFBQTtFQUNBLHFDQUFBO0VBQ0EsY0FBQTtBQUhKO0FBTUE7RUFDSSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsMkRBQUE7QUFISjtBQU1BO0VBQ0ksK0NBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGlDQUFBO0FBSEo7QUFNQTtFQUNJLDBCQUFBO0FBSEo7QUFNQTtFQUNJLG9CQUFBO0VBQ0EscUJBQUE7QUFISiIsImZpbGUiOiJjdXN0b21pemF0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi5zdGVwQ29udGVudCB7XG4gICAgLy8gbWF4LXdpZHRoOiA4NTBweDtcbiAgICBtYXJnaW46IGF1dG87XG5cbiAgICAuc3RlcENvbnRlbnRUaXRsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tYWFyY2gtY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG59XG5cbi5iYWNrZ3JvdW5kTGlzdCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xuICAgIGdyaWQtZ2FwOiAxMHB4O1xufVxuXG4uc2VsZWN0ZWQge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbiAgICBib3JkZXI6IHNvbGlkIDEwcHggdmFyKC0tbWFhcmNoLWNvbG9yLXNlY29uZGFyeSkgIWltcG9ydGFudDtcbn1cblxuLmJhY2tncm91bmRJdGVtIHtcbiAgICBib3JkZXI6IHNvbGlkIDBweCB2YXIoLS1tYWFyY2gtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xufVxuXG4uZGlzYWJsZWQge1xuICAgIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50O1xufVxuXG4uYmFja2dyb3VuZEl0ZW06bm90KC5kaXNhYmxlZCk6aG92ZXIge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "OgGL":
/*!*********************************************************************!*\
  !*** ./src/frontend/app/installer/useradmin/useradmin.component.ts ***!
  \*********************************************************************/
/*! exports provided: UseradminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UseradminComponent", function() { return UseradminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_useradmin_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./useradmin.component.html */ "FS/S");
/* harmony import */ var _useradmin_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useradmin.component.scss */ "idS4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _installer_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../installer.service */ "S2qH");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");









let UseradminComponent = class UseradminComponent {
    constructor(translate, _formBuilder, notify, installerService) {
        this.translate = translate;
        this._formBuilder = _formBuilder;
        this.notify = notify;
        this.installerService = installerService;
        this.hide = true;
        this.tiggerInstall = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        const valLogin = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[\w.@-]*$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required];
        const valEmail = [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required];
        this.stepFormGroup = this._formBuilder.group({
            login: ['superadmin', valLogin],
            firstname: ['Admin', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            lastname: ['SUPER', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            passwordConfirm: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            email: ['yourEmail@domain.com', valEmail],
        });
    }
    ngOnInit() {
        this.stepFormGroup.controls['password'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((data) => {
            if (data !== this.stepFormGroup.controls['passwordConfirm'].value) {
                this.stepFormGroup.controls['password'].setErrors({ 'incorrect': true });
                this.stepFormGroup.controls['passwordConfirm'].setErrors({ 'incorrect': true });
                this.stepFormGroup.controls['passwordConfirm'].markAsTouched();
            }
            else {
                this.stepFormGroup.controls['password'].setErrors(null);
                this.stepFormGroup.controls['passwordConfirm'].setErrors(null);
            }
        })).subscribe();
        this.stepFormGroup.controls['passwordConfirm'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((data) => {
            if (data !== this.stepFormGroup.controls['password'].value) {
                this.stepFormGroup.controls['password'].setErrors({ 'incorrect': true });
                this.stepFormGroup.controls['password'].markAsTouched();
                this.stepFormGroup.controls['passwordConfirm'].setErrors({ 'incorrect': true });
            }
            else {
                this.stepFormGroup.controls['password'].setErrors(null);
                this.stepFormGroup.controls['passwordConfirm'].setErrors(null);
            }
        })).subscribe();
    }
    initStep() {
        if (this.installerService.isStepAlreadyLaunched('userAdmin')) {
            this.stepFormGroup.disable();
        }
    }
    isValidStep() {
        return this.stepFormGroup === undefined ? false : this.stepFormGroup.valid || this.installerService.isStepAlreadyLaunched('userAdmin');
    }
    getFormGroup() {
        return this.installerService.isStepAlreadyLaunched('userAdmin') ? true : this.stepFormGroup;
    }
    getInfoToInstall() {
        return [{
                idStep: 'userAdmin',
                body: {
                    login: this.stepFormGroup.controls['login'].value,
                    firstname: this.stepFormGroup.controls['firstname'].value,
                    lastname: this.stepFormGroup.controls['lastname'].value,
                    password: this.stepFormGroup.controls['password'].value,
                    email: this.stepFormGroup.controls['email'].value,
                },
                route: {
                    method: 'PUT',
                    url: '../rest/installer/administrator'
                },
                description: this.translate.instant('lang.stepUserAdminActionDesc'),
                installPriority: 3
            }];
    }
    launchInstall() {
        this.tiggerInstall.emit();
    }
};
UseradminComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] },
    { type: _installer_service__WEBPACK_IMPORTED_MODULE_7__["InstallerService"] }
];
UseradminComponent.propDecorators = {
    tiggerInstall: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
UseradminComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-useradmin',
        template: _raw_loader_useradmin_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_useradmin_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], UseradminComponent);



/***/ }),

/***/ "QCVa":
/*!****************************************************************!*\
  !*** ./src/frontend/app/installer/installer-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: InstallerRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallerRoutingModule", function() { return InstallerRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _installer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./installer.component */ "M6B2");




const routes = [
    {
        path: '',
        component: _installer_component__WEBPACK_IMPORTED_MODULE_3__["InstallerComponent"]
    }
];
let InstallerRoutingModule = class InstallerRoutingModule {
};
InstallerRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], InstallerRoutingModule);



/***/ }),

/***/ "S2qH":
/*!*********************************************************!*\
  !*** ./src/frontend/app/installer/installer.service.ts ***!
  \*********************************************************/
/*! exports provided: InstallerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallerService", function() { return InstallerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


let InstallerService = class InstallerService {
    constructor() {
        this.steps = [];
    }
    setStep(step) {
        this.steps.push(step);
    }
    isStepAlreadyLaunched(IdsStep) {
        return this.steps.filter(step => IdsStep === step.idStep).length > 0;
    }
};
InstallerService.ctorParameters = () => [];
InstallerService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], InstallerService);



/***/ }),

/***/ "TE+0":
/*!*************************************************************!*\
  !*** ./src/frontend/app/installer/installer.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep.mat-stepper-horizontal {\n  height: 100% !important;\n}\n\n.container {\n  padding-left: 80px !important;\n  padding-right: 80px !important;\n}\n\n.previousStepButton {\n  position: fixed;\n  top: 50%;\n  left: 10px;\n  transform: translateY(-50%);\n}\n\n.previousStepButton .mat-icon {\n  font-size: 25px;\n  height: auto;\n  width: auto;\n}\n\n.nextStepButton {\n  position: fixed;\n  top: 50%;\n  right: 13px;\n  transform: translateY(-50%);\n}\n\n.nextStepButton .mat-icon {\n  font-size: 25px;\n  height: auto;\n  width: auto;\n}\n\n/*.mat-stepper-horizontal {\n    display: flex;\n    flex-direction: column;\n\n\n    ::ng-deep.mat-step-icon {\n        background-color: white;\n        color: #280d43;\n    }\n\n    ::ng-deep.mat-step-label {\n        color: white;\n        opacity: 0.5;\n    }\n\n    ::ng-deep.mat-step-label-active {\n        opacity: 1;\n    }\n}\n\n::ng-deep.mat-step-icon {\n    background-color: white;\n    color: #280d43;\n}\n\n::ng-deep.mat-step-label-active {\n    opacity: 1;\n}\n\n::ng-deep.mat-step-label {\n    color: white;\n    opacity: 0.5;\n}\n\n.stepIcon {\n    font-size: 10px !important;\n    height: auto !important;\n    width: auto !important;\n}\n\n::ng-deep.mat-step-label {\n    transition: all 0.2s;\n}\n\n::ng-deep.mat-step-label-selected {\n    font-size: 160%;\n    transition: all 0.2s;\n}\n\n::ng-deep.mat-horizontal-stepper-content {\n    height: 100%;\n}\n\n::ng-deep.mat-horizontal-content-container {\n    flex: 1;\n    padding-left: 0px !important;\n    padding-right: 0px !important;\n    padding-bottom: 0px !important;\n}\n\n.stepContainer{\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n\n.stepContent {\n    flex: 1;\n    overflow: auto;\n\n    &Title {\n        margin-bottom: 30px;\n        border-bottom: solid 1px;\n        padding: 0;\n    }\n}\n\n.formStep {\n    display: contents;\n}*/\n\n::ng-deep.mat-step-icon {\n  background-color: white;\n  color: #280d43;\n}\n\n::ng-deep.mat-step-label-active {\n  opacity: 1 !important;\n}\n\n::ng-deep.mat-step-label {\n  color: white;\n  opacity: 0.5;\n}\n\n.stepIcon {\n  font-size: 10px !important;\n  height: auto !important;\n  width: auto !important;\n}\n\n::ng-deep.mat-step-label {\n  transition: all 0.2s;\n}\n\n::ng-deep.mat-step-label-selected {\n  font-size: 160%;\n  transition: all 0.2s;\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2luc3RhbGxlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHVCQUFBO0FBQ0o7O0FBRUE7RUFDSSw2QkFBQTtFQUNBLDhCQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSwyQkFBQTtBQUNKOztBQUNJO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FBQ1I7O0FBR0E7RUFDSSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtBQUFKOztBQUVJO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FBQVI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTs7QUFpRkE7RUFDSSx1QkFBQTtFQUNBLGNBQUE7QUFESjs7QUFJQTtFQUNJLHFCQUFBO0FBREo7O0FBSUE7RUFDSSxZQUFBO0VBQ0EsWUFBQTtBQURKOztBQUlBO0VBQ0ksMEJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0FBREo7O0FBSUE7RUFDSSxvQkFBQTtBQURKOztBQUlBO0VBQ0ksZUFBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtBQURKIiwiZmlsZSI6Imluc3RhbGxlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcC5tYXQtc3RlcHBlci1ob3Jpem9udGFsIHtcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZy1sZWZ0OiA4MHB4ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1yaWdodDogODBweCAhaW1wb3J0YW50O1xufVxuXG4ucHJldmlvdXNTdGVwQnV0dG9uIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogMTBweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG5cbiAgICAubWF0LWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgICAgIGhlaWdodDphdXRvO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICB9XG59XG5cbi5uZXh0U3RlcEJ1dHRvbiB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogNTAlO1xuICAgIHJpZ2h0OiAxM3B4O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcblxuICAgIC5tYXQtaWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICAgICAgaGVpZ2h0OmF1dG87XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbn1cbi8qLm1hdC1zdGVwcGVyLWhvcml6b250YWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuXG4gICAgOjpuZy1kZWVwLm1hdC1zdGVwLWljb24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgY29sb3I6ICMyODBkNDM7XG4gICAgfVxuXG4gICAgOjpuZy1kZWVwLm1hdC1zdGVwLWxhYmVsIHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgfVxuXG4gICAgOjpuZy1kZWVwLm1hdC1zdGVwLWxhYmVsLWFjdGl2ZSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtaWNvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6ICMyODBkNDM7XG59XG5cbjo6bmctZGVlcC5tYXQtc3RlcC1sYWJlbC1hY3RpdmUge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbjo6bmctZGVlcC5tYXQtc3RlcC1sYWJlbCB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IDAuNTtcbn1cblxuLnN0ZXBJY29uIHtcbiAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtbGFiZWwge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtbGFiZWwtc2VsZWN0ZWQge1xuICAgIGZvbnQtc2l6ZTogMTYwJTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cblxuOjpuZy1kZWVwLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItY29udGVudCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG46Om5nLWRlZXAubWF0LWhvcml6b250YWwtY29udGVudC1jb250YWluZXIge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwcHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5zdGVwQ29udGFpbmVye1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5zdGVwQ29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBvdmVyZmxvdzogYXV0bztcblxuICAgICZUaXRsZSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG59XG5cbi5mb3JtU3RlcCB7XG4gICAgZGlzcGxheTogY29udGVudHM7XG59Ki9cblxuOjpuZy1kZWVwLm1hdC1zdGVwLWljb24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiAjMjgwZDQzO1xufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtbGFiZWwtYWN0aXZlIHtcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcC5tYXQtc3RlcC1sYWJlbCB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IDAuNTtcbn1cblxuLnN0ZXBJY29uIHtcbiAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtbGFiZWwge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xufVxuXG46Om5nLWRlZXAubWF0LXN0ZXAtbGFiZWwtc2VsZWN0ZWQge1xuICAgIGZvbnQtc2l6ZTogMTYwJTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgICBvcGFjaXR5OiAxO1xufSJdfQ== */");

/***/ }),

/***/ "WGJY":
/*!*************************************************************************!*\
  !*** ./src/frontend/app/installer/docservers/docservers.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RvY3NlcnZlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFFSSxZQUFBO0FBREo7QUFFSTtFQUNJLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7QUFBUiIsImZpbGUiOiJkb2NzZXJ2ZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uc3RlcENvbnRlbnQge1xuICAgIC8vIG1heC13aWR0aDogODUwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIC5zdGVwQ29udGVudFRpdGxlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1hYXJjaC1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn1cblxuIl19 */");

/***/ }),

/***/ "YKdi":
/*!***************************************************************************!*\
  !*** ./src/frontend/app/installer/prerequisite/prerequisite.component.ts ***!
  \***************************************************************************/
/*! exports provided: PrerequisiteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrerequisiteComponent", function() { return PrerequisiteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_prerequisite_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./prerequisite.component.html */ "k6h7");
/* harmony import */ var _prerequisite_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prerequisite.component.scss */ "fIQu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @service/notification/notification.service */ "AXEc");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../environments/environment */ "MJ5r");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "kU1M");











let PrerequisiteComponent = class PrerequisiteComponent {
    constructor(translate, http, notify, _formBuilder) {
        this.translate = translate;
        this.http = http;
        this.notify = notify;
        this._formBuilder = _formBuilder;
        this.prerequisites = {};
        this.packagesList = {
            general: [
                {
                    label: 'phpVersionValid',
                    required: true
                },
                {
                    label: 'writable',
                    required: true
                },
            ],
            tools: [
                {
                    label: 'unoconv',
                    required: true
                },
                {
                    label: 'netcatOrNmap',
                    required: true
                },
                {
                    label: 'pgsql',
                    required: true
                },
                {
                    label: 'curl',
                    required: true
                },
                {
                    label: 'zip',
                    required: true
                },
                {
                    label: 'wkhtmlToPdf',
                    required: true
                },
                {
                    label: 'imagick',
                    required: true
                },
            ],
            phpExtensions: [
                {
                    label: 'fileinfo',
                    required: true
                }, {
                    label: 'pdoPgsql',
                    required: true
                },
                {
                    label: 'gd',
                    required: true
                },
                {
                    label: 'mbstring',
                    required: true
                },
                {
                    label: 'json',
                    required: true
                },
                {
                    label: 'gettext',
                    required: true
                },
                {
                    label: 'xml',
                    required: true
                },
            ],
            phpConfiguration: [
                {
                    label: 'errorReporting',
                    required: true
                },
                {
                    label: 'displayErrors',
                    required: true
                }
            ],
        };
        this.docMaarchUrl = `https://docs.maarch.org/gitbook/html/MaarchCourrier/${_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].VERSION.split('.')[0] + '.' + _environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].VERSION.split('.')[1]}/guat/guat_prerequisites/home.html`;
    }
    ngOnInit() {
        this.stepFormGroup = this._formBuilder.group({
            firstCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.getStepData();
    }
    getStepData() {
        this.http.get('../rest/installer/prerequisites').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((data) => {
            this.prerequisites = data.prerequisites;
            Object.keys(this.packagesList).forEach(group => {
                this.packagesList[group].forEach((item, key) => {
                    this.packagesList[group][key].state = this.prerequisites[this.packagesList[group][key].label] ? 'ok' : 'ko';
                    if (this.packagesList[group][key].label === 'phpVersionValid') {
                        this.translate.setTranslation(this.translate.getDefaultLang(), {
                            lang: {
                                install_phpVersionValid_desc: this.translate.instant('lang.currentVersion') + ' : ' + this.prerequisites['phpVersion']
                            }
                        }, true);
                    }
                });
            });
            this.stepFormGroup.controls['firstCtrl'].setValue(this.checkStep());
            this.stepFormGroup.controls['firstCtrl'].markAsUntouched();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["catchError"])((err) => {
            this.notify.handleSoftErrors(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(false);
        })).subscribe();
    }
    initStep() {
        let i = 0;
        Object.keys(this.packagesList).forEach(group => {
            this.packagesList[group].forEach((item, key) => {
                if (this.packagesList[group][key].state === 'ko') {
                    this.packageItem.toArray().filter((itemKo) => itemKo._elementRef.nativeElement.id === this.packagesList[group][key].label)[0].toggle();
                }
                i++;
            });
        });
    }
    checkStep() {
        let state = 'success';
        Object.keys(this.packagesList).forEach((group) => {
            this.packagesList[group].forEach((item) => {
                if (item.state === 'ko') {
                    state = '';
                }
            });
        });
        return state;
    }
    isValidStep() {
        return this.stepFormGroup === undefined ? false : this.stepFormGroup.controls['firstCtrl'].value === 'success';
    }
    getFormGroup() {
        return this.stepFormGroup;
    }
    getInfoToInstall() {
        return [];
    }
};
PrerequisiteComponent.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
PrerequisiteComponent.propDecorators = {
    packageItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChildren"], args: ['packageItem',] }]
};
PrerequisiteComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-prerequisite',
        template: _raw_loader_prerequisite_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_prerequisite_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PrerequisiteComponent);



/***/ }),

/***/ "e0dC":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/install-action/install-action.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"mat-dialog-content-container\">\n    <div mat-dialog-content [@.disabled]=\"disableAnimation\">\n        <mat-accordion>\n            <mat-expansion-panel hideToggle expanded>\n                <div class=\"launch-action\">\n                    <h2 class=\"text-center\" color=\"primary\">{{'lang.almostThere' | translate}}</h2>\n                    <button mat-raised-button type=\"button\" color=\"primary\"\n                        (click)=\"installStepAction.open();launchInstall()\" style=\"font-size: 25px;padding: 20px;\">\n                        <i class=\" far fa-hdd\"></i> {{'lang.launchInstall' | translate}}\n                    </button>\n                </div>\n            </mat-expansion-panel>\n            <mat-expansion-panel #installStepAction [expanded]=\"false\">\n                <mat-list-item *ngFor=\"let step of steps\">\n                    <div mat-line class=\"step\" [class.endStep]=\"step.state==='OK' || step.state==='KO'\"\n                        [class.currentStep]=\"step.state==='inProgress'\"><span class=\"stepLabel\">{{step.label}}</span>\n                        <ng-container *ngIf=\"step.state==='inProgress'\">...</ng-container>&nbsp;\n                        <i *ngIf=\"step.state==='OK'\" class=\"fa fa-check\" style=\"color: green\"></i>\n                        <i *ngIf=\"step.state==='KO'\" class=\"fa fa-times\" style=\"color: red\"></i>\n                        <div *ngIf=\"step.msgErr!==''\" class=\"alert-message alert-message-danger\" role=\"alert\"\n                            style=\"margin-top: 30px;min-width: 100%;\">\n                            {{step.msgErr}}\n                        </div>\n                    </div>\n                </mat-list-item>\n            </mat-expansion-panel>\n        </mat-accordion>\n    </div>\n    <ng-container *ngIf=\"isInstallComplete() || isInstallError() || !isInstallBegin()\">\n        <span class=\"divider-modal\"></span>\n        <div mat-dialog-actions class=\"actions\">\n            <button *ngIf=\"!isInstallError() && isInstallComplete()\" mat-raised-button mat-button color=\"primary\"\n                (click)=\"goToInstance()\">{{'lang.goToNewInstance' | translate}}</button>\n            <button *ngIf=\"isInstallError() || !isInstallBegin()\" mat-raised-button mat-button [mat-dialog-close]=\"\">{{'lang.cancel' | translate}}</button>\n        </div>\n    </ng-container>\n</div>");

/***/ }),

/***/ "fIQu":
/*!*****************************************************************************!*\
  !*** ./src/frontend/app/installer/prerequisite/prerequisite.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n.stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n.packageItem {\n  flex: 1 !important;\n}\n.iconCheckPackage {\n  background: white;\n  font-size: 15px !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n  border-radius: 20px;\n  height: 35px;\n  width: 35px;\n}\n.icon_ok {\n  color: green;\n}\n.icon_ok:before {\n  content: \"\";\n}\n.icon_warning {\n  color: orange;\n}\n.icon_warning:before {\n  content: \"\";\n}\n.icon_ko {\n  color: red;\n}\n.icon_ko:before {\n  content: \"\";\n}\n.link {\n  text-decoration: underline;\n  color: var(--maarch-color-primary) !important;\n}\n.packageName {\n  font-size: 120% !important;\n  white-space: normal !important;\n}\n.packageName i {\n  cursor: help;\n  opacity: 0.5;\n  color: var(--maarch-color-primary);\n}\n::ng-deep.tooltip-red {\n  background: #b71c1c;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3ByZXJlcXVpc2l0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEI7RUFFSSxZQUFBO0FBQUo7QUFFSTtFQUNJLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7QUFBUjtBQUlBO0VBQ0ksa0JBQUE7QUFESjtBQUlBO0VBQ0ksaUJBQUE7RUFDQSwwQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFESjtBQUlBO0VBQ0ksWUFBQTtBQURKO0FBSUE7RUFDSSxZQUFBO0FBREo7QUFJQTtFQUNJLGFBQUE7QUFESjtBQUlBO0VBQ0ksWUFBQTtBQURKO0FBS0E7RUFDSSxVQUFBO0FBRko7QUFLQTtFQUNJLFlBQUE7QUFGSjtBQUtBO0VBQ0ksMEJBQUE7RUFDQSw2Q0FBQTtBQUZKO0FBS0E7RUFDSSwwQkFBQTtFQUNBLDhCQUFBO0FBRko7QUFHSTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0NBQUE7QUFEUjtBQUtBO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0FBRkoiLCJmaWxlIjoicHJlcmVxdWlzaXRlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uc3RlcENvbnRlbnQge1xuICAgIC8vIG1heC13aWR0aDogODUwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuXG4gICAgLnN0ZXBDb250ZW50VGl0bGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWFhcmNoLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxufVxuXG4ucGFja2FnZUl0ZW0ge1xuICAgIGZsZXg6IDEgIWltcG9ydGFudDtcbn1cblxuLmljb25DaGVja1BhY2thZ2Uge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTVweCAhaW1wb3J0YW50O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgaGVpZ2h0OiAzNXB4O1xuICAgIHdpZHRoOiAzNXB4O1xufVxuXG4uaWNvbl9vayB7XG4gICAgY29sb3I6IGdyZWVuO1xufVxuXG4uaWNvbl9vazpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXFxmMTExXCI7XG59XG5cbi5pY29uX3dhcm5pbmcge1xuICAgIGNvbG9yOiBvcmFuZ2U7XG59XG5cbi5pY29uX3dhcm5pbmc6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlxcZjExMVwiO1xufVxuXG5cbi5pY29uX2tvIHtcbiAgICBjb2xvcjogcmVkO1xufVxuXG4uaWNvbl9rbzpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXFxmMTExXCI7XG59XG5cbi5saW5rIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICBjb2xvcjogdmFyKC0tbWFhcmNoLWNvbG9yLXByaW1hcnkpICFpbXBvcnRhbnQ7XG59XG5cbi5wYWNrYWdlTmFtZSB7XG4gICAgZm9udC1zaXplOiAxMjAlICFpbXBvcnRhbnQ7XG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbCAhaW1wb3J0YW50O1xuICAgIGkge1xuICAgICAgICBjdXJzb3I6IGhlbHA7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1hYXJjaC1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG59XG5cbjo6bmctZGVlcC50b29sdGlwLXJlZCB7XG4gICAgYmFja2dyb3VuZDogI2I3MWMxYztcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbiAgIl19 */");

/***/ }),

/***/ "iOzh":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/database/database.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\"><i class=\"fa fa-database\"></i> {{'lang.database' | translate}}</h2>\n    <div class=\"alert-message alert-message-info\" role=\"alert\" style=\"margin-top: 30px;min-width: 100%;\">\n        {{'lang.stepDatabase_desc' | translate}}\n    </div>\n    <form [formGroup]=\"stepFormGroup\" style=\"width: 850px;margin: auto;\">\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.host' | translate}}</mat-label>\n            <input matInput formControlName=\"dbHostCtrl\" required>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.port' | translate}}</mat-label>\n            <input matInput formControlName=\"dbPortCtrl\"  required>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.user' | translate}}</mat-label>\n            <input matInput formControlName=\"dbLoginCtrl\" required>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.password' | translate}}</mat-label>\n            <input [type]=\"hide ? 'password' : 'text'\" matInput formControlName=\"dbPasswordCtrl\" required>\n            <button mat-icon-button matSuffix color=\"primary\" (click)=\"hide = !hide\">\n                <mat-icon class=\"fa {{hide ? 'fa-eye-slash' : 'fa-eye'}}\"></mat-icon>\n            </button>\n        </mat-form-field>\n        <mat-form-field appearance=\"outline\">\n            <mat-label>{{'lang.dbName' | translate}}</mat-label>\n            <input matInput formControlName=\"dbNameCtrl\" maxlength=\"50\" required>\n        </mat-form-field>\n        <div class=\"alert-message alert-message-info\" *ngIf=\"dbExist\" role=\"alert\" style=\"margin-top: 0px;min-width: 100%;\">\n            {{'lang.stepEmptyDb' | translate}}\n        </div>\n        <mat-form-field appearance=\"outline\" floatLabel=\"never\">\n            <mat-label>{{'lang.dbSample' | translate}}</mat-label>\n            <mat-select formControlName=\"dbSampleCtrl\">\n                <mat-option *ngFor=\"let sample of dataFiles\" [value]=\"sample\">\n                    {{sample}}\n                </mat-option>\n            </mat-select>\n        </mat-form-field>\n        <div style=\"text-align:center;\">\n            <button mat-raised-button type=\"button\" color=\"primary\" (click)=\"checkConnection()\" [disabled]=\"isEmptyConnInfo() || stepFormGroup.controls['dbHostCtrl'].disabled\">\n                {{'lang.checkInformations' | translate}}\n            </button>\n        </div>\n    </form>\n</div>");

/***/ }),

/***/ "idS4":
/*!***********************************************************************!*\
  !*** ./src/frontend/app/installer/useradmin/useradmin.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".stepContent {\n  margin: auto;\n}\n.stepContent .stepContentTitle {\n  color: var(--maarch-color-primary);\n  margin-bottom: 30px;\n  border-bottom: solid 1px;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3VzZXJhZG1pbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUVJLFlBQUE7QUFESjtBQUdJO0VBQ0ksa0NBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsVUFBQTtBQURSIiwiZmlsZSI6InVzZXJhZG1pbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnN0ZXBDb250ZW50IHtcbiAgICAvLyBtYXgtd2lkdGg6IDg1MHB4O1xuICAgIG1hcmdpbjogYXV0bztcblxuICAgIC5zdGVwQ29udGVudFRpdGxlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1hYXJjaC1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn0iXX0= */");

/***/ }),

/***/ "k6h7":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/prerequisite/prerequisite.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\"><i class=\"fas fa-check-square\"></i> {{'lang.prerequisite' | translate}}</h2>\n    <div class=\"alert-message alert-message-info\" role=\"alert\" style=\"margin-top: 30px;min-width: 100%;\">\n        {{'lang.stepPrerequisite_desc' | translate}} : <a href=\"{{docMaarchUrl}}\" target=\"_blank\" class=\"link\">{{docMaarchUrl}}</a>\n    </div>\n    <mat-list style=\"background: white;\" *ngFor=\"let groupPackage of packagesList | keyvalue\">\n        <div mat-subheader>{{'lang.' + groupPackage.key | translate}}</div>\n        <mat-grid-list cols=\"3\" rowHeight=\"50px\">\n            <mat-grid-tile *ngFor=\"let package of packagesList[groupPackage.key]\">\n                <mat-list-item>\n                    <mat-icon mat-list-icon class=\"fa iconCheckPackage icon_{{package.state}}\"></mat-icon>\n                    <div mat-line class=\"packageName\">\n                        {{'lang.install_' + package.label | translate}} <i #packageItem=\"matTooltip\" [id]=\"package.label\" class=\"fa fa-info-circle\" \n                        [matTooltip]=\"'lang.install_'+package.label+'_desc' | translate\"\n                        [matTooltipClass]=\"package.state !== 'ok' ? 'tooltip-red' : ''\" matTooltipPosition=\"right\"></i>\n                    </div>\n                </mat-list-item>  \n            </mat-grid-tile>\n          </mat-grid-list>\n    </mat-list>\n    <div style=\"text-align: center;\">\n        <button mat-raised-button type=\"button\" color=\"primary\" (click)=\"getStepData()\">{{'lang.updateInformations' | translate}}</button>\n    </div>\n</div>\n");

/***/ }),

/***/ "ozdG":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/installer.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-sidenav-container autosize class=\"maarch-container\">\n    <mat-sidenav-content>\n        <div class=\"bg-head\">\n            <div class=\"bg-head-content\" [class.fullContainer]=\"appService.getViewMode()\">\n            </div>\n        </div>\n        <div class=\"container\" [class.fullContainer]=\"appService.getViewMode()\">\n            <div class=\"container-content\" style=\"overflow: hidden;\">\n                <mat-horizontal-stepper [@.disabled]=\"true\" *ngIf=\"!loading\" linear #stepper style=\"height: 100vh;overflow: auto;\" (selectionChange)=\"initStep($event)\">\n                    <mat-step label=\"install\">\n                        <ng-template matStepLabel>Installation</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-welcome #stepContent #appWelcome></app-welcome>\n                            </div>\n                            <button *ngIf=\"!authService.noInstall\" mat-fab [title]=\"'lang.home' | translate\" class=\"previousStepButton\" color=\"primary\" (click)=\"gotToLogin()\">\n                                <mat-icon class=\"fas fa-home\"></mat-icon>\n                            </button>\n                            <button mat-fab matStepperNext [title]=\"'lang.next' | translate\" class=\"nextStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-right\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <mat-step [stepControl]=\"appPrerequisite.getFormGroup()\">\n                        <ng-template matStepLabel>{{'lang.prerequisite' | translate}}</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-prerequisite #appPrerequisite #stepContent></app-prerequisite>\n                            </div>\n                            <button mat-fab matStepperPrevious [title]=\"'lang.previous' | translate\" class=\"previousStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-left\"></mat-icon>\n                            </button>\n                            <button mat-fab matStepperNext [title]=\"'lang.next' | translate\" class=\"nextStepButton\" color=\"primary\" [disabled]=\"!appPrerequisite.isValidStep()\">\n                                <mat-icon class=\"fa fa-arrow-right\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <mat-step [stepControl]=\"appDatabase.getFormGroup()\">\n                        <ng-template matStepLabel>{{'lang.database' | translate}}</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-database #appDatabase #stepContent (nextStep)=\"nextStep()\"></app-database>\n                            </div>\n                            <button mat-fab matStepperPrevious [title]=\"'lang.previous' | translate\" class=\"previousStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-left\"></mat-icon>\n                            </button>\n                            <button mat-fab matStepperNext [title]=\"'lang.next' | translate\" class=\"nextStepButton\" color=\"primary\" [disabled]=\"!appDatabase.isValidStep()\">\n                                <mat-icon class=\"fa fa-arrow-right\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <mat-step [stepControl]=\"appDocservers.getFormGroup()\">\n                        <ng-template matStepLabel>{{'lang.docserver' | translate}}</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-docservers #appDocservers #stepContent (nextStep)=\"nextStep()\"></app-docservers>\n                            </div>\n                            <button mat-fab matStepperPrevious [title]=\"'lang.previous' | translate\" class=\"previousStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-left\"></mat-icon>\n                            </button>\n                            <button mat-fab matStepperNext [title]=\"'lang.next' | translate\" class=\"nextStepButton\" color=\"primary\" [disabled]=\"!appDocservers.isValidStep()\">\n                                <mat-icon class=\"fa fa-arrow-right\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <mat-step [stepControl]=\"appCustomization.getFormGroup()\">\n                        <ng-template matStepLabel>{{'lang.customization' | translate}}</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-customization #appCustomization #stepContent [appDatabase]=\"appDatabase\" [appWelcome]=\"appWelcome\"></app-customization>\n                            </div>\n                            <button mat-fab matStepperPrevious [title]=\"'lang.previous' | translate\" class=\"previousStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-left\"></mat-icon>\n                            </button>\n                            <button mat-fab matStepperNext [title]=\"'lang.next' | translate\" class=\"nextStepButton\" color=\"primary\" [disabled]=\"!appCustomization.isValidStep()\">\n                                <mat-icon class=\"fa fa-arrow-right\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <mat-step [stepControl]=\"appUseradmin.getFormGroup()\">\n                        <ng-template matStepLabel>{{'lang.userAdmin' | translate}}</ng-template>\n                        <div class=\"stepContainer\">\n                            <div class=\"stepContent\">\n                                <app-useradmin #appUseradmin #stepContent (tiggerInstall)=\"endInstall()\"></app-useradmin>\n                            </div>\n                            <button mat-fab matStepperPrevious [title]=\"'lang.previous' | translate\" class=\"previousStepButton\" color=\"primary\">\n                                <mat-icon class=\"fa fa-arrow-left\"></mat-icon>\n                            </button>\n                            <button mat-fab [title]=\"'lang.beginInstall' | translate\" class=\"nextStepButton\" color=\"accent\" [disabled]=\"!appUseradmin.isValidStep()\" (click)=\"endInstall()\">\n                                <mat-icon class=\"fas fa-check-double\"></mat-icon>\n                            </button>\n                        </div>\n                    </mat-step>\n                    <ng-template matStepperIcon=\"edit\">\n                        <mat-icon class=\"fa fa-check stepIcon\"></mat-icon>\n                    </ng-template>\n                \n                    <ng-template matStepperIcon=\"done\">\n                        <mat-icon class=\"fa fa-check stepIcon\"></mat-icon>\n                    </ng-template>\n                \n                    <ng-template matStepperIcon=\"error\">\n                        <mat-icon class=\"fa fa-times stepIcon\" style=\"color: red;font-size: 15px !important;\"></mat-icon>\n                    </ng-template>\n                </mat-horizontal-stepper>\n            </div>\n        </div>\n    </mat-sidenav-content>\n</mat-sidenav-container>");

/***/ }),

/***/ "sqCo":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/docservers/docservers.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\"><i class=\"fa fa-hdd\"></i> {{'lang.docserver' | translate}}</h2>\n    <div class=\"alert-message alert-message-info\" role=\"alert\" style=\"margin-top: 30px;min-width: 100%;\">\n        {{'lang.stepDocserver_desc' | translate}}\n    </div>\n    <form [formGroup]=\"stepFormGroup\" style=\"width: 850px;margin: auto;\">\n        <mat-form-field appearance=\"outline\" style=\"color: initial;\">\n            <mat-label>{{'lang.docserverPath' | translate}}</mat-label>\n            <input matInput formControlName=\"docserversPath\">\n            <span matSuffix>/__CUSTOM_iD__/</span>\n        </mat-form-field>\n        <div style=\"text-align: center;\">\n            <button mat-raised-button type=\"button\" color=\"primary\" (click)=\"checkAvailability()\" [disabled]=\"!this.stepFormGroup.controls['docserversPath'].valid\">{{'lang.checkInformations' | translate}}</button>\n        </div>\n    </form>\n</div>");

/***/ }),

/***/ "v/rb":
/*!*********************************************************************************!*\
  !*** ./src/frontend/app/installer/install-action/install-action.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".step {\n  opacity: 0.5;\n  transition: all 0.2s;\n}\n.step .stepLabel {\n  transition: all 0.2s;\n}\n.currentStep {\n  opacity: 1;\n  transition: all 0.2s;\n}\n.currentStep .stepLabel {\n  font-size: 150%;\n  transition: all 0.2s;\n}\n.endStep {\n  opacity: 1;\n}\n.mat-expansion-panel {\n  box-shadow: none;\n}\n.launch-action {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2luc3RhbGwtYWN0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLG9CQUFBO0FBQ0o7QUFDSTtFQUNJLG9CQUFBO0FBQ1I7QUFHQTtFQUNJLFVBQUE7RUFPQSxvQkFBQTtBQU5KO0FBQ0k7RUFDSSxlQUFBO0VBQ0Esb0JBQUE7QUFDUjtBQUtBO0VBQ0ksVUFBQTtBQUZKO0FBS0E7RUFDSSxnQkFBQTtBQUZKO0FBS0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFGSiIsImZpbGUiOiJpbnN0YWxsLWFjdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdGVwIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG5cbiAgICAuc3RlcExhYmVsIHtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gICAgfVxufVxuXG4uY3VycmVudFN0ZXAge1xuICAgIG9wYWNpdHk6IDE7XG5cbiAgICAuc3RlcExhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxNTAlO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cblxuLmVuZFN0ZXAge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5tYXQtZXhwYW5zaW9uLXBhbmVsIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xufVxuXG4ubGF1bmNoLWFjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufSJdfQ== */");

/***/ }),

/***/ "xFLC":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/frontend/app/installer/welcome/welcome.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"stepContent\">\n    <h2 class=\"stepContentTitle\">{{'lang.welcomeApp' | translate:{value1: appVersion} }} !</h2>\n    <div style=\"text-align: center;\">\n        <mat-icon class=\"maarchLogoFull\" svgIcon=\"maarchLogoFull\"></mat-icon>\n    </div>\n    <form [formGroup]=\"stepFormGroup\" style=\"width: 850px;margin: auto;\">\n        <mat-form-field appearance=\"outline\" floatLabel=\"never\">\n            <mat-label>{{'lang.chooseAppLanguage' | translate}} : </mat-label>\n            <mat-select formControlName=\"lang\"  (selectionChange)=\"changeLang($event.value)\" required>\n                <mat-option *ngFor=\"let language of langs\" [value]=\"language\">\n                    {{'lang.' + language + 'Full' | translate}}\n                </mat-option>\n            </mat-select>\n        </mat-form-field>\n    </form>\n    <mat-divider></mat-divider>\n    <ng-container *ngIf=\"customs.length > 0\">\n        <mat-list>\n            <div mat-subheader>{{'lang.instancesList' | translate}} :\n            </div>\n            <mat-list-item *ngFor=\"let custom of customs\">\n                <mat-icon mat-list-icon color=\"primary\" class=\"fas fa-box-open\"></mat-icon>\n                <div mat-line>{{custom.label}} <small style=\"color: #666\">{{custom.id}}</small></div>\n            </mat-list-item>\n        </mat-list>\n        <mat-divider></mat-divider>\n    </ng-container>\n    <mat-list>\n        <div mat-subheader>{{'lang.installDescription' | translate}} :\n        </div>\n        <mat-list-item *ngFor=\"let step of steps\">\n            <mat-icon mat-list-icon color=\"primary\" [class]=\"step.icon\"></mat-icon>\n            <div mat-line>{{step.desc | translate}}</div>\n        </mat-list-item>\n    </mat-list>\n    <mat-divider></mat-divider>\n    <p>\n        {{'lang.externalInfoSite' | translate}} :\n    </p>\n    <a mat-raised-button color=\"primary\" href=\"https://community.maarch.org/\" target=\"_blank\">\n        community.maarch.org\n    </a>\n    {{'lang.or' | translate}}\n    <a mat-raised-button color=\"primary\" href=\"http://www.maarch.com\" target=\"_blank\">\n        www.maarch.com\n    </a>\n    <p style=\"font-style: italic;padding-top: 30px;text-align: right;\" [innerHTML]=\"'lang.maarchLicenceInstall' | translate\"></p>\n</div>");

/***/ })

}]);
//# sourceMappingURL=installer-installer-module-es2015.js.map