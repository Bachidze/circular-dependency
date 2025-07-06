import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private JWTService:JwtService){}
  async  canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()
        const token =  this.GetToken(request.headers)
         try {
            const payLoad = await this.JWTService.verify(token)
             request.userId = payLoad.userId
             request.role=payLoad.role
        } catch (error) {
            throw new UnauthorizedException()
        }
        if(!token) throw new UnauthorizedException()
        return true
    }

     GetToken(headers) {
        if(!headers["authorization"]) return null
        const [type,token] = headers["authorization"].split(" ")
        return type === "Bearer" ? token : null
    }
}