import { Asset } from 'expo-media-library';


export interface TODO {
    id: string | number;
    title: string;
    description: string;
    created: number;
    expires: number;
    images: TODO_Image[]
}

export type TODO_Image = Pick<Asset, 'id' | 'filename' | 'height' | 'width' | 'uri'>;

export type TODOData = TODO[];