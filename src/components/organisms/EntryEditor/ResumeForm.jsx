import PersonalInfoSection from './sections/PersonalInfoSection'
import SummarySection from './sections/SummarySection'
import SkillsSection from './sections/SkillsSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import LanguagesSection from './sections/LanguagesSection'
import CustomSectionsSection from './sections/CustomSectionsSection'

export default function ResumeForm({ register, control }) {
  return (
    <div className="space-y-8">
      <PersonalInfoSection register={register} />
      <SummarySection register={register} />
      <SkillsSection control={control} register={register} />
      <ExperienceSection control={control} register={register} />
      <EducationSection control={control} register={register} />
      <LanguagesSection control={control} register={register} />
      <CustomSectionsSection control={control} register={register} />
    </div>
  )
}
