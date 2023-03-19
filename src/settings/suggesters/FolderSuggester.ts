// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes
// Credits go to anpigon's Obsidian Book Search Plugin: https://github.com/anpigon/obsidian-book-search-plugin
// Credits go to RafaelGB's Database folder plugin Plugin: https://github.com/RafaelGB/obsidian-db-folder

import { TAbstractFile, TFolder } from 'obsidian';
import { TextInputSuggest } from './suggest';

export class FolderSuggest extends TextInputSuggest<TFolder> {
  getSuggestions(inputStr: string): TFolder[] {
    const abstractFiles = this.app.vault.getAllLoadedFiles();
    const folders: TFolder[] = [];
    const lowerCaseInputStr = inputStr.toLowerCase();

    abstractFiles.forEach((folder: TAbstractFile) => {
      if (folder instanceof TFolder && folder.path.toLowerCase().contains(lowerCaseInputStr)) {
        folders.push(folder);
      }
    });

    return folders;
  }

  renderSuggestion(file: TFolder, el: HTMLElement): void {
    el.setText(file.path);
  }

  selectSuggestion(file: TFolder): void {
    this.inputEl.value = file.path;
    this.inputEl.trigger('input');
    this.close();
  }
}
