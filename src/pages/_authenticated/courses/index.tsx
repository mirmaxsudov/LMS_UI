import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/courses' />;

export const Route = createFileRoute('/_authenticated/courses/')({
  component: LearningModulePage
});
