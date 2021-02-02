import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@service/app.service';
import { DashboardService } from '@appRoot/home/dashboard/dashboard.service';
import { FunctionsService } from '@service/functions.service';

@Component({
    selector: 'app-tile-view-list',
    templateUrl: 'tile-view-list.component.html',
    styleUrls: ['tile-view-list.component.scss'],
})
export class TileViewListComponent implements OnInit, AfterViewInit {

    @Input() displayColumns: string[];

    @Input() resources: any[];
    @Input() tile: any;
    @Input() icon: string = '';
    @Input() route: string = null;

    thumbnailUrl: string = '';

    constructor(
        public translate: TranslateService,
        public http: HttpClient,
        public appService: AppService,
        private dashboardService: DashboardService,
        public functionsService: FunctionsService
    ) { }

    ngOnInit(): void {
        console.log(this.resources);
        
    }

    ngAfterViewInit(): void { }

    viewThumbnail(ev: any, resource: any) {
        const timeStamp = +new Date();
        this.thumbnailUrl = '../rest/resources/' + resource.resId + '/thumbnail?tsp=' + timeStamp;
        $('#viewThumbnail').show();
        console.log(ev);
    }

    closeThumbnail() {
        $('#viewThumbnail').hide();
    }

    goTo(resource: any) {
        const data = { ...resource, ...this.tile.parameters, userId: this.tile.userId };

        this.dashboardService.goTo(this.route, data);
    }

    isDate(val: any) {
        if (!isNaN(Date.parse(val))) {
            return true;
        } else {
            return false;
        }
    }
}
