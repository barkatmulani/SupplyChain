import { ToastrService } from "ngx-toastr";

export class Global {
    static _apiUrl = '';

    static initialize() {
        var docURL = document.URL;

        var prefix = 'http://'
        if (docURL.indexOf('https://') >= 0) {
            prefix = 'https://'
        }

        if (docURL.indexOf('localhost') >= 0) {
            Global.apiUrl = prefix + 'api.supplychain-ms.com/api/';
        }
        else if (docURL.indexOf('azure') >= 0) {
            Global.apiUrl = prefix + 'supplychainmanagementsystem-api.azurewebsites.net/api/';
        }
        else {
            Global.apiUrl = prefix + 'api.supplychain-ms.com/api/';
        }
    }

    public static stripFromUrl(count: number) {
        let url = window.location.href;
        let newUrl = url;
        let arr = url.split('/');
        if(arr.length > count) {
          arr.pop();
          newUrl = arr.join('/');
        }
    
        if (typeof (history.pushState) != "undefined") {
            history.pushState({}, null, newUrl);
        } else {
            window.location.href = newUrl;
        }
    }

    public static getEscapeSequence = function(str: string) : string {
        let i: number;
        let s, outStr: string = "";

        for (i = 0; i < str.length; i++) {
            s = str.charCodeAt(i).toString(16);
            s = (s.length == 1 ? '0' : '') + s;

            outStr += '%' + s;
        }

        return outStr;
    }

    public static addArrayItem(array: any[], item: any): any[] {
        let temp = array.slice();
        temp[temp.length] = item;
        return temp;
    }

    public static removeArrayItem(array: any[], index: number): any[] {
        let temp = array.slice();
        temp.splice(index, 1);
        return temp;
    }

    public static cloneObject(aObject: any) {
        var bObject, v, k;
        bObject = Array.isArray(aObject) ? [] : {};
        for (k in aObject) {
            v = aObject[k];
            bObject[k] = (typeof v === "object") ? this.cloneObject(v) : v;
        }
        return bObject;
    }
    
    public static getMonthName(monthNo: number): string {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthNo - 1];
    }

    public static getFormattedDate(d: Date): string {
        return d.getDate() + '-' + Global.getMonthName(d.getMonth()) + '-' + d.getFullYear();
    }

    public static getCurrentDate(): string {
        let d = new Date(Date.now());
        return d.getFullYear() + '-' + this.appendZeros(d.getMonth(), 2) + '-' + this.appendZeros(d.getDate(), 2);
    }

    private static appendZeros(n: number, digits: number) {
        let str = '';
        for(let i = ('' + n).length; i < digits; i++) {
            str += '0';
        }
        return str + n;
    }

    public static get apiUrl() {
        // console.log('_apiUrl: ' + Global._apiUrl);
        return Global._apiUrl;
    }

    public static set apiUrl(val: string) {
        Global._apiUrl = val;
    }

    public static showNotification(type: string, toastr: ToastrService) {
        let action: string;
    
        if(type === 'C') {
            toastr.warning('Action cancelled', 'Notification!');
        }
        else {        
            switch (type) {
                case 'A': action = 'added'; break;
                case 'U': action = 'updated'; break;
                case 'D': action = 'deleted'; break;
            }
            
            toastr.success(`Record ${action} successfully`, 'Success!');
        }
    }
}

export enum Status
{
  Open = 1,
  Posted,
  Cancelled
}

Global.initialize();