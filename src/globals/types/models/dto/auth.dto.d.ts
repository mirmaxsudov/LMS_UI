interface AuthMeDto {
  brithDate: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  profileBackgroundImage: File;
  profileImage: File;
}

type PatchAuthMeDto = Partial<AuthMeDto>;
