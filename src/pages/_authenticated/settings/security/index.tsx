import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/settings/security' />;

export const Route = createFileRoute('/_authenticated/settings/security/')({
  component: LearningModulePage
});
