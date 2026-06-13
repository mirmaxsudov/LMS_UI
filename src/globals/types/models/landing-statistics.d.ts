interface LoginStatistics {
  activeCourses: number;
  averageCompletionRate: number;
  totalLearners: number;
}

type LoginStatisticResponse = ApiResponse<LoginStatistics>;
