import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restangular } from 'ngx-restangular/';
import { AuthenticationService } from './authentication.service';
import { Global } from '../shared.components/global';

@Injectable()
export class ReportsService {
    constructor(private restangular: Restangular) { }

    public getReportCategories(projectID: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).all('GetReportCategories/' + projectID).getList();
    }
}

@Injectable()
export class ReportMaintenanceService {
    constructor(private restangular: Restangular) { }

    public getAllReports(projectID: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).all('GetReportsForMaintenance/' + projectID).getList();
    }

    public getReportCategory(projectReportCategoryID: number): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('GetReportCategory/' + projectReportCategoryID).get();
    }

    public saveReportCategory(data: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).all('SaveReportCategory').post(data);
    }

    public switchCategoryState(id: number, active: boolean): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('SwitchCategoryState/' + id + '/' + active).get();
    }

    public updateCategorySortOrder(id: number, sortDirection: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('UpdateCategorySortOrder/' + id + '/' + sortDirection).get();
    }

    public getReportCategories(projectID: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).all('GetReportCategoriesMaintenance/' + projectID).getList();
    }

    public updateReportSortOrder(id: number, sortDirection: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('UpdateReportSortOrder/' + id + '/' + sortDirection).get();
    }

    public getReportDetails(id: number): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('GetReportDetails/' + id).get();
    }

    public saveReport(data: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).all('SaveReport').post(data);
    }

    public switchReportState(id: number, active: boolean): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Reports/');
        }).one('SwitchReportState/' + id + '/' + active).get();
    }
}

@Injectable()
export class IssueMaintenanceService {
    constructor(private restangular: Restangular) { }

    public getAllIssueTypes(projectID: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).all('IssueType/' + projectID).getList();
    }

    public getIssueTypeDetails(id: number): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('GetIssueType/' + id).get();
    }

    public saveIssueType(data: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).all('SaveIssueType').post(data);
    }

    public switchIssueTypeState(id: number, active: boolean): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('ChangeActiveYNForIssueType/' + id + '/' + active).get();
    }

    public updateIssueTypeSortOrder(id: number, sortDirection: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('UpdateIssueTypeSortOrder/' + id + '/' + sortDirection).get();
    }

    public getAllIssueRelatesTos(issueTypeID: number): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).all('allIssueRelatesToForIssueType/' + issueTypeID).getList();
    }

    public getIssueRelatesToDetails(id: number): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('IssueRelatesTo/' + id).get();
    }

    public saveIssueRelatesTo(data: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).all('SaveIssueRelatesTo').post(data);
    }

    public switchIssueRelatesToState(id: number, active: boolean): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('changeActiveYNForIssueRelatesTo/' + id + '/' + active).get();
    }

    public updateIssueRelatesToSortOrder(id: number, sortDirection: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'SHEQ/');
        }).one('UpdateIssueRelatesToSortOrderForAnIssueType/' + id + '/' + sortDirection).get();
    }
}

@Injectable()
export class InspectionTemplateService {
    constructor(private restangular: Restangular) { }

    public getAllInspectionFrequencyUnits(): Observable<any[]> {
        return this.restangular.all('GetInspectionFrequencyUnitDrop').getList();
    }

    public getAllInspectionCategories(): Observable<any[]> {
        return this.restangular.all('GetInspectionCategoryDrop').getList();
    }


    /***** Start Inspection Template *****/

    public getAllInspectionTemplates(): Observable<any[]> {
        return this.restangular.all('GetAllInspectionTemplates').getList();
    }

    public getInspectionTemplate(id: string): Observable<any> {
        return this.restangular.one('GetInspectionTemplate', id).get();
    }

    public cloneInspectionTemplate(id: string, cloneAsNewVersion: boolean): Observable<any> {
        return this.restangular.one('CloneInspectionTemplate/' + id + '/' + cloneAsNewVersion).get();
    }

    public saveInspectionTemplate(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionTemplate').post(data);
    }

    public changeInspectionTemplateActiveYN(id: string, activeYN: boolean): Observable<any> {
        return this.restangular.one('ChangeInspectionTemplateActiveYN/' + id + '/' + activeYN).get();
    }

    public updateInspectionTemplateSortOrder(id: string, sortDirection: string): Observable<any> {
        return this.restangular.one('UpdateInspectionTemplateSortOrder/' + id + '/' + sortDirection).get();
    }

    public getInspectionForWorkTypesByInspectionTemplateId(id: string): Observable<any[]> {
        return this.restangular.one('GetInspectionForWorkTypesByInspectionTemplateId').getList();
    }

    /***** End Inspection Template *****/


    /***** Start Inspection For Work Type *****/

