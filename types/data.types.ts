import { Asset } from 'expo-media-library';

export interface TODO {
    id: string;
    title: string;
    description: string;
    created: number;
    expires: number;
    autoDel: boolean;
    images: TODO_Image[]
}

export type TODO_Image = Pick<Asset, 'id' | 'filename' | 'height' | 'width' | 'uri'>;

export type TODOData = TODO[];
/**
 *? 0 = expired                                                             
 *? 1 = Soon to expire                                                          
 *? 2 = valid                                               
 */
export type TODOExpiryStatusCode = 0 | 1 | 2;