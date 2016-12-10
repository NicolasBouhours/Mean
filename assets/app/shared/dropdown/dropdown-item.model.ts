export class DropdownItem {
    name: string;
    separator: boolean;
    onClick: Function;

    constructor(name: string, seperator: boolean, onClick?: Function) {
        this.name = name;
        this.separator = seperator;
        this.onClick = onClick;
    }
}