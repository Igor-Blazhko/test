import type { InputHTMLAttributes } from "react";

  
export interface Param {
  id: number | string;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  value?: string | boolean;
}
export interface ParamValue {
  paramId: number | string;
  name: Param['name'];
  value: string | boolean;
  type: Param['type'];
}
export interface Color {
  id: string;
  value: string | boolean;
}
export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}


export  interface InternalParam extends Param { value: string | boolean };
