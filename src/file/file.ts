import { normalizePath, Notice, TFile, TFolder, Vault, Workspace } from "obsidian";
import { join } from "path";
import { Template } from "src/settings/settings";

const customFormat =
  `/---company---/
| key       | value |
| --------- | ----- |
| Name      |       |
| Last Name |       |
| Phone     |       |
| Telegram  |       |
| Linkedin  |       |
| Founding  |       |
| Last chat |       |
| Friends   |       |
/---company---/`

const frontmatterFormat =
  `---
name:
  first:
  last:
phone:
telegram:
linkedin:
founding:
last_chat:
friends:
type: company
---`

export async function openFile(file: TFile, workspace: Workspace) {
  const leaf = workspace.getLeaf()
  await leaf.openFile(file, { active: true });
}

export function findCompanyFiles(companiesFolder: TFolder) {
  const companyFiles: TFile[] = [];
  Vault.recurseChildren(companiesFolder, async (companyNote) => {
    if (companyNote instanceof TFile) {
      companyFiles.push(companyNote);
    }
  });
  return companyFiles;
}

export function createCompanyFile(folderPath: string, template: Template, vault: Vault, workspace: Workspace) {
  const folder = vault.getAbstractFileByPath(folderPath)
  if (!folder) {
    new Notice(`Can not find path: '${folderPath}'. Please update "Company Card" plugin settings`);
    return;
  }

  vault.create(normalizePath(join(folderPath, `Company ${findNextFileNumber(folderPath, vault)}.md`)), getNewFileContent(template))
    .then(createdFile => openFile(createdFile, workspace));
}

function findNextFileNumber(folderPath: string, vault: Vault) {
  const folder = vault.getAbstractFileByPath(
    normalizePath(folderPath)
  ) as TFolder;

  let nextNumber = 0;
  Vault.recurseChildren(folder, (companyNote) => {
    if (!(companyNote instanceof TFile)) {
      return;
    }
    const name = companyNote.basename;
    const regex = /Company(?<number>\s\d+)*/g;
    for (const match of name.matchAll(regex)) {
      if (!match.groups || !match.groups.number) {
        if (nextNumber === 0) {
          nextNumber = 1;
        }
        continue;
      }
      const currentNumberString = match.groups.number.trim();
      if (currentNumberString != undefined && currentNumberString !== "") {
        const currentNumber = parseInt(currentNumberString);
        nextNumber = Math.max(nextNumber, (currentNumber + 1));
      }
    }
  });
  return nextNumber === 0 ? "" : nextNumber.toString();
}

function getNewFileContent(template: Template): string {
  switch (template) {
    case Template.CUSTOM:
      return customFormat;
    case Template.FRONTMATTER:
      return frontmatterFormat;
    default:
      return customFormat;
  }
}