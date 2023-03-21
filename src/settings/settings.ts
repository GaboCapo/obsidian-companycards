import { App, PluginSettingTab, Setting } from "obsidian";


import CompaniesPlugin from "src/main";
import { FolderSuggest } from './suggesters/FolderSuggester';


export enum Template {
  CUSTOM = "custom", FRONTMATTER = "frontmatter"
}

export enum DefaultFrontmatterKeyType {
  snakeCase = 'Snake Case',
  camelCase = 'Camel Case',
}

export interface CompaniesPluginSettings {
  companiesFolder: string; // new file location
  fileNameFormat: string; // new file name format
  frontmatter: string; // frontmatter that is inserted into the file
  content: string; // what is automatically written to the file.
  useDefaultFrontmatter: boolean;
  defaultFrontmatterKeyType: DefaultFrontmatterKeyType;
  naverClientId: string;
  naverClientSecret: string;
  localePreference: string;
  template: Template;
}

export const DEFAULT_SETTINGS: CompaniesPluginSettings = {
  companiesFolder: '',
  fileNameFormat: '',
  frontmatter: '',
  content: '',
  useDefaultFrontmatter: true,
  defaultFrontmatterKeyType: DefaultFrontmatterKeyType.camelCase,
  naverClientId: '',
  naverClientSecret: '',
  localePreference: 'default',
  template: Template.CUSTOM
};


export class CompaniesSettingTab extends PluginSettingTab {
  plugin: CompaniesPlugin;
  constructor(app: App, plugin: CompaniesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  get settings() {
    return this.plugin.settings;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for "Companycards" plugin.' });

    // New file location
    new Setting(containerEl)
      .setName('Companies folder location')
      .setDesc('Files in this folder and all subfolders will be available as companies')
      .addSearch(cb => {
        try {
          new FolderSuggest(this.app, cb.inputEl);
        } catch {
          // eslint-disable
        }
        cb.setPlaceholder('Example: folder1/folder2')
          .setValue(this.plugin.settings.companiesFolder)
          .onChange(new_folder => {
            this.plugin.settings.companiesFolder = new_folder;
            this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName('Company file template')
      .setDesc('Template to be used when creating a new contact file')
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