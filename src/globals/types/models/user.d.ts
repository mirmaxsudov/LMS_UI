interface UserPreview {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  roles: stirng[];
  status: UserStatus;
}

// Apis

type UserPreviewsResponse = Pagination<UserPreview>;
