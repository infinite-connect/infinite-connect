import { AllPrimaryBusinessCardList } from '@features/Networking/networkingApi';
import { FilterValues } from '@components/NetworkingListPage/FullScreenFilter';

export function applyAllFilters(
  data: AllPrimaryBusinessCardList[],
  activeTab: string,
  filterValues: FilterValues,
): AllPrimaryBusinessCardList[] {
  let filtered = [...data];

  // 1) 탭 필터
  if (activeTab !== 'ALL') {
    const tabLower = activeTab.toLowerCase();
    filtered = filtered.filter((item) => item.fields_of_expertise?.toLowerCase() === tabLower);
  }

  // // 2) 연차 필터
  // //    business_cards에 experience_years가 있다고 가정
  // if (filterValues.year) {
  //   filtered = filtered.filter((item) => {
  //     const exp = item.experience_years ?? 0; // 경험값이 없으면 0 처리
  //     return matchYearRange(exp, filterValues.year);
  //   });
  // }

  // 3) 직무 필터
  if (filterValues.job && filterValues.job !== 'ALL') {
    const jobLower = filterValues.job.toLowerCase();
    filtered = filtered.filter((item) => item.fields_of_expertise?.toLowerCase() === jobLower);
  }

  // 4) 세부 직무 필터
  if (filterValues.subJob && filterValues.subJob !== 'ALL') {
    const subJobLower = filterValues.subJob.toLowerCase();
    filtered = filtered.filter((item) => item.sub_expertise?.toLowerCase() === subJobLower);
  }

  // 5) 관심사 필터 ("하나라도 겹치면 통과")
  if (filterValues.interests.length > 0) {
    filtered = filtered.filter((item) => matchInterests(item.interests, filterValues.interests));
  }

  return filtered;
}

export function matchInterests(
  itemInterests: string[] | undefined,
  filterInterests: string[],
): boolean {
  if (!itemInterests || itemInterests.length === 0) return false;
  // 하나라도 겹치면 통과
  return itemInterests.some((intr) => filterInterests.includes(intr));
}

export function matchYearRange(exp: number, filterYear: string): boolean {
  switch (filterYear) {
    case '신입':
      return exp < 1;
    case '1~3년':
      return exp >= 1 && exp <= 3;
    case '4~7년':
      return exp >= 4 && exp <= 7;
    case '8~10년':
      return exp >= 8 && exp <= 10;
    case '10년 이상':
      return exp >= 10;
    default:
      return true; // 필터Year가 ""(미선택)거나 기타인 경우 필터 통과
  }
}
