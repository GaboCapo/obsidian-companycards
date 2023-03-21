import { MetadataCache, TFile } from "obsidian";
import { Company } from "./company";
import { parseDate } from "./parse_utils";

export function isCompanyFile(
  file: TFile, metadataCache: MetadataCache
): boolean {
  const type = metadataCache.getFileCache(file)?.frontmatter?.type;
  return type == 'company';
}

export async function parseCompanyData(file: TFile, metadataCache: MetadataCache): Promise<Company | null> {
  const frontmatter = metadataCache.getFileCache(file)?.frontmatter;
  if (frontmatter == null) {
    return null;
  }

  return {
    name: frontmatter['name']['first'],
    lastName: frontmatter['name']['last'],
    phone: frontmatter['phone'],
    companyname: frontmatter['companyname'],
    department: frontmatter['department'],
    website: frontmatter['website'],
    emailmain: frontmatter['emailmain'],
    title: frontmatter['title'],
    lastContact: parseDate(frontmatter['last_chat']),
    founding: parseDate(frontmatter['founding']),
    file: file,
  }
}