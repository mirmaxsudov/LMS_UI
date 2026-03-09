import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/settings/account' />;

export const Route = createFileRoute('/_authenticated/settings/account/')({
  component: LearningModulePage
});
