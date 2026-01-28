import type { Model, Param } from "../types";

export const transformModelToParams = (model: Model): Param[] => {
    return model.paramValues.map((modelParam) => ({
        id: modelParam.paramId,
        type: modelParam.type,
        name: modelParam.name,
        value: modelParam.value,
    }))
}