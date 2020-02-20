export interface dropdownItem {
  label: string;
  value: string | number;
  disabled?: Boolean;
}

export interface dropdownType {
  options: dropdownItem[];
  placeholder?: string;
  customStyles?: any;
  defaultValue?: dropdownItem;
  value?: dropdownItem | null;
  menuPlacement?: "top" | "bottom" | "auto";
  onChange: (selectedOption: dropdownItem) => void;
  menuPortalTarget?: HTMLElement;
  className?: string;
  isDisabled?: boolean;
}
