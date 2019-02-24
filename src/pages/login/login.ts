import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MembershipProvider } from '../../providers/membership/membership';
import { TabsPage } from '../tabs/tabs';
import { SERVICES_URL } from "../../config/url.services";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public UserName: string;
  public Password: string;
  public Message: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public membership: MembershipProvider) 
  {
    this.membership.VerifyStorage().then(isStorage=>
    {
      if(isStorage)
      {
        this.navCtrl.push(TabsPage);
      }
    })
    //this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login()
  {
    this.membership.VerifyUser(this.UserName, this.Password).then(isUser =>
    {
      if(isUser)
      {
        this.navCtrl.push(TabsPage);
      }
      else
      {
        this.Message='Credenciales no válidas';
      }
    })
  }

}
