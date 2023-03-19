import { MetadataCache, TFile, Vault } from "obsidian";
import { Company } from "./company";
import { isCompanyFile as isCompanyFormatFile, parseCompanyData as parseCompanyFormatData } from "./custom_format_parser";
import { isCompanyFile as isFrontmatterFormatFile, parseCompanyData as parseFrontmatterFormatData } from "./front_matter_format_parser";

export async function parseCompanyFiles(files: TFile[], vault: Vault, metadataCache: MetadataCache) {
  const companiesData: Company[] = [];
  for (const file of files) {
    if (isFrontmatterFormatFile(file, metadataCache)) {
      const company = await parseFrontmatterFormatData(file, metadataCache);
      if (!company) {
        continue;
      }
      companiesData.push(company);
    } else if (await isCompanyFormatFile(file, vault)) {
      const company = await parseCompanyFormatData(file, vault);
      if (!company) {
        continue;
      }
      companiesData.push(company);
    }
  }
  return companiesData;
}