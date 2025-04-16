import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { IihStorageService } from "../services/iih-storage.service";

export class CanActivateUserType implements CanActivate{

constructor(private storageService:IihStorageService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const currentUser =
      this.storageService.getItemFromSessionStorage('current-user');


    if(currentUser && currentUser.type ==='admin'){
    console.log('dddddddddddddd');

      return true;
    }
    else{
      return false;
    }
  }


}