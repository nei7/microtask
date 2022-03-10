import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
   constructor() {
      super();
   }

   getRequest(contex: ExecutionContext) {
      const ctx = GqlExecutionContext.create(contex);
      const request = ctx.getContext();

      request.body = ctx.getArgs().loginUserInput;

      return request;
   }
}
