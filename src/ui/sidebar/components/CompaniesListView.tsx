import { randomUUID } from "crypto";
import * as React from "react";
import { Company } from "src/parse/company";
import { Sort } from "src/util/constants";
import { compareDatesOrNull as compareDatesOrUndefined } from "src/util/dates";
import { CompanyView } from "./CompanyView";

type CompaniesListProps = {
	companies: Company[];
	sort: Sort;
};

export const CompaniesListView = (props: CompaniesListProps) => {
	const [processedCompanies, setProcessedCompanies] = React.useState<Company[]>(
		[]
	);

	const companies = props.companies;
	const sort = props.sort;

	React.useEffect(() => {
		const sortedCompanies = [...companies].sort((a, b) => {
			switch (sort) {
				case Sort.NAME:
					return a.companyname.localeCompare(b.companyname);
				case Sort.LAST_CONTACT:
					return compareDatesOrUndefined(a.lastContact, b.lastContact);
				case Sort.FOUNDING:
					return compareDatesOrUndefined(a.founding, b.founding);
				default:
					return 0;
			}
		});
		
		setProcessedCompanies(sortedCompanies);
	}, [companies, sort]);

	return (
		<>
			{processedCompanies.map((company) => {
				return <CompanyView company={company} key={randomUUID()} />;
			})}
		</>
	);
};
