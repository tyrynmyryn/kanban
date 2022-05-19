import { ICard, Row } from "../types/card"

export const filterBoardByRow = (items: ICard[] | null, row: Row) => {
    return items?.filter(item => item.row === row)
}
