import {CustomContext} from "../../react-app/globals";
import {SmartOperation, SMART_OPERATION_CONFIGS} from "./smartOperations";

type Params = {
    context: CustomContext;
}

export const getSmartOperations = async ({context}: Params) => {
    // V budoucnu zde můžeme přidat logiku pro personalizaci operací na základě rodiny
    const operations = Object.values(SmartOperation).map(operation => ({
        id: operation,
        title: SMART_OPERATION_CONFIGS[operation].title,
        description: SMART_OPERATION_CONFIGS[operation].description
    }));

    return {
        operations
    };
};
