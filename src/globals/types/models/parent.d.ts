interface Parent {
  baseData: User;
  studentsCount: number;
}

// apis

type ParentsResponse = Pagination<Parent>;
