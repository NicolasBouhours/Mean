
export class UploadService {

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
            let token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
            url = url.concat(token);
    
            xhr.open('POST', url, true);
    
            let formData = new FormData();
            formData.append("file", file, file.name);
            xhr.send(formData);
        });
    }
}