import Address from '../value-object/Address';

export default class Customer { 
  private _id!: string;
  private _name!: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  set id(id: string) {
    if (!id) throw new Error('Id is required');
    this._id = id;
  }

  set name(name: string) {
    if (!name) throw new Error('Name is required');
    this._name = name;
  }

  set address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    if (points < 0) throw new Error('Negative numbers are not allowed')

    this._rewardPoints += points;
  }

  activate() {
    if (!this.address) throw new Error('Required address to activate client');
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}