    public getInspectionForWorkTypes(id1: string, id2: number): Observable<any[]> {
        return this.restangular.one('GetInspectionForWorkTypes/' + id1 + '/' + id2).getList();
    }

    public saveInspectionForWorkType(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionForWorkType').post(data);
    }

    public changeInspectionForWorkTypeActiveYN(id: string, activeYN: boolean): Observable<any> {
        return this.restangular.one('ChangeInspectionForWorkTypeActiveYN/' + id + '/' + activeYN).get();
    }

    /***** End Inspection For Work Type *****/


    /***** Start Inspection Item Category *****/

    public getAllInspectionItemCategories(id: string): Observable<any[]> {
        return this.restangular.one('GetAllInspectionItemCategories', id).getList();
    }

    public getInspectionItemCategory(id: string): Observable<any> {
        return this.restangular.one('GetInspectionItemCategory', id).get();
    }

    public saveInspectionItemCategory(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionItemCategory').post(data);
    }

    public changeInspectionItemCategoryActiveYN(id: string, activeYN: boolean): Observable<any> {
        return this.restangular.one('ChangeInspectionItemCategoryActiveYN/' + id + '/' + activeYN).get();
    }

    public deleteInspectionCategory(inspectionItemCategoryId: string): Observable<any> {
        return this.restangular.one('DeleteInspectionCategory', inspectionItemCategoryId).get();
    }

    public updateInspectionItemCategorySortOrder(id: string, sortDirection: string): Observable<any> {
        return this.restangular.one('UpdateInspectionItemCategorySortOrder/' + id + '/' + sortDirection).get();
    }
    /***** End Inspection Item Category *****/

    /***** Start Inspection Item Set *****/

    public getAllInspectionItemSets(id: string): Observable<any[]> {
        return this.restangular.one('GetAllInspectionItemSets', id).getList();
    }

    public getInspectionItemSet(id: string): Observable<any> {
        return this.restangular.one('GetInspectionItemSet', id).get();
    }

    public saveInspectionItemSet(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionItemSet').post(data);
    }

    public changeInspectionItemSetActiveYN(id: string, activeYN: boolean): Observable<any> {
        return this.restangular.one('ChangeInspectionItemSetActiveYN/' + id + '/' + activeYN).get();
    }

    public updateInspectionItemSetSortOrder(id: string, sortDirection: string): Observable<any> {
        return this.restangular.one('UpdateInspectionItemSetSortOrder/' + id + '/' + sortDirection).get();
    }

    public deleteInspectionSet(inspectionItemSetId: string): Observable<any> {
        return this.restangular.one('DeleteInspectionSet', inspectionItemSetId).get();
    }

    /***** Start Inspection Item Set *****/


    /***** Start Inspection Question *****/

    public getAllInspectionQuestions(id: string): Observable<any[]> {
        return this.restangular.one('GetAllInspectionQuestions', id).getList();
    }

    public getInspectionQuestion(id: string): Observable<any> {
        return this.restangular.one('GetInspectionQuestion', id).get();
    }

    public saveInspectionQuestion(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionQuestion').post(data);
    }

    public updateInspectionQuestionSortOrder(id: string, sortDirection: string): Observable<any> {
        return this.restangular.one('UpdateInspectionQuestionSortOrder/' + id + '/' + sortDirection).get();
    }

    public getInspectionQuestionAttachmentDimensions(): Observable<any> {
        return this.restangular.one('GetInspectionQuestionAttachmentDimensions').getList();
    }

    public deleteInspectionQuestion(inspectionItemId: string): Observable<any> {
        return this.restangular.one('DeleteInspectionQuestion', inspectionItemId).get();
    }

    /***** End Inspection Question *****/


    /***** End Inspection Item Sample Attachment *****/

    public getInspectionItemSampleAttachment(id: string): Observable<any> {
        return this.restangular.one('GetInspectionItemSampleAttachment', id).get();
    }

    public getAllInspectionItemSampleAttachments(id: string): Observable<any[]> {
        return this.restangular.one('getAllInspectionItemSampleAttachments', id).getList();
    }

    public saveInspectionItemSampleAttachment(data: any): Observable<any> {
        return this.restangular.all('SaveInspectionItemSampleAttachment').post(data);
    }

    public deleteInspectionItemSampleAttachment(id: string): Observable<any> {
        return this.restangular.one('DeleteInspectionItemSampleAttachment', id).get();
    }

    /***** End Inspection Item Sample Attachment *****/


    private handleError(error: Response) {
        console.error(error);
        return error.json().error || 'Server error';
    }

}

@Injectable()
export class ProjectMaintenanceService {
    constructor(private restangular: Restangular) { }

    public getAllProjects(): Observable<any[]> {
        return this.restangular.one('GetAllProjects').getList();
    }

