import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVICES_URL } from "../../config/url.services";
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Order } from '../../models/order';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items:any[]=[];
  public UserId: string;
  public client: any;
  public Observation: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:HttpClient,
    public storage:Storage,
    private platform:Platform)
  {
    this.http.get(`${ SERVICES_URL }`+'/product/ClientProducts?clientId=0').subscribe(
      (data) => { // Success
        this.items = data['products'];
        console.log(data['products']);        
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  AddItem( idx:number ){

    this.items[idx].ProductQuantity += 1;
    
  }

  Save()
  {
    if(this.platform.is('cordova'))
    {
      this.storage.get('userId').then(val=>
        {
          if(val)
          {
            this.UserId=val;

            this.http.get(`${ SERVICES_URL }`+'/api/Client/'+this.UserId).subscribe(
              (data) => { // Success
                this.client = data['client'];
                console.log(data['client']);  
                                                                  
                    let order=new Order();
                    order.ClientId=this.client.ClientId;
                      /*visita.FirstName="";
                      visita.LastName="";
                      visita.LegalName="";
                      visita.Address="";
                      visita.Phone="";
                      visita.Mobile="";
                      visita.Email="";             
                      visita.Latitude=0;
                      visita.Longitude=0;
                      visita.ClientObservation="";*/
                      order.Observation=this.Observation;
                      /*visita.NextVisitDate=null;
                      visita.NextVisitObservation="";
                      visita.UserId=parseInt(this.UserId);
                      visita.OrderDeliveryDate = new Date();*/
                      order.items=this.items;
          
                      console.log(order);
          
          
                      let body = JSON.stringify( order );           
                                                            
                      console.log(body);

                      
                      const httpOptions = {
                        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                      };
                      this.http.post(`${ SERVICES_URL }`+'/Client/Order', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                                      (err)=>this.showErrorAlert(err));

                  },
                  (error) =>{
                    console.error(error);
                  }
                );


          }
          else
          {
            this.UserId='0';
          }
        })
    }
    else
    {
      this.http.get(`${ SERVICES_URL }`+'/api/Client/1447').subscribe(
        (data) => { // Success
          this.client = data['client'];
          console.log(data['client']);   

          let order=new Order();
                    order.ClientId=this.client.ClientId;
                      /*visita.FirstName="";
                      visita.LastName="";
                      visita.LegalName="";
                      visita.Address="";
                      visita.Phone="";
                      visita.Mobile="";
                      visita.Email="";             
                      visita.Latitude=0;
                      visita.Longitude=0;
                      visita.ClientObservation="";*/
                      order.Observation=this.Observation;
                      /*visita.NextVisitDate=null;
                      visita.NextVisitObservation="";
                      visita.UserId=parseInt(this.UserId);
                      visita.OrderDeliveryDate = new Date();*/
                      order.items=this.items;
          
                      console.log(order);
          
          
                      let body = JSON.stringify( order );           
                                                            
                      console.log(body);

                      
                      const httpOptions = {
                        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                      };
                      this.http.post(`${ SERVICES_URL }`+'/Client/Order', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                                      (err)=>this.showErrorAlert(err));
        },
        (error) =>{
          console.error(error);
        }
      );
    }

    //this.items=[];


  }

  showSuccesAlert() {
    /*const alert = this.alertCtrl.create({
      title: 'Registro Insertado!',
      subTitle: 'La visita/pedido fue registrada Exitosamente!',
      buttons: ['OK']
    });
    alert.present();*/
    console.log("Exito");
  }

  showErrorAlert(error: string) {
    /*const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();*/
    console.log(error);
  }

}
