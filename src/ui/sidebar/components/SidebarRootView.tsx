import { normalizePath, TFile, TFolder } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { createCompanyFile, findCompanyFiles } from "src/file/file";
import CompaniesPlugin from "src/main";
import { Company } from "src/parse/company";
import { parseCompanyFiles } from "src/parse/parse";
import { Sort } from "src/util/constants";
import { CompaniesListView } from "./CompaniesListView";
import { HeaderView } from "./HeaderView";

type RootProps = {
	plugin: CompaniesPlugin;
};

export const SidebarRootView = (props: RootProps) => {
	const { vault, metadataCache, workspace } = useApp();
	const [companies, setCompanies] = React.useState<Company[]>([]);
	const [sort, setSort] = React.useState<Sort>(Sort.LAST_CONTACT);
	const folder = props.plugin.settings.companiesFolder;
	
	React.useEffect(() => {
		const companiesFolder = vault.getAbstractFileByPath(
			normalizePath(folder)
		) as TFolder;

		if (!companiesFolder) {
			setCompanies([]);
		}

		const companyFiles: TFile[] = findCompanyFiles(companiesFolder);

		parseCompanyFiles(companyFiles, vault, metadataCache).then((companiesData) =>
			setCompanies(companiesData)
		);
	}, []);

	return (
		<div>
			<HeaderView
				onSortChange={setSort}
				onCreateCompany={() =>
					createCompanyFile(
						folder,
						props.plugin.settings.template,
						vault,
						workspace
					)
				}
				sort={sort}
			/>
			<CompaniesListView companies={companies} sort={sort} />
		</div>
	);
};
