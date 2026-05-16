interface Parent {
  baseData: User;
  studentsCount: number;
}

// apis

type ParentsResponse = Pagination<Parent>;
type ParentResponse = ApiResponse<Parent>;
