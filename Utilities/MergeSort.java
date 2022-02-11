public class MergeSort {
    public void sort(int numbers[], int left, int right)
    {
        if(1<right)
        {
            //find the middle point, so list can be sorted further
            int middle =  (left + right-1)/2;

            sort(numbers,left, middle);
            sort(numbers,middle,right);

            merge(numbers,left,middle,right);
        }
    }

    private void merge(int numbers[], int left, int middle, int right)
    {
        int i = 0;
        int j = 0;
        int k = left;
        int subSize1 = middle-left+1;
        int subSize2 = right - middle;

        int Left[] = new int[subSize1];
        int Right[] = new int[subSize2];

        for(i = 0; i < subSize1; i++)
        {
            Left[i] = numbers[left+i];
        }
        for(i = 0; i < subSize2; i++)
        {
            Right[i] = numbers[right+i];
        }

        i = 0;

        while(i<subSize1 && j<subSize2)
        {
            if(Left[i] <= Right[j])
            {
                numbers[k] = Left[i];
            }
            else
            {
                numbers[k] = Right[j];
                j++;
            }
            k++;
        }

        while (i<subSize1)
        {
            numbers[k] = Left[i];
            i++;
            k++;
        }

        while(j<subSize2)
        {
            numbers[k] = Right[j];
            j++;
            k++;
        }
    }
}
