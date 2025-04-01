export interface Division {
    id: number;
    name: string;
    level: number;
    collaboratorsCount: number;
    ambassadorName?: string;
    parentDivisionId?: number;
    parentDivision?: Division;
    subDivisions?: Division[];
}