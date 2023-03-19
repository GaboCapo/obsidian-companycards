import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppContext } from "src/context/context";
import CompaniesPlugin from "src/main";
import { COMPANIES_VIEW_CONFIG } from "src/util/constants";
import { SidebarRootView } from "./components/SidebarRootView";

export class CompaniesView extends ItemView {
	root = createRoot(this.containerEl.children[1]);
	plugin: CompaniesPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: CompaniesPlugin) {
		super(leaf);
		this.plugin = plugin;
	}
	getViewType(): string {
		return COMPANIES_VIEW_CONFIG.type;
	}

	getDisplayText(): string {
		return COMPANIES_VIEW_CONFIG.name;
	}

	getIcon(): string {
		return COMPANIES_VIEW_CONFIG.icon;
	}

	async onOpen() {
		this.root.render(
			<AppContext.Provider value={this.app}>
				<SidebarRootView plugin={this.plugin} />
			</AppContext.Provider>
		);
	}

	async onClose() {
		this.root.unmount();
	}
}
