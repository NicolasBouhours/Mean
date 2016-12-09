import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

    constructor(private jwtService: JwtService) {}

    uploadFile(file:File, url: string):Promise<any> {
        return new Promise((resolve, reject) => {
    
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(<any>JSON.parse(xhr.response));
                    } else {
                        reject(<any>JSON.parse(xhr.response));
                    }
                }
            };
    
            xhr.open('POST', url, true);

            if(this.jwtService.getToken()) {
                xhr.setRequestHeader('Authorization', `Token ${this.jwtService.getToken()}`);
            } 
    
            let formData = new FormData();
            formData.append("file", file, file.name);
            xhr.send(formData);
        });
    }
}