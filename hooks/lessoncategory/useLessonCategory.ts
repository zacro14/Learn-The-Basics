import { CategoryResponse } from 'app/dashboard/category/page';
import { useQuery } from 'react-query';
import { GetCategory } from 'service/lessoncategory/fetchCategory';

export function useLessonCategory() {
    return useQuery<CategoryResponse[], Error>('category', GetCategory);
}
