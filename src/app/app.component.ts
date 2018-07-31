import { UserProvider } from './../providers/user/user';
import { RegisterPage } from './../pages/register/register';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { InitialPage } from '../pages/initial/initial';
import { HumStateRepPage } from '../pages/hum-state-rep/hum-state-rep';
import { AboutUsPage } from '../pages/about-us/about-us';
import { AdvicePage } from '../pages/advice/advice';
import { LogoutPage } from '../pages/logout/logout';
import { FeedbackPage } from '../pages/feedback/feedback';

import { ContactUsPage } from '../pages/contact-us/contact-us';
// import { VolunteerWorkPage } from '../pages/volunteer-work/volunteer-work';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { TabsPage } from '../pages/tabs/tabs';



export interface PageInterface{
  title:string;
  pageName:string;
  tabComponent?:any;
  index?: number;
  icon: string
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  selectroot:any;
  check:any;
  loggedin:any;
  rootPage: any;// = this.selectroot; //HomePage;
  // pagesTab: PageInterface[];
  
  pages: Array<{title: string, component: any, icon: string, md:string}>;
  // pagesTab: PageInterface[]=[
  //   {title: 'tab 1', pageName: 'TabsPage1', tabComponent: 'Tab1Page',  index:0, icon:'home'},
  //   {title: 'tab 2', pageName: 'TabsPage2', tabComponent: 'Tab2Page',  index:1, icon:'home'},
  //   {title: 'tab 3', pageName: 'TabsPage3', tabComponent: 'Tab3Page',  index:2, icon:'home'},
  //   {title: 'tab 4', pageName: 'TabsPage4', tabComponent: 'Tab4Page',  index:3, icon:'home'},

  //  ]
  constructor(
    public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
       private httpClient:HttpClientModule,
       private storage: Storage,
      public userService: UserProvider) {
   
    this.storage.get('firsttime').then((val) => {
      this.check=val;
  //  if (this.check==='1'){this.rootPage=HomePage}
  if (this.check==='1'){this.rootPage=TabsPage}
      else{this.rootPage=InitialPage;}
      });
   
  
   
   
    this.initializeApp();
    
    this.userService.getUserFromStorage().then((user) => {
      

   if (user != null){
    this.pages = [
      { title: 'الرئيسية', component: TabsPage, icon: "ios-home" ,md:"md-home"},
     // { title: 'التسجيل', component: RegisterPage, icon: "ios-home" ,md:"md-home"},
     { title: 'تعديل المعلومات الشخصية', component: UpdateProfilePage, icon: "ios-create" ,md:"md-create"},
      { title: 'حول التطبيق', component: AboutUsPage,icon: "ios-people",md:"md-people" },
      { title: 'التبليغ عن الحالات الإنسانية', component: HumStateRepPage,icon: "ios-megaphone",md:"md-megaphone" },
      { title: 'اتصل بنا', component: ContactUsPage, icon: "ios-call",md: "md-call"},
      { title: 'شاركنا برأيك', component: FeedbackPage, icon: "ios-thumbs-up",md: "md-thumbs-up"},
      { title: 'خروج', component: LogoutPage, icon: "ios-log-out",md: "md-log-out"}
      
    ];
   }
      else{ this.pages = [
        { title: 'الرئيسية', component: TabsPage, icon: "ios-home" ,md:"md-home"},
        { title: 'تسجيل الدخول', component: RegisterPage, icon: "ios-log-in" ,md:"md-log-in"},
        { title: 'حول التطبيق', component: AboutUsPage,icon: "ios-people",md:"md-people" },
        { title: 'التبليغ عن الحالات الإنسانية', component: HumStateRepPage,icon: "ios-megaphone",md:"md-megaphone" },
        { title: 'اتصل بنا', component: ContactUsPage, icon: "ios-call",md: "md-call"},
        { title: 'شاركنا برأيك', component: FeedbackPage, icon: "ios-thumbs-up",md: "md-thumbs-up"},
        { title: 'خروج', component: LogoutPage, icon: "ios-log-out",md: "md-log-out"}
        
      ];}
      });
   
    // used for an example of ngFor and navigation
   

  }
  
// { title: 'List', component: ListPage },
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let params = {
      pageName: page.title
    };

    this.nav.setRoot(page.component, params);
  }
 
  
}
