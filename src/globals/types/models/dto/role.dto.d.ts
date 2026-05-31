interface RoleDto {
  description?: string;
  name: string;
  permissionIds?: string[];
}

type PostRoleDto = RoleDto;
type PutRoleDto = RoleDto;
