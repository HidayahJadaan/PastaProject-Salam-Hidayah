
export interface Orders {
    id: string;
    costumerID:string;
    DishID:string;
    ingrediantID: string [];
    OrderType:string;
    OrderDate:Date;
    Status:string;
    TotalPrice:number;
    DeliveryAddress: string;
  }
  