import { App, PluginSettingTab, Setting } from "obsidian";
import CompaniesPlugin from "src/main";

export interface CompaniesPluginSettings {
  companiesFolder: string;
  template: Template;
}

export enum Template {
  CUSTOM = "custom", FRONTMATTER = "frontmatter"
}

export const DEFAULT_SETTINGS: CompaniesPluginSettings = {
  companiesFolder: '/',
  template: Template.CUSTOM
}

export class CompaniesSettingTab extends PluginSettingTab {
  plugin: CompaniesPlugin;

  constructor(app: App, plugin: CompaniesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for "Companies" plugin.' });

    new Setting(containerEl)
      .setName('Companies folder location')
      .setDesc('Files in this folder and all subfolders will be available as companies')
      .addText(text => text
        .setPlaceholder('Personal/Companies')
        .setValue(this.plugin.settings.companiesFolder)
        .onChange(async (value) => {
          this.plugin.settings.companiesFolder = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Company file template')
      .setDesc('Template to be used when creating a new company file')
      .addDropdown(dropdown => dropdown
        .addOption(Template.CUSTOM, "Custom")
        .addOption(Template.FRONTMATTER, "Frontmatter (YAML Metadata)")
        .setValue(this.plugin.settings.template)
        .onChange(async (value) => {
          this.plugin.settings.template = value as Template;
          await this.plugin.saveSettings();
        }));
  }
}