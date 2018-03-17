import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class AppService{
    name:string='';
    constructor(public http:Http, private httpClient:HttpClientModule){

    }
    getNeeders()
    {
        // return this.http.get("http://jsonplaceholder.typicode.com/users").map(res => res.json())
        return this.http.get("../assets/json/data.json").map(res => res.json())
    }
    postNeeders(name,loc,pos,det):Promise<any>
    {
        let param={FName:name,Location:loc,Position:pos,Details:det};
        let url="http://httpbin.org/post";
        
        // let url="../assets/json/data.json";
        let request=this.http.post(url,param);
        return request.toPromise();
    }

    onNameKeyUp(event: any){
        this.name=event.target.value;
    }
    getProfile(){
        // console.log(this.name);
        let url:any;
        this.http.get('https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles/?name=${this.name}').map(res=> res.json()
        .subscribe(
            (data:any[]) => {
                console.log(data)
            })
        )
    }
}