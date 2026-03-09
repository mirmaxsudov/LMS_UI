type UserRole =
  | 'ADMIN'
  | 'GUARDIAN'
  | 'MAINTAINER'
  | 'PARENT'
  | 'STUDENT'
  | 'SUPER_ADMIN'
  | 'SUPPORT_TEACHER'
  | 'TEACHER';
type Gender = 'FEMALE' | 'MALE';
type UserStatus = 'ACTIVE' | 'INACTIVE';

interface PostLoginDto {
  password: string;
  username: string;
}

interface TokenResponse {
  accessToken: string;
}

interface User {
  birthDate: string;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  status: UserStatus;
}
