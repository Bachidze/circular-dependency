import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class IsAdmin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const role = request.role

        if(role !== "admin") throw new BadRequestException("permision denied")

        return true
    }
}