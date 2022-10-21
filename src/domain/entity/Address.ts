export default class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
  }

  get street() {
    return this._street;
  }

  get number() { 
    return this._number;
  }
  
  get zip() { 
    return this._zip;
  }

  get city() { 
    return this._city;
  }

  validate() {
    if (this._street) {
      throw new Error('Street is required');
    }

    if (this._number) {
      throw new Error('Number is required');
    }

    if (this._zip) {
      throw new Error('Zip is required');
    }

    if (this._city) {
      throw new Error('City is required');
    }
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
  }
}