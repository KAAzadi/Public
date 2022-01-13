#define _GNU_SOURCE

#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <sys/types.h>

//prototypes
void RecScan(char* pathName, int space);

int main(int argc, char *argv[])
{
    char pathName[1000] = ".";

    if(argc>1)
	strcpy(pathName,argv[1]);

    RecScan(pathName, 0);

    return 0;
}

void RecScan(char* pathName, int space)
{
    //need the copy to allow for function to return to previous elevation fine
    char pathCopy[1000];
    struct dirent **fileList;
    
    int success, i;
    
    success = scandir(pathName, &fileList, NULL, alphasort);

    //determines whether directory failed
    if (success <= 0)
    {
	if(space == 0 && success == -1)
	{
	    perror("scandir");
	    exit(EXIT_FAILURE);
	}
	else
	    return;
    }

    while(success--)
    {
	
        if(strcmp(fileList[success]->d_name, "..") != 0 && strcmp(fileList[success]->d_name, ".") != 0 && fileList[success]->d_name[0] != '.')
	{
	    //for indenting directories, '\t' found to be too large
	    for(i=0; i<space; i++)
	    {
	        printf("  ");
	    }
            printf("%s\n",fileList[success]->d_name);

	    
	    strcpy(pathCopy, pathName);
	    strcat(pathCopy, "/");
	    strcat(pathCopy, fileList[success]->d_name);
	    RecScan(pathCopy, space+1);
	}

        free(fileList[success]);
    }
}

