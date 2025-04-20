export class UserEntity {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public email: string,
    public password: string, 
    public token: string | null,
    public refreshToken: string | null,
    public isAdmin: boolean,
  ) {
    // if (id === undefined || name === undefined) {
    //     throw new Error('Invalid parameters: id and name are required.');
    // }
  }

  // metodos de clase
}
