interface PermissionDto {
  action?: string;
  category: PermissionCategory;
  code: string;
  description?: string;
  isSystem?: boolean;
  module?: string;
}

type PostPermissionDto = PermissionDto;
type PutPermissionDto = PermissionDto;
