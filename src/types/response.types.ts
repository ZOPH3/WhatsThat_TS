export type SimpleResponse = {
    response: string;
}

export type ExpandedResponse = {
    status: Response["status"];
    body?: Response["body"],
}

export type ApiResponse<T> =  keyof T;
