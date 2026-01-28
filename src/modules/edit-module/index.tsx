import React, { useRef, useState } from 'react';
import type { InternalParam, Model, Param } from './types';
import { default_params } from './contants';

export interface Props {
  params: Param[];
}

export interface State {
  params: InternalParam[];
}

class ParamEditor extends React.Component<Props, State> {
  public getModel(): Model {
    return {
      paramValues: this.state.params.map((_p) => ({
        paramId: _p.id,
        value: _p.value,
      })),
      colors: [],
    };
  }

  constructor(p: Props) {
    super(p);

    const params = p.params.map((e) => ({ ...e, value: '' }));
    this.state = {
      params,
    };
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    const paramsMap = new Map<string, InternalParam>();
    prevState.params.forEach((p) => paramsMap.set(String(p.id), p));
    
    if (prevState.params !== nextProps.params) {
      return {
        params: nextProps.params.map((p) => {
          const oldState = paramsMap.get(String(p.id));
          return oldState ? oldState : { ...p, value: '' };
        }),
      };
    }

    return null;
  }

  private _handleChange = (id: string, value: string | boolean) => {
    this.setState((prevState) => ({
      params: prevState.params.map((p) =>
        String(p.id) === String(id) ? { ...p, value } : p
      ),
    }));
  };

  render() {
    const list = this.state.params;

    return (
      <ul>
        {list.map((param) => {
          return (
            <li key={param.id}>
              <label>{param.name}</label>
              <span>-</span>
              <input
                value={typeof param.value === 'string' ? param.value : void 0}
                checked={
                  typeof param.value === 'boolean' ? param.value : void 0
                }
                type={param.type}
                onChange={(e) => {
                  const value =
                    param.type === 'checkbox'
                      ? e.target.checked
                      : e.target.value;

                  this._handleChange(String(param.id), value);
                }}
              />
            </li>
          );
        })}
        <button onClick={() => console.log(this.getModel())}>get Model</button>
      </ul>
    );
  }
}

export const Module = () => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const [params, setParams] = useState(default_params);
    const [input, setInput] = useState('')

  const handleCreateNewParam = () => {
    setParams((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: input || crypto.randomUUID(),
        type: selectRef.current?.value,
      },
    ]);

    setInput('')
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Имя параметра"
        />
        <select ref={selectRef}>
          <option value={void 0}>Строка</option>
          <option value={'checkbox'}>Чекбокс</option>
        </select>
        <button onClick={handleCreateNewParam}>Добавить параметр</button>
      </div>
      <ParamEditor params={params} />
    </div>
  );
};
