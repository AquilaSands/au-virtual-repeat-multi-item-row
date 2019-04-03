import { bindable } from 'aurelia-framework';
import { IUser } from 'types';

export class Card {
  @bindable user: IUser;
}
