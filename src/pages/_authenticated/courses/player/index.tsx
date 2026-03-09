import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/courses/player' />;

export const Route = createFileRoute('/_authenticated/courses/player/')({
  component: LearningModulePage
});
