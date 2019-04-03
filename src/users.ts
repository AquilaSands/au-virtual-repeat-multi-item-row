import { observable } from 'aurelia-framework';

import { IUser } from 'types';

export class Users {
  public heading: string = 'Github Users';
  public users: IUser[][] = []; // A 2d array of 'rows' and card data bound to the virtual-repeat
  public users1D: IUser[] = [];
  @observable public cardsPerRow = 4;

  constructor() {
    // Create some dummy data
    for (let index = 0; index < 10000; index++) {
      this.users1D.push({
        avatar_url: 'images/pulp-sam.jpg',
        login: `${index + 1}`,
        html_url: 'https://www.google.co.uk'
      });      
    }
  }

  activate() {
    // Transform the original data to a 2d array
    this.reshapeArray();
  }

  cardsPerRowChanged() {
    // Watch for changes to the number of items per row and update the 2d array to refresh the UI
    if(this.users1D.length > 0) {
      this.reshapeArray();
    }
  }

  // reducer must be an arrow function to preserve the 'this'
  reducer = (acc, val) => {
    //  Convert a 1d array to a 2d array   
    if (acc[acc.length-1].length < this.cardsPerRow) {
      acc[acc.length-1].push(val);
    } else {
      acc.push([val]);
    }
  
    return acc;
  }

  reshapeArray() {
    // Reduce the original data to a 2d array
    // Use a temp array so we don't trigger the binding updates with every mutation of this.users
    const temp: IUser[][] = [[]];

    this.users1D.reduce(this.reducer, temp)    

    this.users = temp;
  }

  getMore(topIndex, isAtBottom, isAtTop) {
    // Add more items to the virtual-repeat capped at 11000
    if(this.users1D.length < 11000) {
      const more: IUser[] = [];
      const start = this.users1D.length;
      const end = start + 100;

      for (let index = start; index < end; index++) {
        more.push({
          avatar_url: 'images/pulp-sam.jpg',
          login: `${index + 1}`,
          html_url: 'https://www.google.co.uk'
        });      
      }

      // Update the original array with the new data
      this.users1D.push(...more);

      // Add the new data to the 2d array bound to the virtual-repeat
      more.reduce(this.reducer, this.users);
    }
  }
}
