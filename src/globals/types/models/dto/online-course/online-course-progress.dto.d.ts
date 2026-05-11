interface OnlineCourseProgressDto {
  lastPositionInSeconds: number;
  status: OnlineCourseProgressStatus;
}

type PatchOnlineCourseProgressDto = Partial<OnlineCourseProgressDto>;
