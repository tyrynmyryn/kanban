export enum Row {
    HOLD = "0",
    PROGRESS = "1",
    REVIEW = "2",
    APROVED = "3"
}

export enum Colors {
    ORANGE = 'orange',
    BLUE = 'blue',
    YELLOW = 'yellow',
    GREEN = 'green'
}

export interface ICard {
    id?: number;
    seq_num?: number;
    row: Row;
    text: string;
}

export interface IBoard {
    title: string,
    color: Colors,
    board: ICard[] | null,
    row: Row,
}