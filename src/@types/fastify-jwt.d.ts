// fastify-jwt.d.ts
import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    organization: {
      sub: string;
    }; // user type is return type of `request.user` object
  }
}
