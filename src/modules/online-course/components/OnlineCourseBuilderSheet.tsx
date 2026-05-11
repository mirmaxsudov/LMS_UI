import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FileTextIcon,
  FilmIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  VideoIcon
} from 'lucide-react';
import { useState } from 'react';

import {
  onlineCourseContentStatusLabelMap,
  onlineCourseStatusColorMap,
  onlineCourseStatusLabelMap
} from '@/modules/online-course/constants';
import { formatMinutes, getOnlineCourseLessonCount } from '@/modules/online-course/lib/format';
import {
  getOnlineCourseQueryOptions,
  ONLINE_COURSE_QUERY_KEYS
} from '@/modules/online-course/options';
import {
  deleteOnlineCourseLesson,
  deleteOnlineCourseMaterial,
  deleteOnlineCourseModule
} from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/shared/ui/sheet';
import { Skeleton } from '@/shared/ui/skeleton';

import { OnlineCourseBadge } from './OnlineCourseBadge';
import { OnlineCourseLessonFormDialog } from './OnlineCourseLessonFormDialog';
import { OnlineCourseMaterialFormDialog } from './OnlineCourseMaterialFormDialog';
import { OnlineCourseModuleFormDialog } from './OnlineCourseModuleFormDialog';

type OnlineCourseLesson = OnlineCourseModule['lessons'][number];

interface OnlineCourseBuilderSheetProps {
  courseId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseBuilderSheet = ({
  courseId,
  open,
  onOpenChange
}: OnlineCourseBuilderSheetProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [editingModule, setEditingModule] = useState<OnlineCourseModule | null>(null);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<OnlineCourseLesson | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<OnlineCourseMaterial | null>(null);
  const [lessonModuleId, setLessonModuleId] = useState('');
  const [editingLesson, setEditingLesson] = useState<OnlineCourseLesson | null>(null);
  const [deletingModule, setDeletingModule] = useState<OnlineCourseModule | null>(null);
  const [deletingLesson, setDeletingLesson] = useState<OnlineCourseLesson | null>(null);
  const [deletingMaterial, setDeletingMaterial] = useState<OnlineCourseMaterial | null>(null);

  const courseQuery = useQuery({
    ...getOnlineCourseQueryOptions(courseId ?? ''),
    enabled: open && Boolean(courseId)
  });

  const course = courseQuery.data?.data.data;

  const deleteModuleMutation = useMutation({
    mutationFn: deleteOnlineCourseModule,
    onSuccess: async () => {
      if (courseId) {
        await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
      }
      setDeletingModule(null);
    }
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: deleteOnlineCourseMaterial,
    onSuccess: async () => {
      if (courseId) {
        await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
      }
      setDeletingMaterial(null);
    }
  });

  const deleteLessonMutation = useMutation({
    mutationFn: deleteOnlineCourseLesson,
    onSuccess: async () => {
      if (courseId) {
        await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
      }
      setDeletingLesson(null);
    }
  });

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className='w-full overflow-y-auto p-0 sm:max-w-5xl'>
        <SheetHeader className='border-b px-6 py-5'>
          <SheetTitle className='text-xl'>{course?.title ?? t`Online course builder`}</SheetTitle>
          <SheetDescription>
            {course ? course.shortDescription : t`Manage online course content.`}
          </SheetDescription>
        </SheetHeader>

        {courseQuery.isLoading ? (
          <div className='grid gap-4 p-6'>
            <Skeleton className='h-32 rounded-lg' />
            <Skeleton className='h-48 rounded-lg' />
          </div>
        ) : course ? (
          <div className='grid gap-5 p-6'>
            <div className='bg-card grid gap-4 rounded-lg border p-4 md:grid-cols-[minmax(0,1fr),auto]'>
              <div>
                <div className='flex flex-wrap items-center gap-2'>
                  <OnlineCourseBadge color={onlineCourseStatusColorMap[course.status]}>
                    {t(onlineCourseStatusLabelMap[course.status])}
                  </OnlineCourseBadge>
                  <span className='text-muted-foreground text-sm'>{course.level}</span>
                </div>
                <p className='mt-3 text-sm leading-6'>{course.description}</p>
              </div>
              <div className='grid grid-cols-3 gap-2 text-center md:min-w-80'>
                <Metric label={t`Modules`} value={course.modules.length} />
                <Metric label={t`Lessons`} value={getOnlineCourseLessonCount(course)} />
                <Metric label={t`Duration`} value={formatMinutes(course.estimatedDurationInMinutes)} />
              </div>
            </div>

            <div className='flex items-center justify-between gap-3'>
              <div>
                <h3 className='text-base font-semibold'>{t`Course structure`}</h3>
                <p className='text-muted-foreground text-sm'>{t`Modules, lessons, and learner resources.`}</p>
              </div>
              <Button
                type='button'
                onClick={() => {
                  setEditingModule(null);
                  setIsModuleDialogOpen(true);
                }}
              >
                <PlusIcon />
                {t`Add module`}
              </Button>
            </div>

            <div className='grid gap-3'>
              {course.modules.map((module) => (
                <div key={module.id} className='bg-card rounded-lg border'>
                  <div className='flex flex-wrap items-start justify-between gap-3 border-b p-4'>
                    <div>
                      <div className='flex flex-wrap items-center gap-2'>
                        <h4 className='font-semibold'>{module.title}</h4>
                        <OnlineCourseBadge color='#64748b'>
                          {t(onlineCourseContentStatusLabelMap[module.status])}
                        </OnlineCourseBadge>
                      </div>
                      <p className='text-muted-foreground mt-1 text-sm'>{module.description}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        type='button'
                        variant='outline'
                        onClick={() => {
                          setLessonModuleId(module.id);
                          setEditingLesson(null);
                        }}
                      >
                        <PlusIcon />
                        {t`Lesson`}
                      </Button>
                      <Button
                        size='icon-sm'
                        type='button'
                        variant='outline'
                        onClick={() => {
                          setEditingModule(module);
                          setIsModuleDialogOpen(true);
                        }}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        size='icon-sm'
                        type='button'
                        variant='destructive'
                        onClick={() => setDeletingModule(module)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                  <div className='grid gap-3 p-4'>
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className='rounded-md border bg-background p-3'>
                        <div className='flex flex-wrap items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <div className='flex items-center gap-2'>
                              <VideoIcon className='text-primary size-4' />
                              <p className='font-medium'>{lesson.title}</p>
                            </div>
                            <p className='text-muted-foreground mt-1 text-sm'>{lesson.description}</p>
                          </div>
                          <Button
                            size='sm'
                            type='button'
                            variant='outline'
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setEditingMaterial(null);
                            }}
                          >
                            <PlusIcon />
                            {t`Material`}
                          </Button>
                          <Button
                            size='icon-sm'
                            type='button'
                            variant='outline'
                            onClick={() => {
                              setLessonModuleId(module.id);
                              setEditingLesson(lesson);
                            }}
                          >
                            <PencilIcon />
                          </Button>
                          <Button
                            size='icon-sm'
                            type='button'
                            variant='destructive'
                            onClick={() => setDeletingLesson(lesson)}
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                        <div className='mt-3 flex flex-wrap gap-2'>
                          <span className='text-muted-foreground inline-flex items-center gap-1 text-xs'>
                            <FilmIcon className='size-3.5' />
                            {formatMinutes(lesson.durationInMinutes)}
                          </span>
                          {lesson.materials.map((material) => (
                            <span
                              key={material.id}
                              className='inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs'
                            >
                              <FileTextIcon className='size-3.5' />
                              {material.title}
                              <button type='button' onClick={() => setEditingMaterial(material)}>
                                <PencilIcon className='size-3' />
                              </button>
                              <button type='button' onClick={() => setDeletingMaterial(material)}>
                                <TrashIcon className='size-3 text-destructive' />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <OnlineCourseModuleFormDialog
              editValues={editingModule}
              courseId={course.id}
              onOpenChange={(nextOpen) => {
                setIsModuleDialogOpen(nextOpen);
                if (!nextOpen) setEditingModule(null);
              }}
              open={isModuleDialogOpen}
            />
            <OnlineCourseMaterialFormDialog
              editValues={editingMaterial}
              courseId={course.id}
              lessonId={(selectedLesson?.id ?? editingMaterial?.lessonId) || ''}
              onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                  setSelectedLesson(null);
                  setEditingMaterial(null);
                }
              }}
              open={Boolean(selectedLesson) || Boolean(editingMaterial)}
            />
            <OnlineCourseLessonFormDialog
              editValues={editingLesson}
              courseId={course.id}
              moduleId={lessonModuleId}
              onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                  setLessonModuleId('');
                  setEditingLesson(null);
                }
              }}
              open={Boolean(lessonModuleId) || Boolean(editingLesson)}
            />
          </div>
        ) : null}

