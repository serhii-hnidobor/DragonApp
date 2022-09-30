const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),
  MailService: Symbol.for('MailService'),
  MailTransporter: Symbol.for('MailTransporter'),
  MailRepository: Symbol.for('MailRepository'),
  PrismaClient: Symbol.for('PrismaClient'),
};

export { CONTAINER_TYPES };
