import type { Model, Param } from '../types';

export const default_model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
      name: 'Тип',
      type: 'text',
    },
    {
      paramId: 2,
      value: 'макси',
      name: 'Значение',
      type: 'text',
    },
  ],
  colors: [],
};

export const default_params: Param[] = [{
    id: 3,
    value: '123',
    name: 'Рандом',
    type: 'text',
}];
