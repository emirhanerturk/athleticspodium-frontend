export class BaseModel {

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  toJSON(): object {
    return Object.assign({}, this);
  }

}