        <DeleteAlertDialog
          itemName={t`module`}
          isLoading={deleteModuleMutation.isPending}
          onDelete={() => {
            if (deletingModule) deleteModuleMutation.mutate({ moduleId: deletingModule.id });
          }}
          onOpenChange={(nextOpen) => !nextOpen && setDeletingModule(null)}
          open={Boolean(deletingModule)}
        />
        <DeleteAlertDialog
          itemName={t`lesson`}
          isLoading={deleteLessonMutation.isPending}
          onDelete={() => {
            if (deletingLesson) deleteLessonMutation.mutate({ lessonId: deletingLesson.id });
          }}
          onOpenChange={(nextOpen) => !nextOpen && setDeletingLesson(null)}
          open={Boolean(deletingLesson)}
        />
        <DeleteAlertDialog
          itemName={t`material`}
          isLoading={deleteMaterialMutation.isPending}
          onDelete={() => {
            if (deletingMaterial) {
              deleteMaterialMutation.mutate({ materialId: deletingMaterial.id });
            }
          }}
          onOpenChange={(nextOpen) => !nextOpen && setDeletingMaterial(null)}
          open={Boolean(deletingMaterial)}
        />
      </SheetContent>
    </Sheet>
  );
};

const Metric = ({ label, value }: { label: string; value: number | string }) => (
  <div className='bg-muted/40 rounded-md p-3'>
    <p className='text-lg font-semibold'>{value}</p>
    <p className='text-muted-foreground text-xs'>{label}</p>
  </div>
);
