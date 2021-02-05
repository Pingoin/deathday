import DateDiff from "./DateDiff";

const millisPerYear=1000*60*60*24*365.24219;

export default class LifeTable{
    private static raw = {
        age: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
        male: [78.63,77.9,76.92,75.93,74.94,73.95,72.96,71.96,70.97,69.97,68.98,67.99,66.99,66,65,64.01,63.02,62.03,61.05,60.07,59.1,58.12,57.15,56.17,55.19,54.22,53.24,52.26,51.29,50.31,49.34,48.36,47.39,46.42,45.46,44.49,43.52,42.56,41.6,40.64,39.69,38.73,37.79,36.84,35.9,34.96,34.02,33.09,32.17,31.25,30.34,29.44,28.54,27.66,26.78,25.92,25.06,24.22,23.39,22.57,21.77,20.98,20.2,19.43,18.68,17.94,17.21,16.49,15.78,15.09,14.4,13.72,13.05,12.39,11.73,11.1,10.47,9.85,9.24,8.65,8.08,7.52,6.99,6.49,6,5.55,5.13,4.73,4.36,4.03,3.72,3.44,3.17,2.93,2.72,2.52,2.34,2.19,2.07,1.94,1.83],
        female: [83.36,82.6,81.62,80.63,79.64,78.65,77.65,76.66,75.67,74.67,73.67,72.68,71.68,70.69,69.7,68.7,67.71,66.72,65.73,64.74,63.75,62.76,61.77,60.78,59.79,58.8,57.82,56.83,55.84,54.85,53.86,52.88,51.9,50.91,49.93,48.95,47.97,47,46.02,45.05,44.07,43.1,42.13,41.16,40.2,39.24,38.28,37.33,36.38,35.43,34.49,33.55,32.62,31.7,30.78,29.86,28.95,28.05,27.16,26.27,25.39,24.52,23.66,22.8,21.95,21.11,20.28,19.45,18.63,17.82,17.02,16.24,15.45,14.68,13.92,13.17,12.42,11.69,10.96,10.25,9.56,8.89,8.26,7.65,7.07,6.52,6.01,5.53,5.08,4.67,4.28,3.93,3.62,3.34,3.09,2.86,2.66,2.49,2.33,2.18,2.04]
    }
    public static getDeathDate(birth:Date,sex:"m"|"f"):DateOfDeath{
        const birthValue=birth.valueOf();
        const nowValue=new Date().valueOf();
        const ageMillis=nowValue-birthValue;
        const ageYears =Math.floor(ageMillis/millisPerYear);
        const partOfYear = ageMillis/millisPerYear- ageYears;
        const x2=ageYears+1;
        let y1=0;
        let y2=0;

        if(sex=="m"){
            y1=LifeTable.raw.male[ageYears];
            y2=LifeTable.raw.male[x2];
        }else{
            y1=LifeTable.raw.female[ageYears];
            y2=LifeTable.raw.female[x2];
        }

        const leavingYearsComp=y1+(y2-y1)/(x2-ageYears)*partOfYear;
        const leavingMillis=leavingYearsComp*millisPerYear;
        return {
            diff:new DateDiff(new Date(new Date().valueOf()+leavingMillis),new Date()),
            dateOfDeath:new Date(new Date().valueOf()+leavingMillis)
        };
    }
}
export interface DateOfDeath{
    diff:DateDiff,
    dateOfDeath:Date
}