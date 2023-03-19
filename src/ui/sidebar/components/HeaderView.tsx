import { setIcon } from "obsidian";
import * as React from "react";
import { Sort } from "src/util/constants";

type HeaderProps = {
	onSortChange: React.Dispatch<React.SetStateAction<Sort>>;
	sort: Sort;
	onCreateCompany: () => void;
};

export const HeaderView = (props: HeaderProps) => {
	const buttons = React.useRef<(HTMLElement | null)[]>([]);

	React.useEffect(() => {
		buttons.current.forEach(setIconForButton);
	}, [buttons]);

	return (
		<div>
			<div className="nav-header">
				<div className="nav-buttons-container">
					<div
						id="create-btn"
						className="clickable-icon nav-action-button"
						aria-label="Create New Company"
						onClick={props.onCreateCompany}
					>
						Create
					</div>
					<div className="vl"></div>
					<div
						id="sort-by-name-btn"
						data-icon="baseline"
						className={
							"clickable-icon nav-action-button " +
							(props.sort === Sort.NAME && "is-active")
						}
						aria-label="Sort By Name"
						ref={(element) => (buttons.current[1] = element)}
						onClick={() => props.onSortChange(Sort.NAME)}
					/>
					<div
						id="sort-by-last-contact-btn"
						data-icon="calendar-clock"
						className={
							"clickable-icon nav-action-button " +
							(props.sort === Sort.LAST_CONTACT && "is-active")
						}
						aria-label="Sort By Last Contact"
						ref={(element) => (buttons.current[2] = element)}
						onClick={() => props.onSortChange(Sort.LAST_CONTACT)}
					/>
					<div
						id="sort-by-birthday-btn"
						data-icon="cake"
						className={
							"clickable-icon nav-action-button " +
							(props.sort === Sort.FOUNDING && "is-active")
						}
						aria-label="Sort By Founding"
						ref={(element) => (buttons.current[3] = element)}
						onClick={() => props.onSortChange(Sort.FOUNDING)}
					/>
				</div>
			</div>
		</div>
	);
};

function setIconForButton(button: HTMLElement | null) {
	if (button != null) {
		const icon = button.getAttr("data-icon");
		if (icon != null) {
			setIcon(button, icon, 16);
		}
	}
}
