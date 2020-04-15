interface Date {
    toTransportDateTimeString(): string;
    toTransportDateString(): string;
    getStringDate(): string;
    fromTransportDateTimeString(dateStr: string): Date;
    fromTransportDateString(dateStr: string): Date;
    addCustomDays(dayNumber: number): Date;
}

Date.prototype.toTransportDateTimeString = function(): string {
    let result = '';
    result += this.getFullYear();
    result += ('0' + (this.getMonth() + 1)).slice(-2);
    result += ('0' + this.getDate()).slice(-2);
    result += ('0' + this.getHours()).slice(-2);
    result += ('0' + this.getMinutes()).slice(-2);
    result += ('0' + this.getSeconds()).slice(-2);
    return result;
};

Date.prototype.toTransportDateString = function(): string {
    let result = '';
    result += this.getFullYear();
    result += ('0' + (this.getMonth() + 1)).slice(-2);
    result += ('0' + this.getDate()).slice(-2);
    return result;
};

Date.prototype.fromTransportDateTimeString = (dateStr: string): Date => {

    if (!dateStr) {
        return null;
    }
    const year: number = +dateStr.slice(0, 4);
    const month: number = +dateStr.slice(4, 6);
    const day: number = +dateStr.slice(6, 8);
    const hour: number = +dateStr.slice(8, 10);
    const minute: number = +dateStr.slice(10, 12);
    const second: number = +dateStr.slice(12, 14);
    const resultDate = new Date(year, month - 1, day, hour, minute, second);

    return resultDate;
};

Date.prototype.fromTransportDateString = (dateStr: string): Date => {

    if (!dateStr) {
        return null;
    }
    const year: number = +dateStr.slice(0, 4);
    const month: number = +dateStr.slice(4, 6);
    const day: number = +dateStr.slice(6, 8);
    const resultDate = new Date(year, month - 1, day, 0, 0, 0);

    return resultDate;
};

Date.prototype.addCustomDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
