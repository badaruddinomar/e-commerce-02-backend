export interface RegisterUserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  dob: Date;
}
export interface NewProductType {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}
