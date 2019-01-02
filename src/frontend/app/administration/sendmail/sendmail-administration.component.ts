import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { LANG } from '../../translate.component';
import { MatSidenav } from '@angular/material';
import { NotificationService } from '../../notification.service';
import { HeaderService }        from '../../../service/header.service';

declare function $j(selector: any): any;

declare var angularGlobals: any;


@Component({
    templateUrl: "sendmail-administration.component.html",
    providers: [NotificationService]
})
export class SendmailAdministrationComponent implements OnInit {

    @ViewChild('snav') public  sidenavLeft   : MatSidenav;
    @ViewChild('snav2') public sidenavRight  : MatSidenav;
    
    mobileQuery                     : MediaQueryList;
    private _mobileQueryListener    : () => void;

    coreUrl     : string;
    lang        : any = LANG;
    loading     : boolean = false;

    sendmail: any = {
        'smtpType': 'internalParam',
        'host': '',
        'SMTPAuth': true,
        'username': '',
        'password': '',
        'SMTPSecure': 'ssl', //tls, ssl, starttls
        'port': '465',

    };

    smtpTypeList = [
        {
            id : 'internalParam',
            label : this.lang.internalParam
        }
        ,{
            id : 'smtpRelay',
            label : this.lang.smtpRelay
        }
    ];
    smtpTypeDesc = '';
    smtpSecList = ['ssl', 'tls'];
    sendmailClone: any = {};


    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public http: HttpClient, private notify: NotificationService, private headerService: HeaderService) {
        $j("link[href='merged_css.php']").remove();
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.headerService.headerMessage = this.lang.sendmail;
        window['MainHeaderComponent'].setSnav(this.sidenavLeft);
        window['MainHeaderComponent'].setSnavRight(null);

        this.loading = true;
        this.coreUrl = angularGlobals.coreUrl;

        // this.http.get(this.coreUrl + 'rest/sendmail')
        //     .subscribe((data: any) => {

        //     }, (err) => {
        //         this.notify.error(err.error.errors);
        //     });
        this.loading = false;
    }

    cancelModification() {
        this.sendmail = JSON.parse(JSON.stringify(this.sendmailClone));
    }

    changeDesc(e: any) {
        this.smtpTypeDesc = this.lang[e.selected.value+'Desc'];
        console.log(e.selected.value+'Desc');
    }
}
