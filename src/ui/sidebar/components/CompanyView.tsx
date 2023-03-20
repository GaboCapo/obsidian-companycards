import * as React from "react";
import { useApp } from "src/context/hooks";
import { openFile } from "src/file/file";
import { Company } from "src/parse/company";
import { daysUntilFounding, diffDateToday } from "src/util/dates";

type CompanyProps = {
	company: Company;
};

export const CompanyView = (props: CompanyProps) => {
	const { workspace } = useApp();
	const company = props.company;
	return (
		<div
			className="company-card"
			onClick={() => openFile(company.file, workspace)}
		>
			<div className="content">
				<div className="name">
					{company.name} {company.lastName}
				</div>
				<div className="phone">
					 {company.phone}
				</div>
				<br></br>
				{company.lastContact && (
					<div className="lastContact">
						Last contact: {diffDateToday(company.lastContact)} days ago
					</div>
				)}
				{company.founding && (
					<div className="lastContact">
						Founding: in {daysUntilFounding(company.founding)} days
					</div>
				)}
			</div>
		</div>
	);
};
