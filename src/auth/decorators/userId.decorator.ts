import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number | null => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (user && user.userId) {
      return user.userId;
    }

    return null;
  },
);
