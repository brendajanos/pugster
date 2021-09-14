export interface ILocation {
  lon: number;
  lat: number;
}

export interface IPug {
  name: string;
  age: number;
  sex: "female" | "male";
  location: ILocation;
}
