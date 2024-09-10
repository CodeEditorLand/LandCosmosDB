/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtTreeItem, IActionContext } from "@microsoft/vscode-azext-utils";
import { sqlFilter } from "../../constants";
import { ext } from "../../extensionVariables";

export async function pickDocDBAccount<T extends AzExtTreeItem>(
    context: IActionContext,
    expectedContextValue?: string | RegExp | (string | RegExp)[]
): Promise<T> {
    return await ext.rgApi.pickAppResource<T>(context, {
        filter: [
            sqlFilter
        ],
        expectedChildContextValue: expectedContextValue
    });
}
