import { environment } from 'src/environments/environment';

export class QuestionSheetResourceConstants {

    public static UPLOAD_FILE = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/${environment.folderId}:/{fileName}:/content`;
    public static UPLOAD_FILE_BY_SESSION = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/${environment.imagesFolderId}:/{fileName}:/createUploadSession`;
    public static SAVE = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/{sheetId}/workbook/worksheets/Results/tables/Table1/rows/add`;
    public static SITES = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/{sheetId}/workbook/worksheets/Branches/range(address='A2:E7000')?$select=values`;
    public static CUSTOMERS = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/{sheetId}/workbook/worksheets/{sheetName}/range(address='D2:H7000')?$select=values`;
    public static LOCATIONS = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/{sheetId}/workbook/worksheets/{sheetName}/range(address='E2:L7000')?$select=values`;
    public static GET_FILE_FROM_FOLDER = `https://graph.microsoft.com/v1.0/sites/imperialco.sharepoint.com/drives/${environment.driveId}/items/${environment.folderId}/children?$select=id,name`;

    public static HOME_PAGE_ROUTE = '/';
}
