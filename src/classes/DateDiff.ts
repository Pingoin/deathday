export default class DateDiff{
    private _major: Date;
    public get major(): Date {
        return this._major;
    }
    private _minor: Date;
    public get minor(): Date {
        return this._minor;
    }
    private diff: number;
    public get millis(): number {
        return this.diff%1000;
    }
    public get seconds(): number {
        return Math.floor(this.diff/1000)%60;
    }
    public get minutes(): number {
        return Math.floor(this.diff/(60*1000))%60;
    }
    public get hours(): number {
        return Math.floor(this.diff/(60*60*1000))%24;
    }
    public get days(): number {
        return Math.floor(this.diff/(24*60*60*1000))%7;
    }
    public get weeks(): number {
        return Math.floor(this.diff/(7*24*60*60*1000));
    }
    constructor(major:Date,minor:Date){
        this._major=major;
        this._minor=minor;
        this.diff=Math.abs(major.valueOf()-minor.valueOf());
    }
}