import { Plugin } from 'obsidian';
import { CompaniesView } from "src/ui/sidebar/sidebarView";
import { COMPANIES_VIEW_CONFIG } from "src/util/constants";
import { CompaniesPluginSettings, CompaniesSettingTab, DEFAULT_SETTINGS } from './settings/settings';

export default class CompaniesPlugin extends Plugin {
	settings: CompaniesPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerView(
			COMPANIES_VIEW_CONFIG.type,
			(leaf) => new CompaniesView(leaf, this)
		);

		this.addRibbonIcon('company', 'Companies', () => {
			this.activateSidebarView();
		});

		this.addSettingTab(new CompaniesSettingTab(this.app, this));
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(COMPANIES_VIEW_CONFIG.type);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateSidebarView() {
		this.app.workspace.detachLeavesOfType(COMPANIES_VIEW_CONFIG.type);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: COMPANIES_VIEW_CONFIG.type,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(COMPANIES_VIEW_CONFIG.type)[0]
		);
	}
}
