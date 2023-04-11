import { BlogModule } from "@iq-blog/blog";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [BlogModule, PassportModule],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService, LocalStrategy]
})
export class AuthModule {

}