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
	const handleCardClick = () => {
		openFile(company.file, workspace);
	};
	const handleCompanyNameClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		openFile(company.file, workspace);
	};
	const handleNameClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		openFile(company.file, workspace);
	};
	const handleWebsiteClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		event.stopPropagation();
		window.open(event.currentTarget.href, "_blank");
	};
	return (
		<div className="company-card" onClick={handleCardClick}>
			<div className="content">
				<div className="companyname" onClick={handleCompanyNameClick}>
					 {company.companyname}
				</div>
				<div className="department">
					 {company.department}
				</div>
				<div className="title">
					 {company.title}
				</div>
				<div className="name" onClick={handleNameClick}>
					{company.name} {company.lastName}
				</div>
				<div className="phone">
					 {company.phone}
				</div>
				{company.website && (
					<div className="website">
						<a href={company.website} target="_blank" rel="noopener noreferrer" className="external-link" onClick={handleWebsiteClick}>{company.website}</a>
					</div>
				)}
				<div className="emailmain">
					{company.emailmain}
				</div>
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