    public getAllAvailableProjects(module: string, area: string, access: string): Observable<any[]> {
        return this.restangular.one('GetAllAvailableProjects/' + module + '/' + area + '/' + access).getList();
    }

    public getAllProgramOfWorks(id: string): Observable<any[]> {
        return this.restangular.one('GetAllProgramDropDown/' + id + '/' + false).getList();
    }

    public getAllActivities(id: number): Observable<any[]> {
        return this.restangular.one('GetAllActivityDropDown/' + id + '/' + false).getList();
    }

    public getAllWorkTypes(id: string): Observable<any[]> {
        return this.restangular.one('WorkTypeDropDown/' + id + '/' + true).getList();
    }

    public getAllQuoteTypes(id1: string, id2: string): Observable<any[]> {
        return this.restangular.one('AllQuoteTypes/' + id1 + '/' + id2).getList();
    }

    public getSubTasks(): Observable<any[]> {
        return this.restangular.one('GetAllSubTasks').getList();
    }

    public getAllProjectSites(text: string, value: string, activeYN: boolean): Observable<any[]> {
        let data = { text: text, value: value, actYN: activeYN };
        return this.restangular.all('GetAllProjectSites1').post(data);
    }
}


@Injectable()
export class ProjectRegionService {
    constructor(private restangular: Restangular) { }

    public getProjectRegions(id: string): Observable<any[]> {
        return this.restangular.one('GetProjectRegions/' + id).getList();
    }
}


@Injectable()
export class QuotationService {

    constructor(private restangular: Restangular) { }

    public searchQuotations(data: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('SearchQuotations').post(data);
    }

    public getQuotationSearchResult(id: number, pageNo: number, rowsPerPage: number): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationSearchResult/' + id + '/' + pageNo + '/' + rowsPerPage).getList();
    }

    public getAllProjectResources(id: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetAllProjectResources/' + id).getList();
    }

    public getAllQuotationStatuses(): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationStatus').getList();
    }

    public getQuoteApprovalLimit(id: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuoteApprovalLimit/' + id).get();
    }

    public exportQuotation(id: string, csv: boolean): Observable<any> {
        return this.restangular
            .withConfig(function (RestangularConfigurer: any) {
                RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
            })
            .one('ExportQuotation/' + id + '/' + csv)
            //.withHttpConfig({ responseType: 'application/octet-stream' })
            .customGET();
    }

    public exportQuotationExcel(id: string, excelTypeId: number): Observable<any> {
        return this.restangular
            .withConfig(function (RestangularConfigurer: any) {
                RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
            })
            .one('ExportQuotationExcel/' + id + '/' + excelTypeId)
            //.withHttpConfig({ responseType: 'application/octet-stream' })
            .customGET();
    }





    public getProgramPriceBooks(programID: number, projectID: string, quoteID: string = null): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetProgramPriceBooks/' + programID + '/' + projectID + (quoteID ? '/' + quoteID : '')).getList();
    }

    public getAllProjectSites(text: string, value: string, activeYN: boolean): Observable<any[]> {
        let data = { text: text, value: value, actYN: activeYN };
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('GetAllProjectSites').post(data);
    }

    public getAllQuotationItems(id: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetAllQuotationItems', id).get();
    }

    public saveQuoteDetails(api: any, model: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all(api).post(model);
    }

    public getQuotationItemDropdown(quoteID: string, priceBookID: number): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationItemDropdown/' + quoteID + '/' + priceBookID).get();
    }

    public saveAllQuotationItems(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('SaveAllQuotationItems').post(data);
    }

    public getQuotationDCSumDetails(id: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationDCSumDetails', id).get();
    }

    public getQuoteDetails(id: string): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuoteDetails', id).get();
    }

    public changeClientResponseDate(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('ChangeClientResponseDate2').post(data);
    }

    public getAllSearchValues(moduleName: string, areaName: string, projectID: string = null) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetAllSearchValues/' + moduleName + '/' + areaName + '/' + projectID).get();
    }

    public getQuotationGroupNumber(): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationGroupNo').getList();
    }

    public getLinkableWorkOrders(id: string): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetLinkableWorkOrders/' + id).getList();
    }

    public getWorkOrderQuotationDetails(id: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetWorkOrderQuotationDetails/' + id).getList();
    }

    public getConflictElements(quotId: any, workOrderId: any): Observable<any[]> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetConflictElements/' + quotId + '/' + workOrderId).getList();
    }

    public linkToWorkOrder(quotId: any, workOrderId: any): Observable<any> {
        let data = { quotationId: quotId, workOrderId: workOrderId };
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('LinkWorkOrder').post(data);
    }

    public getQuotationCommentTypes(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('getQuotationCommentTypes', id).getList();
    }

    public getQuotationComments(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationComments', id).getList();
    }

    public saveQuotationComment(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('SaveQuotationComment').post(data);
    }

    public getQuotationCommentAttachment(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationCommentAttachment', id).get();
    }

    public deleteQuotationComment(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('DeleteQuotationComment', id).get();
    }

    public deleteQuotationCommentAttachment(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('DeleteQuotationCommentAttachment', id).get();
    }

    public addAttachmentsToQuotationComment(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('AddAttachmentsToQuotationComment').post(data);
    }


    public getQuotationSupportingDocuments(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationSupportingDocuments', id).getList();
    }

    public getQuotationSupportingDocument(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('GetQuotationSupportingDocument', id).get();
    }

    public saveQuotationSupportingDocument(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('SaveQuotationSupportingDocument').post(data);
    }

    public saveQuotationSupportingDocuments(data: any): Observable<any> {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).all('SaveQuotationSupportingDocuments').post(data);
    }

    public deleteQuotationSupportingDocument(id: string) {
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
        }).one('DeleteQuotationSupportingDocument', id).get();
	}

	public getAllQuoteTypes(workTypeID: number, quoteReasonID: number): Observable<any[]> {
		console.log(workTypeID);
		console.log(quoteReasonID);
		if (quoteReasonID) {
			return this.restangular.withConfig(function (RestangularConfigurer: any) {
				RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
			}).one('GetAllQuoteTypes/' + workTypeID + '/' + quoteReasonID).getList();
		}
		else {
			return this.restangular.withConfig(function (RestangularConfigurer: any) {
				RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
			}).one('GetAllQuoteTypes/' + workTypeID).getList();
		}
	}

	public getAllProjects(moduleName: string, areaName: string): Observable<any[]> {
		return this.restangular.withConfig(function (RestangularConfigurer: any) {
			RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL + 'Quotes/');
		}).one('GetAllProjects/' + moduleName + '/' + areaName).getList();
	}
}


