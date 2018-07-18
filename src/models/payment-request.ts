import { Model, property, model } from "@loopback/repository";

@model()
export class PaymentRequest extends Model {

  @property() stripeToken: string;
  @property() menuId: number;

}
