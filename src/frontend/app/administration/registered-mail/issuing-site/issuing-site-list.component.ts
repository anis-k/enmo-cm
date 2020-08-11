import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { HeaderService } from '../../../../service/header.service';
import { AppService } from '../../../../service/app.service';
import { FunctionsService } from '../../../../service/functions.service';
import { AdministrationService } from '../../administration.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { ConfirmComponent } from '../../../../plugins/modal/confirm.component';
import { filter, exhaustMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-issuing-site-list',
    templateUrl: './issuing-site-list.component.html',
    styleUrls: ['./issuing-site-list.component.scss']
})
export class IssuingSiteListComponent implements OnInit {

    @ViewChild('adminMenuTemplate', { static: true }) adminMenuTemplate: TemplateRef<any>;

    parameters: any = {};

    loading: boolean = true;

    data: any[] = [];

    displayedColumns = ['account_number', 'site_label', 'post_office_label', 'actions'];
    filterColumns = ['account_number', 'site_label', 'post_office_label'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        private translate: TranslateService,
        public http: HttpClient,
        private notify: NotificationService,
        private headerService: HeaderService,
        public appService: AppService,
        public functions: FunctionsService,
        public adminService: AdministrationService,
        private viewContainerRef: ViewContainerRef,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.headerService.setHeader(this.translate.instant('lang.administration') + ' ' + this.translate.instant('lang.issuingSites'));

        this.headerService.injectInSideBarLeft(this.adminMenuTemplate, this.viewContainerRef, 'adminMenu');
        this.loading = false;
        this.getData();
    }

    getData() {
        this.data = [];
        this.http.get('../rest/recommended/sites').pipe(
            tap((data: any) => {
                this.data = data['sites'];
                this.loading = false;
                setTimeout(() => {
                    this.adminService.setDataSource('admin_regitered_mail_issuing_site', this.data, this.sort, this.paginator, this.filterColumns);
                }, 0);
            }),
            catchError((err: any) => {
                this.notify.handleSoftErrors(err);
                return of(false);
            })
        ).subscribe();
    }

    delete(row: any) {
        const dialogRef = this.dialog.open(ConfirmComponent, { panelClass: 'maarch-modal', autoFocus: false, disableClose: true, data: { title: this.translate.instant('lang.delete'), msg: this.translate.instant('lang.confirmAction') } });

        dialogRef.afterClosed().pipe(
            filter((data: string) => data === 'ok'),
            exhaustMap(() => this.http.delete(`../rest/recommended/sites/${row.id}`)),
            tap(() => {
                this.data = this.data.filter((item: any) => item.id !== row.id);
                setTimeout(() => {
                    this.adminService.setDataSource('admin_regitered_mail_issuing_site', this.data, this.sort, this.paginator, this.filterColumns);
                }, 0);
                this.notify.success(this.translate.instant('lang.issuingSiteDeleted'));
            }),
            catchError((err: any) => {
                this.notify.handleErrors(err);
                return of(false);
            })
        ).subscribe();
    }

}
