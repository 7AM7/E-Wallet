import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the StoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

  userStoreTransaction: any[]=[];
  constructor(public restProvider: RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getStoresTransaction();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoresPage');
  }

  goProfile(){
    this.navCtrl.push(ProfilePage);
  }
  doRefresh(refresher) {
    this.userStoreTransaction =[];
    console.log('Begin async operation', refresher);
    this.getStoresTransaction();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  getStoresTransaction()
  {
    this.restProvider.getStoresTransactions().then(data => {
      console.log(data);
        data['data'].forEach(element => {
          var branch = element['store'];
          var dataa = { name: branch.name, 
            date:element['created_at'], 
            imgUrl: branch.image,
            amount:""+element['balance']
          };
          if(dataa.imgUrl == null)dataa.imgUrl  = "assets/imgs/logo.png";
          if(dataa.date == null)dataa.date = "2018-07-01 18:00::01";
          console.log(dataa);
          this.userStoreTransaction.push(dataa);
        });

      });
  }

}
