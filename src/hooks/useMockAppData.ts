import { useCallback, useEffect, useState } from 'react';
import {
  mapAnalysisReport,
  mapCompany,
  mapCompanyChoices,
  mapCoverLetterDraft,
  mapCoverLetterRows,
  mapDashboard,
  mapJdList,
  mapNotifications,
  mapTemplateQuestions,
  mapUserProfile,
  type AnalysisReportData,
  type AuthDefaults,
  type CompanyChoices,
  type CompanyProfile,
  type CoverLetterDraft,
  type CoverLetterRow,
  type DashboardData,
  type JdItem,
  type NotificationsData,
  type RecruitmentPreview,
  type TemplateQuestion,
  type UserProfile,
} from '../api/adapters';
import { mockClient } from '../api/mockClient';

export type MockAppData = {
  dashboard: DashboardData;
  company: CompanyProfile;
  companyChoices: CompanyChoices;
  jdList: JdItem[];
  coverLetterDraft: CoverLetterDraft;
  coverLetterRows: CoverLetterRow[];
  analysisReport: AnalysisReportData;
  recruitmentPreview: RecruitmentPreview;
  templateQuestions: TemplateQuestion[];
  userProfile: UserProfile;
  notifications: NotificationsData;
  authDefaults: AuthDefaults;
};

export function useMockAppData() {
  const [data, setData] = useState<MockAppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        dashboard,
        company,
        companyChoices,
        jobDescriptions,
        coverLetterDraft,
        coverLetters,
        analysisReport,
        recruitmentPreview,
        coverLetterTemplate,
        userProfile,
        notifications,
        authDefaults,
      ] = await Promise.all([
        mockClient.getDashboard(),
        mockClient.getCompanyProfile(),
        mockClient.getCompanyChoices(),
        mockClient.getJobDescriptions(),
        mockClient.getCoverLetterDraft(),
        mockClient.getCoverLetters(),
        mockClient.getAnalysisReport(),
        mockClient.getRecruitmentPreview(),
        mockClient.getCoverLetterTemplate(),
        mockClient.getUserProfile(),
        mockClient.getNotifications(),
        mockClient.getAuthDefaults(),
      ]);

      setData({
        dashboard: mapDashboard(dashboard.data),
        company: mapCompany(company.data),
        companyChoices: mapCompanyChoices(companyChoices.data),
        jdList: mapJdList(jobDescriptions.data),
        coverLetterDraft: mapCoverLetterDraft(coverLetterDraft.data),
        coverLetterRows: mapCoverLetterRows(coverLetters.data),
        analysisReport: mapAnalysisReport(analysisReport.data),
        recruitmentPreview: recruitmentPreview.data,
        templateQuestions: mapTemplateQuestions(coverLetterTemplate.data),
        userProfile: mapUserProfile(userProfile.data),
        notifications: mapNotifications(notifications.data),
        authDefaults: authDefaults.data,
      });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : '목업 API 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [reload]);

  return { data, loading, error, reload };
}
