
import {
    UseInterceptors,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new(...args: any[]): {};
}


export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) { }


    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        // run something before a request is handled by the request handler
        console.log("Im running before the handler", context);
        return next.handle().pipe(
            map((data: any) => {
                // run something before the response is sent out
                console.log("Im running before the response is sent out", data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true, // this will remove all properties that are not decorated with @Expose
                });
            }),
        );
    }
}