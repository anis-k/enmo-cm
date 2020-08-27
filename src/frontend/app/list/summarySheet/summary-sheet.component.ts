import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../service/notification/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FunctionsService } from '../../../service/functions.service';

@Component({
    templateUrl: 'summary-sheet.component.html',
    styleUrls: ['summary-sheet.component.scss']
})
export class SummarySheetComponent implements OnInit {

    
    loading: boolean = false;

    withQrcode: boolean = true;

    paramMode: boolean = false;

    dataAvailable: any[] = [
        {
            id: 'primaryInformations',
            unit: 'primaryInformations',
            label: this.translate.instant('lang.primaryInformations'),
            css: 'col-md-6 text-left',
            desc: [
                this.translate.instant('lang.mailDate'),
                this.translate.instant('lang.arrivalDate'),
                this.translate.instant('lang.nature'),
                this.translate.instant('lang.creation_date'),
                this.translate.instant('lang.mailType'),
                this.translate.instant('lang.initiator')
            ],
            enabled: true
        },
        {
            id: 'senderRecipientInformations',
            unit: 'senderRecipientInformations',
            label: this.translate.instant('lang.senderRecipientInformations'),
            css: 'col-md-6 text-left',
            desc: [
                this.translate.instant('lang.senders'),
                this.translate.instant('lang.recipients')
            ],
            enabled: true
        },
        {
            id: 'secondaryInformations',
            unit: 'secondaryInformations',
            label: this.translate.instant('lang.secondaryInformations'),
            css: 'col-md-6 text-left',
            desc: [
                this.translate.instant('lang.category_id'),
                this.translate.instant('lang.status'),
                this.translate.instant('lang.priority'),
                this.translate.instant('lang.processLimitDate'),
                this.translate.instant('lang.customFieldsAdmin')
            ],
            enabled: true
        },
        {
            id: 'diffusionList',
            unit: 'diffusionList',
            label: this.translate.instant('lang.diffusionList'),
            css: 'col-md-6 text-left',
            desc: [
                this.translate.instant('lang.dest_user'),
                this.translate.instant('lang.copyUsersEntities')
            ],
            enabled: true
        },
        {
            id: 'opinionWorkflow',
            unit: 'opinionWorkflow',
            label: this.translate.instant('lang.avis'),
            css: 'col-md-4 text-center',
            desc: [
                this.translate.instant('lang.firstname') + ' ' + this.translate.instant('lang.lastname') + ' (' + this.translate.instant('lang.destination').toLowerCase() + ')',
                this.translate.instant('lang.role'),
                this.translate.instant('lang.processDate')
            ],
            enabled: true
        },
        {
            id: 'visaWorkflow',
            unit: 'visaWorkflow',
            label: this.translate.instant('lang.visaWorkflow'),
            css: 'col-md-4 text-center',
            desc: [
                this.translate.instant('lang.firstname') + ' ' + this.translate.instant('lang.lastname') + ' (' + this.translate.instant('lang.destination').toLowerCase() + ')',
                this.translate.instant('lang.role'),
                this.translate.instant('lang.processDate')
            ],
            enabled: true
        },
        {
            id: 'notes',
            unit: 'notes',
            label: this.translate.instant('lang.notes'),
            css: 'col-md-4 text-center',
            desc: [
                this.translate.instant('lang.firstname') + ' ' + this.translate.instant('lang.lastname'),
                this.translate.instant('lang.creation_date'),
                this.translate.instant('lang.content')
            ],
            enabled: true
        }
    ];

    constructor(
        public translate: TranslateService,
        public http: HttpClient,
        private notify: NotificationService,
        public dialogRef: MatDialogRef<SummarySheetComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public functions: FunctionsService) { }

    ngOnInit(): void {
        this.paramMode = !this.functions.empty(this.data.paramMode);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    genSummarySheets() {
        this.loading = true;


        this.http.post('../rest/resourcesList/users/' + this.data.ownerId + '/groups/' + this.data.groupId + '/baskets/' + this.data.basketId + '/summarySheets', { units: this.formatSummarySheet(), resources: this.data.selectedRes }, { responseType: 'blob' })
            .subscribe((data) => {
                if (data.type !== 'text/html') {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(data);

                    let today: any;
                    let dd: any;
                    let mm: any;
                    let yyyy: any;

                    today = new Date();
                    dd = today.getDate();
                    mm = today.getMonth() + 1;
                    yyyy = today.getFullYear();

                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    today = dd + '-' + mm + '-' + yyyy;
                    downloadLink.setAttribute('download', this.translate.instant('lang.summarySheetsAlt') + '_' + today + '.pdf');
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                } else {
                    alert(this.translate.instant('lang.tooMuchDatas'));
                }

                this.loading = false;
            }, (err: any) => {
                this.notify.handleErrors(err);
            });
    }

    formatSummarySheet() {
        const currElemData: any[] = [];

        if (this.withQrcode) {
            currElemData.push({
                unit: 'qrcode',
                label: '',
            });
        }
        this.dataAvailable.forEach((element: any) => {
            if (element.enabled) {
                currElemData.push({
                    unit: element.unit,
                    label: element.label,
                });
            }
        });

        return currElemData;
    }

    toggleQrcode() {
        this.withQrcode = !this.withQrcode;
    }

    addCustomUnit() {
        this.dataAvailable.push({
            id: 'freeField_' + this.dataAvailable.length,
            unit: 'freeField',
            label: this.translate.instant('lang.comments'),
            css: 'col-md-12 text-left',
            desc: [
                this.translate.instant('lang.freeNote')
            ],
            enabled: true
        });
    }

    removeCustomUnit(i: number) {
        this.dataAvailable.splice(i, 1);
    }

    closeModalWithParams() {
        this.dialogRef.close(this.formatSummarySheet());
    }
}
