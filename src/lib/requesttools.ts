import type { AxiosResponse } from 'axios';
import superjson from 'superjson';

export const objectToString = (obj: any) => {
    return superjson.stringify(obj);
}

export const responseToObject = <T>(reponse: AxiosResponse<any, any>): T => {
    return superjson.deserialize(reponse.data);
}

export const requestToObject = async <T>(request: Request): Promise<T> => {
    const json = await request.json();
    return superjson.deserialize(json);
}