@Injectable()
export class WorkOrderService {

    constructor(private restangular: Restangular) { }

    public getRegions(id: string): Observable<any> {
        return this.restangular.all('GetRegions/' + id).getList();
    }

    public getWorkOrderStatus(): Observable<any> {
        return this.restangular.all('GetWorkOrderStatus').getList();
    }

    public getProgramOfWorks(id: string): Observable<any> {
        return this.restangular.all('GetProgramOfWorks/' + id).getList();
    }

    public searchWorkOrders(data: any): Observable<any[]> {
        return this.restangular.all('SearchWorkOrders').post(data);
    }

    public getWorkOrderSearchResult(pageNo: number, rowsPerPage: number): Observable<any[]> {
        return this.restangular.one('GetWorkOrderSearchResult/' + pageNo + '/' + rowsPerPage).getList();
    }

    public searchWorkOrderDetailsWithFilters(projectId: string, projectSiteID: number, visibleWorkOrder: boolean, regionId: number, programId: number,
        activityId: number, workId: string, clientWorkId: string, siteId: string, workOrderStatusId: number, siteName: string): Observable<any[]> {

        let obj = { projectId: projectId, siteInternalId: 0, regionId: regionId ? regionId : 0, programId: programId, workType: activityId ? activityId : 0, workOrderStatusId: 0, workId, clientWorkId, siteId, siteName };

        return this.restangular.all('SearchWorkOrderDetailsWithFilters').post(obj);
    }

    public GetWorkOrderTaskItems(id: string): Observable<any> {
        return this.restangular.one('GetWorkOrderTaskItems', id).get();
    }
}

@Injectable()
export class EventLogService {
    constructor(private restangular: Restangular) { }

    public getEventLogs(areaNames: string[], primaryKey: number, secondaryKey: number): Observable<any[]> {
        let obj = { areaNames, primaryKey, secondaryKey };
        return this.restangular.withConfig(function (RestangularConfigurer: any) {
            RestangularConfigurer.setBaseUrl(Global.Constants.ZionAPI.URL);
        }).all('GetEventLogs').post(obj);
    }
}

@Injectable()
export class LocalStorageService {
    constructor() { }

    public getItem(prefix: string, item: string): any {
        let projectID: any = sessionStorage.getItem(prefix + "." + item);
        console.log(projectID);
        if (projectID) {
            if (projectID[0] === "\"" && projectID[projectID.length - 1] === "\"") {
                projectID = projectID.slice(1, projectID.length - 1); //to remove starting and ending double quotes.
            }
            return projectID;
        }
        else {
            return '';
        }
    }

    public setItem(prefix: string, item: string, value: string): any {
        sessionStorage.setItem(prefix + "." + item, value);
    }
}
