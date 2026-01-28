import { default_model } from "../contants";
import { transformModelToParams } from "../model";
import type { Model } from "../types";

export const getServerModel = async () => {
    const model = await  Promise.resolve(default_model)

    return transformModelToParams(model);
};

export const syncClientToServer = async (model: Model) => {
    console.log(model);
    return await Promise.resolve();
}