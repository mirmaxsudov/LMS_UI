import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/calendar' />;

export const Route = createFileRoute('/_authenticated/calendar/')({
  component: LearningModulePage
});
