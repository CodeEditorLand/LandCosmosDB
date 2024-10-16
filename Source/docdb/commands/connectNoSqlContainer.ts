/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { type IActionContext } from "@microsoft/vscode-azext-utils";

import { ext } from "../../extensionVariables";
import { KeyValueStore } from "../../KeyValueStore";
import { getCosmosKeyCredential } from "../getCosmosClient";
import {
	noSqlQueryConnectionKey,
	type NoSqlQueryConnection,
} from "../NoSqlCodeLensProvider";
import { DocDBCollectionTreeItem } from "../tree/DocDBCollectionTreeItem";
import { pickDocDBAccount } from "./pickDocDBAccount";

export function setConnectedNoSqlContainer(
	node: DocDBCollectionTreeItem,
): void {
	const root = node.root;
	const keyCred = getCosmosKeyCredential(root.credentials);
	const noSqlQueryConnection: NoSqlQueryConnection = {
		databaseId: node.parent.id,
		containerId: node.id,
		endpoint: root.endpoint,
		masterKey: keyCred?.key,
		isEmulator: !!root.isEmulator,
	};
	KeyValueStore.instance.set(noSqlQueryConnectionKey, noSqlQueryConnection);
	ext.noSqlCodeLensProvider.updateCodeLens();
}

export async function connectNoSqlContainer(
	context: IActionContext,
): Promise<void> {
	const node = await pickDocDBAccount<DocDBCollectionTreeItem>(
		context,
		DocDBCollectionTreeItem.contextValue,
	);
	setConnectedNoSqlContainer(node);
}
