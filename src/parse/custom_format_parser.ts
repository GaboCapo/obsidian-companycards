import { TFile, Vault } from "obsidian";
import { Company } from "./company";
import { parseDate } from "./parse_utils";

export async function isCompanyFile(
  file: TFile, vault: Vault
): Promise<boolean> {
  const content = await vault.cachedRead(file);
  return (content.match(/\/---company---\//g) || []).length === 2;
}

export async function parseCompanyData(file: TFile, vault: Vault): Promise<Company | null> {
  const fileContents = await vault.cachedRead(file);
  const regexpNames = /^\|(?<key>.+)\|(?<value>.+)\|(\s)*$/gm;
  const companiesDict: { [key: string]: string } = {};
  for (const match of fileContents.matchAll(regexpNames)) {
    if (!match.groups) {
      continue;
    }
    const key = match.groups.key.trim()
    const value = match.groups.value.trim()
    if (key === "" || value === "") {
      continue;
    }
    companiesDict[key] = value;
  }

  return {
    name: companiesDict['Name'],
    lastName: companiesDict['Last Name'],
    phone: companiesDict['Phone'],
    companyname: companiesDict['Company Name'],
    department: companiesDict['Department'],
    website: companiesDict['Website'],
    emailmain: companiesDict['EMailMain'],
    title: companiesDict['title'],
    lastContact: parseDate(companiesDict['Last chat']),
    founding: parseDate(companiesDict['Founding']),
    file: file,
  }
}