interface UserPreview {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  profileBackgroundUrl: string | null;
  profileImageUrl: string | null;
  roles: string[];
  status: UserStatus;
}

// Apis

type UserPreviewsResponse = Pagination<UserPreview>;

interface User {
  birthDate: Nullable<string>;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName: string;
  phoneNumber: Nullable<string>;
  profileBackgroundAttachmentId: Nullable<string>;
  profileBackgroundUrl: Nullable<string>;
  profileImageAttachmentId: Nullable<string>;
  profileImageUrl: Nullable<string>;
  roles: Role[];
  status: UserStatus;
}
