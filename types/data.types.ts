


export interface TODO {
    id: string | number;
    title: string;
    description: string;
    created: number;
    expires: number;
    images: TODO_Image[]
}

export type TODO_Image = string;