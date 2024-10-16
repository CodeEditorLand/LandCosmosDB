/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { type IActionContext } from "@microsoft/vscode-azext-utils";
import { commands } from "vscode";

import { DocDBDocumentsTreeItem } from "../tree/DocDBDocumentsTreeItem";
import { type DocDBDocumentTreeItem } from "../tree/DocDBDocumentTreeItem";
import { pickDocDBAccount } from "./pickDocDBAccount";

export async function createDocDBDocument(
	context: IActionContext,
	node?: DocDBDocumentsTreeItem,
): Promise<void> {
	if (!node) {
		node = await pickDocDBAccount<DocDBDocumentsTreeItem>(
			context,
			DocDBDocumentsTreeItem.contextValue,
		);
	}
	const documentNode = <DocDBDocumentTreeItem>await node.createChild(context);
	await commands.executeCommand("cosmosDB.openDocument", documentNode);
}
