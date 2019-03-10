export class DiagnosticImage {
    patientId: string = "none";
    dateTaken: Date;
    age: number;
    gender: string;
    width: number;
    height: number;
    imagelocation: string;
    imagetype: string;
    imageid: string;

    constructor(obj) {
        if (obj) {
            this.patientId = obj.patientId;
            this.dateTaken = obj.dateTaken;
            this.age = obj.age;
            this.gender = obj.gender;
            this.imagelocation = obj.imagelocation;
            this.imageid = obj.imageid;
        }
    }
};