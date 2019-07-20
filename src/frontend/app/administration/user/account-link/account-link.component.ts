import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LANG } from '../../../translate.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../notification.service';

declare function $j(selector: any): any;

@Component({
    templateUrl: 'account-link.component.html',
    styleUrls: ['account-link.component.scss'],
    providers: [NotificationService]
})
export class AccountLinkComponent {
    lang: any = LANG;
    externalUser: any = {
        inMaarchParapheur: false,
        login: '',
        firstname: '',
        lastname: '',
        email: '',
        picture: ''
    };

    constructor(public http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AccountLinkComponent>, private notify: NotificationService) {
    }

    ngOnInit(): void {
        this.http.get('../../rest/autocomplete/maarchParapheurUsers', { params: { "search": this.data.user.mail, "exludeAlreadyConnected": 'true' } })
        .subscribe((dataUsers: any) => {
            if ( dataUsers.length > 0) {
                this.externalUser = dataUsers[0];
                this.externalUser.inMaarchParapheur = true;
                this.http.get("../../rest/maarchParapheur/user/" + this.externalUser.id + "/picture")
                .subscribe((data: any) => {
                    this.externalUser.picture = data.picture;                        
                }, (err) => {
                    this.notify.handleErrors(err);
                });
            } else {
                this.externalUser.inMaarchParapheur = false;
                this.externalUser = this.data.user;
                this.externalUser.login = this.data.user.user_id;
                this.externalUser.email = this.data.user.mail;
            }
        }, (err: any) => {
            this.notify.handleErrors(err);
        });

    }

    selectUser(user: any) {
        this.externalUser = user;
        this.externalUser.inMaarchParapheur = true;
        this.http.get("../../rest/maarchParapheur/user/" + this.externalUser.id + "/picture")
        .subscribe((data: any) => {
            this.externalUser.picture = data.picture;                        
        }, (err) => {
            this.notify.handleErrors(err);
        });
    }

    unlinkMaarchParapheurAccount() {
        this.externalUser.inMaarchParapheur = false;
        this.externalUser = this.data.user;
        this.externalUser.login = this.data.user.user_id;
        this.externalUser.email = this.data.user.mail;
    }
}
